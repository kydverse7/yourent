import type { LocalizedPage } from '../types';

const page: LocalizedPage = {
  fr: {
    metaTitle: 'Location voiture Bouskoura dès {minPrice} DH | Yourent',
    metaDescription:
      'Location voiture Bouskoura avec Yourent, agence de Casablanca : dès {minPrice} DH par jour, 5 jours minimum, conditions de livraison confirmées sur WhatsApp.',
    eyebrow: 'Bouskoura',
    h1: 'Location de voiture à Bouskoura : agence de Casablanca et livraison',
    intro:
      'Pour une location de voiture à Bouskoura, Yourent, agence de Casablanca, loue des voitures aux habitants de la commune à partir de {minPrice} DH par jour, pour 5 jours minimum. La livraison ne coûte rien dans Casablanca ni à l’aéroport Mohammed V. Pour Bouskoura, commune voisine, l’équipe confirme les conditions sur WhatsApp avant la réservation.',
    breadcrumb: 'Location à Bouskoura',
    vehicles: { sort: 'asc', limit: 6 },
    sections: [
      {
        h2: 'Location de voiture à Bouskoura : ce qu’il faut savoir avant de louer',
        blocks: [
          {
            type: 'p',
            text: 'Bouskoura est une commune urbaine de la province de Nouaceur, dans la région Casablanca-Settat, en périphérie de Casablanca (source : Wikipédia). L’agence Yourent est à Casablanca, N°25 Rue Ibnou Mounir. Bouskoura n’entre donc pas dans le périmètre de la livraison gratuite annoncée, qui couvre Casablanca et l’aéroport Mohammed V.',
          },
          {
            type: 'p',
            text: 'Une livraison à Bouskoura n’est pas exclue, mais ses conditions (possibilité, supplément éventuel, horaire) ne sont pas fixées sur le site. L’équipe les donne au cas par cas, sur WhatsApp, avant que vous envoyiez votre demande.',
          },
        ],
      },
      {
        h2: 'Voitures à louer dès {minPrice} DH par jour',
        blocks: [
          {
            type: 'p',
            text: 'Voici les six modèles les plus abordables, de {minPrice} à {maxPrice} DH par jour. Pour une famille, regardez aussi la page [location de SUV à Casablanca](route:suv) ; si le budget est serré, la page [location de voiture pas chère à Casablanca](route:economique) sera plus utile.',
          },
          { type: 'vehicles' },
        ],
      },
      {
        h2: 'Trois façons de récupérer le véhicule',
        blocks: [
          {
            type: 'list',
            items: [
              '**Livraison à Bouskoura**, si l’équipe la confirme pour votre adresse et votre date.',
              '**Remise à Casablanca**, gratuite, à l’hôtel ou à l’adresse choisie dans la ville.',
              '**Remise à l’aéroport Mohammed V**, gratuite, si vous arrivez en avion : la page [location de voiture à l’aéroport de Casablanca](route:aeroport) explique comment.',
            ],
          },
        ],
      },
      {
        h2: 'Tarif, âge, caution et documents',
        blocks: [
          {
            type: 'p',
            text: 'Les prix de chaque modèle sont sur la page [tarifs de location](route:tarifs), avec un tarif réduit automatique au-delà de 10 jours sur la plupart des modèles. Le conducteur a 21 ans minimum. Côté papiers, comptez une pièce d’identité, un permis de plus de 2 ans et un justificatif de domicile, puis la caution au départ.',
          },
        ],
      },
    ],
    faq: [
      {
        q: 'Yourent livre-t-il à Bouskoura ?',
        a: 'L’équipe confirme les conditions de livraison à Bouskoura sur WhatsApp. En revanche, la livraison est bien gratuite dans tout Casablanca et à l’aéroport Mohammed V.',
      },
      {
        q: 'La livraison à Bouskoura est-elle gratuite ?',
        a: 'Le site n’annonce rien pour Bouskoura. L’équipe indique donc, avant la réservation, si une livraison est possible et à quelles conditions.',
      },
      {
        q: 'Où se trouve l’agence Yourent ?',
        a: 'À Casablanca, au N°25 Rue Ibnou Mounir, 20100, avec une ouverture de 8h à 22h chaque jour.',
      },
      {
        q: 'Quel est le prix d’une location de voiture à Bouskoura ?',
        a: 'Les tarifs démarrent à {minPrice} DH par jour pour 5 jours minimum, puis baissent au-delà de 10 jours sur la plupart des modèles.',
      },
      {
        q: 'Comment réserver depuis Bouskoura ?',
        a: 'Choisissez un modèle et vos dates sur le site, puis envoyez la demande. L’équipe confirme ensuite sur WhatsApp ou par téléphone et précise la remise du véhicule.',
      },
    ],
    related: ['aeroport', 'tarifs', 'suv', 'mohammedia', 'contact'],
  },
};

export default page;
