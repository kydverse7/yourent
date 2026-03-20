import { z } from 'zod';

export const invoiceSchema = z.object({
  entityType: z.enum(['reservation', 'location']),
  entityId: z.string().min(1, 'Dossier requis'),
  facturePdfUrl: z.string().url('URL de facture invalide'),
});

export type InvoiceInput = z.infer<typeof invoiceSchema>;
