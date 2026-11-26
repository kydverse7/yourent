/**
 * Mesure d'audience maison : fonctions pures partagées par le site public (collecte),
 * l'API de collecte et le tableau de bord. Aucune dépendance : ce fichier est chargé sur les pages publiques.
 */

/** Origine d'une visite, calculée une seule fois au début de la session. */
export const SOURCE_KEYS = [
  'google_ads',
  'google',
  'bing',
  'facebook',
  'instagram',
  'whatsapp',
  'ai',
  'direct',
  'campaign',
  'referral',
] as const;
export type SourceKey = (typeof SOURCE_KEYS)[number];

export type DeviceKind = 'mobile' | 'tablet' | 'desktop';
export type SiteLocale = 'fr' | 'en' | 'ar';

/** Actions mesurées sur le site (hors pages vues). */
export const ACTION_KINDS = [
  'wa', // clic WhatsApp
  'tel', // clic téléphone
  'mail', // clic e-mail
  'book', // bouton Réserver / Demander
  'car', // lien vers une fiche véhicule (carte, vignette...)
  'link', // autre lien interne
  'out', // lien vers un autre site
  'lang', // changement de langue
  'form', // formulaire de réservation commencé (premier champ touché)
  'submit', // formulaire de réservation envoyé (tentative)
  'search', // recherche par dates / filtre envoyé
  'res', // demande de réservation enregistrée (page de confirmation)
  'cta', // élément marqué data-track sans lien
] as const;
export type ActionKind = (typeof ACTION_KINDS)[number];

export interface SessionMeta {
  src: SourceKey;
  /** Détail : domaine du site d'origine, ou utm_source. */
  sd?: string;
  /** utm_medium (ou « cpc » pour une annonce). */
  med?: string;
  /** utm_campaign, ou identifiant de campagne Google Ads (gad_campaignid). */
  cmp?: string;
  /** Page d'entrée (adresse publique, sans paramètres). */
  entry: string;
  /** Langue du site à l'arrivée. */
  lang: SiteLocale;
  /** Langue du navigateur (code à 2 ou 3 lettres). */
  bl?: string;
  dev: DeviceKind;
}

const AI_HOSTS = [
  'chatgpt.com',
  'chat.openai.com',
  'openai.com',
  'perplexity.ai',
  'gemini.google.com',
  'bard.google.com',
  'copilot.microsoft.com',
  'claude.ai',
  'chat.mistral.ai',
  'chat.deepseek.com',
  'you.com',
  'phind.com',
  'meta.ai',
  'grok.com',
];

function hostMatches(host: string, domain: string): boolean {
  return host === domain || host.endsWith(`.${domain}`);
}

function clip(value: string | null | undefined, max: number): string | undefined {
  if (!value) return undefined;
  const clean = value.replace(/[\u0000-\u001f\u007f]/g, '').trim();
  return clean ? clean.slice(0, max) : undefined;
}

/** Nom de domaine sans « www. », en minuscules. */
export function cleanHost(host: string): string {
  return host.toLowerCase().replace(/^www\./, '').replace(/\.$/, '');
}

function hostOf(url: string): string | null {
  try {
    const parsed = new URL(url);
    if (parsed.protocol === 'android-app:') return parsed.hostname.toLowerCase();
    return parsed.hostname ? cleanHost(parsed.hostname) : null;
  } catch {
    return null;
  }
}

/** Catégorie d'un site d'origine (référent ou utm_source exprimé en domaine). */
function sourceFromHost(host: string): SourceKey | null {
  if (AI_HOSTS.some((domain) => hostMatches(host, domain))) return 'ai';
  if (
    hostMatches(host, 'googleadservices.com')
    || hostMatches(host, 'doubleclick.net')
    || hostMatches(host, 'googlesyndication.com')
  ) return 'google_ads';
  if (/(^|\.)google\.[a-z.]+$/.test(host) || host === 'com.google.android.googlequicksearchbox' || host === 'com.google.android.gm') return 'google';
  if (hostMatches(host, 'bing.com')) return 'bing';
  if (
    hostMatches(host, 'facebook.com')
    || hostMatches(host, 'fb.com')
    || hostMatches(host, 'fb.me')
    || hostMatches(host, 'messenger.com')
    || host === 'com.facebook.katana'
  ) return 'facebook';
  if (hostMatches(host, 'instagram.com') || host === 'com.instagram.android') return 'instagram';
  if (hostMatches(host, 'wa.me') || hostMatches(host, 'whatsapp.com') || host === 'com.whatsapp') return 'whatsapp';
  return null;
}

