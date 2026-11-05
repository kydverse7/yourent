/**
 * Source unique des informations publiques de l'agence.
 * Toute page, donnée structurée ou fichier SEO doit lire ces valeurs ici :
 * le nom, l'adresse et le téléphone doivent être identiques partout.
 */
export const SITE_URL = 'https://www.yourent.ma';

export const BUSINESS = {
  name: 'Yourent',
  legalAlternateName: 'Yourent Location de Voitures',
  phone: '+212661236231',
  phoneDisplay: '+212 6 61 23 62 31',
  email: 'contact@yourent.ma',
  whatsappUrl: 'https://wa.me/212661236231',
  address: {
    street: 'N°25 Rue Ibnou Mounir',
    postalCode: '20100',
    city: 'Casablanca',
    region: 'Casablanca-Settat',
    country: 'MA',
    full: 'N°25 Rue Ibnou Mounir, 20100 Casablanca, Maroc',
  },
  geo: { latitude: 33.5813104, longitude: -7.6351741 },
  hours: { opens: '08:00', closes: '22:00', display: '8h – 22h, 7j/7' },
  mapsUrl: 'https://www.google.com/maps/place/YouRent/@33.5820604,-7.6363812,17z',
  /** Relevé sur la fiche Google le 2026-11-05 : à mettre à jour de temps en temps. */
  googleRating: { value: 4.8, count: 170, asOf: '2026-11-05' },
  minRentalDays: 5,
  /** Âge minimum du conducteur, confirmé par le propriétaire le 2026-11-05. */
  minAge: 21,
  social: {
    instagram: 'https://www.instagram.com/you_rent_car',
    facebook: 'https://www.facebook.com/yourent.ma',
    tiktok: 'https://www.tiktok.com/@yourent.ma',
  },
} as const;

/**
 * Dirhams pour 1 euro : cours de référence de Bank Al-Maghrib (bkam.ma), relevé à la date ci-dessous.
 * Sert uniquement à l'équivalent indicatif affiché : la facturation et les données structurées restent en dirhams.
 * À mettre à jour de temps en temps.
 */
export const EUR_RATE = 10.9589;
export const EUR_RATE_AS_OF = '2026-11-05';

/** « ≈ 28 € » pour un montant en dirhams. `null` en arabe ou sans montant : rien à afficher. */
export function formatEurApprox(mad: number, locale: 'fr' | 'en' | 'ar'): string | null {
  if (locale === 'ar' || !(mad > 0)) return null;
  const euros = Math.round(mad / EUR_RATE).toLocaleString('fr-FR').replace(/[\u202f\u00a0]/g, '\u00a0');
  return `≈\u00a0${euros}\u00a0€`;
}

export function absoluteUrl(path: string): string {
  if (/^https?:\/\//.test(path)) return path;
  return `${SITE_URL}${path.startsWith('/') ? '' : '/'}${path}`;
}
