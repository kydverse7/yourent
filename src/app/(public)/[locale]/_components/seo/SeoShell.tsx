import { ArrowUpRight, MapPin, MessageCircle, Sparkles, Star, Truck, CalendarDays } from 'lucide-react';
import Link from '@/lib/i18n/LocaleLink';
import type { Locale } from '@/lib/i18n/translations';
import { BUSINESS } from '@/lib/site';
import { SEO_LABELS } from './seoLabels';

export function Breadcrumbs({ items }: { items: { name: string; path?: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6 text-sm text-cream-faint">
      <ol className="flex flex-wrap items-center gap-2">
        {items.map((item, index) => (
          <li key={item.name} className="flex items-center gap-2">
            {index > 0 && <span aria-hidden="true">/</span>}
            {item.path ? (
              <Link href={item.path} className="transition-colors hover:text-gold">{item.name}</Link>
            ) : (
              <span aria-current="page" className="text-cream-muted">{item.name}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function SeoHead({
  locale,
  eyebrow,
  h1,
  intro,
}: {
  locale: Locale;
  eyebrow: string;
  h1: string;
  intro: string;
}) {
  const labels = SEO_LABELS[locale];
  const rating = BUSINESS.googleRating.value.toLocaleString(locale === 'en' ? 'en-US' : 'fr-FR');

  return (
    <header className="space-y-5">
      <span className="lux-eyebrow">
        <Sparkles className="h-3.5 w-3.5" /> {eyebrow}
      </span>
      <h1 className="lux-title-sm text-cream">{h1}</h1>
      <p className="lux-subtitle">{intro}</p>
      <div className="flex flex-wrap gap-3">
        <Link href="/catalogue" className="btn-gold">
          {labels.catalogue} <ArrowUpRight className="h-4 w-4" />
        </Link>
        <a
          href={BUSINESS.whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-2.5 text-sm font-semibold text-cream transition-colors hover:border-gold/30 hover:text-gold"
        >
          <MessageCircle className="h-4 w-4 text-gold" /> {labels.whatsapp}
        </a>
      </div>
      <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-cream-muted">
        <li className="flex items-center gap-2">
          <Truck className="h-4 w-4 text-gold" /> {labels.delivery}
        </li>
        <li className="flex items-center gap-2">
          <CalendarDays className="h-4 w-4 text-gold" /> {labels.minDays}
        </li>
        <li className="flex items-center gap-2">
          <Star className="h-4 w-4 text-gold" />
          <a href={BUSINESS.mapsUrl} target="_blank" rel="noopener noreferrer" className="hover:text-gold">
            {rating}/5 · {BUSINESS.googleRating.count} {labels.googleReviews}
          </a>
        </li>
        <li className="flex items-center gap-2">
          <MapPin className="h-4 w-4 text-gold" /> {BUSINESS.address.street}, {BUSINESS.address.city}
        </li>
      </ul>
    </header>
  );
}

export function SeoFinalCta({ locale, title }: { locale: Locale; title: string }) {
  const labels = SEO_LABELS[locale];
  return (
    <section className="lux-panel flex flex-col items-start gap-4 p-6 md:flex-row md:items-center md:justify-between md:p-8">
      <p className="text-lg font-semibold text-cream">{title}</p>
      <div className="relative flex flex-wrap gap-3">
        <Link href="/catalogue" className="btn-gold">
          {labels.catalogue} <ArrowUpRight className="h-4 w-4" />
        </Link>
        <a
          href={BUSINESS.whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-2.5 text-sm font-semibold text-cream transition-colors hover:border-gold/30 hover:text-gold"
        >
          <MessageCircle className="h-4 w-4 text-gold" /> {labels.whatsapp}
        </a>
      </div>
    </section>
  );
}
