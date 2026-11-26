import { describe, it, expect } from 'vitest';
import {
  classifyLink,
  classifySource,
  deviceFromUserAgent,
  isBookingText,
  localeOfPath,
  normalizePath,
  pageKindOf,
  vehicleSlugOf,
} from '@/lib/tracking/shared';
import {
  buildVisitWrites,
  isBotUserAgent,
  trackPayloadSchema,
  visitorContext,
  MAX_PAGES_PER_VISIT,
  VISIT_RETENTION_DAYS,
} from '@/lib/tracking/ingest';
import {
  buildStatsPipeline,
  dayKey,
  fillSeries,
  formatDuration,
  parsePage,
  parsePeriod,
  parseVisitFilter,
  percent,
  resolvePeriod,
  shapeFunnel,
  shapeSources,
  shapeStats,
  shapeVehicles,
  sourceLabel,
  startOfDay,
  toVisitRow,
  visitsFilter,
  type RawStats,
} from '@/lib/tracking/stats';

const SITE = 'https://yourent.ma';
const CHROME_UA =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36';

describe('classifySource : origine de la visite', () => {
  const src = (path: string, referrer = '') => classifySource({ url: `${SITE}${path}`, referrer }).src;

  it('reconnaît une annonce Google Ads par ses identifiants de clic', () => {
    expect(src('/?gclid=abc')).toBe('google_ads');
    expect(src('/catalogue?gbraid=xyz')).toBe('google_ads');
    expect(src('/?wbraid=1')).toBe('google_ads');
    expect(src('/?gad_source=1&gad_campaignid=2233')).toBe('google_ads');
    expect(classifySource({ url: `${SITE}/?gad_source=1&gad_campaignid=2233` })).toMatchObject({ med: 'cpc', cmp: '2233' });
  });

  it("l'annonce prime sur le site d'origine et sur utm", () => {
    expect(src('/?gclid=abc&utm_source=facebook', 'https://www.google.com/')).toBe('google_ads');
  });

  it('lit les paramètres utm_*', () => {
    expect(classifySource({ url: `${SITE}/?utm_source=facebook&utm_medium=social&utm_campaign=ete` })).toEqual({
      src: 'facebook',
      sd: 'facebook',
      med: 'social',
      cmp: 'ete',
    });
    expect(src('/?utm_source=ig')).toBe('instagram');
    expect(src('/?utm_source=chatgpt.com')).toBe('ai');
    expect(src('/?utm_source=google&utm_medium=cpc')).toBe('google_ads');
    expect(src('/?utm_source=google&utm_medium=organic')).toBe('google');
    expect(classifySource({ url: `${SITE}/?utm_source=newsletter&utm_campaign=noel` })).toMatchObject({
      src: 'campaign',
      sd: 'newsletter',
      cmp: 'noel',
    });
  });

  it("classe les sites d'origine", () => {
    expect(src('/', 'https://www.google.com/')).toBe('google');
    expect(src('/', 'https://www.google.co.ma/')).toBe('google');
    expect(src('/', 'android-app://com.google.android.googlequicksearchbox/')).toBe('google');
    expect(src('/', 'https://www.bing.com/search?q=yourent')).toBe('bing');
    expect(src('/', 'https://l.facebook.com/')).toBe('facebook');
    expect(src('/', 'https://m.facebook.com/')).toBe('facebook');
    expect(src('/', 'https://l.instagram.com/')).toBe('instagram');
    expect(src('/', 'https://wa.me/')).toBe('whatsapp');
    expect(src('/', 'https://web.whatsapp.com/')).toBe('whatsapp');
    expect(src('/', 'https://chatgpt.com/')).toBe('ai');
    expect(src('/', 'https://www.perplexity.ai/')).toBe('ai');
    expect(src('/', 'https://gemini.google.com/')).toBe('ai');
    expect(src('/', 'https://copilot.microsoft.com/')).toBe('ai');
    expect(src('/', 'https://www.googleadservices.com/')).toBe('google_ads');
  });

  it('garde le nom de domaine des autres sites', () => {
    expect(classifySource({ url: `${SITE}/`, referrer: 'https://www.avito.ma/annonce/123' })).toEqual({
      src: 'referral',
      sd: 'avito.ma',
      med: undefined,
      cmp: undefined,
    });
  });

  it("accès direct sans site d'origine, ou depuis le site lui-même", () => {
    expect(src('/')).toBe('direct');
    expect(src('/catalogue', 'https://yourent.ma/')).toBe('direct');
    expect(src('/catalogue', 'https://www.yourent.ma/')).toBe('direct');
  });

  it('fbclid seul : Facebook', () => {
    expect(src('/?fbclid=IwAR0')).toBe('facebook');
  });

  it('borne la longueur des paramètres', () => {
    const long = 'x'.repeat(500);
    const result = classifySource({ url: `${SITE}/?utm_source=${long}&utm_campaign=${long}` });
    expect(result.sd!.length).toBeLessThanOrEqual(80);
    expect(result.cmp!.length).toBeLessThanOrEqual(100);
  });
});

