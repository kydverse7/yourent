import type { CSSProperties } from 'react';

/** Un nombre et ses séparateurs (« 1 800 », « 4,8/5 ») : il se lit toujours de gauche à droite. */
const NUMBER_RUN = /(\d(?:[\d\s.,/  ]*\d)?)/;

/**
 * Compteur à rouleaux : chaque chiffre défile jusqu'à sa valeur quand le nombre entre à l'écran
 * (animation liée au défilement, en CSS seul : classes .odo, .odo-n et .odo-d de site-motion.css).
 *
 * Le vrai texte reste dans le HTML (lu par Google et par les lecteurs d'écran) ; les bandes de chiffres
 * sont du décor généré par le CSS, masqué aux lecteurs d'écran. Sans animation, la valeur est affichée telle quelle.
 */
export function Odometer({ value, className = '' }: { value: string; className?: string }) {
  const parts = value.split(NUMBER_RUN).filter(Boolean);
  return (
    <span className={className}>
      <span className="sr-only">{value}</span>
      <span className="odo" aria-hidden="true">
        {parts.map((part, index) =>
          /^\d/.test(part) ? (
            <span key={index} className="odo-n">
              {[...part].map((char, at) =>
                /\d/.test(char) ? (
                  <span key={at} className="odo-d" style={{ '--d': Number(char) } as CSSProperties} />
                ) : (
                  <span key={at} className="whitespace-pre">
                    {char}
                  </span>
                ),
              )}
            </span>
          ) : (
            <span key={index} className="odo-unit whitespace-pre">
              {part}
            </span>
          ),
        )}
      </span>
    </span>
  );
}
