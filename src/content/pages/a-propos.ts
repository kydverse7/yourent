import type { LocalizedPage } from '../types';

const page: LocalizedPage = {
  fr: {
    metaTitle: 'Agence de location de voitures à Casablanca | Yourent',
    metaDescription:
      'Yourent, agence de location de voitures à Casablanca : {vehicleCount} véhicules, {modelCount} modèles dès {fleetMin} DH par jour, note Google 4,8 sur 170 avis, ouverte 7j/7.',
    eyebrow: 'À propos',
    h1: 'Yourent, agence de location de voitures à Casablanca',
    intro:
      'Yourent est une agence de location de voitures située N°25 Rue Ibnou Mounir, à Casablanca. Elle propose {vehicleCount} véhicules répartis en {modelCount} modèles, à partir de {fleetMin} DH par jour, avec livraison gratuite dans tout Casablanca et à l’aéroport Mohammed V. L’agence est ouverte de 8h à 22h, 7j/7.',
    breadcrumb: 'À propos',
    sections: [
      {
        h2: 'Qui est Yourent',
        blocks: [
          {
            type: 'p',
            text: 'Yourent loue des voitures aux particuliers, aux touristes et aux Marocains résidant à l’étranger. La flotte va de la citadine économique au SUV et à la voiture premium : Fiat 500, Dacia Duster, Volkswagen Golf 8, Mercedes CLA, Porsche Macan, Range Rover Sport. Les véhicules, leurs photos et leurs tarifs sont visibles dans le [catalogue](/catalogue).',
          },
          {
            type: 'p',
            text: 'La location est de 5 jours minimum, et le tarif baisse automatiquement au-delà de 10 jours sur la plupart des modèles. Tous les véhicules sont couverts par une assurance tous risques avec franchise.',
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
              '**Horaires** : 8h à 22h, 7j/7.',
              '**Téléphone et WhatsApp** : +212 6 61 23 62 31.',
              '**E-mail** : contact@yourent.ma.',
            ],
          },
          {
            type: 'p',
            text: 'Pour venir ou demander une livraison, voyez la page [contact](route:contact).',
          },
        ],
      },
      {
        h2: 'Avis Google : 4,8 sur 170 avis',
        blocks: [
          {
            type: 'p',
            text: 'La fiche Google de l’agence affiche une note de 4,8 sur 5 pour 170 avis (relevé du 5 novembre 2026). Vous pouvez lire les avis directement sur la [fiche Google de Yourent](https://www.google.com/maps/place/YouRent/@33.5820604,-7.6363812,17z). La note évolue avec les nouveaux avis.',
          },
        ],
      },
      {
        h2: 'Réserver en ligne par dates',
        blocks: [
          {
            type: 'p',
            text: 'Le site permet de chercher les voitures libres sur vos dates : les véhicules déjà loués sur la période sont exclus. Vous envoyez ensuite une demande de réservation, puis l’équipe confirme sur WhatsApp ou par téléphone. Il n’y a pas de paiement en ligne. Les règles de caution, d’assurance et d’annulation sont sur la page [conditions de location](route:conditions).',
          },
        ],
      },
      {
        h2: 'Livraison à l’hôtel, à l’aéroport ou à votre adresse',
        blocks: [
          {
            type: 'p',
            text: 'Yourent livre le véhicule à l’hôtel, à l’aéroport Mohammed V ou à l’adresse de votre choix, 7j/7. La livraison est gratuite dans tout Casablanca et à l’aéroport. Il n’y a pas de comptoir à l’aéroport : le véhicule vous est remis sur place par l’équipe. Détails sur la page [location voiture aéroport](route:aeroport).',
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
        a: 'L’agence est au N°25 Rue Ibnou Mounir, 20100 Casablanca. Elle est ouverte de 8h à 22h, 7j/7.',
      },
      {
        q: 'Combien de voitures Yourent propose-t-il ?',
        a: 'La flotte compte {vehicleCount} véhicules répartis en {modelCount} modèles, de {fleetMin} DH à {maxPrice} DH par jour selon le modèle.',
      },
      {
        q: 'Quelle est la note de Yourent sur Google ?',
        a: 'La fiche Google affiche 4,8 sur 5 pour 170 avis, relevé du 5 novembre 2026.',
      },
      {
        q: 'Yourent a-t-il un comptoir à l’aéroport ?',
        a: 'Non. Yourent livre le véhicule à l’aéroport Mohammed V, gratuitement, mais n’a pas de bureau sur place.',
      },
      {
        q: 'Comment contacter Yourent ?',
        a: 'Par WhatsApp ou téléphone au +212 6 61 23 62 31, ou par e-mail à contact@yourent.ma.',
      },
    ],
    related: ['contact', 'conditions', 'tarifs', 'aeroport'],
  },
};

export default page;
