import { Schema, model, models, Document } from 'mongoose';

export interface IDocumentSequence extends Document {
  documentType: 'contract' | 'invoice';
  period: string;
  lastValue: number;
  createdAt: Date;
  updatedAt: Date;
}

const DocumentSequenceSchema = new Schema<IDocumentSequence>(
  {
    documentType: {
      type: String,
      enum: ['contract', 'invoice'],
      required: true,
      index: true,
    },
    period: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    lastValue: {
      type: Number,
      default: 0,
      min: 0,
    },
  },
  { timestamps: true }
);

DocumentSequenceSchema.index({ documentType: 1, period: 1 }, { unique: true });

export const DocumentSequence =
  models.DocumentSequence || model<IDocumentSequence>('DocumentSequence', DocumentSequenceSchema);
