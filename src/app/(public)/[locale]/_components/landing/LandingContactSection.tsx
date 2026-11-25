import Image from 'next/image';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  ArrowRight,
  ArrowUpRight,
  Instagram,
  Facebook,
  MessageCircle,
  Star,
  Send,
} from 'lucide-react';
import { t as tr, type Locale } from '@/lib/i18n/translations';
import { BUSINESS } from '@/lib/site';
import { SOCIALS, formatBusinessHours } from './constants';
import { LandingFiligrane } from './LandingFiligrane';
import { rvDelay } from './reveal';
import type { LandingStats } from './types';

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  Instagram,
  Facebook,
  WhatsApp: MessageCircle,
};

export function LandingContactSection({ stats, locale }: { stats: LandingStats; locale: Locale }) {
  const t = (key: string) => tr(locale, key);

  const CONTACT_ITEMS = [
    {
      icon: MapPin,
      label: t('contact.address'),
      value: BUSINESS.address.street,
      sub: t('contact.addressSub').replace('{postalCode}', BUSINESS.address.postalCode),
      href: BUSINESS.mapsUrl,
    },
    {
      icon: Phone,
      label: t('contact.phone'),
      value: <bdi dir="ltr">{BUSINESS.phoneDisplay}</bdi>,
      href: `tel:${BUSINESS.phone}`,
    },
    {
      icon: Mail,
      label: t('contact.email'),
      value: BUSINESS.email,
      href: `mailto:${BUSINESS.email}`,
    },
    {
      icon: Clock,
      label: t('contact.hours'),
      value: formatBusinessHours(locale),
      sub: t('contact.hoursSub'),
    },
  ];

  const { value: ratingValue, count: ratingCount } = BUSINESS.googleRating;
  const rating = ratingValue.toLocaleString(locale === 'fr' ? 'fr-FR' : 'en-US');

  // Un compteur à zéro (base injoignable) n'est pas affiché.
  const COUNTERS = [
    { number: stats.vehicleCount, label: t('contact.statVehicles') },
    { number: stats.clientCount, label: t('contact.statClients') },
  ].filter((counter) => counter.number > 0);

  return (
    <section id="contact" className="ct-section scroll-mt-24">
      {/* ═══ Parallax background image ═══ */}
      <div className="ct-parallax-wrap" aria-hidden="true">
        <Image
          src="/image-casablanca.jpg"
          alt={t('contact.imgAlt')}
          fill
          sizes="100vw"
          className="ct-parallax-img"
        />
        {/* Multi-layer overlays for cinematic depth */}
        <div className="ct-overlay-gradient" />
        <div className="ct-overlay-vignette" />
        <div className="ct-overlay-grain" />
      </div>

      {/* ═══ Decorative top line ═══ */}
      <div className="ct-deco-line-top" aria-hidden="true" />

      <div className="lux-container relative z-10">

        {/* ── Eyebrow tag ── */}
        <div className="rv rv-fade-up ct-eyebrow-row">
          <span className="ct-eyebrow-pill">
            <span className="ct-eyebrow-dot" />
            <MapPin className="h-3 w-3" />
            {t('contact.eyebrow')}
          </span>
        </div>

        {/* ── Title block ── */}
        <div className="rv rv-tilt-up ct-title-block">
          <h2 className="ct-main-title">
            <span className="ct-main-title-light">{t('contact.title')} </span>
            <span className="ct-main-title-gold">{t('contact.titleGold')}</span>
          </h2>
          <div className="ct-title-separator">
            <div data-rv-amount="0" className="rv rv-sep-line ct-title-sep-line" />
            <Send className="ct-title-sep-icon" />
            <div data-rv-amount="0" className="rv rv-sep-line ct-title-sep-line" />
          </div>
          <p className="ct-main-subtitle">
            {t('contact.subtitle')}
          </p>
        </div>

        {/* ── Stats strip ── */}
        <div data-rv-amount="0.5" className="rv rv-group ct-stats-strip">
          {COUNTERS.map((counter, i) => (
            <div key={counter.label} className="rv-item ct-strip-stat" style={rvDelay(0.4 + i * 0.15)}>
              <span className="ct-strip-num">{counter.number}</span>
              <span className="ct-strip-label">{counter.label}</span>
            </div>
          ))}
          <a
            href={BUSINESS.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="rv-item ct-strip-stat"
            style={rvDelay(0.4 + COUNTERS.length * 0.15)}
          >
            <span className="ct-strip-num">
              {rating}
              <Star className="h-3.5 w-3.5 fill-[#c9a84c] text-[#c9a84c] inline ms-1 -mt-0.5" />
            </span>
            <span className="ct-strip-label">
              {t('contact.statGoogle').replace('{count}', String(ratingCount))}
            </span>
          </a>
        </div>

        {/* ── Main content grid ── */}
        <div className="ct-content-grid">

          {/* ── Left: glass cards with contact info ── */}
          <div className="rv rv-slide-left ct-left-col">
            <div data-rv-amount="0.2" className="rv rv-group ct-glass-stack">
              {CONTACT_ITEMS.map((item, itemIndex) => {
                const Icon = item.icon;
                const inner = (
                  <div className="ct-glass-inner">
                    <div className="ct-glass-icon-wrap">
                      <div className="ct-glass-icon">
                        <Icon className="h-[18px] w-[18px]" />
                      </div>
                      {/* decorative ring */}
                      <svg className="ct-glass-icon-ring" viewBox="0 0 40 40" aria-hidden="true">
                        <circle cx="20" cy="20" r="18" fill="none" stroke="rgba(201,168,76,0.12)" strokeWidth="1" />
                        <circle cx="20" cy="20" r="18" fill="none" stroke="rgba(201,168,76,0.25)" strokeWidth="1" strokeDasharray="8 6" strokeLinecap="round">
                          <animateTransform attributeName="transform" type="rotate" from="0 20 20" to="360 20 20" dur="20s" repeatCount="indefinite" />
                        </circle>
                      </svg>
                    </div>
                    <div className="ct-glass-text">
                      <span className="ct-glass-label">{item.label}</span>
                      <span className="ct-glass-value">{item.value}</span>
                      {item.sub && <span className="ct-glass-sub">{item.sub}</span>}
                    </div>
                    {item.href && <ArrowUpRight className="ct-glass-arrow" />}
                  </div>
                );

                return (
                  <div key={item.label} className="rv-item" style={rvDelay(0.2 + itemIndex * 0.1)}>
                    {item.href ? (
                      <a
                        href={item.href}
                        target={item.href.startsWith('http') ? '_blank' : undefined}
                        rel={item.href.startsWith('http') ? 'noreferrer' : undefined}
                        className="ct-glass-card ct-glass-card--link"
                      >
                        {inner}
                      </a>
                    ) : (
                      <div className="ct-glass-card">{inner}</div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* ── Socials ── */}
            <div data-rv-amount="0.5" className="rv rv-group ct-social-row">
              <span className="ct-social-label">{t('contact.followUs')}</span>
              <div className="ct-social-icons">
                {SOCIALS.map(({ label, href, icon }, socialIndex) => {
                  const Icon = ICON_MAP[icon];
                  return (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={label}
                      className="rv-item ct-social-icon"
                      style={rvDelay(0.7 + socialIndex * 0.08)}
                    >
                      {icon === 'TikTok' ? (
                        <span className="text-[10px] font-black tracking-tighter">TK</span>
                      ) : (
                        Icon && <Icon className="h-[15px] w-[15px]" />
                      )}
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          {/* ── Right: floating map card ── */}
          <div className="rv rv-slide-right ct-right-col">
            <div className="ct-map-float">
              {/* Header: agency info + buttons */}
              <div className="ct-map-header">
                <div className="ct-map-info-left">
                  <div className="ct-map-pulse" />
                  <div>
                    <p className="ct-map-name">{t('contact.mapName')}</p>
                    <p className="ct-map-addr">{BUSINESS.address.street}, {BUSINESS.address.postalCode}</p>
                  </div>
                </div>
                <div className="ct-map-btns">
                  <a href={BUSINESS.mapsUrl} target="_blank" rel="noreferrer" className="ct-map-btn-primary">
                    {t('contact.directions')} <ArrowRight className="h-3.5 w-3.5" />
                  </a>
                  <a href={BUSINESS.whatsappUrl} target="_blank" rel="noreferrer" className="ct-map-btn-outline">
                    <MessageCircle className="h-3.5 w-3.5" /> WhatsApp
                  </a>
                </div>
              </div>

              {/* Map embed below */}
              <div className="ct-map-embed-wrap">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3323.9244651933113!2d-7.6351740999999995!3d33.5813104!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xda7d2c04fb9fd73%3A0xa8d85ec7af62ac53!2s25%20Rue%20Ibnou%20Mounir%2C%20Casablanca!5e0!3m2!1sfr!2sma!4v1773247373925!5m2!1sfr!2sma"
                  className="ct-map-iframe"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title={t('contact.mapName')}
                  allowFullScreen
                />
                {/* Gold corner accents */}
                <div className="ct-map-corner ct-map-corner--tl" />
                <div className="ct-map-corner ct-map-corner--br" />
              </div>
            </div>
          </div>
        </div>

        {/* ═══ Filigrane "CASABLANCA" — SVG stroke-draw on scroll ═══ */}
        <LandingFiligrane />
      </div>

      {/* ═══ Bottom decorative line ═══ */}
      <div className="ct-deco-line-bottom" aria-hidden="true" />
    </section>
  );
}
