import type { LocalizedPage } from '../types';

const page: LocalizedPage = {
  fr: {
    metaTitle: 'Location voiture pas cher Casablanca, petits prix | Yourent',
    metaDescription:
      'Location de voiture pas chère à Casablanca dès {minPrice} DH/jour : Fiat 500, Opel Corsa, Dacia Duster. Livraison gratuite, assurance tous risques comprise.',
    eyebrow: 'Petits budgets',
    h1: 'Location de voiture pas chère à Casablanca',
    intro:
      "Yourent propose des voitures de location économiques à Casablanca dès {minPrice} DH par jour (Fiat 500, Opel Corsa), jusqu'à {maxPrice} DH pour le Dacia Duster. La livraison est gratuite à Casablanca et à l'aéroport, et l'assurance tous risques avec franchise est incluse. La location commence à 5 jours.",
    breadcrumb: 'Voiture pas chère',
    vehicles: { maxPrice: 500, sort: 'asc' },
    sections: [
      {
        h2: 'Les voitures les moins chères à louer à Casablanca',
        blocks: [
          {
            type: 'p',
            text: "Pour une **location de voiture pas chère à Casablanca**, quatre modèles de la flotte restent à {maxPrice} DH par jour ou moins. Le tableau donne le tarif de 5 à 10 jours et celui au-delà de 10 jours, qui baisse automatiquement sur la plupart de ces modèles.",
          },
          { type: 'pricing' },
          {
            type: 'list',
            items: [
              "La [Fiat 500](/catalogue/fiat-500) et l'[Opel Corsa](/catalogue/opel-corsa) : citadines à essence, boîte manuelle, les moins chères, à {minPrice} DH par jour.",
              "La [Fiat 500 Cabriolet](/catalogue/fiat-500-cabriolet) : automatique, pour ceux qui veulent une petite voiture sans embrayage.",
              "Le [Dacia Duster](/catalogue/dacia-duster) : un SUV diesel plus spacieux, à {price:dacia-duster} DH par jour, le plus économique pour partir à plusieurs ou charger des bagages.",
            ],
          },
        ],
      },
      {
        h2: 'Pourquoi pas de voiture à prix cassé',
        blocks: [
          {
            type: 'p',
            text: "Yourent ne pratique pas de prix cassé. Notre tarif d'entrée est de {minPrice} DH, et nous préférons l'écrire plutôt qu'afficher un prix d'appel que la facture finale ne confirmerait pas. Un tarif très bas peut s'accompagner d'une caution élevée, d'une franchise lourde, de frais de livraison ou d'options facturées en plus : c'est ce qu'il faut regarder avant de comparer.",
          },
          {
            type: 'p',
            text: "Chez Yourent, le prix affiché comprend : la livraison gratuite à Casablanca et à l'aéroport Mohammed V, et une assurance tous risques avec franchise sur tous les véhicules. Le montant de la franchise, lui, est précisé par l'équipe sur WhatsApp avant la réservation.",
          },
        ],
      },
      {
        h2: 'Comment comparer deux offres de location de voiture',
        blocks: [
          {
            type: 'p',
            text: "Le prix par jour ne suffit pas. Posez les mêmes questions à chaque loueur, nous compris, avant de choisir.",
          },
          {
            type: 'table',
            head: ['À vérifier', 'Pourquoi'],
            rows: [
              ['La caution', "Le montant bloqué au départ, le moyen demandé (chèque, espèces, carte) et le moment où elle est rendue."],
              ['La franchise', "La somme qui reste à votre charge en cas de sinistre : plus elle est basse, plus l'assurance protège."],
              ['La livraison', "Gratuite ou facturée, à l'aéroport comme en ville, et à quelles heures."],
              ['La durée minimale', "Un loueur peut afficher un prix bas sur une durée courte ; Yourent loue à partir de 5 jours."],
              ['L\'annulation', "Les frais éventuels et le délai pour annuler ou modifier."],
              ['Les extras', "Kilométrage, deuxième conducteur, siège enfant : demandez-les avant de réserver."],
            ],
          },
          {
            type: 'p',
            text: "Pour la comparaison avec un grand loueur, lisez notre page [agence locale ou loueur international](route:agence-vs-international). Les règles de Yourent sont détaillées dans les [conditions de location](route:conditions).",
          },
        ],
      },
      {
        h2: 'Payer moins cher sa location : quatre leviers concrets',
        blocks: [
          {
            type: 'list',
            items: [
              "**Louer plus longtemps** : au-delà de 10 jours, le tarif par jour baisse automatiquement sur la plupart des modèles. Voir la page [location longue durée](route:longue-duree).",
              "**Choisir une citadine** : pour la ville de Casablanca, la Fiat 500 ou l'Opel Corsa suffisent largement.",
              "**Se faire livrer** : la livraison gratuite évite des allers-retours vers une agence.",
              "**Réserver avec des dates précises** : la recherche du catalogue montre les voitures libres, donc le tarif exact, sans surprise.",
            ],
          },
        ],
      },
      {
        h2: 'Réserver une voiture économique',
        blocks: [
          {
            type: 'p',
            text: "Choisissez le modèle et vos dates, puis envoyez la demande en ligne : elle n'engage aucun paiement. L'équipe confirme sur WhatsApp ou par téléphone, indique la caution, et la voiture est livrée à l'adresse choisie ou à l'[aéroport Mohammed V](route:aeroport). La modification ou l'annulation reste gratuite jusqu'à 24 h avant la prise en charge.",
          },
          { type: 'vehicles' },
        ],
      },
    ],
    faq: [
      {
        q: 'Quel est le prix minimum pour louer une voiture à Casablanca chez Yourent ?',
        a: "À partir de {minPrice} DH par jour, pour la Fiat 500 et l'Opel Corsa. Le tableau indique le tarif de chaque modèle au-delà de 10 jours.",
      },
      {
        q: 'Que comprend le prix de la location ?',
        a: "La livraison gratuite à Casablanca et à l'aéroport Mohammed V, et une assurance tous risques avec franchise. Le montant de la franchise est précisé par l'équipe sur WhatsApp.",
      },
      {
        q: 'Pourquoi Yourent ne propose-t-il pas de prix plus bas ?',
        a: "Yourent préfère afficher son vrai tarif d'entrée, {minPrice} DH par jour, et dire ce qu'il comprend (livraison gratuite, assurance tous risques avec franchise) plutôt qu'un prix d'appel.",
      },
      {
        q: 'Peut-on louer pour un jour ou un week-end ?',
        a: "Non, la location est de 5 jours minimum.",
      },
      {
        q: 'Faut-il une caution pour une petite voiture ?',
        a: "Oui, une caution est demandée au départ pour tous les véhicules, par chèque, espèces ou empreinte de carte. Elle est restituée au retour du véhicule en bon état, et l'équipe en précise le montant.",
      },
    ],
    related: ['longue-duree', 'tarifs', 'conditions', 'agence-vs-international', 'suv'],
  },
};

export default page;
