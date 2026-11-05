import type { PageContent } from '../../types';

const page: PageContent = {
  metaTitle: 'Car Rental Casablanca to Marrakech from {minPrice} MAD | Yourent',
  metaDescription:
    'Car rental from Casablanca to Marrakech: collect in Casablanca or at Mohammed V airport with free delivery, from {minPrice} MAD/day, 5-day minimum.',
  eyebrow: 'The Marrakech road',
  h1: 'Car rental from Casablanca to Marrakech: start in the city or at the airport',
  intro:
    'Yourent offers car rental from Casablanca to Marrakech with free delivery in the city or at Mohammed V airport, from {minPrice} MAD a day for at least 5 days. Send a request online and the team confirms on WhatsApp or by phone. Yourent has no agency in Marrakech, so you collect the car in Casablanca and drive south on the A3 motorway.',
  breadcrumb: 'Casablanca to Marrakech',
  vehicles: { sort: 'asc' },
  sections: [
    {
      h2: 'No agency in Marrakech: what that means for your trip',
      blocks: [
        {
          type: 'p',
          text: "Our only address is in Casablanca, at N°25 Rue Ibnou Mounir, so this page won't offer you a desk in Marrakech. If you want to **rent a car in Casablanca and drive to Marrakech**, you take the car at the start of your trip and cover the road yourself.",
        },
        {
          type: 'list',
          items: [
            "**Starting out.** Delivery is free at Mohammed V airport, at your Casablanca hotel or at any address you choose in the city.",
            "**Handover in Marrakech.** The site doesn't describe this option, so ask on WhatsApp before you book.",
            '**Returning the car in Marrakech.** Only the team can answer this one. Until you hear back, plan a round trip that ends in Casablanca.',
            "**Length of hire.** The 5-day minimum suits a proper stay in the south, but it rules out a same-day return.",
          ],
        },
      ],
    },
    {
      h2: 'Driving from Casablanca to Marrakech on the A3',
      blocks: [
        {
          type: 'p',
          text: "The drive from Casablanca to Marrakech follows the A3, known as the southern motorway, which Autoroutes du Maroc (ADM) lists as a dual carriageway. After Bouskoura and the airport interchange, it serves Berrechid, Settat, Skhour Rhamna and Benguerir, then reaches the Marrakech junction.",
        },
        {
          type: 'p',
          text: 'Allow a little over 200 km of motorway. ADM places that junction at kilometre 198.8, while published lengths for the route range from 210 km (Wikipedia) to 219 km (ADM). From Mohammed V airport, you are already on the A3: its interchange sits at kilometre 13.1, about 185 km before the junction.',
        },
        {
          type: 'p',
          text: "We don't quote a driving time, because it depends on traffic and on your stops; check your GPS on the day. ADM also mentions widening work between Casablanca and Berrechid. Look at [ADM's live traffic page](https://www.adm.co.ma/fr/le-trafic-en-temps-reel) before you leave, and remember the motorway limit of 120 km/h.",
        },
        {
          type: 'p',
          text: 'Carrying on past Marrakech? Our [Casablanca, Marrakech and Agadir road trip guide, in French](https://www.yourent.ma/blog/road-trip-casablanca-marrakech-agadir), covers the rest of the route.',
        },
      ],
    },
    {
      h2: 'Tolls between Casablanca and Marrakech',
      blocks: [
        {
          type: 'p',
          text: "The A3 is a toll road, and the amount depends on both the section and your vehicle class. You won't find a figure here because [ADM's toll table](https://www.adm.co.ma/fr/grille-tarifaire-sur-le-reseau) shows no effective date. Our [guide to the Casablanca, Marrakech and Rabat tolls, in French](https://www.yourent.ma/blog/peages-casablanca-marrakech-rabat), explains how to read it.",
        },
        {
          type: 'p',
          text: 'Height matters when you choose a car. According to ADM, a two-axle vehicle stays in class 1 up to 1.30 m, measured at the front axle, then moves to class 2. So an SUV may pay more than a small city car. Toll lanes accept the Pass Jawaz, bank cards, the network card and cash.',
        },
      ],
    },
    {
      h2: 'Which car to rent in Casablanca for the Marrakech drive',
      blocks: [
        {
          type: 'p',
          text: "Every car we rent has 5 seats, so the decision comes down to boot space, gearbox and budget.",
        },
        {
          type: 'table',
          head: ['Your trip', 'Cars to look at', 'For this drive'],
          rows: [
            [
              'Two people on a tight budget',
              '[Fiat 500](/catalogue/fiat-500) ({price:fiat-500} MAD/day), [Opel Corsa](/catalogue/opel-corsa) ({price:opel-corsa} MAD/day)',
              'Petrol and manual. The boot is small.',
            ],
            [
              'A couple who want an automatic',
              '[Toyota Corolla](/catalogue/toyota-corolla) ({price:toyota-corolla} MAD/day), [Volkswagen Golf 8](/catalogue/volkswagen-golf-8) ({price:volkswagen-golf-8} MAD/day)',
              'Corolla: hybrid automatic. Golf 8: diesel or petrol, automatic or manual depending on the unit.',
            ],
            [
              'A family with suitcases',
              '[Dacia Duster](/catalogue/dacia-duster) ({price:dacia-duster} MAD/day), [Volkswagen Tiguan](/catalogue/volkswagen-tiguan) ({price:volkswagen-tiguan} MAD/day)',
              'Diesel SUVs: the Duster is manual, the Tiguan automatic.',
            ],
            [
              'Extra comfort',
              '[Kia Sorento](/catalogue/kia-sorento) ({price:kia-sorento} MAD/day), [Volkswagen Touareg](/catalogue/volkswagen-touareg) ({price:volkswagen-touareg} MAD/day)',
              'Diesel SUVs with an automatic gearbox.',
            ],
            [
              'A premium trip',
              '[Mercedes CLA](/catalogue/mercedes-cla) ({price:mercedes-cla} MAD/day), [Range Rover Evoque](/catalogue/range-rover-evoque) ({price:range-rover-evoque} MAD/day)',
              'Automatics: petrol for the CLA, diesel for the Evoque.',
            ],
          ],
        },
        {
          type: 'p',
          text: 'A city car is enough for two people travelling light on a budget. With three or four people and suitcases, our [SUV rental in Casablanca](route:suv) page is more useful. If you would rather not change gear on a long stretch, see our [automatic car rental in Casablanca](route:automatique) as well.',
        },
      ],
    },
    {
      h2: 'Car rental from Casablanca to Marrakech: how to book',
      blocks: [
        {
          type: 'list',
          ordered: true,
          items: [
            'Search your dates in the [catalogue](/catalogue), which leaves out cars that are already taken.',
            'Say in your request that you are heading to Marrakech. Then choose where to collect the car: at the airport ([Casablanca airport car rental](route:aeroport)), at a hotel or at a city address.',
            "At the WhatsApp or phone confirmation, ask about the return and the included mileage, which the site doesn't publish.",
            'Bring a valid ID, a licence held for over 2 years and proof of address. You must also be at least 21. Our [rental requirements](route:conditions) cover the rest, including the deposit.',
          ],
        },
        {
          type: 'p',
          text: "Save +212 6 61 23 62 31 in your phone before you leave Casablanca. If the car breaks down, a replacement is sent as quickly as possible, but ask the team how this works so far from the agency. For a wider tour, our [car rental in Morocco](route:maroc) page offers more pointers.",
        },
      ],
    },
    {
      h2: 'What the car costs for this trip',
      blocks: [
        { type: 'pricing' },
        {
          type: 'p',
          text: "The table lists each model's daily rate, then the rate that applies after 10 days on most models. Fuel and tolls are not part of these figures. Our [car rental prices](route:tarifs) page covers the whole fleet.",
        },
      ],
    },
    {
      h2: 'Cars to book for your Marrakech trip',
      blocks: [{ type: 'vehicles' }],
    },
  ],
  faq: [
    {
      q: 'Does Yourent have an agency in Marrakech?',
      a: 'No. The agency is in Casablanca, so any trip to Marrakech starts there or at Mohammed V airport.',
    },
    {
      q: 'Can the car be delivered to Marrakech, or returned there?',
      a: "Neither option is described on the site. Mention it in your request, and the team will answer on WhatsApp before anything is confirmed.",
    },
    {
      q: 'Which motorway do I take, and how far is it?',
      a: 'Take the A3, from Casablanca or from the airport. Allow a little over 200 km of motorway: published lengths range from 210 to 219 km depending on the source.',
    },
    {
      q: 'How much is the toll from Casablanca to Marrakech?',
      a: "This page gives no amount, because it varies with the section and the vehicle class. Check ADM's toll table before you set off.",
    },
    {
      q: 'Can I rent for a same-day return trip?',
      a: 'No, because the minimum rental is 5 days. Rates start at {minPrice} MAD per day and drop after 10 days on most models.',
    },
  ],
  related: ['aeroport', 'maroc', 'suv', 'automatique', 'tarifs'],
};

export default page;
