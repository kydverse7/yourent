import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { format, differenceInDays, isBefore, isValid } from 'date-fns';
import { fr } from 'date-fns/locale';
import { ALERT_URGENCE_JOURS, ALERT_WARNING_JOURS, MIN_RESERVATION_DAYS } from './constants';

export { formatCurrency, formatNumber } from './format';
export { calcNbJours, calcPalier, calcTarifTotal, type TarifPalier } from './pricing';

// ===== CLASSNAMES =====
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

// ===== FORMATAGE =====
function toValidDate(input: Date | string | null | undefined): Date | null {
  if (input === null || input === undefined) return null;
  const date = input instanceof Date ? input : new Date(input);
  return isValid(date) ? date : null;
}

export function formatDate(date: Date | string | null | undefined, fmt = 'dd/MM/yyyy'): string {
  const parsedDate = toValidDate(date);
  if (!parsedDate) return '-';
  return format(parsedDate, fmt, { locale: fr });
}

export function formatDateTime(date: Date | string | null | undefined): string {
  const parsedDate = toValidDate(date);
  if (!parsedDate) return '-';
  return format(parsedDate, "dd/MM/yyyy 'à' HH:mm", { locale: fr });
}

// ===== RECHERCHE PAR DATES (catalogue public) =====
export type SearchDateRange = {
  du: string;
  au: string;
  /** Début de location (00:00 UTC, même interprétation que le formulaire de réservation). */
  debut: Date;
  /** Fin exclusive : jour de retour + 1 (00:00 UTC). */
  fin: Date;
  /** Nombre de jours de location. */
  days: number;
};

const ISO_DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;

/**
 * Valide une plage de dates de recherche `du`/`au` (YYYY-MM-DD).
 * Retourne null si absentes, malformées, dans le passé, inversées
 * ou inférieures à la durée minimale de location.
 */
export function parseSearchDateRange(
  du: string | null | undefined,
  au: string | null | undefined,
  options?: { minDays?: number },
): SearchDateRange | null {
  const minDays = options?.minDays ?? MIN_RESERVATION_DAYS;
  if (!du || !au) return null;
  if (!ISO_DATE_PATTERN.test(du) || !ISO_DATE_PATTERN.test(au)) return null;

  const debut = new Date(du);
  const end = new Date(au);
  if (!isValid(debut) || !isValid(end)) return null;

  // Le départ ne peut pas être dans le passé (comparaison ISO sur les jours UTC).
  const todayUtc = new Date().toISOString().slice(0, 10);
  if (du < todayUtc) return null;

  const days = differenceInDays(end, debut);
  if (days < minDays) return null;

  return { du, au, debut, fin: new Date(debut.getTime() + (days + 1) * 86_400_000), days };
}

type VehiclePricingSource = Partial<{
  tarifParJour: number;
  tarifParJour10Plus: number;
  tarifParJour15Plus: number;
  tarifParJour30Plus: number;
  tarifJour: number;
  tarifJour10Plus: number;
  tarifJour15Plus: number;
  tarifJour30Plus: number;
}>;

export function resolveVehiclePricing(vehicle: VehiclePricingSource | null | undefined): {
  tarifJour: number;
  tarifJour10Plus: number;
} {
  const tarifJour = Number(vehicle?.tarifParJour ?? vehicle?.tarifJour ?? 0);
  const tarifJour10Plus = Number(
    vehicle?.tarifParJour10Plus
      ?? vehicle?.tarifJour10Plus
      ?? vehicle?.tarifParJour15Plus
      ?? vehicle?.tarifJour15Plus
      ?? vehicle?.tarifParJour30Plus
      ?? vehicle?.tarifJour30Plus
      ?? tarifJour
  );

  return {
    tarifJour,
    tarifJour10Plus,
  };
}

export function getVehicleDisplayPrice(vehicle: VehiclePricingSource | null | undefined): number {
  const { tarifJour } = resolveVehiclePricing(vehicle);
  return Number.isFinite(tarifJour) && tarifJour > 0 ? tarifJour : 0;
}

