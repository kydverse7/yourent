import Image from 'next/image';
import { Facebook, Instagram, Mail, MapPin, Phone } from 'lucide-react';
import Link from '@/lib/i18n/LocaleLink';
import { localePath } from '@/lib/i18n/routing';
import { t as tr, type Locale } from '@/lib/i18n/translations';
import { getRoutePath, type SeoRouteKey } from '@/lib/seo/routes';
import { BUSINESS } from '@/lib/site';
import { formatBusinessHours } from '../landing/constants';
import { CallButton, RatingLink, WhatsAppButton, WhatsAppIcon } from '../ui/actions';
import { FooterLangLinks, LangMenu } from './LangLinks';
import { MobileActionBar } from './MobileActionBar';
import { MobileMenu, type MenuItem } from './MobileMenu';

/* ── Colonnes de liens du pied de page ── */
const FOOTER_RENTAL_KEYS: SeoRouteKey[] = ['aeroport', 'luxe', 'suv', 'automatique', 'longue-duree', 'economique', 'maroc', 'livraison-marrakech'];
const FOOTER_BRAND_KEYS: SeoRouteKey[] = ['mercedes', 'range-rover', 'porsche'];
const FOOTER_INFO_KEYS: SeoRouteKey[] = ['tarifs', 'conditions', 'faq', 'a-propos', 'contact'];

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true" focusable="false">
      <path d="M16.6 5.82A4.28 4.28 0 0 1 15.54 3h-3.09v12.4a2.59 2.59 0 0 1-2.59 2.5 2.6 2.6 0 0 1-2.59-2.6 2.6 2.6 0 0 1 3.37-2.48V9.66a5.68 5.68 0 0 0-.78-.05 5.69 5.69 0 0 0-5.68 5.69A5.69 5.69 0 0 0 9.86 21a5.69 5.69 0 0 0 5.69-5.69V9.01a7.35 7.35 0 0 0 4.3 1.38V7.3a4.3 4.3 0 0 1-3.25-1.48Z" />
    </svg>
  );
}

function navItems(locale: Locale): MenuItem[] {
  const t = (key: string) => tr(locale, key);
  return [
    { href: '/catalogue', label: t('nav.catalogue') },
    { href: getRoutePath('aeroport', locale) ?? '', label: t('nav.aeroport') },
    { href: getRoutePath('tarifs', locale) ?? '', label: t('nav.tarifs') },
    { href: '/#process', label: t('nav.process'), anchor: true },
    { href: '/#faq', label: t('nav.faq'), anchor: true },
    { href: '/#contact', label: t('nav.contact'), anchor: true },
  ].filter((item) => item.href);
}

/**
 * En-tête : 64 px en mobile, 72 px sur ordinateur. Composant serveur ; seuls le choix de la langue
 * et le menu mobile sont des îlots client.
 */
export function SiteHeader({ locale }: { locale: Locale }) {
  const t = (key: string) => tr(locale, key);
  const items = navItems(locale);

  return (
    <header className="sticky top-0 z-40 border-b border-white/[0.06] bg-[rgba(10,10,10,0.94)]">
      <a
        href="#contenu"
        className="sr-only focus:not-sr-only focus:absolute focus:start-4 focus:top-3 focus:z-50 focus:rounded-lg focus:bg-gold focus:px-4 focus:py-2 focus:font-bold focus:text-[#120f09]"
      >
        {t('ui.skip')}
      </a>
      <div className="lux-container flex h-16 items-center justify-between gap-3 lg:h-[72px]">
        <Link href="/" className="flex shrink-0 items-center" aria-label={`${BUSINESS.name}, ${t('nav.home')}`}>
          <Image
            src="/logo-yourent-header.webp"
            alt={BUSINESS.name}
            width={160}
            height={51}
            loading="eager"
            sizes="(min-width: 1024px) 160px, 132px"
            className="h-[42px] w-[132px] lg:h-[51px] lg:w-[160px]"
          />
        </Link>

        <nav aria-label={t('aria.mainNav')} className="hidden items-center gap-6 text-[0.9375rem] lg:flex xl:gap-7">
          {items.map((item) =>
            item.anchor ? (
              <a key={item.href} href={localePath(locale, item.href)} className="text-cream-muted transition-colors hover:text-gold">
                {item.label}
              </a>
            ) : (
              <Link key={item.href} href={item.href} className="text-cream-muted transition-colors hover:text-gold">
                {item.label}
              </Link>
            ),
          )}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={`tel:${BUSINESS.phone}`}
            className="hidden min-h-11 items-center gap-2 whitespace-nowrap px-2 text-[0.9375rem] font-semibold text-cream transition-colors hover:text-gold xl:inline-flex"
          >
            <Phone className="h-4 w-4 text-gold" aria-hidden="true" />
            <bdi dir="ltr">{BUSINESS.phoneDisplay}</bdi>
          </a>
          <a
            href={`tel:${BUSINESS.phone}`}
            aria-label={t('ui.callAgency')}
            className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 text-gold transition-colors hover:border-gold/40 md:hidden"
          >
            <Phone className="h-5 w-5" aria-hidden="true" />
          </a>
          <LangMenu locale={locale} label={t('aria.langSelect')} />
          <Link href="/catalogue" className="btn btn-primary hidden md:inline-flex">
            {t('ui.book')}
          </Link>
          <MobileMenu items={items} />
        </div>
      </div>
    </header>
  );
}

