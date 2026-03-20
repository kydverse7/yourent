import { NextRequest } from 'next/server';
import { auth } from '@/lib/auth';
import { connectDB } from '@/lib/db';
import { Reservation } from '@/models/Reservation';
import { Location } from '@/models/Location';
import { Client } from '@/models/Client';
import { Payment } from '@/models/Payment';
import { EtatDesLieux } from '@/models/EtatDesLieux';
import { Expense } from '@/models/Expense';
import { Maintenance } from '@/models/Maintenance';
import { Vehicle } from '@/models/Vehicle';
import { apiError, apiSuccess } from '@/lib/apiHelpers';
import { auditLog } from '@/services/auditService';
import { rateLimit } from '@/lib/rateLimit';
import { z } from 'zod';

const PURGE_TARGETS = {
  reservations: Reservation,
  locations: Location,
  clients: Client,
  paiements: Payment,
  etatsDesLieux: EtatDesLieux,
  depenses: Expense,
  maintenance: Maintenance,
  vehicules: Vehicle,
} as const;

type TargetKey = keyof typeof PURGE_TARGETS;

const purgeSchema = z.object({
  targets: z.array(z.enum([
    'reservations', 'locations', 'clients', 'paiements',
    'etatsDesLieux', 'depenses', 'maintenance', 'vehicules',
  ])).min(1, 'Sélectionnez au moins une collection'),
  confirmation: z.literal('SUPPRIMER'),
});

export async function DELETE(req: NextRequest) {
  const session = await auth();
  if (!session) return apiError('Non autorisé', 401);
  if (session.user.role !== 'admin') return apiError('Réservé aux administrateurs', 403);

  const limited = await rateLimit('general', session.user.id);
  if (!limited.success) return apiError('Trop de requêtes', 429);

  await connectDB();

  let body: unknown;
  try { body = await req.json(); }
  catch { return apiError('Corps JSON invalide', 400); }

  const parsed = purgeSchema.safeParse(body);
  if (!parsed.success) return apiError('Données invalides', 422, parsed.error.flatten());

  // Ordre de suppression pour respecter les dépendances (enfants d'abord)
  const orderedTargets: TargetKey[] = [
    'etatsDesLieux', 'paiements', 'locations', 'reservations',
    'depenses', 'maintenance', 'clients', 'vehicules',
  ];

  const results: Record<string, number> = {};

  for (const target of orderedTargets) {
    if (!parsed.data.targets.includes(target)) continue;
    const Model = PURGE_TARGETS[target];
    const { deletedCount } = await Model.deleteMany({});
    results[target] = deletedCount ?? 0;
  }

  // Si on supprime les locations/réservations, remettre les véhicules en disponible
  if (parsed.data.targets.includes('locations') || parsed.data.targets.includes('reservations')) {
    await Vehicle.updateMany({}, { statut: 'disponible' });
  }

  await auditLog({
    action: 'purge',
    entity: 'System',
    entityId: 'bulk-purge',
    userId: session.user.id,
    after: { targets: parsed.data.targets, results },
  });

  return apiSuccess({ message: 'Données supprimées', results });
}

export async function GET(req: NextRequest) {
  const session = await auth();
  if (!session) return apiError('Non autorisé', 401);
  if (session.user.role !== 'admin') return apiError('Réservé aux administrateurs', 403);

  await connectDB();

  const counts: Record<string, number> = {};
  for (const [key, Model] of Object.entries(PURGE_TARGETS)) {
    counts[key] = await Model.countDocuments();
  }

  return apiSuccess(counts);
}