describe('appareil, adresses et pages', () => {
  it("déduit l'appareil", () => {
    expect(deviceFromUserAgent(CHROME_UA)).toBe('desktop');
    expect(deviceFromUserAgent('Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) Mobile/15E148')).toBe('mobile');
    expect(deviceFromUserAgent('Mozilla/5.0 (Linux; Android 14; SM-S918B) Chrome/131 Mobile Safari/537.36')).toBe('mobile');
    expect(deviceFromUserAgent('Mozilla/5.0 (Linux; Android 13; SM-X700) Chrome/131 Safari/537.36')).toBe('tablet');
    expect(deviceFromUserAgent('Mozilla/5.0 (iPad; CPU OS 17_0 like Mac OS X)')).toBe('tablet');
    expect(deviceFromUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) Safari/605.1.15', 5)).toBe('tablet');
    expect(deviceFromUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) Safari/605.1.15', 0)).toBe('desktop');
  });

  it('normalise les adresses publiques', () => {
    expect(normalizePath('/catalogue/')).toBe('/catalogue');
    expect(normalizePath('/catalogue?du=2026-01-01#top')).toBe('/catalogue');
    expect(normalizePath('/fr/catalogue')).toBe('/catalogue');
    expect(normalizePath('/fr')).toBe('/');
    expect(normalizePath('/catalogue-recherche/dacia-duster')).toBe('/catalogue/dacia-duster');
    expect(normalizePath('/en/catalogue-recherche')).toBe('/en/catalogue');
    expect(normalizePath('//a//b')).toBe('/a/b');
    expect(normalizePath('/x'.repeat(200)).length).toBeLessThanOrEqual(160);
  });

  it('reconnaît les pages du parcours', () => {
    expect(pageKindOf('/')).toBe('home');
    expect(pageKindOf('/en')).toBe('home');
    expect(pageKindOf('/catalogue')).toBe('catalogue');
    expect(pageKindOf('/ar/catalogue')).toBe('catalogue');
    expect(pageKindOf('/catalogue/dacia-duster')).toBe('vehicle');
    expect(pageKindOf('/en/catalogue/range-rover-sport')).toBe('vehicle');
    expect(pageKindOf('/catalogue/dacia-duster/confirmation')).toBe('confirmation');
    expect(pageKindOf('/location-voiture-casablanca')).toBe('other');
    expect(vehicleSlugOf('/catalogue/Dacia-Duster')).toBe('dacia-duster');
    expect(vehicleSlugOf('/catalogue/dacia-duster/confirmation')).toBe('dacia-duster');
    expect(vehicleSlugOf('/catalogue')).toBeUndefined();
    expect(localeOfPath('/en/catalogue')).toBe('en');
    expect(localeOfPath('/ar')).toBe('ar');
    expect(localeOfPath('/catalogue')).toBe('fr');
  });
});

