import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { auth } from './src/lib/auth';

/**
 * Middleware de protection des routes :
 * - /dashboard/** → requiert session valide (tous les rôles)
 * - /login → redirige vers /dashboard si déjà connecté
 * - /api/dashboard/** → requiert session (gérée dans chaque route handler)
 */
export default auth((req) => {
  const { pathname } = req.nextUrl;
  const session = req.auth;

  // Routes publiques (toujours accessibles)
  const isPublicRoute =
    pathname.startsWith('/login') ||
    pathname.startsWith('/api/auth') ||
    pathname.startsWith('/api/public') ||
    pathname === '/';

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

export const config = {
  matcher: [
    /*
     * Match toutes les routes sauf :
     * - _next/static (fichiers statiques)
     * - _next/image (optimisation images)
     * - favicon
     * - fichiers publics
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
