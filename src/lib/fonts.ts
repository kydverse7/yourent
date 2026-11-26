import { Cairo, Instrument_Serif, Inter } from 'next/font/google';

export const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

/**
 * Police de titrage du site public : Instrument Serif, un seul fichier (latin, graisse 400, ≈ 18 Ko).
 * Sert aux titres, aux noms de modèle et aux grands chiffres ; en arabe, les lettres restent en Cairo.
 */
export const display = Instrument_Serif({
  subsets: ['latin'],
  weight: '400',
  display: 'swap',
  variable: '--font-display',
});

/**
 * Police arabe : Cairo variable, sous-ensemble arabe seul (≈ 30 Ko au lieu de 160 Ko pour Noto Sans Arabic).
 * Le latin des pages arabes vient d'Inter (pile `var(--font-inter), var(--font-arabic)` dans globals.css).
 * Téléchargée seulement lorsqu'une page arabe l'utilise.
 */
export const arabic = Cairo({
  subsets: ['arabic'],
  display: 'swap',
  variable: '--font-arabic',
  preload: false,
});

/** Ancien nom, gardé pour les imports existants (espaces privés). */
export const notoArabic = arabic;
