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
} from 'lucide-react';
import { formatCurrency } from '@/lib/utils';
import { useLocale } from '@/lib/i18n';
import PublicReservationForm from './PublicReservationForm';

type Variant = {
  _id: string;
  slug: string;
  marque: string;
  modele: string;
  annee?: number;
  couleur?: string;
  kilometrage: number;
  carburant: string;
  transmission: string;
  places: number;
  categorie: string;
  options: string[];
  description?: string;
  photos: string[];
  featuredPhoto: string | null;
  tarifJour: number;
  tarifJour10Plus: number;
  displayTarifJour: number;
};

type Props = {
  variants: Variant[];
  modelSlug: string;
  modelMinTarif: number;
  marque: string;
  modele: string;
  categorie: string;
  carburant: string;
  transmission: string;
  places: number;
};

export function VehicleModelView({
  variants,
  modelSlug,
  modelMinTarif,
  marque,
  modele,
  categorie,
  carburant,
  transmission,
  places,
}: Props) {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const selected = variants[selectedIdx];
  const { t, tp } = useLocale();

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
                alt={`${marque} ${modele} — location Casablanca`}
                fill
                className="object-cover"
              />
            ) : (
              <div className="flex h-full items-center justify-center text-6xl text-gold/20">
                🚗
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
            <div className="absolute bottom-5 left-5 flex items-center gap-2">
              <span className="rounded-full border border-gold/20 bg-black/35 px-4 py-2 text-xs uppercase tracking-[0.16em] text-gold capitalize">
                {categorie}
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
                    <Image src={photo} alt="" fill className="object-cover" />
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
                  className={`flex items-center justify-between gap-4 rounded-2xl border p-4 text-left transition-all ${
                    i === selectedIdx
                      ? 'border-gold/40 bg-gold/10'
                      : 'border-white/8 bg-white/[0.02] hover:border-white/15'
                  }`}
                >
                  <div className="flex flex-wrap items-center gap-3 text-sm">
                    <CircleDot
                      className={`h-4 w-4 ${i === selectedIdx ? 'text-gold' : 'text-cream-faint'}`}
                    />
                    <span className="font-semibold text-cream">
                      {v.annee ?? '—'}
                    </span>
                    {v.couleur && (
                      <span className="text-cream-muted">{v.couleur}</span>
                    )}
                    <span className="text-cream-faint">
                      {v.kilometrage.toLocaleString('fr-FR')} km
                    </span>
                  </div>
                  <span className="whitespace-nowrap text-sm font-bold text-gold">
                    {formatCurrency(v.displayTarifJour)}/j
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
            <h1 className="lux-title-sm">
              {marque} {modele}
            </h1>
            <p className="text-sm text-cream-muted">
              {selected.annee} ·{' '}
              <span className="capitalize">{categorie}</span>
              {selected.couleur ? ` · ${selected.couleur}` : ''}
              {` · ${selected.kilometrage.toLocaleString('fr-FR')} km`}
            </p>
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-6 text-sm text-cream-muted">
            <span className="flex items-center gap-1.5">
              <Users className="h-4 w-4 text-gold" /> {places} {t('model.places')}
            </span>
            <span className="flex items-center gap-1.5">
              <Fuel className="h-4 w-4 text-gold" /> {carburant}
            </span>
            <span className="flex items-center gap-1.5">
              <Gauge className="h-4 w-4 text-gold" /> {transmission}
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
              <p className="mt-2 text-xs text-cream-faint">
                {t('model.longDuration')}
              </p>
            </div>
          </div>

          {selected.description && (
            <p className="mt-6 text-sm leading-relaxed text-cream-muted">
              {selected.description}
            </p>
          )}
        </div>
      </div>

      {/* ── Right column: Reservation form (sticky) ── */}
      <div className="lux-panel p-6 md:sticky md:top-28 md:p-7">
        <div className="mb-6 flex items-center justify-between gap-3">
          <div>
            <h2 className="flex items-center gap-2 text-lg font-semibold text-cream">
              <Calendar className="h-4 w-4 text-gold" /> {t('model.reservation')}
            </h2>
            <p className="mt-1 text-sm text-cream-faint">
              {marque} {modele}
              {selected.annee ? ` ${selected.annee}` : ''}
              {selected.couleur ? ` · ${selected.couleur}` : ''}
            </p>
          </div>
          <ArrowRight className="hidden h-5 w-5 text-gold md:block" />
        </div>

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
        />
      </div>
    </div>
  );
}
