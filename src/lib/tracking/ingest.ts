import { z } from 'zod';
import {
  ACTION_KINDS,
  SOURCE_KEYS,
  normalizePath,
  pageKindOf,
  vehicleSlugOf,
  type ActionKind,
} from './shared';

/** Conservation des visites en base (index TTL sur `at`). */
export const VISIT_RETENTION_DAYS = 90;
/** Taille maximale d'un envoi accepté par l'API de collecte. */
export const TRACK_MAX_BYTES = 16 * 1024;
/** Bornes par visite : au-delà, les pages et actions suivantes ne sont plus conservées. */
export const MAX_PAGES_PER_VISIT = 60;
export const MAX_EVENTS_PER_VISIT = 150;

const text = (max: number) =>
  z
    .string()
    .max(max * 2)
    .transform((value) => value.replace(/[\u0000-\u001f\u007f]/g, '').trim().slice(0, max));

const pathSchema = z
  .string()
  .min(1)
  .max(400)
  .refine((value) => value.startsWith('/'), 'Adresse invalide')
  .transform(normalizePath);

const slugSchema = z.string().regex(/^[a-z0-9][a-z0-9-]{0,80}$/i).transform((value) => value.toLowerCase());
const seqSchema = z.number().int().min(0).max(999);
/** Durée en secondes (plafonnée à 4 h) et défilement en pourcentage. */
const durationSchema = z.number().min(0).max(1e7).transform((value) => Math.min(Math.round(value), 4 * 3600));
const scrollSchema = z.number().min(0).max(100).transform((value) => Math.round(value));

const viewSchema = z.object({
  k: z.literal('view'),
  n: seqSchema,
  p: pathSchema,
  d: durationSchema.optional(),
  s: scrollSchema.optional(),
});

const leaveSchema = z.object({
  k: z.literal('leave'),
  n: seqSchema,
  d: durationSchema,
  s: scrollSchema,
});

const actionSchema = z.object({
  k: z.enum(ACTION_KINDS),
  p: pathSchema,
  tg: text(160).optional(),
  v: slugSchema.optional(),
  lb: text(60).optional(),
});

const eventSchema = z.union([viewSchema, leaveSchema, actionSchema]);

export const trackPayloadSchema = z.object({
  v: z.literal(1),
  sid: z.string().regex(/^[A-Za-z0-9_-]{12,40}$/),
  m: z.object({
    src: z.enum(SOURCE_KEYS),
    sd: text(100).optional(),
    med: text(60).optional(),
    cmp: text(100).optional(),
    entry: pathSchema,
    lang: z.enum(['fr', 'en', 'ar']),
    bl: z.string().regex(/^[a-z]{2,3}$/i).transform((value) => value.toLowerCase()).optional(),
    dev: z.enum(['mobile', 'tablet', 'desktop']),
  }),
  e: z.array(eventSchema).min(1).max(40),
});

export type TrackPayload = z.infer<typeof trackPayloadSchema>;

/** Robots, aperçus de liens, outils de mesure de vitesse et navigateurs automatisés. */
const BOT_UA = /bot\b|bot\/|crawl|spider|slurp|scrap|preview|facebookexternalhit|facebookcatalog|embedly|quora link|whatsapp\/|telegram|discord|skype|headless|lighthouse|pagespeed|gtmetrix|pingdom|uptime|monitor|python|curl|wget|httpclient|okhttp|java\/|go-http|axios|node-fetch|undici|phantomjs|selenium|puppeteer|playwright|ahrefs|semrush|mj12|dotbot|petalbot|yandex|baidu|bytespider|applebot|google-inspectiontool|adsbot|mediapartners|feedfetcher|google-read-aloud|chrome-lighthouse|gptbot|chatgpt-user|oai-searchbot|claudebot|perplexitybot|ccbot|amazonbot/i;

export function isBotUserAgent(ua: string | null | undefined): boolean {
  if (!ua || ua.length < 20) return true;
  return BOT_UA.test(ua);
}

export interface VisitorContext {
  ip?: string;
  city?: string;
  region?: string;
  cc?: string;
}

