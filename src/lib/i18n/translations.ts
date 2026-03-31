export type Locale = 'fr' | 'en' | 'ar';

const fr: Record<string, string> = {
  /* ── Nav / Layout ────────────────────────── */
  'nav.home': 'Accueil',
  'nav.catalogue': 'Location voitures',
  'nav.contact': 'Contact',
  'nav.agency': 'Espace agence',
  'nav.concierge': 'Concierge 7j/7',
  'nav.book': 'Réserver',

  /* ── Footer ─────────────────────────────── */
  'footer.desc':
    'Agence de location de voitures à Casablanca, Maroc. Berlines, SUV, voitures de luxe et économiques — livraison aéroport Mohammed V, réservation en ligne 7j/7.',
  'footer.catalogue': 'Catalogue voitures',
  'footer.contact': 'Nous contacter',
  'footer.seo':
    'Location de voitures à Casablanca · Location voiture Maroc · Location SUV Casablanca · Location berline Casablanca · Location voiture luxe Maroc · Rent car Casablanca · Location voiture aéroport Mohammed V · Yourent Casablanca',

  /* ── Hero ─────────────────────────────────── */
  'hero.badge': 'Minimum 3 jours',
  'hero.cta': 'Explorer le catalogue',
  'hero.delivery': 'Livraison aéroport & Casablanca',
  'hero.cars': 'Voitures',
  'hero.available': 'disponibles',
  'hero.subline': 'Location de voitures de luxe à Casablanca',
  'hero.pageTitle': 'Location de voitures à Casablanca — Yourent, agence de location auto au Maroc',

  /* ── Brand Slider ─────────────────────────── */
  'brand.eyebrow': 'notre flotte de luxe',
  'brand.book': 'Réserver',
  'brand.comingSoon': 'Collection à venir.',

  /* ── Contact ──────────────────────────────── */
  'contact.eyebrow': 'Casablanca, Maroc',
  'contact.title': 'Agence location voitures',
  'contact.titleGold': 'Casablanca',
  'contact.subtitle': 'Notre agence au cœur de Casablanca vous accueille pour une expérience sur-mesure — du choix du véhicule à la remise des clés.',
  'contact.imgAlt': 'Vue aérienne de Casablanca, Maroc — Yourent location de voitures',
  'contact.followUs': 'Suivez-nous',
  'contact.directions': 'Itinéraire',
  'contact.address': 'Adresse',
  'contact.phone': 'Téléphone',
  'contact.email': 'Email',
  'contact.hours': 'Horaires',
  'contact.hoursValue': 'Lun – Dim · 8h – 22h',
  'contact.hoursSub': '7j/7 — Livraison 24h',
  'contact.addressSub': '20100 Casablanca, Maroc',
  'contact.statVehicles': 'Véhicules',
  'contact.statClients': 'Clients satisfaits',
  'contact.statGoogle': 'Avis Google',
  'contact.mapName': 'Yourent Casablanca',

  /* ── Aria Labels ──────────────────────────── */
  'aria.menuOpen': 'Ouvrir le menu',
  'aria.menuClose': 'Fermer le menu',
  'aria.whatsapp': 'Contacter via WhatsApp',
  'aria.langSelect': 'Choisir la langue',
  'aria.footerNav': 'Liens du pied de page',
  'aria.mainNav': 'Navigation principale',
  'aria.ecoNav': 'Sélection rapide de véhicule',
  'aria.prevVehicle': 'Véhicule précédent',
  'aria.nextVehicle': 'Véhicule suivant',
  'aria.goToVehicle': 'Aller au véhicule',

  /* ── Signature ────────────────────────────── */
  'signature.eyebrow': 'Notre collection berline à louer',
  'signature.title': 'Location de berlines premium à Casablanca',
  'signature.subtitle':
    "Une sélection premium pensée pour les arrivées qui comptent, les séjours haut de gamme et les usages à forte valeur d\u2019image.",
  'signature.cta': 'Voir tout le catalogue',
  'signature.book': 'Réserver',
  'signature.from': 'À partir de',
  'signature.perDay': '/ jour',

  /* ── Why YouRent ──────────────────────────── */
  'why.eyebrow': 'Pourquoi YouRent',
  'why.title': "L\u2019excellence au service de votre mobilité",
  'why.subtitle':
    'Chaque détail est pensé pour que votre location soit simple, premium et sans stress.',
  'why.delivery.title': 'Livraison gratuite',
  'why.delivery.desc':
    "Livraison incluse dans tout Casablanca et à l\u2019aéroport Mohammed\u00a0V.",
  'why.delivery.stat': '0 DH',
  'why.delivery.label': 'frais de livraison',
  'why.insurance.title': 'Assurance franchise tout risque',
  'why.insurance.desc':
    'Tous nos véhicules sont couverts par une assurance franchise tout risque.',
  'why.insurance.stat': '%',
  'why.insurance.label': 'de couverture',
  'why.fleet.title': 'Flotte récente',
  'why.fleet.desc':
    'Notre flotte est renouvelée régulièrement pour votre confort et votre sécurité.',
  'why.fleet.stat': '+',
  'why.fleet.label': 'véhicules',
  'why.assistance.title': 'Assistance 24/7',
  'why.assistance.desc':
    'Notre équipe est disponible jour et nuit pour vous accompagner.',
  'why.assistance.stat': '24/7',
  'why.assistance.label': 'disponibilité',

  /* ── Economic ─────────────────────────────── */
  'eco.eyebrow': 'Voitures économiques à louer',
  'eco.title': 'Location de voitures pas cher à Casablanca',
  'eco.subtitle':
    'Performantes, sobres et parfaitement entretenues — notre gamme économique vous emmène partout, sans compromis.',
  'eco.cta': 'Voir notre flotte',
  'eco.book': 'Réserver maintenant',

  /* ── Process ──────────────────────────────── */
  'process.eyebrow': 'Réserver votre voiture en ligne',
  'process.title': 'Louez en 3 étapes, livraison incluse',
  'process.s1.title': 'Choisir dans le catalogue',
  'process.s1.body':
    'Parcourez notre sélection de véhicules premium disponibles à Casablanca.',
  'process.s2.title': 'Commander votre voiture en ligne',
  'process.s2.body':
    'Réservez en quelques clics, puis notre équipe confirme avec vous la disponibilité et les modalités.',
  'process.s3.title': 'Recevoir le véhicule',
  'process.s3.body':
    "Livraison à votre hôtel, à l\u2019aéroport ou à l\u2019adresse de votre choix. 7j/7.",

  /* ── FAQ ──────────────────────────────────── */
  'faq.eyebrow': 'questions fréquentes',
  'faq.title': 'Tout savoir avant de réserver',
  'faq.subtitle':
    'Les réponses aux questions les plus posées par nos clients à Casablanca.',
  'faq.q1': 'Quels documents faut-il pour louer un véhicule ?',
  'faq.a1':
    "Il suffit d\u2019une pièce d\u2019identité valide (CIN ou passeport), d\u2019un permis de conduire de plus de 2\u00a0ans et d\u2019un justificatif de domicile. Pour les touristes étrangers, le permis international est accepté.",
  'faq.q2': 'La livraison du véhicule est-elle incluse ?',
  'faq.a2':
    "Oui, la livraison est incluse dans tout Casablanca. Nous proposons également la livraison à l\u2019aéroport Mohammed\u00a0V et à Mohammedia moyennant un léger supplément.",
  'faq.q3': 'Quelle est la durée minimum de location ?',
  'faq.a3':
    "La durée minimum est de 3\u00a0jours. Pour les locations longue durée (11\u00a0jours et plus), vous bénéficiez automatiquement d\u2019un tarif préférentiel.",
  'faq.q4': 'Comment fonctionne le dépôt de garantie ?',
  'faq.a4':
    "Un dépôt de garantie est demandé au départ, par chèque ou espèces, dont le montant varie selon le véhicule. Il est intégralement restitué au retour du véhicule en bon état.",
  'faq.q5': "Que se passe-t-il en cas de panne ou d\u2019accident ?",
  'faq.a5':
    "Tous nos véhicules sont assurés tous risques. En cas de panne, notre assistance 24h/7j vous envoie un remplacement dans les plus brefs délais. En cas d\u2019accident, notre équipe vous accompagne dans toutes les démarches.",
  'faq.q6': 'Puis-je modifier ou annuler ma réservation ?',
  'faq.a6':
    "Toute réservation peut être modifiée ou annulée sans frais jusqu\u2019à 24\u00a0h avant la date de prise en charge. Au-delà, des frais d\u2019annulation peuvent s\u2019appliquer.",

  /* ── Final CTA ────────────────────────────── */
  'cta.eyebrow': 'Réservez votre voiture au Maroc',
  'cta.title': 'Votre location de voiture à Casablanca vous attend',
  'cta.explore': 'Explorer le catalogue',
  'cta.whatsapp': 'Parler au concierge',

  /* ── Catalogue ────────────────────────────── */
  'cat.eyebrow': 'collection raffinée',
  'cat.title': 'Notre catalogue',
  'cat.subtitle':
    '{count} modèle{s} disponible{s} dans une sélection premium pensée pour chaque usage.',
  'cat.allBrands': 'Toutes les marques',
  'cat.allTypes': 'Tous',
  'cat.search': 'Rechercher un véhicule…',
  'cat.sortDefault': 'Prix croissant',
  'cat.sortDesc': 'Prix décroissant',
  'cat.sortName': 'Nom A–Z',
  'cat.perDay': '/jour · min 3\u00a0jours',
  'cat.seeOptions': 'Voir les options',
  'cat.bookNow': 'Réserver',
  'cat.dispo': 'dispo',
  'cat.empty': 'Aucun véhicule disponible pour le moment.',
  'cat.emptyHint': 'Revenez bientôt ou contactez-nous directement.',
  'cat.models': 'modèle{s} affiché{s}',
  'cat.end': 'Fin du catalogue',
  'cat.scroll': 'Faites défiler pour voir plus',
  'cat.loading': 'Chargement…',
  'cat.retry': 'Réessayer',
  'cat.places': 'places',

  /* ── Model Detail ──────────────────────────── */
  'model.variants': '{count} véhicule{s} disponible{s} — choisissez le vôtre',
  'model.eyebrow': 'Sélection signature',
  'model.places': 'places',
  'model.priceFrom': 'Tarif à partir de',
  'model.perDay': '/jour',
  'model.minDuration': 'Location minimale : 3 jours',
  'model.service': 'Standard service',
  'model.serviceDesc': 'Assistance et préparation premium',
  'model.longDuration': 'Tarif avantageux appliqué automatiquement au-delà de 10 jours.',
  'model.reservation': 'Demande de réservation',
  'model.contactMsg': 'Nous vous recontactons rapidement avec validation, disponibilité finale et modalités de départ.',

  /* ── Reservation Form ─────────────────────── */
  'form.startDate': 'Date de début *',
  'form.endDate': 'Date de fin *',
  'form.days': 'jour{s}',
  'form.estimate': 'Estimation',
  'form.exDeposit': '(hors dépôt de garantie)',
  'form.longRate': 'Tarif longue durée appliqué automatiquement.',
  'form.minDays': 'La location minimale est de {count} jours.',
  'form.firstName': 'Prénom *',
  'form.lastName': 'Nom *',
  'form.phone': 'Téléphone *',
  'form.email': 'Email',
  'form.emailOptional': 'optionnel',
  'form.notes': 'Notes / Demandes spéciales',
  'form.notesPlaceholder': 'Informations complémentaires...',
  'form.submit': 'Envoyer ma demande de réservation',
  'form.submitting': 'Envoi en cours...',
  'form.required': 'Veuillez remplir tous les champs obligatoires',
  'form.minDaysError': 'La durée minimale est de {count} jours',
  'form.success': 'Demande envoyée ! Nous vous contacterons dans les plus brefs délais.',
  'form.error': 'Erreur lors de la réservation',
  'form.networkError': 'Erreur réseau. Réessayez dans quelques instants.',
  'form.confirm': 'Notre équipe vous contactera pour confirmer votre réservation.',
};

