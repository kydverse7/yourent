'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { keepPreviousData, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { useSearchParams } from 'next/navigation';
import type { ColumnDef } from '@tanstack/react-table';
import { FileText, Plus, Receipt, Sparkles, Upload } from 'lucide-react';
import toast from 'react-hot-toast';
import { Badge, Button, Input, Select } from '@/components/ui';
import { DataTable } from '@/components/ui/DataTable';
import { buildPdfViewerUrl, formatCurrency } from '@/lib/utils';
import CreateInvoiceModal from '@/components/modals/CreateInvoiceModal';

type ReservationOption = {
  _id: string;
  statut: string;
  factureNumero?: string;
  facturePdfUrl?: string;
  prix?: { totalEstime?: number };
  client?: { prenom?: string; nom?: string };
  clientInline?: { prenom?: string; nom?: string };
  vehicle?: { marque?: string; modele?: string; immatriculation?: string };
  vehicule?: { marque?: string; modele?: string; immatriculation?: string };
};

type LocationOption = {
  _id: string;
  statut: string;
  factureNumero?: string;
  facturePdfUrl?: string;
  montantTotal?: number;
  client?: { prenom?: string; nom?: string };
  vehicle?: { marque?: string; modele?: string; immatriculation?: string };
  vehicule?: { marque?: string; modele?: string; immatriculation?: string };
};

type InvoiceRow = {
  _id: string;
  entityType: 'reservation' | 'location';
  entityId: string;
  statut?: string;
  factureNumero?: string;
  facturePdfUrl?: string;
  createdAt?: string;
  clientLabel: string;
  vehicleLabel: string;
  sourceLabel: string;
  montant: number;
};

const defaultForm = {
  entityType: 'reservation' as 'reservation' | 'location',
  entityId: '',
  facturePdfUrl: '',
};

function getOptionClientLabel(item: ReservationOption | LocationOption) {
  if ('clientInline' in item) {
    return `${item.client?.prenom ?? item.clientInline?.prenom ?? ''} ${item.client?.nom ?? item.clientInline?.nom ?? ''}`.trim();
  }

  return `${item.client?.prenom ?? ''} ${item.client?.nom ?? ''}`.trim();
}

