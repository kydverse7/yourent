import { Schema, model, models, Document } from 'mongoose';

/**
 * Modèle Agence — SINGLETON
 * ⚠️ Il ne doit JAMAIS y avoir plus d'un document dans cette collection.
 * Mono-agence uniquement. Pas de multi-tenant.
 */
export interface IAgence extends Document {
  nom: string;
  logoUrl?: string;
  adresse?: string;
  ville?: string;
  pays: string;
  telephone?: string;
  email?: string;
  siteWeb?: string;
  ice?: string; // Identifiant Commun de l'Entreprise (Maroc)
  rc?: string;  // Registre du Commerce
  parametres: {
    devise: string;
    timezone: string;
    kmInclus: number;
    fraisKmSupp: number;
    cautionObligatoire: boolean;
    typesCautionAcceptes: string[];
    nbJoursGrace: number;
    conditionsGenerales?: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

const AgenceSchema = new Schema<IAgence>(
  {
    nom: { type: String, required: true, trim: true },
    logoUrl: String,
    adresse: String,
    ville: String,
    pays: { type: String, default: 'Maroc' },
    telephone: String,
    email: { type: String, lowercase: true },
    siteWeb: String,
    ice: String,
    rc: String,
    parametres: {
      devise: { type: String, default: 'MAD' },
      timezone: { type: String, default: 'Africa/Casablanca' },
      kmInclus: { type: Number, default: 0 },
      fraisKmSupp: { type: Number, default: 0 },
      cautionObligatoire: { type: Boolean, default: true },
      typesCautionAcceptes: {
        type: [String],
        default: ['cheque', 'carte_empreinte', 'cash'],
      },
      nbJoursGrace: { type: Number, default: 1 },
      conditionsGenerales: String,
    },
  },
  { timestamps: true }
);

export const Agence = models.Agence || model<IAgence>('Agence', AgenceSchema);
