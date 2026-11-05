import type { LocalizedPage } from '../types';

const page: LocalizedPage = {
  fr: {
    metaTitle: 'Location voiture Maroc au départ de Casablanca | Yourent',
    metaDescription:
      "Location voiture Maroc au départ de Casablanca : livraison gratuite en ville et à l'aéroport Mohammed V, dès {minPrice} DH/jour, 5 jours de location minimum.",
    eyebrow: 'Voyage au Maroc',
    h1: 'Location de voiture au Maroc, au départ de Casablanca',
    intro:
      "Pour une location de voiture au Maroc, Yourent vous remet le véhicule à Casablanca ou à l'aéroport Mohammed V, avec livraison gratuite, dès {minPrice} DH par jour et pour 5 jours minimum. Vous envoyez votre demande en ligne, l'équipe confirme sur WhatsApp ou par téléphone, et votre voyage commence à Casablanca. Yourent est une agence casablancaise : elle n'a pas d'agence dans d'autres villes du pays.",
    breadcrumb: 'Location au Maroc',
    vehicles: { sort: 'asc' },
    sections: [
      {
        h2: 'Location voiture Maroc : ce que propose une agence de Casablanca',
        blocks: [
          {
            type: 'p',
            text: "Si vous cherchez à **louer une voiture au Maroc**, regardez d'abord où vous la récupérez. Chez Yourent, c'est à Casablanca. L'agence, installée au N°25 Rue Ibnou Mounir, gère {vehicleCount} véhicules répartis sur {modelCount} modèles. Elle ne fait pas partie d'un réseau national et n'a pas de bureau à Marrakech, à Rabat ou à Agadir.",
          },
          {
            type: 'p',
            text: "La voiture vous est livrée sans frais à l'aéroport Mohammed V, à votre hôtel ou à l'adresse de votre choix dans Casablanca, 7j/7. Vous partez ensuite vers Rabat, vers le sud ou pour un long séjour en famille. Pour une remise ailleurs, l'équipe indique sur WhatsApp ce qui est possible.",
          },
        ],
      },
      {
        h2: 'Pourquoi partir de Casablanca pour un voyage au Maroc',
        blocks: [
          {
            type: 'p',
            text: "La première raison est l'aéroport international Mohammed V, à Nouaceur. Si vous venez en avion, vous prenez le volant dès l'arrivée, sans passer par le centre-ville. La page [location de voiture à l'aéroport](route:aeroport) explique comment se passe la remise sur place.",
          },
          {
            type: 'p',
            text: "La seconde est l'autoroute. De Casablanca, elle mène à Rabat vers le nord et à Marrakech vers le sud, et l'aéroport se trouve déjà sur l'axe de Marrakech. Pour prolonger jusqu'à Agadir, notre article [road trip Casablanca, Marrakech, Agadir](/blog/road-trip-casablanca-marrakech-agadir) décrit l'itinéraire.",
          },
          {
            type: 'p',
            text: "Après un vol tardif, rien n'oblige à rouler le soir même : passez la nuit à Casablanca et faites-vous livrer la voiture à l'hôtel. L'agence est ouverte de 8 h à 22 h, 7j/7.",
          },
        ],
      },
      {
        h2: 'Quel modèle choisir selon votre voyage',
        blocks: [
          {
            type: 'p',
            text: "Toutes les voitures ont 5 places : regardez plutôt vos bagages, la boîte de vitesses et le nombre de jours.",
          },
          {
            type: 'table',
            head: ['Votre voyage', 'Modèles à regarder', 'À savoir'],
            rows: [
              [
                'À deux, bagages légers',
                '[Fiat 500](/catalogue/fiat-500) ({price:fiat-500} DH/jour), [Opel Corsa](/catalogue/opel-corsa) ({price:opel-corsa} DH/jour)',
                'Citadines essence, boîte manuelle, petit coffre.',
              ],
              [
                'En famille, avec des valises',
                '[Dacia Duster](/catalogue/dacia-duster) ({price:dacia-duster} DH/jour), [Kia Sorento](/catalogue/kia-sorento) ({price:kia-sorento} DH/jour)',
                'SUV diesel : manuel pour le Duster, automatique pour le Sorento.',
              ],              [
                'Plusieurs semaines',
                '[Dacia Duster](/catalogue/dacia-duster), [Volkswagen Golf 8](/catalogue/volkswagen-golf-8) ({price:volkswagen-golf-8} DH/jour)',
                'Tous deux ont un tarif réduit au-delà de 10 jours.',
              ],
            ],
          },
          {
            type: 'p',
            text: "**La citadine** suffit à un couple qui voyage léger et surveille son budget. **Le SUV** devient utile dès que vous êtes trois ou quatre avec des valises : la page [location de SUV](route:suv) présente la gamme, du Duster au Volkswagen Touareg ({price:volkswagen-touareg} DH/jour).",
          },
          {
            type: 'p',
            text: "**La longue durée** vise les circuits de plusieurs semaines et les séjours d'été. Au-delà de 10 jours, le tarif par jour baisse automatiquement sur la plupart des modèles. Pour un séjour qui se compte en mois, voyez la page [location longue durée](route:longue-duree).",
          },
        ],
      },
      {
        h2: 'Louer une voiture au Maroc : ce qu\'il faut régler avant de partir',
        blocks: [
          {
            type: 'list',
            items: [
              "**Le retour.** Si votre voyage se termine ailleurs qu'à Casablanca, demandez-le avant de réserver : l'équipe précise sur WhatsApp ce qu'elle peut faire. En attendant sa réponse, préparez votre itinéraire en boucle.",
              "**Le kilométrage.** Le kilométrage inclus n'est pas publié : l'équipe vous l'indique sur WhatsApp.",
              "**Les papiers.** Il faut une pièce d'identité valide (CIN ou passeport), un permis de plus de 2 ans et un justificatif de domicile. Si vous conduisez avec un permis délivré hors du Maroc, lisez notre article [louer au Maroc avec un permis étranger](/blog/louer-voiture-maroc-permis-etranger).",
              "**La caution.** Elle se laisse au départ, par chèque, en espèces ou par empreinte de carte, et son montant varie selon la voiture. Elle est restituée au retour du véhicule en bon état. Le reste figure dans les [conditions de location](route:conditions).",
              "**L'assurance.** Chaque voiture est couverte par une assurance tous risques avec franchise. Demandez le montant de la franchise pour le modèle retenu.",
              "**La panne.** Un véhicule de remplacement est envoyé dans les plus brefs délais. Si vous vous éloignez de Casablanca, demandez à l'équipe comment cela s'organise.",
            ],
          },
        ],
      },
      {
        h2: "Réserver avant d'arriver au Maroc",
        blocks: [
          {
            type: 'list',
            ordered: true,
            items: [
              "Entrez vos dates dans le [catalogue](/catalogue) : les voitures déjà prises disparaissent de la liste.",
              "Envoyez la demande en précisant le lieu de remise (aéroport, hôtel, adresse à Casablanca) et, si vous l'avez, votre itinéraire.",
              "L'équipe revient vers vous sur WhatsApp ou par téléphone avec le montant et la caution. Rien ne se paie en ligne : le règlement se fait avec elle.",
            ],
          },
          {
            type: 'p',
            text: "Modifier ou annuler ne coûte rien jusqu'à 24 h avant la prise en charge. Passé ce délai, des frais peuvent s'appliquer.",
          },
        ],
      },
      {
        h2: 'Ce que coûte la voiture pour un voyage au Maroc',
        blocks: [
          { type: 'pricing' },
          {
            type: 'p',
            text: "Le tableau donne le tarif par jour de chaque modèle, puis celui qui s'applique au-delà de 10 jours. Ajoutez à votre budget le carburant et les péages d'autoroute. La page [tarifs](route:tarifs) détaille la grille complète.",
          },
        ],
      },
      {
        h2: 'Les voitures à récupérer à Casablanca',
        blocks: [{ type: 'vehicles' }],
      },
    ],
    faq: [
      {
        q: "Yourent a-t-elle des agences dans d'autres villes du Maroc ?",
        a: "Non. Yourent est une agence de Casablanca. La voiture se récupère à Casablanca ou à l'aéroport Mohammed V.",
      },
      {
        q: 'Peut-on rendre la voiture à Marrakech, à Agadir ou dans une autre ville ?',
        a: "Cette option n'est pas décrite sur le site. Indiquez votre ville d'arrivée dans votre demande : l'équipe vous répond sur WhatsApp avant de confirmer la location.",
      },
      {
        q: 'Où récupère-t-on la voiture, et la livraison est-elle payante ?',
        a: "À l'aéroport Mohammed V, à votre hôtel ou à une autre adresse dans Casablanca. Dans ces trois cas, la livraison est gratuite et seule la location est facturée.",
      },
      {
        q: 'Combien coûte une location de voiture au Maroc chez Yourent ?',
        a: "À partir de {minPrice} DH par jour, avec 5 jours de location minimum. Le tarif par jour baisse au-delà de 10 jours sur la plupart des modèles.",
      },
      {
        q: 'Un touriste étranger peut-il louer avec son permis ?',
        a: "Oui, si ce permis a plus de 2 ans. Le permis international est accepté pour les touristes étrangers. Prévoyez aussi un passeport et un justificatif de domicile.",
      },
    ],
    related: ['aeroport', 'longue-duree', 'suv', 'tarifs', 'conditions'],
  },
};

export default page;
