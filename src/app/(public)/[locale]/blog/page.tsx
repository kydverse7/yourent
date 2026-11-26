import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ArrowRight } from 'lucide-react';
import { ARTICLES } from '@/content/blog';
import Link from '@/lib/i18n/LocaleLink';
import { t as tr } from '@/lib/i18n/translations';
import { getFleetStats } from '@/lib/seo/fleet';
import { breadcrumbNode, businessNode, jsonLdString, WEBSITE_ID, websiteNode } from '@/lib/seo/jsonLd';
import { buildMetadata } from '@/lib/seo/metadata';
import { absoluteUrl } from '@/lib/site';
import { SEO_LABELS } from '../_components/seo/seoLabels';
import { CtaBand, PageHeader } from '../_components/ui/PageParts';
import { formatArticleDate, readingMinutes } from './blogMeta';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (locale !== 'fr') return {};
  return buildMetadata({
    locale,
    paths: { fr: '/blog' },
    title: 'Blog location de voiture à Casablanca : conseils | Yourent',
    description:
      'Prix de location à Casablanca, caution, permis étranger, péages, conduite au Maroc, guide de l’aéroport Mohammed V : les conseils de Yourent.',
  });
}

export default async function BlogIndexPage({ params }: Props) {
  const { locale } = await params;
  if (locale !== 'fr') notFound();
  const labels = SEO_LABELS.fr;
  const stats = await getFleetStats();

  // Le plus récemment mis à jour en tête, mis en avant.
  const articles = [...ARTICLES].sort((a, b) => b.dateModified.localeCompare(a.dateModified));
  const [featured, ...rest] = articles;
  const meta = (article: (typeof ARTICLES)[number]) =>
    `${tr('fr', 'ui.updated').replace('{date}', formatArticleDate(article.dateModified))} · ${tr('fr', 'ui.readingTime').replace('{count}', String(readingMinutes(article)))}`;

  const blogUrl = absoluteUrl('/blog');
  const jsonLd = jsonLdString([
    websiteNode('fr'),
    businessNode('fr', stats),
    {
      '@type': ['Blog', 'CollectionPage'],
      '@id': `${blogUrl}#blog`,
      url: blogUrl,
      name: labels.blogTitle,
      description: labels.blogIntro,
      inLanguage: 'fr',
      isPartOf: { '@id': WEBSITE_ID },
      mainEntity: {
        '@type': 'ItemList',
        itemListElement: articles.map((article, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          url: absoluteUrl(`/blog/${article.slug}`),
          name: article.h1,
        })),
      },
    },
    breadcrumbNode(
      'fr',
      [
        { name: labels.home, path: '/' },
        { name: labels.blog, path: '/blog' },
      ],
      '/blog',
    ),
  ]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <div className="lux-container pt-6 lg:pt-8">
        <PageHeader
          locale="fr"
          crumbs={[{ name: labels.home, path: '/' }, { name: labels.blog }]}
          eyebrow={labels.blog}
          title={labels.blogTitle}
          intro={labels.blogIntro}
        />

        {featured && (
          <article className="card lift relative mt-10 border-gold/30 p-6 md:p-8">
            <p className="t-label text-gold">{tr('fr', 'ui.latest')}</p>
            <h2 className="t-h2 prose-col mt-2">
              <Link href={`/blog/${featured.slug}`} className="after:absolute after:inset-0 after:content-['']">
                {featured.h1}
              </Link>
            </h2>
            <p className="t-body prose-col mt-3">{featured.excerpt}</p>
            <p className="mt-4 text-sm text-cream-faint">{meta(featured)}</p>
            <span className="mt-4 inline-flex items-center gap-1.5 font-semibold text-gold-light">
              {labels.readMore} <ArrowRight className="h-4 w-4 rtl:-scale-x-100" aria-hidden="true" />
            </span>
          </article>
        )}

        <ul className="rv-group mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {rest.map((article) => (
            <li key={article.slug}>
              <article className="card lift relative flex h-full flex-col p-5">
                <h2 className="font-display text-[1.5rem] leading-[1.15] text-cream">
                  <Link href={`/blog/${article.slug}`} className="after:absolute after:inset-0 after:content-['']">
                    {article.h1}
                  </Link>
                </h2>
                <p className="t-small mt-2 flex-1">{article.excerpt}</p>
                <p className="mt-4 text-sm text-cream-faint">{meta(article)}</p>
              </article>
            </li>
          ))}
        </ul>
      </div>
      <CtaBand locale="fr" minPrice={stats.minPrice} />
    </>
  );
}
