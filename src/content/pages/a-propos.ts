import type { LocalizedPage } from '../types';

const page: LocalizedPage = {
  fr: {
    metaTitle: 'Agence de location de voiture à Casablanca, 4,8/5 | Yourent',
    metaDescription:
      'Yourent, agence de location de voiture à Casablanca : {vehicleCount} véhicules, {modelCount} modèles dès {fleetMin} DH par jour, note Google 4,8 sur 170 avis, livraison gratuite.',
    eyebrow: 'À propos',
    h1: 'Agence de location de voiture à Casablanca : qui est Yourent',
    intro:
      'Yourent est une agence de location de voiture à Casablanca, installée au N°25 Rue Ibnou Mounir. Elle propose {vehicleCount} véhicules répartis en {modelCount} modèles, à partir de {fleetMin} DH par jour, avec une livraison gratuite dans tout Casablanca et à l’aéroport Mohammed V. Les équipes accueillent les clients de 8h à 22h, 7j/7.',
    breadcrumb: 'À propos',
    sections: [
      {
        h2: 'Une agence de location de voiture à Casablanca pour particuliers et voyageurs',
        blocks: [
          {
            type: 'p',
            text: 'Yourent loue des voitures aux particuliers, aux touristes et aux Marocains résidant à l’étranger. La flotte va de la citadine économique au SUV et à la voiture premium. On y trouve par exemple la Fiat 500, le Dacia Duster, la Volkswagen Golf 8, la Mercedes CLA, le Porsche Macan ou le Range Rover Sport. Les photos, les véhicules et les tarifs sont visibles dans le [catalogue](/catalogue).',
          },
          {
            type: 'p',
            text: 'La location dure 5 jours minimum, mais le tarif baisse automatiquement au-delà de 10 jours sur la plupart des modèles. Une assurance tous risques avec franchise couvre en outre tous les véhicules. Le conducteur doit avoir 21 ans minimum, comme le détaillent les [conditions de location](route:conditions).',
          },
        ],
      },
      {
        h2: 'Adresse et horaires de l’agence',
        blocks: [
          {
            type: 'list',
            items: [
              '**Adresse** : N°25 Rue Ibnou Mounir, 20100 Casablanca, Maroc.',
              '**Horaires** : ouvert tous les jours, de 8h à 22h.',
              '**Téléphone et WhatsApp** : +212 6 61 23 62 31.',
              '**E-mail** : contact@yourent.ma.',
            ],
          },
          {
            type: 'p',
            text: 'Pour venir à l’agence ou demander une livraison, la page [contact de l’agence de location](route:contact) donne tous les moyens de joindre l’équipe.',
          },
        ],
      },
      {
        h2: 'Avis Google : 4,8 sur 170 avis',
        blocks: [
          {
            type: 'p',
            text: 'La fiche Google de l’agence affiche une note de 4,8 sur 5 pour 170 avis, relevée le 5 novembre 2026. Les avis se lisent directement sur la [fiche Google de Yourent](https://www.google.com/maps/place/YouRent/@33.5820604,-7.6363812,17z). Cette note évolue toutefois avec chaque nouvel avis.',
          },
        ],
      },
      {
        h2: 'Réserver en ligne par dates',
        blocks: [
          {
            type: 'p',
            text: 'Le site cherche les voitures libres sur vos dates : les véhicules déjà loués sur la période sont exclus. Vous envoyez ensuite une demande de réservation, puis l’équipe la confirme sur WhatsApp ou par téléphone. Le règlement se fait alors avec l’équipe, sans paiement en ligne. Pour la caution, l’assurance et l’annulation, la page [conditions de location de voiture](route:conditions) fait le point.',
          },
        ],
      },
      {
        h2: 'Livraison à l’hôtel, à l’aéroport ou à votre adresse',
        blocks: [
          {
            type: 'p',
            text: 'Yourent livre le véhicule à l’hôtel, à l’aéroport Mohammed V ou à l’adresse de votre choix, 7j/7. La livraison est gratuite dans tout Casablanca et à l’aéroport. Il n’y a pas de comptoir dans le terminal, c’est pourquoi l’équipe vous remet la voiture sur place. Pour la marche à suivre, lisez la page [location de voiture à l’aéroport de Casablanca](route:aeroport).',
          },
        ],
      },
      {
        h2: 'Suivre Yourent',
        blocks: [
          {
            type: 'p',
            text: 'Yourent est présent sur [Instagram](https://www.instagram.com/you_rent_car), [Facebook](https://www.facebook.com/yourent.ma) et [TikTok](https://www.tiktok.com/@yourent.ma).',
          },
        ],
      },
    ],
    faq: [
      {
        q: 'Où se trouve l’agence Yourent à Casablanca ?',
        a: 'Elle se trouve au N°25 Rue Ibnou Mounir, 20100 Casablanca, et reçoit les clients chaque jour de 8h à 22h.',
      },
      {
        q: 'Combien de voitures Yourent propose-t-il ?',
        a: 'Yourent aligne {vehicleCount} véhicules en {modelCount} modèles, de la citadine au SUV premium. Les tarifs vont de {fleetMin} DH à {maxPrice} DH par jour selon le modèle.',
      },
      {
        q: 'Quelle est la note de Yourent sur Google ?',
        a: 'La fiche Google affiche 4,8 sur 5 pour 170 avis, selon le relevé du 5 novembre 2026.',
      },
      {
        q: 'Yourent a-t-il un comptoir à l’aéroport ?',
        a: 'Non, mais Yourent livre gratuitement le véhicule à l’aéroport Mohammed V. L’agence n’y tient pas de bureau.',
      },
      {
        q: 'Comment contacter Yourent ?',
        a: 'Écrivez sur WhatsApp ou appelez le +212 6 61 23 62 31. Sinon, l’adresse contact@yourent.ma reçoit aussi vos messages.',
      },
    ],
    related: ['contact', 'conditions', 'tarifs', 'aeroport'],
  },
};

export default page;
