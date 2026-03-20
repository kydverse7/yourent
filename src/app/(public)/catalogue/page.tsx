import { Metadata } from 'next';
import Link from 'next/link';
import { cookies } from 'next/headers';
import { connectDB } from '@/lib/db';
import { Vehicle } from '@/models/Vehicle';
import { toModelSlug } from '@/lib/utils';
import { ArrowRight, Sparkles } from 'lucide-react';
import { t as tr, tp, type Locale } from '@/lib/i18n';
import { CatalogueInfiniteGrid } from './_components/CatalogueInfiniteGrid';

export const metadata: Metadata = {
  title: 'Catalogue de voitures à louer à Casablanca | Yourent Maroc',
  description:
    'Parcourez notre catalogue de voitures à louer à Casablanca : berlines, SUV, voitures de luxe et économiques. Tarifs à partir de 200 DH/jour, réservation en ligne.',
  openGraph: {
    title: 'Catalogue de voitures à louer | Yourent Casablanca',
    description:
      'Trouvez la voiture idéale à louer à Casablanca. Large choix de véhicules premium et économiques.',
    url: 'https://yourent.ma/catalogue',
  },
  alternates: {
    canonical: 'https://yourent.ma/catalogue',
  },
};

export const revalidate = 120;

const PAGE_SIZE = 9;

function buildFilterUrl(
  current: Record<string, string>,
  key: string,
  value: string | undefined,
): string {
  const params = new URLSearchParams();
  for (const [k, v] of Object.entries(current)) {
    if (k !== key) params.set(k, v);
  }
  if (value) params.set(key, value);
  const qs = params.toString();
  return `/catalogue${qs ? `?${qs}` : ''}`;
}

async function getGroupedVehicles(searchParams: Record<string, string>) {
  await connectDB();

  const matchFilter: Record<string, any> = {
    actif: { $ne: false },
    isPublic: { $ne: false },
  };
  if (searchParams.type) matchFilter.categorie = searchParams.type;
  if (searchParams.marque) matchFilter.marque = searchParams.marque;

  const [groups, countResult, brands] = await Promise.all([
    Vehicle.aggregate([
      { $match: matchFilter },
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
    ]),
    Vehicle.aggregate([
      { $match: matchFilter },
      { $group: { _id: { marque: '$marque', modele: '$modele' } } },
      { $count: 'total' },
    ]),
    Vehicle.distinct('marque', {
      actif: { $ne: false },
      isPublic: { $ne: false },
    }),
  ]);

  const total = countResult[0]?.total ?? 0;

  const vehicles = groups.map((g: any) => ({
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
  }));

  return { vehicles, total, hasNext: false, brands: brands.sort() };
}

export default async function CataloguePage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string>>;
}) {
  const params = await searchParams;
  const cookieStore = await cookies();
  const locale = (cookieStore.get('locale')?.value === 'en' ? 'en' : 'fr') as Locale;
  const { vehicles, total, hasNext, brands } = await getGroupedVehicles(params);

  const types = ['economique', 'berline', 'suv', 'premium', 'utilitaire'];

  return (
    <div className="lux-container py-8 md:py-10">
      <div className="lux-page-head mb-8">
        <div className="space-y-2">
          <span className="lux-eyebrow">
            <Sparkles className="h-3.5 w-3.5" /> {tr(locale, 'cat.eyebrow')}
          </span>
          <h1 className="lux-title-sm">{tr(locale, 'cat.title')}</h1>
          <p className="lux-subtitle">
            {tp(locale, 'cat.subtitle', total)}
          </p>
        </div>
        <Link
          href="/login"
          className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-cream transition-colors hover:border-gold/20 hover:text-gold"
        >
          {tr(locale, 'nav.agency')} <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      {/* ── Sticky filter bar ── */}
      <div className="sticky top-20 z-20 -mx-2 rounded-2xl bg-noir-root/80 px-2 py-3 backdrop-blur-xl sm:-mx-0 sm:px-0">
        {/* Brand filter */}
        {brands.length > 1 && (
          <div className="lux-filter-bar mb-3">
            <Link
              href={buildFilterUrl(params, 'marque', undefined)}
              className={`rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] transition-colors ${
                !params.marque
                  ? 'bg-gold text-noir-root'
                  : 'border border-white/8 bg-white/5 text-cream-muted hover:text-cream'
              }`}
            >
              {tr(locale, 'cat.allBrands')}
            </Link>
            {brands.map((brand) => (
              <Link
                key={brand}
                href={buildFilterUrl(params, 'marque', brand)}
                className={`rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] transition-colors ${
                  params.marque === brand
                    ? 'bg-gold text-noir-root'
                    : 'border border-white/8 bg-white/5 text-cream-muted hover:text-cream'
                }`}
              >
                {brand}
              </Link>
            ))}
          </div>
        )}

        {/* Type filter */}
        <div className="lux-filter-bar">
          <Link
            href={buildFilterUrl(params, 'type', undefined)}
            className={`rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] transition-colors ${
              !params.type
                ? 'bg-gold text-noir-root'
                : 'border border-white/8 bg-white/5 text-cream-muted hover:text-cream'
            }`}
          >
            {tr(locale, 'cat.allTypes')}
          </Link>
          {types.map((t) => (
            <Link
              key={t}
              href={buildFilterUrl(params, 'type', t)}
              className={`rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] capitalize transition-colors ${
                params.type === t
                  ? 'bg-gold text-noir-root'
                  : 'border border-white/8 bg-white/5 text-cream-muted hover:text-cream'
              }`}
            >
              {t}
            </Link>
          ))}
        </div>
      </div>

      <div className="mt-6">
        {vehicles.length === 0 ? (
          <div className="lux-panel py-24 text-center text-cream-muted">
            <p className="text-lg">{tr(locale, 'cat.empty')}</p>
            <p className="mt-2 text-sm">{tr(locale, 'cat.emptyHint')}</p>
          </div>
        ) : (
          <CatalogueInfiniteGrid
            initialVehicles={vehicles}
            initialPage={1}
            initialHasNext={hasNext}
            total={total}
            type={params.type}
            marque={params.marque}
            limit={PAGE_SIZE}
          />
        )}
      </div>
    </div>
  );
}
