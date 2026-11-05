import type { PageContent } from '../../types';

const page: PageContent = {
  metaTitle: 'Long Term Car Rental Casablanca, Monthly | Yourent',
  metaDescription:
    'Long-term car rental in Casablanca: monthly or several weeks, lower rate after 10 days on most models, from {minPrice} MAD/day. Free delivery in Casablanca.',
  eyebrow: 'Long-term',
  h1: 'Long-term car rental in Casablanca',
  intro:
    'Yourent offers long-term car rental in Casablanca for several weeks or by the month, from {minPrice} MAD per day. On most models, the rate drops automatically after 10 days, and delivery is free in Casablanca and at Mohammed V airport. For an exact monthly price, the team answers on WhatsApp based on the model and your dates.',
  breadcrumb: 'Long-term',
  vehicles: { sort: 'asc' },
  sections: [
    {
      h2: 'Long-term car rental in Casablanca: how it works',
      blocks: [
        {
          type: 'p',
          text: 'At Yourent, **long-term car rental** is not a separate package: it is the same rental, just longer. The minimum is 5 days. Between 5 and 10 days, the daily rate is the one in the catalogue. From day 11, a lower daily rate applies on most models, with no code and no haggling. High season can suspend this reduction, so ask the team to confirm it for your dates.',
        },
        {
          type: 'p',
          text: 'It suits several situations: a stay of several weeks, a work assignment, an internship or a summer at home for a Moroccan living abroad. If you need the car for months, discuss the monthly price with the team.',
        },
      ],
    },
    {
      h2: 'Monthly car rental in Casablanca: how much does it cost',
      blocks: [
        {
          type: 'p',
          text: 'There is no monthly price list on display, because the cost depends on the model, the exact length and the period. To estimate, take the rate in the "Over 10 days" column of the table and multiply it by the number of days. A Dacia Duster, for example, starts at {price:dacia-duster} MAD per day for 5 to 10 days, and a Volkswagen Tiguan at {price:volkswagen-tiguan} MAD. The table shows their reduced rate.',
        },
        { type: 'pricing' },
        {
          type: 'p',
          text: 'To get a precise monthly figure, message the team on WhatsApp with the model you want, the start date and the planned length. They reply with the amount, the deposit and what they can offer.',
        },
      ],
    },
    {
      h2: 'Which car to choose for several weeks',
      blocks: [
        {
          type: 'list',
          items: [
            '**Small budget and city driving**: the Fiat 500 or the Opel Corsa, the cheapest in the fleet, as the [cheap car rental](route:economique) page shows.',
            '**Comfort and motorway**: a saloon like the [Toyota Corolla](/catalogue/toyota-corolla), whose hybrid system suits daily trips.',
            '**Family and long journeys**: a diesel SUV like the [Volkswagen Tiguan](/catalogue/volkswagen-tiguan) or the [Dacia Duster](/catalogue/dacia-duster). Our [SUV rental in Casablanca](route:suv) page lists them all.',
            '**Long term without a clutch**: an [automatic car rental](route:automatique), especially if you drive in town every day.',
          ],
        },
        {
          type: 'p',
          text: 'The longer the rental, the more the price gap between two models adds up. Fuel counts too: diesel and hybrid are often more economical over long distances.',
        },
      ],
    },
    {
      h2: 'Booking a long-term rental, step by step',
      blocks: [
        {
          type: 'list',
          ordered: true,
          items: [
            'Choose a car and enter your start and end dates in the catalogue: the search hides cars already taken at any point in the period.',
            'Send the online request, which involves no payment at this stage.',
            'The team confirms on WhatsApp or by phone and gives you the total amount and the deposit.',
            'The car is delivered to your address, your hotel or [Mohammed V airport](route:aeroport), free of charge in Casablanca and at the airport.',
          ],
        },
        {
          type: 'p',
          text: 'Documents to bring: valid ID (CIN or passport), a licence held for more than 2 years, proof of address. Visitors from abroad may instead use an international driving permit. The [car rental requirements](route:conditions) give the details.',
        },
      ],
    },
    {
      h2: 'Breakdown, accident, extension: what happens on a long rental',
      blocks: [
        {
          type: 'p',
          text: 'A long rental leaves time for the unexpected. For a breakdown, a replacement car is sent as quickly as possible; for an accident, the team helps with the paperwork. Comprehensive insurance with an excess covers you throughout, and the team gives that amount on WhatsApp.',
        },
        {
          type: 'p',
          text: 'If you want to keep the car longer than planned, tell the team before the end date. An extension depends on whether the car is free, because it may be booked right after you. To switch cars during a rental, also talk to the team.',
        },
      ],
    },
    {
      h2: 'Cars available for long-term rental',
      blocks: [{ type: 'vehicles' }],
    },
  ],
  faq: [
    {
      q: 'After how many days does the daily rate go down?',
      a: 'From day 11 on most models, with nothing to request. From 5 to 10 days, you pay the standard rate for the model.',
    },
    {
      q: 'Can I rent a car by the month in Casablanca?',
      a: 'Yes. There is no public monthly list, so message the team on WhatsApp with the model and the dates and they reply with the amount.',
    },
    {
      q: 'What is the minimum rental period?',
      a: 'You rent for 5 days at least, so there is no one-day or weekend rental.',
    },
    {
      q: 'What if the car breaks down during a long rental?',
      a: 'The team sends you another car as quickly as possible. It also helps with the paperwork if there has been an accident.',
    },
    {
      q: 'Do I have to pay for the whole rental up front?',
      a: 'No. The online booking is a request, with no payment. The way you pay is then agreed with the team, who explain it at confirmation on WhatsApp.',
    },
  ],
  related: ['tarifs', 'economique', 'suv', 'conditions', 'aeroport'],
};

export default page;
