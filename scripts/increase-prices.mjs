import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config({ path: '.env.local' });
dotenv.config();

const TARIF_FIELDS = ['tarifParJour', 'tarifParJour10Plus', 'tarifParJour15Plus', 'tarifParJour30Plus'];

function getIncrement(vehicle) {
  const marque = (vehicle.marque || '').toLowerCase();
  const modele = (vehicle.modele || '').toLowerCase();
  const categorie = vehicle.categorie;

  // "Grand" haut de gamme : Porsche, Mercedes, Volkswagen Touareg -> +200 dh/jour
  if (categorie === 'premium' || marque.includes('porsche') || marque.includes('mercedes') || modele.includes('touareg')) {
    return 200;
  }

  // Économique (Fiat 500, Opel Corsa, etc.) -> pas de changement
  if (categorie === 'economique') {
    return 0;
  }

  // Gamme au-dessus (berline, suv hors Touareg, utilitaire) -> +100 dh/jour
  return 100;
}

async function run() {
  await mongoose.connect(process.env.MONGODB_URI);
  const Vehicle = mongoose.connection.collection('vehicles');

  const vehicles = await Vehicle.find({}).toArray();
  const ops = [];

  for (const v of vehicles) {
    const increment = getIncrement(v);
    if (increment === 0) continue;

    const set = {};
    for (const field of TARIF_FIELDS) {
      const current = v[field];
      if (typeof current === 'number' && current > 0) {
        set[field] = current + increment;
      }
    }
    if (Object.keys(set).length === 0) continue;

    ops.push({
      updateOne: {
        filter: { _id: v._id },
        set,
        increment,
      },
    });
  }

  const dryRun = process.argv.includes('--dry-run');

  for (const op of ops) {
    const { filter, set } = op.updateOne;
    if (!dryRun) {
      await Vehicle.updateOne(filter, { $set: set });
    }
    const v = vehicles.find((x) => String(x._id) === String(filter._id));
    console.log(`+${op.updateOne.increment} dh/j -> ${v.marque} ${v.modele} (${v.categorie}) : ${v.tarifParJour} -> ${set.tarifParJour ?? v.tarifParJour}`);
  }

  if (dryRun) console.log('\n[DRY RUN] Aucune écriture effectuée.');

  console.log(`\nTotal véhicules mis à jour : ${ops.length} / ${vehicles.length}`);

  await mongoose.disconnect();
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
