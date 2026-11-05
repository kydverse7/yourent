import type { PageContent } from '../../types';

const page: PageContent = {
  metaTitle: 'Car Rental Casablanca Airport (CMN) | Yourent',
  metaDescription:
    'Car rental Casablanca airport: Yourent delivers to Mohammed V (CMN) free of charge, from {minPrice} MAD/day, insurance included. Book online, confirm on WhatsApp.',
  eyebrow: 'Mohammed V Airport',
  h1: 'Car Rental at Mohammed V Airport (Casablanca CMN)',
  intro:
    'Yourent delivers your rental car to Mohammed V airport in Casablanca (CMN) at no delivery charge, from {minPrice} MAD per day. You pick a car and your dates online, the team confirms on WhatsApp or by phone, and a team member hands you the keys when you land. Rentals start at 5 days.',
  breadcrumb: 'Mohammed V Airport',
  vehicles: { sort: 'asc' },
  sections: [
    {
      h2: 'Car hire at Casablanca airport, delivered to you',
      blocks: [
        {
          type: 'p',
          text: 'Yourent is a Casablanca agency based at N°25 Rue Ibnou Mounir. It has no desk inside the terminal: the car comes to you. For **car rental at Casablanca airport (Mohammed V)**, the idea is simple. You book before you fly, and a team member hands you the car on site, at the agreed meeting point, with no trip to an agency.',
        },
        {
          type: 'p',
          text: 'Delivery to the airport is **free**, just like delivery anywhere in Casablanca. The fleet has {vehicleCount} cars across {modelCount} models, from {fleetMin} MAD to {maxPrice} MAD per day depending on the model. Every car has comprehensive insurance with an excess.',
        },
      ],
    },
    {
      h2: 'How the handover at the airport works',
      blocks: [
        {
          type: 'p',
          text: 'Here is the whole process, from your request to the return.',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            '**The online request.** On a car page or from the [catalogue](/catalogue), you enter your dates and the availability search hides cars that are already taken. Say that you want the handover at Mohammed V airport and give your arrival date and time.',
            '**Confirmation by the team.** The online request is not a payment. The team answers on WhatsApp or by phone to confirm the car, the dates and the amount. This is the moment to ask your questions.',
            '**Handover on arrival.** You land, collect your luggage, and a team member gives you the car. The team sends the exact meeting point on WhatsApp before you arrive.',
            '**Check and departure.** You show your documents, the deposit is taken, the condition of the car is checked with you, and you drive off.',
            '**The return.** At the end of the rental, you bring the car back to the place agreed with the team. The deposit is returned once the car is back in good condition.',
          ],
        },
        {
          type: 'p',
          text: 'To change or cancel, the simplest way is to tell the team at least 24 hours before pick-up: that is free of charge. After that, fees may apply. The details are in the [rental requirements](route:conditions).',
        },
      ],
    },
    {
      h2: 'Why have the car delivered instead of using a rental desk',
      blocks: [
        {
          type: 'p',
          text: 'A rental desk works well for many travellers. Delivery suits a different situation: you arrive tired, with luggage, sometimes with family, and you want to leave without queuing or taking a shuttle to a distant car park.',
        },
        {
          type: 'list',
          items: [
            'No queue at a desk: the meeting is set in advance with the team.',
            'You deal directly with the team from booking to key handover, and you can reach them on WhatsApp during the rental.',
            'Terms are agreed before the flight: price, deposit, documents. You know what to expect when you land.',
            'You can also ask for delivery to your hotel or to an address in Casablanca, 7 days a week.',
          ],
        },
        {
          type: 'p',
          text: 'If you are comparing with an international brand, look at the deposit, the excess and the extra fees, not just the headline price. Our page on [local agency or international car rental](route:agence-vs-international) lists what to check.',
        },
      ],
    },
    {
      h2: 'What to have ready before you land',
      blocks: [
        {
          type: 'p',
          text: 'Having the right papers with you avoids delaying the handover. Bring:',
        },
        {
          type: 'list',
          items: [
            'a valid ID: Moroccan CIN or passport;',
            'a driving licence held for more than 2 years (foreign tourists can show an international driving permit);',
            'proof of address;',
            'a way to leave the deposit: cheque, cash or card imprint. The amount depends on the car and is given to you at confirmation;',
            'your flight number and arrival time, to send to the team.',
          ],
        },
        {
          type: 'p',
          text: 'If you travel with children, bulky luggage or several passengers, say so in your request and the team will point you to a suitable car. All our cars have 5 seats. The [rental requirements](route:conditions) give the full list of documents.',
        },
      ],
    },
    {
      h2: 'Between landing and getting the keys',
      blocks: [
        {
          type: 'p',
          text: 'The most useful step is to fix the timing with the team before you leave. Send your flight number, expected arrival time, number of passengers and suitcases. With that, the team prepares the right car, checks that it is free on your dates and writes to you on WhatsApp to set the meeting.',
        },
        {
          type: 'p',
          text: 'At the handover, take two minutes to walk around the car with the team, check the fuel level and note any existing scratches. This check protects both sides and makes the return quicker.',
        },
      ],
    },
    {
      h2: 'Late arrival, night flight or delayed flight',
      blocks: [
        {
          type: 'p',
          text: 'The agency is open from 8 am to 10 pm, 7 days a week. If your flight lands late, very early or is delayed, the team tells you on WhatsApp what is possible for your arrival, including the exact meeting point.',
        },
        {
          type: 'p',
          text: 'The safest approach is to send your flight number with your request, then message the team on WhatsApp if your schedule changes before you fly. You can reach them from the [contact](route:contact) page.',
        },
      ],
    },
    {
      h2: 'Which car to pick for leaving the airport',
      blocks: [
        {
          type: 'p',
          text: 'The airport is linked by motorway to Casablanca, Rabat and Marrakech. For the city and a small budget, a small car is enough. For long drives and families, an [SUV rental](route:suv) or a saloon gives more comfort and boot space. If you would rather not deal with a clutch after a flight, an [automatic car rental](route:automatique) is a good option.',
        },
        {
          type: 'p',
          text: 'For a business trip or an event, look at the [luxury car](route:luxe) selection. The price of each model is listed below.',
        },
      ],
    },
    {
      h2: 'Prices of cars we deliver to the airport',
      blocks: [
        { type: 'pricing' },
        {
          type: 'p',
          text: 'On most models, the daily rate drops automatically after 10 days. Airport delivery costs nothing: you only pay for the rental. All models and their terms are on the [prices](route:tarifs) page.',
        },
      ],
    },
    {
      h2: 'Available cars',
      blocks: [{ type: 'vehicles' }],
    },
  ],
  faq: [
    {
      q: 'Is delivery to Mohammed V airport charged?',
      a: 'No. Yourent delivers free of charge to Mohammed V airport and anywhere in Casablanca. You only pay for the rental, at the rate of the car you choose.',
    },
    {
      q: 'Is there a Yourent desk in the terminal?',
      a: 'No. Yourent delivers the car when you arrive and has no office in the airport. The team sends you the exact meeting point on WhatsApp before your flight.',
    },
    {
      q: 'What if my flight is delayed or I land at night?',
      a: 'Send your flight number when you book and message the team on WhatsApp if anything changes. For an arrival outside opening hours (8 am to 10 pm) or a long delay, the team tells you on WhatsApp what is possible.',
    },
    {
      q: 'Which documents do I need at the airport?',
      a: 'A valid ID (CIN or passport), a driving licence held for more than 2 years (an international driving permit is accepted for foreign tourists) and proof of address. A deposit is taken at pick-up, by cheque, cash or card imprint.',
    },
    {
      q: 'Can I book without paying online?',
      a: 'Yes. The online booking is a request: the team then confirms by WhatsApp or phone, and you pay them directly. You can change or cancel free of charge up to 24 hours before pick-up.',
    },
    {
      q: 'Can I return the car at the airport at the end of the rental?',
      a: 'The return place is agreed with the team at confirmation. Mention it in your request so they can answer on WhatsApp before you travel.',
    },
  ],
  related: ['tarifs', 'conditions', 'suv', 'automatique', 'contact'],
};

export default page;
