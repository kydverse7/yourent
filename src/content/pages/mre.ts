import type { LocalizedPage } from '../types';

const page: LocalizedPage = {
  fr: {
    metaTitle: 'Location voiture MRE Casablanca dès {fleetMin} DH | Yourent',
    metaDescription:
      'Location de voiture pour MRE à Casablanca : réservation depuis l’étranger, livraison gratuite à l’aéroport Mohammed V, dès {fleetMin} DH par jour, tarif réduit.',
    eyebrow: 'MRE',
    h1: 'Location de voiture MRE à Casablanca',
    intro:
      'Yourent propose aux Marocains résidant à l’étranger une location de voiture à Casablanca à partir de {fleetMin} DH par jour, réservable depuis l’étranger avant le départ. La voiture est livrée gratuitement à l’aéroport Mohammed V à votre arrivée, et, sur la plupart des modèles, le tarif baisse automatiquement au-delà de 10 jours, durée courante d’un séjour d’été. L’équipe confirme le prix pour vos dates.',
    breadcrumb: 'Location voiture MRE',
    vehicles: { sort: 'asc' },
    sections: [
      {
        h2: 'Réserver sa voiture avant de quitter l’étranger',
        blocks: [
          {
            type: 'p',
            text: 'Vous pouvez préparer la location depuis l’étranger. Choisissez le modèle dans le [catalogue](/catalogue), indiquez vos dates d’arrivée et de départ : la recherche par dates écarte les voitures déjà louées sur la période. Vous envoyez une demande de réservation, puis l’équipe la confirme sur WhatsApp ou par téléphone, le +212 6 61 23 62 31.',
          },
          {
            type: 'p',
            text: 'Il n’y a pas de paiement en ligne : la réservation est une demande, le règlement se fait ensuite avec l’équipe, qui vous explique comment procéder depuis l’étranger.',
          },
        ],
      },
      {
        h2: 'Livraison à l’aéroport Mohammed V à votre arrivée',
        blocks: [
          {
            type: 'p',
            text: 'Yourent livre la voiture à l’aéroport Mohammed V, gratuitement, 7j/7 de 8h à 22h. Il n’y a pas de comptoir Yourent dans l’aéroport : le véhicule vous est remis sur place par l’équipe, à un point de rendez-vous confirmé avant votre arrivée. Envoyez à l’équipe votre date et l’heure d’arrivée prévues par WhatsApp. Pour une arrivée en dehors de 8h-22h, ou si votre vol change, écrivez d’abord à l’équipe : elle confirme ce qui est possible.',
          },
          {
            type: 'p',
            text: 'La livraison est aussi gratuite dans tout Casablanca : chez la famille, à l’hôtel ou ailleurs en ville. Détails sur la page [location de voiture à l’aéroport](route:aeroport).',
          },
        ],
      },
      {
        h2: 'Une location d’été : le tarif au-delà de 10 jours',
        blocks: [
          {
            type: 'p',
            text: 'Un séjour au pays dure souvent plusieurs semaines. Chez Yourent, la location est de 5 jours minimum et, sur la plupart des modèles, un tarif réduit s’applique automatiquement au-delà de 10 jours, sans code. La colonne « Plus de 10 jours » de la grille ci-dessous donne le prix par jour de chaque modèle pour une longue durée. Sur un Dacia Duster, par exemple, le tarif passe de {price:dacia-duster} DH par jour à un prix plus bas après 10 jours. En pleine saison, faites confirmer ce tarif par l’équipe pour vos dates.',
          },
          { type: 'pricing' },
          {
            type: 'p',
            text: 'Pour un séjour de plus d’un mois, voyez aussi la [location longue durée](route:longue-duree). La disponibilité en pleine saison dépend des réservations déjà prises : plus vous demandez tôt, plus le choix est large.',
          },
        ],
      },
      {
        h2: 'Quelle voiture pour un séjour en famille',
        blocks: [
          {
            type: 'p',
            text: 'Toutes les voitures de la flotte ont 5 places. Pour les trajets de famille et les bagages, un SUV comme le Dacia Duster, le Volkswagen Tiguan ou le Kia Sorento est le choix courant ; voir la [location de SUV](route:suv). Une boîte automatique est utile en ville : voir la [location de voiture automatique](route:automatique).',
          },
          { type: 'vehicles' },
        ],
      },
      {
        h2: 'Documents, permis et caution pour un MRE',
        blocks: [
          {
            type: 'list',
            items: [
              'Une pièce d’identité valide : CIN ou passeport.',
              'Un permis de conduire de plus de 2 ans. Si votre permis a été délivré à l’étranger, l’équipe confirme avant la réservation s’il convient.',
              'Un justificatif de domicile : l’équipe précise lequel est accepté pour un résident à l’étranger.',
              'Une caution au départ, par chèque, en espèces ou par empreinte de carte, dont le montant dépend du véhicule. Elle vous est rendue au retour de la voiture en bon état.',
            ],
          },
          {
            type: 'p',
            text: 'Toutes les règles, y compris l’assurance tous risques avec franchise et l’annulation sans frais jusqu’à 24 h avant la prise en charge, sont sur la page [conditions de location](route:conditions).',
          },
        ],
      },
    ],
    faq: [
      {
        q: 'Peut-on réserver une voiture depuis l’étranger quand on est MRE ?',
        a: 'Oui. Vous envoyez une demande avec vos dates depuis le site, puis l’équipe confirme sur WhatsApp ou par téléphone. Il n’y a pas de paiement en ligne.',
      },
      {
        q: 'La voiture peut-elle m’attendre à l’aéroport Mohammed V ?',
        a: 'Yourent livre la voiture à l’aéroport gratuitement, 7j/7, mais n’a pas de comptoir sur place. Le point de rendez-vous se confirme avec l’équipe avant l’arrivée.',
      },
      {
        q: 'Quel est le tarif pour un séjour de plus de 10 jours ?',
        a: 'Sur la plupart des modèles, un tarif réduit s’applique automatiquement au-delà de 10 jours, et l’équipe confirme le prix pour vos dates. La grille de cette page indique, pour chaque modèle, le prix par jour avant et après 10 jours.',
      },
      {
        q: 'Quels documents un MRE doit-il présenter ?',
        a: 'Une pièce d’identité valide (CIN ou passeport), un permis de plus de 2 ans, un justificatif de domicile et la caution. L’équipe précise les cas particuliers, comme un permis délivré à l’étranger.',
      },
      {
        q: 'Que faire si mon vol arrive en retard ?',
        a: 'Prévenez l’équipe par WhatsApp. Elle confirme comment ajuster la remise, surtout si l’arrivée tombe après 22h.',
      },
      {
        q: 'Peut-on louer pour toute la durée des vacances d’été ?',
        a: 'Oui, la location est de 5 jours minimum, sans durée maximum affichée. Pour plusieurs semaines, écrivez à l’équipe avec vos dates pour confirmer la disponibilité.',
      },
    ],
    related: ['aeroport', 'longue-duree', 'tarifs', 'suv', 'conditions'],
  },
};

export default page;
