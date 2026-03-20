import { z } from 'zod';

/**
 * ⚠️ RÈGLE ABSOLUE :
 * La caution est une GARANTIE, jamais un revenu.
 * Elle doit être EXCLUE de tous les calculs financiers.
 * Types acceptés : cheque | carte_empreinte | cash
 * PAS de Stripe, PAS de paiement en ligne.
 */
export const cautionPriseSchema = z
  .discriminatedUnion('typePrise', [
    z.object({
      typePrise: z.literal('cheque'),
      montant: z.number().min(1, 'Montant requis'),
      referenceDoc: z
        .string()
        .min(1, 'Numéro de chèque obligatoire pour une caution par chèque'),
    }),
    z.object({
      typePrise: z.literal('carte_empreinte'),
      montant: z.number().min(1, 'Montant requis'),
      referenceDoc: z.string().max(100, 'Référence trop longue').optional(),
      // Note: il s'agit d'une pré-autorisation (empreinte), PAS d'un débit réel.
      // L'opération se fait à l'agence via TPE, sans stockage d'un numéro complet de carte.
    }),
    z.object({
      typePrise: z.literal('cash'),
      montant: z.number().min(1, 'Montant requis'),
      referenceDoc: z.string().optional(),
    }),
  ]);

export const cautionRestitutionSchema = z.object({
  locationId: z.string().min(1),
  montantRestitue: z.number().min(1, 'Montant de restitution requis'),
  motif: z.string().max(500).optional(),
});

export type CautionPriseInput = z.infer<typeof cautionPriseSchema>;
export type CautionRestitutionInput = z.infer<typeof cautionRestitutionSchema>;
