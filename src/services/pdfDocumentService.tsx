import { renderToBuffer } from '@react-pdf/renderer';
import { Agence } from '@/models/Agence';
import { Client } from '@/models/Client';
import { Location } from '@/models/Location';
import { Payment } from '@/models/Payment';
import { Reservation } from '@/models/Reservation';
import { uploadToCloudinary } from '@/lib/cloudinary';
import { ContractPdfDocument, InvoicePdfDocument, type ContractPdfData, type InvoicePdfData } from '@/lib/pdf-documents';
import { ensureDocumentNumberForEntity } from '@/services/documentNumberService';
import { getLinkedDossier, syncLinkedDocument } from './documentLinkService';

function formatObjectIdSuffix(id: unknown) {
  const value = String(id ?? '0000');
  return value.slice(-6).toUpperCase();
}

function buildAgencyData(agency: any) {
  return {
    nom: agency?.nom ?? 'Yourent',
    adresse: agency?.adresse,
    ville: agency?.ville,
    pays: agency?.pays ?? 'Maroc',
    telephone: agency?.telephone,
    email: agency?.email,
    siteWeb: agency?.siteWeb,
    ice: agency?.ice,
    rc: agency?.rc,
    devise: agency?.parametres?.devise ?? 'MAD',
    conditionsGenerales: agency?.parametres?.conditionsGenerales,
  };
}

function buildClientData(client: any, clientInline?: any) {
  return {
    nomComplet: client
      ? `${client.prenom ?? ''} ${client.nom ?? ''}`.trim()
      : `${clientInline?.prenom ?? ''} ${clientInline?.nom ?? ''}`.trim() || 'Client non renseigné',
    telephone: client?.telephone ?? clientInline?.telephone,
    email: client?.email ?? clientInline?.email,
    adresse: client?.adresse,
    ville: client?.ville,
    documentLabel: client?.documentType || client?.documentNumber
      ? `${client.documentType ?? 'Document'} ${client.documentNumber ? `· ${client.documentNumber}` : ''}`.trim()
      : undefined,
    permisNumero: client?.permisNumero,
  };
}

function buildVehicleData(vehicle: any) {
  return {
    label: `${vehicle?.marque ?? ''} ${vehicle?.modele ?? ''}`.trim() || 'Véhicule',
    immatriculation: vehicle?.immatriculation,
    carburant: vehicle?.carburant,
    boite: vehicle?.boite,
    kilometrage: vehicle?.kilometrage,
  };
}

function paymentTypeLabel(type?: string) {
  switch (type) {
    case 'especes': return 'Espèces';
    case 'carte': return 'Carte';
    case 'virement': return 'Virement';
    case 'cheque': return 'Chèque';
    default: return '—';
  }
}

async function getAgencySingleton() {
  const agency = await Agence.findOne().lean();
  return buildAgencyData(agency);
}

async function getReservationWithRelations(id: string) {
  return Reservation.findById(id)
    .populate('vehicle')
    .populate('client')
    .lean();
}

async function getLocationWithRelations(id: string) {
  return Location.findById(id)
    .populate('vehicle')
    .populate('client')
    .populate('reservation')
    .lean();
}

