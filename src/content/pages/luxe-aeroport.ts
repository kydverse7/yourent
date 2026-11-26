import type { LocalizedPage } from '../types';

const page: LocalizedPage = {
  fr: {
    metaTitle: 'Location voiture de luxe aéroport Casablanca | Yourent',
    metaDescription:
      "Voiture de luxe livrée à l'aéroport Mohammed V de Casablanca : Mercedes, Range Rover, Porsche Macan dès {minPrice} DH/jour, sans frais de livraison.",
    eyebrow: 'Luxe · Aéroport Mohammed V',
    h1: "Location de voiture de luxe à l'aéroport de Casablanca Mohammed V",
    intro:
      "Yourent vous remet une voiture de luxe à votre arrivée à l'aéroport Mohammed V de Casablanca : Mercedes, Range Rover, Porsche Macan ou Volkswagen Touareg, de {minPrice} DH à {maxPrice} DH par jour, sans frais de livraison. L'agence n'a pas de comptoir dans le terminal : un membre de l'équipe vous attend avec la voiture au point de rendez-vous envoyé sur WhatsApp. La location dure 5 jours minimum.",
    breadcrumb: "Voiture de luxe à l'aéroport",
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
        h2: "Voiture de luxe à l'aéroport Mohammed V : l'essentiel",
        blocks: [
          {
            type: 'table',
            head: ['Votre question', 'La réponse'],
            rows: [
              ['Quels modèles ?', 'Mercedes CLA, Classe C 220 et Classe E 220, Range Rover Evoque et Sport, Porsche Macan, Volkswagen Touareg.'],
              ['La livraison est-elle payante ?', "Non. Elle est gratuite à l'aéroport Mohammed V, comme dans tout Casablanca."],
              ['Y a-t-il un comptoir ?', "Non. La voiture vous est remise au point de rendez-vous convenu, sans file d'attente."],
              ['À quelle heure ?', "L'équipe travaille de 8 h à 22 h, tous les jours. En dehors, posez la question avant de réserver."],
              ['Quelle caution ?', "Son montant dépend du modèle. Il vous est confirmé avant le vol, pour que vous l'ayez sur vous à l'arrivée."],
              ['Quelle durée ?', '5 jours minimum, sans formule à la journée ni au week-end.'],
            ],
          },
        ],
      },
      {
        h2: 'Quel modèle haut de gamme pour quelle arrivée',
        blocks: [
          {
            type: 'p',
            text: "Les sept modèles ont 5 places et une boîte automatique. Ce sont donc le nombre de passagers, les bagages et le motif du voyage qui décident.",
          },
          {
            type: 'list',
            items: [
              "**Déplacement d'affaires, seul ou à deux** : une berline Mercedes, [CLA](/catalogue/mercedes-cla) ou [Classe C 220](/catalogue/mercedes-c-220), sobre et facile à garer devant un hôtel ou un siège social.",
              "**Arrivée à plusieurs, avec des valises** : la [Classe E 220](/catalogue/mercedes-e-220) est la plus grande des trois Mercedes. Le [Volkswagen Touareg](/catalogue/volkswagen-touareg) et le [Range Rover Sport](/catalogue/range-rover-sport) sont les plus grands SUV de la sélection.",
              "**Séjour à deux, pour le plaisir** : le [Porsche Macan](/catalogue/porsche-macan) ou le [Range Rover Evoque](/catalogue/range-rover-evoque), deux SUV compacts.",
            ],
          },
          {
            type: 'p',
            text: "Indiquez le nombre de passagers et de valises dans votre demande : l'équipe vous oriente vers le modèle adapté. Les SUV sont comparés sur la page [location de SUV de luxe à Casablanca](route:suv-luxe), et les trois Mercedes sur la page [location de Mercedes à Casablanca](route:mercedes).",
          },
        ],
      },
      {
        h2: "Comment se passe la remise d'une voiture de prestige à l'arrivée",
        blocks: [
          {
            type: 'list',
            ordered: true,
            items: [
              "**Avant le vol.** Vous choisissez le modèle et vos dates dans le [catalogue](/catalogue), puis vous envoyez la demande en précisant que la remise se fait à l'aéroport Mohammed V, avec votre numéro de vol et votre heure d'arrivée.",
              "**La confirmation.** L'équipe vous répond sur WhatsApp ou par téléphone : véhicule, montant, caution et documents. Vous ne payez rien en ligne.",
              "**À l'atterrissage.** Vous récupérez vos bagages, puis vous rejoignez le point de rendez-vous reçu sur WhatsApp. Un membre de l'équipe vous y attend avec la voiture.",
              "**L'état des lieux.** Faites le tour du véhicule avec lui : carrosserie, jantes, intérieur, niveau de carburant. Sur un modèle de ce prix, ces quelques minutes comptent.",
              "**Le départ.** Vous présentez vos documents, vous laissez la caution et vous prenez la route.",
            ],
          },
          {
            type: 'p',
            text: "Si votre vol change, prévenez l'équipe sur WhatsApp. Vous pouvez modifier ou annuler sans frais jusqu'à 24 h avant la prise en charge ; au-delà, des frais peuvent s'appliquer.",
          },
        ],
      },
      {
        h2: 'La caution : à préparer avant de prendre l’avion',
        blocks: [
          {
            type: 'p',
            text: "Sur une voiture haut de gamme, la caution est plus élevée que sur une citadine. Elle se laisse à la remise, par chèque, en espèces ou par empreinte de carte, et vous revient au retour du véhicule en bon état. Le tableau des tarifs ci-dessous indique son montant quand il est renseigné.",
          },
          {
            type: 'p',
            text: "Si vous arrivez de l'étranger, demandez à l'équipe, avant le départ, quel mode de versement convient à votre situation. Vous éviterez ainsi de chercher une solution dans le hall d'arrivée. Notre article sur [la caution d'une location de voiture au Maroc](/blog/caution-location-voiture-maroc) explique le principe.",
          },
        ],
      },
      {
        h2: "Prix des voitures de luxe livrées à l'aéroport de Casablanca",
        blocks: [
          { type: 'pricing' },
          {
            type: 'p',
            text: "La livraison à l'aéroport ne s'ajoute pas à ces tarifs : seule la location vous est facturée. Au-delà de 10 jours, le tarif par jour baisse sur la plupart des modèles, et la colonne dédiée en donne le montant. Chaque voiture est couverte par une assurance tous risques avec franchise.",
          },
        ],
      },
      {
        h2: "Vol tardif, retard, retour à l'aéroport",
        blocks: [
          {
            type: 'p',
            text: "L'équipe est joignable de 8 h à 22 h, tous les jours. Si votre avion atterrit tard le soir ou tôt le matin, posez la question avant de réserver : elle vous dit ce qui est possible, y compris pour le point de rendez-vous.",
          },
          {
            type: 'p',
            text: "Pour la fin de la location, le lieu de restitution se convient avec l'équipe au moment de la confirmation. Précisez dès la demande si vous repartez en avion, avec votre heure de départ.",
          },
        ],
      },
      {
        h2: "De l'aéroport à votre hôtel, à Rabat ou à Marrakech",
        blocks: [
          {
            type: 'p',
            text: "L'aéroport Mohammed V est relié par autoroute à Casablanca, à Rabat et à Marrakech. Si vous descendez vers le sud dès l'arrivée, la page [location de voiture de Casablanca à Marrakech](route:marrakech) décrit le trajet. Vous préférez vous reposer d'abord ? La voiture peut aussi vous être livrée à votre hôtel de Casablanca, le lendemain, sans frais.",
          },
          {
            type: 'p',
            text: "Pour les autres catégories, de la citadine au SUV familial, voyez la page [location de voiture à l'aéroport de Casablanca](route:aeroport). Toute la gamme de prestige est présentée sur la page [location de voiture de luxe à Casablanca](route:luxe).",
          },
        ],
      },
      {
        h2: "Les voitures de luxe à réserver pour votre arrivée",
        blocks: [{ type: 'vehicles' }],
      },
    ],
    faq: [
      {
        q: "Peut-on récupérer une Mercedes ou un Range Rover directement à l'aéroport Mohammed V ?",
        a: "Oui. Yourent n'a pas de comptoir dans le terminal : la voiture vous est remise à votre arrivée, au point de rendez-vous envoyé sur WhatsApp. Indiquez votre numéro de vol dans la demande.",
      },
      {
        q: "La livraison d'une voiture de luxe à l'aéroport est-elle payante ?",
        a: "Non. La livraison est gratuite à l'aéroport Mohammed V et dans tout Casablanca, quel que soit le modèle.",
      },
      {
        q: "Quelle caution faut-il prévoir à l'arrivée ?",
        a: "Elle dépend du véhicule. L'équipe vous confirme le montant avant le vol ; il se laisse à la remise, par chèque, en espèces ou par empreinte de carte.",
      },
      {
        q: 'Que se passe-t-il si mon vol est retardé ?',
        a: "Prévenez l'équipe sur WhatsApp dès que vous connaissez le nouvel horaire. Pour une arrivée en dehors de 8 h à 22 h, elle précise ce qui est possible.",
      },
      {
        q: "Peut-on rendre la voiture à l'aéroport en fin de séjour ?",
        a: "Le lieu de restitution se convient avec l'équipe au moment de la confirmation. Précisez-le dès votre demande.",
      },
      {
        q: 'Peut-on louer une voiture de luxe pour deux ou trois jours seulement ?',
        a: "Non. La location dure 5 jours minimum, sur tous les modèles.",
      },
    ],
    related: ['luxe', 'aeroport', 'suv-luxe', 'mercedes', 'range-rover', 'porsche'],
  },
};

export default page;
