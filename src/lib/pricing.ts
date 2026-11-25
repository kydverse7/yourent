import { differenceInDays } from 'date-fns';
import { PALIERS } from './constants';

// Module léger, importé par le formulaire public de réservation.
export function calcNbJours(debut: Date, fin: Date): number {
  return Math.max(1, differenceInDays(new Date(fin), new Date(debut)));
}

export type TarifPalier = 'standard' | '10Plus';

export function calcPalier(nbJours: number, opts?: { forceStandard?: boolean }): TarifPalier {
  if (!opts?.forceStandard && nbJours >= PALIERS.LONG.min) return '10Plus';
  return 'standard';
}

export function calcTarifTotal(
  nbJours: number,
  tarifParJour: number,
  tarifParJour10Plus = 0,
  opts?: { forceStandard?: boolean }
): { palier: TarifPalier; tarifJour: number; total: number } {
  const palier = calcPalier(nbJours, opts);
  const tarifJour = palier === '10Plus' ? (tarifParJour10Plus || tarifParJour) : tarifParJour;
  return { palier, tarifJour, total: tarifJour * nbJours };
}
