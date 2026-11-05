import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ArrowUpRight, Sparkles } from 'lucide-react';
import { ARTICLES } from '@/content/blog';
import Link from '@/lib/i18n/LocaleLink';
import { buildMetadata } from '@/lib/seo/metadata';
import { SEO_LABELS } from '../_components/seo/seoLabels';
import { Breadcrumbs } from '../_components/seo/SeoShell';

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

  return (
    <div className="lux-container py-8 md:py-10">
      <Breadcrumbs items={[{ name: labels.home, path: '/' }, { name: labels.blog }]} />
      <header className="max-w-3xl space-y-4">
        <span className="lux-eyebrow"><Sparkles className="h-3.5 w-3.5" /> {labels.blog}</span>
        <h1 className="lux-title-sm text-cream">{labels.blogTitle}</h1>
        <p className="lux-subtitle">{labels.blogIntro}</p>
      </header>
      <div className="mt-10 grid gap-5 md:grid-cols-2">
        {ARTICLES.map((article) => (
          <Link key={article.slug} href={`/blog/${article.slug}`} className="group lux-panel block p-6">
            <h2 className="text-lg font-bold text-cream">{article.h1}</h2>
            <p className="mt-3 text-sm leading-relaxed text-cream-muted">{article.excerpt}</p>
            <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-gold">
              {labels.readMore} <ArrowUpRight className="h-4 w-4" />
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
