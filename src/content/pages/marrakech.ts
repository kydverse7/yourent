import type { LocalizedPage } from '../types';

const page: LocalizedPage = {
  fr: {
    metaTitle: 'Location voiture Casablanca Marrakech dès {minPrice} DH | Yourent',
    metaDescription:
      "Location voiture Casablanca Marrakech : départ de Casablanca ou de l'aéroport Mohammed V, livraison gratuite, dès {minPrice} DH/jour, 5 jours minimum.",
    eyebrow: 'Route de Marrakech',
    h1: "Location de voiture de Casablanca à Marrakech : départ en ville ou à l'aéroport",
    intro:
      "Pour aller de Casablanca à Marrakech en voiture de location, Yourent vous remet le véhicule en ville ou à l'aéroport Mohammed V, dès {minPrice} DH par jour et pour 5 jours minimum. La livraison y est gratuite ; vous envoyez la demande en ligne, puis l'équipe confirme sur WhatsApp ou par téléphone. Yourent n'a pas d'agence à Marrakech : vous prenez la voiture à Casablanca et vous rejoignez le sud par l'autoroute A3.",
    breadcrumb: 'Casablanca - Marrakech',
    vehicles: { sort: 'asc' },
    sections: [
      {
        h2: "Pas d'agence à Marrakech : ce que cela change pour vous",
        blocks: [
          {
            type: 'p',
            text: "Autant le dire tout de suite : notre seule adresse se trouve à Casablanca, au N°25 Rue Ibnou Mounir. Si vous cherchez un comptoir sur place à Marrakech, cette page ne vous en proposera aucun. En revanche, si vous voulez **louer une voiture à Casablanca pour aller à Marrakech**, le principe est simple. Vous récupérez le véhicule au départ, puis vous faites la route vous-même.",
          },
          {
            type: 'list',
            items: [
              "**Le départ.** La livraison ne coûte rien à l'aéroport Mohammed V, à votre hôtel casablancais ou à l'adresse de votre choix en ville.",
              "**Une remise à Marrakech.** Le site ne décrit pas cette option. Posez la question sur WhatsApp avant de réserver : l'équipe vous dira ce qui est possible.",
              "**Un retour à Marrakech.** Là aussi, seule l'équipe peut répondre. Tant que vous n'avez pas sa réponse, prévoyez plutôt un aller-retour qui se termine à Casablanca.",
              "**La durée.** Le minimum de 5 jours convient à un vrai séjour dans le sud, mais il exclut l'aller-retour dans la journée.",
            ],
          },
        ],
      },
      {
        h2: "Casablanca Marrakech en voiture : l'itinéraire par l'A3",
        blocks: [
          {
            type: 'p',
            text: "Le trajet **Casablanca Marrakech en voiture** suit l'A3, l'autoroute du Sud, à 2 fois 2 voies d'après Autoroutes du Maroc (ADM). Après Bouskoura et l'échangeur de l'aéroport, elle dessert Berrechid, Settat, Skhour Rhamna et Benguerir, puis atteint la bifurcation de Marrakech.",
          },
          {
            type: 'p',
            text: "Comptez un peu plus de 200 km d'autoroute. ADM situe en effet cette bifurcation au kilomètre 198,8, alors que les longueurs publiées pour l'axe vont de 210 km (Wikipédia) à 219 km (ADM). Si vous partez de l'aéroport Mohammed V, vous êtes déjà sur l'A3 : son échangeur se trouve au kilomètre 13,1, soit environ 185 km avant la bifurcation.",
          },
          {
            type: 'p',
            text: "Nous ne donnons aucune durée de trajet, car elle varie avec le trafic et vos arrêts ; calculez-la plutôt sur votre GPS le jour du départ. Par ailleurs, ADM signale sur sa page un élargissement en cours entre Casablanca et Berrechid. Regardez donc le [trafic en temps réel d'ADM](https://www.adm.co.ma/fr/le-trafic-en-temps-reel) avant de rouler, et gardez en tête la limite de 120 km/h sur autoroute.",
          },
          {
            type: 'p',
            text: "Vous continuez au-delà de Marrakech ? Notre article [road trip Casablanca, Marrakech, Agadir](/blog/road-trip-casablanca-marrakech-agadir) décrit la suite de l'itinéraire.",
          },
        ],
      },
      {
        h2: 'Le péage entre Casablanca et Marrakech',
        blocks: [
          {
            type: 'p',
            text: "L'A3 est à péage, et le montant dépend à la fois du tronçon et de la classe du véhicule. Aucun tarif n'apparaît ici, parce que la [grille tarifaire d'ADM](https://www.adm.co.ma/fr/grille-tarifaire-sur-le-reseau) n'indique pas de date d'application. Notre guide des [péages Casablanca, Marrakech, Rabat](/blog/peages-casablanca-marrakech-rabat) explique comment la lire.",
          },
          {
            type: 'p',
            text: "Pour choisir votre voiture, retenez surtout la hauteur. Selon ADM, un véhicule à deux essieux reste en classe 1 jusqu'à 1,30 m, mesuré au premier essieu, puis passe en classe 2. Un SUV peut donc payer davantage qu'une citadine. Côté règlement, les voies acceptent le Pass Jawaz, la carte bancaire, la carte réseau et les espèces.",
          },
        ],
      },
      {
        h2: 'Quelle voiture louer à Casablanca pour aller à Marrakech',
        blocks: [
          {
            type: 'p',
            text: "Chaque voiture de la flotte a 5 places ; ce sont donc le coffre, la boîte de vitesses et le budget qui décident.",
          },
          {
            type: 'table',
            head: ['Votre voyage', 'Fiches à regarder', 'Pour ce trajet'],
            rows: [
              [
                'Deux personnes, petit budget',
                '[Fiat 500](/catalogue/fiat-500) ({price:fiat-500} DH/jour), [Opel Corsa](/catalogue/opel-corsa) ({price:opel-corsa} DH/jour)',
                'Essence et boîte manuelle. Le coffre reste petit.',
              ],
              [
                'Couple, boîte automatique',
                '[Toyota Corolla](/catalogue/toyota-corolla) ({price:toyota-corolla} DH/jour), [Volkswagen Golf 8](/catalogue/volkswagen-golf-8) ({price:volkswagen-golf-8} DH/jour)',
                'Corolla hybride automatique. Golf 8 en diesel ou essence, automatique ou manuelle selon l\'unité.',
              ],
              [
                'Famille avec valises',
                '[Dacia Duster](/catalogue/dacia-duster) ({price:dacia-duster} DH/jour), [Volkswagen Tiguan](/catalogue/volkswagen-tiguan) ({price:volkswagen-tiguan} DH/jour)',
                'SUV diesel : Duster manuel, Tiguan automatique.',
              ],
              [
                'Grand confort',
                '[Kia Sorento](/catalogue/kia-sorento) ({price:kia-sorento} DH/jour), [Volkswagen Touareg](/catalogue/volkswagen-touareg) ({price:volkswagen-touareg} DH/jour)',
                'SUV diesel à boîte automatique.',
              ],
              [
                'Voyage haut de gamme',
                '[Mercedes CLA](/catalogue/mercedes-cla) ({price:mercedes-cla} DH/jour), [Range Rover Evoque](/catalogue/range-rover-evoque) ({price:range-rover-evoque} DH/jour)',
                'Automatiques : essence pour la CLA, diesel pour l\'Evoque.',
              ],
            ],
          },
          {
            type: 'p',
            text: "Une citadine suffit à deux voyageurs légers, surtout si le budget compte. À trois ou quatre avec des valises, la page [location de SUV à Casablanca](route:suv) sera en revanche plus utile. Si vous préférez ne pas passer les vitesses sur une longue étape, voyez aussi notre sélection de [location de voiture automatique à Casablanca](route:automatique).",
          },
        ],
      },
      {
        h2: 'Réserver avant de prendre la route du sud',
        blocks: [
          {
            type: 'list',
            ordered: true,
            items: [
              "Cherchez vos dates dans le [catalogue](/catalogue), qui écarte les voitures indisponibles sur la période.",
              "Écrivez dans la demande que vous allez à Marrakech, puis indiquez où vous prenez le véhicule : [location à l'aéroport Mohammed V](route:aeroport), hôtel ou adresse à Casablanca.",
              "Profitez ensuite de la confirmation sur WhatsApp ou par téléphone pour poser vos questions sur le retour et le kilométrage inclus, que le site ne publie pas.",
              "Préparez une pièce d'identité valide, un permis de plus de 2 ans et un justificatif de domicile ; il faut aussi avoir au moins 21 ans. Les [conditions de location](route:conditions) détaillent le reste, dont la caution.",
            ],
          },
          {
            type: 'p',
            text: "Avant de quitter Casablanca, enregistrez le +212 6 61 23 62 31 dans votre téléphone. En cas de panne, un véhicule de remplacement est envoyé dans les plus brefs délais ; demandez cependant à l'équipe comment cela s'organise si loin de l'agence. Pour un circuit plus large, la page [location de voiture au Maroc](route:maroc) donne d'autres repères.",
          },
        ],
      },
      {
        h2: 'Combien coûte la voiture pour ce trajet',
        blocks: [
          { type: 'pricing' },
          {
            type: 'p',
            text: "La grille donne le tarif par jour de chaque modèle, puis celui qui s'applique au-delà de 10 jours sur la plupart des modèles. Ajoutez le carburant et le péage à votre budget : ils ne figurent pas dans ces chiffres. Les [tarifs de location](route:tarifs) reprennent l'ensemble de la flotte.",
          },
        ],
      },
      {
        h2: 'Location de voiture Casablanca Marrakech : les modèles à réserver',
        blocks: [{ type: 'vehicles' }],
      },
    ],
    faq: [
      {
        q: 'Yourent a-t-elle une agence à Marrakech ?',
        a: "Non. L'agence est à Casablanca : la location commence en ville ou à l'aéroport Mohammed V, et vous faites la route vers Marrakech vous-même.",
      },
      {
        q: 'Peut-on se faire livrer la voiture à Marrakech, ou l\'y rendre ?',
        a: "Ces deux cas ne sont pas décrits sur le site. Indiquez-les dans votre demande : l'équipe vous répond sur WhatsApp avant toute confirmation.",
      },
      {
        q: 'Quelle autoroute prendre, et sur quelle distance ?',
        a: "L'A3, depuis Casablanca ou depuis l'aéroport. Comptez un peu plus de 200 km d'autoroute, puisque les longueurs publiées vont de 210 à 219 km selon les sources.",
      },
      {
        q: 'Combien coûte le péage Casablanca Marrakech ?',
        a: "Cette page ne donne pas de montant, car il varie selon le tronçon et la classe du véhicule. Consultez donc la grille d'ADM avant le départ.",
      },
      {
        q: 'Peut-on louer pour un simple aller-retour dans la journée ?',
        a: "Non, car la location dure 5 jours au minimum. Le tarif démarre à {minPrice} DH par jour, et il baisse après 10 jours sur la plupart des modèles.",
      },
    ],
    related: ['aeroport', 'maroc', 'suv', 'automatique', 'tarifs'],
  },
};

export default page;
