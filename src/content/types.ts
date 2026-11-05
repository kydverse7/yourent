import type { FleetFilter } from '@/lib/seo/fleet';
import type { SeoRouteKey } from '@/lib/seo/routes';

/**
 * Contenu des pages SEO. Tout le texte passe par ces types, le gabarit se charge de l'affichage.
 *
 * Dans tout texte :
 * - lien vers une page SEO : [libellé](route:aeroport)
 * - lien interne : [libellé](/catalogue/porsche-macan)
 * - gras : **texte**
 * - jetons remplacés par les vraies valeurs de la base, jamais de prix écrit en dur :
 *     {minPrice}     tarif par jour le plus bas de la sélection de la page (flotte entière sinon)
 *     {maxPrice}     tarif par jour le plus haut de la sélection
 *     {fleetMin}     tarif par jour le plus bas de toute la flotte
 *     {vehicleCount} nombre de véhicules publics de toute la flotte
 *     {modelCount}   nombre de modèles de toute la flotte
 *     {price:slug}   tarif par jour d'un modèle, ex. {price:porsche-macan}
 */
export type Block =
  | { type: 'p'; text: string }
  | { type: 'list'; items: string[]; ordered?: boolean }
  | { type: 'table'; head: string[]; rows: string[][] }
  /** Tableau généré depuis la base : modèle, tarif 5-10 jours, tarif au-delà de 10 jours, caution. */
  | { type: 'pricing' }
  /** Cartes des véhicules de la sélection de la page, avec photo, prix et lien vers la fiche. */
  | { type: 'vehicles' };

export type Section = {
  h2: string;
  blocks: Block[];
};

export type FaqItem = { q: string; a: string };

export type PageContent = {
  /** 55 à 60 caractères, mot-clé en tête, terminé par « | Yourent ». */
  metaTitle: string;
  /** 140 à 160 caractères, avec un argument concret. */
  metaDescription: string;
  eyebrow: string;
  /** Visible, contient le mot-clé principal. */
  h1: string;
  /** Réponse directe en 2 ou 3 phrases : ce que propose Yourent, à quel prix, comment réserver. */
  intro: string;
  /** Libellé court pour le fil d'Ariane et les liens vers cette page. */
  breadcrumb: string;
  /** Véhicules concernés par la page. Absent sur les pages sans véhicule. */
  vehicles?: FleetFilter;
  sections: Section[];
  /** Entre 4 et 6 questions, affichées dans la page et balisées FAQPage. */
  faq: FaqItem[];
  /** Pages voisines à proposer en bas de page. */
  related: SeoRouteKey[];
};

export type LocalizedPage = {
  fr: PageContent;
  en?: PageContent;
  ar?: PageContent;
};

export type Article = {
  /** Segment d'adresse : /blog/<slug> */
  slug: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  /** Réponse directe en 2 ou 3 phrases. */
  intro: string;
  /** Résumé affiché sur la liste des articles. */
  excerpt: string;
  /** Publication et dernière mise à jour, au format AAAA-MM-JJ. */
  datePublished: string;
  dateModified: string;
  sections: Section[];
  faq: FaqItem[];
  related: SeoRouteKey[];
  /** Pages consultées pour les faits externes (péages, trains, réglementation). */
  sources?: { label: string; url: string }[];
};

/** Texte unique d'une fiche véhicule. */
export type ModelCopy = {
  /** 150 à 250 mots, en paragraphes : à qui s'adresse ce modèle, à Casablanca et au Maroc. */
  paragraphs: string[];
  /** 2 à 4 questions propres à ce modèle. */
  faq: FaqItem[];
};
