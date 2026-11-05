import type { LocalizedPage } from '../types';

const page: LocalizedPage = {
  fr: {
    metaTitle: 'Location de voiture pour MRE à Casablanca | Yourent',
    metaDescription:
      'Location de voiture pour MRE à Casablanca : réservation depuis l’étranger, livraison gratuite à l’aéroport, dès {fleetMin} DH par jour, tarif réduit après 10 jours.',
    eyebrow: 'MRE',
    h1: 'Location de voiture pour les MRE à Casablanca : réserver depuis l’étranger',
    intro:
      'Yourent propose aux MRE, les Marocains résidant à l’étranger, une location de voiture à Casablanca dès {fleetMin} DH par jour, réservable avant le départ. La voiture est livrée gratuitement à l’aéroport Mohammed V à votre arrivée. Sur la plupart des modèles, le tarif baisse automatiquement au-delà de 10 jours, durée courante d’un séjour d’été ; l’équipe confirme le prix pour vos dates.',
    breadcrumb: 'Location de voiture MRE',
    vehicles: { sort: 'asc' },
    sections: [
      {
        h2: 'Location de voiture pour les MRE : réserver avant de quitter l’étranger',
        blocks: [
          {
            type: 'p',
            text: 'Vous pouvez préparer la location depuis l’étranger. Choisissez le modèle dans le [catalogue](/catalogue), puis indiquez vos dates d’arrivée et de départ : la recherche par dates écarte les voitures déjà louées sur la période. Vous envoyez ensuite une demande, et l’équipe la confirme sur WhatsApp ou par téléphone, au +212 6 61 23 62 31.',
          },
          {
            type: 'p',
            text: 'Aucun paiement en ligne n’est demandé : la réservation reste une demande, et l’équipe vous explique ensuite comment régler depuis l’étranger.',
          },
        ],
      },
      {
        h2: 'Livraison à l’aéroport Mohammed V à votre arrivée',
        blocks: [
          {
            type: 'p',
            text: 'Yourent livre la voiture à l’aéroport Mohammed V sans frais, 7j/7 de 8h à 22h. Il n’y a pas de comptoir Yourent dans l’aéroport, c’est pourquoi l’équipe vous remet le véhicule sur place, à un point de rendez-vous confirmé avant votre arrivée. Envoyez-lui par WhatsApp votre date et votre heure d’arrivée prévues. Si vous atterrissez hors de 8h-22h, ou si votre vol change, écrivez d’abord à l’équipe : elle confirme ce qui est possible.',
          },
          {
            type: 'p',
            text: 'La livraison est aussi gratuite dans tout Casablanca, chez la famille comme à l’hôtel. Pour la marche à suivre à l’arrivée, lisez la page [location de voiture à l’aéroport de Casablanca](route:aeroport).',
          },
        ],
      },
      {
        h2: 'Une location d’été : le tarif au-delà de 10 jours',
        blocks: [
          {
            type: 'p',
            text: 'Un séjour au pays dure souvent plusieurs semaines. Chez Yourent, la location dure 5 jours minimum et, sur la plupart des modèles, un tarif réduit s’applique automatiquement au-delà de 10 jours, sans code. La colonne « Plus de 10 jours » de la grille ci-dessous donne le prix par jour de chaque modèle pour une longue durée. Sur un Dacia Duster, par exemple, le tarif passe de {price:dacia-duster} DH par jour à un prix plus bas après 10 jours. En pleine saison, ce tarif réduit peut toutefois être suspendu : faites-le confirmer par l’équipe pour vos dates.',
          },
          { type: 'pricing' },
          {
            type: 'p',
            text: 'Pour un séjour de plus d’un mois, la page [location de voiture longue durée à Casablanca](route:longue-duree) répond aux questions. Notez aussi que la disponibilité en pleine saison dépend des réservations déjà prises : plus vous demandez tôt, plus le choix est large.',
          },
        ],
      },
      {
        h2: 'Quelle voiture pour un séjour en famille',
        blocks: [
          {
            type: 'p',
            text: 'Toutes les voitures de la flotte ont 5 places. Pour les trajets en famille et les bagages, un SUV est le choix courant : le Dacia Duster, le Volkswagen Tiguan ou le Kia Sorento. La page [location de SUV à Casablanca](route:suv) les compare. En ville, une boîte automatique est utile : la page [location de voiture automatique à Casablanca](route:automatique) liste ces modèles.',
          },
          { type: 'vehicles' },
        ],
      },
      {
        h2: 'Âge, documents et caution pour un MRE',
        blocks: [
          {
            type: 'list',
            items: [
              'Âge minimum du conducteur : 21 ans.',
              'Une pièce d’identité en cours de validité : CIN ou passeport.',
              'Un permis de plus de 2 ans. Si votre permis vient de l’étranger, l’équipe confirme avant la réservation qu’il convient.',
              'Un justificatif de domicile : l’équipe précise lequel est accepté pour un résident à l’étranger.',
              'Une caution au départ, par chèque, en espèces ou par empreinte de carte, dont le montant dépend du véhicule. Vous la récupérez quand la voiture revient en bon état.',
            ],
          },
          {
            type: 'p',
            text: 'Les autres règles figurent dans les [conditions de location de voiture](route:conditions), notamment l’assurance tous risques avec franchise et l’annulation sans frais jusqu’à 24 h avant.',
          },
        ],
      },
    ],
    faq: [
      {
        q: 'Peut-on réserver une voiture depuis l’étranger quand on est MRE ?',
        a: 'Oui. Vous envoyez une demande avec vos dates depuis le site, puis l’équipe confirme sur WhatsApp ou par téléphone, sans paiement en ligne.',
      },
      {
        q: 'La voiture peut-elle m’attendre à l’aéroport Mohammed V ?',
        a: 'Yourent livre la voiture à l’aéroport sans frais, 7j/7, mais n’y a pas de comptoir. Le point de rendez-vous se confirme donc avec l’équipe avant l’arrivée.',
      },
      {
        q: 'Quel est le tarif pour un séjour de plus de 10 jours ?',
        a: 'Sur la plupart des modèles, un tarif réduit s’applique automatiquement après 10 jours, et l’équipe confirme le prix pour vos dates. La grille de cette page donne, pour chaque modèle, le prix par jour avant et après ce seuil.',
      },
      {
        q: 'Quel âge et quels documents pour un MRE ?',
        a: 'Le conducteur doit avoir 21 ans minimum, comme tout autre client. Il présente une pièce d’identité, un permis de plus de 2 ans, un justificatif de domicile et la caution. Pour un cas particulier, comme un permis délivré à l’étranger, l’équipe répond avant la réservation.',
      },
      {
        q: 'Que faire si mon vol arrive en retard ?',
        a: 'Prévenez l’équipe par WhatsApp. Si l’arrivée tombe après 22h, elle vous dit ce qui est possible.',
      },
      {
        q: 'Peut-on louer pour toute la durée des vacances d’été ?',
        a: 'Oui, la location dure 5 jours minimum et aucune durée maximum n’est affichée. Pour plusieurs semaines, écrivez toutefois à l’équipe avec vos dates afin de confirmer la disponibilité.',
      },
    ],
    related: ['aeroport', 'longue-duree', 'tarifs', 'suv', 'conditions'],
  },
};

export default page;
