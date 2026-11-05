import type { LocalizedPage } from '../types';

const page: LocalizedPage = {
  fr: {
    metaTitle: 'Location de voiture à Casablanca : FAQ complète | Yourent',
    metaDescription:
      'FAQ sur la location de voiture à Casablanca : prix dès {fleetMin} DH par jour, 21 ans minimum, caution, documents, permis étranger, livraison gratuite, annulation.',
    eyebrow: 'FAQ',
    h1: 'FAQ location de voiture à Casablanca : vos questions, nos réponses',
    intro:
      'Cette FAQ répond aux questions les plus posées sur la location de voiture à Casablanca chez Yourent. Elle couvre le prix dès {fleetMin} DH par jour, l’âge minimum de 21 ans, la caution, les documents, la livraison à l’aéroport Mohammed V, l’assurance et l’annulation. Si votre question n’y figure pas, l’équipe répond sur WhatsApp de 8h à 22h, 7j/7.',
    breadcrumb: 'FAQ',
    sections: [
      {
        h2: 'Location de voiture à Casablanca : les pages utiles pour aller plus loin',
        blocks: [
          {
            type: 'list',
            items: [
              'Pour comparer les modèles, ouvrez les [tarifs de location de voiture](route:tarifs) : chaque voiture y a son prix.',
              'Pour les règles détaillées, le tableau récapitulatif des [conditions de location de voiture](route:conditions) les résume.',
              'Pour une arrivée en avion, lisez la page [location de voiture à l’aéroport de Casablanca](route:aeroport).',
              'Pour joindre l’équipe, passez par la page [contact](route:contact).',
            ],
          },
        ],
      },
    ],
    faq: [
      {
        q: 'Quel est le prix d’une location de voiture à Casablanca ?',
        a: 'Chez Yourent, les prix démarrent à {fleetMin} DH par jour selon le modèle. Au-delà de 10 jours, un tarif réduit s’applique automatiquement sur la plupart des modèles. Le détail est sur la page [prix de location de voiture à Casablanca](route:tarifs).',
      },
      {
        q: 'Quelle est la durée minimum de location ?',
        a: 'La location dure 5 jours minimum. Il n’existe donc pas de formule à la journée ou au week-end.',
      },
      {
        q: 'Quels documents faut-il pour louer ?',
        a: 'Prévoyez votre CIN ou votre passeport, un permis de plus de 2 ans et un justificatif de domicile. La caution complète ensuite le dossier au départ.',
      },
      {
        q: 'Le permis étranger est-il accepté ?',
        a: 'Un touriste étranger peut conduire avec son permis international. Dans les autres cas, demandez confirmation à l’équipe avant de réserver.',
      },
      {
        q: 'À partir de quel âge peut-on louer ?',
        a: 'À partir de 21 ans. Le permis doit toutefois dater de plus de 2 ans.',
      },
      {
        q: 'Faut-il verser une caution ?',
        a: 'Oui, une caution est demandée au départ. Vous la récupérez quand le véhicule revient en bon état.',
      },
      {
        q: 'Comment verse-t-on la caution ?',
        a: 'Par chèque, en espèces ou par empreinte de carte. Son montant dépend du véhicule, et la grille des [tarifs](route:tarifs) l’indique modèle par modèle.',
      },
      {
        q: 'La livraison est-elle gratuite ?',
        a: 'Oui, dans tout Casablanca et à l’aéroport Mohammed V, 7j/7. En revanche, pour une autre ville, l’équipe indique les conditions sur WhatsApp.',
      },
      {
        q: 'Peut-on récupérer la voiture à l’aéroport Mohammed V ?',
        a: 'Yourent livre la voiture à l’aéroport, mais n’a pas de comptoir sur place. Le lieu de rendez-vous exact est confirmé avec l’équipe avant votre arrivée, comme l’explique la page [location de voiture à l’aéroport](route:aeroport).',
      },
      {
        q: 'Les voitures sont-elles assurées ?',
        a: 'Oui, tous les véhicules sont couverts par une assurance tous risques avec franchise. L’équipe précise le montant de la franchise avant la réservation.',
      },
      {
        q: 'Que faire en cas de panne ?',
        a: 'Prévenez l’équipe sans attendre : un véhicule de remplacement vous est envoyé dans les plus brefs délais.',
      },
      {
        q: 'Que faire en cas d’accident ?',
        a: 'Prévenez l’équipe, qui vous guide ensuite dans les démarches.',
      },
      {
        q: 'Peut-on annuler ou modifier une réservation ?',
        a: 'Oui, sans frais si la demande arrive au moins 24 h avant la prise en charge. Après, des frais peuvent s’appliquer.',
      },
      {
        q: 'Comment réserver une voiture ?',
        a: 'Choisissez un véhicule dans le [catalogue](/catalogue), indiquez vos dates et envoyez la demande. L’équipe confirme ensuite sur WhatsApp ou par téléphone. Vous pouvez aussi écrire directement sur WhatsApp.',
      },
      {
        q: 'Peut-on payer en ligne ?',
        a: 'Non, car la réservation en ligne reste une demande. Le règlement se fait ensuite avec l’équipe.',
      },
      {
        q: 'Le kilométrage est-il illimité ?',
        a: 'Le kilométrage inclus n’est pas affiché sur le site ; l’équipe le précise sur WhatsApp avant la réservation.',
      },
      {
        q: 'Peut-on rendre la voiture dans une autre ville ?',
        a: 'Aucune règle n’est affichée sur le site : ce point se confirme avec l’équipe avant la réservation.',
      },
      {
        q: 'Quels sont les horaires de l’agence ?',
        a: 'Elle ouvre de 8h à 22h, 7j/7, au N°25 Rue Ibnou Mounir à Casablanca.',
      },
    ],
    related: ['tarifs', 'conditions', 'aeroport', 'contact'],
  },
};

export default page;
