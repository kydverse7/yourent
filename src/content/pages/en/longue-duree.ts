import type { PageContent } from '../../types';

const page: PageContent = {
  metaTitle: 'Long Term Car Rental Casablanca, Monthly | Yourent',
  metaDescription:
    'Long term car rental Casablanca: monthly or several weeks, lower rate applied automatically after 10 days, from {minPrice} MAD/day. Free delivery in Casablanca.',
  eyebrow: 'Long term',
  h1: 'Long Term Car Rental in Casablanca',
  intro:
    'Yourent offers long term car rental in Casablanca, for several weeks or by the month. The daily rate drops automatically after 10 days, from {minPrice} MAD per day, and delivery is free. For an exact monthly price, the team answers on WhatsApp based on the model and your dates.',
  breadcrumb: 'Long term',
  vehicles: { sort: 'asc' },
  sections: [
    {
      h2: 'How long term rental works at Yourent',
      blocks: [
        {
          type: 'p',
          text: '**Long term car rental** does not need a special contract: it is the same rental, just longer. The minimum is 5 days. Between 5 and 10 days, the daily rate is the one in the catalogue. After 10 days, a lower daily rate applies automatically, with no code and no haggling.',
        },
        {
          type: 'p',
          text: 'It suits several situations: a stay of several weeks in Casablanca, a work assignment, a Moroccan living abroad spending the summer at home, a building site or an internship. If you need the car for months, a monthly car rental is something to discuss with the team.',
        },
      ],
    },
    {
      h2: 'How much does a monthly car rental cost in Casablanca',
      blocks: [
        {
          type: 'p',
          text: 'There is no monthly price list on display: the cost depends on the model, the exact length and the period. To estimate, take the after-10-days daily rate in the table and multiply it by the number of days. For example, a Dacia Duster starts at {price:dacia-duster} MAD per day for 5 to 10 days, and a Volkswagen Tiguan at {price:volkswagen-tiguan} MAD; the table shows their reduced rate.',
        },
        { type: 'pricing' },
        {
          type: 'p',
          text: 'For an exact monthly price, message the team on WhatsApp with the model you want, the start date and the planned length. They reply with the amount, the deposit and what they can offer.',
        },
      ],
    },
    {
      h2: 'Which car to choose for several weeks',
      blocks: [
        {
          type: 'list',
          items: [
            '**Small budget and city driving**: the Fiat 500 or the Opel Corsa, the cheapest in the fleet. See the [cheap car rental](route:economique) page.',
            '**Comfort and motorway**: a saloon like the [Toyota Corolla](/catalogue/toyota-corolla) (hybrid) for daily trips, which uses less fuel over time.',
            '**Family and long journeys**: a diesel SUV like the [Volkswagen Tiguan](/catalogue/volkswagen-tiguan) or the [Dacia Duster](/catalogue/dacia-duster). See the [SUV rental](route:suv) page.',
            '**Long term without a clutch**: an [automatic car](route:automatique), more restful if you drive in town every day.',
          ],
        },
        {
          type: 'p',
          text: 'The longer the rental, the more the price gap between two models weighs on the total. Diesel and hybrid are often more economical on fuel over long distances.',
        },
      ],
    },
    {
      h2: 'Booking a long term rental, step by step',
      blocks: [
        {
          type: 'list',
          ordered: true,
          items: [
            'Choose a car and enter your start and end dates in the catalogue: the search hides cars already taken at any point in the period.',
            'Send the online request. No payment is taken at this stage.',
            'The team confirms on WhatsApp or by phone and gives you the total amount and the deposit.',
            'The car is delivered to your address, your hotel or [Mohammed V airport](route:aeroport), free of charge in Casablanca.',
          ],
        },
        {
          type: 'p',
          text: 'Documents to bring: valid ID (CIN or passport), a licence held for more than 2 years, proof of address. Foreign tourists can show an international driving permit. The [rental requirements](route:conditions) give the details.',
        },
      ],
    },
    {
      h2: 'Breakdown, accident, extension: what happens on a long rental',
      blocks: [
        {
          type: 'p',
          text: 'If the car breaks down, a replacement is sent as soon as possible. After an accident, the team helps you with the paperwork. Every car has comprehensive insurance with an excess; the team gives the excess amount on WhatsApp.',
        },
        {
          type: 'p',
          text: 'If you want to keep the car longer than planned, tell the team before the end date: an extension depends on whether the car is free, as it may be booked right after you. To switch cars during a rental, talk to the team too.',
        },
      ],
    },
    {
      h2: 'Cars available for long term rental',
      blocks: [{ type: 'vehicles' }],
    },
  ],
  faq: [
    {
      q: 'After how many days does the daily rate go down?',
      a: 'After 10 days, a lower daily rate applies automatically. From 5 to 10 days, it is the standard rate for the model.',
    },
    {
      q: 'Can I rent a car by the month in Casablanca?',
      a: 'Yes. There is no monthly price list on display: for an exact monthly price, message the team on WhatsApp with the model and the dates and they reply with the amount.',
    },
    {
      q: 'What is the minimum rental period?',
      a: '5 days. There is no one-day or weekend rental.',
    },
    {
      q: 'What if the car breaks down during a long rental?',
      a: 'A replacement car is sent as soon as possible. After an accident, the team helps the customer with the paperwork.',
    },
    {
      q: 'Do I have to pay for the whole rental up front?',
      a: 'The online booking is a request, with no payment. The way you pay is then agreed with the team, who explain it at confirmation on WhatsApp.',
    },
  ],
  related: ['tarifs', 'economique', 'suv', 'conditions', 'aeroport'],
};

export default page;
