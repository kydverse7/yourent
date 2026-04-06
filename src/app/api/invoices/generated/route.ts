import { NextRequest } from 'next/server';
import { auth } from '@/lib/auth';
import { connectDB } from '@/lib/db';
import { apiError, apiPaginated } from '@/lib/apiHelpers';
import { parsePaginationParams } from '@/lib/utils';
import { GeneratedDocument } from '@/models/GeneratedDocument';

type GeneratedDocumentRow = {
  _id: string;
  reference: string;
  documentType: 'facture' | 'devis';
  pdfUrl: string;
  createdAt?: Date;
  clientLabel: string;
  clientPhone?: string;
  clientEmail?: string;
  vehicleLabel: string;
  totalMontant: number;
};

export async function GET(req: NextRequest) {
  const session = await auth();
  if (!session) return apiError('Non autorisé', 401);
  if (!['admin', 'agent', 'comptable'].includes(session.user.role)) return apiError('Accès interdit', 403);

  await connectDB();

  const { searchParams } = req.nextUrl;
  const { page, limit, skip } = parsePaginationParams(searchParams);
  const documentType = searchParams.get('documentType');

  const filter: Record<string, unknown> = {};
  if (documentType === 'facture' || documentType === 'devis') {
    filter.documentType = documentType;
  }

  const [documents, total] = await Promise.all([
    GeneratedDocument.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
    GeneratedDocument.countDocuments(filter),
  ]);

  const rows: GeneratedDocumentRow[] = documents.map((document: any) => ({
    _id: String(document._id),
    reference: document.reference,
    documentType: document.documentType,
    pdfUrl: document.pdfUrl,
    createdAt: document.createdAt,
    clientLabel: document.clientSnapshot?.nomComplet ?? 'Client non renseigné',
    clientPhone: document.clientSnapshot?.telephone,
    clientEmail: document.clientSnapshot?.email,
    vehicleLabel: Array.isArray(document.vehicles) && document.vehicles.length > 0
      ? document.vehicles
          .map((vehicle: any) => [vehicle.label, vehicle.immatriculation].filter(Boolean).join(' · '))
          .join(' • ')
      : 'Véhicule non renseigné',
    totalMontant: Number(document.totalMontant ?? 0),
  }));

  return apiPaginated(rows, { total, page, limit });
}