describe('classifyLink : nature des clics', () => {
  const page = `${SITE}/catalogue`;

  it('WhatsApp, téléphone, e-mail', () => {
    expect(classifyLink('https://wa.me/212600000000?text=Bonjour', 'WhatsApp', page)).toEqual({ k: 'wa' });
    expect(classifyLink('https://api.whatsapp.com/send?phone=212', '', page)).toEqual({ k: 'wa' });
    expect(classifyLink('tel:+212600000000', 'Appeler', page)).toEqual({ k: 'tel' });
    expect(classifyLink('mailto:contact@yourent.ma', '', page)).toEqual({ k: 'mail' });
  });

  it("carte véhicule et bouton Réserver d'une fiche", () => {
    expect(classifyLink('/catalogue/dacia-duster', 'Dacia Duster Diesel 5 places 350 MAD/jour Voir la fiche', page)).toEqual({
      k: 'car',
      tg: 'dacia-duster',
      v: 'dacia-duster',
    });
    expect(classifyLink('/en/catalogue/dacia-duster?du=2026-01-01', 'Book now', page)).toEqual({
      k: 'book',
      tg: 'dacia-duster',
      v: 'dacia-duster',
    });
    expect(classifyLink('/catalogue/audi-q3', 'احجز الآن', page)).toMatchObject({ k: 'book', v: 'audi-q3' });
  });

  it('bouton Réserver vers le catalogue, liens internes et ancres', () => {
    expect(classifyLink('/catalogue', 'Réserver', `${SITE}/`)).toEqual({ k: 'book', tg: '/catalogue' });
    expect(classifyLink('/tarifs', 'Tarifs', page)).toEqual({ k: 'link', tg: '/tarifs' });
    expect(classifyLink('/#faq', 'FAQ', page)).toEqual({ k: 'link', tg: '/#faq' });
    expect(classifyLink('https://yourent.ma/a-propos', 'À propos', page)).toEqual({ k: 'link', tg: '/a-propos' });
  });

  it('sites externes et liens sans intérêt', () => {
    expect(classifyLink('https://maps.google.com/?q=yourent', 'Adresse', page)).toEqual({ k: 'out', tg: 'maps.google.com' });
    expect(classifyLink('#', '', page)).toBeNull();
    expect(classifyLink('javascript:void(0)', '', page)).toBeNull();
  });

  it('texte de bouton de réservation', () => {
    expect(isBookingText('Réserver')).toBe(true);
    expect(isBookingText('Reserver maintenant')).toBe(true);
    expect(isBookingText('Demander ce véhicule')).toBe(true);
    expect(isBookingText('Book Now')).toBe(true);
    expect(isBookingText('Facebook')).toBe(false);
    expect(isBookingText('Voir la fiche')).toBe(false);
    expect(isBookingText(`Range Rover Sport ${'x'.repeat(40)} Réserver`)).toBe(false);
  });
});

const validPayload = {
  v: 1,
  sid: 'AbCdEfGhIjKlMnOpQr',
  m: { src: 'google_ads', sd: 'google', med: 'cpc', cmp: '2233', entry: '/catalogue', lang: 'fr', bl: 'FR', dev: 'mobile' },
  e: [
    { k: 'view', n: 0, p: '/catalogue' },
    { k: 'car', p: '/catalogue', tg: 'dacia-duster', v: 'dacia-duster' },
    { k: 'view', n: 1, p: '/catalogue/dacia-duster', d: 30, s: 80 },
    { k: 'leave', n: 0, d: 12.4, s: 64.6 },
    { k: 'form', p: '/catalogue/dacia-duster', v: 'dacia-duster' },
    { k: 'wa', p: '/catalogue/dacia-duster' },
  ],
};

