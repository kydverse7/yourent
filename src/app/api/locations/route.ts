import { NextRequest } from 'next/server';
import { auth } from '@/lib/auth';
import { connectDB } from '@/lib/db';
import { Location } from '@/models/Location';
import { Payment } from '@/models/Payment';
import { Reservation } from '@/models/Reservation';
import { Vehicle } from '@/models/Vehicle';
import { apiError, apiPaginated, apiSuccess } from '@/lib/apiHelpers';
import { calcNbJours, calcTarifTotal, parsePaginationParams, resolveVehiclePricing } from '@/lib/utils';
import { auditLog } from '@/services/auditService';
import { recomputeClientStats } from '@/services/clientStatsService';
import { rateLimit } from '@/lib/rateLimit';
import { cautionPriseSchema } from '@/lib/validators/caution.schema';
import { z } from 'zod';

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

function getPaiementStatut(montantTotal: number, montantPaye: number): 'paye' | 'partiel' | 'en_attente' {
  if (montantPaye <= 0) return 'en_attente';
  if (montantPaye >= montantTotal) return 'paye';
  return 'partiel';
}

const locationSchema = z.object({
  reservation: z.string().optional(),
  vehicle: z.string().optional(),
  vehicule: z.string().optional(),
  client: z.string(),
  debutAt: z.string().datetime(),
  finPrevueAt: z.string().datetime(),
  kmDepart: z.number().min(0),
  caution: cautionPriseSchema.optional(),
  notes: z.string().optional(),
  mode: z.enum(['reservation', 'direct']).optional(),
});

