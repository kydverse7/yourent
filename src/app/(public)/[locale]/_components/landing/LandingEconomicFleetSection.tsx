'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from '@/lib/i18n/LocaleLink';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { formatCurrency } from '@/lib/format';
import { useLocale } from '@/lib/i18n';
import type { LandingVehicle } from './types';

type Props = {
  vehicles: LandingVehicle[];
};

/**
 * Economic fleet section — horizontal cards carousel.
 *
 * Features:
 *  • Clickable vehicle-name links that bring the card to center
 *  • Landscape cards (image left, info right)
 *  • Depth stack with blur + scale on inactive cards
 */
export function LandingEconomicFleetSection({ vehicles }: Props) {
  const { t } = useLocale();
  const [active, setActive] = useState(0);
  const count = vehicles.length;

  const prev = useCallback(
    () => setActive((i) => (i - 1 + count) % count),
    [count],
  );
  const next = useCallback(
    () => setActive((i) => (i + 1) % count),
    [count],
  );

  /* ── Touch / swipe handling ── */
  const touchStartX = useRef(0);
  const touchStartY = useRef(0);

  /* ── Barre sous le modèle actif : elle glisse d'un nom à l'autre ── */
  const navRef = useRef<HTMLElement>(null);
  const barRef = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;
    // L'observateur appelle aussi au démarrage, au moment où la section est mise en page.
    const observer = new ResizeObserver(() => {
      const button = nav.querySelector<HTMLElement>('.eco-name-link--active');
      const bar = barRef.current;
      if (!button || !bar) return;
      const inset = button.offsetWidth * 0.15;
      bar.style.width = `${button.offsetWidth - inset * 2}px`;
      bar.style.transform = `translateX(${button.offsetLeft + inset}px)`;
      bar.style.opacity = '1';
    });
    observer.observe(nav);
    return () => observer.disconnect();
  }, [active]);
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  }, []);
  const handleTouchEnd = useCallback(
    (e: React.TouchEvent) => {
      const dx = e.changedTouches[0].clientX - touchStartX.current;
      const dy = e.changedTouches[0].clientY - touchStartY.current;
      if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 40) {
        if (dx < 0) next();
        else prev();
      }
    },
    [next, prev],
  );

  if (count === 0) return null;

  return (
    <section className="lux-container py-16 md:py-24 overflow-hidden">
      {/* ── Header ── */}
      <div className="mb-10 flex flex-wrap items-center justify-center gap-6 text-center md:items-end md:justify-between md:text-left">
        <div className="rv rv-slide-left space-y-3">
          <span className="lux-eyebrow">{t('eco.eyebrow')}</span>
          <h2 className="lux-title-sm max-w-[24ch]">
            {t('eco.title')}
          </h2>
          <p className="lux-subtitle max-w-[42ch]">
            {t('eco.subtitle')}
          </p>
        </div>
        <div className="rv rv-slide-right">
          <Link href="/catalogue" className="btn-gold shrink-0">
            {t('eco.cta')} <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>

      {/* ── Quick-select name links ── */}
      <div className="rv rv-blur-fade mb-8">
        <nav ref={navRef} className="eco-name-links" aria-label={t('aria.ecoNav')}>
          {vehicles.map((v, i) => (
            <button
              key={v._id}
              onClick={() => setActive(i)}
              className={`eco-name-link${i === active ? ' eco-name-link--active' : ''}`}
            >
              <span className="eco-name-link-marque">{v.marque}</span>
              <span className="eco-name-link-modele">{v.modele}</span>
            </button>
          ))}
          <span ref={barRef} className="eco-name-link-bar" aria-hidden="true" />
        </nav>
      </div>

      {/* ── Carousel ── */}
      <div className="rv rv-blur-fade">
        <div className="eco-carousel">
          {/* ── Stacked horizontal cards ── */}
          <div
            className="eco-carousel-stage"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            {vehicles.map((vehicle, i) => {
              const offset = (i - active + count) % count;
              const pos =
                offset === 0
                  ? 0
                  : offset <= Math.floor(count / 2)
                    ? offset
                    : offset - count;

              const isActive = pos === 0;
              const absPos = Math.abs(pos);

              return (
                <div
                  key={vehicle._id}
                  className="eco-card-wrapper"
                  onClick={() => !isActive && setActive(i)}
                  style={{
                    transform: `translateX(${pos * 60}%) scale(${isActive ? 1 : Math.max(0.72, 1 - absPos * 0.14)}) rotateY(${pos * -4}deg)`,
                    zIndex: count - absPos,
                    opacity: absPos > 2 ? 0 : isActive ? 1 : 0.45,
                    filter: isActive ? 'blur(0px)' : `blur(${absPos * 3}px)`,
                    cursor: isActive ? 'default' : 'pointer',
                  }}
                >
                  <div className={`eco-card eco-card--h${isActive ? ' eco-card--active' : ''}`}>
                    {/* ── Left: Image ── */}
                    <div className="eco-card-img eco-card-img--h">
                      {vehicle.featuredPhoto ? (
                        <Image
                          src={vehicle.featuredPhoto}
                          alt={`${vehicle.marque} ${vehicle.modele}`}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                          sizes="(min-width: 1024px) 360px, (min-width: 640px) 260px, 100vw"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center text-5xl text-[#c9a84c]/20">
                          ✦
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[#0c0a09]" />
                    </div>

                    {/* ── Right: Info ── */}
                    <div className="eco-card-body eco-card-body--h">
                      <span className="eco-card-tag">{vehicle.type}</span>

                      <h3 className="eco-card-title">
                        {vehicle.marque}{' '}
                        <span className="eco-card-title-model">{vehicle.modele}</span>
                      </h3>

                      {vehicle.annee && (
                        <p className="eco-card-year">{vehicle.annee}</p>
                      )}

                      {vehicle.tarifJour > 0 && (
                        <div className="eco-card-price-col">
                          <p className="eco-card-price-label">{t('signature.from')}</p>
                          <p className="eco-card-price">
                            {formatCurrency(vehicle.tarifJour)}
                            <span className="eco-card-price-unit"> {t('signature.perDay')}</span>
                          </p>
                        </div>
                      )}

                      {/* Lien toujours dans le HTML ; sur une carte inactive il est masqué et le clic active la carte. */}
                      <div className={`transition-opacity duration-300 ${isActive ? 'opacity-100' : 'pointer-events-none opacity-0'}`}>
                        <Link
                          href={`/catalogue/${vehicle.slug}`}
                          className="eco-card-cta"
                          tabIndex={isActive ? undefined : -1}
                        >
                          {t('eco.book')}
                          <ArrowRight className="h-3.5 w-3.5" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* ── Nav arrows + dots ── */}
          <div className="eco-carousel-nav">
            <button onClick={prev} className="eco-nav-btn" aria-label={t('aria.prevVehicle')}>
              <ChevronLeft className="h-5 w-5" />
            </button>

            <div className="eco-carousel-dots">
              {vehicles.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className={`eco-dot${i === active ? ' eco-dot-active' : ''}`}
                  aria-label={`${t('aria.goToVehicle')} ${i + 1}`}
                />
              ))}
            </div>

            <button onClick={next} className="eco-nav-btn" aria-label={t('aria.nextVehicle')}>
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
