import { Metadata } from 'next';
import { cache } from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { connectDB } from '@/lib/db';
import { Vehicle } from '@/models/Vehicle';
import { getVehicleDisplayPrice, resolveVehiclePricing, toModelSlug } from '@/lib/utils';
import { ChevronLeft, Sparkles } from 'lucide-react';
import { VehicleModelView } from './_components/VehicleModelView';

type Props = { params: Promise<{ slug: string }> };

type VehicleModelRow = {
  _id: string;
  slug: string;
  marque: string;
  modele: string;
  annee?: number;
  couleur?: string;
  kilometrage?: number;
  carburant: string;
  boite: string;
  places: number;
  categorie: string;
  options?: string[];
  description?: string;
  photos?: string[];
  backgroundPhoto?: string | null;
  photoModele?: string | null;
  statut: 'disponible' | 'loue' | 'reserve' | 'maintenance';
  tarifParJour?: number;
  tarifParJour10Plus?: number;
  tarifParJour15Plus?: number;
  tarifParJour30Plus?: number;
};

const getModelVariants = cache(async (modelSlug: string) => {
  await connectDB();
  const vehicles = await Vehicle.find({
    actif: { $ne: false },
    isPublic: { $ne: false },
  })
    .select(
      'marque modele annee couleur kilometrage immatriculation carburant boite places categorie options description photos backgroundPhoto photoModele slug statut tarifParJour tarifParJour10Plus tarifParJour15Plus tarifParJour30Plus',
    )
    .sort({ tarifParJour: 1 })
    .lean<VehicleModelRow[]>();

  const matching = vehicles.filter(
    (v) => toModelSlug(v.marque, v.modele) === modelSlug && v.statut === 'disponible',
  );
  if (matching.length === 0) return null;

  return matching.map((v) => {
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
      displayTarifJour: getVehicleDisplayPrice(v),
    };
  }).sort((a, b) => {
    if (a.displayTarifJour !== b.displayTarifJour) {
      return a.displayTarifJour - b.displayTarifJour;
    }

    return a.tarifJour - b.tarifJour;
  });
});

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const variants = await getModelVariants(slug);
  if (!variants || variants.length === 0) return { title: '404' };

  const { marque, modele } = variants[0];
  const displayPrices = variants.map((v) => v.displayTarifJour).filter((price) => price > 0);
  const minTarif = displayPrices.length > 0 ? Math.min(...displayPrices) : 0;
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
  const displayPrices = variants.map((variant) => variant.displayTarifJour).filter((price) => price > 0);
  const modelMinTarif = displayPrices.length > 0 ? Math.min(...displayPrices) : 0;
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Product',
        '@id': `https://yourent.ma/catalogue/${slug}#vehicle`,
        name: `${marque} ${modele} — Location`,
        description: `Louez une ${marque} ${modele} à Casablanca dès ${modelMinTarif} MAD/jour.`,
        url: `https://yourent.ma/catalogue/${slug}`,
        image: variants[0].featuredPhoto || undefined,
        brand: { '@type': 'Brand', name: marque },
        category: categorie,
        fuelType: carburant,
        vehicleTransmission: transmission,
        seatingCapacity: places,
        offers: {
          '@type': 'AggregateOffer',
          priceCurrency: 'MAD',
          lowPrice: modelMinTarif,
          offerCount: variants.length,
          availability: 'https://schema.org/InStock',
        },
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `https://yourent.ma/catalogue/${slug}#breadcrumb`,
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Accueil',
            item: 'https://yourent.ma',
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Catalogue',
            item: 'https://yourent.ma/catalogue',
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: `${marque} ${modele}`,
            item: `https://yourent.ma/catalogue/${slug}`,
          },
        ],
      },
    ],
  };

  return (
    <div className="lux-container py-8 md:py-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />
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
        modelMinTarif={modelMinTarif}
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
