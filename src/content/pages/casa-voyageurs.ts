import type { LocalizedPage } from '../types';

const page: LocalizedPage = {
  fr: {
    metaTitle: 'Location de voiture à la gare Casa Voyageurs | Yourent',
    metaDescription:
      'Location de voiture à la gare Casa Voyageurs : livraison gratuite à la descente du train, dès {minPrice} DH par jour, 5 jours minimum, réservation par dates.',
    eyebrow: 'Gare Casa Voyageurs',
    h1: 'Location de voiture à la gare Casa Voyageurs, à Casablanca',
    intro:
      'Pour une location de voiture à la gare Casa Voyageurs, Yourent livre gratuitement votre voiture à Casablanca, à partir de {minPrice} DH par jour et pour 5 jours minimum. Vous réservez vos dates en ligne, puis l’équipe confirme sur WhatsApp et fixe avec vous l’heure et le point de remise, de 8h à 22h, 7j/7.',
    breadcrumb: 'Gare Casa Voyageurs',
    vehicles: { sort: 'asc', limit: 6 },
    sections: [
      {
        h2: 'Location de voiture à la gare Casa Voyageurs : repartir en descendant du train',
        blocks: [
          {
            type: 'p',
            text: 'Casa-Voyageurs est la gare ONCF où arrive Al Boraq, le train à grande vitesse en provenance de Rabat et de Tanger. Des trains vers Marrakech et Fès y partent aussi (source : Wikipédia, fiche de la gare). Beaucoup de voyageurs y descendent pour une affaire ou une visite, puis ont besoin d’une voiture pour la suite du séjour.',
          },
          {
            type: 'p',
            text: 'Chez Yourent, la voiture vient à vous : elle est livrée à la gare à l’heure convenue, sans frais de livraison. Le point de rendez-vous exact se précise toutefois avec l’équipe avant votre arrivée.',
          },
        ],
      },
      {
        h2: 'Voitures disponibles dès {minPrice} DH par jour',
        blocks: [
          {
            type: 'p',
            text: 'Six modèles ouvrent la grille, de {minPrice} à {maxPrice} DH par jour. Le [catalogue de voitures à louer](/catalogue) montre toute la flotte, avec les disponibilités par dates.',
          },
          { type: 'vehicles' },
        ],
      },
      {
        h2: 'Comment organiser la remise à la gare',
        blocks: [
          {
            type: 'list',
            ordered: true,
            items: [
              'Choisissez votre voiture et vos dates dans le catalogue.',
              'Précisez, sur la demande ou sur WhatsApp, que la remise a lieu à la gare Casa Voyageurs, avec l’heure d’arrivée de votre train.',
              'L’équipe confirme ensuite la disponibilité, le prix et le point de rendez-vous.',
              'À la remise, présentez votre pièce d’identité, votre permis de plus de 2 ans, un justificatif de domicile et la caution (chèque, espèces ou empreinte de carte). Le conducteur a 21 ans minimum.',
            ],
          },
          {
            type: 'p',
            text: 'La remise suit les horaires de l’agence, de 8h à 22h. Pour une arrivée en dehors de ces horaires, écrivez d’abord à l’équipe, car elle seule confirme ce qui est possible.',
          },
        ],
      },
      {
        h2: 'Gare ou aéroport : deux lieux de remise gratuits',
        blocks: [
          {
            type: 'p',
            text: 'La livraison est gratuite dans tout Casablanca, gare comprise, ainsi qu’à l’aéroport Mohammed V. Si vous arrivez plutôt en avion, la page [location de voiture à l’aéroport de Casablanca](route:aeroport) décrit la remise. Quant aux prix de chaque modèle, ils figurent sur la page [tarifs de location de voiture](route:tarifs).',
          },
        ],
      },
    ],
    faq: [
      {
        q: 'Où récupère-t-on la voiture à la gare Casa Voyageurs ?',
        a: 'Yourent livre le véhicule à la gare, à l’heure convenue. Le point de rendez-vous exact se précise avec l’équipe avant votre arrivée.',
      },
      {
        q: 'La livraison à la gare est-elle gratuite ?',
        a: 'Oui : la livraison est gratuite dans tout Casablanca, gare Casa Voyageurs comprise.',
      },
      {
        q: 'Combien coûte une location de voiture depuis la gare ?',
        a: 'Les tarifs démarrent à {minPrice} DH par jour, pour 5 jours minimum. Le lieu de remise ne change donc pas le prix.',
      },
      {
        q: 'Peut-on louer pour une seule journée en descendant du train ?',
        a: 'Non, car la durée minimum de location est de 5 jours.',
      },
      {
        q: 'Que faire si mon train a du retard ?',
        a: 'Prévenez l’équipe par WhatsApp afin d’ajuster l’heure de remise. Elle confirme ensuite ce qui est possible selon votre nouvelle heure d’arrivée.',
      },
    ],
    related: ['aeroport', 'tarifs', 'conditions', 'maarif', 'contact'],
  },
};

export default page;
