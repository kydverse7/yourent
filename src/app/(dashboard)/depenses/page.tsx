'use client';

import { useMemo, useState } from 'react';
import { useMutation, useQuery, useQueryClient, keepPreviousData } from '@tanstack/react-query';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { ExternalLink, Pencil, Plus, Receipt, Sparkles, Trash2, Upload } from 'lucide-react';
import { Badge, Button, Input, Select } from '@/components/ui';
import { DataTable } from '@/components/ui/DataTable';
import { formatCurrency } from '@/lib/utils';
import { useUIStore } from '@/stores/uiStore';
import type { ColumnDef } from '@tanstack/react-table';
import toast from 'react-hot-toast';

type VehicleOption = {
  _id: string;
  marque: string;
  modele: string;
  immatriculation: string;
};

type ExpenseRow = {
  _id: string;
  type: 'carburant' | 'lavage' | 'parking' | 'amende' | 'peage' | 'publicite' | 'logiciel' | 'loyer' | 'salaire' | 'maintenance' | 'assurance' | 'controle_technique' | 'autre';
  montant: number;
  date: string;
  note?: string;
  vehicleId?: { _id: string; marque: string; modele: string; immatriculation: string };
  fournisseur?: string;
  factureUrl?: string;
  sourceModule?: 'manual' | 'alertes';
  linkedType?: 'ct' | 'assurance' | 'vidange';
  isRecurring?: boolean;
  recurrenceFrequency?: 'monthly' | 'quarterly' | 'yearly' | 'custom';
  recurrenceNextDate?: string;
  recurrenceLabel?: string;
};

const TYPE_OPTIONS: Array<{ value: ExpenseRow['type']; label: string }> = [
  { value: 'carburant', label: 'Carburant' },
  { value: 'lavage', label: 'Lavage' },
  { value: 'parking', label: 'Parking' },
  { value: 'amende', label: 'Amende' },
  { value: 'peage', label: 'Péage' },
  { value: 'publicite', label: 'Publicité' },
  { value: 'logiciel', label: 'Logiciel' },
  { value: 'loyer', label: 'Loyer' },
  { value: 'salaire', label: 'Salaire' },
  { value: 'maintenance', label: 'Maintenance' },
  { value: 'assurance', label: 'Assurance' },
  { value: 'controle_technique', label: 'Contrôle technique' },
  { value: 'autre', label: 'Autre' },
];

const defaultForm = {
  type: 'carburant' as ExpenseRow['type'],
  montant: '',
  date: new Date().toISOString().split('T')[0],
  note: '',
  vehicleId: '',
  fournisseur: '',
  factureUrl: '',
  isRecurring: false,
  recurrenceFrequency: 'yearly',
  recurrenceNextDate: '',
  recurrenceLabel: '',
};

