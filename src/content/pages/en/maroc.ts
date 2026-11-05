import type { PageContent } from '../../types';

const page: PageContent = {
  metaTitle: 'Car Rental Morocco from Casablanca, Free Delivery | Yourent',
  metaDescription:
    'Car rental in Morocco from Casablanca: free delivery in the city and at Mohammed V airport, from {minPrice} MAD/day, 5-day minimum. Confirmed on WhatsApp.',
  eyebrow: 'Touring Morocco',
  h1: 'Car rental in Morocco, starting from Casablanca',
  intro:
    'Yourent offers car rental in Morocco from Casablanca: free delivery in the city or at Mohammed V airport, from {minPrice} MAD a day, 5 days minimum. Send your request online, then the team confirms on WhatsApp or by phone. Yourent is a single Casablanca agency, with no branches in other Moroccan cities.',
  breadcrumb: 'Rental in Morocco',
  vehicles: { sort: 'asc' },
  sections: [
    {
      h2: 'Car rental in Morocco: what a Casablanca agency can offer',
      blocks: [
        {
          type: 'p',
          text: 'When you plan to **rent a car in Morocco**, first decide where to collect it. With Yourent, that means Casablanca: we run {vehicleCount} cars and {modelCount} models from N°25 Rue Ibnou Mounir. However, we are not a national chain, and we have no office in Marrakech, Rabat or Agadir.',
        },
        {
          type: 'p',
          text: 'We bring the car to you at no charge: Mohammed V airport, your hotel, or any address in Casablanca, 7 days a week. You can then head for Rabat, drive south or settle in for a long family stay. If you would like the car handed over elsewhere, ask the team on WhatsApp what can be arranged.',
        },
      ],
    },
    {
      h2: 'Why Casablanca works as a starting point',
      blocks: [
        {
          type: 'p',
          text: 'Mohammed V is an international airport at Nouaceur, so you can drive off when you land instead of crossing the city first. Our [car rental Casablanca airport](route:aeroport) page explains how the handover works.',
        },
        {
          type: 'p',
          text: 'The motorway runs north from Casablanca to Rabat and south to Marrakech. The airport is also on the Marrakech route, which saves a detour if you head south straight away.',
        },
        {
          type: 'p',
          text: 'If your flight gets in late, there is no need to set off that evening. Instead, spend the night in Casablanca and have the car brought to your hotel the next day. Our team works from 8 am to 10 pm every day.',
        },
      ],
    },
    {
      h2: 'Which car suits your trip',
      blocks: [
        {
          type: 'p',
          text: 'Every car in the fleet has 5 seats, so compare luggage space, the gearbox and the number of days.',
        },
        {
          type: 'table',
          head: ['Your trip', 'Models to look at', 'Good to know'],
          rows: [
            [
              'Two people, travelling light',
              '[Fiat 500](/catalogue/fiat-500) ({price:fiat-500} MAD/day), [Opel Corsa](/catalogue/opel-corsa) ({price:opel-corsa} MAD/day)',
              'Small petrol cars with a manual gearbox and limited boot space.',
            ],
            [
              'A family with suitcases',
              '[Dacia Duster](/catalogue/dacia-duster) ({price:dacia-duster} MAD/day), [Kia Sorento](/catalogue/kia-sorento) ({price:kia-sorento} MAD/day)',
              'Diesel SUVs. The Duster is manual, the Sorento automatic.',
            ],            [
              'Several weeks',
              '[Dacia Duster](/catalogue/dacia-duster), [Volkswagen Golf 8](/catalogue/volkswagen-golf-8) ({price:volkswagen-golf-8} MAD/day)',
              'Both get a lower daily rate after 10 days.',
            ],
          ],
        },
        {
          type: 'p',
          text: '**A small city car** is plenty for a couple on a budget with one bag each. **An SUV**, on the other hand, makes more sense for three or four people with real suitcases. Our [SUV rental in Casablanca](route:suv) page covers the range, from the Duster up to the Volkswagen Touareg ({price:volkswagen-touareg} MAD/day).',
        },
        {
          type: 'p',
          text: '**A long-term rental** fits a tour of several weeks or a summer back home, because the daily rate drops after 10 days on most models. High season can suspend this reduction, so check with the team. For a stay counted in months, see our [long-term car rental](route:longue-duree) page.',
        },
      ],
    },
    {
      h2: 'Car rental Morocco: what to sort out before you rent',
      blocks: [
        {
          type: 'list',
          items: [
            '**Where the trip ends.** If you would like to finish somewhere other than Casablanca, ask before you book. The team will tell you on WhatsApp what is possible. Until you hear back, plan your route as a loop.',
            '**Mileage.** Distances add up quickly on a tour, and the included mileage is not published here, so ask the team on WhatsApp.',
            "**Paperwork.** Drivers must be at least 21, with a valid CIN or passport, a licence held over 2 years and proof of address. An international driving permit works for foreign tourists.",
            "**The deposit.** It is taken at pick-up by cheque, cash or card imprint, and the amount depends on the car. You get it back when the car returns in good condition. Everything else is in our [car rental requirements](route:conditions).",
            '**Insurance.** All cars have comprehensive cover with an excess. Ask what the excess is on the model you choose.',
            '**Breakdowns.** A replacement car is sent as quickly as possible. However, if you are going far from Casablanca, ask the team how that would work.',
          ],
        },
      ],
    },
    {
      h2: 'Booking from abroad',
      blocks: [
        {
          type: 'list',
          ordered: true,
          items: [
            'Enter your dates in the [car catalogue](/catalogue), and cars that are already taken drop off the list.',
            "Send your request and say where you want the car: airport, hotel or an address in Casablanca. Add your route if you already have one.",
            'The team gets back to you on WhatsApp or by phone with the total and the deposit. Nothing is charged online, because you settle up with them directly.',
          ],
        },
        {
          type: 'p',
          text: 'Plans changed? Changing or cancelling costs nothing up to 24 hours before pick-up. Closer to the date, fees may apply.',
        },
      ],
    },
    {
      h2: 'What the car will cost for your trip',
      blocks: [
        { type: 'pricing' },
        {
          type: 'p',
          text: "The table shows each model's daily rate, followed by the rate that applies after 10 days. Also budget for fuel and motorway tolls. The full breakdown is on our [car rental prices in Casablanca](route:tarifs) page.",
        },
      ],
    },
    {
      h2: 'Cars you can collect in Casablanca',
      blocks: [{ type: 'vehicles' }],
    },
  ],
  faq: [
    {
      q: 'Does Yourent have branches in other Moroccan cities?',
      a: "No. Yourent is a Casablanca agency, so you collect the car in Casablanca or at Mohammed V airport.",
    },
    {
      q: 'Can I drop the car off in Marrakech, Agadir or another city?',
      a: 'One-way rentals are not described on the site. Name the city you would like to finish in when you send your request, and the team will answer on WhatsApp.',
    },
    {
      q: 'Where do I pick up the car, and do you charge for delivery?',
      a: "At Mohammed V airport, at your hotel or at another address in Casablanca. All three are free: you only pay for the rental itself.",
    },
    {
      q: 'How much does car rental in Morocco cost with Yourent?',
      a: 'Car rental in Morocco with Yourent starts from {minPrice} MAD per day, with a 5-day minimum. The daily rate falls after 10 days on most models.',
    },
    {
      q: 'Can I rent with a foreign driving licence?',
      a: "Yes, as long as you have held it for more than 2 years. Foreign tourists can also show an international driving permit. Bring your passport and proof of address.",
    },
  ],
  related: ['aeroport', 'longue-duree', 'suv', 'tarifs', 'conditions'],
};

export default page;
