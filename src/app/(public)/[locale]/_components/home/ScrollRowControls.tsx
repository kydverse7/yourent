'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';

/** Flèches précédent / suivant d'une rangée à défilement horizontal (ordinateur). En arabe, le sens s'inverse. */
export function ScrollRowControls({
  targetId,
  prevLabel,
  nextLabel,
}: {
  targetId: string;
  prevLabel: string;
  nextLabel: string;
}) {
  const scroll = (step: 1 | -1) => {
    const row = document.getElementById(targetId);
    if (!row) return;
    const rtl = getComputedStyle(row).direction === 'rtl';
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    row.scrollBy({ left: step * (rtl ? -1 : 1) * row.clientWidth * 0.75, behavior: reduce ? 'auto' : 'smooth' });
  };
  const button =
    'inline-flex h-11 w-11 items-center justify-center rounded-xl border border-white/15 text-cream transition-colors hover:border-gold/50 hover:text-gold';
  return (
    <div className="hidden items-center gap-2 md:flex">
      <button type="button" onClick={() => scroll(-1)} aria-label={prevLabel} className={button}>
        <ChevronLeft className="h-5 w-5 rtl:-scale-x-100" aria-hidden="true" />
      </button>
      <button type="button" onClick={() => scroll(1)} aria-label={nextLabel} className={button}>
        <ChevronRight className="h-5 w-5 rtl:-scale-x-100" aria-hidden="true" />
      </button>
    </div>
  );
}
