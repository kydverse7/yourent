import Image from 'next/image';
import { ArrowUpRight, ChevronDown } from 'lucide-react';
import Link from '@/lib/i18n/LocaleLink';
import type { Locale } from '@/lib/i18n/translations';
import type { FleetModel } from '@/lib/seo/fleet';
import { getRoutePath, type SeoRouteKey } from '@/lib/seo/routes';
import { formatEurApprox } from '@/lib/site';
import type { Block, FaqItem, Section } from '@/content/types';
import { SEO_LABELS } from './seoLabels';

export type TextTokens = {
  minPrice: number;
  maxPrice: number;
  fleetMin: number;
  vehicleCount: number;
  modelCount: number;
  prices: Record<string, number>;
};

export function resolveTokens(text: string, tokens: TextTokens): string {
  return text
    .replace(/\{minPrice\}/g, String(tokens.minPrice))
    .replace(/\{maxPrice\}/g, String(tokens.maxPrice))
    .replace(/\{fleetMin\}/g, String(tokens.fleetMin))
    .replace(/\{vehicleCount\}/g, String(tokens.vehicleCount))
    .replace(/\{modelCount\}/g, String(tokens.modelCount))
    .replace(/\{price:([a-z0-9-]+)\}/g, (_, slug: string) => String(tokens.prices[slug] ?? ''));
}

/** Retire la mise en forme, pour les données structurées. */
export function plainText(text: string, tokens: TextTokens): string {
  return resolveTokens(text, tokens)
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/\*\*/g, '');
}

/** Affiche un texte avec ses liens [libellé](cible) et son gras **texte**. */
function RichText({ text, locale, tokens }: { text: string; locale: Locale; tokens: TextTokens }) {
  const resolved = resolveTokens(text, tokens);
  const parts = resolved.split(/(\[[^\]]+\]\([^)]+\)|\*\*[^*]+\*\*)/g);

  return (
    <>
      {parts.map((part, index) => {
        const link = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
        if (link) {
          const [, label, target] = link;
          const routePath = target.startsWith('route:')
            ? getRoutePath(target.slice(6) as SeoRouteKey, locale)
            : target;
          // Page absente dans cette langue : on garde le texte, sans lien cassé.
          if (!routePath) return <span key={index}>{label}</span>;
          if (/^https?:/.test(routePath)) {
            return (
              <a key={index} href={routePath} target="_blank" rel="noopener noreferrer" className="text-gold underline-offset-4 hover:underline">
                {label}
              </a>
            );
          }
          return (
            <Link key={index} href={routePath} className="text-gold underline-offset-4 hover:underline">
              {label}
            </Link>
          );
        }
        const bold = part.match(/^\*\*([^*]+)\*\*$/);
        if (bold) return <strong key={index} className="font-semibold text-cream">{bold[1]}</strong>;
        return <span key={index}>{part}</span>;
      })}
    </>
  );
}

/**
 * Séparateur de milliers insécable : avec une espace simple, l'arabe (RTL) inverse
 * les groupes de chiffres et « 1 000 » s'affiche « 000 1 ».
 */
function formatPrice(value: number): string {
  return value.toLocaleString('fr-FR').replace(/[\u202f\u00a0]/g, '\u00a0');
}

/** Équivalent indicatif, sous le prix en dirhams : les colonnes des tableaux gardent leur largeur. */
export function EurHint({ mad, locale }: { mad: number; locale: Locale }) {
  const text = formatEurApprox(mad, locale);
  return text ? <span className="block text-[10px] font-normal text-cream-faint sm:text-xs">{text}</span> : null;
}

