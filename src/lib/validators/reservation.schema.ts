import { z } from 'zod';
import { MIN_RESERVATION_DAYS } from '@/lib/constants';
import { calcNbJours } from '@/lib/utils';

// Schéma de base (sans refine) pour pouvoir appliquer .partial() sur les mises à jour
const reservationBaseSchema = z.object({
  vehicleId: z.string().min(1, 'Véhicule requis'),
  clientId: z.string().optional(),
  clientInline: z
    .object({
      nom: z.string().min(1),
      prenom: z.string().optional(),
      telephone: z.string().min(8),
      email: z.string().email().optional().or(z.literal('')),
    })
    .optional(),
  canal: z.enum(['interne', 'public', 'telephonique']).default('interne'),
  debutAt: z.coerce.date(),
  finAt: z.coerce.date(),
  heureDepart: z
    .string()
    .regex(/^\d{2}:\d{2}$/)
    .optional(),
  heureRetour: z
    .string()
    .regex(/^\d{2}:\d{2}$/)
    .optional(),
  lieuDepart: z.string().max(200).optional(),
  lieuRetour: z.string().max(200).optional(),
  remise: z.number().min(0).default(0),
  remiseRaison: z.string().max(200).optional(),
  optionsSupplementaires: z
    .array(z.object({ nom: z.string(), prix: z.number().min(0) }))
    .default([]),
  conducteurSecondaire: z
    .object({
      nom: z.string(),
      prenom: z.string(),
      permisNumero: z.string(),
    })
    .optional(),
  notes: z.string().max(1000).optional(),
  typePaiement: z.enum(['especes', 'carte', 'virement', 'cheque']).optional(),
  montantPaye: z.number().min(0).default(0),
});

export const reservationSchema = reservationBaseSchema
  .refine((d) => d.finAt > d.debutAt, {
    message: 'La date de fin doit être après la date de début',
    path: ['finAt'],
  })
  .refine((d) => calcNbJours(d.debutAt, d.finAt) >= MIN_RESERVATION_DAYS, {
    message: `La durée minimale de location est de ${MIN_RESERVATION_DAYS} jours`,
    path: ['finAt'],
  })
  .refine((d) => d.clientId || d.clientInline, {
    message: 'Un client ou des infos inline sont requis',
    path: ['clientId'],
  });

// Utilise le schéma de base (sans refine) pour permettre le .partial()
export const reservationUpdateSchema = reservationBaseSchema.partial();

// Schéma public (site web) — sans clientId, informations minimales
export const publicReservationSchema = z.object({
  vehicleSlug: z.string().min(1),
  nom: z.string().min(2, 'Nom requis').max(100),
  prenom: z.string().min(2, 'Prénom requis').max(100),
  telephone: z
    .string()
    .transform((value) => value.replace(/[\s().-]/g, ''))
    .refine((value) => /^(\+212|0)(6|7)\d{8}$/.test(value), 'Téléphone Maroc invalide'),
  email: z.string().email('Email invalide').optional().or(z.literal('')),
  debutAt: z.coerce.date(),
  finAt: z.coerce.date(),
  optionsSupplementaires: z
    .array(z.object({ nom: z.string(), prix: z.number() }))
    .default([]),
  // Anti-spam honeypot — doit être vide
  website: z.literal('').optional(),
}).refine((d) => d.finAt > d.debutAt, {
  message: 'La date de fin doit être après la date de début',
  path: ['finAt'],
}).refine((d) => calcNbJours(d.debutAt, d.finAt) >= MIN_RESERVATION_DAYS, {
  message: `La durée minimale de location est de ${MIN_RESERVATION_DAYS} jours`,
  path: ['finAt'],
});

export type ReservationInput = z.infer<typeof reservationSchema>;
export type PublicReservationInput = z.infer<typeof publicReservationSchema>;
