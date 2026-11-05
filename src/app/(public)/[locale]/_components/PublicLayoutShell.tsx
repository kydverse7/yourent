'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from '@/lib/i18n/LocaleLink';
import { usePathname } from 'next/navigation';
import { ArrowUpRight, ChevronDown, Globe, Menu, PhoneCall, X } from 'lucide-react';
import { LanguageProvider, useLocale } from '@/lib/i18n';
import { PHONE_NUMBER, WHATSAPP_URL } from '@/lib/constants';
import { BUSINESS } from '@/lib/site';
import { getRoutePath, type SeoRouteKey } from '@/lib/seo/routes';
import { formatBusinessHours } from './landing/constants';
import type { Locale } from '@/lib/i18n';

type Props = {
  children: React.ReactNode;
  locale: Locale;
};

export function PublicLayoutShell({ children, locale }: Props) {
  return (
    <LanguageProvider locale={locale}>
      <LayoutShell>{children}</LayoutShell>
    </LanguageProvider>
  );
}

/* ── Language selector data ── */
const LANGUAGES: { code: 'fr' | 'en' | 'ar'; flag: string; label: string }[] = [
  { code: 'fr', flag: '🇫🇷', label: 'Français' },
  { code: 'en', flag: '🇬🇧', label: 'English' },
  { code: 'ar', flag: '🇲🇦', label: 'العربية' },
];

/* ── Colonnes de liens du pied de page ── */
const FOOTER_RENTAL_KEYS: SeoRouteKey[] = ['aeroport', 'luxe', 'suv', 'automatique', 'longue-duree', 'economique', 'maroc'];
const FOOTER_BRAND_KEYS: SeoRouteKey[] = ['mercedes', 'range-rover', 'porsche'];
const FOOTER_INFO_KEYS: SeoRouteKey[] = ['tarifs', 'conditions', 'faq', 'a-propos', 'contact'];

/* ── WhatsApp icon (inline SVG to avoid extra dep) ── */
function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

