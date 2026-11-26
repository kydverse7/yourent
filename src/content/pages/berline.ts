import type { LocalizedPage } from '../types';

const page: LocalizedPage = {
  fr: {
    metaTitle: 'Location berline Casablanca dès {minPrice} DH/jour | Yourent',
    metaDescription:
      "Location de berline à Casablanca : Toyota Corolla hybride, Audi A3, Golf 8, Mercedes CLA, Classe C et Classe E, de {minPrice} à {maxPrice} DH/jour. Livraison gratuite.",
    eyebrow: 'Berlines',
    h1: 'Location de berline à Casablanca : Mercedes, Audi A3, Toyota Corolla',
    intro:
      "Yourent propose six berlines et compactes à louer à Casablanca, de la Toyota Corolla hybride à la Mercedes Classe E 220, de {minPrice} DH à {maxPrice} DH par jour. La livraison est gratuite dans tout Casablanca et à l'aéroport Mohammed V. Vous envoyez votre demande en ligne avec vos dates, puis l'équipe confirme sur WhatsApp ou par téléphone. La location dure 5 jours minimum.",
    breadcrumb: 'Location berline',
    vehicles: {
      models: ['toyota-corolla', 'audi-a3', 'volkswagen-golf-8', 'mercedes-cla', 'mercedes-c-220', 'mercedes-e-220'],
      sort: 'asc',
    },
    sections: [
      {
        h2: 'Six berlines à louer à Casablanca, de la Corolla à la Classe E',
        blocks: [
          {
            type: 'p',
            text: "Pour une **location de berline à Casablanca**, la flotte va de la compacte du quotidien à la grande routière. Toutes ont 5 places. Le tableau donne le tarif par jour de 5 à 10 jours.",
          },
          {
            type: 'table',
            head: ['Modèle', 'Profil', 'Carburant et boîte', 'Tarif par jour'],
            rows: [
              ['[Toyota Corolla](/catalogue/toyota-corolla)', 'Berline', 'Hybride, automatique', '{price:toyota-corolla} DH'],
              ['[Audi A3](/catalogue/audi-a3)', 'Compacte premium', 'Essence, automatique', '{price:audi-a3} DH'],
              [
                '[Volkswagen Golf 8](/catalogue/volkswagen-golf-8)',
                'Compacte',
                "Diesel ou essence, automatique ou manuelle selon l'exemplaire",
                '{price:volkswagen-golf-8} DH',
              ],
              ['[Mercedes CLA](/catalogue/mercedes-cla)', 'Coupé 4 portes', 'Essence, automatique', '{price:mercedes-cla} DH'],
              ['[Mercedes Classe C 220](/catalogue/mercedes-c-220)', 'Berline', 'Diesel, automatique', '{price:mercedes-c-220} DH'],
              ['[Mercedes Classe E 220](/catalogue/mercedes-e-220)', 'Grande berline', 'Diesel, automatique', '{price:mercedes-e-220} DH'],
            ],
          },
          {
            type: 'p',
            text: "Pour la Golf 8, précisez la boîte et le carburant souhaités dans votre demande : l'équipe vous indique l'exemplaire libre à vos dates.",
          },
        ],
      },
      {
        h2: 'Quelle berline choisir selon votre trajet',
        blocks: [
          {
            type: 'list',
            items: [
              "**En ville, tous les jours** : la [Toyota Corolla](/catalogue/toyota-corolla), hybride et automatique, se conduit sans y penser dans la circulation de Casablanca.",
              "**Rendez-vous et autoroute** : la [Volkswagen Golf 8](/catalogue/volkswagen-golf-8) ou l'[Audi A3](/catalogue/audi-a3), compactes et à l'aise sur les deux terrains.",
              "**Déplacement professionnel** : la [Mercedes Classe C 220](/catalogue/mercedes-c-220), sobre, au format encore raisonnable en ville.",
              "**Longs trajets à plusieurs** : la [Mercedes Classe E 220](/catalogue/mercedes-e-220), la plus grande, pour la route de Rabat ou de Marrakech.",
              "**Séjour à deux, avec du style** : la [Mercedes CLA](/catalogue/mercedes-cla), dont la ligne de coupé laisse moins de place à l'arrière.",
            ],
          },
        ],
      },
      {
        h2: 'Berline de luxe à Casablanca : les trois Mercedes',
        blocks: [
          {
            type: 'p',
            text: "Si vous cherchez une **berline de luxe**, la sélection se resserre sur les trois Mercedes. La CLA est à {price:mercedes-cla} DH par jour, la Classe C 220 à {price:mercedes-c-220} DH et la Classe E 220 à {price:mercedes-e-220} DH. Toutes trois ont une boîte automatique.",
          },
          {
            type: 'p',
            text: "La page [location de Mercedes à Casablanca](route:mercedes) les compare en détail. Pour l'ensemble des modèles de prestige, SUV compris, voyez la [location de voiture de luxe à Casablanca](route:luxe).",
          },
        ],
      },
      {
        h2: 'Berline ou SUV : que choisir à Casablanca',
        blocks: [
          {
            type: 'p',
            text: "Une berline est plus basse et plus discrète qu'un SUV. Elle convient à ceux qui roulent surtout sur route et en ville, et qui n'ont pas besoin d'une position de conduite haute. À l'inverse, pour une famille avec beaucoup de bagages, un SUV sera plus simple à charger.",
          },
          {
            type: 'p',
            text: "Pour comparer, la page [location de SUV à Casablanca](route:suv) réunit toute la gamme, et la page [location de SUV de luxe à Casablanca](route:suv-luxe) les modèles haut de gamme. Si la boîte automatique est votre premier critère, partez plutôt de la [location de voiture automatique à Casablanca](route:automatique).",
          },
        ],
      },
      {
        h2: "Prix de la location d'une berline à Casablanca",
        blocks: [
          { type: 'pricing' },
          {
            type: 'p',
            text: "Le tableau indique le tarif de 5 à 10 jours, celui qui s'applique au-delà de 10 jours et la caution quand elle est renseignée. La livraison à Casablanca et à l'aéroport ne s'ajoute pas au tarif, et l'assurance tous risques avec franchise est incluse. La grille de toute la flotte figure sur la page [prix de location de voiture à Casablanca](route:tarifs).",
          },
        ],
      },
      {
        h2: 'Livraison, durée et conditions',
        blocks: [
          {
            type: 'p',
            text: "La berline vous est livrée à l'hôtel, à domicile ou à l'aéroport Mohammed V, sans frais, tous les jours de 8 h à 22 h. La livraison est gratuite aussi à Marrakech et à l'aéroport Marrakech-Ménara ; à Mohammedia, elle est possible avec un léger supplément.",
          },
          {
            type: 'p',
            text: "Il faut avoir au moins 21 ans et un permis de plus de 2 ans, avec une pièce d'identité valide et un justificatif de domicile. Une caution est demandée au départ, par chèque, en espèces ou par empreinte de carte. Le reste figure dans les [conditions de location de voiture](route:conditions).",
          },
        ],
      },
      {
        h2: 'Les berlines disponibles',
        blocks: [{ type: 'vehicles' }],
      },
    ],
    faq: [
      {
        q: "À partir de quel prix peut-on louer une berline à Casablanca ?",
        a: "Chez Yourent, les tarifs de cette sélection partent de {minPrice} DH par jour, avec la Toyota Corolla à {price:toyota-corolla} DH. La Mercedes Classe E 220 est à {price:mercedes-e-220} DH par jour.",
      },
      {
        q: 'Quelles berlines ont une boîte automatique ?',
        a: "La Toyota Corolla, l'Audi A3 et les trois Mercedes sont automatiques. La Golf 8 existe en boîte automatique ou manuelle selon l'exemplaire : précisez votre choix dans la demande.",
      },
      {
        q: 'Y a-t-il une berline hybride à louer ?',
        a: "Oui, la [Toyota Corolla](/catalogue/toyota-corolla), hybride avec boîte automatique.",
      },
      {
        q: "Quelle berline choisir pour un voyage d'affaires à Casablanca ?",
        a: "La [Mercedes Classe C 220](/catalogue/mercedes-c-220) pour une allure sobre, ou la [Classe E 220](/catalogue/mercedes-e-220) si vous transportez des passagers à l'arrière. Les deux peuvent vous attendre à l'aéroport Mohammed V.",
      },
      {
        q: 'Peut-on louer une berline pour un week-end ?',
        a: "Non. La location dure 5 jours minimum, et le tarif par jour baisse au-delà de 10 jours sur la plupart des modèles.",
      },
    ],
    related: ['mercedes', 'audi', 'luxe', 'automatique', 'suv', 'tarifs'],
  },
};

export default page;
