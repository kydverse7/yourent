import type { LocalizedPage } from '../types';

const page: LocalizedPage = {
  fr: {
    metaTitle: 'Location de voiture à Casablanca depuis la France | Yourent',
    metaDescription:
      "Location voiture Casablanca depuis la France ou l'Europe : demande en ligne sans paiement, WhatsApp, livraison gratuite à Mohammed V, dès {minPrice} DH/jour.",
    eyebrow: 'Depuis la France et l\'Europe',
    h1: "Location de voiture à Casablanca depuis la France et l'Europe",
    intro:
      "Depuis la France, la Belgique ou la Suisse, vous préparez votre location de voiture à Casablanca en ligne : Yourent reçoit la demande, dès {minPrice} DH par jour, 5 jours minimum. Rien ne se paie sur le site : l'équipe confirme sur WhatsApp ou par téléphone, puis livre gratuitement la voiture à l'aéroport Mohammed V. Tout se cale depuis chez vous, avant de faire vos valises.",
    breadcrumb: 'Depuis la France et l\'Europe',
    vehicles: { sort: 'asc', limit: 9 },
    sections: [
      {
        h2: 'Location de voiture à Casablanca depuis la France : à qui sert cette page',
        blocks: [
          {
            type: 'p',
            text: "Elle s'adresse au voyageur qui habite en France, en Belgique, en Suisse ou ailleurs en Europe, et qui veut caler sa voiture avant le départ. Un voyageur qui part du Canada prépare sa location de la même façon. Yourent est une agence de Casablanca, installée au N°25 Rue Ibnou Mounir ; vous traitez directement avec son équipe, à distance.",
          },
          {
            type: 'p',
            text: "Trois autres pages couvrent des besoins voisins. Si vous êtes Marocain résidant à l'étranger, la page [location de voiture MRE](route:mre) parle de vos séjours au pays. Le déroulé de la remise sur place se trouve dans [location de voiture à l'aéroport Mohammed V](route:aeroport). Pour hésiter en connaissance de cause, lisez [agence locale ou loueur international](route:agence-vs-international).",
          },
        ],
      },
      {
        h2: "Louer une voiture à Casablanca depuis l'Europe, sans paiement en ligne",
        blocks: [
          {
            type: 'list',
            ordered: true,
            items: [
              "Saisissez vos dates d'arrivée et de départ dans le [catalogue de voitures](/catalogue) : seules les voitures libres restent affichées.",
              "Envoyez ensuite votre demande en indiquant l'aéroport Mohammed V comme lieu de remise, ainsi que votre heure d'arrivée prévue.",
              "L'équipe vous répond alors avec le montant et la caution. Aucune carte n'est débitée sur le site, car la demande en ligne n'est pas un paiement.",
              "Reste à convenir avec elle du règlement, puis à garder sa confirmation écrite dans votre téléphone pour le voyage.",
            ],
          },
          {
            type: 'p',
            text: "Vos dates bougent ? La modification et l'annulation restent sans frais jusqu'à 24 h avant la prise en charge ; plus tard, des frais peuvent cependant s'appliquer.",
          },
        ],
      },
      {
        h2: "WhatsApp plutôt qu'un appel international",
        blocks: [
          {
            type: 'p',
            text: "Depuis l'étranger, WhatsApp reste le canal le plus simple : les messages passent par votre connexion internet, donc sans frais d'appel international. Un appel classique vers le Maroc se facture en revanche selon votre opérateur et votre forfait.",
          },
          {
            type: 'p',
            text: "Le numéro est le même pour les deux : **+212 6 61 23 62 31**. Enregistrez-le avec son indicatif, +212, pour le retrouver dans WhatsApp. Écrivez-y aussi pour toutes les questions que le site laisse ouvertes, par exemple le kilométrage inclus ou le montant de la franchise. La page [contact](route:contact) réunit les autres moyens de joindre l'agence.",
          },
        ],
      },
      {
        h2: 'Documents, âge et permis à préparer avant le vol',
        blocks: [
          {
            type: 'list',
            items: [
              "**L'identité.** Un passeport valide convient, puisque la pièce demandée est une CIN ou un passeport.",
              "**L'âge.** Le conducteur doit avoir au moins 21 ans.",
              "**Le permis.** Il doit avoir plus de 2 ans. Le permis international est accepté pour les touristes étrangers, et il s'emporte avec le permis national, dont il n'est qu'une traduction.",
              "**Un permis français, belge ou suisse seul.** La loi marocaine permet à un ressortissant étranger de conduire avec son permis étranger pendant un an maximum. Toutefois, c'est l'équipe qui confirme sur WhatsApp s'il suffit pour votre location.",
              "**Le justificatif de domicile.** Il est demandé à tous ; l'équipe précise lequel elle accepte quand on habite à l'étranger.",
            ],
          },
          {
            type: 'p',
            text: "Notre article [louer au Maroc avec un permis étranger](/blog/louer-voiture-maroc-permis-etranger) cite la loi et ses sources. Les [conditions de location](route:conditions) rassemblent toutes les règles de l'agence.",
          },
        ],
      },
      {
        h2: 'Dirhams, euros et caution : le budget à prévoir',
        blocks: [
          { type: 'pricing' },
          {
            type: 'p',
            text: "Les tarifs sont fixés en dirhams, et la location est facturée dans cette monnaie. L'équivalent en euros affiché dans les tableaux reste donc indicatif. Votre banque peut aussi appliquer son propre taux de change et ses frais : renseignez-vous auprès d'elle avant de partir.",
          },
          {
            type: 'p',
            text: "La caution se laisse au départ, par chèque, en espèces ou par empreinte de carte, et son montant dépend du véhicule. Si vous comptez laisser un chèque d'une banque européenne, demandez d'abord à l'équipe s'il convient, comme pour l'empreinte de votre carte. Elle vous rend cette somme au retour de la voiture en bon état ; le délai exact se demande sur WhatsApp. Voyez aussi la page [tarifs de location](route:tarifs).",
          },
        ],
      },
      {
        h2: "L'arrivée à Mohammed V, puis la route",
        blocks: [
          {
            type: 'p',
            text: "Yourent n'a pas de comptoir à l'aéroport : un membre de l'équipe vient vous remettre la voiture, et le point de rendez-vous se fixe avec lui sur WhatsApp. L'agence est ouverte de 8 h à 22 h, 7j/7. Signalez tout atterrissage en dehors de cette plage dès votre demande : elle vous dira ce qui est possible.",
          },
          {
            type: 'p',
            text: "Vous visez le sud dès l'atterrissage ? Notre page [Casablanca Marrakech en voiture](route:marrakech) présente l'itinéraire et les modèles adaptés. Et comme la location dure 5 jours minimum, gardez ce seuil en tête pour un court séjour.",
          },
        ],
      },
      {
        h2: 'Neuf voitures à réserver avant le départ',
        blocks: [
          {
            type: 'p',
            text: "Voici les neuf modèles aux tarifs les plus bas ; le [catalogue complet](/catalogue) montre les {modelCount} modèles de la flotte. Toutes ces voitures ont 5 places.",
          },
          { type: 'vehicles' },
        ],
      },
    ],
    faq: [
      {
        q: 'Peut-on réserver depuis la France sans payer en ligne ?',
        a: "Oui, car la réservation sur le site est une simple demande. Le règlement se fait ensuite avec l'équipe, qui confirme sur WhatsApp ou par téléphone.",
      },
      {
        q: 'Mon permis français, belge ou suisse suffit-il ?',
        a: "Il doit avoir plus de 2 ans, et le permis international est accepté pour les touristes étrangers. Sans celui-ci, demandez d'abord à l'équipe de confirmer votre cas sur WhatsApp.",
      },
      {
        q: 'Quel âge faut-il avoir pour louer ?',
        a: "Le conducteur doit avoir 21 ans minimum, quel que soit son pays de résidence. Pensez aussi au passeport et au justificatif de domicile.",
      },
      {
        q: 'Les prix sont-ils en euros ?',
        a: "Non, ils sont en dirhams, à partir de {minPrice} DH par jour. Les tableaux ajoutent un équivalent en euros à titre indicatif, puis l'équipe confirme le montant pour vos dates.",
      },
      {
        q: 'Mon vol arrive tard : la voiture sera-t-elle là ?',
        a: "L'agence travaille de 8 h à 22 h. Pour une heure d'arrivée hors de cette plage, écrivez à l'équipe avant de réserver : elle vous précise ce qui est possible.",
      },
    ],
    related: ['aeroport', 'mre', 'agence-vs-international', 'conditions', 'tarifs'],
  },
};

export default page;
