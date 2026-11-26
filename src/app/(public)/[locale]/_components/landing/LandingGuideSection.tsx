import type { CSSProperties, ReactNode } from 'react';
import {
  ArrowRight,
  Banknote,
  CalendarDays,
  CalendarRange,
  Car,
  CarFront,
  ChevronDown,
  ClipboardCheck,
  Gem,
  IdCard,
  KeyRound,
  LifeBuoy,
  PlaneLanding,
  Settings2,
  ShieldCheck,
  Wallet,
  type LucideIcon,
} from 'lucide-react';
import Link from '@/lib/i18n/LocaleLink';
import { formatPrice } from '@/lib/format';
import type { Locale } from '@/lib/i18n/translations';
import { filterFleet, type FleetFilter, type FleetModel, type FleetStats } from '@/lib/seo/fleet';
import { getRoutePath, type SeoRouteKey } from '@/lib/seo/routes';
import { BUSINESS } from '@/lib/site';
import { t as tr } from '@/lib/i18n';
import { Odometer } from '../motion/Odometer';
import { SEO_LABELS } from '../seo/seoLabels';
import { RelatedCards } from '../ui/PageParts';
import { formatBusinessHours } from './constants';
import { GUIDE_CONTENT, type GuideRangeKey } from './guideContent';

/** Ce qui définit chaque gamme : sa page, son pictogramme et les véhicules dont on lit le prix d'entrée. */
const RANGES: Record<GuideRangeKey, { route: SeoRouteKey | null; icon: LucideIcon; filter?: FleetFilter }> = {
  economique: { route: 'economique', icon: Wallet, filter: { categories: ['economique'] } },
  berline: { route: null, icon: Car, filter: { categories: ['berline'] } },
  suv: { route: 'suv', icon: CarFront, filter: { categories: ['suv'] } },
  automatique: { route: 'automatique', icon: Settings2, filter: { boite: 'automatique' } },
  luxe: { route: 'luxe', icon: Gem, filter: { marques: ['Mercedes', 'Porsche', 'Range Rover'] } },
  'longue-duree': { route: 'longue-duree', icon: CalendarRange },
};

/** Pictogrammes de « Ce qu'il faut prévoir », dans l'ordre du texte : durée, documents, caution, assurance, imprévus. */
const PREPARE_ICONS: LucideIcon[] = [CalendarDays, IdCard, Banknote, ShieldCheck, LifeBuoy];

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

/**
 * Un chapitre du guide, replié : pictogramme, numéro et titre restent visibles, le texte se déroule au clic.
 * Le texte est dans le HTML dans tous les cas (Google le lit), la page reste courte et visuelle.
 */
