'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { ADS_CONVERSION_LABELS, ADS_ID, type AdsConversion } from '@/lib/ads';
import {
  classifyLink,
  classifySource,
  deviceFromUserAgent,
  isBookingText,
  localeOfPath,
  normalizePath,
  pageKindOf,
  vehicleSlugOf,
  type ActionKind,
  type SessionMeta,
  type SiteLocale,
} from '@/lib/tracking/shared';

type GtagParams = Record<string, string | number | boolean | undefined>;
type Gtag = (command: 'event', name: string, params?: GtagParams) => void;

/** Envoie un événement à gtag ; sans effet si gtag n'est pas chargé (bloqueur, hors ligne, tests). */
export function trackEvent(name: string, params: GtagParams = {}): void {
  try {
    const gtag = (window as unknown as { gtag?: Gtag }).gtag;
    if (typeof gtag === 'function') gtag('event', name, params);
  } catch {
    // La mesure ne doit jamais casser la page.
  }
}

/** Conversion Google Ads ; sans effet tant que le libellé de l'action n'est pas renseigné dans src/lib/ads.ts. */
function trackConversion(kind: AdsConversion, params: GtagParams = {}): void {
  const label = ADS_CONVERSION_LABELS[kind];
  if (!label) return;
  trackEvent('conversion', { send_to: `${ADS_ID}/${label}`, ...params });
}

const SUBMITTED_KEY = 'yourent:reservation_submitted';
let submittedInMemory = false;

function alreadyTracked(): boolean {
  if (submittedInMemory) return true;
  try {
    return window.sessionStorage.getItem(SUBMITTED_KEY) === '1';
  } catch {
    return false;
  }
}

function markTracked(): void {
  submittedInMemory = true;
  try {
    window.sessionStorage.setItem(SUBMITTED_KEY, '1');
  } catch {
    // sessionStorage indisponible : la variable en mémoire suffit pour la page en cours.
  }
}

/* ───────────────────────── Mesure d'audience maison ─────────────────────────
 * Sans cookie ni bibliothèque : identifiant de session aléatoire (sessionStorage, effacé à la fermeture
 * de l'onglet), pages vues, durée et défilement, clics utiles. Aucun texte saisi n'est lu.
 * Les envois partent par lots (navigator.sendBeacon) vers /api/public/track, hors du chargement de la page.
 */

const TRACK_URL = '/api/public/track';
const KEY = {
  sid: 'yourent:sid',
  meta: 'yourent:meta',
  seq: 'yourent:seq',
  last: 'yourent:last',
  locale: 'yourent:locale',
  res: 'yourent:res',
  optOut: 'yourent:notrack',
} as const;
/** Une visite se termine après 30 minutes sans activité. */
const SESSION_IDLE_MS = 30 * 60 * 1000;
const BATCH_MAX = 40;
const FLUSH_DELAY_MS = 4000;
/** Actions envoyées tout de suite : elles précèdent souvent un départ du site (WhatsApp, appel...). */
const URGENT: ReadonlySet<string> = new Set(['wa', 'tel', 'mail', 'out', 'submit', 'res']);

type ViewEvent = { k: 'view'; n: number; p: string; d?: number; s?: number };
type LeaveEvent = { k: 'leave'; n: number; d: number; s: number };
type ActionEvent = { k: ActionKind; p: string; tg?: string; v?: string; lb?: string };
type OutgoingEvent = ViewEvent | LeaveEvent | ActionEvent;

interface PageState {
  n: number;
  path: string;
  view: ViewEvent;
  visibleSince: number | null;
  visibleMs: number;
  maxScroll: number;
  formStarted: boolean;
  sent: { d: number; s: number } | null;
}

interface TrackerState {
  sid: string;
  meta: SessionMeta;
  queue: OutgoingEvent[];
  timer: ReturnType<typeof setTimeout> | null;
  page: PageState | null;
}

let tracker: TrackerState | null = null;
let trackerDisabled = false;
let initialVisit: { href: string; referrer: string; path: string; at: number } | null = null;
let initScheduled = false;

