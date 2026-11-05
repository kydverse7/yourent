import type { LocalizedPage } from '../types';

const page: LocalizedPage = {
  fr: {
    metaTitle: "Location Audi Casablanca : Q3 et A3 dès {minPrice} DH | Yourent",
    metaDescription:
      "Louez une Audi A3 ou Q3 à Casablanca dès {minPrice} DH par jour : berline compacte ou SUV, livraison à l'hôtel ou à l'aéroport Mohammed V, devis sur WhatsApp.",
    eyebrow: "Audi",
    h1: "Location Audi à Casablanca : A3 et Q3",
    intro:
      "Yourent loue deux Audi à Casablanca : l'A3 à partir de {minPrice} DH par jour et le Q3 à {price:audi-q3} DH. Vous envoyez vos dates par la demande en ligne, l'équipe confirme sur WhatsApp, puis la voiture est livrée à l'hôtel, à l'adresse choisie ou à l'aéroport Mohammed V. Location de 5 jours minimum.",
    breadcrumb: "Audi",
    vehicles: { marques: ["Audi"], sort: "asc" },
    sections: [
      {
        h2: "A3 ou Q3 : une berline compacte ou un SUV",
        blocks: [
          {
            type: "p",
            text: "L'[Audi A3](/catalogue/audi-a3) est une compacte premium à l'essence, en boîte automatique. C'est la plus petite et la moins chère des deux, très à l'aise en ville. L'[Audi Q3](/catalogue/audi-q3) est un SUV compact en diesel, avec une assise plus haute et plus de volume de coffre. Il existe en boîte automatique et en boîte manuelle selon l'exemplaire.",
          },
          {
            type: "p",
            text: "L'A3 est proposée en très peu d'exemplaires, le Q3 en plusieurs. Si vos dates sont fixes, utilisez la recherche par dates du catalogue pour voir ce qui est libre.",
          },
        ],
      },
      {
        h2: "Choisir entre l'A3 et le Q3 selon votre usage",
        blocks: [
          {
            type: "list",
            items: [
              "**Arrivée à l'aéroport Mohammed V** : pour une ou deux personnes avec peu de bagages, l'A3 suffit. Pour des valises plus nombreuses, prenez le Q3. La voiture est livrée à l'aéroport, voir la page [location à l'aéroport](route:aeroport).",
              "**Séjour à Casablanca** : l'A3 se faufile dans le centre et se gare plus facilement. Le Q3 est plus confortable sur les boulevards et pour sortir de la ville.",
              "**Casablanca-Marrakech** : le Q3 en diesel est le plus adapté à un long trajet d'autoroute. L'A3, à l'essence, se prête mieux à un aller-retour à deux.",
              "**Un rendez-vous professionnel** : l'A3 donne l'image d'une berline sobre et soignée, sans le ton plus ostentatoire d'une grosse cylindrée.",
            ],
          },
        ],
      },
      {
        h2: "Les Audi disponibles à la location",
        blocks: [{ type: "vehicles" }],
      },
      {
        h2: "Tarifs de la location Audi à Casablanca",
        blocks: [
          {
            type: "p",
            text: "L'A3 est à {price:audi-a3} DH par jour, le Q3 à {price:audi-q3} DH. Le choix se joue d'abord sur le format de la voiture. Au-delà de 10 jours, le tarif baisse automatiquement sur certains modèles : le tableau donne le montant de chacun. L'assurance tous risques avec franchise est comprise, et la caution est donnée dans le tableau.",
          },
          { type: "pricing" },
        ],
      },
      {
        h2: "Audi ou autre marque allemande",
        blocks: [
          {
            type: "p",
            text: "Face à l'A3, la [Volkswagen Golf 8](/catalogue/volkswagen-golf-8) partage une partie de sa technique pour un prix proche. La [Mercedes CLA](/catalogue/mercedes-cla) vise plus haut en image. Face au Q3, le [Volkswagen T-Roc](/catalogue/volkswagen-t-roc) est moins cher et le [Porsche Macan](/catalogue/porsche-macan) bien plus sportif. Pour un tour d'horizon complet, voyez la page [location de voiture de luxe](route:luxe).",
          },
        ],
      },
    ],
    faq: [
      {
        q: "Quelle est la différence entre l'Audi A3 et l'Audi Q3 ?",
        a: "L'A3 est une berline compacte à l'essence, boîte automatique. Le Q3 est un SUV compact en diesel, plus haut et avec un coffre plus grand. Le Q3 existe en boîte automatique ou manuelle.",
      },
      {
        q: "Peut-on choisir la boîte manuelle sur une Audi ?",
        a: "Seul le Q3 existe dans les deux boîtes. L'A3 est uniquement en boîte automatique. Précisez la boîte souhaitée dans votre demande.",
      },
      {
        q: "L'Audi peut-elle être livrée à l'aéroport ?",
        a: "Oui, Yourent livre à l'aéroport Mohammed V et dans tout Casablanca sans frais, de 8h à 22h. Indiquez votre heure d'arrivée dans la demande.",
      },
      {
        q: "Quelle caution pour louer une Audi ?",
        a: "Elle dépend du modèle et se règle au départ par chèque, en espèces ou par empreinte de carte. Elle vous est rendue au retour du véhicule en bon état.",
      },
    ],
    related: ["luxe", "suv", "volkswagen", "automatique", "tarifs"],
  },
};

export default page;
