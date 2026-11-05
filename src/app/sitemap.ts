import type { MetadataRoute } from 'next';
import { ARTICLES } from '@/content/blog';
import { loadPageContent, PAGE_KEYS_WITH_CONTENT } from '@/content/pages';
import { DEFAULT_LOCALE, LOCALES, localePath } from '@/lib/i18n/routing';
import type { Locale } from '@/lib/i18n/translations';
import { getFleetModels } from '@/lib/seo/fleet';
import { getRoutePaths } from '@/lib/seo/routes';
import { absoluteUrl } from '@/lib/site';

export const revalidate = 3600;

/**
 * Date de dernière modification des pages dont le contenu est écrit dans le code.
 * À faire avancer quand ces textes changent réellement : jamais `new Date()`.
 */
const CONTENT_LAST_MODIFIED = new Date('2026-11-05');

type PathsByLocale = Partial<Record<Locale, string>>;
type Entry = MetadataRoute.Sitemap[number];

/** Une entrée par langue disponible, chacune annonçant toutes les autres (hreflang). */
function entriesFor(
  paths: PathsByLocale,
  lastModified: Date,
  changeFrequency: Entry['changeFrequency'],
  priority: number,
): MetadataRoute.Sitemap {
  const languages: Record<string, string> = {};
  for (const locale of LOCALES) {
    const path = paths[locale];
    if (path) languages[locale] = absoluteUrl(localePath(locale, path));
  }
  const defaultPath = paths[DEFAULT_LOCALE];
  if (defaultPath) languages['x-default'] = absoluteUrl(localePath(DEFAULT_LOCALE, defaultPath));

  const entries: MetadataRoute.Sitemap = [];
  for (const locale of LOCALES) {
    const path = paths[locale];
    if (!path) continue;
    entries.push({
      url: absoluteUrl(localePath(locale, path)),
      lastModified,
      changeFrequency,
      priority,
      alternates: { languages },
    });
  }
  return entries;
}

function allLocales(path: string): PathsByLocale {
  return { fr: path, en: path, ar: path };
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const entries: MetadataRoute.Sitemap = [
    ...entriesFor(allLocales('/'), CONTENT_LAST_MODIFIED, 'weekly', 1),
    ...entriesFor(allLocales('/catalogue'), CONTENT_LAST_MODIFIED, 'daily', 0.9),
  ];

  /* ── Fiches véhicule ── */
  const models = await getFleetModels();
  if (models.length === 0) {
    // getFleetModels renvoie une liste vide quand la base ne répond pas : on le signale.
    console.error('[sitemap] flotte vide ou illisible : le sitemap est publié SANS les fiches véhicule');
  }
  for (const model of models) {
    const updatedAt = new Date(model.updatedAt);
    const lastModified = Number.isNaN(updatedAt.getTime()) || updatedAt.getTime() === 0 ? CONTENT_LAST_MODIFIED : updatedAt;
    entries.push(...entriesFor(allLocales(`/catalogue/${model.slug}`), lastModified, 'weekly', 0.7));
  }

  /* ── Pages SEO : uniquement les langues dont le contenu existe ── */
  for (const key of PAGE_KEYS_WITH_CONTENT) {
    const content = await loadPageContent(key);
    if (!content) continue;
    const routePaths = getRoutePaths(key);
    const paths: PathsByLocale = {};
    for (const locale of LOCALES) {
      if (content[locale] && routePaths[locale]) paths[locale] = routePaths[locale];
    }
    entries.push(...entriesFor(paths, CONTENT_LAST_MODIFIED, 'monthly', 0.8));
  }

  /* ── Blog (français seulement) ── */
  if (ARTICLES.length > 0) {
    const latest = ARTICLES.reduce(
      (max, article) => (article.dateModified > max ? article.dateModified : max),
      ARTICLES[0].dateModified,
    );
    entries.push(...entriesFor({ fr: '/blog' }, new Date(latest), 'weekly', 0.6));
    for (const article of ARTICLES) {
      entries.push(
        ...entriesFor({ fr: `/blog/${article.slug}` }, new Date(article.dateModified), 'monthly', 0.6),
      );
    }
  }

  return entries;
}
