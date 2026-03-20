import { NextRequest } from 'next/server';
import { auth } from '@/lib/auth';
import { connectDB } from '@/lib/db';
import { Client } from '@/models/Client';
import { blacklistSchema } from '@/lib/validators/client.schema';
import { apiError, apiSuccess } from '@/lib/apiHelpers';
import { auditLog } from '@/services/auditService';

type Ctx = { params: Promise<{ id: string }> };

// POST /api/clients/[id]/blacklist  → mettre en blacklist
// DELETE /api/clients/[id]/blacklist → lever la blacklist

export async function POST(req: NextRequest, { params }: Ctx) {
  const session = await auth();
  if (!session) return apiError('Non autorisé', 401);
  if (!['admin', 'agent'].includes(session.user.role)) return apiError('Accès interdit', 403);

  await connectDB();
  const { id } = await params;

  let body: unknown;
  try { body = await req.json(); }
  catch { return apiError('Corps JSON invalide', 400); }

  const parsed = blacklistSchema.safeParse(body);
  if (!parsed.success) return apiError('Motif requis (min. 10 caractères)', 422, parsed.error.flatten());

  const client = await Client.findById(id);
  if (!client) return apiError('Client introuvable', 404);
  if (client.blacklist?.actif) return apiError('Client déjà en liste noire', 409);

  await Client.findByIdAndUpdate(id, {
    'blacklist.actif': true,
    'blacklist.motif': parsed.data.motif,
    'blacklist.dateBlacklist': new Date(),
    'blacklist.blacklistedBy': session.user.id,
  });

  await auditLog({
    action: 'blacklist',
    entity: 'Client',
    entityId: id,
    userId: session.user.id,
    after: { motif: parsed.data.motif },
  });

  return apiSuccess({ message: 'Client placé en liste noire' });
}

export async function DELETE(_req: NextRequest, { params }: Ctx) {
  const session = await auth();
  if (!session) return apiError('Non autorisé', 401);
  if (session.user.role !== 'admin') return apiError('Réservé aux administrateurs', 403);

  await connectDB();
  const { id } = await params;

  const client = await Client.findById(id);
  if (!client) return apiError('Client introuvable', 404);
  if (!client.blacklist?.actif) return apiError('Client non blacklisté', 409);

  await Client.findByIdAndUpdate(id, {
    'blacklist.actif': false,
    'blacklist.motif': null,
    'blacklist.dateBlacklist': null,
    'blacklist.blacklistedBy': null,
  });

  await auditLog({ action: 'unblacklist', entity: 'Client', entityId: id, userId: session.user.id });
  return apiSuccess({ message: 'Liste noire levée' });
}

