import { useEffect, useState } from 'react';
import { NAV_HEIGHT, MORPH_THRESHOLD } from '../constants';

/**
 * Indique si le défilement a dépassé le hero, c'est-à-dire si le slider doit démarrer.
 * Mesure au plus une fois par image, et ne provoque un rendu que lorsque la réponse change.
 *
 * @param heroRef   - ref to the hero section element
 * @param wrapperRef - ref to the wrapper containing hero + slider
 */
export function useMorphProgress(
  heroRef: React.RefObject<HTMLDivElement | null>,
  wrapperRef: React.RefObject<HTMLDivElement | null>,
): boolean {
  const [sliderActive, setSliderActive] = useState(false);

  useEffect(() => {
    let frame = 0;
    const measure = () => {
      frame = 0;
      const wrapper = wrapperRef.current;
      if (!wrapper) return;
      const rect = wrapper.getBoundingClientRect();
      const heroHeight = heroRef.current?.offsetHeight ?? window.innerHeight;
      const scrolled = NAV_HEIGHT - rect.top;
      setSliderActive(Math.max(0, Math.min(1, scrolled / heroHeight)) >= MORPH_THRESHOLD);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(measure);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll(); // initial measure
    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(frame);
    };
  }, [heroRef, wrapperRef]);

  return sliderActive;
}
