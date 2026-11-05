import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { isLocale } from '@/lib/i18n/routing';
import { getFleetModels } from '@/lib/seo/fleet';
import { modelMetadata, VehicleModelContent } from './_components/VehicleModelContent';

type Props = { params: Promise<{ locale: string; slug: string }> };

/**
 * La fiche sans dates, statique et régénérée au plus toutes les 2 minutes.
 * La disponibilité affichée peut donc dater de quelques minutes : `POST /api/reservations`
 * vérifie le planning au moment de la demande (409 en cas de conflit).
 * Les dates passent par `catalogue-recherche/[slug]` : ne jamais lire `searchParams` ici.
 */
export const revalidate = 120;
/** Un modèle ajouté après le build est généré à la première visite ; un slug inconnu répond 404. */
export const dynamicParams = true;

export async function generateStaticParams() {
  const models = await getFleetModels();
  return models.map((model) => ({ slug: model.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isLocale(locale)) return {};
  return modelMetadata(locale, slug, false);
}

export default async function VehicleModelPage({ params }: Props) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();
  return <VehicleModelContent locale={locale} slug={slug} dateRange={null} />;
}
