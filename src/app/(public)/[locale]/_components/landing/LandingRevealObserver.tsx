'use client';

import { useEffect } from 'react';

const DEFAULT_AMOUNT = 0.18;

/** Déclenche les apparitions `.rv` de la page : un observateur par seuil, chaque élément ne s'anime qu'une fois. */
export function LandingRevealObserver() {
  useEffect(() => {
    const elements = document.querySelectorAll<HTMLElement>('.rv:not(.rv-in)');
    if (!('IntersectionObserver' in window)) {
      elements.forEach((element) => element.classList.add('rv-in'));
      return;
    }

    const observers = new Map<number, IntersectionObserver>();
    const observerFor = (amount: number) => {
      let observer = observers.get(amount);
      if (!observer) {
        observer = new IntersectionObserver(
          (entries, self) => {
            for (const entry of entries) {
              if (!entry.isIntersecting) continue;
              entry.target.classList.add('rv-in');
              self.unobserve(entry.target);
            }
          },
          { threshold: amount },
        );
        observers.set(amount, observer);
      }
      return observer;
    };

    elements.forEach((element) => {
      observerFor(Number(element.dataset.rvAmount ?? DEFAULT_AMOUNT)).observe(element);
    });
    return () => observers.forEach((observer) => observer.disconnect());
  }, []);

  return null;
}
