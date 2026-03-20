export type Locale = 'fr' | 'en';

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
  'why.insurance.title': 'Assurance tous risques',
  'why.insurance.desc':
    'Tous nos véhicules sont couverts par une assurance complète tous risques.',
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
  'faq.q4': 'Comment fonctionne la caution ?',
  'faq.a4':
    "Une caution est demandée au départ, par chèque ou espèces, dont le montant varie selon le véhicule. Elle est intégralement restituée au retour du véhicule en bon état.",
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
};

export const translations: Record<Locale, Record<string, string>> = { fr, en };

/** Translate a key for a given locale (server-safe). */
export function t(locale: Locale, key: string): string {
  return translations[locale]?.[key] ?? translations.fr[key] ?? key;
}

/** Pluralize helper — replaces {s} with 's' when count > 1. */
export function tp(locale: Locale, key: string, count: number): string {
  const raw = t(locale, key);
  return raw.replace(/\{s\}/g, count > 1 ? 's' : '').replace('{count}', String(count));
}
