import type { PageContent } from '../../types';

const page: PageContent = {
  metaTitle: 'Sedan & Saloon Car Rental Casablanca from {minPrice} MAD | Yourent',
  metaDescription:
    'Sedan rental in Casablanca: Toyota Corolla hybrid, Audi A3, Golf 8, Mercedes CLA, C-Class and E-Class saloons, {minPrice} to {maxPrice} MAD/day. Free delivery.',
  eyebrow: 'Sedans and saloons',
  h1: 'Sedan rental in Casablanca: Mercedes saloons, Audi A3, Toyota Corolla',
  intro:
    'Yourent offers sedan rental in Casablanca with six saloons and compact cars, from the Toyota Corolla hybrid to the Mercedes E 220, from {minPrice} to {maxPrice} MAD per day. Delivery is free anywhere in Casablanca and at Mohammed V airport. Send your request online with your dates, then the team confirms on WhatsApp or by phone. The minimum rental is 5 days.',
  breadcrumb: 'Sedans and saloons',
  vehicles: {
    models: ['toyota-corolla', 'audi-a3', 'volkswagen-golf-8', 'mercedes-cla', 'mercedes-c-220', 'mercedes-e-220'],
    sort: 'asc',
  },
  sections: [
    {
      h2: 'Six saloons to rent in Casablanca, from the Corolla to the E-Class',
      blocks: [
        {
          type: 'p',
          text: 'For a **sedan rental in Casablanca**, or a saloon as British drivers call it, the fleet runs from the everyday compact to the big motorway cruiser. All six have 5 seats. The table gives the daily rate for 5 to 10 days.',
        },
        {
          type: 'table',
          head: ['Model', 'Type', 'Fuel and gearbox', 'Daily rate'],
          rows: [
            ['[Toyota Corolla](/catalogue/toyota-corolla)', 'Saloon', 'Hybrid, automatic', '{price:toyota-corolla} MAD'],
            ['[Audi A3](/catalogue/audi-a3)', 'Premium compact', 'Petrol, automatic', '{price:audi-a3} MAD'],
            [
              '[Volkswagen Golf 8](/catalogue/volkswagen-golf-8)',
              'Compact',
              'Diesel or petrol, automatic or manual, depending on the unit',
              '{price:volkswagen-golf-8} MAD',
            ],
            ['[Mercedes CLA](/catalogue/mercedes-cla)', 'Four-door coupé', 'Petrol, automatic', '{price:mercedes-cla} MAD'],
            ['[Mercedes C 220](/catalogue/mercedes-c-220)', 'Saloon', 'Diesel, automatic', '{price:mercedes-c-220} MAD'],
            ['[Mercedes E 220](/catalogue/mercedes-e-220)', 'Large saloon', 'Diesel, automatic', '{price:mercedes-e-220} MAD'],
          ],
        },
        {
          type: 'p',
          text: 'For the Golf 8, state the gearbox and fuel you want in your request: the team tells you which unit is free on your dates.',
        },
      ],
    },
    {
      h2: 'Which saloon to choose for your journey',
      blocks: [
        {
          type: 'list',
          items: [
            '**In town, every day**: the [Toyota Corolla](/catalogue/toyota-corolla), hybrid and automatic, is effortless in Casablanca traffic.',
            '**Meetings and motorway**: the [Volkswagen Golf 8](/catalogue/volkswagen-golf-8) or the [Audi A3](/catalogue/audi-a3), compact and at ease in both settings.',
            '**Business travel**: the [Mercedes C 220](/catalogue/mercedes-c-220), understated and still a reasonable size for town.',
            '**Long drives with passengers**: the [Mercedes E 220](/catalogue/mercedes-e-220), the largest, for the road to Rabat or Marrakech.',
            '**A stay for two, with style**: the [Mercedes CLA](/catalogue/mercedes-cla), whose coupé roofline leaves less room in the back.',
          ],
        },
      ],
    },
    {
      h2: 'Luxury sedan and executive car hire: the three Mercedes',
      blocks: [
        {
          type: 'p',
          text: 'If you are after a **luxury saloon** or an executive car, the choice narrows to the three Mercedes. The CLA is {price:mercedes-cla} MAD per day, the C 220 {price:mercedes-c-220} MAD and the E 220 {price:mercedes-e-220} MAD. All three have an automatic gearbox.',
        },
        {
          type: 'p',
          text: 'The [Mercedes rental in Casablanca](route:mercedes) page compares them in detail. For all the prestige models, SUVs included, see [luxury car rental in Casablanca](route:luxe).',
        },
      ],
    },
    {
      h2: 'Saloon or SUV: which to choose in Casablanca',
      blocks: [
        {
          type: 'p',
          text: 'A saloon sits lower and is more discreet than an SUV. It suits people who drive mostly on the road and in town, and who do not need a high driving position. For a family with a lot of luggage, on the other hand, an SUV is simpler to load.',
        },
        {
          type: 'p',
          text: 'To compare, the [SUV rental in Casablanca](route:suv) page brings the whole range together, and the [luxury SUV rental in Casablanca](route:suv-luxe) page the premium models. If an automatic gearbox is your first criterion, start from [automatic car rental in Casablanca](route:automatique) instead.',
        },
      ],
    },
    {
      h2: 'Sedan rental prices in Casablanca',
      blocks: [
        { type: 'pricing' },
        {
          type: 'p',
          text: 'The table shows the rate for 5 to 10 days, the rate that applies after 10 days and the deposit when one is listed. Delivery in Casablanca and at the airport adds nothing to the rate, and comprehensive insurance with an excess is included. The list for the whole fleet is on the [car rental prices in Casablanca](route:tarifs) page.',
        },
      ],
    },
    {
      h2: 'Delivery, rental period and requirements',
      blocks: [
        {
          type: 'p',
          text: 'The car is delivered to your hotel, your address or Mohammed V airport, free of charge, every day from 8 am to 10 pm. If you want a Mercedes waiting when you land, the [luxury car rental at Casablanca airport](route:luxe-aeroport) page explains the handover. Delivery is free in Marrakech and at Marrakech-Menara airport too, and possible to Mohammedia for a small extra charge.',
        },
        {
          type: 'p',
          text: 'Every rental lasts at least 5 days. You must be at least 21, with a licence held for more than 2 years, a valid ID (CIN or passport) and proof of address; foreign visitors can show an international driving permit. A deposit is taken at pick-up, by cheque, in cash or by card imprint. The rest is in the [car rental requirements](route:conditions).',
        },
      ],
    },
    {
      h2: 'Saloons available',
      blocks: [{ type: 'vehicles' }],
    },
  ],
  faq: [
    {
      q: 'How much does it cost to rent a sedan in Casablanca?',
      a: 'At Yourent, rates in this selection start at {minPrice} MAD per day, with the Toyota Corolla at {price:toyota-corolla} MAD. The Mercedes E 220 is {price:mercedes-e-220} MAD per day.',
    },
    {
      q: 'Which saloons have an automatic gearbox?',
      a: 'The Toyota Corolla, the Audi A3 and the three Mercedes are automatic. The Golf 8 comes with an automatic or a manual gearbox depending on the unit: state your choice in the request.',
    },
    {
      q: 'Is there a hybrid sedan to rent?',
      a: 'Yes, the [Toyota Corolla](/catalogue/toyota-corolla), a hybrid with an automatic gearbox.',
    },
    {
      q: 'Which saloon should I choose for a business trip to Casablanca?',
      a: 'The [Mercedes C 220](/catalogue/mercedes-c-220) for an understated look, or the [E 220](/catalogue/mercedes-e-220) if you carry passengers in the back. Both can be waiting for you at Mohammed V airport.',
    },
    {
      q: 'Can I rent a sedan for a weekend?',
      a: 'No. The minimum rental is 5 days, and the daily rate drops after 10 days on most models.',
    },
    {
      q: 'What deposit is needed to rent a saloon?',
      a: 'It depends on the car: the price table shows the amount when it is listed, and the team confirms it before you book. You leave it at pick-up, by cheque, in cash or by card imprint.',
    },
  ],
  related: ['mercedes', 'audi', 'luxe', 'automatique', 'suv', 'tarifs'],
};

export default page;
