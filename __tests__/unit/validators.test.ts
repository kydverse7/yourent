import { describe, it, expect } from 'vitest';
import { cautionPriseSchema, cautionRestitutionSchema } from '@/lib/validators/caution.schema';
import { clientSchema, blacklistSchema } from '@/lib/validators/client.schema';

describe('cautionPriseSchema', () => {
  it('accepte une caution chèque valide', () => {
    const result = cautionPriseSchema.safeParse({
      typePrise: 'cheque',
      montant: 3000,
      referenceDoc: 'CHQ-001',
      banque: 'CIH',
    });
    expect(result.success).toBe(true);
  });

  it('rejette un chèque sans référence', () => {
    const result = cautionPriseSchema.safeParse({
      typePrise: 'cheque',
      montant: 3000,
      // referenceDoc manquant
    });
    expect(result.success).toBe(false);
  });

  it('accepte une caution carte empreinte valide', () => {
    const result = cautionPriseSchema.safeParse({
      typePrise: 'carte_empreinte',
      montant: 5000,
      referenceDoc: '1234',
    });
    expect(result.success).toBe(true);
  });

  it('rejette carte empreinte avec mauvais nombre de chiffres', () => {
    const result = cautionPriseSchema.safeParse({
      typePrise: 'carte_empreinte',
      montant: 5000,
      referenceDoc: '12', // pas 4 chiffres
    });
    expect(result.success).toBe(false);
  });

  it('accepte une caution cash', () => {
    const result = cautionPriseSchema.safeParse({
      typePrise: 'cash',
      montant: 2000,
    });
    expect(result.success).toBe(true);
  });
});

describe('clientSchema', () => {
  const validClient = {
    type: 'particulier',
    nom: 'Alami',
    prenom: 'Mohamed',
    telephone: '+212612345678',
  };

  it('accepte un client valide', () => {
    const result = clientSchema.safeParse(validClient);
    expect(result.success).toBe(true);
  });

  it('rejette un numéro de téléphone non marocain', () => {
    const result = clientSchema.safeParse({ ...validClient, telephone: '0033612345678' });
    expect(result.success).toBe(false);
  });

  it('accepte le format 06XXXXXXXX', () => {
    const result = clientSchema.safeParse({ ...validClient, telephone: '0612345678' });
    expect(result.success).toBe(true);
  });

  it('accepte le format +2126XXXXXXXX', () => {
    const result = clientSchema.safeParse({ ...validClient, telephone: '+212612345678' });
    expect(result.success).toBe(true);
  });
});

describe('blacklistSchema', () => {
  it('accepte un motif valide', () => {
    const result = blacklistSchema.safeParse({ actif: true, motif: 'Non-paiement répété de la location après plusieurs relances' });
    expect(result.success).toBe(true);
  });

  it('rejette un motif trop court', () => {
    const result = blacklistSchema.safeParse({ actif: true, motif: 'Court' });
    expect(result.success).toBe(false);
  });
});
