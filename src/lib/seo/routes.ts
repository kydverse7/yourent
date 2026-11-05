import type { Locale } from '@/lib/i18n/translations';

/**
 * Registre des pages SEO : une clé stable, une adresse par langue.
 * Ce fichier est importé côté client (sélecteur de langue) : il ne doit contenir que des adresses.
 * Une langue absente signifie que la page n'existe pas dans cette langue.
 */
const COMMERCIAL = {
  aeroport: {
    fr: '/location-voiture-aeroport-casablanca',
    en: '/car-rental-casablanca-airport',
    ar: '/car-rental-casablanca-airport',
  },
  luxe: {
    fr: '/location-voiture-luxe-casablanca',
    en: '/luxury-car-rental-casablanca',
    ar: '/luxury-car-rental-casablanca',
  },
  suv: {
    fr: '/location-suv-casablanca',
    en: '/suv-rental-casablanca',
    ar: '/suv-rental-casablanca',
  },
  automatique: {
    fr: '/location-voiture-automatique-casablanca',
    en: '/automatic-car-rental-casablanca',
    ar: '/automatic-car-rental-casablanca',
  },
  'longue-duree': {
    fr: '/location-voiture-longue-duree-casablanca',
    en: '/long-term-car-rental-casablanca',
    ar: '/long-term-car-rental-casablanca',
  },
  economique: {
    fr: '/location-voiture-pas-cher-casablanca',
    en: '/cheap-car-rental-casablanca',
    ar: '/cheap-car-rental-casablanca',
  },
  mercedes: {
    fr: '/location-mercedes-casablanca',
    en: '/mercedes-rental-casablanca',
    ar: '/mercedes-rental-casablanca',
  },
  'range-rover': {
    fr: '/location-range-rover-casablanca',
    en: '/range-rover-rental-casablanca',
    ar: '/range-rover-rental-casablanca',
  },
  porsche: {
    fr: '/location-porsche-casablanca',
    en: '/porsche-rental-casablanca',
    ar: '/porsche-rental-casablanca',
  },
  volkswagen: {
    fr: '/location-volkswagen-casablanca',
    en: '/volkswagen-rental-casablanca',
    ar: '/volkswagen-rental-casablanca',
  },
  audi: {
    fr: '/location-audi-casablanca',
    en: '/audi-rental-casablanca',
    ar: '/audi-rental-casablanca',
  },
  maroc: {
    fr: '/location-voiture-maroc',
    en: '/car-rental-morocco',
    ar: '/car-rental-morocco',
  },
  tarifs: { fr: '/tarifs', en: '/prices', ar: '/prices' },
  conditions: {
    fr: '/conditions-de-location',
    en: '/rental-conditions',
    ar: '/rental-conditions',
  },
  faq: { fr: '/faq', en: '/faq', ar: '/faq' },
  'a-propos': { fr: '/a-propos', en: '/about', ar: '/about' },
  contact: { fr: '/contact', en: '/contact', ar: '/contact' },
} as const;

const LOCAL = {
  maarif: { fr: '/location-voiture-maarif-casablanca' },
  'casa-voyageurs': { fr: '/location-voiture-gare-casa-voyageurs' },
  bouskoura: { fr: '/location-voiture-bouskoura' },
  mohammedia: { fr: '/location-voiture-mohammedia' },
  mre: {
    fr: '/location-voiture-mre-casablanca',
    en: '/car-rental-moroccans-abroad-casablanca',
  },
  marrakech: {
    fr: '/location-voiture-casablanca-marrakech',
    en: '/car-rental-casablanca-to-marrakech',
    ar: '/car-rental-casablanca-to-marrakech',
  },
  europe: {
    fr: '/location-voiture-casablanca-depuis-france-europe',
    en: '/car-rental-casablanca-from-europe',
  },
  'agence-vs-international': {
    fr: '/agence-locale-ou-loueur-international-casablanca',
    en: '/local-agency-or-international-car-rental-casablanca',
  },
} as const;

export const SEO_ROUTES = { ...COMMERCIAL, ...LOCAL } as const;

export type SeoRouteKey = keyof typeof SEO_ROUTES;
type RoutePaths = Partial<Record<Locale, string>>;

export const SEO_ROUTE_KEYS = Object.keys(SEO_ROUTES) as SeoRouteKey[];

export function getRoutePaths(key: SeoRouteKey): RoutePaths {
  return SEO_ROUTES[key] as RoutePaths;
}

export function getRoutePath(key: SeoRouteKey, locale: Locale): string | undefined {
  return getRoutePaths(key)[locale];
}

/** Retrouve une page depuis son segment d'adresse (ex. « tarifs ») dans une langue. */
export function findRouteBySlug(locale: Locale, slug: string): SeoRouteKey | undefined {
  return SEO_ROUTE_KEYS.find((key) => getRoutePaths(key)[locale] === `/${slug}`);
}

/** Tous les couples langue + segment à générer. */
export function allSeoParams(): { locale: Locale; seoSlug: string }[] {
  const params: { locale: Locale; seoSlug: string }[] = [];
  for (const key of SEO_ROUTE_KEYS) {
    for (const [locale, path] of Object.entries(getRoutePaths(key))) {
      if (path) params.push({ locale: locale as Locale, seoSlug: path.slice(1) });
    }
  }
  return params;
}
