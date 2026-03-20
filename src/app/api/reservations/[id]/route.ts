import { NextRequest } from 'next/server';
import { auth } from '@/lib/auth';
import { connectDB } from '@/lib/db';
import { Reservation } from '@/models/Reservation';
import { Client } from '@/models/Client';
import { apiError, apiSuccess } from '@/lib/apiHelpers';
import { auditLog, diff } from '@/services/auditService';
import { rateLimit } from '@/lib/rateLimit';
import { z } from 'zod';

type Ctx = { params: Promise<{ id: string }> };

const statutSchema = z.object({
  statut: z.enum(['en_attente', 'confirmee', 'refusee', 'annulee', 'en_cours', 'terminee']),
  motifRefus: z.string().optional(),
});

function serializeReservation(reservation: any) {
  if (!reservation) return reservation;

  return {
    ...reservation,
    vehicule: reservation.vehicule ?? reservation.vehicle,
    vehicle: reservation.vehicle ?? reservation.vehicule,
    tarifTotal: reservation.tarifTotal ?? reservation.prix?.totalEstime ?? 0,
  };
}

function normalizePhone(phone?: string | null) {
  return String(phone ?? '').replace(/[\s().-]/g, '');
}

async function ensureClientForReservation(reservation: any) {
  if (!reservation) return null;
  if (reservation.client) return reservation.client;

  const inline = reservation.clientInline;
  if (!inline?.nom || !inline?.telephone) return null;

  const normalizedPhone = normalizePhone(inline.telephone);
  const normalizedEmail = typeof inline.email === 'string' ? inline.email.trim().toLowerCase() : '';

  const existingClient = await Client.findOne({
    actif: { $ne: false },
    $or: [
      ...(normalizedPhone ? [{ telephone: normalizedPhone }] : []),
      ...(normalizedEmail ? [{ email: normalizedEmail }] : []),
    ],
  }).lean();

  if (existingClient) {
    await Reservation.findByIdAndUpdate(reservation._id, { client: existingClient._id });
    return existingClient._id;
  }

  const createdClient = await Client.create({
    type: 'particulier',
    nom: inline.nom,
    prenom: inline.prenom,
    telephone: normalizedPhone,
    whatsapp: normalizedPhone,
    email: normalizedEmail || undefined,
    actif: true,
    vip: false,
    remiseHabituels: 0,
  });

  await Reservation.findByIdAndUpdate(reservation._id, { client: createdClient._id });
  return createdClient._id;
}

export async function GET(_req: NextRequest, { params }: Ctx) {
  const session = await auth();
  if (!session) return apiError('Non autorisé', 401);
  await connectDB();
  const { id } = await params;
  const reservation = await Reservation.findById(id)
    .populate('vehicle', 'marque modele immatriculation')
    .populate('client', 'prenom nom telephone email')
    .lean();
  if (!reservation) return apiError('Réservation introuvable', 404);
  return apiSuccess(serializeReservation(reservation));
}

export async function PATCH(req: NextRequest, { params }: Ctx) {
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

  const parsed = statutSchema.safeParse(body);
  if (!parsed.success) return apiError('Statut invalide', 422, parsed.error.flatten());

  const before = await Reservation.findById(id).lean();
  if (!before) return apiError('Réservation introuvable', 404);

  if (parsed.data.statut === 'confirmee') {
    await ensureClientForReservation(before);
  }

  const updated = await Reservation.findByIdAndUpdate(
    id,
    { statut: parsed.data.statut, ...(parsed.data.motifRefus ? { motifRefus: parsed.data.motifRefus } : {}) },
    { new: true },
  )
    .populate('client', 'prenom nom telephone email')
    .lean();

  await auditLog({
    action: 'update',
    entity: 'Reservation',
    entityId: id,
    userId: session.user.id,
    before,
    after: updated,
    changes: diff(before, updated),
  });

  return apiSuccess(serializeReservation(updated));
}

export async function DELETE(_req: NextRequest, { params }: Ctx) {
  const session = await auth();
  if (!session) return apiError('Non autorisé', 401);
  if (session.user.role !== 'admin') return apiError('Réservé aux administrateurs', 403);
  await connectDB();
  const { id } = await params;
  const r = await Reservation.findById(id).lean();
  if (!r) return apiError('Réservation introuvable', 404);
  await Reservation.findByIdAndUpdate(id, { statut: 'annulee' });
  await auditLog({ action: 'delete', entity: 'Reservation', entityId: id, userId: session.user.id, before: r });
  return apiSuccess({ message: 'Réservation annulée' });
}