describe("API de collecte : validation de l'envoi", () => {
  it('accepte un envoi valide et normalise les valeurs', () => {
    const parsed = trackPayloadSchema.safeParse(validPayload);
    expect(parsed.success).toBe(true);
    if (!parsed.success) return;
    expect(parsed.data.m.bl).toBe('fr');
    expect(parsed.data.e[3]).toEqual({ k: 'leave', n: 0, d: 12, s: 65 });
  });

  it('écarte les champs inconnus (aucune donnée saisie ne passe)', () => {
    const parsed = trackPayloadSchema.safeParse({
      ...validPayload,
      email: 'client@example.com',
      m: { ...validPayload.m, telephone: '0612345678' },
      e: [{ k: 'form', p: '/catalogue/x', value: 'Sara Alaoui' }],
    });
    expect(parsed.success).toBe(true);
    if (!parsed.success) return;
    expect(JSON.stringify(parsed.data)).not.toMatch(/example|0612345678|Sara/);
  });

  it('refuse les envois invalides', () => {
    const bad = [
      { ...validPayload, v: 2 },
      { ...validPayload, sid: 'court' },
      { ...validPayload, sid: 'a'.repeat(12) + '<script>' },
      { ...validPayload, m: { ...validPayload.m, src: 'tiktok' } },
      { ...validPayload, m: { ...validPayload.m, dev: 'tv' } },
      { ...validPayload, e: [] },
      { ...validPayload, e: Array.from({ length: 41 }, (_, n) => ({ k: 'view', n, p: '/' })) },
      { ...validPayload, e: [{ k: 'view', n: 0, p: 'https://evil.example/' }] },
      { ...validPayload, e: [{ k: 'hack', p: '/' }] },
      { ...validPayload, e: [{ k: 'leave', n: 0, d: 5, s: 150 }] },
      { ...validPayload, e: [{ k: 'car', p: '/', v: '../../etc' }] },
    ];
    for (const payload of bad) expect(trackPayloadSchema.safeParse(payload).success).toBe(false);
  });

  it('plafonne la durée et nettoie les textes', () => {
    const parsed = trackPayloadSchema.parse({
      ...validPayload,
      e: [
        { k: 'leave', n: 0, d: 999999, s: 10 },
        { k: 'link', p: '/', tg: `  /tarifs\u0000${'x'.repeat(200)}` },
      ],
    });
    expect(parsed.e[0]).toMatchObject({ d: 4 * 3600 });
    const link = parsed.e[1] as { tg: string };
    expect(link.tg.startsWith('/tarifs')).toBe(true);
    expect(link.tg).not.toContain('\u0000');
    expect(link.tg.length).toBeLessThanOrEqual(160);
  });
});

describe('robots et localisation', () => {
  it('écarte les robots et outils automatiques', () => {
    for (const ua of [
      'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)',
      'Mozilla/5.0 (compatible; bingbot/2.0; +http://www.bing.com/bingbot.htm)',
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) HeadlessChrome/131.0.0.0 Safari/537.36',
      'Mozilla/5.0 (Linux; Android 11; moto g power (2022)) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Mobile Safari/537.36 Chrome-Lighthouse',
      'facebookexternalhit/1.1 (+http://www.facebook.com/externalhit_uatext.php)',
      'WhatsApp/2.23.20.0',
      'curl/8.4.0',
      'python-requests/2.31.0',
      '',
      null,
    ]) {
      expect(isBotUserAgent(ua)).toBe(true);
    }
    expect(isBotUserAgent(CHROME_UA)).toBe(false);
    expect(isBotUserAgent('Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 Instagram 300.0')).toBe(false);
  });

  it("lit l'IP et la localisation fournies par Vercel", () => {
    const headers = new Headers({
      'x-forwarded-for': '105.66.1.2, 10.0.0.1',
      'x-vercel-ip-city': 'F%C3%A8s',
      'x-vercel-ip-country-region': '03',
      'x-vercel-ip-country': 'ma',
    });
    expect(visitorContext(headers)).toEqual({ ip: '105.66.1.2', city: 'Fès', region: '03', cc: 'MA' });
    expect(visitorContext(new Headers({ 'x-real-ip': '2a01:cb00::1' }))).toEqual({
      ip: '2a01:cb00::1',
      city: undefined,
      region: undefined,
      cc: undefined,
    });
    expect(visitorContext(new Headers({ 'x-forwarded-for': '<script>', 'x-vercel-ip-country': 'MAR' }))).toEqual({
      ip: undefined,
      city: undefined,
      region: undefined,
      cc: undefined,
    });
  });
});

/** Forme lâche d'une mise à jour MongoDB, pour lire les opérateurs dans les tests. */
type UpdateDoc = Record<string, Record<string, Record<string, unknown> & { $each: Record<string, unknown>[] }> & Record<string, unknown>>;

