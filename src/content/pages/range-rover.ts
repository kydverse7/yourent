import type { LocalizedPage } from '../types';

const page: LocalizedPage = {
  fr: {
    metaTitle: "Location Range Rover Casablanca : Evoque, Sport | Yourent",
    metaDescription:
      "Louez un Range Rover Evoque ou Sport à Casablanca dès {minPrice} DH/jour. Diesel, boîte automatique, livraison à l'hôtel ou à l'aéroport Mohammed V.",
    eyebrow: "Range Rover",
    h1: "Location Range Rover à Casablanca : Evoque et Sport",
    intro:
      "Yourent propose le Range Rover Evoque à partir de {minPrice} DH par jour et le Range Rover Sport à {price:range-rover-sport} DH, avec livraison à Casablanca ou à l'aéroport Mohammed V. Vous choisissez vos dates dans le catalogue, l'équipe confirme sur WhatsApp ou par téléphone. Les deux modèles sont en diesel et en boîte automatique, et la location démarre à 5 jours.",
    breadcrumb: "Range Rover",
    vehicles: { marques: ["Range Rover"], sort: "asc" },
    sections: [
      {
        h2: "Evoque ou Sport : deux Range Rover, deux gabarits",
        blocks: [
          {
            type: "p",
            text: "Le [Range Rover Evoque](/catalogue/range-rover-evoque) est le SUV compact de la marque, à la ligne plus basse et plus urbaine. Le [Range Rover Sport](/catalogue/range-rover-sport) est un grand SUV de prestige : plus large, plus imposant, pensé pour les longues distances et les passagers installés à l'arrière. L'écart de prix reflète cette différence : {price:range-rover-evoque} DH par jour pour l'Evoque, {price:range-rover-sport} DH pour le Sport.",
          },
          {
            type: "p",
            text: "Ces deux Range Rover sont proposés en très peu d'exemplaires. Envoyez votre demande bien à l'avance : vous éviterez de les trouver déjà loués.",
          },
        ],
      },
      {
        h2: "Pourquoi choisir un Range Rover plutôt qu'un autre SUV",
        blocks: [
          {
            type: "p",
            text: "Position de conduite haute, assise confortable et image de la marque : on loue un Range Rover autant pour ce qu'il montre que pour ce qu'il permet. Si le prestige compte moins que l'espace, le [Volkswagen Touareg](/catalogue/volkswagen-touareg) offre un gabarit proche de celui du Sport pour {price:volkswagen-touareg} DH par jour. Si vous préférez la conduite sportive, le [Porsche Macan](/catalogue/porsche-macan) est plus nerveux mais moins posé sur les longues distances.",
          },
          {
            type: "p",
            text: "Pour comparer tous les SUV de la flotte, du Dacia Duster aux modèles premium, voyez la page [location de SUV à Casablanca](route:suv).",
          },
        ],
      },
      {
        h2: "Quelle Range Rover pour quel déplacement",
        blocks: [
          {
            type: "list",
            items: [
              "**Arrivée en famille à l'aéroport** : le Sport absorbe plus de bagages et plus de monde. Yourent livre la voiture à l'aéroport Mohammed V.",
              "**Séjour en ville** : l'Evoque est plus simple à garer et à manœuvrer dans le centre ou autour de la Corniche.",
              "**Casablanca-Marrakech** : sur autoroute, le Sport donne le trajet le plus calme. L'Evoque fait aussi très bien l'affaire pour deux ou trois personnes.",
              "**Escapade hors de la ville** : la hauteur de caisse des deux modèles est utile sur les routes secondaires un peu abîmées.",
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
            text: "Le tarif journalier va de {minPrice} à {maxPrice} DH selon le modèle. Il baisse automatiquement au-delà de 10 jours. L'assurance tous risques avec franchise est comprise. La caution, demandée au départ, dépend de la voiture : le tableau indique son montant minimum.",
          },
          { type: "pricing" },
        ],
      },
    ],
    faq: [
      {
        q: "Quelle est la différence entre le Range Rover Evoque et le Sport ?",
        a: "L'Evoque est un SUV compact, facile en ville. Le Sport est un grand SUV, plus spacieux et plus confortable sur longue distance. Il est aussi nettement plus cher : comparez {price:range-rover-evoque} DH et {price:range-rover-sport} DH par jour.",
      },
      {
        q: "Les Range Rover sont-ils en diesel ou en essence ?",
        a: "Les deux modèles proposés sont en diesel, avec boîte automatique. Chaque fiche du catalogue donne le détail de la voiture.",
      },
      {
        q: "Peut-on louer un Range Rover pour aller de Casablanca à Marrakech ?",
        a: "Oui. Prévenez l'équipe de votre itinéraire à la réservation. Le kilométrage inclus n'est pas affiché sur le site : l'équipe le précise sur WhatsApp.",
      },
      {
        q: "Quelle caution faut-il prévoir pour un Range Rover ?",
        a: "Elle varie selon le modèle et se règle au départ, par chèque, en espèces ou par empreinte de carte. On vous la rend au retour du véhicule en bon état. Le montant exact vous est donné à la confirmation.",
      },
      {
        q: "Un Range Rover peut-il être livré à mon hôtel ?",
        a: "Oui, la livraison est gratuite dans tout Casablanca, à l'hôtel comme à l'adresse de votre choix, et à l'aéroport Mohammed V. Elle est assurée de 8h à 22h, 7 jours sur 7.",
      },
    ],
    related: ["suv", "luxe", "mercedes", "porsche", "tarifs"],
  },
};

export default page;
