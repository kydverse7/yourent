import type { BrandAmbientColor } from './types';

/* ─────────── Brand ambient colours ─────────── */

export const BRAND_AMBIENT: Record<string, BrandAmbientColor> = {
  'Porsche Macan':         [200,  80,  50],
  'Volkswagen Touareg':    [ 25,  80, 190],
  'Range Rover Evoque':    [ 45,  95,  65],
  'Range Rover Sport':      [ 55, 100,  60],
  'Mercedes CLA':          [160, 160, 185],
  'Mercedes E 220':        [145, 150, 175],
  'Audi Q3':               [190,  25,  25],
  'Volkswagen Golf 8':     [ 25,  90, 200],
};

export const DISPLAY_BRANDS = [
  'Porsche Macan',
  'Volkswagen Touareg',
  'Range Rover Evoque',
  'Range Rover Sport',
  'Mercedes CLA',
  'Mercedes E 220',
  'Audi Q3',
  'Volkswagen Golf 8',
] as const;

/* ─────────── Marquee (hero) — generic brand names ─── */

export const MARQUEE_BRANDS = [
  'Porsche', 'Range Rover', 'Mercedes', 'BMW',
  'Audi', 'Volkswagen', 'Peugeot', 'Toyota',
  'Fiat', 'Opel', 'Renault', 'Dacia',
] as const;

/* ─────────── Social links ─────────── */

export const SOCIALS = [
  { label: 'Instagram', href: 'https://instagram.com/yourent.ma',  icon: 'Instagram' as const },
  { label: 'Facebook',  href: 'https://facebook.com/yourent.ma',   icon: 'Facebook'  as const },
  { label: 'TikTok',    href: 'https://tiktok.com/@yourent.ma',    icon: 'TikTok'    as const },
  { label: 'WhatsApp',  href: 'https://wa.me/212661234567',        icon: 'WhatsApp'  as const },
] as const;

/* ─────────── Process steps ─────────── */

export const PROCESS_STEPS = [
  {
    n: '01',
    title: 'Choisir dans le catalogue',
    body: 'Parcourez notre sélection de véhicules premium disponibles à Casablanca.',
  },
  {
    n: '02',
    title: 'Commander votre voiture en ligne',
    body: 'Réservez en quelques clics, puis notre équipe confirme avec vous la disponibilité et les modalités.',
  },
  {
    n: '03',
    title: 'Recevoir le véhicule',
    body: "Livraison à votre hôtel, à l'aéroport ou à l'adresse de votre choix. 7j/7.",
  },
] as const;

/* ─────────── Slider timing ─────────── */

export const AUTOPLAY_MS = 5_000;

/* ─────────── Media frame dimensions ─────────── */

export const FRAME_DESKTOP = { width: 500, height: 400 } as const;
export const FRAME_MOBILE  = { width: 350, height: 300 } as const;

/* ─────────── Nav height for scroll calculations ─────────── */

export const NAV_HEIGHT = 80;

/* ─────────── Morph threshold ─────────── */

export const MORPH_THRESHOLD = 0.98;
