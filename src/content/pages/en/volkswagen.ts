import type { PageContent } from '../../types';

const page: PageContent = {
  metaTitle: 'Volkswagen Rental Casablanca: Touareg, Golf 8 | Yourent',
  metaDescription:
    'Volkswagen rental Casablanca from {minPrice} MAD/day: T-Roc, Golf 8, Tiguan or Touareg. Delivery to your hotel and the airport, quick reply on WhatsApp.',
  eyebrow: 'Volkswagen',
  h1: 'Volkswagen Rental in Casablanca: Touareg, Golf 8, Tiguan, T-Roc',
  intro:
    'Yourent rents four Volkswagen models in Casablanca, from the T-Roc at {price:volkswagen-t-roc} MAD per day up to the Touareg at {price:volkswagen-touareg} MAD. You pick the model in the catalogue, send your dates and the team confirms on WhatsApp or by phone. The car is delivered to your hotel, your address or Mohammed V airport. Minimum rental is 5 days.',
  breadcrumb: 'Volkswagen',
  vehicles: { marques: ['Volkswagen'], sort: 'asc' },
  sections: [
    {
      h2: 'Four Volkswagen models for four ways to travel',
      blocks: [
        {
          type: 'p',
          text: "Volkswagen is the best-represented brand in Yourent's fleet. The [Golf 8](/catalogue/volkswagen-golf-8) is the versatile compact, available in diesel or petrol, with an automatic or manual gearbox depending on the car. The [T-Roc](/catalogue/volkswagen-t-roc) is the compact SUV, taller than a saloon and sparing with space. The [Tiguan](/catalogue/volkswagen-tiguan) steps up in room. The [Touareg](/catalogue/volkswagen-touareg) is the brand's large SUV.",
        },
      ],
    },
    {
      h2: 'Comparing the Volkswagen models for your trip',
      blocks: [
        {
          type: 'table',
          head: ['Model', 'Body type', 'Best for'],
          rows: [
            ['[Golf 8](/catalogue/volkswagen-golf-8)', 'Compact', 'A city stay, one or two travellers, a controlled budget'],
            ['[T-Roc](/catalogue/volkswagen-t-roc)', 'Compact SUV', 'A couple who want a high seating position without a bulky car'],
            ['[Tiguan](/catalogue/volkswagen-tiguan)', 'Family SUV', 'A family and their suitcases, a trip to Marrakech'],
            ['[Touareg](/catalogue/volkswagen-touareg)', 'Large SUV', 'A group, lots of luggage, a comfortable long drive'],
          ],
        },
        {
          type: 'p',
          text: 'Arriving at Mohammed V airport, a T-Roc or a Golf is enough for two people with two suitcases. For four people and their luggage, go for the Tiguan or the Touareg. During a stay in Casablanca, the Golf is the easiest to park. On the motorway to Marrakech, the difference shows mostly in the back seats: the Touareg feels calmer than the T-Roc.',
        },
      ],
    },
    {
      h2: 'Volkswagen cars available to rent',
      blocks: [{ type: 'vehicles' }],
    },
    {
      h2: 'Volkswagen rental prices in Casablanca',
      blocks: [
        {
          type: 'p',
          text: 'Rates run from {minPrice} to {maxPrice} MAD per day: {price:volkswagen-t-roc} MAD for the T-Roc, {price:volkswagen-golf-8} MAD for the Golf 8, {price:volkswagen-tiguan} MAD for the Tiguan, {price:volkswagen-touareg} MAD for the Touareg. After 10 days, a lower rate applies automatically. Comprehensive insurance with an excess covers every car.',
        },
        { type: 'pricing' },
      ],
    },
    {
      h2: 'Volkswagen or another brand?',
      blocks: [
        {
          type: 'p',
          text: 'If you want the same size with a more stately image, look at the [Audi Q3](/catalogue/audi-q3) or the [SUV rental](route:suv) page. On a tighter budget, the [Dacia Duster](/catalogue/dacia-duster) remains the most economical SUV. For an automatic gearbox only, the [automatic car rental](route:automatique) page sorts the fleet for you.',
        },
      ],
    },
  ],
  faq: [
    {
      q: 'Which Volkswagen should I choose for a Casablanca to Marrakech trip?',
      a: 'The [Tiguan](/catalogue/volkswagen-tiguan) and the [Touareg](/catalogue/volkswagen-touareg) are the most comfortable for this trip, with a generous boot. The T-Roc suits two or three travellers very well.',
    },
    {
      q: 'Does the Golf 8 have an automatic gearbox?',
      a: 'Both gearboxes exist, as do diesel and petrol, depending on the car. State your preference in the request: the team offers the matching car among those free on your dates.',
    },
    {
      q: 'Are the Volkswagen SUVs diesel?',
      a: 'The Tiguan and the Touareg are diesels with an automatic gearbox. The T-Roc is petrol, also automatic.',
    },
    {
      q: 'Can the Volkswagen be delivered to the airport?',
      a: 'Yes, delivery to Mohammed V airport and anywhere in Casablanca is free, from 8 am to 10 pm, 7 days a week.',
    },
    {
      q: 'What is the minimum rental period for a Volkswagen?',
      a: 'The minimum rental is 5 days, on every model. A lower rate applies automatically after 10 days.',
    },
  ],
  related: ['suv', 'automatique', 'longue-duree', 'aeroport', 'tarifs'],
};

export default page;
