'use client';

import Link from 'next/link';
import { Plus, Search, UserX, Sparkles } from 'lucide-react';
import { useState } from 'react';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { useFilterStore } from '@/stores/filterStore';
import { DataTable } from '@/components/ui/DataTable';
import { Badge, Button, Input } from '@/components/ui';
import type { ColumnDef } from '@tanstack/react-table';

interface Client {
  _id: string;
  prenom?: string;
  nom: string;
  documentNumber?: string;
  telephone: string;
  email?: string;
  blacklist: { actif: boolean; motif?: string };
  stats?: { totalLocations: number; totalDepenses: number };
}

const columns: ColumnDef<Client>[] = [
  {
    accessorKey: 'nom',
    header: 'Client',
    cell: ({ row }) => (
      <div>
        <p className="font-medium text-cream">{row.original.prenom} {row.original.nom}</p>
        <p className="text-xs text-cream-muted">{row.original.documentNumber}</p>
      </div>
    ),
  },
  { accessorKey: 'telephone', header: 'Téléphone', cell: ({ getValue }) => <span className="text-cream-muted">{getValue<string>()}</span> },
  { accessorKey: 'email', header: 'Email', cell: ({ getValue }) => <span className="text-cream-muted text-xs">{getValue<string>()}</span> },
  {
    accessorKey: 'blacklist',
    header: 'Statut',
    cell: ({ row }) =>
      row.original.blacklist?.actif ? (
        <Badge variant="red">Blacklisté</Badge>
      ) : (
        <Badge variant="green">Actif</Badge>
      ),
  },
  {
    accessorKey: 'stats',
    header: 'Locations',
    cell: ({ row }) => (
      <span className="text-cream-muted">{row.original.stats?.totalLocations ?? 0}</span>
    ),
  },
  {
    id: 'actions',
    header: '',
    enableSorting: false,
    cell: ({ row }) => (
      <Link href={`/clients/${row.original._id}`}>
        <Button variant="ghost" size="sm">Voir</Button>
      </Link>
    ),
  },
];

export default function ClientsPage() {
  const filters = useFilterStore((s) => s.clients);
  const setFilters = useFilterStore((s) => s.setClientFilters);
  const [searchInput, setSearchInput] = useState(filters.q);

  const { data, isLoading } = useQuery({
    queryKey: ['clients', filters],
    queryFn: async () => {
      const p = new URLSearchParams();
      if (filters.q) p.set('q', filters.q);
      if (filters.blacklist) p.set('blacklist', 'true');
      p.set('page', String(filters.page));
      p.set('limit', '20');
      const res = await fetch(`/api/clients?${p}`);
      if (!res.ok) throw new Error('Erreur');
      return res.json();
    },
    placeholderData: keepPreviousData,
    staleTime: 30_000,
  });

  const clients: Client[] = data?.data ?? [];
  const total: number = data?.meta?.total ?? 0;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setFilters({ q: searchInput, page: 1 });
  };

  return (
    <div className="space-y-6 animate-slide-up">
      <div className="lux-page-head">
        <div>
          <span className="lux-eyebrow mb-3">
            <Sparkles className="h-3.5 w-3.5" /> relation client
          </span>
          <h1 className="text-3xl font-bold text-cream">Clients</h1>
          <p className="mt-2 text-sm text-cream-muted">{total} client{total > 1 ? 's' : ''}</p>
        </div>
        <Link href="/clients/nouveau">
          <Button variant="gold">
            <Plus className="w-4 h-4 mr-2" />
            Nouveau client
          </Button>
        </Link>
      </div>

      <div className="lux-filter-bar flex-col sm:flex-row">
        <form onSubmit={handleSearch} className="flex gap-2 flex-1">
          <Input
            placeholder="Nom, CIN, téléphone..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            leftIcon={<Search className="w-4 h-4" />}
            className="flex-1"
          />
          <Button type="submit" variant="outline" size="md">Chercher</Button>
        </form>
        <button
          onClick={() => setFilters({ blacklist: !filters.blacklist, page: 1 })}
          className={`flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] transition-colors ${
            filters.blacklist
              ? 'bg-red-500/20 text-red-300 border border-red-500/30'
              : 'border border-white/8 bg-white/5 text-cream-muted hover:text-cream'
          }`}
        >
          <UserX className="w-3.5 h-3.5" />
          Blacklistés seulement
        </button>
      </div>

      <DataTable columns={columns} data={clients} isLoading={isLoading} emptyText="Aucun client trouvé." />

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
