import Link from 'next/link';
import { ArrowRight, MessageCircle } from 'lucide-react';
import { useLocale } from '@/lib/i18n';
import {
  motion,
  scaleUp,
  fadeUp,
  staggerItem,
  ScrollReveal,
  StaggerContainer,
} from './motion';

/**
 * Final CTA block.
 */
export function LandingFinalCtaSection() {
  const { t } = useLocale();
  return (
    <section className="lux-container pb-24">
      <ScrollReveal variants={scaleUp} viewport={{ once: true, amount: 0.25 }}>
        <div className="lp-cta relative flex flex-col items-center gap-4 sm:gap-5 md:gap-7 overflow-hidden rounded-[28px] py-12 sm:py-16 md:py-20 text-center">
          <div className="lp-cta-glow" aria-hidden="true" />
          <motion.span
            className="lux-eyebrow relative z-10"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {t('cta.eyebrow')}
          </motion.span>
          <motion.h2
            className="lux-title-sm relative z-10 max-w-[22ch]"
            initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
          >
            {t('cta.title')}
          </motion.h2>
          <StaggerContainer
            staggerDelay={0.12}
            delayChildren={0.3}
            className="relative z-10 flex flex-wrap items-center justify-center gap-3"
            viewport={{ once: true, amount: 0.5 }}
          >
            <motion.div variants={staggerItem}>
              <Link href="/catalogue" className="btn-gold text-base">
                {t('cta.explore')} <ArrowRight className="h-4 w-4" />
              </Link>
            </motion.div>
            <motion.div variants={staggerItem}>
              <a
                href="https://wa.me/212661234567"
                target="_blank"
                rel="noreferrer"
                className="lp-pill-btn text-sm"
              >
                <MessageCircle className="h-4 w-4 text-[#c9a84c]" /> {t('cta.whatsapp')}
              </a>
            </motion.div>
          </StaggerContainer>
        </div>
      </ScrollReveal>
    </section>
  );
}
