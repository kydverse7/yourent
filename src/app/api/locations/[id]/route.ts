import { NextRequest } from 'next/server';
import { auth } from '@/lib/auth';
import { connectDB } from '@/lib/db';
import { Location } from '@/models/Location';
import { Reservation } from '@/models/Reservation';
import { Vehicle } from '@/models/Vehicle';
import { Payment } from '@/models/Payment';
import { apiError, apiSuccess } from '@/lib/apiHelpers';
import { calcNbJours, calcTarifTotal, resolveVehiclePricing } from '@/lib/utils';
import { auditLog, diff } from '@/services/auditService';
import { recomputeClientStats } from '@/services/clientStatsService';
import { rateLimit } from '@/lib/rateLimit';
import { z } from 'zod';

type Ctx = { params: Promise<{ id: string }> };

const cloturageSchema = z.object({
  kmRetour: z.number().min(0),
  finAt: z.string().datetime(),
  notes: z.string().optional(),
});

const cautionRestitutionSchema = z.object({
  montantRendu: z.number().min(0),
  motif: z.string().optional(),
});

function serializeLocation(location: any) {
  if (!location) return location;

  const reservation = location.reservation;
  const tarifJour = location.tarifJour ?? reservation?.prix?.parJour ?? 0;
  const nbJours = location.nbJours ?? 0;
  const palier = location.palier ?? reservation?.prix?.palier ?? 'standard';
  const remise = location.remise ?? reservation?.prix?.remise ?? 0;
  const optionsTotal = location.optionsTotal ?? 0;
  const cautionMontant = location.cautionMontant ?? location.caution?.montant ?? 0;
  const cautionStatut = location.cautionStatut ?? location.caution?.statut ?? 'en_attente';

  return {
    ...location,
    vehicule: location.vehicule ?? location.vehicle,
    vehicle: location.vehicle ?? location.vehicule,
    finAt: location.finAt ?? location.finReelleAt ?? null,
    finReelleAt: location.finReelleAt ?? location.finAt ?? null,
    tarifJour,
    nbJours,
    palier,
    remise,
    optionsTotal,
    cautionMontant,
    cautionStatut,
  };
}

export async function GET(_req: NextRequest, { params }: Ctx) {
  const session = await auth();
  if (!session) return apiError('Non autorisé', 401);
  await connectDB();
  const { id } = await params;
  const location = await Location.findById(id)
    .populate('vehicle', 'marque modele immatriculation kilometrage')
    .populate('client', 'prenom nom telephone')
    .populate('reservation', 'prix')
    .populate('etatDesLieuxAvantId', 'moment createdAt kmReleve niveauCarburant proprete signePar')
    .populate('etatDesLieuxApresId', 'moment createdAt kmReleve niveauCarburant proprete signePar')
    .lean();
  if (!location) return apiError('Location introuvable', 404);
  return apiSuccess(serializeLocation(location));
}

export async function PUT(req: NextRequest, { params }: Ctx) {
  const session = await auth();
  if (!session) return apiError('Non autorisé', 401);
  if (!['admin', 'agent'].includes(session.user.role)) return apiError('Accès interdit', 403);

  const limited = await rateLimit('general', session.user.id);
  if (!limited.success) return apiError('Trop de requêtes', 429);

  await connectDB();
  const { id } = await params;

  let body: unknown;
  try { body = await req.json(); }
  catch { return apiError('Corps JSON invalide', 400); }

  const before = await Location.findById(id).lean();
  if (!before) return apiError('Location introuvable', 404);

  // Clôturer la location
  const parsed = cloturageSchema.safeParse(body);
  if (!parsed.success) return apiError('Données invalides', 422, parsed.error.flatten());

  // Recalculer le montant total si la durée réelle diffère de la durée prévue
  const finReelle = new Date(parsed.data.finAt);
  const nbJoursReel = calcNbJours(new Date(before.debutAt), finReelle);
  let newMontantTotal = before.montantTotal;

  if (nbJoursReel !== (before.nbJours ?? 0)) {
    const vehicule = await Vehicle.findById(before.vehicle).lean();
    if (vehicule) {
      const { tarifJour, tarifJour10Plus } = resolveVehiclePricing(vehicule as any);
      const pricing = calcTarifTotal(nbJoursReel, tarifJour, tarifJour10Plus);
      const remise = Number(before.remise ?? 0);
      const optionsTotal = Number(before.optionsTotal ?? 0);
      newMontantTotal = Math.max(0, pricing.total + optionsTotal - remise);
    }
  }

  const montantPaye = Number(before.montantPaye ?? 0);
  const montantRestant = Math.max(0, newMontantTotal - montantPaye);

  const updated = await Location.findByIdAndUpdate(
    id,
    {
      kmRetour: parsed.data.kmRetour,
      finReelleAt: parsed.data.finAt,
      statut: 'terminee',
      ...(nbJoursReel !== (before.nbJours ?? 0) ? {
        nbJours: nbJoursReel,
        tarifJour: newMontantTotal !== before.montantTotal ? Math.round((newMontantTotal + Number(before.remise ?? 0) - Number(before.optionsTotal ?? 0)) / nbJoursReel) : before.tarifJour,
        montantTotal: newMontantTotal,
        montantRestant,
        paiementStatut: montantPaye >= newMontantTotal ? 'paye' : montantPaye > 0 ? 'partiel' : 'en_attente',
      } : {}),
    },
    { new: true },
  ).lean();

  // Synchroniser le prix vers la réservation liée
  if (before.reservation) {
    await Reservation.findByIdAndUpdate(before.reservation, {
      'prix.totalEstime': updated?.montantTotal ?? newMontantTotal,
      montantRestant: updated?.montantRestant ?? montantRestant,
    });
  }

  // Libérer le véhicule
  if (before.vehicle) {
    await Vehicle.findByIdAndUpdate(before.vehicle, { statut: 'disponible' });
  }
  if (before.reservation) {
    await Reservation.findByIdAndUpdate(before.reservation, { statut: 'terminee' });
  }
  if (before.client) {
    await recomputeClientStats(String(before.client));
  }

  await auditLog({
    action: 'close',
    entity: 'Location',
    entityId: id,
    userId: session.user.id,
    before,
    after: updated,
    changes: diff(before, updated),
  });

  return apiSuccess(serializeLocation(updated));
}
