import type { PageContent } from '../../types';

const page: PageContent = {
  metaTitle: 'Luxury Car Rental Casablanca Airport, Delivered | Yourent',
  metaDescription:
    'Luxury car rental at Casablanca airport: Mercedes, Range Rover or Porsche Macan from {minPrice} MAD/day, handed over at Mohammed V (CMN), free delivery.',
  eyebrow: 'Luxury · Mohammed V airport',
  h1: 'Luxury car rental at Casablanca airport (Mohammed V)',
  intro:
    'Yourent hands you a luxury car when you land at Casablanca Mohammed V airport (CMN): a Mercedes, a Range Rover, a Porsche Macan or a Volkswagen Touareg, from {minPrice} to {maxPrice} MAD per day, with no delivery charge. The agency has no desk in the terminal: a team member waits for you with the car at the meeting point sent on WhatsApp. The minimum rental is 5 days.',
  breadcrumb: 'Luxury car at the airport',
  vehicles: {
    models: [
      'range-rover-sport',
      'porsche-macan',
      'mercedes-e-220',
      'mercedes-c-220',
      'mercedes-cla',
      'range-rover-evoque',
      'volkswagen-touareg',
    ],
    sort: 'desc',
  },
  sections: [
    {
      h2: 'Luxury car hire at Mohammed V airport: the essentials',
      blocks: [
        {
          type: 'table',
          head: ['Your question', 'The short answer'],
          rows: [
            ['Which models?', 'Mercedes CLA, C 220 and E 220, Range Rover Evoque and Sport, Porsche Macan, Volkswagen Touareg.'],
            ['Is delivery charged?', 'No. It is free at Mohammed V airport, as it is anywhere in Casablanca.'],
            ['Is there a rental desk?', 'No. The car is handed to you at the agreed meeting point, with no queue.'],
            ['At what times?', 'The team works from 8 am to 10 pm, every day. Outside those hours, ask before you book.'],
            ['What deposit?', 'The amount depends on the model. It is confirmed before your flight, so you have it with you when you land.'],
            ['For how long?', '5 days minimum, with no one-day or weekend option.'],
          ],
        },
      ],
    },
    {
      h2: 'Which premium car for which arrival',
      blocks: [
        {
          type: 'p',
          text: 'All seven models have 5 seats and an automatic gearbox. So it is the number of passengers, the luggage and the reason for the trip that decide.',
        },
        {
          type: 'list',
          items: [
            '**A business trip, alone or as a pair**: a Mercedes saloon, the [CLA](/catalogue/mercedes-cla) or the [C 220](/catalogue/mercedes-c-220), understated and easy to park outside a hotel or a head office.',
            '**Arriving as a group, with suitcases**: the [E 220](/catalogue/mercedes-e-220) is the largest of the three Mercedes. The [Volkswagen Touareg](/catalogue/volkswagen-touareg) and the [Range Rover Sport](/catalogue/range-rover-sport) are the largest SUVs in the selection.',
            '**A stay for two, for the pleasure of it**: the [Porsche Macan](/catalogue/porsche-macan) or the [Range Rover Evoque](/catalogue/range-rover-evoque), two compact SUVs.',
          ],
        },
        {
          type: 'p',
          text: 'Give the number of passengers and suitcases in your request, and the team points you to the right model. The SUVs are compared on the [luxury SUV rental in Casablanca](route:suv-luxe) page, and the three Mercedes on the [Mercedes rental in Casablanca](route:mercedes) page.',
        },
      ],
    },
    {
      h2: 'How the handover of a prestige car works when you land',
      blocks: [
        {
          type: 'list',
          ordered: true,
          items: [
            '**Before the flight.** Choose the model and your dates in the [car catalogue](/catalogue), then send the request. Say that the handover is at Mohammed V airport and give your flight number and arrival time.',
            '**Confirmation.** The team replies on WhatsApp or by phone with the car, the amount, the deposit and the documents to bring. You pay nothing online.',
            '**When you land.** Collect your luggage, then go to the meeting point you received on WhatsApp. A team member is waiting there with the car.',
            '**The check.** Walk around the car together: bodywork, wheels, interior, fuel level. On a car at this price, those few minutes matter.',
            '**Departure.** Show your documents, leave the deposit and drive off.',
          ],
        },
        {
          type: 'p',
          text: 'If your flight changes, tell the team on WhatsApp. Changing or cancelling is free up to 24 hours before pick-up; after that, fees may apply.',
        },
      ],
    },
    {
      h2: 'The deposit: sort it out before you fly',
      blocks: [
        {
          type: 'p',
          text: 'On a premium car, the deposit is higher than on a city car. You leave it at the handover, by cheque, in cash or by card imprint, and it comes back to you when the car is returned in good condition. The price table below shows the amount when one is listed.',
        },
        {
          type: 'p',
          text: 'If you are flying in from abroad, ask the team before you leave which way of leaving the deposit suits your situation, so that you are not looking for a solution in the arrivals hall. Our [car rental in Casablanca from Europe](route:europe) page covers the deposit, the licence and the currency for visitors.',
        },
      ],
    },
    {
      h2: 'Prices of luxury cars delivered to Casablanca airport',
      blocks: [
        { type: 'pricing' },
        {
          type: 'p',
          text: 'Airport delivery adds nothing to these rates: you pay for the rental only. After 10 days, the daily rate drops on most models, and the "Over 10 days" column gives the figure. Every car is covered by comprehensive insurance with an excess.',
        },
      ],
    },
    {
      h2: 'Late flight, delay, returning the car at the airport',
      blocks: [
        {
          type: 'p',
          text: 'The team can be reached from 8 am to 10 pm, every day. If your plane lands late in the evening or early in the morning, ask before you book: they tell you what is possible, including the meeting point.',
        },
        {
          type: 'p',
          text: 'For the end of the rental, the return place is agreed with the team at confirmation. Say in your request if you are flying out, and give your departure time.',
        },
      ],
    },
    {
      h2: 'From the airport to your hotel, Rabat or Marrakech',
      blocks: [
        {
          type: 'p',
          text: 'Mohammed V airport is linked by motorway to Casablanca, Rabat and Marrakech. If you are heading south as soon as you land, the [Casablanca to Marrakech car rental](route:marrakech) page describes the drive. Would you rather rest first? The car can also be delivered to your Casablanca hotel the next day, free of charge.',
        },
        {
          type: 'p',
          text: 'For the other categories, from city cars to family SUVs, see the [car rental at Casablanca airport](route:aeroport) page. The whole prestige range is on the [luxury car rental in Casablanca](route:luxe) page.',
        },
      ],
    },
    {
      h2: 'Luxury cars to book for your arrival',
      blocks: [{ type: 'vehicles' }],
    },
  ],
  faq: [
    {
      q: 'Can I collect a Mercedes or a Range Rover at Mohammed V airport itself?',
      a: 'Yes. Yourent has no desk in the terminal: the car is handed to you when you arrive, at the meeting point sent on WhatsApp. Give your flight number in the request.',
    },
    {
      q: 'Is delivery of a luxury car to the airport charged?',
      a: 'No. Delivery is free at Mohammed V airport and anywhere in Casablanca, whichever model you choose.',
    },
    {
      q: 'What deposit should I have ready when I land?',
      a: 'It depends on the car. The team confirms the amount before your flight; you leave it at the handover, by cheque, in cash or by card imprint.',
    },
    {
      q: 'What happens if my flight is delayed?',
      a: 'Tell the team on WhatsApp as soon as you know the new time. For an arrival outside 8 am to 10 pm, they tell you what is possible.',
    },
    {
      q: 'Can I return the car at the airport at the end of my stay?',
      a: 'The return place is agreed with the team at confirmation. Mention it in your request.',
    },
    {
      q: 'Can I hire a luxury car for just two or three days?',
      a: 'No. The minimum rental is 5 days, on every model.',
    },
  ],
  related: ['luxe', 'aeroport', 'suv-luxe', 'mercedes', 'range-rover', 'porsche'],
};

export default page;
