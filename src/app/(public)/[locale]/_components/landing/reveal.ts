import type { CSSProperties } from 'react';

/*
 * Apparitions au défilement, en CSS (voir la fin de landing.css) : aucune bibliothèque d'animation
 * à charger ni à hydrater. Utilisable depuis un composant serveur.
 *
 * - `rv` + une variante (`rv-fade-up`...) : l'élément s'anime quand il entre dans la vue.
 * - `rv rv-group` : l'entrée dans la vue anime les éléments `rv-item` qu'il contient, décalés avec rvDelay().
 * - `data-rv-amount` : part de l'élément qui doit être visible (0,18 par défaut).
 */
export function rvDelay(seconds: number): CSSProperties {
  return { '--rv-delay': `${seconds}s` } as CSSProperties;
}
