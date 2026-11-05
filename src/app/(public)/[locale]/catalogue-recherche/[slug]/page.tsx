import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { isLocale } from '@/lib/i18n/routing';
import { parseSearchDateRange } from '@/lib/utils';
import { firstSearchValues, type RawSearchParams } from '../../catalogue/_lib/catalogueQuery';
import { modelMetadata, VehicleModelContent } from '../../catalogue/[slug]/_components/VehicleModelContent';

/**
 * Route interne, voir `catalogue-recherche/page.tsx` : la fiche d'un modèle avec des dates choisies,
 * vue sur `/catalogue/[slug]?du=...&au=...`.
 */
type Props = {
  params: Promise<{ locale: string; slug: string }>;
  searchParams: Promise<RawSearchParams>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isLocale(locale)) return {};
  return modelMetadata(locale, slug, true);
}

export default async function VehicleModelSearchPage({ params, searchParams }: Props) {
  const [{ locale, slug }, raw] = await Promise.all([params, searchParams]);
  if (!isLocale(locale)) notFound();
  const { du, au } = firstSearchValues(raw);
  return <VehicleModelContent locale={locale} slug={slug} dateRange={parseSearchDateRange(du, au)} />;
}
