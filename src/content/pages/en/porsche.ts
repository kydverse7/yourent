import type { PageContent } from '../../types';

const page: PageContent = {
  metaTitle: 'Porsche Rental Casablanca: Macan SUV | Yourent',
  metaDescription:
    'Porsche rental Casablanca: the Porsche Macan for {minPrice} MAD a day. Sporty petrol SUV, automatic, delivered to your hotel or Mohammed V airport.',
  eyebrow: 'Porsche',
  h1: 'Porsche Rental in Casablanca: the Macan SUV',
  intro:
    'Yourent rents the Porsche Macan in Casablanca for {minPrice} MAD per day, petrol and automatic, delivered to your hotel, to the address of your choice or to Mohammed V airport. It is the only Porsche model in the fleet, available in several units. You request it online with your dates and the team confirms on WhatsApp. Minimum rental is 5 days.',
  breadcrumb: 'Porsche',
  vehicles: { marques: ['Porsche'] },
  sections: [
    {
      h2: 'The Porsche Macan: an SUV that drives like a sports car',
      blocks: [
        {
          type: 'p',
          text: 'The [Porsche Macan](/catalogue/porsche-macan) is a compact SUV from the German brand, known for its road holding and for handling closer to a sports saloon than a 4x4. It seats five, with a driving position high enough to see far ahead in Casablanca traffic. At Yourent, it is petrol with an automatic gearbox.',
        },
        {
          type: 'p',
          text: 'It is the car for someone who wants to treat themselves for a few days without giving up the boot of an SUV: a stay\'s luggage or a small family\'s suitcases.',
        },
      ],
    },
    {
      h2: 'Renting a Porsche instead of another premium SUV',
      blocks: [
        {
          type: 'p',
          text: 'Next to the [Range Rover Evoque](/catalogue/range-rover-evoque), which is more stately and calmer, the Macan is the most dynamic to drive. Next to the [Audi Q3](/catalogue/audi-q3), of similar size, it plays in a higher price bracket: {price:porsche-macan} MAD per day against {price:audi-q3} MAD. And if what you want is mostly space on a tighter budget, the [Volkswagen Touareg](/catalogue/volkswagen-touareg) remains a big SUV at {price:volkswagen-touareg} MAD.',
        },
      ],
    },
    {
      h2: 'Where and when to take a Macan',
      blocks: [
        {
          type: 'list',
          items: [
            '**On arrival in Casablanca**: the car is delivered to you at Mohammed V airport and you head straight to the hotel or the road. Details on the [car rental at the airport](route:aeroport) page.',
            '**During a stay in town**: comfortable in traffic thanks to the automatic gearbox, but bulkier than a compact to park near the Corniche.',
            '**Casablanca to Marrakech**: the motorway is its favourite ground. Quick overtaking, good stability, less fatigue on the journey.',
            '**A weekend for two**: the Macan gives the feel of a sports car with the practicality of an SUV.',
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
          text: 'The Macan is listed at {minPrice} MAD per day. The table below gives the rate for 5 to 10 days, the rate after 10 days and the deposit taken at pick-up. Comprehensive insurance with an excess is included.',
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
      a: 'The model on offer is the [Porsche Macan](/catalogue/porsche-macan), a petrol SUV with an automatic gearbox. The agency has no other Porsche model in its fleet.',
    },
    {
      q: 'Is the Porsche Macan suitable for Casablanca to Marrakech?',
      a: 'Yes, it is a good choice for the motorway. Mention your route when you book: included mileage should be checked with the team on WhatsApp.',
    },
    {
      q: 'What deposit is needed for the Macan?',
      a: 'The amount depends on the car and is shown in the price table above. It is paid at pick-up by cheque, in cash or by card imprint, and returned when the car comes back in good condition.',
    },
    {
      q: 'Can I book the Porsche in advance for an airport arrival?',
      a: 'Yes. Give your arrival day and time in the request and the team confirms delivery at Mohammed V airport. The exact meeting point is given on WhatsApp.',
    },
  ],
  related: ['luxe', 'range-rover', 'mercedes', 'suv', 'aeroport'],
};

export default page;
