import type { Article } from '../types';
import guideAeroportMohammedV from './guide-aeroport-mohammed-v';
import prixLocationVoitureCasablanca from './prix-location-voiture-casablanca';
import cautionLocationVoitureMaroc from './caution-location-voiture-maroc';
import louerVoitureMarocPermisEtranger from './louer-voiture-maroc-permis-etranger';
import aeroportMohammedVCentreVilleCasablanca from './aeroport-mohammed-v-centre-ville-casablanca';
import peagesCasablancaMarrakechRabat from './peages-casablanca-marrakech-rabat';
import conduireACasablanca from './conduire-a-casablanca';
import assuranceFranchiseLocationVoiture from './assurance-franchise-location-voiture';
import roadTripCasablancaMarrakechAgadir from './road-trip-casablanca-marrakech-agadir';
import mreReserverVoitureEte from './mre-reserver-voiture-ete';
import eviterMauvaisesSurprisesLocationMaroc from './eviter-mauvaises-surprises-location-maroc';
import louerVoitureCasablancaGuide from './louer-voiture-casablanca-guide';
import locationVoitureAuMoisCasablanca from './location-voiture-au-mois-casablanca';
import aeroportMarrakechMenaraVoitureLocation from './aeroport-marrakech-menara-voiture-location';
import quelleVoitureLouerFamilleMre from './quelle-voiture-louer-famille-mre';
import louerVoitureDeLuxeCasablancaConseils from './louer-voiture-de-luxe-casablanca-conseils';

/** Articles du blog, en français pour l'instant. */
export const ARTICLES: Article[] = [
  louerVoitureCasablancaGuide,
  guideAeroportMohammedV,
  prixLocationVoitureCasablanca,
  locationVoitureAuMoisCasablanca,
  cautionLocationVoitureMaroc,
  louerVoitureMarocPermisEtranger,
  quelleVoitureLouerFamilleMre,
  louerVoitureDeLuxeCasablancaConseils,
  aeroportMohammedVCentreVilleCasablanca,
  aeroportMarrakechMenaraVoitureLocation,
  peagesCasablancaMarrakechRabat,
  conduireACasablanca,
  assuranceFranchiseLocationVoiture,
  roadTripCasablancaMarrakechAgadir,
  mreReserverVoitureEte,
  eviterMauvaisesSurprisesLocationMaroc,
];

export function findArticle(slug: string): Article | undefined {
  return ARTICLES.find((article) => article.slug === slug);
}
