'use client';

import dynamic from 'next/dynamic';
import './landing.css';

import { useMemo, useRef } from 'react';
import { DISPLAY_BRANDS } from './constants';
import { useMorphProgress, useIsMobile } from './hooks/useMorphProgress';
import { useLandingSlider } from './hooks/useLandingSlider';
import { LandingHeroSection } from './LandingHeroSection';
import { LandingBrandSliderSection } from './LandingBrandSliderSection';
import { LandingProcessSection } from './LandingProcessSection';
import { LandingContactSection } from './LandingContactSection';
import { LandingFaqSection } from './LandingFaqSection';
import type { LandingVehicle, PublicLandingPageProps, SliderBrandData } from './types';

const LandingSignatureCollectionSection = dynamic<{ vehicles: LandingVehicle[] }>(
  () => import('./LandingSignatureCollectionSection').then((mod) => mod.LandingSignatureCollectionSection),
);

const LandingNewArrivalSection = dynamic<{ vehicle: LandingVehicle | null }>(
  () => import('./LandingNewArrivalSection').then((mod) => mod.LandingNewArrivalSection),
);

const LandingWhySection = dynamic(
  () => import('./LandingWhySection').then((mod) => mod.LandingWhySection),
);

const LandingEconomicFleetSection = dynamic<{ vehicles: LandingVehicle[] }>(
  () => import('./LandingEconomicFleetSection').then((mod) => mod.LandingEconomicFleetSection),
);

const LandingFinalCtaSection = dynamic(
  () => import('./LandingFinalCtaSection').then((mod) => mod.LandingFinalCtaSection),
);

/* ═══════════════════════════════════════════════════════════
   PublicLandingPage — shell component
   Orchestrates all landing sections.
═══════════════════════════════════════════════════════════ */

export function PublicLandingPage({
  signatureVehicles,
  sliderBrands,
  economicVehicles,
  newArrivalVehicle,
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
  const { sliderActive } = useMorphProgress(heroRef, wrapperRef);

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

      {/* ═══ Nouvel Arrivage ═══ */}
      <LandingNewArrivalSection vehicle={newArrivalVehicle ?? null} />

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
