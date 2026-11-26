'use client';

import { useState } from 'react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { cn } from '@/lib/utils';
import type { BreakdownRow, FunnelStep, SeriesPoint, SourceRow } from '@/lib/tracking/stats';

/* Graphiques du back-office uniquement (Recharts n'est jamais chargé sur le site public). */

const GOLD = '#C9A84C';
const AXIS = '#A89880';
const GRID = 'rgba(255,255,255,0.06)';
const TOOLTIP_STYLE = {
  contentStyle: { background: '#111111', border: '1px solid rgba(201,168,76,0.25)', borderRadius: 12 },
  labelStyle: { color: '#F5F0E8', fontWeight: 600 },
  itemStyle: { color: '#F5F0E8' },
  cursor: { fill: 'rgba(201,168,76,0.08)' },
};
const nf = new Intl.NumberFormat('fr-FR');

function EmptyChart({ message = 'Aucune donnée sur cette période.' }: { message?: string }) {
  return (
    <div className="flex h-full min-h-40 items-center justify-center rounded-2xl border border-white/8 bg-white/3 text-sm text-cream-muted">
      {message}
    </div>
  );
}

const SERIES_METRICS = [
  { key: 'visits', label: 'Visites' },
  { key: 'pageviews', label: 'Pages vues' },
  { key: 'ads', label: 'Google Ads' },
  { key: 'contacts', label: 'Contacts' },
  { key: 'submissions', label: 'Demandes' },
] as const;
type SeriesMetric = (typeof SERIES_METRICS)[number]['key'];

/** Évolution jour par jour (ou heure par heure aujourd'hui), une mesure à la fois. */
export function SeriesChart({ data, granularity }: { data: SeriesPoint[]; granularity: 'hour' | 'day' }) {
  const [metric, setMetric] = useState<SeriesMetric>('visits');
  const current = SERIES_METRICS.find((item) => item.key === metric) ?? SERIES_METRICS[0];
  const hasData = data.some((point) => point[metric] > 0);

  return (
    <div className="space-y-4">
      <div role="tablist" aria-label="Mesure affichée" className="flex flex-wrap gap-2">
        {SERIES_METRICS.map((item) => (
          <button
            key={item.key}
            type="button"
            role="tab"
            aria-selected={metric === item.key}
            onClick={() => setMetric(item.key)}
            className={cn(
              'rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors',
              metric === item.key
                ? 'border-gold/40 bg-gold/15 text-gold'
                : 'border-white/10 bg-white/5 text-cream-muted hover:border-gold/20 hover:text-cream',
            )}
          >
            {item.label}
          </button>
        ))}
      </div>
      <div className="h-64">
        {hasData ? (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 8, right: 8, bottom: 0, left: -12 }} barCategoryGap={granularity === 'hour' || data.length > 40 ? 2 : '18%'}>
              <CartesianGrid vertical={false} stroke={GRID} />
              <XAxis
                dataKey="label"
                stroke={AXIS}
                tick={{ fill: AXIS, fontSize: 11 }}
                tickLine={false}
                axisLine={{ stroke: GRID }}
                interval="preserveStartEnd"
                minTickGap={16}
              />
              <YAxis stroke={AXIS} tick={{ fill: AXIS, fontSize: 11 }} tickLine={false} axisLine={false} allowDecimals={false} width={44} />
              <Tooltip
                {...TOOLTIP_STYLE}
                formatter={(value) => [nf.format(Number(value ?? 0)), current.label] as [string, string]}
              />
              <Bar dataKey={metric} name={current.label} fill={GOLD} radius={[4, 4, 0, 0]} maxBarSize={36} />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <EmptyChart />
        )}
      </div>
    </div>
  );
}

function HorizontalBars({
  data,
  valueLabel,
  labelWidth = 150,
  showPercent,
}: {
  data: { label: string; value: number; percent?: number }[];
  valueLabel: string;
  labelWidth?: number;
  showPercent?: boolean;
}) {
  if (!data.length || data.every((row) => row.value === 0)) return <EmptyChart />;
  const height = Math.max(120, data.length * 38 + 16);
  return (
    <div style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} layout="vertical" margin={{ top: 0, right: showPercent ? 104 : 48, bottom: 0, left: 0 }} barCategoryGap={6}>
          <CartesianGrid horizontal={false} stroke={GRID} />
          <XAxis type="number" hide allowDecimals={false} />
          <YAxis
            type="category"
            dataKey="label"
            width={labelWidth}
            tick={{ fill: '#F5F0E8', fontSize: 12 }}
            tickLine={false}
            axisLine={false}
          />
          <Tooltip
            {...TOOLTIP_STYLE}
            formatter={(value) => [nf.format(Number(value ?? 0)), valueLabel] as [string, string]}
          />
          <Bar dataKey="value" name={valueLabel} fill={GOLD} radius={[0, 4, 4, 0]} maxBarSize={24}>
            <LabelList
              dataKey={showPercent ? 'percentLabel' : 'value'}
              position="right"
              style={{ fill: AXIS, fontSize: 11, whiteSpace: 'nowrap' }}
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

/** Visites par origine. */
export function SourcesChart({ rows }: { rows: SourceRow[] }) {
  const data = rows.slice(0, 12).map((row) => ({ label: row.label, value: row.visits }));
  return <HorizontalBars data={data} valueLabel="Visites" />;
}

/** Parcours de réservation : effectif à chaque étape et part des visites. */
export function FunnelChart({ steps }: { steps: FunnelStep[] }) {
  const data = steps.map((step) => ({
    label: step.label,
    value: step.count,
    percentLabel: `${nf.format(step.count)} · ${step.ofVisits.toLocaleString('fr-FR')} %`,
  }));
  return <HorizontalBars data={data} valueLabel="Visites" labelWidth={150} showPercent />;
}

/** Visites par appareil. */
export function DevicesChart({ rows }: { rows: BreakdownRow[] }) {
  const data = rows.map((row) => ({
    label: row.label,
    value: row.visits,
    percentLabel: `${nf.format(row.visits)} · ${row.share.toLocaleString('fr-FR')} %`,
  }));
  return <HorizontalBars data={data} valueLabel="Visites" labelWidth={100} showPercent />;
}
