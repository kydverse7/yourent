import type { LocalizedPage } from '../types';

const page: LocalizedPage = {
  fr: {
    metaTitle: 'Location SUV de luxe Casablanca dès {minPrice} DH | Yourent',
    metaDescription:
      "Location de SUV de luxe à Casablanca : Range Rover Sport, Evoque, Porsche Macan, Touareg, Audi Q3, de {minPrice} à {maxPrice} DH/jour. Livraison gratuite.",
    eyebrow: 'SUV haut de gamme',
    h1: 'Location de SUV de luxe à Casablanca : Range Rover, Porsche Macan, Touareg',
    intro:
      "Yourent loue cinq SUV haut de gamme à Casablanca : le Range Rover Sport, le Porsche Macan, le Range Rover Evoque, le Volkswagen Touareg et l'Audi Q3, de {minPrice} DH à {maxPrice} DH par jour. Tous ont 5 places, et la livraison est gratuite dans Casablanca comme à l'aéroport Mohammed V. La location dure 5 jours minimum : vous envoyez votre demande en ligne, puis l'équipe confirme sur WhatsApp ou par téléphone.",
    breadcrumb: 'SUV de luxe',
    vehicles: {
      models: ['range-rover-sport', 'porsche-macan', 'range-rover-evoque', 'volkswagen-touareg', 'audi-q3'],
      sort: 'desc',
    },
    sections: [
      {
        h2: 'Cinq SUV de luxe à louer à Casablanca, du plus compact au plus grand',
        blocks: [
          {
            type: 'p',
            text: "Une **location de SUV de luxe à Casablanca** se choisit d'abord sur le gabarit, puis sur le carburant et le budget. Le tableau résume les cinq modèles de la sélection, avec leur tarif par jour de 5 à 10 jours.",
          },
          {
            type: 'table',
            head: ['Modèle', 'Gabarit', 'Carburant et boîte', 'Tarif par jour'],
            rows: [
              [
                '[Audi Q3](/catalogue/audi-q3)',
                'SUV compact premium',
                "Diesel ou essence, automatique ou manuelle selon l'exemplaire",
                '{price:audi-q3} DH',
              ],
              ['[Range Rover Evoque](/catalogue/range-rover-evoque)', 'SUV compact', 'Diesel, automatique', '{price:range-rover-evoque} DH'],
              ['[Porsche Macan](/catalogue/porsche-macan)', 'SUV compact sportif', 'Essence, automatique', '{price:porsche-macan} DH'],
              ['[Volkswagen Touareg](/catalogue/volkswagen-touareg)', 'Grand SUV', 'Diesel, automatique', '{price:volkswagen-touareg} DH'],
              ['[Range Rover Sport](/catalogue/range-rover-sport)', 'Grand SUV', 'Diesel, automatique', '{price:range-rover-sport} DH'],
            ],
          },
          {
            type: 'p',
            text: "Pour l'Audi Q3, indiquez la boîte et le carburant que vous préférez dans votre demande : l'équipe vous dit quel exemplaire est libre à vos dates.",
          },
        ],
      },
      {
        h2: 'Quel SUV haut de gamme choisir selon votre usage',
        blocks: [
          {
            type: 'list',
            items: [
              "**Le plus statutaire** : le [Range Rover Sport](/catalogue/range-rover-sport) est le modèle le plus haut de gamme de la flotte. C'est un grand SUV, à choisir quand l'image et la place à bord comptent autant l'une que l'autre.",
              "**Le plus plaisant à conduire** : le [Porsche Macan](/catalogue/porsche-macan) se comporte davantage comme une berline sportive que comme un SUV haut. Il convient à un séjour à deux ou à une petite famille.",
              "**Le prestige en format compact** : le [Range Rover Evoque](/catalogue/range-rover-evoque) porte l'image de la marque dans un gabarit plus facile à garer en ville.",
              "**L'espace pour un budget mesuré** : le [Volkswagen Touareg](/catalogue/volkswagen-touareg) est un grand SUV, proposé en plusieurs exemplaires, ce qui aide à en trouver un libre à vos dates.",
              "**L'entrée dans le haut de gamme** : l'[Audi Q3](/catalogue/audi-q3) garde un format compact et une image soignée.",
            ],
          },
          {
            type: 'p',
            text: "Vous hésitez entre deux modèles ? Nos comparatifs [Porsche Macan ou Range Rover Evoque](/blog/porsche-macan-ou-range-rover-evoque-casablanca) et [Range Rover Sport ou Volkswagen Touareg](/blog/range-rover-sport-ou-volkswagen-touareg-casablanca) reprennent les différences point par point.",
          },
        ],
      },
      {
        h2: "Prix d'un SUV de luxe à Casablanca : tarifs et cautions",
        blocks: [
          { type: 'pricing' },
          {
            type: 'p',
            text: "Le tableau donne, pour chaque SUV, le tarif de 5 à 10 jours, celui qui s'applique au-delà de 10 jours et la caution quand elle est renseignée. Tous les modèles ne baissent pas après 10 jours : la colonne dédiée le dit pour chacun. L'assurance tous risques avec franchise est incluse, et la livraison à Casablanca ne s'ajoute pas au tarif.",
          },
        ],
      },
      {
        h2: 'Location 4x4 de luxe à Casablanca : ce que ces SUV font, et ne font pas',
        blocks: [
          {
            type: 'p',
            text: "On cherche souvent un « 4x4 de luxe » quand on veut une voiture haute, confortable et valorisante pour la route. C'est exactement l'usage de ces cinq modèles : la ville, l'autoroute, les routes goudronnées vers Rabat, Marrakech ou la côte.",
          },
          {
            type: 'p',
            text: "Yourent ne les présente pas, en revanche, comme des véhicules tout-terrain. Si votre programme comprend des pistes ou de la montagne, demandez à l'équipe sur WhatsApp quel modèle convient avant de réserver. Les SUV plus accessibles, du Dacia Duster au Kia Sorento, sont réunis sur la page [location de SUV à Casablanca](route:suv).",
          },
        ],
      },
      {
        h2: 'SUV de luxe ou berline de luxe ?',
        blocks: [
          {
            type: 'p',
            text: "Le SUV apporte une position de conduite haute, de la place pour les bagages et une présence qui se remarque. La berline reste plus sobre, ce qui convient mieux à certains rendez-vous professionnels. À budget voisin, comparez par exemple le Range Rover Evoque avec la Mercedes CLA, ou le Touareg avec la Mercedes Classe C 220.",
          },
          {
            type: 'p',
            text: "Les berlines sont présentées sur la page [location de berline à Casablanca](route:berline), et toute la gamme de prestige sur la page [location de voiture de luxe à Casablanca](route:luxe).",
          },
        ],
      },
      {
        h2: 'Livraison, durée et conditions pour louer un SUV de prestige',
        blocks: [
          {
            type: 'list',
            items: [
              "**Livraison** : gratuite à Casablanca, à l'hôtel comme à domicile, et à l'aéroport Mohammed V. La page [voiture de luxe à l'aéroport de Casablanca](route:luxe-aeroport) décrit la remise à l'arrivée. La livraison est gratuite aussi à Marrakech et à l'aéroport Marrakech-Ménara : voyez la [location de voiture à Marrakech](route:livraison-marrakech).",
              "**Durée** : 5 jours minimum, sans formule à la journée ni au week-end. Pour plusieurs semaines, lisez la page [voiture de luxe en longue durée](route:luxe-longue-duree).",
              "**Conducteur** : 21 ans minimum et un permis de plus de 2 ans, avec une pièce d'identité valide et un justificatif de domicile.",
              "**Caution** : elle se laisse au départ, par chèque, en espèces ou par empreinte de carte, et vous revient au retour de la voiture en bon état.",
            ],
          },
          {
            type: 'p',
            text: "Le détail figure dans les [conditions de location de voiture](route:conditions). Vous pouvez modifier ou annuler sans frais jusqu'à 24 h avant la prise en charge.",
          },
        ],
      },
      {
        h2: 'Les SUV de luxe disponibles',
        blocks: [{ type: 'vehicles' }],
      },
    ],
    faq: [
      {
        q: "À partir de quel prix peut-on louer un SUV de luxe à Casablanca ?",
        a: "Chez Yourent, les tarifs de cette sélection partent de {minPrice} DH par jour : l'Audi Q3 est à {price:audi-q3} DH, le Range Rover Evoque à {price:range-rover-evoque} DH et le Volkswagen Touareg à {price:volkswagen-touareg} DH. Le Range Rover Sport est à {price:range-rover-sport} DH par jour.",
      },
      {
        q: 'Quelle différence entre le Range Rover Sport et le Porsche Macan ?',
        a: "Le [Range Rover Sport](/catalogue/range-rover-sport) est un grand SUV diesel, choisi pour l'espace et l'image. Le [Porsche Macan](/catalogue/porsche-macan) est plus compact, roule à l'essence et mise sur la conduite. Tous deux ont une boîte automatique et 5 places.",
      },
      {
        q: 'Ces SUV de luxe sont-ils des 4x4 tout-terrain ?',
        a: "Yourent les loue pour la route, la ville et l'autoroute, et ne les présente pas comme des véhicules tout-terrain. Pour une piste ou la montagne, demandez à l'équipe quel modèle convient avant de réserver.",
      },
      {
        q: 'Peut-on louer un SUV de luxe pour un week-end ou un mariage ?',
        a: "Pas pour un week-end seul : la location dure 5 jours minimum. Pour un mariage, réservez une période de 5 jours qui englobe la date et signalez-la dans votre demande.",
      },
      {
        q: 'Quelle caution faut-il prévoir pour un SUV de luxe ?',
        a: "Le montant dépend du véhicule : il figure dans le tableau des tarifs quand il est renseigné, et l'équipe le confirme avant la réservation. Il se laisse au départ, par chèque, en espèces ou par empreinte de carte.",
      },
      {
        q: "Le SUV peut-il être livré à l'aéroport ou à mon hôtel ?",
        a: "Oui, gratuitement, dans tout Casablanca et à l'aéroport Mohammed V, tous les jours de 8 h à 22 h, ainsi qu'à Marrakech et à l'aéroport Marrakech-Ménara.",
      },
    ],
    related: ['luxe', 'range-rover', 'porsche', 'suv', 'luxe-aeroport', 'berline'],
  },
};

export default page;
