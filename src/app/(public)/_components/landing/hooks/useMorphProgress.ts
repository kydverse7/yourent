import { useEffect, useRef, useState, useCallback } from 'react';
import { NAV_HEIGHT, MORPH_THRESHOLD } from '../constants';
import type { MorphProgress } from '../types';

/**
 * Tracks scroll progress through the hero section and determines
 * when the slider should become active.
 *
 * @param heroRef   - ref to the hero section element
 * @param wrapperRef - ref to the wrapper containing hero + slider
 */
export function useMorphProgress(
  heroRef: React.RefObject<HTMLDivElement | null>,
  wrapperRef: React.RefObject<HTMLDivElement | null>,
): MorphProgress {
  const [raw, setRaw] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const wrapper = wrapperRef.current;
      if (!wrapper) return;
      const rect = wrapper.getBoundingClientRect();
      const heroHeight = heroRef.current?.offsetHeight ?? window.innerHeight;
      const scrolled = NAV_HEIGHT - rect.top;
      setRaw(Math.max(0, Math.min(1, scrolled / heroHeight)));
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll(); // initial measure
    return () => window.removeEventListener('scroll', onScroll);
  }, [heroRef, wrapperRef]);

  const sliderActive = raw >= MORPH_THRESHOLD;
  const motion = sliderActive ? 1 : Math.min(raw / MORPH_THRESHOLD, 1);

  return { raw, motion, sliderActive };
}

/**
 * Tracks viewport width to determine mobile breakpoint.
 */
export function useIsMobile(breakpoint = 768): boolean {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < breakpoint);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, [breakpoint]);

  return isMobile;
}
