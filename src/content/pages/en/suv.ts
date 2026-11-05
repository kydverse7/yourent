import type { PageContent } from '../../types';

const page: PageContent = {
  metaTitle: 'SUV Rental Casablanca from {minPrice} MAD, Free Delivery | Yourent',
  metaDescription:
    'SUV rental in Casablanca: Duster, T-Roc, Tiguan, Touareg, Audi Q3, Macan. From {minPrice} MAD/day, free airport delivery, insured with an excess. Ask online.',
  eyebrow: 'SUVs and room to spare',
  h1: 'SUV rental in Casablanca',
  intro:
    'Yourent offers SUV rental in Casablanca from {minPrice} MAD per day, from the Dacia Duster to the Range Rover Sport. Delivery is free in the city and at Mohammed V airport. Choose the SUV and your dates online, then the team confirms on WhatsApp. The minimum rental is 5 days.',
  breadcrumb: 'SUV rental',
  vehicles: {
    models: [
      'dacia-duster',
      'volkswagen-t-roc',
      'kia-sorento',
      'volkswagen-tiguan',
      'audi-q3',
      'volkswagen-touareg',
      'range-rover-evoque',
      'porsche-macan',
      'range-rover-sport',
    ],
    sort: 'asc',
  },
  sections: [
    {
      h2: 'SUV rental in Casablanca: which model for your trip',
      blocks: [
        {
          type: 'p',
          text: 'People rent an SUV for the high driving position, the boot space and the comfort on the road. Yourent has nine models, so you can choose by budget and by how much luggage you have.',
        },
        {
          type: 'list',
          items: [
            '**On a budget**: the [Dacia Duster](/catalogue/dacia-duster), a manual diesel, is the most affordable SUV in the fleet and one of the most numerous.',
            '**Urban and compact**: the [Volkswagen T-Roc](/catalogue/volkswagen-t-roc) and the [Audi Q3](/catalogue/audi-q3), handy in town and on the motorway.',
            '**Family and long drives**: the [Kia Sorento](/catalogue/kia-sorento), the [Volkswagen Tiguan](/catalogue/volkswagen-tiguan) and the [Touareg](/catalogue/volkswagen-touareg), which are larger, diesel and automatic.',
            '**Premium**: the [Range Rover Evoque](/catalogue/range-rover-evoque), the [Porsche Macan](/catalogue/porsche-macan) and the [Range Rover Sport](/catalogue/range-rover-sport), if you want prestige. See also the [luxury car rental](route:luxe) page.',
          ],
        },
        {
          type: 'p',
          text: 'All SUVs have 5 seats, so for several people with suitcases the boot decides: go for the Sorento, the Tiguan or the Touareg.',
        },
      ],
    },
    {
      h2: '4x4 rental in Casablanca: SUV or real off-roader?',
      blocks: [
        {
          type: 'p',
          text: 'Many searches for "4x4 rental Casablanca" are really looking for an SUV: a tall, comfortable car for the road. That is what Yourent offers. However, we do not present these cars as off-road 4x4s.',
        },
        {
          type: 'p',
          text: 'If you specifically need four-wheel drive, for example for a track or the Atlas, ask the team on WhatsApp which model suits before you book. They answer based on the car actually available on your dates. For the city, the motorway and paved roads, on the other hand, any SUV in the list below is enough.',
        },
      ],
    },
    {
      h2: 'SUV rental prices',
      blocks: [
        {
          type: 'p',
          text: 'Our SUVs range from {minPrice} MAD to {maxPrice} MAD per day. On most of these models the rate falls after 10 days, so a long stay costs less per day.',
        },
        { type: 'pricing' },
      ],
    },
    {
      h2: 'Diesel, petrol, manual or automatic: what differs between the SUVs',
      blocks: [
        {
          type: 'p',
          text: 'Most SUVs in the fleet run on diesel, which is more economical over long distances. The T-Roc and the Macan, however, are petrol. As for gearboxes, the Duster is manual, the other SUVs are automatic, and the Audi Q3 comes in both versions, confirmed when you book. The automatic models are grouped on the [automatic car rental](route:automatique) page.',
        },
      ],
    },
    {
      h2: 'Book an SUV and have it delivered',
      blocks: [
        {
          type: 'list',
          ordered: true,
          items: [
            'Use the date search in the catalogue to see which SUVs are free.',
            'Send your online request; you do not pay at this stage.',
            'The team confirms on WhatsApp or by phone and tells you the deposit.',
            'The SUV is delivered free of charge in Casablanca or at [Mohammed V airport](route:aeroport), 7 days a week.',
          ],
        },
        {
          type: 'p',
          text: 'Bring valid ID (CIN or passport), a licence held for more than 2 years and proof of address. An international permit also works for tourists from abroad. Details are in the [car rental requirements](route:conditions).',
        },
      ],
    },
    {
      h2: 'SUVs available',
      blocks: [{ type: 'vehicles' }],
    },
  ],
  faq: [
    {
      q: 'What is the cheapest SUV to rent in Casablanca?',
      a: 'The Dacia Duster, from {minPrice} MAD per day. It is a manual diesel and one of the most numerous models in the fleet.',
    },
    {
      q: 'Are your SUVs 4x4s?',
      a: 'Yourent rents SUVs for road, city and motorway use. For four-wheel drive or track use, ask the team on WhatsApp which model suits before you book.',
    },
    {
      q: 'Which SUV should I choose for a family trip to Marrakech?',
      a: 'The Kia Sorento, the Volkswagen Tiguan and the Touareg are the roomiest for a long drive with luggage. All three have 5 seats and an automatic gearbox.',
    },
    {
      q: 'Can I rent an automatic SUV?',
      a: 'Yes. All SUVs are automatic except the Dacia Duster, which is manual. The Audi Q3 comes in both, so state your choice and the team confirms it when you book.',
    },
    {
      q: 'What is the minimum rental period for an SUV?',
      a: 'You rent an SUV for 5 days at least. For rentals over 10 days, the table on this page gives the rate for each SUV.',
    },
  ],
  related: ['automatique', 'luxe', 'tarifs', 'aeroport', 'longue-duree'],
};

export default page;
