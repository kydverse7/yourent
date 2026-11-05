import type { Metadata, Viewport } from 'next';
import Script from 'next/script';
import { notFound } from 'next/navigation';
import { Toaster } from 'react-hot-toast';
import { QueryProvider } from '@/providers/QueryProvider';
import { inter, notoArabic } from '@/lib/fonts';
import { isLocale, isRtl, LOCALES } from '@/lib/i18n/routing';
import { SITE_URL } from '@/lib/site';
import { Analytics } from './_components/Analytics';
import { PublicLayoutShell } from './_components/PublicLayoutShell';
import '@/app/globals.css';

export const viewport: Viewport = {
  themeColor: '#0A0A0A',
  width: 'device-width',
  initialScale: 1,
};

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;
const GSC_VERIFICATION = process.env.NEXT_PUBLIC_GSC_VERIFICATION;
const BING_VERIFICATION = process.env.NEXT_PUBLIC_BING_VERIFICATION;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  manifest: '/manifest.json',
  icons: {
    icon: '/favicon.ico',
    apple: '/icon-192.png',
  },
  ...(GSC_VERIFICATION || BING_VERIFICATION
    ? {
        verification: {
          ...(GSC_VERIFICATION ? { google: GSC_VERIFICATION } : {}),
          ...(BING_VERIFICATION ? { other: { 'msvalidate.01': BING_VERIFICATION } } : {}),
        },
      }
    : {}),
};

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export default async function PublicRootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const fontClasses = locale === 'ar' ? `${inter.variable} ${notoArabic.variable}` : inter.variable;

  return (
    <html lang={locale} dir={isRtl(locale) ? 'rtl' : 'ltr'} className={fontClasses}>
      <body suppressHydrationWarning className="min-h-screen antialiased bg-noir-root text-cream">
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=AW-17463963038"
          strategy="afterInteractive"
        />
        <Script id="google-ads-gtag" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'AW-17463963038');${
              GA_ID ? `
            gtag('config', ${JSON.stringify(GA_ID)});` : ''
            }
          `}
        </Script>
        <Analytics />
        <QueryProvider>
          <PublicLayoutShell locale={locale}>{children}</PublicLayoutShell>
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
