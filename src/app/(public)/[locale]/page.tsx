import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { unstable_cache } from 'next/cache';
import { connectDB } from '@/lib/db';
import { Vehicle } from '@/models/Vehicle';
import { getVehicleDisplayPrice, toModelSlug } from '@/lib/utils';
import { t as tr, type Locale } from '@/lib/i18n';
import { isLocale } from '@/lib/i18n/routing';
import { getFleetStats } from '@/lib/seo/fleet';
import { businessNode, faqNode, jsonLdString, websiteNode } from '@/lib/seo/jsonLd';
import { buildMetadata, samePathAllLocales } from '@/lib/seo/metadata';
import { PublicLandingPage } from './_components/landing';

type Props = { params: Promise<{ locale: string }> };

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

const HOME_META: Record<Locale, { title: string; description: (minPrice: number) => string }> = {
  fr: {
    title: 'Location voiture Casablanca & aéroport Mohammed V | Yourent',
    description: (minPrice) =>
      `Agence de location de voitures à Casablanca dès ${minPrice} DH/jour : citadines, SUV, Mercedes, Porsche. Livraison gratuite à l’aéroport Mohammed V, réservation en ligne.`,
  },
  en: {
    title: 'Car rental Casablanca & Mohammed V airport | Yourent',
    description: (minPrice) =>
      `Car rental agency in Casablanca from ${minPrice} MAD/day: city cars, SUVs, Mercedes, Porsche. Free delivery at Mohammed V airport, book online.`,
  },
  ar: {
    title: 'كراء السيارات في الدار البيضاء ومطار محمد الخامس | Yourent',
    description: (minPrice) =>
      `وكالة كراء السيارات في الدار البيضاء ابتداءً من ${minPrice} درهم لليوم: سيارات المدينة والدفع الرباعي ومرسيدس وبورش. توصيل مجاني إلى مطار محمد الخامس وحجز عبر الإنترنت.`,
  },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const stats = await getFleetStats();
  return buildMetadata({
    locale,
    paths: samePathAllLocales('/'),
    title: HOME_META[locale].title,
    description: HOME_META[locale].description(stats.minPrice),
  });
}

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

    const newArrival = pickBestMatch(
      vehicles.filter((v) => v.norm.includes('kia') && v.norm.includes('sorento')),
    );

    return {
      signatureVehicles: buildSignatureVehicles(vehicles),
      sliderBrands: buildSliderBrands(vehicles),
      economicVehicles: buildEconomicVehicles(vehicles),
      newArrivalVehicle: newArrival ? (({ norm: _n, ...rest }) => rest)(newArrival) : null,
    };
  },
  ['public-home-data'],
  { revalidate: 300 },
);

export default async function PublicHomePage({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const [{ signatureVehicles, sliderBrands, economicVehicles, newArrivalVehicle }, stats] =
    await Promise.all([getPublicHomeData(), getFleetStats()]);

  const faqItems = Array.from({ length: 6 }, (_, index) => ({
    q: tr(locale, `faq.q${index + 1}`),
    a: tr(locale, `faq.a${index + 1}`),
  }));

  const jsonLd = jsonLdString([
    websiteNode(locale),
    businessNode(locale, stats),
    faqNode(locale, faqItems, '/'),
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd }}
      />
      <PublicLandingPage
        signatureVehicles={signatureVehicles}
        sliderBrands={sliderBrands}
        economicVehicles={economicVehicles}
        newArrivalVehicle={newArrivalVehicle}
      />
    </>
  );
}
