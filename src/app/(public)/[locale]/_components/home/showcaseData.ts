/**
 * PHOTOS DE L'ACCUEIL : la seule liste à modifier pour brancher, changer ou retirer une photo.
 *
 * Photos plein cadre (avec leur décor), exportées par `node scripts/export-photos.mjs <originaux>` dans
 * public/photos/<dossier>/<variante>-<largeur>.<avif|webp> (assombries et vignettées dans le fichier).
 * Un modèle absent de MODEL_PHOTOS, ou une entrée mise en commentaire, reprend automatiquement sa photo
 * détourée actuelle (PNG de la base) : rien d'autre à changer.
 *
 * Pour ajouter une photo :
 *  1. ajouter l'original dans le script d'export (recadrage, étalonnage) et le lancer ;
 *  2. ajouter ici une entrée `'slug-du-modele': { dir, paysage: { widths, ratio }, focus }` ;
 *  3. noter la source et la licence dans public/photos/CREDITS.txt.
 */

export type PhotoVariant = {
  /** Largeurs exportées, en pixels. */
  widths: readonly number[];
  /** Largeur / hauteur du fichier exporté. */
  ratio: number;
};

export type PhotoSet = {
  /** Dossier dans /public/photos. */
  dir: string;
  /** Cadre paysage (ordinateur, cartes, vitrine). */
  paysage?: PhotoVariant;
  /** Cadre resserré pour le mobile : sans lui, le paysage est recadré par object-fit (et inversement). */
  portrait?: PhotoVariant;
  /** Où se trouve le sujet dans la photo (object-position) : le recadrage automatique le garde à l'écran. */
  focus?: string;
  /** En arabe, retourner la photo (comme les photos détourées) pour que la voiture regarde le texte.
   *  À réserver aux photos sans lettrage ni logo lisible : une photo retournée inverse les inscriptions. */
  facesLeft?: boolean;
};

const SIZES_FULL = [768, 1280, 1920, 2560] as const;
const SIZES_CARD = [768, 1280] as const;

/** Photos par modèle (slug de la fiche /catalogue/<slug>). */
export const MODEL_PHOTOS: Record<string, PhotoSet> = {
  'porsche-macan': {
    dir: 'porsche-macan',
    paysage: { widths: SIZES_FULL, ratio: 1.5462 },
    portrait: { widths: SIZES_CARD, ratio: 1.25 },
    focus: '52% 56%',
  },
  'range-rover-sport': {
    dir: 'range-rover-sport',
    paysage: { widths: SIZES_FULL, ratio: 1.7778 },
    focus: '50% 55%',
  },
  'mercedes-e-220': {
    dir: 'mercedes-classe-e',
    // photo un peu molle : pas de fichier au-delà de 1920 px
    paysage: { widths: [768, 1280, 1920], ratio: 1.7778 },
    focus: '47% 55%',
  },
  'volkswagen-touareg': {
    dir: 'volkswagen-touareg',
    paysage: { widths: SIZES_CARD, ratio: 1.6786 },
    focus: '52% 55%',
  },
  'range-rover-evoque': {
    dir: 'range-rover-evoque',
    paysage: { widths: SIZES_CARD, ratio: 1.7797 },
    // voiture très large dans le cadre : on garde l'avant
    focus: '64% 60%',
  },
  'audi-q3': {
    dir: 'audi-q3',
    paysage: { widths: SIZES_CARD, ratio: 1.5319 },
    focus: '52% 55%',
  },
};

/** Haut de page de l'accueil : le modèle mis en scène. Sans photo, la photo détourée (cutout) est utilisée. */
export const HERO_MODEL = {
  slug: 'porsche-macan',
  cutout: '/porshe-macan.png?v=2',
} as const;

/** Photos d'ambiance du bandeau final (mosquée Hassan II) : paysage sur ordinateur, portrait sur mobile. */
export const AMBIANCE: { paysage: PhotoSet; portrait: PhotoSet } = {
  paysage: { dir: 'casablanca-crepuscule', paysage: { widths: SIZES_FULL, ratio: 1.8747 }, focus: '58% 62%' },
  portrait: { dir: 'casablanca-nuit', portrait: { widths: SIZES_CARD, ratio: 0.815 }, focus: '50% 40%' },
};

export function photoFor(slug: string | null | undefined): PhotoSet | null {
  return (slug && MODEL_PHOTOS[slug]) || null;
}

type VariantName = 'paysage' | 'portrait';

/** Variante demandée, ou l'autre si elle n'existe pas. */
function pickVariant(set: PhotoSet, wanted: VariantName): [VariantName, PhotoVariant] {
  const other: VariantName = wanted === 'paysage' ? 'portrait' : 'paysage';
  const variant = set[wanted] ?? set[other];
  if (!variant) throw new Error(`photo sans variante : ${set.dir}`);
  return [set[wanted] ? wanted : other, variant];
}

/** srcset d'une variante : « /photos/dir/paysage-768.avif 768w, … ». */
export function photoSrcSet(set: PhotoSet, wanted: VariantName, format: 'avif' | 'webp'): string {
  const [name, variant] = pickVariant(set, wanted);
  return variant.widths.map((w) => `/photos/${set.dir}/${name}-${w}.${format} ${w}w`).join(', ');
}

/** Fichier de repli (attribut src, WebP) : 1280 px, ou la plus grande largeur exportée. */
export function photoSrc(set: PhotoSet, wanted: VariantName = 'paysage'): string {
  const [name, variant] = pickVariant(set, wanted);
  const w = variant.widths.includes(1280) ? 1280 : variant.widths[variant.widths.length - 1];
  return `/photos/${set.dir}/${name}-${w}.webp`;
}

/** Proportions (largeur / hauteur) d'une variante. */
export function photoRatio(set: PhotoSet, wanted: VariantName = 'paysage'): number {
  return pickVariant(set, wanted)[1].ratio;
}
