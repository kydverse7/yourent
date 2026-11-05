import type { LocalizedPage } from '../types';

const page: LocalizedPage = {
  fr: {
    metaTitle: 'Conditions de location voiture Casablanca | Yourent',
    metaDescription:
      'Conditions de location de voiture à Casablanca : documents, permis de plus de 2 ans, caution, assurance tous risques, annulation gratuite jusqu’à 24 h avant.',
    eyebrow: 'Conditions',
    h1: 'Conditions de location de voiture à Casablanca',
    intro:
      'Pour louer une voiture chez Yourent à Casablanca, il faut une pièce d’identité valide, un permis de plus de 2 ans, un justificatif de domicile et une caution au départ. La location dure 5 jours minimum et tous les véhicules sont assurés tous risques avec franchise. Cette page résume les règles de l’agence, elle ne remplace pas le contrat remis à la prise en charge.',
    breadcrumb: 'Conditions de location',
    sections: [
      {
        h2: 'Documents à présenter pour louer une voiture',
        blocks: [
          {
            type: 'list',
            items: [
              'Une pièce d’identité valide : CIN ou passeport.',
              'Un permis de conduire de plus de 2 ans.',
              'Un justificatif de domicile.',
            ],
          },
          {
            type: 'p',
            text: 'Les touristes étrangers peuvent présenter un permis international, il est accepté. Pour un permis délivré à l’étranger sans permis international, demandez confirmation à l’équipe avant de réserver. L’âge minimum du conducteur n’est pas affiché sur le site : l’équipe le précise avant la réservation.',
          },
        ],
      },
      {
        h2: 'Caution : montant, modes de versement et restitution',
        blocks: [
          {
            type: 'p',
            text: 'Une caution est demandée au départ du véhicule. Elle peut être versée par chèque, en espèces ou par empreinte de carte. Son montant dépend du véhicule loué, vous le trouvez par modèle sur la page [tarifs](route:tarifs). Elle est restituée au retour du véhicule en bon état. Le délai de restitution de la caution est précisé par l’équipe avant la réservation.',
          },
        ],
      },
      {
        h2: 'Durée, kilométrage et retour du véhicule',
        blocks: [
          {
            type: 'p',
            text: 'La durée minimum de location est de 5 jours. Au-delà de 10 jours, un tarif réduit s’applique automatiquement sur la plupart des modèles. Le kilométrage inclus et la possibilité de rendre le véhicule dans une autre ville ne sont pas affichés sur le site : l’équipe les précise sur WhatsApp avant la réservation. La livraison se fait à l’hôtel, à l’aéroport Mohammed V ou à l’adresse choisie, de 8h à 22h, 7j/7. Le lieu de reprise en fin de location se convient avec l’équipe.',
          },
        ],
      },
      {
        h2: 'Assurance, panne et accident',
        blocks: [
          {
            type: 'list',
            items: [
              '**Assurance** : tous les véhicules sont couverts par une assurance tous risques avec franchise. Le montant de la franchise est précisé par l’équipe avant la réservation.',
              '**Panne** : un véhicule de remplacement est envoyé dans les plus brefs délais.',
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
            text: 'Une réservation peut être modifiée ou annulée sans frais jusqu’à 24 h avant la prise en charge. Au-delà, des frais peuvent s’appliquer, l’équipe les indique au moment de la demande. La réservation en ligne est une demande : il n’y a pas de paiement en ligne, le règlement se fait ensuite avec l’équipe.',
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
              ['Documents', 'CIN ou passeport, permis de plus de 2 ans, justificatif de domicile'],
              ['Permis étranger', 'Permis international accepté pour les touristes'],
              ['Âge minimum', 'Précisé par l’équipe avant la réservation'],
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
            text: 'Une question sur un point de ce tableau ? Écrivez à l’équipe depuis la page [contact](route:contact) ou consultez la [FAQ](route:faq).',
          },
        ],
      },
    ],
    faq: [
      {
        q: 'Quels documents faut-il pour louer une voiture à Casablanca ?',
        a: 'Il faut une pièce d’identité valide (CIN ou passeport), un permis de conduire de plus de 2 ans et un justificatif de domicile.',
      },
      {
        q: 'Mon permis étranger est-il accepté ?',
        a: 'Pour les touristes étrangers, le permis international est accepté. Pour tout autre cas, l’équipe vous répond sur WhatsApp avant la réservation.',
      },
      {
        q: 'Comment verse-t-on la caution ?',
        a: 'La caution se verse au départ, par chèque, en espèces ou par empreinte de carte. Elle est restituée au retour du véhicule en bon état.',
      },
      {
        q: 'Que se passe-t-il en cas de panne ou d’accident ?',
        a: 'En cas de panne, un véhicule de remplacement est envoyé dans les plus brefs délais. En cas d’accident, l’équipe vous accompagne dans les démarches.',
      },
      {
        q: 'Jusqu’à quand peut-on annuler sans frais ?',
        a: 'Jusqu’à 24 h avant la prise en charge. Au-delà, des frais peuvent s’appliquer.',
      },
    ],
    related: ['tarifs', 'faq', 'contact', 'aeroport'],
  },
};

export default page;
