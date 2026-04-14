import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';
import { useLocale } from '@/lib/i18n';
import {
  motion,
  ScrollReveal,
  StaggerContainer,
  staggerCard,
  fadeUp,
  slideLeft,
  slideRight,
} from './motion';
import type { LandingVehicle } from './types';

type LandingNewArrivalSectionProps = {
  vehicle: LandingVehicle | null;
};

export function LandingNewArrivalSection({ vehicle }: LandingNewArrivalSectionProps) {
  const { t } = useLocale();

  if (!vehicle) return null;

  return (
    <section className="lux-container py-16 md:py-24">
      {/* ── Header row — same layout as Signature / Economic ── */}
      <div className="mb-10 flex flex-wrap items-center justify-center gap-6 text-center md:items-end md:justify-between md:text-left">
        <ScrollReveal variants={slideLeft} className="space-y-3">
          <span className="lux-eyebrow">
            <Sparkles className="h-3.5 w-3.5" /> {t('newArrival.eyebrow')}
          </span>
          <h2 className="lux-title-sm max-w-[24ch]">
            {t('newArrival.title')}
          </h2>
          <p className="lux-subtitle max-w-[42ch]">
            {t('newArrival.subtitle')}
          </p>
        </ScrollReveal>
        <ScrollReveal variants={slideRight}>
          <Link href={`/catalogue/${vehicle.slug}`} className="btn-gold shrink-0">
            {t('newArrival.cta')} <ArrowRight className="h-4 w-4" />
          </Link>
        </ScrollReveal>
      </div>

      {/* ── Featured card — full-width cinematic panel ── */}
      <StaggerContainer
        staggerDelay={0.14}
        className="grid gap-5 md:grid-cols-1"
        viewport={{ once: true, amount: 0.1 }}
      >
        <motion.div variants={staggerCard} style={{ perspective: 1000 }}>
          <div className="relative overflow-hidden rounded-[28px] border border-white/[0.07] bg-gradient-to-b from-white/[0.03] to-white/[0.015]">
            {/* Decorative glow */}
            <div className="pointer-events-none absolute inset-x-0 -top-px h-48 rounded-t-[28px] bg-[radial-gradient(ellipse_61.8%_38.2%_at_50%_0%,rgba(201,168,76,0.10),transparent)]" />

            <div className="relative grid gap-0 md:grid-cols-[1.2fr_0.8fr]">
              {/* ── Left: Image ── */}
              <Link
                href={`/catalogue/${vehicle.slug}`}
                className="group relative h-72 sm:h-80 md:h-[420px] overflow-hidden bg-[#0a0a0a]"
              >
                {vehicle.featuredPhoto ? (
                  <Image
                    src={vehicle.featuredPhoto}
                    alt={`${vehicle.marque} ${vehicle.modele}`}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(min-width: 768px) 60vw, 100vw"
                    priority
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-7xl text-[#c9a84c]/20">
                    ✦
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/5 to-transparent md:bg-gradient-to-r md:from-transparent md:via-transparent md:to-[#0c0a09]" />
                {/* Badge */}
                <span className="absolute left-4 top-4 flex items-center gap-1.5 rounded-full border border-[#c9a84c]/25 bg-black/60 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.22em] text-[#c9a84c] backdrop-blur-sm">
                  <Sparkles className="h-3 w-3" /> {t('newArrival.eyebrow')}
                </span>
              </Link>

              {/* ── Right: Info panel ── */}
              <div className="relative flex flex-col justify-center gap-6 p-6 sm:p-8 md:p-10">
                <div className="flex items-center gap-3">
                  <span className="lux-chip border-[#c9a84c]/15 bg-[#c9a84c]/10 py-1 px-3 text-[11px] text-[#c9a84c]">
                    {vehicle.type}
                  </span>
                  {vehicle.annee && (
                    <span className="text-[11px] uppercase tracking-widest text-[#756858]">
                      {vehicle.annee}
                    </span>
                  )}
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-[#f7f1e8] md:text-3xl">
                    {vehicle.marque} {vehicle.modele}
                  </h3>
                  <p className="mt-2 text-sm text-[#a39880]">
                    {t('newArrival.subtitle')}
                  </p>
                </div>

                {vehicle.tarifJour > 0 && (
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.2em] text-[#756858]">
                      {t('newArrival.from')}
                    </p>
                    <p className="mt-1 text-[2.2rem] font-bold leading-none text-[#c9a84c]">
                      {formatCurrency(vehicle.tarifJour)}
                    </p>
                    <p className="mt-1 text-[11px] text-[#756858]">{t('newArrival.perDay')}</p>
                  </div>
                )}

                <Link
                  href={`/catalogue/${vehicle.slug}`}
                  className="btn-gold mt-2 self-start"
                >
                  {t('newArrival.cta')} <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </StaggerContainer>
    </section>
  );
}
