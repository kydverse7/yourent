import { NextRequest } from 'next/server';
import { z } from 'zod';
import { auth } from '@/lib/auth';
import { connectDB } from '@/lib/db';
import { apiError, apiSuccess } from '@/lib/apiHelpers';
import { rateLimit } from '@/lib/rateLimit';
import { auditLog } from '@/services/auditService';
import { generateContractPdfForEntity } from '@/services/pdfDocumentService';

const generateSchema = z.object({
  entityType: z.enum(['reservation', 'location']),
  entityId: z.string().min(1, 'Dossier requis'),
});

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session) return apiError('Non autorisé', 401);
  if (!['admin', 'agent'].includes(session.user.role)) return apiError('Accès interdit', 403);

  const limited = await rateLimit('general', session.user.id);
  if (!limited.success) return apiError('Trop de requêtes', 429);

  await connectDB();

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return apiError('Corps JSON invalide', 400);
  }

  const parsed = generateSchema.safeParse(body);
  if (!parsed.success) return apiError('Données invalides', 422, parsed.error.flatten());

  try {
    const result = await generateContractPdfForEntity(parsed.data.entityType, parsed.data.entityId);

    await auditLog({
      action: 'update',
      entity: parsed.data.entityType === 'reservation' ? 'Reservation' : 'Location',
      entityId: parsed.data.entityId,
      userId: session.user.id,
      after: result.document,
    });

    return apiSuccess({ url: result.url, document: result.document });
  } catch (error) {
    return apiError(error instanceof Error ? error.message : 'Génération du contrat impossible', 500);
  }
}
