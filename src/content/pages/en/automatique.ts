import type { PageContent } from '../../types';

const page: PageContent = {
  metaTitle: 'Automatic Car Rental Casablanca, Free Delivery | Yourent',
  metaDescription:
    'Automatic car rental in Casablanca from {minPrice} MAD/day: Fiat 500 Cabriolet, Corolla, Golf 8, SUVs, premium cars. Free airport delivery, 5-day minimum.',
  eyebrow: 'Automatic gearbox',
  h1: 'Automatic car rental in Casablanca',
  intro:
    'Yourent offers automatic car rental in Casablanca from {minPrice} MAD per day, from the Fiat 500 Cabriolet to the Range Rover Sport. Most models come with an automatic gearbox. Choose the car and your dates online, then the team confirms on WhatsApp. Delivery is free in Casablanca and at the airport.',
  breadcrumb: 'Automatic car',
  vehicles: { boite: 'automatique', sort: 'asc' },
  sections: [
    {
      h2: 'Automatic car rental in Casablanca: which models to rent',
      blocks: [
        {
          type: 'p',
          text: 'Casablanca traffic is dense: lights, jams, constant stopping and starting. As a result, an **automatic car** makes driving calmer, especially if you do not know the city or you arrive after a long flight.',
        },
        {
          type: 'list',
          items: [
            '**Small car**: the [Fiat 500 Cabriolet](/catalogue/fiat-500-cabriolet), the only small automatic in the fleet, from {minPrice} MAD per day.',
            '**Saloons**: the [Toyota Corolla](/catalogue/toyota-corolla) (hybrid), the [Audi A3](/catalogue/audi-a3) and the [Volkswagen Golf 8](/catalogue/volkswagen-golf-8).',
            '**SUVs**: T-Roc, Sorento, Tiguan, Touareg, Q3. See the [SUV rental in Casablanca](route:suv) page.',
            '**Premium**: Mercedes CLA, C 220 and E 220, Range Rover Evoque and Sport, Porsche Macan. See the [luxury car rental](route:luxe) page.',
          ],
        },
      ],
    },
    {
      h2: 'Automatic or manual: which models come with both gearboxes',
      blocks: [
        {
          type: 'p',
          text: 'Not every model is offered with both gearboxes. The [Volkswagen Golf 8](/catalogue/volkswagen-golf-8) and the [Audi Q3](/catalogue/audi-q3) come in automatic and manual, so name the automatic in your request; the choice is confirmed when you book.',
        },
        {
          type: 'p',
          text: 'The Dacia Duster, the Fiat 500 and the Opel Corsa are manual only, so avoid those three if you need an automatic. The Fiat 500 Cabriolet, however, is automatic.',
        },
      ],
    },
    {
      h2: 'Automatic car rental prices',
      blocks: [
        {
          type: 'p',
          text: 'Rates are per day. The "5 to 10 days" column gives the standard rate, and the "Over 10 days" column the rate from day 11, lower on most models. The deposit is shown in the table when it is set; otherwise the team gives it at confirmation.',
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
            'Drivers who spend most of their time in city traffic.',
            'Anyone on a road trip of several days who wants a less tiring drive.',
            'People who drive rarely: an automatic reduces the risk of stalling on a hill or at a light.',
          ],
        },
        {
          type: 'p',
          text: 'At the handover, ask the team how the car you chose works, for example its drive modes and parking brake. If you arrive by plane, delivery to [Mohammed V airport](route:aeroport) also saves you from looking for an agency.',
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
            'The team then confirms by WhatsApp or phone, with the deposit and the documents: ID (CIN or passport), a licence over 2 years old, proof of address.',
            'The car is delivered to the address you chose, free of charge in Casablanca.',
          ],
        },
        {
          type: 'p',
          text: 'Changing or cancelling your automatic costs nothing up to 24 hours before pick-up. The [car rental requirements](route:conditions) cover the rest.',
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
      a: 'The Fiat 500 Cabriolet, from {minPrice} MAD per day. It is automatic and runs on petrol, but it remains a small car.',
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
