import { forwardRef, Suspense } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useLocale } from '@/lib/i18n';
import { LandingHeroTopBar } from './LandingHeroTopBar';
import { LandingWordmark } from './LandingWordmark';
import { MARQUEE_BRANDS } from './constants';
import {
  motion,
  fadeDown,
  blurFade,
  fadeUp,
  stagger,
  staggerItem,
} from './motion';

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

/* ─── Lazy-load model-viewer CE ── */
const ModelViewer = dynamic(
  () => import('@google/model-viewer').then(() => ({ default: () => null })),
  { ssr: false },
);

/* ─── Hero section ──────────────────────────────────── */
export const LandingHeroSection = forwardRef<HTMLDivElement>(
  function LandingHeroSection(_props, ref) {
    const { t } = useLocale();
    return (
      <section
        ref={ref}
        className="relative z-10 mb-12 flex h-[calc(100svh-100px)] min-h-[500px] sm:min-h-[600px] w-full flex-col justify-between px-3 pt-2 md:px-5 md:pt-3 lg:px-6 md:h-[calc(100vh-100px)] md:min-h-0"
      >
        {/* ── hero panel background ── */}
        <motion.div
          className="absolute inset-x-3 md:inset-x-5 lg:inset-x-6 top-0 bottom-0 -z-10 rounded-[32px] border border-[rgba(201,168,76,0.12)] lp-hero-bg overflow-hidden"
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="lp-hero-top-glow" aria-hidden="true" />
          <div className="lp-hero-sweep" aria-hidden="true" />
          <div className="lp-hero-side-glow-l" aria-hidden="true" />
          <div className="lp-hero-side-glow-r" aria-hidden="true" />
          <div className="lp-hero-grid pointer-events-none absolute inset-0 z-0" aria-hidden="true" />
        </motion.div>

        {/* ── Top bar — slides down ── */}
        <motion.div
          variants={fadeDown}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.2 }}
        >
          <LandingHeroTopBar />
        </motion.div>

        {/* ── Wordmark — blur reveal ── */}
        <motion.div
          variants={blurFade}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.5 }}
        >
          <LandingWordmark />
        </motion.div>

        {/* ── 3D Model — spinning below subtitle ── */}
        <motion.div
          className="relative z-20 mx-auto mt-2 w-full max-w-md md:max-w-lg"
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.7 }}
        >
          <Suspense fallback={null}>
            <ModelViewer />
            {/* @ts-ignore — model-viewer CE */}
            <model-viewer
              src="/models/porsche_macan.glb"
              alt="Yourent — Location voiture Casablanca"
              auto-rotate
              auto-rotate-delay={0}
              rotation-per-second="36deg"
              camera-orbit="45deg 65deg 105%"
              interaction-prompt="none"
              disable-zoom
              disable-pan
              disable-tap
              style={{
                width: '100%',
                height: '280px',
                ['--poster-color' as string]: 'transparent',
              }}
              environment-image="neutral"
              shadow-intensity="0.4"
              exposure="0.9"
            />
          </Suspense>
        </motion.div>

        {/* spacer — push bottom content down */}
        <div className="flex-1" />

        {/* ── bottom pills + marquee — staggered slide-up ── */}
        <motion.div
          className="relative z-40 flex shrink-0 flex-col items-center gap-4 px-4 pb-5 md:px-6 md:pb-8"
          variants={stagger(0.15, 0.8)}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={staggerItem} className="flex flex-wrap items-center justify-center gap-2">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#f3d98a] bg-gradient-to-br from-[#f6e29b] via-[#d8b24f] to-[#b98724] px-4 py-2 text-[0.68rem] font-extrabold uppercase tracking-[0.16em] text-[#000000] shadow-[0_14px_34px_rgba(201,168,76,0.28)]">
              <Sparkles className="h-3 w-3 text-[#000000]" />
              {t('hero.badge')}
            </span>
            <Link
              href="/catalogue"
              style={{ color: '#000000' }}
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
