import type { PageContent } from '../../types';

const page: PageContent = {
  metaTitle: 'Car Rental Morocco, Starting from Casablanca | Yourent',
  metaDescription:
    'Car rental Morocco from Casablanca: free delivery in the city and at Mohammed V airport, from {minPrice} MAD/day, 5-day minimum. Confirmed on WhatsApp.',
  eyebrow: 'Touring Morocco',
  h1: 'Car Rental in Morocco, Starting from Casablanca',
  intro:
    "For car rental in Morocco, Yourent hands you the car in Casablanca or at Mohammed V airport with free delivery, from {minPrice} MAD per day and for at least 5 days. Send a request online, the team confirms on WhatsApp or by phone, and your trip starts from Casablanca. Yourent is a single Casablanca agency, with no branches in other Moroccan cities.",
  breadcrumb: 'Rental in Morocco',
  vehicles: { sort: 'asc' },
  sections: [
    {
      h2: 'Car rental Morocco: what a Casablanca agency can offer',
      blocks: [
        {
          type: 'p',
          text: "When you plan to **rent a car in Morocco**, the first thing to pin down is where you collect it. With Yourent, that means Casablanca. We run {vehicleCount} cars across {modelCount} models from N°25 Rue Ibnou Mounir. We are not a national chain, and we have no office in Marrakech, Rabat or Agadir.",
        },
        {
          type: 'p',
          text: "We bring the car to you at no charge: Mohammed V airport, your hotel, or any address in Casablanca, 7 days a week. From there you can head for Rabat, drive south or settle in for a long family stay. If you would like the car handed over somewhere else, ask the team on WhatsApp what can be arranged.",
        },
      ],
    },
    {
      h2: 'Why Casablanca works as a starting point',
      blocks: [
        {
          type: 'p',
          text: "Start with the flight. Mohammed V is an international airport at Nouaceur, so you can get behind the wheel the moment you land instead of crossing the city first. Our [Casablanca airport car rental](route:aeroport) page explains how the handover works.",
        },
        {
          type: 'p',
          text: "Then there is the motorway. It runs north from Casablanca to Rabat and south to Marrakech, and the airport already sits on the Marrakech route, which saves you a detour if you are heading south straight away.",
        },
        {
          type: 'p',
          text: "If your flight gets in late, there is no need to set off that evening: spend the night in Casablanca and have the car brought to your hotel. The agency is open from 8 am to 10 pm every day.",
        },
      ],
    },
    {
      h2: 'Which car suits your trip',
      blocks: [
        {
          type: 'p',
          text: "Every car in the fleet has 5 seats, so look instead at your luggage, the gearbox and the number of days.",
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
          text: "**A small city car** is plenty for a couple on a budget with one bag each. **An SUV** starts to make sense once there are three or four of you and real suitcases. Our [SUV rental](route:suv) page covers the range, from the Duster up to the Volkswagen Touareg ({price:volkswagen-touareg} MAD/day).",
        },
        {
          type: 'p',
          text: "**A long-term rental** fits a tour of several weeks or a summer back home. After 10 days, the daily rate drops automatically on most models. If you are counting in months, see our [long-term car rental](route:longue-duree) page.",
        },
      ],
    },
    {
      h2: 'What to sort out before you rent a car in Morocco',
      blocks: [
        {
          type: 'list',
          items: [
            "**Where the trip ends.** If you would like to finish somewhere other than Casablanca, ask before you book. The team will tell you on WhatsApp what is possible. Until you hear back, plan your route as a loop.",
            "**Mileage.** Distances add up quickly on a tour. The mileage included isn't published on the site, so ask the team on WhatsApp.",
            "**Paperwork.** You need a valid ID (CIN or passport), a driving licence held for more than 2 years and proof of address. Foreign tourists can show an international driving permit.",
            "**The deposit.** It is taken at pick-up by cheque, cash or card imprint, and the amount depends on the car. You get it back when the car returns in good condition. Everything else is in our [rental requirements](route:conditions).",
            "**Insurance.** All cars have comprehensive cover with an excess. Ask what the excess is on the model you choose.",
            "**Breakdowns.** A replacement car is sent as quickly as possible. If you are going far from Casablanca, ask the team how that would work.",
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
            "Enter your dates in the [catalogue](/catalogue). Cars that are already taken drop off the list.",
            "Send your request and say where you want the car: airport, hotel or an address in Casablanca. Add your route if you already have one.",
            "The team gets back to you on WhatsApp or by phone with the total and the deposit. Nothing is charged online; you settle up with them directly.",
          ],
        },
        {
          type: 'p',
          text: "Plans changed? Changing or cancelling costs nothing up to 24 hours before pick-up. Closer to the date, fees may apply.",
        },
      ],
    },
    {
      h2: 'What the car will cost for your trip',
      blocks: [
        { type: 'pricing' },
        {
          type: 'p',
          text: "The table shows each model's daily rate, followed by the rate that applies after 10 days. Remember to budget for fuel and motorway tolls too. The full breakdown is on our [prices](route:tarifs) page.",
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
      a: "No. Yourent is a Casablanca agency. You collect the car in Casablanca or at Mohammed V airport.",
    },
    {
      q: 'Can I drop the car off in Marrakech, Agadir or another city?',
      a: "One-way rentals aren't described on the site. Name the city you would like to finish in when you send your request, and the team will answer on WhatsApp before you commit.",
    },
    {
      q: 'Where do I pick up the car, and do you charge for delivery?',
      a: "At Mohammed V airport, at your hotel or at another address in Casablanca. All three are free: you only pay for the rental itself.",
    },
    {
      q: 'How much does car rental in Morocco cost with Yourent?',
      a: "From {minPrice} MAD per day, with a 5-day minimum. The daily rate falls after 10 days on most models.",
    },
    {
      q: 'Can I rent with a foreign driving licence?',
      a: "Yes, as long as you have held it for more than 2 years. Foreign tourists can also show an international driving permit. Bring your passport and proof of address.",
    },
  ],
  related: ['aeroport', 'longue-duree', 'suv', 'tarifs', 'conditions'],
};

export default page;