export default function DepensesPage() {
  const qc = useQueryClient();
  const openConfirmModal = useUIStore((s) => s.openConfirmModal);
  const [showForm, setShowForm] = useState(false);
  const [editingExpenseId, setEditingExpenseId] = useState<string | null>(null);
  const [typeFilter, setTypeFilter] = useState('');
  const [page, setPage] = useState(1);
  const [form, setForm] = useState(defaultForm);
  const [uploading, setUploading] = useState(false);

  const resetForm = () => {
    setForm(defaultForm);
    setEditingExpenseId(null);
    setShowForm(false);
  };

  const openEditForm = (expense: ExpenseRow) => {
    setForm({
      type: expense.type,
      montant: String(expense.montant ?? ''),
      date: expense.date ? expense.date.slice(0, 10) : defaultForm.date,
      note: expense.note ?? '',
      vehicleId: expense.vehicleId?._id ?? '',
      fournisseur: expense.fournisseur ?? '',
      factureUrl: expense.factureUrl ?? '',
      isRecurring: Boolean(expense.isRecurring),
      recurrenceFrequency: expense.recurrenceFrequency ?? 'yearly',
      recurrenceNextDate: expense.recurrenceNextDate ? expense.recurrenceNextDate.slice(0, 10) : '',
      recurrenceLabel: expense.recurrenceLabel ?? '',
    });
    setEditingExpenseId(expense._id);
    setShowForm(true);
  };

  const buildExpensePayload = () => ({
    type: form.type,
    montant: Number(form.montant || 0),
    date: form.date,
    note: form.note || undefined,
    vehicleId: form.vehicleId || undefined,
    fournisseur: form.fournisseur || undefined,
    factureUrl: form.factureUrl || undefined,
    isRecurring: form.isRecurring,
    recurrenceFrequency: form.isRecurring ? form.recurrenceFrequency : undefined,
    recurrenceNextDate: form.isRecurring && form.recurrenceNextDate ? form.recurrenceNextDate : undefined,
    recurrenceLabel: form.isRecurring ? form.recurrenceLabel || undefined : undefined,
  });

  const uploadDocument = async (file: File) => {
    const fd = new FormData();
    fd.append('file', file);
    fd.append('folder', 'expenses');

    const res = await fetch('/api/upload', { method: 'POST', body: fd });
    const payload = await res.json();
    if (!res.ok) throw new Error(payload.error ?? 'Erreur upload facture');
    return payload.data.url as string;
  };

  const { data: vehiclesData } = useQuery({
    queryKey: ['vehicles-expenses-select'],
    queryFn: async () => {
      const res = await fetch('/api/vehicles?page=1&limit=100');
      const payload = await res.json();
      if (!res.ok) throw new Error(payload.error ?? 'Erreur chargement véhicules');
      return payload.data as VehicleOption[];
    },
  });

  const { data, isLoading } = useQuery({
    queryKey: ['expenses', { type: typeFilter, page }],
    queryFn: async () => {
      const params = new URLSearchParams({ page: String(page), limit: '20' });
      if (typeFilter) params.set('type', typeFilter);
      const res = await fetch(`/api/expenses?${params.toString()}`);
      const payload = await res.json();
      if (!res.ok) throw new Error(payload.error ?? 'Erreur chargement dépenses');
      return payload;
    },
    placeholderData: keepPreviousData,
  });

  const expenses = useMemo<ExpenseRow[]>(() => data?.data ?? [], [data?.data]);
  const total: number = data?.meta?.total ?? 0;
  const vehicles = vehiclesData ?? [];

  const totalCost = useMemo(() => expenses.reduce((sum, item) => sum + Number(item.montant ?? 0), 0), [expenses]);

  const createMutation = useMutation({
    mutationFn: async () => {
      const res = await fetch('/api/expenses', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(buildExpensePayload()),
      });
      const payload = await res.json();
      if (!res.ok) throw new Error(payload.error ?? 'Erreur création dépense');
      return payload.data as ExpenseRow;
    },
    onSuccess: () => {
      toast.success('Dépense enregistrée');
      resetForm();
      qc.invalidateQueries({ queryKey: ['expenses'] });
      qc.invalidateQueries({ queryKey: ['finances'] });
      qc.invalidateQueries({ queryKey: ['dashboard'] });
    },
    onError: (error: Error) => toast.error(error.message),
  });

  const updateMutation = useMutation({
    mutationFn: async () => {
      if (!editingExpenseId) throw new Error('Aucune dépense sélectionnée');
      const res = await fetch(`/api/expenses/${editingExpenseId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(buildExpensePayload()),
      });
      const payload = await res.json();
      if (!res.ok) throw new Error(payload.error ?? 'Erreur modification dépense');
      return payload.data as ExpenseRow;
    },
    onSuccess: () => {
      toast.success('Dépense modifiée');
      resetForm();
      qc.invalidateQueries({ queryKey: ['expenses'] });
      qc.invalidateQueries({ queryKey: ['finances'] });
      qc.invalidateQueries({ queryKey: ['dashboard'] });
    },
    onError: (error: Error) => toast.error(error.message),
  });

  const deleteMutation = useMutation({
    mutationFn: async (expenseId: string) => {
      const res = await fetch(`/api/expenses/${expenseId}`, { method: 'DELETE' });
      const payload = await res.json();
      if (!res.ok) throw new Error(payload.error ?? 'Erreur suppression dépense');
      return payload.data as { message: string };
    },
    onSuccess: (_data, expenseId) => {
      toast.success('Dépense supprimée');
      if (editingExpenseId === expenseId) resetForm();
      qc.invalidateQueries({ queryKey: ['expenses'] });
      qc.invalidateQueries({ queryKey: ['finances'] });
      qc.invalidateQueries({ queryKey: ['dashboard'] });
    },
    onError: (error: Error) => toast.error(error.message),
  });

  const isSaving = createMutation.isPending || updateMutation.isPending;

  const columns: ColumnDef<ExpenseRow>[] = [
    {
      accessorKey: 'date',
      header: 'Date',
      cell: ({ getValue }) => <span className="text-xs text-cream-muted">{format(new Date(getValue<string>()), 'dd MMM yyyy', { locale: fr })}</span>,
    },
    {
      accessorKey: 'type',
      header: 'Type',
      cell: ({ row }) => (
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="amber">{TYPE_OPTIONS.find((item) => item.value === row.original.type)?.label ?? row.original.type}</Badge>
          {row.original.sourceModule === 'alertes' && <Badge variant="blue">Alerte</Badge>}
          {row.original.isRecurring && <Badge variant="green">Récurrente</Badge>}
        </div>
      ),
    },
    {
      accessorKey: 'vehicleId',
      header: 'Véhicule',
      cell: ({ row }) => (
        <div className="text-sm text-cream-muted">
          {row.original.vehicleId ? (
            <>
              <p className="text-cream">{row.original.vehicleId.marque} {row.original.vehicleId.modele}</p>
              <p className="text-xs text-cream-muted">{row.original.vehicleId.immatriculation}</p>
            </>
          ) : (
            '—'
          )}
        </div>
      ),
    },
    {
      accessorKey: 'fournisseur',
      header: 'Fournisseur',
      cell: ({ getValue }) => <span className="text-sm text-cream-muted">{getValue<string>() || '—'}</span>,
    },
    {
      accessorKey: 'montant',
      header: 'Montant',
      cell: ({ getValue }) => <span className="font-semibold text-gold">{formatCurrency(getValue<number>())}</span>,
    },
    {
      accessorKey: 'factureUrl',
      header: 'Pièce',
      cell: ({ row }) => (
        row.original.factureUrl ? (
          <a href={row.original.factureUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-sm text-gold hover:text-gold-light">
            <ExternalLink className="h-4 w-4" /> Ouvrir
          </a>
        ) : (
          <span className="text-xs text-cream-muted">—</span>
        )
      ),
    },
    {
      accessorKey: 'recurrenceNextDate',
      header: 'Récurrence',
      cell: ({ row }) => row.original.isRecurring ? (
        <div className="text-xs text-cream-muted">
          <p>{row.original.recurrenceLabel || 'Dépense récurrente'}</p>
          <p>{row.original.recurrenceNextDate ? `Prochaine: ${format(new Date(row.original.recurrenceNextDate), 'dd MMM yyyy', { locale: fr })}` : row.original.recurrenceFrequency || '—'}</p>
        </div>
      ) : <span className="text-xs text-cream-muted">—</span>,
    },
    {
      id: 'actions',
      header: 'Actions',
      enableSorting: false,
      cell: ({ row }) => (
        <div className="flex items-center justify-end gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9 rounded-xl"
            aria-label="Modifier la dépense"
            title="Modifier"
            onClick={() => openEditForm(row.original)}
          >
            <Pencil className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9 rounded-xl text-red-400 hover:bg-red-500/10"
            aria-label="Supprimer la dépense"
            title="Supprimer"
            disabled={deleteMutation.isPending}
            onClick={() => openConfirmModal({
              title: 'Supprimer cette dépense ?',
              description: `${TYPE_OPTIONS.find((item) => item.value === row.original.type)?.label ?? row.original.type} de ${formatCurrency(row.original.montant)} sera supprimée définitivement.`,
              onConfirm: () => deleteMutation.mutate(row.original._id),
            })}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6 animate-slide-up">
      <div className="lux-page-head">
        <div>
          <span className="lux-eyebrow mb-3">
            <Sparkles className="h-3.5 w-3.5" /> coûts & achats
          </span>
          <h1 className="text-3xl font-bold text-cream">Dépenses</h1>
          <p className="mt-2 text-sm text-cream-muted">Saisie des frais d&apos;exploitation, atelier, consommables et charges agence.</p>
        </div>
        <Button variant="gold" onClick={() => (showForm ? resetForm() : setShowForm(true))}>
          <Plus className="h-4 w-4" />
          {showForm ? 'Fermer' : 'Nouvelle dépense'}
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="lux-panel-muted p-5">
          <p className="text-xs uppercase tracking-[0.16em] text-cream-faint">Lignes affichées</p>
          <p className="mt-2 text-2xl font-semibold text-cream">{expenses.length}</p>
        </div>
        <div className="lux-panel-muted p-5">
          <p className="text-xs uppercase tracking-[0.16em] text-cream-faint">Coût affiché</p>
          <p className="mt-2 text-2xl font-semibold text-gold">{formatCurrency(totalCost)}</p>
        </div>
        <div className="lux-panel-muted p-5">
          <p className="text-xs uppercase tracking-[0.16em] text-cream-faint">Filtre actif</p>
          <p className="mt-2 text-2xl font-semibold text-cream">{typeFilter ? TYPE_OPTIONS.find((item) => item.value === typeFilter)?.label ?? typeFilter : 'Tous'}</p>
        </div>
      </div>

      {showForm && (
        <div className="lux-panel p-6 md:p-7">
          <div className="mb-5 flex items-center gap-3">
            <Receipt className="h-5 w-5 text-gold" />
            <h2 className="text-lg font-semibold text-cream">{editingExpenseId ? 'Modifier la dépense' : 'Enregistrer une dépense'}</h2>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            <Select label="Type" value={form.type} onChange={(e) => setForm((prev) => ({ ...prev, type: e.target.value as ExpenseRow['type'] }))}>
              {TYPE_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </Select>
            <Input label="Montant (MAD)" type="number" min={0} step={10} value={form.montant} onChange={(e) => setForm((prev) => ({ ...prev, montant: e.target.value }))} />
            <Input label="Date" type="date" value={form.date} onChange={(e) => setForm((prev) => ({ ...prev, date: e.target.value }))} />
            <Select label="Véhicule (optionnel)" value={form.vehicleId} onChange={(e) => setForm((prev) => ({ ...prev, vehicleId: e.target.value }))}>
              <option value="">Aucun véhicule</option>
              {vehicles.map((vehicle) => (
                <option key={vehicle._id} value={vehicle._id}>{vehicle.marque} {vehicle.modele} — {vehicle.immatriculation}</option>
              ))}
            </Select>
            <Input label="Fournisseur" value={form.fournisseur} onChange={(e) => setForm((prev) => ({ ...prev, fournisseur: e.target.value }))} />
            <Input label="URL facture (optionnel)" value={form.factureUrl} onChange={(e) => setForm((prev) => ({ ...prev, factureUrl: e.target.value }))} />
          </div>

          <div className="mt-4 grid gap-4 md:grid-cols-3">
            <label className="inline-flex items-center gap-2 text-sm text-cream-muted md:col-span-3">
              <input type="checkbox" checked={form.isRecurring} onChange={(e) => setForm((prev) => ({ ...prev, isRecurring: e.target.checked }))} />
              Marquer cette dépense comme récurrente
            </label>

            {form.isRecurring && (
              <>
                <Select label="Fréquence" value={form.recurrenceFrequency} onChange={(e) => setForm((prev) => ({ ...prev, recurrenceFrequency: e.target.value }))}>
                  <option value="monthly">Mensuelle</option>
                  <option value="quarterly">Trimestrielle</option>
                  <option value="yearly">Annuelle</option>
                  <option value="custom">Libre</option>
                </Select>
                <Input label="Prochaine date prévue" type="date" value={form.recurrenceNextDate} onChange={(e) => setForm((prev) => ({ ...prev, recurrenceNextDate: e.target.value }))} />
                <Input label="Libellé récurrent" value={form.recurrenceLabel} onChange={(e) => setForm((prev) => ({ ...prev, recurrenceLabel: e.target.value }))} placeholder="Ex: Assurance annuelle flotte" />
              </>
            )}
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-3">
            <label className="inline-flex cursor-pointer items-center gap-2 rounded-2xl border border-gold/20 bg-gold/5 px-4 py-3 text-sm font-medium text-gold hover:bg-gold/10">
              <Upload className="h-4 w-4" />
              {uploading ? 'Upload en cours...' : 'Uploader la pièce'}
              <input
                type="file"
                accept="image/*,application/pdf"
                className="hidden"
                disabled={uploading}
                onChange={async (e) => {
                  const file = e.target.files?.[0];
                  if (!file) return;
                  try {
                    setUploading(true);
                    const url = await uploadDocument(file);
                    setForm((prev) => ({ ...prev, factureUrl: url }));
                    toast.success('Pièce uploadée');
                  } catch (error) {
                    toast.error(error instanceof Error ? error.message : 'Erreur upload');
                  } finally {
                    setUploading(false);
                    e.target.value = '';
                  }
                }}
              />
            </label>

            {form.factureUrl && (
              <a href={form.factureUrl} target="_blank" rel="noreferrer" className="text-sm text-cream-muted hover:text-cream">
                Prévisualiser la pièce
              </a>
            )}
          </div>

          <div className="mt-4">
            <label className="mb-1.5 block text-sm font-medium text-cream-muted">Note</label>
            <textarea
              value={form.note}
              onChange={(e) => setForm((prev) => ({ ...prev, note: e.target.value }))}
              rows={3}
              className="w-full rounded-xl border border-gold/10 bg-noir-card px-4 py-3 text-sm text-cream placeholder:text-cream-muted/50 focus:border-gold/40 focus:outline-none"
              placeholder="Précision sur l'achat, le dossier ou la facture..."
            />
          </div>

          <div className="mt-5 flex justify-end gap-3">
            {editingExpenseId && (
              <Button variant="outline" disabled={isSaving} onClick={resetForm}>
                Annuler
              </Button>
            )}
            <Button
              variant="gold"
              disabled={!form.montant || isSaving || uploading}
              onClick={() => (editingExpenseId ? updateMutation.mutate() : createMutation.mutate())}
            >
              {isSaving ? 'Enregistrement...' : editingExpenseId ? 'Modifier' : 'Enregistrer'}
            </Button>
          </div>
        </div>
      )}

      <div className="lux-filter-bar">
        {['', ...TYPE_OPTIONS.map((item) => item.value)].map((value) => (
          <button
            key={value}
            onClick={() => {
              setTypeFilter(value);
              setPage(1);
            }}
            className={`rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] transition-colors ${
              typeFilter === value
                ? 'bg-gold text-noir-root'
                : 'border border-white/8 bg-white/5 text-cream-muted hover:text-cream'
            }`}
          >
            {value === '' ? 'Tous' : TYPE_OPTIONS.find((item) => item.value === value)?.label ?? value}
          </button>
        ))}
      </div>

      <DataTable columns={columns} data={expenses} isLoading={isLoading} emptyText="Aucune dépense trouvée." />

      {total > 20 && (
        <div className="flex flex-wrap items-center justify-between gap-2 text-sm text-cream-muted"><span>Page {page} · {Math.ceil(total / 20)} pages</span>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" disabled={page <= 1} onClick={() => setPage((current) => current - 1)}>Précédent</Button>
            <Button variant="outline" size="sm" disabled={page >= Math.ceil(total / 20)} onClick={() => setPage((current) => current + 1)}>Suivant</Button>
          </div>
        </div>
      )}
    </div>
  );
}
