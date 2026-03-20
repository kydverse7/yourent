'use client';

import { useMemo, useState } from 'react';
import { keepPreviousData, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import type { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { AlertTriangle, ExternalLink, Plus, Sparkles, Upload, Wrench } from 'lucide-react';
import toast from 'react-hot-toast';
import { Badge, Button, Input, Select } from '@/components/ui';
import { DataTable } from '@/components/ui/DataTable';
import { formatCurrency } from '@/lib/utils';

type AlertRow = {
  id: string;
  vehicleId: string;
  type: 'ct' | 'assurance' | 'vidange';
  label: string;
  severity: 'warning' | 'urgence' | 'ok' | 'depasse';
  vehicleLabel: string;
  immatriculation?: string;
  currentKm?: number;
  dueDate?: string;
  dueKm?: number;
  daysLeft?: number;
  kmLeft?: number;
};

type HistoryRow = {
  _id: string;
  vehicle?: { _id: string; marque: string; modele: string; immatriculation: string };
  type: 'vidange' | 'assurance' | 'ct';
  description?: string;
  cout: number;
  fournisseur?: string;
  date: string;
  kmAuMoment?: number;
  prochaineEcheance?: string;
  prochaineEcheanceKm?: number;
  facturePdfUrl?: string;
};

type AlertsPayload = {
  alerts: AlertRow[];
  history: HistoryRow[];
  stats: { total: number; expired: number; urgent: number; warning: number };
};

const defaultForm = {
  date: new Date().toISOString().split('T')[0],
  cout: '',
  fournisseur: '',
  description: '',
  kmAuMoment: '',
  nextDueDate: '',
  nextDueKm: '',
  facturePdfUrl: '',
  createExpense: true,
  recurrenceEnabled: false,
  recurrenceFrequency: 'yearly',
  recurrenceNextDate: '',
  recurrenceLabel: '',
};

function severityBadgeVariant(severity: AlertRow['severity']) {
  switch (severity) {
    case 'depasse':
      return 'red';
    case 'urgence':
      return 'amber';
    case 'warning':
      return 'blue';
    default:
      return 'green';
  }
}

function severityLabel(severity: AlertRow['severity']) {
  switch (severity) {
    case 'depasse':
      return 'Expirée';
    case 'urgence':
      return 'Urgente';
    case 'warning':
      return 'À anticiper';
    default:
      return 'OK';
  }
}

export default function AlertesPage() {
  const qc = useQueryClient();
  const [form, setForm] = useState(defaultForm);
  const [selectedAlert, setSelectedAlert] = useState<AlertRow | null>(null);
  const [uploading, setUploading] = useState(false);
  const [page] = useState(1);

  const uploadPdf = async (file: File) => {
    const fd = new FormData();
    fd.append('file', file);
    fd.append('folder', 'alerts');

    const res = await fetch('/api/upload', { method: 'POST', body: fd });
    const payload = await res.json();
    if (!res.ok) throw new Error(payload.error ?? 'Erreur upload justificatif');
    return payload.data.url as string;
  };

  const { data, isLoading } = useQuery({
    queryKey: ['alerts', { page }],
    queryFn: async () => {
      const res = await fetch('/api/alerts');
      const payload = await res.json();
      if (!res.ok) throw new Error(payload.error ?? 'Erreur chargement alertes');
      return payload.data as AlertsPayload;
    },
    placeholderData: keepPreviousData,
  });

  const alerts = data?.alerts ?? [];
  const history = data?.history ?? [];
  const stats = data?.stats ?? { total: 0, expired: 0, urgent: 0, warning: 0 };

  const totalCost = useMemo(() => history.reduce((sum, item) => sum + Number(item.cout ?? 0), 0), [history]);

  const completeMutation = useMutation({
    mutationFn: async () => {
      if (!selectedAlert) throw new Error('Sélectionnez une alerte');

      const res = await fetch('/api/alerts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          vehicleId: selectedAlert.vehicleId,
          alertType: selectedAlert.type,
          date: form.date,
          cout: Number(form.cout || 0),
          fournisseur: form.fournisseur || undefined,
          description: form.description || undefined,
          kmAuMoment: form.kmAuMoment ? Number(form.kmAuMoment) : undefined,
          nextDueDate: form.nextDueDate || undefined,
          nextDueKm: form.nextDueKm ? Number(form.nextDueKm) : undefined,
          facturePdfUrl: form.facturePdfUrl || undefined,
          createExpense: form.createExpense,
          recurring: form.recurrenceEnabled
            ? {
                enabled: true,
                frequency: form.recurrenceFrequency,
                nextDueDate: form.recurrenceNextDate || undefined,
                label: form.recurrenceLabel || undefined,
              }
            : undefined,
        }),
      });
      const payload = await res.json();
      if (!res.ok) throw new Error(payload.error ?? 'Erreur traitement alerte');
      return payload.data;
    },
    onSuccess: (payload) => {
      toast.success(payload.expenseCreated ? 'Alerte traitée et dépense créée' : 'Alerte traitée');
      setSelectedAlert(null);
      setForm(defaultForm);
      qc.invalidateQueries({ queryKey: ['alerts'] });
      qc.invalidateQueries({ queryKey: ['vehicles'] });
      qc.invalidateQueries({ queryKey: ['vehicle'] });
      qc.invalidateQueries({ queryKey: ['expenses'] });
      qc.invalidateQueries({ queryKey: ['dashboard'] });
    },
    onError: (error: Error) => toast.error(error.message),
  });

  const historyColumns: ColumnDef<HistoryRow>[] = [
    {
      accessorKey: 'date',
      header: 'Date',
      cell: ({ getValue }) => <span className="text-xs text-cream-muted">{format(new Date(getValue<string>()), 'dd MMM yyyy', { locale: fr })}</span>,
    },
    {
      accessorKey: 'vehicle',
      header: 'Véhicule',
      cell: ({ row }) => (
        <div>
          <p className="font-medium text-cream">{row.original.vehicle?.marque} {row.original.vehicle?.modele}</p>
          <p className="text-xs text-cream-muted">{row.original.vehicle?.immatriculation}</p>
        </div>
      ),
    },
    {
      accessorKey: 'type',
      header: 'Alerte traitée',
      cell: ({ row }) => <Badge variant="blue">{row.original.type === 'ct' ? 'Contrôle technique' : row.original.type === 'assurance' ? 'Assurance' : 'Vidange'}</Badge>,
    },
    {
      accessorKey: 'cout',
      header: 'Coût',
      cell: ({ getValue }) => <span className="font-semibold text-gold">{formatCurrency(getValue<number>())}</span>,
    },
    {
      accessorKey: 'prochaineEcheance',
      header: 'Prochaine échéance',
      cell: ({ row }) => (
        <div className="text-xs text-cream-muted">
          <p>{row.original.prochaineEcheance ? format(new Date(row.original.prochaineEcheance), 'dd MMM yyyy', { locale: fr }) : '—'}</p>
          <p>{row.original.prochaineEcheanceKm ? `${row.original.prochaineEcheanceKm.toLocaleString('fr-MA')} km` : ''}</p>
        </div>
      ),
    },
    {
      accessorKey: 'facturePdfUrl',
      header: 'Pièce',
      cell: ({ row }) => row.original.facturePdfUrl ? (
        <a href={row.original.facturePdfUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-sm text-gold hover:text-gold-light">
          <ExternalLink className="h-4 w-4" /> Ouvrir
        </a>
      ) : <span className="text-xs text-cream-muted">—</span>,
    },
  ];

  const needDate = selectedAlert?.type === 'ct' || selectedAlert?.type === 'assurance';
  const needKm = selectedAlert?.type === 'vidange';
  const invalidNextDue = (needDate && !form.nextDueDate) || (needKm && !form.nextDueKm);

  return (
    <div className="space-y-6 animate-slide-up">
      <div className="lux-page-head">
        <div>
          <span className="lux-eyebrow mb-3">
            <Sparkles className="h-3.5 w-3.5" /> alertes & historique
          </span>
          <h1 className="text-3xl font-bold text-cream">Alertes</h1>
          <p className="mt-2 text-sm text-cream-muted">Les alertes viennent directement des fiches véhicule. Depuis ici, une action “fait” met à jour la fiche, enregistre l’historique et peut créer la dépense liée.</p>
        </div>
        <Button variant="gold" onClick={() => selectedAlert && setSelectedAlert(null)}>
          <Plus className="h-4 w-4" />
          {selectedAlert ? 'Fermer l’action' : 'Choisir une alerte'}
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <div className="lux-panel-muted p-5">
          <p className="text-xs uppercase tracking-[0.16em] text-cream-faint">Alertes actives</p>
          <p className="mt-2 text-2xl font-semibold text-cream">{stats.total}</p>
        </div>
        <div className="lux-panel-muted p-5">
          <p className="text-xs uppercase tracking-[0.16em] text-cream-faint">Expirées</p>
          <p className="mt-2 text-2xl font-semibold text-red-300">{stats.expired}</p>
        </div>
        <div className="lux-panel-muted p-5">
          <p className="text-xs uppercase tracking-[0.16em] text-cream-faint">Urgentes</p>
          <p className="mt-2 text-2xl font-semibold text-amber-300">{stats.urgent}</p>
        </div>
        <div className="lux-panel-muted p-5">
          <p className="text-xs uppercase tracking-[0.16em] text-cream-faint">Historique affiché</p>
          <p className="mt-2 text-2xl font-semibold text-gold">{formatCurrency(totalCost)}</p>
        </div>
      </div>

      <section className="lux-panel p-6 md:p-7">
        <div className="mb-5 flex items-center gap-3">
          <AlertTriangle className="h-5 w-5 text-gold" />
          <h2 className="text-lg font-semibold text-cream">Alertes actives</h2>
        </div>

        {alerts.length === 0 ? (
          <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-5 text-sm text-cream-muted">Aucune alerte active pour le moment.</div>
        ) : (
          <div className="grid gap-4 lg:grid-cols-2">
            {alerts.map((alert) => (
              <div key={alert.id} className="rounded-2xl border border-white/8 bg-white/[0.03] p-5">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold text-cream">{alert.vehicleLabel}</p>
                    <p className="mt-1 text-xs text-cream-muted">{alert.immatriculation} · {alert.label}</p>
                  </div>
                  <Badge variant={severityBadgeVariant(alert.severity)}>{severityLabel(alert.severity)}</Badge>
                </div>

                <div className="mt-4 text-sm text-cream-muted">
                  {alert.type === 'vidange' ? (
                    <>
                      <p>Kilométrage actuel : <span className="text-cream">{Number(alert.currentKm ?? 0).toLocaleString('fr-MA')} km</span></p>
                      <p>Prochaine vidange : <span className="text-cream">{Number(alert.dueKm ?? 0).toLocaleString('fr-MA')} km</span></p>
                    </>
                  ) : (
                    <p>Échéance : <span className="text-cream">{alert.dueDate ? format(new Date(alert.dueDate), 'dd MMM yyyy', { locale: fr }) : '—'}</span></p>
                  )}
                </div>

                <div className="mt-4 flex flex-wrap gap-3">
                  <Button variant="gold" size="sm" onClick={() => setSelectedAlert(alert)}>Marquer fait</Button>
                  <a href={`/vehicules/${alert.vehicleId}`} className="text-sm text-cream-muted hover:text-cream">Voir la fiche</a>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {selectedAlert && (
        <section className="lux-panel p-6 md:p-7">
          <div className="mb-5 flex items-center gap-3">
            <Wrench className="h-5 w-5 text-gold" />
            <h2 className="text-lg font-semibold text-cream">Traiter l’alerte · {selectedAlert.vehicleLabel}</h2>
          </div>

          <div className="mb-4 rounded-2xl border border-gold/10 bg-gold/5 p-4 text-sm text-cream-muted">
            <p className="font-medium text-cream">{selectedAlert.label}</p>
            <p className="mt-1">L’action va mettre à jour la fiche véhicule, enregistrer l’historique et créer la dépense liée si un coût est saisi.</p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            <Input label="Date de réalisation" type="date" value={form.date} onChange={(e) => setForm((prev) => ({ ...prev, date: e.target.value }))} />
            <Input label="Coût (MAD)" type="number" min={0} step={10} value={form.cout} onChange={(e) => setForm((prev) => ({ ...prev, cout: e.target.value }))} />
            <Input label="Fournisseur" value={form.fournisseur} onChange={(e) => setForm((prev) => ({ ...prev, fournisseur: e.target.value }))} />
            <Input label="Kilométrage relevé" type="number" min={0} step={100} value={form.kmAuMoment} onChange={(e) => setForm((prev) => ({ ...prev, kmAuMoment: e.target.value }))} />
            {needDate && <Input label="Prochaine échéance date" type="date" value={form.nextDueDate} onChange={(e) => setForm((prev) => ({ ...prev, nextDueDate: e.target.value }))} />}
            {needKm && <Input label="Prochaine échéance km" type="number" min={0} step={500} value={form.nextDueKm} onChange={(e) => setForm((prev) => ({ ...prev, nextDueKm: e.target.value }))} />}
            <Input label="URL justificatif" value={form.facturePdfUrl} onChange={(e) => setForm((prev) => ({ ...prev, facturePdfUrl: e.target.value }))} className="md:col-span-2 xl:col-span-3" />
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-3">
            <label className="inline-flex cursor-pointer items-center gap-2 rounded-2xl border border-gold/20 bg-gold/5 px-4 py-3 text-sm font-medium text-gold hover:bg-gold/10">
              <Upload className="h-4 w-4" />
              {uploading ? 'Upload en cours...' : 'Uploader un justificatif'}
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
                    const url = await uploadPdf(file);
                    setForm((prev) => ({ ...prev, facturePdfUrl: url }));
                    toast.success('Justificatif uploadé');
                  } catch (error) {
                    toast.error(error instanceof Error ? error.message : 'Erreur upload');
                  } finally {
                    setUploading(false);
                    e.target.value = '';
                  }
                }}
              />
            </label>

            <label className="inline-flex items-center gap-2 text-sm text-cream-muted">
              <input type="checkbox" checked={form.createExpense} onChange={(e) => setForm((prev) => ({ ...prev, createExpense: e.target.checked }))} />
              Créer automatiquement la dépense liée
            </label>

            <label className="inline-flex items-center gap-2 text-sm text-cream-muted">
              <input type="checkbox" checked={form.recurrenceEnabled} onChange={(e) => setForm((prev) => ({ ...prev, recurrenceEnabled: e.target.checked }))} />
              Marquer la dépense comme récurrente
            </label>
          </div>

          {form.recurrenceEnabled && (
            <div className="mt-4 grid gap-4 md:grid-cols-3">
              <Select label="Fréquence" value={form.recurrenceFrequency} onChange={(e) => setForm((prev) => ({ ...prev, recurrenceFrequency: e.target.value }))}>
                <option value="monthly">Mensuelle</option>
                <option value="quarterly">Trimestrielle</option>
                <option value="yearly">Annuelle</option>
                <option value="custom">Libre</option>
              </Select>
              <Input label="Prochaine dépense prévue" type="date" value={form.recurrenceNextDate} onChange={(e) => setForm((prev) => ({ ...prev, recurrenceNextDate: e.target.value }))} />
              <Input label="Libellé récurrent" value={form.recurrenceLabel} onChange={(e) => setForm((prev) => ({ ...prev, recurrenceLabel: e.target.value }))} placeholder="Ex: Assurance flotte annuelle" />
            </div>
          )}

          <div className="mt-4">
            <label className="mb-1.5 block text-sm font-medium text-cream-muted">Description</label>
            <textarea
              value={form.description}
              onChange={(e) => setForm((prev) => ({ ...prev, description: e.target.value }))}
              rows={3}
              className="w-full rounded-xl border border-gold/10 bg-noir-card px-4 py-3 text-sm text-cream placeholder:text-cream-muted/50 focus:border-gold/40 focus:outline-none"
              placeholder="Précision sur l’opération réalisée..."
            />
          </div>

          <div className="mt-5 flex justify-end gap-3">
            <Button variant="outline" onClick={() => { setSelectedAlert(null); setForm(defaultForm); }}>Annuler</Button>
            <Button variant="gold" disabled={completeMutation.isPending || invalidNextDue} onClick={() => completeMutation.mutate()}>
              {completeMutation.isPending ? 'Traitement...' : 'Valider le traitement'}
            </Button>
          </div>
        </section>
      )}

      <section className="lux-panel p-6 md:p-7">
        <div className="mb-5 flex items-center gap-3">
          <Wrench className="h-5 w-5 text-gold" />
          <h2 className="text-lg font-semibold text-cream">Historique des traitements</h2>
        </div>
        <DataTable columns={historyColumns} data={history} isLoading={isLoading} emptyText="Aucun traitement d’alerte trouvé." />
      </section>
    </div>
  );
}
