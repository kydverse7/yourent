'use client';

import { useEffect, useState } from 'react';
import { ArrowUpDown, Search } from 'lucide-react';
import { useLocale } from '@/lib/i18n';

type SortOrder = 'price-asc' | 'price-desc' | 'name';

/**
 * Recherche et tri du catalogue. Les cartes sont rendues côté serveur : cet îlot ne fait que les masquer
 * (attribut hidden) et les réordonner (propriété CSS order) d'après data-name et data-price.
 */
export function CatalogueTools({ gridId }: { gridId: string }) {
  const { t } = useLocale();
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState<SortOrder>('price-asc');
  const [visible, setVisible] = useState<number | null>(null);

  useEffect(() => {
    const grid = document.getElementById(gridId);
    if (!grid) return;
    const items = [...grid.querySelectorAll<HTMLElement>('[data-name]')];
    const q = query.trim().toLowerCase();
    let shown = 0;
    for (const item of items) {
      const match = !q || (item.dataset.name ?? '').includes(q);
      item.hidden = !match;
      if (match) shown += 1;
    }
    // Prix croissant : l'ordre du serveur (modèles loués en dernier).
    const sorted =
      sort === 'price-asc'
        ? items
        : [...items].sort((a, b) =>
            sort === 'name'
              ? (a.dataset.name ?? '').localeCompare(b.dataset.name ?? '')
              : Number(b.dataset.price) - Number(a.dataset.price),
          );
    sorted.forEach((item, index) => {
      item.style.order = sort === 'price-asc' ? '' : String(index);
    });
    setVisible(q ? shown : null);
  }, [gridId, query, sort]);

  return (
    <div className="mb-5 flex items-center gap-2 sm:gap-3">
      <label className="relative min-w-0 flex-1 sm:max-w-md">
        <span className="sr-only">{t('cat.search')}</span>
        <Search className="pointer-events-none absolute start-3 top-1/2 h-4 w-4 -translate-y-1/2 text-cream-muted" aria-hidden="true" />
        <input
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder={t('cat.search')}
          className="field ps-10 pe-3"
        />
      </label>
      <label className="relative shrink-0">
        <span className="sr-only">{t('cat.sortDefault')}</span>
        <ArrowUpDown className="pointer-events-none absolute start-3 top-1/2 h-4 w-4 -translate-y-1/2 text-cream-muted" aria-hidden="true" />
        <select
          value={sort}
          onChange={(event) => setSort(event.target.value as SortOrder)}
          className="field w-auto cursor-pointer appearance-none ps-9 pe-3 text-[0.9375rem] font-semibold [&>option]:bg-noir-root"
        >
          <option value="price-asc">{t('cat.sortDefault')}</option>
          <option value="price-desc">{t('cat.sortDesc')}</option>
          <option value="name">{t('cat.sortName')}</option>
        </select>
      </label>
      <p className="sr-only" aria-live="polite">
        {visible !== null ? `${visible} ${t('cat.models').replace(/\{s\}/g, visible > 1 ? 's' : '')}` : ''}
      </p>
    </div>
  );
}