export function SiteFooter({ locale }: { locale: Locale }) {
  const t = (key: string) => tr(locale, key);
  const footerLinks = (keys: SeoRouteKey[]) =>
    keys.flatMap((key) => {
      const href = getRoutePath(key, locale);
      return href ? [{ href, label: t(`footer.link.${key}`) }] : [];
    });
  const columns = [
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
  const socials = [
    { label: 'Instagram', href: BUSINESS.social.instagram, Icon: Instagram },
    { label: 'Facebook', href: BUSINESS.social.facebook, Icon: Facebook },
    { label: 'TikTok', href: BUSINESS.social.tiktok, Icon: TikTokIcon },
  ];

  return (
    <footer className="border-t border-white/[0.06] bg-[#0c0c0d] pb-[calc(5rem+env(safe-area-inset-bottom))] pt-12 md:pb-10">
      <div className="lux-container flex flex-col gap-10">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] lg:gap-14">
          <div>
            <Image
              src="/logo-yourent-header.webp"
              alt={BUSINESS.name}
              width={160}
              height={51}
              sizes="160px"
              className="h-[51px] w-[160px]"
            />
            <p className="t-small mt-4 max-w-[46ch]">{t('footer.desc')}</p>
            <RatingLink locale={locale} className="mt-2" />
            <div className="mt-4 flex flex-wrap gap-3">
              <WhatsAppButton locale={locale} />
              <CallButton locale={locale} />
            </div>
            <address className="mt-6 space-y-1 text-sm not-italic text-cream-muted">
              <a
                href={BUSINESS.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex min-h-11 items-start gap-2.5 py-2.5 transition-colors hover:text-cream"
              >
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" aria-hidden="true" />
                <span>
                  {BUSINESS.address.street}, {t('contact.addressSub').replace('{postalCode}', BUSINESS.address.postalCode)}
                </span>
              </a>
              <a href={`tel:${BUSINESS.phone}`} className="flex min-h-11 items-center gap-2.5 transition-colors hover:text-cream">
                <Phone className="h-4 w-4 shrink-0 text-gold" aria-hidden="true" />
                <bdi dir="ltr">{BUSINESS.phoneDisplay}</bdi>
              </a>
              <a
                href={BUSINESS.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex min-h-11 items-center gap-2.5 transition-colors hover:text-cream"
              >
                <WhatsAppIcon className="h-4 w-4 shrink-0 text-gold" />
                WhatsApp
              </a>
              <a href={`mailto:${BUSINESS.email}`} className="flex min-h-11 items-center gap-2.5 transition-colors hover:text-cream">
                <Mail className="h-4 w-4 shrink-0 text-gold" aria-hidden="true" />
                {BUSINESS.email}
              </a>
              <p className="pt-1">{formatBusinessHours(locale)}</p>
            </address>
            <ul className="mt-4 flex items-center gap-2">
              {socials.map(({ label, href, Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 text-cream-muted transition-colors hover:border-gold/40 hover:text-gold"
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <nav aria-label={t('aria.footerNav')} className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3">
            {columns.map((column) => (
              <div key={column.title}>
                <p className="t-label text-cream">{column.title}</p>
                <ul className="mt-2">
                  {column.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="flex min-h-11 items-center text-[0.9375rem] text-cream-muted transition-colors hover:text-gold sm:min-h-9"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-white/[0.06] pt-6 text-sm text-cream-faint">
          <p>
            © {new Date().getFullYear()} Yourent, Casablanca, {country}
          </p>
          <FooterLangLinks locale={locale} label={t('aria.langSelect')} />
        </div>
      </div>
    </footer>
  );
}

export { MobileActionBar };
