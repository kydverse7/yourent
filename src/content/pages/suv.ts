import type { LocalizedPage } from '../types';

const page: LocalizedPage = {
  fr: {
    metaTitle: 'Location SUV Casablanca : Duster, Tiguan, Touareg | Yourent',
    metaDescription:
      'Location SUV à Casablanca : Duster, T-Roc, Tiguan, Touareg, Audi Q3, Macan. Dès {minPrice} DH/jour, livraison gratuite, assurance tous risques. Demande en ligne.',
    eyebrow: 'SUV et grands espaces',
    h1: 'Location SUV à Casablanca',
    intro:
      "Yourent propose des SUV à louer à Casablanca dès {minPrice} DH par jour, du Dacia Duster au Range Rover Sport. La livraison est gratuite à Casablanca et à l'aéroport Mohammed V. Vous choisissez le SUV et vos dates en ligne, l'équipe confirme sur WhatsApp. Location de 5 jours minimum.",
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
        h2: 'Quel SUV louer à Casablanca selon votre trajet',
        blocks: [
          {
            type: 'p',
            text: "Un SUV se loue pour sa position de conduite haute, son coffre et son confort sur route. Yourent en propose neuf modèles, ce qui laisse de la marge selon le budget et le nombre de bagages.",
          },
          {
            type: 'list',
            items: [
              "**Petit budget** : le [Dacia Duster](/catalogue/dacia-duster), diesel à boîte manuelle, est le SUV le plus abordable de la flotte, et l'un des plus nombreux.",
              "**Urbain et compact** : le [Volkswagen T-Roc](/catalogue/volkswagen-t-roc) et l'[Audi Q3](/catalogue/audi-q3), pratiques en ville comme sur autoroute.",
              "**Famille et long trajet** : le [Kia Sorento](/catalogue/kia-sorento), le [Volkswagen Tiguan](/catalogue/volkswagen-tiguan) et le [Touareg](/catalogue/volkswagen-touareg), plus grands, diesel, à boîte automatique.",
              "**Premium** : le [Range Rover Evoque](/catalogue/range-rover-evoque), le [Porsche Macan](/catalogue/porsche-macan) et le [Range Rover Sport](/catalogue/range-rover-sport), si vous voulez du prestige. Voir aussi la page [voiture de luxe](route:luxe).",
            ],
          },
          {
            type: 'p',
            text: "Tous les SUV ont 5 places. Pour partir à plusieurs avec des valises, privilégiez le Sorento, le Tiguan ou le Touareg.",
          },
        ],
      },
      {
        h2: 'Location 4x4 à Casablanca : SUV ou vrai tout-terrain ?',
        blocks: [
          {
            type: 'p',
            text: "Beaucoup de recherches \"location 4x4 Casablanca\" visent en réalité un SUV : une voiture haute et confortable pour la route. C'est ce que Yourent propose. Nous ne présentons pas ces véhicules comme des 4x4 tout-terrain.",
          },
          {
            type: 'p',
            text: "Si vous cherchez précisément une transmission intégrale, par exemple pour une piste, la montagne ou l'Atlas, demandez à l'équipe sur WhatsApp quel modèle convient avant de réserver. Elle vous répond selon le véhicule réellement disponible à vos dates. Pour la ville, l'autoroute et les routes goudronnées, un SUV de la liste ci-dessous suffit.",
          },
        ],
      },
      {
        h2: 'Tarifs des SUV à louer',
        blocks: [
          {
            type: 'p',
            text: "Les SUV de Yourent s'étendent de {minPrice} DH à {maxPrice} DH par jour. Le tarif baisse automatiquement au-delà de 10 jours, ce qui compte pour un séjour long.",
          },
          { type: 'pricing' },
        ],
      },
      {
        h2: 'Diesel, essence, manuelle ou automatique : ce qui change entre les SUV',
        blocks: [
          {
            type: 'p',
            text: "La plupart des SUV de la flotte roulent au diesel, plus économique sur de longues distances. Le T-Roc et le Macan sont à essence. Côté boîte, le Duster est en manuelle, les autres SUV sont en automatique, et l'Audi Q3 existe dans les deux versions : le choix se confirme à la réservation. Les modèles à boîte automatique sont regroupés sur la page [location voiture automatique](route:automatique).",
          },
        ],
      },
      {
        h2: 'Réserver un SUV et se faire livrer',
        blocks: [
          {
            type: 'list',
            ordered: true,
            items: [
              "Utilisez la recherche par dates du catalogue pour voir quels SUV sont libres.",
              "Envoyez votre demande en ligne : elle n'engage aucun paiement.",
              "L'équipe confirme sur WhatsApp ou par téléphone et indique la caution.",
              "Le SUV est livré gratuitement à Casablanca ou à l'[aéroport Mohammed V](route:aeroport), 7j/7.",
            ],
          },
          {
            type: 'p',
            text: "Pensez à prévoir une pièce d'identité (CIN ou passeport), un permis de plus de 2 ans et un justificatif de domicile. Les touristes étrangers peuvent présenter le permis international. Détails dans les [conditions de location](route:conditions).",
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
        a: "Yourent loue des SUV pour la route, la ville et l'autoroute. Pour une transmission intégrale ou un usage sur piste, demandez à l'équipe sur WhatsApp quel modèle convient avant de réserver.",
      },
      {
        q: 'Quel SUV choisir pour partir en famille à Marrakech ?',
        a: "Le Kia Sorento, le Volkswagen Tiguan et le Touareg sont les plus spacieux et les plus confortables pour un long trajet avec des bagages. Tous ont 5 places et une boîte automatique.",
      },
      {
        q: 'Peut-on louer un SUV en boîte automatique ?',
        a: "Oui. Tous les SUV sont en automatique, sauf le Dacia Duster qui est en manuelle. L'Audi Q3 existe en automatique et en manuelle : le choix se confirme à la réservation.",
      },
      {
        q: 'Quelle durée minimale pour louer un SUV ?',
        a: "La location est de 5 jours minimum. Au-delà de 10 jours, un tarif réduit s'applique automatiquement.",
      },
    ],
    related: ['automatique', 'luxe', 'tarifs', 'aeroport', 'longue-duree'],
  },
};

export default page;
