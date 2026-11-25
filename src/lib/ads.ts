/** Compte Google Ads de Yourent : balise chargée sur toutes les pages publiques. */
export const ADS_ID = 'AW-17463963038';

/**
 * Libellés des actions de conversion Google Ads (Objectifs > Conversions > action > Configuration de la balise :
 * la partie après la barre oblique dans `send_to: 'AW-17463963038/xxxx'`).
 * Un libellé vide n'envoie rien. Les valeurs sont réglées dans Google Ads (valeur par défaut de chaque action),
 * pour pouvoir les ajuster sans redéployer le site.
 */
export type AdsConversion = 'reservation' | 'whatsapp' | 'phone';

export const ADS_CONVERSION_LABELS: Record<AdsConversion, string> = {
  /** Demande de réservation envoyée (arrivée sur la page de confirmation). */
  reservation: '',
  /** Clic sur un lien WhatsApp (hors page de confirmation, déjà comptée comme demande). */
  whatsapp: '',
  /** Clic sur un numéro de téléphone. */
  phone: '',
};
