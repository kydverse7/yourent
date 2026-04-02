import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
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

type LandingSignatureCollectionSectionProps = {
  vehicles: LandingVehicle[];
};

/**
 * Signature collection grid — 4 premium vehicle cards.
 */
export function LandingSignatureCollectionSection({
  vehicles,
}: LandingSignatureCollectionSectionProps) {
  const { t } = useLocale();
  return (
    <section className="lux-container py-16 md:py-24">
      <div className="mb-10 flex flex-wrap items-center justify-center gap-6 text-center md:items-end md:justify-between md:text-left">
        <ScrollReveal variants={slideLeft} className="space-y-3">
          <span className="lux-eyebrow">{t('signature.eyebrow')}</span>
          <h2 className="lux-title-sm max-w-[20ch]">
            {t('signature.title')}
          </h2>
          <p className="lux-subtitle">
            {t('signature.subtitle')}
          </p>
        </ScrollReveal>
        <ScrollReveal variants={slideRight}>
          <Link href="/catalogue" className="btn-gold shrink-0">
            {t('signature.cta')} <ArrowRight className="h-4 w-4" />
          </Link>
        </ScrollReveal>
      </div>

      <StaggerContainer
        staggerDelay={0.14}
        className="grid gap-5 md:grid-cols-2 xl:grid-cols-4"
        viewport={{ once: true, amount: 0.1 }}
      >
        {vehicles.map((vehicle, i) => (
          <motion.div key={vehicle._id} variants={staggerCard} style={{ perspective: 1000 }}>
            <Link
              href={`/catalogue/${vehicle.slug}`}
              className="group lux-panel block overflow-hidden transition-transform duration-300 hover:-translate-y-1"
            >
              <div className="relative h-64 overflow-hidden bg-[#0a0a0a]">
                {vehicle.featuredPhoto ? (
                  <Image
                    src={vehicle.featuredPhoto}
                    alt={`${vehicle.marque} ${vehicle.modele}`}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(min-width: 1280px) 25vw, (min-width: 768px) 50vw, 100vw"
                    priority={i < 2}
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-5xl text-[#c9a84c]/20">
                    ✦
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
                <span className="absolute left-3 top-3 rounded-full border border-[#c9a84c]/20 bg-black/50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.22em] text-[#c9a84c]">
                  No.{String(i + 1).padStart(2, '0')}
                </span>
              </div>
              <div className="p-5">
                <div className="mb-3 flex items-center justify-between gap-2">
                  <span className="lux-chip border-[#c9a84c]/15 bg-[#c9a84c]/10 py-1 px-3 text-[11px] text-[#c9a84c]">
                    {vehicle.type}
                  </span>
                  {vehicle.annee && (
                    <span className="text-[11px] uppercase tracking-widest text-[#756858]">
                      {vehicle.annee}
                    </span>
                  )}
                </div>
                <h3 className="text-lg font-bold text-[#f7f1e8]">
                  {vehicle.marque} {vehicle.modele}
                </h3>
                <div className="mt-4 flex items-end justify-between gap-2">
                  {vehicle.tarifJour > 0 && (
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.2em] text-[#756858]">
                        {t('signature.from')}
                      </p>
                      <p className="mt-0.5 text-[1.6rem] font-bold leading-none text-[#c9a84c]">
                        {formatCurrency(vehicle.tarifJour)}
                      </p>
                      <p className="mt-0.5 text-[10px] text-[#756858]">{t('signature.perDay')}</p>
                    </div>
                  )}
                  <span className="flex items-center gap-1.5 text-sm font-semibold text-[#f7f1e8] transition-colors group-hover:text-[#c9a84c] ml-auto">
                    {t('signature.book')} <ArrowRight className="h-4 w-4" />
                  </span>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </StaggerContainer>
    </section>
  );
}
