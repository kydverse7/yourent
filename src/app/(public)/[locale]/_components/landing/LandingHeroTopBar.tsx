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

/**
 * Top bar of the hero: eyebrow text + fleet counter + social icons.
 */
export function LandingHeroTopBar({ locale }: { locale: Locale }) {
  const t = (key: string) => tr(locale, key);
  return (
    <div className="shrink-0 px-4 pt-3 md:px-8 md:pt-5">
      <div className="flex flex-col items-center justify-between gap-3 text-center sm:flex-row sm:items-center sm:text-start">
        <span className="lux-eyebrow max-w-[32rem] justify-center text-[10px] leading-relaxed sm:justify-start sm:text-[11px]">
          <MapPin className="h-3 w-3 text-[#c9a84c]" />
          {t('hero.delivery')}
        </span>

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
