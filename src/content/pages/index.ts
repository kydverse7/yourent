import type { SeoRouteKey } from '@/lib/seo/routes';
import type { LocalizedPage } from '../types';

/**
 * Contenu de chaque page SEO, chargé à la demande.
 * Une page sans contenu répond 404 et n'apparaît pas dans le sitemap.
 */
const LOADERS: Partial<Record<SeoRouteKey, () => Promise<{ default: LocalizedPage }>>> = {};

export const PAGE_KEYS_WITH_CONTENT = Object.keys(LOADERS) as SeoRouteKey[];

export async function loadPageContent(key: SeoRouteKey): Promise<LocalizedPage | null> {
  const loader = LOADERS[key];
  if (!loader) return null;
  return (await loader()).default;
}
