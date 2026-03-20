import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { connectDB } from '@/lib/db';
import { Vehicle } from '@/models/Vehicle';
import { resolveVehiclePricing, toModelSlug } from '@/lib/utils';
import { ChevronLeft, Sparkles } from 'lucide-react';
import { VehicleModelView } from './_components/VehicleModelView';

type Props = { params: Promise<{ slug: string }> };

async function getModelVariants(modelSlug: string) {
  await connectDB();
  const vehicles = await Vehicle.find({
    actif: { $ne: false },
    statut: 'disponible',
    isPublic: { $ne: false },
  })
    .select(
      'marque modele annee couleur kilometrage immatriculation carburant boite places categorie options description photos backgroundPhoto photoModele slug tarifParJour tarifParJour10Plus tarifParJour15Plus tarifParJour30Plus',
    )
    .sort({ tarifParJour: 1 })
    .lean();

  const matching = vehicles.filter(
    (v: any) => toModelSlug(v.marque, v.modele) === modelSlug,
  );
  if (matching.length === 0) return null;

  return matching.map((v: any) => {
    const pricing = resolveVehiclePricing(v);
    return {
      _id: String(v._id),
      slug: v.slug,
      marque: v.marque,
      modele: v.modele,
      annee: v.annee,
      couleur: v.couleur,
      kilometrage: v.kilometrage ?? 0,
      carburant: v.carburant,
      transmission: v.boite,
      places: v.places,
      categorie: v.categorie,
      options: v.options ?? [],
      description: v.description,
      photos: v.photos ?? [],
      featuredPhoto: v.backgroundPhoto ?? v.photoModele ?? v.photos?.[0] ?? null,
      tarifJour: pricing.tarifJour,
      tarifJour10Plus: pricing.tarifJour10Plus,
    };
  });
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const variants = await getModelVariants(slug);
  if (!variants || variants.length === 0) return { title: '404' };

  const { marque, modele } = variants[0];
  const minTarif = Math.min(...variants.map((v) => v.tarifJour));
  const count = variants.length;

  return {
    title: `Location ${marque} ${modele} à Casablanca — ${count} véhicule${count > 1 ? 's' : ''} | Yourent`,
    description: `Louez une ${marque} ${modele} à Casablanca à partir de ${minTarif} MAD/jour. ${count} véhicule${count > 1 ? 's' : ''} disponible${count > 1 ? 's' : ''}. Réservation en ligne, livraison aéroport.`,
    openGraph: {
      title: `Louer ${marque} ${modele} — Yourent Casablanca`,
      description: `${marque} ${modele} à louer dès ${minTarif} MAD/jour. ${count} option${count > 1 ? 's' : ''} disponible${count > 1 ? 's' : ''}.`,
    },
    alternates: {
      canonical: `https://yourent.ma/catalogue/${slug}`,
    },
  };
}

export const revalidate = 300;

export default async function VehicleModelPage({ params }: Props) {
  const { slug } = await params;
  const variants = await getModelVariants(slug);
  if (!variants || variants.length === 0) notFound();

  const { marque, modele, categorie, carburant, transmission, places } = variants[0];

  return (
    <div className="lux-container py-8 md:py-10">
      <div className="mb-6 flex items-center justify-between gap-3">
        <Link
          href="/catalogue"
          className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-cream-muted transition-colors hover:text-gold"
        >
          <ChevronLeft className="h-4 w-4" /> Retour au catalogue
        </Link>
        <span className="hidden items-center gap-2 md:inline-flex lux-eyebrow">
          <Sparkles className="h-3.5 w-3.5" />{' '}
          {variants.length > 1
            ? `${variants.length} véhicules disponibles`
            : 'fiche véhicule premium'}
        </span>
      </div>

      <VehicleModelView
        variants={variants}
        modelSlug={slug}
        marque={marque}
        modele={modele}
        categorie={categorie}
        carburant={carburant}
        transmission={transmission}
        places={places}
      />
    </div>
  );
}