/* ── Inner shell — uses useLocale (needs to be inside Provider) ── */
function LayoutShell({ children }: { children: React.ReactNode }) {
  const { t, locale, setLocale, lp } = useLocale();
  const pathname = usePathname();

  /* ── Mobile menu state ── */
  const [menuOpen, setMenuOpen] = useState(false);
  /* close menu on route change */
  useEffect(() => { setMenuOpen(false); }, [pathname]);
  /* lock body scroll when menu is open */
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  /* ── Language dropdown state ── */
  const [langOpen, setLangOpen] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) setLangOpen(false);
    };
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, []);

  const currentLang = LANGUAGES.find((l) => l.code === locale) ?? LANGUAGES[0];

  /* Aéroport et Tarifs : dans la barre si la largeur le permet (xl), toujours dans le menu mobile. */
  const NAV_ITEMS: { href: string; key: string; isAnchor?: boolean; wideOnly?: boolean }[] = [
    { href: '/', key: 'nav.home' },
    { href: '/catalogue', key: 'nav.catalogue' },
    { href: getRoutePath('aeroport', locale) ?? '', key: 'nav.aeroport', wideOnly: true },
    { href: getRoutePath('tarifs', locale) ?? '', key: 'nav.tarifs', wideOnly: true },
    { href: '/#process', key: 'nav.process', isAnchor: true },
    { href: '/#faq', key: 'nav.faq', isAnchor: true },
    { href: '/#contact', key: 'nav.contact', isAnchor: true },
  ].filter((item) => item.href);

  /* Une page absente dans la langue courante n'a pas de lien. */
  const footerLinks = (keys: SeoRouteKey[]) =>
    keys.flatMap((key) => {
      const href = getRoutePath(key, locale);
      return href ? [{ href, label: t(`footer.link.${key}`) }] : [];
    });

  const FOOTER_COLUMNS = [
    { title: t('footer.heading.rentals'), links: footerLinks(FOOTER_RENTAL_KEYS) },
    {
      title: t('footer.heading.brands'),
      links: [...footerLinks(FOOTER_BRAND_KEYS), { href: '/catalogue', label: t('footer.link.catalogue') }],
    },
    {
      title: t('footer.heading.info'),
      links: [
        ...footerLinks(FOOTER_INFO_KEYS),
        ...(locale === 'fr' ? [{ href: '/blog', label: t('footer.link.blog') }] : []),
      ],
    },
  ];

  const country = locale === 'ar' ? 'المغرب' : locale === 'fr' ? 'Maroc' : 'Morocco';

  return (
    <div className="relative min-h-screen flex flex-col" dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[32rem] bg-[radial-gradient(circle_at_top,rgba(201,168,76,0.18),transparent_45%)]" />

      <header className="sticky top-0 z-40 border-b border-white/5 bg-noir-root/70 backdrop-blur-xl">
        <div className="lux-container flex h-20 items-center justify-between gap-4">
          <Link href="/" className="flex items-center">
            <div className="relative flex h-12 w-12 items-center justify-center overflow-hidden rounded-2xl border border-gold/20 bg-gold/10 shadow-gold transition-transform duration-200 hover:rotate-2 hover:scale-105">
              <Image
                src="/logo-yourent.png"
                alt="Yourent"
                fill
                className="object-contain p-1"
                sizes="48px"
                quality={65}
              />
            </div>
          </Link>

          {/* ── Desktop nav ── */}
          <nav aria-label={t('aria.mainNav')} className="hidden items-center gap-5 whitespace-nowrap text-sm text-cream-muted md:flex lg:gap-7 xl:gap-5 2xl:gap-7">
            {NAV_ITEMS.map(({ href, key, isAnchor, wideOnly }) => {
              const Comp = isAnchor ? 'a' : Link;
              return (
                <Comp
                  key={key}
                  href={isAnchor ? lp(href) : href}
                  className={`transition-colors hover:text-gold${wideOnly ? ' hidden xl:inline' : ''}`}
                >
                  {t(key)}
                </Comp>
              );
            })}
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            {/* Language selector dropdown */}
            <div ref={langRef} className="relative">
              <button
                onClick={() => setLangOpen(!langOpen)}
                className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-bold text-cream-muted transition-colors hover:border-gold/20 hover:text-gold"
                aria-label={t('aria.langSelect')}
                aria-expanded={langOpen}
              >
                <Globe className="h-3.5 w-3.5" />
                <span className="text-sm leading-none">{currentLang.flag}</span>
                <ChevronDown className={`h-3 w-3 transition-transform ${langOpen ? 'rotate-180' : ''}`} />
              </button>
              {langOpen && (
                <div className="absolute end-0 top-full mt-2 min-w-[140px] overflow-hidden rounded-2xl border border-white/10 bg-noir-root/95 opacity-100 shadow-xl backdrop-blur-xl transition-opacity duration-200 starting:opacity-0">
                  {LANGUAGES.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => { setLocale(lang.code); setLangOpen(false); }}
                      className={`flex w-full items-center gap-2.5 px-4 py-2.5 text-sm transition-colors ${
                        locale === lang.code
                          ? 'border border-gold/40 bg-gold-gradient text-noir-root shadow-gold'
                          : 'text-cream-muted hover:bg-white/5 hover:text-cream'
                      }`}
                    >
                      <span className="text-base leading-none">{lang.flag}</span>
                      {lang.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <a
              href={`tel:${PHONE_NUMBER}`}
              className="hidden items-center gap-2 whitespace-nowrap rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-cream-muted transition-colors hover:text-cream lg:flex xl:hidden 2xl:flex"
            >
              <PhoneCall className="h-4 w-4 text-gold" /> {t('nav.concierge')}
            </a>
            <span className="hidden sm:block">
              <Link href="/catalogue" className="btn-gold">
                {t('nav.book')} <ArrowUpRight className="h-4 w-4" />
              </Link>
            </span>

            {/* ── Hamburger (mobile only) ── */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-cream-muted transition-colors hover:border-gold/20 hover:text-gold md:hidden"
              aria-label={menuOpen ? t('aria.menuClose') : t('aria.menuOpen')}
            >
              {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* ── Mobile fullscreen menu ── */}
      {menuOpen && (
        <div className="fixed inset-0 z-[50] flex flex-col overflow-y-auto bg-noir-root/95 opacity-100 backdrop-blur-2xl transition-opacity duration-300 starting:opacity-0 md:hidden">
          {/* Close button — large & gold */}
          <button
            onClick={() => setMenuOpen(false)}
            className="absolute end-5 top-6 z-10 flex h-12 w-12 items-center justify-center rounded-full border-2 border-gold/40 bg-gold/10 text-gold transition-colors hover:bg-gold/20"
            aria-label={t('aria.menuClose')}
          >
            <X className="h-7 w-7" strokeWidth={2.5} />
          </button>

          <nav className="flex flex-1 flex-col items-center justify-center gap-5 px-6 py-20">
            {NAV_ITEMS.map(({ href, key, isAnchor }) => {
              const Comp = isAnchor ? 'a' : Link;
              return (
                <Comp
                  key={key}
                  href={isAnchor ? lp(href) : href}
                  onClick={() => setMenuOpen(false)}
                  className="text-2xl font-semibold tracking-wide text-cream-muted transition-colors hover:text-gold"
                >
                  {t(key)}
                </Comp>
              );
            })}
            <Link href="/catalogue" onClick={() => setMenuOpen(false)} className="btn-gold mt-4 text-lg px-8 py-3">
              {t('nav.book')} <ArrowUpRight className="h-5 w-5" />
            </Link>
          </nav>
        </div>
      )}

      <main className="relative z-10 flex-1">{children}</main>

      {/* ── WhatsApp : toujours visible. Sur mobile, languette collée au bord pour ne pas couvrir les boutons. ── */}
      <a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-4 end-0 z-50 flex h-12 w-8 items-center justify-center rounded-s-full bg-[#25D366] text-white shadow-[0_6px_28px_rgba(37,211,102,0.4)] transition-transform md:bottom-6 md:end-5 md:w-12 md:rounded-full md:hover:scale-110"
        aria-label={t('aria.whatsapp')}
      >
        <WhatsAppIcon className="h-5 w-5 md:h-6 md:w-6" />
      </a>

      {/* Marge basse sur mobile : la dernière ligne du pied de page reste dégagée de la languette WhatsApp. */}
      <footer className="border-t border-white/5 pb-20 pt-10 md:pb-10">
        <div className="lux-container flex flex-col gap-8">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]">
            <div className="space-y-4">
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-gold">Yourent</p>
              <p className="text-sm text-cream-muted leading-relaxed">{t('footer.desc')}</p>
              <address className="space-y-1.5 text-sm not-italic leading-relaxed text-cream-muted">
                <p>
                  <a href={BUSINESS.mapsUrl} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-cream">
                    {BUSINESS.address.street}, {t('contact.addressSub').replace('{postalCode}', BUSINESS.address.postalCode)}
                  </a>
                </p>
                <p>
                  <a href={`tel:${BUSINESS.phone}`} className="transition-colors hover:text-cream">
                    <bdi dir="ltr">{BUSINESS.phoneDisplay}</bdi>
                  </a>
                  {' · '}
                  <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-cream">WhatsApp</a>
                </p>
                <p>
                  <a href={`mailto:${BUSINESS.email}`} className="transition-colors hover:text-cream">{BUSINESS.email}</a>
                </p>
                <p>{formatBusinessHours(locale)}</p>
              </address>
            </div>

            <nav aria-label={t('aria.footerNav')} className="grid gap-8 text-sm sm:grid-cols-3">
              {FOOTER_COLUMNS.map((column) => (
                <div key={column.title} className="space-y-3">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-cream">{column.title}</p>
                  <ul className="space-y-2">
                    {column.links.map((link) => (
                      <li key={link.href}>
                        <Link href={link.href} className="text-cream-muted transition-colors hover:text-gold">
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </nav>
          </div>

          <p className="border-t border-white/5 pt-6 text-sm text-cream-faint">
            © {new Date().getFullYear()} Yourent, Casablanca, {country}
          </p>
        </div>
      </footer>
    </div>
  );
}
