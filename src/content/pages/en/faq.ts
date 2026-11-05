import type { PageContent } from '../../types';

const page: PageContent = {
  metaTitle: 'Car Rental Casablanca FAQ | Yourent',
  metaDescription:
    'Car rental in Casablanca FAQ: prices from {fleetMin} MAD, age 21 minimum, deposit, documents, free airport delivery, insurance. Answers from the Yourent team.',
  eyebrow: 'FAQ',
  h1: 'Car rental in Casablanca: FAQ',
  intro:
    'This FAQ on car rental in Casablanca answers the questions people ask most at Yourent: prices from {fleetMin} MAD per day, deposit, documents, airport delivery, insurance and cancellation. If your question is not here, the team answers on WhatsApp from 8 am to 10 pm, 7 days a week.',
  breadcrumb: 'FAQ',
  sections: [
    {
      h2: 'Car rental in Casablanca: more information',
      blocks: [
        {
          type: 'list',
          items: [
            'Prices model by model: [car rental prices](route:tarifs).',
            'The detailed rules and the summary table: [car rental requirements](route:conditions).',
            'Delivery when you arrive: [car rental at Mohammed V airport](route:aeroport).',
            'To reach the team: [Yourent contact](route:contact).',
          ],
        },
      ],
    },
  ],
  faq: [
    {
      q: 'How much does a car rental in Casablanca cost?',
      a: 'At Yourent, prices start at {fleetMin} MAD per day depending on the model. After 10 days, the rate falls by itself on most models. The details are on the [car rental prices in Casablanca](route:tarifs) page.',
    },
    {
      q: 'What is the minimum rental period?',
      a: 'Five days, so there is no daily or weekend option.',
    },
    {
      q: 'Which documents do I need to rent?',
      a: 'You need a valid CIN or passport, a licence you have held for over 2 years and proof of address, and you must be at least 21.',
    },
    {
      q: 'Is a foreign driving licence accepted?',
      a: 'Foreign tourists may present an international driving permit. In other cases, however, ask the team to confirm before you book.',
    },
    {
      q: 'What is the minimum age to rent?',
      a: 'You must be at least 21 years old to rent a car from Yourent. Your licence must be more than 2 years old.',
    },
    {
      q: 'Do I have to pay a deposit?',
      a: 'Yes, you leave one at pick-up, then recover it if the car comes back in good condition.',
    },
    {
      q: 'How is the deposit paid?',
      a: 'By cheque, in cash or by card imprint. The amount depends on the car, so the [car rental prices in Casablanca](route:tarifs) list gives a minimum and the team confirms the exact sum.',
    },
    {
      q: 'Is delivery free?',
      a: 'Yes, anywhere in Casablanca and at Mohammed V airport, 7 days a week. Delivery elsewhere depends on the terms the team gives you on WhatsApp.',
    },
    {
      q: 'Can I pick up the car at Mohammed V airport?',
      a: 'Yourent delivers the car to the airport, but there is no desk on site. The exact meeting place is therefore confirmed with the team before you arrive, as [car rental Casablanca airport](route:aeroport) explains.',
    },
    {
      q: 'Are the cars insured?',
      a: 'Yes, with comprehensive insurance and an excess. The team gives you the amount of that excess before you book.',
    },
    {
      q: 'What should I do if the car breaks down?',
      a: 'Tell the team, and a replacement car comes to you as quickly as possible.',
    },
    {
      q: 'What should I do after an accident?',
      a: 'Call the team, who will help you with the paperwork.',
    },
    {
      q: 'Can I cancel or change a booking?',
      a: 'Yes, free of charge up to 24 hours before pick-up. Later than that, however, fees may apply.',
    },
    {
      q: 'How do I book a car?',
      a: 'Choose a car in the [car catalogue](/catalogue), enter your dates and send the request. The team confirms on WhatsApp or by phone. You can also write to them directly on WhatsApp.',
    },
    {
      q: 'Can I pay online?',
      a: 'No. The online booking is only a request, so you pay the team afterwards.',
    },
    {
      q: 'Is mileage unlimited?',
      a: 'The site does not state the included mileage. The team gives it on WhatsApp before you book.',
    },
    {
      q: 'Can I return the car in another city?',
      a: 'Ask the team before you book, because the site does not set a rule on this.',
    },
    {
      q: 'What are the agency opening hours?',
      a: 'The agency opens at 8 am and closes at 10 pm, all week, at N°25 Rue Ibnou Mounir in Casablanca.',
    },
  ],
  related: ['tarifs', 'conditions', 'aeroport', 'contact'],
};

export default page;
