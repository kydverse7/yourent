import { NextRequest } from 'next/server';
import { auth } from '@/lib/auth';
import { connectDB } from '@/lib/db';
import { Expense } from '@/models/Expense';
import { expenseSchema } from '@/lib/validators/expense.schema';
import { apiError, apiPaginated, apiSuccess } from '@/lib/apiHelpers';
import { parsePaginationParams } from '@/lib/utils';
import { auditLog } from '@/services/auditService';
import { rateLimit } from '@/lib/rateLimit';

export async function GET(req: NextRequest) {
  const session = await auth();
  if (!session) return apiError('Non autorisé', 401);
  if (!['admin', 'agent', 'comptable'].includes(session.user.role)) return apiError('Accès interdit', 403);

  await connectDB();
  const { searchParams } = req.nextUrl;
  const { page, limit, skip } = parsePaginationParams(searchParams);

  const filter: Record<string, unknown> = {};
  const type = searchParams.get('type');
  if (type) filter.type = type;
  const vehicleId = searchParams.get('vehicle');
  if (vehicleId) filter.vehicleId = vehicleId;

  const [items, total] = await Promise.all([
    Expense.find(filter)
      .populate('vehicleId', 'marque modele immatriculation')
      .sort({ date: -1, createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean(),
    Expense.countDocuments(filter),
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
  try {
    body = await req.json();
  } catch {
    return apiError('Corps JSON invalide', 400);
  }

  const parsed = expenseSchema.safeParse(body);
  if (!parsed.success) return apiError('Données invalides', 422, parsed.error.flatten());

  const expense = await Expense.create({
    type: parsed.data.type,
    montant: parsed.data.montant,
    date: parsed.data.date,
    note: parsed.data.note,
    vehicleId: parsed.data.vehicleId,
    fournisseur: parsed.data.fournisseur,
    factureUrl: parsed.data.factureUrl,
    sourceModule: parsed.data.sourceModule ?? 'manual',
    linkedType: parsed.data.linkedType,
    isRecurring: parsed.data.isRecurring ?? false,
    recurrenceFrequency: parsed.data.recurrenceFrequency,
    recurrenceNextDate: parsed.data.recurrenceNextDate,
    recurrenceLabel: parsed.data.recurrenceLabel,
    createdBy: session.user.id,
  });

  await auditLog({
    action: 'create',
    entity: 'Expense',
    entityId: String(expense._id),
    userId: session.user.id,
    after: expense.toObject(),
  });

  const created = await Expense.findById(expense._id)
    .populate('vehicleId', 'marque modele immatriculation')
    .lean();

  return apiSuccess(created, 201);
}
