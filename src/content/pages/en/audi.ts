import type { PageContent } from '../../types';

const page: PageContent = {
  metaTitle: 'Audi Rental Casablanca: A3 and Q3 from {minPrice} MAD | Yourent',
  metaDescription:
    'Audi rental in Casablanca: A3 or Q3 from {minPrice} MAD a day, compact saloon or SUV. Free delivery to your hotel or Mohammed V airport, quote on WhatsApp.',
  eyebrow: 'Audi',
  h1: 'Audi rental in Casablanca: A3 and Q3',
  intro:
    'Yourent offers Audi rental in Casablanca with two models: the A3 from {minPrice} MAD per day and the Q3 at {price:audi-q3} MAD. Send your dates through the online request and the team confirms on WhatsApp. The car is then delivered to your hotel, your address or Mohammed V airport. Each rental lasts at least 5 days.',
  breadcrumb: 'Audi',
  vehicles: { marques: ['Audi'], sort: 'asc' },
  sections: [
    {
      h2: 'Audi rental in Casablanca: A3 saloon or Q3 SUV',
      blocks: [
        {
          type: 'p',
          text: 'The [Audi A3](/catalogue/audi-a3) is a compact saloon, petrol and automatic. It is the smaller and cheaper of the two, and it suits town driving. The [Audi Q3](/catalogue/audi-q3), on the other hand, is a compact diesel SUV with a higher seat and more boot space. It comes with an automatic or a manual gearbox depending on the car.',
        },
        {
          type: 'p',
          text: 'The fleet has very few A3s and several Q3s, so if your dates are fixed, use the date search in the catalogue to see which one is free.',
        },
      ],
    },
    {
      h2: 'A3 or Q3: which one suits your trip',
      blocks: [
        {
          type: 'list',
          items: [
            '**Arriving at Mohammed V airport**: for one or two people with little luggage, the A3 is enough. For more suitcases, however, take the Q3. The car is delivered to the airport, as the [car rental Casablanca airport](route:aeroport) page explains.',
            '**A stay in Casablanca**: the A3 is easier to park in the centre, while the Q3 offers more space for leaving the city.',
            '**Casablanca to Marrakech**: the diesel Q3 suits a long motorway drive, but the petrol A3 is fine for two people.',
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
          text: 'The A3 costs {price:audi-a3} MAD per day and the Q3 {price:audi-q3} MAD. The table below gives the rate after 10 days and the minimum deposit for each model. Your Audi comes with comprehensive insurance and an excess.',
        },
        { type: 'pricing' },
      ],
    },
    {
      h2: 'Audi or another German brand',
      blocks: [
        {
          type: 'p',
          text: 'Next to the A3, the [Volkswagen Golf 8](/catalogue/volkswagen-golf-8) costs about the same and the [Mercedes CLA](/catalogue/mercedes-cla) is a premium step up. Next to the Q3, the [Volkswagen T-Roc](/catalogue/volkswagen-t-roc) is cheaper and the [Porsche Macan](/catalogue/porsche-macan) much sportier. For a full overview, see the [luxury car rental](route:luxe) page.',
        },
      ],
    },
  ],
  faq: [
    {
      q: 'What is the difference between the Audi A3 and the Audi Q3?',
      a: 'The A3 is a petrol compact saloon with an automatic gearbox. The Q3, however, is a compact diesel SUV, taller with a bigger boot, and it comes in automatic or manual.',
    },
    {
      q: 'Can I choose a manual gearbox on an Audi?',
      a: 'Only the Q3 comes with both gearboxes; the A3 is automatic only. State the gearbox you want in your request.',
    },
    {
      q: 'Can the Audi be delivered to the airport?',
      a: 'Yes, Yourent delivers to Mohammed V airport and anywhere in Casablanca at no charge, from 8 am to 10 pm. Give your arrival time in the request.',
    },
    {
      q: 'What deposit is needed to rent an Audi?',
      a: 'It depends on the Audi you choose and is paid at pick-up by cheque, in cash or by card imprint. It comes back to you when the car returns in good condition.',
    },
  ],
  related: ['luxe', 'suv', 'volkswagen', 'automatique', 'tarifs'],
};

export default page;
