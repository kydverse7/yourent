import type { LocalizedPage } from '../types';

const page: LocalizedPage = {
  fr: {
    metaTitle: 'Location voiture pas cher Casablanca dès {minPrice} DH | Yourent',
    metaDescription:
      "Location voiture pas cher Casablanca dès {minPrice} DH/jour : Fiat 500, Opel Corsa, Dacia Duster. Livraison gratuite à l'aéroport, assurance tous risques.",
    eyebrow: 'Petits budgets',
    h1: 'Location de voiture pas chère à Casablanca : les modèles les moins chers',
    intro:
      "Yourent propose une location de voiture pas chère à Casablanca : la Fiat 500 et l'Opel Corsa, les modèles les moins chers de la flotte, dès {minPrice} DH par jour, et le Dacia Duster à {maxPrice} DH. La livraison est gratuite à Casablanca et à l'aéroport, et l'assurance tous risques avec franchise est incluse. La location dure toutefois 5 jours au minimum.",
    breadcrumb: 'Voiture pas chère',
    vehicles: { maxPrice: 500, sort: 'asc' },
    sections: [
      {
        h2: 'Location de voiture pas chère à Casablanca : les quatre modèles les moins chers',
        blocks: [
          {
            type: 'p',
            text: "Pour une **location de voiture pas chère à Casablanca**, quatre modèles de la flotte restent à {maxPrice} DH par jour ou moins. Le tableau donne le tarif de 5 à 10 jours, puis celui au-delà de 10 jours, qui baisse automatiquement sur la plupart de ces modèles.",
          },
          { type: 'pricing' },
          {
            type: 'list',
            items: [
              "La [Fiat 500](/catalogue/fiat-500) et l'[Opel Corsa](/catalogue/opel-corsa) : citadines à essence, boîte manuelle, les moins chères, à {minPrice} DH par jour.",
              "La [Fiat 500 Cabriolet](/catalogue/fiat-500-cabriolet) : automatique, pour ceux qui veulent une petite voiture sans embrayage.",
              "Le [Dacia Duster](/catalogue/dacia-duster) : un SUV diesel plus spacieux, à {price:dacia-duster} DH par jour, et donc le plus économique pour partir à plusieurs ou charger des bagages.",
            ],
          },
        ],
      },
      {
        h2: 'Pourquoi pas de voiture à prix cassé',
        blocks: [
          {
            type: 'p',
            text: "Yourent ne pratique pas de prix cassé. Notre tarif d'entrée est de {minPrice} DH, et nous préférons l'écrire plutôt qu'afficher un prix d'appel que la facture finale ne confirmerait pas. Un tarif très bas peut en effet s'accompagner d'une caution élevée, d'une franchise lourde, de frais de livraison ou d'options facturées en plus.",
          },
          {
            type: 'p',
            text: "Chez Yourent, le prix affiché comprend la livraison gratuite à Casablanca et à l'aéroport Mohammed V, ainsi qu'une assurance tous risques avec franchise sur tous les véhicules. Le montant de cette franchise, lui, se demande à l'équipe sur WhatsApp avant la réservation.",
          },
        ],
      },
      {
        h2: 'Comment comparer deux offres de location de voiture',
        blocks: [
          {
            type: 'p',
            text: "Le prix par jour ne suffit pas. Posez donc les mêmes questions à chaque loueur, nous compris, avant de choisir.",
          },
          {
            type: 'table',
            head: ['À vérifier', 'Pourquoi'],
            rows: [
              ['La caution', "Le montant bloqué au départ, le moyen demandé (chèque, espèces, carte) et le moment où elle est rendue."],
              ['La franchise', "La somme qui reste à votre charge en cas de sinistre : plus elle est basse, plus l'assurance protège."],
              ['La livraison', "Gratuite ou facturée, à l'aéroport comme en ville, et à quelles heures."],
              ['La durée minimale', "Un loueur peut afficher un prix bas sur une durée courte ; Yourent loue à partir de 5 jours."],
              ["L'annulation", "Les frais éventuels et le délai pour annuler ou modifier."],
              ['Les extras', "Kilométrage, deuxième conducteur, siège enfant : demandez-les avant de réserver."],
            ],
          },
          {
            type: 'p',
            text: "Pour la comparaison avec un grand loueur, lisez notre page [agence locale ou loueur international à Casablanca](route:agence-vs-international). Les règles de Yourent figurent dans nos [conditions de location de voiture](route:conditions), dont l'âge minimum de 21 ans.",
          },
        ],
      },
      {
        h2: 'Louer une voiture pas chère à Casablanca : quatre leviers concrets',
        blocks: [
          {
            type: 'list',
            items: [
              "**Louer plus longtemps** : au-delà de 10 jours, le tarif par jour baisse sur la plupart des modèles, comme l'explique notre [location de voiture longue durée à Casablanca](route:longue-duree).",
              "**Choisir une citadine** : pour la ville de Casablanca, la Fiat 500 ou l'Opel Corsa suffisent largement.",
              "**Se faire livrer** : la livraison gratuite vous évite des allers-retours vers une agence.",
              "**Réserver avec des dates précises** : la recherche du catalogue montre les voitures libres et leur tarif, sans surprise.",
            ],
          },
        ],
      },
      {
        h2: 'Réserver une voiture économique',
        blocks: [
          {
            type: 'p',
            text: "Choisissez le modèle et vos dates, puis envoyez la demande en ligne : elle n'engage aucun paiement. L'équipe confirme par téléphone ou sur WhatsApp, et vous communique la caution. Vous recevez ensuite la voiture à l'adresse choisie ou à l'aéroport, comme l'explique notre page [location de voiture à l'aéroport de Casablanca](route:aeroport). Modifier ou annuler reste gratuit jusqu'à 24 h avant la prise en charge.",
          },
          { type: 'vehicles' },
        ],
      },
    ],
    faq: [
      {
        q: 'Quel est le prix minimum pour louer une voiture à Casablanca chez Yourent ?',
        a: "À partir de {minPrice} DH par jour, pour la Fiat 500 et l'Opel Corsa. Le tableau indique ensuite le tarif de chaque modèle au-delà de 10 jours.",
      },
      {
        q: 'Que comprend le prix de la location ?',
        a: "La livraison gratuite à Casablanca et à l'aéroport Mohammed V, ainsi qu'une assurance tous risques avec franchise. L'équipe vous précise le montant de cette franchise sur WhatsApp.",
      },
      {
        q: 'Pourquoi Yourent ne propose-t-il pas de prix plus bas ?',
        a: "Yourent préfère afficher son vrai tarif d'entrée, {minPrice} DH par jour, et dire ce qu'il comprend plutôt que publier un prix d'appel.",
      },
      {
        q: 'Peut-on louer pour un jour ou un week-end ?',
        a: "Non, car il faut louer pour 5 jours au moins, même une petite citadine.",
      },
      {
        q: 'Faut-il une caution pour une petite voiture ?',
        a: "Oui, une caution est demandée au départ pour tous les véhicules, par chèque, espèces ou empreinte de carte. Vous la récupérez au retour de la voiture en bon état, et l'équipe en précise le montant.",
      },
    ],
    related: ['longue-duree', 'tarifs', 'conditions', 'agence-vs-international', 'suv'],
  },
};

export default page;
