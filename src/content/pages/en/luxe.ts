import type { PageContent } from '../../types';

const page: PageContent = {
  metaTitle: 'Luxury Car Rental Casablanca from {minPrice} MAD | Yourent',
  metaDescription:
    'Luxury car rental in Casablanca: Range Rover, Porsche Macan, Mercedes. From {minPrice} MAD/day, free airport delivery, insured with an excess. Ask online.',
  eyebrow: 'Prestige cars',
  h1: 'Luxury car rental in Casablanca',
  intro:
    'Yourent offers luxury car rental in Casablanca with Range Rover, Porsche Macan, Mercedes and Volkswagen Touareg, from {minPrice} to {maxPrice} MAD per day. Delivery is free across the city and at Mohammed V airport. Send an online request with your dates, and the team confirms on WhatsApp.',
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
          text: "A **luxury car rental in Casablanca** usually answers one of three needs: making a good impression, travelling comfortably over long distances or enjoying the drive. Yourent's selection covers all three, with prestige cars from {minPrice} MAD per day.",
        },
        {
          type: 'list',
          items: [
            '**Make an impression**: a Mercedes saloon ([C 220](/catalogue/mercedes-c-220) or [E 220](/catalogue/mercedes-e-220)) for a business meeting or a ceremony.',
            '**Travel with family and luggage**: a [Range Rover Sport](/catalogue/range-rover-sport) or a [Volkswagen Touareg](/catalogue/volkswagen-touareg), for the road to Marrakech or Rabat.',
            '**Enjoy the drive**: the [Porsche Macan](/catalogue/porsche-macan) for sportier driving, or the [Mercedes CLA](/catalogue/mercedes-cla) for coupé lines at a lower price.',
            '**Choose a more compact prestige car**: the [Range Rover Evoque](/catalogue/range-rover-evoque), which is also simpler to park in town.',
          ],
        },
      ],
    },
    {
      h2: 'Luxury cars and their daily rates',
      blocks: [
        {
          type: 'p',
          text: 'The prices below are daily rates for rentals of 5 to 10 days. After 10 days, the rate drops automatically on most of them, but high season can suspend this. Every car in this selection has an automatic gearbox.',
        },
        { type: 'pricing' },
      ],
    },
    {
      h2: 'By brand: Mercedes, Range Rover, Porsche',
      blocks: [
        {
          type: 'p',
          text: 'If you already know the brand you want, go straight to its page: [Mercedes rental](route:mercedes), [Range Rover rental](route:range-rover), [Porsche rental](route:porsche) or [Volkswagen rental](route:volkswagen) for the Touareg.',
        },
        {
          type: 'p',
          text: 'Several of these models exist in only one or two units, so book early if your dates fall around a wedding or a holiday period. Then check the date search in the catalogue to see which cars are free.',
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
            'Comprehensive insurance on every prestige car, with an excess.',
            'A replacement car if you break down, and help from the team if you have an accident.',
            'A minimum rental of 5 days, with a lower rate applied automatically after 10 days on most models.',
          ],
        },
        {
          type: 'p',
          text: 'The deposit depends on the car: it appears in the table above when it is set, then the team confirms it before pick-up. Ask the team on WhatsApp for the excess amount, because it is not published here. All models and terms are also on the [car rental prices in Casablanca](route:tarifs) page.',
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
            'The team then confirms by WhatsApp or phone and lists the deposit and documents: ID (CIN or passport), a licence over 2 years old, proof of address.',
            'The car is delivered to the address you chose. At the end of the rental, your deposit comes back if the car is in good condition.',
          ],
        },
        {
          type: 'p',
          text: 'If your event moves, changing or cancelling is free up to 24 hours before pick-up. All the rules are in the [car rental requirements](route:conditions).',
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
      a: 'Yes, delivery is free to your hotel or any address in Casablanca, and to Mohammed V airport. The team then gives the exact meeting point on WhatsApp.',
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
