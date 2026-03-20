import { describe, it, expect } from 'vitest';
import { formatCurrency, calcTarifTotal, calcPalier, slugify } from '@/lib/utils';

describe('formatCurrency', () => {
  it('formate un montant en MAD', () => {
    expect(formatCurrency(1500)).toContain('1');
    expect(formatCurrency(1500)).toContain('500');
  });

  it('gère zéro', () => {
    expect(formatCurrency(0)).toBeDefined();
  });
});

describe('calcTarifTotal', () => {
  it('calcule le prix pour 3 jours à 200 MAD', () => {
    const result = calcTarifTotal(3, 200, 0, 0);
    expect(result.total).toBe(600);
  });

  it('applique le palier 15+ jours', () => {
    const result = calcTarifTotal(16, 300, 250, 200);
    expect(result.palier).toBe('15Plus');
    expect(result.tarifJour).toBe(250);
  });

  it('applique le palier 30+ jours', () => {
    const result = calcTarifTotal(31, 300, 250, 200);
    expect(result.palier).toBe('30Plus');
    expect(result.tarifJour).toBe(200);
  });
});

describe('calcPalier', () => {
  it('retourne "standard" pour < 15 jours', () => {
    expect(calcPalier(5)).toBe('standard');
  });

  it('retourne "15Plus" pour >= 15 jours', () => {
    expect(calcPalier(15)).toBe('15Plus');
  });

  it('retourne "30Plus" pour >= 30 jours', () => {
    expect(calcPalier(30)).toBe('30Plus');
  });
});

describe('slugify', () => {
  it('convertit un texte en slug', () => {
    expect(slugify('Dacia Sandero 2022')).toBe('dacia-sandero-2022');
  });

  it('gère les caractères accentués', () => {
    expect(slugify('Réservation véhicule')).toBe('reservation-vehicule');
  });

  it('supprime les caractères spéciaux', () => {
    expect(slugify('Toyota Corolla (2023)')).toBe('toyota-corolla-2023');
  });
});
