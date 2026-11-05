import type { LocalizedPage } from '../types';

const page: LocalizedPage = {
  fr: {
    metaTitle: "Location Porsche Casablanca : Macan dès {minPrice} DH | Yourent",
    metaDescription:
      "Louez une Porsche Macan à Casablanca pour {minPrice} DH par jour : SUV sportif en essence et boîte automatique, livré à l'hôtel ou à l'aéroport Mohammed V.",
    eyebrow: "Porsche",
    h1: "Location Porsche à Casablanca : le SUV Macan",
    intro:
      "Yourent loue la Porsche Macan à Casablanca pour {minPrice} DH par jour, en essence et boîte automatique, avec livraison à l'hôtel, à l'adresse de votre choix ou à l'aéroport Mohammed V. C'est le seul modèle Porsche de la flotte, proposé en plusieurs exemplaires. La demande se fait en ligne avec vos dates et l'équipe confirme sur WhatsApp. Location de 5 jours minimum.",
    breadcrumb: "Porsche",
    vehicles: { marques: ["Porsche"] },
    sections: [
      {
        h2: "La Porsche Macan : un SUV qui se conduit comme une sportive",
        blocks: [
          {
            type: "p",
            text: "La [Porsche Macan](/catalogue/porsche-macan) est un SUV compact de la marque allemande, reconnu pour sa tenue de route et son comportement plus proche d'une berline sportive que d'un 4x4. Elle accueille cinq personnes, avec une position de conduite assez haute pour voir loin dans la circulation de Casablanca. Chez Yourent, elle est à l'essence et en boîte automatique.",
          },
          {
            type: "p",
            text: "C'est la voiture de celui qui veut se faire plaisir sur quelques jours sans renoncer au coffre d'un SUV : les bagages d'un séjour ou les valises d'une petite famille.",
          },
        ],
      },
      {
        h2: "Louer une Porsche plutôt qu'un autre SUV haut de gamme",
        blocks: [
          {
            type: "p",
            text: "Face à la [Range Rover Evoque](/catalogue/range-rover-evoque), plus statutaire et plus tranquille, la Macan est la plus dynamique à conduire. Face à l'[Audi Q3](/catalogue/audi-q3), de gabarit voisin, elle joue dans une catégorie de prix supérieure : {price:porsche-macan} DH par jour contre {price:audi-q3} DH. Et si vous cherchez surtout de l'espace pour un budget plus mesuré, le [Volkswagen Touareg](/catalogue/volkswagen-touareg) reste un grand SUV à {price:volkswagen-touareg} DH.",
          },
        ],
      },
      {
        h2: "Où et quand prendre une Macan",
        blocks: [
          {
            type: "list",
            items: [
              "**À l'arrivée à Casablanca** : la voiture vous est livrée à l'aéroport Mohammed V, vous partez directement vers l'hôtel ou la route. Détails sur la page [location de voiture à l'aéroport](route:aeroport).",
              "**Pendant un séjour en ville** : confortable dans les embouteillages grâce à la boîte automatique, mais plus encombrante qu'une compacte pour se garer près de la Corniche.",
              "**Casablanca-Marrakech** : l'autoroute est son terrain préféré. Dépassements rapides, bon maintien, fatigue réduite sur le trajet.",
              "**Un week-end à deux** : la Macan donne l'impression d'une voiture de sport avec la praticité d'un SUV.",
            ],
          },
        ],
      },
      {
        h2: "La Porsche disponible à la location",
        blocks: [{ type: "vehicles" }],
      },
      {
        h2: "Prix de la location Porsche à Casablanca",
        blocks: [
          {
            type: "p",
            text: "La Macan est affichée à {minPrice} DH par jour. Le tableau ci-dessous donne le tarif pour 5 à 10 jours, le tarif au-delà de 10 jours et la caution demandée au départ. L'assurance tous risques avec franchise est incluse.",
          },
          { type: "pricing" },
          {
            type: "p",
            text: "Pour voir toutes les voitures de prestige de l'agence, consultez la page [location de voiture de luxe](route:luxe).",
          },
        ],
      },
    ],
    faq: [
      {
        q: "Quelle Porsche peut-on louer chez Yourent ?",
        a: "Le modèle proposé est la [Porsche Macan](/catalogue/porsche-macan), un SUV à l'essence et boîte automatique. L'agence n'a pas d'autre modèle Porsche dans sa flotte.",
      },
      {
        q: "La Porsche Macan convient-elle pour Casablanca-Marrakech ?",
        a: "Oui, c'est un bon choix pour l'autoroute. Précisez votre trajet à la réservation : le kilométrage inclus se vérifie auprès de l'équipe sur WhatsApp.",
      },
      {
        q: "Quelle caution faut-il pour la Macan ?",
        a: "Le montant dépend du véhicule et figure dans le tableau des tarifs ci-dessus. Il se règle au départ par chèque, en espèces ou par empreinte de carte, et vous est rendu au retour de la voiture en bon état.",
      },
      {
        q: "Peut-on réserver la Porsche à l'avance pour une arrivée à l'aéroport ?",
        a: "Oui. Indiquez le jour et l'horaire d'arrivée dans votre demande, et l'équipe confirme la livraison à l'aéroport Mohammed V. Le point de rendez-vous précis vous est donné sur WhatsApp.",
      },
    ],
    related: ["luxe", "range-rover", "mercedes", "suv", "aeroport"],
  },
};

export default page;
