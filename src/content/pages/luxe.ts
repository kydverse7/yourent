import type { LocalizedPage } from '../types';

const page: LocalizedPage = {
  fr: {
    metaTitle: 'Location voiture luxe Casablanca, haut de gamme | Yourent',
    metaDescription:
      'Location voiture luxe à Casablanca : Range Rover, Porsche Macan, Mercedes. Dès {minPrice} DH/jour, livraison gratuite, assurance tous risques. Demande en ligne.',
    eyebrow: 'Voitures de prestige',
    h1: 'Location voiture luxe à Casablanca',
    intro:
      "Yourent loue des voitures de luxe à Casablanca : Range Rover Sport, Porsche Macan, Mercedes Classe C, E et CLA, Range Rover Evoque et Volkswagen Touareg, de {minPrice} DH à {maxPrice} DH par jour. La livraison est gratuite à Casablanca et à l'aéroport Mohammed V. Vous faites une demande en ligne avec vos dates, l'équipe confirme sur WhatsApp.",
    breadcrumb: 'Voiture de luxe',
    vehicles: {
      models: [
        'range-rover-sport',
        'porsche-macan',
        'mercedes-e-220',
        'mercedes-c-220',
        'mercedes-cla',
        'range-rover-evoque',
        'volkswagen-touareg',
      ],
      sort: 'desc',
    },
    sections: [
      {
        h2: 'Quelle voiture de luxe louer à Casablanca selon votre besoin',
        blocks: [
          {
            type: 'p',
            text: "Une **location voiture luxe Casablanca** répond le plus souvent à trois besoins : arriver dans une voiture qui fait bonne impression, voyager confortablement sur de longues distances, ou se faire plaisir au volant le temps d'un séjour. La sélection de Yourent couvre ces trois cas, avec des véhicules de prestige et de haut de gamme que vous pouvez louer à partir de {minPrice} DH par jour.",
          },
          {
            type: 'list',
            items: [
              "**Représenter** : une berline Mercedes ([C 220](/catalogue/mercedes-c-220) ou [E 220](/catalogue/mercedes-e-220)) pour un rendez-vous d'affaires, une cérémonie ou l'accueil d'un invité.",
              "**Voyager à plusieurs** : un [Range Rover Sport](/catalogue/range-rover-sport) ou un [Volkswagen Touareg](/catalogue/volkswagen-touareg), spacieux, pour la route vers Marrakech ou Rabat avec la famille et les bagages.",
              "**Conduire avec plaisir** : le [Porsche Macan](/catalogue/porsche-macan) pour une conduite plus dynamique, ou le [Mercedes CLA](/catalogue/mercedes-cla) pour une ligne de coupé à un tarif plus doux.",
              "**Choisir un prestige plus compact** : le [Range Rover Evoque](/catalogue/range-rover-evoque), facile à garer en ville.",
            ],
          },
        ],
      },
      {
        h2: 'Les voitures de luxe et leurs tarifs par jour',
        blocks: [
          {
            type: 'p',
            text: "Les prix ci-dessous sont les tarifs par jour de 5 à 10 jours. Au-delà de 10 jours, le tarif baisse automatiquement. Tous les véhicules de cette sélection sont à boîte automatique.",
          },
          { type: 'pricing' },
        ],
      },
      {
        h2: 'Par marque : Mercedes, Range Rover, Porsche',
        blocks: [
          {
            type: 'p',
            text: "Si vous savez déjà la marque que vous voulez, chaque marque a sa page avec les modèles disponibles : [location Mercedes](route:mercedes) (CLA, C 220, E 220), [location Range Rover](route:range-rover) (Sport et Evoque), [location Porsche](route:porsche) (Macan) et [location Volkswagen](route:volkswagen) pour le Touareg.",
          },
          {
            type: 'p',
            text: "Le haut de gamme se loue en petit nombre : plusieurs de ces modèles n'existent qu'en un ou deux exemplaires. Réservez tôt si vos dates tombent sur un week-end, un mariage ou une période de vacances, et utilisez la recherche par dates du catalogue pour voir ce qui est libre.",
          },
        ],
      },
      {
        h2: 'Ce que comprend la location',
        blocks: [
          {
            type: 'list',
            items: [
              "La livraison gratuite à Casablanca, à l'hôtel, à l'adresse de votre choix ou à l'[aéroport Mohammed V](route:aeroport).",
              "Une assurance tous risques avec franchise sur tous les véhicules.",
              "Un véhicule de remplacement envoyé dans les plus brefs délais en cas de panne, et un accompagnement de l'équipe en cas d'accident.",
              "Une location de 5 jours minimum, avec un tarif réduit automatique au-delà de 10 jours.",
            ],
          },
          {
            type: 'p',
            text: "Le montant de la caution dépend du véhicule : il figure dans le tableau ci-dessus quand il est renseigné et l'équipe le confirme avant le départ. Pour le montant de la franchise, l'équipe le précise sur WhatsApp. Tous les modèles et conditions sont aussi sur la page [tarifs](route:tarifs).",
          },
        ],
      },
      {
        h2: 'Comment réserver une voiture de prestige',
        blocks: [
          {
            type: 'list',
            ordered: true,
            items: [
              "Choisissez le véhicule dans la sélection ci-dessous, avec vos dates de début et de fin.",
              "Envoyez la demande en ligne. Aucun paiement n'est demandé à cette étape.",
              "L'équipe confirme par WhatsApp ou par téléphone, vous indique la caution et les documents à prévoir : pièce d'identité (CIN ou passeport), permis de plus de 2 ans, justificatif de domicile.",
              "La voiture est livrée à l'adresse choisie. À la fin de la location, la caution est restituée au retour du véhicule en bon état.",
            ],
          },
          {
            type: 'p',
            text: "Vous pouvez modifier ou annuler sans frais jusqu'à 24 h avant la prise en charge. Toutes les règles sont détaillées dans les [conditions de location](route:conditions).",
          },
        ],
      },
      {
        h2: 'Les véhicules de luxe disponibles',
        blocks: [{ type: 'vehicles' }],
      },
    ],
    faq: [
      {
        q: 'Quelle est la voiture de luxe la moins chère à Casablanca chez Yourent ?',
        a: "Dans la sélection de prestige, les tarifs partent de {minPrice} DH par jour. Le [Mercedes CLA](/catalogue/mercedes-cla), le [Range Rover Evoque](/catalogue/range-rover-evoque) et le [Touareg](/catalogue/volkswagen-touareg) sont les plus accessibles, le [Range Rover Sport](/catalogue/range-rover-sport) est le plus haut de la gamme à {maxPrice} DH par jour.",
      },
      {
        q: 'Peut-on se faire livrer une voiture de luxe à son hôtel ou à l\'aéroport ?',
        a: "Oui. La livraison est gratuite à Casablanca, à l'hôtel comme à l'adresse de votre choix, et à l'aéroport Mohammed V. Le point de rendez-vous précis est donné par l'équipe sur WhatsApp.",
      },
      {
        q: 'Quelle caution faut-il pour une voiture de luxe ?',
        a: "La caution est demandée au départ, par chèque, espèces ou empreinte de carte. Son montant dépend du véhicule : l'équipe vous le communique à la confirmation, et elle est restituée au retour du véhicule en bon état.",
      },
      {
        q: 'Les voitures de luxe sont-elles assurées ?',
        a: "Oui, tous les véhicules de Yourent sont couverts par une assurance tous risques avec franchise. L'équipe précise le montant de la franchise sur WhatsApp avant la réservation.",
      },
      {
        q: 'Peut-on louer une voiture de luxe avec chauffeur ?',
        a: "Le site présente la location du véhicule seul. Pour un chauffeur, l'équipe répond sur WhatsApp.",
      },
    ],
    related: ['mercedes', 'range-rover', 'porsche', 'suv', 'tarifs'],
  },
};

export default page;
