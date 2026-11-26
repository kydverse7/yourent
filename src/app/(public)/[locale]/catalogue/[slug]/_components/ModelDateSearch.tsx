'use client';

import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { MIN_RESERVATION_DAYS } from '@/lib/constants';
import { useLocale } from '@/lib/i18n';
import { useToday } from '../../_lib/useToday';

const DAY_MS = 86_400_000;
const addDaysIso = (iso: string, days: number) =>
  new Date(Date.parse(`${iso}T00:00:00Z`) + days * DAY_MS).toISOString().slice(0, 10);
const daysBetween = (from: string, to: string) =>
  Math.round((Date.parse(`${to}T00:00:00Z`) - Date.parse(`${from}T00:00:00Z`)) / DAY_MS);

const inputClass =
  'field relative px-3 font-semibold [color-scheme:dark] cursor-pointer max-sm:[&::-webkit-calendar-picker-indicator]:absolute max-sm:[&::-webkit-calendar-picker-indicator]:inset-0 max-sm:[&::-webkit-calendar-picker-indicator]:h-full max-sm:[&::-webkit-calendar-picker-indicator]:w-full max-sm:[&::-webkit-calendar-picker-indicator]:opacity-0';
const labelClass = 'mb-1.5 block text-sm font-medium text-cream-muted';

/** Recherche d'autres dates sur la fiche d'un modèle sans unité libre. */
export function ModelDateSearch({
  modelSlug,
  initialDu,
  initialAu,
}: {
  modelSlug: string;
  initialDu?: string;
  initialAu?: string;
}) {
  const { t, lp } = useLocale();
  const [du, setDu] = useState(initialDu ?? '');
  const [au, setAu] = useState(initialAu ?? '');
  const [error, setError] = useState('');

  const today = useToday();
  const minAu = du ? addDaysIso(du, MIN_RESERVATION_DAYS) : today;

  const handleDu = (value: string) => {
    setDu(value);
    setError('');
    if (value && (!au || daysBetween(value, au) < MIN_RESERVATION_DAYS)) {
      setAu(addDaysIso(value, MIN_RESERVATION_DAYS));
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!du || !au || daysBetween(du, au) < MIN_RESERVATION_DAYS) {
      setError(t('cat.datesErr').replace('{count}', String(MIN_RESERVATION_DAYS)));
      return;
    }
    // Vraie navigation : le routeur client resservirait la fiche en cache, voir CatalogueView.
    window.location.assign(lp(`/catalogue/${modelSlug}?du=${du}&au=${au}`));
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-3">
      <p className="text-[0.9375rem] font-semibold text-cream">{t('model.otherDates')}</p>
      <div className="grid grid-cols-2 gap-3">
        <label className="block min-w-0">
          <span className={labelClass}>{t('cat.datesStart')}</span>
          <input type="date" value={du} min={today} onChange={(event) => handleDu(event.target.value)} required className={inputClass} />
        </label>
        <label className="block min-w-0">
          <span className={labelClass}>{t('cat.datesEnd')}</span>
          <input
            type="date"
            value={au}
            min={minAu}
            onChange={(event) => {
              setAu(event.target.value);
              setError('');
            }}
            required
            className={inputClass}
          />
        </label>
      </div>
      <p role="alert" className={`text-sm text-rose-300 ${error ? '' : 'sr-only'}`}>
        {error}
      </p>
      <button type="submit" className="btn btn-secondary btn-block">
        {t('model.checkDates')} <ArrowRight className="h-5 w-5 rtl:-scale-x-100" aria-hidden="true" />
      </button>
    </form>
  );
}
