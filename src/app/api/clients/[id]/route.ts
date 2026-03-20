import { NextRequest } from 'next/server';
import { auth } from '@/lib/auth';
import { connectDB } from '@/lib/db';
import { Client } from '@/models/Client';
import { clientSchema, blacklistSchema } from '@/lib/validators/client.schema';
import { apiError, apiSuccess } from '@/lib/apiHelpers';
import { auditLog, diff } from '@/services/auditService';
import { rateLimit } from '@/lib/rateLimit';

type Ctx = { params: Promise<{ id: string }> };

export async function GET(_req: NextRequest, { params }: Ctx) {
  const session = await auth();
  if (!session) return apiError('Non autorisé', 401);

  await connectDB();
  const { id } = await params;
  const client = await Client.findById(id).lean();
  if (!client) return apiError('Client introuvable', 404);
  return apiSuccess(client);
}

export async function PUT(req: NextRequest, { params }: Ctx) {
  const session = await auth();
  if (!session) return apiError('Non autorisé', 401);

  const limited = await rateLimit('general', session.user.id);
  if (!limited.success) return apiError('Trop de requêtes', 429);

  await connectDB();
  const { id } = await params;

  let body: unknown;
  try { body = await req.json(); }
  catch { return apiError('Corps JSON invalide', 400); }

  const parsed = clientSchema.partial().safeParse(body);
  if (!parsed.success) return apiError('Données invalides', 422, parsed.error.flatten());

  const before = await Client.findById(id).lean();
  if (!before) return apiError('Client introuvable', 404);

  const updated = await Client.findByIdAndUpdate(id, parsed.data, { new: true, runValidators: true }).lean();

  await auditLog({
    action: 'update',
    entity: 'Client',
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
  if (session.user.role !== 'admin') return apiError('Réservé aux administrateurs', 403);

  await connectDB();
  const { id } = await params;
  const client = await Client.findById(id).lean();
  if (!client) return apiError('Client introuvable', 404);

  await Client.findByIdAndUpdate(id, { actif: false });
  await auditLog({ action: 'delete', entity: 'Client', entityId: id, userId: session.user.id, before: client });
  return apiSuccess({ message: 'Client archivé' });
}
