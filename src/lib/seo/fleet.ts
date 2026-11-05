import { unstable_cache } from 'next/cache';
import { connectDB } from '@/lib/db';
import { toModelSlug } from '@/lib/utils';
import { Vehicle } from '@/models/Vehicle';
import { Client } from '@/models/Client';

/** Un modèle de la flotte publique, toutes unités confondues. */
export type FleetModel = {
  slug: string;
  marque: string;
  modele: string;
  categorie: string;
  carburant: string;
  /** Boîtes disponibles pour ce modèle (certains modèles existent dans les deux). */
  boites: string[];
  places: number;
  /** Tarif par jour le plus bas, de 5 à 10 jours. */
  minTarif: number;
  /** Tarif par jour le plus bas au-delà de 10 jours. */
  minTarifLong: number;
  /** Caution la plus basse renseignée, 0 si aucune n'est renseignée. */
  minCaution: number;
  count: number;
  countDispo: number;
  photo: string | null;
  updatedAt: string;
};

export type FleetStats = {
  vehicleCount: number;
  modelCount: number;
  minPrice: number;
  maxPrice: number;
  clientCount: number;
};

type VehicleRow = {
  marque?: string;
  modele?: string;
  categorie?: string;
  carburant?: string;
  boite?: string;
  places?: number;
  statut?: string;
  tarifParJour?: number;
  tarifParJour10Plus?: number;
  cautionDefaut?: number;
  backgroundPhoto?: string | null;
  photoModele?: string | null;
  photos?: string[];
  updatedAt?: Date;
};

/** « KIA SORENTO » et « Kia Sorento » sont le même modèle : on garde la graphie la plus lisible. */
function preferReadable(current: string, next: string): string {
  const isShouting = (value: string) => value === value.toUpperCase();
  return isShouting(current) && !isShouting(next) ? next : current;
}

function groupModels(rows: VehicleRow[]): FleetModel[] {
  const models = new Map<string, FleetModel>();

  for (const row of rows) {
    const marque = row.marque?.trim();
    const modele = row.modele?.trim();
    if (!marque || !modele) continue;

    const slug = toModelSlug(marque, modele);
    const tarif = Number(row.tarifParJour ?? 0);
    const tarifLong = Number(row.tarifParJour10Plus ?? 0) || tarif;
    const caution = Number(row.cautionDefaut ?? 0);
    const photo = row.backgroundPhoto ?? row.photoModele ?? row.photos?.[0] ?? null;
    const updatedAt = (row.updatedAt ?? new Date(0)).toISOString();
    const existing = models.get(slug);

    if (!existing) {
      models.set(slug, {
        slug,
        marque,
        modele,
        categorie: row.categorie ?? '',
        carburant: row.carburant ?? '',
        boites: row.boite ? [row.boite] : [],
        places: row.places ?? 0,
        minTarif: tarif,
        minTarifLong: tarifLong,
        minCaution: caution,
        count: 1,
        countDispo: row.statut === 'disponible' ? 1 : 0,
        photo,
        updatedAt,
      });
      continue;
    }

    existing.marque = preferReadable(existing.marque, marque);
    existing.modele = preferReadable(existing.modele, modele);
    if (row.boite && !existing.boites.includes(row.boite)) existing.boites.push(row.boite);
    if (tarif > 0 && (existing.minTarif === 0 || tarif < existing.minTarif)) existing.minTarif = tarif;
    if (tarifLong > 0 && (existing.minTarifLong === 0 || tarifLong < existing.minTarifLong)) {
      existing.minTarifLong = tarifLong;
    }
    if (caution > 0 && (existing.minCaution === 0 || caution < existing.minCaution)) {
      existing.minCaution = caution;
    }
    existing.count += 1;
    if (row.statut === 'disponible') existing.countDispo += 1;
    existing.photo = existing.photo ?? photo;
    if (updatedAt > existing.updatedAt) existing.updatedAt = updatedAt;
  }

  return [...models.values()].sort((a, b) => a.minTarif - b.minTarif);
}

/**
 * Toute la flotte publique groupée par modèle, mise en cache 5 minutes.
 * Un modèle entièrement loué reste dans la liste : ses pages restent en ligne.
 * Si la base ne répond pas, renvoie une liste vide plutôt que de casser la page.
 */
export const getFleetModels = unstable_cache(
  async (): Promise<FleetModel[]> => {
    try {
      await connectDB();
      const rows = await Vehicle.find({ actif: { $ne: false }, isPublic: { $ne: false } })
        .select(
          'marque modele categorie carburant boite places statut tarifParJour tarifParJour10Plus cautionDefaut backgroundPhoto photoModele photos updatedAt',
        )
        .lean<VehicleRow[]>();
      return groupModels(rows);
    } catch (error) {
      console.error('[fleet] lecture de la flotte impossible', error);
      return [];
    }
  },
  ['seo-fleet-models'],
  { revalidate: 300, tags: ['fleet'] },
);

export const getFleetStats = unstable_cache(
  async (): Promise<FleetStats> => {
    const models = await getFleetModels();
    const prices = models.map((model) => model.minTarif).filter((price) => price > 0);
    let clientCount = 0;
    try {
      await connectDB();
      clientCount = await Client.estimatedDocumentCount();
    } catch (error) {
      console.error('[fleet] lecture du nombre de clients impossible', error);
    }
    return {
      vehicleCount: models.reduce((total, model) => total + model.count, 0),
      modelCount: models.length,
      minPrice: prices.length > 0 ? Math.min(...prices) : 0,
      maxPrice: prices.length > 0 ? Math.max(...prices) : 0,
      clientCount,
    };
  },
  ['seo-fleet-stats'],
  { revalidate: 3600, tags: ['fleet'] },
);

export type FleetFilter = {
  categories?: string[];
  marques?: string[];
  boite?: string;
  models?: string[];
  maxPrice?: number;
  sort?: 'asc' | 'desc';
  limit?: number;
};

export function filterFleet(models: FleetModel[], filter: FleetFilter | undefined): FleetModel[] {
  if (!filter) return [];
  const marques = filter.marques?.map((marque) => marque.toLowerCase());
  const selected = models.filter((model) => {
    if (filter.categories && !filter.categories.includes(model.categorie)) return false;
    if (marques && !marques.includes(model.marque.toLowerCase())) return false;
    if (filter.boite && !model.boites.includes(filter.boite)) return false;
    if (filter.models && !filter.models.includes(model.slug)) return false;
    if (filter.maxPrice && model.minTarif > filter.maxPrice) return false;
    return true;
  });
  const sorted = [...selected].sort((a, b) =>
    filter.sort === 'desc' ? b.minTarif - a.minTarif : a.minTarif - b.minTarif,
  );
  return filter.limit ? sorted.slice(0, filter.limit) : sorted;
}
