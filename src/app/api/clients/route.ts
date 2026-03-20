import { NextRequest } from 'next/server';
import { auth } from '@/lib/auth';
import { connectDB } from '@/lib/db';
import { Client } from '@/models/Client';
import { clientSchema } from '@/lib/validators/client.schema';
import { apiError, apiPaginated, apiSuccess } from '@/lib/apiHelpers';
import { parsePaginationParams } from '@/lib/utils';
import { auditLog } from '@/services/auditService';
import { rateLimit } from '@/lib/rateLimit';

export async function GET(req: NextRequest) {
  const session = await auth();
  if (!session) return apiError('Non autorisé', 401);

  await connectDB();
  const { searchParams } = req.nextUrl;
  const { page, limit, skip } = parsePaginationParams(searchParams);

  const filter: Record<string, any> = { actif: true };
  const q = searchParams.get('q');
  if (q) filter.$text = { $search: q };
  const blacklist = searchParams.get('blacklist');
  if (blacklist === 'true') filter['blacklist.actif'] = true;

  const [items, total] = await Promise.all([
    Client.find(filter)
      .select('type nom prenom telephone email documentNumber vip blacklist stats actif createdAt')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean(),
    Client.countDocuments(filter),
  ]);

  return apiPaginated(items, { total, page, limit });
}

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session) return apiError('Non autorisé', 401);

  const limited = await rateLimit('general', session.user.id);
  if (!limited.success) return apiError('Trop de requêtes', 429);

  await connectDB();

  let body: unknown;
  try { body = await req.json(); }
  catch { return apiError('Corps JSON invalide', 400); }

  const parsed = clientSchema.safeParse(body);
  if (!parsed.success) return apiError('Données invalides', 422, parsed.error.flatten());

  // Vérifier doublons (email)
  if (parsed.data.email) {
    const existing = await Client.findOne({ email: parsed.data.email, actif: true }).lean();
    if (existing) return apiError('Un client avec cet email existe déjà', 409);
  }

  const client = await Client.create(parsed.data);

  await auditLog({
    action: 'create',
    entity: 'Client',
    entityId: String(client._id),
    userId: session.user.id,
    after: client.toObject(),
  });

  return apiSuccess(client, 201);
}
