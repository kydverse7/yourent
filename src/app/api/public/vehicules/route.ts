import { NextRequest } from 'next/server';
import { connectDB } from '@/lib/db';
import { Vehicle } from '@/models/Vehicle';
import { apiPaginated } from '@/lib/apiHelpers';
import { parsePaginationParams, resolveVehiclePricing, toModelSlug } from '@/lib/utils';
import { rateLimit } from '@/lib/rateLimit';

function normalizeFilterValue(value: string | null): string {
  return value?.trim().toLowerCase().replace(/\s+/g, ' ') ?? '';
}

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

type PublicVehiclesFilter = Record<string, unknown>;

type GroupedVehicleRow = {
  marque: string;
  modele: string;
  count: number;
  countDispo: number;
  firstTarifParJour: number;
  firstCautionDefaut: number;
  categorie?: string;
  places?: number;
  carburant?: string;
  boite?: string;
  backgroundPhoto?: string | null;
  photoModele?: string | null;
  firstPhoto?: string | null;
};

type PublicVehicleRow = {
  _id: string;
  type?: string;
  categorie?: string;
  transmission?: string;
  boite?: string;
  tarifParJour?: number;
  tarifParJour10Plus?: number;
  tarifParJour15Plus?: number;
  tarifParJour30Plus?: number;
  tarifJour?: number;
  tarifJour10Plus?: number;
  backgroundPhoto?: string | null;
  photoModele?: string | null;
  photos?: string[];
  [key: string]: unknown;
};

// Catalogue public — pas d'auth requise
export async function GET(req: NextRequest) {
  const limited = await rateLimit('general', req.headers.get('x-forwarded-for') ?? 'anonymous');
  if (!limited.success) return new Response(JSON.stringify({ error: 'Trop de requêtes' }), { status: 429 });

  await connectDB();

  const { searchParams } = req.nextUrl;
  const { page, limit, skip } = parsePaginationParams(searchParams);

  const filter: PublicVehiclesFilter = {
    actif: { $ne: false },
    isPublic: { $ne: false },
  };

  const type = searchParams.get('type')?.trim();
  if (type) filter.categorie = type;

  const marque = normalizeFilterValue(searchParams.get('marque'));
  if (marque) {
    filter.marque = {
      $regex: `^\\s*${escapeRegExp(marque)}\\s*$`,
      $options: 'i',
    };
  }

  const q = searchParams.get('q')?.trim();
  if (q) filter.$text = { $search: q };

  const grouped = searchParams.get('grouped') === 'true';

  if (grouped) {
    const [groups, countResult] = await Promise.all([
      Vehicle.aggregate([
        { $match: filter },
        {
          $addFields: {
            marqueNorm: { $toLower: { $trim: { input: { $ifNull: ['$marque', ''] } } } },
            modeleNorm: { $toLower: { $trim: { input: { $ifNull: ['$modele', ''] } } } },
            marqueDisplay: { $trim: { input: { $ifNull: ['$marque', ''] } } },
            modeleDisplay: { $trim: { input: { $ifNull: ['$modele', ''] } } },
            availabilityRank: { $cond: [{ $eq: ['$statut', 'disponible'] }, 0, 1] },
            tarifParJourSafe: { $ifNull: ['$tarifParJour', 0] },
            cautionDefautSafe: { $ifNull: ['$cautionDefaut', 0] },
          },
        },
        { $match: { marqueNorm: { $ne: '' }, modeleNorm: { $ne: '' } } },
        { $sort: { availabilityRank: 1, tarifParJourSafe: 1 } },
        {
          $group: {
            _id: { marque: '$marqueNorm', modele: '$modeleNorm' },
            marque: { $first: '$marqueDisplay' },
            modele: { $first: '$modeleDisplay' },
            count: { $sum: 1 },
            countDispo: { $sum: { $cond: [{ $eq: ['$statut', 'disponible'] }, 1, 0] } },
            firstTarifParJour: { $first: '$tarifParJourSafe' },
            firstCautionDefaut: { $first: '$cautionDefautSafe' },
            categorie: { $first: '$categorie' },
            places: { $first: '$places' },
            carburant: { $first: '$carburant' },
            boite: { $first: '$boite' },
            backgroundPhoto: { $first: '$backgroundPhoto' },
            photoModele: { $first: '$photoModele' },
            firstPhoto: { $first: { $arrayElemAt: ['$photos', 0] } },
          },
        },
        { $match: { countDispo: { $gt: 0 } } },
        { $sort: { firstTarifParJour: 1 } },
        { $skip: skip },
        { $limit: limit },
      ]),
      Vehicle.aggregate([
        { $match: filter },
        {
          $addFields: {
            marqueNorm: { $toLower: { $trim: { input: { $ifNull: ['$marque', ''] } } } },
            modeleNorm: { $toLower: { $trim: { input: { $ifNull: ['$modele', ''] } } } },
          },
        },
        { $match: { marqueNorm: { $ne: '' }, modeleNorm: { $ne: '' } } },
        {
          $group: {
            _id: { marque: '$marqueNorm', modele: '$modeleNorm' },
            countDispo: { $sum: { $cond: [{ $eq: ['$statut', 'disponible'] }, 1, 0] } },
          },
        },
        { $match: { countDispo: { $gt: 0 } } },
        { $count: 'total' },
      ]),
    ]);

    const total = countResult[0]?.total ?? 0;

    return apiPaginated(
      (groups as GroupedVehicleRow[]).map((g) => ({
        modelSlug: toModelSlug(g.marque, g.modele),
        marque: g.marque,
        modele: g.modele,
        count: g.count,
        countDispo: g.countDispo,
        minTarif: g.firstTarifParJour > 0 ? g.firstTarifParJour : 0,
        minCaution: g.firstCautionDefaut > 0 ? g.firstCautionDefaut : 0,
        categorie: g.categorie,
        places: g.places,
        carburant: g.carburant,
        transmission: g.boite,
        featuredPhoto: g.backgroundPhoto ?? g.photoModele ?? g.firstPhoto ?? null,
      })),
      { total, page, limit },
    );
  }

  // Non-grouped mode
  const [items, total] = await Promise.all([
    Vehicle.find(filter)
      .select('marque modele annee type categorie places transmission boite carburant tarifParJour tarifParJour10Plus tarifParJour15Plus tarifParJour30Plus photos backgroundPhoto photoModele slug description')
      .sort({ tarifParJour: 1 })
      .skip(skip)
      .limit(limit)
      .lean<PublicVehicleRow[]>(),
    Vehicle.countDocuments(filter),
  ]);

  return apiPaginated(
    items.map((item) => {
      const pricing = resolveVehiclePricing(item);
      return {
        ...item,
        _id: String(item._id),
        type: item.type ?? item.categorie,
        transmission: item.transmission ?? item.boite,
        tarifJour: pricing.tarifJour,
        tarifJour10Plus: pricing.tarifJour10Plus,
        featuredPhoto: item.backgroundPhoto ?? item.photoModele ?? item.photos?.[0] ?? null,
      };
    }),
    { total, page, limit },
  );
}
