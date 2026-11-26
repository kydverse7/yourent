import type { LocalizedPage } from '../types';

const page: LocalizedPage = {
  fr: {
    metaTitle: 'Location voiture Marrakech : livraison gratuite | Yourent',
    metaDescription:
      "Location de voiture à Marrakech : livraison gratuite en ville et à l'aéroport Marrakech-Ménara, dès {minPrice} DH/jour, 5 jours minimum.",
    eyebrow: 'Livraison gratuite à Marrakech',
    h1: "Location de voiture à Marrakech : livraison gratuite en ville ou à l'aéroport Ménara",
    intro:
      "Yourent est une agence de Casablanca, sans bureau à Marrakech. Votre voiture de location vous y est pourtant livrée gratuitement, en ville ou à l'aéroport Marrakech-Ménara (RAK), dès {minPrice} DH par jour et pour 5 jours minimum. Vous envoyez votre demande en ligne, puis l'équipe confirme sur WhatsApp la disponibilité, l'heure et le point de rendez-vous.",
    breadcrumb: 'Location à Marrakech',
    vehicles: { sort: 'asc' },
    sections: [
      {
        h2: "Louer une voiture à Marrakech avec Yourent : l'essentiel",
        blocks: [
          {
            type: 'table',
            head: ['Votre question', 'La réponse'],
            rows: [
              ['Yourent a-t-elle une agence à Marrakech ?', "Non. La seule agence est à Casablanca, et la voiture vient de là."],
              ['Peut-on recevoir la voiture à Marrakech ?', "Oui, en ville ou à l'aéroport Marrakech-Ménara (RAK)."],
              ['La livraison est-elle payante ?', "Non. Elle est gratuite à Marrakech et à l'aéroport Ménara, comme à Casablanca et à l'aéroport Mohammed V."],
              ['Combien coûte la voiture ?', 'Dès {minPrice} DH par jour, pour 5 jours minimum.'],
              ['Où rend-on la voiture ?', "Le lieu de restitution se convient avec l'équipe sur WhatsApp avant de confirmer."],
              ["Quand joindre l'équipe ?", 'Tous les jours de 8 h à 22 h, sur WhatsApp ou au +212 6 61 23 62 31.'],
              ['Faut-il payer en ligne ?', "Non. La réservation en ligne est une demande, et le règlement se fait avec l'équipe."],
            ],
          },
        ],
      },
      {
        h2: 'Comment se passe la livraison à Marrakech, étape par étape',
        blocks: [
          {
            type: 'list',
            ordered: true,
            items: [
              "**La demande en ligne.** Choisissez un modèle dans le [catalogue de voitures à louer](/catalogue) et indiquez vos dates. Dans le champ des notes, précisez que vous voulez la voiture à Marrakech ou à l'aéroport Marrakech-Ménara, avec la date, l'heure et, si vous arrivez en avion, votre numéro de vol.",
              "**La réponse sur WhatsApp.** Vous ne payez rien en ligne. L'équipe confirme que la voiture est disponible à vos dates, puis fixe avec vous l'heure et le point de rendez-vous. La livraison, elle, ne coûte rien. Vous décidez une fois que tout est clair.",
              "**La remise et le contrôle.** Un membre de l'équipe amène la voiture depuis Casablanca. Vous présentez vos documents, vous laissez la caution, puis vous faites le tour du véhicule ensemble avant de partir.",
              "**La restitution.** Le lieu de retour se convient avec l'équipe sur WhatsApp avant de confirmer. La caution vous revient quand la voiture est rendue en bon état.",
            ],
          },
          {
            type: 'p',
            text: "Comme la voiture fait la route depuis Casablanca, envoyez votre demande le plus tôt possible. Vous pouvez ensuite modifier ou annuler sans frais jusqu'à 24 h avant la prise en charge ; au-delà, des frais peuvent s'appliquer.",
          },
        ],
      },
      {
        h2: "Location de voiture à l'aéroport Marrakech-Ménara (RAK) : l'arrivée",
        blocks: [
          {
            type: 'p',
            text: "L'aéroport de Marrakech-Ménara, code RAK, se trouve à environ 5 km du centre de Marrakech (source : Wikipédia). Yourent n'y a pas de comptoir, pas plus qu'en ville : une fois la réservation confirmée, un membre de l'équipe vous attend avec la voiture au point de rendez-vous envoyé sur WhatsApp, sans frais de livraison.",
          },
          {
            type: 'p',
            text: "Transmettez votre numéro de vol et votre heure d'arrivée dès la demande, puis prévenez l'équipe si l'horaire change. Elle travaille de 8 h à 22 h, tous les jours : si vous atterrissez en dehors de ces horaires, demandez avant de réserver ce qui peut être organisé. Notre article [arriver à l'aéroport Marrakech-Ménara et récupérer sa voiture de location](/blog/aeroport-marrakech-menara-voiture-location) détaille les préparatifs.",
          },
        ],
      },
      {
        h2: 'Voiture livrée à Marrakech ou prise à Casablanca : que choisir',
        blocks: [
          {
            type: 'table',
            head: ['Votre voyage', 'Solution à regarder', 'Pourquoi'],
            rows: [
              [
                'Vous atterrissez à Marrakech-Ménara et restez dans le sud',
                "Livraison gratuite à l'aéroport Marrakech-Ménara",
                'Vous recevez la voiture là où vous arrivez, sans frais de livraison.',
              ],
              [
                'Vous atterrissez à Casablanca Mohammed V',
                "[Location de voiture à l'aéroport de Casablanca](route:aeroport)",
                'La livraison y est gratuite, et vous descendez vers le sud par vous-même.',
              ],
              [
                'Vous commencez par quelques jours à Casablanca',
                "Livraison gratuite à l'hôtel, puis la [route de Casablanca à Marrakech](route:marrakech)",
                "Vous profitez de la ville avant de partir. Cette page décrit l'autoroute et les péages.",
              ],
              [
                'Vous êtes déjà à Marrakech',
                'Livraison gratuite en ville',
                "Envoyez votre adresse et vos dates à l'équipe : elle fixe avec vous l'heure et le lieu de la remise.",
              ],
            ],
          },
          {
            type: 'p',
            text: "En résumé, la livraison est gratuite à Marrakech et à l'aéroport Ménara comme à Casablanca et à l'aéroport Mohammed V : choisissez simplement l'arrivée qui convient à votre voyage. Dans tous les cas, la location dure au moins 5 jours, et le lieu de restitution se convient avec l'équipe sur WhatsApp.",
          },
        ],
      },
      {
        h2: 'Quelle voiture pour Marrakech et ses environs',
        blocks: [
          {
            type: 'p',
            text: 'Toutes les voitures de la flotte ont 5 places : choisissez donc selon vos bagages, la boîte de vitesses et votre budget.',
          },
          {
            type: 'table',
            head: ['Votre séjour', 'Modèles à regarder', 'À savoir'],
            rows: [
              [
                'À deux, surtout en ville',
                '[Fiat 500](/catalogue/fiat-500) ({price:fiat-500} DH/jour), [Opel Corsa](/catalogue/opel-corsa) ({price:opel-corsa} DH/jour)',
                'Citadines essence à boîte manuelle, faciles à garer. Le coffre reste petit.',
              ],
              [
                'Une automatique pour la ville et la route',
                '[Toyota Corolla](/catalogue/toyota-corolla) ({price:toyota-corolla} DH/jour), [Volkswagen T-Roc](/catalogue/volkswagen-t-roc) ({price:volkswagen-t-roc} DH/jour)',
                'Une berline hybride et un SUV compact, tous deux automatiques.',
              ],
              [
                'En famille, avec des valises',
                '[Dacia Duster](/catalogue/dacia-duster) ({price:dacia-duster} DH/jour), [Kia Sorento](/catalogue/kia-sorento) ({price:kia-sorento} DH/jour)',
                'SUV diesel au grand coffre : Duster manuel, Sorento automatique.',
              ],
              [
                'Pour se faire plaisir',
                '[Range Rover Evoque](/catalogue/range-rover-evoque) ({price:range-rover-evoque} DH/jour), [Porsche Macan](/catalogue/porsche-macan) ({price:porsche-macan} DH/jour)',
                "SUV haut de gamme automatiques : diesel pour l'Evoque, essence pour le Macan.",
              ],
            ],
          },
          {
            type: 'p',
            text: "Pour sortir de Marrakech à plusieurs avec des sacs, un SUV apporte une position de conduite plus haute et davantage de coffre : toute la gamme est sur notre page [location de SUV à Casablanca](route:suv). Ces voitures sont faites pour la route, pas pour le tout-terrain. Si votre programme comprend des pistes, demandez à l'équipe quel modèle convient avant de réserver. Les modèles de prestige, Mercedes, Range Rover ou Porsche Macan, peuvent aussi être demandés à Marrakech : ils sont présentés sur la page [location de voiture de luxe à Casablanca](route:luxe).",
          },
        ],
      },
      {
        h2: "Prix d'une voiture de location livrée à Marrakech",
        blocks: [
          { type: 'pricing' },
          {
            type: 'p',
            text: "Le tableau donne le tarif par jour de chaque modèle de 5 à 10 jours, puis celui qui s'applique au-delà de 10 jours, plus bas sur la plupart des modèles. L'assurance tous risques avec franchise est incluse sur chaque voiture. Le tarif par jour ne comprend pas :",
          },
          {
            type: 'list',
            items: [
              'le carburant ;',
              "les péages, si votre itinéraire emprunte l'autoroute.",
            ],
          },
          {
            type: 'p',
            text: "La livraison à Marrakech ou à l'aéroport Marrakech-Ménara, en revanche, ne s'ajoute pas au prix. Une caution est demandée au départ, puis rendue au retour de la voiture en bon état. Le kilométrage inclus n'est pas publié sur le site : posez la question si vous prévoyez de longs trajets. Les tarifs de toute la flotte figurent sur la page [prix de location de voiture à Casablanca](route:tarifs).",
          },
        ],
      },
      {
        h2: 'Âge, permis, caution : les conditions pour louer',
        blocks: [
          {
            type: 'list',
            items: [
              'avoir au moins 21 ans ;',
              "une pièce d'identité valide : CIN ou passeport ;",
              'un permis de conduire de plus de 2 ans (les touristes étrangers peuvent présenter le permis international) ;',
              'un justificatif de domicile ;',
              'une caution au départ, par chèque, en espèces ou par empreinte de carte, dont le montant dépend du véhicule.',
            ],
          },
          {
            type: 'p',
            text: "Le détail, dont l'annulation gratuite jusqu'à 24 h avant la prise en charge, figure dans nos [conditions de location de voiture](route:conditions). Votre voyage continue au-delà de Marrakech ? Notre page [location de voiture au Maroc](route:maroc) liste ce qu'il faut régler avant un circuit plus long.",
          },
        ],
      },
      {
        h2: 'Les voitures que vous pouvez demander à Marrakech',
        blocks: [{ type: 'vehicles' }],
      },
    ],
    faq: [
      {
        q: 'Yourent a-t-elle une agence de location de voitures à Marrakech ?',
        a: "Non. Yourent est une agence de Casablanca, avec une seule adresse : N°25 Rue Ibnou Mounir. La voiture est amenée gratuitement à Marrakech depuis Casablanca, en ville ou à l'aéroport Ménara.",
      },
      {
        q: "La livraison à Marrakech ou à l'aéroport Marrakech-Ménara est-elle gratuite ?",
        a: "Oui, comme à Casablanca et à l'aéroport Mohammed V. Vous payez la location, pas le trajet de la voiture depuis Casablanca.",
      },
      {
        q: "Peut-on récupérer une voiture de location à l'aéroport Marrakech-Ménara ?",
        a: "Oui, et la livraison y est gratuite. Yourent n'a pas de comptoir dans l'aéroport : une fois la réservation confirmée, un membre de l'équipe vous attend avec la voiture au point de rendez-vous envoyé sur WhatsApp. Transmettez votre numéro de vol et votre heure d'arrivée avec la demande.",
      },
      {
        q: 'Peut-on rendre la voiture à Marrakech ?',
        a: "Le lieu de restitution se convient avec l'équipe sur WhatsApp avant de confirmer. Indiquez dans votre demande où vous souhaitez rendre la voiture.",
      },
      {
        q: 'Peut-on louer une voiture à Marrakech pour une journée ou un week-end ?',
        a: "Non, car la location dure 5 jours minimum. Le tarif démarre à {minPrice} DH par jour et baisse au-delà de 10 jours sur la plupart des modèles.",
      },
      {
        q: "Combien de temps à l'avance faut-il envoyer sa demande ?",
        a: "Le plus tôt possible : la voiture vient de Casablanca, et l'équipe doit vérifier qu'elle est disponible à vos dates, puis organiser la remise. Elle répond tous les jours, de 8 h à 22 h.",
      },
    ],
    related: ['marrakech', 'aeroport', 'maroc', 'suv', 'tarifs', 'conditions'],
  },
};

export default page;