function readSession(key: string): string | null {
  try {
    return window.sessionStorage.getItem(key);
  } catch {
    return null;
  }
}

function writeSession(key: string, value: string): void {
  try {
    window.sessionStorage.setItem(key, value);
  } catch {
    // Navigation privée stricte : l'état reste en mémoire pour la page en cours.
  }
}

function randomId(): string {
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_';
  const bytes = new Uint8Array(18);
  try {
    window.crypto.getRandomValues(bytes);
  } catch {
    for (let i = 0; i < bytes.length; i += 1) bytes[i] = Math.floor(Math.random() * 256);
  }
  let id = '';
  for (const byte of bytes) id += alphabet[byte & 63];
  return id;
}

function whenIdle(callback: () => void, timeout = 3000): void {
  const ric = (window as unknown as { requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number })
    .requestIdleCallback;
  if (typeof ric === 'function') ric(callback, { timeout });
  else setTimeout(callback, 200);
}

/** Exclusion d'un appareil (le gérant, l'équipe) : ?yourent_notrack=1 pour exclure, ?yourent_notrack=0 pour revenir. */
function isOptedOut(): boolean {
  try {
    const flag = new URLSearchParams(window.location.search).get('yourent_notrack');
    if (flag === '1') window.localStorage.setItem(KEY.optOut, '1');
    if (flag === '0') window.localStorage.removeItem(KEY.optOut);
    return window.localStorage.getItem(KEY.optOut) === '1';
  } catch {
    return false;
  }
}

function currentLocale(path: string): SiteLocale {
  const lang = document.documentElement.lang;
  return lang === 'fr' || lang === 'en' || lang === 'ar' ? lang : localeOfPath(path);
}

function buildMeta(href: string, referrer: string, path: string): SessionMeta {
  const language = (navigator.language || '').split('-')[0].toLowerCase();
  return {
    ...classifySource({ url: href, referrer }),
    entry: path,
    lang: currentLocale(path),
    bl: /^[a-z]{2,3}$/.test(language) ? language : undefined,
    dev: deviceFromUserAgent(navigator.userAgent, navigator.maxTouchPoints || 0),
  };
}

/** Nouvelle visite : identifiant tiré au hasard, origine calculée sur l'adresse d'arrivée. */
function openSession(href: string, referrer: string, path: string): { sid: string; meta: SessionMeta } {
  const sid = randomId();
  const meta = buildMeta(href, referrer, path);
  writeSession(KEY.sid, sid);
  writeSession(KEY.meta, JSON.stringify(meta));
  writeSession(KEY.seq, '0');
  writeSession(KEY.res, '');
  writeSession(KEY.locale, '');
  writeSession(KEY.last, String(Date.now()));
  return { sid, meta };
}

function resumeSession(): { sid: string; meta: SessionMeta } | null {
  const sid = readSession(KEY.sid);
  const rawMeta = readSession(KEY.meta);
  const last = Number(readSession(KEY.last) ?? 0);
  if (!sid || !rawMeta || !last || Date.now() - last > SESSION_IDLE_MS) return null;
  try {
    return { sid, meta: JSON.parse(rawMeta) as SessionMeta };
  } catch {
    return null;
  }
}

function ensureTracker(): TrackerState | null {
  if (tracker || trackerDisabled || !initialVisit) return tracker;
  if (navigator.webdriver || isOptedOut()) {
    trackerDisabled = true;
    return null;
  }
  const session = resumeSession() ?? openSession(initialVisit.href, initialVisit.referrer, initialVisit.path);
  tracker = { ...session, queue: [], timer: null, page: null };
  startPage(initialVisit.path, initialVisit.at);
  return tracker;
}

/** Mesure prête ; initialisée sur-le-champ si le visiteur agit avant que le navigateur soit libre. */
function activeTracker(): TrackerState | null {
  return tracker ?? (initScheduled ? ensureTracker() : null);
}

