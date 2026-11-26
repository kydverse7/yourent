import type { ISiteVisit } from '@/models/SiteVisit';
import { stripLocale, type SourceKey } from './shared';

/**
 * Statistiques du site public : périodes, pipeline d'agrégation MongoDB et mise en forme des résultats.
 * Tout est pur (sans accès à la base) pour être testé sur des données en mémoire.
 */

export const STATS_TIMEZONE = 'Africa/Casablanca';

/* ───────────────────────── Périodes ───────────────────────── */

export const PERIOD_KEYS = ['today', '7', '30', '90'] as const;
export type PeriodKey = (typeof PERIOD_KEYS)[number];

export const PERIOD_LABELS: Record<PeriodKey, string> = {
  today: "Aujourd'hui",
  '7': '7 jours',
  '30': '30 jours',
  '90': '90 jours',
};

export function parsePeriod(value: string | string[] | undefined): PeriodKey {
  const raw = Array.isArray(value) ? value[0] : value;
  return (PERIOD_KEYS as readonly string[]).includes(raw ?? '') ? (raw as PeriodKey) : '7';
}

interface ZonedParts {
  y: number;
  m: number;
  d: number;
  h: number;
  mi: number;
  s: number;
}

function zonedParts(date: Date, timeZone = STATS_TIMEZONE): ZonedParts {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hourCycle: 'h23',
  }).formatToParts(date);
  const get = (type: string) => Number(parts.find((part) => part.type === type)?.value ?? 0);
  return { y: get('year'), m: get('month'), d: get('day'), h: get('hour') % 24, mi: get('minute'), s: get('second') };
}

/** Décalage du fuseau à un instant donné (ms à ajouter à l'heure UTC). */
function zoneOffset(date: Date, timeZone = STATS_TIMEZONE): number {
  const p = zonedParts(date, timeZone);
  return Date.UTC(p.y, p.m - 1, p.d, p.h, p.mi, p.s) - Math.floor(date.getTime() / 1000) * 1000;
}

/** Jour calendaire (AAAA-MM-JJ) d'un instant, à l'heure de Casablanca. */
export function dayKey(date: Date, timeZone = STATS_TIMEZONE): string {
  const p = zonedParts(date, timeZone);
  return `${p.y}-${String(p.m).padStart(2, '0')}-${String(p.d).padStart(2, '0')}`;
}

/** Minuit (heure de Casablanca) du jour donné, en instant UTC. */
export function startOfDay(key: string, timeZone = STATS_TIMEZONE): Date {
  const [y, m, d] = key.split('-').map(Number);
  const guess = Date.UTC(y, m - 1, d);
  const first = guess - zoneOffset(new Date(guess), timeZone);
  /* Changement d'heure dans la nuit : on recale avec le décalage en vigueur à l'instant trouvé. */
  return new Date(guess - zoneOffset(new Date(first), timeZone));
}

function addDays(key: string, days: number): string {
  const [y, m, d] = key.split('-').map(Number);
  return new Date(Date.UTC(y, m - 1, d + days)).toISOString().slice(0, 10);
}

export interface ResolvedPeriod {
  key: PeriodKey;
  label: string;
  from: Date;
  to: Date;
  /** Découpage du graphique : par heure pour aujourd'hui, par jour sinon. */
  granularity: 'hour' | 'day';
  /** Tranches du graphique, dans l'ordre (AAAA-MM-JJ ou HH). */
  buckets: string[];
}

export function resolvePeriod(key: PeriodKey, now: Date): ResolvedPeriod {
  const today = dayKey(now);
  if (key === 'today') {
    const currentHour = zonedParts(now).h;
    return {
      key,
      label: PERIOD_LABELS[key],
      from: startOfDay(today),
      to: now,
      granularity: 'hour',
      buckets: Array.from({ length: currentHour + 1 }, (_, h) => String(h).padStart(2, '0')),
    };
  }
  const count = Number(key);
  const first = addDays(today, -(count - 1));
  return {
    key,
    label: PERIOD_LABELS[key],
    from: startOfDay(first),
    to: now,
    granularity: 'day',
    buckets: Array.from({ length: count }, (_, i) => addDays(first, i)),
  };
}

