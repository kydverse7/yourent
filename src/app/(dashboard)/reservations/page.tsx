'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Clock, CheckCircle, XCircle, Sparkles, History, Zap } from 'lucide-react';
import { keepPreviousData, useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useFilterStore } from '@/stores/filterStore';
import { useUIStore } from '@/stores/uiStore';
import { DataTable } from '@/components/ui/DataTable';
import { Badge, Button } from '@/components/ui';
import { formatCurrency } from '@/lib/utils';
import type { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import toast from 'react-hot-toast';

interface Reservation {
  _id: string;
  vehicule: { marque: string; modele: string; immatriculation: string };
  client?: { prenom: string; nom: string };
  clientInline?: { prenom: string; nom: string; telephone: string; email: string };
  debutAt: string;
  finAt: string;
  statut: string;
  tarifTotal: number;
  montantPaye?: number;
  montantRestant?: number;
  paiementStatut?: string;
  canal: string;
  location?: string | null;
}

const statutColors: Record<string, string> = {
  en_attente: 'amber',
  confirmee: 'green',
  refusee: 'red',
  annulee: 'red',
  en_cours: 'blue',
  terminee: 'muted',
};

type TabView = 'actives' | 'historique';

const ACTIVE_STATUTS = ['en_attente', 'confirmee'];
const HISTORY_STATUTS = ['en_cours', 'terminee', 'refusee', 'annulee'];

export default function ReservationsPage() {
  const [tab, setTab] = useState<TabView>('actives');
  const filters = useFilterStore((s) => s.reservations);
  const setFilters = useFilterStore((s) => s.setReservationFilters);
  const openQuickPay = useUIStore((s) => s.openQuickPayModal);
  const qc = useQueryClient();

  const statutsForTab = tab === 'actives' ? ACTIVE_STATUTS : HISTORY_STATUTS;
  const subStatuts = tab === 'actives'
    ? ['', 'en_attente', 'confirmee']
    : ['', 'en_cours', 'terminee', 'refusee', 'annulee'];

  const { data, isLoading } = useQuery({
    queryKey: ['reservations', { ...filters, tab }],
    queryFn: async () => {
      const p = new URLSearchParams();
      if (filters.statut && statutsForTab.includes(filters.statut)) {
        p.set('statut', filters.statut);
      } else {
        p.set('statut', statutsForTab.join(','));
      }
      p.set('page', String(filters.page));
      p.set('limit', '20');
      const res = await fetch(`/api/reservations?${p}`);
      if (!res.ok) throw new Error('Erreur');
      return res.json();
    },
    placeholderData: keepPreviousData,
    staleTime: 30_000,
  });

  const updateStatut = useMutation({
    mutationFn: async ({ id, statut }: { id: string; statut: string }) => {
      const res = await fetch(`/api/reservations/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ statut }),
      });
      if (!res.ok) throw new Error('Erreur');
      return res.json();
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['reservations'] });
      toast.success('Statut mis à jour');
    },
    onError: () => toast.error('Erreur lors de la mise à jour'),
  });

  const switchTab = (t: TabView) => {
    setTab(t);
    setFilters({ statut: '', page: 1 });
  };

  const reservations: Reservation[] = data?.data ?? [];
  const total: number = data?.meta?.total ?? 0;

  const columns: ColumnDef<Reservation>[] = [
    {
      accessorKey: 'client',
      header: 'Client',
      cell: ({ row }) => {
        const nom = row.original.clientInline
          ? `${row.original.clientInline.prenom} ${row.original.clientInline.nom}`
          : row.original.client
          ? `${row.original.client.prenom} ${row.original.client.nom}`
          : 'Inconnu';
        return <span className="text-cream">{nom}</span>;
      },
    },
    {
      accessorKey: 'vehicule',
      header: 'Véhicule',
      cell: ({ row }) => (
        <span className="text-cream-muted">
          {row.original.vehicule?.marque} {row.original.vehicule?.modele}
        </span>
      ),
    },
    {
      accessorKey: 'debutAt',
      header: 'Début',
      cell: ({ getValue }) => (
        <span className="text-cream-muted text-xs">
          {format(new Date(getValue<string>()), 'dd MMM yyyy', { locale: fr })}
        </span>
      ),
    },
    {
      accessorKey: 'finAt',
      header: 'Fin',
      cell: ({ getValue }) => (
        <span className="text-cream-muted text-xs">
          {format(new Date(getValue<string>()), 'dd MMM yyyy', { locale: fr })}
        </span>
      ),
    },
    {
      accessorKey: 'statut',
      header: 'Statut',
      cell: ({ getValue }) => {
        const s = getValue<string>();
        return <Badge variant={statutColors[s] as any ?? 'muted'}>{s.replace('_', ' ')}</Badge>;
      },
    },
    {
      accessorKey: 'tarifTotal',
      header: 'Total',
      cell: ({ getValue }) => <span className="text-gold font-semibold">{formatCurrency(getValue<number>())}</span>,
    },
    {
      accessorKey: 'montantPaye',
      header: 'Encaissé',
      cell: ({ row }) => (
        <span className="font-medium text-green-300">{formatCurrency(row.original.montantPaye ?? 0)}</span>
      ),
    },
    {
      accessorKey: 'montantRestant',
      header: 'Restant',
      cell: ({ row }) => {
        const restant = row.original.montantRestant ?? row.original.tarifTotal ?? 0;
        return (
          <div className="space-y-1">
            <span className="font-medium text-amber-300">{formatCurrency(restant)}</span>
            <div>
              <Badge variant={restant <= 0 ? 'green' : row.original.montantPaye ? 'amber' : 'muted'}>
                {restant <= 0 ? 'payé' : row.original.montantPaye ? 'partiel' : 'à encaisser'}
              </Badge>
            </div>
          </div>
        );
      },
    },
    {
      id: 'actions',
      header: '',
      enableSorting: false,
      cell: ({ row }) => (
        <div className="flex flex-wrap items-center gap-2">
          {row.original.statut === 'en_attente' && (
            <>
              <Button
                variant="gold"
                size="sm"
                onClick={() => updateStatut.mutate({ id: row.original._id, statut: 'confirmee' })}
              >
                <CheckCircle className="w-3 h-3 mr-1" /> Confirmer
              </Button>
              <Button
                variant="danger"
                size="sm"
                onClick={() => updateStatut.mutate({ id: row.original._id, statut: 'refusee' })}
              >
                <XCircle className="w-3 h-3 mr-1" /> Refuser
              </Button>
            </>
          )}
          {row.original.statut !== 'refusee' && row.original.statut !== 'annulee' && (
            <Button variant="outline" size="sm" onClick={() => openQuickPay('reservation', row.original._id)}>
              Encaisser
            </Button>
          )}
          {row.original.statut === 'confirmee' && !row.original.location && (
            <Link href={`/locations/nouvelle?reservation=${row.original._id}`}>
              <Button variant="secondary" size="sm">Démarrer</Button>
            </Link>
          )}
          <Link href={`/reservations/${row.original._id}`}>
            <Button variant="ghost" size="sm">Voir</Button>
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
            <Sparkles className="h-3.5 w-3.5" /> demandes & conversion
          </span>
          <h1 className="text-3xl font-bold text-cream">Réservations</h1>
          <p className="mt-2 text-sm text-cream-muted">{total} réservation{total > 1 ? 's' : ''}</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => switchTab('actives')}
          className={`flex items-center gap-2 rounded-2xl px-5 py-2.5 text-sm font-semibold transition-all ${
            tab === 'actives'
              ? 'border border-gold/30 bg-gold/10 text-gold shadow-gold'
              : 'border border-white/5 bg-white/[0.02] text-cream-muted hover:bg-white/5 hover:text-cream'
          }`}
        >
          <Zap className="h-4 w-4" /> En cours
        </button>
        <button
          onClick={() => switchTab('historique')}
          className={`flex items-center gap-2 rounded-2xl px-5 py-2.5 text-sm font-semibold transition-all ${
            tab === 'historique'
              ? 'border border-gold/30 bg-gold/10 text-gold shadow-gold'
              : 'border border-white/5 bg-white/[0.02] text-cream-muted hover:bg-white/5 hover:text-cream'
          }`}
        >
          <History className="h-4 w-4" /> Historique
        </button>
      </div>

      <div className="lux-filter-bar">
        {subStatuts.map((s) => (
          <button
            key={s}
            onClick={() => setFilters({ statut: s, page: 1 })}
            className={`flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] transition-colors ${
              filters.statut === s
                ? 'bg-gold text-noir-root'
                : 'border border-white/8 bg-white/5 text-cream-muted hover:text-cream'
            }`}
          >
            {s === 'en_attente' && <Clock className="w-3 h-3" />}
            {s === '' ? 'Toutes' : s.replace('_', ' ').replace(/^\w/, (c) => c.toUpperCase())}
          </button>
        ))}
      </div>

      <DataTable columns={columns} data={reservations} isLoading={isLoading} emptyText="Aucune réservation." />

      {total > 20 && (
        <div className="flex flex-wrap items-center justify-between gap-2 text-sm text-cream-muted"><span>Page {filters.page} · {Math.ceil(total / 20)} pages</span>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" disabled={filters.page <= 1} onClick={() => setFilters({ page: filters.page - 1 })}>Précédent</Button>
            <Button variant="outline" size="sm" disabled={filters.page >= Math.ceil(total / 20)} onClick={() => setFilters({ page: filters.page + 1 })}>Suivant</Button>
          </div>
        </div>
      )}
    </div>
  );
}