/** Catégorie déduite d'un utm_source (souvent un mot : google, facebook, ig, chatgpt.com...). */
function sourceFromUtm(utmSource: string, utmMedium: string | undefined): SourceKey | null {
  const s = utmSource.toLowerCase();
  const paid = !!utmMedium && /^(cpc|ppc|paid|paidsearch|paid_search|sem|display|cpm)$/i.test(utmMedium);
  if (/^(google|adwords|google_ads|googleads)$/.test(s)) return paid || s !== 'google' ? 'google_ads' : 'google';
  if (/^(bing|microsoft|msn)$/.test(s)) return 'bing';
  if (/^(facebook|fb|meta|messenger)$/.test(s)) return 'facebook';
  if (/^(instagram|ig)$/.test(s)) return 'instagram';
  if (/^(whatsapp|wa)$/.test(s)) return 'whatsapp';
  if (/^(chatgpt|openai|perplexity|gemini|copilot|claude|mistral|deepseek)$/.test(s)) return 'ai';
  if (s.includes('.')) return sourceFromHost(cleanHost(s));
  return null;
}

/**
 * Origine d'une visite :
 * 1. identifiant de clic d'annonce (gclid, gbraid, wbraid, gad_source, dclid) ⇒ Google Ads ; msclkid ⇒ Bing ;
 * 2. paramètres utm_* s'ils sont présents ;
 * 3. sinon le site d'origine (document.referrer) ; fbclid seul ⇒ Facebook ;
 * 4. sinon accès direct.
 */
export function classifySource(input: { url: string; referrer?: string | null }): Pick<SessionMeta, 'src' | 'sd' | 'med' | 'cmp'> {
  let params: URLSearchParams;
  let ownHost = '';
  try {
    const parsed = new URL(input.url);
    params = parsed.searchParams;
    ownHost = cleanHost(parsed.hostname);
  } catch {
    params = new URLSearchParams();
  }

  const utmSource = clip(params.get('utm_source'), 80);
  const utmMedium = clip(params.get('utm_medium'), 60);
  const utmCampaign = clip(params.get('utm_campaign'), 100);
  const adsCampaign = clip(params.get('gad_campaignid') ?? params.get('campaignid'), 40);

  if (['gclid', 'gbraid', 'wbraid', 'gad_source', 'dclid'].some((key) => params.has(key))) {
    return { src: 'google_ads', sd: utmSource ?? 'google', med: utmMedium ?? 'cpc', cmp: utmCampaign ?? adsCampaign };
  }
  if (params.has('msclkid')) {
    return { src: 'bing', sd: utmSource ?? 'bing', med: utmMedium ?? 'cpc', cmp: utmCampaign };
  }

  const refHost = input.referrer ? hostOf(input.referrer) : null;
  const external = refHost && refHost !== ownHost ? refHost : null;

  if (utmSource) {
    const fromUtm = sourceFromUtm(utmSource, utmMedium) ?? (external ? sourceFromHost(external) : null);
    return { src: fromUtm ?? 'campaign', sd: utmSource.toLowerCase(), med: utmMedium, cmp: utmCampaign };
  }

  if (external) {
    const fromHost = sourceFromHost(external);
    if (fromHost) return { src: fromHost, sd: external, med: utmMedium, cmp: utmCampaign };
    return { src: 'referral', sd: external.slice(0, 100), med: utmMedium, cmp: utmCampaign };
  }

  if (params.has('fbclid')) return { src: 'facebook', sd: 'fbclid', med: utmMedium, cmp: utmCampaign };
  if (params.has('igshid')) return { src: 'instagram', sd: 'igshid', med: utmMedium, cmp: utmCampaign };
  return { src: 'direct', med: utmMedium, cmp: utmCampaign };
}

/** Appareil d'après l'agent utilisateur ; un iPad récent se présente comme un Mac tactile. */
export function deviceFromUserAgent(ua: string, maxTouchPoints = 0): DeviceKind {
  if (/iPad|Tablet|PlayBook|Silk|Kindle/i.test(ua)) return 'tablet';
  if (/Android/i.test(ua) && !/Mobile/i.test(ua)) return 'tablet';
  if (/Macintosh/i.test(ua) && maxTouchPoints > 1) return 'tablet';
  if (/Mobi|iPhone|iPod|Android|Windows Phone|BlackBerry|Opera Mini/i.test(ua)) return 'mobile';
  return 'desktop';
}

