import Image from 'next/image';
import Link from '@/lib/i18n/LocaleLink';
import { formatPrice } from '@/lib/format';
import { t as tr, type Locale } from '@/lib/i18n/translations';
import type { FleetModel } from '@/lib/seo/fleet';
import { formatEurApprox } from '@/lib/site';
import { categoryLabel, fuelLabel, gearLabel } from '../../catalogue/_lib/specLabels';

/** Données d'une carte, quelle que soit la source (flotte en cache ou catalogue filtré). */
export type CardVehicle = {
  slug: string;
  marque: string;
  modele: string;
  categorie?: string;
  places?: number;
  carburant?: string;
  boites?: string[];
  minTarif: number;
  available: boolean;
  photo: string | null;
};

export function cardFromFleet(model: FleetModel): CardVehicle {
  return {
    slug: model.slug,
    marque: model.marque,
    modele: model.modele,
    categorie: model.categorie,
    places: model.places,
    carburant: model.carburant,
    boites: model.boites,
    minTarif: model.minTarif,
    available: model.countDispo > 0,
    photo: model.photo,
  };
}

const DEFAULT_SIZES = '(min-width: 1280px) 280px, (min-width: 1024px) 23vw, (min-width: 640px) 45vw, 92vw';

/**
 * Carte véhicule unique du site public (accueil, catalogue, pages SEO, modèles similaires).
 * Composant serveur. Photo entière (object-contain), un seul lien par carte, étendu à toute la carte.
 *
 * - `full` : catégorie, caractéristiques, prix et bouton (Réserver si disponible, Voir le modèle sinon).
 * - `compact` : photo, nom, prix (pages SEO, modèles similaires).
 */
export function VehicleCard({
  vehicle,
  locale,
  headingLevel = 'h3',
  variant = 'full',
  href,
  hardNavigation = false,
  priority = false,
  eager = false,
  sizes = DEFAULT_SIZES,
  note,
}: {
  vehicle: CardVehicle;
  locale: Locale;
  headingLevel?: 'h2' | 'h3';
  variant?: 'full' | 'compact';
  /** Adresse de la fiche, sans langue (ajoutée par le lien). Par défaut, la fiche du modèle. */
  href?: string;
  /** Adresse avec paramètres (dates) : vraie navigation, voir CatalogueView. */
  hardNavigation?: boolean;
  priority?: boolean;
  eager?: boolean;
  sizes?: string;
  note?: React.ReactNode;
}) {
  const t = (key: string) => tr(locale, key);
  const H = headingLevel;
  const name = `${vehicle.marque} ${vehicle.modele}`;
  const target = href ?? `/catalogue/${vehicle.slug}`;
  const category = categoryLabel(t, vehicle.categorie);
  const eur = formatEurApprox(vehicle.minTarif, locale);
  const gear = (vehicle.boites ?? []).map((boite) => gearLabel(t, boite)).filter(Boolean).join(' / ');
  const specs = [
    vehicle.places ? t('ui.seats').replace('{count}', String(vehicle.places)) : '',
    fuelLabel(t, vehicle.carburant),
    gear,
  ].filter(Boolean);

  /* Le lien couvre toute la carte (pseudo-élément), mais il n'y a qu'un lien. */
  const stretch = "after:absolute after:inset-0 after:rounded-2xl after:content-['']";
  const LinkTag = hardNavigation ? 'a' : Link;
  const compact = variant === 'compact';

  return (
    <article className="card group relative flex h-full flex-col overflow-hidden transition-colors hover:border-gold/40">
      <div className="relative aspect-[10/7] bg-surface-2">
        {vehicle.photo ? (
          <Image
            src={vehicle.photo}
            alt={t('model.photoAlt').replace('{name}', name)}
            fill
            sizes={sizes}
            priority={priority}
            fetchPriority={priority ? 'high' : undefined}
            loading={priority || eager ? 'eager' : 'lazy'}
            className="object-contain p-2 sm:p-3"
          />
        ) : null}
        {category && <span className="chip absolute start-2.5 top-2.5">{category}</span>}
        {!vehicle.available && (
          <span className="chip absolute bottom-2.5 start-2.5 border-white/20 bg-noir-root text-cream">{t('ui.rented')}</span>
        )}
      </div>

      <div className={`flex flex-1 flex-col ${compact ? 'gap-2 p-3.5 sm:p-4' : 'gap-3 p-4'}`}>
        <H className={`${compact ? 'text-base' : 't-h3'} font-bold leading-snug text-cream`}>
          {compact ? (
            <LinkTag href={target} className={`${stretch} focus-visible:outline-none`}>
              <bdi>{name}</bdi>
            </LinkTag>
          ) : (
            <bdi>{name}</bdi>
          )}
        </H>

        {!compact && specs.length > 0 && <p className="text-sm text-cream-muted">{specs.join(' · ')}</p>}
        {note}

        {vehicle.minTarif > 0 && (
          <p className="mt-auto pt-1">
            <span className="text-sm text-cream-muted">{t('ui.from')} </span>
            <span className="whitespace-nowrap">
              <bdi className={compact ? 'text-lg font-extrabold text-gold-light' : 't-price'}>
                {formatPrice(vehicle.minTarif, locale)}
              </bdi>
              <span className="text-sm text-cream-muted">{t('ui.perDay')}</span>
            </span>
            {eur && <span className="block text-sm text-cream-faint">{eur}</span>}
          </p>
        )}

        {!compact && (
          <LinkTag
            href={target}
            className={`btn btn-block ${vehicle.available ? 'btn-primary' : 'btn-secondary'} ${stretch} mt-1`}
          >
            {vehicle.available ? t('ui.cardBook') : t('ui.cardSee')}
            <span className="sr-only"> : {name}</span>
          </LinkTag>
        )}
      </div>
    </article>
  );
}
