import type { LocalizedPage } from '../types';

const page: LocalizedPage = {
  fr: {
    metaTitle: 'Location voiture Bouskoura dès {minPrice} DH | Yourent',
    metaDescription:
      'Location de voiture à Bouskoura avec Yourent, agence de Casablanca : dès {minPrice} DH par jour, 5 jours minimum, livraison à confirmer avec l’équipe sur WhatsApp.',
    eyebrow: 'Bouskoura',
    h1: 'Location de voiture à Bouskoura',
    intro:
      'Yourent, agence de Casablanca, loue des voitures aux habitants de Bouskoura à partir de {minPrice} DH par jour, pour 5 jours minimum. La livraison est gratuite dans tout Casablanca et à l’aéroport Mohammed V ; pour Bouskoura, commune voisine, les conditions de livraison se confirment avec l’équipe sur WhatsApp avant la réservation.',
    breadcrumb: 'Location voiture Bouskoura',
    vehicles: { sort: 'asc', limit: 6 },
    sections: [
      {
        h2: 'Bouskoura et Casablanca : ce qu’il faut savoir avant de louer',
        blocks: [
          {
            type: 'p',
            text: 'Bouskoura est une commune urbaine de la province de Nouaceur, dans la région Casablanca-Settat, en périphérie de Casablanca (source : Wikipédia). L’agence Yourent est à Casablanca, N°25 Rue Ibnou Mounir : Bouskoura n’est donc pas dans le périmètre de la livraison gratuite annoncée, qui couvre Casablanca et l’aéroport Mohammed V.',
          },
          {
            type: 'p',
            text: 'Une livraison à Bouskoura n’est pas exclue. Ses conditions (possibilité, supplément éventuel, horaire) ne sont pas fixées sur le site : l’équipe les donne au cas par cas, sur WhatsApp, avant que vous envoyiez votre demande.',
          },
        ],
      },
      {
        h2: 'Voitures à louer dès {minPrice} DH par jour',
        blocks: [
          {
            type: 'p',
            text: 'Voici les six modèles les plus abordables, de {minPrice} à {maxPrice} DH par jour. Pour une famille, regardez aussi les SUV de la page [location SUV à Casablanca](route:suv) ; pour un budget serré, la page [voiture pas chère](route:economique).',
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
              '**Remise à l’aéroport Mohammed V**, gratuite, si vous arrivez en avion : voir [location de voiture à l’aéroport](route:aeroport).',
            ],
          },
        ],
      },
      {
        h2: 'Tarif, caution et documents',
        blocks: [
          {
            type: 'p',
            text: 'Les prix par modèle sont sur la page [tarifs](route:tarifs), avec un tarif réduit automatique au-delà de 10 jours sur la plupart des modèles. La caution se verse au départ, par chèque, en espèces ou par empreinte de carte. Il faut une pièce d’identité valide, un permis de plus de 2 ans et un justificatif de domicile.',
          },
        ],
      },
    ],
    faq: [
      {
        q: 'Yourent livre-t-il à Bouskoura ?',
        a: 'Les conditions de livraison à Bouskoura se confirment avec l’équipe sur WhatsApp. La livraison est gratuite dans tout Casablanca et à l’aéroport Mohammed V.',
      },
      {
        q: 'La livraison à Bouskoura est-elle gratuite ?',
        a: 'Rien n’est annoncé pour Bouskoura sur le site : l’équipe indique si une livraison est possible et à quelles conditions, avant la réservation.',
      },
      {
        q: 'Où se trouve l’agence Yourent ?',
        a: 'À Casablanca, N°25 Rue Ibnou Mounir, 20100. Elle est ouverte de 8h à 22h, 7j/7.',
      },
      {
        q: 'Quel est le prix d’une location de voiture à Bouskoura ?',
        a: 'Les tarifs démarrent à {minPrice} DH par jour, pour 5 jours minimum, avec un tarif réduit au-delà de 10 jours.',
      },
      {
        q: 'Comment réserver depuis Bouskoura ?',
        a: 'Choisissez un modèle et vos dates sur le site, puis envoyez la demande. L’équipe confirme sur WhatsApp ou par téléphone et précise la remise du véhicule.',
      },
    ],
    related: ['aeroport', 'tarifs', 'suv', 'mohammedia', 'contact'],
  },
};

export default page;
