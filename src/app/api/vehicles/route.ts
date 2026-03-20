import { NextRequest } from 'next/server';
import { auth } from '@/lib/auth';
import { connectDB } from '@/lib/db';
import { Vehicle } from '@/models/Vehicle';
import { vehicleSchema } from '@/lib/validators/vehicle.schema';
import { apiError, apiPaginated, apiSuccess } from '@/lib/apiHelpers';
import { parsePaginationParams } from '@/lib/utils';
import { auditLog } from '@/services/auditService';
import { rateLimit } from '@/lib/rateLimit';

function normalizeVehiclePayload(body: Record<string, unknown>) {
  const tarifParJour = Number(body.tarifParJour ?? body.tarifJour ?? 0);
  const tarifParJour10Plus = Number(
    body.tarifParJour10Plus ?? body.tarifJour10Plus ?? body.tarifParJour15Plus ?? body.tarifJour15Plus ?? 0
  );

  return {
    ...body,
    categorie: body.categorie ?? body.type,
    boite: body.boite ?? body.transmission,
    tarifParJour,
    tarifParJour10Plus: tarifParJour10Plus || tarifParJour,
    cautionDefaut: Number(body.cautionDefaut ?? body.cautionMontant ?? 0),
    isPublic: body.isPublic ?? body.afficheSurSite ?? true,
    alerts: body.alerts ?? {
      assuranceExpireLe: body.assuranceExpireAt,
      controleTechniqueExpireLe: body.ctExpireAt,
      vidangeAtKm: body.vidangeKm,
    },
  };
}

function serializeVehicle(vehicle: any) {
  const tarifJour = vehicle.tarifParJour ?? vehicle.tarifJour ?? 0;
  const tarifJour10Plus =
    vehicle.tarifParJour10Plus
    ?? vehicle.tarifJour10Plus
    ?? vehicle.tarifParJour15Plus
    ?? vehicle.tarifJour15Plus
    ?? vehicle.tarifParJour30Plus
    ?? vehicle.tarifJour30Plus
    ?? tarifJour;

  return {
    ...vehicle,
    type: vehicle.type ?? vehicle.categorie,
    transmission: vehicle.transmission ?? vehicle.boite,
    tarifJour,
    tarifJour10Plus,
    cautionMontant: vehicle.cautionMontant ?? vehicle.cautionDefaut ?? 0,
    photoModele: vehicle.photoModele ?? null,
    afficheSurSite: vehicle.afficheSurSite ?? vehicle.isPublic ?? true,
    assuranceExpireAt: vehicle.assuranceExpireAt ?? vehicle.alerts?.assuranceExpireLe ?? null,
    ctExpireAt: vehicle.ctExpireAt ?? vehicle.alerts?.controleTechniqueExpireLe ?? null,
    vidangeKm: vehicle.vidangeKm ?? vehicle.alerts?.vidangeAtKm ?? null,
  };
}

export async function GET(req: NextRequest) {
  const session = await auth();
  if (!session) return apiError('Non autorisé', 401);

  await connectDB();

  const { searchParams } = req.nextUrl;
  const { page, limit, skip } = parsePaginationParams(searchParams);

  const filter: Record<string, any> = { actif: { $ne: false } };

  const q = searchParams.get('q');
  if (q) filter.$text = { $search: q };

  const statut = searchParams.get('statut');
  if (statut) filter.statut = statut;

  const type = searchParams.get('type');
  if (type) filter.categorie = type;

  // Mode groupé : retourne tous les véhicules groupés par marque+modèle
  const grouped = searchParams.get('grouped');
  if (grouped === 'true') {
    const allVehicles = await Vehicle.find(filter)
      .select('marque modele immatriculation annee categorie statut couleur kilometrage tarifParJour tarifParJour10Plus tarifParJour15Plus tarifParJour30Plus tarifJour tarifJour10Plus tarifJour15Plus tarifJour30Plus photos backgroundPhoto photoModele carburant boite places')
      .sort({ marque: 1, modele: 1, annee: -1 })
      .lean();

    const groups = new Map<string, { marque: string; modele: string; type: string; vehicles: any[] }>();
    for (const v of allVehicles) {
      const key = `${(v.marque ?? '').toLowerCase()}-${(v.modele ?? '').toLowerCase()}`;
      if (!groups.has(key)) {
        groups.set(key, {
          marque: v.marque,
          modele: v.modele,
          type: (v as any).categorie ?? (v as any).type ?? '',
          vehicles: [],
        });
      }
      groups.get(key)!.vehicles.push(serializeVehicle(v));
    }

    const result = [...groups.values()];
    return apiSuccess({ groups: result, total: allVehicles.length, totalGroups: result.length });
  }

  const [items, total] = await Promise.all([
    Vehicle.find(filter)
      .select('marque modele immatriculation annee categorie statut tarifParJour tarifParJour10Plus tarifParJour15Plus tarifParJour30Plus tarifJour tarifJour10Plus tarifJour15Plus tarifJour30Plus photos backgroundPhoto photoModele')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean(),
    Vehicle.countDocuments(filter),
  ]);

  return apiPaginated(items.map(serializeVehicle), { total, page, limit });
}

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session) return apiError('Non autorisé', 401);
  if (!['admin', 'agent'].includes(session.user.role)) return apiError('Accès interdit', 403);

  const limited = await rateLimit('general', session.user.id);
  if (!limited.success) return apiError('Trop de requêtes', 429);

  await connectDB();

  let body: unknown;
  try { body = await req.json(); }
  catch { return apiError('Corps JSON invalide', 400); }

  const parsed = vehicleSchema.safeParse(normalizeVehiclePayload(body as Record<string, unknown>));
  if (!parsed.success) return apiError('Données invalides', 422, parsed.error.flatten());

  const vehicle = await Vehicle.create(parsed.data);

  await auditLog({
    action: 'create',
    entity: 'Vehicle',
    entityId: String(vehicle._id),
    userId: session.user.id,
    after: vehicle.toObject(),
  });

  return apiSuccess(serializeVehicle(vehicle.toObject()), 201);
}
