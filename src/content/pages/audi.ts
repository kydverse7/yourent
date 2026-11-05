import type { LocalizedPage } from '../types';

const page: LocalizedPage = {
  fr: {
    metaTitle: "Location Audi Casablanca : Q3 et A3 dès {minPrice} DH | Yourent",
    metaDescription:
      "Location Audi Casablanca : A3 ou Q3 dès {minPrice} DH par jour, berline compacte ou SUV, livraison gratuite à l'hôtel ou à l'aéroport Mohammed V, devis sur WhatsApp.",
    eyebrow: "Audi",
    h1: "Location d'Audi à Casablanca : A3 et Q3",
    intro:
      "Yourent propose la location d'Audi à Casablanca : l'A3 à partir de {minPrice} DH par jour et le Q3 à {price:audi-q3} DH. Vous envoyez vos dates par la demande en ligne, puis l'équipe confirme sur WhatsApp. La voiture arrive à l'hôtel, à l'adresse choisie ou à l'aéroport Mohammed V. Il faut louer pour 5 jours au minimum.",
    breadcrumb: "Audi",
    vehicles: { marques: ["Audi"], sort: "asc" },
    sections: [
      {
        h2: "Location d'Audi à Casablanca : A3 compacte ou Q3 SUV",
        blocks: [
          {
            type: "p",
            text: "L'[Audi A3](/catalogue/audi-a3) est une compacte premium à l'essence, en boîte automatique. C'est aussi la plus petite et la moins chère des deux. L'[Audi Q3](/catalogue/audi-q3) est en revanche un SUV compact en diesel, avec une assise plus haute et plus de volume de coffre. Il existe en boîte automatique et en boîte manuelle selon l'exemplaire.",
          },
          {
            type: "p",
            text: "L'A3 n'existe qu'en un exemplaire, alors que le Q3 est proposé en plusieurs. Si vos dates sont fixes, utilisez la recherche par dates du catalogue pour voir ce qui est libre.",
          },
        ],
      },
      {
        h2: "Choisir entre l'A3 et le Q3 selon votre usage",
        blocks: [
          {
            type: "list",
            items: [
              "**Arrivée à l'aéroport Mohammed V** : pour une ou deux personnes avec peu de bagages, l'A3 suffit. Pour des valises plus nombreuses, prenez en revanche le Q3. Notre page [location de voiture à l'aéroport de Casablanca](route:aeroport) détaille la livraison.",
              "**Séjour à Casablanca** : l'A3 se faufile dans le centre et se gare plus facilement. Le Q3 offre une assise plus haute, utile pour sortir de la ville.",
              "**Casablanca-Marrakech** : les deux font l'autoroute ; le Q3, en diesel, a le coffre le plus grand pour les valises.",
              "**Un rendez-vous professionnel** : l'A3 donne l'image d'une berline sobre et soignée.",
            ],
          },
        ],
      },
      {
        h2: "Les Audi disponibles à la location",
        blocks: [{ type: "vehicles" }],
      },
      {
        h2: "Prix de la location Audi à Casablanca",
        blocks: [
          {
            type: "p",
            text: "L'A3 est à {price:audi-a3} DH par jour, le Q3 à {price:audi-q3} DH. Le choix se joue d'abord sur le format de la voiture. Au-delà de 10 jours, le tarif baisse automatiquement sur la plupart des modèles de la flotte, et le tableau donne le montant pour chaque Audi. L'assurance tous risques avec franchise est comprise, et la caution figure dans le tableau.",
          },
          { type: "pricing" },
        ],
      },
      {
        h2: "Audi ou autre marque allemande",
        blocks: [
          {
            type: "p",
            text: "Face à l'A3, la [Volkswagen Golf 8](/catalogue/volkswagen-golf-8) partage une partie de sa technique pour un prix proche, alors que la [Mercedes CLA](/catalogue/mercedes-cla) vise plus haut en image. Face au Q3, le [Volkswagen T-Roc](/catalogue/volkswagen-t-roc) est moins cher et le [Porsche Macan](/catalogue/porsche-macan) bien plus cher, à {price:porsche-macan} DH par jour. Pour un tour d'horizon complet, voyez notre [location de voiture de luxe à Casablanca](route:luxe).",
          },
        ],
      },
    ],
    faq: [
      {
        q: "Quelle est la différence entre l'Audi A3 et l'Audi Q3 ?",
        a: "L'A3 est une berline compacte à l'essence, boîte automatique. Le Q3 est plutôt un SUV compact en diesel, plus haut et avec un coffre plus grand, proposé en automatique ou en manuelle.",
      },
      {
        q: "Peut-on choisir la boîte manuelle sur une Audi ?",
        a: "Seul le Q3 existe dans les deux boîtes, car l'A3 est uniquement en automatique. Précisez donc la boîte souhaitée dans votre demande.",
      },
      {
        q: "L'Audi peut-elle être livrée à l'aéroport ?",
        a: "Oui, Yourent livre à l'aéroport Mohammed V et dans tout Casablanca sans frais, de 8h à 22h. Indiquez simplement votre heure d'arrivée dans la demande.",
      },
      {
        q: "Quelle caution pour louer une Audi ?",
        a: "Elle dépend du modèle et se règle au départ par chèque, en espèces ou par empreinte de carte. Vous la récupérez si le véhicule revient en bon état.",
      },
      {
        q: "Quelles conditions pour louer une Audi à Casablanca ?",
        a: "Le conducteur doit avoir au moins 21 ans et un permis de plus de 2 ans. Nos [conditions de location de voiture](route:conditions) listent aussi les autres documents à présenter.",
      },
    ],
    related: ["luxe", "suv", "volkswagen", "automatique", "tarifs"],
  },
};

export default page;
