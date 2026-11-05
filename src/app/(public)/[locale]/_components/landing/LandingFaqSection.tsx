'use client';

import { ChevronDown, Sparkles } from 'lucide-react';
import { useLocale } from '@/lib/i18n';
import { ScrollReveal, tiltUp } from './motion';

const FAQ_COUNT = 6;

/** Les réponses sont toujours dans le HTML : `<details>` les replie sans les retirer de la page. */
function FaqItem({ q, a }: { q: string; a: string }) {
  return (
    <details name="landing-faq" className="group">
      <summary className="flex w-full cursor-pointer list-none items-start gap-4 rounded-2xl border border-white/[0.06] bg-white/[0.02] px-5 py-5 text-start transition-all hover:border-[#c9a84c]/15 hover:bg-white/[0.03] sm:px-6 [&::-webkit-details-marker]:hidden">
        <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-xl border border-[#c9a84c]/20 bg-[#c9a84c]/10 text-xs font-bold text-[#c9a84c]">
          ?
        </span>
        <h3 className="flex-1 text-[0.95rem] font-semibold leading-relaxed tracking-normal text-[#f7f1e8] sm:text-base">
          {q}
        </h3>
        <ChevronDown className="mt-1 h-4 w-4 shrink-0 text-[#756858] transition-transform duration-300 group-open:rotate-180 group-open:text-[#c9a84c]" />
      </summary>
      <div className="px-5 pb-5 ps-16 pt-3 sm:px-6 sm:ps-[4.5rem]">
        <p className="text-sm leading-relaxed text-[#b9a88f]">{a}</p>
      </div>
    </details>
  );
}

export function LandingFaqSection() {
  const { t } = useLocale();

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

        <div className="relative mx-auto max-w-3xl space-y-3">
          {items.map((item, i) => (
            <FaqItem key={i} q={item.q} a={item.a} />
          ))}
        </div>
      </div>
    </section>
  );
}
