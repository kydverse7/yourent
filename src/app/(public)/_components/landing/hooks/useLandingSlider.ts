import { useEffect, useRef, useState, useCallback } from 'react';
import { AUTOPLAY_MS } from '../constants';

type UseLandingSliderParams = {
  brandCount: number;
  sliderActive: boolean;
};

type UseLandingSliderReturn = {
  brandIndex: number;
  isPaused: boolean;
  /** Incremented on every auto-advance or tab change — used as React key for progress bar */
  apKey: number;
  handleTab: (index: number) => void;
  handlePause: () => void;
  handleResume: () => void;
};

/**
 * Encapsulates slider autoplay + pause/resume + tab selection.
 */
export function useLandingSlider({
  brandCount,
  sliderActive,
}: UseLandingSliderParams): UseLandingSliderReturn {
  const [brandIndex, setBrandIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [apKey, setApKey] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const clearAutoplay = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const startAutoplay = useCallback(() => {
    clearAutoplay();
    if (!sliderActive || isPaused || brandCount === 0) return;
    timerRef.current = setInterval(() => {
      setBrandIndex(prev => (prev + 1) % brandCount);
      setApKey(k => k + 1);
    }, AUTOPLAY_MS);
  }, [sliderActive, isPaused, brandCount, clearAutoplay]);

  // Reset when leaving slider or re-start when entering
  useEffect(() => {
    if (!sliderActive) {
      clearAutoplay();
      setBrandIndex(0);
      setApKey(k => k + 1);
      setIsPaused(false);
      return;
    }
    startAutoplay();
    return clearAutoplay;
  }, [sliderActive, brandCount, isPaused, clearAutoplay, startAutoplay]);

  const handleTab = useCallback((i: number) => {
    setBrandIndex(i);
    setApKey(k => k + 1);
    // restart autoplay after manual selection
    startAutoplay();
  }, [startAutoplay]);

  const handlePause = useCallback(() => setIsPaused(true), []);
  const handleResume = useCallback(() => setIsPaused(false), []);

  return { brandIndex, isPaused, apKey, handleTab, handlePause, handleResume };
}
