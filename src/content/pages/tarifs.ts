import type { LocalizedPage } from '../types';

const page: LocalizedPage = {
  fr: {
    metaTitle: 'Prix location voiture Casablanca dès {fleetMin} DH | Yourent',
    metaDescription:
      'Prix de location de voiture à Casablanca : dès {fleetMin} DH par jour, tarif réduit au-delà de 10 jours, livraison gratuite dans Casablanca et à l’aéroport Mohammed V.',
    eyebrow: 'Tarifs',
    h1: 'Prix de location de voiture à Casablanca',
    intro:
      'Chez Yourent, la location de voiture à Casablanca démarre à {fleetMin} DH par jour, avec une location de 5 jours minimum. Sur la plupart des modèles, le prix baisse automatiquement au-delà de 10 jours. La grille ci-dessous reprend les tarifs en vigueur de chaque modèle.',
    breadcrumb: 'Tarifs',
    vehicles: { sort: 'asc' },
    sections: [
      {
        h2: 'Grille des prix de location par modèle',
        blocks: [
          {
            type: 'p',
            text: 'Chaque ligne indique le tarif par jour du modèle, son tarif au-delà de 10 jours et le montant minimum de la caution demandée au départ. Cette grille vient des tarifs en vigueur de l’agence, elle est donc à jour au moment où vous la lisez. Le véhicule le moins cher de la flotte part de {fleetMin} DH par jour, le plus cher de {maxPrice} DH par jour.',
          },
          { type: 'pricing' },
        ],
      },
      {
        h2: 'Les deux paliers de tarif : 5 à 10 jours, puis plus de 10 jours',
        blocks: [
          {
            type: 'list',
            items: [
              '**De 5 à 10 jours** : tarif journalier standard du modèle choisi. Yourent ne propose pas de location de moins de 5 jours.',
              '**Au-delà de 10 jours** : tarif réduit appliqué automatiquement, sans code ni démarche. Sur certains modèles l’écart est important, sur d’autres le tarif reste identique : la colonne « Plus de 10 jours » de la grille le montre modèle par modèle.',
            ],
          },
          {
            type: 'p',
            text: 'Exemple de lecture : un Dacia Duster est affiché à {price:dacia-duster} DH par jour de 5 à 10 jours. À partir de 11 jours, c’est le tarif de la colonne « Plus de 10 jours » qui s’applique. Pour un séjour de plusieurs semaines, voyez la page [location longue durée](route:longue-duree).',
          },
        ],
      },
      {
        h2: 'Ce que comprend le prix',
        blocks: [
          {
            type: 'list',
            items: [
              'L’assurance tous risques avec franchise, sur tous les véhicules.',
              'La livraison gratuite dans tout Casablanca et à l’aéroport Mohammed V, 7j/7 de 8h à 22h.',
              'L’assistance en cas de panne (véhicule de remplacement) et l’accompagnement de l’équipe en cas d’accident.',
            ],
          },
          {
            type: 'p',
            text: 'Le kilométrage inclus, le montant de la franchise et les conditions d’un retour dans une autre ville ne sont pas affichés sur le site : l’équipe les précise sur WhatsApp avant la réservation. Il n’y a pas de paiement en ligne, le règlement se fait avec l’équipe.',
          },
        ],
      },
      {
        h2: 'La caution selon le véhicule',
        blocks: [
          {
            type: 'p',
            text: 'Une caution est demandée au départ, par chèque, en espèces ou par empreinte de carte. Son montant dépend du véhicule : la dernière colonne de la grille, « Caution dès », donne le montant minimum de chaque modèle, et l’équipe confirme la somme exacte. Elle vous est rendue au retour de la voiture en bon état. Le délai exact de restitution est précisé par l’équipe avant la réservation. Le détail des pièces à fournir est sur la page [conditions de location](route:conditions).',
          },
        ],
      },
      {
        h2: 'Comment réserver au prix affiché',
        blocks: [
          {
            type: 'p',
            text: 'Choisissez un véhicule dans le [catalogue](/catalogue), indiquez vos dates de prise en charge et de retour, puis envoyez la demande. L’équipe confirme la disponibilité et le prix sur WhatsApp ou par téléphone. Pour une voiture économique, voyez aussi la page [location pas chère](route:economique).',
          },
        ],
      },
    ],
    faq: [
      {
        q: 'Quel est le prix d’une location de voiture à Casablanca chez Yourent ?',
        a: 'Les prix démarrent à {fleetMin} DH par jour et montent jusqu’à {maxPrice} DH par jour selon le modèle. Le tarif exact de chaque voiture figure dans la grille de cette page.',
      },
      {
        q: 'Y a-t-il un prix réduit pour une longue location ?',
        a: 'Oui, sur la plupart des modèles : au-delà de 10 jours, le tarif réduit s’applique automatiquement. Quelques modèles gardent le même tarif, et la grille indique les deux montants de chaque voiture.',
      },
      {
        q: 'La livraison est-elle comprise dans le prix ?',
        a: 'Oui pour tout Casablanca et l’aéroport Mohammed V : aucun frais de livraison ne s’ajoute au tarif. Pour une autre ville, demandez les conditions à l’équipe sur WhatsApp.',
      },
      {
        q: 'Peut-on louer pour moins de 5 jours ?',
        a: 'Non, la location est de 5 jours minimum chez Yourent. Les tarifs affichés sont des tarifs par jour pour une location d’au moins 5 jours.',
      },
      {
        q: 'Les prix changent-ils ?',
        a: 'Oui, les tarifs peuvent évoluer. La grille de cette page reprend les tarifs en vigueur, et l’équipe confirme le prix final au moment de la réservation.',
      },
    ],
    related: ['conditions', 'economique', 'longue-duree', 'faq'],
  },
};

export default page;