describe('buildVisitWrites : écritures MongoDB', () => {
  const now = new Date('2026-11-26T10:00:00Z');
  const context = { ip: '105.66.1.2', city: 'Casablanca', region: '06', cc: 'MA' };

  it('crée la visite, ajoute pages et actions, pose les indicateurs du parcours', () => {
    const writes = buildVisitWrites(trackPayloadSchema.parse(validPayload), context, now);
    expect(writes).toHaveLength(2);
    const [main, leave] = writes;
    expect(main.updateOne.filter).toEqual({ _id: 'AbCdEfGhIjKlMnOpQr' });
    expect(main.updateOne.upsert).toBe(true);
    const update = main.updateOne.update as UpdateDoc;
    expect(update.$setOnInsert).toEqual({
      at: now,
      ip: '105.66.1.2',
      city: 'Casablanca',
      region: '06',
      cc: 'MA',
      src: 'google_ads',
      sd: 'google',
      med: 'cpc',
      cmp: '2233',
      entry: '/catalogue',
      lang: 'fr',
      bl: 'fr',
      dev: 'mobile',
    });
    expect(update.$inc).toEqual({ pv: 2 });
    expect(update.$push.pages.$each).toEqual([
      { n: 0, p: '/catalogue', t: now },
      { n: 1, p: '/catalogue/dacia-duster', v: 'dacia-duster', t: now, d: 30, s: 80 },
    ]);
    expect(update.$push.pages.$sort).toEqual({ n: 1 });
    expect(update.$push.pages.$slice).toBe(MAX_PAGES_PER_VISIT);
    expect(update.$push.ev.$each.map((e) => e.k)).toEqual(['car', 'form', 'wa']);
    expect(update.$set).toEqual({ 'fl.cat': true, 'fl.form': true, 'fl.veh': true, 'fl.wa': true });

    expect(leave.updateOne.update).toEqual({ $max: { 'pages.$[page].d': 12, 'pages.$[page].s': 65, last: now } });
    expect(leave.updateOne.arrayFilters).toEqual([{ 'page.n': 0 }]);
    expect(leave.updateOne.upsert).toBeUndefined();
  });

  it('page de confirmation et demande : indicateur « demande envoyée »', () => {
    const payload = trackPayloadSchema.parse({
      ...validPayload,
      e: [
        { k: 'view', n: 4, p: '/catalogue/dacia-duster/confirmation' },
        { k: 'res', p: '/catalogue/dacia-duster/confirmation', v: 'dacia-duster' },
      ],
    });
    const update = buildVisitWrites(payload, {}, now)[0].updateOne.update as UpdateDoc;
    expect(update.$set).toEqual({ 'fl.sub': true });
    expect(update.$setOnInsert.ip).toBeUndefined();
  });

  it("un envoi sans page vue n'incrémente rien", () => {
    const payload = trackPayloadSchema.parse({ ...validPayload, e: [{ k: 'leave', n: 2, d: 5, s: 40 }] });
    const writes = buildVisitWrites(payload, context, now);
    const update = writes[0].updateOne.update as Record<string, unknown>;
    expect(update.$inc).toBeUndefined();
    expect(update.$push).toBeUndefined();
    expect(update.$set).toBeUndefined();
    expect(writes).toHaveLength(2);
  });

  it("conserve 90 jours", () => {
    expect(VISIT_RETENTION_DAYS).toBe(90);
  });
});

describe('périodes (heure de Casablanca)', () => {
  it('jour calendaire et minuit locaux', () => {
    /* Fin novembre, Casablanca est à UTC+1 : 23 h 30 UTC = 0 h 30 le lendemain. */
    expect(dayKey(new Date('2026-11-26T23:30:00Z'))).toBe('2026-11-27');
    expect(startOfDay('2026-11-27').toISOString()).toBe('2026-11-26T23:00:00.000Z');
  });

  it('aujourd’hui, 7, 30 et 90 jours', () => {
    const now = new Date('2026-11-26T10:15:00Z'); // 11 h 15 à Casablanca
    const today = resolvePeriod('today', now);
    expect(today.granularity).toBe('hour');
    expect(today.from.toISOString()).toBe('2026-11-25T23:00:00.000Z');
    expect(today.buckets).toHaveLength(12);
    expect(today.buckets.at(-1)).toBe('11');

    const week = resolvePeriod('7', now);
    expect(week.buckets).toEqual(['2026-11-20', '2026-11-21', '2026-11-22', '2026-11-23', '2026-11-24', '2026-11-25', '2026-11-26']);
    expect(week.from.toISOString()).toBe('2026-11-19T23:00:00.000Z');
    expect(week.to).toBe(now);
    expect(resolvePeriod('30', now).buckets).toHaveLength(30);
    expect(resolvePeriod('90', now).buckets[0]).toBe('2026-08-29');
  });

  it('lit les paramètres de la page', () => {
    expect(parsePeriod('30')).toBe('30');
    expect(parsePeriod('365')).toBe('7');
    expect(parsePeriod(undefined)).toBe('7');
    expect(parseVisitFilter('ads')).toBe('ads');
    expect(parseVisitFilter('toString')).toBe('all');
    expect(parseVisitFilter(['sub'])).toBe('sub');
    expect(parsePage('3')).toBe(3);
    expect(parsePage('-1')).toBe(1);
    expect(parsePage('abc')).toBe(1);
  });
});

