import type { NextConfig } from 'next';

/**
 * Mesure d'audience et Google Ads (GA4 + balise AW) : le strict nécessaire par directive.
 * Les domaines régionaux de GA4 (region1.google-analytics.com, etc.) sont couverts par le joker.
 */
const GOOGLE_SCRIPTS = 'https://www.googletagmanager.com https://*.google-analytics.com';
const GOOGLE_IMAGES = [
  'https://www.googletagmanager.com',
  'https://*.google-analytics.com',
  'https://googleads.g.doubleclick.net',
  'https://www.google.com',
  'https://www.google.co.ma',
].join(' ');
const GOOGLE_CONNECT = [
  'https://www.googletagmanager.com',
  'https://*.google-analytics.com',
  'https://*.analytics.google.com',
  'https://googleads.g.doubleclick.net',
  'https://www.google.com',
  'https://www.google.co.ma',
].join(' ');
const GOOGLE_FRAMES = 'https://www.google.co.ma https://googleads.g.doubleclick.net';

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
