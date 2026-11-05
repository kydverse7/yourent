import type { ModelCopy } from '../types';

/** Texte unique par modèle, indexé par slug (ex. « porsche-macan »). */
const copy: Record<string, ModelCopy> = {
  "fiat-500": {
    paragraphs: [
      "Louer une Fiat 500 à Casablanca, c'est choisir la citadine faite pour la ville. Courte et facile à garer, elle se glisse dans les places que les autres laissent. Cela compte surtout dans le Maarif, à Gauthier ou près de la Corniche un soir d'été. Elle convient à une personne seule ou à un couple, avec des bagages légers.",
      "Elle roule à l'essence et se conduit en boîte manuelle. Si vous n'avez l'habitude que de l'automatique, regardez plutôt la [Fiat 500 Cabriolet](/catalogue/fiat-500-cabriolet). Son coffre reste modeste : oubliez donc les grandes valises. Pour quatre personnes ou une arrivée chargée à l'aéroport, l'[Opel Corsa](/catalogue/opel-corsa) offre un peu plus de place. En revanche, elle coûte {price:opel-corsa} DH par jour contre {price:fiat-500} DH pour la 500.",
      "Pour un trajet vers Marrakech, la 500 fait le travail à condition de voyager léger. L'équipe vous la livre aussi à l'hôtel ou à l'aéroport Mohammed V. Comme elle consomme peu d'essence, elle reste simple à vivre pour des trajets courts et répétés. Si le budget guide votre choix, la page [location de voiture pas chère à Casablanca](route:economique) compare les modèles les plus abordables.",
    ],
    faq: [
      {
        q: "La Fiat 500 est-elle en boîte automatique ?",
        a: "Non, la Fiat 500 est en boîte manuelle. En revanche, la [Fiat 500 Cabriolet](/catalogue/fiat-500-cabriolet) est la version automatique de la flotte.",
      },
      {
        q: "Peut-on partir à Marrakech avec une Fiat 500 ?",
        a: "Oui, à deux et avec peu de bagages. Pour plus de place sur autoroute, une [Volkswagen Golf 8](/catalogue/volkswagen-golf-8) convient toutefois mieux.",
      },
    ],
  },

  "opel-corsa": {
    paragraphs: [
      "La location d'une Opel Corsa à Casablanca convient à celui qui veut une citadine sans se poser de question : discrète, simple, sans fausse note. Elle roule à l'essence en boîte manuelle, et son coffre est plus utile que celui d'une Fiat 500 pour des bagages de séjour classique.",
      "Elle s'adresse à celui qui cherche un tarif bas, {price:opel-corsa} DH par jour, mais qui veut garder une banquette arrière correcte pour deux passagers. En ville, elle se faufile sans peine dans les parkings du centre, les rues étroites et les boulevards aux heures de pointe.",
      "Sur la route, la Corsa reste dans son élément pour des trajets de quelques heures. En revanche, pour un long parcours avec plusieurs passagers, le [Dacia Duster](/catalogue/dacia-duster) apporte plus d'espace et une garde au sol plus haute. Pour une boîte automatique, la [Toyota Corolla](/catalogue/toyota-corolla) offre une berline plus grande, hybride.",
      "À Casablanca, l'hôtel et l'aéroport Mohammed V sont desservis sans frais : la voiture vous attend à l'arrivée.",
    ],
    faq: [
      {
        q: "L'Opel Corsa est-elle en boîte manuelle ?",
        a: "Oui, la Corsa de la flotte est une essence en boîte manuelle. Pour l'automatique, regardez la [Toyota Corolla](/catalogue/toyota-corolla).",
      },
      {
        q: "L'Opel Corsa est-elle adaptée à une famille ?",
        a: "Oui pour deux adultes et deux enfants avec des valises légères, mais au-delà le [Dacia Duster](/catalogue/dacia-duster) sera plus à l'aise.",
      },
    ],
  },

  "fiat-500-cabriolet": {
    paragraphs: [
      "Louer une Fiat 500 Cabriolet à Casablanca, c'est choisir une petite citadine décapotable. Dans notre catalogue, elle est classée en premium, mais sans être une voiture de prestige. On la loue surtout pour le plaisir de rouler toit ouvert sur la Corniche ou la route côtière vers Mohammedia, pas pour son standing.",
      "Elle roule à l'essence avec une boîte automatique, pratique dans les embouteillages. Le coffre est petit : elle va donc à deux personnes avec deux sacs de voyage.",
      "Face à la [Fiat 500](/catalogue/fiat-500) classique, elle coûte {price:fiat-500-cabriolet} DH par jour contre {price:fiat-500} DH, mais elle apporte la boîte automatique et le toit ouvert. Si vous voulez simplement une voiture de ville pas chère, l'[Opel Corsa](/catalogue/opel-corsa) fait le travail à {price:opel-corsa} DH par jour. Pour rouler à l'air libre pendant un séjour d'été, c'est aussi le seul modèle décapotable de la flotte.",
      "Un seul exemplaire est proposé : la recherche par dates du catalogue vous dit s'il est libre sur votre période.",
    ],
    faq: [
      {
        q: "La Fiat 500 Cabriolet est-elle une voiture de luxe ?",
        a: "Non. C'est une petite citadine décapotable, classée premium pour son côté plaisir. Pour une vraie voiture de prestige, voyez plutôt la page [location de voiture de luxe à Casablanca](route:luxe).",
      },
      {
        q: "Convient-elle à un long trajet ?",
        a: "Elle fait le trajet pour deux personnes à bagages réduits. Pour un long parcours avec des valises, une berline comme la [Toyota Corolla](/catalogue/toyota-corolla) offre en revanche plus de coffre et de place.",
      },
      {
        q: "Peut-on réserver la Cabriolet à l'avance ?",
        a: "Oui, et c'est utile, car il n'y a qu'un exemplaire : la recherche par dates du catalogue indique s'il est libre sur vos dates.",
      },
    ],
  },

  "dacia-duster": {
    paragraphs: [
      "Le Dacia Duster est le SUV le plus abordable à louer chez Yourent à Casablanca, à {price:dacia-duster} DH par jour. Il roule au diesel et se conduit en boîte manuelle, ce qui le réserve aux conducteurs à l'aise avec l'embrayage. En échange, il offre de l'espace, un grand coffre et une hauteur de caisse bienvenue sur les routes de campagne.",
      "Louer un Duster est le bon choix pour une famille qui veut partir en vacances sans payer le prix d'un grand SUV. C'est aussi le cas d'un groupe d'amis qui descend vers Essaouira ou Marrakech avec des sacs. Pour comparer avec les autres modèles, la page [location de SUV à Casablanca](route:suv) les réunit.",
      "Il existe en plusieurs exemplaires ; la recherche par dates du catalogue montre ceux qui sont libres sur votre période.",
      "Face au [Volkswagen T-Roc](/catalogue/volkswagen-t-roc), le Duster est plus grand et moins cher, {price:dacia-duster} DH par jour contre {price:volkswagen-t-roc} DH, mais il roule au diesel en boîte manuelle. Le [Kia Sorento](/catalogue/kia-sorento) offre en revanche la boîte automatique, pour {price:kia-sorento} DH. En ville, le Duster reste un peu volumineux : pour le centre, une [Opel Corsa](/catalogue/opel-corsa) est plus pratique.",
    ],
    faq: [
      {
        q: "Le Dacia Duster existe-t-il en boîte automatique ?",
        a: "Non, celui de la flotte est en boîte manuelle et en diesel. Pour un SUV automatique, regardez le [Volkswagen T-Roc](/catalogue/volkswagen-t-roc).",
      },
      {
        q: "Le Duster convient-il à une famille de cinq personnes ?",
        a: "Oui, il a cinq places et un coffre large. C'est un SUV bien adapté à une famille dont le budget est serré.",
      },
      {
        q: "Quel âge faut-il pour louer un Dacia Duster ?",
        a: "Le conducteur doit avoir 21 ans minimum et un permis de plus de 2 ans, comme pour toutes les voitures de la flotte.",
      },
    ],
  },

  "toyota-corolla": {
    paragraphs: [
      "La location d'une Toyota Corolla à Casablanca s'adresse à celui qui veut une berline tranquille : hybride, boîte automatique, sans histoire. Elle permet de conduire sans y penser, que ce soit pour rentrer de l'aéroport Mohammed V avec ses valises ou pour enchaîner des rendez-vous en ville.",
      "Le fonctionnement hybride convient bien à la circulation urbaine, avec ses arrêts et ses redémarrages. Sur autoroute vers Rabat ou Marrakech, son coffre accueille les bagages de deux ou trois personnes.",
      "À {price:toyota-corolla} DH par jour, elle se compare au [Volkswagen T-Roc](/catalogue/volkswagen-t-roc), affiché à {price:volkswagen-t-roc} DH. Choisissez le T-Roc pour la position haute d'un SUV, mais préférez la Corolla pour une berline hybride. Face à l'[Audi A3](/catalogue/audi-a3), à {price:audi-a3} DH, elle est moins chère et hybride, alors que l'A3 roule à l'essence.",
      "C'est aussi un choix sensé pour plusieurs semaines, avec un tarif qui baisse au-delà de 10 jours.",
    ],
    faq: [
      {
        q: "La Toyota Corolla est-elle hybride ?",
        a: "Oui, la Corolla de la flotte est une hybride en boîte automatique, avec 5 places.",
      },
      {
        q: "Est-elle adaptée à une location longue durée ?",
        a: "Oui : le tarif baisse au-delà de 10 jours, et l'hybride convient aux trajets quotidiens en ville. Pour les détails, voyez la page [location de voiture longue durée à Casablanca](route:longue-duree).",
      },
    ],
  },

  "volkswagen-t-roc": {
    paragraphs: [
      "Le Volkswagen T-Roc à louer à Casablanca est un SUV compact à l'essence, en boîte automatique. Plus haut qu'une berline mais plus court qu'un grand SUV, il convient à un couple ou à une petite famille qui veut une voiture facile en ville et à l'aise sur la route.",
      "Louer un T-Roc à Casablanca a un avantage concret : sa taille compacte le rend simple à garer, et sa position haute donne une bonne visibilité dans le trafic. Pour aller à Marrakech ou à Rabat, il suffit à deux ou trois voyageurs avec leurs bagages. Il ne cherche pas à épater, mais c'est une valeur sûre à {price:volkswagen-t-roc} DH par jour.",
      "Comparez-le au [Dacia Duster](/catalogue/dacia-duster) si le budget prime : le Duster est plus spacieux et moins cher, mais il roule au diesel en boîte manuelle. Pour voyager à quatre avec des valises, le [Volkswagen Tiguan](/catalogue/volkswagen-tiguan) offre davantage d'espace, à {price:volkswagen-tiguan} DH par jour. La page [location de Volkswagen à Casablanca](route:volkswagen) présente le reste de la gamme.",
      "Le T-Roc existe en plusieurs exemplaires ; la recherche par dates du catalogue montre ceux qui sont libres sur votre période.",
    ],
    faq: [
      {
        q: "Le T-Roc est-il en diesel ou en essence ?",
        a: "Le T-Roc de la flotte fonctionne à l'essence, avec une boîte automatique.",
      },
      {
        q: "Quelle différence avec le Tiguan ?",
        a: "Le [Tiguan](/catalogue/volkswagen-tiguan) est plus grand, en diesel, et mieux adapté à une famille avec beaucoup de bagages. Le T-Roc, de son côté, est plus compact et plus simple à garer.",
      },
    ],
  },

  "audi-a3": {
    paragraphs: [
      "La location d'une Audi A3 à Casablanca vous donne une compacte premium : elle a l'allure d'une voiture soignée sans le gabarit d'une grande berline. Elle roule à l'essence avec une boîte automatique.",
      "Elle convient à un rendez-vous professionnel, ou à qui veut simplement une voiture plus raffinée qu'une citadine. À deux ou trois personnes, elle se prête bien à un trajet vers Rabat, Mohammedia ou Marrakech, alors qu'à quatre avec les valises, vous serez à l'étroit.",
      "Son tarif est de {price:audi-a3} DH par jour, à comparer avec les {price:volkswagen-golf-8} DH de la [Volkswagen Golf 8](/catalogue/volkswagen-golf-8). La Golf est plus polyvalente et existe dans les deux boîtes, tandis que l'A3 mise sur la finition et l'image de marque. Face à la [Mercedes CLA](/catalogue/mercedes-cla), à {price:mercedes-cla} DH, elle est plus sobre et moins chère.",
      "L'A3 n'existe qu'en un exemplaire : la recherche par dates du catalogue vous dit s'il est libre. Les autres modèles de la marque sont sur la page [location d'Audi à Casablanca](route:audi).",
    ],
    faq: [
      {
        q: "L'Audi A3 est-elle en boîte automatique ?",
        a: "Oui, l'A3 de la flotte est en boîte automatique et à l'essence. Pour une Audi en boîte manuelle, regardez donc l'[Audi Q3](/catalogue/audi-q3).",
      },
      {
        q: "Peut-on voyager à quatre en Audi A3 ?",
        a: "Oui, elle a cinq places, mais le coffre et la banquette arrière restent compacts. Pour quatre voyageurs avec valises, un SUV comme le [Volkswagen Tiguan](/catalogue/volkswagen-tiguan) est plus confortable.",
      },
    ],
  },

  "volkswagen-golf-8": {
    paragraphs: [
      "La location d'une Volkswagen Golf 8 à Casablanca vous donne la compacte polyvalente de la flotte. Elle existe en diesel ou en essence, en boîte automatique ou manuelle, selon l'exemplaire. Indiquez donc votre préférence dans la demande, et l'équipe vous propose la voiture libre qui correspond.",
      "Elle convient à presque tous les usages : une arrivée à l'aéroport Mohammed V, un séjour de deux semaines en ville ou un aller-retour à Marrakech. À quatre, elle reste correcte pour un trajet court, tandis qu'à deux elle est très à l'aise. Son prix est de {price:volkswagen-golf-8} DH par jour.",
      "Comparée à la [Toyota Corolla](/catalogue/toyota-corolla), la Golf existe en diesel ou en essence, alors que la Corolla est hybride et uniquement automatique. Face au [Volkswagen T-Roc](/catalogue/volkswagen-t-roc), elle est plus compacte et plus facile à garer, mais moins haute : choisissez le T-Roc si vous tenez à la position haute.",
      "C'est le choix de qui ne veut ni SUV ni simple citadine.",
    ],
    faq: [
      {
        q: "La Golf 8 est-elle en diesel ou en essence ?",
        a: "Les deux motorisations existent dans la flotte, selon l'exemplaire. Précisez donc votre préférence dans la demande de réservation.",
      },
      {
        q: "Peut-on avoir la Golf 8 en boîte manuelle ?",
        a: "Oui, la Golf 8 existe en boîte manuelle comme en automatique, et l'équipe confirme l'exemplaire disponible sur vos dates.",
      },
      {
        q: "Golf 8 ou Toyota Corolla : quelle différence ?",
        a: "Les deux sont des compactes à 5 places. La Golf 8 existe en diesel ou en essence, automatique ou manuelle, tandis que la [Toyota Corolla](/catalogue/toyota-corolla) est hybride, en automatique. Le choix tient donc à la motorisation que vous préférez.",
      },
    ],
  },

  "kia-sorento": {
    paragraphs: [
      "Pour louer un Kia Sorento à Casablanca, vous prenez le SUV familial de la flotte : grand, diesel, boîte automatique, cinq places et un grand coffre. Il convient à une famille qui voyage avec ses bagages, à un groupe qui rejoint Marrakech ou Agadir, ou à quelqu'un qui veut s'installer haut et rouler tranquille.",
      "En ville, son gabarit demande un peu d'attention dans les rues étroites. Sur l'autoroute, en revanche, son espace et sa position haute prennent tout leur sens. Il se loue {price:kia-sorento} DH par jour.",
      "Face au [Volkswagen Tiguan](/catalogue/volkswagen-tiguan), le Sorento mise sur l'espace plus que sur l'image de marque. Il coûte plus cher que le [Dacia Duster](/catalogue/dacia-duster), à {price:dacia-duster} DH, mais il offre la boîte automatique. Pour un grand SUV plus statutaire, regardez le [Volkswagen Touareg](/catalogue/volkswagen-touareg).",
      "Il est proposé en petit nombre : pour un départ en vacances, lancez donc la recherche par dates du catalogue sans attendre.",
    ],
    faq: [
      {
        q: "Le Kia Sorento est-il adapté à une famille nombreuse ?",
        a: "Il a cinq places, avec un grand coffre. Pour un groupe plus important, il faudra en revanche deux véhicules.",
      },
      {
        q: "Le Sorento est-il en diesel et automatique ?",
        a: "Oui, celui de la flotte est un diesel en boîte automatique.",
      },
    ],
  },

  "volkswagen-tiguan": {
    paragraphs: [
      "La location d'un Volkswagen Tiguan à Casablanca donne accès au SUV intermédiaire de la marque : plus spacieux que le T-Roc, mais moins imposant que le Touareg. Il roule au diesel avec une boîte automatique.",
      "Il s'adresse à une famille de quatre personnes avec valises, ou à des amis qui partent vers Marrakech, Essaouira ou Rabat. En ville, sa taille reste raisonnable pour les parkings et le centre. Le Tiguan se loue {price:volkswagen-tiguan} DH par jour.",
      "Comparez-le au [Kia Sorento](/catalogue/kia-sorento), à {price:kia-sorento} DH : les deux sont des SUV diesel automatiques, mais le Sorento garde l'avantage sur l'espace intérieur. En revanche, face à l'[Audi Q3](/catalogue/audi-q3), à {price:audi-q3} DH, il est plus grand, mais moins statutaire.",
      "Si vous hésitez avec le [Volkswagen Touareg](/catalogue/volkswagen-touareg), tout se joue sur les bagages. Avec beaucoup de grandes valises, prenez donc le Touareg, dont le coffre et l'habitacle évitent de trier les affaires.",
    ],
    faq: [
      {
        q: "Le Tiguan est-il en boîte automatique ?",
        a: "Oui, celui de la flotte est un diesel en boîte automatique, avec 5 places.",
      },
      {
        q: "Tiguan ou Touareg, lequel choisir ?",
        a: "Le Tiguan suffit pour quatre personnes et leurs bagages. Le [Touareg](/catalogue/volkswagen-touareg), en revanche, est plus grand, avec plus de place pour les bagages.",
      },
    ],
  },

  "audi-q3": {
    paragraphs: [
      "Pour une location Audi Q3 à Casablanca, vous obtenez un SUV compact premium en diesel. Il existe en boîte automatique et en boîte manuelle selon l'exemplaire, donc précisez votre choix dans la demande.",
      "Louer un Q3 convient à un couple, à un voyageur d'affaires ou à une petite famille, car il se gare facilement et reste plus statutaire qu'un T-Roc. Il fait aussi la route de Marrakech sans difficulté. Comptez {price:audi-q3} DH par jour.",
      "Face à l'[Audi A3](/catalogue/audi-a3), il apporte la hauteur et un coffre plus généreux, mais il coûte {price:audi-q3} DH contre {price:audi-a3} DH. Par rapport au [Porsche Macan](/catalogue/porsche-macan), il est nettement moins cher ({price:porsche-macan} DH pour le Macan). En revanche, face au [Volkswagen Tiguan](/catalogue/volkswagen-tiguan), il est plus compact, mais plus chic. Pour voir toute la gamme, ouvrez la page [location d'Audi à Casablanca](route:audi).",
      "Il existe en plusieurs exemplaires ; la recherche par dates du catalogue montre ceux qui sont libres. Livré à l'hôtel ou à l'aéroport Mohammed V, il est prêt à rouler dès la remise des clés.",
    ],
    faq: [
      {
        q: "L'Audi Q3 est-il en boîte automatique ou manuelle ?",
        a: "Les deux existent dans la flotte ; l'équipe vous propose l'exemplaire libre sur vos dates qui correspond à votre préférence.",
      },
      {
        q: "Le Q3 est-il diesel ?",
        a: "Oui, le Q3 de la flotte est un diesel.",
      },
      {
        q: "Quelle différence entre le Q3 et le Porsche Macan ?",
        a: "Le [Porsche Macan](/catalogue/porsche-macan) roule à l'essence et coûte {price:porsche-macan} DH par jour. Le Q3, de son côté, est un diesel au tarif plus modéré, {price:audi-q3} DH.",
      },
    ],
  },

  "mercedes-cla": {
    paragraphs: [
      "La location d'une Mercedes CLA à Casablanca vous met au volant d'un coupé compact à quatre portes. À l'essence et en boîte automatique, elle donne accès à la marque sans le gabarit des grandes berlines. Elle plaît à celui qui veut une voiture stylée pour un séjour à deux, une arrivée à l'aéroport Mohammed V ou une escapade vers Marrakech.",
      "Sa ligne basse a un revers : l'accès à l'arrière est moins aisé qu'avec une berline classique, et le coffre reste moyen. Elle est donc faite pour deux ou trois passagers. En ville, sa taille reste raisonnable. La CLA est affichée à {price:mercedes-cla} DH par jour.",
      "Face à l'[Audi A3](/catalogue/audi-a3), la CLA a plus de présence et de style, pour {price:mercedes-cla} DH contre {price:audi-a3} DH. La [Mercedes Classe C 220](/catalogue/mercedes-c-220) coûte plus cher ({price:mercedes-c-220} DH) et se montre plus classique, mais elle est aussi plus spacieuse à l'arrière. Les autres modèles de la marque sont sur la page [location de Mercedes à Casablanca](route:mercedes).",
      "La CLA existe en plusieurs exemplaires ; la recherche par dates du catalogue montre ceux qui sont libres.",
    ],
    faq: [
      {
        q: "La Mercedes CLA est-elle en essence ou en diesel ?",
        a: "Elle fonctionne à l'essence, avec une boîte automatique.",
      },
      {
        q: "La CLA est-elle assez spacieuse pour quatre adultes ?",
        a: "Elle a cinq places, mais l'arrière est plus juste que dans une berline classique. Pour quatre adultes avec bagages, la [Classe C 220](/catalogue/mercedes-c-220) ou un SUV offriront donc plus de place.",
      },
    ],
  },

  "volkswagen-touareg": {
    paragraphs: [
      "Pour une location Volkswagen Touareg à Casablanca, vous prenez le grand SUV de la flotte, au diesel et en boîte automatique. Il s'adresse à un groupe ou à une famille avec beaucoup de bagages. Il convient aussi à celui qui veut un SUV haut de gamme sans payer le prix d'un Range Rover Sport. Comptez {price:volkswagen-touareg} DH par jour.",
      "Le Touareg est le modèle le plus nombreux de la flotte. À l'aéroport, il avale valises et passagers, et l'autoroute vers Marrakech est à sa mesure. En ville, il se range avec un peu d'attention, mais sa position haute aide. La recherche par dates du catalogue montre les exemplaires libres sur votre période.",
      "Face au [Volkswagen Tiguan](/catalogue/volkswagen-tiguan), il offre un cran de plus en espace, pour un prix supérieur. Le [Range Rover Evoque](/catalogue/range-rover-evoque), à {price:range-rover-evoque} DH, joue plutôt la carte de l'image, tandis que le Touareg gagne en espace. Quant au [Range Rover Sport](/catalogue/range-rover-sport), il coûte {price:range-rover-sport} DH : le Touareg offre un gabarit proche pour un tarif bien plus bas.",
    ],
    faq: [
      {
        q: "Le Touareg est-il automatique et diesel ?",
        a: "Oui, le Touareg de la flotte roule au diesel, en boîte automatique.",
      },
      {
        q: "Touareg ou Range Rover Evoque ?",
        a: "Le Touareg est plus grand et plus spacieux, alors que l'[Evoque](/catalogue/range-rover-evoque) est plus compact et plus statutaire. Côté tarif, comptez {price:volkswagen-touareg} DH par jour pour le Touareg et {price:range-rover-evoque} DH pour l'Evoque. Voir aussi la page [location de Range Rover à Casablanca](route:range-rover).",
      },
      {
        q: "Le Touareg est-il adapté aux longs trajets ?",
        a: "Oui, c'est un grand SUV diesel fait pour la route. Avant un départ de plusieurs centaines de kilomètres, demandez toutefois à l'équipe le kilométrage inclus.",
      },
    ],
  },

  "range-rover-evoque": {
    paragraphs: [
      "La location d'un Range Rover Evoque à Casablanca vous met au volant du SUV compact de la marque britannique. Il roule au diesel avec une boîte automatique, et sa silhouette basse et urbaine le distingue des SUV plus carrés. On le choisit pour son image autant que pour son agrément, à {price:range-rover-evoque} DH par jour.",
      "Il convient à un couple ou à un voyageur d'affaires qui veut arriver quelque part avec une voiture qui se remarque. En ville, son gabarit reste maniable ; vers Marrakech, il fait aussi l'autoroute sans difficulté. Son coffre est correct, mais pas immense.",
      "Face au [Range Rover Sport](/catalogue/range-rover-sport), l'Evoque coûte beaucoup moins, il est plus petit et plus facile à garer. Le [Volkswagen Touareg](/catalogue/volkswagen-touareg), à {price:volkswagen-touareg} DH, offre plus d'espace : l'Evoque sacrifie donc de la place au profit du prestige. Quant à l'[Audi Q3](/catalogue/audi-q3), à {price:audi-q3} DH, il est moins statutaire.",
      "Il n'y a qu'un exemplaire : la recherche par dates du catalogue vous dit s'il est libre. Pour voir le reste de la gamme, ouvrez la page [location de Range Rover à Casablanca](route:range-rover).",
    ],
    faq: [
      {
        q: "L'Evoque est-il en diesel ?",
        a: "Oui, l'Evoque de la flotte est un diesel avec boîte automatique.",
      },
      {
        q: "Evoque ou Sport : lequel choisir ?",
        a: "L'Evoque convient à la ville et à un voyage à deux ou trois. Le [Sport](/catalogue/range-rover-sport), en revanche, répond mieux aux besoins d'une famille, de bagages ou de longues distances.",
      },
    ],
  },

  "mercedes-c-220": {
    paragraphs: [
      "La location d'une Mercedes Classe C 220 à Casablanca vous donne la berline de référence de la marque : diesel, boîte automatique, sobre. Elle convient aux déplacements professionnels, aux séjours où l'on veut arriver en berline soignée, et aux trajets sur autoroute vers Rabat ou Marrakech. Elle se loue {price:mercedes-c-220} DH par jour.",
      "Son format reste raisonnable en ville, ce qui la distingue de la Classe E. À l'arrière, deux adultes sont à l'aise, et le coffre suffit pour des valises de séjour.",
      "Face à la [Mercedes CLA](/catalogue/mercedes-cla), elle est plus classique, plus spacieuse et en diesel, mais elle coûte plus cher ({price:mercedes-cla} DH pour la CLA). La [Mercedes Classe E 220](/catalogue/mercedes-e-220) est plus grande et plus chère ({price:mercedes-e-220} DH).",
      "La Classe C n'existe qu'en un exemplaire : vérifiez donc vos dates dans le catalogue. Elle convient aussi bien à un séjour de deux semaines qu'à un déplacement de cinq jours, et l'hôtel comme l'aéroport Mohammed V sont desservis sans frais.",
    ],
    faq: [
      {
        q: "La Classe C 220 est-elle diesel ?",
        a: "Oui, elle est en diesel avec une boîte automatique.",
      },
      {
        q: "Classe C ou Classe E ?",
        a: "La Classe C se manie mieux en ville, alors que la [Classe E](/catalogue/mercedes-e-220) est plus grande, avec plus de place à l'arrière. Pour comparer, ouvrez la page [location de Mercedes à Casablanca](route:mercedes).",
      },
    ],
  },

  "mercedes-e-220": {
    paragraphs: [
      "La location d'une Mercedes Classe E 220 à Casablanca vous donne la grande berline de la flotte : diesel, boîte automatique. On la loue pour les longs trajets et pour les rendez-vous où l'image compte. Elle convient aussi aux arrivées à l'aéroport Mohammed V, quand on veut de la place dès la sortie du terminal. Comptez {price:mercedes-e-220} DH par jour pour cette Classe E.",
      "À l'arrière, trois personnes tiennent mieux que dans une Classe C. En ville, en revanche, sa longueur demande de la prudence dans les rues étroites et au moment de se garer.",
      "Face à la [Mercedes Classe C 220](/catalogue/mercedes-c-220), elle apporte de l'espace et de la présence, mais elle coûte davantage. Le [Range Rover Sport](/catalogue/range-rover-sport) coûte plus cher encore ; la Classe E est le choix berline, le Sport le choix SUV.",
      "Elle n'existe qu'en un exemplaire : la recherche par dates du catalogue vous dit si elle est libre. La livraison à l'hôtel ou à l'aéroport reste gratuite à Casablanca, tous les jours de 8h à 22h.",
    ],
    faq: [
      {
        q: "La Classe E est-elle plus confortable que la Classe C ?",
        a: "Oui, elle est plus grande et plus spacieuse, surtout à l'arrière. La [Classe C](/catalogue/mercedes-c-220), de son côté, est plus maniable en ville.",
      },
      {
        q: "Peut-on louer la Classe E pour un événement ?",
        a: "Oui, elle se loue comme les autres modèles, pour 5 jours minimum. Précisez l'occasion dans la demande, puis l'équipe vous répond sur WhatsApp.",
      },
      {
        q: "Quel âge faut-il pour louer une Mercedes Classe E ?",
        a: "Le conducteur a 21 ans minimum et un permis de plus de 2 ans.",
      },
    ],
  },

  "porsche-macan": {
    paragraphs: [
      "Pour louer un Porsche Macan à Casablanca, vous choisissez le SUV sportif de la flotte : essence, boîte automatique, cinq places. Il se conduit comme une berline vive plutôt que comme un SUV haut, ce qui le distingue des autres modèles proposés. Le Macan se loue à {price:porsche-macan} DH par jour.",
      "On le choisit pour une occasion précise : des vacances à deux ou un séjour où l'on veut se faire plaisir. La route de Casablanca à Marrakech lui convient aussi. Un budget plus serré se tournera en revanche vers l'[Audi Q3](/catalogue/audi-q3), à {price:audi-q3} DH par jour.",
      "Face au [Range Rover Evoque](/catalogue/range-rover-evoque), à {price:range-rover-evoque} DH, le Macan coûte plus cher et roule à l'essence, alors que l'Evoque est un diesel. Le [Volkswagen Touareg](/catalogue/volkswagen-touareg), à {price:volkswagen-touareg} DH, est moins cher et plus spacieux ; le Macan, lui, mise sur la conduite. La page [location de Porsche à Casablanca](route:porsche) détaille ses usages.",
      "Plusieurs exemplaires sont proposés, et la livraison se fait à l'hôtel, à l'adresse de votre choix ou à l'aéroport Mohammed V.",
    ],
    faq: [
      {
        q: "Le Macan est-il en essence ?",
        a: "Oui, le Porsche Macan de la flotte fonctionne à l'essence, avec boîte automatique.",
      },
      {
        q: "Y a-t-il d'autres Porsche dans la flotte ?",
        a: "Non, le Macan est le seul modèle Porsche proposé. La page [location de Porsche à Casablanca](route:porsche) en détaille l'usage.",
      },
      {
        q: "À partir de quel âge peut-on louer le Macan ?",
        a: "Le Macan se loue dès 21 ans, avec un permis de plus de 2 ans. L'équipe précise par ailleurs la caution avant la réservation.",
      },
    ],
  },

  "range-rover-sport": {
    paragraphs: [
      "La location d'un Range Rover Sport à Casablanca vous met au volant du modèle le plus haut de gamme de la flotte. C'est un grand SUV diesel, en boîte automatique, avec cinq places. Son tarif est de {price:range-rover-sport} DH par jour, ce qui le place en haut de la grille de l'agence.",
      "On le loue pour une arrivée marquante à l'aéroport Mohammed V ou pour un mariage. Il sert aussi aux voyages où la famille ou le groupe doit être à l'aise, ou simplement au plaisir de rouler dans un SUV de cette catégorie. L'autoroute vers Marrakech est à sa mesure. En ville, sa taille impose cependant de la prudence pour se garer.",
      "Face au [Range Rover Evoque](/catalogue/range-rover-evoque), il est plus grand et beaucoup plus cher. Le [Volkswagen Touareg](/catalogue/volkswagen-touareg) n'a pas le prestige de la marque, mais il offre un gabarit comparable pour {price:volkswagen-touareg} DH par jour. Les autres modèles de la marque sont sur la page [location de Range Rover à Casablanca](route:range-rover).",
      "Il n'existe qu'en deux exemplaires : vérifiez vos dates dans le catalogue. L'équipe confirme ensuite sur WhatsApp et livre la voiture à l'adresse de votre choix.",
    ],
    faq: [
      {
        q: "Le Range Rover Sport est-il diesel ?",
        a: "Oui, il est en diesel avec boîte automatique.",
      },
      {
        q: "Pourquoi le Sport coûte-t-il plus cher que l'Evoque ?",
        a: "Il est plus grand et plus haut de gamme. Pour avoir la marque à un tarif plus bas, voyez donc l'[Evoque](/catalogue/range-rover-evoque).",
      },
      {
        q: "Est-il adapté à un long voyage ?",
        a: "Oui, c'est l'un de ses usages naturels. Avant un départ de plusieurs centaines de kilomètres, demandez toutefois le kilométrage inclus à l'équipe.",
      },
      {
        q: "Quel âge minimum pour conduire un Range Rover Sport ?",
        a: "Le conducteur doit avoir 21 ans, avec un permis de plus de 2 ans. La caution, quant à elle, dépend du véhicule.",
      },
    ],
  },
};

export default copy;
