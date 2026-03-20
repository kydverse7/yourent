import { Client } from '@/models/Client';
import { Location } from '@/models/Location';
import { Payment } from '@/models/Payment';
import { Reservation } from '@/models/Reservation';

export async function recomputeClientStats(clientId: string) {
  const [locations, reservations] = await Promise.all([
    Location.find({ client: clientId, statut: { $ne: 'annulee' } })
      .select('_id debutAt finPrevueAt finReelleAt createdAt')
      .lean(),
    Reservation.find({ client: clientId, statut: { $ne: 'annulee' } })
      .select('_id')
      .lean(),
  ]);

  const locationIds = locations.map((item) => item._id);
  const reservationIds = reservations.map((item) => item._id);

  const paymentOr: Array<Record<string, unknown>> = [];
  if (locationIds.length > 0) paymentOr.push({ location: { $in: locationIds } });
  if (reservationIds.length > 0) paymentOr.push({ reservation: { $in: reservationIds } });

  const payments = paymentOr.length > 0
    ? await Payment.find({
        statut: { $ne: 'annule' },
        categorie: { $nin: ['caution', 'caution_restitution'] },
        $or: paymentOr,
      })
        .select('montant')
        .lean()
    : [];

  const totalDepenses = payments.reduce((sum, item) => sum + Number(item.montant ?? 0), 0);
  const lastLocationDate = locations.reduce<Date | undefined>((latest, item) => {
    const candidate = item.finReelleAt ?? item.finPrevueAt ?? item.debutAt ?? item.createdAt;
    if (!candidate) return latest;
    if (!latest || new Date(candidate).getTime() > new Date(latest).getTime()) {
      return new Date(candidate);
    }
    return latest;
  }, undefined);

  await Client.findByIdAndUpdate(clientId, {
    stats: {
      totalLocations: locations.length,
      totalDepenses,
      derniereLouage: lastLocationDate,
    },
  });
}
