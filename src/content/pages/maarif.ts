import type { LocalizedPage } from '../types';

const page: LocalizedPage = {
  fr: {
    metaTitle: 'Location voiture Maarif Casablanca dès {minPrice} DH | Yourent',
    metaDescription:
      'Location voiture Maarif Casablanca : agence Rue Ibnou Mounir, livraison gratuite au Maarif, dès {minPrice} DH par jour, note Google 4,8/5, réservation par dates.',
    eyebrow: 'Maarif',
    h1: 'Location de voiture au Maarif, Casablanca : agence et livraison gratuite',
    intro:
      'Pour une location de voiture au Maarif, Yourent vous loue une voiture à partir de {minPrice} DH par jour, pour 5 jours minimum. L’agence se trouve au N°25 Rue Ibnou Mounir, dans le quartier du Maarif, et la livraison y est gratuite de 8h à 22h, 7j/7. Vous choisissez vos dates en ligne, puis l’équipe confirme sur WhatsApp.',
    breadcrumb: 'Location au Maarif',
    vehicles: { sort: 'asc', limit: 6 },
    sections: [
      {
        h2: 'Location de voiture au Maarif : une agence Rue Ibnou Mounir',
        blocks: [
          {
            type: 'p',
            text: 'Yourent est installé au N°25 Rue Ibnou Mounir, 20100 Casablanca, dans le quartier du Maarif. Si vous logez, travaillez ou séjournez dans le quartier, l’agence est dans votre secteur : pas besoin de traverser la ville pour obtenir une voiture. L’équipe peut aussi vous livrer.',
          },
          {
            type: 'p',
            text: 'Le plan et les avis clients sont sur la [fiche Google de Yourent](https://www.google.com/maps/place/YouRent/@33.5820604,-7.6363812,17z). La note Google atteint 4,8 sur 5 pour 170 avis, selon le relevé du 5 novembre 2026.',
          },
        ],
      },
      {
        h2: 'Les voitures les moins chères au départ du Maarif',
        blocks: [
          {
            type: 'p',
            text: 'Les six modèles les moins chers de la flotte vont de {minPrice} à {maxPrice} DH par jour. Pour un SUV, une berline ou une voiture premium, le [catalogue de location de voitures](/catalogue) montre toute la flotte.',
          },
          { type: 'vehicles' },
        ],
      },
      {
        h2: 'Livraison gratuite au Maarif',
        blocks: [
          {
            type: 'p',
            text: 'La livraison ne coûte rien dans tout Casablanca, donc au Maarif aussi : à votre hôtel, à votre bureau ou à votre domicile. Indiquez l’adresse et l’heure souhaitée sur WhatsApp, puis l’équipe confirme. En fin de location, le lieu de reprise se règle avec l’équipe en même temps que la remise.',
          },
        ],
      },
      {
        h2: 'Louer 5 jours minimum : à qui cela convient',
        blocks: [
          {
            type: 'p',
            text: 'Yourent ne loue pas à la journée. En revanche, la formule convient à un séjour professionnel de plusieurs jours ou à une famille en visite. Elle sert aussi à un résident qui a besoin d’un véhicule pendant quelques semaines. Au-delà de 10 jours, le tarif baisse automatiquement sur la plupart des modèles. Pour comparer les voitures, la page [prix de location de voiture à Casablanca](route:tarifs) liste chaque modèle.',
          },
        ],
      },
      {
        h2: 'Âge, documents et caution',
        blocks: [
          {
            type: 'p',
            text: 'Il faut avoir 21 ans pour conduire. Prévoyez aussi une pièce d’identité (CIN ou passeport), un permis de plus de 2 ans et un justificatif de domicile. La caution se verse au départ, par chèque, en espèces ou par empreinte de carte, et les [conditions de location de voiture à Casablanca](route:conditions) donnent le détail.',
          },
        ],
      },
    ],
    faq: [
      {
        q: 'Où se trouve l’agence Yourent par rapport au Maarif ?',
        a: 'Elle se trouve au N°25 Rue Ibnou Mounir, 20100 Casablanca, dans le quartier du Maarif.',
      },
      {
        q: 'La livraison au Maarif est-elle payante ?',
        a: 'Non. La livraison est gratuite dans tout Casablanca, Maarif compris, de 8h à 22h, 7j/7.',
      },
      {
        q: 'Quel est le prix d’une location de voiture au Maarif ?',
        a: 'Les tarifs démarrent à {minPrice} DH par jour, pour une location de 5 jours minimum. Ils restent identiques partout à Casablanca, donc le lieu de livraison ne change pas le prix.',
      },
      {
        q: 'Peut-on louer une voiture au Maarif pour un week-end ?',
        a: 'Non, la location dure 5 jours minimum. Aucune formule au week-end n’existe chez Yourent.',
      },
      {
        q: 'Comment réserver une voiture au Maarif ?',
        a: 'Choisissez un modèle dans le catalogue, indiquez vos dates, puis envoyez la demande. L’équipe confirme alors par WhatsApp ou par téléphone, sans paiement en ligne.',
      },
    ],
    related: ['tarifs', 'conditions', 'casa-voyageurs', 'economique', 'contact'],
  },
};

export default page;