export function buildPdfViewerUrl(sourceUrl: string, fileName = 'document.pdf'): string {
  const trimmedName = fileName.trim();
  const safeName = trimmedName.replace(/[^a-zA-Z0-9._-]+/g, '-').replace(/-+/g, '-');
  const normalizedName = (safeName || 'document').toLowerCase().endsWith('.pdf')
    ? (safeName || 'document.pdf')
    : `${safeName || 'document'}.pdf`;

  return `/api/documents/open?url=${encodeURIComponent(sourceUrl)}&name=${encodeURIComponent(normalizedName)}`;
}

// ===== ALERTES MAINTENANCE =====
export type AlertSeverity = 'urgence' | 'warning' | 'ok' | 'depasse';

export function getAlertSeverity(date: Date | null | undefined): AlertSeverity {
  if (!date) return 'ok';
  const now = new Date();
  const d = new Date(date);
  if (isBefore(d, now)) return 'depasse';
  const daysLeft = differenceInDays(d, now);
  if (daysLeft <= ALERT_URGENCE_JOURS) return 'urgence';
  if (daysLeft <= ALERT_WARNING_JOURS) return 'warning';
  return 'ok';
}

export function getAlertKmSeverity(currentKm: number, alertKm: number | undefined): AlertSeverity {
  if (!alertKm) return 'ok';
  const diff = alertKm - currentKm;
  if (diff <= 0) return 'depasse';
  if (diff <= 500) return 'urgence';
  if (diff <= 2000) return 'warning';
  return 'ok';
}

// ===== SLUG =====
export function slugify(str: string): string {
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

/** Model-level slug: "Volkswagen T-Roc" → "volkswagen-t-roc" */
export function toModelSlug(marque: string, modele: string): string {
  return `${marque}-${modele}`
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

// ===== PAGINATION =====
export function parsePaginationParams(searchParams: URLSearchParams): {
  page: number;
  limit: number;
  skip: number;
} {
  const page = Math.max(1, parseInt(searchParams.get('page') ?? '1', 10));
  const limit = Math.min(100, Math.max(1, parseInt(searchParams.get('limit') ?? '20', 10)));
  return { page, limit, skip: (page - 1) * limit };
}

// ===== INITIALES AVATAR =====
export function getInitials(name: string): string {
  return name
    .split(' ')
    .slice(0, 2)
    .map((n) => n[0]?.toUpperCase() ?? '')
    .join('');
}

// ===== STATUT BADGE COLOR =====
export type StatutBadgeVariant = 'green' | 'blue' | 'amber' | 'red' | 'muted';

export function getStatutColor(statut: string): StatutBadgeVariant {
  const map: Record<string, StatutBadgeVariant> = {
    disponible: 'green',
    loue: 'blue',
    reserve: 'amber',
    maintenance: 'red',
    en_attente: 'amber',
    confirmee: 'green',
    en_cours: 'blue',
    terminee: 'muted',
    annulee: 'red',
    active: 'green',
    suspended: 'red',
    paye: 'green',
    partiel: 'amber',
    en_attente_pmt: 'red',
  };
  return map[statut] ?? 'muted';
}

// ===== UPLOAD UTILS =====
const MAGIC_BYTES: Record<string, number[]> = {
  'image/jpeg': [0xff, 0xd8, 0xff],
  'image/png': [0x89, 0x50, 0x4e, 0x47],
  'image/webp': [0x52, 0x49, 0x46, 0x46],
  'application/pdf': [0x25, 0x50, 0x44, 0x46],
};

export async function validateFileMagicBytes(file: File): Promise<boolean> {
  const buffer = await file.slice(0, 4).arrayBuffer();
  const bytes = new Uint8Array(buffer);
  for (const [, magic] of Object.entries(MAGIC_BYTES)) {
    if (magic.every((b, i) => bytes[i] === b)) return true;
  }
  return false;
}
