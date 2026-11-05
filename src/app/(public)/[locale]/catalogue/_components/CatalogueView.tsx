import { Metadata } from 'next';
import { Types } from 'mongoose';
import { connectDB } from '@/lib/db';
import { Vehicle } from '@/models/Vehicle';
import { parseSearchDateRange } from '@/lib/utils';
import { findBusyVehicleIds } from '@/services/vehicleAvailabilityService';
import { CalendarX2, Sparkles } from 'lucide-react';
import { t as tr, tp, type Locale } from '@/lib/i18n';
import { localePath } from '@/lib/i18n/routing';
import { getFleetStats } from '@/lib/seo/fleet';
import { breadcrumbNode, BUSINESS_ID, businessNode, jsonLdString } from '@/lib/seo/jsonLd';
import { buildMetadata, samePathAllLocales } from '@/lib/seo/metadata';
import type { SeoRouteKey } from '@/lib/seo/routes';
import { absoluteUrl } from '@/lib/site';
import { RelatedLinks } from '../../_components/seo/SeoBlocks';
import { buildCatalogueMatch, normalizeFilterValue, pickReadable, queryGroupedCatalogue } from '../_lib/catalogueQuery';
import { CatalogueInfiniteGrid } from './CatalogueInfiniteGrid';
import { CatalogueDateFilter } from './CatalogueDateFilter';

const CATALOGUE_META: Record<Locale, { title: string; description: (minPrice: number) => string }> = {
  fr: {
    title: 'Catalogue location de voitures à Casablanca | Yourent',
    description: (minPrice) =>
      `Toutes nos voitures à louer à Casablanca dès ${minPrice} DH/jour : citadines, SUV, berlines, Mercedes, Porsche, Range Rover. Disponibilité par dates, réservation en ligne.`,
  },
  en: {
    title: 'Car rental catalogue in Casablanca | Yourent',
    description: (minPrice) =>
      `All our cars for rent in Casablanca from ${minPrice} MAD/day: city cars, SUVs, sedans, Mercedes, Porsche, Range Rover. Check availability by date and book online.`,
  },
  ar: {
    title: 'كتالوج كراء السيارات في الدار البيضاء | Yourent',
    description: (minPrice) =>
      `جميع سياراتنا للكراء في الدار البيضاء ابتداءً من ${minPrice} درهم لليوم: سيارات المدينة والدفع الرباعي والسيدان ومرسيدس وبورش ورينج روفر. تحقق من التوفر واحجز عبر الإنترنت.`,
  },
};

/** Métadonnées communes : la canonical reste toujours celle du catalogue, sans paramètres. */
export async function catalogueMetadata(locale: Locale, noindex: boolean): Promise<Metadata> {
  const stats = await getFleetStats();
  return buildMetadata({
    locale,
    paths: samePathAllLocales('/catalogue'),
    title: CATALOGUE_META[locale].title,
    description: CATALOGUE_META[locale].description(stats.minPrice),
    noindex,
  });
}

const PAGE_SIZE = 24;

/** Pages proches de la première page de Google, liées depuis le catalogue. */
const NEARBY_PAGES: SeoRouteKey[] = ['aeroport', 'luxe', 'range-rover', 'maroc'];

type BrandOption = {
  value: string;
  label: string;
};

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

/**
 * Catalogue groupé par modèle, voir `queryGroupedCatalogue` pour la règle d'affichage.
 * Avec `busyObjectIds` (recherche par dates), `countDispo` compte les unités libres sur la plage.
 */
async function getGroupedVehicles(
  searchParams: Record<string, string>,
  busyObjectIds: Types.ObjectId[] | null,
) {
  await connectDB();

  const [{ models, total }, brandGroups] = await Promise.all([
    queryGroupedCatalogue({
      match: buildCatalogueMatch({ type: searchParams.type, marque: searchParams.marque }),
      busyObjectIds,
      skip: 0,
      limit: PAGE_SIZE,
    }),
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
          labels: { $addToSet: '$brandTrim' },
        },
      },
    ]),
  ]);

  const brands: BrandOption[] = brandGroups
    .map((brand: { _id: string; labels: string[] }) => ({
      value: normalizeFilterValue(brand._id),
      label: pickReadable(brand.labels),
    }))
    .sort((a, b) => a.label.localeCompare(b.label, 'fr', { sensitivity: 'base' }));

  return { vehicles: models, total, hasNext: total > PAGE_SIZE, brands };
}

/**
 * Le catalogue, partagé par `/catalogue` (sans paramètres, en cache) et par la route interne
 * `catalogue-recherche` (dates, marque ou type, sans cache).
 *
 * Toute adresse avec ces paramètres s'ouvre par une vraie navigation (`<a>`, `window.location`), jamais par
 * `Link` ou `router.push` : la page statique ne dépend pas des paramètres, le routeur client ne ferait donc
 * aucune requête et réafficherait `/catalogue` sans filtre, avec les dates dans l'adresse.
 */
