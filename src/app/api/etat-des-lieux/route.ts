import { NextRequest } from 'next/server';
import { auth } from '@/lib/auth';
import { connectDB } from '@/lib/db';
import { EtatDesLieux } from '@/models/EtatDesLieux';
import { Location } from '@/models/Location';
import { Vehicle } from '@/models/Vehicle';
import { etatDesLieuxSchema } from '@/lib/validators/etat-des-lieux.schema';
import { apiError, apiPaginated, apiSuccess } from '@/lib/apiHelpers';
import { parsePaginationParams } from '@/lib/utils';
import { auditLog } from '@/services/auditService';
import { rateLimit } from '@/lib/rateLimit';

export async function GET(req: NextRequest) {
  const session = await auth();
  if (!session) return apiError('Non autorisé', 401);

  await connectDB();
  const { searchParams } = req.nextUrl;
  const { page, limit, skip } = parsePaginationParams(searchParams);

  const filter: Record<string, unknown> = {};
  const moment = searchParams.get('moment');
  if (moment) filter.moment = moment;
  const locationId = searchParams.get('location');
  if (locationId) filter.location = locationId;

  const [items, total] = await Promise.all([
    EtatDesLieux.find(filter)
      .populate('vehicle', 'marque modele immatriculation')
      .populate('location', 'debutAt finPrevueAt statut')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean(),
    EtatDesLieux.countDocuments(filter),
  ]);

  return apiPaginated(items, { total, page, limit });
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

  const parsed = etatDesLieuxSchema.safeParse(body);
  if (!parsed.success) return apiError('Données invalides', 422, parsed.error.flatten());

  const location = await Location.findById(parsed.data.locationId).lean();
  if (!location) return apiError('Location introuvable', 404);
  const targetField = parsed.data.moment === 'avant' ? 'etatDesLieuxAvantId' : 'etatDesLieuxApresId';
  if (location[targetField]) {
    return apiError(`Un état des lieux ${parsed.data.moment} existe déjà pour cette location`, 409);
  }

  const etatDesLieux = await EtatDesLieux.create({
    vehicle: location.vehicle,
    location: location._id,
    moment: parsed.data.moment,
    kmReleve: parsed.data.kmReleve,
    niveauCarburant: parsed.data.niveauCarburant,
    proprete: parsed.data.proprete,
    schemaPoints: parsed.data.schemaPoints,
    photos: parsed.data.photos,
    remarques: parsed.data.remarques,
    signatureDataUrl: parsed.data.signatureDataUrl,
    signePar: parsed.data.signePar,
    signeLe: parsed.data.signePar ? new Date() : undefined,
    createdBy: session.user.id,
  });

  await Location.findByIdAndUpdate(parsed.data.locationId, { [targetField]: etatDesLieux._id });

  if (parsed.data.moment === 'apres' && parsed.data.kmReleve !== undefined) {
    await Promise.all([
      Vehicle.findByIdAndUpdate(location.vehicle, { kilometrage: parsed.data.kmReleve }),
      Location.findByIdAndUpdate(parsed.data.locationId, {
        kmRetour: parsed.data.kmReleve,
        kmParcourus:
          location.kmDepart !== undefined && location.kmDepart !== null
            ? Math.max(0, parsed.data.kmReleve - Number(location.kmDepart ?? 0))
            : undefined,
      }),
    ]);
  }

  await auditLog({
    action: 'create',
    entity: 'EtatDesLieux',
    entityId: String(etatDesLieux._id),
    userId: session.user.id,
    after: etatDesLieux.toObject(),
  });

  const created = await EtatDesLieux.findById(etatDesLieux._id)
    .populate('vehicle', 'marque modele immatriculation')
    .populate('location', 'debutAt finPrevueAt statut')
    .lean();

  return apiSuccess(created, 201);
}
