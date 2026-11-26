import type { CSSProperties } from 'react';
import Image from 'next/image';
import { ArrowRight, CarFront, Clock, Headphones, Mail, MapPin, Phone, ShieldCheck, Truck } from 'lucide-react';
import Link from '@/lib/i18n/LocaleLink';
import { formatPrice } from '@/lib/format';
import { t as tr, type Locale } from '@/lib/i18n/translations';
import type { FleetModel } from '@/lib/seo/fleet';
import { getRoutePath } from '@/lib/seo/routes';
import { BUSINESS } from '@/lib/site';
import { formatBusinessHours } from '../landing/constants';
import { Odometer } from '../motion/Odometer';
import { BookButton, CallButton, FactsLine, RatingLink, WhatsAppButton } from '../ui/actions';
import { MoreLink, SectionHeading } from '../ui/PageParts';
import { cardFromFleet, VehicleCard } from '../ui/VehicleCard';
import { CasablancaSkyline } from './CasablancaSkyline';
import { HomeSearchCard } from './HomeSearchCard';
import { MapEmbed } from './MapEmbed';
import { ScrollRowControls } from './ScrollRowControls';

const step = (index: number) => ({ '--in': index }) as CSSProperties;

/* ═══ Haut de page : H1, faits, note Google, la voiture sur son plateau, recherche par dates ═══
 *
 * Mouvement : entrée en scène au chargement (titre, voiture, ligne de route, horizon tracé), puis,
 * au défilement, la voiture avance, l'horizon glisse en parallaxe et le titre s'efface (site-motion.css).
 */
