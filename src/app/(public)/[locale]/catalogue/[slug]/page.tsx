import { Metadata } from 'next';
import { cache } from 'react';
import { notFound } from 'next/navigation';
import Link from '@/lib/i18n/LocaleLink';
import { connectDB } from '@/lib/db';
import { getModelCopy } from '@/content/models';
import { t as tr, tp, type Locale } from '@/lib/i18n';
import { isLocale } from '@/lib/i18n/routing';
import { getFleetModels, getFleetStats, type FleetModel } from '@/lib/seo/fleet';
import { breadcrumbNode, businessNode, carNode, faqNode, jsonLdString } from '@/lib/seo/jsonLd';
import { buildMetadata, samePathAllLocales } from '@/lib/seo/metadata';
import type { SeoRouteKey } from '@/lib/seo/routes';
import { Vehicle } from '@/models/Vehicle';
import { Agence } from '@/models/Agence';
import { getVehicleDisplayPrice, parseSearchDateRange, resolveVehiclePricing, toModelSlug } from '@/lib/utils';
import { findBusyVehicleIds } from '@/services/vehicleAvailabilityService';
import { Check, ChevronLeft, Sparkles } from 'lucide-react';
import { plainText, RelatedLinks, SeoFaq, SeoSections, VehicleCards, type TextTokens } from '../../_components/seo/SeoBlocks';
import { Breadcrumbs } from '../../_components/seo/SeoShell';
import { SEO_LABELS } from '../../_components/seo/seoLabels';
import { pickReadable } from '../_lib/catalogueQuery';
import { VehicleModelView, type Variant } from './_components/VehicleModelView';

type Props = {
  params: Promise<{ locale: string; slug: string }>;
  searchParams: Promise<Record<string, string>>;
};

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
      `${name} للكراء في الدار البيضاء${price > 0 ? ` ابتداءً من ${price} درهم لليوم` : ''}. توصيل مجاني إلى مطار محمد الخامس وداخل المدينة، ومدة الكراء 5 أيام على الأقل. احجز عبر الإنترنت.`,
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

export async function generateMetadata({ params, searchParams }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isLocale(locale)) return {};

  const [units, sp] = await Promise.all([getModelUnits(slug), searchParams]);
  if (!units) {
    return {
      title: { absolute: `${SEO_LABELS[locale].notFoundTitle} | Yourent` },
      robots: { index: false, follow: false },
    };
  }

  const model = toFleetModel(slug, units, 0);
  const name = `${model.marque} ${model.modele}`;
  const meta = MODEL_META[locale];

  return buildMetadata({
    locale,
    paths: samePathAllLocales(`/catalogue/${slug}`),
    title: meta.title(name, model.minTarif),
    description: meta.description(name, model.minTarif),
    image: model.photo ? { url: model.photo, alt: meta.imageAlt(name) } : undefined,
    noindex: Boolean(sp.du || sp.au),
  });
}

export const revalidate = 300;

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

