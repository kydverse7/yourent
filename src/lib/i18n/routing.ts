import { getRoutePaths, SEO_ROUTE_KEYS } from '@/lib/seo/routes';
import type { Locale } from './translations';

export const LOCALES: readonly Locale[] = ['fr', 'en', 'ar'];
export const DEFAULT_LOCALE: Locale = 'fr';

export function isLocale(value: string | undefined | null): value is Locale {
  return value === 'fr' || value === 'en' || value === 'ar';
}

export function isRtl(locale: Locale): boolean {
  return locale === 'ar';
}

/** Préfixe une adresse interne : le français reste à la racine, l'anglais sous /en, l'arabe sous /ar. */
export function localePath(locale: Locale, path: string): string {
  const clean = path.startsWith('/') ? path : `/${path}`;
  if (locale === DEFAULT_LOCALE) return clean;
  if (clean === '/') return `/${locale}`;
  if (clean.startsWith('/#') || clean.startsWith('/?')) return `/${locale}${clean.slice(1)}`;
  return `/${locale}${clean}`;
}

/** Sépare la langue et le reste d'une adresse publique. */
export function splitLocale(pathname: string): { locale: Locale; path: string } {
  const match = pathname.match(/^\/(en|ar)(\/.*)?$/);
  if (match) return { locale: match[1] as Locale, path: match[2] ?? '/' };
  return { locale: DEFAULT_LOCALE, path: pathname || '/' };
}

/**
 * Adresse équivalente dans une autre langue.
 * Une page SEO absente de la langue visée renvoie vers l'accueil de cette langue.
 */
export function alternatePathname(pathname: string, target: Locale): string {
  const { locale, path } = splitLocale(pathname);

  for (const key of SEO_ROUTE_KEYS) {
    const paths = getRoutePaths(key);
    if (paths[locale] === path) {
      const translated = paths[target];
      return translated ? localePath(target, translated) : localePath(target, '/');
    }
  }

  if (path.startsWith('/blog/')) return localePath(target, '/');
  return localePath(target, path);
}
