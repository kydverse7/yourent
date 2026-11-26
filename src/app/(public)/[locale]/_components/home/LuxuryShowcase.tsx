import type { CSSProperties, ReactNode } from 'react';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import Link from '@/lib/i18n/LocaleLink';
import { formatPrice } from '@/lib/format';
import { t as tr, type Locale } from '@/lib/i18n/translations';
import type { FleetModel } from '@/lib/seo/fleet';
import { formatEurApprox } from '@/lib/site';
import { fuelLabel, gearLabel } from '../../catalogue/_lib/specLabels';
import { CinemaPhoto } from '../ui/CinemaPhoto';
import { photoFor, type PhotoSet } from './showcaseData';

/**
 * VITRINE DE LUXE — scène épinglée : une voiture à la fois.
 *
 * Deux rendus par modèle, choisis par home/showcaseData.ts :
 * - photo plein cadre (avec son décor) : cadre qui déborde jusqu'au bord de l'écran, fondu dans le noir
 *   côté texte ; la voiture suivante entre par un volet (clip-path), chaque photo avance lentement (zoom)
 *   et glisse en parallaxe, avec une légère profondeur 3D ;
 * - photo détourée (repli, si aucune photo n'est déclarée) : perspective, rotation légère pilotée par le
 *   défilement, plateau au sol qui tourne, reflet, halo, nom de la marque en très grand à l'arrière-plan.
 * La scène est haute de `--stage-h × (1 + n × 0.8)` : son contenu reste épinglé sous l'en-tête pendant
 * que les voitures se succèdent. Sans animation-timeline, ou avec « mouvement réduit », elle n'est pas
 * épinglée : les voitures sont côte à côte (rangée à faire glisser en mobile).
 */
export type ShowcaseModel = {
  slug: string;
  /** « Porsche Macan » */
  name: string;
  /** Mot écrit en très grand derrière la voiture : la marque par défaut. */
  word: string;
  /** Photo détourée. Sert aussi au reflet. */
  image: string | null;
  /** Photo plein cadre : prioritaire sur la photo détourée. */
  photo: PhotoSet | null;
  /** Hauteur du sol dans la photo (0 = haut, 1 = bas) : là où posent les roues. */
  floor?: number;
  /** Tarif par jour en dirhams ; 0 : le prix n'est pas affiché. */
  price: number;
  /** « 5 places · Diesel · Automatique » */
  specs?: string;
  available: boolean;
};

/** Position du sol dans les photos actuelles (mesurée sur les fichiers) ; 0,84 pour les autres. */
const FLOOR_BY_SLUG: Record<string, number> = {
  'porsche-macan': 0.855,
  'range-rover-sport': 0.865,
  'range-rover-evoque': 0.835,
  'mercedes-e-220': 0.79,
  'mercedes-c-220': 0.82,
  'mercedes-cla': 0.82,
  'volkswagen-touareg': 0.87,
};

export function showcaseFromFleet(model: FleetModel, locale: Locale): ShowcaseModel {
  const t = (key: string) => tr(locale, key);
  const gear = model.boites.map((boite) => gearLabel(t, boite)).filter(Boolean).join(' / ');
  const specs = [
    model.places ? t('ui.seats').replace('{count}', String(model.places)) : '',
    fuelLabel(t, model.carburant),
    gear,
  ].filter(Boolean);
  return {
    slug: model.slug,
    name: `${model.marque} ${model.modele}`,
    word: model.marque,
    image: model.photo,
    photo: photoFor(model.slug),
    floor: FLOOR_BY_SLUG[model.slug],
    price: model.minTarif,
    specs: specs.join(' · '),
    available: model.countDispo > 0,
  };
}

const SIZES = '(min-width: 1280px) 640px, (min-width: 1024px) 52vw, 92vw';
/** Cadre photo : jusqu'au bord de l'écran sur ordinateur (≈ 62 % de la largeur), toute la largeur en mobile. */
const PHOTO_SIZES = '(min-width: 1024px) 64vw, 100vw';

