import { NextRequest } from 'next/server';
import { auth } from '@/lib/auth';
import { connectDB } from '@/lib/db';
import { Reservation } from '@/models/Reservation';
import { Vehicle } from '@/models/Vehicle';
import { reservationSchema, publicReservationSchema } from '@/lib/validators/reservation.schema';
import { apiError, apiPaginated, apiSuccess } from '@/lib/apiHelpers';
import { calcNbJours, calcTarifTotal, parsePaginationParams, resolveVehiclePricing } from '@/lib/utils';
import { auditLog } from '@/services/auditService';
import { rateLimit } from '@/lib/rateLimit';

function serializeReservation(reservation: any) {
  if (!reservation) return reservation;

  return {
    ...reservation,
    vehicule: reservation.vehicule ?? reservation.vehicle,
    vehicle: reservation.vehicle ?? reservation.vehicule,
    tarifTotal: reservation.tarifTotal ?? reservation.prix?.totalEstime ?? 0,
  };
}

export async function GET(req: NextRequest) {
  const session = await auth();
  if (!session) return apiError('Non autorisé', 401);

  const limited = await rateLimit('general', session.user.id);
  if (!limited.success) return apiError('Trop de requêtes', 429);

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

  const [items, total] = await Promise.all([
    Reservation.find(filter)
      .populate('vehicle', 'marque modele immatriculation')
      .populate('client', 'prenom nom telephone')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean(),
    Reservation.countDocuments(filter),
  ]);

  return apiPaginated(items.map(serializeReservation), { total, page, limit });
}

export async function POST(req: NextRequest) {
  const session = await auth();

  await connectDB();

  let body: unknown;
  try { body = await req.json(); }
  catch { return apiError('Corps JSON invalide', 400); }

  const publicParsed = publicReservationSchema.safeParse(body);

  // Réservation publique : doit rester publique même si l'utilisateur est connecté
  if (publicParsed.success) {
    const limited = await rateLimit('publicReserve', req.headers.get('x-forwarded-for') ?? 'unknown');
    if (!limited.success) return apiError('Trop de demandes, réessayez plus tard', 429);

    const { website: _honeypot, ...data } = publicParsed.data;
    const vehicle = await Vehicle.findOne({ slug: data.vehicleSlug, isPublic: true }).lean();
    if (!vehicle) return apiError('Véhicule introuvable', 404);

    const { tarifJour, tarifJour10Plus } = resolveVehiclePricing(vehicle as any);
    const nbJours = calcNbJours(data.debutAt, data.finAt);
    const pricing = calcTarifTotal(nbJours, tarifJour, tarifJour10Plus);
    const optionsTotal = data.optionsSupplementaires.reduce((sum, option) => sum + option.prix, 0);

    const reservation = await Reservation.create({
      vehicle: vehicle._id,
      clientInline: {
        nom: data.nom,
        prenom: data.prenom,
        telephone: data.telephone,
        email: data.email,
      },
      debutAt: data.debutAt,
      finAt: data.finAt,
      canal: 'public',
      statut: 'en_attente',
      optionsSupplementaires: data.optionsSupplementaires,
      prix: {
        parJour: pricing.tarifJour,
        palier: pricing.palier,
        totalEstime: pricing.total + optionsTotal,
        remise: 0,
      },
      montantRestant: pricing.total + optionsTotal,
    });
    return apiSuccess({ id: reservation._id, message: 'Demande de réservation reçue' }, 201);
  }

  if (!session) {
    return apiError('Données invalides', 422, publicParsed.error.flatten());
  }

  const limited = await rateLimit('general', session.user.id);
  if (!limited.success) return apiError('Trop de requêtes', 429);

  const parsed = reservationSchema.safeParse(body);
  if (!parsed.success) return apiError('Données invalides', 422, parsed.error.flatten());

  const vehicle = await Vehicle.findById(parsed.data.vehicleId).lean();
  if (!vehicle) return apiError('Véhicule introuvable', 404);

  const { tarifJour, tarifJour10Plus } = resolveVehiclePricing(vehicle as any);
  const nbJours = calcNbJours(parsed.data.debutAt, parsed.data.finAt);
  const pricing = calcTarifTotal(nbJours, tarifJour, tarifJour10Plus);
  const optionsTotal = parsed.data.optionsSupplementaires.reduce((sum, option) => sum + option.prix, 0);
  const totalEstime = Math.max(0, pricing.total + optionsTotal - parsed.data.remise);

  const reservation = await Reservation.create({
    vehicle: parsed.data.vehicleId,
    client: parsed.data.clientId,
    clientInline: parsed.data.clientInline,
    canal: 'interne',
    statut: 'confirmee',
    debutAt: parsed.data.debutAt,
    finAt: parsed.data.finAt,
    heureDepart: parsed.data.heureDepart,
    heureRetour: parsed.data.heureRetour,
    lieuDepart: parsed.data.lieuDepart,
    lieuRetour: parsed.data.lieuRetour,
    optionsSupplementaires: parsed.data.optionsSupplementaires,
    conducteurSecondaire: parsed.data.conducteurSecondaire,
    notes: parsed.data.notes,
    typePaiement: parsed.data.typePaiement,
    montantPaye: parsed.data.montantPaye,
    montantRestant: Math.max(0, totalEstime - parsed.data.montantPaye),
    createdBy: session.user.id,
    prix: {
      parJour: pricing.tarifJour,
      palier: pricing.palier,
      totalEstime,
      remise: parsed.data.remise,
      remiseRaison: parsed.data.remiseRaison,
    },
  });

  await auditLog({
    action: 'create',
    entity: 'Reservation',
    entityId: String(reservation._id),
    userId: session.user.id,
    after: reservation.toObject(),
  });

  return apiSuccess(serializeReservation(reservation.toObject()), 201);
}