export default async function VehicleModelPage({ params, searchParams }: Props) {
  const { locale: rawLocale, slug } = await params;
  if (!isLocale(rawLocale)) notFound();
  const locale: Locale = rawLocale;

  const sp = await searchParams;
  const dateRange = parseSearchDateRange(sp.du, sp.au);
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

  const backHref = dateRange
    ? `/catalogue?du=${dateRange.du}&au=${dateRange.au}`
    : '/catalogue';

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
  const related: { key: SeoRouteKey; label: string }[] = [
    { key: 'aeroport', label: tr(locale, 'model.linkAirport') },
    ...(brandPage
      ? [{ key: brandPage.key, label: tr(locale, 'model.linkBrand').replace('{brand}', brandPage.label) }]
      : []),
  ];

  const h2 = tr(locale, 'model.copyTitle')
    .replace('{article}', frenchArticle(model))
    .replace('{name}', name);
  const included = [tr(locale, 'model.included1'), tr(locale, 'model.included2'), tr(locale, 'model.included3')];
  const statusLabel = dateRange ? tr(locale, 'model.unavailableDates') : tr(locale, 'model.rented');

  return (
    <div className="lux-container py-8 md:py-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />

      <Breadcrumbs
        items={[
          { name: labels.home, path: '/' },
          { name: breadcrumbLabel, path: '/catalogue' },
          { name },
        ]}
      />

      <div className="mb-6 flex items-center justify-between gap-3">
        <Link
          href={backHref}
          className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-cream-muted transition-colors hover:text-gold"
        >
          <ChevronLeft className="h-4 w-4 rtl:rotate-180" /> {tr(locale, 'model.back')}
        </Link>
        <span className="hidden md:inline">
          <span className="lux-eyebrow">
            <Sparkles className="h-3.5 w-3.5" />{' '}
            {variants.length > 1
              ? tp(locale, 'model.countAvailable', variants.length)
              : tr(locale, 'model.sheetLabel')}
          </span>
        </span>
      </div>

      <header className="mb-6 max-w-4xl space-y-3">
        <h1 className="lux-title-sm text-cream">
          {tr(locale, 'model.h1').replace('{name}', name)}
        </h1>
        {minTarif > 0 && (
          <p className="lux-subtitle">
            {tr(locale, 'model.intro').replace('{name}', name).replace('{price}', String(minTarif))}
          </p>
        )}
        {variants.length === 0 && (
          <p className="inline-flex rounded-full border border-gold/25 bg-gold/10 px-4 py-1.5 text-sm font-semibold text-gold">
            {statusLabel}
          </p>
        )}
      </header>

      <VehicleModelView
        key={dateRange ? `${dateRange.du}_${dateRange.au}` : 'sans-dates'}
        variants={variants}
        fallbackUnit={fallbackUnit}
        modelSlug={slug}
        modelMinTarif={displayedPrice}
        marque={marque}
        modele={modele}
        highSeason={highSeason}
        initialDu={dateRange?.du}
        initialAu={dateRange?.au}
      />

      <div className="mt-12 space-y-12">
        {copy && copy.paragraphs.length > 0 && (
          <SeoSections
            sections={[
              { h2, blocks: copy.paragraphs.map((text) => ({ type: 'p' as const, text })) },
            ]}
            locale={locale}
            tokens={tokens}
            vehicles={[]}
          />
        )}

        <div className="grid gap-5 md:grid-cols-2">
          <section className="lux-panel p-6 md:p-7">
            <h2 className="text-2xl font-bold text-cream">
              {tr(locale, 'model.pricesTitle').replace('{name}', name)}
            </h2>
            <table className="mt-5 w-full text-sm">
              <tbody className="divide-y divide-white/5">
                <tr>
                  <th scope="row" className="py-3 pe-4 text-start font-medium text-cream-muted">{labels.pricingShort}</th>
                  <td className="py-3 text-end font-semibold text-cream">
                    {minTarif} DH{labels.perDay}
                  </td>
                </tr>
                <tr>
                  <th scope="row" className="py-3 pe-4 text-start font-medium text-cream-muted">{labels.pricingLong}</th>
                  <td className="py-3 text-end font-semibold text-cream">
                    {longRate} DH{labels.perDay}
                  </td>
                </tr>
                <tr>
                  <th scope="row" className="py-3 pe-4 text-start font-medium text-cream-muted">{labels.pricingDeposit}</th>
                  <td className="py-3 text-end font-semibold text-cream">
                    {minCaution > 0 ? `${minCaution} DH` : labels.onRequest}
                  </td>
                </tr>
              </tbody>
            </table>
            <p className="mt-3 text-xs text-cream-faint">{labels.pricingNote}</p>
          </section>

          <section className="lux-panel p-6 md:p-7">
            <h2 className="text-2xl font-bold text-cream">{tr(locale, 'model.includedTitle')}</h2>
            <ul className="mt-5 space-y-3 text-sm leading-relaxed text-cream-muted">
              {included.map((item) => (
                <li key={item} className="flex items-start gap-2.5">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-gold" /> {item}
                </li>
              ))}
            </ul>
          </section>
        </div>

        <SeoFaq locale={locale} items={copy?.faq ?? []} tokens={tokens} />

        {similar.length > 0 && (
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-cream">{tr(locale, 'model.similarTitle')}</h2>
            <VehicleCards locale={locale} vehicles={similar} />
          </section>
        )}

        <RelatedLinks locale={locale} items={related} />
      </div>
    </div>
  );
}
