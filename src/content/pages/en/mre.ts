import type { PageContent } from '../../types';

const page: PageContent = {
  metaTitle: 'Car Rental for Moroccans Living Abroad | Yourent',
  metaDescription:
    'Car rental for Moroccans living abroad (MRE) in Casablanca: book before you travel, free delivery at Mohammed V airport, from {fleetMin} MAD a day.',
  eyebrow: 'MRE',
  h1: 'Car rental for Moroccans living abroad (MRE) in Casablanca',
  intro:
    'Yourent offers car rental for Moroccans living abroad in Casablanca, from {fleetMin} MAD per day, and you can book before you travel. The car is delivered free of charge to Mohammed V airport, and on most models the rate drops automatically after 10 days. The team confirms the price for your dates.',
  breadcrumb: 'MRE car rental',
  vehicles: { sort: 'asc' },
  sections: [
    {
      h2: 'Car rental for Moroccans living abroad: book before you leave',
      blocks: [
        {
          type: 'p',
          text: 'You can prepare the rental from abroad. Choose the model in the [car catalogue](/catalogue) and enter your arrival and departure dates: the date search hides cars already rented in that period. You send a booking request, then the team confirms it on WhatsApp or by phone, on +212 6 61 23 62 31.',
        },
        {
          type: 'p',
          text: 'There is no online payment, because the booking is only a request. You pay the team afterwards, and they explain how to do it from abroad.',
        },
      ],
    },
    {
      h2: 'Delivery to Mohammed V airport when you arrive',
      blocks: [
        {
          type: 'p',
          text: 'Yourent delivers the car to Mohammed V airport, free of charge, 7 days a week from 8 am to 10 pm. There is no Yourent desk in the airport; instead, the team hands you the car at a meeting point confirmed before you arrive. Send your expected arrival date and time on WhatsApp. If you arrive outside those hours, or if your flight changes, write to the team first: they confirm what is possible.',
        },
        {
          type: 'p',
          text: 'Delivery is also free anywhere in Casablanca: at your family home, at a hotel or elsewhere in town. You will find more on the [car rental Casablanca airport](route:aeroport) page.',
        },
      ],
    },
    {
      h2: 'A summer rental: the rate after 10 days',
      blocks: [
        {
          type: 'p',
          text: 'A stay back home often lasts several weeks. At Yourent, the minimum rental is 5 days and, on most models, a lower rate applies automatically after 10 days, with no code. The "Over 10 days" column in the list below gives each model\'s daily price for a long rental. On a Dacia Duster, for example, the rate goes from {price:dacia-duster} MAD per day to a lower price after 10 days. In high season, however, ask the team to confirm this rate for your dates.',
        },
        { type: 'pricing' },
        {
          type: 'p',
          text: 'For a stay of over a month, see also the [long-term car rental](route:longue-duree) page. Availability in high season depends on bookings already made, so the earlier you ask, the wider the choice.',
        },
      ],
    },
    {
      h2: 'Which car for a family stay',
      blocks: [
        {
          type: 'p',
          text: 'Every car in the fleet has 5 seats, so luggage decides. For family trips, an SUV such as the Dacia Duster, the Volkswagen Tiguan or the Kia Sorento is the usual choice; see the [SUV rental in Casablanca](route:suv) page. An automatic gearbox is handy in town, as the [automatic car rental](route:automatique) page explains.',
        },
        { type: 'vehicles' },
      ],
    },
    {
      h2: 'Age, documents, licence and deposit for Moroccans living abroad',
      blocks: [
        {
          type: 'list',
          items: [
            'A minimum age of 21, with your CIN or passport as a valid ID.',
            'A licence that is more than 2 years old. If it was issued abroad, the team confirms before you book whether it is suitable.',
            'Proof of address: ask the team which one is accepted for a resident abroad.',
            'A deposit at pick-up, by cheque, in cash or by card imprint. The amount depends on the car: the team states it at confirmation and returns the deposit when the car comes back in good condition.',
          ],
        },
        {
          type: 'p',
          text: 'All the rules, including comprehensive insurance with an excess and free cancellation up to 24 hours before pick-up, are on the [car rental requirements](route:conditions) page.',
        },
      ],
    },
  ],
  faq: [
    {
      q: 'Can I book a car before leaving my country of residence?',
      a: 'Yes. Send a request with your dates from the site; the team confirms on WhatsApp or by phone, with no online payment.',
    },
    {
      q: 'Can the car be waiting for me at Mohammed V airport?',
      a: 'Yourent delivers the car to the airport free of charge, 7 days a week, but has no desk on site. The meeting point is confirmed with the team before you arrive.',
    },
    {
      q: 'What is the rate for a stay of more than 10 days?',
      a: 'On most models, the rate falls by itself after 10 days, and the team confirms the price for your dates. The list on this page shows each daily price before and after 10 days.',
    },
    {
      q: 'Which documents must I show?',
      a: 'You must be at least 21 and show a valid ID (CIN or passport), a licence over 2 years old and proof of address. A deposit is left at pick-up. The team clarifies special cases, such as a licence issued abroad.',
    },
    {
      q: 'What if my flight arrives late?',
      a: 'Tell the team on WhatsApp. If you land after 10 pm, outside delivery hours, they tell you what is possible.',
    },
    {
      q: 'Can I rent for the whole summer holiday?',
      a: 'Yes, the minimum rental is 5 days and no maximum is shown. For several weeks, write to the team with your dates to confirm availability.',
    },
  ],
  related: ['aeroport', 'longue-duree', 'tarifs', 'suv', 'conditions'],
};

export default page;
