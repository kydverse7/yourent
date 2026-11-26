import { Metadata } from 'next';
import { Types } from 'mongoose';
import { connectDB } from '@/lib/db';
import { Vehicle } from '@/models/Vehicle';
import { parseSearchDateRange } from '@/lib/utils';
import { findBusyVehicleIds } from '@/services/vehicleAvailabilityService';
import { CalendarCheck, CalendarX2 } from 'lucide-react';
import { t as tr, tp, type Locale } from '@/lib/i18n';
import { localePath } from '@/lib/i18n/routing';
import { getFleetStats } from '@/lib/seo/fleet';
import { breadcrumbNode, BUSINESS_ID, businessNode, jsonLdString, websiteNode } from '@/lib/seo/jsonLd';
import { buildMetadata, samePathAllLocales } from '@/lib/seo/metadata';
import { getRoutePath, type SeoRouteKey } from '@/lib/seo/routes';
import { absoluteUrl } from '@/lib/site';
import { CtaBand, PageHeader, RelatedCards } from '../../_components/ui/PageParts';
import { VehicleCard, type CardVehicle } from '../../_components/ui/VehicleCard';
import { buildCatalogueMatch, normalizeFilterValue, pickReadable, queryGroupedCatalogue, type CatalogueModel } from '../_lib/catalogueQuery';
import { CatalogueDateFilter } from './CatalogueDateFilter';
import { CatalogueTools } from './CatalogueTools';

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

/** Toute la flotte tient sur une page (moins de 30 modèles) : pas de chargement au défilement. */
const PAGE_SIZE = 100;

/** Pages liées depuis le catalogue. */
const NEARBY_PAGES: SeoRouteKey[] = ['aeroport', 'luxe', 'suv', 'economique', 'automatique', 'longue-duree', 'tarifs', 'maroc'];