/** Adresse IP et localisation fournies par Vercel (en-têtes x-forwarded-for et x-vercel-ip-*). */
export function visitorContext(headers: { get(name: string): string | null }): VisitorContext {
  const forwarded = headers.get('x-forwarded-for')?.split(',')[0]?.trim();
  const rawIp = forwarded || headers.get('x-real-ip')?.trim() || '';
  const ip = /^[0-9a-fA-F:.]{3,45}$/.test(rawIp) ? rawIp : undefined;

  let city: string | undefined;
  const rawCity = headers.get('x-vercel-ip-city');
  if (rawCity) {
    try {
      city = decodeURIComponent(rawCity);
    } catch {
      city = rawCity;
    }
    city = city.replace(/[\u0000-\u001f\u007f]/g, '').trim().slice(0, 80) || undefined;
  }

  const rawRegion = headers.get('x-vercel-ip-country-region')?.trim().toUpperCase();
  const region = rawRegion && /^[A-Z0-9-]{1,10}$/.test(rawRegion) ? rawRegion : undefined;
  const rawCountry = headers.get('x-vercel-ip-country')?.trim().toUpperCase();
  const cc = rawCountry && /^[A-Z]{2}$/.test(rawCountry) ? rawCountry : undefined;

  return { ip, city, region, cc };
}

/** Indicateurs de parcours posés sur la visite. */
const FLAG_BY_ACTION: Partial<Record<ActionKind, string[]>> = {
  wa: ['wa'],
  tel: ['tel'],
  form: ['form'],
  submit: ['form'],
  res: ['sub'],
};

function compact<T extends Record<string, unknown>>(value: T): T {
  return Object.fromEntries(Object.entries(value).filter(([, v]) => v !== undefined && v !== null && v !== '')) as T;
}

export type VisitWrite = {
  updateOne: {
    filter: Record<string, unknown>;
    update: Record<string, unknown>;
    upsert?: boolean;
    arrayFilters?: Record<string, unknown>[];
  };
};

/**
 * Traduit un envoi du site en écritures MongoDB sur le document de la visite (un document par session) :
 * création au premier envoi (origine, page d'entrée, appareil, IP, ville), ajout des pages et des actions,
 * puis durée et défilement des pages quittées.
 */
export function buildVisitWrites(payload: TrackPayload, context: VisitorContext, now: Date): VisitWrite[] {
  const { sid, m, e } = payload;
  const flags = new Set<string>();
  const pages: Record<string, unknown>[] = [];
  const events: Record<string, unknown>[] = [];
  const leaves: { n: number; d: number; s: number }[] = [];

  for (const event of e) {
    if (event.k === 'view') {
      const kind = pageKindOf(event.p);
      if (kind === 'catalogue') flags.add('cat');
      if (kind === 'vehicle') flags.add('veh');
      if (kind === 'confirmation') flags.add('sub');
      pages.push(
        compact({
          n: event.n,
          p: event.p,
          v: kind === 'vehicle' ? vehicleSlugOf(event.p) : undefined,
          t: now,
          d: event.d,
          s: event.s,
        }),
      );
    } else if (event.k === 'leave') {
      leaves.push({ n: event.n, d: event.d, s: event.s });
    } else {
      for (const flag of FLAG_BY_ACTION[event.k] ?? []) flags.add(flag);
      events.push(compact({ k: event.k, p: event.p, tg: event.tg, v: event.v, lb: event.lb, t: now }));
    }
  }

  const update: Record<string, unknown> = {
    $setOnInsert: compact({
      at: now,
      ip: context.ip,
      city: context.city,
      region: context.region,
      cc: context.cc,
      src: m.src,
      sd: m.sd,
      med: m.med,
      cmp: m.cmp,
      entry: m.entry,
      lang: m.lang,
      bl: m.bl,
      dev: m.dev,
    }),
    $max: { last: now },
  };
  if (pages.length) update.$inc = { pv: pages.length };
  const push: Record<string, unknown> = {};
  if (pages.length) push.pages = { $each: pages, $sort: { n: 1 }, $slice: MAX_PAGES_PER_VISIT };
  if (events.length) push.ev = { $each: events, $slice: MAX_EVENTS_PER_VISIT };
  if (Object.keys(push).length) update.$push = push;
  if (flags.size) update.$set = Object.fromEntries([...flags].sort().map((flag) => [`fl.${flag}`, true]));

  const writes: VisitWrite[] = [{ updateOne: { filter: { _id: sid }, update, upsert: true } }];

  /* La même page peut être quittée plusieurs fois (onglet masqué puis repris) : on garde le maximum. */
  for (const leave of leaves) {
    writes.push({
      updateOne: {
        filter: { _id: sid },
        update: { $max: { 'pages.$[page].d': leave.d, 'pages.$[page].s': leave.s, last: now } },
        arrayFilters: [{ 'page.n': leave.n }],
      },
    });
  }
  return writes;
}
