'use client';

import { useState } from 'react';
import { ArrowRight, CalendarDays } from 'lucide-react';
import { useLocale } from '@/lib/i18n';
import { MIN_RESERVATION_DAYS } from '@/lib/constants';
import { useToday } from '../../catalogue/_lib/useToday';

const DAY_MS = 86_400_000;

/** « AAAA-MM-JJ » + n jours, en UTC : pas de décalage d'heure d'été. */
function addDaysIso(iso: string, days: number): string {
  return new Date(Date.parse(`${iso}T00:00:00Z`) + days * DAY_MS).toISOString().slice(0, 10);
}

function daysBetween(from: string, to: string): number {
  return Math.round((Date.parse(`${to}T00:00:00Z`) - Date.parse(`${from}T00:00:00Z`)) / DAY_MS);
}

/** Recherche par dates de l'accueil : mène au catalogue filtré (vraie navigation, voir CatalogueView). */
export function HomeSearchCard() {
  const { t, lp } = useLocale();
  const today = useToday();
  const [du, setDu] = useState('');
  const [au, setAu] = useState('');
  const [error, setError] = useState('');

  const days = du && au ? daysBetween(du, au) : 0;
  const minAu = du ? addDaysIso(du, MIN_RESERVATION_DAYS) : today;

  const handleDu = (value: string) => {
    setDu(value);
    setError('');
    // Le retour suit le départ pour respecter la durée minimum.
    if (value && (!au || daysBetween(value, au) < MIN_RESERVATION_DAYS)) {
      setAu(addDaysIso(value, MIN_RESERVATION_DAYS));
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!du || !au) {
      setError(t('hero.searchErrDates'));
      return;
    }
    if (days < MIN_RESERVATION_DAYS) {
      setError(t('hero.searchErrRange').replace('{count}', String(MIN_RESERVATION_DAYS)));
      return;
    }
    window.location.assign(lp(`/catalogue?du=${du}&au=${au}`));
  };

  /* En mobile, l'icône native du calendrier devient invisible et couvre le champ : la date tient en entier. */
  const field =
    'field relative ps-10 pe-2 text-base font-semibold [color-scheme:dark] cursor-pointer max-sm:[&::-webkit-calendar-picker-indicator]:absolute max-sm:[&::-webkit-calendar-picker-indicator]:inset-0 max-sm:[&::-webkit-calendar-picker-indicator]:h-full max-sm:[&::-webkit-calendar-picker-indicator]:w-full max-sm:[&::-webkit-calendar-picker-indicator]:opacity-0';

  return (
    <form onSubmit={handleSubmit} noValidate aria-label={t('home.searchTitle')} className="card p-4 sm:p-5">
      <div className="mb-3 flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
        <p className="text-base font-bold text-cream">{t('home.searchTitle')}</p>
        <p className="text-sm text-cream-muted" aria-live="polite">
          {days >= MIN_RESERVATION_DAYS
            ? t('hero.searchDays').replace('{count}', String(days)).replace(/\{s\}/g, days > 1 ? 's' : '')
            : t('hero.searchMinHint').replace('{count}', String(MIN_RESERVATION_DAYS))}
        </p>
      </div>
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-[1fr_1fr_auto] lg:items-end">
        <label className="block min-w-0">
          <span className="mb-1.5 block text-sm font-medium text-cream-muted">{t('hero.searchDepart')}</span>
          <span className="relative block">
            <CalendarDays className="pointer-events-none absolute start-3 top-1/2 z-10 h-4 w-4 -translate-y-1/2 text-gold" aria-hidden="true" />
            <input
              type="date"
              value={du}
              min={today}
              onChange={(event) => handleDu(event.target.value)}
              className={field}
              aria-invalid={error && !du ? true : undefined}
            />
          </span>
        </label>
        <label className="block min-w-0">
          <span className="mb-1.5 block text-sm font-medium text-cream-muted">{t('hero.searchRetour')}</span>
          <span className="relative block">
            <CalendarDays className="pointer-events-none absolute start-3 top-1/2 z-10 h-4 w-4 -translate-y-1/2 text-gold" aria-hidden="true" />
            <input
              type="date"
              value={au}
              min={minAu}
              onChange={(event) => {
                setAu(event.target.value);
                setError('');
              }}
              className={field}
              aria-invalid={error && !au ? true : undefined}
            />
          </span>
        </label>
        <button type="submit" className="btn btn-primary col-span-2 lg:col-span-1">
          {t('hero.searchCta')}
          <ArrowRight className="h-5 w-5 rtl:-scale-x-100" aria-hidden="true" />
        </button>
      </div>
      <p role="alert" className={`text-sm text-rose-300 ${error ? 'mt-3' : 'sr-only'}`}>
        {error}
      </p>
    </form>
  );
}