export async function CatalogueView({ locale, params }: { locale: Locale; params: Record<string, string> }) {
  const selectedMarque = normalizeFilterValue(params.marque);

  // Recherche par dates : plage valide → véhicules occupés exclus du compteur de dispo.
  const dateRange = parseSearchDateRange(params.du, params.au);
  const busyObjectIds = dateRange
    ? [...(await findBusyVehicleIds({ debutAt: dateRange.debut, finAt: dateRange.fin }))].map(
        (id) => new Types.ObjectId(id),
      )
    : null;

  const [{ vehicles, total, hasNext, brands }, stats] = await Promise.all([
    getGroupedVehicles(params, busyObjectIds),
    getFleetStats(),
  ]);
  const subtitle = tp(locale, dateRange ? 'cat.subtitleDates' : 'cat.subtitle', total);
  const catalogueUrl = absoluteUrl(localePath(locale, '/catalogue'));
  const jsonLd = jsonLdString([
    businessNode(locale, stats),
    {
      '@type': 'OfferCatalog',
      '@id': `${catalogueUrl}#catalog`,
      name: `${tr(locale, 'cat.title')} | Yourent`,
      description: subtitle,
      url: catalogueUrl,
      numberOfItems: total,
      itemListElement: vehicles.slice(0, 20).map((v, i) => {
        const url = absoluteUrl(localePath(locale, `/catalogue/${v.modelSlug}`));
        return {
          '@type': 'ListItem',
          position: i + 1,
          item: {
            '@type': 'Car',
            name: `${v.marque} ${v.modele}`,
            url,
            image: v.featuredPhoto ? absoluteUrl(v.featuredPhoto) : undefined,
            offers: {
              '@type': 'Offer',
              url,
              priceCurrency: 'MAD',
              price: v.minTarif,
              availability: v.countDispo > 0
                ? 'https://schema.org/InStock'
                : 'https://schema.org/OutOfStock',
              seller: { '@id': BUSINESS_ID },
            },
          },
        };
      }),
    },
    breadcrumbNode(
      locale,
      [
        { name: tr(locale, 'nav.home'), path: '/' },
        { name: tr(locale, 'cat.breadcrumb'), path: '/catalogue' },
      ],
      '/catalogue',
    ),
  ]);

  return (
    <div className="lux-container py-8 md:py-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <div className="lux-page-head mb-8">
        <div className="space-y-2">
          <span className="lux-eyebrow">
            <Sparkles className="h-3.5 w-3.5" /> {tr(locale, 'cat.eyebrow')}
          </span>
          <h1 className="lux-title-sm">{tr(locale, 'cat.title')}</h1>
          <p className="lux-subtitle">
            {subtitle}
          </p>
        </div>

      </div>

      {/* ── Sticky filter bar ── */}
      <div className="top-20 z-20 -mx-2 [@media(min-height:600px)]:sticky rounded-2xl bg-noir-root/80 px-2 py-3 backdrop-blur-xl sm:-mx-0 sm:px-0">
        {/* Date availability filter */}
        <CatalogueDateFilter
          params={params}
          du={dateRange?.du}
          au={dateRange?.au}
        />

        {/* Brand filter */}
        {brands.length > 1 && (
          <div className="lux-filter-bar mt-2">
            <a
              href={localePath(locale, buildFilterUrl(params, 'marque', undefined))}
              className={`inline-flex min-h-11 items-center whitespace-nowrap rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] transition-colors ${
                !selectedMarque
                  ? 'bg-gold text-noir-root'
                  : 'border border-white/8 bg-white/5 text-cream-muted hover:text-cream'
              }`}
            >
              {tr(locale, 'cat.allBrands')}
            </a>
            {brands.map((brand) => (
              <a
                key={brand.value}
                href={localePath(locale, buildFilterUrl(params, 'marque', brand.value))}
                className={`inline-flex min-h-11 items-center whitespace-nowrap rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] transition-colors ${
                  selectedMarque === brand.value
                    ? 'bg-gold text-noir-root'
                    : 'border border-white/8 bg-white/5 text-cream-muted hover:text-cream'
                }`}
              >
                {brand.label}
              </a>
            ))}
          </div>
        )}
      </div>

      <div className="mt-6">
        {vehicles.length === 0 ? (
          dateRange ? (
            <div className="lux-panel flex flex-col items-center gap-4 py-24 text-center text-cream-muted">
              <CalendarX2 className="h-10 w-10 text-gold/50" />
              <p className="text-lg text-cream">{tr(locale, 'cat.datesEmpty')}</p>
              <p className="max-w-md text-sm">{tr(locale, 'cat.datesEmptyHint')}</p>
              <a
                href={localePath(locale, `/catalogue${selectedMarque ? `?marque=${encodeURIComponent(selectedMarque)}` : ''}${params.type ? `${selectedMarque ? '&' : '?'}type=${encodeURIComponent(params.type)}` : ''}`)}
                className="mt-2 inline-flex min-h-11 items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-5 py-2.5 text-xs font-bold uppercase tracking-[0.14em] text-gold transition-colors hover:bg-gold/20"
              >
                {tr(locale, 'cat.datesReset')}
              </a>
            </div>
          ) : (
            <div className="lux-panel py-24 text-center text-cream-muted">
              <p className="text-lg">{tr(locale, 'cat.empty')}</p>
              <p className="mt-2 text-sm">{tr(locale, 'cat.emptyHint')}</p>
            </div>
          )
        ) : (
          <CatalogueInfiniteGrid
            initialVehicles={vehicles}
            initialPage={1}
            initialHasNext={hasNext}
            total={total}
            type={params.type}
            marque={selectedMarque || undefined}
            limit={PAGE_SIZE}
            du={dateRange?.du}
            au={dateRange?.au}
          />
        )}
      </div>

      <div className="mt-12">
        <RelatedLinks
          locale={locale}
          items={NEARBY_PAGES.map((key) => ({ key, label: tr(locale, `footer.link.${key}`) }))}
        />
      </div>
    </div>
  );
}