describe('pipeline d’agrégation', () => {
  it('lit la période puis regroupe tout en une passe ($facet)', () => {
    const period = resolvePeriod('7', new Date('2026-11-26T10:00:00Z'));
    const pipeline = buildStatsPipeline(period);
    expect(pipeline[0]).toEqual({ $match: { at: { $gte: period.from, $lte: period.to } } });
    const facet = (pipeline.at(-1) as { $facet: Record<string, unknown[]> }).$facet;
    expect(Object.keys(facet).sort()).toEqual(
      [
        'actions',
        'browserLangs',
        'campaigns',
        'cities',
        'clicks',
        'countries',
        'devices',
        'entries',
        'funnel',
        'langs',
        'pages',
        'series',
        'sources',
        'totals',
        'vehicleActions',
        'vehicleViews',
      ].sort(),
    );
    /* Aucune étape d'écriture. */
    expect(JSON.stringify(pipeline)).not.toMatch(/\$out|\$merge/);
    const series = JSON.stringify(facet.series);
    expect(series).toContain('Africa/Casablanca');
    expect(series).toContain('%Y-%m-%d');
    expect(JSON.stringify(buildStatsPipeline(resolvePeriod('today', new Date())).at(-1))).toContain('"%H"');
  });

  it('filtre de la liste des visites', () => {
    const period = { from: new Date('2026-11-20T00:00:00Z'), to: new Date('2026-11-26T00:00:00Z') };
    expect(visitsFilter(period, 'all')).toEqual({ at: { $gte: period.from, $lte: period.to } });
    expect(visitsFilter(period, 'ads')).toMatchObject({ src: 'google_ads' });
    expect(visitsFilter(period, 'sub')).toMatchObject({ 'fl.sub': true });
    expect(visitsFilter(period, 'contact').$or).toHaveLength(3);
  });
});

