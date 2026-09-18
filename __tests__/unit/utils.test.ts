import { describe, it, expect } from 'vitest';
import { formatCurrency, calcTarifTotal, calcPalier, slugify, formatDate, formatDateTime, parseSearchDateRange } from '@/lib/utils';

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
  it('calcule le prix pour 5 jours à 200 MAD', () => {
    const result = calcTarifTotal(5, 200);
    expect(result.total).toBe(1000);
  });

  it('applique le palier 10+ jours', () => {
    const result = calcTarifTotal(16, 300, 250);
    expect(result.palier).toBe('10Plus');
    expect(result.tarifJour).toBe(250);
  });

  it('applique le palier 10+ pour 31 jours aussi', () => {
    const result = calcTarifTotal(31, 300, 200);
    expect(result.palier).toBe('10Plus');
    expect(result.tarifJour).toBe(200);
  });
});

describe('calcPalier', () => {
  it('retourne "standard" pour < 15 jours', () => {
    expect(calcPalier(5)).toBe('standard');
  });

  it('retourne "10Plus" pour >= 15 jours', () => {
    expect(calcPalier(15)).toBe('10Plus');
  });

  it('retourne "10Plus" pour >= 30 jours aussi', () => {
    expect(calcPalier(30)).toBe('10Plus');
  });

  it('force le palier standard en haute saison', () => {
    expect(calcPalier(15, { forceStandard: true })).toBe('standard');
    expect(calcPalier(30, { forceStandard: true })).toBe('standard');
  });
});

describe('calcTarifTotal haute saison', () => {
  it('ignore le palier 10+ quand forceStandard est actif', () => {
    const result = calcTarifTotal(16, 300, 250, { forceStandard: true });
    expect(result.palier).toBe('standard');
    expect(result.tarifJour).toBe(300);
    expect(result.total).toBe(4800);
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

describe('formatDate', () => {
  it('retourne un fallback pour une date invalide', () => {
    expect(formatDate('invalid-date')).toBe('-');
  });
});

describe('formatDateTime', () => {
  it('retourne un fallback pour une date invalide', () => {
    expect(formatDateTime('invalid-date')).toBe('-');
  });
});

function futureDates(days: number): { du: string; au: string } {
  const du = new Date();
  du.setUTCDate(du.getUTCDate() + 7);
  const au = new Date(du);
  au.setUTCDate(au.getUTCDate() + days);
  return { du: du.toISOString().slice(0, 10), au: au.toISOString().slice(0, 10) };
}

describe('parseSearchDateRange', () => {
  it('valide une plage correcte de 5 jours', () => {
    const { du, au } = futureDates(5);
    const range = parseSearchDateRange(du, au);
    expect(range).not.toBeNull();
    expect(range!.du).toBe(du);
    expect(range!.au).toBe(au);
    expect(range!.days).toBe(5);
  });

  it('calcule une fin exclusive (au + 1 jour)', () => {
    const { du, au } = futureDates(5);
    const range = parseSearchDateRange(du, au)!;
    expect(range.fin.getTime() - range.debut.getTime()).toBe(6 * 86_400_000);
  });

  it('rejette une durée inférieure au minimum', () => {
    const { du, au } = futureDates(4);
    expect(parseSearchDateRange(du, au)).toBeNull();
  });

  it('rejette des dates manquantes ou malformées', () => {
    expect(parseSearchDateRange(undefined, '2030-01-10')).toBeNull();
    expect(parseSearchDateRange('2030-01-01', undefined)).toBeNull();
    expect(parseSearchDateRange('01/01/2030', '2030-01-10')).toBeNull();
    expect(parseSearchDateRange('2030-13-01', '2030-01-10')).toBeNull();
  });

  it('rejette un départ dans le passé', () => {
    expect(parseSearchDateRange('2020-01-01', '2020-01-10')).toBeNull();
  });

  it('autorise une durée personnalisée via minDays', () => {
    const { du, au } = futureDates(2);
    expect(parseSearchDateRange(du, au)).toBeNull();
    expect(parseSearchDateRange(du, au, { minDays: 2 })).not.toBeNull();
  });
});
