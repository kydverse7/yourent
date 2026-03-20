import { Schema, model, models, Document, Types } from 'mongoose';

export interface IMaintenance extends Document {
  vehicle: Types.ObjectId;
  type: 'entretien' | 'vidange' | 'pneus' | 'freins' | 'assurance' | 'vignette' | 'ct' | 'reparation' | 'autre';
  description?: string;
  cout: number;
  fournisseur?: string;
  facturePdfUrl?: string;
  date: Date;
  kmAuMoment?: number;
  prochaineEcheance?: Date;
  prochaineEcheanceKm?: number;
  createdBy?: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const MaintenanceSchema = new Schema<IMaintenance>(
  {
    vehicle: { type: Schema.Types.ObjectId, ref: 'Vehicle', required: true, index: true },
    type: {
      type: String,
      enum: ['entretien', 'vidange', 'pneus', 'freins', 'assurance', 'vignette', 'ct', 'reparation', 'autre'],
      required: true,
    },
    description: String,
    cout: { type: Number, default: 0, min: 0 },
    fournisseur: String,
    facturePdfUrl: String,
    date: { type: Date, default: Date.now, index: true },
    kmAuMoment: Number,
    prochaineEcheance: Date,
    prochaineEcheanceKm: Number,
    createdBy: { type: Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true }
);

export const Maintenance = models.Maintenance || model<IMaintenance>('Maintenance', MaintenanceSchema);