export async function generateContractPdfForEntity(entityType: 'reservation' | 'location', entityId: string) {
  const dossier = await getLinkedDossier(entityType, entityId);
  if (dossier.canonicalEntityType === 'location' && dossier.canonicalEntityId !== entityId) {
    return generateContractPdfForEntity('location', dossier.canonicalEntityId);
  }

  const agency = await getAgencySingleton();

  if (dossier.canonicalEntityType === 'reservation') {
    const reservation = await getReservationWithRelations(entityId);
    if (!reservation) throw new Error('Réservation introuvable');
    const contractNumber = await ensureDocumentNumberForEntity('reservation', 'contract', entityId);

    const data: ContractPdfData = {
      title: 'Contrat de location',
      reference: contractNumber,
      createdAt: new Date(),
      agency,
      client: buildClientData(reservation.client, reservation.clientInline),
      vehicle: buildVehicleData(reservation.vehicle),
      period: {
        debutAt: reservation.debutAt,
        finAt: reservation.finAt,
        heureDepart: reservation.heureDepart,
        heureRetour: reservation.heureRetour,
        lieuDepart: reservation.lieuDepart,
        lieuRetour: reservation.lieuRetour,
      },
      cautionMontant: reservation.caution?.montant ?? reservation.vehicle?.cautionDefaut ?? 0,
      totalMontant: Number(reservation.prix?.totalEstime ?? 0),
      tarifJour: Number(reservation.prix?.parJour ?? 0),
      options: [
        { label: `Location ${buildVehicleData(reservation.vehicle).label}`, montant: Number(reservation.prix?.totalEstime ?? 0) - (reservation.optionsSupplementaires ?? []).reduce((sum: number, item: any) => sum + Number(item.prix ?? 0), 0) },
        ...(reservation.optionsSupplementaires ?? []).map((item: any) => ({
          label: `Option · ${item.nom}`,
          montant: Number(item.prix ?? 0),
        })),
      ].filter((item) => item.montant !== 0),
      notes: reservation.notes,
      conducteurSecondaire: reservation.conducteurSecondaire
        ? {
            nomComplet: `${reservation.conducteurSecondaire.prenom ?? ''} ${reservation.conducteurSecondaire.nom ?? ''}`.trim(),
            permisNumero: reservation.conducteurSecondaire.permisNumero,
          }
        : undefined,
    };

    const buffer = await renderToBuffer(<ContractPdfDocument data={data} />);
    const uploaded = await uploadToCloudinary(buffer, 'contracts/generated', `contract-reservation-${reservation._id}-${Date.now()}.pdf`, { resourceType: 'raw' });

    await syncLinkedDocument('contract', { reservationId: entityId }, { number: contractNumber, url: uploaded.url });
    const updated = await Reservation.findById(entityId).lean();
    return { url: uploaded.url, document: updated };
  }

  const location = await getLocationWithRelations(dossier.canonicalEntityId);
  if (!location) throw new Error('Location introuvable');
  const contractNumber = await ensureDocumentNumberForEntity('location', 'contract', dossier.canonicalEntityId);

  const reservation = location.reservation;
  const data: ContractPdfData = {
    title: 'Contrat de location',
    reference: contractNumber,
    createdAt: new Date(),
    agency,
    client: buildClientData(location.client),
    vehicle: buildVehicleData(location.vehicle),
    period: {
      debutAt: location.debutAt,
      finAt: location.finPrevueAt,
      heureDepart: reservation?.heureDepart,
      heureRetour: reservation?.heureRetour,
      lieuDepart: reservation?.lieuDepart,
      lieuRetour: reservation?.lieuRetour,
    },
    cautionMontant: location.caution?.montant ?? location.vehicle?.cautionDefaut ?? 0,
    totalMontant: Number(location.montantTotal ?? 0),
    tarifJour: Number(reservation?.prix?.parJour ?? 0),
    options: [
      { label: 'Location', montant: Number(location.montantTotal ?? 0) - (reservation?.optionsSupplementaires ?? []).reduce((sum: number, item: any) => sum + Number(item.prix ?? 0), 0) },
      ...((reservation?.optionsSupplementaires ?? []) as any[]).map((item) => ({
        label: `Option · ${item.nom}`,
        montant: Number(item.prix ?? 0),
      })),
    ].filter((item) => item.montant !== 0),
    notes: reservation?.notes,
    conducteurSecondaire: reservation?.conducteurSecondaire
      ? {
          nomComplet: `${reservation.conducteurSecondaire.prenom ?? ''} ${reservation.conducteurSecondaire.nom ?? ''}`.trim(),
          permisNumero: reservation.conducteurSecondaire.permisNumero,
        }
      : undefined,
  };

  const buffer = await renderToBuffer(<ContractPdfDocument data={data} />);
  const uploaded = await uploadToCloudinary(buffer, 'contracts/generated', `contract-location-${location._id}-${Date.now()}.pdf`, { resourceType: 'raw' });

  await syncLinkedDocument(
    'contract',
    { reservationId: dossier.reservationId, locationId: dossier.canonicalEntityId },
    { number: contractNumber, url: uploaded.url },
  );
  const updated = await Location.findById(dossier.canonicalEntityId).lean();
  return { url: uploaded.url, document: updated };
}

