import type { PageContent } from '../../types';

const page: PageContent = {
  metaTitle: 'Range Rover Rental Casablanca: Evoque, Sport | Yourent',
  metaDescription:
    'Range Rover rental in Casablanca: Evoque or Sport from {minPrice} MAD/day. Diesel, automatic, free delivery to your hotel or Mohammed V airport. Ask online.',
  eyebrow: 'Range Rover',
  h1: 'Range Rover rental in Casablanca: Evoque and Sport',
  intro:
    'Yourent offers Range Rover rental in Casablanca: the Evoque from {minPrice} MAD a day and the Sport at {price:range-rover-sport} MAD, delivered free in the city or at the airport. Pick your dates in the catalogue, then the team confirms on WhatsApp or by phone. Both models are diesel and automatic, and rentals start at 5 days.',
  breadcrumb: 'Range Rover',
  vehicles: { marques: ['Range Rover'], sort: 'asc' },
  sections: [
    {
      h2: 'Range Rover rental in Casablanca: Evoque or Sport, two sizes',
      blocks: [
        {
          type: 'p',
          text: "The [Range Rover Evoque](/catalogue/range-rover-evoque) is the brand's compact SUV, with a lower, more urban shape. The [Range Rover Sport](/catalogue/range-rover-sport), on the other hand, is a large prestige SUV: wider, more imposing, built for long distances and rear passengers. The price gap reflects this: {price:range-rover-evoque} MAD per day for the Evoque, {price:range-rover-sport} MAD for the Sport.",
        },
        {
          type: 'p',
          text: 'There are very few of these two Range Rovers in the fleet, so send your request well ahead to avoid finding them already rented.',
        },
      ],
    },
    {
      h2: 'Why choose a Range Rover over another SUV',
      blocks: [
        {
          type: 'p',
          text: 'People rent a Range Rover for its high driving position, its comfort and its image. If prestige matters less than space, however, the [Volkswagen Touareg](/catalogue/volkswagen-touareg) comes close to the size of the Sport for {price:volkswagen-touareg} MAD per day. If you prefer sporty driving, look at the [Porsche Macan](/catalogue/porsche-macan).',
        },
        {
          type: 'p',
          text: 'To compare with the rest of the fleet, from the Dacia Duster to the premium models, see the [SUV rental in Casablanca](route:suv) page.',
        },
      ],
    },
    {
      h2: 'Which Range Rover for which trip',
      blocks: [
        {
          type: 'list',
          items: [
            '**Arriving with family at the airport**: the Sport takes more luggage, and it is brought straight to Mohammed V airport.',
            '**A stay in town**: the Evoque is easier to park and manoeuvre downtown or around the Corniche.',
            '**Casablanca to Marrakech**: on the motorway, the Sport gives the calmer ride, but the Evoque is fine for two or three people.',
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
          text: 'The daily rate runs from {minPrice} to {maxPrice} MAD depending on the model. It falls automatically after 10 days, except when high season suspends the reduction. Both Range Rovers come with comprehensive insurance, with an excess. The deposit, taken at pick-up, depends on the car; the table gives its minimum amount.',
        },
        { type: 'pricing' },
      ],
    },
  ],
  faq: [
    {
      q: 'What is the difference between the Range Rover Evoque and the Sport?',
      a: 'The Evoque is a compact SUV, easy in town, while the Sport is a large SUV, roomier and more comfortable over long distances. The Sport also costs a lot more: compare {price:range-rover-evoque} MAD and {price:range-rover-sport} MAD per day.',
    },
    {
      q: 'Are the Range Rovers diesel or petrol?',
      a: 'Both models on offer are diesel with an automatic gearbox. Each page in the catalogue gives the details of the car.',
    },
    {
      q: 'Can I rent a Range Rover to drive from Casablanca to Marrakech?',
      a: 'Yes. Tell the team your route, then ask on WhatsApp about included mileage before you book.',
    },
    {
      q: 'What deposit should I expect for a Range Rover?',
      a: 'It varies by model and is paid at pick-up, by cheque, in cash or by card imprint. You get the exact amount at confirmation, then recover the deposit if the car comes back undamaged.',
    },
    {
      q: 'Can a Range Rover be delivered to my hotel?',
      a: 'Yes, we bring it free of charge to your hotel or any Casablanca address, and to Mohammed V airport. Handovers run from 8 am to 10 pm, 7 days a week.',
    },
  ],
  related: ['suv', 'luxe', 'mercedes', 'porsche', 'tarifs'],
};

export default page;
