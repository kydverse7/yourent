import type { LocalizedPage } from '../types';

const page: LocalizedPage = {
  fr: {
    metaTitle: 'Contact : location de voiture à Casablanca | Yourent',
    metaDescription:
      'Location de voiture à Casablanca : joignez Yourent par WhatsApp ou au +212 6 61 23 62 31, de 8h à 22h, 7j/7. Livraison gratuite à l’aéroport et en ville.',
    eyebrow: 'Contact',
    h1: 'Contacter Yourent, location de voiture à Casablanca : WhatsApp, téléphone, adresse',
    intro:
      'Pour une location de voiture à Casablanca, le plus rapide est de joindre Yourent par WhatsApp ou par téléphone, au +212 6 61 23 62 31, de 8h à 22h, 7j/7. Vous pouvez aussi écrire à contact@yourent.ma ou passer à l’agence, au N°25 Rue Ibnou Mounir. L’équipe confirme les disponibilités et organise la livraison.',
    breadcrumb: 'Contact',
    sections: [
      {
        h2: 'Joindre l’agence de location de voiture à Casablanca : téléphone, WhatsApp, e-mail',
        blocks: [
          {
            type: 'list',
            items: [
              '**Appels et messages WhatsApp** : +212 6 61 23 62 31.',
              '**E-mail** : contact@yourent.ma.',
              '**Instagram** : [you_rent_car](https://www.instagram.com/you_rent_car).',
            ],
          },
          {
            type: 'p',
            text: 'WhatsApp convient bien pour envoyer vos dates, votre vol ou l’adresse de livraison. Certains points ne sont pas tranchés par le site : la franchise, le kilométrage inclus ou le retour dans une autre ville. L’équipe y répond donc avant la réservation.',
          },
        ],
      },
      {
        h2: 'Adresse et horaires de l’agence de location',
        blocks: [
          {
            type: 'p',
            text: 'Vous trouverez l’agence N°25 Rue Ibnou Mounir, 20100 Casablanca. Elle accueille ses clients tous les jours, de 8h à 22h. Pour trouver l’agence, ouvrez la [fiche Google de Yourent](https://www.google.com/maps/place/YouRent/@33.5820604,-7.6363812,17z).',
          },
        ],
      },
      {
        h2: 'Comment demander une livraison de voiture',
        blocks: [
          {
            type: 'list',
            ordered: true,
            items: [
              'Choisissez votre véhicule dans le [catalogue](/catalogue), puis vos dates.',
              'Envoyez la demande, ou écrivez sur WhatsApp avec le lieu de remise : hôtel, aéroport Mohammed V ou adresse à Casablanca.',
              'L’équipe confirme ensuite la disponibilité, le prix et l’heure de remise.',
            ],
          },
          {
            type: 'p',
            text: 'La livraison ne coûte rien dans tout Casablanca ni à l’aéroport, 7j/7. Si vous descendez du train, la page [location de voiture à la gare Casa Voyageurs](route:casa-voyageurs) explique la remise ; si vous atterrissez, lisez plutôt la page [location de voiture à l’aéroport de Casablanca](route:aeroport).',
          },
        ],
      },
      {
        h2: 'Avant de nous écrire',
        blocks: [
          {
            type: 'p',
            text: 'Les prix, la caution et les documents demandés sont détaillés sur les pages [prix de location de voiture à Casablanca](route:tarifs) et [FAQ de la location](route:faq). Une réponse s’y trouve peut-être déjà, ce qui vous fait gagner du temps.',
          },
        ],
      },
    ],
    faq: [
      {
        q: 'Quel est le numéro de téléphone de Yourent ?',
        a: 'Le numéro est le +212 6 61 23 62 31, valable pour les appels comme pour WhatsApp.',
      },
      {
        q: 'Quels sont les horaires de l’agence ?',
        a: 'Elle est ouverte de 8h à 22h, 7j/7. Pour une remise en dehors de ces heures, demandez d’abord à l’équipe, car rien n’est promis sur le site.',
      },
      {
        q: 'Où se trouve l’agence ?',
        a: 'Au N°25 Rue Ibnou Mounir, 20100 Casablanca. Le plan figure sur la fiche Google de Yourent.',
      },
      {
        q: 'Comment demander une livraison de voiture ?',
        a: 'Envoyez une demande depuis le site, ou un message WhatsApp avec vos dates et le lieu de remise. La livraison est gratuite dans tout Casablanca et à l’aéroport Mohammed V.',
      },
      {
        q: 'Peut-on réserver par e-mail ?',
        a: 'Vous pouvez écrire à contact@yourent.ma, mais WhatsApp et le téléphone confirment une disponibilité plus vite.',
      },
    ],
    related: ['faq', 'tarifs', 'aeroport', 'a-propos'],
  },
};

export default page;
