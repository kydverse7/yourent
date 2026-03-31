'use client';

import { useFinances } from '@/hooks/useLocations';
import { useFilterStore } from '@/stores/filterStore';
import KpiCard from '@/components/dashboard/KpiCard';
import { Sparkles } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from 'recharts';

type FinanceSummary = {
  revenus: number;
  depenses: number;
  marge: number;
  margePercent: number;
  cautionEnCours: number;
  nbLocations: number;
  revenuMoyen: number;
  parModesPaiement: Record<string, number>;
};

type FinanceChartPoint = {
  mois: string;
  revenus: number;
  depenses: number;
};

type VehicleRevenue = {
  _id: string;
  marque: string;
  modele: string;
  immatriculation: string;
  revenus: number;
  nbLocations: number;
};

// NOTE : toutes les données financières excluent automatiquement les catégories caution
export default function FinancesPage() {
  const filters = useFilterStore((s) => s.finances);
  const setFilters = useFilterStore((s) => s.setFinanceFilters);

  const { data: summary, isLoading: loadingSummary } = useFinances('summary');
  const { data: chart, isLoading: loadingChart } = useFinances('chart');
  const { data: topVehicles, isLoading: loadingVehicles } = useFinances('vehicules');

  const summaryData = (summary?.data ?? null) as FinanceSummary | null;
  const chartData = Array.isArray(chart?.data) ? (chart.data as FinanceChartPoint[]) : [];
  const vehicleRevenueData = Array.isArray(topVehicles?.data) ? (topVehicles.data as VehicleRevenue[]) : [];

  const kpis = summaryData
    ? [
        {
          title: 'Revenus (hors caution)',
          value: summaryData.revenus ?? 0,
          iconName: 'dollarSign' as const,
          format: 'currency' as const,
          trend: 8,
        },
        {
          title: 'Dépenses',
          value: summaryData.depenses ?? 0,
          iconName: 'activity' as const,
          format: 'currency' as const,
          invertTrend: true,
        },
        {
          title: 'Bénéfice net',
          value: summaryData.marge ?? 0,
          iconName: 'trendingUp' as const,
          format: 'currency' as const,
          trend: summaryData.margePercent ?? 0,
        },
        {
          title: 'Cautions en cours',
          value: summaryData.cautionEnCours ?? 0,
          subtitle: 'Non comptabilisées dans les revenus',
          iconName: 'calendar' as const,
          format: 'currency' as const,
        },
      ]
    : [];

  return (
    <div className="space-y-8 animate-slide-up">
      <div className="lux-page-head">
        <div>
          <span className="lux-eyebrow mb-3">
            <Sparkles className="h-3.5 w-3.5" /> pilotage financier
          </span>
          <h1 className="text-3xl font-bold text-cream">Finances</h1>
          <p className="mt-2 text-sm text-cream-muted">
            Les cautions sont exclues de tous les calculs financiers
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <input
            type="date"
            value={filters.from}
            onChange={(e) => setFilters({ from: e.target.value })}
            className="input-gold h-11 w-auto min-w-0 flex-1 sm:flex-none sm:min-w-[150px] px-3 text-sm"
          />
          <span className="text-cream-muted">→</span>
          <input
            type="date"
            value={filters.to}
            onChange={(e) => setFilters({ to: e.target.value })}
            className="input-gold h-11 w-auto min-w-0 flex-1 sm:flex-none sm:min-w-[150px] px-3 text-sm"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {loadingSummary
          ? Array.from({ length: 4 }).map((_, i) => <div key={i} className="h-28 bg-noir-card rounded-xl animate-pulse" />)
          : kpis.map((kpi) => <KpiCard key={kpi.title} {...kpi} />)}
      </div>

      <div className="lux-panel p-6">
        <h2 className="text-cream font-semibold mb-6">Revenus vs Dépenses (hors caution)</h2>
        <div className="h-64">
          {loadingChart ? (
            <div className="h-full animate-pulse rounded-2xl bg-white/5" />
          ) : chartData.length === 0 ? (
            <div className="flex h-full items-center justify-center rounded-2xl border border-white/8 bg-white/3 text-sm text-cream-muted">
              Aucune donnée financière sur cette période.
            </div>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(201,168,76,0.1)" />
                <XAxis dataKey="mois" stroke="#8B7D6B" tick={{ fill: '#8B7D6B', fontSize: 12 }} />
                <YAxis stroke="#8B7D6B" tick={{ fill: '#8B7D6B', fontSize: 12 }} tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} />
                <Tooltip
                  contentStyle={{ background: '#111111', border: '1px solid rgba(201,168,76,0.2)', borderRadius: 8 }}
                  labelStyle={{ color: '#F5F0E8' }}
                  formatter={(v: number | undefined) => [formatCurrency(v ?? 0), ''] as [string, string]}
                />
                <Legend />
                <Bar dataKey="revenus" name="Revenus" fill="#C9A84C" radius={[4, 4, 0, 0]} />
                <Bar dataKey="depenses" name="Dépenses" fill="#6B4C4C" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>

      <div className="lux-panel p-6">
        <div className="mb-5 flex items-center justify-between gap-3">
          <div>
            <h2 className="text-cream font-semibold">Top véhicules par revenus</h2>
            <p className="mt-1 text-sm text-cream-muted">Classement hors cautions sur la période sélectionnée.</p>
          </div>
        </div>

        {loadingVehicles ? (
          <div className="space-y-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-16 animate-pulse rounded-2xl bg-white/5" />
            ))}
          </div>
        ) : vehicleRevenueData.length === 0 ? (
          <div className="rounded-2xl border border-white/8 bg-white/3 p-5 text-sm text-cream-muted">
            Aucun revenu véhicule trouvé sur cette période.
          </div>
        ) : (
          <div className="space-y-3">
            {vehicleRevenueData.slice(0, 6).map((vehicle) => (
              <div key={vehicle._id} className="flex items-center justify-between rounded-2xl border border-white/8 bg-white/3 px-4 py-3">
                <div>
                  <p className="font-medium text-cream">{vehicle.marque} {vehicle.modele}</p>
                  <p className="text-xs text-cream-muted">{vehicle.immatriculation} · {vehicle.nbLocations} location{vehicle.nbLocations > 1 ? 's' : ''}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gold">{formatCurrency(vehicle.revenus)}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="rounded-[24px] border border-amber-500/20 bg-amber-500/5 p-4 text-sm text-amber-300">
        <strong>⚠️ Rappel :</strong> Les paiements de type <em>caution</em> et <em>caution_restitution</em> ne sont
        jamais inclus dans les revenus ni dans les dépenses. Ils sont gérés dans la section dédiée de chaque location.
      </div>
    </div>
  );
}
