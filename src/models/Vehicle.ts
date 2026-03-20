import mongoose, { Schema, model, models, Document, Types } from 'mongoose';

export interface IVehicle extends Document {
  marque: string;
  modele: string;
  annee?: number;
  carburant: 'diesel' | 'essence' | 'hybride' | 'electrique';
  boite: 'manuelle' | 'automatique';
  places: number;
  couleur?: string;
  categorie: 'economique' | 'berline' | 'suv' | 'premium' | 'utilitaire';
  immatriculation: string;
  kilometrage: number;
  puissance?: number;
  options: string[];
  statut: 'disponible' | 'loue' | 'reserve' | 'maintenance';
  slug: string;
  photos: string[];
  backgroundPhoto?: string;
  photoModele?: string;
  description?: string;
  tarifParJour: number;
  tarifParJour10Plus: number;
  tarifParJour15Plus: number;
  tarifParJour30Plus: number;
  cautionDefaut: number;
  alerts: {
    vidangeAtKm?: number;
    assuranceExpireLe?: Date;
    assuranceCompagnie?: string;
    vignetteExpireLe?: Date;
    controleTechniqueExpireLe?: Date;
    visiteAssuranceExpireLe?: Date;
  };
  contrats: {
    assuranceNumero?: string;
    assuranceExpireLe?: Date;
  };
  isPublic: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const VehicleSchema = new Schema<IVehicle>(
  {
    marque: { type: String, required: true, trim: true },
    modele: { type: String, required: true, trim: true },
    annee: { type: Number, min: 1990, max: new Date().getFullYear() + 2 },
    carburant: {
      type: String,
      enum: ['diesel', 'essence', 'hybride', 'electrique'],
      required: true,
    },
    boite: { type: String, enum: ['manuelle', 'automatique'], required: true },
    places: { type: Number, default: 5, min: 1, max: 9 },
    couleur: { type: String, trim: true },
    categorie: {
      type: String,
      enum: ['economique', 'berline', 'suv', 'premium', 'utilitaire'],
      required: true,
    },
    immatriculation: { type: String, required: true, unique: true, uppercase: true, trim: true },
    kilometrage: { type: Number, default: 0, min: 0 },
    puissance: { type: Number, min: 0 },
    options: [{ type: String }],
    statut: {
      type: String,
      enum: ['disponible', 'loue', 'reserve', 'maintenance'],
      default: 'disponible',
      index: true,
    },
    slug: { type: String, unique: true, lowercase: true, trim: true },
    photos: [{ type: String }],
    backgroundPhoto: { type: String },
    photoModele: { type: String },
    description: { type: String },
    tarifParJour: { type: Number, default: 0, min: 0 },
    tarifParJour10Plus: { type: Number, default: 0, min: 0 },
    tarifParJour15Plus: { type: Number, default: 0, min: 0 },
    tarifParJour30Plus: { type: Number, default: 0, min: 0 },
    cautionDefaut: { type: Number, default: 0, min: 0 },
    alerts: {
      vidangeAtKm: Number,
      assuranceExpireLe: Date,
      assuranceCompagnie: String,
      vignetteExpireLe: Date,
      controleTechniqueExpireLe: Date,
      visiteAssuranceExpireLe: Date,
    },
    contrats: {
      assuranceNumero: String,
      assuranceExpireLe: Date,
    },
    isPublic: { type: Boolean, default: true, index: true },
  },
  { timestamps: true }
);

// Index composites
VehicleSchema.index({ statut: 1, isPublic: 1 });
VehicleSchema.index({ categorie: 1, statut: 1 });
VehicleSchema.index({ marque: 'text', modele: 'text', immatriculation: 'text' });

// Génération auto du slug si absent
VehicleSchema.pre('save', async function () {
  if (!this.slug) {
    this.slug = `${this.marque}-${this.modele}-${this.immatriculation}`
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9-]/g, '');
  }
});

export const Vehicle = models.Vehicle || model<IVehicle>('Vehicle', VehicleSchema);
