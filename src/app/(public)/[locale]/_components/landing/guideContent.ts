import type { Locale } from '@/lib/i18n/translations';

/**
 * Texte du guide de location de l'accueil. Importé seulement par un composant serveur :
 * il n'entre pas dans le JavaScript envoyé au navigateur.
 * Les prix et les chiffres viennent de la base via `GuideFacts` : jamais de valeur écrite en dur.
 * Liens dans le texte : [libellé](route:clé), [libellé](/adresse) ou [libellé](whatsapp).
 */
export type GuideFacts = {
  vehicleCount: number;
  modelCount: number;
  minPrice: number;
  minDays: number;
  hours: string;
};

export type GuideRangeKey = 'economique' | 'berline' | 'suv' | 'automatique' | 'luxe' | 'longue-duree';

type GuideContent = {
  eyebrow: string;
  h2: string;
  intro: (facts: GuideFacts) => string;
  flow: { h3: string; paragraphs: string[] };
  airport: { h3: string; paragraphs: (facts: GuideFacts) => string[] };
  ranges: {
    h3: string;
    lead: (facts: GuideFacts) => string;
    price: (value: number) => string;
    items: { key: GuideRangeKey; title: string; text: string }[];
    outro: string;
  };
  prepare: { h3: string; items: (facts: GuideFacts) => string[]; outro: string };
};

