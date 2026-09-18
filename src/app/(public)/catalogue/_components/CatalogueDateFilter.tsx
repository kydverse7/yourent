'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { addDays, differenceInDays, format } from 'date-fns';
import { fr, enGB, arSA } from 'date-fns/locale';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, CalendarDays, Pencil, X } from 'lucide-react';
import toast from 'react-hot-toast';
import { useLocale } from '@/lib/i18n';
import { MIN_RESERVATION_DAYS } from '@/lib/constants';

const DATE_LOCALES = { fr, en: enGB, ar: arSA } as const;

function toIsoDay(date: Date): string {
  return format(date, 'yyyy-MM-dd');
}

function buildDatesUrl(
  params: Record<string, string>,
  dates: { du?: string; au?: string } | null,
): string {
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

const dateInputBase =
  'h-11 w-full rounded-xl border border-white/10 bg-white/5 pl-10 pr-3 text-sm font-semibold text-cream outline-none transition-all focus:border-gold/40 focus:shadow-[0_0_0_3px_rgba(201,168,76,0.12)] cursor-pointer';

/* ─── Sticky catalogue date filter ──────────────────── */
export function CatalogueDateFilter({
  params,
  du,
  au,
}: {
  params: Record<string, string>;
  du?: string;
  au?: string;
}) {
  const router = useRouter();
  const { t, locale } = useLocale();
  const [editing, setEditing] = useState(false);
  const [draftDu, setDraftDu] = useState(du ?? '');
  const [draftAu, setDraftAu] = useState(au ?? '');

  const dateLocale = DATE_LOCALES[locale] ?? fr;
  const today = toIsoDay(new Date());
  const active = Boolean(du && au);

  const days = draftDu && draftAu
    ? differenceInDays(new Date(draftAu), new Date(draftDu))
    : 0;
  const minAu = draftDu
    ? toIsoDay(addDays(new Date(draftDu), MIN_RESERVATION_DAYS))
    : today;

  const handleDraftDu = (value: string) => {
    setDraftDu(value);
    if (value) {
      const start = new Date(value);
      if (!draftAu || differenceInDays(new Date(draftAu), start) < MIN_RESERVATION_DAYS) {
        setDraftAu(toIsoDay(addDays(start, MIN_RESERVATION_DAYS)));
      }
    }
  };

  const apply = () => {
    if (!draftDu || !draftAu || days < MIN_RESERVATION_DAYS) {
      toast.error(t('cat.datesErr').replace('{count}', String(MIN_RESERVATION_DAYS)));
      return;
    }
    router.push(buildDatesUrl(params, { du: draftDu, au: draftAu }));
  };

  return (
    <div className="lux-filter-bar">
      <AnimatePresence mode="wait" initial={false}>
        {editing ? (
          <motion.div
            key="editor"
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2 }}
            className="flex w-full flex-col gap-2 rounded-2xl border border-gold/20 bg-gold/[0.06] p-3 sm:flex-row sm:items-end"
          >
            <label className="min-w-0 flex-1">
              <span className="mb-1 block text-[0.58rem] font-bold uppercase tracking-[0.16em] text-cream-muted">
                {t('cat.datesStart')}
              </span>
              <span className="relative block">
                <CalendarDays className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gold" />
                <input
                  type="date"
                  value={draftDu}
                  min={today}
                  onChange={(e) => handleDraftDu(e.target.value)}
                  className={dateInputBase}
                  style={{ colorScheme: 'dark' }}
                  aria-label={t('cat.datesStart')}
                />
              </span>
            </label>
            <label className="min-w-0 flex-1">
              <span className="mb-1 block text-[0.58rem] font-bold uppercase tracking-[0.16em] text-cream-muted">
                {t('cat.datesEnd')}
              </span>
              <span className="relative block">
                <CalendarDays className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gold" />
                <input
                  type="date"
                  value={draftAu}
                  min={minAu}
                  onChange={(e) => setDraftAu(e.target.value)}
                  className={dateInputBase}
                  style={{ colorScheme: 'dark' }}
                  aria-label={t('cat.datesEnd')}
                />
              </span>
            </label>
            <div className="flex items-center gap-2">
              {days >= MIN_RESERVATION_DAYS && (
                <span className="hidden h-11 items-center whitespace-nowrap rounded-xl border border-gold/20 bg-gold/10 px-3 text-xs font-bold text-gold md:inline-flex">
                  {t('cat.datesDays').replace(/\{s\}/g, days > 1 ? 's' : '').replace('{count}', String(days))}
                </span>
              )}
              <button
                type="button"
                onClick={apply}
                className="inline-flex h-11 items-center gap-2 whitespace-nowrap rounded-xl bg-gold px-5 text-xs font-extrabold uppercase tracking-[0.14em] text-noir-root transition-transform hover:-translate-y-0.5"
              >
                {t('cat.datesApply')} <ArrowRight className="h-3.5 w-3.5" />
              </button>
              <button
                type="button"
                onClick={() => {
                  setDraftDu(du ?? '');
                  setDraftAu(au ?? '');
                  setEditing(false);
                }}
                className="inline-flex h-11 items-center rounded-xl border border-white/10 bg-white/5 px-4 text-xs font-semibold uppercase tracking-[0.12em] text-cream-muted transition-colors hover:text-cream"
              >
                {t('cat.datesCancel')}
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key={active ? 'active' : 'idle'}
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2 }}
            className="flex flex-wrap items-center gap-2"
          >
            {active ? (
              <>
                <span className="inline-flex items-center gap-2 rounded-full border border-gold/25 bg-gold/10 px-4 py-2 text-xs font-bold text-gold">
                  <span className="h-1.5 w-1.5 rounded-full bg-gold shadow-[0_0_8px_rgba(201,168,76,0.8)] animate-pulse" aria-hidden="true" />
                  {format(new Date(du!), 'd MMM', { locale: dateLocale })}
                  <ArrowRight className="h-3 w-3" />
                  {format(new Date(au!), 'd MMM', { locale: dateLocale })}
                </span>
                <button
                  type="button"
                  onClick={() => {
                    setDraftDu(du ?? '');
                    setDraftAu(au ?? '');
                    setEditing(true);
                  }}
                  className="inline-flex items-center gap-1.5 rounded-full border border-white/8 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-cream-muted transition-colors hover:border-gold/20 hover:text-gold"
                >
                  <Pencil className="h-3 w-3" /> {t('cat.datesEdit')}
                </button>
                <Link
                  href={buildDatesUrl(params, null)}
                  title={t('cat.datesClear')}
                  className="inline-flex h-[34px] w-[34px] items-center justify-center rounded-full border border-white/8 bg-white/5 text-cream-muted transition-colors hover:border-rose-400/30 hover:text-rose-300"
                >
                  <X className="h-3.5 w-3.5" />
                </Link>
              </>
            ) : (
              <button
                type="button"
                onClick={() => {
                  setDraftDu('');
                  setDraftAu('');
                  setEditing(true);
                }}
                className="inline-flex items-center gap-2 rounded-full border border-gold/20 bg-gold/[0.06] px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-gold transition-colors hover:border-gold/40 hover:bg-gold/10"
              >
                <CalendarDays className="h-3.5 w-3.5" /> {t('cat.datesAdd')}
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
