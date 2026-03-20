import { Schema, model, models, Document, Types } from 'mongoose';

export interface IReservation extends Document {
  vehicle: Types.ObjectId;
  client?: Types.ObjectId;
  clientInline?: { nom: string; prenom?: string; telephone: string; email?: string };
  createdBy?: Types.ObjectId;
  canal: 'interne' | 'public' | 'telephonique';
  statut: 'en_attente' | 'confirmee' | 'refusee' | 'en_cours' | 'terminee' | 'annulee';
  debutAt: Date;
  finAt: Date;
  heureDepart?: string;
  heureRetour?: string;
  lieuDepart?: string;
  lieuRetour?: string;
  prix: {
    parJour: number;
    palier: 'standard' | '10Plus' | '15Plus' | '30Plus';
    totalEstime: number;
    remise: number;
    remiseRaison?: string;
  };
  paiementStatut: 'paye' | 'partiel' | 'plus_tard';
  montantPaye: number;
  montantRestant: number;
  typePaiement?: 'especes' | 'carte' | 'virement' | 'cheque';
  caution?: { montant: number; statut: 'paye' | 'en_attente' | 'partiel' };
  optionsSupplementaires: Array<{ nom: string; prix: number }>;
  conducteurSecondaire?: { nom: string; prenom: string; permisNumero: string };
  retardMinutes: number;
  contratNumero?: string;
  contratPdfUrl?: string;
  factureNumero?: string;
  facturePdfUrl?: string;
  signatureClientUrl?: string;
  etatDesLieuxId?: Types.ObjectId;
  location?: Types.ObjectId;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

const ReservationSchema = new Schema<IReservation>(
  {
    vehicle: { type: Schema.Types.ObjectId, ref: 'Vehicle', required: true, index: true },
    client: { type: Schema.Types.ObjectId, ref: 'Client', index: true },
    clientInline: {
      nom: String,
      prenom: String,
      telephone: String,
      email: String,
    },
    createdBy: { type: Schema.Types.ObjectId, ref: 'User' },
    canal: { type: String, enum: ['interne', 'public', 'telephonique'], default: 'interne' },
    statut: {
      type: String,
      enum: ['en_attente', 'confirmee', 'refusee', 'en_cours', 'terminee', 'annulee'],
      default: 'en_attente',
      index: true,
    },
    debutAt: { type: Date, required: true, index: true },
    finAt: { type: Date, required: true },
    heureDepart: String,
    heureRetour: String,
    lieuDepart: String,
    lieuRetour: String,
    prix: {
      parJour: { type: Number, default: 0 },
      palier: { type: String, enum: ['standard', '10Plus', '15Plus', '30Plus'], default: 'standard' },
      totalEstime: { type: Number, default: 0 },
      remise: { type: Number, default: 0 },
      remiseRaison: String,
    },
    paiementStatut: {
      type: String,
      enum: ['paye', 'partiel', 'plus_tard'],
      default: 'plus_tard',
    },
    montantPaye: { type: Number, default: 0 },
    montantRestant: { type: Number, default: 0 },
    typePaiement: { type: String, enum: ['especes', 'carte', 'virement', 'cheque'] },
    caution: {
      montant: Number,
      statut: { type: String, enum: ['paye', 'en_attente', 'partiel'] },
    },
    optionsSupplementaires: [{ nom: String, prix: Number }],
    conducteurSecondaire: {
      nom: String,
      prenom: String,
      permisNumero: String,
    },
    retardMinutes: { type: Number, default: 0 },
    contratNumero: { type: String, trim: true },
    contratPdfUrl: String,
    factureNumero: { type: String, trim: true },
    facturePdfUrl: String,
    signatureClientUrl: String,
    etatDesLieuxId: { type: Schema.Types.ObjectId, ref: 'EtatDesLieux' },
    location: { type: Schema.Types.ObjectId, ref: 'Location' },
    notes: String,
  },
  { timestamps: true }
);

ReservationSchema.index({ vehicle: 1, statut: 1, debutAt: 1, finAt: 1 });
ReservationSchema.index({ canal: 1, statut: 1 });

export const Reservation = models.Reservation || model<IReservation>('Reservation', ReservationSchema);
