'use client';

import { motion } from './motion';
import { useLocale } from '@/lib/i18n';

/**
 * Animated SVG wordmark with stroke-draw + fill reveal.
 */
export function LandingWordmark() {
  const { t } = useLocale();
  return (
    <motion.div
      className="flex shrink-0 flex-col items-center px-4 pb-0 pt-2 md:pt-4"
      initial={{ opacity: 0, scale: 0.9, filter: 'blur(16px)' }}
      animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
    >
      <svg viewBox="0 0 1200 200" className="lp-wordmark" aria-label="Yourent">
        <defs>
          <linearGradient id="lpGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="32%" stopColor="#f0ddb0" />
            <stop offset="64%" stopColor="#c9a84c" />
            <stop offset="100%" stopColor="#fff2cc" />
          </linearGradient>
        </defs>
        <text
          x="50%"
          y="56%"
          textAnchor="middle"
          dominantBaseline="middle"
          className="lp-wm-stroke"
        >
          Yourent
        </text>
        <text
          x="50%"
          y="56%"
          textAnchor="middle"
          dominantBaseline="middle"
          className="lp-wm-fill"
        >
          Yourent
        </text>
      </svg>
      <motion.p
        className="lp-subline mt-2 md:mt-3"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.9 }}
      >
        {t('hero.subline')}
      </motion.p>
      {/* sr-only h1 for SEO — invisible but read by crawlers & screen readers */}
      <h1 className="sr-only">
        {t('hero.pageTitle')}
      </h1>
    </motion.div>
  );
}
