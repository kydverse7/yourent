import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { isLocale } from '@/lib/i18n/routing';
import { firstSearchValues, type RawSearchParams } from '../catalogue/_lib/catalogueQuery';
import { catalogueMetadata, CatalogueView } from '../catalogue/_components/CatalogueView';

/**
 * Route interne, jamais une adresse publique : `middleware.ts` y réécrit `/catalogue` quand l'adresse
 * porte `du`, `au`, `marque` ou `type`, et renvoie vers `/catalogue` tout accès direct.
 * Lire `searchParams` la rend dynamique ; `/catalogue` sans filtre reste en cache.
 */
type Props = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<RawSearchParams>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return catalogueMetadata(locale, true);
}

export default async function CatalogueSearchPage({ params, searchParams }: Props) {
  const [{ locale }, raw] = await Promise.all([params, searchParams]);
  if (!isLocale(locale)) notFound();
  return <CatalogueView locale={locale} params={firstSearchValues(raw)} />;
}
