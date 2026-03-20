'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ArrowUpRight, Globe, PhoneCall } from 'lucide-react';
import { motion } from 'framer-motion';
import { LanguageProvider, useLocale } from '@/lib/i18n';

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <LanguageProvider>
      <LayoutShell>{children}</LayoutShell>
    </LanguageProvider>
  );
}

/* ── Inner shell — uses useLocale (needs to be inside Provider) ── */
function LayoutShell({ children }: { children: React.ReactNode }) {
  const { t, locale, setLocale } = useLocale();
  const pathname = usePathname();
  const isHomePage = pathname === '/';

  const NAV_ITEMS = [
    { href: '/', key: 'nav.home' },
    { href: '/catalogue', key: 'nav.catalogue' },
    { href: 'tel:+212600000000', key: 'nav.contact', isExternal: true },
    { href: '/login', key: 'nav.agency' },
  ];

  return (
    <div className="relative min-h-screen flex flex-col">
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

          <nav aria-label="Navigation principale" className="hidden items-center gap-6 text-sm text-cream-muted md:flex lg:gap-8">
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
            {/* Language toggle */}
            <button
              onClick={() => setLocale(locale === 'fr' ? 'en' : 'fr')}
              className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-2.5 py-1.5 text-xs font-bold text-cream-muted transition-colors hover:border-gold/20 hover:text-gold"
              aria-label={locale === 'fr' ? 'Switch to English' : 'Passer en français'}
            >
              <Globe className="h-3.5 w-3.5" />
              {locale === 'fr' ? 'EN' : 'FR'}
            </button>

            <a
              href="tel:+212600000000"
              className="hidden items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-cream-muted transition-colors hover:text-cream lg:flex"
            >
              <PhoneCall className="h-4 w-4 text-gold" /> {t('nav.concierge')}
            </a>
            <Link href="/catalogue" className="btn-gold">
              {t('nav.book')} <ArrowUpRight className="h-4 w-4" />
            </Link>
          </motion.div>
        </div>
      </motion.header>

      <main className="relative z-10 flex-1">{children}</main>

      {!isHomePage && <motion.footer
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
              aria-label="Liens du pied de page"
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
              © {new Date().getFullYear()} Yourent — Casablanca, {locale === 'fr' ? 'Maroc' : 'Morocco'}
            </p>
          </div>
        </div>
      </motion.footer>}
    </div>
  );
}
