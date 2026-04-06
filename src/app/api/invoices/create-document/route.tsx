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
import { GeneratedDocument } from '@/models/GeneratedDocument';
import { FreeDocumentPdfDocument, type FreeDocumentPdfData } from '@/lib/pdf-documents';
import { generateStandaloneDocumentNumber } from '@/services/documentNumberService';
import { auditLog } from '@/services/auditService';

const optionLineSchema = z.object({
  nom: z.string().min(1),
  prix: z.number().min(0),
});

const vehicleEntrySchema = z.object({
  vehicleId: z.string().min(1, 'Véhicule requis'),
  debutAt: z.string().min(1, 'Date début requise'),
  finAt: z.string().min(1, 'Date fin requise'),
  tarifJour: z.number().min(0, 'Tarif invalide'),
});

const createDocumentSchema = z.object({
  documentType: z.enum(['facture', 'devis']),
  clientId: z.string().min(1, 'Client requis'),
  vehicles: z.array(vehicleEntrySchema).min(1, 'Au moins un véhicule requis'),
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

  const { documentType, clientId, vehicles: vehicleEntries, options, remise, notes } = parsed.data;

  try {
    const [client, agencySingleton] = await Promise.all([
      Client.findById(clientId).lean(),
      Agence.findOne().lean(),
    ]);

    if (!client) return apiError('Client introuvable', 404);

    // Resolve all vehicles in parallel
    const vehicleIds = vehicleEntries.map((v) => v.vehicleId);
    const vehicleDocs = await Vehicle.find({ _id: { $in: vehicleIds } }).lean();
    const vehicleMap = new Map(vehicleDocs.map((v: any) => [String(v._id), v]));

    for (const entry of vehicleEntries) {
      if (!vehicleMap.has(entry.vehicleId)) return apiError(`Véhicule introuvable: ${entry.vehicleId}`, 404);
    }

    // Build lines per vehicle
    const lines: { label: string; montant: number }[] = [];
    let locationTotal = 0;

    const pdfVehicles: FreeDocumentPdfData['vehicles'] = [];

    for (const entry of vehicleEntries) {
      const vehicle = vehicleMap.get(entry.vehicleId)!;
      const debut = new Date(entry.debutAt);
      const fin = new Date(entry.finAt);
      const nbJours = Math.max(1, Math.ceil((fin.getTime() - debut.getTime()) / (1000 * 60 * 60 * 24)));
      const vehicleLabel = `${(vehicle as any).marque ?? ''} ${(vehicle as any).modele ?? ''}`.trim() || 'Véhicule';
      const montant = entry.tarifJour * nbJours;
      locationTotal += montant;

      lines.push({
        label: `Location ${vehicleLabel} (${nbJours} jour${nbJours > 1 ? 's' : ''} × ${entry.tarifJour} MAD)`,
        montant,
      });

      pdfVehicles.push({
        label: vehicleLabel,
        immatriculation: (vehicle as any).immatriculation,
        carburant: (vehicle as any).carburant,
        boite: (vehicle as any).boite,
        nbJours,
        tarifJour: entry.tarifJour,
        debutAt: debut,
        finAt: fin,
      });
    }

    // Add options
    for (const opt of options) {
      lines.push({ label: `Option · ${opt.nom}`, montant: opt.prix });
    }
    const filteredLines = lines.filter((l) => l.montant !== 0);

    const optionsTotal = options.reduce((sum, opt) => sum + opt.prix, 0);
    const totalBrut = locationTotal + optionsTotal;
    const totalMontant = Math.max(0, totalBrut - remise);

    if (remise > 0) {
      filteredLines.push({ label: 'Remise commerciale', montant: -remise });
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

    const pdfData: FreeDocumentPdfData = {
      title: isQuote ? 'Devis' : 'Facture',
      reference,
      createdAt: new Date(),
      agency,
      client: clientData,
      vehicles: pdfVehicles,
      lines: filteredLines,
      totalMontant,
      remise: remise > 0 ? remise : undefined,
      notes,
    };

    const buffer = await renderToBuffer(<FreeDocumentPdfDocument data={pdfData} />);
    const folder = isQuote ? 'quotes/generated' : 'invoices/generated';
    const publicId = `${isQuote ? 'quote' : 'invoice'}-free-${Date.now()}.pdf`;
    const uploaded = await uploadToCloudinary(buffer, folder, publicId, { resourceType: 'raw' });

    await GeneratedDocument.create({
      reference,
      documentType,
      client: (client as any)._id,
      clientSnapshot: {
        nomComplet: clientData.nomComplet,
        telephone: clientData.telephone,
        email: clientData.email,
      },
      vehicles: pdfVehicles.map((vehicle, index) => ({
        vehicle: vehicleEntries[index]?.vehicleId,
        label: vehicle.label,
        immatriculation: vehicle.immatriculation,
      })),
      pdfUrl: uploaded.url,
      totalMontant,
      devise: agency.devise,
      notes,
      createdBy: session.user.id,
    });

    await auditLog({
      action: 'create',
      entity: isQuote ? 'Quote' : 'Invoice',
      entityId: reference,
      userId: session.user.id,
      after: {
        reference,
        documentType,
        clientId,
        vehicleIds: vehicleIds,
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
