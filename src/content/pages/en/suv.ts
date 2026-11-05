import type { PageContent } from '../../types';

const page: PageContent = {
  metaTitle: 'SUV Rental Casablanca: Duster, Tiguan, Touareg | Yourent',
  metaDescription:
    'SUV rental Casablanca: Duster, T-Roc, Tiguan, Touareg, Audi Q3, Macan. From {minPrice} MAD/day, free delivery, insurance included. Send your request online.',
  eyebrow: 'SUVs and room to spare',
  h1: 'SUV Rental in Casablanca',
  intro:
    'Yourent has SUVs to rent in Casablanca from {minPrice} MAD per day, from the Dacia Duster to the Range Rover Sport. Delivery is free in Casablanca and at Mohammed V airport. You choose the SUV and your dates online and the team confirms on WhatsApp. Minimum rental is 5 days.',
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
      h2: 'Which SUV to rent in Casablanca for your trip',
      blocks: [
        {
          type: 'p',
          text: 'People rent an SUV for the high driving position, the boot space and the comfort on the road. Yourent has nine models, which leaves room to choose by budget and by how much luggage you have.',
        },
        {
          type: 'list',
          items: [
            '**On a budget**: the [Dacia Duster](/catalogue/dacia-duster), a manual diesel, is the most affordable SUV in the fleet and one of the most numerous.',
            '**Urban and compact**: the [Volkswagen T-Roc](/catalogue/volkswagen-t-roc) and the [Audi Q3](/catalogue/audi-q3), handy in town and on the motorway.',
            '**Family and long drives**: the [Kia Sorento](/catalogue/kia-sorento), the [Volkswagen Tiguan](/catalogue/volkswagen-tiguan) and the [Touareg](/catalogue/volkswagen-touareg), larger, diesel, automatic.',
            '**Premium**: the [Range Rover Evoque](/catalogue/range-rover-evoque), the [Porsche Macan](/catalogue/porsche-macan) and the [Range Rover Sport](/catalogue/range-rover-sport), if you want prestige. See also the [luxury car](route:luxe) page.',
          ],
        },
        {
          type: 'p',
          text: 'All SUVs have 5 seats. For several people with suitcases, go for the Sorento, the Tiguan or the Touareg.',
        },
      ],
    },
    {
      h2: '4x4 rental in Casablanca: SUV or real off-roader?',
      blocks: [
        {
          type: 'p',
          text: 'Many searches for "4x4 rental Casablanca" are really looking for an SUV: a tall, comfortable car for the road. That is what Yourent offers. We do not present these cars as off-road 4x4s.',
        },
        {
          type: 'p',
          text: 'If you specifically need four-wheel drive, for example for a track, the mountains or the Atlas, ask the team on WhatsApp which model suits before you book. They answer based on the car actually available on your dates. For the city, the motorway and paved roads, any SUV in the list below is enough.',
        },
      ],
    },
    {
      h2: 'SUV rental prices',
      blocks: [
        {
          type: 'p',
          text: 'Yourent SUVs range from {minPrice} MAD to {maxPrice} MAD per day. On most of these models, the rate drops automatically after 10 days, which matters for a long stay.',
        },
        { type: 'pricing' },
      ],
    },
    {
      h2: 'Diesel, petrol, manual or automatic: what differs between the SUVs',
      blocks: [
        {
          type: 'p',
          text: 'Most SUVs in the fleet run on diesel, which is more economical over long distances. The T-Roc and the Macan are petrol. As for gearboxes, the Duster is manual, the other SUVs are automatic, and the Audi Q3 comes in both versions: the choice is confirmed when you book. The automatic models are grouped on the [automatic car rental](route:automatique) page.',
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
            'Send your online request: it does not involve any payment.',
            'The team confirms on WhatsApp or by phone and tells you the deposit.',
            'The SUV is delivered free of charge in Casablanca or at [Mohammed V airport](route:aeroport), 7 days a week.',
          ],
        },
        {
          type: 'p',
          text: 'Bring valid ID (CIN or passport), a licence held for more than 2 years and proof of address. Foreign tourists can show an international driving permit. Details are in the [rental requirements](route:conditions).',
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
      a: 'The Kia Sorento, the Volkswagen Tiguan and the Touareg are the roomiest and most comfortable for a long drive with luggage. All have 5 seats and an automatic gearbox.',
    },
    {
      q: 'Can I rent an automatic SUV?',
      a: 'Yes. All SUVs are automatic except the Dacia Duster, which is manual. The Audi Q3 comes in automatic and manual: the choice is confirmed when you book.',
    },
    {
      q: 'What is the minimum rental period for an SUV?',
      a: 'The minimum rental is 5 days. For rentals over 10 days, the table on this page gives the rate for each SUV.',
    },
  ],
  related: ['automatique', 'luxe', 'tarifs', 'aeroport', 'longue-duree'],
};

export default page;
