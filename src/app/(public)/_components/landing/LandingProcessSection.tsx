import { useLocale } from '@/lib/i18n';
import {
  motion,
  ScrollReveal,
  StaggerContainer,
  staggerItem,
  blurFade,
  drawLine,
} from './motion';

const STEP_KEYS = ['s1', 's2', 's3'] as const;

export function LandingProcessSection() {
  const { t } = useLocale();
  return (
    <section className="lux-container pb-20 md:pb-28">
      <div className="lp-process">
        <ScrollReveal variants={blurFade} className="mb-12 text-center">
          <span className="lux-eyebrow">{t('process.eyebrow')}</span>
          <h2 className="lux-title-sm mt-4">{t('process.title')}</h2>
        </ScrollReveal>

        {/* decorative line */}
        <motion.div
          variants={drawLine}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          className="mx-auto mb-8 hidden h-px w-3/4 bg-gradient-to-r from-transparent via-[#c9a84c]/30 to-transparent md:block"
        />

        <StaggerContainer
          staggerDelay={0.2}
          className="grid gap-px md:grid-cols-3"
          viewport={{ once: true, amount: 0.15 }}
        >
          {STEP_KEYS.map((key, i) => (
            <motion.div key={key} className="lp-step" variants={staggerItem}>
              <motion.span
                className="lp-step-num"
                initial={{ scale: 0.5, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
              >
                {String(i + 1).padStart(2, '0')}
              </motion.span>
              <h3 className="mt-5 mb-2 text-xl font-bold text-[#f7f1e8]">
                {t(`process.${key}.title`)}
              </h3>
              <p className="text-sm leading-relaxed text-[#b9a88f]">{t(`process.${key}.body`)}</p>
            </motion.div>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