/* ───────────────────────── Libellés ───────────────────────── */

export const SOURCE_LABELS: Record<SourceKey, string> = {
  google_ads: 'Google Ads',
  google: 'Google (naturel)',
  bing: 'Bing',
  facebook: 'Facebook',
  instagram: 'Instagram',
  whatsapp: 'WhatsApp',
  ai: 'Assistants IA',
  direct: 'Accès direct',
  campaign: 'Campagne (UTM)',
  referral: 'Autres sites',
};

/** Ordre d'affichage des origines nommées ; les autres sites suivent, classés par visites. */
const SOURCE_ORDER: SourceKey[] = ['google_ads', 'google', 'bing', 'facebook', 'instagram', 'whatsapp', 'ai', 'direct'];

export function sourceLabel(src: string, detail?: string | null): string {
  if (src === 'referral') return detail || SOURCE_LABELS.referral;
  if (src === 'campaign') return detail ? `Campagne : ${detail}` : SOURCE_LABELS.campaign;
  return SOURCE_LABELS[src as SourceKey] ?? src;
}

export const ACTION_LABELS: Record<string, string> = {
  wa: 'WhatsApp',
  tel: 'Appel',
  mail: 'E-mail',
  book: 'Bouton Réserver',
  car: 'Voiture',
  link: 'Lien',
  out: 'Site externe',
  lang: 'Langue',
  form: 'Formulaire commencé',
  submit: 'Formulaire envoyé',
  search: 'Recherche',
  res: 'Demande enregistrée',
  cta: 'Bouton',
};

/** Actions comptées comme des clics (le reste : étapes du parcours). */
export const CLICK_KINDS = ['wa', 'tel', 'mail', 'book', 'car', 'link', 'out', 'lang', 'cta', 'search'];

export const DEVICE_LABELS: Record<string, string> = {
  mobile: 'Mobile',
  tablet: 'Tablette',
  desktop: 'Ordinateur',
};

export const LANG_LABELS: Record<string, string> = {
  fr: 'Français',
  en: 'Anglais',
  ar: 'Arabe',
};

export function countryName(code: string | null | undefined): string {
  if (!code) return 'Inconnu';
  try {
    return new Intl.DisplayNames(['fr'], { type: 'region' }).of(code) ?? code;
  } catch {
    return code;
  }
}

export function languageName(code: string | null | undefined): string {
  if (!code) return 'Inconnue';
  if (LANG_LABELS[code]) return LANG_LABELS[code];
  try {
    const name = new Intl.DisplayNames(['fr'], { type: 'language' }).of(code) ?? code;
    return name.charAt(0).toUpperCase() + name.slice(1);
  } catch {
    return code;
  }
}

/** Nom lisible d'une adresse du site. */
export function pageLabel(path: string): string {
  const clean = stripLocale(path);
  const prefix = path.startsWith('/en') ? 'EN · ' : path.startsWith('/ar') ? 'AR · ' : '';
  if (clean === '/') return `${prefix}Accueil`;
  return `${prefix}${clean}`;
}

/* ───────────────────────── Pipeline MongoDB ───────────────────────── */

type Expr = Record<string, unknown> | string | number | boolean | null | unknown[];

const isTrue = (field: string): Expr => ({ $eq: [`$${field}`, true] });
const countIf = (expr: Expr) => ({ $sum: { $cond: [expr, 1, 0] } });
const countEvents = (kind: string): Expr => ({
  $size: { $filter: { input: { $ifNull: ['$ev', []] }, as: 'e', cond: { $eq: ['$$e.k', kind] } } },
});
const CONTACT: Expr = { $or: [isTrue('fl.wa'), isTrue('fl.tel'), isTrue('fl.sub')] };
const SUBMITTED: Expr = isTrue('fl.sub');

/** Compteurs communs à chaque regroupement (visites, contacts, demandes). */
const VISIT_COUNTERS = {
  visits: { $sum: 1 },
  contacts: { $sum: '$_c' },
  subs: { $sum: '$_s' },
};

function byField(field: Expr, limit: number) {
  return [{ $group: { _id: field, ...VISIT_COUNTERS } }, { $sort: { visits: -1 as const, _id: 1 as const } }, { $limit: limit }];
}

