import type { PageContent } from '../../types';

const page: PageContent = {
  metaTitle: 'Contact Yourent Car Rental Casablanca | Yourent',
  metaDescription:
    'Contact Yourent for car rental in Casablanca: WhatsApp and phone +212 6 61 23 62 31, email, Rue Ibnou Mounir address, open 8 am to 10 pm, rated 4.8/5.',
  eyebrow: 'Contact',
  h1: 'Contact Yourent, car rental in Casablanca',
  intro:
    'To contact Yourent about a car rental in Casablanca, use WhatsApp or phone on +212 6 61 23 62 31, from 8 am to 10 pm every day. You can also write to contact@yourent.ma or come to the agency at N°25 Rue Ibnou Mounir. The team then confirms availability and arranges delivery.',
  breadcrumb: 'Contact',
  sections: [
    {
      h2: 'Contact Yourent for car rental in Casablanca: phone, WhatsApp, email',
      blocks: [
        {
          type: 'list',
          items: [
            '**Phone and WhatsApp**: +212 6 61 23 62 31, the same number for both.',
            '**Email**: contact@yourent.ma.',
            '**Instagram**: [you_rent_car](https://www.instagram.com/you_rent_car).',
          ],
        },
        {
          type: 'p',
          text: 'WhatsApp works well for sending your dates, your flight or the delivery address. The team also answers there the questions the site does not settle (excess, included mileage, returning in another city) before you book.',
        },
      ],
    },
    {
      h2: 'Agency address and opening hours',
      blocks: [
        {
          type: 'p',
          text: 'You can visit us at N°25 Rue Ibnou Mounir, 20100 Casablanca, every day between 8 am and 10 pm. For directions, the map and reviews are on the [Yourent Google listing](https://www.google.com/maps/place/YouRent/@33.5820604,-7.6363812,17z).',
        },
      ],
    },
    {
      h2: 'How to ask for a delivery',
      blocks: [
        {
          type: 'list',
          ordered: true,
          items: [
            'First choose your car in the [car catalogue](/catalogue) and your dates.',
            'Send the request, or write on WhatsApp with the handover place: hotel, Mohammed V airport or an address in Casablanca.',
            'The team confirms availability, price and handover time.',
          ],
        },
        {
          type: 'p',
          text: 'We deliver free of charge across Casablanca and at the airport, every day. If you arrive by train at Casa Voyageurs station, send the team your meeting point on WhatsApp. If you arrive by plane, see [car rental Casablanca airport](route:aeroport).',
        },
      ],
    },
    {
      h2: 'Before you write to us',
      blocks: [
        {
          type: 'p',
          text: 'Prices, the deposit and the documents required are detailed on the [car rental prices in Casablanca](route:tarifs) and [car rental FAQ](route:faq) pages. Your answer may already be there.',
        },
      ],
    },
  ],
  faq: [
    {
      q: "What is Yourent's phone number?",
      a: 'The number is +212 6 61 23 62 31, for calls and for WhatsApp.',
    },
    {
      q: 'What are the agency opening hours?',
      a: 'We open at 8 am and close at 10 pm, all week. For a handover outside those hours, ask the team first.',
    },
    {
      q: 'Where is the agency?',
      a: 'At N°25 Rue Ibnou Mounir, 20100 Casablanca. The map is on the Yourent Google listing.',
    },
    {
      q: 'How do I ask for a car delivery?',
      a: 'Send a request from the site or a WhatsApp message with your dates and the handover place. Delivery is free in Casablanca and at Mohammed V airport.',
    },
    {
      q: 'Can I book by email?',
      a: 'You can write to contact@yourent.ma, but WhatsApp and phone are quicker for confirming availability.',
    },
  ],
  related: ['faq', 'tarifs', 'aeroport', 'a-propos'],
};

export default page;
