import type { PageContent } from '../../types';

const page: PageContent = {
  metaTitle: 'Cheap Car Rental Casablanca from {minPrice} MAD | Yourent',
  metaDescription:
    'Cheap car rental in Casablanca from {minPrice} MAD/day: Fiat 500, Opel Corsa, Dacia Duster. Free airport delivery, comprehensive insurance. Request online.',
  eyebrow: 'Budget cars',
  h1: 'Cheap car rental in Casablanca',
  intro:
    'Yourent offers cheap car rental in Casablanca from {minPrice} MAD per day (Fiat 500, Opel Corsa), up to {maxPrice} MAD for the Dacia Duster. Delivery is free in Casablanca and at the airport, and comprehensive insurance with an excess is included. Rentals start at 5 days.',
  breadcrumb: 'Cheap car',
  vehicles: { maxPrice: 500, sort: 'asc' },
  sections: [
    {
      h2: 'Cheap car rental in Casablanca: the lowest-priced models',
      blocks: [
        {
          type: 'p',
          text: 'For a **cheap car rental in Casablanca**, four models in the fleet stay at {maxPrice} MAD per day or less. The prices below are daily rates for 5 to 10 days; the table also gives the rate after 10 days.',
        },
        { type: 'pricing' },
        {
          type: 'list',
          items: [
            'The [Fiat 500](/catalogue/fiat-500) and the [Opel Corsa](/catalogue/opel-corsa): petrol city cars, manual gearbox, the cheapest, at {minPrice} MAD per day.',
            'The [Fiat 500 Cabriolet](/catalogue/fiat-500-cabriolet): automatic, for those who want a small car without a clutch.',
            'The [Dacia Duster](/catalogue/dacia-duster): a roomier diesel SUV, at {price:dacia-duster} MAD per day, the most economical choice for several people or for luggage.',
          ],
        },
      ],
    },
    {
      h2: 'Why there are no rock-bottom prices',
      blocks: [
        {
          type: 'p',
          text: 'Yourent does not do rock-bottom prices. Our entry rate is {minPrice} MAD, and we would rather say so than show a teaser price that the final bill would not match. A very low rate can come with a high deposit, a heavy excess, delivery fees or paid extras, so check those points before comparing.',
        },
        {
          type: 'p',
          text: 'At Yourent, the displayed price includes free delivery in Casablanca and at Mohammed V airport, and comprehensive insurance with an excess on every car. The excess amount itself, however, is given by the team on WhatsApp before you book.',
        },
      ],
    },
    {
      h2: 'How to compare two car rental offers',
      blocks: [
        {
          type: 'p',
          text: 'The daily price is not enough, so ask every rental company the same questions, us included, before you choose.',
        },
        {
          type: 'table',
          head: ['What to check', 'Why'],
          rows: [
            ['The deposit', 'The amount held at pick-up, the method required (cheque, cash, card) and when it is returned.'],
            ['The excess', 'The sum you pay yourself after a claim: the lower it is, the better the insurance protects you.'],
            ['Delivery', 'Free or charged, at the airport as in town, and at what hours.'],
            ['Minimum duration', 'A company can show a low price for a short rental; Yourent rents from 5 days.'],
            ['Cancellation', 'Any fees and the deadline to cancel or change.'],
            ['Extras', 'Mileage, second driver, child seat: ask before you book.'],
          ],
        },
        {
          type: 'p',
          text: 'To compare with a big international brand, read our page on [local agency or international car rental](route:agence-vs-international). The rules we apply are detailed in the [car rental requirements](route:conditions).',
        },
      ],
    },
    {
      h2: 'Paying less for your rental: four practical ways',
      blocks: [
        {
          type: 'list',
          items: [
            '**Rent for longer**: after 10 days, the daily rate falls by itself on most models, as the [long-term car rental](route:longue-duree) page shows.',
            '**Pick a small car**: for Casablanca city driving, the Fiat 500 or the Opel Corsa is plenty.',
            '**Get it delivered**: since delivery is free, you avoid trips to an agency.',
            '**Book with exact dates**: the catalogue search shows which cars are free, and the team confirms the exact price.',
          ],
        },
      ],
    },
    {
      h2: 'Book a budget car',
      blocks: [
        {
          type: 'p',
          text: 'Choose the model and your dates, then send the online request, which involves no payment. The team confirms on WhatsApp or by phone and tells you the deposit amount, and the car comes to your address or to [Mohammed V airport](route:aeroport). Changing or cancelling is free up to 24 hours before pick-up.',
        },
        { type: 'vehicles' },
      ],
    },
  ],
  faq: [
    {
      q: 'What is the lowest price to rent a car in Casablanca at Yourent?',
      a: 'From {minPrice} MAD per day, for the Fiat 500 and the Opel Corsa. The table on this page gives the reduced rate after 10 days.',
    },
    {
      q: 'What does the rental price include?',
      a: 'Free delivery in Casablanca and at Mohammed V airport, and comprehensive insurance with an excess. Ask the team on WhatsApp for the amount of that excess.',
    },
    {
      q: 'Why does Yourent not offer lower prices?',
      a: 'Yourent prefers to show its real entry rate, {minPrice} MAD per day, and what it includes (free delivery, comprehensive insurance) rather than a teaser price.',
    },
    {
      q: 'Can I rent for a single day or a weekend?',
      a: 'No, the minimum rental is 5 days.',
    },
    {
      q: 'Is a deposit needed for a small car?',
      a: 'Yes, even small cars need a deposit at pick-up, by cheque, cash or card imprint. The team tells you the amount, then returns it if the car comes back in good condition.',
    },
  ],
  related: ['longue-duree', 'tarifs', 'conditions', 'agence-vs-international', 'suv'],
};

export default page;