export function VehicleCards({ locale, vehicles }: { locale: Locale; vehicles: FleetModel[] }) {
  const labels = SEO_LABELS[locale];
  const altSuffix = { fr: 'à louer à Casablanca', en: 'for rent in Casablanca', ar: 'للكراء في الدار البيضاء' }[locale];

  return (
    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
      {vehicles.map((vehicle) => (
        <Link key={vehicle.slug} href={`/catalogue/${vehicle.slug}`} className="group lux-panel block overflow-hidden">
          <div className="relative h-52 bg-noir-root">
            {vehicle.photo ? (
              <Image
                src={vehicle.photo}
                alt={`${vehicle.marque} ${vehicle.modele} ${altSuffix}`}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            ) : null}
          </div>
          <div className="p-5">
            <h3 className="text-lg font-bold text-cream">{vehicle.marque} {vehicle.modele}</h3>
            <div className="mt-3 flex items-end justify-between gap-3 border-t border-white/5 pt-3">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-cream-faint">{labels.from}</p>
                <p className="text-xl font-bold text-gold">
                  {formatPrice(vehicle.minTarif)} {labels.currency}
                  <span className="text-xs font-normal text-cream-muted">{labels.perDay}</span>
                  {formatEurApprox(vehicle.minTarif, locale) && (
                    <span className="ms-1.5 whitespace-nowrap text-xs font-normal text-cream-faint">
                      {formatEurApprox(vehicle.minTarif, locale)}
                    </span>
                  )}
                </p>
              </div>
              {vehicle.countDispo === 0 ? (
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] text-cream-muted">
                  {labels.unavailable}
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 text-sm font-semibold text-gold">
                  {labels.book} <ArrowUpRight className="h-4 w-4" />
                </span>
              )}
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}

/* Tableaux sans largeur minimale : ils tiennent à 390 px, le texte revient à la ligne. */
const TABLE_HEAD = 'bg-white/[0.04] text-[10px] uppercase tracking-[0.04em] text-cream-muted sm:text-xs sm:tracking-[0.1em]';
const TABLE_HEAD_CELL = 'px-1 py-2.5 text-start align-bottom font-semibold min-[380px]:px-2 sm:px-4 sm:py-3';
const TABLE_CELL = 'px-1 py-2.5 align-top min-[380px]:px-2 sm:px-4 sm:py-3';

function PricingTable({ locale, vehicles }: { locale: Locale; vehicles: FleetModel[] }) {
  const labels = SEO_LABELS[locale];
  return (
    <div>
      <div className="overflow-x-auto rounded-2xl border border-white/8">
        <table className="w-full text-start text-xs sm:text-sm">
          <thead className={TABLE_HEAD}>
            <tr>
              <th scope="col" className={TABLE_HEAD_CELL}>{labels.pricingModel}</th>
              <th scope="col" className={TABLE_HEAD_CELL}>{labels.pricingShort}</th>
              <th scope="col" className={TABLE_HEAD_CELL}>{labels.pricingLong}</th>
              <th scope="col" className={TABLE_HEAD_CELL}>{labels.pricingDeposit}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {vehicles.map((vehicle) => (
              <tr key={vehicle.slug}>
                <td className={`${TABLE_CELL} font-medium text-cream`}>
                  <Link href={`/catalogue/${vehicle.slug}`} className="hover:text-gold">
                    {vehicle.marque} {vehicle.modele}
                  </Link>
                </td>
                <td className={`${TABLE_CELL} whitespace-nowrap text-cream-muted`}>
                  {formatPrice(vehicle.minTarif)} {labels.currency}
                  <EurHint mad={vehicle.minTarif} locale={locale} />
                </td>
                <td className={`${TABLE_CELL} whitespace-nowrap text-cream-muted`}>
                  {formatPrice(vehicle.minTarifLong)} {labels.currency}
                  <EurHint mad={vehicle.minTarifLong} locale={locale} />
                </td>
                <td className={`${TABLE_CELL} text-cream-muted`}>
                  {vehicle.minCaution > 0 ? (
                    <span className="whitespace-nowrap">{formatPrice(vehicle.minCaution)} {labels.currency}</span>
                  ) : (
                    labels.onRequest
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-2 text-xs text-cream-faint">
        {labels.pricingNote}
        {vehicles.some((vehicle) => vehicle.highSeason) ? ` ${labels.pricingHighSeason}` : ''}
      </p>
    </div>
  );
}

function BlockView({
  block,
  locale,
  tokens,
  vehicles,
}: {
  block: Block;
  locale: Locale;
  tokens: TextTokens;
  vehicles: FleetModel[];
}) {
  switch (block.type) {
    case 'p':
      return (
        <p className="leading-relaxed text-cream-muted">
          <RichText text={block.text} locale={locale} tokens={tokens} />
        </p>
      );
    case 'list': {
      const Tag = block.ordered ? 'ol' : 'ul';
      return (
        <Tag className={`space-y-2 ps-5 leading-relaxed text-cream-muted ${block.ordered ? 'list-decimal' : 'list-disc'} marker:text-gold`}>
          {block.items.map((item, index) => (
            <li key={index}>
              <RichText text={item} locale={locale} tokens={tokens} />
            </li>
          ))}
        </Tag>
      );
    }
    case 'table':
      return (
        <div className="overflow-x-auto rounded-2xl border border-white/8">
          <table className="w-full text-xs sm:text-sm">
            <thead className={TABLE_HEAD}>
              <tr>
                {block.head.map((cell, index) => (
                  <th key={index} scope="col" className={TABLE_HEAD_CELL}>{cell}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {block.rows.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {row.map((cell, cellIndex) => (
                    <td key={cellIndex} className={`${TABLE_CELL} text-cream-muted`}>
                      <RichText text={cell} locale={locale} tokens={tokens} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    case 'pricing':
      return vehicles.length > 0 ? <PricingTable locale={locale} vehicles={vehicles} /> : null;
    case 'vehicles':
      return vehicles.length > 0 ? <VehicleCards locale={locale} vehicles={vehicles} /> : null;
    default:
      return null;
  }
}

export function SeoSections({
  sections,
  locale,
  tokens,
  vehicles,
}: {
  sections: Section[];
  locale: Locale;
  tokens: TextTokens;
  vehicles: FleetModel[];
}) {
  return (
    <>
      {sections.map((section) => (
        <section key={section.h2} className="space-y-4">
          <h2 className="text-2xl font-bold text-cream">{resolveTokens(section.h2, tokens)}</h2>
          {section.blocks.map((block, index) => (
            <BlockView key={index} block={block} locale={locale} tokens={tokens} vehicles={vehicles} />
          ))}
        </section>
      ))}
    </>
  );
}

/** Questions visibles dans le HTML : les réponses sont toujours rendues, même repliées. */
export function SeoFaq({ locale, items, tokens }: { locale: Locale; items: FaqItem[]; tokens: TextTokens }) {
  if (items.length === 0) return null;
  return (
    <section className="space-y-4">
      <h2 className="text-2xl font-bold text-cream">{SEO_LABELS[locale].faqTitle}</h2>
      <div className="space-y-3">
        {items.map((item) => (
          <details key={item.q} className="group lux-panel-muted px-5 py-2.5" open>
            <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-4 font-semibold text-cream">
              {resolveTokens(item.q, tokens)}
              <ChevronDown className="h-4 w-4 shrink-0 text-gold transition-transform group-open:rotate-180" />
            </summary>
            <p className="mt-1.5 pb-1.5 leading-relaxed text-cream-muted">
              <RichText text={item.a} locale={locale} tokens={tokens} />
            </p>
          </details>
        ))}
      </div>
    </section>
  );
}

export function RelatedLinks({
  locale,
  items,
}: {
  locale: Locale;
  items: { key: SeoRouteKey; label: string }[];
}) {
  const links = items
    .map((item) => ({ ...item, path: getRoutePath(item.key, locale) }))
    .filter((item): item is typeof item & { path: string } => Boolean(item.path));
  if (links.length === 0) return null;

  return (
    <section className="space-y-4">
      <h2 className="text-2xl font-bold text-cream">{SEO_LABELS[locale].relatedTitle}</h2>
      <div className="flex flex-wrap gap-2">
        {links.map((link) => (
          <Link
            key={link.key}
            href={link.path}
            className="inline-flex min-h-11 items-center rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-cream-muted transition-colors hover:border-gold/30 hover:text-gold"
          >
            {link.label}
          </Link>
        ))}
      </div>
    </section>
  );
}
