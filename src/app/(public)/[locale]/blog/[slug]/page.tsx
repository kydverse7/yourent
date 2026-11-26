import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ARTICLES, findArticle } from '@/content/blog';
import { loadPageContent } from '@/content/pages';
import { getFleetModels, getFleetStats } from '@/lib/seo/fleet';
import { t as tr } from '@/lib/i18n/translations';
import { BUSINESS_ID, breadcrumbNode, businessNode, faqNode, jsonLdString, WEBSITE_ID, websiteNode } from '@/lib/seo/jsonLd';
import { buildMetadata } from '@/lib/seo/metadata';
import type { SeoRouteKey } from '@/lib/seo/routes';
import { absoluteUrl } from '@/lib/site';
import {
  plainText,
  RelatedLinks,
  resolveTokens,
  RichText,
  SeoFaq,
  SeoSections,
  SeoToc,
  type TextTokens,
} from '../../_components/seo/SeoBlocks';
import { SEO_LABELS } from '../../_components/seo/seoLabels';
import { Breadcrumbs, CtaBand, InlineCta, RelatedCards } from '../../_components/ui/PageParts';
import { formatArticleDate, readingMinutes } from '../blogMeta';

type Props = { params: Promise<{ locale: string; slug: string }> };

export const revalidate = 3600;
export const dynamicParams = false;

export function generateStaticParams() {
  return ARTICLES.map((article) => ({ locale: 'fr', slug: article.slug }));
}

async function getTokens(): Promise<TextTokens> {
  const [models, stats] = await Promise.all([getFleetModels(), getFleetStats()]);
  return {
    minPrice: stats.minPrice,
    maxPrice: stats.maxPrice,
    fleetMin: stats.minPrice,
    vehicleCount: stats.vehicleCount,
    modelCount: stats.modelCount,
    prices: Object.fromEntries(models.map((model) => [model.slug, model.minTarif])),
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const article = locale === 'fr' ? findArticle(slug) : undefined;
  if (!article) return {};
  const tokens = await getTokens();
  return buildMetadata({
    locale: 'fr',
    paths: { fr: `/blog/${article.slug}` },
    title: resolveTokens(article.metaTitle, tokens),
    description: resolveTokens(article.metaDescription, tokens),
    type: 'article',
  });
}

export default async function ArticlePage({ params }: Props) {
  const { locale, slug } = await params;
  const article = locale === 'fr' ? findArticle(slug) : undefined;
  if (!article) notFound();

  const labels = SEO_LABELS.fr;
  const path = `/blog/${article.slug}`;
  const [tokens, stats] = await Promise.all([getTokens(), getFleetStats()]);
  const related = (
    await Promise.all(
      article.related.map(async (key) => {
        const content = (await loadPageContent(key))?.fr;
        return content ? { key, label: content.breadcrumb } : null;
      }),
    )
  ).filter((item): item is { key: SeoRouteKey; label: string } => item !== null);

  const faq = article.faq.map((item) => ({ q: plainText(item.q, tokens), a: plainText(item.a, tokens) }));
  const jsonLd = jsonLdString([
    websiteNode('fr'),
    businessNode('fr', stats),
    {
      '@type': 'Article',
      '@id': `${absoluteUrl(path)}#article`,
      headline: plainText(article.h1, tokens),
      description: plainText(article.metaDescription, tokens),
      image: absoluteUrl('/image-casablanca.jpg'),
      datePublished: article.datePublished,
      dateModified: article.dateModified,
      inLanguage: 'fr',
      isPartOf: { '@id': WEBSITE_ID },
      mainEntityOfPage: absoluteUrl(path),
      author: { '@id': BUSINESS_ID },
      publisher: { '@id': BUSINESS_ID },
    },
    breadcrumbNode(
      'fr',
      [
        { name: labels.home, path: '/' },
        { name: labels.blog, path: '/blog' },
        { name: article.h1, path },
      ],
      path,
    ),
    ...(faq.length > 0 ? [faqNode('fr', faq, path)] : []),
  ]);

  const updated = formatArticleDate(article.dateModified);
  const minutes = readingMinutes(article);
  // « À lire aussi » : trois autres articles, les plus récemment mis à jour.
  const further = ARTICLES.filter((other) => other.slug !== article.slug)
    .sort((a, b) => b.dateModified.localeCompare(a.dateModified))
    .slice(0, 3);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <article className="lux-container pt-6 lg:pt-8">
        <div className="mx-auto max-w-[720px]">
          <header>
            <Breadcrumbs
              locale="fr"
              items={[
                { name: labels.home, path: '/' },
                { name: labels.blog, path: '/blog' },
                { name: article.h1 },
              ]}
            />
            <h1 className="t-h1-page mt-3">{resolveTokens(article.h1, tokens)}</h1>
            <p className="mt-3 text-sm text-cream-faint">
              {tr('fr', 'ui.updated').replace('{date}', updated)} · {tr('fr', 'ui.readingTime').replace('{count}', String(minutes))} ·{' '}
              {tr('fr', 'ui.byTeam')}
            </p>
            <p className="mt-5 text-lg leading-relaxed text-cream">
              <RichText text={article.intro} locale="fr" tokens={tokens} />
            </p>
          </header>

          <div className="mt-8">
            <SeoToc locale="fr" sections={article.sections} tokens={tokens} />
          </div>

          <div className="mt-10 space-y-12">
            <SeoSections
              sections={article.sections}
              locale="fr"
              tokens={tokens}
              vehicles={[]}
              inlineCta={<InlineCta locale="fr" />}
            />
            <div className="cv-auto">
              <SeoFaq locale="fr" items={article.faq} tokens={tokens} />
            </div>
            {article.sources && article.sources.length > 0 && (
              <section className="cv-auto">
                <h2 className="t-h3">{labels.sources}</h2>
                <ul className="t-small mt-3 list-disc space-y-1.5 ps-5">
                  {article.sources.map((source) => (
                    <li key={source.url}>
                      <a href={source.url} target="_blank" rel="noopener noreferrer" className="t-link">
                        {source.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </div>
        </div>

        <div className="mt-14 space-y-12">
          <RelatedCards
            title={tr('fr', 'ui.related')}
            items={further.map((other) => ({
              href: `/blog/${other.slug}`,
              label: other.h1,
              hint: tr('fr', 'ui.readingTime').replace('{count}', String(readingMinutes(other))),
            }))}
          />
          <RelatedLinks locale="fr" items={related} />
        </div>
      </article>
      <CtaBand locale="fr" minPrice={stats.minPrice} />
    </>
  );
}
