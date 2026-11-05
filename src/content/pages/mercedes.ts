import type { LocalizedPage } from '../types';

const page: LocalizedPage = {
  fr: {
    metaTitle: "Location Mercedes Casablanca : Classe C, E, CLA | Yourent",
    metaDescription:
      "Location Mercedes Casablanca : CLA, Classe C ou Classe E dès {minPrice} DH/jour. Livraison gratuite à l'hôtel ou à l'aéroport, réponse de l'équipe sur WhatsApp.",
    eyebrow: "Mercedes",
    h1: "Location de Mercedes à Casablanca : Classe C, Classe E et CLA",
    intro:
      "Yourent propose la location de Mercedes à Casablanca : la CLA dès {minPrice} DH par jour, la Classe C 220 à {price:mercedes-c-220} DH et la Classe E 220 à {price:mercedes-e-220} DH. Vous envoyez une demande avec vos dates, puis l'équipe confirme sur WhatsApp ou par téléphone. La voiture arrive à votre hôtel, à votre adresse ou à l'aéroport Mohammed V. La location démarre à 5 jours.",
    breadcrumb: "Mercedes",
    vehicles: { marques: ["Mercedes"], sort: "asc" },
    sections: [
      {
        h2: "Location de Mercedes à Casablanca : trois modèles, trois usages",
        blocks: [
          {
            type: "p",
            text: "La [Mercedes CLA](/catalogue/mercedes-cla) est la porte d'entrée de la marque chez Yourent : un coupé compact à quatre portes, en essence et boîte automatique, proposé en plusieurs exemplaires. La [Classe C 220](/catalogue/mercedes-c-220) est la berline classique de la marque, en diesel. La [Classe E 220](/catalogue/mercedes-e-220), elle aussi en diesel, est la plus grande des trois.",
          },
          {
            type: "p",
            text: "La Classe C et la Classe E n'existent chacune qu'en un exemplaire. Si vos dates sont arrêtées, lancez la recherche par dates dans le catalogue : elle n'affiche que les Mercedes libres sur vos jours.",
          },
        ],
      },
      {
        h2: "Quelle Mercedes louer selon votre trajet",
        blocks: [
          {
            type: "list",
            items: [
              "**Arrivée à l'aéroport Mohammed V** : la CLA suffit pour un voyageur seul ou un couple avec deux valises. Yourent livre la voiture sur place, comme le détaille notre page [location de voiture à l'aéroport de Casablanca](route:aeroport).",
              "**Séjour à Casablanca** : la Classe C, plus courte, se gare plus facilement qu'une Classe E dans les rues du Maarif ou le long de la Corniche. Elle garde pourtant l'allure d'une vraie berline.",
              "**Casablanca-Marrakech** : sur l'autoroute, la Classe E laisse le plus de place aux passagers et aux bagages. La CLA, coupé compact, a en revanche le coffre le plus petit des trois.",
              "**Un événement ou un dîner** : la Classe E a la présence d'une grande berline, alors que la CLA fait plus jeune et la Classe C plus sobre.",
            ],
          },
          {
            type: "p",
            text: "Pour un budget voisin, un SUV offre une position de conduite plus haute. Comparez par exemple avec le [Range Rover Evoque](/catalogue/range-rover-evoque) ou le [Volkswagen Touareg](/catalogue/volkswagen-touareg).",
          },
        ],
      },
      {
        h2: "Les Mercedes disponibles à la location",
        blocks: [{ type: "vehicles" }],
      },
      {
        h2: "Prix de la location Mercedes à Casablanca",
        blocks: [
          {
            type: "p",
            text: "Comptez de {minPrice} à {maxPrice} DH par jour : {price:mercedes-cla} DH pour la CLA, {price:mercedes-c-220} DH pour la Classe C, {price:mercedes-e-220} DH pour la Classe E. Au-delà de 10 jours, le tarif baisse automatiquement sur la plupart des modèles de la flotte, et le tableau précise le montant pour chaque Mercedes. Une assurance tous risques avec franchise protège chaque Mercedes. Quant à la caution, elle dépend du modèle et se règle par chèque, en espèces ou par empreinte de carte.",
          },
          { type: "pricing" },
          {
            type: "p",
            text: "Vous hésitez avec d'autres modèles haut de gamme ? Notre [location de voiture de luxe à Casablanca](route:luxe) les compare tous.",
          },
        ],
      },
    ],
    faq: [
      {
        q: "Quelle Mercedes louer pour un premier séjour à Casablanca ?",
        a: "La [CLA](/catalogue/mercedes-cla) est la plus accessible de la gamme et la plus compacte des trois. Pour des rendez-vous professionnels, la [Classe C 220](/catalogue/mercedes-c-220) offre en revanche l'allure d'une berline classique.",
      },
      {
        q: "Les Mercedes sont-elles en diesel ou en essence ?",
        a: "La CLA fonctionne à l'essence, tandis que la Classe C 220 et la Classe E 220 sont des diesels. Toutes les trois ont une boîte automatique.",
      },
      {
        q: "Puis-je prendre une Mercedes pour aller à Marrakech ?",
        a: "Oui, l'autoroute relie Casablanca à Marrakech, et les trois modèles s'y prêtent. L'équipe précise le kilométrage inclus sur WhatsApp : demandez-le avant de partir.",
      },
      {
        q: "La Mercedes peut-elle être livrée à l'aéroport ou à l'hôtel ?",
        a: "Oui. Yourent livre gratuitement dans tout Casablanca et à l'aéroport Mohammed V, tous les jours de 8h à 22h. Une livraison à Mohammedia reste aussi possible, avec un léger supplément.",
      },
      {
        q: "Quels documents faut-il pour louer une Mercedes ?",
        a: "Le conducteur doit avoir 21 ans au moins. Il présente une pièce d'identité valide (CIN ou passeport), un permis de plus de 2 ans et un justificatif de domicile. Les touristes étrangers peuvent aussi présenter un permis international, comme l'expliquent nos [conditions de location de voiture](route:conditions).",
      },
    ],
    related: ["luxe", "automatique", "aeroport", "range-rover", "tarifs"],
  },
};

export default page;
