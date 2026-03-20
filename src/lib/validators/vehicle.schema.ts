import { z } from 'zod';

export const vehicleSchema = z.object({
  marque: z.string().min(1, 'Marque requise').max(50),
  modele: z.string().min(1, 'Modèle requis').max(100),
  annee: z.number().int().min(1990).max(new Date().getFullYear() + 2).optional(),
  carburant: z.enum(['diesel', 'essence', 'hybride', 'electrique']),
  boite: z.enum(['manuelle', 'automatique']),
  places: z.number().int().min(1).max(9).default(5),
  couleur: z.string().max(30).optional(),
  categorie: z.enum(['economique', 'berline', 'suv', 'premium', 'utilitaire']),
  immatriculation: z.string().min(1, 'Immatriculation requise').max(20).toUpperCase(),
  kilometrage: z.number().min(0).default(0),
  puissance: z.number().min(0).optional(),
  options: z.array(z.string()).default([]),
  slug: z.string().optional(),
  photos: z.array(z.string().url()).default([]),
  backgroundPhoto: z.string().url().optional(),
  photoModele: z.string().url().optional(),
  description: z.string().max(2000).optional(),
  tarifParJour: z.number().min(0).default(0),
  tarifParJour10Plus: z.number().min(0).default(0),
  tarifParJour15Plus: z.number().min(0).default(0),
  tarifParJour30Plus: z.number().min(0).default(0),
  cautionDefaut: z.number().min(0).default(0),
  isPublic: z.boolean().default(true),
  alerts: z
    .object({
      vidangeAtKm: z.number().min(0).optional(),
      assuranceExpireLe: z.coerce.date().optional(),
      assuranceCompagnie: z.string().optional(),
      vignetteExpireLe: z.coerce.date().optional(),
      controleTechniqueExpireLe: z.coerce.date().optional(),
      visiteAssuranceExpireLe: z.coerce.date().optional(),
    })
    .optional(),
});

export const vehicleUpdateSchema = vehicleSchema.partial();

export type VehicleInput = z.infer<typeof vehicleSchema>;
export type VehicleUpdateInput = z.infer<typeof vehicleUpdateSchema>;
