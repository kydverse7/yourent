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
          // Routes internes de la recherche par dates ou filtres : jamais une adresse publique.
          '/catalogue-recherche',
          '/en/catalogue-recherche',
          '/ar/catalogue-recherche',
        ],
      },
    ],
    sitemap: absoluteUrl('/sitemap.xml'),
  };
}
