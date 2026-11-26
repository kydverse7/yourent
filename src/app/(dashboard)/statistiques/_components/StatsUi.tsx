import Link from 'next/link';
import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

/* Éléments d'affichage de la page Statistiques (rendus côté serveur). */

const nf = new Intl.NumberFormat('fr-FR');

export function fmtNumber(value: number): string {
  return nf.format(value);
}

export function fmtPercent(value: number): string {
  return `${value.toLocaleString('fr-FR', { maximumFractionDigits: 1 })} %`;
}

export function StatTile({
  label,
  value,
  hint,
  icon,
  accent,
}: {
  label: string;
  value: string;
  hint?: string;
  icon: ReactNode;
  accent?: boolean;
}) {
  return (
    <div className={cn('kpi-card', accent && 'border-gold/25')}>
      <div className="mb-3 flex items-center justify-between gap-2">
        <span className="kpi-label">{label}</span>
        <span className="rounded-2xl border border-gold/15 bg-gold/10 p-2 text-gold">{icon}</span>
      </div>
      <div className="kpi-value mb-1">{value}</div>
      {hint && <p className="mt-2 text-xs text-cream-faint">{hint}</p>}
    </div>
  );
}

export function Panel({
  title,
  description,
  children,
  actions,
  className,
  id,
}: {
  title: string;
  description?: string;
  children: ReactNode;
  actions?: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section id={id} className={cn('lux-panel min-w-0 p-5 md:p-6', className)}>
      <div className="mb-5 flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0">
          <h2 className="font-semibold text-cream">{title}</h2>
          {description && <p className="mt-1 text-sm text-cream-muted">{description}</p>}
        </div>
        {actions}
      </div>
      {children}
    </section>
  );
}

export interface Column<T> {
  header: string;
  cell: (row: T) => ReactNode;
  align?: 'left' | 'right';
  className?: string;
}

export function StatsTable<T>({
  rows,
  columns,
  rowKey,
  empty = 'Aucune donnée sur cette période.',
}: {
  rows: T[];
  columns: Column<T>[];
  rowKey: (row: T, index: number) => string;
  empty?: string;
}) {
  if (!rows.length) {
    return <p className="rounded-2xl border border-white/8 bg-white/3 p-4 text-sm text-cream-muted">{empty}</p>;
  }
  return (
    <div className="lux-table-shell">
      <table className="w-full text-sm">
        <thead className="border-b border-white/6 bg-white/[0.03]">
          <tr>
            {columns.map((column) => (
              <th
                key={column.header}
                scope="col"
                className={cn(
                  'whitespace-nowrap px-4 py-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-cream-faint',
                  column.align === 'right' ? 'text-right' : 'text-left',
                )}
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-white/5">
          {rows.map((row, index) => (
            <tr key={rowKey(row, index)} className="transition-colors hover:bg-white/[0.03]">
              {columns.map((column) => (
                <td
                  key={column.header}
                  className={cn(
                    'px-4 py-3 align-middle text-cream',
                    column.align === 'right' ? 'whitespace-nowrap text-right tabular-nums' : 'text-left',
                    column.className,
                  )}
                >
                  {column.cell(row)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/** Lien de filtre (période, liste des visites) en forme de pastille. */
export function PillLink({ href, active, children }: { href: string; active: boolean; children: ReactNode }) {
  return (
    <Link
      href={href}
      prefetch={false}
      scroll={false}
      aria-current={active ? 'page' : undefined}
      className={cn(
        'inline-flex min-h-10 items-center rounded-full border px-4 text-sm font-medium transition-colors',
        active
          ? 'border-gold/40 bg-gold-gradient text-noir-root shadow-gold'
          : 'border-white/10 bg-white/5 text-cream-muted hover:border-gold/20 hover:text-cream',
      )}
    >
      {children}
    </Link>
  );
}

export function Muted({ children }: { children: ReactNode }) {
  return <span className="text-cream-faint">{children}</span>;
}

/** Petite étiquette d'action (WhatsApp, appel, formulaire, demande). */
export function ActionBadge({ tone, children }: { tone: 'green' | 'gold' | 'blue' | 'neutral'; children: ReactNode }) {
  const tones = {
    green: 'border-green-400/25 bg-green-400/10 text-green-300',
    gold: 'border-gold/30 bg-gold/15 text-gold',
    blue: 'border-sky-400/25 bg-sky-400/10 text-sky-300',
    neutral: 'border-white/10 bg-white/5 text-cream-muted',
  } as const;
  return (
    <span className={cn('inline-flex items-center gap-1 whitespace-nowrap rounded-full border px-2 py-0.5 text-[11px] font-semibold', tones[tone])}>
      {children}
    </span>
  );
}
