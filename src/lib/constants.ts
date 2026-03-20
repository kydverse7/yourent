// ========================
// YOURENT — Constantes globales
// ========================

// Devise & localisation
export const DEVISE = 'MAD';
export const LOCALE = 'fr-MA';
export const TIMEZONE = 'Africa/Casablanca';

// Tarification location
export const MIN_RESERVATION_DAYS = 3;
export const LONG_RENTAL_THRESHOLD_DAYS = 10;

// Paliers tarifaires (jours)
export const PALIERS = {
  STANDARD: { min: MIN_RESERVATION_DAYS, max: LONG_RENTAL_THRESHOLD_DAYS },
  LONG: { min: LONG_RENTAL_THRESHOLD_DAYS + 1, key: '10Plus' },
} as const;

// Statuts véhicule
export const STATUT_VEHICULE = {
  DISPONIBLE: 'disponible',
  LOUE: 'loue',
  RESERVE: 'reserve',
  MAINTENANCE: 'maintenance',
} as const;

// Rôles utilisateurs
export const ROLES = {
  ADMIN: 'admin',
  AGENT: 'agent',
  COMPTABLE: 'comptable',
} as const;

// Catégories de paiement exclues des stats financières
export const CATEGORIES_CAUTION = ['caution', 'caution_restitution'] as const;

// Types de caution autorisés
export const TYPES_CAUTION = ['cheque', 'carte_empreinte', 'cash'] as const;

// Modes de paiement en agence (PAS de Stripe, pas de paiement en ligne)
export const MODES_PAIEMENT_AGENCE = ['especes', 'carte', 'virement', 'cheque'] as const;

// Upload
export const UPLOAD_MAX_SIZE = 10 * 1024 * 1024; // 10 MB
export const UPLOAD_ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp'] as const;
export const UPLOAD_MAGIC_BYTES: Record<string, number[][]> = {
  'image/jpeg': [[0xff, 0xd8, 0xff]],
  'image/png': [[0x89, 0x50, 0x4e, 0x47]],
  'image/webp': [[0x52, 0x49, 0x46, 0x46]],
};

// Pagination
export const PAGE_SIZE_DEFAULT = 20;
export const PAGE_SIZE_MAX = 100;

// Formats date
export const DATE_FORMAT = 'dd/MM/yyyy';
export const DATE_TIME_FORMAT = 'dd/MM/yyyy HH:mm';

// Alertes maintenance (jours avant expiration)
export const ALERT_URGENCE_JOURS = 7;
export const ALERT_WARNING_JOURS = 30;

// Couleurs design system (référence JS)
export const COLORS = {
  gold: '#C9A84C',
  goldLight: '#E8C97A',
  goldDark: '#9B7B2E',
  noir: '#0A0A0A',
  card: '#111111',
  surface: '#1A1A1A',
  border: '#2A2A2A',
  cream: '#F5F0E8',
  secondary: '#A89880',
  muted: '#6B5E4E',
  green: '#4ADE80',
  amber: '#FBBF24',
  red: '#F87171',
  blue: '#60A5FA',
} as const;
