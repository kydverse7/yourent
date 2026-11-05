import { localePath } from '@/lib/i18n/routing';
import type { Locale } from '@/lib/i18n/translations';
import { absoluteUrl, BUSINESS, SITE_URL } from '@/lib/site';
import type { FleetModel, FleetStats } from './fleet';

export const BUSINESS_ID = `${SITE_URL}/#localbusiness`;
export const WEBSITE_ID = `${SITE_URL}/#website`;

const BUSINESS_DESCRIPTION: Record<Locale, string> = {
  fr: 'Agence de location de voitures à Casablanca : citadines, SUV, berlines et véhicules haut de gamme, livraison gratuite à Casablanca et à l’aéroport Mohammed V.',
  en: 'Car rental agency in Casablanca: city cars, SUVs, sedans and premium vehicles, with free delivery in Casablanca and at Mohammed V airport.',
  ar: 'وكالة لكراء السيارات في الدار البيضاء: سيارات المدينة والدفع الرباعي والسيدان والسيارات الفاخرة، مع توصيل مجاني داخل الدار البيضاء وإلى مطار محمد الخامس.',
};

export function websiteNode(locale: Locale) {
  return {
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    url: SITE_URL,
    name: BUSINESS.name,
    inLanguage: locale,
    publisher: { '@id': BUSINESS_ID },
  };
}

/** L'entreprise, identique sur toutes les pages. Sans note : les avis se lisent sur la fiche Google. */
export function businessNode(locale: Locale, stats?: Pick<FleetStats, 'minPrice' | 'maxPrice'>) {
  return {
    '@type': ['AutoRental', 'LocalBusiness'],
    '@id': BUSINESS_ID,
    name: BUSINESS.name,
    alternateName: BUSINESS.legalAlternateName,
    url: SITE_URL,
    logo: absoluteUrl('/logo-yourent.png'),
    image: absoluteUrl('/image-casablanca.jpg'),
    description: BUSINESS_DESCRIPTION[locale],
    telephone: BUSINESS.phone,
    email: BUSINESS.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: BUSINESS.address.street,
      addressLocality: BUSINESS.address.city,
      addressRegion: BUSINESS.address.region,
      postalCode: BUSINESS.address.postalCode,
      addressCountry: BUSINESS.address.country,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: BUSINESS.geo.latitude,
      longitude: BUSINESS.geo.longitude,
    },
    hasMap: BUSINESS.mapsUrl,
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        opens: BUSINESS.hours.opens,
        closes: BUSINESS.hours.closes,
      },
    ],
    ...(stats && stats.minPrice > 0
      ? { priceRange: `${stats.minPrice} - ${stats.maxPrice} MAD` }
      : {}),
    currenciesAccepted: 'MAD',
    areaServed: [
      { '@type': 'City', name: 'Casablanca' },
      {
        '@type': 'Airport',
        name: 'Aéroport Mohammed V',
        iataCode: 'CMN',
      },
      { '@type': 'Country', name: 'Maroc' },
    ],
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: BUSINESS.phone,
        contactType: 'customer service',
        areaServed: 'MA',
        availableLanguage: ['fr', 'en', 'ar'],
      },
    ],
    sameAs: Object.values(BUSINESS.social),
  };
}

export function breadcrumbNode(
  locale: Locale,
  items: { name: string; path: string }[],
  idPath: string,
) {
  return {
    '@type': 'BreadcrumbList',
    '@id': `${absoluteUrl(localePath(locale, idPath))}#breadcrumb`,
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absoluteUrl(localePath(locale, item.path)),
    })),
  };
}

export function faqNode(locale: Locale, items: { q: string; a: string }[], idPath: string) {
  return {
    '@type': 'FAQPage',
    '@id': `${absoluteUrl(localePath(locale, idPath))}#faq`,
    inLanguage: locale,
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
  };
}

/** Un modèle à louer : un produit de type voiture, proposé par l'agence, avec son prix par jour. */
export function carNode(locale: Locale, model: FleetModel, name: string) {
  const url = absoluteUrl(localePath(locale, `/catalogue/${model.slug}`));
  const isAuto = model.boites.includes('automatique');
  return {
    '@type': ['Product', 'Car'],
    '@id': `${url}#vehicle`,
    name,
    url,
    ...(model.photo ? { image: absoluteUrl(model.photo) } : {}),
    brand: { '@type': 'Brand', name: model.marque },
    model: model.modele,
    ...(model.carburant ? { fuelType: model.carburant } : {}),
    ...(model.boites.length > 0
      ? { vehicleTransmission: isAuto ? 'AutomaticTransmission' : 'ManualTransmission' }
      : {}),
    ...(model.places ? { vehicleSeatingCapacity: model.places } : {}),
    offers: {
      '@type': 'Offer',
      url,
      priceCurrency: 'MAD',
      price: model.minTarif,
      priceSpecification: {
        '@type': 'UnitPriceSpecification',
        price: model.minTarif,
        priceCurrency: 'MAD',
        unitCode: 'DAY',
        referenceQuantity: { '@type': 'QuantitativeValue', value: 1, unitCode: 'DAY' },
      },
      availability:
        model.countDispo > 0 ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
      seller: { '@id': BUSINESS_ID },
    },
  };
}

/** À insérer tel quel dans `<script type="application/ld+json">`. */
export function jsonLdString(nodes: unknown[]): string {
  return JSON.stringify({ '@context': 'https://schema.org', '@graph': nodes }).replace(/</g, '\\u003c');
}
