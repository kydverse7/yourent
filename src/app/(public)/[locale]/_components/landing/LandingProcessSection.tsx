import { t as tr, type Locale } from '@/lib/i18n/translations';
import { rvDelay } from './reveal';

const STEP_KEYS = ['s1', 's2', 's3'] as const;

export function LandingProcessSection({ locale }: { locale: Locale }) {
  const t = (key: string) => tr(locale, key);
  return (
    <section id="process" className="lux-container pb-20 md:pb-28 scroll-mt-24">
      <div className="lp-process">
        <div className="rv rv-blur-fade mb-12 text-center">
          <span className="lux-eyebrow">{t('process.eyebrow')}</span>
          <h2 className="lux-title-sm mt-4">{t('process.title')}</h2>
        </div>

        {/* decorative line */}
        <div
          data-rv-amount="0.5"
          className="rv rv-draw-line mx-auto mb-8 hidden h-px w-3/4 bg-gradient-to-r from-transparent via-[#c9a84c]/30 to-transparent md:block"
        />

        <div data-rv-amount="0.15" className="rv rv-group grid gap-px md:grid-cols-3">
          {STEP_KEYS.map((key, i) => (
            <div key={key} className="rv-item lp-step" style={{ ...rvDelay(i * 0.2), perspective: 1000 }}>
              <span data-rv-amount="0" className="rv rv-pop-in lp-step-num">
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className="mt-5 mb-2 text-xl font-bold text-[#f7f1e8]">
                {t(`process.${key}.title`)}
              </h3>
              <p className="text-sm leading-relaxed text-[#b9a88f]">{t(`process.${key}.body`)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
