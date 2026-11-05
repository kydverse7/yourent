import type { LocalizedPage } from '../types';

const page: LocalizedPage = {
  fr: {
    metaTitle: 'Location voiture Mohammedia dès {minPrice} DH | Yourent',
    metaDescription:
      'Location de voiture à Mohammedia avec Yourent, agence de Casablanca : dès {minPrice} DH par jour, livraison possible avec un léger supplément, 5 jours minimum.',
    eyebrow: 'Mohammedia',
    h1: 'Location de voiture à Mohammedia',
    intro:
      'Yourent, agence de Casablanca, loue des voitures à Mohammedia à partir de {minPrice} DH par jour, pour 5 jours minimum. La livraison à Mohammedia est possible avec un léger supplément, dont le montant se confirme avec l’équipe sur WhatsApp avant la réservation.',
    breadcrumb: 'Location voiture Mohammedia',
    vehicles: { sort: 'asc', limit: 6 },
    sections: [
      {
        h2: 'Livraison à Mohammedia : un léger supplément',
        blocks: [
          {
            type: 'p',
            text: 'Mohammedia est une ville de la côte atlantique, au nord-est de Casablanca (source : Wikipédia). Elle est hors du périmètre de la livraison gratuite de Yourent, qui couvre tout Casablanca et l’aéroport Mohammed V. Yourent peut malgré tout vous livrer à Mohammedia, avec un léger supplément.',
          },
          {
            type: 'p',
            text: 'Le montant du supplément n’est pas affiché sur le site : écrivez à l’équipe avec votre adresse et vos dates, elle vous donne le montant exact avant que vous confirmiez.',
          },
        ],
      },
      {
        h2: 'Voitures à louer dès {minPrice} DH par jour',
        blocks: [
          {
            type: 'p',
            text: 'Six modèles parmi les plus abordables de la flotte, de {minPrice} à {maxPrice} DH par jour, supplément de livraison en plus. Vous voulez plus d’espace ou une boîte automatique ? Voyez la [location de voiture automatique](route:automatique) et le [catalogue](/catalogue).',
          },
          { type: 'vehicles' },
        ],
      },
      {
        h2: 'Comment louer depuis Mohammedia',
        blocks: [
          {
            type: 'list',
            ordered: true,
            items: [
              'Choisissez un modèle et vos dates : la recherche par dates écarte les voitures déjà louées.',
              'Écrivez sur WhatsApp en précisant « livraison à Mohammedia », avec l’adresse et l’heure voulues.',
              'L’équipe confirme la disponibilité, le prix de la location et le supplément de livraison.',
              'À la remise : pièce d’identité, permis de plus de 2 ans, justificatif de domicile et caution.',
            ],
          },
        ],
      },
      {
        h2: 'Durée de location et retour',
        blocks: [
          {
            type: 'p',
            text: 'La location dure 5 jours minimum. Un tarif réduit s’applique automatiquement au-delà de 10 jours : voir la page [tarifs](route:tarifs). Le lieu de reprise en fin de location, à Mohammedia ou à Casablanca, se décide avec l’équipe en même temps que la remise : un retour dans une autre ville se confirme avant la réservation.',
          },
        ],
      },
    ],
    faq: [
      {
        q: 'Yourent livre-t-il à Mohammedia ?',
        a: 'Oui, la livraison à Mohammedia est possible avec un léger supplément. Le montant se confirme avec l’équipe avant la réservation.',
      },
      {
        q: 'Combien coûte la livraison à Mohammedia ?',
        a: 'Le montant du supplément n’est pas affiché sur le site. L’équipe le précise sur WhatsApp selon votre adresse.',
      },
      {
        q: 'Où se trouve l’agence Yourent ?',
        a: 'À Casablanca, N°25 Rue Ibnou Mounir, 20100. Elle est ouverte de 8h à 22h, 7j/7.',
      },
      {
        q: 'Quel est le prix d’une location à Mohammedia ?',
        a: 'Les tarifs démarrent à {minPrice} DH par jour pour 5 jours minimum, avec un tarif réduit au-delà de 10 jours. Le supplément de livraison s’ajoute.',
      },
      {
        q: 'Peut-on rendre la voiture à Mohammedia ?',
        a: 'Le lieu de reprise se confirme avec l’équipe avant la réservation, comme tout retour hors de Casablanca.',
      },
    ],
    related: ['tarifs', 'conditions', 'automatique', 'bouskoura', 'contact'],
  },
};

export default page;
