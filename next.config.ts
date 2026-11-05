import type { NextConfig } from 'next';

/**
 * Mesure d'audience et Google Ads (GA4 + balise AW), d'après la liste de Google :
 * https://developers.google.com/tag-platform/security/guides/csp
 * `googleads.g.doubleclick.net` en script-src n'y figure pas, mais la balise de remarketing
 * le charge bel et bien (violation constatée le 2026-11-05).
 * Google impose de lister chaque domaine national : seul google.co.ma est ajouté (clientèle marocaine).
 */
const GOOGLE_SCRIPTS = [
  'https://www.googletagmanager.com',
  'https://*.google-analytics.com',
  'https://www.googleadservices.com',
  'https://www.google.com',
  'https://googleads.g.doubleclick.net',
].join(' ');
const GOOGLE_IMAGES = [
  'https://www.googletagmanager.com',
  'https://*.google-analytics.com',
  'https://www.googleadservices.com',
  'https://*.g.doubleclick.net',
  'https://ad.doubleclick.net',
  'https://pagead2.googlesyndication.com',
  'https://*.google.com',
  'https://*.google.co.ma',
].join(' ');
const GOOGLE_CONNECT = [
  'https://www.googletagmanager.com',
  'https://*.google-analytics.com',
  'https://*.analytics.google.com',
  'https://www.googleadservices.com',
  'https://*.g.doubleclick.net',
  'https://ad.doubleclick.net',
  'https://pagead2.googlesyndication.com',
  'https://*.google.com',
  'https://*.google.co.ma',
].join(' ');
const GOOGLE_FRAMES = [
  'https://www.googletagmanager.com',
  'https://www.google.co.ma',
  'https://googleads.g.doubleclick.net',
].join(' ');

const nextConfig: NextConfig = {
  images: {
    qualities: [65, 75],
    localPatterns: [
      {
        pathname: '/**',
      },
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/**',
      },
    ],
  },
  /**
   * Anciennes adresses (site WordPress, anciens modèles) encore connues de Google,
   * relevées dans Search Console le 2026-11-05 : redirigées vers leur équivalent.
   * Celles sans équivalent (/my-account, /project/..., /joel-ferrell...) restent en 404.
   */
  async redirects() {
    const legacy: [string, string][] = [
      ['/nos-vehicules', '/catalogue'],
      ['/shop', '/catalogue'],
      ['/contacts', '/contact'],
      ['/notre-societe', '/a-propos'],
      ['/team', '/a-propos'],
      ['/promo', '/tarifs'],
      ['/mentions-legales', '/a-propos'],
      ['/porche-macan', '/catalogue/porsche-macan'],
      ['/duster', '/catalogue/dacia-duster'],
      ['/range-sport-2', '/catalogue/range-rover-sport'],
      ['/evoque-dynamique-r', '/catalogue/range-rover-evoque'],
      ['/evoque-bb-velar-700-tuareg', '/location-range-rover-casablanca'],
      ['/q8-troc-volswagen', '/catalogue/volkswagen-t-roc'],
      ['/volswagen-tuareg', '/catalogue/volkswagen-touareg'],
      ['/golf', '/catalogue/volkswagen-golf-8'],
      ['/mercedes-benz-cla220', '/catalogue/mercedes-cla'],
      ['/le-nouveau-cla', '/catalogue/mercedes-cla'],
      ['/audi-q3', '/catalogue/audi-q3'],
      ['/catalogue/audi-new-q3', '/catalogue/audi-q3'],
      ['/audi-q8-2023', '/location-audi-casablanca'],
      ['/q8', '/location-audi-casablanca'],
      ['/peugeot-3008', '/location-suv-casablanca'],
      ['/clio', '/location-voiture-pas-cher-casablanca'],
      ['/catalogue/renault-clio-4', '/location-voiture-pas-cher-casablanca'],
    ];
    return legacy.map(([source, destination]) => ({ source, destination, permanent: true }));
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-XSS-Protection', value: '1; mode=block' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(self), microphone=(), geolocation=()' },
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              `script-src 'self' 'unsafe-eval' 'unsafe-inline' ${GOOGLE_SCRIPTS}`,
              "style-src 'self' 'unsafe-inline'",
              `img-src 'self' blob: data: https://res.cloudinary.com ${GOOGLE_IMAGES}`,
              "font-src 'self'",
              `connect-src 'self' https://res.cloudinary.com https://wa.me ${GOOGLE_CONNECT}`,
              `frame-src 'self' https://www.google.com ${GOOGLE_FRAMES}`,
              "frame-ancestors 'none'",
            ].join('; '),
          },
        ],
      },
    ];
  },
  experimental: {
    serverActions: {
      bodySizeLimit: '10mb',
    },
  },
};

export default nextConfig;
