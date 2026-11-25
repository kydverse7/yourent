'use client';

import { useEffect, useRef } from 'react';

const clamp01 = (value: number) => Math.max(0, Math.min(1, value));

/** Opacité selon l'avancement : 0 à 1 sur 0-0,15, 1 jusqu'à 0,6, puis 1 à 0,5 jusqu'à la fin. */
function opacityAt(progress: number) {
  if (progress < 0.15) return progress / 0.15;
  if (progress < 0.6) return 1;
  return 1 - ((progress - 0.6) / 0.4) * 0.5;
}

/* Filigrane « CASABLANCA » tracé au défilement. Le suivi ne tourne que lorsqu'il est à l'écran. */
export function LandingFiligrane() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<SVGTextElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const text = textRef.current;
    if (!wrap || !text) return;

    let length = 3200;
    let measured = false;
    let frame = 0;
    const paint = () => {
      frame = 0;
      if (!measured) {
        // Marge pour les raccords du contour. Mesuré à l'écran : la section est en content-visibility.
        length = text.getComputedTextLength() * 1.15;
        text.style.strokeDasharray = String(length);
        measured = true;
      }
      const rect = wrap.getBoundingClientRect();
      const viewport = window.innerHeight;
      const progress = clamp01((viewport - rect.top) / (viewport + rect.height));
      text.style.strokeDashoffset = String(length * (1 - clamp01(progress / 0.65)));
      text.style.opacity = String(opacityAt(progress));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(paint);
    };

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        window.addEventListener('scroll', onScroll, { passive: true });
        onScroll();
      } else {
        window.removeEventListener('scroll', onScroll);
      }
    });
    observer.observe(wrap);

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div ref={wrapRef} className="ct-filigrane-wrap" aria-hidden="true">
      <svg className="ct-filigrane-svg" viewBox="0 0 1200 100" preserveAspectRatio="xMidYMid meet">
        <text
          ref={textRef}
          x="600"
          y="78"
          textAnchor="middle"
          className="ct-filigrane-text"
          style={{ strokeDasharray: 3200, strokeDashoffset: 3200, opacity: 0 }}
        >
          CASABLANCA
        </text>
      </svg>
    </div>
  );
}
