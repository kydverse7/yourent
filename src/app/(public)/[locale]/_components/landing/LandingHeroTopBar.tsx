'use client';

import { useEffect, useState } from 'react';
import {
  Facebook,
  Instagram,
  MapPin,
  MessageCircle,
} from 'lucide-react';
import { useLocale } from '@/lib/i18n';
import { SOCIALS } from './constants';
import { motion, stagger, staggerItem } from './motion';

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  Instagram,
  Facebook,
  WhatsApp: MessageCircle,
};

/* ── Animated SVG counter ── */
function FleetCounter() {
  const { t } = useLocale();
  const TARGET = 60;
  const [count, setCount] = useState(0);

  useEffect(() => {
    let frame: number;
    const duration = 2000; // ms
    const start = performance.now();

    function tick(now: number) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * TARGET));
      if (progress < 1) frame = requestAnimationFrame(tick);
    }

    // small delay so the SVG draw starts first
    const timeout = setTimeout(() => {
      frame = requestAnimationFrame(tick);
    }, 400);

    return () => {
      clearTimeout(timeout);
      cancelAnimationFrame(frame);
    };
  }, []);

  const r = 22; // radius
  const circumference = 2 * Math.PI * r;

  return (
    <motion.div
      className="hero-fleet-counter"
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.6, duration: 0.6, type: 'spring', stiffness: 200, damping: 18 }}
    >
      <div className="hero-fleet-counter-ring">
        <svg viewBox="0 0 52 52" className="hero-fleet-svg">
          {/* bg track */}
          <circle
            cx="26" cy="26" r={r}
            fill="none"
            stroke="rgba(201,168,76,0.08)"
            strokeWidth="2"
          />
          {/* animated arc — draws fully */}
          <motion.circle
            cx="26" cy="26" r={r}
            fill="none"
            stroke="url(#fleet-grad)"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: 0 }}
            transition={{ delay: 0.5, duration: 2.2, ease: [0.22, 1, 0.36, 1] }}
            style={{ transform: 'rotate(-90deg)', transformOrigin: 'center' }}
          />
          {/* sparkle dots on the arc */}
          <motion.circle
            cx="26" cy="4" r="1.5"
            fill="#f0ddb0"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0.6] }}
            transition={{ delay: 1.2, duration: 1.5, ease: 'easeOut' }}
            style={{ transform: 'rotate(-90deg)', transformOrigin: '26px 26px' }}
          />
          <defs>
            <linearGradient id="fleet-grad" x1="0" y1="0" x2="52" y2="52" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#f0ddb0" />
              <stop offset="50%" stopColor="#c9a84c" />
              <stop offset="100%" stopColor="#b8933a" />
            </linearGradient>
          </defs>
        </svg>

        {/* center number */}
        <div className="hero-fleet-number">
          <span className="hero-fleet-digit">{count}<sup className="hero-fleet-plus">+</sup></span>
        </div>
      </div>

      <div className="hero-fleet-label">
        <span className="hero-fleet-label-main">{t('hero.cars')}</span>
        <span className="hero-fleet-label-sub">{t('hero.available')}</span>
      </div>
    </motion.div>
  );
}

/**
 * Top bar of the hero: eyebrow text + fleet counter + social icons.
 */
export function LandingHeroTopBar() {
  const { t } = useLocale();
  return (
    <div className="shrink-0 px-4 pt-3 md:px-8 md:pt-5">
      <div className="flex flex-col items-center justify-between gap-3 text-center sm:flex-row sm:items-center sm:text-left">
        <motion.span
          className="lux-eyebrow max-w-[32rem] justify-center text-[10px] leading-relaxed sm:justify-start sm:text-[11px]"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <MapPin className="h-3 w-3 text-[#c9a84c]" />
          {t('hero.delivery')}
        </motion.span>

        {/* ── Fleet counter ── */}
        <FleetCounter />

        <motion.div
          className="flex items-center justify-center gap-2"
          variants={stagger(0.08, 0.5)}
          initial="hidden"
          animate="visible"
        >
          {SOCIALS.filter(s => s.icon !== 'WhatsApp').map(({ label, href, icon }) => {
            const Icon = ICON_MAP[icon];
            if (icon === 'TikTok') {
              return (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="lp-icon-btn text-[10px] font-black tracking-tighter pointer-events-auto"
                  variants={staggerItem}
                  whileHover={{ scale: 1.2, y: -2 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 12 }}
                >
                  TK
                </motion.a>
              );
            }
            return (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                className="lp-icon-btn pointer-events-auto"
                variants={staggerItem}
                whileHover={{ scale: 1.2, y: -2 }}
                transition={{ type: 'spring', stiffness: 400, damping: 12 }}
              >
                {Icon && <Icon className="h-[1.05rem] w-[1.05rem]" />}
              </motion.a>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
}
