import type { LocalizedPage } from '../types';

const page: LocalizedPage = {
  fr: {
    metaTitle: 'Conditions de location de voiture à Casablanca | Yourent',
    metaDescription:
      'Conditions de location de voiture à Casablanca : dès 21 ans, permis de plus de 2 ans, caution, assurance tous risques, annulation gratuite jusqu’à 24 h avant.',
    eyebrow: 'Conditions',
    h1: 'Conditions de location de voiture à Casablanca : âge, documents, caution',
    intro:
      'Les conditions de location de voiture chez Yourent tiennent en quelques lignes : le conducteur a 21 ans minimum et un permis de plus de 2 ans. Il présente aussi une pièce d’identité valide et un justificatif de domicile, puis verse une caution au départ. La location dure 5 jours minimum, et tous les véhicules sont assurés tous risques avec franchise. Cette page résume les règles de location de l’agence, mais le contrat remis à la prise en charge fait foi.',
    breadcrumb: 'Conditions de location',
    sections: [
      {
        h2: 'Conditions de location de voiture : âge minimum et documents',
        blocks: [
          {
            type: 'list',
            items: [
              'Un âge minimum de 21 ans pour le conducteur.',
              'Une pièce d’identité en cours de validité, CIN ou passeport.',
              'Un permis de conduire obtenu il y a plus de 2 ans.',
              'Un justificatif de domicile.',
            ],
          },
          {
            type: 'p',
            text: 'Un touriste étranger peut présenter son permis international, que l’agence accepte. En revanche, pour un permis délivré à l’étranger sans permis international, demandez confirmation à l’équipe avant de réserver. Les Marocains résidant à l’étranger retrouvent ces règles adaptées à leur séjour sur la page [location de voiture pour les MRE à Casablanca](route:mre).',
          },
        ],
      },
      {
        h2: 'Caution : montant, modes de versement et restitution',
        blocks: [
          {
            type: 'p',
            text: 'Une caution est demandée au départ du véhicule. Vous pouvez la verser par chèque, en espèces ou par empreinte de carte. Son montant dépend du véhicule loué, et vous le trouvez par modèle sur la page [prix de location de voiture à Casablanca](route:tarifs). La caution vous est rendue lorsque la voiture revient en bon état. Toutefois, le délai de restitution est précisé par l’équipe avant la réservation.',
          },
        ],
      },
      {
        h2: 'Durée, kilométrage et retour du véhicule',
        blocks: [
          {
            type: 'p',
            text: 'La durée minimum de location est de 5 jours. Au-delà de 10 jours, le tarif réduit s’applique de lui-même sur la plupart des modèles. Le kilométrage inclus et le retour dans une autre ville ne sont pas affichés sur le site, c’est pourquoi l’équipe les précise sur WhatsApp avant la réservation. La livraison se fait à l’hôtel, à l’aéroport Mohammed V ou à l’adresse choisie, de 8h à 22h, 7j/7. Le lieu de reprise en fin de location se convient avec l’équipe.',
          },
        ],
      },
      {
        h2: 'Assurance, panne et accident',
        blocks: [
          {
            type: 'list',
            items: [
              '**Assurance** : une couverture tous risques avec franchise protège tous les véhicules, et l’équipe précise le montant de la franchise avant la réservation.',
              '**Panne** : l’agence envoie un véhicule de remplacement dans les plus brefs délais.',
              '**Accident** : l’équipe accompagne le client dans les démarches.',
            ],
          },
        ],
      },
      {
        h2: 'Modification et annulation de la réservation',
        blocks: [
          {
            type: 'p',
            text: 'Vous pouvez modifier ou annuler une réservation sans frais jusqu’à 24 h avant la prise en charge. Au-delà, des frais peuvent s’appliquer, et l’équipe les indique au moment de la demande. La réservation en ligne reste une demande : le règlement se fait ensuite avec l’équipe, sans paiement en ligne.',
          },
        ],
      },
      {
        h2: 'Récapitulatif des conditions de location',
        blocks: [
          {
            type: 'table',
            head: ['Point', 'Règle chez Yourent'],
            rows: [
              ['Âge minimum', '21 ans pour le conducteur'],
              ['Documents', 'CIN ou passeport, permis de plus de 2 ans, justificatif de domicile'],
              ['Permis étranger', 'Permis international accepté pour les touristes'],
              ['Durée', '5 jours minimum, tarif réduit au-delà de 10 jours sur la plupart des modèles'],
              ['Caution', 'Chèque, espèces ou empreinte de carte, montant selon le véhicule'],
              ['Assurance', 'Tous risques avec franchise, montant précisé par l’équipe'],
              ['Kilométrage', 'Précisé par l’équipe avant la réservation'],
              ['Retour dans une autre ville', 'Précisé par l’équipe avant la réservation'],
              ['Annulation', 'Sans frais jusqu’à 24 h avant la prise en charge'],
              ['Panne', 'Véhicule de remplacement dans les plus brefs délais'],
            ],
          },
          {
            type: 'p',
            text: 'Une question sur l’une de ces conditions ? Écrivez à l’équipe depuis la page [contact de l’agence](route:contact) ou consultez la [FAQ sur la location de voiture à Casablanca](route:faq).',
          },
        ],
      },
    ],
    faq: [
      {
        q: 'Quel âge faut-il avoir pour louer une voiture à Casablanca ?',
        a: 'L’âge minimum est de 21 ans. Il faut aussi un permis de plus de 2 ans, car les deux conditions s’ajoutent.',
      },
      {
        q: 'Quels documents faut-il pour louer une voiture à Casablanca ?',
        a: 'Le dossier comprend une pièce d’identité (CIN ou passeport), un permis de plus de 2 ans et un justificatif de domicile. La caution se règle ensuite au départ.',
      },
      {
        q: 'Mon permis étranger est-il accepté ?',
        a: 'Le permis international d’un touriste est accepté. Dans tous les autres cas, l’équipe vous répond sur WhatsApp avant la réservation.',
      },
      {
        q: 'Comment verse-t-on la caution ?',
        a: 'Elle se verse au départ, par chèque, en espèces ou par empreinte de carte. Elle vous est ensuite rendue quand le véhicule revient en bon état.',
      },
      {
        q: 'Que se passe-t-il en cas de panne ou d’accident ?',
        a: 'Après une panne, un véhicule de remplacement arrive dans les plus brefs délais. Après un accident, l’équipe vous guide dans les démarches.',
      },
      {
        q: 'Jusqu’à quand peut-on annuler sans frais ?',
        a: 'Jusqu’à 24 h avant la prise en charge. Au-delà de ce délai, des frais peuvent s’appliquer.',
      },
    ],
    related: ['tarifs', 'faq', 'contact', 'aeroport'],
  },
};

export default page;
