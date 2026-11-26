import type { PageContent } from '../../types';

const page: PageContent = {
  metaTitle: 'Mercedes Rental Casablanca from {minPrice} MAD | Yourent',
  metaDescription:
    'Mercedes rental in Casablanca: rent a CLA, C-Class or E-Class from {minPrice} MAD/day. Free delivery to your hotel or the airport, confirmed on WhatsApp.',
  eyebrow: 'Mercedes',
  h1: 'Mercedes rental in Casablanca: C-Class, E-Class and CLA',
  intro:
    'Yourent offers Mercedes rental in Casablanca with three models: the CLA from {minPrice} MAD per day, the C 220 at {price:mercedes-c-220} MAD and the E 220 at {price:mercedes-e-220} MAD. Send a request with your dates and the team confirms on WhatsApp or by phone. The car then comes to your hotel, your address or Mohammed V airport. Rentals start at 5 days.',
  breadcrumb: 'Mercedes',
  vehicles: { marques: ['Mercedes'], sort: 'asc' },
  sections: [
    {
      h2: 'Mercedes rental in Casablanca: three models, three uses',
      blocks: [
        {
          type: 'p',
          text: "The [Mercedes CLA](/catalogue/mercedes-cla) is the entry point to the brand at Yourent: a compact four-door coupé, petrol and automatic, available in several units. The [C 220](/catalogue/mercedes-c-220) is the brand's classic saloon, in diesel. The [E 220](/catalogue/mercedes-e-220) is the biggest of the three, the one you book when ride comfort comes first.",
        },
        {
          type: 'p',
          text: 'The C-Class and E-Class are in limited numbers, so if your dates are fixed, run the date search in the catalogue. It only shows the Mercedes that are free on your days.',
        },
      ],
    },
    {
      h2: 'Which Mercedes to rent for your trip',
      blocks: [
        {
          type: 'list',
          items: [
            '**Arriving at Mohammed V airport**: the CLA is enough for a solo traveller or a couple with two suitcases. Yourent delivers the car to the airport, as the [car rental Casablanca airport](route:aeroport) page explains.',
            '**A stay in Casablanca**: the C-Class is easier to park than an E-Class in Maarif or along the Corniche, while keeping the look of a proper saloon.',
            '**Casablanca to Marrakech**: on the motorway, the diesel E-Class is the most restful for a long drive. The CLA is livelier to drive, with a smaller boot.',
            '**An event or a dinner**: the E-Class has the presence of a big saloon, while the CLA looks younger and the C-Class more understated.',
          ],
        },
        {
          type: 'p',
          text: 'For a similar budget, an SUV also gives you a higher driving position: compare with the [Range Rover Evoque](/catalogue/range-rover-evoque) or the [Volkswagen Touareg](/catalogue/volkswagen-touareg).',
        },
      ],
    },
    {
      h2: 'Mercedes available to rent',
      blocks: [{ type: 'vehicles' }],
    },
    {
      h2: 'Mercedes rental prices in Casablanca',
      blocks: [
        {
          type: 'p',
          text: 'Expect {minPrice} to {maxPrice} MAD per day depending on the model: {price:mercedes-cla} MAD for the CLA, {price:mercedes-c-220} MAD for the C-Class, {price:mercedes-e-220} MAD for the E-Class. The table below gives the rate after 10 days for each model. Your Mercedes is covered by comprehensive insurance with an excess. The deposit depends on the model and is paid by cheque, in cash or by card imprint.',
        },
        { type: 'pricing' },
        {
          type: 'p',
          text: 'Looking at other premium models? Our [luxury car rental in Casablanca](route:luxe) page compares them all.',
        },
      ],
    },
  ],
  faq: [
    {
      q: 'Which Mercedes should I rent for a first stay in Casablanca?',
      a: 'The [CLA](/catalogue/mercedes-cla) is the most affordable in the range and the most compact. For longer trips or business meetings, the [C 220](/catalogue/mercedes-c-220) is a more classic saloon.',
    },
    {
      q: 'Are the Mercedes diesel or petrol?',
      a: 'The CLA runs on petrol, whereas the C 220 and the E 220 are diesels. All three have an automatic gearbox.',
    },
    {
      q: 'Can I take a Mercedes to Marrakech?',
      a: 'Yes, the motorway links Casablanca and Marrakech, and the E-Class is comfortable on it. Before you leave, ask the team on WhatsApp about included mileage. The route is described on our [Casablanca to Marrakech car rental](route:marrakech) page.',
    },
    {
      q: 'Can I rent a Mercedes for one day or for a wedding?',
      a: 'Not for a single day: the minimum rental is 5 days on every model. For a wedding, book a period that covers the date and mention the event in your request.',
    },
    {
      q: 'Can the Mercedes be delivered to the airport or my hotel?',
      a: 'Yes. Yourent delivers free of charge anywhere in Casablanca and at Mohammed V airport, every day from 8 am to 10 pm. Delivery to Mohammedia is possible for a small extra fee.',
    },
    {
      q: 'Which documents do I need to rent a Mercedes?',
      a: 'A valid ID (CIN or passport), a licence held for more than 2 years and proof of address, with an international permit accepted for foreign tourists. The details are on the [car rental requirements](route:conditions) page.',
    },
  ],
  related: ['luxe', 'automatique', 'aeroport', 'range-rover', 'tarifs'],
};

export default page;
