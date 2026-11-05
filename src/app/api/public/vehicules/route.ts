import { NextRequest } from 'next/server';
import { Types } from 'mongoose';
import { connectDB } from '@/lib/db';
import { Vehicle } from '@/models/Vehicle';
import { apiPaginated } from '@/lib/apiHelpers';
import { parsePaginationParams, parseSearchDateRange, resolveVehiclePricing } from '@/lib/utils';
import { findBusyVehicleIds } from '@/services/vehicleAvailabilityService';
import { rateLimit } from '@/lib/rateLimit';
import { buildCatalogueMatch, queryGroupedCatalogue } from '@/app/(public)/[locale]/catalogue/_lib/catalogueQuery';

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

  const match = buildCatalogueMatch({
    type: searchParams.get('type'),
    marque: searchParams.get('marque'),
    q: searchParams.get('q'),
  });

  // Recherche par dates : les véhicules occupés sur la plage ne comptent pas comme libres.
  const dateRange = parseSearchDateRange(searchParams.get('du'), searchParams.get('au'));
  const busyObjectIds = dateRange
    ? [...(await findBusyVehicleIds({ debutAt: dateRange.debut, finAt: dateRange.fin }))].map(
        (id) => new Types.ObjectId(id),
      )
    : null;

  // Défilement infini du catalogue : même lecture et même règle que la page.
  if (searchParams.get('grouped') === 'true') {
    const { models, total } = await queryGroupedCatalogue({ match, busyObjectIds, skip, limit });
    return apiPaginated(models, { total, page, limit });
  }

  // Non-grouped mode
  const filter = busyObjectIds !== null ? { ...match, _id: { $nin: busyObjectIds } } : match;
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
