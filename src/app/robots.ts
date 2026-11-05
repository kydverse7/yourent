import type { MetadataRoute } from 'next';
import { absoluteUrl } from '@/lib/site';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/login',
          '/dashboard',
          '/alertes',
          '/clients',
          '/contrats',
          '/depenses',
          '/etat-des-lieux',
          '/factures',
          '/finances',
          '/locations',
          '/maintenance',
          '/paiements',
          '/parametres',
          '/reservations',
          '/vehicules',
        ],
      },
    ],
    sitemap: absoluteUrl('/sitemap.xml'),
  };
}
