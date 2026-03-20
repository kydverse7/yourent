import { NextRequest } from 'next/server';
import { auth } from '@/lib/auth';
import { connectDB } from '@/lib/db';
import { Location } from '@/models/Location';
import { Payment } from '@/models/Payment';
import { Reservation } from '@/models/Reservation';
import { paymentSchema } from '@/lib/validators/payment.schema';
import { apiError, apiPaginated, apiSuccess } from '@/lib/apiHelpers';
import { parsePaginationParams } from '@/lib/utils';
import { auditLog } from '@/services/auditService';
import { recomputeClientStats } from '@/services/clientStatsService';
import { rateLimit } from '@/lib/rateLimit';

function normalizePaymentPayload(body: Record<string, unknown>) {
  const rawType = String(body.type ?? body.modePaiement ?? 'especes');
  const rawCategory = String(body.categorie ?? 'autre');
  const rawStatus = String(body.statut ?? 'effectue');
  const rawCautionType = String(body.typePrise ?? body.modePaiement ?? body.type ?? '');

  const typeMap: Record<string, string> = {
    especes: 'especes',
    cash: 'especes',
    carte: 'carte',
    carte_empreinte: 'carte',
    carte_bancaire: 'carte',
    virement: 'virement',
    cheque: 'cheque',
  };

  const categoryMap: Record<string, string> = {
    loyer: 'location',
    location: 'location',
    supplement: 'supplement',
    remise: 'remise',
    caution: 'caution',
    caution_restitution: 'caution_restitution',
    assurance: 'autre',
    carburant: 'autre',
    amende: 'autre',
    reparation: 'autre',
    autre: 'autre',
  };

  const statusMap: Record<string, string> = {
    paye: 'effectue',
    effectue: 'effectue',
    en_attente: 'en_attente',
    annule: 'annule',
  };

  const cautionTypeMap: Record<string, 'cheque' | 'carte_empreinte' | 'cash'> = {
    cheque: 'cheque',
    carte_empreinte: 'carte_empreinte',
    cash: 'cash',
    especes: 'cash',
  };

  const normalizedReference = typeof body.reference === 'string'
    ? body.reference
    : typeof body.referenceDoc === 'string'
      ? body.referenceDoc
      : undefined;

  const normalizedReferenceDoc = typeof body.referenceDoc === 'string'
    ? body.referenceDoc
    : typeof body.reference === 'string'
      ? body.reference
      : undefined;

  return {
    locationId: body.locationId ?? body.location,
    reservationId: body.reservationId ?? body.reservation,
    type: typeMap[rawType] ?? 'especes',
    categorie: categoryMap[rawCategory] ?? 'autre',
    montant: Number(body.montant ?? 0),
    statut: statusMap[rawStatus] ?? 'effectue',
    typePrise: cautionTypeMap[rawCautionType],
    reference: normalizedReference,
    referenceDoc: normalizedReferenceDoc,
    notes: body.notes,
  };
}

function getPaiementStatut(montantTotal: number, montantPaye: number): 'paye' | 'partiel' | 'en_attente' {
  if (montantPaye <= 0) return 'en_attente';
  if (montantPaye >= montantTotal) return 'paye';
  return 'partiel';
}

function getReservationPaiementStatut(montantTotal: number, montantPaye: number): 'paye' | 'partiel' | 'plus_tard' {
  if (montantPaye <= 0) return 'plus_tard';
  if (montantPaye >= montantTotal) return 'paye';
  return 'partiel';
}

async function syncReservationPayments(reservationId: string | undefined) {
  if (!reservationId) return;

  const reservation = await Reservation.findById(reservationId).lean();
  if (!reservation) return;

  const settledPayments = await Payment.find({
    reservation: reservationId,
    statut: { $ne: 'annule' },
    categorie: { $nin: ['caution', 'caution_restitution'] },
  }).lean();

  const montantPaye = settledPayments.reduce((sum, item) => sum + Number(item.montant ?? 0), 0);
  const montantTotal = Number(reservation.prix?.totalEstime ?? 0);
  const montantRestant = Math.max(0, montantTotal - montantPaye);
  const latestPayment = settledPayments.at(-1);

  await Reservation.findByIdAndUpdate(reservationId, {
    montantPaye,
    montantRestant,
    paiementStatut: getReservationPaiementStatut(montantTotal, montantPaye),
    ...(latestPayment?.type ? { typePaiement: latestPayment.type } : {}),
  });
}

async function syncLocationPayments(locationId: string | undefined, payment: { categorie: string; montant: number; typePrise?: 'cheque' | 'carte_empreinte' | 'cash'; referenceDoc?: string }) {
  if (!locationId) return;

  const location = await Location.findById(locationId).lean();
  if (!location) return;

  const settledPayments = await Payment.find({
    location: locationId,
    statut: { $ne: 'annule' },
    categorie: { $nin: ['caution', 'caution_restitution'] },
  }).lean();

  const montantPaye = settledPayments.reduce((sum, item) => sum + Number(item.montant ?? 0), 0);
  const montantTotal = Number(location.montantTotal ?? 0);
  const montantRestant = Math.max(0, montantTotal - montantPaye);

  const updatePayload: Record<string, unknown> = {
    montantPaye,
    montantRestant,
    paiementStatut: getPaiementStatut(montantTotal, montantPaye),
  };

  if (payment.categorie === 'caution') {
    updatePayload.caution = {
      ...(location.caution ?? {}),
      montant: payment.montant,
      typePrise: payment.typePrise ?? location.caution?.typePrise,
      referenceDoc: payment.referenceDoc ?? location.caution?.referenceDoc,
      statut: 'prise',
    };
  }

  if (payment.categorie === 'caution_restitution') {
    const cautionMontant = Number(location.caution?.montant ?? 0);
    updatePayload.caution = {
      ...(location.caution ?? {}),
      statut: payment.montant >= cautionMontant ? 'restituee_total' : 'restituee_partiel',
    };
  }

  await Location.findByIdAndUpdate(locationId, updatePayload);
}