/**
 * Pipeline d'agrégation : une seule lecture de la période, tous les regroupements en parallèle ($facet).
 * Chaque visite est un document (pages et actions en tableaux) : les regroupements restent petits.
 */
export function buildStatsPipeline(period: Pick<ResolvedPeriod, 'from' | 'to' | 'granularity'>): Record<string, unknown>[] {
  const bucket =
    period.granularity === 'hour'
      ? { $dateToString: { format: '%H', date: '$at', timezone: STATS_TIMEZONE } }
      : { $dateToString: { format: '%Y-%m-%d', date: '$at', timezone: STATS_TIMEZONE } };

  return [
    { $match: { at: { $gte: period.from, $lte: period.to } } },
    {
      $project: {
        src: 1,
        sd: 1,
        med: 1,
        cmp: 1,
        entry: 1,
        dev: 1,
        cc: 1,
        city: 1,
        lang: 1,
        bl: 1,
        fl: 1,
        at: 1,
        pv: { $ifNull: ['$pv', 0] },
        pages: { $ifNull: ['$pages', []] },
        ev: { $ifNull: ['$ev', []] },
        _c: { $cond: [CONTACT, 1, 0] },
        _s: { $cond: [SUBMITTED, 1, 0] },
        _np: { $size: { $ifNull: ['$pages', []] } },
        _dur: { $sum: { $ifNull: ['$pages.d', []] } },
      },
    },
    {
      $facet: {
        totals: [
          {
            $group: {
              _id: null,
              ...VISIT_COUNTERS,
              pageviews: { $sum: '$pv' },
              ads: countIf({ $eq: ['$src', 'google_ads'] }),
              wa: { $sum: countEvents('wa') },
              tel: { $sum: countEvents('tel') },
              waVisits: countIf(isTrue('fl.wa')),
              telVisits: countIf(isTrue('fl.tel')),
              forms: countIf({ $or: [isTrue('fl.form'), SUBMITTED] }),
              bounces: countIf({ $lte: ['$pv', 1] }),
              duration: { $sum: '$_dur' },
            },
          },
        ],
        funnel: [
          {
            $group: {
              _id: null,
              visits: { $sum: 1 },
              browse: countIf({ $or: [isTrue('fl.cat'), isTrue('fl.veh'), isTrue('fl.form'), SUBMITTED] }),
              vehicle: countIf({ $or: [isTrue('fl.veh'), isTrue('fl.form'), SUBMITTED] }),
              form: countIf({ $or: [isTrue('fl.form'), SUBMITTED] }),
              sub: { $sum: '$_s' },
            },
          },
        ],
        sources: [
          {
            $group: {
              _id: { src: '$src', sd: { $cond: [{ $in: ['$src', ['referral', 'campaign']] }, '$sd', null] } },
              ...VISIT_COUNTERS,
              wa: { $sum: countEvents('wa') },
              tel: { $sum: countEvents('tel') },
            },
          },
          { $sort: { visits: -1 } },
          { $limit: 60 },
        ],
        campaigns: [
          { $match: { $or: [{ cmp: { $type: 'string' } }, { med: { $type: 'string' } }] } },
          { $group: { _id: { src: '$src', sd: '$sd', med: '$med', cmp: '$cmp' }, ...VISIT_COUNTERS } },
          { $sort: { visits: -1 } },
          { $limit: 30 },
        ],
        entries: [
          { $group: { _id: '$entry', ...VISIT_COUNTERS, bounces: countIf({ $lte: ['$pv', 1] }) } },
          { $sort: { visits: -1, _id: 1 } },
          { $limit: 25 },
        ],
        pages: [
          { $unwind: { path: '$pages', includeArrayIndex: '_i' } },
          {
            $group: {
              _id: '$pages.p',
              views: { $sum: 1 },
              exits: countIf({ $eq: ['$_i', { $subtract: ['$_np', 1] }] }),
              dSum: { $sum: { $cond: [{ $isNumber: '$pages.d' }, '$pages.d', 0] } },
              dN: countIf({ $isNumber: '$pages.d' }),
              sSum: { $sum: { $cond: [{ $isNumber: '$pages.s' }, '$pages.s', 0] } },
              sN: countIf({ $isNumber: '$pages.s' }),
            },
          },
          { $sort: { views: -1, _id: 1 } },
          { $limit: 60 },
        ],
        clicks: [
          { $unwind: '$ev' },
          { $match: { 'ev.k': { $in: CLICK_KINDS } } },
          { $group: { _id: { k: '$ev.k', tg: '$ev.tg', p: '$ev.p', lb: '$ev.lb' }, count: { $sum: 1 } } },
          { $sort: { count: -1 } },
          { $limit: 20 },
        ],
        actions: [
          { $unwind: '$ev' },
          { $group: { _id: { k: '$ev.k', s: '$_id' }, n: { $sum: 1 } } },
          { $group: { _id: '$_id.k', count: { $sum: '$n' }, visits: { $sum: 1 } } },
        ],
        vehicleViews: [
          { $unwind: '$pages' },
          { $match: { 'pages.v': { $type: 'string' } } },
          { $group: { _id: { v: '$pages.v', s: '$_id' }, n: { $sum: 1 } } },
          { $group: { _id: '$_id.v', views: { $sum: '$n' }, visits: { $sum: 1 } } },
          { $sort: { views: -1 } },
          { $limit: 40 },
        ],
        vehicleActions: [
          { $unwind: '$ev' },
          { $match: { 'ev.v': { $type: 'string' }, 'ev.k': { $in: ['car', 'book', 'form', 'res'] } } },
          { $group: { _id: { v: '$ev.v', k: '$ev.k' }, count: { $sum: 1 } } },
        ],
        devices: byField('$dev', 10),
        countries: byField('$cc', 30),
        cities: byField({ city: '$city', cc: '$cc' }, 30),
        langs: byField('$lang', 10),
        browserLangs: byField('$bl', 15),
        series: [
          {
            $group: {
              _id: bucket,
              ...VISIT_COUNTERS,
              pageviews: { $sum: '$pv' },
              ads: countIf({ $eq: ['$src', 'google_ads'] }),
            },
          },
        ],
      },
    },
  ];
}

