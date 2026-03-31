import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';
import { useLocale } from '@/lib/i18n';
import { LandingBrandTabs } from './LandingBrandTabs';
import { BRAND_AMBIENT } from './constants';
import {
  motion,
  AnimatePresence,
  brandInfoVariants,
  fadeUp,
  fadeDown,
  ScrollReveal,
} from './motion';
import type { SliderBrandData, BrandAmbientColor } from './types';

type LandingBrandSliderSectionProps = {
  items: SliderBrandData[];
  brandIndex: number;
  sliderActive: boolean;
  apKey: number;
  onTabSelect: (index: number) => void;
  onPause: () => void;
  onResume: () => void;
  isMobile?: boolean;
};

/**
 * Brand slider section with cinematic background,
 * vehicle info panel, and brand tabs.
 */
export function LandingBrandSliderSection({
  items,
  brandIndex,
  sliderActive,
  apKey,
  onTabSelect,
  onPause,
  onResume,
  isMobile,
}: LandingBrandSliderSectionProps) {
  const { t, locale } = useLocale();
  const isRtl = locale === 'ar';
  const active = items[brandIndex] ?? items[0];
  const ambient: BrandAmbientColor = BRAND_AMBIENT[active.brand] ?? [200, 80, 50];
  const [ar, ag, ab] = ambient;
  const rgb = `${ar},${ag},${ab}`;

  return (
    <section
      className="relative z-20 flex h-[calc(100svh-80px)] min-h-[520px] sm:min-h-[640px] w-full flex-col justify-between px-3 md:px-5 lg:px-6 md:h-[calc(100vh-80px)] md:min-h-0"
      style={{ ['--sl-r' as string]: ar, ['--sl-g' as string]: ag, ['--sl-b' as string]: ab }}
      onPointerEnter={onPause}
      onPointerLeave={onResume}
      onMouseEnter={onPause}
      onMouseLeave={onResume}
      onTouchStart={onPause}
      onTouchEnd={onResume}
      onTouchCancel={onResume}
      onFocus={onPause}
      onBlur={onResume}
    >
      {/* ── slider panel background ── */}
      <div className="absolute inset-x-3 md:inset-x-5 lg:inset-x-6 top-0 bottom-0 -z-10 rounded-[32px] border border-[rgba(var(--sl-r),var(--sl-g),var(--sl-b),0.15)] overflow-hidden">
        <div className="lp-slider-panel" aria-hidden="true" />
        <div className="lp-slider-stripes" aria-hidden="true" />
        <div className="lp-slider-orb-top" aria-hidden="true" />
        <div className="lp-slider-orb-l" aria-hidden="true" />
        <div className="lp-slider-orb-r" aria-hidden="true" />
        <div className="lp-slider-scan" aria-hidden="true" />
        <div className="lp-slider-corner-tl" aria-hidden="true" />
        <div className="lp-slider-corner-br" aria-hidden="true" />
      </div>

      {/* ── header row: eyebrow + counter ── */}
      <div className="pointer-events-none flex shrink-0 flex-col items-center justify-between gap-2 px-5 pt-5 text-center md:flex-row md:px-12 md:pt-8 md:text-left">
        <motion.span
          className="lux-eyebrow pointer-events-auto"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
        >
          <Sparkles className="h-3 w-3" /> {t('brand.eyebrow')}
        </motion.span>
        <motion.span
          className="text-[11px] uppercase tracking-[0.2em] text-[#756858]"
          key={brandIndex}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
        >
          {String(brandIndex + 1).padStart(2, '0')} /{' '}
          {String(items.length).padStart(2, '0')}
        </motion.span>
      </div>

      {/* ── brand info panel + vehicle photo ── */}
      <div className={`relative z-40 flex min-h-0 flex-1 flex-col items-center justify-end px-5 pb-6 pointer-events-none md:flex-row md:items-center md:justify-between md:px-14 md:pb-0${isRtl ? ' md:flex-row-reverse' : ''}`}>
        {/* Vehicle hero photo */}
        {active.vehicle?.featuredPhoto && (
          <AnimatePresence mode="wait">
            <motion.div
              key={active.brand + '-photo'}
              className="pointer-events-none relative z-30 w-[85%] max-w-[420px] md:w-[48%] md:max-w-[540px]"
              initial={{ opacity: 0, x: isRtl ? 40 : -40, scale: 0.92 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: isRtl ? -40 : 40, scale: 0.92 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="relative aspect-[16/9] w-full drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
                <Image
                  src={active.vehicle.featuredPhoto}
                  alt={`${active.vehicle.marque} ${active.vehicle.modele}`}
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 70vw, 540px"
                />
              </div>
            </motion.div>
          </AnimatePresence>
        )}
        <AnimatePresence mode="wait">
        <motion.div
          key={active.brand}
          variants={brandInfoVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          className={`lp-brand-info pointer-events-auto flex w-full max-w-md flex-col items-center justify-center gap-2 py-2 text-center md:w-[38%] md:max-w-none md:gap-4 md:py-6${isRtl ? ' md:items-end md:text-right' : ' md:items-start md:text-left'}`}
        >
          <span
            className={`lp-brand-tag${isRtl ? ' self-center md:self-end' : ' self-center md:self-start'}`}
            style={{
              color: `rgb(${rgb})`,
              borderColor: `rgba(${rgb},0.35)`,
              background: `rgba(${rgb},0.1)`,
            }}
          >
            {active.brand}
          </span>

          {active.vehicle ? (
            <>
              <h2 className="lp-brand-name leading-[1.0]">
                <span className="md:block">
                  {active.vehicle.marque}{' '}
                  <span className="lp-brand-model">{active.vehicle.modele}</span>
                </span>
              </h2>
              <div className="flex flex-row items-baseline gap-2 md:flex-col md:gap-0">
                <p className="text-[10px] uppercase tracking-[0.2em] text-[#756858] whitespace-nowrap">
                  {t('signature.from')}
                </p>
                <p className="lp-brand-price">
                  {formatCurrency(active.vehicle.tarifJour)}
                  <span className="lp-brand-price-unit"> {t('signature.perDay')}</span>
                </p>
              </div>
              <Link
                href={`/catalogue/${active.vehicle.slug}`}
                className={`btn-gold mt-2${isRtl ? ' self-center md:self-end' : ' self-center md:self-start'}`}
                style={{
                  background: `linear-gradient(135deg, rgb(${rgb}), rgba(${rgb},0.55))`,
                  color: '#fff',
                }}
              >
                {t('brand.book')} <ArrowRight className="h-4 w-4" />
              </Link>
            </>
          ) : (
            <>
              <h2 className="lp-brand-name">{active.brand}</h2>
              <p className="text-sm text-[#b9a88f]">{t('brand.comingSoon')}</p>
            </>
          )}
        </motion.div>
        </AnimatePresence>
      </div>

      {/* ── tabs ── */}
      <LandingBrandTabs
        items={items}
        brandIndex={brandIndex}
        sliderActive={sliderActive}
        apKey={apKey}
        rgb={rgb}
        ambient={ambient}
        onTabSelect={onTabSelect}
      />
    </section>
  );
}
