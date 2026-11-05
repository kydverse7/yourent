'use client';

import { useState } from 'react';
import { addDays, differenceInDays, format } from 'date-fns';
import { ArrowRight, CalendarDays } from 'lucide-react';
import toast from 'react-hot-toast';
import { MIN_RESERVATION_DAYS } from '@/lib/constants';
import { useLocale } from '@/lib/i18n';
import { useToday } from '../../_lib/useToday';

const toIsoDay = (date: Date) => format(date, 'yyyy-MM-dd');

const inputClass =
  'h-11 w-full rounded-xl border border-white/10 bg-white/5 ps-10 pe-3 text-base font-semibold text-cream sm:text-sm outline-none transition-all focus:border-gold/40 focus:shadow-[0_0_0_3px_rgba(201,168,76,0.12)] cursor-pointer';
const labelClass = 'mb-1 block text-[0.58rem] font-bold uppercase tracking-[0.16em] text-cream-muted';

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

  const today = useToday();
  const minAu = du ? toIsoDay(addDays(new Date(du), MIN_RESERVATION_DAYS)) : today;

  const handleDu = (value: string) => {
    setDu(value);
    if (value && (!au || differenceInDays(new Date(au), new Date(value)) < MIN_RESERVATION_DAYS)) {
      setAu(toIsoDay(addDays(new Date(value), MIN_RESERVATION_DAYS)));
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!du || !au || differenceInDays(new Date(au), new Date(du)) < MIN_RESERVATION_DAYS) {
      toast.error(t('cat.datesErr').replace('{count}', String(MIN_RESERVATION_DAYS)));
      return;
    }
    // Vraie navigation : le routeur client resservirait la fiche en cache, voir CatalogueView.
    window.location.assign(lp(`/catalogue/${modelSlug}?du=${du}&au=${au}`));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <p className="text-sm font-semibold text-cream">{t('model.otherDates')}</p>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <label className="block min-w-0">
          <span className={labelClass}>{t('cat.datesStart')}</span>
          <span className="relative block">
            <CalendarDays className="pointer-events-none absolute start-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gold" />
            <input
              type="date"
              value={du}
              min={today}
              onChange={(event) => handleDu(event.target.value)}
              required
              className={inputClass}
              style={{ colorScheme: 'dark' }}
            />
          </span>
        </label>
        <label className="block min-w-0">
          <span className={labelClass}>{t('cat.datesEnd')}</span>
          <span className="relative block">
            <CalendarDays className="pointer-events-none absolute start-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gold" />
            <input
              type="date"
              value={au}
              min={minAu}
              onChange={(event) => setAu(event.target.value)}
              required
              className={inputClass}
              style={{ colorScheme: 'dark' }}
            />
          </span>
        </label>
      </div>
      <button
        type="submit"
        className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-gold/30 bg-gold/10 px-5 text-sm font-semibold text-gold transition-colors hover:bg-gold/20"
      >
        {t('model.checkDates')} <ArrowRight className="h-4 w-4 rtl:rotate-180" />
      </button>
    </form>
  );
}
