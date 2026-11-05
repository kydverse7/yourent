import type { PageContent } from '../../types';

const page: PageContent = {
  metaTitle: 'Car Rental for Moroccans Living Abroad | Yourent',
  metaDescription:
    'Car rental for Moroccans living abroad (MRE) in Casablanca: book before you travel, free delivery at Mohammed V airport, from {fleetMin} MAD a day.',
  eyebrow: 'MRE',
  h1: 'Car Rental for Moroccans Living Abroad (MRE) in Casablanca',
  intro:
    'Yourent rents cars in Casablanca to Moroccans living abroad, from {fleetMin} MAD per day, and you can book before you travel. The car is delivered free of charge to Mohammed V airport when you arrive, and on most models the rate drops automatically after 10 days, a common length for a summer stay. The team confirms the price for your dates.',
  breadcrumb: 'MRE car rental',
  vehicles: { sort: 'asc' },
  sections: [
    {
      h2: 'Book your car before leaving your country of residence',
      blocks: [
        {
          type: 'p',
          text: 'You can prepare the rental from abroad. Choose the model in the [catalogue](/catalogue) and enter your arrival and departure dates: the date search hides cars already rented in that period. You send a booking request, then the team confirms it on WhatsApp or by phone, on +212 6 61 23 62 31.',
        },
        {
          type: 'p',
          text: 'There is no online payment: the booking is a request, and you pay the team afterwards. They explain how to do it from abroad.',
        },
      ],
    },
    {
      h2: 'Delivery to Mohammed V airport when you arrive',
      blocks: [
        {
          type: 'p',
          text: 'Yourent delivers the car to Mohammed V airport, free of charge, 7 days a week from 8 am to 10 pm. There is no Yourent desk in the airport: the team hands you the car on site, at a meeting point confirmed before you arrive. Send the team your expected arrival date and time on WhatsApp. If you arrive outside 8 am to 10 pm, or if your flight changes, write to the team first: they confirm what is possible.',
        },
        {
          type: 'p',
          text: 'Delivery is also free anywhere in Casablanca: at your family home, at a hotel or elsewhere in town. Details on the [car rental at the airport](route:aeroport) page.',
        },
      ],
    },
    {
      h2: 'A summer rental: the rate after 10 days',
      blocks: [
        {
          type: 'p',
          text: 'A stay back home often lasts several weeks. At Yourent, the minimum rental is 5 days and, on most models, a lower rate applies automatically after 10 days, with no code. The "Over 10 days" column in the list below gives each model\'s daily price for a long rental. On a Dacia Duster, for example, the rate goes from {price:dacia-duster} MAD per day to a lower price after 10 days. In high season, ask the team to confirm this rate for your dates.',
        },
        { type: 'pricing' },
        {
          type: 'p',
          text: 'For a stay of over a month, see also the [long-term car rental](route:longue-duree) page. Availability in high season depends on bookings already made: the earlier you ask, the wider the choice.',
        },
      ],
    },
    {
      h2: 'Which car for a family stay',
      blocks: [
        {
          type: 'p',
          text: 'Every car in the fleet has 5 seats. For family trips and luggage, an SUV such as the Dacia Duster, the Volkswagen Tiguan or the Kia Sorento is the usual choice; see the [SUV rental](route:suv) page. An automatic gearbox is handy in town: see the [automatic car rental](route:automatique) page.',
        },
        { type: 'vehicles' },
      ],
    },
    {
      h2: 'Documents, licence and deposit for Moroccans living abroad',
      blocks: [
        {
          type: 'list',
          items: [
            'A valid ID: Moroccan CIN or passport.',
            'A driving licence held for more than 2 years. If your licence was issued abroad, the team confirms before you book whether it is suitable.',
            'Proof of address: the team tells you which one is accepted for a resident abroad.',
            'A deposit at pick-up, by cheque, in cash or by card imprint. The amount depends on the car. It is returned once the car is back in good condition.',
          ],
        },
        {
          type: 'p',
          text: 'All the rules, including comprehensive insurance with an excess and free cancellation up to 24 hours before pick-up, are on the [rental requirements](route:conditions) page.',
        },
      ],
    },
  ],
  faq: [
    {
      q: 'Can I book a car before leaving my country of residence?',
      a: 'Yes. You send a request with your dates from the site, then the team confirms on WhatsApp or by phone. There is no online payment.',
    },
    {
      q: 'Can the car be waiting for me at Mohammed V airport?',
      a: 'Yourent delivers the car to the airport free of charge, 7 days a week, but has no desk on site. The meeting point is confirmed with the team before you arrive.',
    },
    {
      q: 'What is the rate for a stay of more than 10 days?',
      a: 'On most models, a lower rate applies automatically after 10 days, and the team confirms the price for your dates. The list on this page shows, for each model, the daily price before and after 10 days.',
    },
    {
      q: 'Which documents must I show?',
      a: 'A valid ID (CIN or passport), a licence held for more than 2 years, proof of address and the deposit. The team clarifies special cases, such as a licence issued abroad.',
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
