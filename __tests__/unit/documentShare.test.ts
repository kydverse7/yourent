import { describe, expect, it } from 'vitest';
import {
  buildDocumentEmailSubject,
  buildDocumentShareMessage,
  buildMailtoShareUrl,
  buildWhatsAppShareUrl,
  normalizeWhatsAppPhone,
} from '@/lib/documentShare';

describe('normalizeWhatsAppPhone', () => {
  it('convertit un numéro marocain local', () => {
    expect(normalizeWhatsAppPhone('06 12 34 56 78')).toBe('212612345678');
  });

  it('garde un numéro international', () => {
    expect(normalizeWhatsAppPhone('+212612345678')).toBe('212612345678');
  });

  it('retourne null si vide', () => {
    expect(normalizeWhatsAppPhone('')).toBeNull();
  });
});

describe('documentShare helpers', () => {
  it('construit un message de partage lisible', () => {
    expect(
      buildDocumentShareMessage({
        documentType: 'devis',
        reference: 'DEV-001',
        url: 'https://example.com/doc.pdf',
        clientLabel: 'Client Test',
      })
    ).toContain('DEV-001');
  });

  it('construit une URL WhatsApp', () => {
    expect(buildWhatsAppShareUrl('0612345678', 'Bonjour')).toContain('wa.me/212612345678');
  });

  it('construit une URL mailto', () => {
    expect(buildMailtoShareUrl('client@example.com', buildDocumentEmailSubject('facture', 'FAC-001'), 'Bonjour')).toContain('mailto:client%40example.com');
  });
});