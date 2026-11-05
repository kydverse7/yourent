import type { PageContent } from '../../types';

const page: PageContent = {
  metaTitle: 'Mercedes Rental Casablanca: C, E, CLA | Yourent',
  metaDescription:
    'Mercedes rental Casablanca: CLA, C-Class or E-Class from {minPrice} MAD/day. Delivery to your hotel or the airport, online request, reply on WhatsApp.',
  eyebrow: 'Mercedes',
  h1: 'Mercedes Rental in Casablanca: C-Class, E-Class and CLA',
  intro:
    'Yourent rents three Mercedes in Casablanca: the CLA from {minPrice} MAD per day, the C 220 at {price:mercedes-c-220} MAD and the E 220 at {price:mercedes-e-220} MAD. You send a request with your dates, the team confirms on WhatsApp or by phone, then the car is delivered to your hotel, your address or Mohammed V airport. Rentals start at 5 days.',
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
          text: 'The C-Class and E-Class are in limited numbers. If your dates are fixed, run the date search in the catalogue: it only shows the Mercedes that are free on your days.',
        },
      ],
    },
    {
      h2: 'Which Mercedes to choose for your trip',
      blocks: [
        {
          type: 'list',
          items: [
            '**Arriving at Mohammed V airport**: the CLA is enough for a solo traveller or a couple with two suitcases. Yourent delivers the car to the airport, see the [car rental at the airport](route:aeroport) page.',
            '**A stay in Casablanca**: the C-Class is easier to park than an E-Class in the streets of Maarif or along the Corniche, while keeping the look of a proper saloon for meetings.',
            '**Casablanca to Marrakech**: on the motorway, the diesel E-Class is the most restful for a long drive. The CLA is livelier and sportier to drive, with a smaller boot.',
            '**An event or a dinner**: the E-Class has the presence of a big saloon. The CLA looks younger, the C-Class more understated.',
          ],
        },
        {
          type: 'p',
          text: 'For the same budget as the C-Class, an SUV changes how you experience the road: compare with the [Range Rover Evoque](/catalogue/range-rover-evoque) or the [Volkswagen Touareg](/catalogue/volkswagen-touareg).',
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
          text: 'Expect {minPrice} to {maxPrice} MAD per day depending on the model: {price:mercedes-cla} MAD for the CLA, {price:mercedes-c-220} MAD for the C-Class, {price:mercedes-e-220} MAD for the E-Class. A lower rate applies automatically after 10 days. Every car has comprehensive insurance with an excess. The deposit depends on the model and is paid by cheque, in cash or by card imprint.',
        },
        { type: 'pricing' },
        {
          type: 'p',
          text: 'Wondering about other premium models? The [luxury car rental](route:luxe) page compares them all.',
        },
      ],
    },
  ],
  faq: [
    {
      q: 'Which Mercedes should I rent for a first stay in Casablanca?',
      a: 'The [CLA](/catalogue/mercedes-cla) is the most affordable in the range and the easiest to get used to in town. For longer trips or business meetings, the [C 220](/catalogue/mercedes-c-220) is a more classic saloon.',
    },
    {
      q: 'Are the Mercedes diesel or petrol?',
      a: 'The CLA runs on petrol. The C 220 and the E 220 are diesels. All three have an automatic gearbox.',
    },
    {
      q: 'Can I take a Mercedes to Marrakech?',
      a: 'Yes, the motorway links Casablanca and Marrakech and the E-Class is particularly comfortable on it. Included mileage is not the same on every contract: ask the team on WhatsApp before you leave.',
    },
    {
      q: 'Can the Mercedes be delivered to the airport or my hotel?',
      a: 'Yes. Yourent delivers free of charge anywhere in Casablanca and at Mohammed V airport, every day from 8 am to 10 pm. Delivery to Mohammedia is possible for a small extra fee.',
    },
    {
      q: 'Which documents do I need to rent a Mercedes?',
      a: 'A valid ID (CIN or passport), a licence held for more than 2 years and proof of address. Foreign tourists can show an international driving permit. The details are on the [rental requirements](route:conditions) page.',
    },
  ],
  related: ['luxe', 'automatique', 'aeroport', 'range-rover', 'tarifs'],
};

export default page;
