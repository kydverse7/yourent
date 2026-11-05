import { NextResponse } from 'next/server';
import type { NextFetchEvent, NextRequest } from 'next/server';
import { auth } from './src/lib/auth';

/** Espaces réservés à l'agence et API : l'authentification s'y applique, jamais de préfixe de langue. */
const PRIVATE_PREFIXES = [
  '/api',
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
];

function isPrivatePath(pathname: string): boolean {
  return PRIVATE_PREFIXES.some((prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`));
}

/**
 * Protection des routes privées :
 * - /dashboard/** → requiert session valide (tous les rôles)
 * - /login → redirige vers /dashboard si déjà connecté
 * - /api/dashboard/** → requiert session (gérée dans chaque route handler)
 */
const authMiddleware = auth((req) => {
  const { pathname } = req.nextUrl;
  const session = req.auth;

  // Rediriger /login → /dashboard si déjà connecté
  if (pathname.startsWith('/login') && session) {
    return NextResponse.redirect(new URL('/dashboard', req.url));
  }

  // Protéger les routes dashboard
  if (pathname.startsWith('/dashboard') && !session) {
    const loginUrl = new URL('/login', req.url);
    loginUrl.searchParams.set('callbackUrl', pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Vérifier que le compte n'est pas suspendu
  if (session && (session.user as { status?: string })?.status === 'suspended') {
    return NextResponse.redirect(new URL('/login?error=Compte+suspendu', req.url));
  }

  return NextResponse.next();
});

/**
 * Pages publiques : aucun contrôle de session ni cookie, pour rester en cache.
 * Le français est servi à la racine (réécriture interne vers /fr), l'anglais sous /en, l'arabe sous /ar.
 */
function publicMiddleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (pathname === '/fr' || pathname.startsWith('/fr/')) {
    const url = req.nextUrl.clone();
    url.pathname = pathname.slice(3) || '/';
    return NextResponse.redirect(url, 308);
  }

  if (pathname === '/en' || pathname.startsWith('/en/') || pathname === '/ar' || pathname.startsWith('/ar/')) {
    return NextResponse.next();
  }

  const url = req.nextUrl.clone();
  url.pathname = `/fr${pathname === '/' ? '' : pathname}`;
  return NextResponse.rewrite(url);
}

export default function middleware(req: NextRequest, event: NextFetchEvent) {
  if (isPrivatePath(req.nextUrl.pathname)) {
    return (authMiddleware as unknown as (r: NextRequest, e: NextFetchEvent) => Response | Promise<Response>)(
      req,
      event,
    );
  }
  return publicMiddleware(req);
}

export const config = {
  matcher: [
    /*
     * Toutes les routes sauf :
     * - _next (fichiers générés)
     * - les fichiers portant une extension (images, robots.txt, sitemap.xml, llms.txt...)
     * - l'image de partage générée
     */
    '/((?!_next/|opengraph-image|.*\\.[a-zA-Z0-9]+$).*)',
  ],
};
