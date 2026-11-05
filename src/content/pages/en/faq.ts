import type { PageContent } from '../../types';

const page: PageContent = {
  metaTitle: 'Car Rental Casablanca FAQ | Yourent',
  metaDescription:
    'Car rental Casablanca FAQ: prices from {fleetMin} MAD, deposit, documents, foreign licence, delivery, insurance and cancellation. Answers from the Yourent team.',
  eyebrow: 'FAQ',
  h1: 'Car Rental in Casablanca: FAQ',
  intro:
    'This FAQ answers the questions people ask most about renting a car from Yourent in Casablanca: prices from {fleetMin} MAD per day, deposit, documents, delivery to Mohammed V airport, insurance and cancellation. If your question is not here, the team answers on WhatsApp from 8 am to 10 pm, 7 days a week.',
  breadcrumb: 'FAQ',
  sections: [
    {
      h2: 'Going further',
      blocks: [
        {
          type: 'list',
          items: [
            'Prices model by model: [car rental prices](route:tarifs).',
            'The detailed rules and the summary table: [rental requirements](route:conditions).',
            'Delivery when you arrive: [car rental at Mohammed V airport](route:aeroport).',
            'To reach the team: [contact](route:contact).',
          ],
        },
      ],
    },
  ],
  faq: [
    {
      q: 'How much does a car rental in Casablanca cost?',
      a: 'At Yourent, prices start at {fleetMin} MAD per day depending on the model. After 10 days, a lower rate applies automatically. The details are on the [prices](route:tarifs) page.',
    },
    {
      q: 'What is the minimum rental period?',
      a: 'The minimum rental is 5 days. There is no daily or weekend option.',
    },
    {
      q: 'Which documents do I need to rent?',
      a: 'You need a valid ID (CIN or passport), a driving licence held for more than 2 years and proof of address.',
    },
    {
      q: 'Is a foreign driving licence accepted?',
      a: 'For foreign tourists, the international driving permit is accepted. In other cases, ask the team to confirm before you book.',
    },
    {
      q: 'What is the minimum age to rent?',
      a: 'The minimum age is not shown on the site. The team gives it on WhatsApp before you book.',
    },
    {
      q: 'Do I have to pay a deposit?',
      a: 'Yes, a deposit is taken at pick-up. It is returned once the car is back in good condition.',
    },
    {
      q: 'How is the deposit paid?',
      a: 'By cheque, in cash or by card imprint. The amount depends on the car and appears in the [prices](route:tarifs) list.',
    },
    {
      q: 'Is delivery free?',
      a: 'Yes, anywhere in Casablanca and at Mohammed V airport, 7 days a week. For another city, the team gives the terms on WhatsApp.',
    },
    {
      q: 'Can I pick up the car at Mohammed V airport?',
      a: 'Yourent delivers the car to the airport; there is no desk on site. The exact meeting place is confirmed with the team before you arrive. See [car rental at the airport](route:aeroport).',
    },
    {
      q: 'Are the cars insured?',
      a: 'Yes, every car has comprehensive insurance with an excess. The team gives the excess amount before you book.',
    },
    {
      q: 'What should I do if the car breaks down?',
      a: 'Tell the team: a replacement car is sent as soon as possible.',
    },
    {
      q: 'What should I do after an accident?',
      a: 'Tell the team, who will help you with the paperwork.',
    },
    {
      q: 'Can I cancel or change a booking?',
      a: 'Yes, free of charge up to 24 hours before pick-up. After that, fees may apply.',
    },
    {
      q: 'How do I book a car?',
      a: 'Choose a car in the [catalogue](/catalogue), enter your dates and send the request. The team confirms on WhatsApp or by phone. You can also write to them directly on WhatsApp.',
    },
    {
      q: 'Can I pay online?',
      a: 'No. The online booking is a booking request, and you pay the team afterwards.',
    },
    {
      q: 'Is mileage unlimited?',
      a: 'Included mileage is not shown on the site. The team gives it on WhatsApp before you book.',
    },
    {
      q: 'Can I return the car in another city?',
      a: 'This is confirmed with the team before you book; no rule is shown on the site.',
    },
    {
      q: 'What are the agency opening hours?',
      a: 'The agency is open from 8 am to 10 pm, 7 days a week. It is at N°25 Rue Ibnou Mounir in Casablanca.',
    },
  ],
  related: ['tarifs', 'conditions', 'aeroport', 'contact'],
};

export default page;
