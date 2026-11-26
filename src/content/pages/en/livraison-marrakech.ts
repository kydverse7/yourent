import type { PageContent } from '../../types';

const page: PageContent = {
  metaTitle: 'Car Rental Marrakech & Menara Airport, Delivered | Yourent',
  metaDescription:
    'Car rental in Marrakech and at Marrakech-Menara airport (RAK): delivered on request from Casablanca, from {minPrice} MAD/day, 5-day minimum, terms on WhatsApp.',
  eyebrow: 'Delivered to Marrakech',
  h1: 'Car rental in Marrakech: delivery in the city or at Menara airport, on request',
  intro:
    'Yourent is a Casablanca agency with no branch in Marrakech, but your rental car can be delivered there on request, in the city or at Marrakech-Menara airport (RAK). Rates start from {minPrice} MAD per day, for a minimum of 5 days. The team confirms on WhatsApp whether delivery is possible, on what conditions and with what surcharge, if any, before you book.',
  breadcrumb: 'Car rental in Marrakech',
  vehicles: { sort: 'asc' },
  sections: [
    {
      h2: 'Car rental in Marrakech with Yourent: the essentials',
      blocks: [
        {
          type: 'table',
          head: ['Your question', 'The short answer'],
          rows: [
            ['Does Yourent have a branch in Marrakech?', 'No. The only agency is in Casablanca, and the car comes from there.'],
            ['Can I get the car in Marrakech?', 'Yes, on request: in the city or at Marrakech-Menara airport (RAK).'],
            ['Is there a delivery charge?', 'A surcharge may apply. The team confirms the conditions and the amount, if any, on WhatsApp before you book.'],
            ['How much is the car?', 'From {minPrice} MAD per day, with a 5-day minimum.'],
            ['Where do I return it?', 'The return place is agreed with the team on WhatsApp before you confirm.'],
            ['When can I reach the team?', 'Every day from 8 am to 10 pm, by WhatsApp or phone on +212 6 61 23 62 31.'],
            ['Do I pay online?', 'No. The online booking is a request, and you pay the team directly.'],
          ],
        },
      ],
    },
    {
      h2: 'How delivery to Marrakech works, step by step',
      blocks: [
        {
          type: 'list',
          ordered: true,
          items: [
            '**Send the online request.** Choose a car in the [car catalogue](/catalogue) and enter your dates. In the notes, say that you want the car in Marrakech or at Marrakech-Menara airport, and give the date, the time and, if you are flying in, your flight number.',
            '**The team answers on WhatsApp.** Nothing is paid online. The team tells you whether delivery is possible on your dates, then confirms the conditions, any surcharge and the meeting point. You decide once you have the full picture.',
            '**Handover and check.** A team member brings the car from Casablanca. You show your documents, leave the deposit and walk around the car together before you drive off.',
            '**The return.** The return place is agreed with the team on WhatsApp before you confirm. Your deposit comes back when the car is returned in good condition.',
          ],
        },
        {
          type: 'p',
          text: 'Because the car travels from Casablanca, send your request as early as you can. Changing or cancelling is free up to 24 hours before pick-up; after that, fees may apply.',
        },
      ],
    },
    {
      h2: 'Car hire at Marrakech-Menara airport (RAK): what to expect on arrival',
      blocks: [
        {
          type: 'p',
          text: 'Marrakech-Menara airport, IATA code RAK, lies about 5 km from the centre of Marrakech. Yourent has no desk in the terminal and no office in the city: once delivery is confirmed, a team member meets you with the car at a meeting point sent on WhatsApp.',
        },
        {
          type: 'p',
          text: 'Send your flight number and arrival time with your request, and message the team if your flight changes. The team works from 8 am to 10 pm, every day. If you land outside those hours, ask before you book what can be arranged.',
        },
      ],
    },
    {
      h2: 'Delivered in Marrakech or collected in Casablanca: which suits your trip',
      blocks: [
        {
          type: 'table',
          head: ['Your trip', 'Option to look at', 'Why'],
          rows: [
            [
              'You land at Marrakech-Menara and stay in the south',
              'Delivery in Marrakech, on request',
              'You get the car where you arrive. Conditions and any surcharge are confirmed on WhatsApp first.',
            ],
            [
              'You land at Casablanca Mohammed V (CMN)',
              '[Car rental at Casablanca airport](route:aeroport)',
              'Delivery there is free, and you drive south yourself.',
            ],
            [
              'You start with a few days in Casablanca',
              'Free delivery to your hotel, then the [drive from Casablanca to Marrakech](route:marrakech)',
              'No delivery surcharge. That page describes the motorway route and the tolls.',
            ],
            [
              'You are already in Marrakech',
              'Delivery in the city, on request',
              'Send the team your address and dates, and they tell you what is possible.',
            ],
          ],
        },
        {
          type: 'p',
          text: 'In short, delivery in Casablanca and at Mohammed V airport is always free, while delivery to Marrakech is arranged case by case. If your flights are not booked yet, compare the two before you choose where to land. Either way, the rental lasts at least 5 days.',
        },
      ],
    },
    {
      h2: 'Which car for Marrakech and the roads around it',
      blocks: [
        {
          type: 'p',
          text: 'Every car in the fleet has 5 seats, so choose by luggage, gearbox and budget.',
        },
        {
          type: 'table',
          head: ['Your stay', 'Cars to look at', 'Good to know'],
          rows: [
            [
              'Two people, mostly in town',
              '[Fiat 500](/catalogue/fiat-500) ({price:fiat-500} MAD/day), [Opel Corsa](/catalogue/opel-corsa) ({price:opel-corsa} MAD/day)',
              'Small petrol cars with a manual gearbox, easy to park. The boot is small.',
            ],
            [
              'An automatic for town and motorway',
              '[Toyota Corolla](/catalogue/toyota-corolla) ({price:toyota-corolla} MAD/day), [Volkswagen T-Roc](/catalogue/volkswagen-t-roc) ({price:volkswagen-t-roc} MAD/day)',
              'A hybrid saloon and a compact petrol SUV, both automatic.',
            ],
            [
              'A family with suitcases',
              '[Dacia Duster](/catalogue/dacia-duster) ({price:dacia-duster} MAD/day), [Kia Sorento](/catalogue/kia-sorento) ({price:kia-sorento} MAD/day)',
              'Diesel SUVs with a big boot. The Duster is manual, the Sorento automatic.',
            ],
            [
              'A treat for the stay',
              '[Range Rover Evoque](/catalogue/range-rover-evoque) ({price:range-rover-evoque} MAD/day), [Porsche Macan](/catalogue/porsche-macan) ({price:porsche-macan} MAD/day)',
              'Premium automatic SUVs: diesel for the Evoque, petrol for the Macan.',
            ],
          ],
        },
        {
          type: 'p',
          text: 'For day trips out of Marrakech with passengers and bags, an SUV gives you a higher seat and more boot space: the whole range is on our [SUV rental](route:suv) page. Yourent rents these cars for road use, not as off-road 4x4s. If your plans include tracks, ask the team which model suits before you book.',
        },
      ],
    },
    {
      h2: 'Prices for a rental car delivered to Marrakech',
      blocks: [
        { type: 'pricing' },
        {
          type: 'p',
          text: "The table gives each model's daily rate for 5 to 10 days, then the rate after 10 days, which is lower on most models unless high season suspends it. Comprehensive insurance with an excess is included on every car. The daily rate does not cover:",
        },
        {
          type: 'list',
          items: [
            'fuel;',
            'motorway tolls, if your route uses the motorway;',
            'a possible delivery surcharge outside Casablanca, confirmed on WhatsApp before you book.',
          ],
        },
        {
          type: 'p',
          text: 'A deposit is also taken at pick-up and returned when the car comes back in good condition. The included mileage is not published, so ask the team if you plan long drives. Rates for the whole fleet are on our [car rental prices](route:tarifs) page.',
        },
      ],
    },
    {
      h2: 'What you need to rent a car in Marrakech with Yourent',
      blocks: [
        {
          type: 'list',
          items: [
            'to be at least 21 years old;',
            'a valid ID: passport or Moroccan CIN;',
            'a driving licence held for more than 2 years (foreign tourists can show an international driving permit);',
            'proof of address;',
            'a deposit at pick-up, by cheque, in cash or by card imprint. The amount depends on the car.',
          ],
        },
        {
          type: 'p',
          text: 'The full rules, including free cancellation up to 24 hours before pick-up, are in our [car rental requirements](route:conditions). Travelling on beyond Marrakech? Our [car rental in Morocco](route:maroc) page lists what to settle before a longer tour.',
        },
      ],
    },
    {
      h2: 'Cars you can request for Marrakech',
      blocks: [{ type: 'vehicles' }],
    },
  ],
  faq: [
    {
      q: 'Does Yourent have a car rental office in Marrakech?',
      a: 'No. Yourent is a Casablanca agency with a single address, N°25 Rue Ibnou Mounir. On request, the car is brought to Marrakech from Casablanca.',
    },
    {
      q: 'Is delivery to Marrakech or Marrakech-Menara airport free?',
      a: 'Free delivery applies in Casablanca and at Mohammed V airport. For Marrakech, the team confirms the conditions and any surcharge on WhatsApp before you book.',
    },
    {
      q: 'Can I pick up a rental car at Marrakech-Menara airport (RAK)?',
      a: 'Yes, on request. Yourent has no desk in the terminal: once delivery is confirmed, a team member meets you with the car at a meeting point sent on WhatsApp. Send your flight number and arrival time with your request.',
    },
    {
      q: 'Can I return the car in Marrakech?',
      a: 'The return place is agreed with the team on WhatsApp before you confirm. Say where you would like to hand the car back when you send your request.',
    },
    {
      q: 'Can I hire a car in Marrakech for a day or a weekend?',
      a: 'No. The minimum rental is 5 days. Rates start at {minPrice} MAD per day and fall after 10 days on most models.',
    },
    {
      q: 'How far ahead should I send my request?',
      a: 'As early as you can: the car comes from Casablanca, and the team has to check that delivery is possible on your dates. You can reach them every day from 8 am to 10 pm.',
    },
  ],
  related: ['marrakech', 'aeroport', 'maroc', 'suv', 'tarifs', 'conditions'],
};

export default page;
