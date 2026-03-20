import { Schema, model, models, Document, Types } from 'mongoose';

export interface IEtatDesLieux extends Document {
  vehicle: Types.ObjectId;
  location: Types.ObjectId;
  moment: 'avant' | 'apres';
  kmReleve?: number;
  niveauCarburant?: 'vide' | '1/4' | '1/2' | '3/4' | 'plein';
  proprete?: 'sale' | 'moyen' | 'propre' | 'tres_propre';
  schemaPoints: Array<{
    zone: string;
    x: number;
    y: number;
    note?: string;
    severite: 'scratch' | 'bosse' | 'bris' | 'autre';
    photos: string[];
  }>;
  photos: string[];
  remarques?: string;
  signatureDataUrl?: string;
  signePar?: string;
  signeLe?: Date;
  createdBy?: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const EtatDesLieuxSchema = new Schema<IEtatDesLieux>(
  {
    vehicle: { type: Schema.Types.ObjectId, ref: 'Vehicle', required: true },
    location: { type: Schema.Types.ObjectId, ref: 'Location', required: true, index: true },
    moment: { type: String, enum: ['avant', 'apres'], required: true },
    kmReleve: Number,
    niveauCarburant: { type: String, enum: ['vide', '1/4', '1/2', '3/4', 'plein'] },
    proprete: { type: String, enum: ['sale', 'moyen', 'propre', 'tres_propre'] },
    schemaPoints: [
      {
        zone: String,
        x: Number,
        y: Number,
        note: String,
        severite: { type: String, enum: ['scratch', 'bosse', 'bris', 'autre'] },
        photos: [String],
      },
    ],
    photos: [String],
    remarques: String,
    signatureDataUrl: String,
    signePar: String,
    signeLe: Date,
    createdBy: { type: Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true }
);

export const EtatDesLieux = models.EtatDesLieux || model<IEtatDesLieux>('EtatDesLieux', EtatDesLieuxSchema);