function toCard(model: CatalogueModel): CardVehicle {
  return {
    slug: model.modelSlug,
    marque: model.marque,
    modele: model.modele,
    categorie: model.categorie,
    places: model.places,
    carburant: model.carburant,
    boites: model.transmission ? [model.transmission] : [],
    minTarif: model.minTarif,
    available: model.countDispo > 0,
    photo: model.featuredPhoto,
  };
}

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

  return { vehicles: models, total, brands };
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

  const [{ vehicles, total, brands }, stats] = await Promise.all([
    getGroupedVehicles(params, busyObjectIds),
    getFleetStats(),
  ]);
  const subtitle = tp(locale, dateRange ? 'cat.subtitleDates' : 'cat.subtitle', total);
  const catalogueUrl = absoluteUrl(localePath(locale, '/catalogue'));
  const jsonLd = jsonLdString([
    websiteNode(locale),
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

  const dateQuery = dateRange ? `?du=${dateRange.du}&au=${dateRange.au}` : '';
  const shortDate = (iso: string) => `${iso.slice(8, 10)}/${iso.slice(5, 7)}`;
  const brandChip =
    'inline-flex min-h-11 shrink-0 items-center whitespace-nowrap rounded-full border px-4 text-[0.9375rem] font-semibold transition-colors';
  const resetHref = localePath(
    locale,
    `/catalogue${selectedMarque ? `?marque=${encodeURIComponent(selectedMarque)}` : ''}${params.type ? `${selectedMarque ? '&' : '?'}type=${encodeURIComponent(params.type)}` : ''}`,
  );

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <div className="lux-container pb-6 pt-6 lg:pt-8">
        <PageHeader
          locale={locale}
          crumbs={[{ name: tr(locale, 'nav.home'), path: '/' }, { name: tr(locale, 'cat.breadcrumb') }]}
          title={tr(locale, 'cat.title')}
          intro={subtitle}
        />
      </div>

      <div className="lux-container pb-4">
        {/* Filtres collants dans ce bloc seulement : ils ne recouvrent jamais le pied de page. */}
        <div className="sticky top-16 z-20 -mx-4 border-b border-white/[0.06] bg-noir-root px-4 py-2 md:mx-0 md:px-0 lg:top-[72px]">
          <CatalogueDateFilter params={params} du={dateRange?.du} au={dateRange?.au}>
            {brands.length > 1 && (
              <>
                <a
                  href={localePath(locale, buildFilterUrl(params, 'marque', undefined))}
                  aria-current={!selectedMarque ? 'page' : undefined}
                  className={`${brandChip} ${!selectedMarque ? 'border-gold bg-gold text-[#120f09]' : 'border-white/10 text-cream-muted hover:text-cream'}`}
                >
                  {tr(locale, 'cat.allBrands')}
                </a>
                {brands.map((brand) => (
                  <a
                    key={brand.value}
                    href={localePath(locale, buildFilterUrl(params, 'marque', brand.value))}
                    aria-current={selectedMarque === brand.value ? 'page' : undefined}
                    className={`${brandChip} ${
                      selectedMarque === brand.value ? 'border-gold bg-gold text-[#120f09]' : 'border-white/10 text-cream-muted hover:text-cream'
                    }`}
                  >
                    {brand.label}
                  </a>
                ))}
              </>
            )}
          </CatalogueDateFilter>
        </div>

        <div className="mt-5">
          {vehicles.length === 0 ? (
            dateRange ? (
              <div className="panel flex flex-col items-center gap-4 px-5 py-16 text-center">
                <CalendarX2 className="h-10 w-10 text-gold/60" aria-hidden="true" />
                <p className="t-h3">{tr(locale, 'cat.datesEmpty')}</p>
                <p className="t-small max-w-md">{tr(locale, 'cat.datesEmptyHint')}</p>
                <a href={resetHref} className="btn btn-secondary mt-2">
                  {tr(locale, 'cat.datesReset')}
                </a>
              </div>
            ) : (
              <div className="panel px-5 py-16 text-center">
                <p className="t-h3">{tr(locale, 'cat.empty')}</p>
                <p className="t-small mt-2">{tr(locale, 'cat.emptyHint')}</p>
              </div>
            )
          ) : (
            <>
              <CatalogueTools gridId="catalogue-grid" />
              <ul id="catalogue-grid" className="grid grid-cols-1 gap-3 min-[360px]:grid-cols-2 sm:gap-4 lg:grid-cols-3 xl:grid-cols-4">
                {vehicles.map((vehicle, index) => (
                  <li
                    key={vehicle.modelSlug}
                    data-name={`${vehicle.marque} ${vehicle.modele}`.toLowerCase()}
                    data-price={vehicle.minTarif}
                    className={index >= 4 ? '[contain-intrinsic-size:auto_440px] [content-visibility:auto]' : undefined}
                  >
                    <VehicleCard
                      vehicle={toCard(vehicle)}
                      locale={locale}
                      headingLevel="h2"
                      priority={index === 0}
                      eager={index < 3}
                      sizes="(min-width: 1280px) 280px, (min-width: 1024px) 31vw, 46vw"
                      href={dateQuery ? localePath(locale, `/catalogue/${vehicle.modelSlug}${dateQuery}`) : undefined}
                      hardNavigation={Boolean(dateQuery)}
                      note={
                        dateRange ? (
                          <p className="flex items-center gap-2 text-sm font-medium text-gold-light">
                            <CalendarCheck className="h-4 w-4 shrink-0" aria-hidden="true" />
                            {tr(locale, 'cat.availDates')
                              .replace('{du}', shortDate(dateRange.du))
                              .replace('{au}', shortDate(dateRange.au))}
                          </p>
                        ) : undefined
                      }
                    />
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      </div>

      <div className="lux-container sec cv-auto">
        <RelatedCards
          title={tr(locale, 'ui.related')}
          items={NEARBY_PAGES.flatMap((key) => {
            const href = getRoutePath(key, locale);
            return href ? [{ href, label: tr(locale, `footer.link.${key}`) }] : [];
          })}
        />
      </div>
      <CtaBand locale={locale} minPrice={stats.minPrice} />
    </>
  );
}
