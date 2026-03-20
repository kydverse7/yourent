import { z } from 'zod';

// Regex téléphone Maroc : +212XXXXXXXXX ou 06XXXXXXXX ou 07XXXXXXXX
const marocPhone = z.string().regex(
  /^(\+212|0)(6|7)\d{8}$/,
  'Format téléphone Maroc invalide (ex: +212661234567)'
);

export const clientSchema = z.object({
  type: z.enum(['particulier', 'entreprise']),
  nom: z.string().min(1, 'Nom requis').max(100),
  prenom: z.string().max(100).optional(),
  email: z.string().email('Email invalide').optional().or(z.literal('')),
  telephone: marocPhone,
  whatsapp: marocPhone.optional().or(z.literal('')),
  adresse: z.string().max(200).optional(),
  ville: z.string().max(100).optional(),
  dateNaissance: z.coerce.date().optional(),
  nationalite: z.string().max(50).optional(),
  documentType: z.enum(['cin', 'passeport', 'titre_sejour']).optional(),
  documentNumber: z.string().max(50).optional(),
  documentExpireLe: z.coerce.date().optional(),
  cinRectoUrl: z.string().url().optional(),
  cinVersoUrl: z.string().url().optional(),
  permisNumero: z.string().max(50).optional(),
  permisCategorie: z.string().max(10).optional(),
  permisDelivreLe: z.coerce.date().optional(),
  permisExpireLe: z.coerce.date().optional(),
  permisRectoUrl: z.string().url().optional(),
  permisVersoUrl: z.string().url().optional(),
  entrepriseNom: z.string().max(200).optional(),
  entrepriseRC: z.string().max(50).optional(),
  entrepriseSiret: z.string().max(50).optional(),
  notesInternes: z.string().max(2000).optional(),
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
