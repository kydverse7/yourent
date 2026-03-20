'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, ArrowUpDown, Car, Fuel, Gauge, Search, Users } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';
import { useLocale } from '@/lib/i18n';

type SortOrder = 'price-asc' | 'price-desc' | 'name';

type GroupedVehicle = {
  modelSlug: string;
  marque: string;
  modele: string;
  count: number;
  countDispo: number;
  minTarif: number;
  categorie?: string;
  places?: number;
  carburant?: string;
  transmission?: string;
  featuredPhoto?: string | null;
};

type Props = {
  initialVehicles: GroupedVehicle[];
  initialPage: number;
  initialHasNext: boolean;
  total: number;
  type?: string;
  marque?: string;
  limit: number;
};

export function CatalogueInfiniteGrid({
  initialVehicles,
  initialPage,
  initialHasNext,
  total,
  type,
  marque,
  limit,
}: Props) {
  const { t, tp } = useLocale();
  const [vehicles, setVehicles] = useState(initialVehicles);
  const [page, setPage] = useState(initialPage);
  const [hasNext, setHasNext] = useState(initialHasNext);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  /* ── Search & sort (client-side) ── */
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState<SortOrder>('price-asc');

  useEffect(() => {
    setVehicles(initialVehicles);
    setPage(initialPage);
    setHasNext(initialHasNext);
    setIsLoading(false);
    setError(null);
  }, [initialHasNext, initialPage, initialVehicles]);

  /* Filtered + sorted vehicles */
  const displayVehicles = useMemo(() => {
    let result = vehicles;

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (v) => `${v.marque} ${v.modele}`.toLowerCase().includes(q),
      );
    }

    if (sortOrder === 'price-desc') {
      result = [...result].sort((a, b) => b.minTarif - a.minTarif);
    } else if (sortOrder === 'name') {
      result = [...result].sort((a, b) =>
        `${a.marque} ${a.modele}`.localeCompare(`${b.marque} ${b.modele}`),
      );
    }
    // price-asc is the default sort from the server

    return result;
  }, [vehicles, searchQuery, sortOrder]);

  const loadedCount = vehicles.length;

  const loadMore = useCallback(async () => {
    if (isLoading || !hasNext) return;
    setIsLoading(true);
    setError(null);

    try {
      const params = new URLSearchParams({
        page: String(page + 1),
        limit: String(limit),
        grouped: 'true',
      });
      if (type) params.set('type', type);
      if (marque) params.set('marque', marque);

      const response = await fetch(`/api/public/vehicules?${params.toString()}`, {
        cache: 'no-store',
      });
      if (!response.ok) throw new Error('Impossible de charger plus de modèles.');

      const payload = await response.json();
      const nextVehicles = Array.isArray(payload?.data) ? payload.data : [];
      const nextHasNext = Boolean(payload?.meta?.hasNext);
      const nextPage = Number(payload?.meta?.page ?? page + 1);

      setVehicles((current) => {
        const existingSlugs = new Set(current.map((item) => item.modelSlug));
        const unique = nextVehicles.filter(
          (item: GroupedVehicle) => !existingSlugs.has(item.modelSlug),
        );
        return [...current, ...unique];
      });
      setHasNext(nextHasNext);
      setPage(nextPage);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue.');
    } finally {
      setIsLoading(false);
    }
  }, [hasNext, isLoading, limit, page, type, marque]);

  useEffect(() => {
    const target = sentinelRef.current;
    if (!target || !hasNext) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) void loadMore();
      },
      { rootMargin: '240px 0px' },
    );
    observer.observe(target);
    return () => observer.disconnect();
  }, [hasNext, loadMore]);

  return (
    <>
      {/* ── Search bar + sort ── */}
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-cream-muted" />
          <input
            type="text"
            placeholder={t('cat.search')}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-xl border border-white/8 bg-white/5 py-2.5 pl-10 pr-4 text-sm text-cream placeholder:text-cream-muted/50 outline-none transition-all focus:border-gold/30 focus:ring-1 focus:ring-gold/20"
          />
        </div>
        <div className="relative">
          <ArrowUpDown className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-cream-muted" />
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value as SortOrder)}
            className="cursor-pointer appearance-none rounded-xl border border-white/8 bg-white/5 py-2.5 pl-9 pr-8 text-xs font-semibold uppercase tracking-[0.1em] text-cream-muted outline-none transition-all focus:border-gold/30 hover:text-cream"
          >
            <option value="price-asc">{t('cat.sortDefault')}</option>
            <option value="price-desc">{t('cat.sortDesc')}</option>
            <option value="name">{t('cat.sortName')}</option>
          </select>
        </div>
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {displayVehicles.map((v) => (
          <Link
            key={v.modelSlug}
            href={`/catalogue/${v.modelSlug}`}
            className="group lux-panel overflow-hidden"
          >
            <div className="relative h-56 bg-noir-root">
              {v.featuredPhoto ? (
                <Image
                  src={v.featuredPhoto}
                  alt={`${v.marque} ${v.modele} à louer à Casablanca`}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-5xl text-gold/20">
                  🚗
                </div>
              )}
              <div className="absolute left-4 top-4 flex items-center gap-2">
                <span className="rounded-full border border-gold/20 bg-black/35 px-3 py-1 text-[11px] uppercase tracking-[0.14em] text-gold capitalize">
                  {v.categorie}
                </span>
                {v.count > 1 && (
                  <span className="flex items-center gap-1 rounded-full border border-white/15 bg-black/50 px-2.5 py-1 text-[11px] font-semibold text-cream">
                    <Car className="h-3 w-3" /> {v.countDispo}/{v.count} {t('cat.dispo')}
                  </span>
                )}
              </div>
            </div>
            <div className="p-5">
              <h2 className="text-lg font-bold text-cream">
                {v.marque} {v.modele}
              </h2>

              <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-cream-muted">
                {v.places && (
                  <span className="flex items-center gap-1">
                    <Users className="h-3 w-3" /> {v.places} {t('cat.places')}
                  </span>
                )}
                {v.carburant && (
                  <span className="flex items-center gap-1">
                    <Fuel className="h-3 w-3" /> {v.carburant}
                  </span>
                )}
                {v.transmission && (
                  <span className="flex items-center gap-1">
                    <Gauge className="h-3 w-3" /> {v.transmission}
                  </span>
                )}
              </div>

              <div className="mt-5 flex items-center justify-between">
                <span className="text-xl font-bold text-gold">
                  {formatCurrency(v.minTarif)}
                  <span className="text-xs font-normal text-cream-muted">{t('cat.perDay')}</span>
                </span>
                <span className="inline-flex items-center gap-2 text-sm font-semibold text-cream transition-colors group-hover:text-gold">
                  {v.count > 1 ? t('cat.seeOptions') : t('cat.bookNow')}{' '}
                  <ArrowRight className="h-4 w-4" />
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-8 flex flex-col items-center gap-3">
        <p className="text-sm text-cream-muted">
          {loadedCount} / {total} {tp('cat.models', total)}
        </p>

        {error && (
          <div className="flex flex-col items-center gap-3 text-center">
            <p className="text-sm text-rose-300">{error}</p>
            <button
              type="button"
              onClick={() => void loadMore()}
              className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-cream transition-colors hover:border-gold/20 hover:text-gold"
            >
              {t('cat.retry')}
            </button>
          </div>
        )}

        {hasNext ? (
          <>
            <div ref={sentinelRef} className="h-2 w-full" aria-hidden="true" />
            <div className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-cream-muted">
              {isLoading ? t('cat.loading') : t('cat.scroll')}
            </div>
          </>
        ) : vehicles.length > 0 ? (
          <div className="rounded-full border border-gold/20 bg-gold/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-gold">
            {t('cat.end')}
          </div>
        ) : null}
      </div>
    </>
  );
}