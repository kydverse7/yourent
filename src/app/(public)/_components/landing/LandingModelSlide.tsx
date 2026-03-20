'use client';

import { FRAME_DESKTOP, FRAME_MOBILE } from './constants';

type LandingModelSlideProps = {
  poster: string | null;
  interactive: boolean;
  isMobile: boolean;
};

/**
 * Slide 1 — interactive 3D model-viewer.
 *
 * Uses a 2× oversample inner wrapper so that WebGL renders at double
 * resolution. The outer frame remains at exactly 500×400 (desktop)
 * or 350×300 (mobile).
 */
export function LandingModelSlide({
  poster,
  interactive,
  isMobile,
}: LandingModelSlideProps) {
  const frame = isMobile ? FRAME_MOBILE : FRAME_DESKTOP;

  return (
    <div
      className="lp-media-frame"
      style={{ width: frame.width, height: frame.height }}
    >
      <div className="lp-model-direct">
        <model-viewer
          src="/models/porsche_macan.glb"
          poster={poster ?? undefined}
          alt="Porsche Macan"
          loading="eager"
          camera-controls={interactive ? true : undefined}
          auto-rotate={true}
          shadow-intensity="0.8"
          exposure="0.9"
          camera-orbit="30deg 75deg 108%"
          field-of-view="31deg"
          interaction-prompt="none"
          style={{ width: '100%', height: '100%', background: 'transparent' }}
        />
      </div>
    </div>
  );
}
