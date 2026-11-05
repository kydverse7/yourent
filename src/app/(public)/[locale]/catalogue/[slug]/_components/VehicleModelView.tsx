'use client';

import { useState } from 'react';
import Image from 'next/image';
import {
  Users,
  Fuel,
  Gauge,
  ShieldCheck,
  Calendar,
  ArrowRight,
  CircleDot,
  MessageCircle,
} from 'lucide-react';
import { formatCurrency } from '@/lib/utils';
import { useLocale } from '@/lib/i18n';
import { BUSINESS, formatEurApprox } from '@/lib/site';
import { categoryLabel, fuelLabel, gearLabel } from '../../_lib/specLabels';
import { ModelDateSearch } from './ModelDateSearch';
import PublicReservationForm from './PublicReservationForm';

export type Variant = {
  _id: string;
  slug: string;
  couleur?: string;
  carburant: string;
  transmission: string;
  places: number;
  categorie: string;
  description?: string;
  photos: string[];
  featuredPhoto: string | null;
  tarifJour: number;
  tarifJour10Plus: number;
  displayTarifJour: number;
};

type Props = {
  /** Unités réservables : libres aux dates choisies, ou disponibles aujourd'hui sans dates. Peut être vide. */
  variants: Variant[];
  /** Unité dont on montre les photos et les caractéristiques quand aucune n'est réservable. */
  fallbackUnit: Variant;
  modelSlug: string;
  modelMinTarif: number;
  marque: string;
  modele: string;
  highSeason?: boolean;
  initialDu?: string;
  initialAu?: string;
};

