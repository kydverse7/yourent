import { Schema, model, models, Document, Types } from 'mongoose';

export interface IExpense extends Document {
  type: 'carburant' | 'lavage' | 'parking' | 'amende' | 'peage' | 'publicite' | 'logiciel' | 'loyer' | 'salaire' | 'maintenance' | 'assurance' | 'controle_technique' | 'autre';
  montant: number;
  date: Date;
  note?: string;
  vehicleId?: Types.ObjectId;
  fournisseur?: string;
  factureUrl?: string;
  sourceModule?: 'manual' | 'alertes';
  linkedType?: 'ct' | 'assurance' | 'vidange';
  isRecurring?: boolean;
  recurrenceFrequency?: 'monthly' | 'quarterly' | 'yearly' | 'custom';
  recurrenceNextDate?: Date;
  recurrenceLabel?: string;
  createdBy?: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const ExpenseSchema = new Schema<IExpense>(
  {
    type: {
      type: String,
      enum: ['carburant', 'lavage', 'parking', 'amende', 'peage', 'publicite', 'logiciel', 'loyer', 'salaire', 'maintenance', 'assurance', 'controle_technique', 'autre'],
      required: true,
    },
    montant: { type: Number, required: true, min: 0 },
    date: { type: Date, default: Date.now, index: true },
    note: String,
    vehicleId: { type: Schema.Types.ObjectId, ref: 'Vehicle', index: true },
    fournisseur: String,
    factureUrl: String,
    sourceModule: { type: String, enum: ['manual', 'alertes'], default: 'manual' },
    linkedType: { type: String, enum: ['ct', 'assurance', 'vidange'] },
    isRecurring: { type: Boolean, default: false },
    recurrenceFrequency: { type: String, enum: ['monthly', 'quarterly', 'yearly', 'custom'] },
    recurrenceNextDate: Date,
    recurrenceLabel: String,
    createdBy: { type: Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true }
);

export const Expense = models.Expense || model<IExpense>('Expense', ExpenseSchema);
