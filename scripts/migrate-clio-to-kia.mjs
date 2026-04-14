#!/usr/bin/env node
/**
 * Migration ciblée : supprime les Clio 4, ajoute 2 Kia Sorento 2026
 * Usage : node scripts/migrate-clio-to-kia.mjs
 */

import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });
dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
  console.error('❌ MONGODB_URI manquant dans .env');
  process.exit(1);
}

await mongoose.connect(MONGODB_URI);
console.log('✅ Connecté à MongoDB');

const VehicleSchema = new mongoose.Schema({
  marque: String,
  modele: String,
  annee: Number,
  carburant: String,
  boite: String,
  places: Number,
  couleur: String,
  categorie: String,
  immatriculation: String,
  kilometrage: Number,
  options: [String],
  statut: String,
  slug: String,
  photos: [String],
  backgroundPhoto: String,
  photoModele: String,
  description: String,
  tarifParJour: Number,
  tarifParJour10Plus: Number,
  tarifParJour15Plus: Number,
  tarifParJour30Plus: Number,
  cautionDefaut: Number,
  alerts: {
    vidangeAtKm: Number,
    assuranceExpireLe: Date,
    controleTechniqueExpireLe: Date,
  },
  isPublic: Boolean,
}, { timestamps: true, strict: true });

const Vehicle = mongoose.models.Vehicle ?? mongoose.model('Vehicle', VehicleSchema);

// ── 1. Supprimer toutes les Clio ──
const deleted = await Vehicle.deleteMany({ modele: { $regex: /clio/i } });
console.log(`🗑️  ${deleted.deletedCount} Clio supprimée(s)`);

// ── 2. Ajouter 2 Kia Sorento 2026 (prix = T-Roc) ──
const kiaSorentos = [
  {
    marque: 'Kia',
    modele: 'Sorento',
    annee: 2026,
    carburant: 'diesel',
    boite: 'automatique',
    places: 5,
    couleur: 'Noir',
    categorie: 'suv',
    immatriculation: '162-T-6',
    kilometrage: 5000,
    options: [],
    statut: 'disponible',
    slug: 'kia-sorento-162-t-6',
    photos: ['/kia-sorento.png'],
    backgroundPhoto: '/kia-sorento.png',
    photoModele: '/kia-sorento.png',
    description: 'Kia Sorento',
    tarifParJour: 720,
    tarifParJour10Plus: 650,
    tarifParJour15Plus: 620,
    tarifParJour30Plus: 580,
    cautionDefaut: 8000,
    isPublic: true,
  },
  {
    marque: 'Kia',
    modele: 'Sorento',
    annee: 2026,
    carburant: 'diesel',
    boite: 'automatique',
    places: 5,
    couleur: 'Blanc',
    categorie: 'suv',
    immatriculation: '160-T-6',
    kilometrage: 8700,
    options: [],
    statut: 'disponible',
    slug: 'kia-sorento-160-t-6',
    photos: ['/kia-sorento.png'],
    backgroundPhoto: '/kia-sorento.png',
    photoModele: '/kia-sorento.png',
    description: 'Kia Sorento',
    tarifParJour: 720,
    tarifParJour10Plus: 650,
    tarifParJour15Plus: 620,
    tarifParJour30Plus: 580,
    cautionDefaut: 8000,
    isPublic: true,
  },
];

const inserted = await Vehicle.insertMany(kiaSorentos);
console.log(`✅ ${inserted.length} Kia Sorento ajoutée(s)`);

await mongoose.disconnect();
console.log('\n🎉 Migration terminée !');
