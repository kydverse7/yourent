import type { Locale } from './translations';

/**
 * Libellés de l'interface du site public ajoutés avec la refonte (barre d'action, bandeau de confiance,
 * bandeau final, formulaire, sommaire…). Fusionnés dans `translations` : une clé existante l'emporte toujours.
 * Jetons : {price} (prix déjà formaté), {count}, {value}, {hours}, {name}, {date}.
 */
export const SITE_UI: Record<Locale, Record<string, string>> = {
  fr: {
    /* Actions */
    'ui.call': 'Appeler',
    'ui.callAgency': 'Appeler l’agence',
    'ui.whatsapp': 'WhatsApp',
    'ui.whatsappLong': 'Écrire sur WhatsApp',
    'ui.book': 'Réserver',
    'ui.actionsAria': 'Actions rapides',
    'ui.languages': 'Langue',
    'ui.skip': 'Aller au contenu',
    'ui.menu': 'Menu',
    'ui.breadcrumbAria': 'Fil d’Ariane',

    /* Faits et confiance */
    'ui.from': 'dès',
    'ui.perDay': '/jour',
    'ui.factFrom': 'dès {price}/jour',
    'ui.factMinDays': '{count} jours minimum',
    'ui.factDelivery': 'livraison gratuite à Casablanca et à l’aéroport Mohammed V',
    'ui.rating': '{value}/5 sur Google ({count} avis)',
    'ui.trustAria': 'Nos engagements',
    'ui.trustDelivery': 'Livraison gratuite à Casablanca et à l’aéroport Mohammed V',
    'ui.trustInsurance': 'Assurance tous risques incluse',
    'ui.trustHours': 'Équipe joignable {hours}',
    'ui.deposit': 'caution dès {price}',

    /* Bandeaux d'action */
    'ui.ctaTitle': 'Réservez votre voiture à Casablanca',
    'ui.ctaText': 'Envoyez votre demande en ligne : l’équipe confirme la disponibilité et le prix sur WhatsApp ou par téléphone.',
    'ui.inlineTitle': 'Une question avant de réserver ?',
    'ui.inlineText': 'L’équipe répond sur WhatsApp et au téléphone, {hours}.',

    /* Cartes véhicule */
    'ui.cardBook': 'Réserver',
    'ui.cardSee': 'Voir le modèle',
    'ui.rented': 'Actuellement loué',
    'ui.seats': '{count} places',

    /* Accueil */
    'home.ecoTitle': 'Voitures économiques à louer à Casablanca',
    'home.sedanTitle': 'Berlines et SUV à louer à Casablanca',
    'home.luxeTitle': 'Voitures de luxe à louer à Casablanca',
    'home.luxeText': 'Porsche, Range Rover, Mercedes : livraison gratuite en ville et à l’aéroport, 5 jours minimum.',
    'home.luxeAll': 'Toutes les voitures de luxe',
    'home.seeAll': 'Voir tout le catalogue',
    'home.agencyTitle': 'Notre agence à Casablanca',
    'home.showMap': 'Afficher la carte',
    'home.searchTitle': 'Vos dates de location',

    /* Fiche */
    'ui.request': 'Demander ce véhicule',
    'ui.ask': 'Poser une question',
    'ui.included': 'Inclus',

    /* Formulaire */
    'ui.formMore': 'Ajouter un e-mail ou une précision',
    'ui.formReassure': 'Aucun paiement en ligne : l’équipe vous confirme la disponibilité et le prix avant toute location.',
    'ui.formRequired': 'Champ obligatoire',
    'ui.dialCode': 'Indicatif',

    /* Pages de contenu */
    'ui.toc': 'Sommaire',
    'ui.related': 'À lire aussi',
    'ui.readingTime': '{count} min de lecture',
    'ui.byTeam': 'L’équipe Yourent',
    'ui.updated': 'Mis à jour le {date}',
    'ui.latest': 'Dernier article',
  },
  en: {
    'ui.call': 'Call',
    'ui.callAgency': 'Call the agency',
    'ui.whatsapp': 'WhatsApp',
    'ui.whatsappLong': 'Message us on WhatsApp',
    'ui.book': 'Book',
    'ui.actionsAria': 'Quick actions',
    'ui.languages': 'Language',
    'ui.skip': 'Skip to content',
    'ui.menu': 'Menu',
    'ui.breadcrumbAria': 'Breadcrumb',

    'ui.from': 'from',
    'ui.perDay': '/day',
    'ui.factFrom': 'from {price}/day',
    'ui.factMinDays': '{count}-day minimum',
    'ui.factDelivery': 'free delivery in Casablanca and at Mohammed V airport',
    'ui.rating': '{value}/5 on Google ({count} reviews)',
    'ui.trustAria': 'Our commitments',
    'ui.trustDelivery': 'Free delivery in Casablanca and at Mohammed V airport',
    'ui.trustInsurance': 'Comprehensive insurance included',
    'ui.trustHours': 'Team available {hours}',
    'ui.deposit': 'deposit from {price}',

    'ui.ctaTitle': 'Book your car in Casablanca',
    'ui.ctaText': 'Send your request online: the team confirms availability and price on WhatsApp or by phone.',
    'ui.inlineTitle': 'A question before booking?',
    'ui.inlineText': 'The team answers on WhatsApp and by phone, {hours}.',

    'ui.cardBook': 'Book',
    'ui.cardSee': 'View the model',
    'ui.rented': 'Currently rented',
    'ui.seats': '{count} seats',

    'home.ecoTitle': 'Budget cars for rent in Casablanca',
    'home.sedanTitle': 'Sedans and SUVs for rent in Casablanca',
    'home.luxeTitle': 'Luxury cars for rent in Casablanca',
    'home.luxeText': 'Porsche, Range Rover, Mercedes: free delivery in the city and at the airport, 5-day minimum.',
    'home.luxeAll': 'All luxury cars',
    'home.seeAll': 'See the full catalogue',
    'home.agencyTitle': 'Our agency in Casablanca',
    'home.showMap': 'Show the map',
    'home.searchTitle': 'Your rental dates',

    'ui.request': 'Request this car',
    'ui.ask': 'Ask a question',
    'ui.included': 'Included',

    'ui.formMore': 'Add an email or a note',
    'ui.formReassure': 'No online payment: the team confirms availability and price before anything is booked.',
    'ui.formRequired': 'Required field',
    'ui.dialCode': 'Country code',

    'ui.toc': 'Contents',
    'ui.related': 'Further reading',
    'ui.readingTime': '{count} min read',
    'ui.byTeam': 'The Yourent team',
    'ui.updated': 'Updated on {date}',
    'ui.latest': 'Latest article',
  },
  ar: {
    'ui.call': 'اتصال',
    'ui.callAgency': 'اتصل بالوكالة',
    'ui.whatsapp': 'واتساب',
    'ui.whatsappLong': 'راسلنا عبر واتساب',
    'ui.book': 'احجز',
    'ui.actionsAria': 'إجراءات سريعة',
    'ui.languages': 'اللغة',
    'ui.skip': 'انتقل إلى المحتوى',
    'ui.menu': 'القائمة',
    'ui.breadcrumbAria': 'مسار التنقل',

    'ui.from': 'ابتداءً من',
    'ui.perDay': '/يوم',
    'ui.factFrom': 'ابتداءً من {price} لليوم',
    'ui.factMinDays': '{count} أيام على الأقل',
    'ui.factDelivery': 'توصيل مجاني داخل الدار البيضاء وإلى مطار محمد الخامس',
    'ui.rating': '{value}/5 على Google · {count} تقييم',
    'ui.trustAria': 'التزاماتنا',
    'ui.trustDelivery': 'توصيل مجاني داخل الدار البيضاء وإلى مطار محمد الخامس',
    'ui.trustInsurance': 'تأمين ضد جميع المخاطر مشمول',
    'ui.trustHours': 'الفريق متاح {hours}',
    'ui.deposit': 'الضمان ابتداءً من {price}',

    'ui.ctaTitle': 'احجز سيارتك في الدار البيضاء',
    'ui.ctaText': 'أرسل طلبك عبر الإنترنت، ويؤكد لك الفريق التوفر والسعر عبر واتساب أو الهاتف.',
    'ui.inlineTitle': 'لديك سؤال قبل الحجز؟',
    'ui.inlineText': 'يجيبك الفريق عبر واتساب والهاتف، {hours}.',

    'ui.cardBook': 'احجز',
    'ui.cardSee': 'عرض الطراز',
    'ui.rented': 'مكتراة حاليًا',
    'ui.seats': '{count} مقاعد',

    'home.ecoTitle': 'سيارات اقتصادية للكراء في الدار البيضاء',
    'home.sedanTitle': 'سيارات سيدان ودفع رباعي للكراء في الدار البيضاء',
    'home.luxeTitle': 'سيارات فاخرة للكراء في الدار البيضاء',
    'home.luxeText': 'بورش ورينج روفر ومرسيدس: توصيل مجاني داخل المدينة وإلى المطار، ومدة الكراء 5 أيام على الأقل.',
    'home.luxeAll': 'جميع السيارات الفاخرة',
    'home.seeAll': 'عرض الكتالوج كاملًا',
    'home.agencyTitle': 'وكالتنا في الدار البيضاء',
    'home.showMap': 'عرض الخريطة',
    'home.searchTitle': 'تواريخ الكراء',

    'ui.request': 'اطلب هذه السيارة',
    'ui.ask': 'اطرح سؤالًا',
    'ui.included': 'مشمول',

    'ui.formMore': 'أضف بريدًا إلكترونيًا أو ملاحظة',
    'ui.formReassure': 'لا دفع عبر الإنترنت: يؤكد لك الفريق التوفر والسعر قبل أي كراء.',
    'ui.formRequired': 'حقل إلزامي',
    'ui.dialCode': 'رمز البلد',

    'ui.toc': 'المحتويات',
    'ui.related': 'اقرأ أيضًا',
    'ui.readingTime': '{count} د للقراءة',
    'ui.byTeam': 'فريق Yourent',
    'ui.updated': 'آخر تحديث: {date}',
    'ui.latest': 'أحدث مقال',
  },
};
