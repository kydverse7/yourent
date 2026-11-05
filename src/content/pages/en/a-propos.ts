import type { PageContent } from '../../types';

const page: PageContent = {
  metaTitle: 'Yourent Car Rental Agency in Casablanca | Yourent',
  metaDescription:
    'Yourent car rental agency in Casablanca: {vehicleCount} cars, {modelCount} models from {fleetMin} MAD a day, rated 4.8 out of 5 on Google (170 reviews), open 7 days a week.',
  eyebrow: 'About',
  h1: 'Yourent, car rental agency in Casablanca',
  intro:
    'Yourent is a car rental agency at N°25 Rue Ibnou Mounir, in Casablanca. It has {vehicleCount} cars across {modelCount} models, from {fleetMin} MAD per day, with free delivery anywhere in Casablanca and at Mohammed V airport. The agency is open from 8 am to 10 pm, 7 days a week.',
  breadcrumb: 'About',
  sections: [
    {
      h2: 'Who Yourent is: a car rental agency in Casablanca',
      blocks: [
        {
          type: 'p',
          text: 'Yourent rents cars to residents, tourists and Moroccans living abroad, so the fleet runs from small city cars to premium SUVs. It includes the Fiat 500, Dacia Duster, Volkswagen Golf 8, Mercedes CLA, Porsche Macan and Range Rover Sport. The cars, their photos and their prices are in the [car catalogue](/catalogue).',
        },
        {
          type: 'p',
          text: 'Each rental lasts at least 5 days, and on most models the rate drops automatically after 10 days. The whole fleet is also covered by comprehensive insurance with an excess.',
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
            '**Phone and WhatsApp**: call or message +212 6 61 23 62 31.',
            '**Email**: contact@yourent.ma.',
          ],
        },
        {
          type: 'p',
          text: 'To visit or to ask for a delivery, see the [Yourent contact](route:contact) page, which also explains how to reach the team first.',
        },
      ],
    },
    {
      h2: 'Google reviews: 4.8 out of 5 from 170 reviews',
      blocks: [
        {
          type: 'p',
          text: "The agency's Google listing shows a rating of 4.8 out of 5 from 170 reviews (as of 5 November 2026). You can read the reviews directly on the [Yourent Google listing](https://www.google.com/maps/place/YouRent/@33.5820604,-7.6363812,17z), where the rating changes as new reviews come in.",
        },
      ],
    },
    {
      h2: 'Booking online by dates',
      blocks: [
        {
          type: 'p',
          text: 'The site lets you search for cars that are free on your dates: cars already rented in that period are left out. You then send a booking request, and the team confirms on WhatsApp or by phone. There is no online payment; instead, you settle with the team. The rules on deposit, insurance and cancellation are on the [car rental requirements](route:conditions) page.',
        },
      ],
    },
    {
      h2: 'Delivery to your hotel, the airport or your address',
      blocks: [
        {
          type: 'p',
          text: 'Yourent delivers the car to your hotel, to Mohammed V airport or to the address of your choice, 7 days a week. Delivery is free anywhere in Casablanca and at the airport. There is no desk at the airport, so the team hands you the car on site, as explained on the [car rental Casablanca airport](route:aeroport) page.',
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
      a: 'The agency is at N°25 Rue Ibnou Mounir, Casablanca 20100, and it opens daily from 8 am to 10 pm.',
    },
    {
      q: 'How many cars does Yourent have?',
      a: 'There are {vehicleCount} cars across {modelCount} models, with daily rates from {fleetMin} MAD to {maxPrice} MAD.',
    },
    {
      q: 'What is the Yourent rating on Google?',
      a: 'The listing showed 4.8 out of 5 from 170 reviews on 5 November 2026.',
    },
    {
      q: 'Does Yourent have a desk at the airport?',
      a: 'No. The agency keeps no office there, but the car is brought to you at Mohammed V airport at no charge.',
    },
    {
      q: 'How can I contact Yourent?',
      a: 'By WhatsApp or phone on +212 6 61 23 62 31, or by email at contact@yourent.ma.',
    },
  ],
  related: ['contact', 'conditions', 'tarifs', 'aeroport'],
};

export default page;
