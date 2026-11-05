import type { PageContent } from '../../types';

const page: PageContent = {
  metaTitle: 'Porsche Rental Casablanca: Macan, Free Delivery | Yourent',
  metaDescription:
    'Porsche rental in Casablanca: the Porsche Macan for {minPrice} MAD a day. Sporty petrol SUV, automatic, delivered free to your hotel or Mohammed V airport.',
  eyebrow: 'Porsche',
  h1: 'Porsche rental in Casablanca: the Macan SUV',
  intro:
    'Yourent offers Porsche rental in Casablanca with the Macan, at {minPrice} MAD per day, petrol and automatic, delivered free to your hotel, your address or Mohammed V airport. It is the only Porsche model in the fleet. Request it online with your dates, then the team confirms on WhatsApp. The minimum rental is 5 days.',
  breadcrumb: 'Porsche',
  vehicles: { marques: ['Porsche'] },
  sections: [
    {
      h2: 'Porsche rental in Casablanca: an SUV with sports-car handling',
      blocks: [
        {
          type: 'p',
          text: 'The [Porsche Macan](/catalogue/porsche-macan) is a compact SUV from the German brand, known for its road holding and for handling closer to a sports saloon than a 4x4. It has 5 seats and a high driving position. At Yourent, it is petrol with an automatic gearbox.',
        },
        {
          type: 'p',
          text: "It suits drivers who want a treat during their stay but still need the boot of an SUV for a small family's suitcases.",
        },
      ],
    },
    {
      h2: 'Renting a Porsche instead of another premium SUV',
      blocks: [
        {
          type: 'p',
          text: 'Next to the [Range Rover Evoque](/catalogue/range-rover-evoque), the Macan is more dynamic to drive. The [Audi Q3](/catalogue/audi-q3) is of similar size but costs less: {price:audi-q3} MAD per day against {price:porsche-macan} MAD. If you mostly want space on a tighter budget, the [Volkswagen Touareg](/catalogue/volkswagen-touareg) is a big SUV at {price:volkswagen-touareg} MAD.',
        },
      ],
    },
    {
      h2: 'Where and when to take a Macan',
      blocks: [
        {
          type: 'list',
          items: [
            '**On arrival in Casablanca**: the car is delivered to you at Mohammed V airport, then you head straight to the hotel or the road. The [car rental Casablanca airport](route:aeroport) page has the details.',
            '**During a stay in town**: comfortable in traffic thanks to the automatic gearbox, but bulkier than a compact to park near the Corniche.',
            '**Casablanca to Marrakech**: the motorway suits the Macan, with quick overtaking and good stability.',
            '**A trip for two**: the Macan gives the feel of a sports car with the practicality of an SUV.',
          ],
        },
      ],
    },
    {
      h2: 'The Porsche available to rent',
      blocks: [{ type: 'vehicles' }],
    },
    {
      h2: 'Porsche rental prices in Casablanca',
      blocks: [
        {
          type: 'p',
          text: 'The Macan is listed at {minPrice} MAD per day. The table below gives the rate for 5 to 10 days, the rate after 10 days and the minimum deposit taken at pick-up. Comprehensive cover with an excess also applies to the Macan.',
        },
        { type: 'pricing' },
        {
          type: 'p',
          text: 'To see all the prestige cars at the agency, visit the [luxury car rental](route:luxe) page.',
        },
      ],
    },
  ],
  faq: [
    {
      q: 'Which Porsche can I rent at Yourent?',
      a: 'The model on offer is the [Porsche Macan](/catalogue/porsche-macan), a petrol SUV with an automatic gearbox. The agency has no other Porsche in its fleet.',
    },
    {
      q: 'Is the Porsche Macan suitable for Casablanca to Marrakech?',
      a: 'Yes, it is a good choice for the motorway. Mention your route when you book, then check the included mileage with the team on WhatsApp.',
    },
    {
      q: 'What deposit is needed for the Macan?',
      a: 'The price table above gives the minimum, then the team confirms the amount. You pay it at pick-up by cheque, in cash or by card imprint, and recover it when the Macan comes back in good condition.',
    },
    {
      q: 'Can I book the Porsche in advance for an airport arrival?',
      a: 'Yes. Give your arrival day and time in the request, and the team confirms delivery at Mohammed V airport. You receive the exact meeting point on WhatsApp.',
    },
  ],
  related: ['luxe', 'range-rover', 'mercedes', 'suv', 'aeroport'],
};

export default page;
