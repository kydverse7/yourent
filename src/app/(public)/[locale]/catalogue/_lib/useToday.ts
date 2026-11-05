import { useSyncExternalStore } from 'react';
import { format } from 'date-fns';

const subscribeNever = () => () => {};
const readToday = () => format(new Date(), 'yyyy-MM-dd');
const readNothing = () => undefined;

/**
 * Date du jour du visiteur, `undefined` au rendu serveur.
 * Une page en cache peut dater d'hier : la date ne doit jamais venir du serveur.
 */
export function useToday(): string | undefined {
  return useSyncExternalStore(subscribeNever, readToday, readNothing);
}