/** Retour après une longue absence dans le même onglet : nouvelle visite, venue « directe ». */
function rotateIfExpired(state: TrackerState): boolean {
  const last = Number(readSession(KEY.last) ?? 0);
  const expired = !!last && Date.now() - last > SESSION_IDLE_MS;
  if (expired) {
    flush(state);
    Object.assign(state, openSession(window.location.href, '', normalizePath(window.location.pathname)));
  }
  writeSession(KEY.last, String(Date.now()));
  return expired;
}

function nextSequence(): number {
  const n = Number(readSession(KEY.seq) ?? 0);
  writeSession(KEY.seq, String(n + 1));
  return Number.isFinite(n) && n >= 0 ? n : 0;
}

function enqueue(state: TrackerState, event: OutgoingEvent): void {
  state.queue.push(event);
  writeSession(KEY.last, String(Date.now()));
  if (state.queue.length >= BATCH_MAX || ('p' in event && URGENT.has(event.k))) {
    flush(state);
    return;
  }
  if (!state.timer) {
    state.timer = setTimeout(() => {
      if (tracker) tracker.timer = null;
      whenIdle(() => tracker && flush(tracker));
    }, FLUSH_DELAY_MS);
  }
}

function send(body: string): void {
  try {
    if (typeof navigator.sendBeacon === 'function') {
      const blob = new Blob([body], { type: 'text/plain;charset=UTF-8' });
      if (navigator.sendBeacon(TRACK_URL, blob)) return;
    }
  } catch {
    // Repli ci-dessous.
  }
  try {
    void fetch(TRACK_URL, {
      method: 'POST',
      body,
      keepalive: true,
      credentials: 'omit',
      headers: { 'Content-Type': 'text/plain;charset=UTF-8' },
    }).catch(() => {});
  } catch {
    // La mesure ne doit jamais casser la page.
  }
}

function flush(state: TrackerState): void {
  if (state.timer) {
    clearTimeout(state.timer);
    state.timer = null;
  }
  while (state.queue.length) {
    const batch = state.queue.splice(0, BATCH_MAX);
    send(JSON.stringify({ v: 1, sid: state.sid, m: state.meta, e: batch }));
  }
}

function measureScroll(page: PageState): void {
  const doc = document.documentElement;
  const height = Math.max(doc.scrollHeight, document.body?.scrollHeight ?? 0);
  const seen = window.scrollY + window.innerHeight;
  const depth = height > 0 ? Math.min(100, Math.round((seen / height) * 100)) : 100;
  if (depth > page.maxScroll) page.maxScroll = depth;
}

function visibleSeconds(page: PageState): number {
  const running = page.visibleSince === null ? 0 : Date.now() - page.visibleSince;
  return Math.round((page.visibleMs + running) / 1000);
}

/** Durée et défilement de la page : joints à la page vue si elle n'est pas encore partie, sinon envoi « leave ». */
function reportPage(state: TrackerState, page: PageState): void {
  measureScroll(page);
  const d = visibleSeconds(page);
  const s = page.maxScroll;
  if (page.sent && page.sent.d === d && page.sent.s === s) return;
  page.sent = { d, s };
  if (state.queue.includes(page.view)) {
    page.view.d = d;
    page.view.s = s;
  } else {
    state.queue.push({ k: 'leave', n: page.n, d, s });
  }
}

