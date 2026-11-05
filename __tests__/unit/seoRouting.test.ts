import { describe, expect, it } from 'vitest';
import { alternatePathname, localePath, splitLocale } from '@/lib/i18n/routing';
import { allSeoParams, getRoutePaths, SEO_ROUTE_KEYS } from '@/lib/seo/routes';
import robots from '@/app/robots';

describe('localePath', () => {
  it('laisse le français à la racine', () => {
    expect(localePath('fr', '/catalogue')).toBe('/catalogue');
    expect(localePath('fr', '/')).toBe('/');
  });
  it('préfixe l’anglais et l’arabe', () => {
    expect(localePath('en', '/catalogue')).toBe('/en/catalogue');
    expect(localePath('ar', '/')).toBe('/ar');
    expect(localePath('en', '/#contact')).toBe('/en#contact');
  });
  it('accepte une adresse sans barre initiale', () => {
    expect(localePath('en', 'faq')).toBe('/en/faq');
  });
});

describe('splitLocale', () => {
  it('reconnaît la langue du préfixe', () => {
    expect(splitLocale('/en/catalogue')).toEqual({ locale: 'en', path: '/catalogue' });
    expect(splitLocale('/ar')).toEqual({ locale: 'ar', path: '/' });
  });
  it('traite le reste comme du français', () => {
    expect(splitLocale('/catalogue')).toEqual({ locale: 'fr', path: '/catalogue' });
    expect(splitLocale('/')).toEqual({ locale: 'fr', path: '/' });
  });
  it('ne confond pas un segment commençant par « en » avec la langue', () => {
    expect(splitLocale('/entreprise')).toEqual({ locale: 'fr', path: '/entreprise' });
  });
});

describe('alternatePathname', () => {
  it('traduit une page SEO dans la langue visée', () => {
    expect(alternatePathname('/location-voiture-aeroport-casablanca', 'en')).toBe(
      '/en/car-rental-casablanca-airport',
    );
    expect(alternatePathname('/en/car-rental-casablanca-airport', 'fr')).toBe(
      '/location-voiture-aeroport-casablanca',
    );
  });
  it('renvoie vers l’accueil quand la page n’existe pas dans la langue visée', () => {
    expect(alternatePathname('/location-voiture-maarif-casablanca', 'en')).toBe('/en');
  });
  it('garde les pages communes et renvoie les articles vers l’accueil', () => {
    expect(alternatePathname('/catalogue/porsche-macan', 'ar')).toBe('/ar/catalogue/porsche-macan');
    expect(alternatePathname('/blog/un-article', 'en')).toBe('/en');
  });
});

describe('allSeoParams', () => {
  const params = allSeoParams();

  it('génère un couple par langue existante, sans barre initiale', () => {
    const expected = SEO_ROUTE_KEYS.reduce((total, key) => total + Object.keys(getRoutePaths(key)).length, 0);
    expect(params).toHaveLength(expected);
    for (const { seoSlug } of params) expect(seoSlug.startsWith('/')).toBe(false);
  });
  it('ne produit aucun doublon', () => {
    const keys = params.map((p) => `${p.locale}:${p.seoSlug}`);
    expect(new Set(keys).size).toBe(keys.length);
  });
  it('n’invente pas d’adresse anglaise pour une page uniquement française', () => {
    expect(params).toContainEqual({ locale: 'fr', seoSlug: 'location-voiture-bouskoura' });
    expect(params.some((p) => p.locale === 'en' && p.seoSlug === 'location-voiture-bouskoura')).toBe(false);
  });
});

type RobotsRule = { userAgent?: string | string[]; disallow?: string | string[] };
const robotsRules = (): RobotsRule[] => {
  const rules = robots().rules as RobotsRule | RobotsRule[];
  return Array.isArray(rules) ? rules : [rules];
};

describe('robots', () => {
  const rule = robotsRules()[0];
  const disallow = ([] as string[]).concat(rule.disallow ?? []);

  /** Robots.txt applique un préfixe : « /clients » bloque tout ce qui commence par « /clients ». */
  const isBlocked = (path: string) => disallow.some((prefix) => path.startsWith(prefix));

  it('ne bloque aucune page SEO, dans aucune langue', () => {
    for (const { locale, seoSlug } of allSeoParams()) {
      const path = localePath(locale, `/${seoSlug}`);
      expect(isBlocked(path), path).toBe(false);
    }
  });
  it('laisse passer les pages publiques et les fichiers utiles', () => {
    for (const path of ['/', '/en', '/ar', '/catalogue', '/catalogue/porsche-macan', '/blog', '/llms.txt', '/sitemap.xml', '/opengraph-image']) {
      expect(isBlocked(path), path).toBe(false);
    }
  });
  it('bloque l’espace privé mais pas /location-voiture-…', () => {
    expect(isBlocked('/locations/123')).toBe(true);
    expect(isBlocked('/location-voiture-aeroport-casablanca')).toBe(false);
    expect(disallow).not.toContain('/location');
  });
  it('n’exclut aucun robot IA', () => {
    const rules = robotsRules();
    expect(rules).toHaveLength(1);
    expect(rules[0].userAgent).toBe('*');
  });
});
