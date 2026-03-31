import { Metadata } from 'next';
import { unstable_cache } from 'next/cache';
import { connectDB } from '@/lib/db';
import { Vehicle } from '@/models/Vehicle';
import { getVehicleDisplayPrice, toModelSlug } from '@/lib/utils';
import { PublicLandingPage } from './_components/landing';

type SliderBrandData = {
  brand: string;
  vehicle: {
    _id: string;
    marque: string;
    modele: string;
    annee?: number;
    type: string;
    slug: string;
    tarifJour: number;
    featuredPhoto: string | null;
  } | null;
};

type VehicleRecord = {
  _id: { toString(): string };
  marque: string;
  modele: string;
  annee?: number;
  type?: string;
  categorie?: string;
  tarifParJour?: number;
  tarifParJour10Plus?: number;
  tarifParJour15Plus?: number;
  tarifParJour30Plus?: number;
  photos?: string[];
  backgroundPhoto?: string;
  photoModele?: string;
  slug: string;
};

type HomeVehicle = {
  _id: string;
  marque: string;
  modele: string;
  annee?: number;
  type: string;
  slug: string;
  tarifJour: number;
  featuredPhoto: string | null;
  norm: string;
};

const SLIDER_PREFERRED = [
  'porsche macan',
  'volkswagen touareg',
  'range rover evoque',
  'range rover sport',
  'mercedes cla',
  'mercedes e 220',
  'audi q3',
  'volkswagen golf',
];

const SLIDER_DISPLAY = [
  'Porsche Macan',
  'Volkswagen Touareg',
  'Range Rover Evoque',
  'Range Rover Sport',
  'Mercedes CLA',
  'Mercedes E 220',
  'Audi Q3',
  'Volkswagen Golf 8',
];

const SIGNATURE_TARGETS = [
  { marque: 'volkswagen', modele: 't-roc' },
  { marque: 'volkswagen', modele: 'tiguan' },
  { marque: 'audi', modele: 'a3' },
  { marque: 'toyota', modele: 'corolla' },
];

const ECONOMIC_TARGETS = [
  { marque: 'fiat', modele: '500' },
  { marque: 'fiat', modele: '500 cabriolet' },
  { marque: 'opel', modele: 'corsa' },
  { marque: 'dacia', modele: 'duster' },
];

export const metadata: Metadata = {
  title: 'Location de voitures à Casablanca | Yourent — Louez au meilleur prix',
  description:
    'Yourent, votre agence de location de voitures à Casablanca, Maroc. Berlines, SUV, voitures de luxe et économiques. Livraison aéroport Mohammed V, tarifs compétitifs, réservation en ligne 7j/7.',
  openGraph: {
    title: 'Location de voitures à Casablanca & au Maroc | Yourent',
    description:
      'Louez une voiture à Casablanca : large choix de berlines, SUV et voitures de luxe. Tarifs à partir de 200 DH/jour. Réservation en ligne, livraison aéroport.',
    url: 'https://yourent.ma',
  },
  alternates: {
    canonical: 'https://yourent.ma',
  },
};

export const revalidate = 300;

async function fetchPublicHomeVehicles(): Promise<HomeVehicle[]> {
  await connectDB();

  const vehicles = await Vehicle.find({ actif: { $ne: false }, isPublic: { $ne: false } })
    .select('marque modele annee type categorie tarifParJour tarifParJour10Plus tarifParJour15Plus tarifParJour30Plus photos backgroundPhoto photoModele slug')
    .lean();

  return (vehicles as VehicleRecord[]).map((vehicle) => {
    return {
      _id: vehicle._id.toString(),
      marque: vehicle.marque,
      modele: vehicle.modele,
      annee: vehicle.annee,
      type: vehicle.type ?? vehicle.categorie ?? 'signature',
      slug: toModelSlug(vehicle.marque, vehicle.modele),
      tarifJour: getVehicleDisplayPrice(vehicle),
      featuredPhoto: vehicle.backgroundPhoto ?? vehicle.photoModele ?? vehicle.photos?.[0] ?? null,
      norm: `${vehicle.marque} ${vehicle.modele}`.toLowerCase(),
    };
  });
}

function pickBestMatch(matches: HomeVehicle[]) {
  if (matches.length === 0) return undefined;

  const best =
    matches.find((item) => item.tarifJour > 0 && item.featuredPhoto)
    ?? matches.find((item) => item.tarifJour > 0)
    ?? matches[0];

  return best;
}

