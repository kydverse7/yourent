import {
  Facebook,
  Instagram,
  MapPin,
  MessageCircle,
} from 'lucide-react';
import { t as tr, type Locale } from '@/lib/i18n/translations';
import { SOCIALS } from './constants';

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  Instagram,
  Facebook,
  WhatsApp: MessageCircle,
};

/* ── Compteur de la flotte : le vrai chiffre est dans le HTML, seul l'anneau s'anime ── */
function FleetCounter({ vehicleCount, locale }: { vehicleCount: number; locale: Locale }) {
  const t = (key: string) => tr(locale, key);

  const r = 22; // radius
  const circumference = 2 * Math.PI * r;

  return (
    <div className="hero-fleet-counter">
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
          <circle
            cx="26" cy="26" r={r}
            fill="none"
            stroke="url(#fleet-grad)"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeDasharray={circumference}
            className="hero-fleet-arc"
            style={{ transform: 'rotate(-90deg)', transformOrigin: 'center' }}
          />
          {/* sparkle dots on the arc */}
          <circle
            cx="26" cy="4" r="1.5"
            fill="#f0ddb0"
            className="hero-fleet-spark"
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
          <span className="hero-fleet-digit">{vehicleCount}</span>
        </div>
      </div>

      <div className="hero-fleet-label">
        <span className="hero-fleet-label-main">{t('hero.cars')}</span>
        <span className="hero-fleet-label-sub">{t('hero.available')}</span>
      </div>
    </div>
  );
}

/**
 * Top bar of the hero: eyebrow text + fleet counter + social icons.
 */
export function LandingHeroTopBar({ vehicleCount, locale }: { vehicleCount: number; locale: Locale }) {
  const t = (key: string) => tr(locale, key);
  return (
    <div className="shrink-0 px-4 pt-3 md:px-8 md:pt-5">
      <div className="flex flex-col items-center justify-between gap-3 text-center sm:flex-row sm:items-center sm:text-start">
        <span className="lux-eyebrow max-w-[32rem] justify-center text-[10px] leading-relaxed sm:justify-start sm:text-[11px]">
          <MapPin className="h-3 w-3 text-[#c9a84c]" />
          {t('hero.delivery')}
        </span>

        {/* ── Fleet counter ── */}
        {vehicleCount > 0 && <FleetCounter vehicleCount={vehicleCount} locale={locale} />}

        <div className="flex items-center justify-center gap-2">
          {SOCIALS.filter(s => s.icon !== 'WhatsApp').map(({ label, href, icon }) => {
            const Icon = ICON_MAP[icon];
            if (icon === 'TikTok') {
              return (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="lp-icon-btn text-[10px] font-black tracking-tighter pointer-events-auto"
                >
                  TK
                </a>
              );
            }
            return (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                className="lp-icon-btn pointer-events-auto"
              >
                {Icon && <Icon className="h-[1.05rem] w-[1.05rem]" />}
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
}
