import { Metadata } from 'next';
import Link from 'next/link';
import { cookies } from 'next/headers';
import { connectDB } from '@/lib/db';
import { Vehicle } from '@/models/Vehicle';
import { toModelSlug } from '@/lib/utils';
import { Sparkles } from 'lucide-react';
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

const PAGE_SIZE = 24;

type BrandOption = {
  value: string;
  label: string;
};

function normalizeFilterValue(value?: string): string {
  return value?.trim().toLowerCase().replace(/\s+/g, ' ') ?? '';
}

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}



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
  if (searchParams.type?.trim()) matchFilter.categorie = searchParams.type.trim();

  const normalizedMarque = normalizeFilterValue(searchParams.marque);
  if (normalizedMarque) {
    matchFilter.marque = {
      $regex: `^\\s*${escapeRegExp(normalizedMarque)}\\s*$`,
      $options: 'i',
    };
  }

  const [groups, countResult, brandGroups] = await Promise.all([
    Vehicle.aggregate([
      { $match: matchFilter },
      {
        $addFields: {
          marqueNorm: { $toLower: { $trim: { input: { $ifNull: ['$marque', ''] } } } },
          modeleNorm: { $toLower: { $trim: { input: { $ifNull: ['$modele', ''] } } } },
          marqueDisplay: { $trim: { input: { $ifNull: ['$marque', ''] } } },
          modeleDisplay: { $trim: { input: { $ifNull: ['$modele', ''] } } },
        },
      },
      { $match: { marqueNorm: { $ne: '' }, modeleNorm: { $ne: '' } } },
      { $sort: { tarifParJour: -1 } },
      {
        $group: {
          _id: { marque: '$marqueNorm', modele: '$modeleNorm' },
          marque: { $first: '$marqueDisplay' },
          modele: { $first: '$modeleDisplay' },
          count: { $sum: 1 },
          countDispo: { $sum: { $cond: [{ $eq: ['$statut', 'disponible'] }, 1, 0] } },
          firstTarifParJour: { $first: '$tarifParJour' },
          categorie: { $first: '$categorie' },
          places: { $first: '$places' },
          carburant: { $first: '$carburant' },
          boite: { $first: '$boite' },
          backgroundPhoto: { $first: '$backgroundPhoto' },
          photoModele: { $first: '$photoModele' },
          firstPhoto: { $first: { $arrayElemAt: ['$photos', 0] } },
        },
      },
      { $sort: { firstTarifParJour: 1 } },
      { $limit: PAGE_SIZE },
    ]),
    Vehicle.aggregate([
      { $match: matchFilter },
      {
        $addFields: {
          marqueNorm: { $toLower: { $trim: { input: { $ifNull: ['$marque', ''] } } } },
          modeleNorm: { $toLower: { $trim: { input: { $ifNull: ['$modele', ''] } } } },
        },
      },
      { $match: { marqueNorm: { $ne: '' }, modeleNorm: { $ne: '' } } },
      { $group: { _id: { marque: '$marqueNorm', modele: '$modeleNorm' } } },
      { $count: 'total' },
    ]),
    Vehicle.aggregate([
      {
        $match: {
          actif: { $ne: false },
          isPublic: { $ne: false },
        },
      },
      {
        $project: {
          brandTrim: { $trim: { input: { $ifNull: ['$marque', ''] } } },
        },
      },
      { $match: { brandTrim: { $ne: '' } } },
      {
        $group: {
          _id: { $toLower: '$brandTrim' },
          label: { $first: '$brandTrim' },
        },
      },
    ]),
  ]);

  const total = countResult[0]?.total ?? 0;
  const brands: BrandOption[] = brandGroups
    .map((brand: { _id: string; label: string }) => ({
      value: normalizeFilterValue(brand._id),
      label: brand.label,
    }))
    .sort((a, b) => a.label.localeCompare(b.label, 'fr', { sensitivity: 'base' }));

  const vehicles = groups.map((g: any) => ({
    modelSlug: toModelSlug(g.marque, g.modele),
    marque: g.marque,
    modele: g.modele,
    count: g.count,
    countDispo: g.countDispo,
    minTarif: g.firstTarifParJour > 0 ? g.firstTarifParJour : 0,
    categorie: g.categorie,
    places: g.places,
    carburant: g.carburant,
    transmission: g.boite,
    featuredPhoto: g.backgroundPhoto ?? g.photoModele ?? g.firstPhoto ?? null,
  }));

  return { vehicles, total, hasNext: total > PAGE_SIZE, brands: brands.sort() };
}

export default async function CataloguePage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string>>;
}) {
  const params = await searchParams;
  const selectedMarque = normalizeFilterValue(params.marque);
  const cookieStore = await cookies();
  const locale = (cookieStore.get('locale')?.value === 'en' ? 'en' : 'fr') as Locale;
  const { vehicles, total, hasNext, brands } = await getGroupedVehicles(params);
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'OfferCatalog',
        '@id': 'https://yourent.ma/catalogue#catalog',
        name: `${tr(locale, 'cat.title')} — Yourent`,
        description: tp(locale, 'cat.subtitle', total),
        url: 'https://yourent.ma/catalogue',
        numberOfItems: total,
        itemListElement: vehicles.slice(0, 20).map((v, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          item: {
            '@type': 'Car',
            name: `${v.marque} ${v.modele}`,
            url: `https://yourent.ma/catalogue/${v.modelSlug}`,
            image: v.featuredPhoto || undefined,
            offers: {
              '@type': 'Offer',
              priceCurrency: 'MAD',
              price: v.minTarif,
              availability: v.countDispo > 0
                ? 'https://schema.org/InStock'
                : 'https://schema.org/OutOfStock',
            },
          },
        })),
      },
      {
        '@type': 'BreadcrumbList',
        '@id': 'https://yourent.ma/catalogue#breadcrumb',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: tr(locale, 'nav.home'),
            item: 'https://yourent.ma',
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: tr(locale, 'cat.title'),
            item: 'https://yourent.ma/catalogue',
          },
        ],
      },
    ],
  };

  return (
    <div className="lux-container py-8 md:py-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />
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

      </div>

      {/* ── Sticky filter bar ── */}
      <div className="sticky top-20 z-20 -mx-2 rounded-2xl bg-noir-root/80 px-2 py-3 backdrop-blur-xl sm:-mx-0 sm:px-0">
        {/* Brand filter */}
        {brands.length > 1 && (
          <div className="lux-filter-bar">
            <Link
              href={buildFilterUrl(params, 'marque', undefined)}
              className={`whitespace-nowrap rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] transition-colors ${
                !selectedMarque
                  ? 'bg-gold text-noir-root'
                  : 'border border-white/8 bg-white/5 text-cream-muted hover:text-cream'
              }`}
            >
              {tr(locale, 'cat.allBrands')}
            </Link>
            {brands.map((brand) => (
              <Link
                key={brand.value}
                href={buildFilterUrl(params, 'marque', brand.value)}
                className={`whitespace-nowrap rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] transition-colors ${
                  selectedMarque === brand.value
                    ? 'bg-gold text-noir-root'
                    : 'border border-white/8 bg-white/5 text-cream-muted hover:text-cream'
                }`}
              >
                {brand.label}
              </Link>
            ))}
          </div>
        )}
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
            marque={selectedMarque || undefined}
            limit={PAGE_SIZE}
          />
        )}
      </div>
    </div>
  );
}