export const GUIDE_CONTENT: Record<Locale, GuideContent> = {
  fr: {
    eyebrow: 'Le guide avant de louer',
    h2: 'Location de voiture à Casablanca : comment ça marche chez Yourent',
    intro: ({ vehicleCount, minPrice, minDays }) =>
      `Yourent loue ${vehicleCount > 0 ? `${vehicleCount} véhicules` : 'des véhicules'} à Casablanca${minPrice > 0 ? `, à partir de ${minPrice} DH par jour` : ''}, pour ${minDays} jours minimum. Vous envoyez une demande en ligne, l’équipe confirme sur WhatsApp ou par téléphone, puis la voiture est livrée à votre hôtel, à l’aéroport Mohammed V ou à l’adresse que vous indiquez.`,
    flow: {
      h3: 'De la demande en ligne à la remise des clés',
      paragraphs: [
        'Tout part de vos dates. Dans le [catalogue](/catalogue), la recherche retire les voitures déjà prises sur cette période : il ne reste que celles que vous pouvez vraiment louer. Vous ouvrez la fiche du modèle qui vous convient et vous envoyez votre demande avec vos coordonnées.',
        'Cette demande ne vous fait rien payer, car le site n’encaisse aucun paiement. Un membre de l’équipe vous répond pour valider le véhicule, le montant et le lieu de remise, puis le règlement se fait directement avec lui.',
        'Les plans changent souvent avant un voyage. Vous pouvez modifier ou annuler sans frais jusqu’à 24 h avant la prise en charge ; plus tard, des frais peuvent s’appliquer.',
      ],
    },
    airport: {
      h3: 'La livraison à l’aéroport Mohammed V',
      paragraphs: ({ hours }) => [
        'Vous ne payez pas de frais de livraison à l’aéroport Mohammed V, pas plus que dans le reste de Casablanca. Yourent n’a pas de comptoir dans le terminal : le véhicule vient à vous, sur rendez-vous. Il peut aussi vous attendre à votre hôtel ou à votre domicile en ville, 7j/7.',
        `Donnez votre date et votre heure d’arrivée dans la demande, l’équipe vous indique ensuite le lieu de rendez-vous sur WhatsApp. Horaires de l’équipe : ${hours}. Si votre avion atterrit en dehors de ces horaires, posez la question avant de réserver.`,
        'Hors de la ville, Mohammedia est possible avec un léger supplément. Pour le déroulé complet de l’arrivée, lisez notre [page sur la location à l’aéroport](route:aeroport).',
      ],
    },
    ranges: {
      h3: 'Quelle gamme choisir',
      lead: ({ modelCount }) =>
        `${modelCount > 0 ? `La flotte compte ${modelCount} modèles, tous à 5 places.` : 'Tous nos modèles ont 5 places.'} Le bon choix dépend surtout de vos trajets, de vos bagages et de la boîte de vitesses que vous préférez.`,
      price: (value) => `dès ${value} DH par jour`,
      items: [
        {
          key: 'economique',
          title: 'Citadines économiques',
          text: 'Fiat 500 et Opel Corsa, en boîte manuelle : les prix d’entrée de la flotte, et des gabarits faciles à garer en ville.',
        },
        {
          key: 'berline',
          title: 'Berlines',
          text: 'Toyota Corolla hybride, Volkswagen Golf 8 et Audi A3, pour alterner rendez-vous en ville et trajets sur autoroute.',
        },
        {
          key: 'suv',
          title: 'SUV',
          text: 'Du Dacia Duster au Volkswagen Touareg, en passant par le T-Roc, le Tiguan, l’Audi Q3 et le Kia Sorento : plus de place pour les bagages et les longs trajets.',
        },
        {
          key: 'automatique',
          title: 'Boîte automatique',
          text: 'La majorité des modèles roule en automatique. La Golf 8 et l’Audi Q3 existent dans les deux boîtes : précisez votre choix dans la demande.',
        },
        {
          key: 'luxe',
          title: 'Voitures de luxe',
          text: 'Mercedes CLA, C 220 et E 220, Porsche Macan, Range Rover Evoque et Sport, pour un rendez-vous d’affaires ou une grande occasion.',
        },
        {
          key: 'longue-duree',
          title: 'Longue durée',
          text: 'Au-delà de 10 jours, le tarif réduit s’applique tout seul sur la plupart des modèles, sans demande de votre part. Le prix affiché ici est le plus bas de ce palier.',
        },
      ],
      outro:
        'Vous visez une marque précise ? Voyez nos pages [Mercedes](route:mercedes), [Range Rover](route:range-rover) et [Porsche](route:porsche), ou comparez les prix modèle par modèle sur la [page des tarifs](route:tarifs).',
    },
    prepare: {
      h3: 'Ce qu’il faut prévoir',
      items: ({ minDays }) => [
        `**Durée.** La location dure au moins ${minDays} jours : il n’y a pas de formule à la journée ni au week-end.`,
        '**Documents.** Préparez une pièce d’identité valide (CIN ou passeport), un permis obtenu il y a plus de 2 ans et un justificatif de domicile. Si vous venez de l’étranger, le permis international est accepté.',
        '**Caution.** Elle se donne au départ, par chèque, en espèces ou par empreinte de carte. Son montant dépend du véhicule, et vous la récupérez au retour si la voiture est en bon état.',
        '**Assurance.** Chaque voiture est couverte tous risques, avec une franchise. Demandez-en le montant pour votre modèle avant de confirmer.',
        '**Imprévus.** En cas de panne, un véhicule de remplacement part vers vous dans les plus brefs délais. Après un accident, l’équipe vous aide dans les démarches.',
      ],
      outro:
        'Âge minimum, kilométrage, retour dans une autre ville : pour ces questions, l’équipe vous répond sur [WhatsApp](whatsapp). Le reste est détaillé dans nos [conditions de location](route:conditions).',
    },
  },

  en: {
    eyebrow: 'Before you rent',
    h2: 'Car rental in Casablanca: how it works at Yourent',
    intro: ({ vehicleCount, minPrice, minDays }) =>
      `Yourent rents out ${vehicleCount > 0 ? `${vehicleCount} vehicles` : 'vehicles'} in Casablanca${minPrice > 0 ? `, from ${minPrice} MAD per day` : ''}, for a minimum of ${minDays} days. You send a request online, the team confirms by WhatsApp or phone, and the car is delivered to your hotel, to Mohammed V Airport or to the address you give.`,
    flow: {
      h3: 'From online request to handover',
      paragraphs: [
        'It starts with your dates. In the [catalogue](/catalogue), the search removes cars already taken for that period, so you only see the ones you can actually rent. Open the page of the model that suits you and send your request with your contact details.',
        'The request costs nothing, because the website takes no payment. A team member replies to confirm the vehicle, the amount and the handover location, and you then pay them directly.',
        'Travel plans often change. You can modify or cancel free of charge up to 24 hours before pick-up; after that, fees may apply.',
      ],
    },
    airport: {
      h3: 'Delivery at Mohammed V Airport',
      paragraphs: ({ hours }) => [
        'There is no delivery fee at Mohammed V Airport, just as in the rest of Casablanca. Yourent has no desk in the terminal: the car comes to you, by appointment. It can also be brought to your hotel or home in the city, 7 days a week.',
        `Give your arrival date and time in the request, and the team will send you the meeting point on WhatsApp. Team hours: ${hours}. If your flight lands outside these hours, ask before you book.`,
        'Outside the city, Mohammedia is possible for a small extra charge. For a full account of the arrival, read our [airport rental page](route:aeroport).',
      ],
    },
    ranges: {
      h3: 'Which range to choose',
      lead: ({ modelCount }) =>
        `${modelCount > 0 ? `The fleet has ${modelCount} models, all with 5 seats.` : 'All our models have 5 seats.'} The right choice depends mostly on your journeys, your luggage and the gearbox you prefer.`,
      price: (value) => `from ${value} MAD per day`,
      items: [
        {
          key: 'economique',
          title: 'Budget city cars',
          text: 'Fiat 500 and Opel Corsa, with a manual gearbox: the entry prices of the fleet, in sizes that are easy to park in town.',
        },
        {
          key: 'berline',
          title: 'Saloons and hatchbacks',
          text: 'Toyota Corolla hybrid, Volkswagen Golf 8 and Audi A3, for a mix of city appointments and motorway driving.',
        },
        {
          key: 'suv',
          title: 'SUVs',
          text: 'From the Dacia Duster to the Volkswagen Touareg, with the T-Roc, Tiguan, Audi Q3 and Kia Sorento in between: more room for luggage and long drives.',
        },
        {
          key: 'automatique',
          title: 'Automatic gearbox',
          text: 'Most models are automatic. The Golf 8 and Audi Q3 come with either gearbox, so state your choice in the request.',
        },
        {
          key: 'luxe',
          title: 'Luxury cars',
          text: 'Mercedes CLA, C 220 and E 220, Porsche Macan, Range Rover Evoque and Sport, for a business meeting or a special occasion.',
        },
        {
          key: 'longue-duree',
          title: 'Long-term rental',
          text: 'After 10 days, the lower rate applies automatically on most models, with nothing to ask for. The price shown here is the lowest at that level.',
        },
      ],
      outro:
        'Looking for a specific make? See our [Mercedes](route:mercedes), [Range Rover](route:range-rover) and [Porsche](route:porsche) pages, or compare prices model by model on the [prices page](route:tarifs).',
    },
    prepare: {
      h3: 'What to prepare',
      items: ({ minDays }) => [
        `**Duration.** A rental lasts at least ${minDays} days: there is no daily or weekend option.`,
        '**Documents.** Bring a valid ID (national ID card or passport), a driving licence held for more than 2 years and proof of address. If you are coming from abroad, an international driving permit is accepted.',
        '**Deposit.** You leave it at pick-up, by cheque, in cash or as a card imprint. The amount depends on the vehicle, and you get it back on return if the car is in good condition.',
        '**Insurance.** Every car has comprehensive insurance with an excess. Ask for the amount of the excess on your model before you confirm.',
        '**If something goes wrong.** If the car breaks down, a replacement is sent to you as soon as possible. After an accident, the team helps you with the paperwork.',
      ],
      outro:
        'Minimum age, mileage, returning the car in another city: for these questions, the team answers on [WhatsApp](whatsapp). Everything else is set out in our [rental requirements](route:conditions).',
    },
  },

  ar: {
    eyebrow: 'دليلك قبل الكراء',
    h2: 'كراء السيارات في الدار البيضاء: كيف يتم لدى Yourent',
    intro: ({ vehicleCount, minPrice, minDays }) =>
      `توفر Yourent ${vehicleCount > 0 ? `${vehicleCount} سيارة` : 'سيارات'} للكراء في الدار البيضاء${minPrice > 0 ? `، ابتداءً من ${minPrice} درهم في اليوم` : ''}، لمدة ${minDays} أيام على الأقل. ترسل طلبك عبر الإنترنت، ويؤكده الفريق عبر واتساب أو الهاتف، ثم تُسلَّم السيارة إلى فندقك أو إلى مطار محمد الخامس أو إلى العنوان الذي تحدده.`,
    flow: {
      h3: 'من الطلب عبر الإنترنت إلى تسليم المفاتيح',
      paragraphs: [
        'تبدأ العملية بتواريخك. في [الكتالوج](/catalogue)، يستبعد البحث السيارات المحجوزة خلال تلك الفترة، فلا يبقى أمامك إلا ما يمكنك كراؤه فعلًا. افتح صفحة الطراز الذي يناسبك وأرسل طلبك مع بيانات الاتصال بك.',
        'لا يترتب على هذا الطلب أي دفع، لأن الموقع لا يستقبل أي مبالغ. يرد عليك أحد أعضاء الفريق لتأكيد السيارة والمبلغ ومكان التسليم، ثم تتم التسوية معه مباشرة.',
        'كثيرًا ما تتغير الخطط قبل السفر. يمكنك التعديل أو الإلغاء دون رسوم حتى 24 ساعة قبل موعد الاستلام، وبعد ذلك قد تُطبق رسوم.',
      ],
    },
    airport: {
      h3: 'التوصيل إلى مطار محمد الخامس',
      paragraphs: ({ hours }) => [
        'لا تدفع أي رسوم توصيل إلى مطار محمد الخامس، كما هو الحال في باقي الدار البيضاء. ليس لدى Yourent مكتب داخل المطار: السيارة تأتي إليك بموعد مسبق. ويمكن أيضًا أن تصلك إلى فندقك أو مسكنك داخل المدينة، طوال أيام الأسبوع.',
        `اذكر تاريخ وصولك وساعته في الطلب، وسيحدد لك الفريق مكان اللقاء عبر واتساب. أوقات عمل الفريق: ${hours}. إذا كانت طائرتك ستهبط خارج هذه الأوقات، فاسأل قبل الحجز.`,
        'خارج المدينة، يمكن التوصيل إلى المحمدية مقابل مبلغ إضافي بسيط. لمعرفة تفاصيل الوصول كاملة، اقرأ [صفحة الكراء في المطار](route:aeroport).',
      ],
    },
    ranges: {
      h3: 'أي فئة تختار',
      lead: ({ modelCount }) =>
        `${modelCount > 0 ? `يضم الأسطول ${modelCount} طرازًا، وكلها بخمسة مقاعد.` : 'كل طرازاتنا بخمسة مقاعد.'} يتوقف الاختيار المناسب أساسًا على رحلاتك وأمتعتك وعلبة السرعات التي تفضلها.`,
      price: (value) => `ابتداءً من ${value} درهم في اليوم`,
      items: [
        {
          key: 'economique',
          title: 'سيارات مدينة اقتصادية',
          text: 'Fiat 500 وOpel Corsa بعلبة سرعات يدوية: أقل الأسعار في الأسطول، وحجم يسهل ركنه في المدينة.',
        },
        {
          key: 'berline',
          title: 'سيارات سيدان',
          text: 'Toyota Corolla الهجينة وVolkswagen Golf 8 وAudi A3، للجمع بين المواعيد داخل المدينة والطرق السيارة.',
        },
        {
          key: 'suv',
          title: 'سيارات SUV',
          text: 'من Dacia Duster إلى Volkswagen Touareg، مرورًا بـT-Roc وTiguan وAudi Q3 وKia Sorento: مساحة أكبر للأمتعة والرحلات الطويلة.',
        },
        {
          key: 'automatique',
          title: 'علبة سرعات أوتوماتيكية',
          text: 'معظم الطرازات أوتوماتيكية. أما Golf 8 وAudi Q3 فمتوفرتان بالعلبتين، لذا حدد اختيارك في الطلب.',
        },
        {
          key: 'luxe',
          title: 'سيارات فاخرة',
          text: 'Mercedes CLA وC 220 وE 220، وPorsche Macan، وRange Rover Evoque وSport، لموعد عمل أو مناسبة خاصة.',
        },
        {
          key: 'longue-duree',
          title: 'الكراء طويل المدة',
          text: 'بعد 10 أيام، يُطبق السعر المخفض تلقائيًا في معظم الطرازات دون أن تطلبه. والسعر المعروض هنا هو الأدنى في هذه الفئة.',
        },
      ],
      outro:
        'هل تبحث عن علامة بعينها؟ اطلع على صفحات [مرسيدس](route:mercedes) و[رينج روفر](route:range-rover) و[بورش](route:porsche)، أو قارن الأسعار طرازًا بطراز في [صفحة الأسعار](route:tarifs).',
    },
    prepare: {
      h3: 'ما يجب تحضيره',
      items: ({ minDays }) => [
        `**المدة.** يستمر الكراء ${minDays} أيام على الأقل: لا توجد صيغة ليوم واحد أو لنهاية الأسبوع.`,
        '**الوثائق.** حضّر وثيقة هوية سارية (البطاقة الوطنية أو جواز السفر)، ورخصة سياقة مضى عليها أكثر من سنتين، وإثبات السكن. إذا كنت قادمًا من الخارج، تُقبل رخصة السياقة الدولية.',
        '**الضمان.** يُقدَّم عند الانطلاق، بشيك أو نقدًا أو ببصمة البطاقة. يتوقف مبلغه على السيارة، وتسترده عند الإرجاع إذا كانت السيارة في حالة جيدة.',
        '**التأمين.** كل سيارة مغطاة بالتأمين ضد جميع المخاطر مع مبلغ التحمل. اسأل عن قيمة هذا المبلغ بالنسبة إلى طرازك قبل التأكيد.',
        '**الطوارئ.** عند حدوث عطل، تُرسل إليك سيارة بديلة في أقرب وقت. وبعد وقوع حادث، يساعدك الفريق في الإجراءات.',
      ],
      outro:
        'الحد الأدنى للسن، أو عدد الكيلومترات، أو إرجاع السيارة في مدينة أخرى: عن هذه الأسئلة يجيبك الفريق عبر [واتساب](whatsapp). وباقي التفاصيل موجود في [شروط الكراء](route:conditions).',
    },
  },
};
