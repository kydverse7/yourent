import { Metadata } from 'next';
import { cache } from 'react';
import { notFound } from 'next/navigation';
import { connectDB } from '@/lib/db';
import { getModelCopy } from '@/content/models';
import { t as tr, tp, type Locale } from '@/lib/i18n';
import { localePath } from '@/lib/i18n/routing';
import { getFleetModels, getFleetStats, type FleetModel } from '@/lib/seo/fleet';
import { breadcrumbNode, businessNode, carNode, faqNode, jsonLdString, websiteNode } from '@/lib/seo/jsonLd';
import { buildMetadata, samePathAllLocales } from '@/lib/seo/metadata';
import { getRoutePath, type SeoRouteKey } from '@/lib/seo/routes';
import { Vehicle } from '@/models/Vehicle';
import { Agence } from '@/models/Agence';
import { getVehicleDisplayPrice, resolveVehiclePricing, toModelSlug, type SearchDateRange } from '@/lib/utils';
import { findBusyVehicleIds } from '@/services/vehicleAvailabilityService';
import { formatAmount, formatPrice } from '@/lib/format';
import { BUSINESS } from '@/lib/site';
import { EurHint, plainText, SeoFaq, SeoSections, VehicleCards, type TextTokens } from '../../../_components/seo/SeoBlocks';
import { SEO_LABELS } from '../../../_components/seo/seoLabels';
import { RatingLink } from '../../../_components/ui/actions';
import { Breadcrumbs, CtaBand, InlineCta, RelatedCards } from '../../../_components/ui/PageParts';
import { pickReadable } from '../../_lib/catalogueQuery';
import { VehicleModelView, type Variant } from './VehicleModelView';

type VehicleModelRow = {
  _id: string;
  slug: string;
  marque: string;
  modele: string;
  couleur?: string;
  carburant: string;
  boite: string;
  places: number;
  categorie: string;
  description?: string;
  photos?: string[];
  backgroundPhoto?: string | null;
  photoModele?: string | null;
  statut: 'disponible' | 'loue' | 'reserve' | 'maintenance';
  tarifParJour?: number;
  tarifParJour10Plus?: number;
  tarifParJour15Plus?: number;
  tarifParJour30Plus?: number;
  cautionDefaut?: number;
  updatedAt?: Date;
};

const PUBLIC_VEHICLE = { actif: { $ne: false }, isPublic: { $ne: false } };

/**
 * Toutes les unités publiques d'un modèle, louées comprises.
 * Le slug est calculé depuis marque + modèle et la casse varie en base (« Kia Sorento », « KIA SORENTO ») :
 * on cherche d'abord les graphies du modèle, puis on ne lit que ses unités.
 * `null` si aucun modèle public ne correspond au slug.
 */
const getModelUnits = cache(async (modelSlug: string): Promise<VehicleModelRow[] | null> => {
  await connectDB();
  const spellings = await Vehicle.aggregate<{ _id: { marque?: string; modele?: string } }>([
    { $match: PUBLIC_VEHICLE },
    { $group: { _id: { marque: '$marque', modele: '$modele' } } },
  ]);
  const matching = spellings
    .map((row) => row._id)
    .filter(({ marque, modele }) => marque?.trim() && modele?.trim() && toModelSlug(marque, modele) === modelSlug);
  if (matching.length === 0) return null;

  return Vehicle.find({ ...PUBLIC_VEHICLE, $or: matching })
    .select(
      'marque modele couleur carburant boite places categorie description photos backgroundPhoto photoModele slug statut tarifParJour tarifParJour10Plus tarifParJour15Plus tarifParJour30Plus cautionDefaut updatedAt',
    )
    .sort({ tarifParJour: 1 })
    .lean<VehicleModelRow[]>();
});

