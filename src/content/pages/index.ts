import type { SeoRouteKey } from '@/lib/seo/routes';
import type { LocalizedPage, PageContent } from '../types';

/**
 * Contenu de chaque page SEO, chargé à la demande.
 * Une page sans contenu répond 404 et n'apparaît pas dans le sitemap.
 */
const FR: Partial<Record<SeoRouteKey, () => Promise<{ default: LocalizedPage }>>> = {
  'a-propos': () => import('./a-propos'),
  aeroport: () => import('./aeroport'),
  'agence-vs-international': () => import('./agence-vs-international'),
  audi: () => import('./audi'),
  automatique: () => import('./automatique'),
  bouskoura: () => import('./bouskoura'),
  'casa-voyageurs': () => import('./casa-voyageurs'),
  conditions: () => import('./conditions'),
  contact: () => import('./contact'),
  economique: () => import('./economique'),
  faq: () => import('./faq'),
  'longue-duree': () => import('./longue-duree'),
  luxe: () => import('./luxe'),
  maarif: () => import('./maarif'),
  maroc: () => import('./maroc'),
  marrakech: () => import('./marrakech'),
  europe: () => import('./europe'),
  mercedes: () => import('./mercedes'),
  mohammedia: () => import('./mohammedia'),
  mre: () => import('./mre'),
  porsche: () => import('./porsche'),
  'range-rover': () => import('./range-rover'),
  suv: () => import('./suv'),
  tarifs: () => import('./tarifs'),
  volkswagen: () => import('./volkswagen'),
};

const EN: Partial<Record<SeoRouteKey, () => Promise<{ default: PageContent }>>> = {
  'a-propos': () => import('./en/a-propos'),
  aeroport: () => import('./en/aeroport'),
  'agence-vs-international': () => import('./en/agence-vs-international'),
  audi: () => import('./en/audi'),
  automatique: () => import('./en/automatique'),
  conditions: () => import('./en/conditions'),
  contact: () => import('./en/contact'),
  economique: () => import('./en/economique'),
  faq: () => import('./en/faq'),
  'longue-duree': () => import('./en/longue-duree'),
  luxe: () => import('./en/luxe'),
  maroc: () => import('./en/maroc'),
  marrakech: () => import('./en/marrakech'),
  europe: () => import('./en/europe'),
  mercedes: () => import('./en/mercedes'),
  mre: () => import('./en/mre'),
  porsche: () => import('./en/porsche'),
  'range-rover': () => import('./en/range-rover'),
  suv: () => import('./en/suv'),
  tarifs: () => import('./en/tarifs'),
  volkswagen: () => import('./en/volkswagen'),
};

const AR: Partial<Record<SeoRouteKey, () => Promise<{ default: PageContent }>>> = {
  'a-propos': () => import('./ar/a-propos'),
  aeroport: () => import('./ar/aeroport'),
  audi: () => import('./ar/audi'),
  automatique: () => import('./ar/automatique'),
  conditions: () => import('./ar/conditions'),
  contact: () => import('./ar/contact'),
  economique: () => import('./ar/economique'),
  faq: () => import('./ar/faq'),
  'longue-duree': () => import('./ar/longue-duree'),
  luxe: () => import('./ar/luxe'),
  maroc: () => import('./ar/maroc'),
  marrakech: () => import('./ar/marrakech'),
  mercedes: () => import('./ar/mercedes'),
  porsche: () => import('./ar/porsche'),
  'range-rover': () => import('./ar/range-rover'),
  suv: () => import('./ar/suv'),
  tarifs: () => import('./ar/tarifs'),
  volkswagen: () => import('./ar/volkswagen'),
};

export const PAGE_KEYS_WITH_CONTENT = Object.keys(FR) as SeoRouteKey[];

export async function loadPageContent(key: SeoRouteKey): Promise<LocalizedPage | null> {
  const fr = FR[key];
  if (!fr) return null;
  const [frModule, enModule, arModule] = await Promise.all([fr(), EN[key]?.(), AR[key]?.()]);
  return {
    ...frModule.default,
    ...(enModule ? { en: enModule.default } : {}),
    ...(arModule ? { ar: arModule.default } : {}),
  };
}
