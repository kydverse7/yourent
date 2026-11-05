'use client';

import { useLocale } from '@/lib/i18n';

/**
 * Logo décoratif (tracé CSS) suivi du H1 de la page, visible dès le HTML.
 */
export function LandingWordmark() {
  const { t } = useLocale();
  return (
    <div className="flex shrink-0 flex-col items-center px-4 pb-0 pt-2 md:pt-4">
      <svg viewBox="0 0 1200 200" className="lp-wordmark" aria-hidden="true">
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
      <h1 className="lp-hero-title">{t('hero.pageTitle')}</h1>
    </div>
  );
}
