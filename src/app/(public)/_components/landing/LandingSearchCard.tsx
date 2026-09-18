'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { addDays, differenceInDays, format } from 'date-fns';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, CalendarDays, MoveRight } from 'lucide-react';
import toast from 'react-hot-toast';
import { useLocale } from '@/lib/i18n';
import { MIN_RESERVATION_DAYS } from '@/lib/constants';

function toIsoDay(date: Date): string {
  return format(date, 'yyyy-MM-dd');
}

function FieldLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="mb-1.5 block text-[0.58rem] font-bold uppercase tracking-[0.18em] text-[#8d7f68]">
      {children}
    </span>
  );
}

const dateInputBase =
  'h-12 w-full rounded-xl border border-white/[0.09] bg-black/[0.32] pl-10 pr-3 text-sm font-semibold text-[#f7f1e8] outline-none transition-all duration-200 hover:border-[rgba(201,168,76,0.28)] focus:border-[rgba(201,168,76,0.55)] focus:bg-black/[0.45] focus:shadow-[0_0_0_3px_rgba(201,168,76,0.14)] cursor-pointer';

/* ─── Hero search card — availability by dates ──────── */
export function LandingSearchCard() {
  const router = useRouter();
  const { t } = useLocale();

  const today = toIsoDay(new Date());
  const [du, setDu] = useState('');
  const [au, setAu] = useState('');

  const days = du && au ? differenceInDays(new Date(au), new Date(du)) : 0;
  const minAu = du
    ? toIsoDay(addDays(new Date(du), MIN_RESERVATION_DAYS))
    : today;
  const isValid = days >= MIN_RESERVATION_DAYS;

  const handleDuChange = (value: string) => {
    setDu(value);
    if (value) {
      const start = new Date(value);
      // Ajuste automatiquement le retour pour respecter la durée minimum.
      if (!au || differenceInDays(new Date(au), start) < MIN_RESERVATION_DAYS) {
        setAu(toIsoDay(addDays(start, MIN_RESERVATION_DAYS)));
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!du || !au) {
      toast.error(t('hero.searchErrDates'));
      return;
    }
    if (!isValid) {
      toast.error(
        t('hero.searchErrRange').replace('{count}', String(MIN_RESERVATION_DAYS)),
      );
      return;
    }
    router.push(`/catalogue?du=${du}&au=${au}`);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="relative w-full max-w-2xl"
      aria-label={t('hero.searchLive')}
    >
      {/* ── glass card shell ── */}
      <div
        className="relative overflow-hidden rounded-[22px] border border-[rgba(201,168,76,0.14)] px-4 py-4 sm:px-6"
        style={{
          background:
            'linear-gradient(180deg, rgba(20,17,11,0.86) 0%, rgba(11,10,8,0.92) 100%)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          boxShadow:
            '0 34px 90px rgba(0,0,0,0.6), 0 0 44px rgba(201,168,76,0.07), inset 0 1px 0 rgba(201,168,76,0.1)',
        }}
      >
        {/* top hairline highlight */}
        <div
          className="pointer-events-none absolute inset-x-8 top-0 h-px"
          style={{
            background:
              'linear-gradient(90deg, transparent, rgba(201,168,76,0.34), transparent)',
          }}
          aria-hidden="true"
        />
        {/* gold corner brackets */}
        <div className="pointer-events-none absolute left-2.5 top-2.5 h-5 w-5 rounded-tl-md border-l border-t border-[rgba(201,168,76,0.3)]" aria-hidden="true" />
        <div className="pointer-events-none absolute bottom-2.5 right-2.5 h-5 w-5 rounded-br-md border-b border-r border-[rgba(201,168,76,0.3)]" aria-hidden="true" />

        {/* ── header row : live label + day counter ── */}
        <div className="mb-3 flex items-center justify-between gap-3">
          <span className="flex min-w-0 items-center gap-2 text-[0.6rem] font-extrabold uppercase tracking-[0.2em] text-[#c9a84c]">
            <span
              className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#c9a84c] shadow-[0_0_10px_rgba(201,168,76,0.8)] animate-pulse"
              aria-hidden="true"
            />
            <span className="truncate">{t('hero.searchLive')}</span>
          </span>

          <AnimatePresence mode="popLayout" initial={false}>
            {days >= MIN_RESERVATION_DAYS ? (
              <motion.span
                key={days}
                initial={{ opacity: 0, scale: 0.7, y: -4 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.7, y: 4 }}
                transition={{ duration: 0.25, ease: [0.34, 1.56, 0.64, 1] }}
                className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-[rgba(201,168,76,0.22)] bg-[rgba(201,168,76,0.08)] px-3 py-1 text-[0.62rem] font-bold uppercase tracking-[0.14em] text-[#e8c97a]"
              >
                {t('hero.searchDays')
                  .replace('{count}', String(days))
                  .replace(/\{s\}/g, days > 1 ? 's' : '')}
              </motion.span>
            ) : (
              <motion.span
                key="hint"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="shrink-0 text-[0.62rem] font-semibold uppercase tracking-[0.12em] text-[#756858]"
              >
                {t('hero.searchMinHint').replace('{count}', String(MIN_RESERVATION_DAYS))}
              </motion.span>
            )}
          </AnimatePresence>
        </div>

        {/* ── fields + CTA ── */}
        <div className="grid grid-cols-2 items-end gap-x-3 gap-y-3 sm:grid-cols-[1fr_auto_1fr_auto]">
          <label className="block min-w-0">
            <FieldLabel>{t('hero.searchDepart')}</FieldLabel>
            <span className="relative block">
              <CalendarDays className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#c9a84c]" />
              <input
                type="date"
                value={du}
                min={today}
                onChange={(e) => handleDuChange(e.target.value)}
                className={dateInputBase}
                style={{ colorScheme: 'dark' }}
                aria-label={t('hero.searchDepart')}
              />
            </span>
          </label>

          {/* gold connector */}
          <span className="hidden h-12 items-center justify-center text-[#c9a84c]/70 sm:flex" aria-hidden="true">
            <motion.span
              animate={{ x: [0, 4, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
              className="flex items-center"
            >
              <MoveRight className="h-4 w-4" />
            </motion.span>
          </span>

          <label className="block min-w-0">
            <FieldLabel>{t('hero.searchRetour')}</FieldLabel>
            <span className="relative block">
              <CalendarDays className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#c9a84c]" />
              <input
                type="date"
                value={au}
                min={minAu}
                onChange={(e) => setAu(e.target.value)}
                className={dateInputBase}
                style={{ colorScheme: 'dark' }}
                aria-label={t('hero.searchRetour')}
              />
            </span>
          </label>

          <button
            type="submit"
            className="group col-span-2 inline-flex h-12 items-center justify-center gap-2 whitespace-nowrap rounded-xl border border-[#f3d98a] bg-gradient-to-br from-[#f6e29b] via-[#d8b24f] to-[#b98724] px-6 text-[0.7rem] font-extrabold uppercase tracking-[0.16em] text-[#120f09] shadow-[0_16px_40px_rgba(201,168,76,0.3)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_20px_48px_rgba(201,168,76,0.42)] active:translate-y-0 sm:col-span-1"
          >
            {t('hero.searchCta')}
            <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1" />
          </button>
        </div>
      </div>
    </form>
  );
}
