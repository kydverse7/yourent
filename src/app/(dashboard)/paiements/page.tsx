'use client';

import { useMemo, useState } from 'react';
import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { CreditCard, Sparkles } from 'lucide-react';
import { DataTable } from '@/components/ui/DataTable';
import { Badge, Button } from '@/components/ui';
import { formatCurrency } from '@/lib/utils';
import type { ColumnDef } from '@tanstack/react-table';

interface PaymentRow {
  _id: string;
  location?: {
    _id: string;
    debutAt?: string;
    finPrevueAt?: string;
    finReelleAt?: string;
    montantTotal?: number;
    montantPaye?: number;
    montantRestant?: number;
  };
  reservation?: {
    _id: string;
    statut?: string;
  };
  type: 'especes' | 'carte' | 'virement' | 'cheque';
  categorie: 'location' | 'supplement' | 'remise' | 'caution' | 'caution_restitution' | 'autre';
  montant: number;
  statut: 'effectue' | 'en_attente' | 'annule';
  reference?: string;
  notes?: string;
  createdAt: string;
}

const statutBadge: Record<PaymentRow['statut'], 'green' | 'amber' | 'red'> = {
  effectue: 'green',
  en_attente: 'amber',
  annule: 'red',
};

const categorieLabel: Record<PaymentRow['categorie'], string> = {
  location: 'Location',
  supplement: 'Supplément',
  remise: 'Remise',
  caution: 'Caution',
  caution_restitution: 'Restitution caution',
  autre: 'Autre',
};

