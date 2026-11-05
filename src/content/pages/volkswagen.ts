import type { LocalizedPage } from '../types';

const page: LocalizedPage = {
  fr: {
    metaTitle: "Location Volkswagen Casablanca : Touareg, Golf 8 | Yourent",
    metaDescription:
      "Louez une Volkswagen à Casablanca dès {minPrice} DH/jour : T-Roc, Golf 8, Tiguan ou Touareg. Livraison à l'hôtel et à l'aéroport, confirmation sur WhatsApp.",
    eyebrow: "Volkswagen",
    h1: "Location Volkswagen à Casablanca : Touareg, Golf 8, Tiguan, T-Roc",
    intro:
      "Yourent loue quatre Volkswagen à Casablanca, du T-Roc à {price:volkswagen-t-roc} DH par jour jusqu'au Touareg à {price:volkswagen-touareg} DH. Vous choisissez le modèle dans le catalogue, vous envoyez vos dates et l'équipe confirme sur WhatsApp ou par téléphone. La voiture est livrée à l'hôtel, à votre adresse ou à l'aéroport Mohammed V. Location de 5 jours minimum.",
    breadcrumb: "Volkswagen",
    vehicles: { marques: ["Volkswagen"], sort: "asc" },
    sections: [
      {
        h2: "Quatre Volkswagen pour quatre façons de voyager",
        blocks: [
          {
            type: "p",
            text: "Volkswagen est la marque la plus représentée dans la flotte de Yourent. La [Golf 8](/catalogue/volkswagen-golf-8) est la compacte polyvalente, disponible en diesel ou en essence, avec boîte automatique ou manuelle selon l'exemplaire. Le [T-Roc](/catalogue/volkswagen-t-roc) est le SUV compact, plus haut qu'une berline sans prendre beaucoup de place. Le [Tiguan](/catalogue/volkswagen-tiguan) monte d'un cran en espace. Le [Touareg](/catalogue/volkswagen-touareg) est le grand SUV de la marque.",
          },
        ],
      },
      {
        h2: "Comparer les Volkswagen selon votre trajet",
        blocks: [
          {
            type: "table",
            head: ["Modèle", "Carrosserie", "Pour qui"],
            rows: [
              ["[Golf 8](/catalogue/volkswagen-golf-8)", "Compacte", "Un séjour en ville, un ou deux voyageurs, une voiture facile à garer"],
              ["[T-Roc](/catalogue/volkswagen-t-roc)", "SUV compact", "Un couple qui veut une position haute sans gabarit encombrant"],
              ["[Tiguan](/catalogue/volkswagen-tiguan)", "SUV familial", "Une famille et ses valises, un trajet vers Marrakech"],
              ["[Touareg](/catalogue/volkswagen-touareg)", "Grand SUV", "Un groupe, beaucoup de bagages, un long trajet confortable"],
            ],
          },
          {
            type: "p",
            text: "À l'arrivée à l'aéroport Mohammed V, un T-Roc ou une Golf suffit pour deux personnes avec deux valises. Pour quatre personnes et leurs bagages, partez sur le Tiguan ou le Touareg. En séjour à Casablanca, la Golf reste la plus simple à garer. Sur l'autoroute vers Marrakech, l'écart se sent surtout à l'arrière : le Touareg est plus posé que le T-Roc.",
          },
        ],
      },
      {
        h2: "Les Volkswagen disponibles à la location",
        blocks: [{ type: "vehicles" }],
      },
      {
        h2: "Tarifs de la location Volkswagen à Casablanca",
        blocks: [
          {
            type: "p",
            text: "Les tarifs vont de {minPrice} à {maxPrice} DH par jour : {price:volkswagen-t-roc} DH pour le T-Roc, {price:volkswagen-golf-8} DH pour la Golf 8, {price:volkswagen-tiguan} DH pour le Tiguan, {price:volkswagen-touareg} DH pour le Touareg. Au-delà de 10 jours, un tarif réduit s'applique automatiquement. Une assurance tous risques avec franchise couvre chaque voiture.",
          },
          { type: "pricing" },
        ],
      },
      {
        h2: "Volkswagen ou une autre marque ?",
        blocks: [
          {
            type: "p",
            text: "Si vous visez le même format avec une image plus statutaire, regardez l'[Audi Q3](/catalogue/audi-q3) ou la [location de SUV](route:suv). Pour un budget plus serré, la [Dacia Duster](/catalogue/dacia-duster) reste la solution la plus économique parmi les SUV. Pour une boîte automatique uniquement, la page [location de voiture automatique](route:automatique) trie la flotte à votre place.",
          },
        ],
      },
    ],
    faq: [
      {
        q: "Quelle Volkswagen choisir pour un trajet Casablanca-Marrakech ?",
        a: "Le [Tiguan](/catalogue/volkswagen-tiguan) et le [Touareg](/catalogue/volkswagen-touareg) sont les plus confortables pour ce trajet, avec un coffre généreux. Le T-Roc convient très bien à deux ou trois voyageurs.",
      },
      {
        q: "La Golf 8 est-elle en boîte automatique ?",
        a: "Les deux boîtes existent, ainsi que le diesel et l'essence, selon l'exemplaire. Indiquez votre préférence dans la demande : l'équipe vous propose la voiture qui correspond parmi celles libres à vos dates.",
      },
      {
        q: "Les Volkswagen SUV sont-ils en diesel ?",
        a: "Le Tiguan et le Touareg sont des diesels en boîte automatique. Le T-Roc est une essence, également en boîte automatique.",
      },
      {
        q: "Peut-on faire livrer la Volkswagen à l'aéroport ?",
        a: "Oui, la livraison à l'aéroport Mohammed V et dans tout Casablanca est gratuite, de 8h à 22h, 7 jours sur 7.",
      },
      {
        q: "Quelle durée minimum de location sur une Volkswagen ?",
        a: "La location est de 5 jours minimum, sur tous les modèles. Un tarif plus bas s'applique automatiquement au-delà de 10 jours.",
      },
    ],
    related: ["suv", "automatique", "longue-duree", "aeroport", "tarifs"],
  },
};

export default page;
