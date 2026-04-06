import { z } from 'zod';

// Regex téléphone Maroc : +212XXXXXXXXX ou 06XXXXXXXX ou 07XXXXXXXX
const marocPhone = z.string().regex(
  /^(\+212|0)(6|7)\d{8}$/,
  'Format téléphone Maroc invalide (ex: +212661234567)'
);

const emptyStringToUndefined = (value: unknown) => {
  if (typeof value !== 'string') return value;
  const trimmed = value.trim();
  return trimmed === '' ? undefined : trimmed;
};

const optionalString = (max: number) => z.preprocess(emptyStringToUndefined, z.string().max(max).optional());
const optionalEmail = z.preprocess(emptyStringToUndefined, z.string().email('Email invalide').optional());
const optionalPhone = z.preprocess(emptyStringToUndefined, marocPhone.optional());
const optionalDate = z.preprocess((value) => (value === '' || value === null ? undefined : value), z.coerce.date().optional());
const optionalUrl = z.preprocess(emptyStringToUndefined, z.string().url().optional());
const optionalDocumentType = z.preprocess(
  emptyStringToUndefined,
  z.enum(['cin', 'passeport', 'titre_sejour']).optional(),
);

export const clientSchema = z.object({
  type: z.enum(['particulier', 'entreprise']),
  nom: z.string().min(1, 'Nom requis').max(100),
  prenom: optionalString(100),
  email: optionalEmail,
  telephone: marocPhone,
  whatsapp: optionalPhone,
  adresse: optionalString(200),
  ville: optionalString(100),
  dateNaissance: optionalDate,
  nationalite: optionalString(50),
  documentType: optionalDocumentType,
  documentNumber: optionalString(50),
  documentExpireLe: optionalDate,
  cinRectoUrl: optionalUrl,
  cinVersoUrl: optionalUrl,
  permisNumero: optionalString(50),
  permisCategorie: optionalString(10),
  permisDelivreLe: optionalDate,
  permisExpireLe: optionalDate,
  permisRectoUrl: optionalUrl,
  permisVersoUrl: optionalUrl,
  entrepriseNom: optionalString(200),
  entrepriseRC: optionalString(50),
  entrepriseSiret: optionalString(50),
  notesInternes: optionalString(2000),
  vip: z.boolean().default(false),
  remiseHabituels: z.number().min(0).max(100).default(0),
});

export const clientUpdateSchema = clientSchema.partial();

export const blacklistSchema = z.object({
  actif: z.boolean(),
  motif: z.string().min(10, 'Motif de blacklist requis (min 10 caractères)').max(500),
});

export type ClientInput = z.infer<typeof clientSchema>;
export type ClientUpdateInput = z.infer<typeof clientUpdateSchema>;
export type BlacklistInput = z.infer<typeof blacklistSchema>;