const en: Record<string, string> = {
  /* ── Nav / Layout ────────────────────────── */
  'nav.home': 'Home',
  'nav.catalogue': 'Car Rental',
  'nav.contact': 'Contact',
  'nav.agency': 'Agency Portal',
  'nav.concierge': 'Concierge 24/7',
  'nav.book': 'Book Now',

  /* ── Footer ─────────────────────────────── */
  'footer.desc':
    'Car rental agency in Casablanca, Morocco. Sedans, SUVs, luxury & economy cars — Mohammed\u00a0V airport delivery, online booking 24/7.',
  'footer.catalogue': 'Car Catalogue',
  'footer.contact': 'Contact us',
  'footer.seo':
    'Car rental Casablanca · Car hire Morocco · SUV rental Casablanca · Sedan rental Casablanca · Luxury car rental Morocco · Rent car Casablanca · Airport car rental Mohammed V · Yourent Casablanca',

  /* ── Hero ─────────────────────────────────── */
  'hero.badge': 'Minimum 3 days',
  'hero.cta': 'Explore our fleet',
  'hero.delivery': 'Airport & Casablanca delivery',
  'hero.cars': 'Cars',
  'hero.available': 'available',
  'hero.subline': 'Luxury car rental in Casablanca',
  'hero.pageTitle': 'Car rental in Casablanca — Yourent, car hire agency in Morocco',

  /* ── Brand Slider ─────────────────────────── */
  'brand.eyebrow': 'our luxury fleet',
  'brand.book': 'Book now',
  'brand.comingSoon': 'Coming soon.',

  /* ── Contact ──────────────────────────────── */
  'contact.eyebrow': 'Casablanca, Morocco',
  'contact.title': 'Car rental agency',
  'contact.titleGold': 'Casablanca',
  'contact.subtitle': 'Our agency in the heart of Casablanca welcomes you for a tailor-made experience — from choosing the vehicle to handing over the keys.',
  'contact.imgAlt': 'Aerial view of Casablanca, Morocco — Yourent car rental',
  'contact.followUs': 'Follow us',
  'contact.directions': 'Directions',
  'contact.address': 'Address',
  'contact.phone': 'Phone',
  'contact.email': 'Email',
  'contact.hours': 'Hours',
  'contact.hoursValue': 'Mon – Sun · 8am – 10pm',
  'contact.hoursSub': '7 days a week — 24h delivery',
  'contact.addressSub': '20100 Casablanca, Morocco',
  'contact.statVehicles': 'Vehicles',
  'contact.statClients': 'Happy clients',
  'contact.statGoogle': 'Google Reviews',
  'contact.mapName': 'Yourent Casablanca',

  /* ── Aria Labels ──────────────────────────── */
  'aria.menuOpen': 'Open menu',
  'aria.menuClose': 'Close menu',
  'aria.whatsapp': 'Contact via WhatsApp',
  'aria.langSelect': 'Select language',
  'aria.footerNav': 'Footer links',
  'aria.mainNav': 'Main navigation',
  'aria.ecoNav': 'Quick vehicle selection',
  'aria.prevVehicle': 'Previous vehicle',
  'aria.nextVehicle': 'Next vehicle',
  'aria.goToVehicle': 'Go to vehicle',

  /* ── Signature ────────────────────────────── */
  'signature.eyebrow': 'Our premium sedan collection',
  'signature.title': 'Premium sedan rental in Casablanca',
  'signature.subtitle':
    'A curated selection for the arrivals that matter, high-end stays and occasions that call for distinction.',
  'signature.cta': 'View full catalogue',
  'signature.book': 'Book now',
  'signature.from': 'Starting from',
  'signature.perDay': '/ day',

  /* ── Why YouRent ──────────────────────────── */
  'why.eyebrow': 'Why YouRent',
  'why.title': 'Excellence at the service of your mobility',
  'why.subtitle':
    'Every detail is designed to make your rental simple, premium and stress-free.',
  'why.delivery.title': 'Free Delivery',
  'why.delivery.desc':
    'Complimentary delivery across Casablanca and Mohammed\u00a0V Airport.',
  'why.delivery.stat': '0 MAD',
  'why.delivery.label': 'delivery fees',
  'why.insurance.title': 'Full Insurance',
  'why.insurance.desc':
    'All our vehicles come with comprehensive all-risk insurance coverage.',
  'why.insurance.stat': '%',
  'why.insurance.label': 'coverage',
  'why.fleet.title': 'Recent Fleet',
  'why.fleet.desc':
    'Our fleet is regularly renewed for your comfort and safety.',
  'why.fleet.stat': '+',
  'why.fleet.label': 'vehicles',
  'why.assistance.title': '24/7 Assistance',
  'why.assistance.desc':
    'Our team is available day and night to support you.',
  'why.assistance.stat': '24/7',
  'why.assistance.label': 'availability',

  /* ── Economic ─────────────────────────────── */
  'eco.eyebrow': 'Budget-friendly cars for rent',
  'eco.title': 'Affordable car rental in Casablanca',
  'eco.subtitle':
    'Efficient, reliable and perfectly maintained — our economy range takes you everywhere, without compromise.',
  'eco.cta': 'View our fleet',
  'eco.book': 'Book now',

  /* ── Process ──────────────────────────────── */
  'process.eyebrow': 'Book your car online',
  'process.title': 'Rent in 3 steps, delivery included',
  'process.s1.title': 'Browse the catalogue',
  'process.s1.body':
    'Explore our selection of premium vehicles available in Casablanca.',
  'process.s2.title': 'Order your car online',
  'process.s2.body':
    'Book in a few clicks, then our team confirms availability and details with you.',
  'process.s3.title': 'Receive your vehicle',
  'process.s3.body':
    'Delivery to your hotel, airport or address of choice. 7\u00a0days a week.',

  /* ── FAQ ──────────────────────────────────── */
  'faq.eyebrow': 'frequently asked questions',
  'faq.title': 'Everything you need to know before booking',
  'faq.subtitle':
    'Answers to the most common questions from our clients in Casablanca.',
  'faq.q1': 'What documents do I need to rent a vehicle?',
  'faq.a1':
    'You need a valid ID (national ID or passport), a driving licence held for at least 2\u00a0years, and proof of address. For foreign tourists, an international driving permit is accepted.',
  'faq.q2': 'Is vehicle delivery included?',
  'faq.a2':
    'Yes, delivery is included throughout Casablanca. We also offer delivery to Mohammed\u00a0V Airport and Mohammedia for a small additional fee.',
  'faq.q3': 'What is the minimum rental duration?',
  'faq.a3':
    'The minimum duration is 3\u00a0days. For long-term rentals (11\u00a0days or more), you automatically benefit from a preferential rate.',
  'faq.q4': 'How does the security deposit work?',
  'faq.a4':
    'A deposit is required at pick-up, by cheque or cash — the amount varies depending on the vehicle. It is fully refunded when the vehicle is returned in good condition.',
  'faq.q5': 'What happens in case of a breakdown or accident?',
  'faq.a5':
    'All our vehicles are fully insured. In case of breakdown, our 24/7 assistance sends a replacement as soon as possible. In case of an accident, our team supports you through all procedures.',
  'faq.q6': 'Can I modify or cancel my reservation?',
  'faq.a6':
    'Any reservation can be modified or cancelled free of charge up to 24\u00a0hours before the pick-up date. After that, cancellation fees may apply.',

  /* ── Final CTA ────────────────────────────── */
  'cta.eyebrow': 'Book your car in Morocco',
  'cta.title': 'Your car rental in Casablanca awaits',
  'cta.explore': 'Explore the catalogue',
  'cta.whatsapp': 'Talk to concierge',

  /* ── Catalogue ────────────────────────────── */
  'cat.eyebrow': 'refined collection',
  'cat.title': 'Our catalogue',
  'cat.subtitle':
    '{count} model{s} available in a premium selection for every need.',
  'cat.allBrands': 'All brands',
  'cat.allTypes': 'All',
  'cat.search': 'Search a vehicle…',
  'cat.sortDefault': 'Price: Low to High',
  'cat.sortDesc': 'Price: High to Low',
  'cat.sortName': 'Name A–Z',
  'cat.perDay': '/day · min 3\u00a0days',
  'cat.seeOptions': 'See options',
  'cat.bookNow': 'Book now',
  'cat.dispo': 'available',
  'cat.empty': 'No vehicles available at the moment.',
  'cat.emptyHint': 'Come back soon or contact us directly.',
  'cat.models': 'model{s} displayed',
  'cat.end': 'End of catalogue',
  'cat.scroll': 'Scroll down for more',
  'cat.loading': 'Loading…',
  'cat.retry': 'Retry',
  'cat.places': 'seats',

  /* ── Model Detail ──────────────────────────── */
  'model.variants': '{count} vehicle{s} available — choose yours',
  'model.eyebrow': 'Signature selection',
  'model.places': 'seats',
  'model.priceFrom': 'Starting from',
  'model.perDay': '/day',
  'model.minDuration': 'Minimum rental: 3 days',
  'model.service': 'Standard service',
  'model.serviceDesc': 'Assistance and premium preparation',
  'model.longDuration': 'Preferential rate applied automatically beyond 10 days.',
  'model.reservation': 'Reservation request',
  'model.contactMsg': 'We will get back to you shortly with confirmation, final availability and pick-up details.',

  /* ── Reservation Form ─────────────────────── */
  'form.startDate': 'Start date *',
  'form.endDate': 'End date *',
  'form.days': 'day{s}',
  'form.estimate': 'Estimate',
  'form.exDeposit': '(exc. deposit)',
  'form.longRate': 'Long-term rate applied automatically.',
  'form.minDays': 'Minimum rental is {count} days.',
  'form.firstName': 'First name *',
  'form.lastName': 'Last name *',
  'form.phone': 'Phone *',
  'form.email': 'Email',
  'form.emailOptional': 'optional',
  'form.notes': 'Notes / Special requests',
  'form.notesPlaceholder': 'Additional information...',
  'form.submit': 'Send reservation request',
  'form.submitting': 'Sending...',
  'form.required': 'Please fill in all required fields',
  'form.minDaysError': 'Minimum duration is {count} days',
  'form.success': 'Request sent! We will contact you shortly.',
  'form.error': 'Error during reservation',
  'form.networkError': 'Network error. Please try again later.',
  'form.confirm': 'Our team will contact you to confirm your reservation.',
};

