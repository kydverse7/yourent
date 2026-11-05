import type { PageContent } from '../../types';

const page: PageContent = {
  metaTitle: 'Yourent Car Rental Agency in Casablanca | Yourent',
  metaDescription:
    'Yourent car rental agency in Casablanca: {vehicleCount} cars, {modelCount} models from {fleetMin} MAD a day, rated 4.8 out of 5 on Google (170 reviews), open 7 days a week.',
  eyebrow: 'About',
  h1: 'Yourent, Car Rental Agency in Casablanca',
  intro:
    'Yourent is a car rental agency at N°25 Rue Ibnou Mounir, in Casablanca. It has {vehicleCount} cars across {modelCount} models, from {fleetMin} MAD per day, with free delivery anywhere in Casablanca and at Mohammed V airport. The agency is open from 8 am to 10 pm, 7 days a week.',
  breadcrumb: 'About',
  sections: [
    {
      h2: 'Who Yourent is',
      blocks: [
        {
          type: 'p',
          text: 'Yourent rents cars to residents, tourists and Moroccans living abroad. The fleet runs from the economical city car to the SUV and the premium car: Fiat 500, Dacia Duster, Volkswagen Golf 8, Mercedes CLA, Porsche Macan, Range Rover Sport. The cars, their photos and their prices are in the [catalogue](/catalogue).',
        },
        {
          type: 'p',
          text: 'The minimum rental is 5 days, with a lower rate applied automatically after 10 days. Every car has comprehensive insurance with an excess.',
        },
      ],
    },
    {
      h2: 'Agency address and opening hours',
      blocks: [
        {
          type: 'list',
          items: [
            '**Address**: N°25 Rue Ibnou Mounir, 20100 Casablanca, Morocco.',
            '**Opening hours**: 8 am to 10 pm, 7 days a week.',
            '**Phone and WhatsApp**: +212 6 61 23 62 31.',
            '**Email**: contact@yourent.ma.',
          ],
        },
        {
          type: 'p',
          text: 'To visit or to ask for a delivery, see the [contact](route:contact) page.',
        },
      ],
    },
    {
      h2: 'Google reviews: 4.8 out of 5 from 170 reviews',
      blocks: [
        {
          type: 'p',
          text: "The agency's Google listing shows a rating of 4.8 out of 5 from 170 reviews (as of 5 November 2026). You can read the reviews directly on the [Yourent Google listing](https://www.google.com/maps/place/YouRent/@33.5820604,-7.6363812,17z). The rating changes as new reviews come in.",
        },
      ],
    },
    {
      h2: 'Booking online by dates',
      blocks: [
        {
          type: 'p',
          text: 'The site lets you search for cars that are free on your dates: cars already rented in that period are left out. You then send a booking request, and the team confirms on WhatsApp or by phone. There is no online payment. The rules on deposit, insurance and cancellation are on the [rental requirements](route:conditions) page.',
        },
      ],
    },
    {
      h2: 'Delivery to your hotel, the airport or your address',
      blocks: [
        {
          type: 'p',
          text: 'Yourent delivers the car to your hotel, to Mohammed V airport or to the address of your choice, 7 days a week. Delivery is free anywhere in Casablanca and at the airport. There is no desk at the airport: the team hands you the car on site. Details on the [car rental at the airport](route:aeroport) page.',
        },
      ],
    },
    {
      h2: 'Follow Yourent',
      blocks: [
        {
          type: 'p',
          text: 'Yourent is on [Instagram](https://www.instagram.com/you_rent_car), [Facebook](https://www.facebook.com/yourent.ma) and [TikTok](https://www.tiktok.com/@yourent.ma).',
        },
      ],
    },
  ],
  faq: [
    {
      q: 'Where is the Yourent agency in Casablanca?',
      a: 'The agency is at N°25 Rue Ibnou Mounir, 20100 Casablanca. It is open from 8 am to 10 pm, 7 days a week.',
    },
    {
      q: 'How many cars does Yourent have?',
      a: 'The fleet has {vehicleCount} cars across {modelCount} models, from {fleetMin} MAD to {maxPrice} MAD per day depending on the model.',
    },
    {
      q: 'What is the Yourent rating on Google?',
      a: 'The Google listing shows 4.8 out of 5 from 170 reviews, as of 5 November 2026.',
    },
    {
      q: 'Does Yourent have a desk at the airport?',
      a: 'No. Yourent delivers the car to Mohammed V airport, free of charge, but has no office on site.',
    },
    {
      q: 'How can I contact Yourent?',
      a: 'By WhatsApp or phone on +212 6 61 23 62 31, or by email at contact@yourent.ma.',
    },
  ],
  related: ['contact', 'conditions', 'tarifs', 'aeroport'],
};

export default page;
