import type { CSSProperties } from 'react';
import { preload } from 'react-dom';
import { photoSrc, photoSrcSet, type PhotoSet } from '../home/showcaseData';

/** Bascule mobile / ordinateur des photos recadrées (même seuil que la mise en page, 1024 px). */
const MOBILE = '(max-width: 1023.98px)';
const DESKTOP = '(min-width: 1024px)';

/**
 * Photo plein cadre (fichiers déjà redimensionnés par scripts/export-photos.mjs) : <picture> avec AVIF puis
 * WebP, et, si la photo a un cadre portrait, une source dédiée au mobile. Composant serveur, aucun JavaScript.
 *
 * - `priority` : image du haut de page (LCP) : chargement immédiat, priorité haute, préchargée dans le <head>
 *   (un préchargement par cadre, chacun limité à sa largeur d'écran : le navigateur n'en télécharge qu'un).
 * - sinon : chargement paresseux, décodage asynchrone.
 * Le cadrage (object-fit: cover, object-position) suit `set.focus` ; la taille vient du conteneur (position absolue).
 */
export function CinemaPhoto({
  set,
  alt,
  sizes,
  mobileSizes,
  priority = false,
  className = '',
  imgClassName = '',
}: {
  set: PhotoSet;
  alt: string;
  /** Attribut sizes du cadre paysage (ordinateur). */
  sizes: string;
  /** Attribut sizes du cadre portrait (mobile), si la photo en a un. */
  mobileSizes?: string;
  priority?: boolean;
  className?: string;
  imgClassName?: string;
}) {
  const artDirected = Boolean(set.portrait && set.paysage);
  const mSizes = mobileSizes ?? sizes;

  if (priority) {
    if (artDirected) {
      preload(photoSrc(set, 'portrait'), {
        as: 'image',
        imageSrcSet: photoSrcSet(set, 'portrait', 'avif'),
        imageSizes: mSizes,
        type: 'image/avif',
        media: MOBILE,
        fetchPriority: 'high',
      });
      preload(photoSrc(set, 'paysage'), {
        as: 'image',
        imageSrcSet: photoSrcSet(set, 'paysage', 'avif'),
        imageSizes: sizes,
        type: 'image/avif',
        media: DESKTOP,
        fetchPriority: 'high',
      });
    } else {
      preload(photoSrc(set), {
        as: 'image',
        imageSrcSet: photoSrcSet(set, 'paysage', 'avif'),
        imageSizes: sizes,
        type: 'image/avif',
        fetchPriority: 'high',
      });
    }
  }

  const style = { objectPosition: set.focus ?? '50% 50%' } as CSSProperties;
  return (
    <picture className={className}>
      {artDirected && (
        <>
          <source media={MOBILE} type="image/avif" srcSet={photoSrcSet(set, 'portrait', 'avif')} sizes={mSizes} />
          <source media={MOBILE} type="image/webp" srcSet={photoSrcSet(set, 'portrait', 'webp')} sizes={mSizes} />
        </>
      )}
      <source type="image/avif" srcSet={photoSrcSet(set, 'paysage', 'avif')} sizes={sizes} />
      {/* <img> et non next/image : fichiers déjà redimensionnés (scripts/export-photos.mjs) */}
      <img
        src={photoSrc(set, 'paysage')}
        srcSet={photoSrcSet(set, 'paysage', 'webp')}
        sizes={sizes}
        alt={alt}
        loading={priority ? 'eager' : 'lazy'}
        decoding={priority ? undefined : 'async'}
        fetchPriority={priority ? 'high' : undefined}
        className={`cine-img ${imgClassName}`}
        style={style}
      />
    </picture>
  );
}