export async function GET(req: NextRequest) {
  const session = await auth();
  if (!session) return apiError('Non autorisé', 401);

  await connectDB();
  const { searchParams } = req.nextUrl;
  const { page, limit, skip } = parsePaginationParams(searchParams);

  const filter: Record<string, any> = {};
  const statut = searchParams.get('statut');
  if (statut) {
    filter.statut = statut.includes(',') ? { $in: statut.split(',') } : statut;
  }
  const vehiculeId = searchParams.get('vehicule');
  if (vehiculeId) filter.vehicle = vehiculeId;
  const clientId = searchParams.get('client');
  if (clientId) filter.client = clientId;

  const [items, total] = await Promise.all([
    Location.find(filter)
      .select('vehicle client reservation debutAt finPrevueAt finReelleAt statut tarifJour nbJours palier remise optionsTotal montantTotal montantPaye montantRestant caution contratNumero factureNumero contratPdfUrl facturePdfUrl etatDesLieuxAvantId etatDesLieuxApresId createdAt')
      .populate('vehicle', 'marque modele immatriculation kilometrage')
      .populate('client', 'prenom nom telephone')
      .populate('reservation', 'prix')
      .sort({ debutAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean(),
    Location.countDocuments(filter),
  ]);

  return apiPaginated(items.map(serializeLocation), { total, page, limit });
}

import { Client } from '@/models/Client';

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session) return apiError('Non autorisé', 401);
  if (!['admin', 'agent'].includes(session.user.role)) return apiError('Accès interdit', 403);

  const limited = await rateLimit('general', session.user.id);
  if (!limited.success) return apiError('Trop de requêtes', 429);

  await connectDB();

  let body: unknown;
  try { body = await req.json(); }
  catch { return apiError('Corps JSON invalide', 400); }

  const parsed = locationSchema.safeParse(body);
  if (!parsed.success) return apiError('Données invalides', 422, parsed.error.flatten());

  const vehicleId = parsed.data.vehicle ?? parsed.data.vehicule;
  if (!vehicleId) return apiError('Véhicule requis', 422);

  // Vérifier disponibilité du véhicule
  const vehicule = await Vehicle.findById(vehicleId);
  if (!vehicule) return apiError('Véhicule introuvable', 404);
  if (vehicule.statut !== 'disponible') return apiError('Véhicule non disponible', 409);

  // Vérifier client
  const clientDoc = await Client.findById(parsed.data.client).lean();
  if (!clientDoc) return apiError('Client introuvable', 404);

  // Calculer pricing
  const { tarifJour: baseTarif, tarifJour10Plus } = resolveVehiclePricing(vehicule as any);
  const nbJours = calcNbJours(new Date(parsed.data.debutAt), new Date(parsed.data.finPrevueAt));
  const pricing = calcTarifTotal(nbJours, baseTarif, tarifJour10Plus);

  // ── Mode direct (sans réservation) ──
  if (!parsed.data.reservation) {
    const montantTotal = pricing.total;

    const location = await Location.create({
      vehicle: vehicleId,
      client: parsed.data.client,
      debutAt: parsed.data.debutAt,
      finPrevueAt: parsed.data.finPrevueAt,
      kmDepart: parsed.data.kmDepart,
      statut: 'en_cours',
      caution: parsed.data.caution,
      tarifJour: pricing.tarifJour,
      nbJours,
      palier: pricing.palier,
      remise: 0,
      optionsTotal: 0,
      montantTotal,
      montantPaye: 0,
      montantRestant: montantTotal,
      paiementStatut: 'en_attente',
    });

    await Vehicle.findByIdAndUpdate(vehicleId, { statut: 'loue' });
    await recomputeClientStats(String(parsed.data.client));

    await auditLog({
      action: 'create',
      entity: 'Location',
      entityId: String(location._id),
      userId: session.user.id,
      after: location.toObject(),
    });

    return apiSuccess(serializeLocation(location.toObject()), 201);
  }

  // ── Mode réservation ──
  const reservation = await Reservation.findById(parsed.data.reservation).lean();
  if (!reservation) return apiError('Réservation introuvable', 404);
  if (!['confirmee', 'en_cours'].includes(reservation.statut)) {
    return apiError('La réservation doit être confirmée avant de démarrer une location', 409);
  }
  if (String(reservation.vehicle) !== String(vehicleId)) {
    return apiError('Le véhicule de la réservation ne correspond pas', 409);
  }
  if (reservation.location) {
    return apiError('Cette réservation est déjà liée à une location', 409);
  }
  if (!reservation.client) {
    return apiError('La réservation doit être rattachée à un client pour démarrer une location', 409);
  }

  const optionsTotal = (reservation.optionsSupplementaires ?? []).reduce(
    (sum: number, o: { prix?: number }) => sum + Number(o.prix ?? 0), 0,
  );
  const remise = Number(reservation.prix?.remise ?? 0);
  const montantTotal = Math.max(0, pricing.total + optionsTotal - remise);

  const location = await Location.create({
    reservation: parsed.data.reservation,
    vehicle: reservation.vehicle,
    client: reservation.client,
    debutAt: parsed.data.debutAt,
    finPrevueAt: parsed.data.finPrevueAt,
    kmDepart: parsed.data.kmDepart,
    statut: 'en_cours',
    caution: parsed.data.caution,
    tarifJour: pricing.tarifJour,
    nbJours,
    palier: pricing.palier,
    remise,
    optionsTotal,
    montantTotal,
    montantPaye: reservation.montantPaye ?? 0,
    montantRestant: Math.max(0, montantTotal - Number(reservation.montantPaye ?? 0)),
    paiementStatut: getPaiementStatut(montantTotal, Number(reservation.montantPaye ?? 0)),
    contratNumero: reservation.contratNumero,
    contratPdfUrl: reservation.contratPdfUrl,
    factureNumero: reservation.factureNumero,
    facturePdfUrl: reservation.facturePdfUrl,
  });

  await Reservation.findByIdAndUpdate(parsed.data.reservation, {
    'prix.parJour': pricing.tarifJour,
    'prix.palier': pricing.palier,
    'prix.totalEstime': montantTotal,
    montantRestant: Math.max(0, montantTotal - Number(reservation.montantPaye ?? 0)),
  });

  const priorPayments = await Payment.find({
    reservation: parsed.data.reservation,
    $or: [{ location: { $exists: false } }, { location: null }],
  })
    .select('_id')
    .lean();

  if (priorPayments.length > 0) {
    await Payment.updateMany(
      { _id: { $in: priorPayments.map((item) => item._id) } },
      { location: location._id },
    );

    await Location.findByIdAndUpdate(location._id, {
      $addToSet: { paiements: { $each: priorPayments.map((item) => item._id) } },
    });
  }

  await Vehicle.findByIdAndUpdate(vehicleId, { statut: 'loue' });
  await Reservation.findByIdAndUpdate(parsed.data.reservation, {
    statut: 'en_cours',
    location: location._id,
  });

  await recomputeClientStats(String(reservation.client));

  await auditLog({
    action: 'create',
    entity: 'Location',
    entityId: String(location._id),
    userId: session.user.id,
    after: location.toObject(),
  });

  return apiSuccess(serializeLocation(location.toObject()), 201);
}
