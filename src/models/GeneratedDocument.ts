import { Schema, model, models, Document, Types } from 'mongoose';

export interface IGeneratedDocument extends Document {
  reference: string;
  documentType: 'facture' | 'devis';
  client?: Types.ObjectId;
  clientSnapshot: {
    nomComplet: string;
    telephone?: string;
    email?: string;
  };
  vehicles: Array<{
    vehicle?: Types.ObjectId;
    label: string;
    immatriculation?: string;
  }>;
  pdfUrl: string;
  totalMontant: number;
  devise: string;
  notes?: string;
  createdBy?: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const GeneratedDocumentSchema = new Schema<IGeneratedDocument>(
  {
    reference: { type: String, required: true, unique: true, trim: true, index: true },
    documentType: { type: String, enum: ['facture', 'devis'], required: true, index: true },
    client: { type: Schema.Types.ObjectId, ref: 'Client', index: true },
    clientSnapshot: {
      nomComplet: { type: String, required: true },
      telephone: String,
      email: String,
    },
    vehicles: {
      type: [
        new Schema(
          {
            vehicle: { type: Schema.Types.ObjectId, ref: 'Vehicle' },
            label: { type: String, required: true },
            immatriculation: String,
          },
          { _id: false }
        ),
      ],
      default: [],
    },
    pdfUrl: { type: String, required: true },
    totalMontant: { type: Number, required: true, min: 0 },
    devise: { type: String, default: 'MAD' },
    notes: String,
    createdBy: { type: Schema.Types.ObjectId, ref: 'User', index: true },
  },
  { timestamps: true }
);

GeneratedDocumentSchema.index({ createdAt: -1 });
GeneratedDocumentSchema.index({ documentType: 1, createdAt: -1 });

export const GeneratedDocument =
  models.GeneratedDocument || model<IGeneratedDocument>('GeneratedDocument', GeneratedDocumentSchema);