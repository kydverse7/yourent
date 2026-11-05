import type { ModelCopy } from '../types';

/** Texte unique par modèle, indexé par slug (ex. « porsche-macan »). */
const copy: Record<string, ModelCopy> = {
  "fiat-500": {
    paragraphs: [
      "La Fiat 500 est faite pour la ville. Courte et facile à garer, elle se glisse dans les places que les autres laissent, ce qui change tout dans le Maarif, à Gauthier ou près de la Corniche un soir d'été. Elle convient à une personne seule ou à un couple qui se déplace surtout en ville, avec des bagages légers.",
      "Elle roule à l'essence et se conduit en boîte manuelle : si vous n'avez l'habitude que de l'automatique, regardez plutôt la [Fiat 500 Cabriolet](/catalogue/fiat-500-cabriolet). Son coffre reste modeste, donc oubliez les grandes valises. Pour quatre personnes ou une arrivée à l'aéroport chargée, l'[Opel Corsa](/catalogue/opel-corsa) offre un peu plus de place, à {price:opel-corsa} DH par jour contre {price:fiat-500} DH pour la 500.",
      "Pour un trajet vers Marrakech, elle fait le travail à condition de voyager léger. L'équipe vous la livre à l'hôtel ou à l'aéroport Mohammed V. Elle consomme peu d'essence : pour des trajets courts et répétés, c'est la voiture la plus simple à vivre de la flotte.",
    ],
    faq: [
      {
        q: "La Fiat 500 est-elle en boîte automatique ?",
        a: "Non, la Fiat 500 est en boîte manuelle. La [Fiat 500 Cabriolet](/catalogue/fiat-500-cabriolet) est la version automatique de la flotte.",
      },
      {
        q: "Peut-on partir à Marrakech avec une Fiat 500 ?",
        a: "Oui, à deux et avec peu de bagages. Pour plus de confort sur autoroute, une [Volkswagen Golf 8](/catalogue/volkswagen-golf-8) est plus à l'aise.",
      },
    ],
  },

  "opel-corsa": {
    paragraphs: [
      "L'Opel Corsa est la citadine qu'on loue sans se poser de question : discrète, simple, sans fausse note. Elle se conduit en boîte manuelle et roule à l'essence, avec un coffre plus utile qu'une Fiat 500 pour des bagages de séjour classique.",
      "Elle s'adresse à celui qui cherche un des tarifs les plus bas de la flotte, {price:opel-corsa} DH par jour, sans renoncer à quatre vraies portes et à une banquette arrière correcte pour deux passagers. À Casablanca, elle passe partout : parkings du centre, rues étroites de l'ancienne médina, boulevards aux heures de pointe.",
      "Sur la route, elle est dans son élément pour des trajets de quelques heures. Pour un long parcours avec plusieurs passagers, le [Dacia Duster](/catalogue/dacia-duster) apporte plus d'espace et une garde au sol plus haute. Si vous préférez une boîte automatique pour la ville, la [Toyota Corolla](/catalogue/toyota-corolla) est un cran au-dessus en confort.",
      "La livraison à l'hôtel ou à l'aéroport Mohammed V est gratuite à Casablanca.",
    ],
    faq: [
      {
        q: "L'Opel Corsa est-elle en boîte manuelle ?",
        a: "Oui, la Corsa de la flotte est en boîte manuelle et à l'essence. Pour l'automatique, regardez la [Toyota Corolla](/catalogue/toyota-corolla).",
      },
      {
        q: "L'Opel Corsa est-elle adaptée à une famille ?",
        a: "Pour deux adultes et deux enfants avec des valises légères, oui. Au-delà, le [Dacia Duster](/catalogue/dacia-duster) est plus à l'aise.",
      },
    ],
  },

  "fiat-500-cabriolet": {
    paragraphs: [
      "La Fiat 500 Cabriolet reste une petite citadine, mais décapotable. Dans notre catalogue elle est classée en premium, sans pour autant être une voiture de prestige : on la loue pour le plaisir de rouler toit ouvert sur la Corniche ou la route côtière vers Mohammedia, pas pour son standing.",
      "Elle roule à l'essence avec une boîte automatique, ce qui la rend confortable dans les embouteillages de Casablanca. Le coffre est petit : c'est une voiture pour deux, avec deux sacs de voyage.",
      "Face à la [Fiat 500](/catalogue/fiat-500) classique, elle coûte {price:fiat-500-cabriolet} DH par jour contre {price:fiat-500} DH, et apporte l'automatique et le toit ouvrant. Si vous voulez simplement une voiture de ville pas chère, l'[Opel Corsa](/catalogue/opel-corsa) fait le travail à {price:opel-corsa} DH par jour. Mais si l'idée est de s'offrir un séjour en été avec l'air libre, elle n'a pas d'équivalent dans la flotte.",
      "Elle est proposée en très peu d'exemplaires : prévoyez votre demande tôt.",
    ],
    faq: [
      {
        q: "La Fiat 500 Cabriolet est-elle une voiture de luxe ?",
        a: "Non. C'est une petite citadine décapotable, classée premium dans le catalogue pour son côté plaisir. Pour une vraie voiture de prestige, voyez la page [location de voiture de luxe](route:luxe).",
      },
      {
        q: "Convient-elle à un long trajet ?",
        a: "Elle fait le trajet pour deux personnes à bagages réduits, mais elle est plus bruyante et moins stable sur autoroute qu'une berline. Pour un long parcours, préférez une [Toyota Corolla](/catalogue/toyota-corolla).",
      },
      {
        q: "Peut-on réserver la Cabriolet à l'avance ?",
        a: "Oui, et c'est conseillé, car elle est proposée en très peu d'exemplaires. La recherche par dates du catalogue indique si elle est libre.",
      },
    ],
  },

  "dacia-duster": {
    paragraphs: [
      "Le Dacia Duster est le SUV le plus abordable de la flotte, à {price:dacia-duster} DH par jour. Il roule au diesel et se conduit en boîte manuelle, ce qui le réserve aux conducteurs à l'aise avec l'embrayage. En échange, il offre de l'espace, un grand coffre et une hauteur de caisse bienvenue sur les routes de campagne.",
      "C'est le bon choix pour une famille qui veut partir en week-end sans dépenser autant qu'avec un grand SUV, ou pour un groupe d'amis qui descend vers Essaouira ou Marrakech avec des sacs. Il consomme peu en diesel sur autoroute et ne demande pas qu'on le ménage.",
      "Il est présent en plusieurs exemplaires, ce qui rend la disponibilité plus simple que sur les modèles rares.",
      "Face au [Volkswagen T-Roc](/catalogue/volkswagen-t-roc), le Duster est moins raffiné et plus rustique, mais coûte {price:dacia-duster} DH par jour contre {price:volkswagen-t-roc} DH. Face au [Kia Sorento](/catalogue/kia-sorento), il manque d'automatique et de finition, mais ne coûte que {price:dacia-duster} DH contre {price:kia-sorento} DH. En ville, il reste un peu volumineux : pour la circulation du centre, une [Opel Corsa](/catalogue/opel-corsa) est plus pratique.",
    ],
    faq: [
      {
        q: "Le Dacia Duster existe-t-il en boîte automatique ?",
        a: "Non, celui de la flotte est en boîte manuelle et en diesel. Pour un SUV automatique, regardez le [Volkswagen T-Roc](/catalogue/volkswagen-t-roc).",
      },
      {
        q: "Le Duster convient-il à une famille de cinq personnes ?",
        a: "Oui, il a cinq places et un coffre large. C'est l'un des SUV les mieux adaptés à une famille avec un budget serré.",
      },
    ],
  },

  "toyota-corolla": {
    paragraphs: [
      "La Toyota Corolla est la berline tranquille de la flotte : hybride, boîte automatique, confortable et sans histoire. Elle s'adresse à celui qui veut conduire sans y penser, que ce soit pour rentrer de l'aéroport Mohammed V avec ses valises ou pour enchaîner des rendez-vous dans Casablanca.",
      "Le fonctionnement hybride convient bien à la circulation en ville, avec ses arrêts et ses redémarrages. Sur autoroute vers Rabat ou Marrakech, elle reste souple et peu fatigante. Son coffre accueille sans souci les bagages d'un séjour pour deux ou trois personnes.",
      "À {price:toyota-corolla} DH par jour, elle se compare au [Volkswagen T-Roc](/catalogue/volkswagen-t-roc), affiché à {price:volkswagen-t-roc} DH. Choisissez le T-Roc pour la position haute d'un SUV, la Corolla pour le confort d'une berline. Face à l'[Audi A3](/catalogue/audi-a3), elle est moins statutaire, mais plus sobre et plus souple en ville.",
      "C'est un choix sensé pour une location de plusieurs semaines : un modèle fiable et simple à vivre au quotidien.",
    ],
    faq: [
      {
        q: "La Toyota Corolla est-elle hybride ?",
        a: "Oui, la Corolla de la flotte est une hybride en boîte automatique, avec 5 places.",
      },
      {
        q: "Est-elle adaptée à une location longue durée ?",
        a: "Oui. Le tarif baisse automatiquement au-delà de 10 jours, et la Corolla est l'une des voitures les plus confortables au quotidien. Voyez la page [location longue durée](route:longue-duree).",
      },
    ],
  },

  "volkswagen-t-roc": {
    paragraphs: [
      "Le Volkswagen T-Roc est un SUV compact à l'essence, en boîte automatique. Plus haut qu'une berline, plus court qu'un grand SUV, il convient à un couple ou à une petite famille qui veut une voiture facile en ville et crédible sur la route.",
      "À Casablanca, il se gare sans difficulté et offre une bonne visibilité dans le trafic. Pour aller à Marrakech ou à Rabat, il tient bien l'autoroute et laisse assez de place pour les bagages de trois ou quatre jours. Il ne cherche pas à épater : c'est une valeur sûre, avec un tarif de {price:volkswagen-t-roc} DH par jour.",
      "Comparez-le au [Dacia Duster](/catalogue/dacia-duster) si le budget prime : le Duster est plus spacieux et moins cher, mais en diesel et boîte manuelle. Comparez-le au [Volkswagen Tiguan](/catalogue/volkswagen-tiguan) si vous voyagez à quatre avec des valises, car le Tiguan offre davantage d'espace à {price:volkswagen-tiguan} DH par jour.",
      "Il existe en plusieurs exemplaires, ce qui facilite la réservation en haute saison.",
    ],
    faq: [
      {
        q: "Le T-Roc est-il en diesel ou en essence ?",
        a: "Le T-Roc de la flotte fonctionne à l'essence, avec boîte automatique.",
      },
      {
        q: "Quelle différence avec le Tiguan ?",
        a: "Le [Tiguan](/catalogue/volkswagen-tiguan) est plus grand, en diesel, et plus adapté à une famille avec beaucoup de bagages. Le T-Roc est plus compact et plus simple à garer.",
      },
    ],
  },

  "audi-a3": {
    paragraphs: [
      "L'Audi A3 est une compacte premium : elle donne l'allure d'une voiture soignée sans le gabarit d'une grande berline. Elle roule à l'essence, avec boîte automatique, et se conduit avec précision en ville comme sur autoroute.",
      "Elle plaît à celui qui a un rendez-vous professionnel à Casablanca ou qui veut simplement une voiture plus raffinée qu'une citadine. À deux ou trois personnes, elle est parfaite pour un trajet vers Rabat, Mohammedia ou Marrakech. À quatre avec les valises, vous serez à l'étroit.",
      "Elle est à {price:audi-a3} DH par jour, à comparer avec les {price:volkswagen-golf-8} DH de la [Volkswagen Golf 8](/catalogue/volkswagen-golf-8) : la Golf est plus polyvalente et existe en plusieurs boîtes, l'A3 a une finition et une image de marque plus haut de gamme. Face à la [Mercedes CLA](/catalogue/mercedes-cla), elle est plus sobre et moins chère.",
      "Elle est proposée en très peu d'exemplaires. Faites votre demande avec vos dates dès que possible.",
    ],
    faq: [
      {
        q: "L'Audi A3 est-elle en boîte automatique ?",
        a: "Oui, l'A3 de la flotte est en boîte automatique et à l'essence. Pour une Audi en boîte manuelle, regardez l'[Audi Q3](/catalogue/audi-q3).",
      },
      {
        q: "Peut-on voyager à quatre en Audi A3 ?",
        a: "Oui, elle a cinq places, mais le coffre et la banquette arrière restent compacts. Pour quatre voyageurs avec valises, un SUV comme le [Volkswagen Tiguan](/catalogue/volkswagen-tiguan) est plus confortable.",
      },
    ],
  },

  "volkswagen-golf-8": {
    paragraphs: [
      "La Volkswagen Golf 8 est la compacte polyvalente de la flotte. Elle existe en diesel ou en essence, en boîte automatique ou manuelle, selon l'exemplaire : indiquez votre préférence dans la demande, l'équipe vous propose la voiture libre qui correspond.",
      "Elle convient à presque tous les usages : une arrivée à l'aéroport Mohammed V, un séjour de deux semaines à Casablanca, un aller-retour à Marrakech. À quatre elle reste correcte pour un trajet court, et à deux elle est très à l'aise. Son prix est de {price:volkswagen-golf-8} DH par jour.",
      "Comparée à la [Toyota Corolla](/catalogue/toyota-corolla), la Golf est plus vive à conduire, la Corolla plus souple et hybride. Comparée au [Volkswagen T-Roc](/catalogue/volkswagen-t-roc), elle est plus compacte et plus facile à garer, mais moins haute : choisissez le T-Roc si vous tenez à la position haute.",
      "C'est le choix le plus rationnel de la flotte pour qui ne veut pas de SUV et ne veut pas d'une simple citadine.",
    ],
    faq: [
      {
        q: "La Golf 8 est-elle en diesel ou en essence ?",
        a: "Les deux motorisations existent dans la flotte, selon l'exemplaire. Précisez votre préférence dans la demande de réservation.",
      },
      {
        q: "Peut-on avoir la Golf 8 en boîte manuelle ?",
        a: "Oui, la Golf 8 existe en boîte manuelle comme en automatique. L'équipe confirme l'exemplaire disponible sur vos dates.",
      },
      {
        q: "La Golf 8 est-elle plus confortable que la Toyota Corolla ?",
        a: "Elle est plus dynamique, la [Toyota Corolla](/catalogue/toyota-corolla) plus douce et hybride. Le choix tient à votre style de conduite.",
      },
    ],
  },

  "kia-sorento": {
    paragraphs: [
      "Le Kia Sorento est le SUV familial de la flotte : grand, diesel, boîte automatique, cinq places confortables et un vrai coffre. Il convient à une famille qui voyage avec ses bagages, à un groupe qui rejoint Marrakech ou Agadir, ou à quelqu'un qui veut simplement s'installer haut et rouler tranquille.",
      "À Casablanca, son gabarit demande un peu d'attention dans les rues étroites, mais il rassure dans la circulation dense. Sur autoroute, il est stable et posé. Il coûte {price:kia-sorento} DH par jour.",
      "Face au [Volkswagen Tiguan](/catalogue/volkswagen-tiguan), le Sorento mise sur l'espace et le confort plus que sur l'image de marque. Face au [Dacia Duster](/catalogue/dacia-duster), il est plus cher ({price:dacia-duster} DH pour le Duster), mais en boîte automatique et mieux fini. Si vous voulez un grand SUV plus statutaire, regardez le [Volkswagen Touareg](/catalogue/volkswagen-touareg).",
      "Il est proposé en nombre limité : réservez tôt pour un départ en vacances. À Casablanca, comptez un peu plus de temps pour vous garer ; sur la route, sa position haute rend les longs trajets moins fatigants.",
    ],
    faq: [
      {
        q: "Le Kia Sorento est-il adapté à une famille nombreuse ?",
        a: "Il a cinq places, avec un coffre confortable. Pour un groupe plus important, il faudra deux véhicules.",
      },
      {
        q: "Le Sorento est-il en diesel et automatique ?",
        a: "Oui, celui de la flotte est un diesel en boîte automatique.",
      },
    ],
  },

  "volkswagen-tiguan": {
    paragraphs: [
      "Le Volkswagen Tiguan est le SUV intermédiaire de la marque : plus spacieux que le T-Roc, moins imposant que le Touareg. Il roule au diesel avec une boîte automatique, ce qui en fait une voiture reposante pour un long trajet.",
      "Il s'adresse à une famille de quatre personnes avec valises, ou à des amis qui partent en week-end vers Marrakech, Essaouira ou Rabat. À Casablanca, sa taille reste raisonnable pour les parkings et le centre. Son tarif est de {price:volkswagen-tiguan} DH par jour.",
      "Comparez-le au [Kia Sorento](/catalogue/kia-sorento), à {price:kia-sorento} DH : le Tiguan a l'image et la conduite plus affûtée d'une Volkswagen, le Sorento plus d'espace intérieur. Comparez-le aussi à l'[Audi Q3](/catalogue/audi-q3), à {price:audi-q3} DH, plus compact et plus statutaire.",
      "Si vous vous demandez entre le Tiguan et le [Volkswagen Touareg](/catalogue/volkswagen-touareg), posez-vous la question des bagages : au-delà de quatre grandes valises, prenez le Touareg. Son coffre et son habitacle permettent sinon de partir sans trier les affaires.",
    ],
    faq: [
      {
        q: "Le Tiguan est-il en boîte automatique ?",
        a: "Oui, celui de la flotte est un diesel en boîte automatique, avec 5 places.",
      },
      {
        q: "Tiguan ou Touareg, lequel choisir ?",
        a: "Le Tiguan suffit pour quatre personnes et leurs bagages. Le [Touareg](/catalogue/volkswagen-touareg) est plus grand et plus confortable pour de longs trajets chargés.",
      },
    ],
  },

  "audi-q3": {
    paragraphs: [
      "L'Audi Q3 est un SUV compact premium en diesel. Il existe en boîte automatique et en boîte manuelle selon l'exemplaire, : précisez votre choix dans la demande.",
      "Il convient à un couple, à un voyageur d'affaires ou à une petite famille qui veut un SUV facile à garer à Casablanca, plus statutaire qu'un T-Roc. Sur la route de Marrakech, le diesel donne de l'aisance, et la position haute rend le trajet moins fatigant. Il est à {price:audi-q3} DH par jour.",
      "Face à l'[Audi A3](/catalogue/audi-a3), il apporte la hauteur et un coffre plus généreux pour {price:audi-q3} DH contre {price:audi-a3} DH. Face à la [Porsche Macan](/catalogue/porsche-macan), il est moins cher, plus raisonnable et moins sportif. Face au [Volkswagen Tiguan](/catalogue/volkswagen-tiguan), il est plus compact mais plus chic.",
      "Plusieurs exemplaires existent, ce qui laisse de la marge pour réserver. Livré à l'hôtel ou à l'aéroport Mohammed V, il est prêt à rouler dès la remise des clés.",
    ],
    faq: [
      {
        q: "L'Audi Q3 est-il en boîte automatique ou manuelle ?",
        a: "Les deux existent dans la flotte. L'équipe vous propose l'exemplaire libre sur vos dates qui correspond à votre préférence.",
      },
      {
        q: "Le Q3 est-il diesel ?",
        a: "Oui, le Q3 de la flotte est un diesel.",
      },
      {
        q: "Quelle différence entre le Q3 et la Porsche Macan ?",
        a: "La [Porsche Macan](/catalogue/porsche-macan) est une essence plus sportive et plus chère. Le Q3 est un SUV plus sobre, en diesel, au tarif plus modéré.",
      },
    ],
  },

  "mercedes-cla": {
    paragraphs: [
      "La Mercedes CLA est un coupé compact à quatre portes. À l'essence et en boîte automatique, elle donne l'accès à la marque à Casablanca sans le gabarit des grandes berlines. Elle plaît à celui qui veut une voiture stylée pour un séjour à deux, une arrivée à l'aéroport Mohammed V ou un week-end vers Marrakech.",
      "Sa ligne basse a un revers : l'accès à l'arrière est moins aisé qu'avec une berline classique et le coffre reste moyen. Elle est faite pour deux ou trois passagers. En ville, sa taille reste raisonnable. Elle est à {price:mercedes-cla} DH par jour.",
      "Face à l'[Audi A3](/catalogue/audi-a3), elle a plus de présence et plus de style, pour {price:mercedes-cla} DH contre {price:audi-a3} DH. Face à la [Mercedes Classe C 220](/catalogue/mercedes-c-220), elle est moins chère ({price:mercedes-c-220} DH pour la Classe C), plus sportive et plus jeune d'allure, mais moins spacieuse, notamment pour les passagers arrière.",
      "Elle existe en plusieurs exemplaires, ce qui en fait la Mercedes la plus facile à réserver.",
    ],
    faq: [
      {
        q: "La Mercedes CLA est-elle en essence ou en diesel ?",
        a: "Elle fonctionne à l'essence, avec une boîte automatique.",
      },
      {
        q: "La CLA est-elle assez spacieuse pour quatre adultes ?",
        a: "Elle a cinq places, mais l'arrière est plus juste que dans une berline classique. Pour quatre adultes avec bagages, la [Classe C 220](/catalogue/mercedes-c-220) ou un SUV sont plus confortables.",
      },
    ],
  },

  "volkswagen-touareg": {
    paragraphs: [
      "Le Volkswagen Touareg est le grand SUV de la flotte, au diesel et en boîte automatique. Il s'adresse à un groupe, à une famille avec beaucoup de bagages ou à celui qui veut un SUV haut de gamme sans passer au prix d'une Range Rover. Il est à {price:volkswagen-touareg} DH par jour.",
      "C'est l'un des modèles les mieux représentés de la flotte, ce qui reflète sa polyvalence : à l'aéroport, il avale valises et passagers ; sur l'autoroute vers Marrakech, il file en silence ; en ville, il se range avec un peu d'attention, mais sa visibilité aide. Il est proposé en grand nombre, la disponibilité y est donc plus simple.",
      "Face au [Volkswagen Tiguan](/catalogue/volkswagen-tiguan), il offre un cran de plus en espace et en confort pour un prix supérieur. Face à la [Range Rover Evoque](/catalogue/range-rover-evoque), à {price:range-rover-evoque} DH, il est plus spacieux alors que l'Evoque joue la carte de l'image. Face à la [Range Rover Sport](/catalogue/range-rover-sport), il est bien moins cher ({price:range-rover-sport} DH pour la Sport) et suffit largement pour la plupart des voyages.",
    ],
    faq: [
      {
        q: "Le Touareg est-il automatique et diesel ?",
        a: "Oui, celui de la flotte est un diesel en boîte automatique, avec 5 places.",
      },
      {
        q: "Touareg ou Range Rover Evoque ?",
        a: "Le Touareg est plus grand et plus spacieux, l'[Evoque](/catalogue/range-rover-evoque) plus compact et plus statutaire. Le tarif est proche : comparez sur la page [location Range Rover](route:range-rover).",
      },
      {
        q: "Le Touareg est-il adapté aux longs trajets ?",
        a: "C'est l'un de ses points forts : stable, silencieux et confortable. Demandez à l'équipe le kilométrage inclus avant un départ de plusieurs centaines de kilomètres.",
      },
    ],
  },

  "range-rover-evoque": {
    paragraphs: [
      "La Range Rover Evoque est le SUV compact de la marque britannique. Elle roule au diesel avec une boîte automatique, et sa silhouette basse et urbaine la distingue des SUV plus carrés. On la choisit pour son image autant que pour son agrément, à un tarif de {price:range-rover-evoque} DH par jour.",
      "Elle convient à un couple ou à un voyageur d'affaires qui veut arriver quelque part avec une voiture qui se remarque. À Casablanca, son gabarit reste maniable ; vers Marrakech, elle tient bien la route et sa position haute fatigue peu. Son coffre est correct mais pas immense.",
      "Face à la [Range Rover Sport](/catalogue/range-rover-sport), elle est beaucoup moins chère, plus petite et plus facile à garer. Face au [Volkswagen Touareg](/catalogue/volkswagen-touareg), à {price:volkswagen-touareg} DH, elle sacrifie de l'espace pour le prestige. Face à l'[Audi Q3](/catalogue/audi-q3), elle est plus chère ({price:audi-q3} DH pour le Q3) et plus statutaire.",
      "Elle est proposée en très peu d'exemplaires. Une demande anticipée est conseillée.",
    ],
    faq: [
      {
        q: "L'Evoque est-elle en diesel ?",
        a: "Oui, l'Evoque de la flotte est un diesel avec boîte automatique.",
      },
      {
        q: "Evoque ou Sport : lequel choisir ?",
        a: "L'Evoque pour la ville et un voyage à deux ou trois. La [Sport](/catalogue/range-rover-sport) pour la famille, les bagages et les longues distances.",
      },
    ],
  },

  "mercedes-c-220": {
    paragraphs: [
      "La Mercedes Classe C 220 est la berline de référence de la marque : diesel, boîte automatique, sobre et confortable. Elle convient aux déplacements professionnels, aux séjours à Casablanca où l'on veut arriver en berline soignée et aux trajets sur autoroute vers Rabat ou Marrakech. Elle est à {price:mercedes-c-220} DH par jour.",
      "Son format reste raisonnable en ville, ce qui la distingue de la Classe E. À l'arrière, deux adultes sont à l'aise. Le coffre suffit pour des valises de séjour.",
      "Face à la [Mercedes CLA](/catalogue/mercedes-cla), elle est plus classique, plus spacieuse et en diesel, mais plus chère ({price:mercedes-cla} DH pour la CLA). Face à la [Mercedes Classe E 220](/catalogue/mercedes-e-220), elle est moins grande et moins chère, mais le confort reste proche pour la plupart des trajets.",
      "La Classe C est proposée en très peu d'exemplaires. Demandez vos dates tôt : la livraison à l'hôtel ou à l'aéroport Mohammed V est gratuite à Casablanca, et elle convient aussi bien à un séjour de deux semaines qu'à un déplacement de cinq jours.",
    ],
    faq: [
      {
        q: "La Classe C 220 est-elle diesel ?",
        a: "Oui, elle est en diesel avec une boîte automatique.",
      },
      {
        q: "Classe C ou Classe E ?",
        a: "La Classe C est plus maniable en ville. La [Classe E](/catalogue/mercedes-e-220) est plus grande et plus reposante en voyage. Comparez sur la page [location Mercedes](route:mercedes).",
      },
    ],
  },

  "mercedes-e-220": {
    paragraphs: [
      "La Mercedes Classe E 220 est la grande berline de la flotte : diesel, boîte automatique, très confortable. On la loue pour les longs trajets, les rendez-vous où l'image compte et les arrivées à l'aéroport Mohammed V où l'on veut être transporté plutôt que de conduire. Elle est à {price:mercedes-e-220} DH par jour.",
      "Sur l'autoroute, c'est la plus reposante des Mercedes que nous proposons. À l'arrière, trois personnes tiennent mieux que dans une Classe C. En ville, sa longueur demande de la prudence dans les rues étroites, mais les parkings du centre-ville et des hôtels l'acceptent sans problème.",
      "Face à la [Mercedes Classe C 220](/catalogue/mercedes-c-220), elle apporte de l'espace et de la présence, pour plus cher. Face à la [Range Rover Sport](/catalogue/range-rover-sport), elle est bien moins chère et plus basse, avec un confort de berline plutôt que de SUV.",
      "Elle est proposée en très peu d'exemplaires. La livraison à l'hôtel ou à l'aéroport est gratuite à Casablanca, tous les jours de 8h à 22h.",
    ],
    faq: [
      {
        q: "La Classe E est-elle plus confortable que la Classe C ?",
        a: "Oui, elle est plus grande et plus spacieuse, surtout à l'arrière. La [Classe C](/catalogue/mercedes-c-220) est plus maniable en ville.",
      },
      {
        q: "Peut-on louer la Classe E pour un événement ?",
        a: "Oui, elle se loue comme les autres modèles. La location démarre à 5 jours. Précisez l'occasion dans la demande : l'équipe vous répond sur WhatsApp.",
      },
    ],
  },

  "porsche-macan": {
    paragraphs: [
      "La Porsche Macan est le SUV sportif de la flotte : essence, boîte automatique, cinq places. Elle se conduit comme une berline vive plutôt que comme un SUV haut, ce qui la distingue de tous les autres modèles proposés. Elle est à {price:porsche-macan} DH par jour.",
      "On la choisit pour une occasion précise : un week-end à deux, un séjour où l'on veut se faire plaisir, une route comme celle de Casablanca à Marrakech qu'elle avale avec aisance. Elle n'est pas pensée pour économiser : un budget serré se tournera vers l'[Audi Q3](/catalogue/audi-q3), plus raisonnable.",
      "Face à la [Range Rover Evoque](/catalogue/range-rover-evoque), elle est plus sportive et plus dynamique ; l'Evoque est plus calme et plus statutaire. Face au [Volkswagen Touareg](/catalogue/volkswagen-touareg), à {price:volkswagen-touareg} DH, elle est plus chère et moins spacieuse, mais bien plus excitante à conduire.",
      "Plusieurs exemplaires sont disponibles. La livraison se fait à l'hôtel ou à l'aéroport Mohammed V.",
    ],
    faq: [
      {
        q: "La Macan est-elle en essence ?",
        a: "Oui, la Porsche Macan de la flotte fonctionne à l'essence, avec boîte automatique.",
      },
      {
        q: "Y a-t-il d'autres Porsche dans la flotte ?",
        a: "Non, la Macan est le seul modèle Porsche proposé. La page [location Porsche](route:porsche) en détaille l'usage.",
      },
    ],
  },

  "range-rover-sport": {
    paragraphs: [
      "La Range Rover Sport est le véhicule le plus prestigieux de la flotte : grand SUV diesel, boîte automatique, cinq places et un niveau de confort au sommet de la gamme. Elle est à {price:range-rover-sport} DH par jour, le haut de la grille tarifaire de l'agence.",
      "On la loue pour une arrivée marquante à l'aéroport Mohammed V, un mariage, un voyage où la famille ou le groupe doit voyager à l'aise, ou simplement pour le plaisir de rouler dans un SUV de cette catégorie. Sur l'autoroute vers Marrakech, c'est une voiture qui absorbe les kilomètres. En ville, sa taille impose de la prudence aux stationnements.",
      "Face à la [Range Rover Evoque](/catalogue/range-rover-evoque), elle est plus grande, plus confortable et beaucoup plus chère. Face au [Volkswagen Touareg](/catalogue/volkswagen-touareg), elle apporte le prestige de la marque, pas forcément plus d'espace utile : si le budget compte, le Touareg fait presque autant.",
      "Très peu d'exemplaires : demandez vos dates tôt. L'équipe confirme sur WhatsApp et livre la voiture à l'adresse de votre choix.",
    ],
    faq: [
      {
        q: "La Range Rover Sport est-elle diesel ?",
        a: "Oui, elle est en diesel avec boîte automatique.",
      },
      {
        q: "Pourquoi la Sport coûte-t-elle plus cher que l'Evoque ?",
        a: "Elle est plus grande, plus haut de gamme et plus confortable. Si vous voulez la marque à un tarif plus bas, voyez l'[Evoque](/catalogue/range-rover-evoque).",
      },
      {
        q: "Est-elle adaptée à un long voyage ?",
        a: "Oui, c'est l'un de ses usages naturels. Demandez le kilométrage inclus à l'équipe avant un départ de plusieurs centaines de kilomètres.",
      },
    ],
  },
};

export default copy;
