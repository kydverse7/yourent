'use client';

import { useState } from 'react';
import { ChevronDown, Sparkles } from 'lucide-react';
import { useLocale } from '@/lib/i18n';
import {
  motion,
  AnimatePresence,
  ScrollReveal,
  StaggerContainer,
  staggerCard,
  tiltUp,
} from './motion';

const FAQ_COUNT = 6;

function FaqItem({ q, a, isOpen, onToggle }: { q: string; a: string; isOpen: boolean; onToggle: () => void }) {
  return (
    <motion.div variants={staggerCard} className="group" style={{ perspective: 800 }}>
      <button
        onClick={onToggle}
        className="flex w-full items-start gap-4 rounded-2xl border border-white/[0.06] bg-white/[0.02] px-5 py-5 text-left transition-all hover:border-[#c9a84c]/15 hover:bg-white/[0.03] sm:px-6"
        aria-expanded={isOpen}
      >
        <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-xl border border-[#c9a84c]/20 bg-[#c9a84c]/10 text-xs font-bold text-[#c9a84c]">
          ?
        </span>
        <span className="flex-1 text-[0.95rem] font-semibold leading-relaxed text-[#f7f1e8] sm:text-base">
          {q}
        </span>
        <ChevronDown
          className={`mt-1 h-4 w-4 shrink-0 text-[#756858] transition-transform duration-300 ${isOpen ? 'rotate-180 text-[#c9a84c]' : ''}`}
        />
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5 pl-16 pt-1 sm:px-6 sm:pl-[4.5rem]">
              <p className="text-sm leading-relaxed text-[#b9a88f]">{a}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export function LandingFaqSection() {
  const { t } = useLocale();
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  const items = Array.from({ length: FAQ_COUNT }, (_, i) => ({
    q: t(`faq.q${i + 1}`),
    a: t(`faq.a${i + 1}`),
  }));

  return (
    <section id="faq" className="lux-container py-16 md:py-24 scroll-mt-24">
      <div className="relative overflow-hidden rounded-[28px] border border-white/[0.07] bg-gradient-to-b from-white/[0.03] to-white/[0.015] p-6 sm:p-10 md:p-14">
        <div className="pointer-events-none absolute inset-x-0 -top-px h-48 rounded-t-[28px] bg-[radial-gradient(ellipse_60%_40%_at_50%_0%,rgba(201,168,76,0.1),transparent)]" />

        <ScrollReveal variants={tiltUp} className="relative mb-10 text-center md:mb-14">
          <span className="lux-eyebrow">
            <Sparkles className="h-3.5 w-3.5" /> {t('faq.eyebrow')}
          </span>
          <h2 className="lux-title-sm mt-4 text-[clamp(1.2rem,4vw,2.8rem)]">{t('faq.title')}</h2>
          <p className="lux-subtitle mx-auto mt-3 max-w-[52ch]">
            {t('faq.subtitle')}
          </p>
        </ScrollReveal>

        <StaggerContainer
          staggerDelay={0.08}
          className="relative mx-auto max-w-3xl space-y-3"
          viewport={{ once: true, amount: 0.05 }}
        >
          {items.map((item, i) => (
            <FaqItem
              key={i}
              q={item.q}
              a={item.a}
              isOpen={openIdx === i}
              onToggle={() => setOpenIdx(openIdx === i ? null : i)}
            />
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
