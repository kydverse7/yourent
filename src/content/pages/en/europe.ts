import type { PageContent } from '../../types';

const page: PageContent = {
  metaTitle: 'Car Rental Casablanca from Europe: Book Ahead | Yourent',
  metaDescription:
    'Car rental in Casablanca from Europe: send a request online with no payment, talk on WhatsApp, free delivery at Mohammed V airport, from {minPrice} MAD/day.',
  eyebrow: 'From the UK and Europe',
  h1: 'Car rental in Casablanca from Europe: sort it out before you fly',
  intro:
    'Yourent lets you arrange your car rental in Casablanca from home, wherever you live in Europe, from {minPrice} MAD per day for at least 5 days. You send a request online, with no payment on the site. The team confirms on WhatsApp or by phone and delivers the car free of charge to Mohammed V airport.',
  breadcrumb: 'From Europe',
  vehicles: { sort: 'asc', limit: 9 },
  sections: [
    {
      h2: 'Car rental in Casablanca from the UK, Germany or Spain: who this page is for',
      blocks: [
        {
          type: 'p',
          text: 'This page is written for travellers who live in Europe and want the car arranged before they leave. The same steps also work if you are flying from Canada. Yourent is a Casablanca agency at N°25 Rue Ibnou Mounir, and you deal directly with its team.',
        },
        {
          type: 'p',
          text: 'Three other pages cover related needs. If you are Moroccan and live abroad, our [car rental for Moroccans living abroad](route:mre) page deals with stays back home. The handover on site is explained in [Casablanca airport car rental](route:aeroport). If you are still weighing up your options, read [local agency or international car rental](route:agence-vs-international).',
        },
      ],
    },
    {
      h2: 'Booking from abroad with no online payment',
      blocks: [
        {
          type: 'list',
          ordered: true,
          items: [
            'Enter your arrival and departure dates in the [car catalogue](/catalogue), which shows only the cars still free.',
            'Then send your request with Mohammed V airport as the handover point and your expected arrival time.',
            "The team replies with the total and the deposit. No card is charged on the site, because an online request isn't a payment.",
            'Agree with them how to pay, and keep their written confirmation on your phone for the trip.',
          ],
        },
        {
          type: 'p',
          text: 'If your dates move, changes and cancellations are free up to 24 hours before pick-up; later on, fees may apply.',
        },
      ],
    },
    {
      h2: 'WhatsApp instead of an international call',
      blocks: [
        {
          type: 'p',
          text: 'From abroad, WhatsApp is the easy channel because messages go over your internet connection, with no international call charges. A normal call to Morocco is billed according to your operator and your plan.',
        },
        {
          type: 'p',
          text: 'The number is the same for both: **+212 6 61 23 62 31**. Save it with the +212 country code so it shows up in WhatsApp. Use it for anything the site leaves open, such as the included mileage or the amount of the excess. Our [contact](route:contact) page lists the other ways to reach the agency.',
        },
      ],
    },
    {
      h2: 'Documents, age and licence to get ready before you fly',
      blocks: [
        {
          type: 'list',
          items: [
            '**ID.** We ask for a CIN or a passport, so a valid passport is enough.',
            "**Age.** The driver must be at least 21.",
            '**Licence.** It must have been held for more than 2 years. An international driving permit is accepted for foreign tourists; carry it alongside your national licence, because it is only a translation.',
            '**A UK, German or Spanish licence on its own.** Moroccan law lets a foreign national drive on a foreign licence for up to one year. Even so, the team confirms on WhatsApp whether it is enough for your rental.',
            '**Proof of address.** Everyone is asked for this, but the team tells you which document they accept if you live abroad.',
          ],
        },
        {
          type: 'p',
          text: "Our article on [renting in Morocco with a foreign licence, in French](https://www.yourent.ma/blog/louer-voiture-maroc-permis-etranger), cites the law and its sources. All the agency's rules are also on the [car rental requirements](route:conditions) page.",
        },
      ],
    },
    {
      h2: 'Dirhams, euros and the deposit: what to budget',
      blocks: [
        { type: 'pricing' },
        {
          type: 'p',
          text: 'Rates are set in Moroccan dirhams (MAD), and you are billed in that currency, so the euro equivalent shown in the tables is only a guide. Your bank may add its own exchange rate and fees; check with them before you leave.',
        },
        {
          type: 'p',
          text: 'The deposit is taken at pick-up by cheque, in cash or by card imprint, and the amount depends on the car. If you plan to leave a cheque from a European bank or a card imprint, ask the team first whether it is accepted. You get the deposit back when the car returns in good condition; ask on WhatsApp how long that takes. See also our [car rental prices](route:tarifs) page.',
        },
      ],
    },
    {
      h2: 'Arriving at Mohammed V, then hitting the road',
      blocks: [
        {
          type: 'p',
          text: 'Yourent has no desk at the airport: a team member brings the car to you, and you fix the meeting point together on WhatsApp. The agency is open from 8 am to 10 pm every day. If you land outside those hours, mention it in your request so they can tell you what is possible.',
        },
        {
          type: 'p',
          text: 'Heading south straight after landing? Our [car rental Casablanca to Marrakech](route:marrakech) page covers the route and suitable models. For a short break, keep in mind that the minimum rental is 5 days.',
        },
      ],
    },
    {
      h2: 'Nine cars to book before you leave',
      blocks: [
        {
          type: 'p',
          text: 'These are the nine models with the lowest rates; the [full catalogue](/catalogue) shows all {modelCount} models in the fleet. Every one of these cars has 5 seats.',
        },
        { type: 'vehicles' },
      ],
    },
  ],
  faq: [
    {
      q: 'Can I book from Europe without paying online?',
      a: 'Yes, because a booking on the site is only a request. You settle up with the team afterwards, once they have confirmed on WhatsApp or by phone.',
    },
    {
      q: 'Is my UK, German or Spanish licence enough?',
      a: "It must have been held for over 2 years, and an international driving permit is accepted for foreign tourists. Without one, ask the team to confirm your case on WhatsApp first.",
    },
    {
      q: 'How old do I have to be to rent?',
      a: "The driver must be 21 or over, wherever they live. Remember your passport and proof of address as well.",
    },
    {
      q: 'Are prices shown in euros or pounds?',
      a: 'No, they are in dirhams, from {minPrice} MAD per day. The tables add a euro equivalent as a guide only, and the team confirms the total for your dates.',
    },
    {
      q: 'My flight lands late. Will the car be there?',
      a: 'The agency works from 8 am to 10 pm. So if you land outside those hours, write to the team before booking, and they will tell you what is possible.',
    },
  ],
  related: ['aeroport', 'mre', 'agence-vs-international', 'conditions', 'tarifs'],
};

export default page;
