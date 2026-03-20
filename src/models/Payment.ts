import { Schema, model, models, Document, Types } from 'mongoose';

type PaymentType = 'especes' | 'carte' | 'virement' | 'cheque';
type PaymentCategorie =
  | 'location'
  | 'supplement'
  | 'remise'
  | 'caution'
  | 'caution_restitution'
  | 'autre';
type PaymentStatut = 'effectue' | 'en_attente' | 'annule';

export interface IPayment extends Document {
  location?: Types.ObjectId;
  reservation?: Types.ObjectId;
  type: PaymentType;
  /**
   * ⚠️ RÈGLE ABSOLUE : les catégories 'caution' et 'caution_restitution'
   * sont EXCLUS de TOUS les calculs financiers (CA, marges, graphiques, exports).
   * La caution est une garantie, PAS un revenu.
   * Filtrer systématiquement : { categorie: { $nin: ['caution', 'caution_restitution'] } }
   */
  categorie: PaymentCategorie;
  montant: number; // négatif pour restitutions
  statut: PaymentStatut;
  reference?: string;
  notes?: string;
  createdBy?: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const PaymentSchema = new Schema<IPayment>(
  {
    location: { type: Schema.Types.ObjectId, ref: 'Location', index: true },
    reservation: { type: Schema.Types.ObjectId, ref: 'Reservation', index: true },
    type: {
      type: String,
      enum: ['especes', 'carte', 'virement', 'cheque'],
      required: true,
    },
    categorie: {
      type: String,
      enum: ['location', 'supplement', 'remise', 'caution', 'caution_restitution', 'autre'],
      required: true,
      index: true,
    },
    montant: { type: Number, required: true },
    statut: {
      type: String,
      enum: ['effectue', 'en_attente', 'annule'],
      default: 'effectue',
      index: true,
    },
    reference: { type: String, trim: true },
    notes: String,
    createdBy: { type: Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true }
);

// Index pour les rapports financiers (toujours exclure caution dans les requêtes)
PaymentSchema.index({ categorie: 1, statut: 1, createdAt: -1 });
PaymentSchema.index({ createdAt: -1 });

export const Payment = models.Payment || model<IPayment>('Payment', PaymentSchema);
