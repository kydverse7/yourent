import { NextRequest } from 'next/server';
import { z } from 'zod';
import { auth } from '@/lib/auth';
import { connectDB } from '@/lib/db';
import { apiError, apiSuccess } from '@/lib/apiHelpers';
import { rateLimit } from '@/lib/rateLimit';
import { Vehicle } from '@/models/Vehicle';
import { Maintenance } from '@/models/Maintenance';
import { Expense } from '@/models/Expense';
import { buildActiveVehicleAlerts } from '@/lib/vehicle-alerts';
import { auditLog } from '@/services/auditService';

const recurringSchema = z.object({
  enabled: z.boolean().optional(),
  frequency: z.enum(['monthly', 'quarterly', 'yearly', 'custom']).optional(),
  nextDueDate: z.coerce.date().optional(),
  label: z.string().max(120).optional(),
});

const completeAlertSchema = z.object({
  vehicleId: z.string().min(1),
  alertType: z.enum(['ct', 'assurance', 'vidange']),
  date: z.coerce.date(),
  cout: z.number().min(0).default(0),
  fournisseur: z.string().max(200).optional(),
  description: z.string().max(1000).optional(),
  kmAuMoment: z.number().min(0).optional(),
  nextDueDate: z.coerce.date().optional(),
  nextDueKm: z.number().min(0).optional(),
  facturePdfUrl: z.string().url().optional(),
  createExpense: z.boolean().default(true),
  recurring: recurringSchema.optional(),
}).superRefine((input, ctx) => {
  if ((input.alertType === 'ct' || input.alertType === 'assurance') && !input.nextDueDate) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ['nextDueDate'],
      message: 'La prochaine échéance date est requise',
    });
  }

  if (input.alertType === 'vidange' && input.nextDueKm === undefined) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ['nextDueKm'],
      message: 'Le prochain kilométrage de vidange est requis',
    });
  }
});

function expenseTypeForAlert(type: 'ct' | 'assurance' | 'vidange') {
  switch (type) {
    case 'ct':
      return 'controle_technique';
    case 'assurance':
      return 'assurance';
    case 'vidange':
      return 'maintenance';
  }
}

function maintenanceTypeForAlert(type: 'ct' | 'assurance' | 'vidange') {
  switch (type) {
    case 'ct':
      return 'ct';
    case 'assurance':
      return 'assurance';
    case 'vidange':
      return 'vidange';
  }
}

function vehicleAlertUpdateForCompletion(input: z.infer<typeof completeAlertSchema>) {
  if (input.alertType === 'ct') {
    return { 'alerts.controleTechniqueExpireLe': input.nextDueDate };
  }
  if (input.alertType === 'assurance') {
    return { 'alerts.assuranceExpireLe': input.nextDueDate };
  }
  return { 'alerts.vidangeAtKm': input.nextDueKm };
}

export async function GET() {
  const session = await auth();
  if (!session) return apiError('Non autorisé', 401);

  await connectDB();

  const [vehicles, history] = await Promise.all([
    Vehicle.find({ actif: { $ne: false } })
      .select('marque modele immatriculation kilometrage alerts')
      .sort({ updatedAt: -1 })
      .lean(),
    Maintenance.find({ type: { $in: ['ct', 'assurance', 'vidange'] } })
      .populate('vehicle', 'marque modele immatriculation kilometrage')
      .sort({ date: -1, createdAt: -1 })
      .limit(100)
      .lean(),
  ]);

  const alerts = buildActiveVehicleAlerts(vehicles).sort((a, b) => {
    const severityRank = { depasse: 0, urgence: 1, warning: 2, ok: 3 };
    return severityRank[a.severity] - severityRank[b.severity];
  });

  return apiSuccess({
    alerts,
    history,
    stats: {
      total: alerts.length,
      expired: alerts.filter((item) => item.severity === 'depasse').length,
      urgent: alerts.filter((item) => item.severity === 'urgence').length,
      warning: alerts.filter((item) => item.severity === 'warning').length,
    },
  });
}

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session) return apiError('Non autorisé', 401);
  if (!['admin', 'agent', 'comptable'].includes(session.user.role)) return apiError('Accès interdit', 403);

  const limited = await rateLimit('general', session.user.id);
  if (!limited.success) return apiError('Trop de requêtes', 429);

  await connectDB();

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return apiError('Corps JSON invalide', 400);
  }

  const parsed = completeAlertSchema.safeParse(body);
  if (!parsed.success) return apiError('Données invalides', 422, parsed.error.flatten());

  const vehicle = await Vehicle.findById(parsed.data.vehicleId).lean();
  if (!vehicle) return apiError('Véhicule introuvable', 404);

  const maintenance = await Maintenance.create({
    vehicle: parsed.data.vehicleId,
    type: maintenanceTypeForAlert(parsed.data.alertType),
    description: parsed.data.description,
    cout: parsed.data.cout,
    fournisseur: parsed.data.fournisseur,
    date: parsed.data.date,
    kmAuMoment: parsed.data.kmAuMoment,
    prochaineEcheance: parsed.data.nextDueDate,
    prochaineEcheanceKm: parsed.data.nextDueKm,
    facturePdfUrl: parsed.data.facturePdfUrl,
    createdBy: session.user.id,
  });

  await Vehicle.findByIdAndUpdate(parsed.data.vehicleId, vehicleAlertUpdateForCompletion(parsed.data));

  let expense: any = null;
  if (parsed.data.createExpense && parsed.data.cout > 0) {
    expense = await Expense.create({
      type: expenseTypeForAlert(parsed.data.alertType),
      montant: parsed.data.cout,
      date: parsed.data.date,
      note: parsed.data.description || `Alerte ${parsed.data.alertType} traitée`,
      vehicleId: parsed.data.vehicleId,
      fournisseur: parsed.data.fournisseur,
      factureUrl: parsed.data.facturePdfUrl,
      sourceModule: 'alertes',
      linkedType: parsed.data.alertType,
      isRecurring: Boolean(parsed.data.recurring?.enabled),
      recurrenceFrequency: parsed.data.recurring?.enabled ? parsed.data.recurring?.frequency : undefined,
      recurrenceNextDate: parsed.data.recurring?.enabled ? parsed.data.recurring?.nextDueDate : undefined,
      recurrenceLabel: parsed.data.recurring?.enabled ? parsed.data.recurring?.label : undefined,
      createdBy: session.user.id,
    });

    await auditLog({
      action: 'create',
      entity: 'Expense',
      entityId: String(expense._id),
      userId: session.user.id,
      after: expense.toObject(),
    });
  }

  await auditLog({
    action: 'create',
    entity: 'Maintenance',
    entityId: String(maintenance._id),
    userId: session.user.id,
    after: maintenance.toObject(),
  });

  const created = await Maintenance.findById(maintenance._id)
    .populate('vehicle', 'marque modele immatriculation kilometrage')
    .lean();

  return apiSuccess({ maintenance: created, expenseCreated: Boolean(expense) }, 201);
}