/** Adresse publique normalisée : sans paramètres ni barre finale, longueur bornée. */
export function normalizePath(pathname: string): string {
  let path = (pathname || '/').split(/[?#]/)[0] || '/';
  try {
    path = decodeURI(path);
  } catch {
    // Adresse mal encodée : gardée telle quelle.
  }
  path = path.replace(/[\u0000-\u001f\u007f]/g, '').replace(/\/{2,}/g, '/');
  if (!path.startsWith('/')) path = `/${path}`;
  if (path.length > 1) path = path.replace(/\/+$/, '') || '/';
  /* Adresses internes (réécriture) ramenées à l'adresse publique. */
  path = path.replace(/^\/fr(?=\/|$)/, '') || '/';
  path = path.replace(/^(\/(?:en|ar))?\/catalogue-recherche(?=\/|$)/, '$1/catalogue');
  return path.slice(0, 160);
}

/** Langue d'une adresse publique. */
export function localeOfPath(path: string): SiteLocale {
  const match = path.match(/^\/(en|ar)(?:\/|$)/);
  return (match?.[1] as SiteLocale | undefined) ?? 'fr';
}

/** Adresse sans le préfixe de langue (/en/catalogue ⇒ /catalogue). */
export function stripLocale(path: string): string {
  return path.replace(/^\/(en|ar)(?=\/|$)/, '') || '/';
}

const VEHICLE_PATH = /^(?:\/(?:en|ar))?\/catalogue\/([a-z0-9][a-z0-9-]{0,80})$/i;
const CONFIRMATION_PATH = /^(?:\/(?:en|ar))?\/catalogue\/([a-z0-9][a-z0-9-]{0,80})\/confirmation$/i;
const CATALOGUE_PATH = /^(?:\/(?:en|ar))?\/catalogue$/;

export type PageKind = 'home' | 'catalogue' | 'vehicle' | 'confirmation' | 'other';

export function pageKindOf(path: string): PageKind {
  const clean = stripLocale(path);
  if (clean === '/') return 'home';
  if (CATALOGUE_PATH.test(path)) return 'catalogue';
  if (VEHICLE_PATH.test(path)) return 'vehicle';
  if (CONFIRMATION_PATH.test(path)) return 'confirmation';
  return 'other';
}

/** Modèle (slug) d'une fiche véhicule ou de sa page de confirmation. */
export function vehicleSlugOf(path: string): string | undefined {
  const match = path.match(VEHICLE_PATH) ?? path.match(CONFIRMATION_PATH);
  return match?.[1]?.toLowerCase();
}

/** Libellés des boutons de réservation, dans les trois langues du site. */
const BOOK_TEXT = /r[ée]serv|\bbook|احجز|حجز|demander|\brequest/i;

export interface ClassifiedClick {
  k: ActionKind;
  tg?: string;
  v?: string;
}

/**
 * Nature d'un clic sur un lien, d'après sa destination (et son texte pour les boutons « Réserver »).
 * Renvoie null pour un lien sans intérêt (ancre vide, javascript:).
 */
export function classifyLink(href: string, text: string, currentUrl: string): ClassifiedClick | null {
  const raw = href.trim();
  if (!raw || raw === '#' || /^javascript:/i.test(raw)) return null;
  if (/^tel:/i.test(raw)) return { k: 'tel' };
  if (/^mailto:/i.test(raw)) return { k: 'mail' };
  if (/^whatsapp:/i.test(raw)) return { k: 'wa' };

  let url: URL;
  let current: URL;
  try {
    current = new URL(currentUrl);
    url = new URL(raw, current);
  } catch {
    return null;
  }
  if (url.protocol !== 'http:' && url.protocol !== 'https:') return null;

  const host = cleanHost(url.hostname);
  if (hostMatches(host, 'wa.me') || hostMatches(host, 'whatsapp.com')) return { k: 'wa' };
  if (host !== cleanHost(current.hostname)) return { k: 'out', tg: host.slice(0, 100) };

  const path = normalizePath(url.pathname);
  const isBook = isBookingText(text);
  const slug = pageKindOf(path) === 'vehicle' ? vehicleSlugOf(path) : undefined;
  if (slug) return { k: isBook ? 'book' : 'car', tg: slug, v: slug };
  if (isBook) return { k: 'book', tg: path };
  const hash = url.hash && url.hash.length > 1 ? url.hash.slice(0, 40) : '';
  return { k: 'link', tg: `${path}${hash}`.slice(0, 160) };
}

/**
 * Texte d'un bouton de réservation (« Réserver », « Book now », « احجز »...).
 * Un texte long est celui d'une carte entière (nom, prix, caractéristiques) : c'est alors un clic sur la voiture.
 */
export function isBookingText(text: string): boolean {
  const clean = text.replace(/\s+/g, ' ').trim();
  return clean.length > 0 && clean.length <= 40 && BOOK_TEXT.test(clean);
}
