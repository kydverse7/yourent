import { NextRequest } from 'next/server';
import { connectDB } from '@/lib/db';
import { Vehicle } from '@/models/Vehicle';
import { apiPaginated } from '@/lib/apiHelpers';
import { parsePaginationParams, resolveVehiclePricing, toModelSlug } from '@/lib/utils';
import { rateLimit } from '@/lib/rateLimit';

// Catalogue public — pas d'auth requise
export async function GET(req: NextRequest) {
  const limited = await rateLimit('general', req.headers.get('x-forwarded-for') ?? 'anonymous');
  if (!limited.success) return new Response(JSON.stringify({ error: 'Trop de requêtes' }), { status: 429 });

  await connectDB();

  const { searchParams } = req.nextUrl;
  const { page, limit, skip } = parsePaginationParams(searchParams);

  const filter: Record<string, any> = {
    actif: { $ne: false },
    isPublic: { $ne: false },
  };

  const type = searchParams.get('type');
  if (type) filter.categorie = type;

  const marque = searchParams.get('marque');
  if (marque) filter.marque = marque;

  const q = searchParams.get('q');
  if (q) filter.$text = { $search: q };

  const grouped = searchParams.get('grouped') === 'true';

  if (grouped) {
    const [groups, countResult] = await Promise.all([
      Vehicle.aggregate([
        { $match: filter },
        { $sort: { tarifParJour: 1 } },
        {
          $group: {
            _id: { marque: '$marque', modele: '$modele' },
            marque: { $first: '$marque' },
            modele: { $first: '$modele' },
            count: { $sum: 1 },
            countDispo: { $sum: { $cond: [{ $eq: ['$statut', 'disponible'] }, 1, 0] } },
            minTarifRaw: { $min: { $cond: [{ $gt: ['$tarifParJour', 0] }, '$tarifParJour', 999999999] } },
            categorie: { $first: '$categorie' },
            places: { $first: '$places' },
            carburant: { $first: '$carburant' },
            boite: { $first: '$boite' },
            backgroundPhoto: { $first: '$backgroundPhoto' },
            photoModele: { $first: '$photoModele' },
            firstPhoto: { $first: { $arrayElemAt: ['$photos', 0] } },
          },
        },
        { $sort: { minTarifRaw: 1 } },
        { $skip: skip },
        { $limit: limit },
      ]),
      Vehicle.aggregate([
        { $match: filter },
        { $group: { _id: { marque: '$marque', modele: '$modele' } } },
        { $count: 'total' },
      ]),
    ]);

    const total = countResult[0]?.total ?? 0;

    return apiPaginated(
      groups.map((g: any) => ({
        modelSlug: toModelSlug(g.marque, g.modele),
        marque: g.marque,
        modele: g.modele,
        count: g.count,
        countDispo: g.countDispo,
        minTarif: g.minTarifRaw >= 999999999 ? 0 : g.minTarifRaw,
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
      .lean(),
    Vehicle.countDocuments(filter),
  ]);

  return apiPaginated(
    items.map((item: any) => {
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
