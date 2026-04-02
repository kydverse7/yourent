'use client';

import { useRef, useEffect, useState } from 'react';
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
import { useLocale } from '@/lib/i18n';
import { SOCIALS } from './constants';
import {
  motion,
  ScrollReveal,
  fadeUp,
  tiltUp,
  slideLeft,
  slideRight,
  stagger,
  staggerCard,
  useScroll,
  useTransform,
} from './motion';

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  Instagram,
  Facebook,
  WhatsApp: MessageCircle,
};

const GOOGLE_MAPS_LINK =
  'https://www.google.com/maps/search/N%C2%B025+Rue+Ibnou+Mounir+20100+Casablanca';

/* ── SVG Filigrane that draws on scroll ── */
function FiligraneSVG() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<SVGTextElement>(null);
  const [pathLen, setPathLen] = useState(3200);

  useEffect(() => {
    if (textRef.current) {
      const len = textRef.current.getComputedTextLength();
      // Account for stroke joins — add a generous margin
      setPathLen(len * 1.15);
    }
  }, []);

  const { scrollYProgress } = useScroll({
    target: wrapRef,
    // start drawing when bottom of viewport hits the element,
    // finish when the element leaves the top of the viewport
    offset: ['start end', 'end start'],
  });

  // Map scroll 0→1 to dashOffset pathLen→0 (draws the text)
  const dashOffset = useTransform(scrollYProgress, [0, 0.65], [pathLen, 0]);
  // Fade in as it starts drawing
  const opacity = useTransform(scrollYProgress, [0, 0.15, 0.6, 1], [0, 1, 1, 0.5]);

  return (
    <div ref={wrapRef} className="ct-filigrane-wrap" aria-hidden="true">
      <svg className="ct-filigrane-svg" viewBox="0 0 1200 100" preserveAspectRatio="xMidYMid meet">
        <motion.text
          ref={textRef}
          x="600"
          y="78"
          textAnchor="middle"
          className="ct-filigrane-text"
          style={{
            strokeDasharray: pathLen,
            strokeDashoffset: dashOffset,
            opacity,
          }}
        >
          CASABLANCA
        </motion.text>
      </svg>
    </div>
  );
}

