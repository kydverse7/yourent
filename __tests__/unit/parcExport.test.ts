import { describe, it, expect } from 'vitest';
import { buildParcRows, getRowState, ROW_COLORS } from '@/lib/export/parcExport';

const NOW = new Date('2026-09-01T12:00:00.000Z');

function vehicle(id: string, statut: string, immatriculation: string) {
  return { _id: id, statut, immatriculation, marque: 'Marque', modele: 'Modele' };
}

function location(vehicleRef: unknown, client: { prenom: string; nom: string } | null, debutAt: string, finPrevueAt: string, nbJours: number) {
  return { vehicle: vehicleRef, client, debutAt, finPrevueAt, nbJours };
}

describe('buildParcRows', () => {
  const vehicles = [
    vehicle('v1', 'loue', 'AAA-001'),
    vehicle('v2', 'loue', 'AAA-002'),
    vehicle('v3', 'loue', 'AAA-003'),
    vehicle('v7', 'loue', 'AAA-007'),
    vehicle('v4', 'reserve', 'AAA-004'),
    vehicle('v5', 'maintenance', 'AAA-005'),
    vehicle('v6', 'disponible', 'AAA-006'),
  ];

  const locations = [
    // v1 : retard (fin prévue dépassée) — véhicule référencé par ObjectId string
    location('v1', { prenom: 'Ali', nom: 'Errami' }, '2026-08-01T10:00:00.000Z', '2026-08-20T10:00:00.000Z', 19),
    // v2 : louée, retour le 05/09 — véhicule référencé par objet peuplé { _id }
    location({ _id: 'v2' }, { prenom: 'Yassine', nom: 'Bennis' }, '2026-08-30T10:00:00.000Z', '2026-09-05T10:00:00.000Z', 6),
    // v3 : louée, retour le 03/09 (avant v2)
    location('v3', { prenom: 'Sara', nom: 'Alaoui' }, '2026-08-28T10:00:00.000Z', '2026-09-03T10:00:00.000Z', 6),
  ];

  const snapshot = buildParcRows(vehicles, locations, NOW);

  it('trie les retards en premier et les disponibles en dernier', () => {
    expect(snapshot.rows.map((r) => r.immatriculation)).toEqual([
      'AAA-001', // retard
      'AAA-003', // louée, retour 03/09
      'AAA-002', // louée, retour 05/09
      'AAA-007', // louée sans location (pas de date → fin de groupe)
      'AAA-004', // réservée
      'AAA-005', // maintenance
      'AAA-006', // disponible
    ]);
  });

  it('calcule enRetard uniquement si une location active existe et est dépassée', () => {
    const byImmat = new Map(snapshot.rows.map((r) => [r.immatriculation, r]));
    expect(byImmat.get('AAA-001')?.enRetard).toBe(true);
    expect(byImmat.get('AAA-002')?.enRetard).toBe(false);
    expect(byImmat.get('AAA-006')?.enRetard).toBe(false);
    // v7 : loué sans location → pas d'erreur, pas de retard
    const v7 = byImmat.get('AAA-007');
    expect(v7?.enRetard).toBe(false);
    expect(v7?.clientNom).toBeNull();
    expect(v7?.debutAt).toBeNull();
    expect(v7?.finPrevueAt).toBeNull();
    expect(v7?.nbJours).toBeNull();
  });

  it('joint le client (prénom + nom) sur la clé véhicule', () => {
    const byImmat = new Map(snapshot.rows.map((r) => [r.immatriculation, r]));
    expect(byImmat.get('AAA-002')?.clientNom).toBe('Yassine Bennis');
    expect(byImmat.get('AAA-003')?.clientNom).toBe('Sara Alaoui');
    expect(byImmat.get('AAA-006')?.clientNom).toBeNull();
    expect(byImmat.get('AAA-002')?.nbJours).toBe(6);
  });

  it('construit les compteurs du meta', () => {
    expect(snapshot.meta).toMatchObject({
      total: 7,
      loues: 4,
      retard: 1,
      reserve: 1,
      maintenance: 1,
      disponibles: 1,
      date: NOW.toISOString(),
    });
  });

  it('retourne une flotte vide sans erreur', () => {
    const empty = buildParcRows([], [], NOW);
    expect(empty.rows).toEqual([]);
    expect(empty.meta.total).toBe(0);
    expect(empty.meta.disponibles).toBe(0);
  });
});

describe('ROW_COLORS', () => {
  it('mappe chaque état vers la couleur Excel attendue', () => {
    expect(ROW_COLORS.retard).toEqual({ fill: '#FFC7CE', font: '#9C0006' });
    expect(ROW_COLORS.loue).toEqual({ fill: '#F5E1A4', font: '#7A5C10' });
    expect(ROW_COLORS.reserve).toEqual({ fill: '#DDEBF7', font: '#1F4E78' });
    expect(ROW_COLORS.maintenance).toEqual({ fill: '#E7E6E6', font: '#3F3F3F' });
    expect(ROW_COLORS.disponible).toEqual({ fill: null, font: null });
  });
});

describe('getRowState', () => {
  it('donne la priorité au retard sur le statut', () => {
    expect(getRowState({ statut: 'loue', enRetard: true })).toBe('retard');
    expect(getRowState({ statut: 'loue', enRetard: false })).toBe('loue');
    expect(getRowState({ statut: 'reserve', enRetard: false })).toBe('reserve');
    expect(getRowState({ statut: 'maintenance', enRetard: false })).toBe('maintenance');
    expect(getRowState({ statut: 'disponible', enRetard: false })).toBe('disponible');
  });
});
