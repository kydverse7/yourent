#!/usr/bin/env node
/**
 * Seed principal — Yourent
 * Usage : node scripts/seed.mjs
 *
 * Comportement :
 * - garantit l'agence singleton
 * - garantit l'utilisateur admin
 * - remplace intégralement la flotte véhicules par la liste fournie
 */

import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
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

const AgenceSchema = new mongoose.Schema({
  nom: String,
  telephone: String,
  email: String,
  adresse: String,
  ville: String,
  pays: String,
  parametres: {
    devise: String,
    timezone: String,
    cautionObligatoire: Boolean,
    typesCautionAcceptes: [String],
  },
});
const Agence = mongoose.models.Agence ?? mongoose.model('Agence', AgenceSchema);

const UserSchema = new mongoose.Schema({
  prenom: String,
  nom: String,
  email: String,
  passwordHash: String,
  role: String,
  statut: String,
}, { timestamps: true });
const User = mongoose.models.User ?? mongoose.model('User', UserSchema);

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

function slugify(value) {
  return value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

const fleetList = [
  ['AUDI Q3', '25193-T-6'],
  ['A3', '30207-T-1'],
  ['CLIO 4', '162-T-6'],
  ['CLIO 4', '160-T-6'],
  ['CLIO 4', '161-T-6'],
  ['CLIO 4', '163-T-6'],
  ['DUSTER', '158-T-6'],
  ['DUSTER', '16053-T-6'],
  ['DUSTER', '16054-T-6'],
  ['DUSTER', '16055-T-6'],
  ['DUSTER', '16057-T-6'],
  ['DUSTER', '16056-T-6'],
  ['DUSTER', '16058-T-6'],
  ['DUSTER', '16059-T-6'],
  ['DUSTER', '16060-T-6'],
  ['DUSTER', '16061-T-6'],
  ['DUSTER', '16062-T-6'],
  ['FIAT 500', '68175-T-6'],
  ['CORSA', '38208-T-1'],
  ['CORSA', '38202-T-1'],
  ['CORSA', '544502WW'],
  ['COROLLA', '37958-T-1'],
  ['COROLLA', '37932-T-1'],
  ['FIAT 500', '68176-T-6'],
  ['FIAT 500 CABRIOLET', '68177-T-6'],
  ['GOLF 8', '46646-T-6'],
  ['GOLF 8', '47618-T-6'],
  ['GOLF 8', '38242-T-1'],
  ['MERCEDES C 220', '78873-T-6'],
  ['MERCEDES E 220', '62586-T-1'],
  ['MERCEDES CLA', '39202-T-6'],
  ['MERCEDES CLA', '39203-T-6'],
  ['MERCEDES CLA', '43498-T-6'],
  ['MERCEDES CLA', '44608-T-6'],
  ['PORCHE MACAN', '76716WWW'],
  ['PORCHE MACAN', '79911-T-6'],
  ['PORCHE MACAN', '18186-T-6'],
  ['RANGE EVOQUE', '45711-T-6'],
  ['RANGE SPORT', '42360-T-1'],
  ['RANGE SPORT', '91054-T-6'],
  ['TIGUAN', '77556-T-6'],
  ['TIGUAN', '77578-T-6'],
  ['TOUAREG', '38244-T-1'],
  ['TOUAREG', '38245-T-1'],
  ['TOUAREG', '17601-T-6'],
  ['TOUAREG', '43070-T-1'],
  ['TOUAREG', '43238-T-1'],
  ['TOUAREG', '43237-T-1'],
  ['TOUAREG', '43240-T-1'],
  ['TOUAREG', '19877-T-6'],
  ['TOUAREG', '20792-T-6'],
  ['TOUAREG', '20840-T-6'],
  ['TOUAREG', '50063-T-6'],
  ['TOUAREG', '50064-T-6'],
  ['TOUAREG', '50065-T-6'],
  ['TOUAREG', '51466-T-6'],
  ['T-ROC', '48016-T-6'],
  ['T-ROC', '48017-T-6'],
  ['T-ROC', '48018-T-6'],
  ['T-ROC', '48019-T-6'],
];

function normalizeVehicle(label) {
  const normalized = label.trim().toUpperCase();

  const presets = {
    'AUDI Q3': { marque: 'Audi', modele: 'Q3', categorie: 'suv', carburant: 'diesel', boite: 'automatique' },
    A3: { marque: 'Audi', modele: 'A3', categorie: 'berline', carburant: 'essence', boite: 'automatique' },
    'CLIO 4': { marque: 'Renault', modele: 'Clio 4', categorie: 'economique', carburant: 'diesel', boite: 'manuelle' },
    DUSTER: { marque: 'Dacia', modele: 'Duster', categorie: 'suv', carburant: 'diesel', boite: 'manuelle' },
    'FIAT 500': { marque: 'Fiat', modele: '500', categorie: 'economique', carburant: 'essence', boite: 'manuelle' },
    'FIAT 500 CABRIOLET': { marque: 'Fiat', modele: '500 Cabriolet', categorie: 'premium', carburant: 'essence', boite: 'automatique' },
    CORSA: { marque: 'Opel', modele: 'Corsa', categorie: 'economique', carburant: 'essence', boite: 'manuelle' },
    COROLLA: { marque: 'Toyota', modele: 'Corolla', categorie: 'berline', carburant: 'hybride', boite: 'automatique' },
    'GOLF 8': { marque: 'Volkswagen', modele: 'Golf 8', categorie: 'berline', carburant: 'diesel', boite: 'automatique' },
    'MERCEDES C 220': { marque: 'Mercedes', modele: 'C 220', categorie: 'premium', carburant: 'diesel', boite: 'automatique' },
    'MERCEDES E 220': { marque: 'Mercedes', modele: 'E 220', categorie: 'premium', carburant: 'diesel', boite: 'automatique' },
    'MERCEDES CLA': { marque: 'Mercedes', modele: 'CLA', categorie: 'premium', carburant: 'essence', boite: 'automatique' },
    'PORCHE MACAN': { marque: 'Porsche', modele: 'Macan', categorie: 'premium', carburant: 'essence', boite: 'automatique' },
    'RANGE EVOQUE': { marque: 'Range Rover', modele: 'Evoque', categorie: 'premium', carburant: 'diesel', boite: 'automatique' },
    'RANGE SPORT': { marque: 'Range Rover', modele: 'Sport', categorie: 'premium', carburant: 'diesel', boite: 'automatique' },
    TIGUAN: { marque: 'Volkswagen', modele: 'Tiguan', categorie: 'suv', carburant: 'diesel', boite: 'automatique' },
    TOUAREG: { marque: 'Volkswagen', modele: 'Touareg', categorie: 'suv', carburant: 'diesel', boite: 'automatique' },
    'T-ROC': { marque: 'Volkswagen', modele: 'T-Roc', categorie: 'suv', carburant: 'essence', boite: 'automatique' },
  };

  return presets[normalized] ?? {
    marque: normalized,
    modele: normalized,
    categorie: 'economique',
    carburant: 'essence',
    boite: 'manuelle',
  };
}

function buildVariantMeta(label, duplicateIndex) {
  const normalized = label.trim().toUpperCase();

  const colorPresets = {
    'AUDI Q3': ['Gris Daytona', 'Noir Mythic', 'Blanc Glacier'],
    A3: ['Noir', 'Blanc', 'Gris'],
    'CLIO 4': ['Blanc', 'Gris', 'Rouge', 'Bleu'],
    DUSTER: ['Gris Comète', 'Blanc', 'Orange Arizona', 'Noir'],
    'FIAT 500': ['Blanc Nacré', 'Rouge', 'Noir'],
    'FIAT 500 CABRIOLET': ['Rouge', 'Bleu', 'Blanc'],
    CORSA: ['Gris', 'Blanc', 'Noir'],
    COROLLA: ['Blanc', 'Gris Argent', 'Noir'],
    'GOLF 8': ['Gris Lunaire', 'Bleu Atlantique', 'Noir'],
    'MERCEDES C 220': ['Noir Obsidienne', 'Gris Sélénite'],
    'MERCEDES E 220': ['Noir', 'Gris', 'Bleu Nuit'],
    'MERCEDES CLA': ['Blanc Polaire', 'Noir', 'Gris Montagne', 'Rouge'],
    'PORCHE MACAN': ['Noir Intense', 'Gris Volcano', 'Blanc Carrara'],
    'RANGE EVOQUE': ['Blanc Fuji', 'Gris Carpathian'],
    'RANGE SPORT': ['Noir Santorini', 'Gris Eiger', 'Blanc'],
    TIGUAN: ['Gris', 'Blanc', 'Bleu'],
    TOUAREG: ['Noir', 'Gris Quartz', 'Blanc Pur', 'Bleu'],
    'T-ROC': ['Bleu Pétrole', 'Blanc', 'Gris', 'Rouge'],
  };

  const yearPresets = {
    'AUDI Q3': [2022, 2023, 2024],
    A3: [2021, 2022, 2023],
    'CLIO 4': [2019, 2020, 2021, 2022],
    DUSTER: [2021, 2022, 2023, 2024],
    'FIAT 500': [2022, 2023, 2024],
    'FIAT 500 CABRIOLET': [2023, 2024],
    CORSA: [2021, 2022, 2023],
    COROLLA: [2022, 2023, 2024],
    'GOLF 8': [2022, 2023, 2024],
    'MERCEDES C 220': [2021, 2022],
    'MERCEDES E 220': [2021, 2022, 2023],
    'MERCEDES CLA': [2022, 2023, 2024],
    'PORCHE MACAN': [2021, 2022, 2023],
    'RANGE EVOQUE': [2021, 2022],
    'RANGE SPORT': [2021, 2022, 2023],
    TIGUAN: [2022, 2023],
    TOUAREG: [2020, 2021, 2022, 2023],
    'T-ROC': [2022, 2023, 2024],
  };

  const kmBasePresets = {
    'AUDI Q3': 28000,
    A3: 35000,
    'CLIO 4': 52000,
    DUSTER: 41000,
    'FIAT 500': 18000,
    'FIAT 500 CABRIOLET': 16000,
    CORSA: 33000,
    COROLLA: 26000,
    'GOLF 8': 22000,
    'MERCEDES C 220': 47000,
    'MERCEDES E 220': 54000,
    'MERCEDES CLA': 29000,
    'PORCHE MACAN': 31000,
    'RANGE EVOQUE': 36000,
    'RANGE SPORT': 48000,
    TIGUAN: 25000,
    TOUAREG: 43000,
    'T-ROC': 17000,
  };

  const colorPalette = colorPresets[normalized] ?? ['Noir', 'Blanc', 'Gris'];
  const years = yearPresets[normalized] ?? [2022, 2023, 2024];
  const kmBase = kmBasePresets[normalized] ?? 20000;

  return {
    couleur: colorPalette[duplicateIndex % colorPalette.length],
    annee: years[duplicateIndex % years.length],
    kilometrage: kmBase + duplicateIndex * 3700,
  };
}

const agenceExistante = await Agence.findOne();
if (!agenceExistante) {
  await Agence.create({
    nom: 'Yourent',
    telephone: '+212600000000',
    email: 'contact@yourent.ma',
    adresse: 'Casablanca, Maroc',
    ville: 'Casablanca',
    pays: 'Maroc',
    parametres: {
      devise: 'MAD',
      timezone: 'Africa/Casablanca',
      cautionObligatoire: true,
      typesCautionAcceptes: ['cheque', 'carte_empreinte', 'cash'],
    },
  });
  console.log('✅ Agence créée');
} else {
  console.log('ℹ️  Agence déjà existante — conservée');
}

const adminEmail = 'admin@yourent.ma';
const adminExistant = await User.findOne({ email: adminEmail });
if (!adminExistant) {
  const passwordHash = await bcrypt.hash('Admin@2024!', 12);
  await User.create({
    prenom: 'Admin',
    nom: 'Yourent',
    email: adminEmail,
    passwordHash,
    role: 'admin',
    statut: 'actif',
  });
  console.log(`✅ Admin créé → email: ${adminEmail} / mot de passe: Admin@2024!`);
} else {
  console.log('ℹ️  Admin déjà existant — conservé');
}

const existingCount = await Vehicle.countDocuments();
if (existingCount > 0) {
  await Vehicle.deleteMany({});
  console.log(`🗑️  ${existingCount} véhicule(s) supprimé(s)`);
} else {
  console.log('ℹ️  Aucun véhicule existant à supprimer');
}

const duplicateCounters = new Map();

const vehiclesToInsert = fleetList.map(([label, immatriculation], index) => {
  const preset = normalizeVehicle(label);
  const duplicateIndex = duplicateCounters.get(label) ?? 0;
  duplicateCounters.set(label, duplicateIndex + 1);
  const variant = buildVariantMeta(label, duplicateIndex);
  const slugBase = slugify(`${preset.marque}-${preset.modele}-${immatriculation}`);

  return {
    marque: preset.marque,
    modele: preset.modele,
    annee: variant.annee,
    carburant: preset.carburant,
    boite: preset.boite,
    places: 5,
    couleur: variant.couleur,
    categorie: preset.categorie,
    immatriculation: immatriculation.toUpperCase(),
    kilometrage: variant.kilometrage,
    options: [],
    statut: 'disponible',
    slug: `${slugBase}-${index + 1}`,
    photos: [],
    description: `${preset.marque} ${preset.modele}`,
    tarifParJour: 0,
    tarifParJour10Plus: 0,
    tarifParJour15Plus: 0,
    tarifParJour30Plus: 0,
    cautionDefaut: 0,
    isPublic: true,
  };
});

await Vehicle.insertMany(vehiclesToInsert, { ordered: true });
console.log(`✅ ${vehiclesToInsert.length} véhicule(s) importé(s)`);

await mongoose.disconnect();
console.log('\n🎉 Seed terminé avec succès !');
