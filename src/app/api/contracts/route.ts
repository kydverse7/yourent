import { NextRequest } from 'next/server';
import { auth } from '@/lib/auth';
import { connectDB } from '@/lib/db';
import { Reservation } from '@/models/Reservation';
import { Location } from '@/models/Location';
import { apiError, apiPaginated, apiSuccess } from '@/lib/apiHelpers';
import { parsePaginationParams } from '@/lib/utils';
import { contractSchema } from '@/lib/validators/contract.schema';
import { auditLog, diff } from '@/services/auditService';
import { ensureDocumentNumberForEntity } from '@/services/documentNumberService';
import { getLinkedDossier, syncLinkedDocument } from '../../../services/documentLinkService';
import { rateLimit } from '@/lib/rateLimit';

type ContractRow = {
  _id: string;
  entityType: 'reservation' | 'location';
  entityId: string;
  statut?: string;
  contratNumero?: string;
  contratPdfUrl?: string;
  createdAt?: Date;
  clientLabel: string;
  vehicleLabel: string;
  sourceLabel: string;
};

function toContractRows(reservations: any[], locations: any[]): ContractRow[] {
  const reservationRows = reservations
    .filter((reservation) => !reservation.location)
    .map((reservation) => ({
    _id: `reservation:${reservation._id}`,
    entityType: 'reservation' as const,
    entityId: String(reservation._id),
    statut: reservation.statut,
    contratNumero: reservation.contratNumero,
    contratPdfUrl: reservation.contratPdfUrl,
    createdAt: reservation.createdAt,
    clientLabel: reservation.client
      ? `${reservation.client.prenom ?? ''} ${reservation.client.nom ?? ''}`.trim()
      : `${reservation.clientInline?.prenom ?? ''} ${reservation.clientInline?.nom ?? ''}`.trim() || 'Client non rattaché',
    vehicleLabel: reservation.vehicle
      ? `${reservation.vehicle.marque ?? ''} ${reservation.vehicle.modele ?? ''}`.trim()
      : 'Véhicule indisponible',
    sourceLabel: 'Réservation',
  }));

  const locationRows = locations.map((location) => ({
    _id: `location:${location._id}`,
    entityType: 'location' as const,
    entityId: String(location._id),
    statut: location.statut,
    contratNumero: location.contratNumero,
    contratPdfUrl: location.contratPdfUrl,
    createdAt: location.createdAt,
    clientLabel: location.client
      ? `${location.client.prenom ?? ''} ${location.client.nom ?? ''}`.trim()
      : 'Client non rattaché',
    vehicleLabel: location.vehicle
      ? `${location.vehicle.marque ?? ''} ${location.vehicle.modele ?? ''}`.trim()
      : 'Véhicule indisponible',
    sourceLabel: 'Location',
  }));

  return [...reservationRows, ...locationRows].sort((a, b) => {
    const aTime = a.createdAt ? new Date(a.createdAt).getTime() : 0;
    const bTime = b.createdAt ? new Date(b.createdAt).getTime() : 0;
    return bTime - aTime;
  });
}

export async function GET(req: NextRequest) {
  const session = await auth();
  if (!session) return apiError('Non autorisé', 401);

  await connectDB();
  const { searchParams } = req.nextUrl;
  const { page, limit } = parsePaginationParams(searchParams);
  const scope = searchParams.get('scope');
  const missingOnly = searchParams.get('missing') === 'true';

  const reservationFilter: Record<string, unknown> = {
    statut: { $in: ['confirmee', 'en_cours', 'terminee'] },
  };
  const locationFilter: Record<string, unknown> = {
    statut: { $in: ['en_cours', 'terminee'] },
  };

  const [reservations, locations] = await Promise.all([
    scope === 'location'
      ? Promise.resolve([])
      : Reservation.find(reservationFilter)
          .populate('vehicle', 'marque modele immatriculation')
          .populate('client', 'prenom nom')
          .sort({ createdAt: -1 })
          .lean(),
    scope === 'reservation'
      ? Promise.resolve([])
      : Location.find(locationFilter)
          .populate('vehicle', 'marque modele immatriculation')
          .populate('client', 'prenom nom')
          .sort({ createdAt: -1 })
          .lean(),
  ]);

  let rows = toContractRows(reservations, locations);
  if (missingOnly) rows = rows.filter((item) => !item.contratPdfUrl);

  const total = rows.length;
  const start = (page - 1) * limit;
  const pagedRows = rows.slice(start, start + limit);

  return apiPaginated(pagedRows, { total, page, limit });
}

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session) return apiError('Non autorisé', 401);
  if (!['admin', 'agent'].includes(session.user.role)) return apiError('Accès interdit', 403);

  const limited = await rateLimit('general', session.user.id);
  if (!limited.success) return apiError('Trop de requêtes', 429);

  await connectDB();

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return apiError('Corps JSON invalide', 400);
  }

  const parsed = contractSchema.safeParse(body);
  if (!parsed.success) return apiError('Données invalides', 422, parsed.error.flatten());

  const dossier = await getLinkedDossier(parsed.data.entityType, parsed.data.entityId);
  const Model = dossier.canonicalEntityType === 'reservation' ? Reservation : Location;
  const before = await Model.findById(dossier.canonicalEntityId).lean();
  if (!before) return apiError('Dossier introuvable', 404);
  const contractNumber = await ensureDocumentNumberForEntity(dossier.canonicalEntityType, 'contract', dossier.canonicalEntityId);

  await syncLinkedDocument(
    'contract',
    { reservationId: dossier.reservationId, locationId: dossier.locationId },
    { number: contractNumber, url: parsed.data.contratPdfUrl },
  );

  const updated = await Model.findById(dossier.canonicalEntityId).lean();

  await auditLog({
    action: 'update',
    entity: dossier.canonicalEntityType === 'reservation' ? 'Reservation' : 'Location',
    entityId: dossier.canonicalEntityId,
    userId: session.user.id,
    before,
    after: updated,
    changes: diff(before, updated),
  });

  return apiSuccess(updated);
}
