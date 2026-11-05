import { Inter, Noto_Sans_Arabic } from 'next/font/google';

export const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

/** Police variable, téléchargée seulement lorsqu'une page arabe l'utilise. */
export const notoArabic = Noto_Sans_Arabic({
  subsets: ['arabic'],
  display: 'swap',
  variable: '--font-arabic',
  preload: false,
});
