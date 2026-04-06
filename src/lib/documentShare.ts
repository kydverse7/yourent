export type ShareDocumentType = 'facture' | 'devis';

export function getDocumentTypeLabel(documentType: ShareDocumentType): string {
  return documentType === 'devis' ? 'devis' : 'facture';
}

export function buildDocumentEmailSubject(documentType: ShareDocumentType, reference: string): string {
  return `${documentType === 'devis' ? 'Votre devis' : 'Votre facture'} ${reference} - Yourent`;
}

export function buildDocumentShareMessage(params: {
  documentType: ShareDocumentType;
  reference: string;
  url: string;
  clientLabel?: string | null;
}): string {
  const { documentType, reference, url, clientLabel } = params;
  const greeting = clientLabel ? `Bonjour ${clientLabel},\n\n` : 'Bonjour,\n\n';
  return `${greeting}Voici votre ${getDocumentTypeLabel(documentType)} ${reference}.\n${url}\n\nCordialement,\nYourent`;
}

export function normalizeWhatsAppPhone(phone: string | null | undefined): string | null {
  if (!phone) return null;

  const trimmed = phone.trim();
  const digitsOnly = trimmed.replace(/\D/g, '');
  if (!digitsOnly) return null;

  if (trimmed.startsWith('+')) return digitsOnly;
  if (digitsOnly.startsWith('00')) return digitsOnly.slice(2);
  if (digitsOnly.startsWith('212')) return digitsOnly;
  if (digitsOnly.length === 10 && digitsOnly.startsWith('0')) return `212${digitsOnly.slice(1)}`;
  if (digitsOnly.length === 9) return `212${digitsOnly}`;

  return digitsOnly;
}

export function buildWhatsAppShareUrl(phone: string | null | undefined, message: string): string | null {
  const normalizedPhone = normalizeWhatsAppPhone(phone);
  if (!normalizedPhone) return null;
  return `https://wa.me/${normalizedPhone}?text=${encodeURIComponent(message)}`;
}

export function buildMailtoShareUrl(email: string | null | undefined, subject: string, body: string): string | null {
  const normalizedEmail = email?.trim();
  if (!normalizedEmail) return null;
  return `mailto:${encodeURIComponent(normalizedEmail)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}