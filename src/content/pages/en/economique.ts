import type { PageContent } from '../../types';

const page: PageContent = {
  metaTitle: 'Cheap Car Rental Casablanca, Low Prices | Yourent',
  metaDescription:
    'Cheap car rental Casablanca from {minPrice} MAD/day: Fiat 500, Opel Corsa, Dacia Duster. Free delivery, comprehensive insurance with an excess included. Book online.',
  eyebrow: 'Budget cars',
  h1: 'Cheap Car Rental in Casablanca',
  intro:
    'Yourent offers budget rental cars in Casablanca from {minPrice} MAD per day (Fiat 500, Opel Corsa), up to {maxPrice} MAD for the Dacia Duster. Delivery is free in Casablanca and at the airport, and comprehensive insurance with an excess is included. Rentals start at 5 days.',
  breadcrumb: 'Cheap car',
  vehicles: { maxPrice: 500, sort: 'asc' },
  sections: [
    {
      h2: 'The cheapest cars to rent in Casablanca',
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
          text: 'Yourent does not do rock-bottom prices. Our entry rate is {minPrice} MAD, and we would rather say so than show a teaser price that the final bill would not match. A very low rate can come with a high deposit, a heavy excess, delivery fees or paid extras: that is what to check before comparing.',
        },
        {
          type: 'p',
          text: 'At Yourent, the displayed price includes free delivery in Casablanca and at Mohammed V airport, and comprehensive insurance with an excess on every car. The excess amount itself is given by the team on WhatsApp before you book.',
        },
      ],
    },
    {
      h2: 'How to compare two car rental offers',
      blocks: [
        {
          type: 'p',
          text: 'The daily price is not enough. Ask every rental company the same questions, us included, before you choose.',
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
          text: 'To compare with a big international brand, read our page on [local agency or international car rental](route:agence-vs-international). Yourent\'s rules are detailed in the [rental requirements](route:conditions).',
        },
      ],
    },
    {
      h2: 'Paying less for your rental: four practical ways',
      blocks: [
        {
          type: 'list',
          items: [
            '**Rent for longer**: after 10 days, the daily rate drops automatically on most models. See the [long-term car rental](route:longue-duree) page.',
            '**Pick a small car**: for Casablanca city driving, the Fiat 500 or the Opel Corsa is plenty.',
            '**Get it delivered**: free delivery saves you trips to an agency.',
            '**Book with exact dates**: the catalogue search shows the free cars, so you get the exact price with no surprises.',
          ],
        },
      ],
    },
    {
      h2: 'Book a budget car',
      blocks: [
        {
          type: 'p',
          text: 'Choose the model and your dates, then send the online request: it does not involve any payment. The team confirms on WhatsApp or by phone, tells you the deposit amount, and the car is delivered to the address you chose or to [Mohammed V airport](route:aeroport). You can change or cancel free of charge up to 24 hours before pick-up.',
        },
        { type: 'vehicles' },
      ],
    },
  ],
  faq: [
    {
      q: 'What is the lowest price to rent a car in Casablanca at Yourent?',
      a: 'From {minPrice} MAD per day, for the Fiat 500 and the Opel Corsa. The table on this page also gives the rate after 10 days.',
    },
    {
      q: 'What does the rental price include?',
      a: 'Free delivery in Casablanca and at Mohammed V airport, and comprehensive insurance with an excess. The team gives the excess amount on WhatsApp.',
    },
    {
      q: 'Why does Yourent not offer lower prices?',
      a: 'Yourent prefers to show its real entry rate, {minPrice} MAD per day, and say what it includes (free delivery, comprehensive insurance with an excess) rather than a teaser price.',
    },
    {
      q: 'Can I rent for a single day or a weekend?',
      a: 'No, the minimum rental is 5 days.',
    },
    {
      q: 'Is a deposit needed for a small car?',
      a: 'Yes, a deposit is taken at pick-up for every car, by cheque, cash or card imprint. It is returned once the car is back in good condition, and the team tells you the amount.',
    },
  ],
  related: ['longue-duree', 'tarifs', 'conditions', 'agence-vs-international', 'suv'],
};

export default page;
