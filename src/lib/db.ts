import mongoose from 'mongoose';

// Enregistrement explicite de tous les modèles pour s'assurer qu'ils sont enregistrés
// auprès de Mongoose dans l'environnement Next.js (Hot Reloading / Serverless)
import '@/models/Client';
import '@/models/Vehicle';
import '@/models/Reservation';
import '@/models/Location';
import '@/models/Payment';
import '@/models/EtatDesLieux';
import '@/models/Maintenance';
import '@/models/Expense';
import '@/models/User';
import '@/models/Agence';
import '@/models/AuditLog';
import '@/models/DocumentSequence';
import '@/models/Notification';
import '@/models/GeneratedDocument';

declare global {
  // eslint-disable-next-line no-var
  var mongooseConnection: {
    conn: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
  };
}

let cached = global.mongooseConnection;

if (!cached) {
  cached = global.mongooseConnection = { conn: null, promise: null };
}

export async function connectDB(): Promise<typeof mongoose> {
  const MONGODB_URI = process.env.MONGODB_URI;
  if (!MONGODB_URI) {
    throw new Error('MONGODB_URI manquant dans les variables d\'environnement.');
  }

  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    };
    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mg) => {
      console.log('✅ MongoDB connecté');
      return mg;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}
