import type { Metadata, Viewport } from 'next';
import { Toaster } from 'react-hot-toast';
import { inter, notoArabic } from '@/lib/fonts';
import { QueryProvider } from '@/providers/QueryProvider';
import '@/app/globals.css';

export const privateMetadata: Metadata = {
  title: 'Yourent',
  manifest: '/manifest.json',
  robots: { index: false, follow: false },
  icons: { icon: '/favicon.ico', apple: '/logo-yourent.png' },
};

export const privateViewport: Viewport = {
  themeColor: '#0A0A0A',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

/** Document HTML des espaces privés (tableau de bord, connexion), jamais indexés. */
export function PrivateDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${inter.variable} ${notoArabic.variable}`}>
      <body suppressHydrationWarning className="min-h-screen antialiased bg-noir-root text-cream">
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