export function LuxuryShowcase({
  locale,
  models,
  id,
  eyebrow,
  title,
  text,
  action,
}: {
  locale: Locale;
  models: ShowcaseModel[];
  /** id du H2 de la section. */
  id: string;
  eyebrow?: string;
  title: string;
  text?: string;
  action?: ReactNode;
}) {
  if (models.length === 0) return null;
  const t = (key: string) => tr(locale, key);
  const count = models.length;
  const pad = (value: number) => String(value).padStart(2, '0');

  return (
    <section className="showcase" aria-labelledby={id} style={{ '--n': count } as CSSProperties}>
      <div className="showcase-pin">
        <div className="lux-container showcase-head">
          <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-2">
            <div className="min-w-0">
              {eyebrow && <p className="t-eyebrow">{eyebrow}</p>}
              <h2 id={id} className={`t-h2 prose-col ${eyebrow ? 'mt-3' : ''}`}>
                {title}
              </h2>
              {text && <p className="t-body prose-col mt-3">{text}</p>}
            </div>
            {action && <div className="shrink-0">{action}</div>}
          </div>
          <div className="showcase-ticks mt-4" aria-hidden="true">
            {models.map((model, index) => (
              <span key={model.slug} className="showcase-tick" style={{ '--i': index } as CSSProperties} />
            ))}
          </div>
        </div>

        <div className="lux-container showcase-body">
          <ol className="showcase-stage">
            {models.map((model, index) => {
              const eur = formatEurApprox(model.price, locale);
              return (
                <li
                  key={model.slug}
                  className={`showcase-item ${model.photo ? 'has-photo' : ''}`}
                  style={{ '--i': index } as CSSProperties}
                >
                  <div className="showcase-car">
                    {model.photo ? (
                      <div className={`showcase-shot ${model.photo.facesLeft ? 'faces-left' : ''}`}>
                        <div className="showcase-shot-in">
                          <CinemaPhoto
                            set={model.photo}
                            alt={t('model.photoAlt').replace('{name}', model.name)}
                            sizes={PHOTO_SIZES}
                            className="showcase-shot-pic"
                          />
                        </div>
                        <span className="showcase-shot-shade" aria-hidden="true" />
                      </div>
                    ) : (
                      <div
                        className="showcase-visual"
                        style={{ '--floor': model.floor ?? 0.84, '--chars': Math.max(6, model.word.length) } as CSSProperties}
                      >
                        <span className="showcase-word" aria-hidden="true">
                          {model.word}
                        </span>
                        <span className="showcase-floor" aria-hidden="true">
                          <span className="showcase-ring" />
                        </span>
                        {model.image && (
                          <>
                            <span className="showcase-reflet" aria-hidden="true">
                              <Image src={model.image} alt="" fill sizes={SIZES} loading="lazy" className="object-contain" />
                            </span>
                            <div className="showcase-media">
                              <Image
                                src={model.image}
                                alt={t('model.photoAlt').replace('{name}', model.name)}
                                fill
                                sizes={SIZES}
                                loading="lazy"
                                className="object-contain"
                              />
                            </div>
                          </>
                        )}
                      </div>
                    )}
                  </div>

                  <div className="showcase-info">
                    <p className="showcase-index" aria-hidden="true">
                      <bdi dir="ltr">
                        {pad(index + 1)} / {pad(count)}
                      </bdi>
                    </p>
                    <h3 className="showcase-name">
                      <bdi>{model.name}</bdi>
                    </h3>
                    {model.specs && <p className="t-small">{model.specs}</p>}
                    {model.price > 0 && (
                      <p className="flex flex-wrap items-baseline gap-x-2">
                        <span className="text-sm text-cream-muted">{t('ui.from')}</span>
                        <span className="whitespace-nowrap">
                          <bdi className="t-price text-[2rem]">{formatPrice(model.price, locale)}</bdi>
                          <span className="text-sm text-cream-muted">{t('ui.perDay')}</span>
                        </span>
                        {eur && <span className="text-sm text-cream-faint">{eur}</span>}
                      </p>
                    )}
                    <Link
                      href={`/catalogue/${model.slug}`}
                      className={`btn mt-1 ${model.available ? 'btn-primary' : 'btn-secondary'}`}
                    >
                      {model.available ? t('ui.cardBook') : t('ui.cardSee')}
                      <span className="sr-only"> : {model.name}</span>
                      <ArrowRight className="h-5 w-5 rtl:-scale-x-100" aria-hidden="true" />
                    </Link>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
