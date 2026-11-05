import type { LocalizedPage } from '../types';

const page: LocalizedPage = {
  fr: {
    metaTitle: 'Location voiture automatique à Casablanca | Yourent',
    metaDescription:
      'Location voiture automatique à Casablanca dès {minPrice} DH/jour : Fiat 500, Corolla, Golf 8, SUV et prestige. Livraison gratuite, assurance tous risques.',
    eyebrow: 'Boîte automatique',
    h1: 'Location voiture automatique à Casablanca',
    intro:
      "Yourent loue des voitures à boîte automatique à Casablanca dès {minPrice} DH par jour, de la Fiat 500 Cabriolet au Range Rover Sport. La majorité de la flotte est disponible en automatique. Vous choisissez le véhicule et vos dates en ligne, l'équipe confirme sur WhatsApp, et la livraison est gratuite à Casablanca et à l'aéroport.",
    breadcrumb: 'Voiture automatique',
    vehicles: { boite: 'automatique', sort: 'asc' },
    sections: [
      {
        h2: 'Quelles voitures automatiques louer à Casablanca',
        blocks: [
          {
            type: 'p',
            text: "Casablanca est dense : feux, embouteillages, arrêts et redémarrages constants. Une **voiture automatique** supprime l'embrayage et rend la conduite plus calme, surtout si vous n'êtes pas habitué à la ville ou si vous arrivez après un long vol.",
          },
          {
            type: 'list',
            items: [
              "**Citadine** : la [Fiat 500 Cabriolet](/catalogue/fiat-500-cabriolet), la seule petite voiture automatique de la flotte, à partir de {minPrice} DH par jour.",
              "**Berlines** : la [Toyota Corolla](/catalogue/toyota-corolla) (hybride), l'[Audi A3](/catalogue/audi-a3) et la [Volkswagen Golf 8](/catalogue/volkswagen-golf-8).",
              "**SUV** : T-Roc, Sorento, Tiguan, Touareg, Q3. Voir la page [location SUV](route:suv).",
              "**Prestige** : Mercedes CLA, C 220 et E 220, Range Rover Evoque et Sport, Porsche Macan. Voir la page [voiture de luxe](route:luxe).",
            ],
          },
        ],
      },
      {
        h2: 'Automatique ou manuelle : quels modèles existent dans les deux boîtes',
        blocks: [
          {
            type: 'p',
            text: "Tous les modèles ne sont pas proposés dans les deux boîtes. La [Volkswagen Golf 8](/catalogue/volkswagen-golf-8) et l'[Audi Q3](/catalogue/audi-q3) existent en automatique comme en manuelle : si vous voulez l'automatique, précisez-le dans votre demande, le choix est confirmé à la réservation.",
          },
          {
            type: 'p',
            text: "À l'inverse, le Dacia Duster, la Fiat 500 et l'Opel Corsa sont uniquement en boîte manuelle. Si l'automatique est indispensable pour vous, ne réservez pas l'un de ces trois modèles. Pour la Fiat 500, la version Cabriolet est automatique.",
          },
        ],
      },
      {
        h2: 'Tarifs des voitures automatiques',
        blocks: [
          {
            type: 'p',
            text: "Les tarifs sont par jour pour une location de 5 à 10 jours. Au-delà de 10 jours, un tarif réduit s'applique automatiquement. La caution figure dans le tableau quand elle est renseignée ; sinon l'équipe la précise à la confirmation.",
          },
          { type: 'pricing' },
        ],
      },
      {
        h2: "Pour qui l'automatique change vraiment la location",
        blocks: [
          {
            type: 'list',
            items: [
              "Les touristes et les Marocains résidents à l'étranger habitués à l'automatique, qui n'ont pas à s'adapter à l'embrayage en arrivant.",
              "Les conducteurs qui font surtout de la ville et de l'autoroute entre Casablanca et Rabat.",
              "Les trajets de plusieurs jours sur route, où la fatigue se sent moins.",
              "Les personnes qui conduisent peu : l'automatique réduit le risque de caler dans une côte ou à un feu.",
            ],
          },
          {
            type: 'p',
            text: "Avant de partir, demandez à l'équipe lors de la remise comment fonctionne le modèle choisi (mode de conduite, frein de stationnement). Pour une arrivée en avion, la livraison à l'[aéroport Mohammed V](route:aeroport) vous évite aussi la recherche d'une agence.",
          },
        ],
      },
      {
        h2: 'Réserver une voiture automatique',
        blocks: [
          {
            type: 'list',
            ordered: true,
            items: [
              "Choisissez le modèle dans la liste ci-dessous et vos dates dans le catalogue.",
              "Indiquez « boîte automatique » dans votre demande si le modèle existe aussi en manuelle.",
              "L'équipe confirme par WhatsApp ou par téléphone, avec la caution et les documents à présenter : pièce d'identité (CIN ou passeport), permis de plus de 2 ans, justificatif de domicile.",
              "La voiture est livrée à l'adresse choisie, sans frais à Casablanca.",
            ],
          },
          {
            type: 'p',
            text: "Vous pouvez modifier ou annuler sans frais jusqu'à 24 h avant la prise en charge. Les [conditions de location](route:conditions) détaillent le reste.",
          },
        ],
      },
      {
        h2: 'Les voitures automatiques disponibles',
        blocks: [{ type: 'vehicles' }],
      },
    ],
    faq: [
      {
        q: 'Quelle est la voiture automatique la moins chère à Casablanca ?',
        a: "La Fiat 500 Cabriolet, à partir de {minPrice} DH par jour. Elle est automatique, à essence, avec 5 places.",
      },
      {
        q: 'La Golf 8 et l\'Audi Q3 sont-elles bien automatiques ?',
        a: "Ces deux modèles existent en automatique et en manuelle. Précisez l'automatique dans votre demande : le choix de la boîte est confirmé par l'équipe à la réservation.",
      },
      {
        q: 'Le Dacia Duster existe-t-il en automatique ?',
        a: "Non. Le Dacia Duster de Yourent est uniquement en boîte manuelle, comme la Fiat 500 (hors Cabriolet) et l'Opel Corsa.",
      },
      {
        q: 'Une voiture automatique coûte-t-elle plus cher ?',
        a: "Chez Yourent, le tarif est celui du modèle, affiché dans le tableau ci-dessus. La plus petite automatique démarre à {minPrice} DH par jour, et les plus haut de gamme montent jusqu'à {maxPrice} DH.",
      },
      {
        q: 'Peut-on être livré en voiture automatique à l\'aéroport ?',
        a: "Oui, la livraison à l'aéroport Mohammed V est gratuite, comme dans tout Casablanca. L'équipe précise le point de rendez-vous sur WhatsApp.",
      },
    ],
    related: ['suv', 'luxe', 'aeroport', 'tarifs', 'conditions'],
  },
};

export default page;
