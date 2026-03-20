import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { connectDB } from '@/lib/db';
import { Vehicle } from '@/models/Vehicle';
import { Client } from '@/models/Client';
import { Reservation } from '@/models/Reservation';
import { Location } from '@/models/Location';
import { Payment } from '@/models/Payment';
import { Expense } from '@/models/Expense';
import { startOfMonth, endOfMonth, startOfDay } from 'date-fns';
import { buildActiveVehicleAlerts } from '@/lib/vehicle-alerts';

// RÈGLE CRITIQUE : les catégories caution sont TOUJOURS exclues des finances
const CAUTION_CATEGORIES = ['caution', 'caution_restitution'];

export async function GET() {
  const session = await auth();
  if (!session) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });

  await connectDB();

  const now = new Date();
  const debutMois = startOfMonth(now);
  const finMois = endOfMonth(now);
  const aujourd_hui_debut = startOfDay(now);

  const [
    totalVehicules,
    vehiculesDisponibles,
    vehiculesEnLocation,
    vehiculesEnMaintenance,
    totalClients,
    clientsActifs,
    locationsEnCours,
    reservationsEnAttente,
    reservationsAujourdhui,
    revenusMois,
    depensesMois,
    alertesRetard,
    vehiculesAlertes,
  ] = await Promise.all([
    // Véhicules
    Vehicle.countDocuments({ actif: { $ne: false } }),
    Vehicle.countDocuments({ actif: { $ne: false }, statut: 'disponible' }),
    Vehicle.countDocuments({ actif: { $ne: false }, statut: 'loue' }),
    Vehicle.countDocuments({ actif: { $ne: false }, statut: 'maintenance' }),

    // Clients
    Client.countDocuments({ actif: true }),
    Client.countDocuments({ actif: true, 'blacklist.actif': false }),

    // Locations
    Location.countDocuments({ statut: 'en_cours' }),

    // Réservations
    Reservation.countDocuments({ statut: 'en_attente' }),
    Reservation.countDocuments({
      statut: { $in: ['confirmee', 'en_cours'] },
      debutAt: { $gte: aujourd_hui_debut, $lte: endOfMonth(aujourd_hui_debut) },
    }),

    // Finances — caution EXCLUE
    Payment.aggregate([
      {
        $match: {
          statut: 'effectue',
          categorie: { $nin: CAUTION_CATEGORIES },
          createdAt: { $gte: debutMois, $lte: finMois },
        },
      },
      { $group: { _id: null, total: { $sum: '$montant' } } },
    ]),
    Expense.aggregate([
      {
        $match: {
          date: { $gte: debutMois, $lte: finMois },
        },
      },
      { $group: { _id: null, total: { $sum: '$montant' } } },
    ]),

    // Locations en retard
    Location.countDocuments({
      statut: 'en_cours',
      finPrevueAt: { $lt: now },
    }),
    Vehicle.find({ actif: { $ne: false } })
      .select('marque modele immatriculation kilometrage alerts')
      .lean(),
  ]);

  const activeAlerts = buildActiveVehicleAlerts(vehiculesAlertes);
  const ctEcheance = activeAlerts.filter((item) => item.type === 'ct').length;
  const vidangeEcheance = activeAlerts.filter((item) => item.type === 'vidange').length;
  const assuranceEcheance = activeAlerts.filter((item) => item.type === 'assurance').length;

  const revenusMoisTotal = revenusMois[0]?.total ?? 0;
  const depensesMoisTotal = depensesMois[0]?.total ?? 0;
  const beneficeMois = revenusMoisTotal - depensesMoisTotal;

  return NextResponse.json({
    vehicules: {
      total: totalVehicules,
      disponibles: vehiculesDisponibles,
      enLocation: vehiculesEnLocation,
      enMaintenance: vehiculesEnMaintenance,
      tauxOccupation:
        totalVehicules > 0
          ? Math.round((vehiculesEnLocation / totalVehicules) * 100)
          : 0,
    },
    clients: {
      total: totalClients,
      actifs: clientsActifs,
    },
    locations: {
      enCours: locationsEnCours,
      retard: alertesRetard,
    },
    reservations: {
      enAttente: reservationsEnAttente,
      aujourd_hui: reservationsAujourdhui,
    },
    finances: {
      revenusMois: revenusMoisTotal,
      depensesMois: depensesMoisTotal,
      beneficeMois,
    },
    alertes: {
      ctEcheance,
      vidangeEcheance,
      assuranceEcheance,
      locationsRetard: alertesRetard,
      total: ctEcheance + vidangeEcheance + assuranceEcheance + alertesRetard,
    },
  });
}
