import { unstable_cache } from 'next/cache';
import { connectDB } from '@/lib/db';
import KpiCard from '@/components/dashboard/KpiCard';

const getCachedDashboardData = unstable_cache(
  async () => {
    await connectDB();

    const { Vehicle } = await import('@/models/Vehicle');
    const { Client } = await import('@/models/Client');
    const { Location } = await import('@/models/Location');
    const { Reservation } = await import('@/models/Reservation');
    const { Payment } = await import('@/models/Payment');
    const { Expense } = await import('@/models/Expense');
    const { startOfMonth, endOfMonth } = await import('date-fns');

    const now = new Date();
    const CAUTION_CATEGORIES = ['caution', 'caution_restitution'];

    const [
      totalVehicules,
      disponibles,
      enLocation,
      totalClients,
      locationsEnCours,
      retard,
      enAttente,
      revenues,
      depenses,
    ] = await Promise.all([
      Vehicle.countDocuments({ actif: { $ne: false } }),
      Vehicle.countDocuments({ actif: { $ne: false }, statut: 'disponible' }),
      Vehicle.countDocuments({ actif: { $ne: false }, statut: 'loue' }),
      Client.countDocuments({ actif: true }),
      Location.countDocuments({ statut: 'en_cours' }),
      Location.countDocuments({ statut: 'en_cours', finPrevueAt: { $lt: now } }),
      Reservation.countDocuments({ statut: 'en_attente' }),
      Payment.aggregate([
        { $match: { statut: 'effectue', categorie: { $nin: CAUTION_CATEGORIES }, createdAt: { $gte: startOfMonth(now), $lte: endOfMonth(now) } } },
        { $group: { _id: null, total: { $sum: '$montant' } } },
      ]),
      Expense.aggregate([
        { $match: { date: { $gte: startOfMonth(now), $lte: endOfMonth(now) } } },
        { $group: { _id: null, total: { $sum: '$montant' } } },
      ]),
    ]);

    return {
      totalVehicules,
      disponibles,
      enLocation,
      totalClients,
      locationsEnCours,
      retard,
      enAttente,
      revenusMois: revenues[0]?.total ?? 0,
      depensesMois: depenses[0]?.total ?? 0,
      beneficeMois: (revenues[0]?.total ?? 0) - (depenses[0]?.total ?? 0),
      tauxOccupation: totalVehicules > 0 ? Math.round((enLocation / totalVehicules) * 100) : 0,
    };
  },
  ['dashboard-stats'],
  { revalidate: 60 },
);

export default async function DashboardStats() {
  const d = await getCachedDashboardData();

  const kpis = [
    {
      title: 'Véhicules',
      value: d.totalVehicules,
      subtitle: `${d.disponibles} disponibles · ${d.enLocation} en location`,
      iconName: 'car' as const,
      format: 'number' as const,
    },
    {
      title: 'Taux d\'occupation',
      value: d.tauxOccupation,
      iconName: 'activity' as const,
      format: 'percent' as const,
      trend: d.tauxOccupation >= 70 ? 5 : -5,
    },
    {
      title: 'Clients actifs',
      value: d.totalClients,
      iconName: 'users' as const,
      format: 'number' as const,
    },
    {
      title: 'Locations en cours',
      value: d.locationsEnCours,
      subtitle: d.retard > 0 ? `⚠️ ${d.retard} en retard` : 'Aucun retard',
      iconName: 'mapPin' as const,
      format: 'number' as const,
    },
    {
      title: 'Réservations en attente',
      value: d.enAttente,
      iconName: 'calendar' as const,
      format: 'number' as const,
    },
    {
      title: 'Revenus du mois',
      value: d.revenusMois,
      iconName: 'dollarSign' as const,
      format: 'currency' as const,
      trend: d.revenusMois > 0 ? 8 : 0,
    },
    {
      title: 'Dépenses du mois',
      value: d.depensesMois,
      iconName: 'trendingUp' as const,
      format: 'currency' as const,
      invertTrend: true,
    },
    {
      title: 'Bénéfice net',
      value: d.beneficeMois,
      iconName: 'trendingUp' as const,
      format: 'currency' as const,
      trend: d.beneficeMois > 0 ? 12 : -5,
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {kpis.map((kpi) => (
        <KpiCard key={kpi.title} {...kpi} />
      ))}
    </div>
  );
}
