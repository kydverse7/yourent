import { NextRequest } from 'next/server';
import { auth } from '@/lib/auth';
import { connectDB } from '@/lib/db';
import { Maintenance } from '@/models/Maintenance';
import { Vehicle } from '@/models/Vehicle';
import { maintenanceSchema } from '@/lib/validators/maintenance.schema';
import { apiError, apiPaginated, apiSuccess } from '@/lib/apiHelpers';
import { parsePaginationParams } from '@/lib/utils';
import { auditLog } from '@/services/auditService';
import { rateLimit } from '@/lib/rateLimit';

function syncVehicleAlerts(input: {
  type: string;
  prochaineEcheance?: Date;
  prochaineEcheanceKm?: number;
}) {
  const alerts: Record<string, unknown> = {};

  if (input.type === 'assurance' && input.prochaineEcheance) {
    alerts['alerts.assuranceExpireLe'] = input.prochaineEcheance;
  }
  if (input.type === 'ct' && input.prochaineEcheance) {
    alerts['alerts.controleTechniqueExpireLe'] = input.prochaineEcheance;
  }
  if (input.type === 'vignette' && input.prochaineEcheance) {
    alerts['alerts.vignetteExpireLe'] = input.prochaineEcheance;
  }
  if (input.type === 'vidange' && input.prochaineEcheanceKm !== undefined) {
    alerts['alerts.vidangeAtKm'] = input.prochaineEcheanceKm;
  }

  return alerts;
}

export async function GET(req: NextRequest) {
  const session = await auth();
  if (!session) return apiError('Non autorisé', 401);

  await connectDB();
  const { searchParams } = req.nextUrl;
  const { page, limit, skip } = parsePaginationParams(searchParams);

  const filter: Record<string, unknown> = {};
  const type = searchParams.get('type');
  if (type) filter.type = type;
  const vehicle = searchParams.get('vehicle');
  if (vehicle) filter.vehicle = vehicle;

  const [items, total] = await Promise.all([
    Maintenance.find(filter)
      .populate('vehicle', 'marque modele immatriculation')
      .sort({ date: -1, createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean(),
    Maintenance.countDocuments(filter),
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

  const parsed = maintenanceSchema.safeParse(body);
  if (!parsed.success) return apiError('Données invalides', 422, parsed.error.flatten());

  const vehicle = await Vehicle.findById(parsed.data.vehicleId).lean();
  if (!vehicle) return apiError('Véhicule introuvable', 404);

  const maintenance = await Maintenance.create({
    vehicle: parsed.data.vehicleId,
    type: parsed.data.type,
    description: parsed.data.description,
    cout: parsed.data.cout,
    fournisseur: parsed.data.fournisseur,
    date: parsed.data.date,
    kmAuMoment: parsed.data.kmAuMoment,
    prochaineEcheance: parsed.data.prochaineEcheance,
    prochaineEcheanceKm: parsed.data.prochaineEcheanceKm,
    facturePdfUrl: parsed.data.facturePdfUrl,
    createdBy: session.user.id,
  });

  const vehicleAlertUpdates = syncVehicleAlerts(parsed.data);
  if (Object.keys(vehicleAlertUpdates).length > 0) {
    await Vehicle.findByIdAndUpdate(parsed.data.vehicleId, vehicleAlertUpdates);
  }

  await auditLog({
    action: 'create',
    entity: 'Maintenance',
    entityId: String(maintenance._id),
    userId: session.user.id,
    after: maintenance.toObject(),
  });

  const created = await Maintenance.findById(maintenance._id)
    .populate('vehicle', 'marque modele immatriculation')
    .lean();

  return apiSuccess(created, 201);
}
