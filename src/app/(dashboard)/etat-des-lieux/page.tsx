'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { keepPreviousData, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { useSearchParams } from 'next/navigation';
import type { ColumnDef } from '@tanstack/react-table';
import { ClipboardCheck, Plus, Sparkles } from 'lucide-react';
import toast from 'react-hot-toast';
import { Badge, Button, Input, Select } from '@/components/ui';
import { DataTable } from '@/components/ui/DataTable';

type LocationOption = {
  _id: string;
  statut: 'en_cours' | 'terminee' | 'annulee';
  debutAt: string;
  finPrevueAt: string;
  client?: { prenom?: string; nom?: string };
  vehicle?: { marque?: string; modele?: string; immatriculation?: string };
  vehicule?: { marque?: string; modele?: string; immatriculation?: string };
};

type EtatDesLieuxRow = {
  _id: string;
  moment: 'avant' | 'apres';
  kmReleve?: number;
  niveauCarburant?: 'vide' | '1/4' | '1/2' | '3/4' | 'plein';
  proprete?: 'sale' | 'moyen' | 'propre' | 'tres_propre';
  remarques?: string;
  signePar?: string;
  createdAt: string;
  location?: { _id: string; debutAt?: string; finPrevueAt?: string; statut?: string };
  vehicle?: { _id: string; marque?: string; modele?: string; immatriculation?: string };
};

type SchemaPoint = {
  zone: string;
  x: number;
  y: number;
  note?: string;
  severite: 'scratch' | 'bosse' | 'bris' | 'autre';
  photos: string[];
};

const MOMENT_OPTIONS = [
  { value: 'avant', label: 'Départ' },
  { value: 'apres', label: 'Retour' },
] as const;

const FUEL_OPTIONS = [
  { value: 'vide', label: 'Vide' },
  { value: '1/4', label: '1/4' },
  { value: '1/2', label: '1/2' },
  { value: '3/4', label: '3/4' },
  { value: 'plein', label: 'Plein' },
] as const;

const CLEAN_OPTIONS = [
  { value: 'sale', label: 'Sale' },
  { value: 'moyen', label: 'Moyenne' },
  { value: 'propre', label: 'Propre' },
  { value: 'tres_propre', label: 'Très propre' },
] as const;

const defaultForm = {
  locationId: '',
  moment: 'avant' as 'avant' | 'apres',
  kmReleve: '',
  niveauCarburant: '',
  proprete: '',
  signePar: '',
  signatureDataUrl: '',
  photosText: '',
  schemaPointsText: '[]',
  remarques: '',
};

function parseMultilineUrls(value: string) {
  return value
    .split(/\r?\n|,/)
    .map((item) => item.trim())
    .filter(Boolean);
}

function parseSchemaPoints(value: string): SchemaPoint[] {
  if (!value.trim()) return [];

  const parsed = JSON.parse(value) as unknown;
  if (!Array.isArray(parsed)) throw new Error('Le JSON des points doit être un tableau');

  return parsed.map((item) => {
    if (!item || typeof item !== 'object') {
      throw new Error('Chaque point du schéma doit être un objet');
    }

    const point = item as Record<string, unknown>;
    return {
      zone: String(point.zone ?? ''),
      x: Number(point.x ?? 0),
      y: Number(point.y ?? 0),
      note: point.note ? String(point.note) : undefined,
      severite: (point.severite ?? 'autre') as SchemaPoint['severite'],
      photos: Array.isArray(point.photos) ? point.photos.map((photo) => String(photo)) : [],
    };
  });
}