/* ───────────────────────── Résultat brut ($facet) ───────────────────────── */

interface Counters {
  visits: number;
  contacts: number;
  subs: number;
}

export interface RawStats {
  totals: (Counters & {
    pageviews: number;
    ads: number;
    wa: number;
    tel: number;
    waVisits: number;
    telVisits: number;
    forms: number;
    bounces: number;
    duration: number;
  })[];
  funnel: { visits: number; browse: number; vehicle: number; form: number; sub: number }[];
  sources: (Counters & { _id: { src: string; sd?: string | null }; wa: number; tel: number })[];
  campaigns: (Counters & { _id: { src: string; sd?: string | null; med?: string | null; cmp?: string | null } })[];
  entries: (Counters & { _id: string | null; bounces: number })[];
  pages: { _id: string; views: number; exits: number; dSum: number; dN: number; sSum: number; sN: number }[];
  clicks: { _id: { k: string; tg?: string | null; p?: string | null; lb?: string | null }; count: number }[];
  actions: { _id: string; count: number; visits: number }[];
  vehicleViews: { _id: string; views: number; visits: number }[];
  vehicleActions: { _id: { v: string; k: string }; count: number }[];
  devices: (Counters & { _id: string | null })[];
  countries: (Counters & { _id: string | null })[];
  cities: (Counters & { _id: { city?: string | null; cc?: string | null } })[];
  langs: (Counters & { _id: string | null })[];
  browserLangs: (Counters & { _id: string | null })[];
  series: (Counters & { _id: string; pageviews: number; ads: number })[];
}

/* ───────────────────────── Mise en forme ───────────────────────── */

export interface BreakdownRow {
  key: string;
  label: string;
  visits: number;
  contacts: number;
  submissions: number;
  /** Visites avec contact (WhatsApp, appel ou demande) / visites, en %. */
  contactRate: number;
  /** Part des visites de la période, en %. */
  share: number;
}

export interface SourceRow extends BreakdownRow {
  src: string;
  whatsapp: number;
  calls: number;
}