export function VehicleModelView({
  variants,
  fallbackUnit,
  modelSlug,
  modelMinTarif,
  marque,
  modele,
  highSeason = false,
  initialDu,
  initialAu,
}: Props) {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const selected = variants[selectedIdx] ?? variants[0] ?? fallbackUnit;
  const canBook = variants.length > 0;
  const hasDates = Boolean(initialDu && initialAu);
  const { t, tp, locale } = useLocale();

  const name = `${marque} ${modele}`;
  const photoAlt = t('model.h1').replace('{name}', name);
  const whatsappHref = `${BUSINESS.whatsappUrl}?text=${encodeURIComponent(t('model.waMessage').replace('{name}', name))}`;
  const hasLongRate = !highSeason && selected.tarifJour10Plus > 0 && selected.tarifJour10Plus < selected.tarifJour;
  const category = categoryLabel(t, selected.categorie);

  return (
    <div className="lux-grid-phi items-start">
      {/* ── Left column: Gallery + Variants + Info ── */}
      <div className="space-y-5">
        {/* Photo gallery */}
        <div className="lux-panel p-4 md:p-5">
          <div className="relative h-80 overflow-hidden rounded-[24px] border border-white/8 bg-noir-card lg:h-[520px]">
            {selected.featuredPhoto ? (
              <Image
                src={selected.featuredPhoto}
                alt={photoAlt}
                fill
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-cover"
              />
            ) : (
              <div className="flex h-full items-center justify-center text-6xl text-gold/20">
                🚗
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
            <div className="absolute bottom-5 start-5 flex items-center gap-2">
              <span className="rounded-full border border-gold/20 bg-black/35 px-4 py-2 text-xs uppercase tracking-[0.16em] text-gold capitalize">
                {category}
              </span>
              {selected.couleur && (
                <span className="rounded-full border border-white/15 bg-black/50 px-3 py-1.5 text-xs text-cream">
                  {selected.couleur}
                </span>
              )}
            </div>
          </div>

          {selected.photos.length > 1 && (
            <div className="mt-3 flex gap-3 overflow-x-auto">
              {selected.photos
                .filter((photo) => photo !== selected.featuredPhoto)
                .slice(0, 3)
                .map((photo, i) => (
                  <div
                    key={i}
                    className="relative h-20 w-28 flex-shrink-0 overflow-hidden rounded-2xl border border-white/8 bg-noir-card"
                  >
                    <Image
                      src={photo}
                      alt={`${photoAlt} (${i + 2})`}
                      fill
                      sizes="112px"
                      className="object-cover"
                    />
                  </div>
                ))}
            </div>
          )}
        </div>

        {/* ── Variant selector (shown only when multiple variants) ── */}
        {variants.length > 1 && (
          <div className="lux-panel p-5 md:p-6">
            <h2 className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-gold">
              {tp('model.variants', variants.length)}
            </h2>
            <div className="flex flex-col gap-2">
              {variants.map((v, i) => (
                <button
                  key={v._id}
                  type="button"
                  onClick={() => setSelectedIdx(i)}
                  className={`flex items-center justify-between gap-4 rounded-2xl border p-4 text-start transition-all ${
                    i === selectedIdx
                      ? 'border-gold/30 bg-gold/15 shadow-gold'
                      : 'border-white/8 bg-white/[0.02] hover:border-white/15'
                  }`}
                >
                  <div className="flex flex-wrap items-center gap-3 text-sm">
                    <CircleDot
                      className={`h-4 w-4 ${i === selectedIdx ? 'text-gold' : 'text-cream-faint'}`}
                    />
                    <span className="font-semibold text-cream">
                      {marque} {i + 1}
                    </span>
                    {v.couleur && (
                      <span className="text-cream-muted">{v.couleur}</span>
                    )}
                  </div>
                  <span className="whitespace-nowrap text-sm font-bold text-gold">
                    {formatCurrency(v.displayTarifJour)}{t('model.perDay')}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Vehicle info */}
        <div className="lux-panel p-6 md:p-7">
          <div className="space-y-3">
            <span className="lux-eyebrow">{t('model.eyebrow')}</span>
            <h2 className="text-2xl font-bold text-cream">{t('model.specs')}</h2>
            <p className="text-sm text-cream-muted">
              <span className="capitalize">{category}</span>
              {selected.couleur ? ` · ${selected.couleur}` : ''}
            </p>
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-6 text-sm text-cream-muted">
            <span className="flex items-center gap-1.5">
              <Users className="h-4 w-4 text-gold" /> {selected.places} {t('model.places')}
            </span>
            <span className="flex items-center gap-1.5">
              <Fuel className="h-4 w-4 text-gold" /> {fuelLabel(t, selected.carburant)}
            </span>
            <span className="flex items-center gap-1.5">
              <Gauge className="h-4 w-4 text-gold" /> {gearLabel(t, selected.transmission)}
            </span>
          </div>

          <div className="mt-7 grid gap-3 sm:grid-cols-2">
            <div className="lux-panel-muted p-5">
              <p className="text-xs uppercase tracking-[0.18em] text-cream-faint">
                {t('model.priceFrom')}
              </p>
              <p className="mt-2 text-3xl font-bold text-gold">
                {formatCurrency(modelMinTarif)}
                <span className="text-base font-normal text-cream-muted">
                  {t('model.perDay')}
                </span>
                {formatEurApprox(modelMinTarif, locale) && (
                  <span className="ms-2 whitespace-nowrap text-sm font-normal text-cream-faint">
                    {formatEurApprox(modelMinTarif, locale)}
                  </span>
                )}
              </p>
              <p className="mt-2 text-xs text-cream-faint">
                {t('model.minDuration')}
              </p>
            </div>
            <div className="lux-panel-muted p-5">
              <p className="text-xs uppercase tracking-[0.18em] text-cream-faint">
                {t('model.service')}
              </p>
              <p className="mt-2 flex items-center gap-2 text-sm font-medium text-cream">
                <ShieldCheck className="h-4 w-4 text-gold" /> {t('model.serviceDesc')}
              </p>
              {hasLongRate && (
                <p className="mt-2 text-xs text-cream-faint">
                  {t('model.longDuration')}
                </p>
              )}
            </div>
          </div>

          {/* La description est saisie en français dans la base. */}
          {locale === 'fr' && selected.description && (
            <p className="mt-6 text-sm leading-relaxed text-cream-muted">
              {selected.description}
            </p>
          )}
        </div>
      </div>

      {/* ── Right column: Reservation form or contact (sticky) ── */}
      <div className="lux-panel p-6 md:sticky md:top-28 md:p-7">
        <div className="mb-6 flex items-center justify-between gap-3">
          <div>
            <h2 className="flex items-center gap-2 text-lg font-semibold text-cream">
              <Calendar className="h-4 w-4 text-gold" /> {t('model.reservation')}
            </h2>
            <p className="mt-1 text-sm text-cream-faint">
              {name}
              {canBook && selected.couleur ? ` · ${selected.couleur}` : ''}
            </p>
          </div>
          <ArrowRight className="hidden h-5 w-5 text-gold md:block rtl:rotate-180" />
        </div>

        {canBook ? (
          <>
            <div className="mb-5 rounded-2xl border border-gold/15 bg-gold/5 p-4 text-sm text-cream-muted">
              {t('model.contactMsg')}
            </div>

            <PublicReservationForm
              key={selected._id}
              vehiculeId={selected._id}
              vehiculeSlug={selected.slug}
              redirectSlug={modelSlug}
              tarifJour={selected.tarifJour}
              tarifJour10Plus={selected.tarifJour10Plus}
              highSeason={highSeason}
              initialDu={initialDu}
              initialAu={initialAu}
            />
          </>
        ) : (
          <div className="space-y-5">
            <div className="rounded-2xl border border-gold/15 bg-gold/5 p-4">
              <p className="font-semibold text-gold">
                {hasDates ? t('model.unavailableDates') : t('model.rented')}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-cream-muted">
                {hasDates ? t('model.unavailableDatesHint') : t('model.rentedHint')}
              </p>
            </div>

            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#25D366] px-5 text-sm font-semibold text-white transition-colors hover:bg-[#20BD5A]"
            >
              <MessageCircle className="h-5 w-5" /> {t('model.whatsappCta')}
            </a>

            <ModelDateSearch modelSlug={modelSlug} initialDu={initialDu} initialAu={initialAu} />
          </div>
        )}
      </div>
    </div>
  );
}
