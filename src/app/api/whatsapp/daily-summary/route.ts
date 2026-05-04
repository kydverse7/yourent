import { NextRequest } from 'next/server';
import { auth } from '@/lib/auth';
import { apiError, apiSuccess } from '@/lib/apiHelpers';
import { connectDB } from '@/lib/db';
import { Location } from '@/models/Location';
import { sendWhatsAppToGroup } from '@/lib/whatsapp';

type LeanLocation = {
  debutAt?: Date | string;
  finPrevueAt?: Date | string;
  vehicle?: {
    marque?: string;
    modele?: string;
    immatriculation?: string;
  } | null;
  client?: {
    nom?: string;
    prenom?: string;
    telephone?: string;
    whatsapp?: string;
  } | null;
};

const DAY_FORMATTER = new Intl.DateTimeFormat('en-CA', {
  timeZone: 'Africa/Casablanca',
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
});

const DATE_FORMATTER = new Intl.DateTimeFormat('fr-MA', {
  timeZone: 'Africa/Casablanca',
  day: '2-digit',
  month: '2-digit',
  year: 'numeric',
});

const TIME_FORMATTER = new Intl.DateTimeFormat('fr-MA', {
  timeZone: 'Africa/Casablanca',
  hour: '2-digit',
  minute: '2-digit',
  hour12: false,
});

function dayKey(value: Date | string | undefined): string {
  if (!value) return '';
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return '';
  return DAY_FORMATTER.format(d);
}

function formatDate(value: Date): string {
  return DATE_FORMATTER.format(value);
}

function formatTime(value: Date | string | undefined): string {
  if (!value) return '--:--';
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return '--:--';
  return TIME_FORMATTER.format(d);
}

function normalizePhone(value?: string): string {
  return (value ?? '').trim();
}

function getCronSecret(req: NextRequest): string {
  const bearer = req.headers.get('authorization');
  if (bearer?.startsWith('Bearer ')) {
    return bearer.slice(7).trim();
  }

  return (
    req.headers.get('x-cron-secret')
    ?? req.nextUrl.searchParams.get('secret')
    ?? ''
  ).trim();
}

function isCronAuthorized(req: NextRequest): boolean {
  const expected = (process.env.WHATSAPP_CRON_SECRET ?? process.env.CRON_SECRET)?.trim();
  if (!expected) return false;
  return getCronSecret(req) === expected;
}

async function buildDailySummaryMessage(now: Date): Promise<{ message: string; enCours: number; retoursToday: number }> {
  await connectDB();

  const enCours = await Location.find({ statut: 'en_cours' })
    .select('debutAt finPrevueAt vehicle client')
    .populate('vehicle', 'marque modele immatriculation')
    .populate('client', 'prenom nom telephone whatsapp')
    .sort({ finPrevueAt: 1 })
    .lean<LeanLocation[]>();

  const todayKey = dayKey(now);
  const dueToday = enCours.filter((loc) => dayKey(loc.finPrevueAt) === todayKey);

  const lines: string[] = [
    `📊 *Point locations — ${formatDate(now)}*`,
    `🚗 Locations en cours : *${enCours.length}*`,
    `🔁 Retours prévus aujourd'hui : *${dueToday.length}*`,
    '',
  ];

  if (dueToday.length === 0) {
    lines.push('✅ Aucun retour prévu aujourd\'hui.');
  } else {
    lines.push('📋 *Clients à contacter (retours du jour)*');

    const maxRows = 25;
    dueToday.slice(0, maxRows).forEach((loc, idx) => {
      const vehicle = `${loc.vehicle?.marque ?? ''} ${loc.vehicle?.modele ?? ''}`.trim() || 'Véhicule';
      const immat = (loc.vehicle?.immatriculation ?? '').trim();
      const clientName = `${loc.client?.prenom ?? ''} ${loc.client?.nom ?? ''}`.trim() || 'Client';
      const phone = normalizePhone(loc.client?.whatsapp) || normalizePhone(loc.client?.telephone) || 'Non renseigné';
      const retourHeure = formatTime(loc.finPrevueAt);

      lines.push(`${idx + 1}. 🚘 ${vehicle}${immat ? ` (${immat})` : ''}`);
      lines.push(`   👤 ${clientName} | 📞 ${phone} | 🕒 ${retourHeure}`);
    });

    if (dueToday.length > maxRows) {
      lines.push(`… et ${dueToday.length - maxRows} autre(s) retour(s).`);
    }
  }

  lines.push('');
  lines.push('— Yourent Ops Bot');

  return {
    message: lines.join('\n'),
    enCours: enCours.length,
    retoursToday: dueToday.length,
  };
}

async function handle(req: NextRequest) {
  const session = await auth();
  const cronAuthorized = isCronAuthorized(req);

  if (!session && !cronAuthorized) {
    return apiError('Non autorisé', 401);
  }

  if (session && session.user.status === 'suspended') {
    return apiError('Compte suspendu', 403);
  }

  const now = new Date();
  const summary = await buildDailySummaryMessage(now);

  if (!process.env.GREEN_API_NOTIFY_CHAT_ID?.trim()) {
    return apiError('GREEN_API_NOTIFY_CHAT_ID manquant (groupe WhatsApp non configuré)', 500, {
      enCours: summary.enCours,
      retoursToday: summary.retoursToday,
    });
  }

  const sent = await sendWhatsAppToGroup(summary.message);

  if (!sent) {
    return apiError('Échec envoi WhatsApp groupe (vérifiez GREEN_API_* et GREEN_API_NOTIFY_CHAT_ID)', 500, {
      enCours: summary.enCours,
      retoursToday: summary.retoursToday,
    });
  }

  return apiSuccess({
    sent: true,
    enCours: summary.enCours,
    retoursToday: summary.retoursToday,
    date: formatDate(now),
  });
}

export async function GET(req: NextRequest) {
  return handle(req);
}

export async function POST(req: NextRequest) {
  return handle(req);
}