export interface CampaignRow extends BreakdownRow {
  source: string;
  utmSource: string;
  medium: string;
  campaign: string;
}

export interface EntryRow extends BreakdownRow {
  path: string;
  bounceRate: number;
}

export interface PageRow {
  path: string;
  label: string;
  views: number;
  exits: number;
  exitRate: number;
  avgDuration: number | null;
  avgScroll: number | null;
}

export interface FunnelStep {
  key: string;
  label: string;
  count: number;
  /** Part des visites, en %. */
  ofVisits: number;
  /** Visites perdues depuis l'étape précédente. */
  lost: number;
  /** Perte depuis l'étape précédente, en %. */
  lostRate: number;
}

export interface ClickRow {
  kind: string;
  kindLabel: string;
  target: string;
  page: string;
  count: number;
}

export interface ActionTotal {
  kind: string;
  label: string;
  count: number;
  visits: number;
}

export interface VehicleRow {
  slug: string;
  views: number;
  visits: number;
  clicks: number;
  forms: number;
  submissions: number;
}

export interface SeriesPoint {
  bucket: string;
  label: string;
  visits: number;
  pageviews: number;
  ads: number;
  contacts: number;
  submissions: number;
}

export interface SiteStats {
  totals: {
    visits: number;
    pageviews: number;
    adsVisits: number;
    whatsappClicks: number;
    callClicks: number;
    whatsappVisits: number;
    callVisits: number;
    submissions: number;
    formsStarted: number;
    contactVisits: number;
    contactRate: number;
    pagesPerVisit: number;
    bounceRate: number;
    avgDuration: number;
  };
  sources: SourceRow[];
  campaigns: CampaignRow[];
  entries: EntryRow[];
  exits: PageRow[];
  pages: PageRow[];
  funnel: FunnelStep[];
  clicks: ClickRow[];
  actions: ActionTotal[];
  vehicles: VehicleRow[];
  devices: BreakdownRow[];
  countries: BreakdownRow[];
  cities: BreakdownRow[];
  langs: BreakdownRow[];
  browserLangs: BreakdownRow[];
  series: SeriesPoint[];
}

/** Pourcentage arrondi à une décimale ; 0 si le dénominateur est nul. */
export function percent(part: number, total: number): number {
  if (!total) return 0;
  return Math.round((part / total) * 1000) / 10;
}

function breakdown<T extends Counters>(rows: T[], total: number, keyOf: (row: T) => string, labelOf: (row: T) => string): BreakdownRow[] {
  return rows.map((row) => ({
    key: keyOf(row),
    label: labelOf(row),
    visits: row.visits,
    contacts: row.contacts,
    submissions: row.subs,
    contactRate: percent(row.contacts, row.visits),
    share: percent(row.visits, total),
  }));
}

/** Origines : les catégories nommées dans un ordre fixe (même à zéro pour Google Ads), puis les autres sites. */
export function shapeSources(rows: RawStats['sources'], totalVisits: number): SourceRow[] {
  const merged = new Map<string, SourceRow>();
  for (const row of rows) {
    const src = row._id.src || 'direct';
    const detail = src === 'referral' || src === 'campaign' ? row._id.sd ?? '' : '';
    const key = detail ? `${src}:${detail}` : src;
    const current = merged.get(key);
    const next = {
      visits: (current?.visits ?? 0) + row.visits,
      contacts: (current?.contacts ?? 0) + row.contacts,
      submissions: (current?.submissions ?? 0) + row.subs,
      whatsapp: (current?.whatsapp ?? 0) + (row.wa ?? 0),
      calls: (current?.calls ?? 0) + (row.tel ?? 0),
    };
    merged.set(key, {
      key,
      src,
      label: sourceLabel(src, detail),
      ...next,
      contactRate: percent(next.contacts, next.visits),
      share: percent(next.visits, totalVisits),
    });
  }
  if (!merged.has('google_ads')) {
    merged.set('google_ads', {
      key: 'google_ads',
      src: 'google_ads',
      label: SOURCE_LABELS.google_ads,
      visits: 0,
      contacts: 0,
      submissions: 0,
      whatsapp: 0,
      calls: 0,
      contactRate: 0,
      share: 0,
    });
  }
  const rank = (row: SourceRow) => {
    const index = SOURCE_ORDER.indexOf(row.src as SourceKey);
    return index === -1 ? SOURCE_ORDER.length : index;
  };
  return [...merged.values()]
    .filter((row) => row.visits > 0 || row.src === 'google_ads')
    .sort((a, b) => rank(a) - rank(b) || b.visits - a.visits || a.label.localeCompare(b.label));
}

