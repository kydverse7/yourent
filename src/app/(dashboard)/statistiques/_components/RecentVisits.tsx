import Link from 'next/link';
import { ChevronDown } from 'lucide-react';
import { STATS_TIMEZONE, VISIT_FILTERS, formatDuration, type VisitFilter, type VisitRow } from '@/lib/tracking/stats';
import type { RecentVisits as RecentVisitsData } from '@/services/siteStatsService';
import { ActionBadge, Muted, PillLink, fmtNumber } from './StatsUi';

const dateTime = new Intl.DateTimeFormat('fr-FR', {
  timeZone: STATS_TIMEZONE,
  day: '2-digit',
  month: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
});
const time = new Intl.DateTimeFormat('fr-FR', { timeZone: STATS_TIMEZONE, hour: '2-digit', minute: '2-digit', second: '2-digit' });

function Actions({ row }: { row: VisitRow }) {
  const { whatsapp, calls, formStarted, submitted } = row.actions;
  if (!whatsapp && !calls && !formStarted && !submitted) return <Muted>—</Muted>;
  return (
    <span className="flex flex-wrap gap-1">
      {whatsapp > 0 && <ActionBadge tone="green">WhatsApp{whatsapp > 1 ? ` ×${whatsapp}` : ''}</ActionBadge>}
      {calls > 0 && <ActionBadge tone="blue">Appel{calls > 1 ? ` ×${calls}` : ''}</ActionBadge>}
      {formStarted && !submitted && <ActionBadge tone="neutral">Formulaire commencé</ActionBadge>}
      {submitted && <ActionBadge tone="gold">Demande envoyée</ActionBadge>}
    </span>
  );
}

