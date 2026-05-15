import { NextRequest } from 'next/server';
import { auth } from '@/lib/auth';
import { connectDB } from '@/lib/db';
import { Expense } from '@/models/Expense';
import { expenseSchema } from '@/lib/validators/expense.schema';
import { apiError, apiSuccess } from '@/lib/apiHelpers';
import { auditLog, diff } from '@/services/auditService';
import { rateLimit } from '@/lib/rateLimit';

type Ctx = { params: Promise<{ id: string }> };

export async function PUT(req: NextRequest, { params }: Ctx) {
  const session = await auth();
  if (!session) return apiError('Non autorisé', 401);
  if (!['admin', 'agent', 'comptable'].includes(session.user.role)) return apiError('Accès interdit', 403);

  const limited = await rateLimit('general', session.user.id);
  if (!limited.success) return apiError('Trop de requêtes', 429);

  await connectDB();
  const { id } = await params;

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return apiError('Corps JSON invalide', 400);
  }

  const parsed = expenseSchema.partial().safeParse(body);
  if (!parsed.success) return apiError('Données invalides', 422, parsed.error.flatten());

  const before = await Expense.findById(id).lean();
  if (!before) return apiError('Dépense introuvable', 404);

  const update: Record<string, unknown> = { $set: parsed.data };
  if (parsed.data.isRecurring === false) {
    update.$unset = {
      recurrenceFrequency: '',
      recurrenceNextDate: '',
      recurrenceLabel: '',
    };
  }

  const updated = await Expense.findByIdAndUpdate(id, update, { new: true, runValidators: true })
    .populate('vehicleId', 'marque modele immatriculation')
    .lean();

  await auditLog({
    action: 'update',
    entity: 'Expense',
    entityId: id,
    userId: session.user.id,
    before,
    after: updated,
    changes: diff(before, updated),
  });

  return apiSuccess(updated);
}

export async function DELETE(_req: NextRequest, { params }: Ctx) {
  const session = await auth();
  if (!session) return apiError('Non autorisé', 401);
  if (!['admin', 'agent', 'comptable'].includes(session.user.role)) return apiError('Accès interdit', 403);

  await connectDB();
  const { id } = await params;

  const expense = await Expense.findById(id).lean();
  if (!expense) return apiError('Dépense introuvable', 404);

  await Expense.findByIdAndDelete(id);

  await auditLog({
    action: 'delete',
    entity: 'Expense',
    entityId: id,
    userId: session.user.id,
    before: expense,
  });

  return apiSuccess({ message: 'Dépense supprimée' });
}