/** Parcours : visite → catalogue ou fiche → fiche véhicule → formulaire commencé → demande envoyée. */
export function shapeFunnel(raw: RawStats['funnel'][number] | undefined): FunnelStep[] {
  const values = raw ?? { visits: 0, browse: 0, vehicle: 0, form: 0, sub: 0 };
  const steps: [string, string, number][] = [
    ['visits', 'Visite', values.visits],
    ['browse', 'Catalogue ou fiche vue', values.browse],
    ['vehicle', 'Fiche véhicule vue', values.vehicle],
    ['form', 'Formulaire commencé', values.form],
    ['sub', 'Demande envoyée', values.sub],
  ];
  return steps.map(([key, label, count], index) => {
    const previous = index === 0 ? count : steps[index - 1][2];
    const lost = Math.max(0, previous - count);
    return { key, label, count, ofVisits: percent(count, values.visits), lost, lostRate: percent(lost, previous) };
  });
}

function shapePages(rows: RawStats['pages']): PageRow[] {
  return rows.map((row) => ({
    path: row._id,
    label: pageLabel(row._id),
    views: row.views,
    exits: row.exits,
    exitRate: percent(row.exits, row.views),
    avgDuration: row.dN ? Math.round(row.dSum / row.dN) : null,
    avgScroll: row.sN ? Math.round(row.sSum / row.sN) : null,
  }));
}

/** Modèles : vues de fiche et actions (clics vers la fiche, bouton Réserver, formulaire, demande). */
export function shapeVehicles(views: RawStats['vehicleViews'], actions: RawStats['vehicleActions']): VehicleRow[] {
  const rows = new Map<string, VehicleRow>();
  const row = (slug: string) => {
    let current = rows.get(slug);
    if (!current) {
      current = { slug, views: 0, visits: 0, clicks: 0, forms: 0, submissions: 0 };
      rows.set(slug, current);
    }
    return current;
  };
  for (const view of views) {
    const current = row(view._id);
    current.views += view.views;
    current.visits += view.visits;
  }
  for (const action of actions) {
    const current = row(action._id.v);
    if (action._id.k === 'car' || action._id.k === 'book') current.clicks += action.count;
    if (action._id.k === 'form') current.forms += action.count;
    if (action._id.k === 'res') current.submissions += action.count;
  }
  return [...rows.values()]
    .sort((a, b) => b.views - a.views || b.clicks - a.clicks || a.slug.localeCompare(b.slug))
    .slice(0, 25);
}

export function bucketLabel(bucket: string, granularity: 'hour' | 'day'): string {
  if (granularity === 'hour') return `${bucket} h`;
  const [y, m, d] = bucket.split('-').map(Number);
  return new Intl.DateTimeFormat('fr-FR', { weekday: 'short', day: 'numeric', month: 'short', timeZone: 'UTC' }).format(
    new Date(Date.UTC(y, m - 1, d)),
  );
}

/** Série jour par jour (ou heure par heure), avec des zéros pour les tranches sans visite. */
export function fillSeries(rows: RawStats['series'], period: Pick<ResolvedPeriod, 'buckets' | 'granularity'>): SeriesPoint[] {
  const byBucket = new Map(rows.map((row) => [row._id, row]));
  return period.buckets.map((bucket) => {
    const row = byBucket.get(bucket);
    return {
      bucket,
      label: bucketLabel(bucket, period.granularity),
      visits: row?.visits ?? 0,
      pageviews: row?.pageviews ?? 0,
      ads: row?.ads ?? 0,
      contacts: row?.contacts ?? 0,
      submissions: row?.subs ?? 0,
    };
  });
}