// RÈGLE CRITIQUE : caution N'EST PAS une recette financière — elle est gérée séparément
// Ce endpoint permet l'enregistrement de tous les paiements y compris caution,
// mais les rapports financiers utilisent toujours $nin: ['caution', 'caution_restitution']

export async function GET(req: NextRequest) {
  const session = await auth();
  if (!session) return apiError('Non autorisé', 401);
  if (!['admin', 'agent', 'comptable'].includes(session.user.role)) return apiError('Accès interdit', 403);

  const limited = await rateLimit('general', session.user.id);
  if (!limited.success) return apiError('Trop de requêtes', 429);

  await connectDB();
  const { searchParams } = req.nextUrl;
  const { page, limit, skip } = parsePaginationParams(searchParams);

  const filter: Record<string, any> = {};
  const statut = searchParams.get('statut');
  if (statut) filter.statut = statut;
  const categorie = searchParams.get('categorie');
  if (categorie) filter.categorie = categorie;
  const locationId = searchParams.get('location');
  if (locationId) filter.location = locationId;
  const reservationId = searchParams.get('reservation');
  if (reservationId) filter.reservation = reservationId;

  const [items, total] = await Promise.all([
    Payment.find(filter)
      .select('location reservation type categorie montant statut reference notes createdAt')
      .populate('location', 'debutAt finPrevueAt finReelleAt montantTotal montantPaye montantRestant')
      .populate('reservation', 'statut')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean(),
    Payment.countDocuments(filter),
  ]);

  return apiPaginated(items, { total, page, limit });
}

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session) return apiError('Non autorisé', 401);
  if (!['admin', 'agent', 'comptable'].includes(session.user.role)) return apiError('Accès interdit', 403);

  const limited = await rateLimit('general', session.user.id);
  if (!limited.success) return apiError('Trop de requêtes', 429);

  await connectDB();

  let body: unknown;
  try { body = await req.json(); }
  catch { return apiError('Corps JSON invalide', 400); }

  const parsed = paymentSchema.safeParse(normalizePaymentPayload(body as Record<string, unknown>));
  if (!parsed.success) return apiError('Données invalides', 422, parsed.error.flatten());

  let resolvedLocationId = parsed.data.locationId ? String(parsed.data.locationId) : undefined;
  let resolvedReservationId = parsed.data.reservationId ? String(parsed.data.reservationId) : undefined;
  let linkedClientId: string | undefined;

  if (resolvedLocationId && !resolvedReservationId) {
    const location = await Location.findById(resolvedLocationId).select('reservation client').lean();
    resolvedReservationId = location?.reservation ? String(location.reservation) : undefined;
    linkedClientId = location?.client ? String(location.client) : linkedClientId;
  }

  if (resolvedReservationId && !resolvedLocationId) {
    const reservation = await Reservation.findById(resolvedReservationId).select('location client').lean();
    resolvedLocationId = reservation?.location ? String(reservation.location) : undefined;
    linkedClientId = reservation?.client ? String(reservation.client) : linkedClientId;
  }

  const payment = await Payment.create({
    location: resolvedLocationId,
    reservation: resolvedReservationId,
    type: parsed.data.type,
    categorie: parsed.data.categorie,
    montant: parsed.data.montant,
    statut: parsed.data.statut,
    reference: parsed.data.reference,
    notes: parsed.data.notes,
    createdBy: session.user.id,
  });

  if (resolvedLocationId) {
    await Location.findByIdAndUpdate(resolvedLocationId, { $addToSet: { paiements: payment._id } });
  }

  await syncReservationPayments(resolvedReservationId);
  await syncLocationPayments(resolvedLocationId, {
    categorie: parsed.data.categorie,
    montant: parsed.data.montant,
    typePrise: parsed.data.typePrise,
    referenceDoc: parsed.data.referenceDoc,
  });

  // Cross-sync montantTotal : garder le même montant entre location et réservation
  if (resolvedLocationId && resolvedReservationId) {
    const [loc, res] = await Promise.all([
      Location.findById(resolvedLocationId).select('montantTotal montantPaye montantRestant client').lean(),
      Reservation.findById(resolvedReservationId).select('prix montantPaye montantRestant client').lean(),
    ]);
    if (loc && res) {
      const locTotal = Number(loc.montantTotal ?? 0);
      const resTotal = Number(res.prix?.totalEstime ?? 0);
      if (locTotal !== resTotal) {
        // La location est la source de vérité quand elle existe
        await Reservation.findByIdAndUpdate(resolvedReservationId, {
          'prix.totalEstime': locTotal,
          montantRestant: Math.max(0, locTotal - Number(res.montantPaye ?? 0)),
        });
      }

      linkedClientId = loc.client
        ? String(loc.client)
        : res.client
          ? String(res.client)
          : linkedClientId;
    }
  }

  if (linkedClientId) {
    await recomputeClientStats(linkedClientId);
  }

  await auditLog({
    action: 'create',
    entity: 'Payment',
    entityId: String(payment._id),
    userId: session.user.id,
    after: payment.toObject(),
  });

  return apiSuccess(payment, 201);
}
