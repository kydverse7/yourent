'use client';

import './landing.css';

import { useEffect, useMemo, useRef, useState } from 'react';
import { DISPLAY_BRANDS } from './constants';
import { useMorphProgress, useIsMobile } from './hooks/useMorphProgress';
import { useLandingSlider } from './hooks/useLandingSlider';
import { LandingHeroSection } from './LandingHeroSection';
import { LandingBrandSliderSection } from './LandingBrandSliderSection';
import { LandingSignatureCollectionSection } from './LandingSignatureCollectionSection';
import { LandingProcessSection } from './LandingProcessSection';
import { LandingFinalCtaSection } from './LandingFinalCtaSection';
import { LandingEconomicFleetSection } from './LandingEconomicFleetSection';
import { LandingContactSection } from './LandingContactSection';
import { LandingFaqSection } from './LandingFaqSection';
import { LandingWhySection } from './LandingWhySection';
import type { PublicLandingPageProps, SliderBrandData } from './types';

/* ═══════════════════════════════════════════════════════════
   PublicLandingPage — shell component
   Orchestrates all landing sections.
═══════════════════════════════════════════════════════════ */

export function PublicLandingPage({
  signatureVehicles,
  sliderBrands,
  economicVehicles,
}: PublicLandingPageProps) {
  /* ── Derived data ── */
  const items: SliderBrandData[] = useMemo(
    () =>
      sliderBrands.length > 0
        ? sliderBrands
        : DISPLAY_BRANDS.map(brand => ({ brand, vehicle: null })),
    [sliderBrands],
  );

  const cardVehicles = useMemo(
    () => signatureVehicles.slice(0, 4),
    [signatureVehicles],
  );

  /* ── Refs ── */
  const heroRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  /* ── Hooks motion  ── */
  const isMobile = useIsMobile();
  const { motion, sliderActive } = useMorphProgress(heroRef, wrapperRef);

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
      {/* ═══ Hero + Slider ═══ */}
      <div ref={wrapperRef} className="relative w-full flex flex-col gap-[40px]">
        <LandingHeroSection ref={heroRef} />
        <LandingBrandSliderSection
          items={items}
          brandIndex={brandIndex}
          sliderActive={sliderActive}
          apKey={apKey}
          onTabSelect={handleTab}
          onPause={handlePause}
          onResume={handleResume}
          isMobile={isMobile}
        />
      </div>

      {/* ═══ Signature collection ═══ */}
      <LandingSignatureCollectionSection vehicles={cardVehicles} />

      {/* ═══ Why YouRent — golden ratio + animated counters ═══ */}
      <LandingWhySection />

      {/* ═══ Economic fleet ═══ */}
      {economicVehicles.length > 0 && (
        <LandingEconomicFleetSection vehicles={economicVehicles} />
      )}

      {/* ═══ Process ═══ */}
      <LandingProcessSection />

      {/* ═══ Contact / Nous rejoindre ═══ */}
      <LandingContactSection />

      {/* ═══ FAQ ═══ */}
      <LandingFaqSection />

      {/* ═══ Final CTA ═══ */}
      <LandingFinalCtaSection />
    </div>
  );
}