export function shapeStats(raw: RawStats, period: Pick<ResolvedPeriod, 'buckets' | 'granularity'>): SiteStats {
  const t = raw.totals[0];
  const visits = t?.visits ?? 0;
  const pages = shapePages(raw.pages ?? []);

  return {
    totals: {
      visits,
      pageviews: t?.pageviews ?? 0,
      adsVisits: t?.ads ?? 0,
      whatsappClicks: t?.wa ?? 0,
      callClicks: t?.tel ?? 0,
      whatsappVisits: t?.waVisits ?? 0,
      callVisits: t?.telVisits ?? 0,
      submissions: t?.subs ?? 0,
      formsStarted: t?.forms ?? 0,
      contactVisits: t?.contacts ?? 0,
      contactRate: percent(t?.contacts ?? 0, visits),
      pagesPerVisit: visits ? Math.round(((t?.pageviews ?? 0) / visits) * 10) / 10 : 0,
      bounceRate: percent(t?.bounces ?? 0, visits),
      avgDuration: visits ? Math.round((t?.duration ?? 0) / visits) : 0,
    },
    sources: shapeSources(raw.sources ?? [], visits),
    campaigns: (raw.campaigns ?? []).map((row) => ({
      key: [row._id.src, row._id.sd, row._id.med, row._id.cmp].join('|'),
      label: row._id.cmp || '(sans nom)',
      source: sourceLabel(row._id.src, row._id.sd),
      utmSource: row._id.sd || '—',
      medium: row._id.med || '—',
      campaign: row._id.cmp || '—',
      visits: row.visits,
      contacts: row.contacts,
      submissions: row.subs,
      contactRate: percent(row.contacts, row.visits),
      share: percent(row.visits, visits),
    })),
    entries: (raw.entries ?? []).map((row) => ({
      key: row._id ?? '',
      path: row._id ?? '',
      label: pageLabel(row._id ?? '/'),
      visits: row.visits,
      contacts: row.contacts,
      submissions: row.subs,
      contactRate: percent(row.contacts, row.visits),
      share: percent(row.visits, visits),
      bounceRate: percent(row.bounces, row.visits),
    })),
    exits: pages
      .filter((row) => row.exits > 0)
      .sort((a, b) => b.exits - a.exits || b.exitRate - a.exitRate)
      .slice(0, 20),
    pages: pages.slice(0, 25),
    funnel: shapeFunnel(raw.funnel?.[0]),
    clicks: (raw.clicks ?? []).map((row) => ({
      kind: row._id.k,
      kindLabel: ACTION_LABELS[row._id.k] ?? row._id.k,
      target: row._id.lb ? `${row._id.lb}${row._id.tg ? ` → ${row._id.tg}` : ''}` : row._id.tg ?? '',
      page: row._id.p ?? '',
      count: row.count,
    })),
    actions: (raw.actions ?? [])
      .map((row) => ({ kind: row._id, label: ACTION_LABELS[row._id] ?? row._id, count: row.count, visits: row.visits }))
      .sort((a, b) => b.count - a.count),
    vehicles: shapeVehicles(raw.vehicleViews ?? [], raw.vehicleActions ?? []),
    devices: breakdown(raw.devices ?? [], visits, (row) => row._id ?? 'inconnu', (row) => DEVICE_LABELS[row._id ?? ''] ?? 'Inconnu'),
    countries: breakdown(raw.countries ?? [], visits, (row) => row._id ?? 'inconnu', (row) => countryName(row._id)),
    cities: breakdown(
      raw.cities ?? [],
      visits,
      (row) => `${row._id.city ?? ''}|${row._id.cc ?? ''}`,
      (row) => `${row._id.city || 'Ville inconnue'}${row._id.cc ? ` (${countryName(row._id.cc)})` : ''}`,
    ),
    langs: breakdown(raw.langs ?? [], visits, (row) => row._id ?? 'inconnue', (row) => languageName(row._id)),
    browserLangs: breakdown(raw.browserLangs ?? [], visits, (row) => row._id ?? 'inconnue', (row) => languageName(row._id)),
    series: fillSeries(raw.series ?? [], period),
  };
}

/* ───────────────────────── Visites récentes ───────────────────────── */

export const VISITS_PAGE_SIZE = 50;

