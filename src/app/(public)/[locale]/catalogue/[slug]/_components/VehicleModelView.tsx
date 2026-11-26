'use client';

import { useState, type CSSProperties, type ReactNode } from 'react';
import Image from 'next/image';
import { Calendar, Check, CircleDot, Fuel, Gauge, Users } from 'lucide-react';
import { formatPrice } from '@/lib/format';
import { useLocale } from '@/lib/i18n';
import { BUSINESS } from '@/lib/site';
import { categoryLabel, fuelLabel, gearLabel } from '../../_lib/specLabels';
import { PublicToaster } from '../../../_components/PublicToaster';
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
  marque: string;
  modele: string;
  highSeason?: boolean;
  initialDu?: string;
  initialAu?: string;
  /** Phrase d'introduction (serveur), sous les boutons : le premier écran mobile garde photo et actions. */
  intro?: ReactNode;
  /** Texte, tarifs, FAQ… rendus par le serveur, dans la colonne de gauche sur ordinateur. */
  children?: ReactNode;
};

function WhatsAppGlyph() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden="true" focusable="false">
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.9 9.9 0 0 0 4.74 1.21h.01c5.46 0 9.9-4.45 9.9-9.91A9.86 9.86 0 0 0 12.04 2Zm5.8 14.06c-.24.68-1.42 1.3-1.95 1.38-.5.07-1.13.1-1.82-.12-.42-.13-.96-.31-1.65-.61-2.9-1.25-4.8-4.18-4.94-4.37-.14-.19-1.18-1.57-1.18-3s.75-2.13 1.02-2.42c.27-.29.58-.36.78-.36h.56c.18 0 .42-.07.65.5.24.58.82 2 .89 2.15.07.14.12.31.02.5-.1.19-.14.31-.29.48-.14.17-.3.37-.43.5-.14.14-.29.3-.13.58.17.29.74 1.22 1.59 1.98 1.09.97 2.01 1.27 2.3 1.41.28.14.45.12.62-.07.17-.19.71-.83.9-1.11.19-.29.38-.24.64-.14.26.1 1.67.79 1.96.93.29.14.48.21.55.33.07.12.07.69-.17 1.37Z" />
    </svg>
  );
}

/**
 * Fiche : photo entière, caractéristiques, boutons, puis le formulaire (#reservation).
 * Mobile : photo, résumé, formulaire, puis le texte. Ordinateur : formulaire collant à droite, aligné sur la photo.
 */
