import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

await mongoose.connect(process.env.MONGODB_URI);
const r = await mongoose.connection.db.collection('agences').updateMany({}, { $set: { telephone: '+212661236231' } });
console.log('Agences modifiées:', r.modifiedCount);
await mongoose.disconnect();