function startPage(path: string, startedAt = Date.now()): void {
  const state = tracker;
  if (!state) return;
  rotateIfExpired(state);

  const previousLocale = readSession(KEY.locale);
  const locale = localeOfPath(path);
  writeSession(KEY.locale, locale);

  const n = nextSequence();
  const view: ViewEvent = { k: 'view', n, p: path };
  const page: PageState = {
    n,
    path,
    view,
    visibleSince: document.visibilityState === 'visible' ? startedAt : null,
    visibleMs: 0,
    maxScroll: 0,
    formStarted: false,
    sent: null,
  };
  state.page = page;
  enqueue(state, view);

  if (previousLocale && previousLocale !== locale) {
    enqueue(state, { k: 'lang', p: path, tg: `${previousLocale}>${locale}` });
  }

  if (pageKindOf(path) === 'confirmation') {
    /* Une demande ne compte qu'une fois par visite et par modèle : rechargement ou changement de langue exclus. */
    const key = vehicleSlugOf(path) ?? path;
    const seen = (readSession(KEY.res) ?? '').split(',').filter(Boolean);
    if (!seen.includes(key)) {
      writeSession(KEY.res, [...seen, key].slice(-10).join(','));
      enqueue(state, { k: 'res', p: path, v: vehicleSlugOf(path) });
    }
  }

  /* Profondeur initiale (page plus courte que l'écran), mesurée une fois la page affichée. */
  whenIdle(() => {
    if (tracker?.page === page) measureScroll(page);
  });
}

function endPage(state: TrackerState): void {
  const page = state.page;
  if (!page) return;
  if (page.visibleSince !== null) {
    page.visibleMs += Date.now() - page.visibleSince;
    page.visibleSince = null;
  }
  reportPage(state, page);
  state.page = null;
}

function isReservationForm(form: HTMLFormElement): boolean {
  return (
    form.matches('[data-track-form="reservation"]')
    || !!form.querySelector('input[type="tel"], [id^="res-"], [data-track-form="reservation"]')
  );
}

function elementText(element: Element): string {
  return (element.getAttribute('aria-label') || element.textContent || '').replace(/\s+/g, ' ').trim().slice(0, 80);
}

function onTrackedClick(event: MouseEvent): void {
  const state = activeTracker();
  const page = state?.page;
  if (!state || !page) return;
  const target = event.target;
  if (!(target instanceof Element)) return;
  const element = target.closest('a[href], button, [data-track]');
  if (!element) return;
  const label = element.closest('[data-track]')?.getAttribute('data-track')?.slice(0, 60) || undefined;

  if (element instanceof HTMLAnchorElement || element.matches('a[href]')) {
    const click = classifyLink(element.getAttribute('href') ?? '', elementText(element), window.location.href);
    if (click) enqueue(state, { k: click.k, p: page.path, tg: click.tg, v: click.v, lb: label });
    return;
  }
  if (element instanceof HTMLButtonElement) {
    /* Les boutons d'envoi sont comptés par l'envoi du formulaire. */
    if (element.type === 'submit' && element.form) return;
    if (label) enqueue(state, { k: 'cta', p: page.path, lb: label });
    else if (isBookingText(elementText(element))) enqueue(state, { k: 'book', p: page.path, tg: 'bouton', v: vehicleSlugOf(page.path) });
    return;
  }
  if (label) enqueue(state, { k: 'cta', p: page.path, lb: label });
}

function onFocusIn(event: FocusEvent): void {
  const state = activeTracker();
  const page = state?.page;
  if (!state || !page || page.formStarted) return;
  const target = event.target;
  if (!(target instanceof HTMLInputElement || target instanceof HTMLSelectElement || target instanceof HTMLTextAreaElement)) return;
  const form = target.form;
  if (!form || !isReservationForm(form)) return;
  page.formStarted = true;
  enqueue(state, { k: 'form', p: page.path, v: vehicleSlugOf(page.path) });
}

function onSubmit(event: SubmitEvent): void {
  const state = activeTracker();
  const page = state?.page;
  if (!state || !page || !(event.target instanceof HTMLFormElement)) return;
  if (isReservationForm(event.target)) {
    if (!page.formStarted) {
      page.formStarted = true;
      enqueue(state, { k: 'form', p: page.path, v: vehicleSlugOf(page.path) });
    }
    enqueue(state, { k: 'submit', p: page.path, v: vehicleSlugOf(page.path) });
  } else {
    enqueue(state, { k: 'search', p: page.path, tg: pageKindOf(page.path) });
  }
}

let scrollPending = false;
function onScroll(): void {
  if (scrollPending || !tracker?.page) return;
  scrollPending = true;
  requestAnimationFrame(() => {
    scrollPending = false;
    if (tracker?.page) measureScroll(tracker.page);
  });
}

