import { describe, it, expect } from 'vitest';
import { PUBLIC_NOTES_MAX_LENGTH, publicReservationSchema } from '@/lib/validators/reservation.schema';
import { parseFormPhone } from '@/app/(public)/[locale]/catalogue/[slug]/_lib/phone';
import { DIAL_CODE_VALUES } from '@/app/(public)/[locale]/catalogue/[slug]/_lib/dialCodes';
import { formatEurApprox } from '@/lib/site';

const base = {
  vehicleSlug: 'dacia-duster-1',
  nom: 'Alaoui',
  prenom: 'Sara',
  telephone: '0612345678',
  debutAt: '2030-01-01',
  finAt: '2030-01-08',
};

describe('publicReservationSchema : notes', () => {
  it('reste valide sans notes', () => {
    const result = publicReservationSchema.safeParse(base);
    expect(result.success).toBe(true);
    if (result.success) expect(result.data.notes).toBeUndefined();
  });

  it('conserve le texte, y compris en arabe et sur plusieurs lignes', () => {
    const result = publicReservationSchema.safeParse({ ...base, notes: 'Vol AT 201\nالتوصيل إلى الفندق' });
    expect(result.success).toBe(true);
    if (result.success) expect(result.data.notes).toBe('Vol AT 201\nالتوصيل إلى الفندق');
  });

  it('retire les espaces autour et les caractères de contrôle', () => {
    const result = publicReservationSchema.safeParse({ ...base, notes: '  a\u0000b\r\nc\u0007  ' });
    expect(result.success).toBe(true);
    if (result.success) expect(result.data.notes).toBe('ab\nc');
  });

  it('accepte la longueur maximale et rejette au-delà', () => {
    const atLimit = publicReservationSchema.safeParse({ ...base, notes: 'a'.repeat(PUBLIC_NOTES_MAX_LENGTH) });
    const tooLong = publicReservationSchema.safeParse({ ...base, notes: 'a'.repeat(PUBLIC_NOTES_MAX_LENGTH + 1) });
    expect(atLimit.success).toBe(true);
    expect(tooLong.success).toBe(false);
  });

  it('rejette des notes qui ne sont pas du texte', () => {
    expect(publicReservationSchema.safeParse({ ...base, notes: { $gt: '' } }).success).toBe(false);
  });
});

describe('parseFormPhone', () => {
  const codes = ['+212', '+33', '+34', '+39', '+44', '+49', '+32', '+41', '+1', '+216', '+213'];

  it('garde tous les chiffres d’un numéro local et retire le 0 du format international', () => {
    expect(parseFormPhone('06 12 34 56 78', '+212', codes)).toEqual({
      indicatif: '+212',
      telephone: '0612345678',
      international: '+212612345678',
    });
  });

  it.each([
    ['+33 6 12 34 56 78', '+33', '612345678'],
    ['0033612345678', '+33', '612345678'],
    ['+32 470 12 34 56', '+32', '470123456'],
    ['+41 79 123 45 67', '+41', '791234567'],
    ['+34 612 345 678', '+34', '612345678'],
    ['+49 151 23456789', '+49', '15123456789'],
    ['+1 (514) 555-0123', '+1', '5145550123'],
    ['+44 7700 900123', '+44', '7700900123'],
    ['+216 20 123 456', '+216', '20123456'],
  ])('lit l’indicatif saisi dans %s', (raw, indicatif, telephone) => {
    expect(parseFormPhone(raw, '+212', codes)).toEqual({ indicatif, telephone, international: `${indicatif}${telephone}` });
  });

  it('un numéro saisi en +33 passe la validation du schéma', () => {
    const { indicatif, telephone } = parseFormPhone('+33 6 12 34 56 78', '+212', codes);
    expect(publicReservationSchema.safeParse({ ...base, indicatif, telephone }).success).toBe(true);
  });
});

describe('formatEurApprox', () => {
  it('arrondit en français et en anglais', () => {
    expect(formatEurApprox(300, 'fr')).toBe('≈ 27 €');
    expect(formatEurApprox(300, 'en')).toBe('≈ 27 €');
  });

  it('n’affiche rien en arabe ni sans montant', () => {
    expect(formatEurApprox(300, 'ar')).toBeNull();
    expect(formatEurApprox(0, 'fr')).toBeNull();
  });
});

describe('indicatifs internationaux', () => {
  it('reconnaît un numéro saisi avec un indicatif de n’importe quel pays', () => {
    expect(parseFormPhone('+221 77 123 45 67', '+212', DIAL_CODE_VALUES).indicatif).toBe('+221');
    expect(parseFormPhone('+1 514 555 0100', '+212', DIAL_CODE_VALUES).indicatif).toBe('+1');
    expect(parseFormPhone('+351 912 345 678', '+212', DIAL_CODE_VALUES).indicatif).toBe('+351');
  });

  it('couvre tous les indicatifs sans doublon', () => {
    expect(new Set(DIAL_CODE_VALUES).size).toBe(DIAL_CODE_VALUES.length);
    expect(DIAL_CODE_VALUES.length).toBeGreaterThan(190);
    expect(DIAL_CODE_VALUES[0]).toBe('+212');
  });
});
