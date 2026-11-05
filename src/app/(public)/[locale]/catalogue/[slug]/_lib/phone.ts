/**
 * Numéro saisi dans le formulaire de réservation, qu'il soit écrit en format local
 * (06 12 34 56 78) ou international (+33 6 12 34 56 78, 0033 6 12 34 56 78).
 * Un indicatif reconnu dans la saisie l'emporte sur celui de la liste déroulante.
 */
export function parseFormPhone(
  raw: string,
  selectedIndicatif: string,
  knownIndicatifs: string[],
): { indicatif: string; telephone: string; international: string } {
  const compact = raw.replace(/[\s().-]/g, '');
  const isInternational = /^(\+|00)/.test(compact);
  const digits = compact.replace(/^(\+|00)/, '');

  let indicatif = selectedIndicatif;
  let telephone = digits;
  if (isInternational) {
    // Du plus long au plus court : +216 ne doit pas être lu comme +2.
    const match = [...knownIndicatifs]
      .sort((a, b) => b.length - a.length)
      .find((code) => digits.startsWith(code.slice(1)));
    if (match) {
      indicatif = match;
      telephone = digits.slice(match.length - 1);
    }
  }

  return { indicatif, telephone, international: `${indicatif}${telephone.replace(/^0/, '')}` };
}