export function LandingContactSection() {
  const { t } = useLocale();
  const sectionRef = useRef<HTMLElement>(null);

  const CONTACT_ITEMS = [
    {
      icon: MapPin,
      label: t('contact.address'),
      value: 'N°25 Rue Ibnou Mounir',
      sub: t('contact.addressSub'),
      href: GOOGLE_MAPS_LINK,
    },
    {
      icon: Phone,
      label: t('contact.phone'),
      value: '+212 6 61 23 45 67',
      href: 'tel:+212661234567',
    },
    {
      icon: Mail,
      label: t('contact.email'),
      value: 'contact@yourent.ma',
      href: 'mailto:contact@yourent.ma',
    },
    {
      icon: Clock,
      label: t('contact.hours'),
      value: t('contact.hoursValue'),
      sub: t('contact.hoursSub'),
    },
  ];

  const STATS = [
    { number: '60+', label: t('contact.statVehicles'), icon: null },
    { number: '5K+', label: t('contact.statClients'), icon: null },
    { number: '4.9', label: t('contact.statGoogle'), icon: Star },
  ];

  return (
    <section id="contact" ref={sectionRef} className="ct-section scroll-mt-24">
      {/* ═══ Parallax background image ═══ */}
      <div className="ct-parallax-wrap" aria-hidden="true">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/image-casablanca.jpg"
          alt={t('contact.imgAlt')}
          className="ct-parallax-img"
          loading="lazy"
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
        <ScrollReveal variants={fadeUp} className="ct-eyebrow-row">
          <span className="ct-eyebrow-pill">
            <span className="ct-eyebrow-dot" />
            <MapPin className="h-3 w-3" />
            {t('contact.eyebrow')}
          </span>
        </ScrollReveal>

        {/* ── Title block ── */}
        <ScrollReveal variants={tiltUp} className="ct-title-block">
          <div className="ct-title-row">
            <h2 className="ct-main-title">
              <span className="ct-main-title-light">{t('contact.title')} </span>
              <span className="ct-main-title-gold">{t('contact.titleGold')}</span>
            </h2>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/new-award-trip-advisor.png"
              alt="TripAdvisor Award"
              className="ct-tripadvisor-badge"
            />
          </div>
          <div className="ct-title-separator">
            <motion.div
              className="ct-title-sep-line"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
            />
            <Send className="ct-title-sep-icon" />
            <motion.div
              className="ct-title-sep-line"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
            />
          </div>
          <p className="ct-main-subtitle">
            {t('contact.subtitle')}
          </p>
        </ScrollReveal>

        {/* ── Stats strip ── */}
        <motion.div
          className="ct-stats-strip"
          variants={stagger(0.15, 0.4)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
        >
          {STATS.map((s, i) => (
            <motion.div key={s.label} className="ct-strip-stat" variants={staggerCard}>
              <span className="ct-strip-num">
                {s.number}
                {s.icon && <Star className="h-3.5 w-3.5 fill-[#c9a84c] text-[#c9a84c] inline ml-1 -mt-0.5" />}
              </span>
              <span className="ct-strip-label">{s.label}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* ── Main content grid ── */}
        <div className="ct-content-grid">

          {/* ── Left: glass cards with contact info ── */}
          <ScrollReveal variants={slideLeft} className="ct-left-col">
            <motion.div
              className="ct-glass-stack"
              variants={stagger(0.1, 0.2)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              {CONTACT_ITEMS.map((item) => {
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
                  <motion.div key={item.label} variants={staggerCard}>
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
                  </motion.div>
                );
              })}
            </motion.div>

            {/* ── Socials ── */}
            <motion.div
              className="ct-social-row"
              variants={stagger(0.08, 0.7)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
            >
              <span className="ct-social-label">{t('contact.followUs')}</span>
              <div className="ct-social-icons">
                {SOCIALS.map(({ label, href, icon }) => {
                  const Icon = ICON_MAP[icon];
                  return (
                    <motion.a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={label}
                      className="ct-social-icon"
                      variants={staggerCard}
                      whileHover={{ scale: 1.15, y: -3 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 14 }}
                    >
                      {icon === 'TikTok' ? (
                        <span className="text-[10px] font-black tracking-tighter">TK</span>
                      ) : (
                        Icon && <Icon className="h-[15px] w-[15px]" />
                      )}
                    </motion.a>
                  );
                })}
              </div>
            </motion.div>
          </ScrollReveal>

          {/* ── Right: floating map card ── */}
          <ScrollReveal variants={slideRight} className="ct-right-col">
            <motion.div
              className="ct-map-float"
              whileHover={{ y: -4 }}
              transition={{ type: 'spring', stiffness: 200, damping: 20 }}
            >
              {/* Header: agency info + buttons */}
              <div className="ct-map-header">
                <div className="ct-map-info-left">
                  <div className="ct-map-pulse" />
                  <div>
                    <p className="ct-map-name">{t('contact.mapName')}</p>
                    <p className="ct-map-addr">N°25 Rue Ibnou Mounir, 20100</p>
                  </div>
                </div>
                <div className="ct-map-btns">
                  <a href={GOOGLE_MAPS_LINK} target="_blank" rel="noreferrer" className="ct-map-btn-primary">
                    {t('contact.directions')} <ArrowRight className="h-3.5 w-3.5" />
                  </a>
                  <a href="https://wa.me/212661234567" target="_blank" rel="noreferrer" className="ct-map-btn-outline">
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
            </motion.div>
          </ScrollReveal>
        </div>

        {/* ═══ Filigrane "CASABLANCA" — SVG stroke-draw on scroll ═══ */}
        <FiligraneSVG />
      </div>

      {/* ═══ Bottom decorative line ═══ */}
      <div className="ct-deco-line-bottom" aria-hidden="true" />
    </section>
  );
}
