import Image from 'next/image';
import { CarFront, Clock, Headphones, Mail, MapPin, Phone, ShieldCheck, Truck } from 'lucide-react';
import { t as tr, type Locale } from '@/lib/i18n/translations';
import type { FleetModel } from '@/lib/seo/fleet';
import { getRoutePath } from '@/lib/seo/routes';
import { BUSINESS } from '@/lib/site';
import { formatBusinessHours } from '../landing/constants';
import { CallButton, FactsLine, RatingLink, WhatsAppButton } from '../ui/actions';
import { MoreLink, SectionHeading } from '../ui/PageParts';
import { cardFromFleet, VehicleCard } from '../ui/VehicleCard';
import { HomeSearchCard } from './HomeSearchCard';
import { MapEmbed } from './MapEmbed';
import { ScrollRowControls } from './ScrollRowControls';

/* ═══ Hero : H1, faits, note Google, recherche par dates, WhatsApp + Appeler, photo ═══ */
export function HomeHero({ locale, minPrice }: { locale: Locale; minPrice: number }) {
  const t = (key: string) => tr(locale, key);
  return (
    <section className="lux-container pb-8 pt-6 lg:pb-12 lg:pt-10">
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-center lg:gap-12">
        <div className="min-w-0">
          <h1 className="t-h1">{t('hero.pageTitle')}</h1>
          <FactsLine locale={locale} minPrice={minPrice} className="mt-4" />
          <RatingLink locale={locale} className="mt-1" />
          <div className="mt-4">
            <HomeSearchCard />
          </div>
          <div className="mt-4 grid grid-cols-2 gap-3 sm:flex">
            <WhatsAppButton locale={locale} />
            <CallButton locale={locale} />
          </div>
        </div>
        <div className="relative mx-auto w-full max-w-[540px]">
          <div
            className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_70%_55%_at_50%_62%,rgba(201,168,76,0.2),transparent_70%)]"
            aria-hidden="true"
          />
          <div className="relative aspect-[16/10] w-full">
            <Image
              src="/porshe-macan.png?v=2"
              alt={t('hero.imgAlt')}
              fill
              priority
              fetchPriority="high"
              className="object-contain"
              sizes="(min-width: 1024px) 540px, (min-width: 640px) 540px, 92vw"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══ Grille de 4 cartes : 2 × 2 en mobile, 4 de front sur ordinateur ═══ */
export function VehicleGridSection({
  locale,
  id,
  title,
  text,
  more,
  models,
}: {
  locale: Locale;
  id: string;
  title: string;
  text: string;
  more: { href: string; label: string };
  models: FleetModel[];
}) {
  if (models.length === 0) return null;
  return (
    <section className="sec" aria-labelledby={id}>
      <div className="lux-container">
        <SectionHeading id={id} title={title} text={text} action={<MoreLink href={more.href}>{more.label}</MoreLink>} />
        <ul className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {models.map((model) => (
            <li key={model.slug}>
              <VehicleCard
                vehicle={cardFromFleet(model)}
                locale={locale}
                sizes="(min-width: 1280px) 280px, (min-width: 1024px) 23vw, 46vw"
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ═══ Flotte de luxe : rangée à défilement aimanté, sans lecture automatique ═══ */
export function LuxuryRow({
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
    <section className="sec" aria-labelledby="home-luxe">
      <div className="lux-container">
        <SectionHeading
          id="home-luxe"
          title={t('home.luxeTitle')}
          text={t('home.luxeText')}
          action={
            <div className="flex items-center gap-3">
              <MoreLink href={luxePath}>{t('home.luxeAll')}</MoreLink>
              <ScrollRowControls targetId="home-luxe-row" prevLabel={t('aria.prevVehicle')} nextLabel={t('aria.nextVehicle')} />
            </div>
          }
        />
        <ul
          id="home-luxe-row"
          className="-mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto scroll-px-4 px-4 pb-2 [scrollbar-width:none] sm:gap-4 md:mx-0 md:scroll-px-0 md:px-0 [&::-webkit-scrollbar]:hidden"
        >
          {models.map((model) => (
            <li key={model.slug} className="w-[78%] shrink-0 snap-start sm:w-[44%] lg:w-[calc((100%-3rem)/4)]">
              <VehicleCard
                vehicle={cardFromFleet(model)}
                locale={locale}
                sizes="(min-width: 1280px) 280px, (min-width: 1024px) 23vw, (min-width: 640px) 44vw, 78vw"
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
    </section>
  );
}

/* ═══ Trois étapes ═══ */
export function ProcessSteps({ locale }: { locale: Locale }) {
  const t = (key: string) => tr(locale, key);
  return (
    <section id="process" className="sec scroll-mt-20" aria-labelledby="home-process">
      <div className="lux-container">
        <SectionHeading id="home-process" title={t('process.title')} />
        <ol className="grid gap-3 md:grid-cols-3 md:gap-4">
          {(['s1', 's2', 's3'] as const).map((key, index) => (
            <li key={key} className="card flex gap-4 p-5">
              <span
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-gold/50 text-base font-bold text-gold"
                aria-hidden="true"
              >
                {index + 1}
              </span>
              <div>
                <h3 className="t-h3">{t(`process.${key}.title`)}</h3>
                <p className="t-small mt-1.5">{t(`process.${key}.body`)}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ═══ Pourquoi Yourent : 4 cartes compactes ═══ */
export function WhyCards({ locale }: { locale: Locale }) {
  const t = (key: string) => tr(locale, key);
  const items = [
    { icon: Truck, key: 'delivery' },
    { icon: ShieldCheck, key: 'insurance' },
    { icon: CarFront, key: 'fleet' },
    { icon: Headphones, key: 'assistance' },
  ];
  return (
    <section className="sec" aria-labelledby="home-why">
      <div className="lux-container">
        <SectionHeading id="home-why" title={t('why.title')} text={t('why.subtitle')} />
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4 lg:gap-4">
          {items.map(({ icon: Icon, key }) => (
            <li key={key} className="card p-5">
              <Icon className="h-6 w-6 text-gold" aria-hidden="true" />
              <h3 className="t-h3 mt-3">{t(`why.${key}.title`)}</h3>
              <p className="t-small mt-1.5">{t(`why.${key}.desc`)}</p>
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
        <div className="panel grid overflow-hidden lg:grid-cols-2">
          <div className="p-5 sm:p-8">
            <h2 id="home-agency" className="t-h2">
              {t('contact.title')} {t('contact.titleGold')}
            </h2>
            <p className="t-body prose-col mt-3">{t('contact.subtitle')}</p>
            <dl className="mt-6 grid gap-4 sm:grid-cols-2">
              {rows.map(({ icon: Icon, label, value, href, external, sub }) => (
                <div key={label} className="flex gap-3">
                  <Icon className="mt-0.5 h-5 w-5 shrink-0 text-gold" aria-hidden="true" />
                  <div className="min-w-0">
                    <dt className="t-label">{label}</dt>
                    <dd className="mt-0.5 text-[0.9375rem] text-cream">
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
                    </dd>
                  </div>
                </div>
              ))}
            </dl>
            <RatingLink locale={locale} className="mt-4" />
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
