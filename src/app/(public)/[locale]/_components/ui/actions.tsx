import { ArrowRight, Phone, Star } from 'lucide-react';
import Link from '@/lib/i18n/LocaleLink';
import { t as tr, type Locale } from '@/lib/i18n/translations';
import { formatPrice } from '@/lib/format';
import { BUSINESS } from '@/lib/site';
import { formatBusinessHours } from '../landing/constants';

/*
 * Boutons et lignes de faits partagés par tous les gabarits publics.
 * WhatsApp et téléphone restent de simples liens <a href> (wa.me, tel:) : la mesure des clics
 * se fait par délégation dans Analytics.tsx, rien à brancher ici.
 */

export const TEL_HREF = `tel:${BUSINESS.phone}`;

export function whatsappHref(message?: string): string {
  return message ? `${BUSINESS.whatsappUrl}?text=${encodeURIComponent(message)}` : BUSINESS.whatsappUrl;
}

export function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true" focusable="false">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

export function WhatsAppButton({
  locale,
  label,
  message,
  className = '',
}: {
  locale: Locale;
  label?: string;
  message?: string;
  className?: string;
}) {
  return (
    <a href={whatsappHref(message)} target="_blank" rel="noopener noreferrer" className={`btn btn-wa ${className}`}>
      <WhatsAppIcon className="h-5 w-5" />
      {label ?? tr(locale, 'ui.whatsapp')}
    </a>
  );
}

export function CallButton({ locale, label, className = '' }: { locale: Locale; label?: string; className?: string }) {
  return (
    <a href={TEL_HREF} className={`btn btn-secondary ${className}`}>
      <Phone className="h-5 w-5" aria-hidden="true" />
      {label ?? tr(locale, 'ui.call')}
    </a>
  );
}

export function BookButton({
  locale,
  href = '/catalogue',
  label,
  className = '',
}: {
  locale: Locale;
  href?: string;
  label?: string;
  className?: string;
}) {
  return (
    <Link href={href} className={`btn btn-primary ${className}`}>
      {label ?? tr(locale, 'ui.book')}
      <ArrowRight className="h-5 w-5 rtl:-scale-x-100" aria-hidden="true" />
    </Link>
  );
}

/** « 4,8/5 sur Google (173 avis) », lié à la fiche Google : la source unique est BUSINESS.googleRating. */
export function RatingLink({ locale, className = '' }: { locale: Locale; className?: string }) {
  const { value, count } = BUSINESS.googleRating;
  const text = tr(locale, 'ui.rating')
    .replace('{value}', value.toLocaleString(locale === 'fr' ? 'fr-FR' : 'en-US'))
    .replace('{count}', String(count));
  return (
    <a
      href={BUSINESS.mapsUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex min-h-11 items-center gap-1.5 text-sm text-cream-muted underline decoration-white/20 underline-offset-4 transition-colors hover:text-cream ${className}`}
    >
      <Star className="h-4 w-4 shrink-0 fill-gold text-gold" aria-hidden="true" />
      <span>{text}</span>
    </a>
  );
}

/** « dès 300 DH/jour · 5 jours minimum · livraison gratuite… » : prix lu dans la base. */
export function FactsLine({
  locale,
  minPrice,
  className = '',
}: {
  locale: Locale;
  minPrice: number;
  className?: string;
}) {
  const facts = [
    ...(minPrice > 0 ? [tr(locale, 'ui.factFrom').replace('{price}', formatPrice(minPrice, locale))] : []),
    tr(locale, 'ui.factMinDays').replace('{count}', String(BUSINESS.minRentalDays)),
    tr(locale, 'ui.factDelivery'),
  ];
  return (
    <ul className={`flex flex-wrap gap-x-4 gap-y-1 text-[0.9375rem] leading-snug text-cream-muted ${className}`}>
      {facts.map((fact, index) => (
        <li key={fact} className="flex items-baseline gap-2">
          <span aria-hidden="true" className="h-1.5 w-1.5 shrink-0 translate-y-[-2px] rounded-full bg-gold" />
          <span className={index === 0 && minPrice > 0 ? 'font-semibold text-gold-light' : undefined}>{fact}</span>
        </li>
      ))}
    </ul>
  );
}

export function hoursText(locale: Locale): string {
  return tr(locale, 'ui.trustHours').replace('{hours}', formatBusinessHours(locale));
}