export const VISIT_FILTERS = {
  all: 'Toutes',
  ads: 'Google Ads',
  contact: 'Avec contact',
  sub: 'Avec demande',
} as const;
export type VisitFilter = keyof typeof VISIT_FILTERS;

export function parseVisitFilter(value: string | string[] | undefined): VisitFilter {
  const raw = Array.isArray(value) ? value[0] : value;
  return raw && Object.prototype.hasOwnProperty.call(VISIT_FILTERS, raw) ? (raw as VisitFilter) : 'all';
}

export function parsePage(value: string | string[] | undefined): number {
  const raw = Number(Array.isArray(value) ? value[0] : value);
  return Number.isInteger(raw) && raw > 0 && raw < 10_000 ? raw : 1;
}

/** Filtre MongoDB de la liste des visites. */
export function visitsFilter(period: Pick<ResolvedPeriod, 'from' | 'to'>, filter: VisitFilter): Record<string, unknown> {
  const base: Record<string, unknown> = { at: { $gte: period.from, $lte: period.to } };
  if (filter === 'ads') base.src = 'google_ads';
  if (filter === 'contact') base.$or = [{ 'fl.wa': true }, { 'fl.tel': true }, { 'fl.sub': true }];
  if (filter === 'sub') base['fl.sub'] = true;
  return base;
}

export interface VisitRow {
  id: string;
  at: string;
  ip: string;
  place: string;
  region: string;
  source: string;
  campaign: string;
  device: string;
  entry: string;
  pageviews: number;
  duration: number;
  actions: { whatsapp: number; calls: number; formStarted: boolean; submitted: boolean };
  pages: { path: string; label: string; duration: number | null; scroll: number | null; at: string | null }[];
  events: { kind: string; label: string; target: string; page: string; at: string | null }[];
}

export function toVisitRow(visit: ISiteVisit): VisitRow {
  const pages = [...(visit.pages ?? [])].sort((a, b) => a.n - b.n);
  const events = visit.ev ?? [];
  const count = (kind: string) => events.filter((event) => event.k === kind).length;
  return {
    id: String(visit._id),
    at: new Date(visit.at).toISOString(),
    ip: visit.ip ?? '—',
    place: [visit.city, visit.cc ? countryName(visit.cc) : null].filter(Boolean).join(', ') || 'Inconnue',
    region: visit.region ?? '',
    source: sourceLabel(visit.src, visit.sd),
    campaign: [visit.med, visit.cmp].filter(Boolean).join(' · '),
    device: DEVICE_LABELS[visit.dev ?? ''] ?? 'Inconnu',
    entry: visit.entry ?? pages[0]?.p ?? '/',
    pageviews: visit.pv ?? pages.length,
    duration: pages.reduce((sum, page) => sum + (typeof page.d === 'number' ? page.d : 0), 0),
    actions: {
      whatsapp: count('wa'),
      calls: count('tel'),
      formStarted: !!(visit.fl?.form || visit.fl?.sub),
      submitted: !!visit.fl?.sub,
    },
    pages: pages.map((page) => ({
      path: page.p,
      label: pageLabel(page.p),
      duration: typeof page.d === 'number' ? page.d : null,
      scroll: typeof page.s === 'number' ? page.s : null,
      at: page.t ? new Date(page.t).toISOString() : null,
    })),
    events: events.map((event) => ({
      kind: event.k,
      label: ACTION_LABELS[event.k] ?? event.k,
      target: [event.lb, event.tg].filter(Boolean).join(' → '),
      page: event.p,
      at: event.t ? new Date(event.t).toISOString() : null,
    })),
  };
}

/** Durée lisible : 45 s, 3 min 05, 1 h 02. */
export function formatDuration(seconds: number | null | undefined): string {
  if (seconds === null || seconds === undefined) return '—';
  const s = Math.max(0, Math.round(seconds));
  if (s < 60) return `${s} s`;
  if (s < 3600) return `${Math.floor(s / 60)} min ${String(s % 60).padStart(2, '0')}`;
  return `${Math.floor(s / 3600)} h ${String(Math.floor((s % 3600) / 60)).padStart(2, '0')}`;
}

