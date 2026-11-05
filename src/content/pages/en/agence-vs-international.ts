import type { PageContent } from '../../types';

const page: PageContent = {
  metaTitle: 'Local or International Car Rental Casablanca | Yourent',
  metaDescription:
    'Local or international car rental in Casablanca? Compare pick-up, free airport delivery, deposit, flexibility and breakdown help to choose what suits you.',
  eyebrow: 'Comparison',
  h1: 'Local or international car rental in Casablanca: how to choose',
  intro:
    'For car rental in Casablanca, you can use a big international company or a local agency like Yourent. The international company has desks and a worldwide network, while the local agency usually offers delivery and direct contact with the team. The right choice depends on how long you stay and how you want to collect the car.',
  breadcrumb: 'Local or international',
  sections: [
    {
      h2: 'Car rental in Casablanca: local agency and international company compared',
      blocks: [
        {
          type: 'p',
          text: "This table describes general trends, not the terms of any particular company, because they vary from one brand and one offer to another. Always check the terms published by each company. For Yourent, the column reflects the agency's own rules.",
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
              'Direct contact with the team on WhatsApp; free cancellation up to 24 hours before pick-up',
            ],
            [
              'Duration',
              'Daily rental possible with some companies',
              '5 days minimum, lower rate after 10 days on most models',
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
            '**Airport presence**: a desk in the arrivals hall means you do not wait for someone to bring the car. Yourent, by contrast, delivers to Mohammed V airport but has no desk there.',
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
          text: 'A local agency suits a rental of at least 5 days when you want the car where you are: your hotel, the station or your family home. You talk directly to the team preparing the car, so you can raise requests such as the handover time or the return place.',
        },
        {
          type: 'p',
          text: 'The deposit matters too. At Yourent, you leave it by cheque, in cash or by card imprint. The amount depends on the car, and the [car rental prices in Casablanca](route:tarifs) page shows the minimum. If you would rather not have a bank card blocked, ask each company what it accepts.',
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
          text: 'At Yourent, the deposit and cancellation are described on the [car rental requirements](route:conditions) page. The team gives the excess amount, the included mileage and the options for returning in another city before you book.',
        },
      ],
    },
    {
      h2: 'If you arrive through the airport',
      blocks: [
        {
          type: 'p',
          text: 'The choice is often decided on arrival: a desk on site or a delivered car. To see how Yourent organises the handover, first read the [car rental at Mohammed V airport](route:aeroport) page. Then, for a specific request, use the [Yourent contact](route:contact) page.',
        },
      ],
    },
  ],
  faq: [
    {
      q: 'Is it better to rent from an international company or a local agency in Casablanca?',
      a: 'It depends on your stay. An international company offers desks and a worldwide network. A local agency like Yourent, on the other hand, delivers the car and offers direct contact, for a rental of 5 days or more.',
    },
    {
      q: 'Does Yourent have a desk at the airport?',
      a: 'No. Delivery to Mohammed V airport is free, but you will not find a Yourent office in the terminal.',
    },
    {
      q: 'Can I rent for a single day at Yourent?',
      a: 'No, the minimum is 5 days, so a single day means going to another company.',
    },
    {
      q: 'How does the deposit work at Yourent?',
      a: 'It is taken at pick-up, by cheque, in cash or by card imprint. The amount depends on the car, and you get it back when the car returns undamaged.',
    },
    {
      q: 'What happens if the car breaks down at Yourent?',
      a: 'The team sends a replacement car as quickly as it can. In the case of an accident, it also supports you through the paperwork.',
    },
  ],
  related: ['aeroport', 'conditions', 'tarifs', 'a-propos', 'contact'],
};

export default page;
