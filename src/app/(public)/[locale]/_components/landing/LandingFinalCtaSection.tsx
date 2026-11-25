import Link from '@/lib/i18n/LocaleLink';
import { ArrowRight, MessageCircle } from 'lucide-react';
import { t as tr, type Locale } from '@/lib/i18n/translations';
import { BUSINESS } from '@/lib/site';
import { rvDelay } from './reveal';

/**
 * Final CTA block.
 */
export function LandingFinalCtaSection({ locale }: { locale: Locale }) {
  const t = (key: string) => tr(locale, key);
  return (
    <section className="lux-container pb-24">
      <div data-rv-amount="0.25" className="rv rv-scale-up">
        <div className="lp-cta relative flex flex-col items-center gap-4 sm:gap-5 md:gap-7 overflow-hidden rounded-[28px] py-12 sm:py-16 md:py-20 text-center">
          <div className="lp-cta-glow" aria-hidden="true" />
          <span data-rv-amount="0" className="rv rv-pop-in lux-eyebrow relative z-10">
            {t('cta.eyebrow')}
          </span>
          <h2 data-rv-amount="0" className="rv rv-tilt-up lux-title-sm relative z-10 max-w-[22ch]">
            {t('cta.title')}
          </h2>
          <div data-rv-amount="0.5" className="rv rv-group relative z-10 flex flex-wrap items-center justify-center gap-3">
            <div className="rv-item rv-item-up" style={rvDelay(0.3)}>
              <Link href="/catalogue" className="btn-gold text-base">
                {t('cta.explore')} <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="rv-item rv-item-up" style={rvDelay(0.42)}>
              <a
                href={BUSINESS.whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="lp-pill-btn text-sm"
              >
                <MessageCircle className="h-4 w-4 text-[#c9a84c]" /> {t('cta.whatsapp')}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
