import type { LocalizedPage } from '../types';

const page: LocalizedPage = {
  fr: {
    metaTitle: "Location Porsche Casablanca : Macan dès {minPrice} DH | Yourent",
    metaDescription:
      "Location Porsche Casablanca : Macan à {minPrice} DH par jour, SUV sportif en essence et boîte automatique, livré gratuitement à l'hôtel ou à l'aéroport Mohammed V.",
    eyebrow: "Porsche",
    h1: "Location de Porsche à Casablanca : le SUV Macan",
    intro:
      "Yourent propose la location d'une Porsche à Casablanca : le Macan, à {minPrice} DH par jour, en essence et boîte automatique, livré à l'hôtel ou à l'aéroport Mohammed V. C'est le seul modèle Porsche de la flotte, proposé en plusieurs exemplaires. La demande se fait en ligne avec vos dates, puis l'équipe confirme sur WhatsApp. La location du Macan dure 5 jours au minimum.",
    breadcrumb: "Porsche",
    vehicles: { marques: ["Porsche"] },
    sections: [
      {
        h2: "Location de Porsche à Casablanca : un SUV qui se conduit comme une sportive",
        blocks: [
          {
            type: "p",
            text: "Le [Porsche Macan](/catalogue/porsche-macan) est un SUV compact de la marque allemande, reconnu pour sa tenue de route et son comportement plus proche d'une berline sportive que d'un 4x4. Il accueille cinq personnes, avec une position de conduite assez haute pour voir loin dans la circulation de Casablanca. Chez Yourent, il roule à l'essence, en boîte automatique.",
          },
          {
            type: "p",
            text: "C'est la voiture de celui qui veut se faire plaisir sans renoncer au coffre d'un SUV, pour les valises d'une petite famille par exemple.",
          },
        ],
      },
      {
        h2: "Louer une Porsche plutôt qu'un autre SUV haut de gamme",
        blocks: [
          {
            type: "p",
            text: "Le [Range Rover Evoque](/catalogue/range-rover-evoque), de gabarit comparable, est affiché à {price:range-rover-evoque} DH par jour, en diesel. Face à l'[Audi Q3](/catalogue/audi-q3), de format voisin, le Macan joue en revanche dans une catégorie de prix supérieure : {price:porsche-macan} DH par jour contre {price:audi-q3} DH. Si vous cherchez surtout de l'espace pour un budget plus mesuré, le [Volkswagen Touareg](/catalogue/volkswagen-touareg) reste un grand SUV à {price:volkswagen-touareg} DH.",
          },
        ],
      },
      {
        h2: "Où et quand prendre un Macan",
        blocks: [
          {
            type: "list",
            items: [
              "**À l'arrivée à Casablanca** : la voiture vous est livrée à l'aéroport Mohammed V, puis vous partez directement vers l'hôtel ou la route. Voyez notre page [location de voiture à l'aéroport de Casablanca](route:aeroport).",
              "**Pendant un séjour en ville** : la boîte automatique aide dans les embouteillages, mais le Macan reste plus encombrant qu'une compacte pour se garer près de la Corniche.",
              "**Casablanca-Marrakech** : l'autoroute A3 lui convient ; demandez le kilométrage inclus à l'équipe avant de partir.",
              "**Un séjour à deux** : le Macan donne l'impression d'une voiture de sport, tout en gardant la praticité d'un SUV.",
            ],
          },
        ],
      },
      {
        h2: "Le Macan disponible à la location",
        blocks: [{ type: "vehicles" }],
      },
      {
        h2: "Prix de la location Porsche à Casablanca",
        blocks: [
          {
            type: "p",
            text: "Le Macan est affiché à {minPrice} DH par jour. Le tableau ci-dessous donne le tarif pour 5 à 10 jours, le tarif au-delà de 10 jours et la caution demandée au départ. L'assurance tous risques avec franchise est incluse.",
          },
          { type: "pricing" },
          {
            type: "p",
            text: "Pour voir toutes les voitures de prestige de l'agence, consultez notre [location de voiture de luxe à Casablanca](route:luxe). Si vous comparez d'abord les grands SUV, notre [location de Range Rover à Casablanca](route:range-rover) vous aidera.",
          },
        ],
      },
    ],
    faq: [
      {
        q: "Quelle Porsche peut-on louer chez Yourent ?",
        a: "Le modèle proposé est le [Porsche Macan](/catalogue/porsche-macan), un SUV à l'essence et boîte automatique. L'agence n'a pas d'autre modèle Porsche dans sa flotte.",
      },
      {
        q: "Le Porsche Macan convient-il pour Casablanca-Marrakech ?",
        a: "Oui, c'est un bon choix pour l'autoroute. Précisez toutefois votre trajet à la réservation, car le kilométrage inclus se vérifie auprès de l'équipe sur WhatsApp.",
      },
      {
        q: "Quelle caution faut-il pour le Macan ?",
        a: "Le montant dépend du véhicule et figure dans le tableau des tarifs ci-dessus. Il se règle au départ par chèque, en espèces ou par empreinte de carte, puis il revient au client quand la voiture rentre en bon état.",
      },
      {
        q: "Quelles conditions pour louer une Porsche à Casablanca ?",
        a: "Un âge de 21 ans minimum et un permis de plus de 2 ans sont demandés. Prévoyez aussi une pièce d'identité valide et un justificatif de domicile, comme le rappellent nos [conditions de location de voiture](route:conditions).",
      },
      {
        q: "Peut-on réserver le Macan à l'avance pour une arrivée à l'aéroport ?",
        a: "Oui. Indiquez le jour et l'horaire d'arrivée dans votre demande, puis l'équipe confirme la livraison à l'aéroport Mohammed V. Elle vous donne le point de rendez-vous précis sur WhatsApp.",
      },
    ],
    related: ["luxe", "range-rover", "mercedes", "suv", "aeroport"],
  },
};

export default page;
