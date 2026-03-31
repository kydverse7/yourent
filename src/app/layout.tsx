import type { Metadata } from 'next';
import { Inter, Noto_Sans_Arabic } from 'next/font/google';
import './globals.css';
import { QueryProvider } from '@/providers/QueryProvider';
import { Toaster } from 'react-hot-toast';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const notoArabic = Noto_Sans_Arabic({
  subsets: ['arabic'],
  display: 'swap',
  variable: '--font-arabic',
  weight: ['400', '500', '600', '700', '800'],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://yourent.ma'),
  title: {
    template: '%s | Yourent — Location de voitures au Maroc',
    default: 'Yourent — Location de voitures à Casablanca & au Maroc',
  },
  description:
    'Yourent : agence de location de voitures à Casablanca, Maroc. Louez berlines, SUV et voitures de luxe au meilleur prix. Livraison aéroport, réservation en ligne 24h/24.',
  keywords: [
    'location voiture Casablanca',
    'location voiture Maroc',
    'louer voiture Casablanca',
    'location voiture luxe Casablanca',
    'location voiture aéroport Casablanca',
    'location voiture pas cher Maroc',
    'location SUV Casablanca',
    'location berline Maroc',
    'rent car Casablanca',
    'car rental Morocco',
    'Yourent',
    'agence location voiture Casablanca',
    'location longue durée Casablanca',
  ],
  openGraph: {
    type: 'website',
    locale: 'fr_MA',
    siteName: 'Yourent',
    title: 'Yourent — Location de voitures de luxe à Casablanca, Maroc',
    description:
      'Louez la voiture idéale à Casablanca : berlines, SUV, voitures économiques et de luxe. Livraison aéroport Mohammed V, réservation en ligne.',
    url: 'https://yourent.ma',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Yourent — Location de voitures à Casablanca',
    description:
      'Berlines, SUV et voitures de luxe à louer à Casablanca. Réservation en ligne, livraison aéroport.',
  },
  alternates: {
    canonical: 'https://yourent.ma',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${inter.variable} ${notoArabic.variable}`}>
      <body className="min-h-screen antialiased bg-noir-root text-cream">
        <QueryProvider>
          {children}
          <Toaster
            position="top-right"
            toastOptions={{
              style: {
                background: 'rgba(17,17,17,0.92)',
                color: '#F5F0E8',
                border: '1px solid rgba(201,168,76,0.22)',
                backdropFilter: 'blur(16px)',
                boxShadow: '0 18px 42px rgba(0,0,0,0.38)',
                borderRadius: '18px',
              },
              success: { iconTheme: { primary: '#C9A84C', secondary: '#0A0A0A' } },
            }}
          />
        </QueryProvider>
      </body>
    </html>
  );
}
