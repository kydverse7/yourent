import type { PageContent } from '../../types';

const page: PageContent = {
  metaTitle: 'Car Rental Prices Casablanca from {fleetMin} MAD | Yourent',
  metaDescription:
    'Car rental prices in Casablanca: from {fleetMin} MAD per day, lower rate after 10 days on most models, free delivery in Casablanca and at Mohammed V airport.',
  eyebrow: 'Prices',
  h1: 'Car Rental Prices in Casablanca',
  intro:
    'At Yourent, car rental in Casablanca starts at {fleetMin} MAD per day, with a minimum rental of 5 days. On most models, the price drops automatically after 10 days. The price list below shows the current rate of each model.',
  breadcrumb: 'Prices',
  vehicles: { sort: 'asc' },
  sections: [
    {
      h2: 'Car rental price list by model',
      blocks: [
        {
          type: 'p',
          text: "Each row shows the model's daily rate, its rate after 10 days and the minimum deposit taken at pick-up. This list comes from the agency's current rates, so it is up to date when you read it. The cheapest car in the fleet starts at {fleetMin} MAD per day, the most expensive at {maxPrice} MAD per day.",
        },
        { type: 'pricing' },
      ],
    },
    {
      h2: 'The two price tiers: 5 to 10 days, then over 10 days',
      blocks: [
        {
          type: 'list',
          items: [
            '**From 5 to 10 days**: the standard daily rate of the model you choose. Yourent does not offer rentals of under 5 days.',
            '**After 10 days**: a lower rate applied automatically, with no code and no steps to take. On some models the gap is large, on others the rate stays the same: the "Over 10 days" column of the list shows it model by model.',
          ],
        },
        {
          type: 'p',
          text: 'How to read it: a Dacia Duster is listed at {price:dacia-duster} MAD per day for 5 to 10 days. From day 11, the rate in the "Over 10 days" column applies. For a stay of several weeks, see the [long-term car rental](route:longue-duree) page.',
        },
      ],
    },
    {
      h2: 'What the price includes',
      blocks: [
        {
          type: 'list',
          items: [
            'Comprehensive insurance with an excess, on every car.',
            'Free delivery anywhere in Casablanca and at Mohammed V airport, 7 days a week from 8 am to 10 pm.',
            'Breakdown assistance (a replacement car) and help from the team after an accident.',
          ],
        },
        {
          type: 'p',
          text: 'Included mileage, the excess amount and whether you can return the car in another city are not shown on the site: the team tells you on WhatsApp before you book. There is no online payment: you pay the team directly.',
        },
      ],
    },
    {
      h2: 'The deposit by car',
      blocks: [
        {
          type: 'p',
          text: 'A deposit is taken at pick-up, by cheque, in cash or by card imprint. The amount depends on the car: the last column of the list, "Deposit from", gives the minimum for each model, and the team confirms the exact sum. It is returned once the car is back in good condition. The team gives the exact return timing before you book. The documents to bring are listed on the [rental requirements](route:conditions) page.',
        },
      ],
    },
    {
      h2: 'How to book at the listed price',
      blocks: [
        {
          type: 'p',
          text: 'Choose a car in the [catalogue](/catalogue), enter your pick-up and return dates, then send the request. The team confirms availability and price on WhatsApp or by phone. For a budget car, see also the [cheap car rental](route:economique) page.',
        },
      ],
    },
  ],
  faq: [
    {
      q: 'How much does a car rental in Casablanca cost at Yourent?',
      a: 'Prices start at {fleetMin} MAD per day and go up to {maxPrice} MAD per day depending on the model. The exact rate for each car is in the list on this page.',
    },
    {
      q: 'Is there a lower price for a long rental?',
      a: 'Yes. After 10 days, a lower rate applies automatically on most models. On some it stays the same: the list shows both rates for each car.',
    },
    {
      q: 'Is delivery included in the price?',
      a: 'Delivery is free anywhere in Casablanca and at Mohammed V airport. For another city, the team gives the terms on WhatsApp.',
    },
    {
      q: 'Can I rent for fewer than 5 days?',
      a: 'No, the minimum rental at Yourent is 5 days. The prices shown are daily rates for a rental of at least 5 days.',
    },
    {
      q: 'Do the prices change?',
      a: 'Yes, rates can change. The list on this page shows the current rates, and the team confirms the final price when you book.',
    },
  ],
  related: ['conditions', 'economique', 'longue-duree', 'faq'],
};

export default page;
