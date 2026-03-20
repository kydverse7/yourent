import { NextRequest } from 'next/server';
import { auth } from '@/lib/auth';
import { connectDB } from '@/lib/db';
import { Vehicle } from '@/models/Vehicle';
import { vehicleUpdateSchema } from '@/lib/validators/vehicle.schema';
import { apiError, apiSuccess } from '@/lib/apiHelpers';
import { auditLog, diff } from '@/services/auditService';
import { rateLimit } from '@/lib/rateLimit';

function normalizeVehiclePayload(body: Record<string, unknown>) {
  const tarifParJour = Number(body.tarifParJour ?? body.tarifJour ?? 0);
  const tarifParJour10Plus = Number(
    body.tarifParJour10Plus ?? body.tarifJour10Plus ?? body.tarifParJour15Plus ?? body.tarifJour15Plus ?? 0
  );

  return {
    ...body,
    ...(body.categorie !== undefined || body.type !== undefined ? { categorie: body.categorie ?? body.type } : {}),
    ...(body.boite !== undefined || body.transmission !== undefined ? { boite: body.boite ?? body.transmission } : {}),
    ...(body.tarifParJour !== undefined || body.tarifJour !== undefined ? { tarifParJour } : {}),
    ...(body.tarifParJour10Plus !== undefined || body.tarifJour10Plus !== undefined || body.tarifParJour15Plus !== undefined || body.tarifJour15Plus !== undefined
      ? { tarifParJour10Plus: tarifParJour10Plus || tarifParJour }
      : {}),
    ...(body.cautionDefaut !== undefined || body.cautionMontant !== undefined
      ? { cautionDefaut: Number(body.cautionDefaut ?? body.cautionMontant ?? 0) }
      : {}),
    ...(body.isPublic !== undefined || body.afficheSurSite !== undefined
      ? { isPublic: body.isPublic ?? body.afficheSurSite }
      : {}),
    ...(body.alerts || body.assuranceExpireAt || body.ctExpireAt || body.vidangeKm
      ? {
          alerts: body.alerts ?? {
            assuranceExpireLe: body.assuranceExpireAt,
            controleTechniqueExpireLe: body.ctExpireAt,
            vidangeAtKm: body.vidangeKm,
          },
        }
      : {}),
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

type Ctx = { params: Promise<{ id: string }> };

export async function GET(_req: NextRequest, { params }: Ctx) {
  const session = await auth();
  if (!session) return apiError('Non autorisé', 401);

  await connectDB();
  const { id } = await params;
  const vehicle = await Vehicle.findById(id).lean();
  if (!vehicle) return apiError('Véhicule introuvable', 404);

  return apiSuccess(serializeVehicle(vehicle));
}

export async function PUT(req: NextRequest, { params }: Ctx) {
  const session = await auth();
  if (!session) return apiError('Non autorisé', 401);
  if (!['admin', 'agent'].includes(session.user.role)) return apiError('Accès interdit', 403);

  const limited = await rateLimit('general', session.user.id);
  if (!limited.success) return apiError('Trop de requêtes', 429);

  await connectDB();
  const { id } = await params;

  let body: unknown;
  try { body = await req.json(); }
  catch { return apiError('Corps JSON invalide', 400); }

  const parsed = vehicleUpdateSchema.safeParse(normalizeVehiclePayload(body as Record<string, unknown>));
  if (!parsed.success) return apiError('Données invalides', 422, parsed.error.flatten());

  const before = await Vehicle.findById(id).lean();
  if (!before) return apiError('Véhicule introuvable', 404);

  const updated = await Vehicle.findByIdAndUpdate(id, parsed.data, { new: true, runValidators: true }).lean();

  // Propagate photoModele to all siblings (same marque + modèle)
  if (parsed.data.photoModele !== undefined && updated) {
    const u = updated as any;
    await Vehicle.updateMany(
      { marque: u.marque, modele: u.modele, _id: { $ne: u._id } },
      { photoModele: parsed.data.photoModele || null },
    );
  }

  await auditLog({
    action: 'update',
    entity: 'Vehicle',
    entityId: id,
    userId: session.user.id,
    before,
    after: updated,
    changes: diff(before, updated),
  });

  return apiSuccess(updated ? serializeVehicle(updated) : updated);
}

export async function DELETE(_req: NextRequest, { params }: Ctx) {
  const session = await auth();
  if (!session) return apiError('Non autorisé', 401);
  if (session.user.role !== 'admin') return apiError('Réservé aux administrateurs', 403);

  await connectDB();
  const { id } = await params;

  const vehicle = await Vehicle.findById(id).lean();
  if (!vehicle) return apiError('Véhicule introuvable', 404);

  // Soft delete
  await Vehicle.findByIdAndUpdate(id, { actif: false });

  await auditLog({
    action: 'delete',
    entity: 'Vehicle',
    entityId: id,
    userId: session.user.id,
    before: vehicle,
  });

  return apiSuccess({ message: 'Véhicule archivé' });
}
