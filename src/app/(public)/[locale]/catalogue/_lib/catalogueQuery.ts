import type { Types } from 'mongoose';
import { connectDB } from '@/lib/db';
import { toModelSlug } from '@/lib/utils';
import { Vehicle } from '@/models/Vehicle';

/**
 * Lecture du catalogue groupé par modèle, partagée par la page et par l'API du défilement infini.
 *
 * Règle d'affichage :
 * - sans dates, tous les modèles sont listés, les modèles entièrement loués en dernier ;
 * - avec des dates, seuls les modèles ayant une unité libre sur la plage sont listés.
 */
export type CatalogueModel = {
  modelSlug: string;
  marque: string;
  modele: string;
  count: number;
  countDispo: number;
  minTarif: number;
  minCaution: number;
  categorie?: string;
  places?: number;
  carburant?: string;
  transmission?: string;
  featuredPhoto: string | null;
};

type GroupedRow = {
  marques: string[];
  modeles: string[];
  count: number;
  countDispo: number;
  minTarif: number | null;
  minCaution: number | null;
  categorie?: string;
  places?: number;
  carburant?: string;
  boite?: string;
  backgroundPhoto?: string | null;
  photoModele?: string | null;
  firstPhoto?: string | null;
};

export type RawSearchParams = Record<string, string | string[] | undefined>;

/** `?type=a&type=b` donne un tableau : on ne garde que la première valeur. */
export function firstSearchValues(raw: RawSearchParams): Record<string, string> {
  const values: Record<string, string> = {};
  for (const [key, value] of Object.entries(raw)) {
    const first = Array.isArray(value) ? value[0] : value;
    if (first) values[key] = first;
  }
  return values;
}

export function normalizeFilterValue(value?: string | null): string {
  return value?.trim().toLowerCase().replace(/\s+/g, ' ') ?? '';
}

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/** « KIA SORENTO » et « Kia Sorento » sont le même modèle : on affiche la graphie la plus lisible. */
export function pickReadable(names: string[]): string {
  const lowercaseLetters = (name: string) => name.match(/\p{Ll}/gu)?.length ?? 0;
  return [...names].sort((a, b) => lowercaseLetters(b) - lowercaseLetters(a) || a.localeCompare(b))[0] ?? '';
}

export function buildCatalogueMatch(filters: {
  type?: string | null;
  marque?: string | null;
  q?: string | null;
}): Record<string, unknown> {
  const match: Record<string, unknown> = {
    actif: { $ne: false },
    isPublic: { $ne: false },
  };

  const type = filters.type?.trim();
  if (type) match.categorie = type;

  const marque = normalizeFilterValue(filters.marque);
  if (marque) {
    match.marque = { $regex: `^\\s*${escapeRegExp(marque)}\\s*$`, $options: 'i' };
  }

  const q = filters.q?.trim();
  if (q) match.$text = { $search: q };

  return match;
}

export async function queryGroupedCatalogue({
  match,
  busyObjectIds,
  skip,
  limit,
}: {
  match: Record<string, unknown>;
  /** Unités occupées sur la plage recherchée, `null` sans recherche par dates. */
  busyObjectIds: Types.ObjectId[] | null;
  skip: number;
  limit: number;
}): Promise<{ models: CatalogueModel[]; total: number }> {
  await connectDB();

  const hasDates = busyObjectIds !== null;
  const isFree = hasDates
    ? { $not: [{ $in: ['$_id', busyObjectIds] }] }
    : { $eq: ['$statut', 'disponible'] };

  // Sans dates, le prix affiché est celui du modèle (identique au titre de la fiche).
  // Avec des dates, c'est le prix le plus bas parmi les unités réellement libres.
  const pricedUnit = (field: string) => ({
    $cond: [
      hasDates ? { $and: [{ $eq: ['$isFree', 1] }, { $gt: [field, 0] }] } : { $gt: [field, 0] },
      field,
      null,
    ],
  });

  const [result] = await Vehicle.aggregate([
    { $match: match },
    {
      $addFields: {
        marqueNorm: { $toLower: { $trim: { input: { $ifNull: ['$marque', ''] } } } },
        modeleNorm: { $toLower: { $trim: { input: { $ifNull: ['$modele', ''] } } } },
        marqueDisplay: { $trim: { input: { $ifNull: ['$marque', ''] } } },
        modeleDisplay: { $trim: { input: { $ifNull: ['$modele', ''] } } },
        isFree: { $cond: [isFree, 1, 0] },
        tarifParJourSafe: { $ifNull: ['$tarifParJour', 0] },
        cautionDefautSafe: { $ifNull: ['$cautionDefaut', 0] },
      },
    },
    { $match: { marqueNorm: { $ne: '' }, modeleNorm: { $ne: '' } } },
    // Photo et caractéristiques du modèle : celles d'une unité libre en priorité.
    { $sort: { isFree: -1, tarifParJourSafe: 1 } },
    {
      $group: {
        _id: { marque: '$marqueNorm', modele: '$modeleNorm' },
        marques: { $addToSet: '$marqueDisplay' },
        modeles: { $addToSet: '$modeleDisplay' },
        count: { $sum: 1 },
        countDispo: { $sum: '$isFree' },
        minTarif: { $min: pricedUnit('$tarifParJourSafe') },
        minCaution: { $min: pricedUnit('$cautionDefautSafe') },
        categorie: { $first: '$categorie' },
        places: { $first: '$places' },
        carburant: { $first: '$carburant' },
        boite: { $first: '$boite' },
        backgroundPhoto: { $first: '$backgroundPhoto' },
        photoModele: { $first: '$photoModele' },
        firstPhoto: { $first: { $arrayElemAt: ['$photos', 0] } },
      },
    },
    ...(hasDates ? [{ $match: { countDispo: { $gt: 0 } } }] : []),
    { $addFields: { rentedOut: { $cond: [{ $gt: ['$countDispo', 0] }, 0, 1] } } },
    { $sort: { rentedOut: 1, minTarif: 1, '_id.marque': 1, '_id.modele': 1 } },
    {
      $facet: {
        rows: [{ $skip: skip }, { $limit: limit }],
        total: [{ $count: 'value' }],
      },
    },
  ]);

  const rows = (result?.rows ?? []) as GroupedRow[];
  const models = rows.map((row) => {
    const marque = pickReadable(row.marques);
    const modele = pickReadable(row.modeles);
    return {
      modelSlug: toModelSlug(marque, modele),
      marque,
      modele,
      count: row.count,
      countDispo: row.countDispo,
      minTarif: row.minTarif ?? 0,
      minCaution: row.minCaution ?? 0,
      categorie: row.categorie,
      places: row.places,
      carburant: row.carburant,
      transmission: row.boite,
      featuredPhoto: row.backgroundPhoto ?? row.photoModele ?? row.firstPhoto ?? null,
    };
  });

  return { models, total: result?.total?.[0]?.value ?? 0 };
}
