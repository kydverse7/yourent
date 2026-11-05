import type { PageContent } from '../../types';

const page: PageContent = {
  metaTitle: 'Audi Rental Casablanca: Q3 and A3 | Yourent',
  metaDescription:
    'Audi rental Casablanca: A3 or Q3 from {minPrice} MAD a day, compact saloon or SUV. Delivered to your hotel or Mohammed V airport, quote on WhatsApp.',
  eyebrow: 'Audi',
  h1: 'Audi Rental in Casablanca: A3 and Q3',
  intro:
    'Yourent rents two Audi models in Casablanca: the A3 from {minPrice} MAD per day and the Q3 at {price:audi-q3} MAD. You send your dates through the online request, the team confirms on WhatsApp, then the car is delivered to your hotel, the address you chose or Mohammed V airport. Minimum rental is 5 days.',
  breadcrumb: 'Audi',
  vehicles: { marques: ['Audi'], sort: 'asc' },
  sections: [
    {
      h2: 'A3 or Q3: a compact saloon or an SUV',
      blocks: [
        {
          type: 'p',
          text: 'The [Audi A3](/catalogue/audi-a3) is a premium compact, petrol and automatic. It is the smaller and cheaper of the two, and very much at home in town. The [Audi Q3](/catalogue/audi-q3) is a compact diesel SUV, with a higher seat and more boot space. It comes with an automatic or a manual gearbox depending on the car.',
        },
        {
          type: 'p',
          text: 'There are very few A3s in the fleet and several Q3s. If your dates are fixed, use the date search in the catalogue to see what is free.',
        },
      ],
    },
    {
      h2: 'A3 or Q3: which one suits your trip',
      blocks: [
        {
          type: 'list',
          items: [
            '**Arriving at Mohammed V airport**: for one or two people with little luggage, the A3 is enough. For more suitcases, take the Q3. The car is delivered to the airport, see the [airport car rental](route:aeroport) page.',
            '**A stay in Casablanca**: the A3 slips through the centre and is easier to park. The Q3 is more comfortable on the boulevards and for leaving the city.',
            '**Casablanca to Marrakech**: the diesel Q3 is best suited to a long motorway drive. The petrol A3 is better for a return trip for two.',
            '**A business meeting**: the A3 looks smart and discreet, without being showy.',
          ],
        },
      ],
    },
    {
      h2: 'Audi cars available to rent',
      blocks: [{ type: 'vehicles' }],
    },
    {
      h2: 'Audi rental prices in Casablanca',
      blocks: [
        {
          type: 'p',
          text: 'The A3 is {price:audi-a3} MAD per day, the Q3 {price:audi-q3} MAD. The choice comes down first to the size of the car. The table below gives the rate after 10 days and the minimum deposit for each model. Comprehensive insurance with an excess is included.',
        },
        { type: 'pricing' },
      ],
    },
    {
      h2: 'Audi or another German brand',
      blocks: [
        {
          type: 'p',
          text: 'Next to the A3, the [Volkswagen Golf 8](/catalogue/volkswagen-golf-8) shares part of its engineering for a similar price. The [Mercedes CLA](/catalogue/mercedes-cla) aims higher on image. Next to the Q3, the [Volkswagen T-Roc](/catalogue/volkswagen-t-roc) is cheaper and the [Porsche Macan](/catalogue/porsche-macan) much sportier. For a full overview, see the [luxury car rental](route:luxe) page.',
        },
      ],
    },
  ],
  faq: [
    {
      q: 'What is the difference between the Audi A3 and the Audi Q3?',
      a: 'The A3 is a petrol compact saloon with an automatic gearbox. The Q3 is a compact diesel SUV, taller with a bigger boot. The Q3 comes in automatic or manual.',
    },
    {
      q: 'Can I choose a manual gearbox on an Audi?',
      a: 'Only the Q3 comes with both gearboxes. The A3 is automatic only. State the gearbox you want in your request.',
    },
    {
      q: 'Can the Audi be delivered to the airport?',
      a: 'Yes, Yourent delivers to Mohammed V airport and anywhere in Casablanca at no charge, from 8 am to 10 pm. Give your arrival time in the request.',
    },
    {
      q: 'What deposit is needed to rent an Audi?',
      a: 'It depends on the model and is paid at pick-up by cheque, in cash or by card imprint. It is returned when the car comes back in good condition.',
    },
  ],
  related: ['luxe', 'suv', 'volkswagen', 'automatique', 'tarifs'],
};

export default page;
