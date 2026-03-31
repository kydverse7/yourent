import { NextRequest } from 'next/server';
import { z } from 'zod';
import { renderToBuffer } from '@react-pdf/renderer';
import { auth } from '@/lib/auth';
import { connectDB } from '@/lib/db';
import { apiError, apiSuccess } from '@/lib/apiHelpers';
import { rateLimit } from '@/lib/rateLimit';
import { uploadToCloudinary } from '@/lib/cloudinary';
import { Client } from '@/models/Client';
import { Vehicle } from '@/models/Vehicle';
import { Agence } from '@/models/Agence';
import { FreeDocumentPdfDocument, type FreeDocumentPdfData } from '@/lib/pdf-documents';
import { generateStandaloneDocumentNumber } from '@/services/documentNumberService';
import { auditLog } from '@/services/auditService';

const optionLineSchema = z.object({
  nom: z.string().min(1),
  prix: z.number().min(0),
});

const createDocumentSchema = z.object({
  documentType: z.enum(['facture', 'devis']),
  clientId: z.string().min(1, 'Client requis'),
  vehicleId: z.string().min(1, 'Véhicule requis'),
  debutAt: z.string().min(1, 'Date début requise'),
  finAt: z.string().min(1, 'Date fin requise'),
  tarifJour: z.number().min(0, 'Tarif invalide'),
  options: z.array(optionLineSchema).default([]),
  remise: z.number().min(0).default(0),
  notes: z.string().optional(),
});

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

  const parsed = createDocumentSchema.safeParse(body);
  if (!parsed.success) return apiError('Données invalides', 422, parsed.error.flatten());

  const { documentType, clientId, vehicleId, debutAt, finAt, tarifJour, options, remise, notes } = parsed.data;

  try {
    const [client, vehicle, agencySingleton] = await Promise.all([
      Client.findById(clientId).lean(),
      Vehicle.findById(vehicleId).lean(),
      Agence.findOne().lean(),
    ]);

    if (!client) return apiError('Client introuvable', 404);
    if (!vehicle) return apiError('Véhicule introuvable', 404);

    const debut = new Date(debutAt);
    const fin = new Date(finAt);
    const nbJours = Math.max(1, Math.ceil((fin.getTime() - debut.getTime()) / (1000 * 60 * 60 * 24)));

    const locationBase = tarifJour * nbJours;
    const optionsTotal = options.reduce((sum, opt) => sum + opt.prix, 0);
    const totalBrut = locationBase + optionsTotal;
    const totalMontant = Math.max(0, totalBrut - remise);

    const lines = [
      { label: `Location (${nbJours} jour${nbJours > 1 ? 's' : ''} × ${tarifJour} MAD)`, montant: locationBase },
      ...options.map((opt) => ({ label: `Option · ${opt.nom}`, montant: opt.prix })),
    ].filter((l) => l.montant !== 0);

    if (remise > 0) {
      lines.push({ label: 'Remise commerciale', montant: -remise });
    }

    const isQuote = documentType === 'devis';
    const docNumberType = isQuote ? 'quote' as const : 'invoice' as const;
    const reference = await generateStandaloneDocumentNumber(docNumberType);

    const agency = {
      nom: (agencySingleton as any)?.nom ?? 'Yourent',
      adresse: (agencySingleton as any)?.adresse,
      ville: (agencySingleton as any)?.ville,
      pays: (agencySingleton as any)?.pays ?? 'Maroc',
      telephone: (agencySingleton as any)?.telephone,
      email: (agencySingleton as any)?.email,
      siteWeb: (agencySingleton as any)?.siteWeb,
      ice: (agencySingleton as any)?.ice,
      rc: (agencySingleton as any)?.rc,
      devise: (agencySingleton as any)?.parametres?.devise ?? 'MAD',
    };

    const clientData = {
      nomComplet: `${(client as any).prenom ?? ''} ${(client as any).nom ?? ''}`.trim() || 'Client',
      telephone: (client as any).telephone,
      email: (client as any).email,
      adresse: (client as any).adresse,
      ville: (client as any).ville,
      documentLabel: (client as any).documentType || (client as any).documentNumber
        ? `${(client as any).documentType ?? 'Document'} ${(client as any).documentNumber ? `· ${(client as any).documentNumber}` : ''}`.trim()
        : undefined,
    };

    const vehicleData = {
      label: `${(vehicle as any).marque ?? ''} ${(vehicle as any).modele ?? ''}`.trim() || 'Véhicule',
      immatriculation: (vehicle as any).immatriculation,
      carburant: (vehicle as any).carburant,
      boite: (vehicle as any).boite,
      kilometrage: (vehicle as any).kilometrage,
    };

    const pdfData: FreeDocumentPdfData = {
      title: isQuote ? 'Devis' : 'Facture',
      reference,
      createdAt: new Date(),
      agency,
      client: clientData,
      vehicle: vehicleData,
      period: { debutAt: debut, finAt: fin },
      nbJours,
      tarifJour,
      lines,
      totalMontant,
      remise: remise > 0 ? remise : undefined,
      notes,
    };

    const buffer = await renderToBuffer(<FreeDocumentPdfDocument data={pdfData} />);
    const folder = isQuote ? 'quotes/generated' : 'invoices/generated';
    const publicId = `${isQuote ? 'quote' : 'invoice'}-free-${Date.now()}.pdf`;
    const uploaded = await uploadToCloudinary(buffer, folder, publicId, { resourceType: 'raw' });

    await auditLog({
      action: 'create',
      entity: isQuote ? 'Quote' : 'Invoice',
      entityId: reference,
      userId: session.user.id,
      after: {
        reference,
        documentType,
        clientId,
        vehicleId,
        totalMontant,
        url: uploaded.url,
      },
    });

    return apiSuccess({
      url: uploaded.url,
      reference,
      documentType,
      totalMontant,
    });
  } catch (error) {
    return apiError(error instanceof Error ? error.message : 'Génération du document impossible', 500);
  }
}