export default function FacturesPage() {
  const qc = useQueryClient();
  const searchParams = useSearchParams();
  const [showForm, setShowForm] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [scopeFilter, setScopeFilter] = useState('');
  const [missingOnly, setMissingOnly] = useState(false);
  const [page, setPage] = useState(1);
  const [uploading, setUploading] = useState(false);
  const [form, setForm] = useState(defaultForm);

  useEffect(() => {
    const entityType = searchParams.get('entityType');
    const entityId = searchParams.get('entityId') ?? '';

    if (entityType === 'reservation' || entityType === 'location') {
      setShowForm(true);
      setForm((prev) => ({ ...prev, entityType, entityId: entityId || prev.entityId }));
    }
  }, [searchParams]);

  const { data: reservationsData } = useQuery({
    queryKey: ['reservations-invoice-select'],
    queryFn: async () => {
      const res = await fetch('/api/reservations?page=1&limit=100');
      const payload = await res.json();
      if (!res.ok) throw new Error(payload.error ?? 'Erreur chargement réservations');
      return payload.data as ReservationOption[];
    },
  });

  const { data: locationsData } = useQuery({
    queryKey: ['locations-invoice-select'],
    queryFn: async () => {
      const res = await fetch('/api/locations?page=1&limit=100');
      const payload = await res.json();
      if (!res.ok) throw new Error(payload.error ?? 'Erreur chargement locations');
      return payload.data as LocationOption[];
    },
  });

  const { data, isLoading } = useQuery({
    queryKey: ['invoices', { scope: scopeFilter, missingOnly, page }],
    queryFn: async () => {
      const params = new URLSearchParams({ page: String(page), limit: '20' });
      if (scopeFilter) params.set('scope', scopeFilter);
      if (missingOnly) params.set('missing', 'true');
      const res = await fetch(`/api/invoices?${params.toString()}`);
      const payload = await res.json();
      if (!res.ok) throw new Error(payload.error ?? 'Erreur chargement factures');
      return payload;
    },
    placeholderData: keepPreviousData,
  });

  const invoices: InvoiceRow[] = data?.data ?? [];
  const total: number = data?.meta?.total ?? 0;
  const reservations = (reservationsData ?? []).filter((item) => ['confirmee', 'en_cours', 'terminee'].includes(item.statut));
  const locations = (locationsData ?? []).filter((item) => ['en_cours', 'terminee'].includes(item.statut));
  const activeOptions = form.entityType === 'reservation' ? reservations : locations;
  const selectedOption = activeOptions.find((item) => item._id === form.entityId);

  const stats = useMemo(() => {
    const missing = invoices.filter((item) => !item.facturePdfUrl).length;
    const billed = invoices.reduce((sum, item) => sum + Number(item.montant ?? 0), 0);
    return { total: invoices.length, missing, billed };
  }, [invoices]);

  const uploadPdf = async (file: File) => {
    const fd = new FormData();
    fd.append('file', file);
    fd.append('folder', 'invoices');

    const res = await fetch('/api/upload', { method: 'POST', body: fd });
    const payload = await res.json();
    if (!res.ok) throw new Error(payload.error ?? 'Erreur upload facture');
    return payload.data.url as string;
  };

  const saveMutation = useMutation({
    mutationFn: async () => {
      const res = await fetch('/api/invoices', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const payload = await res.json();
      if (!res.ok) throw new Error(payload.error ?? 'Erreur mise à jour facture');
      return payload.data;
    },
    onSuccess: () => {
      toast.success('Facture rattachée');
      setForm(defaultForm);
      setShowForm(false);
      qc.invalidateQueries({ queryKey: ['invoices'] });
      qc.invalidateQueries({ queryKey: ['reservation'] });
      qc.invalidateQueries({ queryKey: ['reservations'] });
      qc.invalidateQueries({ queryKey: ['location'] });
      qc.invalidateQueries({ queryKey: ['locations'] });
      qc.invalidateQueries({ queryKey: ['finances'] });
    },
    onError: (error: Error) => toast.error(error.message),
  });

  const generateMutation = useMutation({
    mutationFn: async () => {
      const res = await fetch('/api/invoices/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ entityType: form.entityType, entityId: form.entityId }),
      });
      const payload = await res.json();
      if (!res.ok) throw new Error(payload.error ?? 'Erreur génération facture');
      return payload.data as { url: string };
    },
    onSuccess: (data) => {
      toast.success('Facture générée automatiquement');
      setForm((prev) => ({ ...prev, facturePdfUrl: data.url }));
      setShowForm(false);
      qc.invalidateQueries({ queryKey: ['invoices'] });
      qc.invalidateQueries({ queryKey: ['reservation'] });
      qc.invalidateQueries({ queryKey: ['reservations'] });
      qc.invalidateQueries({ queryKey: ['location'] });
      qc.invalidateQueries({ queryKey: ['locations'] });
      qc.invalidateQueries({ queryKey: ['finances'] });
    },
    onError: (error: Error) => toast.error(error.message),
  });

  const columns: ColumnDef<InvoiceRow>[] = [
    {
      accessorKey: 'createdAt',
      header: 'Date dossier',
      cell: ({ row }) => (
        <span className="text-xs text-cream-muted">
          {row.original.createdAt ? format(new Date(row.original.createdAt), 'dd MMM yyyy', { locale: fr }) : '—'}
        </span>
      ),
    },
    {
      accessorKey: 'sourceLabel',
      header: 'Type',
      cell: ({ row }) => <Badge variant={row.original.entityType === 'reservation' ? 'blue' : 'amber'}>{row.original.sourceLabel}</Badge>,
    },
    {
      accessorKey: 'factureNumero',
      header: 'N° facture',
      cell: ({ row }) => <span className="text-xs font-semibold tracking-[0.12em] text-gold">{row.original.factureNumero ?? 'À attribuer'}</span>,
    },
    {
      accessorKey: 'clientLabel',
      header: 'Client',
      cell: ({ row }) => <span className="text-sm text-cream">{row.original.clientLabel}</span>,
    },
    {
      accessorKey: 'vehicleLabel',
      header: 'Véhicule',
      cell: ({ row }) => <span className="text-sm text-cream-muted">{row.original.vehicleLabel}</span>,
    },
    {
      accessorKey: 'montant',
      header: 'Montant',
      cell: ({ row }) => <span className="font-semibold text-gold">{formatCurrency(row.original.montant ?? 0)}</span>,
    },
    {
      accessorKey: 'facturePdfUrl',
      header: 'Facture',
      cell: ({ row }) => (
        <div className="flex flex-wrap gap-2">
          {row.original.facturePdfUrl ? (
            <a href={buildPdfViewerUrl(row.original.facturePdfUrl, `${row.original.factureNumero ?? 'facture'}.pdf`)} target="_blank" rel="noreferrer" className="text-sm text-gold hover:text-gold-light">
              Ouvrir PDF
            </a>
          ) : (
            <span className="text-sm text-red-300">Manquante</span>
          )}
          <Link href={`/factures?entityType=${row.original.entityType}&entityId=${row.original.entityId}`} className="text-sm text-cream-muted hover:text-cream">
            Gérer
          </Link>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6 animate-slide-up">
      <div className="lux-page-head">
        <div>
          <span className="lux-eyebrow mb-3">
            <Sparkles className="h-3.5 w-3.5" /> facturation agence
          </span>
          <h1 className="text-3xl font-bold text-cream">Factures</h1>
          <p className="mt-2 text-sm text-cream-muted">
            Suivi des factures PDF sur les réservations confirmées et les locations actives ou clôturées.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button variant="gold" onClick={() => setShowCreateModal(true)}>
            <FileText className="h-4 w-4" />
            Créer facture / devis
          </Button>
          <Button variant="outline" onClick={() => setShowForm((value) => !value)}>
            <Plus className="h-4 w-4" />
            {showForm ? 'Fermer' : 'Rattacher un PDF'}
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="lux-panel-muted p-5">
          <p className="text-xs uppercase tracking-[0.16em] text-cream-faint">Lignes affichées</p>
          <p className="mt-2 text-2xl font-semibold text-cream">{stats.total}</p>
        </div>
        <div className="lux-panel-muted p-5">
          <p className="text-xs uppercase tracking-[0.16em] text-cream-faint">Montant affiché</p>
          <p className="mt-2 text-2xl font-semibold text-gold">{formatCurrency(stats.billed)}</p>
        </div>
        <div className="lux-panel-muted p-5">
          <p className="text-xs uppercase tracking-[0.16em] text-cream-faint">Factures manquantes</p>
          <p className="mt-2 text-2xl font-semibold text-red-300">{stats.missing}</p>
        </div>
      </div>

      {showForm && (
        <div className="lux-panel p-6 md:p-7">
          <div className="mb-5 flex items-center gap-3">
            <Receipt className="h-5 w-5 text-gold" />
            <h2 className="text-lg font-semibold text-cream">Rattacher une facture PDF</h2>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            <Select label="Type de dossier" value={form.entityType} onChange={(e) => setForm((prev) => ({ ...prev, entityType: e.target.value as 'reservation' | 'location', entityId: '' }))}>
              <option value="reservation">Réservation</option>
              <option value="location">Location</option>
            </Select>
            <Select label="Dossier" value={form.entityId} onChange={(e) => setForm((prev) => ({ ...prev, entityId: e.target.value }))}>
              <option value="">Choisir un dossier</option>
              {activeOptions.map((item) => {
                const vehicle = item.vehicle ?? item.vehicule;
                const clientLabel = getOptionClientLabel(item);
                return (
                  <option key={item._id} value={item._id}>
                    {clientLabel || 'Client'} — {vehicle?.marque ?? 'Véhicule'} {vehicle?.modele ?? ''}
                  </option>
                );
              })}
            </Select>
            <Input label="URL de facture PDF" value={form.facturePdfUrl} onChange={(e) => setForm((prev) => ({ ...prev, facturePdfUrl: e.target.value }))} className="xl:col-span-2" />
          </div>

          {selectedOption && (
            <div className="mt-4 rounded-2xl border border-gold/10 bg-gold/5 p-4 text-sm text-cream-muted">
              <p className="font-medium text-cream">Dossier sélectionné</p>
              <p className="mt-1">
                Statut {selectedOption.statut} · montant {formatCurrency(form.entityType === 'reservation' ? Number((selectedOption as ReservationOption).prix?.totalEstime ?? 0) : Number((selectedOption as LocationOption).montantTotal ?? 0))}
              </p>
              <p className="mt-1 text-xs text-gold">Numéro métier {(selectedOption as ReservationOption | LocationOption).factureNumero ?? 'attribué au premier rattachement'}</p>
            </div>
          )}

          <div className="mt-4 flex flex-wrap items-center gap-3">
            <label className="inline-flex cursor-pointer items-center gap-2 rounded-2xl border border-gold/20 bg-gold/5 px-4 py-3 text-sm font-medium text-gold hover:bg-gold/10">
              <Upload className="h-4 w-4" />
              {uploading ? 'Upload en cours...' : 'Uploader un PDF'}
              <input
                type="file"
                accept="application/pdf"
                className="hidden"
                disabled={uploading}
                onChange={async (e) => {
                  const file = e.target.files?.[0];
                  if (!file) return;
                  try {
                    setUploading(true);
                    const url = await uploadPdf(file);
                    setForm((prev) => ({ ...prev, facturePdfUrl: url }));
                    toast.success('PDF uploadé');
                  } catch (error) {
                    toast.error(error instanceof Error ? error.message : 'Erreur upload');
                  } finally {
                    setUploading(false);
                    e.target.value = '';
                  }
                }}
              />
            </label>

            {form.facturePdfUrl && (
              <a href={buildPdfViewerUrl(form.facturePdfUrl, `${(selectedOption as ReservationOption | LocationOption | undefined)?.factureNumero ?? 'facture'}.pdf`)} target="_blank" rel="noreferrer" className="text-sm text-cream-muted hover:text-cream">
                Prévisualiser le PDF
              </a>
            )}
          </div>

          <div className="mt-5 flex justify-end">
            <div className="flex flex-wrap gap-3">
              <Button
                variant="outline"
                disabled={!form.entityId || generateMutation.isPending || saveMutation.isPending || uploading}
                onClick={() => generateMutation.mutate()}
              >
                {generateMutation.isPending ? 'Génération...' : 'Générer automatiquement'}
              </Button>
              <Button variant="gold" disabled={!form.entityId || !form.facturePdfUrl || saveMutation.isPending || generateMutation.isPending || uploading} onClick={() => saveMutation.mutate()}>
                {saveMutation.isPending ? 'Enregistrement...' : 'Rattacher la facture'}
              </Button>
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-wrap items-center gap-3">
        <div className="lux-filter-bar flex-1">
          {['', 'reservation', 'location'].map((value) => (
            <button
              key={value}
              onClick={() => {
                setScopeFilter(value);
                setPage(1);
              }}
              className={`rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] transition-colors ${
                scopeFilter === value ? 'bg-gold text-noir-root' : 'border border-white/8 bg-white/5 text-cream-muted hover:text-cream'
              }`}
            >
              {value === '' ? 'Tous' : value === 'reservation' ? 'Réservations' : 'Locations'}
            </button>
          ))}
        </div>

        <Button
          variant={missingOnly ? 'gold' : 'outline'}
          size="sm"
          onClick={() => {
            setMissingOnly((value) => !value);
            setPage(1);
          }}
        >
          {missingOnly ? 'Manquantes uniquement' : 'Afficher les manquantes'}
        </Button>
      </div>

      <DataTable columns={columns} data={invoices} isLoading={isLoading} emptyText="Aucune facture trouvée." />

      {total > 20 && (
        <div className="flex flex-wrap items-center justify-between gap-2 text-sm text-cream-muted"><span>Page {page} · {Math.ceil(total / 20)} pages</span>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" disabled={page <= 1} onClick={() => setPage((current) => current - 1)}>Précédent</Button>
            <Button variant="outline" size="sm" disabled={page >= Math.ceil(total / 20)} onClick={() => setPage((current) => current + 1)}>Suivant</Button>
          </div>
        </div>
      )}

      <CreateInvoiceModal open={showCreateModal} onClose={() => setShowCreateModal(false)} />
    </div>
  );
}
