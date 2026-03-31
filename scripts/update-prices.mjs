import 'dotenv/config';
import mongoose from 'mongoose';

async function run() {
  await mongoose.connect(process.env.MONGODB_URI);
  const Vehicle = mongoose.connection.collection('vehicles');

  const touaregResult = await Vehicle.updateMany(
    { marque: /volkswagen/i, modele: /touareg/i },
    { $set: { tarifParJour: 1000, tarifParJour10Plus: 900 } }
  );
  console.log('Touareg updated:', touaregResult.modifiedCount, '/', touaregResult.matchedCount);

  const dusterResult = await Vehicle.updateMany(
    { marque: /dacia/i, modele: /duster/i },
    { $set: { tarifParJour: 400, tarifParJour10Plus: 350 } }
  );
  console.log('Duster updated:', dusterResult.modifiedCount, '/', dusterResult.matchedCount);

  await mongoose.disconnect();
}

run().catch(e => { console.error(e); process.exit(1); });
