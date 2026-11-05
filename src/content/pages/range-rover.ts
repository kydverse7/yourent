import type { LocalizedPage } from '../types';

const page: LocalizedPage = {
  fr: {
    metaTitle: "Location Range Rover Casablanca : Evoque, Sport | Yourent",
    metaDescription:
      "Louez une Range Rover Evoque ou Sport à Casablanca dès {minPrice} DH/jour. Diesel, boîte automatique, livraison à l'hôtel ou à l'aéroport Mohammed V.",
    eyebrow: "Range Rover",
    h1: "Location Range Rover à Casablanca : Evoque et Sport",
    intro:
      "Yourent propose la Range Rover Evoque à partir de {minPrice} DH par jour et la Range Rover Sport à {price:range-rover-sport} DH, avec livraison à Casablanca ou à l'aéroport Mohammed V. Vous choisissez vos dates dans le catalogue, l'équipe confirme sur WhatsApp ou par téléphone. Les deux modèles sont en diesel et en boîte automatique, et la location démarre à 5 jours.",
    breadcrumb: "Range Rover",
    vehicles: { marques: ["Range Rover"], sort: "asc" },
    sections: [
      {
        h2: "Evoque ou Sport : deux Range Rover, deux gabarits",
        blocks: [
          {
            type: "p",
            text: "La [Range Rover Evoque](/catalogue/range-rover-evoque) est le SUV compact de la marque, à la ligne plus basse et plus urbaine. La [Range Rover Sport](/catalogue/range-rover-sport) est un grand SUV de prestige : plus large, plus imposant, pensé pour les longues distances et les passagers installés à l'arrière. L'écart de prix reflète cette différence : {price:range-rover-evoque} DH par jour pour l'Evoque, {price:range-rover-sport} DH pour la Sport.",
          },
          {
            type: "p",
            text: "Ces deux Range Rover sont louées en très peu d'exemplaires. Une demande avec vos dates, faite quelques jours avant, évite de découvrir qu'elles sont déjà prises.",
          },
        ],
      },
      {
        h2: "Pourquoi choisir une Range Rover plutôt qu'un autre SUV",
        blocks: [
          {
            type: "p",
            text: "Position de conduite haute, assise confortable et image de la marque : on loue une Range Rover autant pour ce qu'elle montre que pour ce qu'elle permet. Si le prestige compte moins que l'espace, le [Volkswagen Touareg](/catalogue/volkswagen-touareg) offre un gabarit proche pour {price:volkswagen-touareg} DH par jour. Si vous préférez la conduite sportive, la [Porsche Macan](/catalogue/porsche-macan) est plus nerveuse mais moins posée sur les longues distances.",
          },
          {
            type: "p",
            text: "Pour comparer tous les SUV de la flotte, de la Dacia Duster aux modèles premium, voyez la page [location de SUV à Casablanca](route:suv).",
          },
        ],
      },
      {
        h2: "Quelle Range Rover pour quel déplacement",
        blocks: [
          {
            type: "list",
            items: [
              "**Arrivée en famille à l'aéroport** : la Sport absorbe plus de bagages et plus de monde. Yourent livre la voiture à l'aéroport Mohammed V.",
              "**Séjour en ville** : l'Evoque est plus simple à garer et à manœuvrer dans le centre ou autour de la Corniche.",
              "**Casablanca-Marrakech** : sur autoroute, la Sport donne le trajet le plus calme. L'Evoque fait aussi très bien l'affaire pour deux ou trois personnes.",
              "**Week-end hors de la ville** : la hauteur de caisse des deux modèles est utile sur les routes secondaires un peu abîmées.",
            ],
          },
        ],
      },
      {
        h2: "Les Range Rover disponibles à Casablanca",
        blocks: [{ type: "vehicles" }],
      },
      {
        h2: "Tarifs de la location Range Rover",
        blocks: [
          {
            type: "p",
            text: "Le tarif journalier va de {minPrice} à {maxPrice} DH selon le modèle. Il baisse automatiquement au-delà de 10 jours. L'assurance tous risques avec franchise est comprise, et la caution est fixée selon la voiture au moment du départ.",
          },
          { type: "pricing" },
        ],
      },
    ],
    faq: [
      {
        q: "Quelle est la différence entre la Range Rover Evoque et la Sport ?",
        a: "L'Evoque est un SUV compact, facile en ville. La Sport est un grand SUV, plus spacieux et plus confortable sur longue distance. Elle est aussi nettement plus chère : comparez {price:range-rover-evoque} DH et {price:range-rover-sport} DH par jour.",
      },
      {
        q: "Les Range Rover sont-elles en diesel ou en essence ?",
        a: "Les deux modèles proposés sont en diesel, avec boîte automatique. Chaque fiche du catalogue donne le détail de la voiture.",
      },
      {
        q: "Peut-on louer une Range Rover pour aller de Casablanca à Marrakech ?",
        a: "Oui. Prévenez l'équipe de votre itinéraire à la réservation. Le kilométrage inclus n'est pas annoncé de façon générale : l'équipe le précise sur WhatsApp selon la durée et le modèle.",
      },
      {
        q: "Quelle caution faut-il prévoir pour une Range Rover ?",
        a: "Elle varie selon le modèle et se règle au départ, par chèque, en espèces ou par empreinte de carte. Elle est restituée au retour du véhicule en bon état. Le montant exact vous est donné à la confirmation.",
      },
      {
        q: "Une Range Rover peut-elle être livrée à mon hôtel ?",
        a: "Oui, la livraison est gratuite dans tout Casablanca, à l'hôtel comme à l'adresse de votre choix, et à l'aéroport Mohammed V. Elle est assurée de 8h à 22h, 7 jours sur 7.",
      },
    ],
    related: ["suv", "luxe", "mercedes", "porsche", "tarifs"],
  },
};

export default page;
