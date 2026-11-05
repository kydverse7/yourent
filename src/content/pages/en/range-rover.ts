import type { PageContent } from '../../types';

const page: PageContent = {
  metaTitle: 'Range Rover Rental Casablanca: Evoque, Sport | Yourent',
  metaDescription:
    'Range Rover rental Casablanca: Evoque or Sport from {minPrice} MAD/day. Diesel, automatic, delivered to your hotel or Mohammed V airport. Request online.',
  eyebrow: 'Range Rover',
  h1: 'Range Rover Rental in Casablanca: Evoque and Sport',
  intro:
    'Yourent offers the Range Rover Evoque from {minPrice} MAD per day and the Range Rover Sport at {price:range-rover-sport} MAD, with delivery in Casablanca or at Mohammed V airport. You pick your dates in the catalogue and the team confirms on WhatsApp or by phone. Both models are diesel and automatic, and rentals start at 5 days.',
  breadcrumb: 'Range Rover',
  vehicles: { marques: ['Range Rover'], sort: 'asc' },
  sections: [
    {
      h2: 'Evoque or Sport: two Range Rovers, two sizes',
      blocks: [
        {
          type: 'p',
          text: "The [Range Rover Evoque](/catalogue/range-rover-evoque) is the brand's compact SUV, with a lower, more urban shape. The [Range Rover Sport](/catalogue/range-rover-sport) is a large prestige SUV: wider, more imposing, built for long distances and for passengers sitting in the back. The price gap reflects this: {price:range-rover-evoque} MAD per day for the Evoque, {price:range-rover-sport} MAD for the Sport.",
        },
        {
          type: 'p',
          text: 'There are very few of these two Range Rovers in the fleet. Send your request well ahead so you do not find them already rented.',
        },
      ],
    },
    {
      h2: 'Why choose a Range Rover over another SUV',
      blocks: [
        {
          type: 'p',
          text: 'A high driving position, a comfortable seat and the brand image: people rent a Range Rover as much for its image as for what it can do. If prestige matters less than space, the [Volkswagen Touareg](/catalogue/volkswagen-touareg) comes close to the size of the Sport for {price:volkswagen-touareg} MAD per day. If you prefer sporty driving, the [Porsche Macan](/catalogue/porsche-macan) is sharper but less settled over long distances.',
        },
        {
          type: 'p',
          text: 'To compare every SUV in the fleet, from the Dacia Duster to the premium models, see the [SUV rental in Casablanca](route:suv) page.',
        },
      ],
    },
    {
      h2: 'Which Range Rover for which trip',
      blocks: [
        {
          type: 'list',
          items: [
            '**Arriving with family at the airport**: the Sport takes more luggage and more people. Yourent delivers the car to Mohammed V airport.',
            '**A stay in town**: the Evoque is easier to park and manoeuvre downtown or around the Corniche.',
            '**Casablanca to Marrakech**: on the motorway, the Sport gives the calmest ride. The Evoque also does the job very well for two or three people.',
            '**A trip outside the city**: the ride height of both models helps on rougher back roads.',
          ],
        },
      ],
    },
    {
      h2: 'Range Rovers available in Casablanca',
      blocks: [{ type: 'vehicles' }],
    },
    {
      h2: 'Range Rover rental prices',
      blocks: [
        {
          type: 'p',
          text: 'The daily rate runs from {minPrice} to {maxPrice} MAD depending on the model. It drops automatically after 10 days. Comprehensive insurance with an excess is included. The deposit, taken at pick-up, depends on the car: the table gives its minimum amount.',
        },
        { type: 'pricing' },
      ],
    },
  ],
  faq: [
    {
      q: 'What is the difference between the Range Rover Evoque and the Sport?',
      a: 'The Evoque is a compact SUV, easy in town. The Sport is a large SUV, roomier and more comfortable over long distances. It also costs a lot more: compare {price:range-rover-evoque} MAD and {price:range-rover-sport} MAD per day.',
    },
    {
      q: 'Are the Range Rovers diesel or petrol?',
      a: 'Both models on offer are diesel with an automatic gearbox. Each page in the catalogue gives the details of the car.',
    },
    {
      q: 'Can I rent a Range Rover to drive from Casablanca to Marrakech?',
      a: 'Yes. Tell the team your route when you book. Ask the team on WhatsApp about included mileage before you book.',
    },
    {
      q: 'What deposit should I expect for a Range Rover?',
      a: 'It varies by model and is paid at pick-up, by cheque, in cash or by card imprint. It is returned once the car is back in good condition. You get the exact amount at confirmation.',
    },
    {
      q: 'Can a Range Rover be delivered to my hotel?',
      a: 'Yes, delivery is free anywhere in Casablanca, to your hotel or any address you choose, and at Mohammed V airport. It runs from 8 am to 10 pm, 7 days a week.',
    },
  ],
  related: ['suv', 'luxe', 'mercedes', 'porsche', 'tarifs'],
};

export default page;
