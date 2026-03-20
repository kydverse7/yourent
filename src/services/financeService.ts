import { connectDB } from '@/lib/db';
import { Payment } from '@/models/Payment';
import { Location } from '@/models/Location';
import { Expense } from '@/models/Expense';

/**
 * ⚠️ RÈGLE ABSOLUE : les catégories 'caution' et 'caution_restitution'
 * sont TOUJOURS exclues de tous les calculs de ce service.
 * La caution est une garantie, PAS un revenu.
 */
const EXCLUDE_CAUTION = { categorie: { $nin: ['caution', 'caution_restitution'] } };

export interface FinanceSummary {
  revenus: number;       // CA location (hors caution)
  depenses: number;      // Total dépenses
  marge: number;         // Revenus - Dépenses
  margePercent: number;  // Marge / Revenus * 100
  cautionEnCours: number;
  nbLocations: number;
  revenuMoyen: number;
  parModesPaiement: Record<string, number>;
}

/**
 * Résumé financier sur une période.
 * ⚠️ La caution est systématiquement exclue.
 */
export async function getFinanceSummary(debut: Date, fin: Date): Promise<FinanceSummary> {
  await connectDB();

  const [revenusAgg, depensesAgg, nbLocations, parModes, cautionAgg] = await Promise.all([
    // Revenus = paiements effectués hors caution
    Payment.aggregate([
      {
        $match: {
          ...EXCLUDE_CAUTION,
          statut: 'effectue',
          createdAt: { $gte: debut, $lte: fin },
        },
      },
      { $group: { _id: null, total: { $sum: '$montant' } } },
    ]),

    // Dépenses
    Expense.aggregate([
      { $match: { date: { $gte: debut, $lte: fin } } },
      { $group: { _id: null, total: { $sum: '$montant' } } },
    ]),

    // Nombre de locations terminées sur la période
    Location.countDocuments({
      statut: 'terminee',
      debutAt: { $gte: debut, $lte: fin },
    }),

    // Répartition par mode de paiement (hors caution)
    Payment.aggregate([
      {
        $match: {
          ...EXCLUDE_CAUTION,
          statut: 'effectue',
          createdAt: { $gte: debut, $lte: fin },
        },
      },
      { $group: { _id: '$type', total: { $sum: '$montant' } } },
    ]),

    // Cautions actuellement en cours / non restituées
    Location.aggregate([
      {
        $match: {
          'caution.statut': { $in: ['en_attente', 'prise', 'restituee_partiel'] },
          createdAt: { $gte: debut, $lte: fin },
        },
      },
      { $group: { _id: null, total: { $sum: '$caution.montant' } } },
    ]),
  ]);

  const revenus = revenusAgg[0]?.total ?? 0;
  const depenses = depensesAgg[0]?.total ?? 0;
  const cautionEnCours = cautionAgg[0]?.total ?? 0;
  const marge = revenus - depenses;
  const margePercent = revenus > 0 ? (marge / revenus) * 100 : 0;

  const parModesPaiement: Record<string, number> = {};
  for (const m of parModes) {
    parModesPaiement[m._id] = m.total;
  }

  return {
    revenus,
    depenses,
    marge,
    margePercent: Math.round(margePercent * 100) / 100,
    cautionEnCours,
    nbLocations,
    revenuMoyen: nbLocations > 0 ? Math.round(revenus / nbLocations) : 0,
    parModesPaiement,
  };
}

/**
 * Revenus par véhicule sur une période (hors caution).
 */
export async function getRevenusParVehicule(debut: Date, fin: Date) {
  await connectDB();

  return Payment.aggregate([
    {
      $match: {
        ...EXCLUDE_CAUTION,
        statut: 'effectue',
        createdAt: { $gte: debut, $lte: fin },
        location: { $exists: true },
      },
    },
    {
      $lookup: {
        from: 'locations',
        localField: 'location',
        foreignField: '_id',
        as: 'locationDoc',
      },
    },
    { $unwind: '$locationDoc' },
    {
      $lookup: {
        from: 'vehicles',
        localField: 'locationDoc.vehicle',
        foreignField: '_id',
        as: 'vehicle',
        pipeline: [{ $project: { marque: 1, modele: 1, immatriculation: 1 } }],
      },
    },
    { $unwind: '$vehicle' },
    {
      $group: {
        _id: '$vehicle._id',
        marque: { $first: '$vehicle.marque' },
        modele: { $first: '$vehicle.modele' },
        immatriculation: { $first: '$vehicle.immatriculation' },
        revenus: { $sum: '$montant' },
        nbLocations: { $addToSet: '$location' },
      },
    },
    {
      $project: {
        _id: 1,
        marque: 1,
        modele: 1,
        immatriculation: 1,
        revenus: 1,
        nbLocations: { $size: '$nbLocations' },
      },
    },
    { $sort: { revenus: -1 } },
  ]);
}

/**
 * Données graphique revenus/dépenses par jour sur une période.
 */
export async function getChartRevenusDepenses(debut: Date, fin: Date) {
  await connectDB();

  const [revenus, depenses] = await Promise.all([
    Payment.aggregate([
      {
        $match: {
          ...EXCLUDE_CAUTION,
          statut: 'effectue',
          createdAt: { $gte: debut, $lte: fin },
        },
      },
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
          total: { $sum: '$montant' },
        },
      },
      { $sort: { _id: 1 } },
    ]),
    Expense.aggregate([
      { $match: { date: { $gte: debut, $lte: fin } } },
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m-%d', date: '$date' } },
          total: { $sum: '$montant' },
        },
      },
      { $sort: { _id: 1 } },
    ]),
  ]);

  const depensesMap = new Map(depenses.map((item) => [item._id, item.total]));
  const revenusMap = new Map(revenus.map((item) => [item._id, item.total]));
  const keys = Array.from(new Set([...revenusMap.keys(), ...depensesMap.keys()])).sort();

  return keys.map((key) => ({
    mois: key,
    revenus: revenusMap.get(key) ?? 0,
    depenses: depensesMap.get(key) ?? 0,
  }));
}
