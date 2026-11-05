import type { Metadata } from 'next';
import { DEFAULT_LOCALE, LOCALES, localePath } from '@/lib/i18n/routing';
import type { Locale } from '@/lib/i18n/translations';
import { absoluteUrl, BUSINESS } from '@/lib/site';

const OG_LOCALE: Record<Locale, string> = { fr: 'fr_MA', en: 'en_US', ar: 'ar_MA' };

type PathsByLocale = Partial<Record<Locale, string>>;

/** Adresse canonique et balises hreflang d'une page. `paths` : l'adresse par langue, sans préfixe. */
export function buildAlternates(locale: Locale, paths: PathsByLocale): NonNullable<Metadata['alternates']> {
  const languages: Record<string, string> = {};
  for (const lang of LOCALES) {
    const path = paths[lang];
    if (path) languages[lang] = absoluteUrl(localePath(lang, path));
  }
  const fallback = paths[DEFAULT_LOCALE] ?? paths[locale];
  if (fallback) {
    languages['x-default'] = absoluteUrl(
      localePath(paths[DEFAULT_LOCALE] ? DEFAULT_LOCALE : locale, fallback),
    );
  }

  return {
    canonical: absoluteUrl(localePath(locale, paths[locale] ?? '/')),
    languages,
  };
}

/** Une même adresse dans les trois langues (accueil, catalogue, fiches). */
export function samePathAllLocales(path: string): PathsByLocale {
  return { fr: path, en: path, ar: path };
}

type BuildMetadataInput = {
  locale: Locale;
  paths: PathsByLocale;
  /** Titre complet, sans modèle : 55 à 60 caractères, mot-clé en tête, terminé par « | Yourent ». */
  title: string;
  description: string;
  image?: { url: string; alt: string };
  noindex?: boolean;
  type?: 'website' | 'article';
};

export function buildMetadata({
  locale,
  paths,
  title,
  description,
  image,
  noindex,
  type = 'website',
}: BuildMetadataInput): Metadata {
  const alternates = buildAlternates(locale, paths);
  const images = [
    image
      ? { url: absoluteUrl(image.url), alt: image.alt }
      : { url: absoluteUrl('/opengraph-image'), width: 1200, height: 630, alt: title },
  ];

  return {
    title: { absolute: title },
    description,
    alternates,
    openGraph: {
      type,
      locale: OG_LOCALE[locale],
      siteName: BUSINESS.name,
      title,
      description,
      url: alternates.canonical as string,
      images,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: images.map((item) => item.url),
    },
    robots: noindex
      ? { index: false, follow: false }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
          },
        },
  };
}
