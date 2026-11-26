import type { FleetModel } from '@/lib/seo/fleet';

/*
 * Choix des modèles mis en avant sur l'accueil, lus dans la flotte en cache (getFleetModels) :
 * aucune requête de plus, et les prix sont ceux de la base.
 */
const ECONOMIC: [string, string][] = [
  ['fiat', '500'],
  ['fiat', '500 cabriolet'],
  ['opel', 'corsa'],
  ['dacia', 'duster'],
];

const SEDANS_SUVS: [string, string][] = [
  ['volkswagen', 't-roc'],
  ['volkswagen', 'tiguan'],
  ['audi', 'a3'],
  ['toyota', 'corolla'],
];

const LUXURY: [string, string][] = [
  ['kia', 'sorento'],
  ['porsche', 'macan'],
  ['volkswagen', 'touareg'],
  ['range rover', 'evoque'],
  ['range rover', 'sport'],
  ['mercedes', 'cla'],
  ['mercedes', 'e 220'],
  ['audi', 'q3'],
  ['volkswagen', 'golf'],
];

/** Modèle présenté comme « nouvel arrivage » dans la rangée luxe. */
export const NEW_ARRIVAL: [string, string] = ['kia', 'sorento'];

const nameOf = (model: FleetModel) => `${model.marque} ${model.modele}`.toLowerCase();

function pick(models: FleetModel[], used: Set<string>, [marque, modele]: [string, string]) {
  const candidates = models.filter((model) => {
    const name = nameOf(model);
    return !used.has(model.slug) && name.includes(marque) && name.includes(modele);
  });
  const exact = `${marque} ${modele}`;
  const ranked = [...candidates].sort(
    (a, b) =>
      Number(nameOf(b) === exact) - Number(nameOf(a) === exact) ||
      Number(b.minTarif > 0 && Boolean(b.photo)) - Number(a.minTarif > 0 && Boolean(a.photo)),
  );
  return ranked[0];
}

function take(models: FleetModel[], used: Set<string>, targets: [string, string][], fill?: (model: FleetModel) => boolean, size = 4) {
  const chosen: FleetModel[] = [];
  for (const target of targets) {
    const model = pick(models, used, target);
    if (!model) continue;
    used.add(model.slug);
    chosen.push(model);
  }
  // Modèle absent de la base : on complète avec les modèles les moins chers de la même gamme.
  if (fill) {
    for (const model of models) {
      if (chosen.length >= size) break;
      if (used.has(model.slug) || !fill(model) || !(model.minTarif > 0)) continue;
      used.add(model.slug);
      chosen.push(model);
    }
  }
  return chosen;
}

export function selectHomeModels(models: FleetModel[]) {
  const used = new Set<string>();
  const economic = take(models, used, ECONOMIC, (model) => model.categorie === 'economique');
  const sedans = take(models, used, SEDANS_SUVS, (model) => model.categorie === 'berline' || model.categorie === 'suv');
  const luxury = take(models, used, LUXURY);
  const newArrival = luxury.find((model) => {
    const name = nameOf(model);
    return name.includes(NEW_ARRIVAL[0]) && name.includes(NEW_ARRIVAL[1]);
  });
  return { economic, sedans, luxury, newArrivalSlug: newArrival?.slug ?? null };
}