function VisitDetail({ row }: { row: VisitRow }) {
  return (
    <div className="grid gap-5 border-t border-white/6 px-4 pb-5 pt-4 lg:grid-cols-2">
      <div>
        <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-cream-faint">Parcours page par page</p>
        {row.pages.length ? (
          <ol className="space-y-1.5 text-sm">
            {row.pages.map((page, index) => (
              <li key={`${page.path}-${index}`} className="flex flex-wrap items-baseline gap-x-3 gap-y-0.5">
                <span className="w-6 shrink-0 text-right tabular-nums text-cream-faint">{index + 1}.</span>
                <span className="min-w-0 break-all text-cream">{page.label}</span>
                <span className="text-xs text-cream-muted">
                  {formatDuration(page.duration)}
                  {page.scroll !== null ? ` · défilement ${page.scroll} %` : ''}
                  {index === row.pages.length - 1 ? ' · sortie' : ''}
                </span>
              </li>
            ))}
          </ol>
        ) : (
          <p className="text-sm text-cream-muted">Aucune page enregistrée.</p>
        )}
      </div>
      <div>
        <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-cream-faint">Actions</p>
        {row.events.length ? (
          <ul className="space-y-1.5 text-sm">
            {row.events.map((event, index) => (
              <li key={`${event.kind}-${index}`} className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
                <span className="w-16 shrink-0 tabular-nums text-xs text-cream-faint">{event.at ? time.format(new Date(event.at)) : ''}</span>
                <span className="font-medium text-cream">{event.label}</span>
                {event.target && <span className="min-w-0 break-all text-cream-muted">{event.target}</span>}
                <span className="min-w-0 break-all text-xs text-cream-faint">sur {event.page}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-cream-muted">Aucune action.</p>
        )}
        <dl className="mt-4 grid grid-cols-[auto_1fr] gap-x-3 gap-y-1 text-xs">
          <dt className="text-cream-faint">Région</dt>
          <dd className="text-cream-muted">{row.region || '—'}</dd>
          <dt className="text-cream-faint">Campagne</dt>
          <dd className="break-all text-cream-muted">{row.campaign || '—'}</dd>
        </dl>
      </div>
    </div>
  );
}

export function RecentVisits({
  data,
  filter,
  hrefFor,
}: {
  data: RecentVisitsData;
  filter: VisitFilter;
  hrefFor: (params: { vf?: VisitFilter; vp?: number }) => string;
}) {
  const { rows, total, page, pages, pageSize } = data;
  const first = total ? (page - 1) * pageSize + 1 : 0;
  const last = Math.min(total, page * pageSize);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <nav aria-label="Filtrer les visites" className="flex flex-wrap gap-2">
          {(Object.keys(VISIT_FILTERS) as VisitFilter[]).map((key) => (
            <PillLink key={key} href={hrefFor({ vf: key, vp: 1 })} active={filter === key}>
              {VISIT_FILTERS[key]}
            </PillLink>
          ))}
        </nav>
        <p className="text-sm text-cream-muted">
          {total ? `${fmtNumber(first)}–${fmtNumber(last)} sur ${fmtNumber(total)} visites` : 'Aucune visite'}
        </p>
      </div>

      {rows.length === 0 ? (
        <p className="rounded-2xl border border-white/8 bg-white/3 p-4 text-sm text-cream-muted">
          Aucune visite à afficher pour ce filtre et cette période.
        </p>
      ) : (
        <div className="space-y-2">
          <div className="hidden grid-cols-[110px_130px_minmax(0,1.1fr)_minmax(0,1fr)_90px_minmax(0,1.2fr)_60px_80px_minmax(0,1.3fr)_20px] gap-3 px-4 text-[11px] font-semibold uppercase tracking-[0.14em] text-cream-faint 2xl:grid">
            <span>Date</span>
            <span>IP</span>
            <span>Lieu</span>
            <span>Source</span>
            <span>Appareil</span>
            <span>Entrée</span>
            <span className="text-right">Pages</span>
            <span className="text-right">Durée</span>
            <span>Actions</span>
            <span />
          </div>
          {rows.map((row) => (
            <details key={row.id} className="group rounded-2xl border border-white/8 bg-white/[0.025] open:border-gold/25">
              <summary className="grid cursor-pointer list-none grid-cols-2 gap-x-3 gap-y-1.5 px-4 py-3 text-sm transition-colors hover:bg-white/[0.03] sm:grid-cols-4 2xl:grid-cols-[110px_130px_minmax(0,1.1fr)_minmax(0,1fr)_90px_minmax(0,1.2fr)_60px_80px_minmax(0,1.3fr)_20px] 2xl:items-center [&::-webkit-details-marker]:hidden">
                <span className="tabular-nums text-cream">{dateTime.format(new Date(row.at))}</span>
                <span className="truncate font-mono text-xs text-cream-muted" title={row.ip}>{row.ip}</span>
                <span className="truncate text-cream" title={row.place}>{row.place}</span>
                <span className="truncate text-cream" title={row.campaign ? `${row.source} · ${row.campaign}` : row.source}>{row.source}</span>
                <span className="text-cream-muted">{row.device}</span>
                <span className="truncate text-cream-muted" title={row.entry}>{row.entry}</span>
                <span className="tabular-nums text-cream-muted 2xl:text-right">
                  <span className="2xl:hidden">Pages : </span>{row.pageviews}
                </span>
                <span className="tabular-nums text-cream-muted 2xl:text-right">{formatDuration(row.duration)}</span>
                <span className="col-span-2 sm:col-span-4 2xl:col-span-1"><Actions row={row} /></span>
                <ChevronDown className="hidden h-4 w-4 text-cream-faint transition-transform group-open:rotate-180 2xl:block" aria-hidden />
              </summary>
              <VisitDetail row={row} />
            </details>
          ))}
        </div>
      )}

      {pages > 1 && (
        <nav aria-label="Pages de la liste des visites" className="flex items-center justify-between gap-3 pt-1 text-sm">
          {page > 1 ? (
            <Link href={hrefFor({ vf: filter, vp: page - 1 })} prefetch={false} scroll={false} className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-cream-muted hover:border-gold/20 hover:text-cream">
              ← Précédentes
            </Link>
          ) : (
            <span />
          )}
          <span className="text-cream-muted">
            Page {page} sur {pages}
          </span>
          {page < pages ? (
            <Link href={hrefFor({ vf: filter, vp: page + 1 })} prefetch={false} scroll={false} className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-cream-muted hover:border-gold/20 hover:text-cream">
              Suivantes →
            </Link>
          ) : (
            <span />
          )}
        </nav>
      )}
    </div>
  );
}