describe('mise en forme des statistiques', () => {
  it('pourcentages', () => {
    expect(percent(1, 3)).toBe(33.3);
    expect(percent(0, 0)).toBe(0);
    expect(percent(5, 5)).toBe(100);
  });

  it('origines : ordre fixe, Google Ads toujours présent, autres sites par domaine', () => {
    const rows = shapeSources(
      [
        { _id: { src: 'direct', sd: null }, visits: 40, contacts: 2, subs: 1, wa: 2, tel: 0 },
        { _id: { src: 'referral', sd: 'avito.ma' }, visits: 5, contacts: 1, subs: 0, wa: 1, tel: 0 },
        { _id: { src: 'google', sd: null }, visits: 50, contacts: 10, subs: 3, wa: 8, tel: 3 },
        { _id: { src: 'referral', sd: 'booking.com' }, visits: 9, contacts: 0, subs: 0, wa: 0, tel: 0 },
        { _id: { src: 'campaign', sd: 'newsletter' }, visits: 2, contacts: 0, subs: 0, wa: 0, tel: 0 },
      ],
      106,
    );
    expect(rows.map((row) => row.label)).toEqual([
      'Google Ads',
      'Google (naturel)',
      'Accès direct',
      'booking.com',
      'avito.ma',
      'Campagne : newsletter',
    ]);
    const google = rows.find((row) => row.src === 'google')!;
    expect(google).toMatchObject({ visits: 50, contacts: 10, submissions: 3, whatsapp: 8, calls: 3, contactRate: 20 });
    expect(google.share).toBe(47.2);
    expect(rows[0]).toMatchObject({ visits: 0, contactRate: 0 });
  });

  it('parcours : effectifs, part des visites et pertes', () => {
    const steps = shapeFunnel({ visits: 200, browse: 120, vehicle: 80, form: 20, sub: 5 });
    expect(steps.map((step) => step.count)).toEqual([200, 120, 80, 20, 5]);
    expect(steps.map((step) => step.lost)).toEqual([0, 80, 40, 60, 15]);
    expect(steps[1]).toMatchObject({ ofVisits: 60, lostRate: 40 });
    expect(steps[4]).toMatchObject({ ofVisits: 2.5, lostRate: 75 });
    expect(shapeFunnel(undefined).every((step) => step.count === 0 && step.lostRate === 0)).toBe(true);
  });

  it('voitures : vues et actions réunies par modèle', () => {
    const rows = shapeVehicles(
      [
        { _id: 'dacia-duster', views: 30, visits: 20 },
        { _id: 'audi-q3', views: 10, visits: 9 },
      ],
      [
        { _id: { v: 'dacia-duster', k: 'car' }, count: 12 },
        { _id: { v: 'dacia-duster', k: 'book' }, count: 3 },
        { _id: { v: 'dacia-duster', k: 'form' }, count: 4 },
        { _id: { v: 'dacia-duster', k: 'res' }, count: 1 },
        { _id: { v: 'porsche-macan', k: 'car' }, count: 2 },
      ],
    );
    expect(rows).toEqual([
      { slug: 'dacia-duster', views: 30, visits: 20, clicks: 15, forms: 4, submissions: 1 },
      { slug: 'audi-q3', views: 10, visits: 9, clicks: 0, forms: 0, submissions: 0 },
      { slug: 'porsche-macan', views: 0, visits: 0, clicks: 2, forms: 0, submissions: 0 },
    ]);
  });

  it('série complétée par des zéros', () => {
    const period = resolvePeriod('7', new Date('2026-11-26T10:00:00Z'));
    const series = fillSeries([{ _id: '2026-11-24', visits: 4, contacts: 1, subs: 1, pageviews: 9, ads: 2 }], period);
    expect(series).toHaveLength(7);
    expect(series.find((point) => point.bucket === '2026-11-24')).toMatchObject({ visits: 4, submissions: 1, ads: 2 });
    expect(series[0]).toMatchObject({ visits: 0, pageviews: 0 });
    expect(series[0].label).toMatch(/20/);
  });

  it('résultat complet à partir des regroupements MongoDB', () => {
    const raw: RawStats = {
      totals: [
        {
          visits: 10,
          contacts: 3,
          subs: 1,
          pageviews: 25,
          ads: 4,
          wa: 5,
          tel: 1,
          waVisits: 2,
          telVisits: 1,
          forms: 2,
          bounces: 4,
          duration: 600,
        },
      ],
      funnel: [{ visits: 10, browse: 7, vehicle: 5, form: 2, sub: 1 }],
      sources: [{ _id: { src: 'google_ads', sd: null }, visits: 4, contacts: 2, subs: 1, wa: 3, tel: 0 }],
      campaigns: [{ _id: { src: 'google_ads', sd: 'google', med: 'cpc', cmp: '2233' }, visits: 4, contacts: 2, subs: 1 }],
      entries: [{ _id: '/', visits: 6, contacts: 1, subs: 0, bounces: 3 }],
      pages: [
        { _id: '/', views: 8, exits: 4, dSum: 160, dN: 8, sSum: 400, sN: 8 },
        { _id: '/catalogue/dacia-duster', views: 6, exits: 5, dSum: 300, dN: 5, sSum: 0, sN: 0 },
        { _id: '/tarifs', views: 2, exits: 0, dSum: 0, dN: 0, sSum: 0, sN: 0 },
      ],
      clicks: [{ _id: { k: 'wa', p: '/catalogue/dacia-duster' }, count: 5 }],
      actions: [
        { _id: 'tel', count: 1, visits: 1 },
        { _id: 'wa', count: 5, visits: 2 },
      ],
      vehicleViews: [],
      vehicleActions: [],
      devices: [{ _id: 'mobile', visits: 7, contacts: 3, subs: 1 }],
      countries: [{ _id: 'MA', visits: 9, contacts: 3, subs: 1 }],
      cities: [{ _id: { city: 'Casablanca', cc: 'MA' }, visits: 6, contacts: 2, subs: 1 }],
      langs: [{ _id: 'fr', visits: 8, contacts: 3, subs: 1 }],
      browserLangs: [{ _id: 'ar', visits: 3, contacts: 1, subs: 0 }],
      series: [],
    };
    const stats = shapeStats(raw, resolvePeriod('7', new Date('2026-11-26T10:00:00Z')));
    expect(stats.totals).toMatchObject({
      visits: 10,
      pageviews: 25,
      adsVisits: 4,
      whatsappClicks: 5,
      callClicks: 1,
      submissions: 1,
      contactVisits: 3,
      contactRate: 30,
      pagesPerVisit: 2.5,
      bounceRate: 40,
      avgDuration: 60,
    });
    /* Sorties : seulement les pages quittées, les plus fréquentes d'abord. */
    expect(stats.exits.map((row) => [row.path, row.exits, row.exitRate, row.avgDuration, row.avgScroll])).toEqual([
      ['/catalogue/dacia-duster', 5, 83.3, 60, null],
      ['/', 4, 50, 20, 50],
    ]);
    expect(stats.entries[0]).toMatchObject({ label: 'Accueil', bounceRate: 50 });
    expect(stats.clicks[0]).toMatchObject({ kindLabel: 'WhatsApp', target: '', count: 5 });
    expect(stats.actions.map((row) => row.kind)).toEqual(['wa', 'tel']);
    expect(stats.devices[0]).toMatchObject({ label: 'Mobile', share: 70 });
    expect(stats.countries[0].label).toBe('Maroc');
    expect(stats.cities[0].label).toBe('Casablanca (Maroc)');
    expect(stats.browserLangs[0].label).toBe('Arabe');
    expect(stats.campaigns[0]).toMatchObject({ source: 'Google Ads', medium: 'cpc', campaign: '2233' });
    expect(stats.funnel.at(-1)).toMatchObject({ count: 1, ofVisits: 10 });
    expect(stats.series).toHaveLength(7);
  });

  it('libellés des origines', () => {
    expect(sourceLabel('google_ads')).toBe('Google Ads');
    expect(sourceLabel('ai')).toBe('Assistants IA');
    expect(sourceLabel('referral', 'avito.ma')).toBe('avito.ma');
    expect(sourceLabel('campaign', 'newsletter')).toBe('Campagne : newsletter');
  });
});

