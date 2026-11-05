import type { LocalizedPage } from '../types';

const page: LocalizedPage = {
  fr: {
    metaTitle: 'Contact Yourent location voiture Casablanca | Yourent',
    metaDescription:
      'Contact Yourent, location de voiture à Casablanca : WhatsApp et téléphone +212 6 61 23 62 31, e-mail, adresse Rue Ibnou Mounir, ouvert de 8h à 22h, 7j/7.',
    eyebrow: 'Contact',
    h1: 'Contact Yourent, location de voiture à Casablanca',
    intro:
      'Le moyen le plus rapide de joindre Yourent est WhatsApp ou le téléphone au +212 6 61 23 62 31, de 8h à 22h, 7j/7. Vous pouvez aussi écrire à contact@yourent.ma ou passer à l’agence, N°25 Rue Ibnou Mounir à Casablanca. L’équipe confirme les disponibilités et organise la livraison.',
    breadcrumb: 'Contact',
    sections: [
      {
        h2: 'Téléphone, WhatsApp, e-mail',
        blocks: [
          {
            type: 'list',
            items: [
              '**Téléphone et WhatsApp** : +212 6 61 23 62 31.',
              '**E-mail** : contact@yourent.ma.',
              '**Instagram** : [you_rent_car](https://www.instagram.com/you_rent_car).',
            ],
          },
          {
            type: 'p',
            text: 'WhatsApp convient bien pour envoyer vos dates, votre vol ou l’adresse de livraison. Les questions que le site ne tranche pas (âge minimum, franchise, kilométrage inclus, retour dans une autre ville) y trouvent une réponse de l’équipe avant la réservation.',
          },
        ],
      },
      {
        h2: 'Adresse et horaires de l’agence',
        blocks: [
          {
            type: 'p',
            text: 'L’agence se trouve N°25 Rue Ibnou Mounir, 20100 Casablanca. Elle est ouverte de 8h à 22h, tous les jours de la semaine. Le plan et les avis sont sur la [fiche Google de Yourent](https://www.google.com/maps/place/YouRent/@33.5820604,-7.6363812,17z).',
          },
        ],
      },
      {
        h2: 'Comment demander une livraison',
        blocks: [
          {
            type: 'list',
            ordered: true,
            items: [
              'Choisissez votre véhicule dans le [catalogue](/catalogue) et vos dates.',
              'Envoyez la demande, ou écrivez sur WhatsApp avec le lieu de remise : hôtel, aéroport Mohammed V ou adresse à Casablanca.',
              'L’équipe confirme la disponibilité, le prix et l’heure de remise.',
            ],
          },
          {
            type: 'p',
            text: 'La livraison est gratuite dans tout Casablanca et à l’aéroport, 7j/7. Pour la gare Casa Voyageurs, voyez [location voiture gare Casa Voyageurs](route:casa-voyageurs) ; pour l’arrivée en avion, [location voiture aéroport](route:aeroport).',
          },
        ],
      },
      {
        h2: 'Avant de nous écrire',
        blocks: [
          {
            type: 'p',
            text: 'Les prix, la caution et les documents demandés sont détaillés sur les pages [tarifs](route:tarifs) et [FAQ](route:faq). Une réponse existe peut-être déjà.',
          },
        ],
      },
    ],
    faq: [
      {
        q: 'Quel est le numéro de téléphone de Yourent ?',
        a: 'Le numéro est le +212 6 61 23 62 31, valable pour les appels et pour WhatsApp.',
      },
      {
        q: 'Quels sont les horaires de l’agence ?',
        a: 'L’agence est ouverte de 8h à 22h, 7j/7. Pour une remise en dehors de cette plage horaire, demandez d’abord à l’équipe.',
      },
      {
        q: 'Où se trouve l’agence ?',
        a: 'Au N°25 Rue Ibnou Mounir, 20100 Casablanca. Le plan est sur la fiche Google de Yourent.',
      },
      {
        q: 'Comment demander une livraison de voiture ?',
        a: 'Envoyez une demande depuis le site ou un message WhatsApp avec vos dates et le lieu de remise. La livraison est gratuite dans tout Casablanca et à l’aéroport Mohammed V.',
      },
      {
        q: 'Peut-on réserver par e-mail ?',
        a: 'Vous pouvez écrire à contact@yourent.ma, mais WhatsApp et le téléphone sont plus rapides pour confirmer une disponibilité.',
      },
    ],
    related: ['faq', 'tarifs', 'aeroport', 'a-propos'],
  },
};

export default page;