function Chapter({ icon: Icon, title, children }: { icon: LucideIcon; title: string; children: ReactNode }) {
  return (
    <details className="card group">
      <summary className="flex cursor-pointer list-none items-center gap-4 p-5 sm:p-6 [&::-webkit-details-marker]:hidden">
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-gold/40 text-gold transition-colors group-open:bg-gold group-open:text-[#120f09]">
          <Icon className="h-5 w-5" aria-hidden="true" />
        </span>
        <h3 className="t-h3 min-w-0 flex-1">{title}</h3>
        <ChevronDown className="acc-chevron h-5 w-5 shrink-0 text-gold" aria-hidden="true" />
      </summary>
      <div className="acc-body space-y-4 px-5 pb-6 sm:px-6">{children}</div>
    </details>
  );
}

/** « **Durée.** La location dure… » : le mot en gras devient le titre de la ligne. */
function splitLead(text: string): { lead: string; rest: string } {
  const match = text.match(/^\*\*([^*]+)\*\*\s*([\s\S]*)$/);
  return match ? { lead: match[1].replace(/[.。:：]\s*$/, ''), rest: match[2] } : { lead: '', rest: text };
}

/**
 * Guide de location de l'accueil, en version visuelle : chiffres clés, gammes en cartes avec leur prix
 * d'entrée, chapitres repliés, lien vers l'article complet. Composant serveur : seul le texte de la langue
 * de la page est envoyé, il est entier dans le HTML et visible sans JavaScript (les <details> s'ouvrent seuls).
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
  const t = (key: string) => tr(locale, key);
  const facts = {
    vehicleCount: stats.vehicleCount,
    modelCount: stats.modelCount,
    minPrice: stats.minPrice,
    minDays: BUSINESS.minRentalDays,
    hours: formatBusinessHours(locale),
  };
  const figures = [
    { figure: String(BUSINESS.minAge), label: t('home.kfAge') },
    { figure: '24', label: t('home.kfCancel') },
    ...(stats.vehicleCount > 0 ? [{ figure: String(stats.vehicleCount), label: t('home.kfVehicles') }] : []),
    ...(stats.modelCount > 0 ? [{ figure: String(stats.modelCount), label: t('home.kfModels') }] : []),
  ];
  /* L'article complet n'existe qu'en français ; ailleurs, le bouton mène aux conditions de location. */
  const conditions = getRoutePath('conditions', locale);
  const more =
    locale === 'fr'
      ? { href: '/blog/louer-voiture-casablanca-guide', label: t('home.guideCta') }
      : conditions
        ? { href: conditions, label: t('footer.link.conditions') }
        : null;

  return (
    <section id="guide" className="sec scroll-mt-20" aria-labelledby="home-guide">
      <div className="lux-container">
        <div className="grid gap-5 lg:grid-cols-2 lg:items-end lg:gap-16">
          <div className="min-w-0">
            <p className="t-eyebrow rv">{content.eyebrow}</p>
            <h2 id="home-guide" className="t-h2 rv-clip mt-3">
              {content.h2}
            </h2>
          </div>
          <p className="t-lead rv">{content.intro(facts)}</p>
        </div>

        {/* Chiffres clés */}
        <ul className="stat-band mt-10 lg:mt-14">
          {figures.map(({ figure, label }) => (
            <li key={label} className="stat">
              <p className="t-figure text-gold-light">
                <Odometer value={figure} />
              </p>
              <p className="mt-3 text-sm leading-snug text-cream-muted">{label}</p>
            </li>
          ))}
        </ul>

        {/* Les gammes, en cartes : pictogramme, prix d'entrée lu dans la base, lien vers la page */}
        <div className="mt-12 lg:mt-20">
          <div className="grid gap-4 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:items-end lg:gap-16">
            <h3 className="font-display rv-clip text-[1.75rem] leading-tight text-cream lg:text-[2.5rem]">
              {content.ranges.h3}
            </h3>
            <p className="t-body rv">{content.ranges.lead(facts)}</p>
          </div>
          <ul className="snap-row snap-row-2 snap-row-grid rv-group mt-7" style={{ '--cols': 3 } as CSSProperties}>
            {content.ranges.items.map((item) => {
              const { route, icon: Icon } = RANGES[item.key];
              const href = route ? getRoutePath(route, locale) : '/catalogue';
              const price = entryPrice(item.key, models);
              return (
                <li key={item.key}>
                  <div className="card lift relative flex h-full flex-col p-5">
                    <div className="flex items-start justify-between gap-3">
                      <Icon className="h-6 w-6 shrink-0 text-gold" aria-hidden="true" />
                      {price > 0 && (
                        <p className="text-end text-sm leading-tight text-cream-muted">
                          {t('ui.from')}{' '}
                          <span className="whitespace-nowrap">
                            <bdi className="font-display text-[1.625rem] leading-none text-gold-light">
                              {formatPrice(price, locale)}
                            </bdi>
                            {t('ui.perDay')}
                          </span>
                        </p>
                      )}
                    </div>
                    <h4 className="mt-4 text-lg font-semibold leading-snug text-cream">
                      {href ? (
                        <Link href={href} className="after:absolute after:inset-0 after:rounded-[20px] after:content-['']">
                          {item.title}
                        </Link>
                      ) : (
                        item.title
                      )}
                    </h4>
                    <p className="t-small mt-2">{item.text}</p>
                  </div>
                </li>
              );
            })}
          </ul>
          <p className="t-small prose-col rv mt-6">
            <RichText text={content.ranges.outro} locale={locale} />
          </p>
        </div>

        {/* Les chapitres de texte, repliés */}
        <div className="rv-group mt-10 grid gap-3 lg:mt-14 lg:grid-cols-3 lg:items-start lg:gap-5">
          <Chapter icon={KeyRound} title={content.flow.h3}>
            {content.flow.paragraphs.map((text) => (
              <p key={text} className="t-body">
                <RichText text={text} locale={locale} />
              </p>
            ))}
          </Chapter>
          <Chapter icon={PlaneLanding} title={content.airport.h3}>
            {content.airport.paragraphs(facts).map((text) => (
              <p key={text} className="t-body">
                <RichText text={text} locale={locale} />
              </p>
            ))}
          </Chapter>
          <Chapter icon={ClipboardCheck} title={content.prepare.h3}>
            <ul className="space-y-4">
              {content.prepare.items(facts).map((text, index) => {
                const Icon = PREPARE_ICONS[index] ?? ClipboardCheck;
                const { lead, rest } = splitLead(text);
                return (
                  <li key={text} className="flex gap-3">
                    <Icon className="mt-0.5 h-5 w-5 shrink-0 text-gold" aria-hidden="true" />
                    <p className="t-body min-w-0">
                      {lead && <strong className="block font-semibold text-cream">{lead}</strong>}
                      <RichText text={rest} locale={locale} />
                    </p>
                  </li>
                );
              })}
            </ul>
            <p className="t-body">
              <RichText text={content.prepare.outro} locale={locale} />
            </p>
          </Chapter>
        </div>

        {more && (
          <div className="rv mt-8 flex justify-center lg:mt-10">
            <Link href={more.href} className="btn btn-secondary">
              {more.label}
              <ArrowRight className="h-5 w-5 rtl:-scale-x-100" aria-hidden="true" />
            </Link>
          </div>
        )}

        <div className="mt-14 lg:mt-20">
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
