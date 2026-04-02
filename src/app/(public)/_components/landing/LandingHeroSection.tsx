import { forwardRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useLocale } from '@/lib/i18n';
import { LandingHeroTopBar } from './LandingHeroTopBar';
import { LandingWordmark } from './LandingWordmark';
import { MARQUEE_BRANDS } from './constants';
import {
  motion,
  heroBase,
  staggerItem,
} from './motion';

const LOADER_DURATION = 2.8; // must match YourentLoader DURATION_MS
const hero = heroBase(LOADER_DURATION + 0.1);

/* ─── Brand marquee ─────────────────────────────────── */
function BrandMarquee() {
  const items = [...MARQUEE_BRANDS, ...MARQUEE_BRANDS];
  return (
    <div className="lp-marquee" style={{ marginBottom: 0 }}>
      <div className="lp-marquee-track">
        {items.map((b, i) => (
          <span key={`${b}-${i}`} className="lp-marquee-item">
            <span className="lp-marquee-dot" aria-hidden="true" />
            {b}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ─── Hero section ──────────────────────────────────── */
export const LandingHeroSection = forwardRef<HTMLDivElement>(
  function LandingHeroSection(_props, ref) {
    const { t } = useLocale();
    return (
      <section
        ref={ref}
        className="relative z-10 flex h-auto min-h-0 w-full flex-col px-3 pt-2 md:px-5 md:pt-3 lg:px-6"
      >
        {/* ── hero panel background ── */}
        <motion.div
          className="absolute inset-x-3 md:inset-x-5 lg:inset-x-6 top-0 bottom-0 -z-10 rounded-[32px] border border-[rgba(201,168,76,0.12)] lp-hero-bg overflow-hidden"
          {...hero.bg}
        >
          <div className="lp-hero-top-glow" aria-hidden="true" />
          <div className="lp-hero-sweep" aria-hidden="true" />
          <div className="lp-hero-side-glow-l" aria-hidden="true" />
          <div className="lp-hero-side-glow-r" aria-hidden="true" />
          <div className="lp-hero-grid pointer-events-none absolute inset-0 z-0" aria-hidden="true" />
        </motion.div>

        {/* ── Top bar — slides down ── */}
        <motion.div
          {...hero.topBar}
        >
          <LandingHeroTopBar />
        </motion.div>

        {/* ── Wordmark — blur reveal ── */}
        <motion.div
          {...hero.wordmark}
        >
          <LandingWordmark />
        </motion.div>

        {/* ── Macan hero photo — futuristic reveal ── */}
        <motion.div
          className="relative z-20 mx-auto mt-4 w-full max-w-sm sm:max-w-md md:max-w-xl"
          {...hero.car}
        >
          {/* glow behind the car */}
          <motion.div
            className="absolute inset-0 -z-10 rounded-full"
            style={{ background: 'radial-gradient(ellipse 70% 55% at 50% 60%, rgba(201,168,76,0.22), transparent 70%)' }}
            {...hero.carGlow}
          />
          <div className="relative aspect-[16/9] w-full drop-shadow-[0_24px_60px_rgba(201,168,76,0.18)]">
            <Image
              src="/porshe-macan.png?v=2"
              alt="Porsche Macan — Yourent Location Casablanca"
              fill
              priority
              className="object-contain"
              sizes="(max-width: 640px) 90vw, (max-width: 768px) 70vw, 540px"
            />
          </div>
        </motion.div>



        {/* ── bottom pills + marquee — staggered slide-up ── */}
        <motion.div
          className="relative z-40 flex shrink-0 flex-col items-center gap-4 px-4 pb-5 pt-6 md:px-6 md:pb-8 md:pt-0"
          variants={hero.pills(0.15)}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={staggerItem} className="flex flex-wrap items-center justify-center gap-2">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#f3d98a] bg-gradient-to-br from-[#f6e29b] via-[#d8b24f] to-[#b98724] px-4 py-2 text-[0.68rem] font-extrabold uppercase tracking-[0.16em] text-black shadow-[0_14px_34px_rgba(201,168,76,0.28)]">
              <Sparkles className="h-3 w-3 text-black" />
              {t('hero.badge')}
            </span>
            <Link
              href="/catalogue"
              style={{ color: '#120f09' }}
              className="inline-flex items-center gap-2 rounded-full border border-[#f3d98a] bg-gradient-to-br from-[#f6e29b] via-[#d8b24f] to-[#b98724] px-4 py-2 text-[0.68rem] font-extrabold uppercase tracking-[0.16em] text-black shadow-[0_14px_34px_rgba(201,168,76,0.28)] transition-transform duration-200 hover:-translate-y-0.5 pointer-events-auto"
            >
              {t('hero.cta')} <ArrowRight className="h-3 w-3 text-black" />
            </Link>
          </motion.div>
          <motion.div variants={staggerItem} className="w-full max-w-4xl overflow-hidden rounded-full border border-white/5 bg-white/[0.02]">
            <BrandMarquee />
          </motion.div>
        </motion.div>
      </section>
    );
  },
);
