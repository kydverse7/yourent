import type { LocalizedPage } from '../types';

const page: LocalizedPage = {
  fr: {
    metaTitle: "Location Range Rover Casablanca dès {minPrice} DH | Yourent",
    metaDescription:
      "Location Range Rover Casablanca : Evoque et Sport dès {minPrice} DH/jour, diesel et automatique. Livraison gratuite à l'aéroport Mohammed V, note Google 4,8/5.",
    eyebrow: "Range Rover",
    h1: "Location de Range Rover à Casablanca : Evoque et Sport",
    intro:
      "Yourent propose la location de Range Rover à Casablanca : l'Evoque dès {minPrice} DH par jour et le Sport à {price:range-rover-sport} DH, livrés gratuitement en ville et à l'aéroport Mohammed V. Vous choisissez vos dates dans le catalogue, puis l'équipe confirme sur WhatsApp ou par téléphone. Les deux modèles roulent en diesel avec boîte automatique, et la location démarre à 5 jours.",
    breadcrumb: "Range Rover",
    vehicles: { marques: ["Range Rover"], sort: "asc" },
    sections: [
      {
        h2: "Location de Range Rover à Casablanca : Evoque ou Sport ?",
        blocks: [
          {
            type: "p",
            text: "Le [Range Rover Evoque](/catalogue/range-rover-evoque) est le SUV compact de la marque, à la ligne plus basse et plus urbaine. Le [Range Rover Sport](/catalogue/range-rover-sport), lui, est un grand SUV de prestige : plus large, plus imposant, pensé pour les longues distances et les passagers installés à l'arrière. L'écart de prix reflète surtout cette différence de gabarit.",
          },
          {
            type: "table",
            head: ["Critère", "Evoque", "Sport"],
            rows: [
              ["Tarif par jour, de 5 à 10 jours", "{price:range-rover-evoque} DH", "{price:range-rover-sport} DH"],
              ["Format", "SUV compact", "Grand SUV de prestige"],
              ["Moteur et boîte", "Diesel, automatique", "Diesel, automatique"],
              ["Places", "5", "5"],
              ["Le plus adapté à", "Un séjour en ville, deux ou trois personnes", "Une famille, des bagages, de longues distances"],
            ],
          },
          {
            type: "p",
            text: "Ces deux Range Rover existent en un ou deux exemplaires seulement. La recherche par dates du catalogue vous dit s'ils sont libres sur votre période.",
          },
        ],
      },
      {
        h2: "Prix de la location d'un Range Rover à Casablanca",
        blocks: [
          {
            type: "p",
            text: "Le tarif journalier va de {minPrice} à {maxPrice} DH selon le modèle. Comme la location dure au moins 5 jours, votre budget de départ équivaut à cinq fois ce tarif. Au-delà de 10 jours, le tableau donne le tarif réduit de chaque version.",
          },
          { type: "pricing" },
          {
            type: "p",
            text: "L'assurance tous risques avec franchise est comprise, et l'équipe précise le montant de la franchise sur WhatsApp. La caution, demandée au départ, dépend de la voiture : le tableau l'indique quand il est renseigné. Pour situer ces prix, consultez aussi nos [tarifs de location de voiture à Casablanca](route:tarifs).",
          },
        ],
      },
      {
        h2: "Pourquoi choisir un Range Rover plutôt qu'un autre SUV",
        blocks: [
          {
            type: "p",
            text: "Position de conduite haute, assise confortable et image de la marque : on loue un Range Rover autant pour ce qu'il montre que pour ce qu'il permet. Si le prestige compte moins que l'espace, le [Volkswagen Touareg](/catalogue/volkswagen-touareg) offre par exemple un gabarit proche de celui du Sport pour {price:volkswagen-touareg} DH par jour. Si vous préférez une conduite plus sportive, regardez le [Porsche Macan](/catalogue/porsche-macan).",
          },
          {
            type: "p",
            text: "Pour comparer tous les SUV de la flotte, du Dacia Duster aux modèles premium, voyez notre [location de SUV à Casablanca](route:suv). Notre [location de voiture de luxe à Casablanca](route:luxe) réunit les Range Rover, les Mercedes et le Macan.",
          },
        ],
      },
      {
        h2: "Quel Range Rover pour quel déplacement",
        blocks: [
          {
            type: "list",
            items: [
              "**Arrivée en famille à l'aéroport** : le Sport absorbe plus de bagages et plus de monde. Notre page [location de voiture à l'aéroport de Casablanca](route:aeroport) explique comment il vous est livré sur place.",
              "**Séjour en ville** : l'Evoque, plus court, est plus simple à garer et à manœuvrer dans le centre ou autour de la Corniche.",
              "**Casablanca-Marrakech** : les deux conviennent à l'autoroute ; le Sport laisse plus de place aux bagages de quatre ou cinq passagers.",
              "**Escapade hors de la ville** : la hauteur de caisse des deux modèles est utile sur les routes secondaires un peu abîmées.",
            ],
          },
        ],
      },
      {
        h2: "Louer un Range Rover à Casablanca : âge, permis, documents",
        blocks: [
          {
            type: "p",
            text: "Pour louer un Range Rover, il faut avoir au moins 21 ans et un permis de plus de 2 ans. Présentez aussi une pièce d'identité valide (CIN ou passeport) et un justificatif de domicile. Le permis international est accepté pour les touristes étrangers, et nos [conditions de location de voiture](route:conditions) détaillent le reste.",
          },
          {
            type: "p",
            text: "La demande en ligne n'engage aucun paiement, puisque le règlement se fait ensuite avec l'équipe. Vous pouvez modifier ou annuler gratuitement jusqu'à 24 h avant la prise en charge.",
          },
        ],
      },
      {
        h2: "Les Range Rover disponibles à Casablanca",
        blocks: [{ type: "vehicles" }],
      },
    ],
    faq: [
      {
        q: "Quelle est la différence entre le Range Rover Evoque et le Sport ?",
        a: "L'Evoque est un SUV compact, facile en ville. Le Sport est un grand SUV, plus spacieux, mais aussi nettement plus cher : comparez {price:range-rover-evoque} DH et {price:range-rover-sport} DH par jour.",
      },
      {
        q: "Les Range Rover sont-ils en diesel ou en essence ?",
        a: "Les deux modèles proposés sont en diesel, avec boîte automatique. Chaque fiche du catalogue donne le détail de la voiture.",
      },
      {
        q: "Peut-on louer un Range Rover pour aller de Casablanca à Marrakech ?",
        a: "Oui. Prévenez toutefois l'équipe de votre itinéraire à la réservation. Le kilométrage inclus n'est pas affiché sur le site ; elle vous le précise sur WhatsApp.",
      },
      {
        q: "Quelle caution faut-il prévoir pour un Range Rover ?",
        a: "Elle varie selon le modèle et se règle au départ, par chèque, en espèces ou par empreinte de carte. On vous la rend au retour du véhicule en bon état, et son montant exact vous est donné à la confirmation.",
      },
      {
        q: "Quel âge faut-il pour louer un Range Rover à Casablanca ?",
        a: "Il faut au moins 21 ans et un permis de plus de 2 ans, quel que soit le modèle choisi.",
      },
      {
        q: "Un Range Rover peut-il être livré à mon hôtel ?",
        a: "Oui, la livraison est gratuite à votre hôtel ou à votre adresse dans Casablanca, ainsi qu'à l'aéroport Mohammed V. Elle est assurée de 8h à 22h, 7 jours sur 7.",
      },
    ],
    related: ["suv", "luxe", "mercedes", "porsche", "tarifs"],
  },
};

export default page;
