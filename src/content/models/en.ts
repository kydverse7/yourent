import type { ModelCopy } from '../types';

/** Unique text per model, keyed by slug (e.g. "porsche-macan"). */
const copy: Record<string, ModelCopy> = {
  "fiat-500": {
    paragraphs: [
      "The Fiat 500 is made for the city. Short and easy to park, it slips into spaces others leave behind, which makes all the difference in Maarif, Gauthier or near the Corniche on a summer evening. It suits a solo traveller or a couple getting around mostly in town, with light luggage.",
      "It runs on petrol and has a manual gearbox: if you are only used to automatics, look at the [Fiat 500 Cabriolet](/catalogue/fiat-500-cabriolet) instead. The boot stays modest, so forget big suitcases. For four people or a heavily loaded airport arrival, the [Opel Corsa](/catalogue/opel-corsa) offers a bit more room, at {price:opel-corsa} MAD per day (the 500 is {price:fiat-500} MAD).",
      "For a trip to Marrakech it does the job as long as you travel light. The team delivers it to your hotel or to Mohammed V airport. It uses little petrol: for short, repeated trips, it is one of the easiest cars to live with in the fleet.",
    ],
    faq: [
      {
        q: "Is the Fiat 500 automatic?",
        a: "No, the Fiat 500 has a manual gearbox. The [Fiat 500 Cabriolet](/catalogue/fiat-500-cabriolet) is the automatic version in the fleet.",
      },
      {
        q: "Can I drive a Fiat 500 to Marrakech?",
        a: "Yes, with two people and little luggage. For more comfort on the motorway, a [Volkswagen Golf 8](/catalogue/volkswagen-golf-8) is more at ease.",
      },
    ],
  },

  "opel-corsa": {
    paragraphs: [
      "The Opel Corsa is a no-fuss city car: discreet, simple, nothing to get used to. It has a manual gearbox and runs on petrol, with a more useful boot than the Fiat 500's for everyday luggage.",
      "It is for anyone looking for one of the lowest rates in the fleet, {price:opel-corsa} MAD per day, without giving up a decent back seat for two passengers. In Casablanca it gets around easily: downtown car parks, narrow streets, boulevards at rush hour.",
      "On the road, it is in its element for trips of a few hours. For a long journey with several passengers, the [Dacia Duster](/catalogue/dacia-duster) brings more room and higher ground clearance. If you prefer an automatic gearbox for the city, the [Toyota Corolla](/catalogue/toyota-corolla) is a step up in comfort.",
      "Delivery is free to your hotel in Casablanca and to Mohammed V airport.",
    ],
    faq: [
      {
        q: "Is the Opel Corsa manual?",
        a: "Yes, the Corsa in the fleet has a manual gearbox and runs on petrol. For an automatic, look at the [Toyota Corolla](/catalogue/toyota-corolla).",
      },
      {
        q: "Is the Opel Corsa suitable for a family?",
        a: "For two adults and two children with light suitcases, yes. Beyond that, the [Dacia Duster](/catalogue/dacia-duster) is more comfortable.",
      },
    ],
  },

  "fiat-500-cabriolet": {
    paragraphs: [
      "The Fiat 500 Cabriolet is still a small city car, but with a folding roof. In our catalogue it is classed as premium, without being a prestige car: you rent it for the pleasure of driving with the top down on the Corniche or the coast road to Mohammedia, not for its status.",
      "It runs on petrol with an automatic gearbox, which makes it comfortable in Casablanca traffic jams. The boot is small: it is a car for two, with two travel bags.",
      "Next to the standard [Fiat 500](/catalogue/fiat-500), it costs {price:fiat-500-cabriolet} MAD per day against {price:fiat-500} MAD, and adds the automatic gearbox and the open roof. If you simply want a cheap city car, the [Opel Corsa](/catalogue/opel-corsa) does the job at {price:opel-corsa} MAD per day. But for driving in the open air during a summer stay, nothing else in the fleet compares.",
      "It is offered in very few units: send your request early.",
    ],
    faq: [
      {
        q: "Is the Fiat 500 Cabriolet a luxury car?",
        a: "No. It is a small convertible city car, classed as premium in the catalogue for the fun it offers. For a real prestige car, see the [luxury car rental](route:luxe) page.",
      },
      {
        q: "Is it suitable for a long trip?",
        a: "It manages the trip for two people with little luggage, but it is noisier and less stable on the motorway than a saloon. For a long drive, choose a [Toyota Corolla](/catalogue/toyota-corolla).",
      },
      {
        q: "Can I book the Cabriolet in advance?",
        a: "Yes, and it is advisable, since it is offered in very few units. The date search in the catalogue shows whether it is free.",
      },
    ],
  },

  "dacia-duster": {
    paragraphs: [
      "The Dacia Duster is the most affordable SUV in the fleet, at {price:dacia-duster} MAD per day. It runs on diesel and has a manual gearbox, which suits drivers comfortable with a clutch. In return, it offers space, a big boot and ground clearance that helps on country roads.",
      "It is the right choice for a family wanting a road trip without spending as much as on a large SUV, or for a group of friends heading to Essaouira or Marrakech with bags. It uses little diesel on the motorway.",
      "It comes in several units, which makes availability easier than on rarer models.",
      "Next to the [Volkswagen T-Roc](/catalogue/volkswagen-t-roc), the Duster is less refined and more rugged, but costs {price:dacia-duster} MAD per day against {price:volkswagen-t-roc} MAD. Next to the [Kia Sorento](/catalogue/kia-sorento), it lacks the automatic gearbox and the finish, but costs only {price:dacia-duster} MAD against {price:kia-sorento} MAD. In town, it is still a bit bulky: for downtown traffic, an [Opel Corsa](/catalogue/opel-corsa) is more practical.",
    ],
    faq: [
      {
        q: "Does the Dacia Duster come in automatic?",
        a: "No, the one in the fleet has a manual gearbox and runs on diesel. For an automatic SUV, look at the [Volkswagen T-Roc](/catalogue/volkswagen-t-roc).",
      },
      {
        q: "Is the Duster suitable for a family of five?",
        a: "Yes, it has five seats and a wide boot. It is one of the SUVs best suited to a family on a tight budget.",
      },
    ],
  },

  "toyota-corolla": {
    paragraphs: [
      "The Toyota Corolla is the easygoing saloon of the fleet: hybrid, automatic, comfortable and trouble-free. It is for anyone who wants to drive without thinking about it, leaving Mohammed V airport with suitcases or going from meeting to meeting across Casablanca.",
      "The hybrid system suits city traffic, with its stopping and starting. On the motorway to Rabat or Marrakech, it stays smooth and undemanding. Its boot easily takes the luggage of a stay for two or three people.",
      "At {price:toyota-corolla} MAD per day, it compares with the [Volkswagen T-Roc](/catalogue/volkswagen-t-roc), listed at {price:volkswagen-t-roc} MAD. Choose the T-Roc for the high seating position of an SUV, the Corolla for the comfort of a saloon. Next to the [Audi A3](/catalogue/audi-a3), it has less prestige, but it is more discreet and smoother in town.",
      "It is a sensible choice for a rental of several weeks: a reliable model that is simple to live with every day.",
    ],
    faq: [
      {
        q: "Is the Toyota Corolla a hybrid?",
        a: "Yes, the Corolla in the fleet is a hybrid with an automatic gearbox and 5 seats.",
      },
      {
        q: "Is it suitable for a long-term rental?",
        a: "Yes. The rate drops automatically after 10 days, and the Corolla is one of the most comfortable cars for everyday use. See the [long-term car rental](route:longue-duree) page.",
      },
    ],
  },

  "volkswagen-t-roc": {
    paragraphs: [
      "The Volkswagen T-Roc is a compact petrol SUV with an automatic gearbox. Taller than a saloon, shorter than a large SUV, it suits a couple or a small family wanting a car that is easy in town and capable on the open road.",
      "In Casablanca, it parks without trouble and gives good visibility in traffic. For Marrakech or Rabat, it holds the motorway well and leaves enough room for the luggage of two or three travellers. It does not try to impress: it is a safe bet, at {price:volkswagen-t-roc} MAD per day.",
      "Compare it with the [Dacia Duster](/catalogue/dacia-duster) if budget comes first: the Duster is roomier and cheaper, but diesel and manual. Compare it with the [Volkswagen Tiguan](/catalogue/volkswagen-tiguan) if you travel as four with suitcases, since the Tiguan offers more room at {price:volkswagen-tiguan} MAD per day.",
      "It comes in several units, which makes booking easier in high season.",
    ],
    faq: [
      {
        q: "Is the T-Roc diesel or petrol?",
        a: "The T-Roc in the fleet runs on petrol, with an automatic gearbox.",
      },
      {
        q: "How does it differ from the Tiguan?",
        a: "The [Tiguan](/catalogue/volkswagen-tiguan) is bigger, diesel, and better suited to a family with a lot of luggage. The T-Roc is more compact and easier to park.",
      },
    ],
  },

  "audi-a3": {
    paragraphs: [
      "The Audi A3 is a premium compact: it looks smart without the size of a large saloon. It runs on petrol with an automatic gearbox and drives precisely, in town and on the motorway.",
      "It appeals to anyone with a business meeting in Casablanca or who simply wants a more refined car than a city car. For two or three people, it works well for a trip to Rabat, Mohammedia or Marrakech. With four and their suitcases, you will be cramped.",
      "It costs {price:audi-a3} MAD per day and the [Volkswagen Golf 8](/catalogue/volkswagen-golf-8) {price:volkswagen-golf-8} MAD: the Golf is more versatile and comes with a choice of gearbox, the A3 has a finish and brand image that are more upmarket. Next to the [Mercedes CLA](/catalogue/mercedes-cla), it is more discreet and cheaper.",
      "It is offered in very few units. Send your request with your dates as soon as possible.",
    ],
    faq: [
      {
        q: "Is the Audi A3 automatic?",
        a: "Yes, the A3 in the fleet has an automatic gearbox and runs on petrol. For an Audi with a manual gearbox, look at the [Audi Q3](/catalogue/audi-q3).",
      },
      {
        q: "Can four people travel in an Audi A3?",
        a: "Yes, it has five seats, but the boot and the back seat stay compact. For four travellers with suitcases, an SUV like the [Volkswagen Tiguan](/catalogue/volkswagen-tiguan) is more comfortable.",
      },
    ],
  },

  "volkswagen-golf-8": {
    paragraphs: [
      "The Volkswagen Golf 8 is the versatile compact of the fleet. It comes in diesel or petrol, automatic or manual, depending on the car: state your preference in the request and the team offers a matching car that is free on your dates.",
      "It suits almost every use: an arrival at Mohammed V airport, a two-week stay in Casablanca, a return trip to Marrakech. With four it stays fine for a short drive, and with two it is very much at ease. Its price is {price:volkswagen-golf-8} MAD per day.",
      "Compared with the [Toyota Corolla](/catalogue/toyota-corolla), the Golf is livelier to drive, the Corolla smoother and hybrid. Compared with the [Volkswagen T-Roc](/catalogue/volkswagen-t-roc), it is more compact and easier to park, but lower: choose the T-Roc if you want the high seating position.",
      "It is a sensible choice for anyone who wants neither an SUV nor a simple city car.",
    ],
    faq: [
      {
        q: "Is the Golf 8 diesel or petrol?",
        a: "Both engines exist in the fleet, depending on the car. State your preference in the booking request.",
      },
      {
        q: "Can I get the Golf 8 with a manual gearbox?",
        a: "Yes, the Golf 8 comes in manual as well as automatic. The team confirms the car available on your dates.",
      },
      {
        q: "Is the Golf 8 more comfortable than the Toyota Corolla?",
        a: "It is more dynamic, while the [Toyota Corolla](/catalogue/toyota-corolla) is smoother and hybrid. The choice depends on your driving style.",
      },
    ],
  },

  "kia-sorento": {
    paragraphs: [
      "The Kia Sorento is the family SUV of the fleet: large, diesel, automatic, five comfortable seats and a real boot. It suits a family travelling with luggage, a group heading to Marrakech or Agadir, or anyone who simply wants to sit high and drive calmly.",
      "In Casablanca, its size calls for a bit of care in narrow streets, but it is reassuring in dense traffic. On the motorway, it is stable and composed. It costs {price:kia-sorento} MAD per day.",
      "Next to the [Volkswagen Tiguan](/catalogue/volkswagen-tiguan), the Sorento puts space and comfort ahead of brand image. Next to the [Dacia Duster](/catalogue/dacia-duster), it is pricier ({price:dacia-duster} MAD for the Duster), but automatic and better finished. If you want a large SUV with more status, look at the [Volkswagen Touareg](/catalogue/volkswagen-touareg).",
      "It is offered in limited numbers: book early for a holiday departure. In Casablanca, allow a little more time to park; on the road, its high position makes long drives less tiring.",
    ],
    faq: [
      {
        q: "Is the Kia Sorento suitable for a large family?",
        a: "It has five seats, with a comfortable boot. For a bigger group, you will need two cars.",
      },
      {
        q: "Is the Sorento diesel and automatic?",
        a: "Yes, the one in the fleet is a diesel with an automatic gearbox.",
      },
    ],
  },

  "volkswagen-tiguan": {
    paragraphs: [
      "The Volkswagen Tiguan is the brand's mid-size SUV: roomier than the T-Roc, less imposing than the Touareg. It runs on diesel with an automatic gearbox, which makes it a restful car for a long drive.",
      "It is for a family of four with suitcases, or friends heading off to Marrakech, Essaouira or Rabat. In Casablanca, its size stays reasonable for car parks and downtown. Its rate is {price:volkswagen-tiguan} MAD per day.",
      "Compare it with the [Kia Sorento](/catalogue/kia-sorento), at {price:kia-sorento} MAD: the Tiguan has the image and sharper drive of a Volkswagen, the Sorento more interior space. Compare it also with the [Audi Q3](/catalogue/audi-q3), at {price:audi-q3} MAD, more compact and more upmarket.",
      "If you are torn between the Tiguan and the [Volkswagen Touareg](/catalogue/volkswagen-touareg), it comes down to luggage: with a lot of large suitcases, take the Touareg, whose boot and cabin spare you from sorting your things.",
    ],
    faq: [
      {
        q: "Is the Tiguan automatic?",
        a: "Yes, the one in the fleet is a diesel with an automatic gearbox, with 5 seats.",
      },
      {
        q: "Tiguan or Touareg, which should I choose?",
        a: "The Tiguan is enough for four people and their luggage. The [Touareg](/catalogue/volkswagen-touareg) is bigger and more comfortable for long, loaded trips.",
      },
    ],
  },

  "audi-q3": {
    paragraphs: [
      "The Audi Q3 is a premium compact SUV, diesel. It comes with an automatic or a manual gearbox depending on the car: state your choice in the request.",
      "It suits a couple, a business traveller or a small family wanting an SUV that is easy to park in Casablanca, with more status than a T-Roc. On the road to Marrakech, the diesel pulls easily, and the high position makes the trip less tiring. It costs {price:audi-q3} MAD per day.",
      "Next to the [Audi A3](/catalogue/audi-a3), it adds height and a more generous boot for {price:audi-q3} MAD against {price:audi-a3} MAD. Next to the [Porsche Macan](/catalogue/porsche-macan), it is cheaper, more sensible and less sporty. Next to the [Volkswagen Tiguan](/catalogue/volkswagen-tiguan), it is more compact but smarter.",
      "There are several in the fleet, so free dates are easier to find. Delivered to your hotel or Mohammed V airport, it is ready to drive from the moment you get the keys.",
    ],
    faq: [
      {
        q: "Is the Audi Q3 automatic or manual?",
        a: "Both exist in the fleet. The team offers a car that matches your preference and is free on your dates.",
      },
      {
        q: "Is the Q3 diesel?",
        a: "Yes, the Q3 in the fleet is a diesel.",
      },
      {
        q: "What is the difference between the Q3 and the Porsche Macan?",
        a: "The [Porsche Macan](/catalogue/porsche-macan) is a sportier, pricier petrol. The Q3 is a more restrained diesel SUV at a more moderate rate.",
      },
    ],
  },

  "mercedes-cla": {
    paragraphs: [
      "The Mercedes CLA is a compact four-door coupé. Petrol and automatic, it gets you a Mercedes in Casablanca without the size of the large saloons. It appeals to anyone wanting a stylish car for a stay for two, an arrival at Mohammed V airport or a trip to Marrakech.",
      "Its low roofline has a downside: getting into the back is harder than in a classic saloon and the boot is average. It is made for two or three passengers. In town, its size stays reasonable. It costs {price:mercedes-cla} MAD per day.",
      "Next to the [Audi A3](/catalogue/audi-a3), it has more presence and more style, for {price:mercedes-cla} MAD against {price:audi-a3} MAD. Next to the [Mercedes C 220](/catalogue/mercedes-c-220), it is cheaper ({price:mercedes-c-220} MAD for the C-Class), sportier and younger in look, but less roomy, especially for rear passengers.",
      "It comes in several units, which makes it the easiest Mercedes to book.",
    ],
    faq: [
      {
        q: "Is the Mercedes CLA petrol or diesel?",
        a: "It runs on petrol, with an automatic gearbox.",
      },
      {
        q: "Is the CLA roomy enough for four adults?",
        a: "It has five seats, but the back is tighter than in a classic saloon. For four adults with luggage, the [C 220](/catalogue/mercedes-c-220) or an SUV is more comfortable.",
      },
    ],
  },

  "volkswagen-touareg": {
    paragraphs: [
      "The Volkswagen Touareg is the large SUV of the fleet, diesel and automatic. It is for a group, a family with a lot of luggage, or anyone who wants an upmarket SUV without paying the price of a [Range Rover Sport](/catalogue/range-rover-sport). It costs {price:volkswagen-touareg} MAD per day.",
      "It is one of the best-represented models in the fleet, which reflects its versatility: at the airport, it swallows suitcases and passengers; on the motorway to Marrakech, it glides along quietly; in town, it parks with a little care, but its visibility helps. It is offered in large numbers, so availability is easier.",
      "Next to the [Volkswagen Tiguan](/catalogue/volkswagen-tiguan), it offers a step up in space and comfort for a higher price. Next to the [Range Rover Evoque](/catalogue/range-rover-evoque), at {price:range-rover-evoque} MAD, it is roomier while the Evoque plays the image card. Next to the [Range Rover Sport](/catalogue/range-rover-sport), it is much cheaper ({price:range-rover-sport} MAD for the Sport) and is plenty for most trips.",
    ],
    faq: [
      {
        q: "Is the Touareg automatic and diesel?",
        a: "Yes, the Touareg in the fleet runs on diesel, with an automatic gearbox.",
      },
      {
        q: "Touareg or Range Rover Evoque?",
        a: "The Touareg is bigger and roomier, the [Evoque](/catalogue/range-rover-evoque) more compact and more prestigious. The Touareg costs {price:volkswagen-touareg} MAD per day and the Evoque {price:range-rover-evoque} MAD: compare them on the [Range Rover rental](route:range-rover) page.",
      },
      {
        q: "Is the Touareg suitable for long trips?",
        a: "That is one of its strengths: stable, quiet and comfortable. Ask the team about included mileage before setting off on several hundred kilometres.",
      },
    ],
  },

  "range-rover-evoque": {
    paragraphs: [
      "The Range Rover Evoque is the British brand's compact SUV. It runs on diesel with an automatic gearbox, and its low, urban shape sets it apart from squarer SUVs. People choose it for its image as much as for the drive, at {price:range-rover-evoque} MAD per day.",
      "It suits a couple or a business traveller who wants to arrive somewhere in a car that gets noticed. In Casablanca, its size stays manageable; towards Marrakech, it holds the road well and its high position is not tiring. Its boot is decent but not huge.",
      "Next to the [Range Rover Sport](/catalogue/range-rover-sport), it is much cheaper, smaller and easier to park. Next to the [Volkswagen Touareg](/catalogue/volkswagen-touareg), at {price:volkswagen-touareg} MAD, it gives up space for prestige. Next to the [Audi Q3](/catalogue/audi-q3), it is pricier ({price:audi-q3} MAD for the Q3) and more prestigious.",
      "It is offered in very few units. An early request is advised.",
    ],
    faq: [
      {
        q: "Is the Evoque diesel?",
        a: "Yes, the Evoque in the fleet is a diesel with an automatic gearbox.",
      },
      {
        q: "Evoque or Sport: which should I choose?",
        a: "The Evoque for town and a trip for two or three. The [Sport](/catalogue/range-rover-sport) for family, luggage and long distances.",
      },
    ],
  },

  "mercedes-c-220": {
    paragraphs: [
      "The Mercedes C 220 is the brand's classic saloon: diesel, automatic, understated and comfortable. It suits business travel, stays in Casablanca where you want to arrive in a smart saloon, and motorway drives to Rabat or Marrakech. It costs {price:mercedes-c-220} MAD per day.",
      "Its size stays reasonable in town, which sets it apart from the E-Class. In the back, two adults are comfortable. The boot is big enough for a stay's luggage.",
      "Next to the [Mercedes CLA](/catalogue/mercedes-cla), it is more classic, roomier and diesel, but pricier ({price:mercedes-cla} MAD for the CLA). Next to the [Mercedes E 220](/catalogue/mercedes-e-220), it is smaller and cheaper, but the comfort stays close for most trips.",
      "The C-Class is offered in very few units. Ask for your dates early: delivery is free to your hotel in Casablanca and to Mohammed V airport, and it suits a two-week stay as well as a five-day trip.",
    ],
    faq: [
      {
        q: "Is the C 220 diesel?",
        a: "Yes, it is a diesel with an automatic gearbox.",
      },
      {
        q: "C-Class or E-Class?",
        a: "The C-Class is handier in town. The [E-Class](/catalogue/mercedes-e-220) is bigger and more restful when travelling. Compare on the [Mercedes rental](route:mercedes) page.",
      },
    ],
  },

  "mercedes-e-220": {
    paragraphs: [
      "The Mercedes E 220 is the large saloon of the fleet: diesel, automatic, very comfortable. People rent it for long drives, for meetings where image matters and for a comfortable start after landing at Mohammed V airport. It costs {price:mercedes-e-220} MAD per day.",
      "On the motorway, it is the most restful of the Mercedes we offer. In the back, three people sit better than in a C-Class. In town, its length calls for caution in narrow streets and when parking.",
      "Next to the [Mercedes C 220](/catalogue/mercedes-c-220), it brings space and presence, for a higher price. Next to the [Range Rover Sport](/catalogue/range-rover-sport), it is much cheaper and lower, with saloon comfort rather than SUV comfort.",
      "It is offered in very few units. Delivery is free to your hotel in Casablanca and to the airport, every day from 8 am to 10 pm.",
    ],
    faq: [
      {
        q: "Is the E-Class more comfortable than the C-Class?",
        a: "Yes, it is bigger and roomier, especially in the back. The [C-Class](/catalogue/mercedes-c-220) is handier in town.",
      },
      {
        q: "Can I rent the E-Class for an event?",
        a: "Yes, it is rented like the other models. The rental starts at 5 days. Mention the occasion in your request: the team replies on WhatsApp.",
      },
    ],
  },

  "porsche-macan": {
    paragraphs: [
      "The Porsche Macan is the sporty SUV of the fleet: petrol, automatic, five seats. It drives like a lively saloon rather than a tall SUV, which sets it apart from every other model on offer. It costs {price:porsche-macan} MAD per day.",
      "People choose it for a specific occasion: a trip for two, a stay where you want to treat yourself, a road like Casablanca to Marrakech that it eats up with ease. It is not meant to save money: on a tight budget, look at the more sensible [Audi Q3](/catalogue/audi-q3).",
      "Next to the [Range Rover Evoque](/catalogue/range-rover-evoque), it is sportier and more dynamic; the Evoque is calmer and more about image. Next to the [Volkswagen Touareg](/catalogue/volkswagen-touareg), at {price:volkswagen-touareg} MAD, it is pricier and less roomy, but far more exciting to drive.",
      "Several units are on offer. Delivery is to your hotel, the address of your choice or Mohammed V airport.",
    ],
    faq: [
      {
        q: "Is the Macan petrol?",
        a: "Yes, the Porsche Macan in the fleet runs on petrol, with an automatic gearbox.",
      },
      {
        q: "Are there other Porsches in the fleet?",
        a: "No, the Macan is the only Porsche model on offer. The [Porsche rental](route:porsche) page explains how it is used.",
      },
    ],
  },

  "range-rover-sport": {
    paragraphs: [
      "The Range Rover Sport is the most upmarket model in the fleet: a large diesel SUV, automatic, five seats and comfort to match. It costs {price:range-rover-sport} MAD per day, the top of the agency's price list.",
      "People rent it for a wedding, a trip where the family or group must travel at ease, or simply for the pleasure of driving an SUV of this class. On the motorway to Marrakech, it is a car that swallows the miles. In town, its size calls for caution when parking.",
      "Next to the [Range Rover Evoque](/catalogue/range-rover-evoque), it is bigger, more comfortable and much pricier. Next to the [Volkswagen Touareg](/catalogue/volkswagen-touareg), it brings the brand's prestige, not necessarily more usable space: if budget matters, the Touareg does almost as much.",
      "There are very few in the fleet: ask for your dates early. The team confirms on WhatsApp and delivers the car to the address of your choice.",
    ],
    faq: [
      {
        q: "Is the Range Rover Sport diesel?",
        a: "Yes, it is a diesel with an automatic gearbox.",
      },
      {
        q: "Why does the Sport cost more than the Evoque?",
        a: "It is bigger, more upmarket and more comfortable. If you want the brand at a lower rate, see the [Evoque](/catalogue/range-rover-evoque).",
      },
      {
        q: "Is it suitable for a long trip?",
        a: "Yes, that is one of its natural uses. Ask the team about included mileage before setting off on several hundred kilometres.",
      },
    ],
  },
};

export default copy;
