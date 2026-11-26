'use client';

import { useState, type ReactNode } from 'react';
import { ArrowRight, CalendarDays, Pencil, X } from 'lucide-react';
import { useLocale } from '@/lib/i18n';
import { MIN_RESERVATION_DAYS } from '@/lib/constants';
import { useToday } from '../_lib/useToday';

const DAY_MS = 86_400_000;
const addDaysIso = (iso: string, days: number) =>
  new Date(Date.parse(`${iso}T00:00:00Z`) + days * DAY_MS).toISOString().slice(0, 10);
const daysBetween = (from: string, to: string) =>
  Math.round((Date.parse(`${to}T00:00:00Z`) - Date.parse(`${from}T00:00:00Z`)) / DAY_MS);

function buildDatesUrl(params: Record<string, string>, dates: { du?: string; au?: string } | null): string {
  const qs = new URLSearchParams();
  for (const [k, v] of Object.entries(params)) {
    if (k !== 'du' && k !== 'au' && v) qs.set(k, v);
  }
  if (dates?.du && dates?.au) {
    qs.set('du', dates.du);
    qs.set('au', dates.au);
  }
  const s = qs.toString();
  return `/catalogue${s ? `?${s}` : ''}`;
}

const chip =
  'inline-flex min-h-11 shrink-0 items-center gap-2 whitespace-nowrap rounded-full border px-4 text-[0.9375rem] font-semibold transition-colors';

/**
 * Ligne de filtres du catalogue : dates (îlot client) puis marques (liens rendus par le serveur, passés en enfants).
 * Une seule ligne défilante en mobile ; l'éditeur de dates s'ouvre sous la ligne.
 */
export function CatalogueDateFilter({
  params,
  du,
  au,
  children,
}: {
  params: Record<string, string>;
  du?: string;
  au?: string;
  children?: ReactNode;
}) {
  const { t, locale, lp } = useLocale();
  const today = useToday();
  const [editing, setEditing] = useState(false);
  const [draftDu, setDraftDu] = useState(du ?? '');
  const [draftAu, setDraftAu] = useState(au ?? '');
  const [error, setError] = useState('');
  const active = Boolean(du && au);

  const days = draftDu && draftAu ? daysBetween(draftDu, draftAu) : 0;
  const minAu = draftDu ? addDaysIso(draftDu, MIN_RESERVATION_DAYS) : today;
  const short = new Intl.DateTimeFormat(locale === 'ar' ? 'ar-MA' : locale, { day: 'numeric', month: 'short', timeZone: 'UTC' });
  const label = (iso: string) => short.format(new Date(`${iso}T00:00:00Z`));

  const handleDraftDu = (value: string) => {
    setDraftDu(value);
    setError('');
    if (value && (!draftAu || daysBetween(value, draftAu) < MIN_RESERVATION_DAYS)) {
      setDraftAu(addDaysIso(value, MIN_RESERVATION_DAYS));
    }
  };

  const apply = () => {
    if (!draftDu || !draftAu || days < MIN_RESERVATION_DAYS) {
      setError(t('cat.datesErr').replace('{count}', String(MIN_RESERVATION_DAYS)));
      return;
    }
    // Vraie navigation : le routeur client resservirait la page en cache de /catalogue, voir CatalogueView.
    window.location.assign(lp(buildDatesUrl(params, { du: draftDu, au: draftAu })));
  };

  const field =
    'field relative ps-10 pe-2 font-semibold [color-scheme:dark] cursor-pointer max-sm:[&::-webkit-calendar-picker-indicator]:absolute max-sm:[&::-webkit-calendar-picker-indicator]:inset-0 max-sm:[&::-webkit-calendar-picker-indicator]:h-full max-sm:[&::-webkit-calendar-picker-indicator]:w-full max-sm:[&::-webkit-calendar-picker-indicator]:opacity-0';

  return (
    <div>
      <div className="-mx-4 flex items-center gap-2 overflow-x-auto px-4 [scrollbar-width:none] md:mx-0 md:flex-wrap md:overflow-visible md:px-0 [&::-webkit-scrollbar]:hidden">
        {active ? (
          <>
            <button
              type="button"
              onClick={() => setEditing((value) => !value)}
              aria-expanded={editing}
              className={`${chip} border-gold/50 bg-gold/10 text-gold-light`}
            >
              <CalendarDays className="h-4 w-4" aria-hidden="true" />
              <bdi suppressHydrationWarning>{label(du!)}</bdi>
              <ArrowRight className="h-3.5 w-3.5 rtl:-scale-x-100" aria-hidden="true" />
              <bdi suppressHydrationWarning>{label(au!)}</bdi>
              <Pencil className="h-3.5 w-3.5" aria-hidden="true" />
              <span className="sr-only">{t('cat.datesEdit')}</span>
            </button>
            <a
              href={lp(buildDatesUrl(params, null))}
              aria-label={t('cat.datesClear')}
              className={`${chip} w-11 justify-center border-white/10 px-0 text-cream-muted hover:text-cream`}
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </a>
          </>
        ) : (
          <button
            type="button"
            onClick={() => setEditing((value) => !value)}
            aria-expanded={editing}
            className={`${chip} border-gold/50 text-gold-light hover:bg-gold/10`}
          >
            <CalendarDays className="h-4 w-4" aria-hidden="true" />
            {t('cat.datesAdd')}
          </button>
        )}
        {children}
      </div>

      {editing && (
        <div className="card mt-2 grid grid-cols-2 gap-3 p-3 sm:grid-cols-[1fr_1fr_auto_auto] sm:items-end">
          <label className="block min-w-0">
            <span className="mb-1 block text-sm font-medium text-cream-muted">{t('cat.datesStart')}</span>
            <span className="relative block">
              <CalendarDays className="pointer-events-none absolute start-3 top-1/2 z-10 h-4 w-4 -translate-y-1/2 text-gold" aria-hidden="true" />
              <input type="date" value={draftDu} min={today} onChange={(e) => handleDraftDu(e.target.value)} className={field} />
            </span>
          </label>
          <label className="block min-w-0">
            <span className="mb-1 block text-sm font-medium text-cream-muted">{t('cat.datesEnd')}</span>
            <span className="relative block">
              <CalendarDays className="pointer-events-none absolute start-3 top-1/2 z-10 h-4 w-4 -translate-y-1/2 text-gold" aria-hidden="true" />
              <input
                type="date"
                value={draftAu}
                min={minAu}
                onChange={(e) => {
                  setDraftAu(e.target.value);
                  setError('');
                }}
                className={field}
              />
            </span>
          </label>
          <button type="button" onClick={apply} className="btn btn-primary">
            {t('cat.datesApply')}
          </button>
          <button
            type="button"
            onClick={() => {
              setDraftDu(du ?? '');
              setDraftAu(au ?? '');
              setError('');
              setEditing(false);
            }}
            className="btn btn-secondary"
          >
            {t('cat.datesCancel')}
          </button>
          <p role="alert" className={`col-span-2 text-sm text-rose-300 sm:col-span-4 ${error ? '' : 'sr-only'}`}>
            {error}
          </p>
        </div>
      )}
    </div>
  );
}
