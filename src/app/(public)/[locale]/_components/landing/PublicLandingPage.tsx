'use client';

import './landing.css';

import { useMemo, useRef } from 'react';
import { DISPLAY_BRANDS } from './constants';
import { useMorphProgress } from './hooks/useMorphProgress';
import { useLandingSlider } from './hooks/useLandingSlider';
import { LandingBrandSliderSection } from './LandingBrandSliderSection';
import { LandingEconomicFleetSection } from './LandingEconomicFleetSection';
import { LandingRevealObserver } from './LandingRevealObserver';
import type { PublicLandingPageProps, SliderBrandData } from './types';

/* ═══════════════════════════════════════════════════════════
   PublicLandingPage — shell component
   Seuls le slider et le carrousel ont besoin de JavaScript : les autres sections
   sont rendues côté serveur et arrivent ici déjà prêtes, sans code à hydrater.
═══════════════════════════════════════════════════════════ */

export function PublicLandingPage({
  sliderBrands,
  economicVehicles,
  hero,
  signature,
  newArrival,
  why,
  steps,
  contact,
  guide,
  faq,
  finalCta,
}: PublicLandingPageProps) {
  /* ── Derived data ── */
  const items: SliderBrandData[] = useMemo(
    () =>
      sliderBrands.length > 0
        ? sliderBrands
        : DISPLAY_BRANDS.map(brand => ({ brand, vehicle: null })),
    [sliderBrands],
  );

  /* ── Refs ── */
  const heroRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  /* ── Hooks motion  ── */
  const sliderActive = useMorphProgress(heroRef, wrapperRef);

  const {
    brandIndex,
    apKey,
    handleTab,
    handlePause,
    handleResume,
  } = useLandingSlider({
    brandCount: items.length,
    sliderActive,
  });

  /* ── Render ── */
  return (
    <div className="flex flex-col pt-5 pb-10">
      <LandingRevealObserver />

      {/* ═══ Hero + Slider ═══ */}
      <div ref={wrapperRef} className="relative w-full flex flex-col gap-[40px]">
        <div ref={heroRef}>{hero}</div>
        <div className="lp-below-fold">
          <LandingBrandSliderSection
            items={items}
            brandIndex={brandIndex}
            sliderActive={sliderActive}
            apKey={apKey}
            onTabSelect={handleTab}
            onPause={handlePause}
            onResume={handleResume}
          />
        </div>
      </div>

      {/* ═══ Signature collection ═══ */}
      <div className="lp-below-fold">{signature}</div>

      {/* ═══ Nouvel Arrivage ═══ */}
      <div className="lp-below-fold">{newArrival}</div>

      {/* ═══ Why Yourent — golden ratio + animated counters ═══ */}
      <div className="lp-below-fold">{why}</div>

      {/* ═══ Economic fleet ═══ */}
      {economicVehicles.length > 0 && (
        <div className="lp-below-fold">
          <LandingEconomicFleetSection vehicles={economicVehicles} />
        </div>
      )}

      {/* ═══ Process ═══ */}
      <div className="lp-below-fold">{steps}</div>

      {/* ═══ Contact / Nous rejoindre ═══ */}
      <div className="lp-below-fold">{contact}</div>

      {/* ═══ Guide de location (rendu côté serveur) ═══ */}
      <div className="lp-below-fold">{guide}</div>

      {/* ═══ FAQ ═══ */}
      <div className="lp-below-fold">{faq}</div>

      {/* ═══ Final CTA ═══ */}
      <div className="lp-below-fold">{finalCta}</div>
    </div>
  );
}
