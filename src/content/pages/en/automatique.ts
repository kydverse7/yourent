import type { PageContent } from '../../types';

const page: PageContent = {
  metaTitle: 'Automatic Car Rental Casablanca | Yourent',
  metaDescription:
    'Automatic car rental Casablanca from {minPrice} MAD/day: Fiat 500 Cabriolet, Corolla, Golf 8, SUVs, premium cars. Free delivery, insurance included.',
  eyebrow: 'Automatic gearbox',
  h1: 'Automatic Car Rental in Casablanca',
  intro:
    'Yourent rents automatic cars in Casablanca from {minPrice} MAD per day, from the Fiat 500 Cabriolet to the Range Rover Sport. Most of the fleet is available with an automatic gearbox. You choose the car and your dates online, the team confirms on WhatsApp, and delivery is free in Casablanca and at the airport.',
  breadcrumb: 'Automatic car',
  vehicles: { boite: 'automatique', sort: 'asc' },
  sections: [
    {
      h2: 'Which automatic cars to rent in Casablanca',
      blocks: [
        {
          type: 'p',
          text: 'Casablanca traffic is dense: lights, jams, constant stopping and starting. An **automatic car** removes the clutch and makes driving calmer, especially if you do not know the city or you arrive after a long flight.',
        },
        {
          type: 'list',
          items: [
            '**Small car**: the [Fiat 500 Cabriolet](/catalogue/fiat-500-cabriolet), the only small automatic in the fleet, from {minPrice} MAD per day.',
            '**Saloons**: the [Toyota Corolla](/catalogue/toyota-corolla) (hybrid), the [Audi A3](/catalogue/audi-a3) and the [Volkswagen Golf 8](/catalogue/volkswagen-golf-8).',
            '**SUVs**: T-Roc, Sorento, Tiguan, Touareg, Q3. See the [SUV rental](route:suv) page.',
            '**Premium**: Mercedes CLA, C 220 and E 220, Range Rover Evoque and Sport, Porsche Macan. See the [luxury car](route:luxe) page.',
          ],
        },
      ],
    },
    {
      h2: 'Automatic or manual: which models come with both gearboxes',
      blocks: [
        {
          type: 'p',
          text: 'Not every model is offered with both gearboxes. The [Volkswagen Golf 8](/catalogue/volkswagen-golf-8) and the [Audi Q3](/catalogue/audi-q3) come in automatic and manual: if you want the automatic, say so in your request and the choice is confirmed when you book.',
        },
        {
          type: 'p',
          text: 'On the other hand, the Dacia Duster, the Fiat 500 and the Opel Corsa are manual only. If you need an automatic, do not book one of those three. For the Fiat 500, the Cabriolet version is automatic.',
        },
      ],
    },
    {
      h2: 'Automatic car rental prices',
      blocks: [
        {
          type: 'p',
          text: 'Rates are per day. The "5 to 10 days" column gives the standard rate, and the "Over 10 days" column the rate that applies automatically from day 11, lower on most models. The deposit is shown in the table when it is set; otherwise the team gives it at confirmation.',
        },
        { type: 'pricing' },
      ],
    },
    {
      h2: 'Who benefits most from an automatic',
      blocks: [
        {
          type: 'list',
          items: [
            'Tourists and Moroccans living abroad who are used to automatics and do not want to adapt to a clutch on arrival.',
            'Drivers who mostly stick to the city and the motorway between Casablanca and Rabat.',
            'Anyone on a road trip of several days: you arrive less tired.',
            'People who drive rarely: an automatic reduces the risk of stalling on a hill or at a light.',
          ],
        },
        {
          type: 'p',
          text: 'At the handover, ask the team how the car you chose works (drive modes, parking brake). If you arrive by plane, delivery to [Mohammed V airport](route:aeroport) also saves you from looking for an agency.',
        },
      ],
    },
    {
      h2: 'Book an automatic car',
      blocks: [
        {
          type: 'list',
          ordered: true,
          items: [
            'Pick the model from the list below and your dates in the catalogue.',
            'Write "automatic gearbox" in your request if the model also comes in manual.',
            'The team confirms by WhatsApp or phone, with the deposit and the documents to show: ID (CIN or passport), a licence held for more than 2 years, proof of address.',
            'The car is delivered to the address you chose, free of charge in Casablanca.',
          ],
        },
        {
          type: 'p',
          text: 'You can change or cancel free of charge up to 24 hours before pick-up. The [rental requirements](route:conditions) cover the rest.',
        },
      ],
    },
    {
      h2: 'Automatic cars available',
      blocks: [{ type: 'vehicles' }],
    },
  ],
  faq: [
    {
      q: 'What is the cheapest automatic car in Casablanca?',
      a: 'The Fiat 500 Cabriolet, from {minPrice} MAD per day. It is automatic and runs on petrol.',
    },
    {
      q: 'Are the Golf 8 and the Audi Q3 automatic?',
      a: 'Both models come in automatic and manual. Ask for the automatic in your request: the team confirms the gearbox when you book.',
    },
    {
      q: 'Does the Dacia Duster come in automatic?',
      a: 'No. The Yourent Dacia Duster is manual only, like the Fiat 500 (except the Cabriolet) and the Opel Corsa.',
    },
    {
      q: 'Does an automatic car cost more?',
      a: 'At Yourent, the price depends on the model, as shown in the table above. The smallest automatic starts at {minPrice} MAD per day, and the top-end cars go up to {maxPrice} MAD.',
    },
    {
      q: 'Can I get an automatic car delivered to the airport?',
      a: 'Yes, delivery to Mohammed V airport is free, as it is anywhere in Casablanca. The team gives the meeting point on WhatsApp.',
    },
  ],
  related: ['suv', 'luxe', 'aeroport', 'tarifs', 'conditions'],
};

export default page;
