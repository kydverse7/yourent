'use client';

import { ArrowUpRight } from 'lucide-react';
import Link from '@/lib/i18n/LocaleLink';
import { useLocale } from '@/lib/i18n';
import { SEO_LABELS } from './_components/seo/seoLabels';

export default function NotFound() {
  const { locale } = useLocale();
  const labels = SEO_LABELS[locale];

  return (
    <div className="lux-container flex flex-col items-center gap-5 py-24 text-center">
      <meta name="robots" content="noindex" />
      <p className="text-5xl font-bold text-gold">404</p>
      <h1 className="lux-title-sm text-cream">{labels.notFoundTitle}</h1>
      <p className="lux-subtitle">{labels.notFoundBody}</p>
      <Link href="/catalogue" className="btn-gold">
        {labels.notFoundCta} <ArrowUpRight className="h-4 w-4" />
      </Link>
    </div>
  );
}
