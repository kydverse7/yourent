// Module léger, importé par les pages publiques : pas de dépendance ici.
export function formatCurrency(amount: number, currency = 'MAD'): string {
  return new Intl.NumberFormat('fr-MA', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatNumber(n: number): string {
  return new Intl.NumberFormat('fr-MA').format(n);
}

const PRICE_UNIT = { fr: 'DH', en: 'MAD', ar: 'درهم' } as const;

/**
 * Prix affiché sur le site public, une seule écriture par langue :
 * « 1 800 DH » en français, « 1,800 MAD » en anglais, « 1 800 درهم » en arabe.
 * Espaces insécables : le montant et son unité ne se séparent jamais, et en arabe (RTL)
 * les groupes de chiffres ne s'inversent pas. Les données structurées restent en MAD.
 */
export function formatPrice(amount: number, locale: 'fr' | 'en' | 'ar' = 'fr'): string {
  return `${formatAmount(amount, locale)}\u00a0${PRICE_UNIT[locale]}`;
}

/** Montant seul, pour un texte qui porte d\u00e9j\u00e0 l'unit\u00e9 (\u00ab d\u00e8s {price} DH par jour \u00bb) : \u00ab 1 800 \u00bb ou \u00ab 1,800 \u00bb. */
export function formatAmount(amount: number, locale: 'fr' | 'en' | 'ar' = 'fr'): string {
  const value = Math.round(amount);
  return locale === 'en'
    ? value.toLocaleString('en-US')
    : value.toLocaleString('fr-FR').replace(/[\s\u202f\u00a0]/g, '\u00a0');
}
