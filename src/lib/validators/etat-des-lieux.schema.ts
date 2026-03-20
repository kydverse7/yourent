import { z } from 'zod';

export const etatDesLieuxSchema = z.object({
  locationId: z.string().min(1, 'Location requise'),
  moment: z.enum(['avant', 'apres']),
  kmReleve: z.number().min(0).optional(),
  niveauCarburant: z.enum(['vide', '1/4', '1/2', '3/4', 'plein']).optional(),
  proprete: z.enum(['sale', 'moyen', 'propre', 'tres_propre']).optional(),
  remarques: z.string().max(1500).optional(),
  signePar: z.string().max(200).optional(),
  signatureDataUrl: z.string().optional(),
  photos: z.array(z.string().url()).default([]),
  schemaPoints: z.array(
    z.object({
      zone: z.string(),
      x: z.number(),
      y: z.number(),
      note: z.string().optional(),
      severite: z.enum(['scratch', 'bosse', 'bris', 'autre']),
      photos: z.array(z.string().url()).default([]),
    })
  ).default([]),
});

export type EtatDesLieuxInput = z.infer<typeof etatDesLieuxSchema>;