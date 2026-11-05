import type { LocalizedPage } from '../types';

const page: LocalizedPage = {
  fr: {
    metaTitle: "Location Mercedes Casablanca : Classe C, E, CLA | Yourent",
    metaDescription:
      "Louez une Mercedes CLA, Classe C ou Classe E à Casablanca dès {minPrice} DH/jour. Livraison à l'hôtel ou à l'aéroport, demande en ligne, réponse sur WhatsApp.",
    eyebrow: "Mercedes",
    h1: "Location Mercedes à Casablanca : Classe C, Classe E et CLA",
    intro:
      "Yourent loue trois Mercedes à Casablanca : la CLA à partir de {minPrice} DH par jour, la Classe C 220 à {price:mercedes-c-220} DH et la Classe E 220 à {price:mercedes-e-220} DH. Vous envoyez une demande avec vos dates, l'équipe confirme sur WhatsApp ou par téléphone, puis la voiture est livrée à votre hôtel, à votre adresse ou à l'aéroport Mohammed V. La location démarre à 5 jours.",
    breadcrumb: "Mercedes",
    vehicles: { marques: ["Mercedes"], sort: "asc" },
    sections: [
      {
        h2: "Louer une Mercedes à Casablanca : trois modèles, trois usages",
        blocks: [
          {
            type: "p",
            text: "La [Mercedes CLA](/catalogue/mercedes-cla) est la porte d'entrée de la marque chez Yourent : un coupé compact à quatre portes, en essence et boîte automatique, proposé en plusieurs exemplaires. La [Classe C 220](/catalogue/mercedes-c-220) est la berline classique de la marque, en diesel. La [Classe E 220](/catalogue/mercedes-e-220) est la plus grande des trois, celle qu'on réserve quand le confort de route passe avant tout.",
          },
          {
            type: "p",
            text: "Les Classe C et Classe E sont en nombre limité. Si vos dates sont arrêtées, lancez la recherche par dates dans le catalogue : elle n'affiche que les Mercedes libres sur vos jours.",
          },
        ],
      },
      {
        h2: "Quelle Mercedes choisir selon votre trajet",
        blocks: [
          {
            type: "list",
            items: [
              "**Arrivée à l'aéroport Mohammed V** : la CLA suffit pour un voyageur seul ou un couple avec deux valises. Yourent livre la voiture à l'aéroport, voir la page [location de voiture à l'aéroport](route:aeroport).",
              "**Séjour à Casablanca** : la Classe C se gare plus facilement qu'une Classe E dans les rues du Maarif ou le long de la Corniche, tout en gardant l'allure d'une vraie berline pour les rendez-vous.",
              "**Casablanca-Marrakech** : sur l'autoroute, la Classe E en diesel est la plus reposante pour un long trajet. La CLA est plus vive et plus sportive à conduire, avec un coffre moins généreux.",
              "**Un événement ou un dîner** : la Classe E a la présence d'une grande berline. La CLA fait plus jeune, la Classe C plus sobre.",
            ],
          },
          {
            type: "p",
            text: "Pour un même budget que la Classe C, un SUV change le rapport à la route : comparez avec la [Range Rover Evoque](/catalogue/range-rover-evoque) ou le [Volkswagen Touareg](/catalogue/volkswagen-touareg).",
          },
        ],
      },
      {
        h2: "Les Mercedes disponibles à la location",
        blocks: [{ type: "vehicles" }],
      },
      {
        h2: "Tarifs de la location Mercedes à Casablanca",
        blocks: [
          {
            type: "p",
            text: "Comptez de {minPrice} à {maxPrice} DH par jour selon le modèle : {price:mercedes-cla} DH pour la CLA, {price:mercedes-c-220} DH pour la Classe C, {price:mercedes-e-220} DH pour la Classe E. Un tarif réduit s'applique automatiquement au-delà de 10 jours. Toutes les voitures sont couvertes par une assurance tous risques avec franchise. La caution dépend du modèle et se règle par chèque, en espèces ou par empreinte de carte.",
          },
          { type: "pricing" },
          {
            type: "p",
            text: "Vous hésitez avec d'autres modèles haut de gamme ? La page [location de voiture de luxe](route:luxe) les compare tous.",
          },
        ],
      },
    ],
    faq: [
      {
        q: "Quelle Mercedes louer pour un premier séjour à Casablanca ?",
        a: "La [CLA](/catalogue/mercedes-cla) est la plus accessible de la gamme et la plus facile à prendre en main en ville. Pour des trajets plus longs ou des rendez-vous professionnels, la [Classe C 220](/catalogue/mercedes-c-220) offre une berline plus classique.",
      },
      {
        q: "Les Mercedes sont-elles en diesel ou en essence ?",
        a: "La CLA fonctionne à l'essence. La Classe C 220 et la Classe E 220 sont des diesels. Toutes les trois ont une boîte automatique.",
      },
      {
        q: "Puis-je prendre une Mercedes pour aller à Marrakech ?",
        a: "Oui, l'autoroute relie Casablanca à Marrakech et la Classe E y est particulièrement confortable. Le kilométrage inclus n'est pas le même pour tous les contrats : demandez-le à l'équipe sur WhatsApp avant de partir.",
      },
      {
        q: "La Mercedes peut-elle être livrée à l'aéroport ou à l'hôtel ?",
        a: "Oui. Yourent livre gratuitement dans tout Casablanca et à l'aéroport Mohammed V, tous les jours de 8h à 22h. Une livraison à Mohammedia est possible avec un léger supplément.",
      },
      {
        q: "Quels documents faut-il pour louer une Mercedes ?",
        a: "Une pièce d'identité valide (CIN ou passeport), un permis de plus de 2 ans et un justificatif de domicile. Les touristes étrangers peuvent présenter un permis international. Le détail est sur la page [conditions de location](route:conditions).",
      },
    ],
    related: ["luxe", "automatique", "aeroport", "range-rover", "tarifs"],
  },
};

export default page;
