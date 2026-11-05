import type { PageContent } from '../../types';

const page: PageContent = {
  metaTitle: 'Local or International Car Rental Casablanca | Yourent',
  metaDescription:
    'Local agency or international car rental in Casablanca: compare pick-up, delivery, deposit, flexibility and breakdown help to choose the right option.',
  eyebrow: 'Comparison',
  h1: 'Local Agency or International Car Rental in Casablanca: How to Choose',
  intro:
    'In Casablanca, you can rent from a big international company or from a local agency like Yourent. Both have a case: the international company has desks and a worldwide network, while the local agency usually offers delivery and direct contact with the team. The right choice depends on how long you stay and how you want to collect the car.',
  breadcrumb: 'Local or international',
  sections: [
    {
      h2: 'Comparison: local agency and international car rental',
      blocks: [
        {
          type: 'p',
          text: "This table describes general trends, not the terms of any particular company: they vary from one brand to another and from one offer to another. Always check the terms published by each company. For Yourent, the columns reflect the agency's own rules.",
        },
        {
          type: 'table',
          head: ['Criterion', 'International company', 'Local agency (Yourent)'],
          rows: [
            [
              'Pick-up place',
              'Often a desk at the airport or in town',
              'Delivery to the airport, your hotel or the address you choose, no desk at the airport',
            ],
            [
              'Delivery',
              'Depends on the brand and the offer',
              'Free anywhere in Casablanca and at Mohammed V airport, 7 days a week from 8 am to 10 pm',
            ],
            [
              'Deposit',
              'Often by bank card, depending on the brand\'s terms',
              'Cheque, cash or card imprint, amount depends on the car',
            ],
            [
              'Flexibility',
              'Standardised terms, set by the brand',
              'Direct contact with the team on WhatsApp; free cancellation up to 24 hours before',
            ],
            [
              'Duration',
              'Daily rental possible with some companies',
              '5 days minimum, lower rate after 10 days',
            ],
            [
              'Assistance',
              "International network and the brand's helpline",
              'Replacement car after a breakdown, help from the team after an accident',
            ],
          ],
        },
      ],
    },
    {
      h2: 'What the big companies do well',
      blocks: [
        {
          type: 'list',
          items: [
            '**Airport presence**: a desk in the arrivals hall saves you waiting for a driver. Yourent delivers to Mohammed V airport but has no desk there.',
            '**International network**: if you rent in several countries or cities, a single company can cover everything, with one account and known terms.',
            '**Short rentals**: for a day or a weekend, a big company is often the answer, since Yourent rents for 5 days minimum.',
          ],
        },
      ],
    },
    {
      h2: 'When a local agency is a better fit',
      blocks: [
        {
          type: 'p',
          text: 'A local agency suits you when the rental lasts at least 5 days and you want the car where you are: in front of the hotel, at the station or at relatives\'. You talk directly to the team preparing the car, which makes special requests easier, such as the handover time or the return place (to be confirmed before you book).',
        },
        {
          type: 'p',
          text: 'The deposit matters too. At Yourent, it can be paid by cheque, in cash or by card imprint; the amount depends on the car and is shown on the [prices](route:tarifs) page. If you do not want a bank card blocked, ask each company what it accepts.',
        },
      ],
    },
    {
      h2: 'Questions to ask any rental company',
      blocks: [
        {
          type: 'list',
          ordered: true,
          items: [
            'Where and when do you collect the car, and where do you return it?',
            'How much is the deposit and how is it returned?',
            'What is the insurance excess?',
            'Is mileage included?',
            'What happens if the car breaks down, and until when can you cancel for free?',
          ],
        },
        {
          type: 'p',
          text: 'At Yourent, the deposit and cancellation are described on the [rental requirements](route:conditions) page. The excess amount, included mileage and returning in another city are given by the team before you book.',
        },
      ],
    },
    {
      h2: 'If you arrive through the airport',
      blocks: [
        {
          type: 'p',
          text: 'The choice is often decided on arrival: a desk on site or a delivered car. To see how Yourent organises the handover, read the [car rental at Mohammed V airport](route:aeroport) page. For a specific request, use the [contact](route:contact) page.',
        },
      ],
    },
  ],
  faq: [
    {
      q: 'Is it better to rent from an international company or a local agency in Casablanca?',
      a: 'It depends on your stay. An international company offers desks and a worldwide network. A local agency like Yourent delivers the car and offers direct contact, for a rental of 5 days or more.',
    },
    {
      q: 'Does Yourent have a desk at the airport?',
      a: 'No. Yourent delivers the car to Mohammed V airport, free of charge, but has no office on site.',
    },
    {
      q: 'Can I rent for a single day at Yourent?',
      a: 'No, the minimum is 5 days. For a single day, you need to turn to another company.',
    },
    {
      q: 'How does the deposit work at Yourent?',
      a: 'It is taken at pick-up, by cheque, in cash or by card imprint, depending on the car. It is returned once the car is back in good condition.',
    },
    {
      q: 'What happens if the car breaks down at Yourent?',
      a: 'A replacement car is sent as soon as possible. After an accident, the team helps the customer with the paperwork.',
    },
  ],
  related: ['aeroport', 'conditions', 'tarifs', 'a-propos', 'contact'],
};

export default page;
