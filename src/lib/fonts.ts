import { Cairo, Inter } from 'next/font/google';

export const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
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
