import { ChevronDown } from 'lucide-react';
import Link from '@/lib/i18n/LocaleLink';
import type { Locale } from '@/lib/i18n/translations';
import { filterFleet, type FleetFilter, type FleetModel, type FleetStats } from '@/lib/seo/fleet';
import { getRoutePath, type SeoRouteKey } from '@/lib/seo/routes';
import { BUSINESS } from '@/lib/site';
import { t as tr } from '@/lib/i18n';
import { SEO_LABELS } from '../seo/seoLabels';
import { RelatedCards } from '../ui/PageParts';
import { formatBusinessHours } from './constants';
import { GUIDE_CONTENT, type GuideRangeKey } from './guideContent';

/** Ce qui définit chaque gamme : sa page et les véhicules dont on lit le prix d'entrée. */
const RANGES: Record<GuideRangeKey, { route: SeoRouteKey | null; filter?: FleetFilter }> = {
  economique: { route: 'economique', filter: { categories: ['economique'] } },
  berline: { route: null, filter: { categories: ['berline'] } },
  suv: { route: 'suv', filter: { categories: ['suv'] } },
  automatique: { route: 'automatique', filter: { boite: 'automatique' } },
  luxe: { route: 'luxe', filter: { marques: ['Mercedes', 'Porsche', 'Range Rover'] } },
  'longue-duree': { route: 'longue-duree' },
};

function entryPrice(key: GuideRangeKey, models: FleetModel[]): number {
  const { filter } = RANGES[key];
  // Longue durée : le prix d'entrée est le tarif au-delà de 10 jours, sur toute la flotte.
  const prices = filter
    ? filterFleet(models, filter).map((model) => model.minTarif)
    : models.map((model) => model.minTarifLong);
  const valid = prices.filter((price) => price > 0);
  return valid.length > 0 ? Math.min(...valid) : 0;
}

/** Texte avec liens [libellé](cible) et gras **texte**. Cibles : route:clé, whatsapp ou /adresse. */
function RichText({ text, locale }: { text: string; locale: Locale }) {
  const linkClass = 't-link';
  return (
    <>
      {text.split(/(\[[^\]]+\]\([^)]+\)|\*\*[^*]+\*\*)/g).map((part, index) => {
        const link = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
        if (link) {
          const [, label, target] = link;
          if (target === 'whatsapp') {
            return (
              <a key={index} href={BUSINESS.whatsappUrl} target="_blank" rel="noopener noreferrer" className={linkClass}>
                {label}
              </a>
            );
          }
          const href = target.startsWith('route:')
            ? getRoutePath(target.slice(6) as SeoRouteKey, locale)
            : target;
          if (!href) return <span key={index}>{label}</span>;
          return (
            <Link key={index} href={href} className={linkClass}>
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

const SUBTITLE = 't-h3';
const BODY = 't-body';

/**
 * Une partie du guide, repliable : le texte reste dans le HTML (Google le lit), la page d'accueil mobile
 * reste courte. La première partie est ouverte.
 */
function GuidePart({ title, open = false, children }: { title: string; open?: boolean; children: React.ReactNode }) {
  return (
    <details open={open} className="group card px-4 sm:px-6">
      <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 py-4 [&::-webkit-details-marker]:hidden">
        <h3 className={SUBTITLE}>{title}</h3>
        <ChevronDown className="h-5 w-5 shrink-0 text-gold transition-transform group-open:rotate-180" aria-hidden="true" />
      </summary>
      <div className="space-y-4 pb-6">{children}</div>
    </details>
  );
}

/**
 * Guide de location de l'accueil. Composant serveur : seul le texte de la langue de la page est
 * envoyé, et il est visible sans JavaScript.
 */
export function LandingGuideSection({
  locale,
  stats,
  models,
}: {
  locale: Locale;
  stats: FleetStats;
  models: FleetModel[];
}) {
  const content = GUIDE_CONTENT[locale];
  const facts = {
    vehicleCount: stats.vehicleCount,
    modelCount: stats.modelCount,
    minPrice: stats.minPrice,
    minDays: BUSINESS.minRentalDays,
    hours: formatBusinessHours(locale),
  };

  return (
    <section id="guide" className="sec scroll-mt-20" aria-labelledby="home-guide">
      <div className="lux-container">
        <div className="mb-8 md:mb-10">
          <p className="t-label text-gold">{content.eyebrow}</p>
          <h2 id="home-guide" className="t-h2 prose-col mt-2">{content.h2}</h2>
          <p className="t-lead prose-col mt-4">{content.intro(facts)}</p>
        </div>

        <div className="space-y-3">
          <GuidePart title={content.flow.h3} open>
            {content.flow.paragraphs.map((text) => (
              <p key={text} className={`${BODY} prose-col`}>
                <RichText text={text} locale={locale} />
              </p>
            ))}
          </GuidePart>
          <GuidePart title={content.airport.h3}>
            {content.airport.paragraphs(facts).map((text) => (
              <p key={text} className={`${BODY} prose-col`}>
                <RichText text={text} locale={locale} />
              </p>
            ))}
          </GuidePart>

          <GuidePart title={content.ranges.h3}>
            <p className={`${BODY} prose-col`}>{content.ranges.lead(facts)}</p>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {content.ranges.items.map((item) => {
                const route = RANGES[item.key].route;
                const href = route ? getRoutePath(route, locale) : '/catalogue';
                const price = entryPrice(item.key, models);
                return (
                  <div key={item.key} className="rounded-xl border border-white/[0.08] bg-surface-2 p-4">
                    <h4 className="text-base font-bold text-cream">
                      {href ? (
                        <Link href={href} className="t-link text-cream">
                          {item.title}
                        </Link>
                      ) : (
                        item.title
                      )}
                    </h4>
                    {price > 0 && (
                      <p className="mt-1 text-sm font-semibold text-gold-light">{content.ranges.price(price)}</p>
                    )}
                    <p className="t-small mt-2">{item.text}</p>
                  </div>
                );
              })}
            </div>
            <p className={`${BODY} prose-col`}>
              <RichText text={content.ranges.outro} locale={locale} />
            </p>
          </GuidePart>

          <GuidePart title={content.prepare.h3}>
            <ul className={`prose-col list-disc space-y-2 ps-5 marker:text-gold ${BODY}`}>
              {content.prepare.items(facts).map((text) => (
                <li key={text}>
                  <RichText text={text} locale={locale} />
                </li>
              ))}
            </ul>
            <p className={`${BODY} prose-col`}>
              <RichText text={content.prepare.outro} locale={locale} />
            </p>
          </GuidePart>

          <div className="pt-7" />
          <RelatedCards
            title={SEO_LABELS[locale].relatedTitle}
            items={(['aeroport', 'luxe', 'range-rover', 'maroc'] as const).flatMap((key) => {
              const href = getRoutePath(key, locale);
              return href ? [{ href, label: tr(locale, `footer.link.${key}`) }] : [];
            })}
          />
        </div>
      </div>
    </section>
  );
}
