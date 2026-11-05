import { Sparkles } from 'lucide-react';
import Link from '@/lib/i18n/LocaleLink';
import type { Locale } from '@/lib/i18n/translations';
import { filterFleet, type FleetFilter, type FleetModel, type FleetStats } from '@/lib/seo/fleet';
import { getRoutePath, type SeoRouteKey } from '@/lib/seo/routes';
import { BUSINESS } from '@/lib/site';
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
  const linkClass = 'text-gold underline-offset-4 hover:underline';
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
        if (bold) return <strong key={index} className="font-semibold text-[#f7f1e8]">{bold[1]}</strong>;
        return <span key={index}>{part}</span>;
      })}
    </>
  );
}

const SUBTITLE = 'text-xl font-bold text-[#f7f1e8] md:text-2xl';
const BODY = 'text-sm leading-relaxed text-[#b9a88f] md:text-base';

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
    <section id="guide" className="lux-container py-16 md:py-24 scroll-mt-24">
      <div className="relative overflow-hidden rounded-[28px] border border-white/[0.07] bg-gradient-to-b from-white/[0.03] to-white/[0.015] p-6 sm:p-10 md:p-14">
        <div className="pointer-events-none absolute inset-x-0 -top-px h-48 rounded-t-[28px] bg-[radial-gradient(ellipse_60%_40%_at_50%_0%,rgba(201,168,76,0.1),transparent)]" />

        <div className="relative mb-10 text-center md:mb-14">
          <span className="lux-eyebrow">
            <Sparkles className="h-3.5 w-3.5" /> {content.eyebrow}
          </span>
          <h2 className="lux-title-sm mx-auto mt-4 max-w-[30ch]">{content.h2}</h2>
          <p className="lux-subtitle mx-auto mt-4 max-w-[70ch]">{content.intro(facts)}</p>
        </div>

        <div className="relative space-y-12 md:space-y-14">
          <div className="grid gap-10 lg:grid-cols-2">
            <div className="space-y-4">
              <h3 className={SUBTITLE}>{content.flow.h3}</h3>
              {content.flow.paragraphs.map((text) => (
                <p key={text} className={BODY}>
                  <RichText text={text} locale={locale} />
                </p>
              ))}
            </div>
            <div className="space-y-4">
              <h3 className={SUBTITLE}>{content.airport.h3}</h3>
              {content.airport.paragraphs(facts).map((text) => (
                <p key={text} className={BODY}>
                  <RichText text={text} locale={locale} />
                </p>
              ))}
            </div>
          </div>

          <div className="space-y-5">
            <h3 className={SUBTITLE}>{content.ranges.h3}</h3>
            <p className={BODY}>{content.ranges.lead(facts)}</p>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {content.ranges.items.map((item) => {
                const route = RANGES[item.key].route;
                const href = route ? getRoutePath(route, locale) : '/catalogue';
                const price = entryPrice(item.key, models);
                return (
                  <div key={item.key} className="lux-panel-muted p-5">
                    <h4 className="text-base font-bold text-[#f7f1e8]">
                      {href ? (
                        <Link href={href} className="transition-colors hover:text-gold">
                          {item.title}
                        </Link>
                      ) : (
                        item.title
                      )}
                    </h4>
                    {price > 0 && (
                      <p className="mt-1 text-sm font-semibold text-[#c9a84c]">{content.ranges.price(price)}</p>
                    )}
                    <p className="mt-2 text-sm leading-relaxed text-[#b9a88f]">{item.text}</p>
                  </div>
                );
              })}
            </div>
            <p className={BODY}>
              <RichText text={content.ranges.outro} locale={locale} />
            </p>
          </div>

          <div className="space-y-5">
            <h3 className={SUBTITLE}>{content.prepare.h3}</h3>
            <ul className={`list-disc space-y-2 ps-5 marker:text-gold ${BODY}`}>
              {content.prepare.items(facts).map((text) => (
                <li key={text}>
                  <RichText text={text} locale={locale} />
                </li>
              ))}
            </ul>
            <p className={BODY}>
              <RichText text={content.prepare.outro} locale={locale} />
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