function toVariant(row: VehicleModelRow): Variant {
  const pricing = resolveVehiclePricing(row);
  return {
    _id: String(row._id),
    slug: row.slug,
    couleur: row.couleur,
    carburant: row.carburant,
    transmission: row.boite,
    places: row.places,
    categorie: row.categorie,
    description: row.description,
    photos: row.photos ?? [],
    featuredPhoto: row.backgroundPhoto ?? row.photoModele ?? row.photos?.[0] ?? null,
    tarifJour: pricing.tarifJour,
    tarifJour10Plus: pricing.tarifJour10Plus,
    displayTarifJour: getVehicleDisplayPrice(row),
  };
}

const positiveMin = (values: number[]) => {
  const positive = values.filter((value) => value > 0);
  return positive.length > 0 ? Math.min(...positive) : 0;
};

/** Le modèle tel que vu par les données structurées, calculé depuis les unités lues à l'instant. */
function toFleetModel(modelSlug: string, units: VehicleModelRow[], countDispo: number): FleetModel {
  const variants = units.map(toVariant);
  const updatedAt = units.reduce((latest, unit) => Math.max(latest, unit.updatedAt?.getTime() ?? 0), 0);
  return {
    slug: modelSlug,
    marque: pickReadable(units.map((unit) => unit.marque.trim())),
    modele: pickReadable(units.map((unit) => unit.modele.trim())),
    categorie: units[0].categorie ?? '',
    carburant: units[0].carburant ?? '',
    boites: [...new Set(units.map((unit) => unit.boite).filter(Boolean))],
    places: units[0].places ?? 0,
    minTarif: positiveMin(variants.map((variant) => variant.tarifJour)),
    highSeason: false,
    minTarifLong: positiveMin(variants.map((variant) => variant.tarifJour10Plus || variant.tarifJour)),
    minCaution: positiveMin(units.map((unit) => Number(unit.cautionDefaut ?? 0))),
    count: units.length,
    countDispo,
    photo: variants.find((variant) => variant.featuredPhoto)?.featuredPhoto ?? null,
    updatedAt: new Date(updatedAt).toISOString(),
  };
}

const MODEL_META: Record<
  Locale,
  {
    title: (name: string, price: number) => string;
    description: (name: string, price: number) => string;
    imageAlt: (name: string) => string;
  }
> = {
  fr: {
    title: (name, price) => `Location ${name} à Casablanca${price > 0 ? ` dès ${price} DH/j` : ''} | Yourent`,
    description: (name, price) =>
      `${name} à louer à Casablanca${price > 0 ? ` dès ${price} DH/jour` : ''}. Livraison gratuite à l’aéroport Mohammed V et en ville, 5 jours minimum. Réservez en ligne.`,
    imageAlt: (name) => `${name} à louer à Casablanca`,
  },
  en: {
    title: (name, price) => `${name} rental in Casablanca${price > 0 ? ` from ${price} MAD/day` : ''} | Yourent`,
    description: (name, price) =>
      `${name} for rent in Casablanca${price > 0 ? ` from ${price} MAD/day` : ''}. Free delivery at Mohammed V airport and across the city, 5-day minimum. Book online.`,
    imageAlt: (name) => `${name} for rent in Casablanca`,
  },
  ar: {
    title: (name, price) => `كراء ${name} في الدار البيضاء${price > 0 ? ` ابتداءً من ${price} درهم/اليوم` : ''} | Yourent`,
    description: (name, price) =>
      `${name} للكراء في الدار البيضاء${price > 0 ? ` ابتداءً من ${price} درهم لليوم` : ''}. توصيل مجاني إلى مطار محمد الخامس وداخل المدينة، لمدة 5 أيام على الأقل. احجز عبر الإنترنت.`,
    imageAlt: (name) => `${name} للكراء في الدار البيضاء`,
  },
};