export function HomeHero({ locale, minPrice }: { locale: Locale; minPrice: number }) {
  const t = (key: string) => tr(locale, key);
  return (
    <section className="hero">
      <div>
        <div className="lux-container hero-grid">
          <div className="hero-head hero-head-out">
            <p className="t-eyebrow hero-in">{t('home.heroEyebrow')}</p>
            <h1 className="t-h1 hero-title mt-4">{t('hero.pageTitle')}</h1>
            <div className="hero-in" style={step(1)}>
              <FactsLine locale={locale} minPrice={minPrice} className="mt-5" />
              <RatingLink locale={locale} className="mt-1" />
            </div>
          </div>

          <div className="hero-stage">
            <CasablancaSkyline className="hero-skyline" />
            <div className="hero-floor" aria-hidden="true" />
            <div className="hero-road-wrap" aria-hidden="true">
              <div className="hero-road" />
            </div>
            <div className="hero-car">
              <div className="hero-car-in">
                <div className="hero-car-flip">
                  <Image
                    src="/porshe-macan.png?v=2"
                    alt={t('hero.imgAlt')}
                    fill
                    priority
                    fetchPriority="high"
                    className="object-contain"
                    sizes="(min-width: 1024px) 544px, (min-width: 640px) 544px, 100vw"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="hero-form">
            <div className="hero-in" style={step(2)}>
              <HomeSearchCard />
            </div>
            <div className="hero-in mt-4 grid grid-cols-2 gap-3 sm:flex" style={step(3)}>
              <WhatsAppButton locale={locale} />
              <CallButton locale={locale} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══ Chiffres : quatre faits, en grands chiffres qui défilent à l'entrée ═══ */
export function StatBand({ locale, minPrice }: { locale: Locale; minPrice: number }) {
  const t = (key: string) => tr(locale, key);
  const { value, count } = BUSINESS.googleRating;
  const stats: { figure: string; label: string; href?: string }[] = [
    {
      figure: `${value.toLocaleString(locale === 'fr' ? 'fr-FR' : 'en-US')}/5`,
      label: t('home.statRating').replace('{count}', String(count)),
      href: BUSINESS.mapsUrl,
    },
    ...(minPrice > 0 ? [{ figure: formatPrice(minPrice, locale), label: t('home.statFrom') }] : []),
    { figure: formatPrice(0, locale), label: t('home.statDelivery') },
    { figure: String(BUSINESS.minRentalDays), label: t('home.statMinDays') },
  ];
  return (
    <section aria-label={t('ui.trustAria')} className="lux-container pb-4 pt-2 lg:pb-8">
      <ul className="stat-band">
        {stats.map(({ figure, label, href }) => (
          <li key={label} className="stat">
            <p className="t-figure">
              <Odometer value={figure} />
            </p>
            <p className="mt-3 text-sm leading-snug text-cream-muted">
              {href ? (
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline decoration-white/25 underline-offset-4 transition-colors hover:text-cream"
                >
                  {label}
                </a>
              ) : (
                label
              )}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}

/* ═══ Suite de la flotte de luxe : galerie horizontale.
 * Ordinateur : section épinglée, la rangée glisse avec le défilement vertical.
 * Mobile et tablette : rangée à faire glisser du doigt (aimantée). ═══ */
export function LuxuryGallery({
  locale,
  models,
  newArrivalSlug,
}: {
  locale: Locale;
  models: FleetModel[];
  newArrivalSlug: string | null;
}) {
  if (models.length === 0) return null;
  const t = (key: string) => tr(locale, key);
  const luxePath = getRoutePath('luxe', locale) ?? '/catalogue';
  return (
    <section className="hg" aria-labelledby="home-luxe-more">
      <div className="hg-pin">
        <div className="lux-container">
          <div className="mb-6 flex flex-wrap items-end justify-between gap-x-6 gap-y-2 md:mb-8">
            <div className="min-w-0">
              <h3 id="home-luxe-more" className="font-display text-[1.75rem] leading-tight text-cream lg:text-[2.25rem]">
                {t('home.luxeMore')}
              </h3>
              <p className="t-body prose-col mt-2">{t('home.luxeText')}</p>
            </div>
            <div className="flex items-center gap-3">
              <MoreLink href={luxePath}>{t('home.luxeAll')}</MoreLink>
              <div className="hg-controls">
                <ScrollRowControls targetId="home-luxe-row" prevLabel={t('aria.prevVehicle')} nextLabel={t('aria.nextVehicle')} />
              </div>
            </div>
          </div>
          <div className="hg-view">
            <ul id="home-luxe-row" className="snap-row hg-track">
              {models.map((model) => (
                <li key={model.slug}>
                  <VehicleCard
                    vehicle={cardFromFleet(model)}
                    locale={locale}
                    headingLevel="h4"
                    sizes="(min-width: 1024px) 344px, (min-width: 640px) 42vw, 76vw"
                    note={
                      model.slug === newArrivalSlug ? (
                        <span className="chip w-fit border-gold/40 text-gold-light">{t('newArrival.eyebrow')}</span>
                      ) : undefined
                    }
                  />
                </li>
              ))}
            </ul>
          </div>
          <div className="hg-rail" aria-hidden="true">
            <span className="hg-bar" />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══ Rangée de 4 cartes : à faire glisser en mobile, 4 de front sur ordinateur, arrivée en cascade ═══ */
export function VehicleGridSection({
  locale,
  id,
  eyebrow,
  title,
  text,
  more,
  models,
}: {
  locale: Locale;
  id: string;
  eyebrow?: string;
  title: string;
  text: string;
  more: { href: string; label: string };
  models: FleetModel[];
}) {
  if (models.length === 0) return null;
  return (
    <section className="sec" aria-labelledby={id}>
      <div className="lux-container">
        <SectionHeading
          id={id}
          eyebrow={eyebrow}
          title={title}
          text={text}
          action={<MoreLink href={more.href}>{more.label}</MoreLink>}
        />
        <ul className="snap-row snap-row-grid rv-group">
          {models.map((model) => (
            <li key={model.slug}>
              <VehicleCard
                vehicle={cardFromFleet(model)}
                locale={locale}
                sizes="(min-width: 1280px) 280px, (min-width: 1024px) 23vw, (min-width: 640px) 42vw, 76vw"
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ═══ Trois étapes : rail doré qui se remplit, étapes qui s'allument une à une.
 * Ordinateur : section épinglée. Mobile : frise verticale, pilotée par le défilement. ═══ */
export function ProcessSteps({ locale }: { locale: Locale }) {
  const t = (key: string) => tr(locale, key);
  return (
    <section id="process" className="pin-steps scroll-mt-20" aria-labelledby="home-process">
      <div className="pin-steps-stage sec">
        <div className="lux-container">
          <p className="t-eyebrow">{t('process.eyebrow')}</p>
          <h2 id="home-process" className="t-h2 prose-col mt-3">
            {t('process.title')}
          </h2>
          <ol className="steps mt-10 lg:mt-14">
            {(['s1', 's2', 's3'] as const).map((key, index) => (
              <li key={key} className="step" style={{ '--i': index } as CSSProperties}>
                <span className="step-num" aria-hidden="true">
                  {index + 1}
                </span>
                <h3 className="font-display text-[1.625rem] leading-tight text-cream lg:text-[2rem]">
                  {t(`process.${key}.title`)}
                </h3>
                <p className="t-body mt-2 max-w-[38ch]">{t(`process.${key}.body`)}</p>
              </li>
            ))}
          </ol>
          <div className="mt-10 lg:mt-14">
            <BookButton locale={locale} label={t('hero.searchCta')} className="btn-shine" />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══ Pourquoi Yourent : 4 cartes, un chiffre quand il existe ═══ */
export function WhyCards({ locale, vehicleCount }: { locale: Locale; vehicleCount: number }) {
  const t = (key: string) => tr(locale, key);
  const items: { icon: typeof Truck; key: string; stat?: string }[] = [
    { icon: Truck, key: 'delivery', stat: t('why.delivery.stat') },
    { icon: ShieldCheck, key: 'insurance' },
    { icon: CarFront, key: 'fleet', stat: vehicleCount > 0 ? String(vehicleCount) : undefined },
    { icon: Headphones, key: 'assistance' },
  ];
  return (
    <section className="sec" aria-labelledby="home-why">
      <div className="lux-container">
        <SectionHeading id="home-why" eyebrow={t('why.eyebrow')} title={t('why.title')} text={t('why.subtitle')} />
        <ul className="snap-row snap-row-2 snap-row-grid rv-group">
          {items.map(({ icon: Icon, key, stat }) => (
            <li key={key}>
              <div className="card lift flex h-full flex-col p-6">
                <div className="flex items-center justify-between gap-3">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full border border-gold/40 text-gold">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  {stat && (
                    <span className="font-display text-[2rem] leading-none text-gold-light">
                      <Odometer value={stat} />
                    </span>
                  )}
                </div>
                <h3 className="t-h3 mt-5">{t(`why.${key}.title`)}</h3>
                <p className="t-small mt-2">{t(`why.${key}.desc`)}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ═══ Conseils et guides : les trois derniers articles du blog (en français) ═══ */
export type BlogTeaser = { slug: string; title: string; excerpt: string; meta: string };

/** Motif de chaque carte : une route au trait, tracée quand la carte entre à l'écran. */
const ROADS = [
  'M-10 96C60 96 70 30 140 34S230 96 300 70 380 18 420 22',
  'M-10 28C50 30 80 92 150 88S250 24 310 40 380 100 420 92',
  'M-10 70C40 40 90 40 130 70S210 104 260 70 350 24 420 60',
];

export function BlogTeasers({ locale, articles }: { locale: Locale; articles: BlogTeaser[] }) {
  if (articles.length === 0) return null;
  const t = (key: string) => tr(locale, key);
  return (
    <section className="sec" aria-labelledby="home-blog">
      <div className="lux-container">
        <SectionHeading
          id="home-blog"
          eyebrow={t('home.blogEyebrow')}
          title={t('home.blogTitle')}
          text={t('home.blogText')}
          action={<MoreLink href="/blog">{t('home.blogAll')}</MoreLink>}
        />
        <ul className="snap-row snap-row-grid rv-group" style={{ '--cols': 3 } as CSSProperties}>
          {articles.map((article, index) => (
            <li key={article.slug}>
              <article className="card lift group relative flex h-full flex-col overflow-hidden">
                <div
                  className="relative h-32 overflow-hidden bg-[radial-gradient(ellipse_70%_90%_at_50%_100%,rgba(201,168,76,0.2),transparent_70%)]"
                  aria-hidden="true"
                >
                  <svg viewBox="0 0 400 128" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
                    <path
                      d={ROADS[index % ROADS.length]}
                      pathLength={1}
                      className="draw-on-scroll"
                      fill="none"
                      stroke="#c9a84c"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      vectorEffect="non-scaling-stroke"
                    />
                  </svg>
                  <span className="font-display absolute bottom-3 start-5 text-[3.5rem] leading-none text-cream/90">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <p className="text-sm text-cream-faint">{article.meta}</p>
                  <h3 className="font-display mt-2 text-[1.5rem] leading-[1.15] text-cream">
                    <Link href={`/blog/${article.slug}`} className="after:absolute after:inset-0 after:content-['']">
                      {article.title}
                    </Link>
                  </h3>
                  <p className="t-small mt-3 line-clamp-3 flex-1">{article.excerpt}</p>
                  <span className="mt-4 inline-flex items-center gap-1.5 font-semibold text-gold-light" aria-hidden="true">
                    {t('home.blogRead')}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1 rtl:-scale-x-100" />
                  </span>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ═══ Agence : adresse, horaires, boutons ; la carte Google ne se charge qu'au clic ═══ */
export function AgencySection({ locale }: { locale: Locale }) {
  const t = (key: string) => tr(locale, key);
  const rows = [
    {
      icon: MapPin,
      label: t('contact.address'),
      value: `${BUSINESS.address.street}, ${t('contact.addressSub').replace('{postalCode}', BUSINESS.address.postalCode)}`,
      href: BUSINESS.mapsUrl,
      external: true,
    },
    { icon: Phone, label: t('contact.phone'), value: <bdi dir="ltr">{BUSINESS.phoneDisplay}</bdi>, href: `tel:${BUSINESS.phone}` },
    { icon: Mail, label: t('contact.email'), value: BUSINESS.email, href: `mailto:${BUSINESS.email}` },
    { icon: Clock, label: t('contact.hours'), value: formatBusinessHours(locale), sub: t('contact.hoursSub') },
  ];
  return (
    <section id="contact" className="sec scroll-mt-20" aria-labelledby="home-agency">
      <div className="lux-container">
        <div className="panel rv grid overflow-hidden lg:grid-cols-2">
          <div className="p-6 sm:p-10">
            <h2 id="home-agency" className="t-h2">
              {t('contact.title')} {t('contact.titleGold')}
            </h2>
            <p className="t-body prose-col mt-4">{t('contact.subtitle')}</p>
            <ul className="mt-7 grid gap-5 sm:grid-cols-2">
              {rows.map(({ icon: Icon, label, value, href, external, sub }) => (
                <li key={label} className="flex gap-3">
                  <Icon className="mt-0.5 h-5 w-5 shrink-0 text-gold" aria-hidden="true" />
                  <div className="min-w-0">
                    <p className="t-label">{label}</p>
                    <p className="mt-0.5 text-[0.9375rem] text-cream">
                      {href ? (
                        <a
                          href={href}
                          {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                          className="break-words underline decoration-white/20 underline-offset-4 transition-colors hover:text-gold"
                        >
                          {value}
                        </a>
                      ) : (
                        value
                      )}
                      {sub && <span className="mt-0.5 block text-sm text-cream-muted">{sub}</span>}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
            <RatingLink locale={locale} className="mt-5" />
            <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <a href={BUSINESS.mapsUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                <MapPin className="h-5 w-5" aria-hidden="true" />
                {t('contact.directions')}
              </a>
              <WhatsAppButton locale={locale} />
              <CallButton locale={locale} />
            </div>
          </div>
          <MapEmbed title={t('contact.mapName')} showLabel={t('home.showMap')} imageAlt={t('contact.imgAlt')} />
        </div>
      </div>
    </section>
  );
}
