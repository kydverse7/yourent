import { useSyncExternalStore } from 'react';

const subscribeNever = () => () => {};
/** Date locale du visiteur au format AAAA-MM-JJ, sans bibliothèque de dates. */
const readToday = () => {
  const now = new Date();
  const pad = (value: number) => String(value).padStart(2, '0');
  return `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`;
};
const readNothing = () => undefined;

/**
 * Date du jour du visiteur, `undefined` au rendu serveur.
 * Une page en cache peut dater d'hier : la date ne doit jamais venir du serveur.
 */
export function useToday(): string | undefined {
  return useSyncExternalStore(subscribeNever, readToday, readNothing);
}
