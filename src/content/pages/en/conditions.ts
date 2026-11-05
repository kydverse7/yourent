import type { PageContent } from '../../types';

const page: PageContent = {
  metaTitle: 'Car Rental Requirements Casablanca: Age 21+ | Yourent',
  metaDescription:
    'Car rental requirements in Casablanca: age 21, ID, licence held over 2 years, proof of address, deposit, insurance, free cancellation up to 24 hours before.',
  eyebrow: 'Requirements',
  h1: 'Car Rental Requirements in Casablanca',
  intro:
    "Yourent's car rental requirements in Casablanca are short: age 21 or over, a valid ID, a licence over 2 years old, proof of address and a deposit. The rental lasts at least 5 days and comes with comprehensive insurance with an excess. This page sums up the agency's rules, but it does not replace the contract you receive at pick-up.",
  breadcrumb: 'Rental requirements',
  sections: [
    {
      h2: 'Car rental requirements: age and documents',
      blocks: [
        {
          type: 'list',
          items: [
            'A valid identity document: your CIN or your passport.',
            'A licence you have held for over 2 years.',
            'Proof of address.',
          ],
        },
        {
          type: 'p',
          text: 'The minimum age to rent is 21. Foreign tourists may use an international driving permit. However, if your licence was issued abroad and you have no international permit, ask the team to confirm before you book.',
        },
      ],
    },
    {
      h2: 'Deposit: amount, payment methods and return',
      blocks: [
        {
          type: 'p',
          text: 'A deposit is taken when the car is handed over, by cheque, in cash or by card imprint. The amount depends on the car you rent: the [car rental prices in Casablanca](route:tarifs) page gives the minimum for each model, then the team confirms the exact sum. You recover the deposit once the car comes back in good condition. Ask the team how long this takes before you book.',
        },
      ],
    },
    {
      h2: 'Rental period, mileage and returning the car',
      blocks: [
        {
          type: 'p',
          text: 'You rent for 5 days or more. Beyond 10 days, the daily rate falls automatically on most models, although high season can suspend this. Included mileage and returning in another city are not on the site, so the team answers on WhatsApp before you book. Delivery takes place at your hotel, at Mohammed V airport or at your address, from 8 am to 10 pm, every day. The place where you return the car is agreed with the team.',
        },
      ],
    },
    {
      h2: 'Insurance, breakdown and accident',
      blocks: [
        {
          type: 'list',
          items: [
            '**Insurance**: the cover is comprehensive, with an excess, and the team gives that amount before you book.',
            '**Breakdown**: a replacement car comes to you as quickly as possible.',
            '**Accident**: the team helps you with the paperwork.',
          ],
        },
      ],
    },
    {
      h2: 'Changing or cancelling a booking',
      blocks: [
        {
          type: 'p',
          text: 'A booking can be changed or cancelled free of charge up to 24 hours before pick-up. After that, fees may apply; the team tells you which ones. The online booking is only a request: there is no online payment, so you pay the team afterwards.',
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
            ['Minimum age', '21 years'],
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
          text: 'A question about a point in this table? First check the [car rental FAQ](route:faq), then write to the team from the [Yourent contact](route:contact) page.',
        },
      ],
    },
  ],
  faq: [
    {
      q: 'Which documents do I need to rent a car in Casablanca?',
      a: 'You must be at least 21 and show a CIN or passport, a licence held for more than 2 years and proof of address.',
    },
    {
      q: 'Is my foreign driving licence accepted?',
      a: 'Foreign tourists can rely on the international driving permit. In any other case, the team replies on WhatsApp before you book.',
    },
    {
      q: 'How is the deposit paid?',
      a: 'You pay it at pick-up, by cheque, in cash or by card imprint, then recover it if the car comes back in good condition.',
    },
    {
      q: 'What happens if the car breaks down or I have an accident?',
      a: 'For a breakdown, the agency sends a replacement car as quickly as possible. For an accident, it guides you through the formalities.',
    },
    {
      q: 'Until when can I cancel for free?',
      a: 'Up to 24 hours before pick-up, but fees may apply later than that.',
    },
  ],
  related: ['tarifs', 'faq', 'contact', 'aeroport'],
};

export default page;
