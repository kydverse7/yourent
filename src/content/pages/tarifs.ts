import type { LocalizedPage } from '../types';

const page: LocalizedPage = {
  fr: {
    metaTitle: 'Prix location voiture Casablanca dès {fleetMin} DH | Yourent',
    metaDescription:
      'Prix location voiture Casablanca dès {fleetMin} DH par jour, tarif réduit après 10 jours, livraison gratuite en ville et à l’aéroport Mohammed V. Grille par modèle.',
    eyebrow: 'Tarifs',
    h1: 'Prix de la location de voiture à Casablanca : tarifs par modèle',
    intro:
      'Chez Yourent, le prix d’une location de voiture à Casablanca démarre à {fleetMin} DH par jour, pour 5 jours minimum. Sur la plupart des modèles, le tarif baisse automatiquement au-delà de 10 jours. La grille ci-dessous affiche le prix de chaque voiture : vous savez ce que vous allez payer avant d’écrire à l’équipe.',
    breadcrumb: 'Tarifs',
    vehicles: { sort: 'asc' },
    sections: [
      {
        h2: 'Prix de la location de voiture à Casablanca : la grille par modèle',
        blocks: [
          {
            type: 'p',
            text: 'Chaque ligne indique le tarif par jour du modèle, son tarif au-delà de 10 jours et la caution minimale demandée au départ. La grille est tirée des tarifs en vigueur de l’agence, elle reste donc à jour quand vous la lisez. La voiture la moins chère part de {fleetMin} DH par jour, alors que la plus chère monte à {maxPrice} DH.',
          },
          { type: 'pricing' },
        ],
      },
      {
        h2: 'Deux paliers de tarif : 5 à 10 jours, puis plus de 10 jours',
        blocks: [
          {
            type: 'list',
            items: [
              '**De 5 à 10 jours** : le tarif journalier standard du modèle s’applique, car Yourent ne loue pas à la journée.',
              '**Au-delà de 10 jours** : le tarif réduit joue automatiquement, sans code ni démarche. L’écart est parfois important, mais certains modèles gardent le même prix, et la colonne « Plus de 10 jours » le montre modèle par modèle.',
            ],
          },
          {
            type: 'p',
            text: 'Prenons un exemple de lecture : le Dacia Duster est affiché à {price:dacia-duster} DH par jour de 5 à 10 jours. À partir de 11 jours, c’est la colonne « Plus de 10 jours » qui s’applique. Pour un séjour de plusieurs semaines, la page [location de voiture longue durée à Casablanca](route:longue-duree) détaille cette formule.',
          },
        ],
      },
      {
        h2: 'Ce que comprend le tarif de location',
        blocks: [
          {
            type: 'list',
            items: [
              'Une assurance tous risques avec franchise, incluse sur chaque véhicule.',
              'La livraison gratuite dans tout Casablanca et à l’aéroport Mohammed V, de 8h à 22h, 7j/7.',
              'Un véhicule de remplacement en cas de panne, puis l’accompagnement de l’équipe après un accident.',
            ],
          },
          {
            type: 'p',
            text: 'Trois points ne sont pas affichés sur le site : le kilométrage inclus, le montant de la franchise et le retour dans une autre ville. L’équipe les précise donc sur WhatsApp avant la réservation. Il n’y a pas de paiement en ligne : le règlement se fait directement avec l’équipe.',
          },
        ],
      },
      {
        h2: 'La caution selon le véhicule',
        blocks: [
          {
            type: 'p',
            text: 'La caution est demandée au départ, par chèque, en espèces ou par empreinte de carte. Son montant dépend du véhicule : la colonne « Caution dès » donne le minimum de chaque modèle, puis l’équipe confirme la somme exacte. Vous la récupérez quand la voiture revient en bon état, mais le délai précis se confirme avant la réservation. Le conducteur doit aussi avoir 21 ans minimum, comme l’expliquent les [conditions de location de voiture](route:conditions).',
          },
        ],
      },
      {
        h2: 'Comment réserver au prix affiché',
        blocks: [
          {
            type: 'p',
            text: 'Choisissez un véhicule dans le [catalogue](/catalogue), indiquez vos dates de prise en charge et de retour, puis envoyez la demande. L’équipe confirme alors la disponibilité et le prix sur WhatsApp ou par téléphone. Si le budget compte avant tout, la page [location de voiture pas chère à Casablanca](route:economique) regroupe les modèles les plus abordables.',
          },
        ],
      },
    ],
    faq: [
      {
        q: 'Quel est le prix d’une location de voiture à Casablanca chez Yourent ?',
        a: 'Les prix démarrent à {fleetMin} DH par jour et montent jusqu’à {maxPrice} DH selon le modèle. Le tarif exact de chaque voiture figure dans la grille de cette page.',
      },
      {
        q: 'Y a-t-il un prix réduit pour une longue location ?',
        a: 'Oui, sur la plupart des modèles : le tarif réduit s’applique automatiquement au-delà de 10 jours. En revanche, quelques modèles gardent le même prix, et la grille indique les deux montants de chaque voiture.',
      },
      {
        q: 'La livraison est-elle comprise dans le prix ?',
        a: 'Oui pour tout Casablanca et l’aéroport Mohammed V : aucun frais de livraison ne s’ajoute au tarif. Pour une autre ville, demandez les conditions à l’équipe sur WhatsApp.',
      },
      {
        q: 'Peut-on louer pour moins de 5 jours ?',
        a: 'Non, Yourent loue pour 5 jours minimum. Les tarifs affichés sont donc des prix par jour, valables pour une location d’au moins 5 jours.',
      },
      {
        q: 'Les prix changent-ils ?',
        a: 'Les tarifs peuvent évoluer, mais la grille de cette page reprend toujours ceux en vigueur. L’équipe confirme ensuite le prix final au moment de la réservation.',
      },
    ],
    related: ['conditions', 'economique', 'longue-duree', 'faq'],
  },
};

export default page;
