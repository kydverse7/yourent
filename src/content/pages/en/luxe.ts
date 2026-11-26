import type { PageContent } from '../../types';

const page: PageContent = {
  metaTitle: 'Luxury Car Rental Casablanca from {minPrice} MAD | Yourent',
  metaDescription:
    'Luxury car rental in Casablanca: Range Rover, Porsche Macan and Mercedes from {minPrice} MAD/day. Prestige cars delivered free to your hotel or the airport.',
  eyebrow: 'Prestige cars',
  h1: 'Luxury car rental in Casablanca: Range Rover, Porsche, Mercedes',
  intro:
    'Yourent offers luxury car rental in Casablanca with Range Rover, Porsche Macan, Mercedes and Volkswagen Touareg, from {minPrice} to {maxPrice} MAD per day. Delivery is free across the city and at Mohammed V airport, to your hotel or your address. Send an online request with your dates, and the team confirms on WhatsApp. Rentals run for at least 5 days, so this suits a stay rather than a single evening.',
  breadcrumb: 'Luxury car',
  vehicles: {
    models: [
      'range-rover-sport',
      'porsche-macan',
      'mercedes-e-220',
      'mercedes-c-220',
      'mercedes-cla',
      'range-rover-evoque',
      'volkswagen-touareg',
    ],
    sort: 'desc',
  },
  sections: [
    {
      h2: 'Luxury car rental in Casablanca: which car for your needs',
      blocks: [
        {
          type: 'p',
          text: "A **luxury car rental in Casablanca** usually answers one of three needs: making a good impression, travelling comfortably over long distances or enjoying the drive. The right car depends on how you will use it before it depends on the price.",
        },
        {
          type: 'list',
          items: [
            '**Make an impression**: a Mercedes saloon, the [C 220](/catalogue/mercedes-c-220) at {price:mercedes-c-220} MAD or the [E 220](/catalogue/mercedes-e-220) at {price:mercedes-e-220} MAD per day, for a business meeting or a ceremony.',
            '**Travel with family and luggage**: the [Range Rover Sport](/catalogue/range-rover-sport) and the [Volkswagen Touareg](/catalogue/volkswagen-touareg) are the largest cars in the selection, which counts on the road to Marrakech or Rabat.',
            '**Enjoy the drive**: the [Porsche Macan](/catalogue/porsche-macan) for sportier driving, or the [Mercedes CLA](/catalogue/mercedes-cla) for coupé lines at a lower price.',
            '**Choose a more compact prestige car**: the [Range Rover Evoque](/catalogue/range-rover-evoque), which is also simpler to park in town.',
          ],
        },
        {
          type: 'p',
          text: 'All seven have 5 seats and an automatic gearbox, so the choice comes down to size, style and budget.',
        },
      ],
    },
    {
      h2: 'Luxury cars and their daily rates',
      blocks: [
        {
          type: 'p',
          text: 'The prices below are daily rates for rentals of 5 to 10 days. After 10 days, the rate drops automatically on most of them, but high season can suspend this. To estimate your budget, multiply the rate of the model by the number of days, 5 at least.',
        },
        { type: 'pricing' },
        {
          type: 'p',
          text: 'Delivery in Casablanca and at the airport adds nothing to these rates. The deposit is separate, and it comes back to you when the car is returned in good condition.',
        },
      ],
    },
    {
      h2: 'Premium car hire by brand: Mercedes, Range Rover, Porsche',
      blocks: [
        {
          type: 'p',
          text: 'If you already know the brand you want, each one has its own page. [Mercedes rental in Casablanca](route:mercedes) covers the CLA, the C 220 and the E 220. [Range Rover rental in Casablanca](route:range-rover) compares the Sport and the Evoque. [Porsche rental in Casablanca](route:porsche) is devoted to the Macan, and [Volkswagen rental](route:volkswagen) includes the Touareg.',
        },
        {
          type: 'p',
          text: 'Several of these models exist in only one or two units, so send your request early if your dates fall around a wedding or a holiday period. The date search in the catalogue shows which cars are still free.',
        },
      ],
    },
    {
      h2: 'Weddings, business trips and longer stays',
      blocks: [
        {
          type: 'p',
          text: 'For a wedding or a ceremony, people often ask whether the car can be hired for a single day. It cannot, because every rental lasts at least 5 days. Plan a period that includes the event and give the key date in your request.',
        },
        {
          type: 'p',
          text: 'For a business trip, the car can be waiting at your hotel or brought to you when you land, as our [car rental at Casablanca airport](route:aeroport) page explains. If you are looking for a car with a driver, ask on WhatsApp, because the site offers the car on its own.',
        },
      ],
    },
    {
      h2: 'What the rental includes',
      blocks: [
        {
          type: 'list',
          items: [
            'Free delivery in Casablanca, to your hotel, to the address of your choice or to Mohammed V airport.',
            'Comprehensive insurance on every prestige car, with an excess.',
            'A replacement car if you break down, and help from the team if you have an accident.',
            'A lower rate applied automatically after 10 days on most models, with nothing to ask for.',
          ],
        },
        {
          type: 'p',
          text: 'Ask the team on WhatsApp for the excess amount, because it is not published here. All models and terms are also on the [car rental prices in Casablanca](route:tarifs) page.',
        },
      ],
    },
    {
      h2: 'Requirements to rent a luxury car: age, licence, deposit',
      blocks: [
        {
          type: 'p',
          text: 'You must be at least 21, with a licence held for more than 2 years. Bring a valid ID (CIN or passport) and proof of address as well. Foreign tourists can show an international driving permit.',
        },
        {
          type: 'p',
          text: 'The deposit is left at pick-up, by cheque, in cash or by card imprint. The amount depends on the car: it appears in the price table when it is set, and the team confirms it before pick-up. The rest is in the [car rental requirements](route:conditions).',
        },
      ],
    },
    {
      h2: 'How to book a prestige car',
      blocks: [
        {
          type: 'list',
          ordered: true,
          items: [
            'Choose the car in the selection below, with your start and end dates.',
            'Send the online request. Nothing is charged at this stage.',
            'The team confirms by WhatsApp or phone and tells you the deposit and the documents to bring.',
            'The car is delivered to the address you chose, and you check it with the team at the handover.',
          ],
        },
        {
          type: 'p',
          text: 'If your dates move, changing or cancelling is free up to 24 hours before pick-up. After that, fees may apply.',
        },
      ],
    },
    {
      h2: 'Luxury cars available',
      blocks: [{ type: 'vehicles' }],
    },
  ],
  faq: [
    {
      q: 'What is the cheapest luxury car in Casablanca at Yourent?',
      a: 'In the prestige selection, rates start at {minPrice} MAD per day. The [Mercedes CLA](/catalogue/mercedes-cla), the [Range Rover Evoque](/catalogue/range-rover-evoque) and the [Touareg](/catalogue/volkswagen-touareg) are the most affordable, and the [Range Rover Sport](/catalogue/range-rover-sport) tops the range at {maxPrice} MAD per day.',
    },
    {
      q: 'Can a luxury car be delivered to my hotel or the airport?',
      a: 'Yes, delivery is free to your hotel or any address in Casablanca, and to Mohammed V airport. The team gives the exact meeting point on WhatsApp.',
    },
    {
      q: 'Can I hire a luxury car for one day or for a wedding?',
      a: 'Not for a single day: the minimum rental is 5 days. For a wedding, book a period that covers the date and mention the event in your request.',
    },
    {
      q: 'What deposit is required for a luxury car?',
      a: 'You leave it at pick-up, by cheque, cash or card imprint. The amount depends on the car, so the team gives it to you at confirmation. You recover it if the car returns in good condition.',
    },
    {
      q: 'Are the luxury cars insured?',
      a: 'Yes, each one has comprehensive cover with an excess, but the amount is not published here. Ask the team on WhatsApp before you book.',
    },
    {
      q: 'Can I rent a luxury car with a driver?',
      a: 'The site offers the car on its own, but the team answers on WhatsApp if you need a driver.',
    },
  ],
  related: ['mercedes', 'range-rover', 'porsche', 'suv', 'tarifs'],
};

export default page;