export function VehicleModelView({
  variants,
  fallbackUnit,
  modelSlug,
  marque,
  modele,
  highSeason = false,
  initialDu,
  initialAu,
  intro,
  children,
}: Props) {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const selected = variants[selectedIdx] ?? variants[0] ?? fallbackUnit;
  const canBook = variants.length > 0;
  const hasDates = Boolean(initialDu && initialAu);
  const { t, tp, locale } = useLocale();

  const name = `${marque} ${modele}`;
  const photoAlt = t('model.h1').replace('{name}', name);
  const whatsappHref = `${BUSINESS.whatsappUrl}?text=${encodeURIComponent(t('model.waMessage').replace('{name}', name))}`;
  const category = categoryLabel(t, selected.categorie);
  const specs = [
    { icon: Users, text: t('ui.seats').replace('{count}', String(selected.places)) },
    { icon: Fuel, text: fuelLabel(t, selected.carburant) },
    { icon: Gauge, text: gearLabel(t, selected.transmission) },
  ].filter((spec) => spec.text);
  const included = [t('model.included1'), t('model.included2'), t('model.included3')];

  return (
    /* Une colonne en mobile, mais bornée à la largeur de l'écran (minmax(0, 1fr)) : sans cela, la largeur
       minimale du formulaire (deux champs de date côte à côte) élargissait la page de 33 px à 360 px. */
    <div className="grid grid-cols-[minmax(0,1fr)] gap-8 lg:grid-cols-[minmax(0,1fr)_400px] lg:gap-x-10 xl:grid-cols-[minmax(0,1fr)_420px]">
      {/* ── Photo et résumé ── */}
      <div className="min-w-0 space-y-5">
        <div className="car-stage relative aspect-[10/7] overflow-hidden rounded-[20px] border border-white/[0.08]">
          {selected.featuredPhoto ? (
            <Image
              src={selected.featuredPhoto}
              alt={photoAlt}
              fill
              priority
              fetchPriority="high"
              sizes="(min-width: 1280px) 720px, (min-width: 1024px) 58vw, 100vw"
              className="px object-contain p-3 sm:p-6"
              style={{ '--px': '1rem' } as CSSProperties}
            />
          ) : null}
          {(category || selected.couleur) && (
            <div className="absolute start-3 top-3 flex flex-wrap gap-1.5">
              {category && <span className="chip">{category}</span>}
              {selected.couleur && <span className="chip">{selected.couleur}</span>}
            </div>
          )}
        </div>

        {selected.photos.length > 1 && (
          <ul className="flex gap-3 overflow-x-auto">
            {selected.photos
              .filter((photo) => photo !== selected.featuredPhoto)
              .slice(0, 3)
              .map((photo, i) => (
                <li key={photo} className="relative h-20 w-28 shrink-0 overflow-hidden rounded-xl border border-white/[0.08] bg-surface-2">
                  <Image src={photo} alt={`${photoAlt} (${i + 2})`} fill sizes="112px" className="object-contain p-1" />
                </li>
              ))}
          </ul>
        )}

        <ul className="page-in flex flex-wrap gap-2" style={{ '--in': 1 } as CSSProperties}>
          {specs.map(({ icon: Icon, text }) => (
            <li key={text} className="chip min-h-10 px-3.5 text-sm">
              <Icon className="h-4 w-4 text-gold" aria-hidden="true" />
              {text}
            </li>
          ))}
        </ul>

        <div className="grid gap-3 sm:grid-cols-2">
          <a href="#reservation" className="btn btn-primary">
            <Calendar className="h-5 w-5" aria-hidden="true" />
            {t('ui.request')}
          </a>
          <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className="btn btn-wa">
            <WhatsAppGlyph />
            {t('ui.ask')}
          </a>
        </div>

        {intro}

        {variants.length > 1 && (
          <fieldset className="card p-4 sm:p-5">
            <legend className="sr-only">{tp('model.variants', variants.length)}</legend>
            <p className="mb-3 text-[0.9375rem] font-semibold text-cream" aria-hidden="true">
              {tp('model.variants', variants.length)}
            </p>
            <div className="flex flex-col gap-2">
              {variants.map((v, i) => (
                <button
                  key={v._id}
                  type="button"
                  onClick={() => setSelectedIdx(i)}
                  aria-pressed={i === selectedIdx}
                  className={`flex min-h-12 items-center justify-between gap-4 rounded-xl border px-4 py-3 text-start transition-colors ${
                    i === selectedIdx ? 'border-gold/60 bg-gold/10' : 'border-white/10 hover:border-white/25'
                  }`}
                >
                  <span className="flex flex-wrap items-center gap-3 text-[0.9375rem]">
                    <CircleDot className={`h-4 w-4 ${i === selectedIdx ? 'text-gold' : 'text-cream-faint'}`} aria-hidden="true" />
                    <span className="font-semibold text-cream">
                      {marque} {i + 1}
                    </span>
                    {v.couleur && <span className="text-cream-muted">{v.couleur}</span>}
                  </span>
                  <bdi className="whitespace-nowrap font-bold text-gold-light">
                    {formatPrice(v.displayTarifJour, locale)}
                    {t('model.perDay')}
                  </bdi>
                </button>
              ))}
            </div>
          </fieldset>
        )}

        <section aria-labelledby="model-included" className="card p-5">
          <h2 id="model-included" className="t-h3">
            {t('ui.included')}
          </h2>
          <ul className="mt-3 space-y-2.5">
            {included.map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-[0.9375rem] text-cream-muted">
                <Check className="mt-0.5 h-5 w-5 shrink-0 text-gold" aria-hidden="true" /> {item}
              </li>
            ))}
          </ul>
          {/* La description est saisie en français dans la base. */}
          {locale === 'fr' && selected.description && <p className="t-small mt-4">{selected.description}</p>}
        </section>
      </div>

      {/* ── Formulaire : ancre de la barre d'action et du bouton « Demander ce véhicule » ── */}
      <aside id="reservation" className="min-w-0 scroll-mt-20 lg:col-start-2 lg:row-span-2 lg:row-start-1">
        <div className="card p-5 sm:p-6 lg:sticky lg:top-24">
          <h2 className="flex items-center gap-2 text-xl font-bold text-cream">
            <Calendar className="h-5 w-5 text-gold" aria-hidden="true" /> {t('model.reservation')}
          </h2>
          <p className="mt-1 text-[0.9375rem] text-cream-muted">
            <bdi>{name}</bdi>
            {canBook && selected.couleur ? ` · ${selected.couleur}` : ''}
          </p>

          {canBook ? (
            <div className="mt-5">
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
            </div>
          ) : (
            <div className="mt-5 space-y-5">
              <div className="rounded-xl border border-gold/25 bg-gold/[0.06] p-4">
                <p className="font-semibold text-gold-light">{hasDates ? t('model.unavailableDates') : t('model.rented')}</p>
                <p className="t-small mt-2">{hasDates ? t('model.unavailableDatesHint') : t('model.rentedHint')}</p>
              </div>
              <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className="btn btn-wa btn-block">
                <WhatsAppGlyph /> {t('model.whatsappCta')}
              </a>
              <ModelDateSearch modelSlug={modelSlug} initialDu={initialDu} initialAu={initialAu} />
            </div>
          )}
        </div>
      </aside>

      {children && <div className="min-w-0 lg:col-start-1">{children}</div>}
      {/* Notifications du formulaire : react-hot-toast n'est chargé que sur les fiches. */}
      <PublicToaster />
    </div>
  );
}
