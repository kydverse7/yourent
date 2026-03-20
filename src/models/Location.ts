import { Schema, model, models, Document, Types } from 'mongoose';

export interface ILocation extends Document {
  reservation?: Types.ObjectId;
  vehicle: Types.ObjectId;
  client: Types.ObjectId;
  statut: 'en_cours' | 'terminee' | 'annulee';
  debutAt: Date;
  finPrevueAt: Date;
  finReelleAt?: Date;
  kmDepart?: number;
  kmRetour?: number;
  kmParcourus?: number;
  fraisKmSupp: number;
  prolongations: Array<{
    nouvelleFin: Date;
    montantSup: number;
    raison?: string;
    date: Date;
    approuvePar?: Types.ObjectId;
  }>;
  tarifJour: number;
  nbJours: number;
  palier: 'standard' | '10Plus';
  remise: number;
  optionsTotal: number;
  montantTotal: number;
  montantPaye: number;
  montantRestant: number;
  paiementStatut: 'paye' | 'partiel' | 'en_attente';
  caution: {
    montant: number;
    typePrise?: 'cheque' | 'carte_empreinte' | 'cash';
    referenceDoc?: string;
    statut: 'en_attente' | 'prise' | 'restituee_partiel' | 'restituee_total';
  };
  paiements: Types.ObjectId[];
  contratNumero?: string;
  contratPdfUrl?: string;
  factureNumero?: string;
  facturePdfUrl?: string;
  etatDesLieuxAvantId?: Types.ObjectId;
  etatDesLieuxApresId?: Types.ObjectId;
  evaluation?: {
    note: number;
    commentaire?: string;
    date: Date;
  };
  createdAt: Date;
  updatedAt: Date;
}

const LocationSchema = new Schema<ILocation>(
  {
    reservation: { type: Schema.Types.ObjectId, ref: 'Reservation' },
    vehicle: { type: Schema.Types.ObjectId, ref: 'Vehicle', required: true, index: true },
    client: { type: Schema.Types.ObjectId, ref: 'Client', required: true, index: true },
    statut: {
      type: String,
      enum: ['en_cours', 'terminee', 'annulee'],
      default: 'en_cours',
      index: true,
    },
    debutAt: { type: Date, required: true },
    finPrevueAt: { type: Date, required: true },
    finReelleAt: Date,
    kmDepart: Number,
    kmRetour: Number,
    kmParcourus: Number,
    fraisKmSupp: { type: Number, default: 0 },
    prolongations: [
      {
        nouvelleFin: Date,
        montantSup: Number,
        raison: String,
        date: { type: Date, default: Date.now },
        approuvePar: { type: Schema.Types.ObjectId, ref: 'User' },
      },
    ],
    tarifJour: { type: Number, default: 0 },
    nbJours: { type: Number, default: 1 },
    palier: { type: String, enum: ['standard', '10Plus'], default: 'standard' },
    remise: { type: Number, default: 0 },
    optionsTotal: { type: Number, default: 0 },
    montantTotal: { type: Number, required: true, default: 0 },
    montantPaye: { type: Number, default: 0 },
    montantRestant: { type: Number, default: 0 },
    paiementStatut: {
      type: String,
      enum: ['paye', 'partiel', 'en_attente'],
      default: 'en_attente',
    },
    caution: {
      montant: { type: Number, default: 0 },
      typePrise: { type: String, enum: ['cheque', 'carte_empreinte', 'cash'] },
      referenceDoc: String,
      statut: {
        type: String,
        enum: ['en_attente', 'prise', 'restituee_partiel', 'restituee_total'],
        default: 'en_attente',
      },
    },
    paiements: [{ type: Schema.Types.ObjectId, ref: 'Payment' }],
    contratNumero: { type: String, trim: true },
    contratPdfUrl: String,
    factureNumero: { type: String, trim: true },
    facturePdfUrl: String,
    etatDesLieuxAvantId: { type: Schema.Types.ObjectId, ref: 'EtatDesLieux' },
    etatDesLieuxApresId: { type: Schema.Types.ObjectId, ref: 'EtatDesLieux' },
    evaluation: {
      note: { type: Number, min: 1, max: 5 },
      commentaire: String,
      date: Date,
    },
  },
  { timestamps: true }
);

LocationSchema.index({ statut: 1, debutAt: -1 });
LocationSchema.index({ vehicle: 1, statut: 1 });

export const Location = models.Location || model<ILocation>('Location', LocationSchema);
