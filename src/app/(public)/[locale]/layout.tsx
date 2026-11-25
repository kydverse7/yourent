import type { Metadata, Viewport } from 'next';
import Script from 'next/script';
import { notFound } from 'next/navigation';
import { inter, notoArabic } from '@/lib/fonts';
import { isLocale, isRtl, LOCALES } from '@/lib/i18n/routing';
import { SITE_URL } from '@/lib/site';
import { ADS_ID } from '@/lib/ads';
import { Analytics } from './_components/Analytics';
import { PublicLayoutShell } from './_components/PublicLayoutShell';
import { PublicToaster } from './_components/PublicToaster';
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
        {/* File dataLayer créée tout de suite : les événements émis avant le chargement du tag y attendent.
            Le tag lui-même est chargé après la page (vitesse), sauf pour un visiteur venu d'une annonce
            (gclid, gbraid, wbraid…) : chargé aussitôt, avant qu'un changement de page n'efface l'identifiant du clic. */}
        <Script id="google-ads-gtag" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${ADS_ID}');${
              GA_ID ? `
            gtag('config', ${JSON.stringify(GA_ID)});` : ''
            }
            (function () {
              function load() {
                if (window.__yourentTag) return;
                window.__yourentTag = true;
                var s = document.createElement('script');
                s.async = true;
                s.src = 'https://www.googletagmanager.com/gtag/js?id=${ADS_ID}';
                document.head.appendChild(s);
              }
              function later() { (window.requestIdleCallback || setTimeout)(load); }
              if (/[?&](gclid|gbraid|wbraid|gad_source|dclid)=/.test(location.search)) load();
              else if (document.readyState === 'complete') later();
              else window.addEventListener('load', later, { once: true });
            })();
          `}
        </Script>
        <Analytics />
        <PublicLayoutShell locale={locale}>{children}</PublicLayoutShell>
        <PublicToaster />
      </body>
    </html>
  );
}
