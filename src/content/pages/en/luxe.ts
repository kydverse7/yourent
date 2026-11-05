import type { PageContent } from '../../types';

const page: PageContent = {
  metaTitle: 'Luxury Car Rental Casablanca, Premium Cars | Yourent',
  metaDescription:
    'Luxury car rental Casablanca: Range Rover, Porsche Macan, Mercedes. From {minPrice} MAD/day, free delivery, insurance included. Send your request online.',
  eyebrow: 'Prestige cars',
  h1: 'Luxury Car Rental in Casablanca',
  intro:
    'Yourent offers luxury car rental in Casablanca: Range Rover Sport, Porsche Macan, Mercedes C, E and CLA, Range Rover Evoque and Volkswagen Touareg, from {minPrice} MAD to {maxPrice} MAD per day. Delivery is free in Casablanca and at Mohammed V airport. You send an online request with your dates and the team confirms on WhatsApp.',
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
      h2: 'Which luxury car to rent in Casablanca for your needs',
      blocks: [
        {
          type: 'p',
          text: "A **luxury car rental in Casablanca** usually answers one of three needs: arriving in a car that makes a good impression, travelling comfortably over long distances, or enjoying a great drive during your stay. Yourent's selection covers all three, with prestige and premium cars you can rent from {minPrice} MAD per day.",
        },
        {
          type: 'list',
          items: [
            '**Make an impression**: a Mercedes saloon ([C 220](/catalogue/mercedes-c-220) or [E 220](/catalogue/mercedes-e-220)) for a business meeting or a ceremony.',
            '**Travel with a group**: a [Range Rover Sport](/catalogue/range-rover-sport) or a [Volkswagen Touareg](/catalogue/volkswagen-touareg), roomy, for the road to Marrakech or Rabat with family and luggage.',
            '**Enjoy the drive**: the [Porsche Macan](/catalogue/porsche-macan) for sportier driving, or the [Mercedes CLA](/catalogue/mercedes-cla) for coupé lines at a gentler price.',
            '**Go for a more compact prestige car**: the [Range Rover Evoque](/catalogue/range-rover-evoque), easy to park in town.',
          ],
        },
      ],
    },
    {
      h2: 'Luxury cars and their daily rates',
      blocks: [
        {
          type: 'p',
          text: 'The prices below are daily rates for rentals of 5 to 10 days. After 10 days, the rate drops automatically on most of them. Every car in this selection has an automatic gearbox.',
        },
        { type: 'pricing' },
      ],
    },
    {
      h2: 'By brand: Mercedes, Range Rover, Porsche',
      blocks: [
        {
          type: 'p',
          text: 'If you already know the brand you want, each brand has its own page with the models available: [Mercedes rental](route:mercedes) (CLA, C 220, E 220), [Range Rover rental](route:range-rover) (Sport and Evoque), [Porsche rental](route:porsche) (Macan) and [Volkswagen rental](route:volkswagen) for the Touareg.',
        },
        {
          type: 'p',
          text: 'Premium cars come in small numbers: several of these models exist in only one or two units. Book early if your dates fall around a wedding or a holiday period, and use the date search in the catalogue to see what is free.',
        },
      ],
    },
    {
      h2: 'What the rental includes',
      blocks: [
        {
          type: 'list',
          items: [
            'Free delivery in Casablanca, to your hotel, to the address of your choice or to [Mohammed V airport](route:aeroport).',
            'Comprehensive insurance with an excess on every car.',
            'A replacement car sent as soon as possible if you break down, and help from the team if you have an accident.',
            'A minimum rental of 5 days, with a lower rate applied automatically after 10 days on most models.',
          ],
        },
        {
          type: 'p',
          text: 'The deposit depends on the car: it appears in the table above when it is set, and the team confirms it before pick-up. For the excess amount, the team tells you on WhatsApp. All models and terms are also on the [prices](route:tarifs) page.',
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
            'Send the online request. No payment is taken at this stage.',
            'The team confirms by WhatsApp or phone and tells you the deposit and the documents to bring: ID (CIN or passport), a licence held for more than 2 years, proof of address.',
            'The car is delivered to the address you chose. At the end of the rental, the deposit is returned once the car is back in good condition.',
          ],
        },
        {
          type: 'p',
          text: 'You can change or cancel free of charge up to 24 hours before pick-up. All the rules are in the [rental requirements](route:conditions).',
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
      a: 'Yes. Delivery is free in Casablanca, to your hotel or any address you choose, and at Mohammed V airport. The team gives the exact meeting point on WhatsApp.',
    },
    {
      q: 'What deposit is required for a luxury car?',
      a: 'The deposit is taken at pick-up, by cheque, cash or card imprint. The amount depends on the car: the team gives it to you at confirmation, and it is returned once the car is back in good condition.',
    },
    {
      q: 'Are the luxury cars insured?',
      a: 'Yes, every Yourent car has comprehensive insurance with an excess. The team gives the excess amount on WhatsApp before you book.',
    },
    {
      q: 'Can I rent a luxury car with a driver?',
      a: 'The site offers the car on its own. For a driver, the team answers on WhatsApp.',
    },
  ],
  related: ['mercedes', 'range-rover', 'porsche', 'suv', 'tarifs'],
};

export default page;
