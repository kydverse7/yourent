import { Types } from 'mongoose';
import { Location } from '@/models/Location';
import { Reservation } from '@/models/Reservation';
import { Vehicle } from '@/models/Vehicle';

type ObjectIdLike = string | Types.ObjectId;

export type PlanningConflict =
  | { source: 'location'; id: string; debutAt: Date; finAt: Date }
  | { source: 'reservation'; id: string; debutAt: Date; finAt: Date };

function asObjectId(value: ObjectIdLike): Types.ObjectId {
  return typeof value === 'string' ? new Types.ObjectId(value) : value;
}

export async function findVehiclePlanningConflict(input: {
  vehicleId: ObjectIdLike;
  debutAt: Date;
  finAt: Date;
  excludeReservationId?: ObjectIdLike;
  excludeLocationId?: ObjectIdLike;
}): Promise<PlanningConflict | null> {
  const vehicleId = asObjectId(input.vehicleId);
  const debutAt = new Date(input.debutAt);
  const finAt = new Date(input.finAt);
  const excludeReservationId = input.excludeReservationId ? asObjectId(input.excludeReservationId) : undefined;
  const excludeLocationId = input.excludeLocationId ? asObjectId(input.excludeLocationId) : undefined;

  // 1) Une location active est prioritaire sur toute autre disponibilité.
  const locationConflict = await Location.findOne({
    vehicle: vehicleId,
    statut: 'en_cours',
    ...(excludeLocationId ? { _id: { $ne: excludeLocationId } } : {}),
    debutAt: { $lt: finAt },
    $or: [
      { finReelleAt: { $gt: debutAt } },
      { finReelleAt: null, finPrevueAt: { $gt: debutAt } },
      { finReelleAt: { $exists: false }, finPrevueAt: { $gt: debutAt } },
    ],
  })
    .select('_id debutAt finPrevueAt finReelleAt')
    .lean();

  if (locationConflict) {
    return {
      source: 'location',
      id: String(locationConflict._id),
      debutAt: new Date(locationConflict.debutAt),
      finAt: new Date(locationConflict.finReelleAt ?? locationConflict.finPrevueAt),
    };
  }

  // 2) Les réservations confirmées/en cours bloquent aussi le planning.
  const reservationConflict = await Reservation.findOne({
    vehicle: vehicleId,
    statut: { $in: ['confirmee', 'en_cours'] },
    ...(excludeReservationId ? { _id: { $ne: excludeReservationId } } : {}),
    debutAt: { $lt: finAt },
    finAt: { $gt: debutAt },
  })
    .select('_id debutAt finAt')
    .lean();

  if (!reservationConflict) return null;

  return {
    source: 'reservation',
    id: String(reservationConflict._id),
    debutAt: new Date(reservationConflict.debutAt),
    finAt: new Date(reservationConflict.finAt),
  };
}

export async function syncVehicleStatusFromPlanning(vehicleIdInput: ObjectIdLike): Promise<'disponible' | 'loue' | 'reserve' | 'maintenance'> {
  const vehicleId = asObjectId(vehicleIdInput);
  const vehicle = await Vehicle.findById(vehicleId).select('statut').lean();
  if (!vehicle) return 'disponible';

  if (vehicle.statut === 'maintenance') {
    return 'maintenance';
  }

  const hasActiveLocation = await Location.exists({
    vehicle: vehicleId,
    statut: 'en_cours',
  });

  if (hasActiveLocation) {
    await Vehicle.findByIdAndUpdate(vehicleId, { statut: 'loue' });
    return 'loue';
  }

  const now = new Date();
  const hasUpcomingReservation = await Reservation.exists({
    vehicle: vehicleId,
    statut: { $in: ['confirmee', 'en_cours'] },
    finAt: { $gte: now },
  });

  if (hasUpcomingReservation) {
    await Vehicle.findByIdAndUpdate(vehicleId, { statut: 'reserve' });
    return 'reserve';
  }

  await Vehicle.findByIdAndUpdate(vehicleId, { statut: 'disponible' });
  return 'disponible';
}

