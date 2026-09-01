import { NextRequest } from 'next/server';
import { auth } from '@/lib/auth';
import { connectDB } from '@/lib/db';
import { Location } from '@/models/Location';
import { Reservation } from '@/models/Reservation';
import { Vehicle } from '@/models/Vehicle';
import { apiError, apiSuccess } from '@/lib/apiHelpers';
import { formatDateTime } from '@/lib/utils';
import { auditLog, diff } from '@/services/auditService';
import { findVehiclePlanningConflict, syncVehicleStatusFromPlanning } from '@/services/vehicleAvailabilityService';
import { rateLimit } from '@/lib/rateLimit';
import { z } from 'zod';

type Ctx = { params: Promise<{ id: string }> };

const changeVehicleSchema = z.object({
  vehicleId: z.string().min(1),
});

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

  const parsed = changeVehicleSchema.safeParse(body);
  if (!parsed.success) return apiError('Données invalides', 422, parsed.error.flatten());

  const before = await Location.findById(id).lean();
  if (!before) return apiError('Location introuvable', 404);
  if (before.statut !== 'en_cours') {
    return apiError('Seule une location en cours peut changer de véhicule', 409);
  }

  const newVehicleId = parsed.data.vehicleId;
  if (String(before.vehicle) === newVehicleId) {
    return apiError('Ce véhicule est déjà celui de la location', 409);
  }

  const newVehicle = await Vehicle.findById(newVehicleId).lean();
  if (!newVehicle) return apiError('Véhicule introuvable', 404);
  if (newVehicle.statut === 'maintenance') {
    return apiError('Ce véhicule est en maintenance et ne peut pas être loué', 409);
  }

  const conflict = await findVehiclePlanningConflict({
    vehicleId: newVehicleId,
    debutAt: new Date(before.debutAt),
    finAt: new Date(before.finReelleAt ?? before.finPrevueAt),
    excludeLocationId: id,
    ...(before.reservation ? { excludeReservationId: before.reservation } : {}),
  });
  if (conflict) {
    return apiError(
      `Conflit planning : ${conflict.source === 'reservation' ? 'réservation' : 'location'} déjà prévue du ${formatDateTime(conflict.debutAt)} au ${formatDateTime(conflict.finAt)}`,
      409,
      { conflict },
    );
  }

  // Changement de véhicule : le tarif et le montant restent inchangés (prix de base conservé).
  // Le km de départ est réinitialisé au kilométrage du nouveau véhicule.
  const ancienVehicleId = before.vehicle;
  const updated = await Location.findByIdAndUpdate(
    id,
    {
      vehicle: newVehicleId,
      kmDepart: Number(newVehicle.kilometrage ?? 0),
    },
    { new: true },
  )
    .populate('vehicle', 'marque modele immatriculation kilometrage')
    .populate('client', 'prenom nom telephone')
    .lean();

  if (before.reservation) {
    await Reservation.findByIdAndUpdate(before.reservation, { vehicle: newVehicleId });
  }

  await syncVehicleStatusFromPlanning(ancienVehicleId);
  await syncVehicleStatusFromPlanning(newVehicleId);

  await auditLog({
    action: 'update',
    entity: 'Location',
    entityId: id,
    userId: session.user.id,
    before,
    after: updated,
    changes: diff(before, updated),
  });

  return apiSuccess({
    ...updated,
    vehicule: updated?.vehicle,
    ancienVehicleId,
  });
}
