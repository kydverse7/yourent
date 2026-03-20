import { z } from 'zod';

export const paymentSchema = z.object({
  locationId: z.string().optional(),
  reservationId: z.string().optional(),
  type: z.enum(['especes', 'carte', 'virement', 'cheque']),
  categorie: z.enum(['location', 'supplement', 'remise', 'caution', 'caution_restitution', 'autre']),
  montant: z.number(),
  statut: z.enum(['effectue', 'en_attente', 'annule']).default('effectue'),
  typePrise: z.enum(['cheque', 'carte_empreinte', 'cash']).optional(),
  reference: z.string().max(100).optional(),
  referenceDoc: z.string().max(100).optional(),
  notes: z.string().max(500).optional(),
});

export type PaymentInput = z.infer<typeof paymentSchema>;
