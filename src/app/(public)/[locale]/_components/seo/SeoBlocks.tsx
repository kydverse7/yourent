import { Fragment, type ReactNode } from 'react';
import { ChevronDown } from 'lucide-react';
import Link from '@/lib/i18n/LocaleLink';
import { formatPrice } from '@/lib/format';
import { t as tr, type Locale } from '@/lib/i18n/translations';
import type { FleetModel } from '@/lib/seo/fleet';
import { getRoutePath, type SeoRouteKey } from '@/lib/seo/routes';
import { formatEurApprox } from '@/lib/site';
import type { Block, FaqItem, Section } from '@/content/types';
import { Faq, RelatedCards } from '../ui/PageParts';
import { cardFromFleet, VehicleCard } from '../ui/VehicleCard';
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

/** Ancre d'un titre de section : lettres et chiffres, sans accents. */
export function sectionId(text: string): string {
  const slug = text
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^\p{L}\p{N}]+/gu, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 60);
  return slug || 'section';
}

/** Affiche un texte avec ses liens [libellé](cible) et son gras **texte**. Liens soulignés (D16). */
export function RichText({ text, locale, tokens }: { text: string; locale: Locale; tokens: TextTokens }) {
  const resolved = resolveTokens(text, tokens);
  const parts = resolved.split(/(\[[^\]]+\]\([^)]+\)|\*\*[^*]+\*\*)/g);

  return (
    <>
      {parts.map((part, index) => {
        const link = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
        if (link) {
          const [, label, target] = link;
          const routePath = target.startsWith('route:') ? getRoutePath(target.slice(6) as SeoRouteKey, locale) : target;
          // Page absente dans cette langue : on garde le texte, sans lien cassé.
          if (!routePath) return <span key={index}>{label}</span>;
          if (/^https?:/.test(routePath)) {
            return (
              <a key={index} href={routePath} target="_blank" rel="noopener noreferrer" className="t-link">
                {label}
              </a>
            );
          }
          return (
            <Link key={index} href={routePath} className="t-link">
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

/** Équivalent indicatif, sous le prix en dirhams : les colonnes des tableaux gardent leur largeur. */
export function EurHint({ mad, locale }: { mad: number; locale: Locale }) {
  const text = formatEurApprox(mad, locale);
  return text ? <span className="block text-xs font-normal text-cream-faint sm:text-sm">{text}</span> : null;
}

/** Grille de cartes compactes (2 colonnes dès 360 px). */
export function VehicleCards({
  locale,
  vehicles,
  headingLevel = 'h3',
}: {
  locale: Locale;
  vehicles: FleetModel[];
  headingLevel?: 'h2' | 'h3' | 'p';
}) {
  return (
    <ul className="grid grid-cols-1 gap-3 min-[360px]:grid-cols-2 sm:gap-4 lg:grid-cols-3 xl:grid-cols-4">
      {vehicles.map((vehicle) => (
        <li key={vehicle.slug}>
          <VehicleCard
            vehicle={cardFromFleet(vehicle)}
            locale={locale}
            variant="compact"
            headingLevel={headingLevel}
            sizes="(min-width: 1280px) 280px, (min-width: 1024px) 30vw, 46vw"
          />
        </li>
      ))}
    </ul>
  );
}

/* Tableaux en pleine largeur, sans largeur minimale : ils tiennent à 390 px, le texte revient à la ligne. */
const TABLE_HEAD = 'bg-white/[0.04] text-xs uppercase tracking-[0.04em] text-cream-muted sm:tracking-[0.08em]';
const TABLE_HEAD_CELL = 'px-2 py-3 text-start align-bottom font-semibold sm:px-4';
const TABLE_CELL = 'px-2 py-3 align-top sm:px-4';

function PricingTable({ locale, vehicles }: { locale: Locale; vehicles: FleetModel[] }) {
  const labels = SEO_LABELS[locale];
  return (
    <div>
      <div className="overflow-x-auto rounded-2xl border border-white/[0.08]">
        <table className="w-full text-start text-sm sm:text-[0.9375rem]">
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
                  <Link href={`/catalogue/${vehicle.slug}`} className="t-link text-cream">
                    <bdi>
                      {vehicle.marque} {vehicle.modele}
                    </bdi>
                  </Link>
                </td>
                <td className={`${TABLE_CELL} whitespace-nowrap text-cream-muted`}>
                  <bdi>{formatPrice(vehicle.minTarif, locale)}</bdi>
                  <EurHint mad={vehicle.minTarif} locale={locale} />
                </td>
                <td className={`${TABLE_CELL} whitespace-nowrap text-cream-muted`}>
                  <bdi>{formatPrice(vehicle.minTarifLong, locale)}</bdi>
                  <EurHint mad={vehicle.minTarifLong} locale={locale} />
                </td>
                <td className={`${TABLE_CELL} text-cream-muted`}>
                  {vehicle.minCaution > 0 ? (
                    <bdi className="whitespace-nowrap">{formatPrice(vehicle.minCaution, locale)}</bdi>
                  ) : (
                    labels.onRequest
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-2 text-sm text-cream-faint">
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
        <p className="t-body prose-col">
          <RichText text={block.text} locale={locale} tokens={tokens} />
        </p>
      );
    case 'list': {
      const Tag = block.ordered ? 'ol' : 'ul';
      return (
        <Tag className={`t-body prose-col space-y-2 ps-5 ${block.ordered ? 'list-decimal' : 'list-disc'} marker:text-gold`}>
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
        <div className="overflow-x-auto rounded-2xl border border-white/[0.08]">
          <table className="w-full text-sm sm:text-[0.9375rem]">
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

/**
 * Sections H2 d'une page de contenu : un `id` par H2 (sommaire), encart d'action après la 2e section
 * puis toutes les 4 sections, rendu différé à partir de la 3e (le texte reste dans le HTML).
 */
export function SeoSections({
  sections,
  locale,
  tokens,
  vehicles,
  inlineCta,
}: {
  sections: Section[];
  locale: Locale;
  tokens: TextTokens;
  vehicles: FleetModel[];
  inlineCta?: ReactNode;
}) {
  return (
    <>
      {sections.map((section, index) => {
        const title = resolveTokens(section.h2, tokens);
        const showCta = inlineCta && (index === 1 || (index > 1 && (index - 1) % 4 === 0)) && index < sections.length - 1;
        return (
          <Fragment key={section.h2}>
            <section className={`scroll-mt-24 space-y-4 ${index >= 2 ? 'cv-auto' : ''}`} id={sectionId(title)}>
              <h2 className="t-h2 prose-col">{title}</h2>
              {section.blocks.map((block, blockIndex) => (
                <BlockView key={blockIndex} block={block} locale={locale} tokens={tokens} vehicles={vehicles} />
              ))}
            </section>
            {showCta && inlineCta}
          </Fragment>
        );
      })}
    </>
  );
}

/** Sommaire des H2 : dépliant en mobile, colonne collante à partir de 1280 px. */
export function SeoToc({ locale, sections, tokens }: { locale: Locale; sections: Section[]; tokens: TextTokens }) {
  if (sections.length < 3) return null;
  const items = sections.map((section) => {
    const title = resolveTokens(section.h2, tokens);
    return { id: sectionId(title), title };
  });
  const list = (
    <ol className="space-y-1">
      {items.map((item) => (
        <li key={item.id}>
          <a href={`#${item.id}`} className="block py-1.5 text-[0.9375rem] leading-snug text-cream-muted transition-colors hover:text-gold">
            {item.title}
          </a>
        </li>
      ))}
    </ol>
  );
  return (
    <>
      <details className="card group xl:hidden">
        <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between gap-3 px-4 font-semibold text-cream [&::-webkit-details-marker]:hidden">
          {tr(locale, 'ui.toc')}
          <ChevronDown className="h-4 w-4 shrink-0 text-gold transition-transform group-open:rotate-180" aria-hidden="true" />
        </summary>
        <nav aria-label={tr(locale, 'ui.toc')} className="px-4 pb-3">
          {list}
        </nav>
      </details>
      <nav aria-label={tr(locale, 'ui.toc')} className="hidden xl:sticky xl:top-28 xl:block">
        <p className="t-label mb-2">{tr(locale, 'ui.toc')}</p>
        {list}
      </nav>
    </>
  );
}

/** Questions visibles dans le HTML : la première ouverte, les réponses toujours rendues même repliées. */
export function SeoFaq({ locale, items, tokens }: { locale: Locale; items: FaqItem[]; tokens: TextTokens }) {
  if (items.length === 0) return null;
  return (
    <Faq
      title={SEO_LABELS[locale].faqTitle}
      headingId="faq"
      items={items.map((item) => ({
        q: resolveTokens(item.q, tokens),
        a: <RichText text={item.a} locale={locale} tokens={tokens} />,
      }))}
    />
  );
}

export function RelatedLinks({
  locale,
  items,
  title,
}: {
  locale: Locale;
  items: { key: SeoRouteKey; label: string }[];
  title?: string;
}) {
  const links = items.flatMap((item) => {
    const href = getRoutePath(item.key, locale);
    return href ? [{ href, label: item.label }] : [];
  });
  return <RelatedCards title={title ?? SEO_LABELS[locale].relatedTitle} items={links} />;
}