export default function PaiementsPage() {
  const [statut, setStatut] = useState('');
  const [categorie, setCategorie] = useState('');
  const [page, setPage] = useState(1);

  const { data, isLoading } = useQuery({
    queryKey: ['payments', { statut, categorie, page }],
    queryFn: async () => {
      const params = new URLSearchParams({ page: String(page), limit: '20' });
      if (statut) params.set('statut', statut);
      if (categorie) params.set('categorie', categorie);
      const res = await fetch(`/api/payments?${params.toString()}`);
      const payload = await res.json();
      if (!res.ok) throw new Error(payload.error ?? 'Erreur chargement paiements');
      return payload;
    },
    placeholderData: keepPreviousData,
  });

  const payments: PaymentRow[] = data?.data ?? [];
  const total: number = data?.meta?.total ?? 0;

  const totals = useMemo(() => {
    return payments.reduce(
      (acc, payment) => {
        if (payment.categorie === 'caution' || payment.categorie === 'caution_restitution') {
          acc.cautions += payment.montant;
        } else {
          acc.exploitation += payment.montant;
        }
        return acc;
      },
      { exploitation: 0, cautions: 0 }
    );
  }, [payments]);

  const columns: ColumnDef<PaymentRow>[] = [
    {
      accessorKey: 'createdAt',
      header: 'Date',
      cell: ({ getValue }) => (
        <span className="text-xs text-cream-muted">
          {format(new Date(getValue<string>()), 'dd MMM yyyy', { locale: fr })}
        </span>
      ),
    },
    {
      accessorKey: 'categorie',
      header: 'Catégorie',
      cell: ({ row }) => (
        <div>
          <p className="font-medium text-cream">{categorieLabel[row.original.categorie]}</p>
          <p className="text-xs text-cream-muted capitalize">{row.original.type}</p>
        </div>
      ),
    },
    {
      accessorKey: 'location',
      header: 'Dossier',
      cell: ({ row }) => (
        <div className="text-sm text-cream-muted">
          {row.original.location ? (
            <>
              <p className="text-cream">Location #{row.original.location._id.slice(-6)}</p>
              <p className="text-xs text-cream-muted">
                {row.original.location.montantPaye ?? 0} / {row.original.location.montantTotal ?? 0} MAD encaissés
              </p>
            </>
          ) : row.original.reservation ? (
            <>
              <p className="text-cream">Réservation #{row.original.reservation._id.slice(-6)}</p>
              <p className="text-xs text-cream-muted">{row.original.reservation.statut ?? '—'}</p>
            </>
          ) : (
            '—'
          )}
        </div>
      ),
    },
    {
      accessorKey: 'statut',
      header: 'Statut',
      cell: ({ row }) => <Badge variant={statutBadge[row.original.statut]}>{row.original.statut}</Badge>,
    },
    {
      accessorKey: 'montant',
      header: 'Montant',
      cell: ({ getValue, row }) => (
        <span className={row.original.categorie.startsWith('caution') ? 'text-amber-300 font-semibold' : 'text-gold font-semibold'}>
          {formatCurrency(getValue<number>())}
        </span>
      ),
    },
  ];

  return (
    <div className="space-y-6 animate-slide-up">
      <div className="lux-page-head">
        <div>
          <span className="lux-eyebrow mb-3">
            <Sparkles className="h-3.5 w-3.5" /> encaissements & traçabilité
          </span>
          <h1 className="text-3xl font-bold text-cream">Paiements</h1>
          <p className="mt-2 text-sm text-cream-muted">Suivi des encaissements, cautions et ajustements enregistrés en agence.</p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="lux-panel-muted p-5">
          <p className="text-xs uppercase tracking-[0.16em] text-cream-faint">Flux exploitation</p>
          <p className="mt-2 text-2xl font-semibold text-gold">{formatCurrency(totals.exploitation)}</p>
        </div>
        <div className="lux-panel-muted p-5">
          <p className="text-xs uppercase tracking-[0.16em] text-cream-faint">Flux caution</p>
          <p className="mt-2 text-2xl font-semibold text-amber-300">{formatCurrency(totals.cautions)}</p>
        </div>
        <div className="lux-panel-muted p-5">
          <p className="text-xs uppercase tracking-[0.16em] text-cream-faint">Lignes affichées</p>
          <p className="mt-2 text-2xl font-semibold text-cream">{payments.length}</p>
        </div>
      </div>

      <div className="lux-filter-bar flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-2">
          {['', 'effectue', 'en_attente', 'annule'].map((value) => (
            <button
              key={value}
              onClick={() => {
                setStatut(value);
                setPage(1);
              }}
              className={`rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] transition-colors ${
                statut === value
                  ? 'bg-gold text-noir-root'
                  : 'border border-white/8 bg-white/5 text-cream-muted hover:text-cream'
              }`}
            >
              {value === '' ? 'Tous statuts' : value}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap gap-2">
          {['', 'location', 'supplement', 'caution', 'caution_restitution', 'autre'].map((value) => (
            <button
              key={value}
              onClick={() => {
                setCategorie(value);
                setPage(1);
              }}
              className={`rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] transition-colors ${
                categorie === value
                  ? 'bg-gold text-noir-root'
                  : 'border border-white/8 bg-white/5 text-cream-muted hover:text-cream'
              }`}
            >
              {value === '' ? 'Toutes catégories' : categorieLabel[value as PaymentRow['categorie']]}
            </button>
          ))}
        </div>
      </div>

      <DataTable columns={columns} data={payments} isLoading={isLoading} emptyText="Aucun paiement trouvé." />

      {total > 20 && (
        <div className="flex items-center justify-between text-sm text-cream-muted">
          <span>Page {page} · {Math.ceil(total / 20)} pages</span>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" disabled={page <= 1} onClick={() => setPage((current) => current - 1)}>
              Précédent
            </Button>
            <Button variant="outline" size="sm" disabled={page >= Math.ceil(total / 20)} onClick={() => setPage((current) => current + 1)}>
              Suivant
            </Button>
          </div>
        </div>
      )}

      <div className="rounded-[24px] border border-gold/15 bg-gold/5 p-4 text-sm text-cream-muted">
        <div className="flex items-start gap-3">
          <CreditCard className="mt-0.5 h-4 w-4 text-gold" />
          <p>
            Les lignes de type <strong className="text-amber-300">caution</strong> et <strong className="text-amber-300">restitution caution</strong> sont tracées ici,
            mais restent exclues des calculs de revenus dans la finance.
          </p>
        </div>
      </div>
    </div>
  );
}