function onHide(): void {
  /* Départ avant la fin de l'initialisation (visite très courte) : la page est tout de même comptée. */
  const state = activeTracker();
  if (!state) return;
  const page = state.page;
  if (page) {
    if (page.visibleSince !== null) {
      page.visibleMs += Date.now() - page.visibleSince;
      page.visibleSince = null;
    }
    reportPage(state, page);
  }
  flush(state);
}

function onVisibilityChange(): void {
  if (document.visibilityState === 'hidden') {
    onHide();
    return;
  }
  const state = tracker;
  if (!state) return;
  const page = state.page;
  if (rotateIfExpired(state) && page) {
    state.page = null;
    startPage(page.path);
    return;
  }
  if (page && page.visibleSince === null) page.visibleSince = Date.now();
}

/** Mesure des clics WhatsApp et téléphone, et de la demande de réservation envoyée. */
export function Analytics() {
  const pathname = usePathname();

  useEffect(() => {
    function onClick(event: MouseEvent) {
      const target = event.target;
      if (!(target instanceof Element)) return;
      const link = target.closest('a[href]');
      const href = link?.getAttribute('href');
      if (!href) return;
      const page = window.location.pathname;

      if (/^https?:\/\/(wa\.me|api\.whatsapp\.com)\//i.test(href)) {
        trackEvent('whatsapp_click', { page_path: page });
        /* Sur la page de confirmation, la demande est déjà comptée : pas de seconde conversion. */
        if (!page.includes('/confirmation')) trackConversion('whatsapp', { transport_type: 'beacon' });
      } else if (/^tel:/i.test(href)) {
        trackEvent('phone_click', { page_path: page });
        trackConversion('phone', { transport_type: 'beacon' });
      }
    }

    document.addEventListener('click', onClick, true);
    return () => document.removeEventListener('click', onClick, true);
  }, []);

  useEffect(() => {
    if (!pathname || !pathname.includes('/confirmation')) return;
    if (alreadyTracked()) return;
    markTracked();
    trackEvent('reservation_submitted', { page_path: pathname });
    /* L'identifiant de la demande évite qu'un rechargement de la page compte deux fois. */
    const id = new URLSearchParams(window.location.search).get('id') ?? undefined;
    trackConversion('reservation', { transaction_id: id });
  }, [pathname]);

  /* Mesure maison : écouteurs passifs ; la session et la première page vue sont traitées quand le navigateur est libre. */
  useEffect(() => {
    if (!initialVisit) {
      initialVisit = {
        href: window.location.href,
        referrer: document.referrer,
        path: normalizePath(window.location.pathname),
        at: Date.now(),
      };
    }
    if (!initScheduled) {
      initScheduled = true;
      whenIdle(() => {
        ensureTracker();
      });
    }

    document.addEventListener('click', onTrackedClick, true);
    document.addEventListener('focusin', onFocusIn, true);
    document.addEventListener('submit', onSubmit, true);
    document.addEventListener('visibilitychange', onVisibilityChange);
    window.addEventListener('pagehide', onHide);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      document.removeEventListener('click', onTrackedClick, true);
      document.removeEventListener('focusin', onFocusIn, true);
      document.removeEventListener('submit', onSubmit, true);
      document.removeEventListener('visibilitychange', onVisibilityChange);
      window.removeEventListener('pagehide', onHide);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  /* Navigation côté client : la page quittée envoie sa durée, la nouvelle est comptée. */
  useEffect(() => {
    if (!pathname || !initialVisit) return;
    const path = normalizePath(window.location.pathname);
    if (!tracker) {
      /* Changement de page avant la fin de l'initialisation : on l'avance. */
      if (path === initialVisit.path || !initScheduled) return;
      if (!ensureTracker()) return;
    }
    const state = tracker;
    if (!state || state.page?.path === path) return;
    endPage(state);
    startPage(path);
  }, [pathname]);

  return null;
}
