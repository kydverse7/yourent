import { z } from 'zod';

export const expenseSchema = z.object({
  type: z.enum(['carburant', 'lavage', 'parking', 'amende', 'peage', 'publicite', 'logiciel', 'loyer', 'salaire', 'maintenance', 'assurance', 'controle_technique', 'autre']),
  montant: z.number().min(0),
  date: z.coerce.date(),
  note: z.string().max(1000).optional(),
  vehicleId: z.string().optional(),
  fournisseur: z.string().max(200).optional(),
  factureUrl: z.string().url().optional(),
  sourceModule: z.enum(['manual', 'alertes']).optional(),
  linkedType: z.enum(['ct', 'assurance', 'vidange']).optional(),
  isRecurring: z.boolean().optional(),
  recurrenceFrequency: z.enum(['monthly', 'quarterly', 'yearly', 'custom']).optional(),
  recurrenceNextDate: z.coerce.date().optional(),
  recurrenceLabel: z.string().max(120).optional(),
});

export type ExpenseInput = z.infer<typeof expenseSchema>;