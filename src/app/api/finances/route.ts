import { NextRequest } from 'next/server';
import { auth } from '@/lib/auth';
import { connectDB } from '@/lib/db';
import { apiError, apiSuccess } from '@/lib/apiHelpers';
import { rateLimit } from '@/lib/rateLimit';
import {
  getFinanceSummary,
  getRevenusParVehicule,
  getChartRevenusDepenses,
} from '@/services/financeService';

// TOUTES les fonctions de financeService excluent automatiquement caution + caution_restitution
export async function GET(req: NextRequest) {
  const session = await auth();
  if (!session) return apiError('Non autorisé', 401);
  if (!['admin', 'agent', 'comptable'].includes(session.user.role)) return apiError('Accès interdit', 403);

  const limited = await rateLimit('general', session.user.id);
  if (!limited.success) return apiError('Trop de requêtes', 429);

  await connectDB();

  const { searchParams } = req.nextUrl;
  const now = new Date();
  const defaultFrom = new Date(now.getFullYear(), 0, 1); // 1er janvier de l'année courante
  const from = searchParams.get('from') ? new Date(searchParams.get('from')!) : defaultFrom;
  const to = searchParams.get('to') ? new Date(searchParams.get('to')!) : now;
  const view = searchParams.get('view') ?? 'summary';

  switch (view) {
    case 'summary':
      return apiSuccess(await getFinanceSummary(from, to));
    case 'vehicules':
      return apiSuccess(await getRevenusParVehicule(from, to));
    case 'chart':
      return apiSuccess(await getChartRevenusDepenses(from, to));
    default:
      return apiError('Vue invalide. Valeurs: summary, vehicules, chart', 400);
  }
}
