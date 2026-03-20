'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Plus, Clock, AlertTriangle, Sparkles, History, Zap } from 'lucide-react';
import { useLocations } from '@/hooks/useLocations';
import { useFilterStore } from '@/stores/filterStore';
import { useUIStore } from '@/stores/uiStore';
import { DataTable } from '@/components/ui/DataTable';
import { Badge, Button } from '@/components/ui';
import { formatCurrency, getStatutColor } from '@/lib/utils';
import type { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

interface Location {
  _id: string;
  vehicule: { marque: string; modele: string; immatriculation: string };
  client: { prenom: string; nom: string; telephone: string };
  debutAt: string;
  finPrevueAt: string;
  finAt?: string;
  statut: string;
  tarifJour: number;
  montantTotal?: number;
  montantPaye?: number;
  montantRestant?: number;
  paiementStatut?: string;
  etatDesLieuxAvantId?: string | null;
  etatDesLieuxApresId?: string | null;
  caution?: { montant: number; typePrise: string };
}

type TabView = 'actives' | 'historique';

export default function LocationsPage() {
  const [tab, setTab] = useState<TabView>('actives');
  const filters = useFilterStore((s) => s.locations);
  const setFilters = useFilterStore((s) => s.setLocationFilters);
  const openQuickPay = useUIStore((s) => s.openQuickPayModal);

  // Override statut based on tab
  const effectiveStatut = tab === 'actives' ? 'en_cours' : (filters.statut === 'en_cours' ? '' : filters.statut);
  const { data, isLoading } = useLocations({
    statut: tab === 'actives' ? 'en_cours' : (filters.statut && filters.statut !== 'en_cours' ? filters.statut : 'terminee,annulee'),
  });

  const locations: Location[] = data?.data ?? [];
  const total: number = data?.meta?.total ?? 0;

  const now = new Date();

  const switchTab = (t: TabView) => {
    setTab(t);
    setFilters({ statut: '', page: 1 });
  };

  const columns: ColumnDef<Location>[] = [
    {
      accessorKey: 'vehicule',
      header: 'Véhicule',
      cell: ({ row }) => (
        <div>
          <p className="font-medium text-cream">{row.original.vehicule?.marque} {row.original.vehicule?.modele}</p>
          <p className="text-xs text-cream-muted">{row.original.vehicule?.immatriculation}</p>
        </div>
      ),
    },
    {
      accessorKey: 'client',
      header: 'Client',
      cell: ({ row }) => (
        <div>
          <p className="text-cream">{row.original.client?.prenom} {row.original.client?.nom}</p>
          <p className="text-xs text-cream-muted">{row.original.client?.telephone}</p>
        </div>
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
      accessorKey: 'finPrevueAt',
      header: 'Fin prévue',
      cell: ({ row }) => {
        const date = new Date(row.original.finPrevueAt);
        const enRetard = row.original.statut === 'en_cours' && date < now;
        return (
          <span className={`text-xs flex items-center gap-1 ${enRetard ? 'text-red-400' : 'text-cream-muted'}`}>
            {enRetard && <AlertTriangle className="w-3 h-3" />}
            {format(date, 'dd MMM yyyy', { locale: fr })}
          </span>
        );
      },
    },
    {
      accessorKey: 'statut',
      header: 'Statut',
      cell: ({ getValue }) => {
        const s = getValue<string>();
        const color = getStatutColor(s);
        return <Badge variant={color as any}>{s.replace('_', ' ')}</Badge>;
      },
    },
    {
      accessorKey: 'tarifJour',
      header: 'Tarif/j',
      cell: ({ getValue }) => <span className="text-gold">{formatCurrency(getValue<number>())}</span>,
    },
    {
      accessorKey: 'montantTotal',
      header: 'Total',
      cell: ({ row }) => <span className="font-medium text-gold">{formatCurrency(row.original.montantTotal ?? 0)}</span>,
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
        const restant = row.original.montantRestant ?? row.original.montantTotal ?? 0;
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
      cell: ({ row }) => {
        const canCreateDeparture = !row.original.etatDesLieuxAvantId;
        const canCreateReturn = !!row.original.etatDesLieuxAvantId && !row.original.etatDesLieuxApresId;

        return (
        <div className="flex flex-wrap items-center gap-2">
          <Link href={`/locations/${row.original._id}`}>
            <Button variant="ghost" size="sm">Voir</Button>
          </Link>
          {row.original.statut === 'en_cours' && (
            <Button variant="outline" size="sm" onClick={() => openQuickPay('location', row.original._id)}>
              Payer
            </Button>
          )}

          {canCreateDeparture ? (
            <Link href={`/etat-des-lieux?location=${row.original._id}&moment=avant`}>
              <Button variant="gold" size="sm">EDL départ</Button>
            </Link>
          ) : canCreateReturn ? (
            <Link href={`/etat-des-lieux?location=${row.original._id}&moment=apres`}>
              <Button variant="secondary" size="sm">EDL retour</Button>
            </Link>
          ) : (
            <Link href={`/locations/${row.original._id}`}>
              <Button variant="outline" size="sm">Voir EDL</Button>
            </Link>
          )}
        </div>
      )},
    },
  ];

  return (
    <div className="space-y-6 animate-slide-up">
      <div className="lux-page-head">
        <div>
          <span className="lux-eyebrow mb-3">
            <Sparkles className="h-3.5 w-3.5" /> opérations
          </span>
          <h1 className="text-3xl font-bold text-cream">Locations</h1>
          <p className="mt-2 text-sm text-cream-muted">{total} location{total > 1 ? 's' : ''}</p>
        </div>
        <Link href="/locations/nouvelle">
          <Button variant="gold">
            <Plus className="w-4 h-4 mr-2" />
            Nouvelle location
          </Button>
        </Link>
      </div>

      {/* Onglets En cours / Historique */}
      <div className="flex gap-2">
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

      {tab === 'historique' && (
        <div className="lux-filter-bar">
          {['', 'terminee', 'annulee'].map((s) => (
            <button
              key={s}
              onClick={() => setFilters({ statut: s, page: 1 })}
              className={`rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] transition-colors ${
                filters.statut === s
                  ? 'bg-gold text-noir-root'
                  : 'border border-white/8 bg-white/5 text-cream-muted hover:text-cream'
              }`}
            >
              {s === '' ? 'Toutes' : s.charAt(0).toUpperCase() + s.slice(1)}
            </button>
          ))}
        </div>
      )}

      <DataTable columns={columns} data={locations} isLoading={isLoading} emptyText="Aucune location trouvée." />

      {total > 20 && (
        <div className="flex items-center justify-between text-sm text-cream-muted">
          <span>Page {filters.page} · {Math.ceil(total / 20)} pages</span>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" disabled={filters.page <= 1} onClick={() => setFilters({ page: filters.page - 1 })}>Précédent</Button>
            <Button variant="outline" size="sm" disabled={filters.page >= Math.ceil(total / 20)} onClick={() => setFilters({ page: filters.page + 1 })}>Suivant</Button>
          </div>
        </div>
      )}
    </div>
  );
}
