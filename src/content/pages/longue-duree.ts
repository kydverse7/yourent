import type { LocalizedPage } from '../types';

const page: LocalizedPage = {
  fr: {
    metaTitle: 'Location voiture longue durée Casablanca | Yourent',
    metaDescription:
      'Location voiture longue durée à Casablanca : au mois ou pour plusieurs semaines, tarif réduit automatique après 10 jours, dès {minPrice} DH/jour. Livraison gratuite.',
    eyebrow: 'Longue durée',
    h1: 'Location voiture longue durée à Casablanca',
    intro:
      "Yourent loue des voitures sur plusieurs semaines ou au mois à Casablanca. Le tarif par jour baisse automatiquement au-delà de 10 jours, à partir de {minPrice} DH par jour, et la livraison est gratuite. Pour un tarif précis au mois, l'équipe répond sur WhatsApp selon le modèle et les dates.",
    breadcrumb: 'Longue durée',
    vehicles: { sort: 'asc' },
    sections: [
      {
        h2: 'Comment fonctionne la location longue durée chez Yourent',
        blocks: [
          {
            type: 'p',
            text: "La **location voiture longue durée** ne demande pas de contrat spécial : c'est la même location, simplement plus longue. La durée minimum est de 5 jours. Entre 5 et 10 jours, le tarif par jour est celui du catalogue. Au-delà de 10 jours, un tarif par jour réduit s'applique automatiquement, sans code ni négociation.",
          },
          {
            type: 'p',
            text: "Cela convient à plusieurs situations : un séjour de plusieurs semaines à Casablanca, une mission professionnelle, un Marocain résidant à l'étranger qui passe l'été au pays, un chantier ou un stage. Si votre durée se compte en mois, la formule \"location voiture au mois\" ou mensuelle se discute avec l'équipe.",
          },
        ],
      },
      {
        h2: 'Combien coûte une location au mois à Casablanca',
        blocks: [
          {
            type: 'p',
            text: "Il n'y a pas de grille mensuelle affichée : le coût dépend du modèle, de la durée exacte et de la période. Pour estimer, prenez le tarif par jour au-delà de 10 jours dans le tableau et multipliez par le nombre de jours. Par exemple, un Dacia Duster part de {price:dacia-duster} DH par jour sur 5 à 10 jours, et un Volkswagen Tiguan de {price:volkswagen-tiguan} DH ; le tableau montre leur tarif réduit.",
          },
          { type: 'pricing' },
          {
            type: 'p',
            text: "Pour un tarif au mois précis, écrivez à l'équipe sur WhatsApp avec le modèle souhaité, la date de début et la durée prévue. Elle vous répond avec le montant, la caution et ce qu'elle peut proposer.",
          },
        ],
      },
      {
        h2: 'Quel véhicule choisir pour plusieurs semaines',
        blocks: [
          {
            type: 'list',
            items: [
              "**Petit budget et ville** : la Fiat 500 ou l'Opel Corsa, les moins chères de la flotte. Voir la page [voiture pas chère](route:economique).",
              "**Confort et autoroute** : une berline comme la [Toyota Corolla](/catalogue/toyota-corolla) (hybride) pour les trajets quotidiens, qui consomme moins sur la durée.",
              "**Famille et grands trajets** : un SUV diesel comme le [Volkswagen Tiguan](/catalogue/volkswagen-tiguan) ou le [Dacia Duster](/catalogue/dacia-duster). Voir la [location SUV](route:suv).",
              "**Longue durée sans embrayage** : une [voiture automatique](route:automatique), plus reposante si vous roulez tous les jours en ville.",
            ],
          },
          {
            type: 'p',
            text: "Plus la durée est longue, plus l'écart de tarif entre deux modèles pèse dans le total. Le diesel et l'hybride sont souvent plus économes en carburant sur de longues distances.",
          },
        ],
      },
      {
        h2: 'Réserver une location longue durée, étape par étape',
        blocks: [
          {
            type: 'list',
            ordered: true,
            items: [
              "Choisissez un véhicule et indiquez vos dates de début et de fin dans le catalogue : la recherche écarte les voitures déjà occupées sur toute la période.",
              "Envoyez la demande en ligne. Aucun paiement n'est demandé à cette étape.",
              "L'équipe confirme sur WhatsApp ou par téléphone, vous donne le montant total et la caution.",
              "La voiture est livrée à votre adresse, à votre hôtel ou à l'[aéroport Mohammed V](route:aeroport), gratuitement à Casablanca.",
            ],
          },
          {
            type: 'p',
            text: "Documents à prévoir : pièce d'identité valide (CIN ou passeport), permis de plus de 2 ans, justificatif de domicile. Les touristes étrangers peuvent présenter le permis international. Les [conditions de location](route:conditions) donnent le détail.",
          },
        ],
      },
      {
        h2: 'Panne, accident, prolongation : ce qui se passe sur une longue durée',
        blocks: [
          {
            type: 'p',
            text: "En cas de panne, un véhicule de remplacement est envoyé dans les plus brefs délais. En cas d'accident, l'équipe vous accompagne dans les démarches. Tous les véhicules sont couverts par une assurance tous risques avec franchise ; l'équipe précise le montant de la franchise sur WhatsApp.",
          },
          {
            type: 'p',
            text: "Si vous voulez garder la voiture plus longtemps que prévu, prévenez l'équipe avant la date de fin : la prolongation dépend de la disponibilité du véhicule, qui peut être réservé juste après vous. Pour changer de voiture en cours de location, parlez-en aussi à l'équipe.",
          },
        ],
      },
      {
        h2: 'Les véhicules disponibles en longue durée',
        blocks: [{ type: 'vehicles' }],
      },
    ],
    faq: [
      {
        q: 'À partir de combien de jours la location devient-elle moins chère par jour ?',
        a: "Au-delà de 10 jours, un tarif par jour réduit s'applique automatiquement. De 5 à 10 jours, c'est le tarif standard du modèle.",
      },
      {
        q: 'Peut-on louer une voiture au mois à Casablanca ?',
        a: "Oui. Il n'y a pas de grille mensuelle affichée : pour un tarif au mois précis, écrivez à l'équipe sur WhatsApp avec le modèle et les dates, elle vous répond avec le montant.",
      },
      {
        q: 'Quelle est la durée minimale de location ?',
        a: "5 jours. Il n'y a pas de location à la journée ou au week-end.",
      },
      {
        q: 'Que se passe-t-il si la voiture tombe en panne pendant une longue location ?',
        a: "Un véhicule de remplacement est envoyé dans les plus brefs délais. En cas d'accident, l'équipe accompagne le client dans les démarches.",
      },
      {
        q: 'Faut-il payer toute la location à l\'avance ?',
        a: "La réservation en ligne est une demande, sans paiement. Les modalités de règlement se font ensuite avec l'équipe, qui les précise à la confirmation sur WhatsApp.",
      },
    ],
    related: ['tarifs', 'economique', 'suv', 'conditions', 'aeroport'],
  },
};

export default page;
