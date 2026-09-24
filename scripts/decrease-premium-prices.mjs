import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config({ path: '.env.local' });
dotenv.config();

const TARIF_FIELDS = ['tarifParJour', 'tarifParJour10Plus', 'tarifParJour15Plus', 'tarifParJour30Plus'];
const DECREMENT = 200;

function isHighEnd(vehicle) {
  const marque = (vehicle.marque || '').toLowerCase();
  const modele = (vehicle.modele || '').toLowerCase();

  return (
    vehicle.categorie === 'premium' ||
    marque.includes('porsche') ||
    marque.includes('mercedes') ||
    modele.includes('touareg')
  );
}

async function run() {
  await mongoose.connect(process.env.MONGODB_URI);
  const Vehicle = mongoose.connection.collection('vehicles');

  const vehicles = await Vehicle.find({}).toArray();
  let updated = 0;

  for (const v of vehicles) {
    if (!isHighEnd(v)) continue;

    const set = {};
    for (const field of TARIF_FIELDS) {
      const current = v[field];
      if (typeof current === 'number' && current > 0) {
        set[field] = Math.max(0, current - DECREMENT);
      }
    }
    if (Object.keys(set).length === 0) continue;

    await Vehicle.updateOne({ _id: v._id }, { $set: set });
    updated++;
    console.log(`-${DECREMENT} dh/j -> ${v.marque} ${v.modele} (${v.categorie}) : ${v.tarifParJour} -> ${set.tarifParJour ?? v.tarifParJour}`);
  }

  console.log(`\nTotal véhicules mis à jour : ${updated} / ${vehicles.length}`);

  await mongoose.disconnect();
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
