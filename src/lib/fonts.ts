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
 * Police arabe des espaces privés (documents) : Cairo variable, sous-ensemble arabe seul.
 * Le site public n'utilise plus cette variable : il déclare « Cairo Arabe » dans globals.css
 * (fichier public/fonts/cairo-arabic.woff2), placée avant Inter dans la pile et préchargée sur les pages arabes.
 */
export const arabic = Cairo({
  subsets: ['arabic'],
  display: 'swap',
  variable: '--font-arabic',
  preload: false,
});

/** Ancien nom, gardé pour les imports existants (espaces privés). */
export const notoArabic = arabic;
