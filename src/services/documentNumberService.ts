import { DocumentSequence } from '@/models/DocumentSequence';
import { Location } from '@/models/Location';
import { Reservation } from '@/models/Reservation';

type EntityType = 'reservation' | 'location';
type DocumentType = 'contract' | 'invoice' | 'quote';

type DocumentConfig = {
  prefix: string;
  field: 'contratNumero' | 'factureNumero' | '';
};

const DOCUMENT_CONFIG: Record<DocumentType, DocumentConfig> = {
  contract: {
    prefix: 'CTR',
    field: 'contratNumero',
  },
  invoice: {
    prefix: 'FAC',
    field: 'factureNumero',
  },
  quote: {
    prefix: 'DEV',
    field: '',
  },
};

function getPeriod(date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  return `${year}-${month}`;
}

function formatDocumentNumber(documentType: DocumentType, sequence: number, issuedAt = new Date()) {
  const config = DOCUMENT_CONFIG[documentType];
  return `${config.prefix}-${getPeriod(issuedAt)}-${String(sequence).padStart(6, '0')}`;
}

function getEntityModel(entityType: EntityType) {
  return entityType === 'reservation' ? Reservation : Location;
}

async function generateNextDocumentNumber(documentType: DocumentType, issuedAt = new Date()) {
  const period = getPeriod(issuedAt);
  const sequence = await DocumentSequence.findOneAndUpdate(
    { documentType, period },
    {
      $inc: { lastValue: 1 },
      $setOnInsert: { documentType, period },
    },
    {
      new: true,
      upsert: true,
      setDefaultsOnInsert: true,
    }
  ).lean();

  return formatDocumentNumber(documentType, Number(sequence?.lastValue ?? 1), issuedAt);
}

export async function ensureDocumentNumberForEntity(
  entityType: EntityType,
  documentType: DocumentType,
  entityId: string,
  issuedAt = new Date()
) {
  const Model = getEntityModel(entityType);
  const { field } = DOCUMENT_CONFIG[documentType];

  const existing = (await Model.findById(entityId).select(field).lean()) as Record<string, unknown> | null;
  if (!existing) {
    throw new Error('Dossier introuvable');
  }

  const current = existing[field];
  if (typeof current === 'string' && current.trim()) {
    return current.trim();
  }

  for (let attempt = 0; attempt < 3; attempt += 1) {
    const nextNumber = await generateNextDocumentNumber(documentType, issuedAt);

    const updated = (await Model.findOneAndUpdate(
      {
        _id: entityId,
        $or: [{ [field]: { $exists: false } }, { [field]: null }, { [field]: '' }],
      },
      { [field]: nextNumber },
      { new: true }
    )
      .select(field)
      .lean()) as Record<string, unknown> | null;

    const saved = updated?.[field];
    if (typeof saved === 'string' && saved.trim()) {
      return saved.trim();
    }

    const reloaded = (await Model.findById(entityId).select(field).lean()) as Record<string, unknown> | null;
    const reloadedValue = reloaded?.[field];
    if (typeof reloadedValue === 'string' && reloadedValue.trim()) {
      return reloadedValue.trim();
    }
  }

  throw new Error('Impossible d’attribuer un numéro de document');
}
export async function generateStandaloneDocumentNumber(
  documentType: DocumentType,
  issuedAt = new Date()
) {
  return generateNextDocumentNumber(documentType, issuedAt);
}