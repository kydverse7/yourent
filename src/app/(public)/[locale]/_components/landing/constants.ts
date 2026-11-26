import type { Locale } from '@/lib/i18n/translations';
import { BUSINESS } from '@/lib/site';

/* ─────────── Horaires, dans la langue de la page ─────────── */

export function formatBusinessHours(locale: Locale): string {
  if (locale === 'fr') return BUSINESS.hours.display;
  const opens = Number(BUSINESS.hours.opens.split(':')[0]);
  const closes = Number(BUSINESS.hours.closes.split(':')[0]) - 12;
  return locale === 'en'
    ? `${opens}am – ${closes}pm, 7 days a week`
    : `${opens}ص – ${closes}م، 7 أيام في الأسبوع`;
}