describe('visites récentes', () => {
  it('ligne de visite avec parcours et actions', () => {
    const row = toVisitRow({
      _id: 'AbCdEfGhIjKlMnOpQr',
      at: new Date('2026-11-26T10:00:00Z'),
      ip: '105.66.1.2',
      city: 'Casablanca',
      region: '06',
      cc: 'MA',
      src: 'google_ads',
      med: 'cpc',
      cmp: '2233',
      entry: '/',
      dev: 'mobile',
      pv: 3,
      pages: [
        { n: 2, p: '/catalogue/dacia-duster', d: 95, s: 70 },
        { n: 0, p: '/', d: 20, s: 40 },
        { n: 1, p: '/catalogue' },
      ],
      ev: [
        { k: 'car', p: '/catalogue', tg: 'dacia-duster', v: 'dacia-duster' },
        { k: 'wa', p: '/catalogue/dacia-duster' },
        { k: 'wa', p: '/catalogue/dacia-duster' },
        { k: 'form', p: '/catalogue/dacia-duster' },
      ],
      fl: { cat: true, veh: true, form: true, wa: true },
    });
    expect(row).toMatchObject({
      ip: '105.66.1.2',
      place: 'Casablanca, Maroc',
      source: 'Google Ads',
      campaign: 'cpc · 2233',
      device: 'Mobile',
      pageviews: 3,
      duration: 115,
      actions: { whatsapp: 2, calls: 0, formStarted: true, submitted: false },
    });
    expect(row.pages.map((page) => page.path)).toEqual(['/', '/catalogue', '/catalogue/dacia-duster']);
    expect(row.pages[1]).toMatchObject({ duration: null, scroll: null });
    expect(row.events[0]).toMatchObject({ label: 'Voiture', target: 'dacia-duster' });
  });

  it('durées lisibles', () => {
    expect(formatDuration(null)).toBe('—');
    expect(formatDuration(45)).toBe('45 s');
    expect(formatDuration(185)).toBe('3 min 05');
    expect(formatDuration(3720)).toBe('1 h 02');
  });
});
