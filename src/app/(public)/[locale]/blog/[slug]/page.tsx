import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ARTICLES, findArticle } from '@/content/blog';
import { loadPageContent } from '@/content/pages';
import { getFleetModels, getFleetStats } from '@/lib/seo/fleet';
import { BUSINESS_ID, breadcrumbNode, businessNode, faqNode, jsonLdString } from '@/lib/seo/jsonLd';
import { buildMetadata } from '@/lib/seo/metadata';
import type { SeoRouteKey } from '@/lib/seo/routes';
import { absoluteUrl } from '@/lib/site';
import { plainText, RelatedLinks, resolveTokens, SeoFaq, SeoSections, type TextTokens } from '../../_components/seo/SeoBlocks';
import { Breadcrumbs, SeoFinalCta } from '../../_components/seo/SeoShell';
import { SEO_LABELS } from '../../_components/seo/seoLabels';

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
    businessNode('fr', stats),
    {
      '@type': 'Article',
      '@id': `${absoluteUrl(path)}#article`,
      headline: plainText(article.h1, tokens),
      description: plainText(article.metaDescription, tokens),
      datePublished: article.datePublished,
      dateModified: article.dateModified,
      inLanguage: 'fr',
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

  const updated = new Intl.DateTimeFormat('fr-FR', { dateStyle: 'long', timeZone: 'UTC' }).format(
    new Date(article.dateModified),
  );

  return (
    <article className="lux-container py-8 md:py-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <Breadcrumbs
        items={[
          { name: labels.home, path: '/' },
          { name: labels.blog, path: '/blog' },
          { name: article.h1 },
        ]}
      />
      <div className="max-w-3xl space-y-12">
        <header className="space-y-4">
          <h1 className="lux-title-sm text-cream">{resolveTokens(article.h1, tokens)}</h1>
          <p className="text-sm text-cream-faint">{labels.updated} {updated}</p>
          <p className="lux-subtitle">{plainText(article.intro, tokens)}</p>
        </header>
        <SeoSections sections={article.sections} locale="fr" tokens={tokens} vehicles={[]} />
        <SeoFaq locale="fr" items={article.faq} tokens={tokens} />
        {article.sources && article.sources.length > 0 && (
          <section className="space-y-2 text-sm text-cream-muted">
            <h2 className="text-lg font-semibold text-cream">{labels.sources}</h2>
            <ul className="list-disc space-y-1 ps-5">
              {article.sources.map((source) => (
                <li key={source.url}>
                  <a href={source.url} target="_blank" rel="noopener noreferrer" className="hover:text-gold">
                    {source.label}
                  </a>
                </li>
              ))}
            </ul>
          </section>
        )}
        <RelatedLinks locale="fr" items={related} />
        <SeoFinalCta locale="fr" title={labels.blogTitle} />
      </div>
    </article>
  );
}
