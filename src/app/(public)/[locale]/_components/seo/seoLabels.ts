import type { Locale } from '@/lib/i18n/translations';

/** Libellés fixes du gabarit des pages SEO. */
export const SEO_LABELS: Record<
  Locale,
  {
    home: string;
    blog: string;
    fleet: string;
    pricingModel: string;
    pricingShort: string;
    pricingLong: string;
    pricingDeposit: string;
    pricingNote: string;
    pricingHighSeason: string;
    perDay: string;
    currency: string;
    from: string;
    unavailable: string;
    book: string;
    catalogue: string;
    whatsapp: string;
    faqTitle: string;
    relatedTitle: string;
    delivery: string;
    minDays: string;
    googleReviews: string;
    onRequest: string;
    updated: string;
    sources: string;
    readMore: string;
    blogTitle: string;
    blogIntro: string;
    notFoundTitle: string;
    notFoundBody: string;
    notFoundCta: string;
  }
> = {
  fr: {
    home: 'Accueil',
    blog: 'Blog',
    fleet: 'Les véhicules disponibles',
    pricingModel: 'Modèle',
    pricingShort: '5 à 10 jours',
    pricingLong: 'Plus de 10 jours',
    pricingDeposit: 'Caution dès',
    pricingNote: 'Tarifs par jour en dirhams, location de 5 jours minimum. Équivalent en euros indicatif, facturation en dirhams.',
    pricingHighSeason: 'Haute saison en cours : le tarif réduit de plus de 10 jours ne s’applique pas actuellement.',
    perDay: '/jour',
    currency: 'DH',
    from: 'À partir de',
    unavailable: 'Actuellement loué',
    book: 'Réserver',
    catalogue: 'Voir le catalogue',
    whatsapp: 'Écrire sur WhatsApp',
    faqTitle: 'Questions fréquentes',
    relatedTitle: 'À voir aussi',
    delivery: 'Livraison gratuite à Casablanca et à l’aéroport',
    minDays: 'Location de 5 jours minimum',
    googleReviews: 'avis Google',
    onRequest: 'Sur demande',
    updated: 'Mis à jour le',
    sources: 'Sources',
    readMore: 'Lire l’article',
    blogTitle: 'Conseils pour louer une voiture à Casablanca',
    blogIntro: 'Prix, caution, documents, conduite au Maroc : nos réponses aux questions les plus fréquentes.',
    notFoundTitle: 'Cette page n’existe pas',
    notFoundBody: 'L’adresse est peut-être erronée. Vous trouverez tous nos véhicules dans le catalogue.',
    notFoundCta: 'Voir le catalogue',
  },
  en: {
    home: 'Home',
    blog: 'Blog',
    fleet: 'Available vehicles',
    pricingModel: 'Model',
    pricingShort: '5 to 10 days',
    pricingLong: 'Over 10 days',
    pricingDeposit: 'Deposit from',
    pricingNote: 'Daily rates in Moroccan dirhams, 5-day minimum rental. Euro equivalent for guidance only, billing in dirhams.',
    pricingHighSeason: 'High season: the reduced rate for rentals over 10 days does not currently apply.',
    perDay: '/day',
    currency: 'MAD',
    from: 'From',
    unavailable: 'Currently rented',
    book: 'Book',
    catalogue: 'See the catalogue',
    whatsapp: 'Message us on WhatsApp',
    faqTitle: 'Frequently asked questions',
    relatedTitle: 'See also',
    delivery: 'Free delivery in Casablanca and at the airport',
    minDays: '5-day minimum rental',
    googleReviews: 'Google reviews',
    onRequest: 'On request',
    updated: 'Updated on',
    sources: 'Sources',
    readMore: 'Read the article',
    blogTitle: 'Advice on renting a car in Casablanca',
    blogIntro: 'Prices, deposit, documents, driving in Morocco: our answers to the most common questions.',
    notFoundTitle: 'This page does not exist',
    notFoundBody: 'The address may be wrong. You will find all our vehicles in the catalogue.',
    notFoundCta: 'See the catalogue',
  },
  ar: {
    home: 'الرئيسية',
    blog: 'المدونة',
    fleet: 'السيارات المتوفرة',
    pricingModel: 'الطراز',
    pricingShort: 'من 5 إلى 10 أيام',
    pricingLong: 'أكثر من 10 أيام',
    pricingDeposit: 'الضمان ابتداءً من',
    pricingNote: 'الأسعار لليوم الواحد بالدرهم، ومدة الكراء 5 أيام على الأقل.',
    pricingHighSeason: 'موسم الذروة: السعر المخفض لأكثر من 10 أيام غير مطبق حاليًا.',
    perDay: '/يوم',
    currency: 'درهم',
    from: 'ابتداءً من',
    unavailable: 'مكتراة حاليًا',
    book: 'احجز',
    catalogue: 'تصفح الكتالوج',
    whatsapp: 'راسلنا عبر واتساب',
    faqTitle: 'الأسئلة الشائعة',
    relatedTitle: 'صفحات ذات صلة',
    delivery: 'توصيل مجاني داخل الدار البيضاء وإلى المطار',
    minDays: 'مدة الكراء 5 أيام على الأقل',
    googleReviews: 'تقييم على Google',
    onRequest: 'عند الطلب',
    updated: 'آخر تحديث',
    sources: 'المصادر',
    readMore: 'اقرأ المقال',
    blogTitle: 'نصائح لكراء سيارة في الدار البيضاء',
    blogIntro: 'الأسعار والضمان والوثائق والسياقة في المغرب: إجاباتنا عن أكثر الأسئلة شيوعًا.',
    notFoundTitle: 'هذه الصفحة غير موجودة',
    notFoundBody: 'قد يكون العنوان خاطئًا. ستجد جميع سياراتنا في الكتالوج.',
    notFoundCta: 'تصفح الكتالوج',
  },
};
