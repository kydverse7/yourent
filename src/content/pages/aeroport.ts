import type { LocalizedPage } from '../types';

const page: LocalizedPage = {
  fr: {
    metaTitle: 'Location voiture aéroport Casablanca dès {minPrice} DH | Yourent',
    metaDescription:
      "Location voiture aéroport Mohammed V à Casablanca : livraison gratuite à l'arrivée, dès {minPrice} DH/jour, assurance tous risques, note Google 4,8/5.",
    eyebrow: 'Aéroport Mohammed V',
    h1: "Location de voiture à l'aéroport de Casablanca Mohammed V (CMN)",
    intro:
      "Yourent livre votre voiture de location à l'aéroport Mohammed V de Casablanca (CMN), sans frais de livraison, dès {minPrice} DH par jour. Vous choisissez un véhicule et vos dates en ligne, puis l'équipe confirme sur WhatsApp ou par téléphone. Un membre de l'équipe vous remet les clés à votre arrivée. La location commence à 5 jours.",
    breadcrumb: 'Aéroport Mohammed V',
    vehicles: { sort: 'asc' },
    sections: [
      {
        h2: "Location de voiture à l'aéroport de Casablanca : l'essentiel en bref",
        blocks: [
          {
            type: 'table',
            head: ['Votre question', 'La réponse'],
            rows: [
              ['Combien ça coûte ?', 'Dès {minPrice} DH par jour, pour 5 jours minimum.'],
              ['La livraison est-elle payante ?', "Non, elle est gratuite à l'aéroport Mohammed V et dans tout Casablanca."],
              ['Y a-t-il un comptoir ?', 'Non, la voiture vous est remise au rendez-vous convenu.'],
              ['À quelle heure ?', "L'équipe travaille de 8 h à 22 h, 7j/7. Hors de ces horaires, posez-lui la question sur WhatsApp."],
              ['Quelles conditions ?', "21 ans minimum, permis de plus de 2 ans, pièce d'identité, justificatif de domicile et caution."],
              ['Faut-il payer en ligne ?', "Non, la réservation est une demande, et le règlement se fait avec l'équipe."],
            ],
          },
        ],
      },
      {
        h2: "Louer une voiture à l'aéroport de Casablanca avec livraison",
        blocks: [
          {
            type: 'p',
            text: "Yourent est une agence de Casablanca, installée au N°25 Rue Ibnou Mounir. Elle n'a pas de bureau dans le terminal : la voiture vient donc à vous. Pour une **location de voiture à l'aéroport Mohammed V**, vous réservez avant le départ, puis un membre de l'équipe vous remet le véhicule au rendez-vous convenu. Vous n'avez aucun passage en agence à prévoir.",
          },
          {
            type: 'p',
            text: "La livraison à l'aéroport est **gratuite**, comme celle dans tout Casablanca. La flotte compte {vehicleCount} véhicules répartis sur {modelCount} modèles, de {fleetMin} DH à {maxPrice} DH par jour selon le modèle. Chacun est couvert par une assurance tous risques avec franchise.",
          },
        ],
      },
      {
        h2: "Comment se passe la remise du véhicule à l'aéroport",
        blocks: [
          {
            type: 'p',
            text: "Voici le déroulé complet d'une location de voiture à l'aéroport de Casablanca, de la demande à la restitution.",
          },
          {
            type: 'list',
            ordered: true,
            items: [
              "**La demande en ligne** : sur la fiche d'un véhicule ou depuis le [catalogue de voitures à louer](/catalogue), vous indiquez vos dates. La recherche écarte les voitures déjà occupées. Précisez ensuite que la remise se fait à l'aéroport Mohammed V, avec votre date et votre heure d'arrivée.",
              "**La confirmation par l'équipe** : la demande en ligne n'est pas un paiement. L'équipe vous répond sur WhatsApp ou par téléphone pour confirmer le véhicule, les dates et le montant. C'est aussi le moment de poser vos questions.",
              "**La remise à l'arrivée** : vous atterrissez, récupérez vos bagages, puis un membre de l'équipe vous remet le véhicule. Le point de rendez-vous exact vous est communiqué sur WhatsApp avant votre arrivée.",
              "**Le contrôle et le départ** : vous présentez vos documents, la caution est demandée et l'état de la voiture est vérifié avec vous. Vous prenez ensuite la route.",
              "**La restitution** : à la fin de la location, vous rendez la voiture à l'adresse convenue avec l'équipe. La caution vous revient alors, à condition que le véhicule soit en bon état.",
            ],
          },
          {
            type: 'p',
            text: "Pour modifier ou annuler, prévenez l'équipe au moins 24 h avant la prise en charge : c'est sans frais. Au-delà, en revanche, des frais peuvent s'appliquer. Le détail figure dans les [conditions de location de voiture](route:conditions).",
          },
        ],
      },
      {
        h2: 'Pourquoi se faire livrer plutôt que passer par un comptoir',
        blocks: [
          {
            type: 'p',
            text: "Passer par un comptoir convient à beaucoup de voyageurs. La livraison répond toutefois à une autre situation. Vous arrivez fatigué, avec des bagages, parfois en famille, et vous voulez repartir sans file d'attente ni navette vers un parking éloigné.",
          },
          {
            type: 'list',
            items: [
              "Vous n'attendez pas votre tour à un guichet, car le rendez-vous est fixé à l'avance avec l'équipe.",
              "Vous traitez directement avec l'équipe, de la réservation à la remise des clés, puis vous la gardez joignable sur WhatsApp pendant la location.",
              "Les conditions sont validées avant le vol : tarif, caution, documents. Vous savez donc à quoi vous attendre en arrivant.",
              "Vous pouvez aussi demander la livraison à votre hôtel ou à une adresse de Casablanca, 7j/7.",
            ],
          },
          {
            type: 'p',
            text: "Si vous comparez avec une offre d'un loueur international, regardez la caution, la franchise et les frais annexes, pas seulement le prix affiché. Notre page [agence locale ou loueur international à Casablanca](route:agence-vs-international) détaille ces points à vérifier.",
          },
        ],
      },
      {
        h2: "Âge, permis, caution : ce qu'il faut préparer avant d'atterrir",
        blocks: [
          {
            type: 'p',
            text: "Avoir les bons papiers sur soi évite de retarder la remise. Il faut avoir au moins 21 ans et prévoir :",
          },
          {
            type: 'list',
            items: [
              "une pièce d'identité valide : CIN ou passeport ;",
              "un permis de conduire de plus de 2 ans (les touristes étrangers peuvent présenter le permis international) ;",
              "un justificatif de domicile ;",
              "de quoi laisser la caution : chèque, espèces ou empreinte de carte. Son montant dépend du véhicule et vous est indiqué à la confirmation ;",
              "votre numéro de vol et votre heure d'arrivée, à transmettre à l'équipe.",
            ],
          },
          {
            type: 'p',
            text: "Si vous voyagez avec des enfants, des bagages encombrants ou plusieurs passagers, dites-le au moment de la demande : l'équipe vous orientera vers un véhicule au coffre adapté, sachant que toutes nos voitures ont 5 places.",
          },
        ],
      },
      {
        h2: "Ce qui se passe entre l'atterrissage et la remise des clés",
        blocks: [
          {
            type: 'p',
            text: "Le plus utile est de caler les horaires avec l'équipe avant le départ. Envoyez par exemple votre numéro de vol, l'heure d'arrivée prévue, le nombre de passagers et de valises. Avec ces informations, l'équipe prépare le bon véhicule, vérifie qu'il est libre à vos dates, puis vous écrit sur WhatsApp pour fixer le rendez-vous.",
          },
          {
            type: 'p',
            text: "À la remise, prenez deux minutes pour faire le tour de la voiture avec l'équipe, vérifier le niveau de carburant et noter les rayures existantes. Ce contrôle protège les deux parties et accélère la restitution.",
          },
        ],
      },
      {
        h2: 'Arrivée tardive, vol de nuit ou retard de vol',
        blocks: [
          {
            type: 'p',
            text: "L'équipe travaille de 8 h à 22 h, tous les jours. Si votre vol atterrit tard, très tôt ou avec du retard, elle précise sur WhatsApp ce qui est possible, y compris le point de rendez-vous.",
          },
          {
            type: 'p',
            text: "Le plus sûr est de transmettre votre numéro de vol dès la demande, puis de prévenir l'équipe sur WhatsApp si l'horaire change avant le départ. Vous pouvez la joindre depuis la page [contact de l'agence](route:contact).",
          },
        ],
      },
      {
        h2: "Quel véhicule choisir pour sortir de l'aéroport",
        blocks: [
          {
            type: 'p',
            text: "L'aéroport est relié par autoroute à Casablanca, Rabat et Marrakech. Pour la ville et les petits budgets, une citadine suffit : voyez notre [location de voiture pas chère à Casablanca](route:economique). Pour les longs trajets et les familles, en revanche, une [location de SUV à Casablanca](route:suv) ou une berline offre plus de place et de coffre. Si vous préférez éviter l'embrayage après un vol, regardez la [location de voiture automatique à Casablanca](route:automatique).",
          },
          {
            type: 'p',
            text: "Pour un déplacement professionnel ou un événement, voyez plutôt notre [location de voiture de luxe à Casablanca](route:luxe). Le tarif de chaque modèle figure ci-dessous.",
          },
        ],
      },
      {
        h2: "Prix de la location de voiture à l'aéroport de Casablanca",
        blocks: [
          { type: 'pricing' },
          {
            type: 'p',
            text: "Sur la plupart des modèles, le tarif par jour baisse automatiquement au-delà de 10 jours. La livraison à l'aéroport ne coûte rien, si bien que seule la location vous est facturée. Retrouvez tous les modèles sur la page [prix de location de voiture à Casablanca](route:tarifs).",
          },
        ],
      },
      {
        h2: 'Voiture de location, ou autre moyen de quitter le terminal ?',
        blocks: [
          {
            type: 'p',
            text: "La voiture de location n'est pas votre seule option en sortant de l'aéroport. Notre article [aéroport Mohammed V - centre de Casablanca](/blog/aeroport-mohammed-v-centre-ville-casablanca) présente les autres trajets possibles. Pour préparer l'arrivée elle-même, lisez aussi notre [guide de l'aéroport Mohammed V](/blog/guide-aeroport-mohammed-v).",
          },
          {
            type: 'p',
            text: "Comme la location dure au moins 5 jours, elle vise surtout les voyageurs qui gardent la voiture pendant leur séjour. Si votre voyage continue hors de la ville, notre page [location de voiture au Maroc](route:maroc) explique comment partir de Casablanca.",
          },
        ],
      },
      {
        h2: "Vous arrivez de France ou d'Europe à l'aéroport de Casablanca",
        blocks: [
          {
            type: 'p',
            text: "Si vous arrivez de France ou d'un autre pays d'Europe, vous pouvez tout préparer avant de prendre l'avion. La demande se fait en ligne, puis l'équipe confirme sur WhatsApp, ce qui vous laisse le temps de valider le tarif et la caution. Notre page [location de voiture à Casablanca depuis la France et l'Europe](route:europe) reprend les points propres à ce voyage.",
          },
        ],
      },
      {
        h2: 'La flotte disponible',
        blocks: [{ type: 'vehicles' }],
      },
    ],
    faq: [
      {
        q: "La livraison à l'aéroport Mohammed V est-elle payante ?",
        a: "Non. Yourent livre gratuitement à l'aéroport Mohammed V et dans tout Casablanca. Vous ne payez donc que la location, au tarif du véhicule choisi.",
      },
      {
        q: 'Y a-t-il un comptoir Yourent dans le terminal ?',
        a: "Non. Yourent livre le véhicule à votre arrivée, car il n'y a pas de bureau dans l'aéroport. L'équipe vous indique le point de rendez-vous exact sur WhatsApp avant votre vol.",
      },
      {
        q: "Que se passe-t-il si mon vol est retardé ou si j'arrive la nuit ?",
        a: "Transmettez votre numéro de vol à la réservation, puis prévenez l'équipe sur WhatsApp en cas de changement. Pour une arrivée hors des horaires d'ouverture (8 h à 22 h) ou un retard important, elle précise ce qui est possible.",
      },
      {
        q: "Quels documents dois-je présenter à l'aéroport ?",
        a: "Il faut avoir au moins 21 ans et présenter une pièce d'identité valide (CIN ou passeport), un permis de plus de 2 ans et un justificatif de domicile. Un touriste étranger peut présenter le permis international. Une caution est demandée au départ, par chèque, espèces ou empreinte de carte.",
      },
      {
        q: 'Puis-je réserver sans payer en ligne ?',
        a: "Oui. La réservation en ligne est une demande : l'équipe confirme ensuite par WhatsApp ou par téléphone, et le règlement se fait avec elle. Vous pouvez d'ailleurs modifier ou annuler gratuitement jusqu'à 24 h avant la prise en charge.",
      },
      {
        q: "Peut-on rendre la voiture à l'aéroport à la fin de la location ?",
        a: "Le lieu de restitution se convient avec l'équipe au moment de la confirmation. Précisez-le dès votre demande pour qu'elle vous réponde sur WhatsApp avant le départ.",
      },
    ],
    related: ['tarifs', 'conditions', 'suv', 'automatique', 'contact', 'europe', 'marrakech'],
  },
};

export default page;