const BRAND_PAGES: { prefix: string; key: SeoRouteKey; label: string }[] = [
  { prefix: 'mercedes', key: 'mercedes', label: 'Mercedes' },
  { prefix: 'range-rover', key: 'range-rover', label: 'Range Rover' },
  { prefix: 'porsche', key: 'porsche', label: 'Porsche' },
  { prefix: 'volkswagen', key: 'volkswagen', label: 'Volkswagen' },
  { prefix: 'audi', key: 'audi', label: 'Audi' },
];

/** Métadonnées communes : la canonical reste toujours la fiche, sans paramètres. */
export async function modelMetadata(locale: Locale, slug: string, noindex: boolean): Promise<Metadata> {
  const units = await getModelUnits(slug);
  if (!units) {
    return {
      title: { absolute: `${SEO_LABELS[locale].notFoundTitle} | Yourent` },
      robots: { index: false, follow: false },
    };
  }

  const model = toFleetModel(slug, units, 0);
  const name = `${model.marque} ${model.modele}`;
  const meta = MODEL_META[locale];
  const fullTitle = meta.title(name, model.minTarif);

  return buildMetadata({
    locale,
    paths: samePathAllLocales(`/catalogue/${slug}`),
    // Au-delà de 60 caractères, Google tronque : on retire le prix, qui reste dans la description.
    title: [...fullTitle].length <= 60 ? fullTitle : meta.title(name, 0),
    description: meta.description(name, model.minTarif),
    image: model.photo ? { url: model.photo, alt: meta.imageAlt(name) } : undefined,
    noindex,
  });
}

const getHighSeasonSetting = cache(async () => {
  await connectDB();
  const agence = await Agence.findOne().select('parametres.highSeason').lean();
  return agence?.parametres?.highSeason ?? false;
});

/** Trois modèles proches : même catégorie d'abord, puis le prix le plus proche. */
function findSimilarModels(models: FleetModel[], current: FleetModel): FleetModel[] {
  const outOfCategory = (model: FleetModel) => (model.categorie === current.categorie ? 0 : 1);
  const priceGap = (model: FleetModel) => Math.abs(model.minTarif - current.minTarif);
  return models
    .filter((model) => model.slug !== current.slug)
    .sort((a, b) => outOfCategory(a) - outOfCategory(b) || priceGap(a) - priceGap(b))
    .slice(0, 3);
}

/** En français, l'article suit l'usage : « un » SUV, « une » berline ou citadine. */
function frenchArticle(model: FleetModel): string {
  return model.categorie === 'suv' || /^(porsche|range rover)/i.test(model.marque) ? 'un' : 'une';
}

/**
 * La fiche d'un modèle, partagée par `/catalogue/[slug]` (sans dates, en cache) et par la route
 * interne `catalogue-recherche/[slug]` (avec dates, sans cache).
 */
