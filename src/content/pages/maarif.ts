import type { LocalizedPage } from '../types';

const page: LocalizedPage = {
  fr: {
    metaTitle: 'Location voiture Maarif Casablanca dès {minPrice} DH | Yourent',
    metaDescription:
      'Location de voiture au Maarif à Casablanca : agence Rue Ibnou Mounir, livraison gratuite au Maarif, dès {minPrice} DH par jour, 5 jours minimum, réservation par dates.',
    eyebrow: 'Maarif',
    h1: 'Location de voiture au Maarif, à Casablanca',
    intro:
      'Yourent loue des voitures au Maarif à partir de {minPrice} DH par jour, pour 5 jours minimum. L’agence se trouve N°25 Rue Ibnou Mounir à Casablanca, dans le quartier du Maarif, et la livraison au Maarif est gratuite, de 8h à 22h, 7j/7. Vous choisissez vos dates en ligne, l’équipe confirme sur WhatsApp.',
    breadcrumb: 'Location voiture Maarif',
    vehicles: { sort: 'asc', limit: 6 },
    sections: [
      {
        h2: 'Une agence Rue Ibnou Mounir',
        blocks: [
          {
            type: 'p',
            text: 'Yourent est installé N°25 Rue Ibnou Mounir, 20100 Casablanca, dans le quartier du Maarif. Si vous logez, travaillez ou êtes en visite dans le quartier, vous n’avez pas à traverser Casablanca pour obtenir une voiture : l’agence est dans votre secteur, et l’équipe peut aussi vous livrer.',
          },
          {
            type: 'p',
            text: 'Le plan et les avis clients sont sur la [fiche Google de Yourent](https://www.google.com/maps/place/YouRent/@33.5820604,-7.6363812,17z). La note Google est de 4,8 sur 5 pour 170 avis (relevé du 5 novembre 2026).',
          },
        ],
      },
      {
        h2: 'Les voitures les moins chères au départ du Maarif',
        blocks: [
          {
            type: 'p',
            text: 'Voici les six modèles les plus abordables de la flotte, de {minPrice} à {maxPrice} DH par jour. Les SUV, les berlines et les voitures premium sont dans le [catalogue](/catalogue).',
          },
          { type: 'vehicles' },
        ],
      },
      {
        h2: 'Livraison gratuite au Maarif',
        blocks: [
          {
            type: 'p',
            text: 'La livraison est gratuite dans tout Casablanca, donc au Maarif aussi : à votre hôtel, à votre bureau ou à votre domicile. Indiquez l’adresse et l’heure souhaitée sur WhatsApp, l’équipe confirme. Pour récupérer le véhicule à la fin de la location, le lieu de reprise se règle avec l’équipe en même temps que la remise.',
          },
        ],
      },
      {
        h2: 'Louer 5 jours minimum : à qui cela convient',
        blocks: [
          {
            type: 'p',
            text: 'Yourent ne loue pas à la journée. La formule convient à un séjour professionnel de plusieurs jours, à une famille en visite ou à un résident qui a besoin d’un véhicule pendant quelques semaines. Au-delà de 10 jours, le tarif baisse automatiquement sur la plupart des modèles. Voyez la page [tarifs](route:tarifs) pour les prix de chaque modèle.',
          },
        ],
      },
      {
        h2: 'Documents et caution',
        blocks: [
          {
            type: 'p',
            text: 'Prévoyez une pièce d’identité valide (CIN ou passeport), un permis de plus de 2 ans, un justificatif de domicile et une caution au départ, par chèque, en espèces ou par empreinte de carte. Le détail figure dans les [conditions de location](route:conditions).',
          },
        ],
      },
    ],
    faq: [
      {
        q: 'Où se trouve l’agence Yourent par rapport au Maarif ?',
        a: 'L’agence est au N°25 Rue Ibnou Mounir, 20100 Casablanca, dans le quartier du Maarif.',
      },
      {
        q: 'La livraison au Maarif est-elle payante ?',
        a: 'Non, la livraison est gratuite dans tout Casablanca, Maarif compris, de 8h à 22h, 7j/7.',
      },
      {
        q: 'Quel est le prix d’une location de voiture au Maarif ?',
        a: 'Les tarifs démarrent à {minPrice} DH par jour pour une location de 5 jours minimum. Ils sont identiques partout à Casablanca, le lieu de livraison ne change pas le prix.',
      },
      {
        q: 'Peut-on louer une voiture au Maarif pour un week-end ?',
        a: 'Non, la location est de 5 jours minimum. Il n’y a pas de formule au week-end.',
      },
      {
        q: 'Comment réserver une voiture au Maarif ?',
        a: 'Choisissez un modèle dans le catalogue, indiquez vos dates, puis envoyez la demande. L’équipe confirme sur WhatsApp ou par téléphone. Il n’y a pas de paiement en ligne.',
      },
    ],
    related: ['tarifs', 'conditions', 'casa-voyageurs', 'economique', 'contact'],
  },
};

export default page;
