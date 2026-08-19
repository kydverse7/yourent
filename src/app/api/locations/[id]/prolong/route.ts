import { NextRequest } from 'next/server';
import { auth } from '@/lib/auth';
import { connectDB } from '@/lib/db';
import { Location } from '@/models/Location';
import { Reservation } from '@/models/Reservation';
import { Vehicle } from '@/models/Vehicle';
import { apiError, apiSuccess } from '@/lib/apiHelpers';
import { calcNbJours, calcTarifTotal, resolveVehiclePricing, formatDateTime } from '@/lib/utils';
import { auditLog, diff } from '@/services/auditService';
import { findVehiclePlanningConflict } from '@/services/vehicleAvailabilityService';
import { rateLimit } from '@/lib/rateLimit';
import { z } from 'zod';

type Ctx = { params: Promise<{ id: string }> };

const prolongSchema = z.object({
  nouvelleFin: z.string().datetime(),
  raison: z.string().trim().max(300).optional(),
  forcerConflit: z.boolean().optional(),
});

export async function POST(req: NextRequest, { params }: Ctx) {
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

  const parsed = prolongSchema.safeParse(body);
  if (!parsed.success) return apiError('Données invalides', 422, parsed.error.flatten());

  const before = await Location.findById(id).lean();
  if (!before) return apiError('Location introuvable', 404);
  if (before.statut !== 'en_cours') {
    return apiError('Seule une location en cours peut être prolongée', 409);
  }

  const ancienneFin = new Date(before.finPrevueAt);
  const nouvelleFin = new Date(parsed.data.nouvelleFin);
  if (Number.isNaN(nouvelleFin.getTime())) return apiError('Date de fin invalide', 422);
  if (nouvelleFin.getTime() <= ancienneFin.getTime()) {
    return apiError('La nouvelle date de fin doit être postérieure à la fin prévue actuelle', 422);
  }

  // Conflit planning : avertissement, l'agent peut forcer via forcerConflit
  if (!parsed.data.forcerConflit) {
    const conflict = await findVehiclePlanningConflict({
      vehicleId: before.vehicle,
      debutAt: ancienneFin,
      finAt: nouvelleFin,
      excludeLocationId: id,
      ...(before.reservation ? { excludeReservationId: before.reservation } : {}),
    });
    if (conflict) {
      return apiError(
        `Conflit planning : ${conflict.source === 'reservation' ? 'réservation' : 'location'} déjà prévue du ${formatDateTime(conflict.debutAt)} au ${formatDateTime(conflict.finAt)}`,
        409,
        { conflict },
      );
    }
  }

  // Recalcul automatique du tarif sur la nouvelle durée (palier 10+ jours inclus)
  const nbJoursNouveau = calcNbJours(new Date(before.debutAt), nouvelleFin);
  const nbJoursAncien = Number(before.nbJours ?? 0);

  let newTarifJour = Number(before.tarifJour ?? 0);
  let newPalier = before.palier ?? 'standard';
  let newMontantTotal = Number(before.montantTotal ?? 0);

  if (nbJoursNouveau !== nbJoursAncien) {
    const vehicule = await Vehicle.findById(before.vehicle).lean();
    if (!vehicule) return apiError('Véhicule introuvable', 404);
    const { tarifJour, tarifJour10Plus } = resolveVehiclePricing(vehicule as Record<string, unknown> as Parameters<typeof resolveVehiclePricing>[0]);
    const pricing = calcTarifTotal(nbJoursNouveau, tarifJour, tarifJour10Plus, {
      forceStandard: before.highSeason === true,
    });
    const remise = Number(before.remise ?? 0);
    const optionsTotal = Number(before.optionsTotal ?? 0);
    newTarifJour = pricing.tarifJour;
    newPalier = pricing.palier;
    newMontantTotal = Math.max(0, pricing.total + optionsTotal - remise);
  }

  const montantPaye = Number(before.montantPaye ?? 0);
  const montantRestant = Math.max(0, newMontantTotal - montantPaye);
  const paiementStatut = montantPaye >= newMontantTotal ? 'paye' : montantPaye > 0 ? 'partiel' : 'en_attente';
  const montantSup = Math.max(0, newMontantTotal - Number(before.montantTotal ?? 0));

  const updated = await Location.findByIdAndUpdate(
    id,
    {
      finPrevueAt: nouvelleFin,
      nbJours: nbJoursNouveau,
      tarifJour: newTarifJour,
      palier: newPalier,
      montantTotal: newMontantTotal,
      montantRestant,
      paiementStatut,
      $push: {
        prolongations: {
          nouvelleFin,
          montantSup,
          ...(parsed.data.raison ? { raison: parsed.data.raison } : {}),
          date: new Date(),
          approuvePar: session.user.id,
        },
      },
    },
    { new: true },
  )
    .populate('vehicle', 'marque modele immatriculation kilometrage')
    .populate('client', 'prenom nom telephone')
    .lean();

  // Synchroniser la réservation liée si elle existe encore
  if (before.reservation) {
    await Reservation.findByIdAndUpdate(before.reservation, {
      finAt: nouvelleFin,
      'prix.parJour': newTarifJour,
      'prix.palier': newPalier,
      'prix.totalEstime': newMontantTotal,
      montantRestant,
    });
  }

  await auditLog({
    action: 'prolong',
    entity: 'Location',
    entityId: id,
    userId: session.user.id,
    before,
    after: updated,
    changes: diff(before, updated),
  });

  return apiSuccess({
    ...updated,
    vehicule: updated?.vehicle,
    montantSup,
    joursSupplementaires: Math.max(0, nbJoursNouveau - nbJoursAncien),
  });
}
