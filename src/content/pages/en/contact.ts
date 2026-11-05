import type { PageContent } from '../../types';

const page: PageContent = {
  metaTitle: 'Contact Yourent Car Rental Casablanca | Yourent',
  metaDescription:
    'Contact Yourent car rental Casablanca: WhatsApp and phone +212 6 61 23 62 31, email, Rue Ibnou Mounir address, open from 8 am to 10 pm, 7 days a week.',
  eyebrow: 'Contact',
  h1: 'Contact Yourent Car Rental in Casablanca',
  intro:
    'The fastest way to reach Yourent is WhatsApp or phone on +212 6 61 23 62 31, from 8 am to 10 pm, 7 days a week. You can also write to contact@yourent.ma or come to the agency at N°25 Rue Ibnou Mounir in Casablanca. The team confirms availability and arranges delivery.',
  breadcrumb: 'Contact',
  sections: [
    {
      h2: 'Phone, WhatsApp, email',
      blocks: [
        {
          type: 'list',
          items: [
            '**Phone and WhatsApp**: +212 6 61 23 62 31.',
            '**Email**: contact@yourent.ma.',
            '**Instagram**: [you_rent_car](https://www.instagram.com/you_rent_car).',
          ],
        },
        {
          type: 'p',
          text: 'WhatsApp works well for sending your dates, your flight or the delivery address. The questions the site does not settle (minimum age, excess, included mileage, returning in another city) get an answer from the team there before you book.',
        },
      ],
    },
    {
      h2: 'Agency address and opening hours',
      blocks: [
        {
          type: 'p',
          text: 'The agency is at N°25 Rue Ibnou Mounir, 20100 Casablanca. It is open from 8 am to 10 pm, every day of the week. The map and reviews are on the [Yourent Google listing](https://www.google.com/maps/place/YouRent/@33.5820604,-7.6363812,17z).',
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
            'Choose your car in the [catalogue](/catalogue) and your dates.',
            'Send the request, or write on WhatsApp with the handover place: hotel, Mohammed V airport or an address in Casablanca.',
            'The team confirms availability, price and handover time.',
          ],
        },
        {
          type: 'p',
          text: 'Delivery is free anywhere in Casablanca and at the airport, 7 days a week. If you arrive by train at Casa Voyageurs station, send the team your meeting point on WhatsApp. If you arrive by plane, see [car rental at the airport](route:aeroport).',
        },
      ],
    },
    {
      h2: 'Before you write to us',
      blocks: [
        {
          type: 'p',
          text: 'Prices, the deposit and the documents required are detailed on the [prices](route:tarifs) and [FAQ](route:faq) pages. An answer may already be there.',
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
      a: 'The agency is open from 8 am to 10 pm, 7 days a week. For a handover outside those hours, ask the team first.',
    },
    {
      q: 'Where is the agency?',
      a: 'At N°25 Rue Ibnou Mounir, 20100 Casablanca. The map is on the Yourent Google listing.',
    },
    {
      q: 'How do I ask for a car delivery?',
      a: 'Send a request from the site or a WhatsApp message with your dates and the handover place. Delivery is free anywhere in Casablanca and at Mohammed V airport.',
    },
    {
      q: 'Can I book by email?',
      a: 'You can write to contact@yourent.ma, but WhatsApp and phone are quicker for confirming availability.',
    },
  ],
  related: ['faq', 'tarifs', 'aeroport', 'a-propos'],
};

export default page;
