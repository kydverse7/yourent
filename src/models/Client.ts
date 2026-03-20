import { Schema, model, models, Document, Types } from 'mongoose';

export interface IClient extends Document {
  type: 'particulier' | 'entreprise';
  nom: string;
  prenom?: string;
  email?: string;
  telephone: string;
  whatsapp?: string;
  adresse?: string;
  ville?: string;
  dateNaissance?: Date;
  nationalite?: string;
  documentType?: 'cin' | 'passeport' | 'titre_sejour';
  documentNumber?: string;
  documentExpireLe?: Date;
  cinRectoUrl?: string;
  cinVersoUrl?: string;
  permisNumero?: string;
  permisCategorie?: string;
  permisDelivreLe?: Date;
  permisExpireLe?: Date;
  permisRectoUrl?: string;
  permisVersoUrl?: string;
  entrepriseNom?: string;
  entrepriseRC?: string;
  entrepriseSiret?: string;
  notesInternes?: string;
  vip: boolean;
  actif: boolean;  // soft-delete
  remiseHabituels: number;
  blacklist: {
    actif: boolean;
    motif?: string;
    dateBlacklist?: Date;
    blacklistedBy?: Types.ObjectId;
  };
  stats: {
    totalLocations: number;
    totalDepenses: number;
    derniereLouage?: Date;
    noteGlobale?: number;
  };
  createdAt: Date;
  updatedAt: Date;
}

const ClientSchema = new Schema<IClient>(
  {
    type: { type: String, enum: ['particulier', 'entreprise'], required: true },
    nom: { type: String, required: true, trim: true },
    prenom: { type: String, trim: true },
    email: { type: String, trim: true, lowercase: true },
    telephone: { type: String, required: true, index: true },
    whatsapp: String,
    adresse: String,
    ville: String,
    dateNaissance: Date,
    nationalite: String,
    documentType: { type: String, enum: ['cin', 'passeport', 'titre_sejour'] },
    documentNumber: String,
    documentExpireLe: Date,
    cinRectoUrl: String,
    cinVersoUrl: String,
    permisNumero: String,
    permisCategorie: String,
    permisDelivreLe: Date,
    permisExpireLe: Date,
    permisRectoUrl: String,
    permisVersoUrl: String,
    entrepriseNom: String,
    entrepriseRC: String,
    entrepriseSiret: String,
    notesInternes: String,
    vip: { type: Boolean, default: false, index: true },
    actif: { type: Boolean, default: true, index: true },
    remiseHabituels: { type: Number, default: 0, min: 0, max: 100 },
    blacklist: {
      actif: { type: Boolean, default: false },
      motif: String,
      dateBlacklist: Date,
      blacklistedBy: { type: Schema.Types.ObjectId, ref: 'User' },
    },
    stats: {
      totalLocations: { type: Number, default: 0 },
      totalDepenses: { type: Number, default: 0 },
      derniereLouage: Date,
      noteGlobale: { type: Number, min: 1, max: 5 },
    },
  },
  { timestamps: true }
);

ClientSchema.index({ nom: 'text', prenom: 'text', email: 'text', telephone: 'text', documentNumber: 'text' });
ClientSchema.index({ 'blacklist.actif': 1 });

export const Client = models.Client || model<IClient>('Client', ClientSchema);
