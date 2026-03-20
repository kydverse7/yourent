'use client';

import Image from 'next/image';
import { LandingModelSlide } from './LandingModelSlide';
import { LandingImageSlide } from './LandingImageSlide';
import type { SliderBrandData } from './types';

type LandingMorphSceneProps = {
  /** 0–1 motion progress (snapped to 1 when slider active) */
  motionProgress: number;
  sliderActive: boolean;
  isMobile: boolean;
  mvLoaded: boolean;
  macanPhoto: string | null;
  items: SliderBrandData[];
  brandIndex: number;
};

/**
 * Sticky scene that contains the media (3D or image).
 *
 * The 3D model stays fixed in its position (no scroll-based morph).
 * It simply auto-rotates in place. For Porsche Macan slide,
 * we show the agency photo.
 */
export function LandingMorphScene({
  sliderActive,
  isMobile,
  mvLoaded,
  macanPhoto,
  items,
  brandIndex,
}: LandingMorphSceneProps) {
  return (
    <div className="absolute inset-x-0 top-0 bottom-0 pointer-events-none z-30">
      <div
        className="sticky top-[80px] w-full flex items-center justify-center overflow-hidden"
        style={{ height: 'calc(100svh - 80px)' }}
      >
        <div
          style={{
            pointerEvents: sliderActive ? 'auto' : 'none',
          }}
        >
          {/* ─── Grid stack: all layers in the same cell ─── */}
          <div className="lp-media-stack">
            {/* Layer 0 — 3D model (always visible in hero, stays in place & rotates) */}
            <div
              className="lp-media-layer"
              style={{ opacity: sliderActive ? 0 : 1 }}
            >
              {mvLoaded ? (
                <LandingModelSlide
                  poster={macanPhoto}
                  interactive={false}
                  isMobile={isMobile}
                />
              ) : macanPhoto ? (
                <div
                  className="lp-media-frame"
                  style={{
                    width: isMobile ? 350 : 500,
                    height: isMobile ? 300 : 400,
                  }}
                >
                  <div className="lp-media-inner lp-image-inner">
                    <Image
                      src={macanPhoto}
                      alt="Porsche Macan"
                      fill
                      className="lp-slide-image"
                      sizes="(max-width: 768px) 350px, 500px"
                      priority
                    />
                  </div>
                </div>
              ) : null}
            </div>

            {/* Slider layers — all brands including Porsche use their photo */}
            {items.map((item, i) => {
              const photo = item.vehicle?.featuredPhoto;
              if (!photo) return null;
              return (
                <div
                  key={item.brand}
                  className="lp-media-layer"
                  style={{
                    opacity: brandIndex === i && sliderActive ? 1 : 0,
                  }}
                >
                  <LandingImageSlide
                    src={photo}
                    alt={item.brand}
                    isMobile={isMobile}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
