import type { Article } from '../types';

const article: Article = {
  slug: 'louer-voiture-casablanca-guide',
  metaTitle: `Louer une voiture à Casablanca : le guide complet | Yourent`,
  metaDescription: `Comment louer une voiture à Casablanca : âge, documents, caution, assurance, choix du modèle, livraison et erreurs à éviter. Le guide pas à pas de Yourent.`,
  h1: `Louer une voiture à Casablanca : le guide complet, étape par étape`,
  intro: `Pour louer une voiture à Casablanca, il faut un permis, une pièce d'identité, de quoi laisser une caution, et un loueur dont les conditions sont claires avant la signature. Ce guide suit l'ordre réel d'une location : qui peut louer, où prendre la voiture, quel modèle choisir, combien prévoir, comment réserver, puis quoi vérifier le jour de la remise. Les exemples chiffrés sont ceux de Yourent, agence du Maârif, où les tarifs démarrent à {fleetMin} DH par jour pour 5 jours minimum.`,
  excerpt: `Âge, documents, caution, assurance, choix du modèle, lieu de remise et vérifications le jour J : tout ce qu'il faut savoir pour louer une voiture à Casablanca sans mauvaise surprise.`,
  datePublished: '2026-11-26',
  dateModified: '2026-11-26',
  sections: [
    {
      h2: `Comment louer une voiture à Casablanca, en bref`,
      blocks: [
        {
          type: 'table',
          head: [`Étape`, `Ce que vous faites`, `À prévoir`],
          rows: [
            [`1. Vérifier que vous pouvez louer`, `Âge, ancienneté du permis, documents`, `Chez Yourent : 21 ans, permis de plus de 2 ans`],
            [`2. Choisir le lieu de remise`, `Agence, aéroport ou livraison à votre adresse`, `Livraison gratuite à Casablanca et à l'aéroport Mohammed V chez Yourent`],
            [`3. Choisir le modèle`, `Citadine, berline, SUV ou voiture de prestige`, `Boîte manuelle ou automatique, taille du coffre`],
            [`4. Calculer le budget`, `Tarif par jour multiplié par la durée`, `Caution, carburant et péages en plus`],
            [`5. Réserver`, `Demande en ligne, puis confirmation`, `Aucun paiement en ligne chez Yourent`],
            [`6. Récupérer la voiture`, `Documents, caution, état des lieux`, `Dix minutes pour faire le tour du véhicule`],
          ],
        },
      ],
    },
    {
      h2: `Qui peut louer : âge, permis et documents`,
      blocks: [
        {
          type: 'p',
          text: `Chaque loueur fixe ses règles, et c'est la première chose à lire. Chez Yourent, le conducteur doit avoir **au moins 21 ans** et un **permis obtenu depuis plus de 2 ans**. Le jour de la remise, il présente :`,
        },
        {
          type: 'list',
          items: [
            `une pièce d'identité valide, CIN ou passeport ;`,
            `son permis de conduire ;`,
            `un justificatif de domicile ;`,
            `de quoi laisser la caution, par chèque, en espèces ou par empreinte de carte.`,
          ],
        },
        {
          type: 'p',
          text: `Un permis délivré à l'étranger peut être utilisé au Maroc, et le permis international est accepté pour les touristes. Les règles et les cas particuliers sont expliqués dans notre article [louer une voiture au Maroc avec un permis étranger](/blog/louer-voiture-maroc-permis-etranger). La liste complète figure dans les [conditions de location de voiture à Casablanca](route:conditions).`,
        },
      ],
    },
    {
      h2: `Agence, aéroport ou livraison : où prendre la voiture`,
      blocks: [
        {
          type: 'p',
          text: `À Casablanca, une voiture de location se récupère de trois façons : au comptoir d'une agence, à l'aéroport, ou par livraison à l'adresse de votre choix. Le bon choix dépend de votre arrivée.`,
        },
        {
          type: 'list',
          items: [
            `**Vous arrivez en avion.** Le plus simple est de recevoir la voiture à l'arrivée. Yourent n'a pas de comptoir dans le terminal : un membre de l'équipe vous attend au point de rendez-vous envoyé sur WhatsApp, sans frais de livraison. Le déroulé est décrit sur la page [location de voiture à l'aéroport de Casablanca](route:aeroport).`,
            `**Vous arrivez en train.** La voiture peut vous être remise à la descente du train, comme l'explique la page [location de voiture à la gare Casa Voyageurs](route:casa-voyageurs).`,
            `**Vous êtes déjà en ville.** Faites-vous livrer à l'hôtel ou à domicile, ou passez à l'agence, au N°25 Rue Ibnou Mounir : voyez la page [location de voiture au Maârif](route:maarif).`,
          ],
        },
        {
          type: 'p',
          text: `Hors de Casablanca, Yourent livre gratuitement à Marrakech et à l'aéroport Marrakech-Ménara ; à Mohammedia, la livraison est possible avec un léger supplément. Si vous hésitez entre une agence casablancaise et une grande enseigne, notre comparatif [agence locale ou loueur international](route:agence-vs-international) liste ce qu'il faut regarder.`,
        },
      ],
    },
    {
      h2: `Quelle voiture choisir selon votre séjour`,
      blocks: [
        {
          type: 'p',
          text: `Ne partez pas du modèle, partez de vos trajets. Combien serez-vous, avec combien de valises, et roulerez-vous surtout en ville ou sur autoroute ?`,
        },
        {
          type: 'table',
          head: [`Votre séjour`, `Type de voiture`, `Exemples dans la flotte Yourent`],
          rows: [
            [
              `Seul ou à deux, en ville`,
              `Citadine`,
              `[Fiat 500](/catalogue/fiat-500) ({price:fiat-500} DH/jour), [Opel Corsa](/catalogue/opel-corsa) ({price:opel-corsa} DH/jour)`,
            ],
            [
              `Rendez-vous et autoroute`,
              `Berline`,
              `[Toyota Corolla](/catalogue/toyota-corolla) ({price:toyota-corolla} DH/jour), [Volkswagen Golf 8](/catalogue/volkswagen-golf-8) ({price:volkswagen-golf-8} DH/jour)`,
            ],
            [
              `Famille avec valises`,
              `SUV`,
              `[Dacia Duster](/catalogue/dacia-duster) ({price:dacia-duster} DH/jour), [Volkswagen Tiguan](/catalogue/volkswagen-tiguan) ({price:volkswagen-tiguan} DH/jour)`,
            ],
            [
              `Affaires ou grande occasion`,
              `Voiture de prestige`,
              `[Mercedes CLA](/catalogue/mercedes-cla) ({price:mercedes-cla} DH/jour), [Porsche Macan](/catalogue/porsche-macan) ({price:porsche-macan} DH/jour)`,
            ],
          ],
        },
        {
          type: 'p',
          text: `Deux détails pèsent plus qu'on ne le croit. La **boîte de vitesses** d'abord : dans les embouteillages de Casablanca, une automatique repose, et notre page [location de voiture automatique à Casablanca](route:automatique) recense les modèles concernés. Le **coffre** ensuite : toutes les voitures de la flotte ont 5 places, mais une citadine n'avale pas quatre valises. Pour comparer les gabarits, voyez la [location de SUV à Casablanca](route:suv) ; pour le haut de gamme, la [location de voiture de luxe à Casablanca](route:luxe).`,
        },
      ],
    },
    {
      h2: `Combien ça coûte : le tarif, et ce qui s'ajoute`,
      blocks: [
        {
          type: 'p',
          text: `Le prix d'une location se lit en deux temps : le tarif par jour, puis tout ce qui n'est pas dedans. Chez Yourent, les tarifs vont de {fleetMin} DH à {maxPrice} DH par jour selon le modèle, pour une durée de **5 jours minimum**. Il n'existe pas de formule à la journée ni au week-end. Au-delà de 10 jours, un tarif réduit s'applique automatiquement sur la plupart des modèles.`,
        },
        {
          type: 'list',
          items: [
            `**Compris dans le tarif** : la livraison à Casablanca et à l'aéroport Mohammed V, et une assurance tous risques avec franchise.`,
            `**En plus** : le carburant, les péages d'autoroute, et la caution, qui vous est rendue au retour de la voiture en bon état.`,
            `**À demander** : le kilométrage inclus et le montant de la franchise, que l'équipe précise sur WhatsApp.`,
          ],
        },
        {
          type: 'p',
          text: `La grille complète figure sur la page [prix de location de voiture à Casablanca](route:tarifs). Si le budget guide votre choix, commencez par la [location de voiture pas chère à Casablanca](route:economique), et lisez notre article [combien coûte une location de voiture à Casablanca](/blog/prix-location-voiture-casablanca) pour comprendre ce qui fait varier un tarif.`,
        },
      ],
    },
    {
      h2: `Caution et assurance : ce qu'il faut comprendre avant de signer`,
      blocks: [
        {
          type: 'p',
          text: `Ce sont les deux sujets qui créent le plus de malentendus. La **caution** est une garantie laissée au départ, rendue si la voiture revient en bon état. La **franchise** est la part d'un dommage qui reste à votre charge après un sinistre couvert par l'assurance. L'une ne remplace pas l'autre.`,
        },
        {
          type: 'p',
          text: `Avant de réserver, demandez par écrit le montant de la caution, le mode de versement accepté et le montant de la franchise pour le modèle choisi. Deux articles détaillent ces points : [la caution d'une location de voiture au Maroc](/blog/caution-location-voiture-maroc) et [assurance tous risques et franchise](/blog/assurance-franchise-location-voiture).`,
        },
      ],
    },
    {
      h2: `Réserver : de la demande en ligne à la remise des clés`,
      blocks: [
        {
          type: 'list',
          ordered: true,
          items: [
            `Entrez vos dates dans le [catalogue de voitures à louer à Casablanca](/catalogue) : la recherche retire les modèles déjà pris sur la période.`,
            `Ouvrez la fiche du modèle, puis envoyez votre demande avec vos coordonnées et le lieu de remise souhaité. Vous ne payez rien en ligne.`,
            `L'équipe vous répond sur WhatsApp ou par téléphone, de 8 h à 22 h, pour confirmer le véhicule, le montant et la caution.`,
            `Le jour convenu, la voiture vous est remise à l'adresse choisie ou à l'aéroport.`,
          ],
        },
        {
          type: 'p',
          text: `Un vol décalé, un séjour raccourci ? Vous pouvez modifier ou annuler sans frais jusqu'à 24 h avant la prise en charge. Passé ce délai, des frais peuvent s'appliquer : prévenez l'équipe dès qu'une date bouge.`,
        },
      ],
    },
    {
      h2: `Le jour de la remise : cinq réflexes`,
      blocks: [
        {
          type: 'list',
          items: [
            `**Faites le tour de la voiture** avec la personne qui vous la remet, et faites noter chaque rayure sur l'état des lieux.`,
            `**Photographiez** la carrosserie, les jantes, l'intérieur et le compteur, avec votre téléphone.`,
            `**Relevez le niveau de carburant** et demandez à quel niveau la voiture doit revenir.`,
            `**Vérifiez le type de carburant**, essence ou diesel, avant le premier plein.`,
            `**Enregistrez le numéro de l'agence** : en cas de panne, Yourent envoie un véhicule de remplacement dans les plus brefs délais.`,
          ],
        },
        {
          type: 'p',
          text: `Notre liste [avant de louer une voiture au Maroc](/blog/eviter-mauvaises-surprises-location-maroc) reprend ces vérifications une par une. Une fois au volant, l'article [conduire à Casablanca](/blog/conduire-a-casablanca) rappelle les limitations de vitesse et les règles de stationnement.`,
        },
      ],
    },
  ],
  faq: [
    {
      q: `Quel âge faut-il avoir pour louer une voiture à Casablanca ?`,
      a: `Cela dépend du loueur. Chez Yourent, le conducteur doit avoir au moins 21 ans et un permis de plus de 2 ans.`,
    },
    {
      q: `Peut-on louer une voiture à Casablanca pour une journée ou un week-end ?`,
      a: `Pas chez Yourent : la location dure 5 jours minimum, sur tous les modèles. Au-delà de 10 jours, le tarif par jour baisse sur la plupart d'entre eux.`,
    },
    {
      q: `Faut-il une carte bancaire pour louer une voiture ?`,
      a: `Chez Yourent, la caution peut être laissée par chèque, en espèces ou par empreinte de carte : la carte n'est donc pas le seul moyen. Le montant dépend du véhicule.`,
    },
    {
      q: `Peut-on se faire livrer la voiture à son hôtel ?`,
      a: `Oui. Yourent livre gratuitement dans tout Casablanca et à l'aéroport Mohammed V, tous les jours de 8 h à 22 h, ainsi qu'à Marrakech et à l'aéroport Marrakech-Ménara. À Mohammedia, la livraison est possible avec un léger supplément.`,
    },
    {
      q: `Peut-on louer une voiture à Casablanca avec un permis étranger ?`,
      a: `Oui. Le permis doit avoir plus de 2 ans, et le permis international est accepté pour les touristes étrangers. Prévoyez aussi un passeport et un justificatif de domicile.`,
    },
  ],
  related: ['conditions', 'tarifs', 'aeroport', 'economique', 'faq'],
};

export default article;
