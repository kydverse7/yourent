import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { loadPageContent } from '@/content/pages';
import type { PageContent } from '@/content/types';
import { isLocale } from '@/lib/i18n/routing';
import type { Locale } from '@/lib/i18n/translations';
import { filterFleet, getFleetModels, getFleetStats, type FleetModel } from '@/lib/seo/fleet';
import {
  breadcrumbNode,
  businessNode,
  carNode,
  faqNode,
  jsonLdString,
  websiteNode,
} from '@/lib/seo/jsonLd';
import { buildMetadata } from '@/lib/seo/metadata';
import { allSeoParams, findRouteBySlug, getRoutePaths, type SeoRouteKey } from '@/lib/seo/routes';
import { plainText, RelatedLinks, resolveTokens, SeoFaq, SeoSections, type TextTokens } from '../_components/seo/SeoBlocks';
import { Breadcrumbs, SeoFinalCta, SeoHead } from '../_components/seo/SeoShell';
import { SEO_LABELS } from '../_components/seo/seoLabels';

type Props = { params: Promise<{ locale: string; seoSlug: string }> };

export const revalidate = 300;
export const dynamicParams = false;

export function generateStaticParams() {
  return allSeoParams();
}

async function resolvePage(locale: string, slug: string) {
  if (!isLocale(locale)) return null;
  const key = findRouteBySlug(locale, slug);
  if (!key) return null;
  const localized = await loadPageContent(key);
  const content = localized?.[locale];
  if (!content) return null;
  return { key, content, locale };
}

function buildTokens(
  selection: FleetModel[],
  models: FleetModel[],
  stats: { minPrice: number; maxPrice: number; vehicleCount: number; modelCount: number },
): TextTokens {
  const prices = selection.map((model) => model.minTarif).filter((price) => price > 0);
  return {
    minPrice: prices.length > 0 ? Math.min(...prices) : stats.minPrice,
    maxPrice: prices.length > 0 ? Math.max(...prices) : stats.maxPrice,
    fleetMin: stats.minPrice,
    vehicleCount: stats.vehicleCount,
    modelCount: stats.modelCount,
    prices: Object.fromEntries(models.map((model) => [model.slug, model.minTarif])),
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, seoSlug } = await params;
  const page = await resolvePage(locale, seoSlug);
  if (!page) return {};

  const [models, stats] = await Promise.all([getFleetModels(), getFleetStats()]);
  const tokens = buildTokens(filterFleet(models, page.content.vehicles), models, stats);

  return buildMetadata({
    locale: page.locale,
    paths: getRoutePaths(page.key),
    title: resolveTokens(page.content.metaTitle, tokens),
    description: resolveTokens(page.content.metaDescription, tokens),
  });
}

async function relatedLabels(keys: SeoRouteKey[], locale: Locale) {
  const items = await Promise.all(
    keys.map(async (key) => {
      const related = await loadPageContent(key);
      const content: PageContent | undefined = related?.[locale];
      return content ? { key, label: content.breadcrumb } : null;
    }),
  );
  return items.filter((item): item is { key: SeoRouteKey; label: string } => item !== null);
}

export default async function SeoPage({ params }: Props) {
  const { locale: rawLocale, seoSlug } = await params;
  const page = await resolvePage(rawLocale, seoSlug);
  if (!page) notFound();

  const { content, locale } = page;
  const [models, stats, related] = await Promise.all([
    getFleetModels(),
    getFleetStats(),
    relatedLabels(content.related, locale),
  ]);

  const selection = filterFleet(models, content.vehicles);
  const tokens = buildTokens(selection, models, stats);
  const labels = SEO_LABELS[locale];
  const path = `/${seoSlug}`;
  const faq = content.faq.map((item) => ({
    q: plainText(item.q, tokens),
    a: plainText(item.a, tokens),
  }));

  const jsonLd = jsonLdString([
    websiteNode(locale),
    businessNode(locale, stats),
    breadcrumbNode(
      locale,
      [
        { name: labels.home, path: '/' },
        { name: content.breadcrumb, path },
      ],
      path,
    ),
    ...(faq.length > 0 ? [faqNode(locale, faq, path)] : []),
    ...selection.map((model) => carNode(locale, model, `${model.marque} ${model.modele}`)),
  ]);

  return (
    <div className="lux-container py-8 md:py-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <Breadcrumbs items={[{ name: labels.home, path: '/' }, { name: content.breadcrumb }]} />
      <div className="max-w-4xl">
        <SeoHead
          locale={locale}
          eyebrow={content.eyebrow}
          h1={resolveTokens(content.h1, tokens)}
          intro={plainText(content.intro, tokens)}
        />
      </div>
      <div className="mt-12 space-y-12">
        <SeoSections sections={content.sections} locale={locale} tokens={tokens} vehicles={selection} />
        <SeoFaq locale={locale} items={content.faq} tokens={tokens} />
        <RelatedLinks locale={locale} items={related} />
        <SeoFinalCta locale={locale} title={resolveTokens(content.h1, tokens)} />
      </div>
    </div>
  );
}
