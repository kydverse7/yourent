import { Location } from '@/models/Location';
import { Reservation } from '@/models/Reservation';

export type LinkedEntityType = 'reservation' | 'location';
export type LinkedDocumentType = 'contract' | 'invoice';

type LinkedDossier = {
  canonicalEntityType: LinkedEntityType;
  canonicalEntityId: string;
  reservationId?: string;
  locationId?: string;
};

type SyncDocumentPayload = {
  number?: string;
  url?: string;
};

const FIELD_MAP = {
  contract: {
    number: 'contratNumero',
    url: 'contratPdfUrl',
  },
  invoice: {
    number: 'factureNumero',
    url: 'facturePdfUrl',
  },
} as const;

export async function getLinkedDossier(entityType: LinkedEntityType, entityId: string): Promise<LinkedDossier> {
  if (entityType === 'reservation') {
    const reservation = await Reservation.findById(entityId).select('location').lean();
    if (!reservation) throw new Error('Réservation introuvable');

    if (reservation.location) {
      return {
        canonicalEntityType: 'location',
        canonicalEntityId: String(reservation.location),
        reservationId: entityId,
        locationId: String(reservation.location),
      };
    }

    return {
      canonicalEntityType: 'reservation',
      canonicalEntityId: entityId,
      reservationId: entityId,
    };
  }

  const location = await Location.findById(entityId).select('reservation').lean();
  if (!location) throw new Error('Location introuvable');

  return {
    canonicalEntityType: 'location',
    canonicalEntityId: entityId,
    locationId: entityId,
    reservationId: location.reservation ? String(location.reservation) : undefined,
  };
}

export async function syncLinkedDocument(
  documentType: LinkedDocumentType,
  dossier: Pick<LinkedDossier, 'reservationId' | 'locationId'>,
  payload: SyncDocumentPayload,
) {
  const fields = FIELD_MAP[documentType];
  const update: Record<string, string> = {};

  if (payload.number) update[fields.number] = payload.number;
  if (payload.url) update[fields.url] = payload.url;
  if (Object.keys(update).length === 0) return;

  await Promise.all([
    dossier.reservationId
      ? Reservation.findByIdAndUpdate(dossier.reservationId, update)
      : Promise.resolve(null),
    dossier.locationId
      ? Location.findByIdAndUpdate(dossier.locationId, update)
      : Promise.resolve(null),
  ]);
}
