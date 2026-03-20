import { z } from 'zod';

export const contractSchema = z.object({
  entityType: z.enum(['reservation', 'location']),
  entityId: z.string().min(1, 'Dossier requis'),
  contratPdfUrl: z.string().url('URL du contrat invalide'),
});

export type ContractInput = z.infer<typeof contractSchema>;
