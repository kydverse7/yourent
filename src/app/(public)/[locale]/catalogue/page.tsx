import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { isLocale } from '@/lib/i18n/routing';
import { catalogueMetadata, CatalogueView } from './_components/CatalogueView';

type Props = { params: Promise<{ locale: string }> };

/**
 * Le catalogue sans filtre, statique et régénéré au plus toutes les 2 minutes.
 * Les recherches passent par `catalogue-recherche` : ne jamais lire `searchParams` ici,
 * cela ferait perdre le cache à toute la page.
 */
export const revalidate = 120;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return catalogueMetadata(locale, false);
}

export default async function CataloguePage({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return <CatalogueView locale={locale} params={{}} />;
}
