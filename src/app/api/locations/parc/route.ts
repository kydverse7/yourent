import { auth } from '@/lib/auth';
import { connectDB } from '@/lib/db';
import { Vehicle } from '@/models/Vehicle';
import { Location } from '@/models/Location';
import { apiError, apiSuccess } from '@/lib/apiHelpers';
import { buildParcRows } from '@/lib/export/parcExport';

export async function GET() {
  const session = await auth();
  if (!session) return apiError('Non autorisé', 401);

  await connectDB();

  const [vehicles, locations] = await Promise.all([
    Vehicle.find({ actif: { $ne: false } })
      .select('marque modele immatriculation statut')
      .lean(),
    Location.find({ statut: 'en_cours' })
      .populate('vehicle', '_id')
      .populate('client', 'prenom nom')
      .select('vehicle client debutAt finPrevueAt nbJours')
      .lean(),
  ]);

  return apiSuccess(buildParcRows(vehicles, locations));
}
