import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { format, differenceInDays, isBefore } from 'date-fns';
import { fr } from 'date-fns/locale';
import { ALERT_URGENCE_JOURS, ALERT_WARNING_JOURS, PALIERS } from './constants';

// ===== CLASSNAMES =====
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

// ===== FORMATAGE =====
export function formatDate(date: Date | string, fmt = 'dd/MM/yyyy'): string {
  return format(new Date(date), fmt, { locale: fr });
}

export function formatDateTime(date: Date | string): string {
  return format(new Date(date), "dd/MM/yyyy 'à' HH:mm", { locale: fr });
}

export function formatCurrency(amount: number, currency = 'MAD'): string {
  return new Intl.NumberFormat('fr-MA', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatNumber(n: number): string {
  return new Intl.NumberFormat('fr-MA').format(n);
}

// ===== CALCUL TARIFS =====
export function calcNbJours(debut: Date, fin: Date): number {
  return Math.max(1, differenceInDays(new Date(fin), new Date(debut)));
}

export type TarifPalier = 'standard' | '10Plus';

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

export function calcPalier(nbJours: number): TarifPalier {
  if (nbJours >= PALIERS.LONG.min) return '10Plus';
  return 'standard';
}

export function calcTarifTotal(
  nbJours: number,
  tarifParJour: number,
  tarifParJour10Plus = 0
): { palier: TarifPalier; tarifJour: number; total: number } {
  const palier = calcPalier(nbJours);
  const tarifJour = palier === '10Plus' ? (tarifParJour10Plus || tarifParJour) : tarifParJour;
  return { palier, tarifJour, total: tarifJour * nbJours };
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
export function getStatutColor(statut: string): string {
  const map: Record<string, string> = {
    disponible: 'text-green-400 bg-green-400/15 border-green-400/30',
    loue: 'text-blue-400 bg-blue-400/15 border-blue-400/30',
    reserve: 'text-amber-400 bg-amber-400/15 border-amber-400/30',
    maintenance: 'text-red-400 bg-red-400/15 border-red-400/30',
    en_attente: 'text-amber-400 bg-amber-400/15 border-amber-400/30',
    confirmee: 'text-green-400 bg-green-400/15 border-green-400/30',
    en_cours: 'text-blue-400 bg-blue-400/15 border-blue-400/30',
    terminee: 'text-[#A89880] bg-[#A89880]/15 border-[#A89880]/30',
    annulee: 'text-red-400 bg-red-400/15 border-red-400/30',
    active: 'text-green-400 bg-green-400/15 border-green-400/30',
    suspended: 'text-red-400 bg-red-400/15 border-red-400/30',
    paye: 'text-green-400 bg-green-400/15 border-green-400/30',
    partiel: 'text-amber-400 bg-amber-400/15 border-amber-400/30',
    en_attente_pmt: 'text-red-400 bg-red-400/15 border-red-400/30',
  };
  return map[statut] ?? 'text-[#A89880] bg-[#A89880]/15 border-[#A89880]/30';
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
