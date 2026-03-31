'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ArrowUpRight, ChevronDown, Globe, Menu, PhoneCall, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { LanguageProvider, useLocale } from '@/lib/i18n';
import { YourentLoader } from '@/components/ui/YourentLoader';

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <LanguageProvider>
      <YourentLoader />
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
  const { t, locale, setLocale } = useLocale();
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

  const NAV_ITEMS = [
    { href: '/', key: 'nav.home' },
    { href: '/catalogue', key: 'nav.catalogue' },
    { href: 'tel:+212600000000', key: 'nav.contact', isExternal: true },
    { href: '/login', key: 'nav.agency' },
  ];

  return (
    <div className="relative min-h-screen flex flex-col" dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[32rem] bg-[radial-gradient(circle_at_top,rgba(201,168,76,0.18),transparent_45%)]" />

      <motion.header
        className="sticky top-0 z-40 border-b border-white/5 bg-noir-root/70 backdrop-blur-xl"
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="lux-container flex h-20 items-center justify-between gap-4">
          <Link href="/" className="flex items-center">
            <motion.div
              className="relative flex h-12 w-12 items-center justify-center overflow-hidden rounded-2xl border border-gold/20 bg-gold/10 shadow-gold"
              whileHover={{ scale: 1.08, rotate: 2 }}
              transition={{ type: 'spring', stiffness: 400, damping: 15 }}
            >
              <Image
                src="/logo-yourent.png"
                alt="Yourent"
                fill
                className="object-contain p-1"
                sizes="48px"
                priority
              />
            </motion.div>
          </Link>

          {/* ── Desktop nav ── */}
          <nav aria-label={t('aria.mainNav')} className="hidden items-center gap-6 text-sm text-cream-muted md:flex lg:gap-8">
            {NAV_ITEMS.map(({ href, key, isExternal }, i) => {
              const Comp = isExternal ? 'a' : Link;
              return (
                <motion.span
                  key={key}
                  initial={{ opacity: 0, y: -12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 + i * 0.07, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Comp href={href} className="transition-colors hover:text-cream">
                    {t(key)}
                  </Comp>
                </motion.span>
              );
            })}
          </nav>

          <motion.div
            className="flex items-center gap-2 sm:gap-3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
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
              <AnimatePresence>
                {langOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -8, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -8, scale: 0.95 }}
                    transition={{ duration: 0.18 }}
                    className="absolute end-0 top-full mt-2 min-w-[140px] overflow-hidden rounded-2xl border border-white/10 bg-noir-root/95 shadow-xl backdrop-blur-xl"
                  >
                    {LANGUAGES.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => { setLocale(lang.code); setLangOpen(false); }}
                        className={`flex w-full items-center gap-2.5 px-4 py-2.5 text-sm transition-colors ${
                          locale === lang.code
                            ? 'bg-gold/10 text-gold'
                            : 'text-cream-muted hover:bg-white/5 hover:text-cream'
                        }`}
                      >
                        <span className="text-base leading-none">{lang.flag}</span>
                        {lang.label}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <a
              href="tel:+212600000000"
              className="hidden items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-cream-muted transition-colors hover:text-cream lg:flex"
            >
              <PhoneCall className="h-4 w-4 text-gold" /> {t('nav.concierge')}
            </a>
            <Link href="/catalogue" className="btn-gold hidden sm:inline-flex">
              {t('nav.book')} <ArrowUpRight className="h-4 w-4" />
            </Link>

            {/* ── Hamburger (mobile only) ── */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-cream-muted transition-colors hover:border-gold/20 hover:text-gold md:hidden"
              aria-label={menuOpen ? t('aria.menuClose') : t('aria.menuOpen')}
            >
              {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </motion.div>
        </div>
      </motion.header>

      {/* ── Mobile fullscreen menu ── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-[50] flex flex-col bg-noir-root/95 backdrop-blur-2xl pt-24 md:hidden"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <nav className="flex flex-col items-center gap-6 px-6">
              {NAV_ITEMS.map(({ href, key, isExternal }, i) => {
                const Comp = isExternal ? 'a' : Link;
                return (
                  <motion.div
                    key={key}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 + i * 0.07, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <Comp
                      href={href}
                      onClick={() => setMenuOpen(false)}
                      className="text-xl font-semibold text-cream-muted transition-colors hover:text-gold"
                    >
                      {t(key)}
                    </Comp>
                  </motion.div>
                );
              })}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35, duration: 0.4 }}
              >
                <Link href="/catalogue" onClick={() => setMenuOpen(false)} className="btn-gold mt-4">
                  {t('nav.book')} <ArrowUpRight className="h-4 w-4" />
                </Link>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="relative z-10 flex-1">{children}</main>

      {/* ── WhatsApp floating button — always visible, bottom-right ── */}
      <motion.a
        href="https://wa.me/212600000000"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-5 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_6px_28px_rgba(37,211,102,0.4)] transition-transform hover:scale-110"
        initial={{ opacity: 0, scale: 0.5, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1, ease: [0.22, 1, 0.36, 1] }}
        aria-label={t('aria.whatsapp')}
      >
        <WhatsAppIcon className="h-6 w-6" />
      </motion.a>

      <motion.footer
        className="border-t border-white/5 py-10"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8 }}
      >
        <div className="lux-container flex flex-col gap-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
            <motion.div
              className="space-y-3 max-w-md"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-gold">Yourent</p>
              <p className="text-sm text-cream-muted leading-relaxed">
                {t('footer.desc')}
              </p>
            </motion.div>
            <motion.nav
              aria-label={t('aria.footerNav')}
              className="flex flex-wrap gap-x-6 gap-y-2 text-sm"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Link href="/" className="text-cream-muted transition-colors hover:text-cream">{t('nav.home')}</Link>
              <Link href="/catalogue" className="text-cream-muted transition-colors hover:text-cream">{t('footer.catalogue')}</Link>
              <a href="tel:+212600000000" className="text-cream-muted transition-colors hover:text-cream">{t('footer.contact')}</a>
              <a href="https://wa.me/212600000000" target="_blank" rel="noopener noreferrer" className="text-cream-muted transition-colors hover:text-cream">WhatsApp</a>
            </motion.nav>
          </div>

          <div className="flex flex-col gap-4 border-t border-white/5 pt-6 md:flex-row md:items-end md:justify-between">
            <p className="max-w-xl text-xs text-cream-faint leading-relaxed">
              {t('footer.seo')}
            </p>
            <p className="text-sm text-cream-faint whitespace-nowrap">
              © {new Date().getFullYear()} Yourent — Casablanca, {locale === 'ar' ? 'المغرب' : locale === 'fr' ? 'Maroc' : 'Morocco'}
            </p>
          </div>
        </div>
      </motion.footer>
    </div>
  );
}
