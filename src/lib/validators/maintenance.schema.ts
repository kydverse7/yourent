import { z } from 'zod';

export const maintenanceSchema = z.object({
  vehicleId: z.string().min(1, 'Véhicule requis'),
  type: z.enum(['entretien', 'vidange', 'pneus', 'freins', 'assurance', 'vignette', 'ct', 'reparation', 'autre']),
  description: z.string().max(1000).optional(),
  cout: z.number().min(0),
  fournisseur: z.string().max(200).optional(),
  date: z.coerce.date(),
  kmAuMoment: z.number().min(0).optional(),
  prochaineEcheance: z.coerce.date().optional(),
  prochaineEcheanceKm: z.number().min(0).optional(),
  facturePdfUrl: z.string().url().optional(),
});

export type MaintenanceInput = z.infer<typeof maintenanceSchema>;