export async function VehicleModelContent({
  locale,
  slug,
  dateRange,
}: {
  locale: Locale;
  slug: string;
  dateRange: SearchDateRange | null;
}) {
  const units = await getModelUnits(slug);
  if (!units || units.length === 0) notFound();

  const [highSeason, fleetModels, stats, busy] = await Promise.all([
    getHighSeasonSetting(),
    getFleetModels(),
    getFleetStats(),
    // Avec des dates : locations, réservations et maintenance sur la plage. Sans dates : statut du jour.
    dateRange ? findBusyVehicleIds({ debutAt: dateRange.debut, finAt: dateRange.fin }) : null,
  ]);

  const bookable = units.filter((unit) =>
    busy !== null ? !busy.has(String(unit._id)) : unit.statut === 'disponible',
  );
  const variants = bookable.map(toVariant).sort((a, b) => a.displayTarifJour - b.displayTarifJour);
  const allVariants = units.map(toVariant);
  const fallbackUnit = allVariants.find((variant) => variant.featuredPhoto) ?? allVariants[0];

  const model = toFleetModel(slug, units, bookable.length);
  const { marque, modele, minTarif, minCaution } = model;
  const name = `${marque} ${modele}`;
  const longRate = highSeason ? minTarif : model.minTarifLong;
  const displayedPrice = dateRange ? positiveMin(variants.map((variant) => variant.tarifJour)) || minTarif : minTarif;

  const labels = SEO_LABELS[locale];
  const copy = getModelCopy(slug, locale);
  const path = `/catalogue/${slug}`;
  const prices = units.map((unit) => getVehicleDisplayPrice(unit)).filter((price) => price > 0);
  const tokens: TextTokens = {
    minPrice: minTarif,
    maxPrice: prices.length > 0 ? Math.max(...prices) : minTarif,
    fleetMin: stats.minPrice,
    vehicleCount: stats.vehicleCount,
    modelCount: stats.modelCount,
    prices: Object.fromEntries(fleetModels.map((fleetModel) => [fleetModel.slug, fleetModel.minTarif])),
  };
  const faq = (copy?.faq ?? []).map((item) => ({
    q: plainText(item.q, tokens),
    a: plainText(item.a, tokens),
  }));

  const breadcrumbLabel = tr(locale, 'cat.breadcrumb');
  const jsonLd = jsonLdString([
    websiteNode(locale),
    businessNode(locale, stats),
    carNode(locale, model, name),
    breadcrumbNode(
      locale,
      [
        { name: labels.home, path: '/' },
        { name: breadcrumbLabel, path: '/catalogue' },
        { name, path },
      ],
      path,
    ),
    ...(faq.length > 0 ? [faqNode(locale, faq, path)] : []),
  ]);

  const similar = findSimilarModels(fleetModels, model);
  const brandPage = BRAND_PAGES.find((brand) => slug.startsWith(`${brand.prefix}-`));
  /* Pages liées : aéroport, marque, catégorie, tarifs, conditions. */
  const CATEGORY_PAGES: Record<string, SeoRouteKey> = { economique: 'economique', suv: 'suv' };
  const categoryPage = CATEGORY_PAGES[model.categorie];
  const related: { key: SeoRouteKey; label: string }[] = [
    { key: 'aeroport', label: tr(locale, 'model.linkAirport') },
    ...(brandPage
      ? [{ key: brandPage.key, label: tr(locale, 'model.linkBrand').replace('{brand}', brandPage.label) }]
      : []),
    ...(categoryPage ? [{ key: categoryPage, label: tr(locale, `footer.link.${categoryPage}`) }] : []),
    { key: 'tarifs', label: tr(locale, 'footer.link.tarifs') },
    { key: 'conditions', label: tr(locale, 'footer.link.conditions') },
  ];
  const relatedLinks = related.flatMap((item) => {
    const href = getRoutePath(item.key, locale);
    return href ? [{ href, label: item.label }] : [];
  });

  const h2 = tr(locale, 'model.copyTitle')
    .replace('{article}', frenchArticle(model))
    .replace('{name}', name);
  const statusLabel = dateRange ? tr(locale, 'model.unavailableDates') : tr(locale, 'model.rented');
  const facts = [
    ...(displayedPrice > 0 ? [tr(locale, 'ui.factFrom').replace('{price}', formatPrice(displayedPrice, locale))] : []),
    tr(locale, 'ui.factMinDays').replace('{count}', String(BUSINESS.minRentalDays)),
    ...(minCaution > 0 ? [tr(locale, 'ui.deposit').replace('{price}', formatPrice(minCaution, locale))] : []),
  ];
  const waMessage = tr(locale, 'model.waMessage').replace('{name}', name);

  return (
    <div className="lux-container pt-6 lg:pt-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />

      <header className="mb-6">
        <Breadcrumbs
          locale={locale}
          items={[
            { name: labels.home, path: '/' },
            { name: breadcrumbLabel, path: '/catalogue' },
            { name },
          ]}
        />
        <h1 className="t-h1-page mt-3">{tr(locale, 'model.h1').replace('{name}', name)}</h1>
        <ul className="mt-3 flex flex-wrap gap-x-2 gap-y-1 text-base text-cream-muted">
          {facts.map((fact, index) => (
            <li key={fact} className="flex items-center gap-2">
              {index > 0 && <span aria-hidden="true" className="text-gold">·</span>}
              <span className={index === 0 ? 'font-semibold text-gold-light' : undefined}>{fact}</span>
            </li>
          ))}
        </ul>
        <div className="mt-1 flex flex-wrap items-center gap-x-4">
          <RatingLink locale={locale} />
          {variants.length === 0 && (
            <span className="chip border-gold/40 text-gold-light">{statusLabel}</span>
          )}
        </div>
      </header>

      <VehicleModelView
        key={dateRange ? `${dateRange.du}_${dateRange.au}` : 'sans-dates'}
        variants={variants}
        fallbackUnit={fallbackUnit}
        modelSlug={slug}
        marque={marque}
        modele={modele}
        highSeason={highSeason}
        initialDu={dateRange?.du}
        initialAu={dateRange?.au}
        intro={
          minTarif > 0 ? (
            <p className="t-body prose-col">
              {tr(locale, 'model.intro').replace('{name}', name).replace('{price}', formatAmount(minTarif, locale))}
            </p>
          ) : undefined
        }
      >
        <div className="space-y-12 pb-4 pt-4 lg:pt-6">
          {copy && copy.paragraphs.length > 0 && (
            <SeoSections
              sections={[{ h2, blocks: copy.paragraphs.map((text) => ({ type: 'p' as const, text })) }]}
              locale={locale}
              tokens={tokens}
              vehicles={[]}
            />
          )}

          <InlineCta locale={locale} message={waMessage} />

          <section aria-labelledby="model-rates" className="cv-auto">
            <h2 id="model-rates" className="t-h2">
              {tr(locale, 'model.ratesTitle').replace('{name}', name)}
            </h2>
            <div className="card mt-5 px-4 sm:px-6">
              <table className="w-full text-[0.9375rem]">
                <tbody className="divide-y divide-white/[0.06]">
                  <tr>
                    <th scope="row" className="py-3.5 pe-4 text-start font-medium text-cream-muted">{labels.pricingShort}</th>
                    <td className="py-3.5 text-end font-semibold text-cream">
                      <bdi>{formatPrice(minTarif, locale)}</bdi>
                      {labels.perDay}
                      <EurHint mad={minTarif} locale={locale} />
                    </td>
                  </tr>
                  <tr>
                    <th scope="row" className="py-3.5 pe-4 text-start font-medium text-cream-muted">{labels.pricingLong}</th>
                    <td className="py-3.5 text-end font-semibold text-cream">
                      <bdi>{formatPrice(longRate, locale)}</bdi>
                      {labels.perDay}
                      <EurHint mad={longRate} locale={locale} />
                    </td>
                  </tr>
                  <tr>
                    <th scope="row" className="py-3.5 pe-4 text-start font-medium text-cream-muted">{labels.pricingDeposit}</th>
                    <td className="py-3.5 text-end font-semibold text-cream">
                      {minCaution > 0 ? <bdi>{formatPrice(minCaution, locale)}</bdi> : labels.onRequest}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="mt-3 text-sm text-cream-faint">{labels.pricingNote}</p>
          </section>

          <div className="cv-auto">
            <SeoFaq locale={locale} items={copy?.faq ?? []} tokens={tokens} />
          </div>

          {similar.length > 0 && (
            <section aria-labelledby="model-similar" className="cv-auto">
              <h2 id="model-similar" className="t-h2 mb-5">
                {tr(locale, 'model.similarTitle')}
              </h2>
              <VehicleCards locale={locale} vehicles={similar} />
            </section>
          )}

          <div className="cv-auto">
            <RelatedCards title={labels.relatedTitle} items={relatedLinks} />
          </div>
        </div>
      </VehicleModelView>

      <CtaBand locale={locale} minPrice={stats.minPrice} />
    </div>
  );
}