function buildSliderBrands(vehicles: HomeVehicle[]): SliderBrandData[] {
  return SLIDER_PREFERRED.map((brand, index) => {
    const found = pickBestMatch(
      vehicles.filter((vehicle) => vehicle.norm.includes(brand)),
    );

    return {
      brand: SLIDER_DISPLAY[index],
      vehicle: found
        ? {
            _id: found._id,
            marque: found.marque,
            modele: found.modele,
            annee: found.annee,
            type: found.type,
            slug: found.slug,
            tarifJour: found.tarifJour,
            featuredPhoto: found.featuredPhoto,
          }
        : null,
    };
  });
}

function buildSignatureVehicles(vehicles: HomeVehicle[]) {
  return SIGNATURE_TARGETS
    .map((target) => pickBestMatch(
      vehicles.filter((vehicle) => vehicle.norm.includes(target.marque) && vehicle.norm.includes(target.modele)),
    ))
    .filter((vehicle): vehicle is HomeVehicle => vehicle !== undefined)
    .map(({ norm: _norm, ...rest }) => rest);
}

function buildEconomicVehicles(vehicles: HomeVehicle[]) {
  const usedIds = new Set<string>();
  const matched: HomeVehicle[] = [];

  for (const target of ECONOMIC_TARGETS) {
    const candidates = vehicles.filter(
      (vehicle) =>
        vehicle.norm.includes(target.marque)
        && vehicle.norm.includes(target.modele)
        && !usedIds.has(vehicle._id),
    );

    const found = pickBestMatch(candidates);
    if (!found) continue;

    usedIds.add(found._id);
    matched.push(found);
  }

  return matched.map(({ norm: _norm, ...rest }) => rest);
}

const getPublicHomeData = unstable_cache(
  async () => {
    const vehicles = await fetchPublicHomeVehicles();

    return {
      signatureVehicles: buildSignatureVehicles(vehicles),
      sliderBrands: buildSliderBrands(vehicles),
      economicVehicles: buildEconomicVehicles(vehicles),
    };
  },
  ['public-home-data'],
  { revalidate: 300 },
);

export default async function PublicHomePage() {
  const { signatureVehicles, sliderBrands, economicVehicles } = await getPublicHomeData();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': ['CarRental', 'LocalBusiness'],
    name: 'Yourent',
    alternateName: 'Yourent Location de Voitures',
    url: 'https://yourent.ma',
    logo: 'https://yourent.ma/logo-yourent.png',
    image: 'https://yourent.ma/image-casablanca.jpg',
    description:
      'Agence de location de voitures à Casablanca, Maroc. Berlines, SUV, voitures de luxe et économiques. Réservation en ligne 7j/7.',
    telephone: '+212600000000',
    email: 'contact@yourent.ma',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Casablanca',
      addressLocality: 'Casablanca',
      addressRegion: 'Casablanca-Settat',
      postalCode: '20000',
      addressCountry: 'MA',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 33.5813104,
      longitude: -7.6351741,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: [
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
          'Sunday',
        ],
        opens: '08:00',
        closes: '20:00',
      },
    ],
    priceRange: '200 MAD - 3000 MAD / jour',
    currenciesAccepted: 'MAD',
    paymentAccepted: 'Cash, Carte bancaire, Virement',
    areaServed: [
      { '@type': 'City', name: 'Casablanca' },
      { '@type': 'Country', name: 'Maroc' },
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Flotte de véhicules à louer',
      itemListElement: [
        {
          '@type': 'OfferCatalog',
          name: 'Voitures de luxe',
          description:
            'Location de voitures de luxe à Casablanca : Porsche, Range Rover, Mercedes, Audi.',
        },
        {
          '@type': 'OfferCatalog',
          name: 'Voitures économiques',
          description:
            'Location de voitures économiques à Casablanca : Fiat, Opel, Dacia à partir de 200 DH/jour.',
        },
        {
          '@type': 'OfferCatalog',
          name: 'SUV et berlines',
          description:
            'SUV et berlines à louer à Casablanca : Volkswagen Tiguan, T-Roc, Golf, Toyota Corolla.',
        },
      ],
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      bestRating: '5',
      reviewCount: '150',
    },
    sameAs: [
      'https://www.instagram.com/yourent.ma',
      'https://www.facebook.com/yourent.ma',
      'https://www.tiktok.com/@yourent.ma',
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PublicLandingPage
        signatureVehicles={signatureVehicles}
        sliderBrands={sliderBrands}
        economicVehicles={economicVehicles}
      />
    </>
  );
}
