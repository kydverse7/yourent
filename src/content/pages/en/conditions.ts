import type { PageContent } from '../../types';

const page: PageContent = {
  metaTitle: 'Car Rental Requirements Casablanca | Yourent',
  metaDescription:
    'Car rental requirements in Casablanca: ID, licence held over 2 years, proof of address, deposit, insurance, free cancellation up to 24 hours before.',
  eyebrow: 'Requirements',
  h1: 'Car Rental Requirements in Casablanca',
  intro:
    'To rent a car from Yourent in Casablanca, you need a valid ID, a driving licence held for more than 2 years, proof of address and a deposit at pick-up. The minimum rental is 5 days and every car has comprehensive insurance with an excess. This page sums up the agency rules; it does not replace the contract you receive at pick-up.',
  breadcrumb: 'Rental requirements',
  sections: [
    {
      h2: 'Documents to show when renting a car',
      blocks: [
        {
          type: 'list',
          items: [
            'A valid ID: Moroccan CIN or passport.',
            'A driving licence held for more than 2 years.',
            'Proof of address.',
          ],
        },
        {
          type: 'p',
          text: 'An international driving permit is accepted for foreign tourists. If your licence was issued abroad and you have no international permit, ask the team to confirm before you book. The minimum driver age is not shown on the site: the team gives it before you book.',
        },
      ],
    },
    {
      h2: 'Deposit: amount, payment methods and return',
      blocks: [
        {
          type: 'p',
          text: 'A deposit is taken when the car is handed over. It can be paid by cheque, in cash or by card imprint. The amount depends on the car you rent: the [prices](route:tarifs) page gives the minimum for each model, and the team confirms the exact sum. It is returned once the car is back in good condition. The team tells you before you book how long the deposit takes to come back.',
        },
      ],
    },
    {
      h2: 'Rental period, mileage and returning the car',
      blocks: [
        {
          type: 'p',
          text: 'The minimum rental is 5 days. After 10 days, a lower rate applies automatically on most models. Included mileage and whether you can return the car in another city are not shown on the site: the team gives them on WhatsApp before you book. Delivery takes place at your hotel, at Mohammed V airport or at the address you choose, from 8 am to 10 pm, 7 days a week. The place where the car is collected at the end of the rental is agreed with the team.',
        },
      ],
    },
    {
      h2: 'Insurance, breakdown and accident',
      blocks: [
        {
          type: 'list',
          items: [
            '**Insurance**: every car has comprehensive insurance with an excess. The team gives the excess amount before you book.',
            '**Breakdown**: a replacement car is sent as soon as possible.',
            '**Accident**: the team helps the customer with the paperwork.',
          ],
        },
      ],
    },
    {
      h2: 'Changing or cancelling a booking',
      blocks: [
        {
          type: 'p',
          text: 'A booking can be changed or cancelled free of charge up to 24 hours before pick-up. After that, fees may apply, and the team tells you when you make the request. The online booking is a request: there is no online payment, and you pay the team afterwards.',
        },
      ],
    },
    {
      h2: 'Summary of the rental requirements',
      blocks: [
        {
          type: 'table',
          head: ['Point', 'Rule at Yourent'],
          rows: [
            ['Documents', 'CIN or passport, licence held over 2 years, proof of address'],
            ['Foreign licence', 'International driving permit accepted for tourists'],
            ['Minimum age', 'Given by the team before you book'],
            ['Duration', '5 days minimum, lower rate after 10 days on most models'],
            ['Deposit', 'Cheque, cash or card imprint, amount depends on the car'],
            ['Insurance', 'Comprehensive with an excess, amount given by the team'],
            ['Mileage', 'Given by the team before you book'],
            ['Return in another city', 'Given by the team before you book'],
            ['Cancellation', 'Free up to 24 hours before pick-up'],
            ['Breakdown', 'Replacement car as soon as possible'],
          ],
        },
        {
          type: 'p',
          text: 'A question about a point in this table? Write to the team from the [contact](route:contact) page or check the [FAQ](route:faq).',
        },
      ],
    },
  ],
  faq: [
    {
      q: 'Which documents do I need to rent a car in Casablanca?',
      a: 'You need a valid ID (CIN or passport), a driving licence held for more than 2 years and proof of address.',
    },
    {
      q: 'Is my foreign driving licence accepted?',
      a: 'For foreign tourists, the international driving permit is accepted. In any other case, the team replies on WhatsApp before you book.',
    },
    {
      q: 'How is the deposit paid?',
      a: 'The deposit is paid at pick-up, by cheque, in cash or by card imprint. It is returned once the car is back in good condition.',
    },
    {
      q: 'What happens if the car breaks down or I have an accident?',
      a: 'If the car breaks down, a replacement is sent as soon as possible. After an accident, the team helps you with the paperwork.',
    },
    {
      q: 'Until when can I cancel for free?',
      a: 'Up to 24 hours before pick-up. After that, fees may apply.',
    },
  ],
  related: ['tarifs', 'faq', 'contact', 'aeroport'],
};

export default page;
