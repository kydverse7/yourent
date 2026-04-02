'use client';

import { useState, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';
import { useLocale } from '@/lib/i18n';
import {
  motion,
  AnimatePresence,
  ScrollReveal,
  blurFade,
  slideLeft,
  slideRight,
} from './motion';
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

  if (count === 0) return null;

  return (
    <section className="lux-container py-16 md:py-24 overflow-hidden">
      {/* ── Header ── */}
      <div className="mb-10 flex flex-wrap items-center justify-center gap-6 text-center md:items-end md:justify-between md:text-left">
        <ScrollReveal variants={slideLeft} className="space-y-3">
          <span className="lux-eyebrow">{t('eco.eyebrow')}</span>
          <h2 className="lux-title-sm max-w-[24ch]">
            {t('eco.title')}
          </h2>
          <p className="lux-subtitle max-w-[42ch]">
            {t('eco.subtitle')}
          </p>
        </ScrollReveal>
        <ScrollReveal variants={slideRight}>
          <Link href="/catalogue" className="btn-gold shrink-0">
            {t('eco.cta')} <ArrowRight className="h-4 w-4" />
          </Link>
        </ScrollReveal>
      </div>

      {/* ── Quick-select name links ── */}
      <ScrollReveal variants={blurFade} className="mb-8">
        <nav className="eco-name-links" aria-label={t('aria.ecoNav')}>
          {vehicles.map((v, i) => (
            <button
              key={v._id}
              onClick={() => setActive(i)}
              className={`eco-name-link${i === active ? ' eco-name-link--active' : ''}`}
            >
              <span className="eco-name-link-marque">{v.marque}</span>
              <span className="eco-name-link-modele">{v.modele}</span>
              {i === active && (
                <motion.span
                  className="eco-name-link-bar"
                  layoutId="eco-active-bar"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
            </button>
          ))}
        </nav>
      </ScrollReveal>

      {/* ── Carousel ── */}
      <ScrollReveal variants={blurFade}>
        <div className="eco-carousel">
          {/* ── Stacked horizontal cards ── */}
          <div className="eco-carousel-stage">
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
                <motion.div
                  key={vehicle._id}
                  className="eco-card-wrapper"
                  animate={{
                    x: `${pos * 60}%`,
                    scale: isActive ? 1 : Math.max(0.72, 1 - absPos * 0.14),
                    zIndex: count - absPos,
                    opacity: absPos > 2 ? 0 : isActive ? 1 : 0.45,
                    filter: isActive ? 'blur(0px)' : `blur(${absPos * 3}px)`,
                    rotateY: pos * -4,
                  }}
                  transition={{
                    type: 'spring',
                    stiffness: 280,
                    damping: 28,
                    mass: 0.85,
                  }}
                  onClick={() => !isActive && setActive(i)}
                  style={{ cursor: isActive ? 'default' : 'pointer' }}
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

                      <AnimatePresence>
                        {isActive && (
                          <motion.div
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 8 }}
                            transition={{ duration: 0.25 }}
                          >
                            <Link
                              href={`/catalogue/${vehicle.slug}`}
                              className="eco-card-cta"
                            >
                              {t('eco.book')}
                              <ArrowRight className="h-3.5 w-3.5" />
                            </Link>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </motion.div>
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
      </ScrollReveal>
    </section>
  );
}
