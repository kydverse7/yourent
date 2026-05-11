import { NextRequest } from 'next/server';
import { auth } from '@/lib/auth';
import { apiError, apiSuccess } from '@/lib/apiHelpers';
import { connectDB } from '@/lib/db';
import { Location } from '@/models/Location';
import { getWhatsAppConfigStatus, sendWhatsAppDetailed } from '@/lib/whatsapp';

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

const HOUR_FORMATTER = new Intl.DateTimeFormat('en-GB', {
  timeZone: 'Africa/Casablanca',
  hour: '2-digit',
  hour12: false,
});

const SCHEDULED_LOCAL_HOURS = new Set([7, 19]);

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

function casablancaHour(value: Date): number {
  return Number(HOUR_FORMATTER.format(value));
}

function isScheduledDispatchTime(value: Date): boolean {
  return SCHEDULED_LOCAL_HOURS.has(casablancaHour(value));
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
  const overdue = enCours.filter((loc) => {
    if (!loc.finPrevueAt) return false;
    return new Date(loc.finPrevueAt).getTime() < now.getTime() && dayKey(loc.finPrevueAt) !== todayKey;
  });
  const urgentReturns = [...overdue, ...dueToday];

  const lines: string[] = [
    `📊 *Point locations — ${formatDate(now)}*`,
    `🚗 Locations en cours : *${enCours.length}*`,
    `🔁 Retours prévus aujourd'hui : *${dueToday.length}*`,
    `⏰ Retards à ce jour : *${overdue.length}*`,
    '',
  ];

  if (enCours.length === 0) {
    lines.push('✅ Aucune voiture en location actuellement.');
  } else {
    lines.push('📋 *Voitures à suivre aujourd\'hui*');

    if (urgentReturns.length === 0) {
      lines.push('✅ Aucun retard ni retour prévu aujourd\'hui.');
    }

    urgentReturns.forEach((loc, idx) => {
      const vehicle = `${loc.vehicle?.marque ?? ''} ${loc.vehicle?.modele ?? ''}`.trim() || 'Véhicule';
      const immat = (loc.vehicle?.immatriculation ?? '').trim();
      const clientName = `${loc.client?.prenom ?? ''} ${loc.client?.nom ?? ''}`.trim() || 'Client';
      const phone = normalizePhone(loc.client?.whatsapp) || normalizePhone(loc.client?.telephone) || 'Non renseigné';
      const retourDate = loc.finPrevueAt ? formatDate(new Date(loc.finPrevueAt)) : '--/--/----';
      const retourHeure = formatTime(loc.finPrevueAt);
      const status = dayKey(loc.finPrevueAt) === todayKey
        ? '🟠 Retour aujourd\'hui'
        : loc.finPrevueAt && new Date(loc.finPrevueAt).getTime() < now.getTime()
          ? '🔴 En retard'
          : '';

      lines.push(`${idx + 1}. ${status ? `${status} — ` : ''}🚘 ${vehicle}${immat ? ` (${immat})` : ''}`);
      lines.push(`   👤 ${clientName} | 📞 ${phone}`);
      lines.push(`   📅 Retour prévu: ${retourDate} | 🕒 ${retourHeure}`);
    });
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
  const isScheduledRequest = cronAuthorized && req.method === 'GET';

  if (!session && !cronAuthorized) {
    return apiError('Non autorisé', 401);
  }

  if (session && session.user.status === 'suspended') {
    return apiError('Compte suspendu', 403);
  }

  const now = new Date();

  if (isScheduledRequest && !isScheduledDispatchTime(now)) {
    return apiSuccess({
      sent: false,
      skipped: true,
      reason: 'outside_casablanca_schedule',
      date: formatDate(now),
      localHour: casablancaHour(now),
    });
  }

  const summary = await buildDailySummaryMessage(now);
  const configStatus = getWhatsAppConfigStatus();
  const target = configStatus.hasNotifyChatId ? 'group' : configStatus.hasNotifyPhone ? 'phone' : null;

  if (!configStatus.hasIdInstance || !configStatus.hasApiToken) {
    return apiError('Green API non configurée sur ce déploiement: ajoutez GREEN_API_ID_INSTANCE et GREEN_API_TOKEN sur Vercel', 500, {
      enCours: summary.enCours,
      retoursToday: summary.retoursToday,
      config: configStatus,
    });
  }

  if (!target) {
    return apiError('Aucun destinataire WhatsApp configuré: ajoutez GREEN_API_NOTIFY_CHAT_ID ou GREEN_API_NOTIFY_PHONE sur Vercel', 500, {
      enCours: summary.enCours,
      retoursToday: summary.retoursToday,
      config: configStatus,
    });
  }

  const sendResult = await sendWhatsAppDetailed(summary.message);

  if (!sendResult.ok) {
    const responseSnippet = sendResult.responseText
      ? sendResult.responseText.replace(/\s+/g, ' ').slice(0, 180)
      : undefined;

    return apiError(
      [
        sendResult.error || `Échec envoi WhatsApp (${target === 'group' ? 'groupe' : 'numéro admin'})`,
        responseSnippet,
      ].filter(Boolean).join(' — '),
      500,
      {
      enCours: summary.enCours,
      retoursToday: summary.retoursToday,
      target,
        recipient: sendResult.recipient,
        config: sendResult.config,
        status: sendResult.status,
      },
    );
  }

  return apiSuccess({
    sent: true,
    enCours: summary.enCours,
    retoursToday: summary.retoursToday,
    date: formatDate(now),
    target,
    recipient: sendResult.recipient,
  });
}

export async function GET(req: NextRequest) {
  return handle(req);
}

export async function POST(req: NextRequest) {
  return handle(req);
}
