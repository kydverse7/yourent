import type { LocalizedPage } from '../types';

const page: LocalizedPage = {
  fr: {
    metaTitle: 'Location SUV Casablanca : Duster, Tiguan, Touareg | Yourent',
    metaDescription:
      "Location SUV Casablanca : Duster, T-Roc, Tiguan, Touareg, Audi Q3, Macan. Dès {minPrice} DH/jour, livraison gratuite à l'aéroport, assurance tous risques.",
    eyebrow: 'SUV et grands espaces',
    h1: 'Location de SUV à Casablanca : du Duster au Range Rover Sport',
    intro:
      "Yourent propose neuf SUV à la location à Casablanca, dès {minPrice} DH par jour, du Dacia Duster au Range Rover Sport. La voiture est livrée gratuitement à Casablanca et à l'aéroport Mohammed V. Vous choisissez le SUV et vos dates en ligne, puis l'équipe confirme sur WhatsApp. Comptez 5 jours de location au minimum.",
    breadcrumb: 'Location SUV',
    vehicles: {
      models: [
        'dacia-duster',
        'volkswagen-t-roc',
        'kia-sorento',
        'volkswagen-tiguan',
        'audi-q3',
        'volkswagen-touareg',
        'range-rover-evoque',
        'porsche-macan',
        'range-rover-sport',
      ],
      sort: 'asc',
    },
    sections: [
      {
        h2: 'Location de SUV à Casablanca : quel modèle selon votre trajet',
        blocks: [
          {
            type: 'p',
            text: "Un SUV se loue surtout pour sa position de conduite haute et son coffre. Avec neuf modèles, vous avez de la marge selon le budget et le nombre de bagages.",
          },
          {
            type: 'list',
            items: [
              "**Petit budget** : le [Dacia Duster](/catalogue/dacia-duster), diesel à boîte manuelle, est le SUV le plus abordable de la flotte, et aussi l'un des plus nombreux.",
              "**Urbain et compact** : le [Volkswagen T-Roc](/catalogue/volkswagen-t-roc) et l'[Audi Q3](/catalogue/audi-q3) restent pratiques en ville comme sur autoroute.",
              "**Famille et long trajet** : le [Kia Sorento](/catalogue/kia-sorento), le [Volkswagen Tiguan](/catalogue/volkswagen-tiguan) et le [Touareg](/catalogue/volkswagen-touareg) sont plus grands, diesel, à boîte automatique.",
              "**Premium** : le [Range Rover Evoque](/catalogue/range-rover-evoque), le [Porsche Macan](/catalogue/porsche-macan) et le [Range Rover Sport](/catalogue/range-rover-sport) visent le prestige. Voyez aussi notre [location de voiture de luxe à Casablanca](route:luxe).",
            ],
          },
          {
            type: 'p',
            text: "Chaque SUV de la sélection compte 5 places. Pour partir à plusieurs avec des valises, regardez donc les plus grands : le Sorento, le Tiguan et le Touareg.",
          },
        ],
      },
      {
        h2: 'Location 4x4 à Casablanca : SUV ou vrai tout-terrain ?',
        blocks: [
          {
            type: 'p',
            text: "Beaucoup de recherches \"location 4x4 Casablanca\" visent en réalité un SUV : une voiture haute et confortable pour la route. C'est ce que Yourent propose. En revanche, nous ne présentons pas ces véhicules comme des 4x4 tout-terrain.",
          },
          {
            type: 'p',
            text: "Si vous cherchez précisément une transmission intégrale, par exemple pour une piste, la montagne ou l'Atlas, demandez à l'équipe sur WhatsApp quel modèle convient avant de réserver. Elle vous répond selon les véhicules libres à vos dates. Pour la ville, l'autoroute et les routes goudronnées, n'importe quel SUV de la liste ci-dessous suffit en pratique.",
          },
        ],
      },
      {
        h2: 'Prix de la location de SUV à Casablanca',
        blocks: [
          {
            type: 'p',
            text: "Les tarifs vont de {minPrice} DH à {maxPrice} DH par jour selon le SUV. Sur la plupart de ces modèles, le prix baisse automatiquement au-delà de 10 jours, ce qui compte pour un séjour long.",
          },
          { type: 'pricing' },
        ],
      },
      {
        h2: 'Diesel, essence, manuelle ou automatique : ce qui change entre les SUV',
        blocks: [
          {
            type: 'p',
            text: "La plupart des SUV de la flotte roulent au diesel, plus économique sur de longues distances. Le T-Roc et le Macan, eux, sont à essence. Côté boîte, le Duster est en manuelle, alors que les autres SUV sont en automatique. L'Audi Q3 existe toutefois dans les deux versions : le choix se confirme à la réservation. Pour tout voir, consultez notre [location de voiture automatique à Casablanca](route:automatique).",
          },
        ],
      },
      {
        h2: 'Louer un SUV à Casablanca et se faire livrer',
        blocks: [
          {
            type: 'list',
            ordered: true,
            items: [
              "Utilisez la recherche par dates du catalogue pour voir quels SUV sont libres.",
              "Envoyez ensuite votre demande en ligne : elle n'engage aucun paiement.",
              "L'équipe confirme sur WhatsApp ou par téléphone et indique la caution.",
              "Le SUV est livré sans frais à Casablanca ou à l'aéroport, 7j/7 : voyez notre page [location de voiture à l'aéroport de Casablanca](route:aeroport).",
            ],
          },
          {
            type: 'p',
            text: "Pour louer un SUV, il faut avoir au moins 21 ans et un permis de plus de 2 ans. Prévoyez aussi une pièce d'identité (CIN ou passeport) et un justificatif de domicile. Si vous venez de l'étranger, le permis international convient également, comme le rappellent nos [conditions de location de voiture](route:conditions).",
          },
        ],
      },
      {
        h2: 'Les SUV disponibles',
        blocks: [{ type: 'vehicles' }],
      },
    ],
    faq: [
      {
        q: 'Quel est le SUV le moins cher à louer à Casablanca ?',
        a: "Le Dacia Duster, à partir de {minPrice} DH par jour. C'est un diesel à boîte manuelle, et l'un des modèles les plus nombreux de la flotte.",
      },
      {
        q: 'Vos SUV sont-ils des 4x4 ?',
        a: "Yourent loue des SUV pour la route, la ville et l'autoroute. Pour une transmission intégrale ou un usage sur piste, interrogez donc l'équipe sur WhatsApp avant de réserver.",
      },
      {
        q: 'Quel SUV choisir pour partir en famille à Marrakech ?',
        a: "Le Kia Sorento, le Volkswagen Tiguan et le Touareg sont les plus grands de la sélection, avec un coffre adapté aux valises. Tous trois ont 5 places et une boîte automatique.",
      },
      {
        q: 'Peut-on louer un SUV en boîte automatique ?',
        a: "Oui. Tous les SUV sont en automatique, sauf le Dacia Duster qui est en manuelle. Quant à l'Audi Q3, il existe dans les deux boîtes : l'équipe confirme votre choix à la réservation.",
      },
      {
        q: 'Quelle durée minimale pour louer un SUV ?',
        a: "Il faut réserver un SUV pour 5 jours au moins. Au-delà de 10 jours, le tableau de cette page donne le tarif de chaque modèle.",
      },
    ],
    related: ['automatique', 'luxe', 'tarifs', 'aeroport', 'longue-duree'],
  },
};

export default page;
