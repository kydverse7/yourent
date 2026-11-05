import type { LocalizedPage } from '../types';

const page: LocalizedPage = {
  fr: {
    metaTitle: 'FAQ location de voiture à Casablanca | Yourent',
    metaDescription:
      'Réponses aux questions sur la location de voiture à Casablanca : prix dès {fleetMin} DH, caution, documents, permis étranger, livraison, assurance et annulation.',
    eyebrow: 'FAQ',
    h1: 'FAQ : location de voiture à Casablanca',
    intro:
      'Cette FAQ répond aux questions les plus posées sur la location de voiture chez Yourent à Casablanca : prix à partir de {fleetMin} DH par jour, caution, documents, livraison à l’aéroport Mohammed V, assurance et annulation. Si votre question n’y figure pas, l’équipe répond sur WhatsApp de 8h à 22h, 7j/7.',
    breadcrumb: 'FAQ',
    sections: [
      {
        h2: 'Aller plus loin',
        blocks: [
          {
            type: 'list',
            items: [
              'Les prix modèle par modèle : [tarifs de location](route:tarifs).',
              'Les règles détaillées et le tableau récapitulatif : [conditions de location](route:conditions).',
              'La livraison à l’arrivée : [location de voiture à l’aéroport Mohammed V](route:aeroport).',
              'Pour joindre l’équipe : [contact](route:contact).',
            ],
          },
        ],
      },
    ],
    faq: [
      {
        q: 'Quel est le prix d’une location de voiture à Casablanca ?',
        a: 'Chez Yourent, les prix démarrent à {fleetMin} DH par jour selon le modèle. Au-delà de 10 jours, un tarif réduit s’applique automatiquement sur la plupart des modèles. Le détail est sur la page [tarifs](route:tarifs).',
      },
      {
        q: 'Quelle est la durée minimum de location ?',
        a: 'La location est de 5 jours minimum. Il n’existe pas de formule à la journée ou au week-end.',
      },
      {
        q: 'Quels documents faut-il pour louer ?',
        a: 'Il faut une pièce d’identité valide (CIN ou passeport), un permis de conduire de plus de 2 ans et un justificatif de domicile.',
      },
      {
        q: 'Le permis étranger est-il accepté ?',
        a: 'Pour les touristes étrangers, le permis international est accepté. Dans les autres cas, demandez confirmation à l’équipe avant de réserver.',
      },
      {
        q: 'À partir de quel âge peut-on louer ?',
        a: 'L’âge minimum n’est pas affiché sur le site. L’équipe le précise sur WhatsApp avant la réservation.',
      },
      {
        q: 'Faut-il verser une caution ?',
        a: 'Oui, une caution est demandée au départ. Elle est restituée au retour du véhicule en bon état.',
      },
      {
        q: 'Comment verse-t-on la caution ?',
        a: 'Par chèque, en espèces ou par empreinte de carte. Son montant dépend du véhicule et figure dans la grille des [tarifs](route:tarifs).',
      },
      {
        q: 'La livraison est-elle gratuite ?',
        a: 'Oui, dans tout Casablanca et à l’aéroport Mohammed V, 7j/7. Pour une autre ville, l’équipe indique les conditions sur WhatsApp.',
      },
      {
        q: 'Peut-on récupérer la voiture à l’aéroport Mohammed V ?',
        a: 'Yourent livre la voiture à l’aéroport, il n’y a pas de comptoir sur place. Le lieu de rendez-vous exact est confirmé avec l’équipe avant votre arrivée. Voir [location de voiture à l’aéroport](route:aeroport).',
      },
      {
        q: 'Les voitures sont-elles assurées ?',
        a: 'Oui, tous les véhicules sont couverts par une assurance tous risques avec franchise. Le montant de la franchise est précisé par l’équipe avant la réservation.',
      },
      {
        q: 'Que faire en cas de panne ?',
        a: 'Prévenez l’équipe : un véhicule de remplacement est envoyé dans les plus brefs délais.',
      },
      {
        q: 'Que faire en cas d’accident ?',
        a: 'Prévenez l’équipe, qui vous accompagne dans les démarches.',
      },
      {
        q: 'Peut-on annuler ou modifier une réservation ?',
        a: 'Oui, sans frais jusqu’à 24 h avant la prise en charge. Au-delà, des frais peuvent s’appliquer.',
      },
      {
        q: 'Comment réserver une voiture ?',
        a: 'Choisissez un véhicule dans le [catalogue](/catalogue), indiquez vos dates et envoyez la demande. L’équipe confirme sur WhatsApp ou par téléphone. Vous pouvez aussi écrire directement sur WhatsApp.',
      },
      {
        q: 'Peut-on payer en ligne ?',
        a: 'Non. La réservation en ligne est une demande de réservation, le règlement se fait ensuite avec l’équipe.',
      },
      {
        q: 'Le kilométrage est-il illimité ?',
        a: 'Le kilométrage inclus n’est pas affiché sur le site. L’équipe le précise sur WhatsApp avant la réservation.',
      },
      {
        q: 'Peut-on rendre la voiture dans une autre ville ?',
        a: 'Cela se confirme avec l’équipe avant la réservation, il n’y a pas de règle affichée sur le site.',
      },
      {
        q: 'Quels sont les horaires de l’agence ?',
        a: 'L’agence est ouverte de 8h à 22h, 7j/7. Elle se trouve N°25 Rue Ibnou Mounir à Casablanca.',
      },
    ],
    related: ['tarifs', 'conditions', 'aeroport', 'contact'],
  },
};

export default page;
