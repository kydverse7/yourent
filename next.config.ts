import type { NextConfig } from 'next';
import { SEO_ROUTES } from './src/lib/seo/routes';

/**
 * Mesure d'audience et Google Ads (GA4 + balise AW), d'après la liste de Google :
 * https://developers.google.com/tag-platform/security/guides/csp
 * `googleads.g.doubleclick.net` en script-src n'y figure pas, mais la balise de remarketing
 * le charge bel et bien (violation constatée le 2026-11-05).
 * Google impose de lister chaque domaine national : seul google.co.ma est ajouté (clientèle marocaine).
 */
/**
 * Adresses anglaises (ou arabes) demandées sans leur préfixe de langue, par ex. /car-rental-casablanca-to-marrakech :
 * Google les a trouvées et les voit en 404 (Search Console, 2026-11-25). Elles renvoient vers la version /en,
 * sauf quand l'adresse existe aussi en français (/faq, /contact), qui reste servie à la racine.
 */
function unprefixedForeignRedirects() {
  const frenchPaths = new Set<string>();
  for (const paths of Object.values(SEO_ROUTES)) {
    if ('fr' in paths && paths.fr) frenchPaths.add(paths.fr);
  }
  const seen = new Set<string>();
  const list: { source: string; destination: string; permanent: true }[] = [];
  for (const paths of Object.values(SEO_ROUTES)) {
    const p = paths as Partial<Record<'fr' | 'en' | 'ar', string>>;
    const candidates: [string | undefined, string][] = [
      [p.en, 'en'],
      [p.ar, p.en === p.ar ? 'en' : 'ar'],
    ];
    for (const [path, locale] of candidates) {
      if (!path || frenchPaths.has(path) || seen.has(path)) continue;
      seen.add(path);
      list.push({ source: path, destination: `/${locale}${path}`, permanent: true });
    }
  }
  return list;
}

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
      ['/index.php', '/'],
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
    return [
      ...legacy.map(([source, destination]) => ({ source, destination, permanent: true })),
      ...unprefixedForeignRedirects(),
    ];
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
      {
        /* Image de partage (réseaux sociaux) : utile en aperçu, sans intérêt comme page dans Google. */
        source: '/opengraph-image',
        headers: [{ key: 'X-Robots-Tag', value: 'noindex' }],
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