export default function EtatsDesLieuxPage() {
  const qc = useQueryClient();
  const searchParams = useSearchParams();
  const [showForm, setShowForm] = useState(false);
  const [momentFilter, setMomentFilter] = useState('');
  const [page, setPage] = useState(1);
  const [form, setForm] = useState(defaultForm);

  useEffect(() => {
    const locationId = searchParams.get('location') ?? '';
    const moment = searchParams.get('moment');

    if (locationId || moment) {
      setShowForm(true);
      setForm((prev) => ({
        ...prev,
        locationId: locationId || prev.locationId,
        moment: moment === 'apres' ? 'apres' : prev.moment,
      }));
    }
  }, [searchParams]);

  const { data: locationsData } = useQuery({
    queryKey: ['locations-etat-des-lieux-select'],
    queryFn: async () => {
      const res = await fetch('/api/locations?page=1&limit=100');
      const payload = await res.json();
      if (!res.ok) throw new Error(payload.error ?? 'Erreur chargement locations');
      return payload.data as LocationOption[];
    },
  });

  const { data, isLoading } = useQuery({
    queryKey: ['etat-des-lieux', { moment: momentFilter, page }],
    queryFn: async () => {
      const params = new URLSearchParams({ page: String(page), limit: '20' });
      if (momentFilter) params.set('moment', momentFilter);
      const res = await fetch(`/api/etat-des-lieux?${params.toString()}`);
      const payload = await res.json();
      if (!res.ok) throw new Error(payload.error ?? 'Erreur chargement états des lieux');
      return payload;
    },
    placeholderData: keepPreviousData,
  });

  const rows: EtatDesLieuxRow[] = data?.data ?? [];
  const total: number = data?.meta?.total ?? 0;
  const locations = locationsData ?? [];

  const counts = useMemo(() => {
    return rows.reduce(
      (acc, row) => {
        acc.total += 1;
        if (row.moment === 'avant') acc.avant += 1;
        if (row.moment === 'apres') acc.apres += 1;
        return acc;
      },
      { total: 0, avant: 0, apres: 0 }
    );
  }, [rows]);

  const selectedLocation = useMemo(
    () => locations.find((location) => location._id === form.locationId),
    [locations, form.locationId]
  );

  const createMutation = useMutation({
    mutationFn: async () => {
      let schemaPoints: SchemaPoint[] = [];
      try {
        schemaPoints = parseSchemaPoints(form.schemaPointsText);
      } catch (error) {
        throw new Error(error instanceof Error ? error.message : 'JSON du schéma invalide');
      }

      const res = await fetch('/api/etat-des-lieux', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          locationId: form.locationId,
          moment: form.moment,
          kmReleve: form.kmReleve ? Number(form.kmReleve) : undefined,
          niveauCarburant: form.niveauCarburant || undefined,
          proprete: form.proprete || undefined,
          remarques: form.remarques || undefined,
          signePar: form.signePar || undefined,
          signatureDataUrl: form.signatureDataUrl || undefined,
          photos: parseMultilineUrls(form.photosText),
          schemaPoints,
        }),
      });
      const payload = await res.json();
      if (!res.ok) throw new Error(payload.error ?? 'Erreur création état des lieux');
      return payload.data as EtatDesLieuxRow;
    },
    onSuccess: () => {
      toast.success('État des lieux enregistré');
      setForm(defaultForm);
      setShowForm(false);
      setPage(1);
      qc.invalidateQueries({ queryKey: ['etat-des-lieux'] });
      qc.invalidateQueries({ queryKey: ['location'] });
      qc.invalidateQueries({ queryKey: ['locations'] });
    },
    onError: (error: Error) => toast.error(error.message),
  });

  const columns: ColumnDef<EtatDesLieuxRow>[] = [
    {
      accessorKey: 'createdAt',
      header: 'Date',
      cell: ({ getValue }) => (
        <span className="text-xs text-cream-muted">
          {format(new Date(getValue<string>()), 'dd MMM yyyy · HH:mm', { locale: fr })}
        </span>
      ),
    },
    {
      accessorKey: 'moment',
      header: 'Moment',
      cell: ({ row }) => (
        <Badge variant={row.original.moment === 'avant' ? 'blue' : 'amber'}>
          {row.original.moment === 'avant' ? 'Départ' : 'Retour'}
        </Badge>
      ),
    },
    {
      accessorKey: 'vehicle',
      header: 'Véhicule',
      cell: ({ row }) => (
        <div>
          <p className="font-medium text-cream">
            {row.original.vehicle?.marque} {row.original.vehicle?.modele}
          </p>
          <p className="text-xs text-cream-muted">{row.original.vehicle?.immatriculation ?? '—'}</p>
        </div>
      ),
    },
    {
      accessorKey: 'location',
      header: 'Location',
      cell: ({ row }) => (
        row.original.location?._id ? (
          <Link href={`/locations/${row.original.location._id}`} className="text-sm text-gold hover:text-gold-light">
            Ouvrir le dossier
          </Link>
        ) : (
          <span className="text-sm text-cream-muted">—</span>
        )
      ),
    },
    {
      accessorKey: 'kmReleve',
      header: 'KM',
      cell: ({ row }) => <span className="text-sm text-cream-muted">{row.original.kmReleve?.toLocaleString('fr-MA') ?? '—'}</span>,
    },
    {
      accessorKey: 'signePar',
      header: 'Signé par',
      cell: ({ row }) => <span className="text-sm text-cream-muted">{row.original.signePar || '—'}</span>,
    },
  ];

  return (
    <div className="space-y-6 animate-slide-up">
      <div className="lux-page-head">
        <div>
          <span className="lux-eyebrow mb-3">
            <Sparkles className="h-3.5 w-3.5" /> contrôle véhicule
          </span>
          <h1 className="text-3xl font-bold text-cream">États des lieux</h1>
          <p className="mt-2 text-sm text-cream-muted">
            Création et suivi des constats de départ et de retour sur chaque location.
          </p>
        </div>
        <Button variant="gold" onClick={() => setShowForm((value) => !value)}>
          <Plus className="h-4 w-4" />
          {showForm ? 'Fermer' : 'Nouvel état des lieux'}
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="lux-panel-muted p-5">
          <p className="text-xs uppercase tracking-[0.16em] text-cream-faint">Lignes affichées</p>
          <p className="mt-2 text-2xl font-semibold text-cream">{counts.total}</p>
        </div>
        <div className="lux-panel-muted p-5">
          <p className="text-xs uppercase tracking-[0.16em] text-cream-faint">Départs</p>
          <p className="mt-2 text-2xl font-semibold text-blue-300">{counts.avant}</p>
        </div>
        <div className="lux-panel-muted p-5">
          <p className="text-xs uppercase tracking-[0.16em] text-cream-faint">Retours</p>
          <p className="mt-2 text-2xl font-semibold text-amber-300">{counts.apres}</p>
        </div>
      </div>

      {showForm && (
        <div className="lux-panel p-6 md:p-7">
          <div className="mb-5 flex items-center gap-3">
            <ClipboardCheck className="h-5 w-5 text-gold" />
            <h2 className="text-lg font-semibold text-cream">Enregistrer un état des lieux</h2>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            <Select label="Location" value={form.locationId} onChange={(e) => setForm((prev) => ({ ...prev, locationId: e.target.value }))}>
              <option value="">Choisir une location</option>
              {locations.map((location) => {
                const vehicle = location.vehicle ?? location.vehicule;
                return (
                  <option key={location._id} value={location._id}>
                    {(vehicle?.marque ?? 'Véhicule')} {vehicle?.modele ?? ''} — {vehicle?.immatriculation ?? 'sans immatriculation'}
                  </option>
                );
              })}
            </Select>

            <Select label="Moment" value={form.moment} onChange={(e) => setForm((prev) => ({ ...prev, moment: e.target.value as 'avant' | 'apres' }))}>
              {MOMENT_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </Select>

            <Input label="Kilométrage relevé" type="number" min={0} step={1} value={form.kmReleve} onChange={(e) => setForm((prev) => ({ ...prev, kmReleve: e.target.value }))} />

            <Select label="Niveau carburant" value={form.niveauCarburant} onChange={(e) => setForm((prev) => ({ ...prev, niveauCarburant: e.target.value }))}>
              <option value="">Non renseigné</option>
              {FUEL_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </Select>

            <Select label="Propreté" value={form.proprete} onChange={(e) => setForm((prev) => ({ ...prev, proprete: e.target.value }))}>
              <option value="">Non renseignée</option>
              {CLEAN_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </Select>

            <Input label="Signé par" value={form.signePar} onChange={(e) => setForm((prev) => ({ ...prev, signePar: e.target.value }))} />
            <Input label="Signature (data URL)" value={form.signatureDataUrl} onChange={(e) => setForm((prev) => ({ ...prev, signatureDataUrl: e.target.value }))} className="md:col-span-2 xl:col-span-3" />
          </div>

          {selectedLocation && (
            <div className="mt-4 rounded-2xl border border-gold/10 bg-gold/5 p-4 text-sm text-cream-muted">
              <p className="font-medium text-cream">
                {(selectedLocation.vehicle ?? selectedLocation.vehicule)?.marque} {(selectedLocation.vehicle ?? selectedLocation.vehicule)?.modele}
              </p>
              <p className="mt-1 text-xs text-cream-muted">
                {(selectedLocation.client?.prenom ?? '')} {(selectedLocation.client?.nom ?? '')} · statut {selectedLocation.statut}
              </p>
            </div>
          )}

          <div className="mt-4 grid gap-4 xl:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-cream-muted">Photos (une URL par ligne)</label>
              <textarea
                value={form.photosText}
                onChange={(e) => setForm((prev) => ({ ...prev, photosText: e.target.value }))}
                rows={4}
                className="w-full rounded-xl border border-gold/10 bg-noir-card px-4 py-3 text-sm text-cream placeholder:text-cream-muted/50 focus:border-gold/40 focus:outline-none"
                placeholder="https://.../photo-1.jpg"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-cream-muted">Points schéma (JSON)</label>
              <textarea
                value={form.schemaPointsText}
                onChange={(e) => setForm((prev) => ({ ...prev, schemaPointsText: e.target.value }))}
                rows={4}
                className="w-full rounded-xl border border-gold/10 bg-noir-card px-4 py-3 font-mono text-xs text-cream placeholder:text-cream-muted/50 focus:border-gold/40 focus:outline-none"
                placeholder={'[{"zone":"avant gauche","x":12,"y":45,"severite":"scratch","photos":[]}]'}
              />
            </div>
          </div>

          <div className="mt-4">
            <label className="mb-1.5 block text-sm font-medium text-cream-muted">Remarques</label>
            <textarea
              value={form.remarques}
              onChange={(e) => setForm((prev) => ({ ...prev, remarques: e.target.value }))}
              rows={4}
              className="w-full rounded-xl border border-gold/10 bg-noir-card px-4 py-3 text-sm text-cream placeholder:text-cream-muted/50 focus:border-gold/40 focus:outline-none"
              placeholder="Rayures, impacts, niveau intérieur, remarques client..."
            />
          </div>

          <div className="mt-5 flex items-center justify-between gap-3">
            <p className="text-xs text-cream-faint">
              Les doublons départ/retour sont bloqués par l’API sur une même location.
            </p>
            <Button variant="gold" disabled={!form.locationId || createMutation.isPending} onClick={() => createMutation.mutate()}>
              {createMutation.isPending ? 'Enregistrement...' : 'Enregistrer'}
            </Button>
          </div>
        </div>
      )}

      <div className="lux-filter-bar">
        {['', ...MOMENT_OPTIONS.map((option) => option.value)].map((value) => (
          <button
            key={value}
            onClick={() => {
              setMomentFilter(value);
              setPage(1);
            }}
            className={`rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] transition-colors ${
              momentFilter === value
                ? 'bg-gold text-noir-root'
                : 'border border-white/8 bg-white/5 text-cream-muted hover:text-cream'
            }`}
          >
            {value === '' ? 'Tous' : MOMENT_OPTIONS.find((option) => option.value === value)?.label ?? value}
          </button>
        ))}
      </div>

      <DataTable columns={columns} data={rows} isLoading={isLoading} emptyText="Aucun état des lieux trouvé." />

      {total > 20 && (
        <div className="flex items-center justify-between text-sm text-cream-muted">
          <span>Page {page} · {Math.ceil(total / 20)} pages</span>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" disabled={page <= 1} onClick={() => setPage((current) => current - 1)}>Précédent</Button>
            <Button variant="outline" size="sm" disabled={page >= Math.ceil(total / 20)} onClick={() => setPage((current) => current + 1)}>Suivant</Button>
          </div>
        </div>
      )}
    </div>
  );
}
