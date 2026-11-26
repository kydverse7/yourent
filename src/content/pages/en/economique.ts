import type { PageContent } from '../../types';

const page: PageContent = {
  metaTitle: 'Cheap Car Rental Casablanca from {minPrice} MAD/Day | Yourent',
  metaDescription:
    'Cheap car rental in Casablanca from {minPrice} MAD/day: budget cars such as the Fiat 500, Opel Corsa and Dacia Duster. Free airport delivery, insurance included.',
  eyebrow: 'Budget cars',
  h1: 'Cheap car rental in Casablanca: our lowest-priced cars',
  intro:
    'Yourent offers cheap car rental in Casablanca from {minPrice} MAD per day for the Fiat 500 and the Opel Corsa, up to {maxPrice} MAD for the Dacia Duster. Delivery is free in Casablanca and at Mohammed V airport, and comprehensive insurance with an excess is included. Rentals start at 5 days.',
  breadcrumb: 'Cheap car',
  vehicles: { maxPrice: 500, sort: 'asc' },
  sections: [
    {
      h2: 'The four cheapest cars to rent in Casablanca',
      blocks: [
        {
          type: 'p',
          text: 'For a **cheap car rental in Casablanca**, four models in the fleet stay at {maxPrice} MAD per day or less. The prices below are daily rates for 5 to 10 days; the table also gives the rate after 10 days, which is lower on most of them.',
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
      h2: 'Which budget car for which trip',
      blocks: [
        {
          type: 'p',
          text: 'All four have 5 seats, so the real differences are the boot, the gearbox and the fuel.',
        },
        {
          type: 'table',
          head: ['Your trip', 'Car to look at', 'Good to know'],
          rows: [
            [
              'One or two people, mostly in town',
              '[Fiat 500](/catalogue/fiat-500)',
              'Petrol, manual. Short and easy to park, with a small boot.',
            ],
            [
              'Two adults and two children, light luggage',
              '[Opel Corsa](/catalogue/opel-corsa)',
              'Petrol, manual. A more useful boot and back seat than the Fiat 500.',
            ],
            [
              'A small automatic',
              '[Fiat 500 Cabriolet](/catalogue/fiat-500-cabriolet)',
              'Petrol, automatic, folding roof. Very few units, so ask early.',
            ],
            [
              'A family, suitcases, a long drive',
              '[Dacia Duster](/catalogue/dacia-duster)',
              'Diesel, manual. The lowest-priced SUV in the fleet, with a big boot.',
            ],
          ],
        },
        {
          type: 'p',
          text: 'Need an automatic saloon or a bigger SUV? The rest of the fleet is on our [car rental in Casablanca](/) page and in the [car catalogue](/catalogue), where the date search shows which cars are free.',
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
          text: 'At Yourent, the displayed price includes free delivery in Casablanca and at Mohammed V airport, and comprehensive insurance with an excess on every car. The team gives you the excess amount on WhatsApp before you book.',
        },
      ],
    },
    {
      h2: 'Low-cost car hire: what you pay on top of the daily rate',
      blocks: [
        {
          type: 'p',
          text: 'A low daily rate only helps if you know the rest of the bill. With Yourent, plan for these items:',
        },
        {
          type: 'list',
          items: [
            '**The deposit.** It is left at pick-up, by cheque, in cash or by card imprint, and it comes back to you when the car is returned in good condition. The amount depends on the car.',
            '**Fuel and tolls.** Both are yours to pay, as with any rental.',
            '**The excess.** It only matters after a claim, but ask for the amount before you book.',
            '**Mileage.** The included mileage is not published on the site, so ask the team on WhatsApp if you plan a long tour.',
          ],
        },
        {
          type: 'p',
          text: 'Rates are set and billed in Moroccan dirhams; the euro figure in the table is a guide only. There is no delivery charge in Casablanca or at the airport, and nothing is paid online.',
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
          text: 'To compare with a big international brand, read our page on [local agency or international car rental](route:agence-vs-international). The rules we apply, including the minimum age of 21, are detailed in the [car rental requirements](route:conditions).',
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
          text: 'Choose the model and your dates, then send the online request, which involves no payment. The team confirms on WhatsApp or by phone and tells you the deposit amount. The car then comes to your address or to the airport, as our [car rental at Casablanca airport](route:aeroport) page explains. Changing or cancelling is free up to 24 hours before pick-up.',
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
      q: 'Is there a cheap automatic car?',
      a: 'Yes: the [Fiat 500 Cabriolet](/catalogue/fiat-500-cabriolet), at {price:fiat-500-cabriolet} MAD per day, is the lowest-priced automatic. The other models are on the [automatic car rental](route:automatique) page.',
    },
    {
      q: 'Can I rent for a single day or a weekend?',
      a: 'No, the minimum rental is 5 days, even for a small city car.',
    },
    {
      q: 'Is a deposit needed for a small car?',
      a: 'Yes, even small cars need a deposit at pick-up, by cheque, cash or card imprint. The team tells you the amount, then returns it if the car comes back in good condition.',
    },
  ],
  related: ['longue-duree', 'tarifs', 'conditions', 'agence-vs-international', 'suv'],
};

export default page;
