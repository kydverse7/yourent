import type { LocalizedPage } from '../types';

const page: LocalizedPage = {
  fr: {
    metaTitle: 'Location voiture Mohammedia dès {minPrice} DH | Yourent',
    metaDescription:
      'Location voiture Mohammedia avec Yourent, agence de Casablanca : dès {minPrice} DH par jour, livraison possible avec un léger supplément, 5 jours minimum.',
    eyebrow: 'Mohammedia',
    h1: 'Location de voiture à Mohammedia : livraison depuis Casablanca',
    intro:
      'Pour une location de voiture à Mohammedia, Yourent, agence de Casablanca, loue des voitures à partir de {minPrice} DH par jour, pour 5 jours minimum. La livraison à Mohammedia est possible avec un léger supplément, dont l’équipe confirme le montant sur WhatsApp avant la réservation.',
    breadcrumb: 'Location à Mohammedia',
    vehicles: { sort: 'asc', limit: 6 },
    sections: [
      {
        h2: 'Location de voiture à Mohammedia : un léger supplément de livraison',
        blocks: [
          {
            type: 'p',
            text: 'Mohammedia est une ville de la côte atlantique, au nord-est de Casablanca (source : Wikipédia). Elle reste hors du périmètre de la livraison gratuite de Yourent, qui couvre tout Casablanca et l’aéroport Mohammed V. Yourent peut néanmoins vous livrer à Mohammedia, avec un léger supplément.',
          },
          {
            type: 'p',
            text: 'Le montant du supplément n’est pas affiché sur le site. Écrivez donc à l’équipe avec votre adresse et vos dates : elle vous donne le montant exact avant que vous confirmiez.',
          },
        ],
      },
      {
        h2: 'Voitures à louer dès {minPrice} DH par jour',
        blocks: [
          {
            type: 'p',
            text: 'Six modèles parmi les plus abordables de la flotte, de {minPrice} à {maxPrice} DH par jour, le supplément de livraison s’ajoutant. Si vous préférez une boîte automatique, la page [location de voiture automatique à Casablanca](route:automatique) la propose, et le [catalogue](/catalogue) montre toute la flotte.',
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
              'L’équipe confirme ensuite la disponibilité, le prix de la location et le supplément de livraison.',
              'À la remise, présentez votre pièce d’identité, un permis de plus de 2 ans, un justificatif de domicile et la caution. Le conducteur doit aussi avoir 21 ans.',
            ],
          },
        ],
      },
      {
        h2: 'Durée de location et retour',
        blocks: [
          {
            type: 'p',
            text: 'La location dure 5 jours minimum. Sur la plupart des modèles, un tarif réduit s’applique automatiquement au-delà de 10 jours, et la page [prix de location de voiture à Casablanca](route:tarifs) le détaille. Le lieu de reprise en fin de location, à Mohammedia ou à Casablanca, se décide avec l’équipe en même temps que la remise. Un retour dans une autre ville se confirme donc avant la réservation.',
          },
        ],
      },
    ],
    faq: [
      {
        q: 'Yourent livre-t-il à Mohammedia ?',
        a: 'Oui, la livraison à Mohammedia est possible avec un léger supplément. L’équipe en confirme le montant avant la réservation.',
      },
      {
        q: 'Combien coûte la livraison à Mohammedia ?',
        a: 'Le site n’affiche pas le montant du supplément, mais l’équipe le précise sur WhatsApp selon votre adresse.',
      },
      {
        q: 'Où se trouve l’agence Yourent ?',
        a: 'Elle se situe à Casablanca, au N°25 Rue Ibnou Mounir, 20100, et ouvre chaque jour de 8h à 22h.',
      },
      {
        q: 'Quel est le prix d’une location à Mohammedia ?',
        a: 'Comptez {minPrice} DH par jour au minimum, pour 5 jours au moins ; au-delà de 10 jours, le tarif baisse sur la plupart des modèles. Le supplément de livraison s’ajoute toutefois à ce prix.',
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