const ar: Record<string, string> = {
  /* ── Nav / Layout ────────────────────────── */
  'nav.home': 'الرئيسية',
  'nav.catalogue': 'تأجير السيارات',
  'nav.contact': 'اتصل بنا',
  'nav.agency': 'فضاء الوكالة',
  'nav.concierge': 'خدمة الكونسيرج 7/7',
  'nav.book': 'احجز الآن',

  /* ── Footer ─────────────────────────────── */
  'footer.desc':
    'وكالة تأجير سيارات في الدار البيضاء، المغرب. سيارات سيدان، SUV، فاخرة واقتصادية — توصيل لمطار محمد الخامس، حجز عبر الإنترنت 7/7.',
  'footer.catalogue': 'كتالوج السيارات',
  'footer.contact': 'تواصل معنا',
  'footer.seo':
    'تأجير سيارات الدار البيضاء · تأجير سيارات المغرب · تأجير SUV الدار البيضاء · تأجير سيدان الدار البيضاء · تأجير سيارات فاخرة المغرب · Rent car Casablanca · تأجير سيارات مطار محمد الخامس · يورنت الدار البيضاء',

  /* ── Hero ─────────────────────────────────── */
  'hero.badge': '3 أيام كحد أدنى',
  'hero.cta': 'تصفح الكتالوج',
  'hero.delivery': 'التوصيل للمطار والدار البيضاء',
  'hero.cars': 'سيارة',
  'hero.available': 'متاحة',
  'hero.subline': 'تأجير سيارات فاخرة في الدار البيضاء',
  'hero.pageTitle': 'تأجير سيارات في الدار البيضاء — يورنت، وكالة تأجير سيارات في المغرب',

  /* ── Brand Slider ─────────────────────────── */
  'brand.eyebrow': 'أسطولنا الفاخر',
  'brand.book': 'احجز',
  'brand.comingSoon': 'قريبًا.',

  /* ── Contact ──────────────────────────────── */
  'contact.eyebrow': 'الدار البيضاء، المغرب',
  'contact.title': 'وكالة تأجير سيارات',
  'contact.titleGold': 'الدار البيضاء',
  'contact.subtitle': 'وكالتنا في قلب الدار البيضاء ترحب بكم لتجربة مخصصة — من اختيار السيارة إلى تسليم المفاتيح.',
  'contact.imgAlt': 'منظر جوي للدار البيضاء، المغرب — يورنت لتأجير السيارات',
  'contact.followUs': 'تابعونا',
  'contact.directions': 'الاتجاهات',
  'contact.address': 'العنوان',
  'contact.phone': 'الهاتف',
  'contact.email': 'البريد الإلكتروني',
  'contact.hours': 'أوقات العمل',
  'contact.hoursValue': 'الاثنين – الأحد · 8ص – 10م',
  'contact.hoursSub': '7/7 — توصيل 24 ساعة',
  'contact.addressSub': '20100 الدار البيضاء، المغرب',
  'contact.statVehicles': 'سيارة',
  'contact.statClients': 'عملاء راضون',
  'contact.statGoogle': 'تقييمات Google',
  'contact.mapName': 'يورنت الدار البيضاء',

  /* ── Aria Labels ──────────────────────────── */
  'aria.menuOpen': 'فتح القائمة',
  'aria.menuClose': 'إغلاق القائمة',
  'aria.whatsapp': 'تواصل عبر واتساب',
  'aria.langSelect': 'اختيار اللغة',
  'aria.footerNav': 'روابط التذييل',
  'aria.mainNav': 'التنقل الرئيسي',
  'aria.ecoNav': 'اختيار سريع للسيارة',
  'aria.prevVehicle': 'السيارة السابقة',
  'aria.nextVehicle': 'السيارة التالية',
  'aria.goToVehicle': 'انتقل إلى السيارة',

  /* ── Signature ────────────────────────────── */
  'signature.eyebrow': 'مجموعتنا من السيدان للتأجير',
  'signature.title': 'تأجير سيارات سيدان فاخرة في الدار البيضاء',
  'signature.subtitle':
    'تشكيلة فاخرة مختارة للوصول المميز، والإقامات الراقية، والمناسبات التي تستحق التميز.',
  'signature.cta': 'عرض الكتالوج الكامل',
  'signature.book': 'احجز',
  'signature.from': 'ابتداءً من',
  'signature.perDay': '/ يوم',

  /* ── Why YouRent ──────────────────────────── */
  'why.eyebrow': 'لماذا يورنت',
  'why.title': 'التميّز في خدمة تنقّلاتك',
  'why.subtitle':
    'كل تفصيل مصمم ليجعل تأجيرك بسيطًا وفاخرًا وبدون أي ضغوط.',
  'why.delivery.title': 'توصيل مجاني',
  'why.delivery.desc':
    'التوصيل مشمول في جميع أنحاء الدار البيضاء وإلى مطار محمد\u00a0الخامس.',
  'why.delivery.stat': '0 DH',
  'why.delivery.label': 'رسوم التوصيل',
  'why.insurance.title': 'تأمين شامل بدون تحمل',
  'why.insurance.desc':
    'جميع سياراتنا مغطاة بتأمين شامل بدون تحمل.',
  'why.insurance.stat': '%',
  'why.insurance.label': 'تغطية',
  'why.fleet.title': 'أسطول حديث',
  'why.fleet.desc':
    'يتم تجديد أسطولنا بانتظام لراحتك وسلامتك.',
  'why.fleet.stat': '+',
  'why.fleet.label': 'سيارة',
  'why.assistance.title': 'مساعدة 24/7',
  'why.assistance.desc':
    'فريقنا متاح ليلًا ونهارًا لمرافقتك.',
  'why.assistance.stat': '24/7',
  'why.assistance.label': 'التوفر',

  /* ── Economic ─────────────────────────────── */
  'eco.eyebrow': 'سيارات اقتصادية للتأجير',
  'eco.title': 'تأجير سيارات بأسعار مناسبة في الدار البيضاء',
  'eco.subtitle':
    'فعّالة ومتينة ومُعتنى بها تمامًا — تشكيلتنا الاقتصادية توصلك لأي مكان، بدون تنازل.',
  'eco.cta': 'عرض أسطولنا',
  'eco.book': 'احجز الآن',

  /* ── Process ──────────────────────────────── */
  'process.eyebrow': 'احجز سيارتك عبر الإنترنت',
  'process.title': 'استأجر في 3 خطوات، التوصيل مشمول',
  'process.s1.title': 'اختر من الكتالوج',
  'process.s1.body':
    'تصفح تشكيلتنا من السيارات الفاخرة المتوفرة في الدار البيضاء.',
  'process.s2.title': 'اطلب سيارتك عبر الإنترنت',
  'process.s2.body':
    'احجز ببضع نقرات، ثم يؤكد فريقنا معك التوفر والتفاصيل.',
  'process.s3.title': 'استلم السيارة',
  'process.s3.body':
    'التوصيل لفندقك أو المطار أو عنوانك المفضل. 7\u00a0أيام في الأسبوع.',

  /* ── FAQ ──────────────────────────────────── */
  'faq.eyebrow': 'أسئلة شائعة',
  'faq.title': 'كل ما تحتاج معرفته قبل الحجز',
  'faq.subtitle':
    'إجابات على الأسئلة الأكثر شيوعًا من عملائنا في الدار البيضاء.',
  'faq.q1': 'ما هي الوثائق المطلوبة لتأجير سيارة؟',
  'faq.a1':
    'تحتاج فقط إلى هوية سارية المفعول (بطاقة وطنية أو جواز سفر)، ورخصة قيادة لأكثر من سنتين، وإثبات عنوان. بالنسبة للسياح الأجانب، تُقبل رخصة القيادة الدولية.',
  'faq.q2': 'هل توصيل السيارة مشمول في السعر؟',
  'faq.a2':
    'نعم، التوصيل مشمول في جميع أنحاء الدار البيضاء. كما نوفر التوصيل إلى مطار محمد\u00a0الخامس والمحمدية مقابل رسوم إضافية بسيطة.',
  'faq.q3': 'ما هي المدة الدنيا للتأجير؟',
  'faq.a3':
    'المدة الدنيا هي 3\u00a0أيام. بالنسبة للتأجير الطويل (11\u00a0يومًا فأكثر)، تستفيد تلقائيًا من سعر تفضيلي.',
  'faq.q4': 'كيف يعمل نظام وديعة الضمان؟',
  'faq.a4':
    'يُطلب ضمان عند الاستلام، عبر شيك أو نقدًا، ويختلف المبلغ حسب السيارة. يُسترد بالكامل عند إرجاع السيارة بحالة جيدة.',
  'faq.q5': 'ماذا يحدث في حالة عطل أو حادث؟',
  'faq.a5':
    'جميع سياراتنا مؤمّنة بتأمين شامل. في حالة عطل، ترسل خدمة المساعدة 24/7 سيارة بديلة في أسرع وقت. في حالة حادث، يرافقك فريقنا في جميع الإجراءات.',
  'faq.q6': 'هل يمكنني تعديل أو إلغاء حجزي؟',
  'faq.a6':
    'يمكن تعديل أو إلغاء أي حجز مجانًا حتى 24\u00a0ساعة قبل موعد الاستلام. بعد ذلك، قد تُطبق رسوم إلغاء.',

  /* ── Final CTA ────────────────────────────── */
  'cta.eyebrow': 'احجز سيارتك في المغرب',
  'cta.title': 'تأجير سيارتك في الدار البيضاء بانتظارك',
  'cta.explore': 'تصفح الكتالوج',
  'cta.whatsapp': 'تحدث مع الكونسيرج',

  /* ── Catalogue ────────────────────────────── */
  'cat.eyebrow': 'مجموعة مختارة',
  'cat.title': 'الكتالوج',
  'cat.subtitle':
    '{count} طراز متاح في تشكيلة فاخرة مصممة لكل استخدام.',
  'cat.allBrands': 'جميع العلامات',
  'cat.allTypes': 'الكل',
  'cat.search': 'ابحث عن سيارة…',
  'cat.sortDefault': 'السعر: من الأقل',
  'cat.sortDesc': 'السعر: من الأعلى',
  'cat.sortName': 'الاسم أ–ي',
  'cat.perDay': '/يوم · 3\u00a0أيام كحد أدنى',
  'cat.seeOptions': 'عرض الخيارات',
  'cat.bookNow': 'احجز',
  'cat.dispo': 'متاح',
  'cat.empty': 'لا توجد سيارات متاحة حاليًا.',
  'cat.emptyHint': 'عد قريبًا أو تواصل معنا مباشرة.',
  'cat.models': 'طراز معروض',
  'cat.end': 'نهاية الكتالوج',
  'cat.scroll': 'مرر للأسفل لعرض المزيد',
  'cat.loading': 'جارٍ التحميل…',
  'cat.retry': 'إعادة المحاولة',
  'cat.places': 'مقاعد',

  /* ── Model Detail ──────────────────────────── */
  'model.variants': '{count} سيارة متاحة — اختر ما يناسبك',
  'model.eyebrow': 'تشكيلة مميزة',
  'model.places': 'مقاعد',
  'model.priceFrom': 'ابتداءً من',
  'model.perDay': '/يوم',
  'model.minDuration': 'الحد الأدنى للتأجير: 3 أيام',
  'model.service': 'الخدمة القياسية',
  'model.serviceDesc': 'مساعدة وتحضير فاخر',
  'model.longDuration': 'يُطبّق سعر تفضيلي تلقائيًا لأكثر من 10 أيام.',
  'model.reservation': 'طلب حجز',
  'model.contactMsg': 'سنعاود الاتصال بك سريعًا مع التأكيد والتوفر النهائي وتفاصيل الاستلام.',

  /* ── Reservation Form ─────────────────────── */
  'form.startDate': 'تاريخ البداية *',
  'form.endDate': 'تاريخ النهاية *',
  'form.days': 'يوم',
  'form.estimate': 'التقدير',
  'form.exDeposit': '(بدون الضمان)',
  'form.longRate': 'يُطبّق سعر المدة الطويلة تلقائيًا.',
  'form.minDays': 'الحد الأدنى للتأجير هو {count} أيام.',
  'form.firstName': 'الاسم الأول *',
  'form.lastName': 'اسم العائلة *',
  'form.phone': 'الهاتف *',
  'form.email': 'البريد الإلكتروني',
  'form.emailOptional': 'اختياري',
  'form.notes': 'ملاحظات / طلبات خاصة',
  'form.notesPlaceholder': 'معلومات إضافية...',
  'form.submit': 'إرسال طلب الحجز',
  'form.submitting': 'جارٍ الإرسال...',
  'form.required': 'يرجى ملء جميع الحقول المطلوبة',
  'form.minDaysError': 'المدة الدنيا هي {count} أيام',
  'form.success': 'تم إرسال الطلب! سنتواصل معك في أقرب وقت.',
  'form.error': 'خطأ أثناء الحجز',
  'form.networkError': 'خطأ في الشبكة. حاول مرة أخرى لاحقًا.',
  'form.confirm': 'سيتواصل فريقنا معك لتأكيد حجزك.',
};

export const translations: Record<Locale, Record<string, string>> = { fr, en, ar };

/** Translate a key for a given locale (server-safe). */
export function t(locale: Locale, key: string): string {
  return translations[locale]?.[key] ?? translations.fr[key] ?? key;
}

/** Pluralize helper — replaces {s} with 's' when count > 1. */
export function tp(locale: Locale, key: string, count: number): string {
  const raw = t(locale, key);
  return raw.replace(/\{s\}/g, count > 1 ? 's' : '').replace('{count}', String(count));
}