export async function generateInvoicePdfForEntity(entityType: 'reservation' | 'location', entityId: string) {
  const dossier = await getLinkedDossier(entityType, entityId);
  if (dossier.canonicalEntityType === 'location' && dossier.canonicalEntityId !== entityId) {
    return generateInvoicePdfForEntity('location', dossier.canonicalEntityId);
  }

  const agency = await getAgencySingleton();

  if (dossier.canonicalEntityType === 'reservation') {
    const reservation = await getReservationWithRelations(entityId);
    if (!reservation) throw new Error('Réservation introuvable');
    const invoiceNumber = await ensureDocumentNumberForEntity('reservation', 'invoice', entityId);

    const payments = await Payment.find({
      reservation: reservation._id,
      statut: 'effectue',
      categorie: { $nin: ['caution', 'caution_restitution'] },
    }).lean();

    const montantPaye = payments.reduce((sum, item) => sum + Number(item.montant ?? 0), 0);
    const totalMontant = Number(reservation.prix?.totalEstime ?? 0);
    const paiementDominant = payments[0]?.type;

    const vehicleLabel = `${reservation.vehicle?.marque ?? ''} ${reservation.vehicle?.modele ?? ''}`.trim();
    const nbJoursRes = Math.max(1, Math.ceil((new Date(reservation.finAt).getTime() - new Date(reservation.debutAt).getTime()) / (1000 * 60 * 60 * 24)));

    const lines = [
      { label: `Location ${vehicleLabel} (${nbJoursRes} jour${nbJoursRes > 1 ? 's' : ''})`, montant: totalMontant - (reservation.optionsSupplementaires ?? []).reduce((sum: number, item: any) => sum + Number(item.prix ?? 0), 0) },
      ...(reservation.optionsSupplementaires ?? []).map((item: any) => ({ label: `Option · ${item.nom}`, montant: Number(item.prix ?? 0) })),
      ...(reservation.prix?.remise ? [{ label: 'Remise commerciale', montant: -Math.abs(Number(reservation.prix.remise)) }] : []),
    ].filter((item) => item.montant !== 0);

    const data: InvoicePdfData = {
      title: 'Facture',
      reference: invoiceNumber,
      createdAt: new Date(),
      agency,
      client: buildClientData(reservation.client, reservation.clientInline),
      vehicle: buildVehicleData(reservation.vehicle),
      dossierLabel: `Réservation ${formatObjectIdSuffix(reservation._id)}`,
      statut: reservation.statut,
      period: {
        debutAt: reservation.debutAt,
        finAt: reservation.finAt,
      },
      lines,
      totalMontant,
      montantPaye,
      montantRestant: Math.max(0, totalMontant - montantPaye),
      paiementModeLabel: paymentTypeLabel(paiementDominant),
    };

    const buffer = await renderToBuffer(<InvoicePdfDocument data={data} />);
    const uploaded = await uploadToCloudinary(buffer, 'invoices/generated', `invoice-reservation-${reservation._id}-${Date.now()}.pdf`, { resourceType: 'raw' });

    await syncLinkedDocument('invoice', { reservationId: entityId }, { number: invoiceNumber, url: uploaded.url });
    const updated = await Reservation.findById(entityId).lean();
    return { url: uploaded.url, document: updated };
  }

  const location = await getLocationWithRelations(dossier.canonicalEntityId);
  if (!location) throw new Error('Location introuvable');
  const invoiceNumber = await ensureDocumentNumberForEntity('location', 'invoice', dossier.canonicalEntityId);

  const reservation = location.reservation;
  const payments = await Payment.find({
    location: location._id,
    statut: 'effectue',
    categorie: { $nin: ['caution', 'caution_restitution'] },
  }).lean();

  const montantPaye = payments.reduce((sum, item) => sum + Number(item.montant ?? 0), 0);
  const totalMontant = Number(location.montantTotal ?? 0);
  const paiementDominant = payments[0]?.type;

  const vehicleLabelLoc = `${location.vehicle?.marque ?? ''} ${location.vehicle?.modele ?? ''}`.trim();
  const finDateLoc = location.finReelleAt ?? location.finPrevueAt;
  const nbJoursLoc = finDateLoc && location.debutAt ? Math.max(1, Math.ceil((new Date(finDateLoc).getTime() - new Date(location.debutAt).getTime()) / (1000 * 60 * 60 * 24))) : 0;

  const lines = [
    { label: `Location ${vehicleLabelLoc}${nbJoursLoc > 0 ? ` (${nbJoursLoc} jour${nbJoursLoc > 1 ? 's' : ''})` : ''}`, montant: totalMontant - ((reservation?.optionsSupplementaires ?? []) as any[]).reduce((sum: number, item: any) => sum + Number(item.prix ?? 0), 0) },
    ...(((reservation?.optionsSupplementaires ?? []) as any[]).map((item) => ({ label: `Option · ${item.nom}`, montant: Number(item.prix ?? 0) }))),
    ...(location.fraisKmSupp ? [{ label: 'Frais kilométriques', montant: Number(location.fraisKmSupp) }] : []),
  ].filter((item) => item.montant !== 0);

  const data: InvoicePdfData = {
    title: 'Facture',
    reference: invoiceNumber,
    createdAt: new Date(),
    agency,
    client: buildClientData(location.client),
    vehicle: buildVehicleData(location.vehicle),
    dossierLabel: `Location ${formatObjectIdSuffix(location._id)}`,
    statut: location.statut,
    period: {
      debutAt: location.debutAt,
      finAt: location.finReelleAt ?? location.finPrevueAt,
    },
    lines,
    totalMontant,
    montantPaye,
    montantRestant: Math.max(0, Number(location.montantRestant ?? totalMontant - montantPaye)),
    paiementModeLabel: paymentTypeLabel(paiementDominant),
  };

  const buffer = await renderToBuffer(<InvoicePdfDocument data={data} />);
  const uploaded = await uploadToCloudinary(buffer, 'invoices/generated', `invoice-location-${location._id}-${Date.now()}.pdf`, { resourceType: 'raw' });

  await syncLinkedDocument(
    'invoice',
    { reservationId: dossier.reservationId, locationId: dossier.canonicalEntityId },
    { number: invoiceNumber, url: uploaded.url },
  );
  const updated = await Location.findById(dossier.canonicalEntityId).lean();
  return { url: uploaded.url, document: updated };
}
