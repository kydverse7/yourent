import type { CSSProperties, ReactNode } from 'react';
import Image from 'next/image';
import { ArrowRight, ChevronDown, ChevronRight, Clock, ShieldCheck, Star, Truck } from 'lucide-react';
import Link from '@/lib/i18n/LocaleLink';
import { t as tr, type Locale } from '@/lib/i18n/translations';
import { BUSINESS } from '@/lib/site';
import { formatBusinessHours } from '../landing/constants';
import { BookButton, CallButton, FactsLine, hoursText, WhatsAppButton } from './actions';

/* ═══ Fil d'Ariane : identique à la BreadcrumbList, la dernière miette tient sur une ligne ═══ */
export type Crumb = { name: string; path?: string };

export function Breadcrumbs({ locale, items }: { locale: Locale; items: Crumb[] }) {
  return (
    <nav aria-label={tr(locale, 'ui.breadcrumbAria')} className="text-sm text-cream-faint">
      <ol className="flex min-w-0 items-center gap-1 whitespace-nowrap">
        {items.map((item, index) => {
          const last = index === items.length - 1;
          return (
            <li key={`${index}-${item.name}`} className={`flex items-center gap-1 ${last ? 'min-w-0' : 'shrink-0'}`}>
              {index > 0 && <ChevronRight className="h-3.5 w-3.5 shrink-0 rtl:-scale-x-100" aria-hidden="true" />}
              {item.path && !last ? (
                <Link href={item.path} className="inline-flex min-h-11 items-center transition-colors hover:text-gold">
                  {item.name}
                </Link>
              ) : (
                <span aria-current="page" className="block truncate text-cream-muted">
                  {item.name}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

/* ═══ En-tête de page : fil d'Ariane, sur-titre, un seul H1, introduction, actions, faits ═══ */
export function PageHeader({
  locale,
  crumbs,
  eyebrow,
  title,
  titleClass = 't-h1-page',
  intro,
  actions,
  facts,
  aside,
  className = '',
}: {
  locale: Locale;
  crumbs: Crumb[];
  eyebrow?: string;
  title: ReactNode;
  titleClass?: string;
  intro?: ReactNode;
  actions?: ReactNode;
  facts?: ReactNode;
  aside?: ReactNode;
  className?: string;
}) {
  return (
    <header
      className={`${aside ? 'grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,460px)] lg:items-center lg:gap-12' : ''} ${className}`}
    >
      <div className="min-w-0">
        <Breadcrumbs locale={locale} items={crumbs} />
        {eyebrow && <p className="t-eyebrow page-in mt-4">{eyebrow}</p>}
        <h1 className={`${titleClass} page-title ${eyebrow ? 'mt-3' : 'mt-4'}`}>{title}</h1>
        {intro && (
          <div className="t-lead prose-col page-in mt-5" style={{ '--in': 1 } as CSSProperties}>
            {intro}
          </div>
        )}
        {actions && (
          <div
            className="page-in mt-6 grid grid-cols-2 gap-3 sm:flex sm:flex-wrap [&>*:first-child]:col-span-2"
            style={{ '--in': 2 } as CSSProperties}
          >
            {actions}
          </div>
        )}
        {facts && (
          <div className="page-in mt-5" style={{ '--in': 3 } as CSSProperties}>
            {facts}
          </div>
        )}
      </div>
      {aside}
    </header>
  );
}

/* ═══ Titre de section : H2, texte facultatif, lien facultatif ═══ */
export function SectionHeading({
  id,
  eyebrow,
  title,
  text,
  action,
  center = false,
}: {
  id?: string;
  eyebrow?: string;
  title: ReactNode;
  text?: ReactNode;
  action?: ReactNode;
  center?: boolean;
}) {
  return (
    <div
      className={`mb-7 flex flex-col gap-3 md:mb-10 ${center ? 'items-center text-center' : 'md:flex-row md:items-end md:justify-between md:gap-8'}`}
    >
      <div className="min-w-0">
        {eyebrow && <p className="t-eyebrow rv mb-3">{eyebrow}</p>}
        <h2 id={id} className="t-h2 prose-col rv-clip">
          {title}
        </h2>
        {text && <p className={`t-body prose-col rv mt-3 ${center ? 'mx-auto' : ''}`}>{text}</p>}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}

/** Lien texte vers une page, avec flèche retournée en arabe. */
export function MoreLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link href={href} className="inline-flex min-h-11 items-center gap-1.5 font-semibold text-gold-light transition-colors hover:text-gold">
      {children}
      <ArrowRight className="h-4 w-4 rtl:-scale-x-100" aria-hidden="true" />
    </Link>
  );
}

/* ═══ FAQ : première question ouverte, les autres repliées, réponses toujours dans le HTML ═══ */
export function Faq({
  title,
  items,
  id,
  headingId,
  openFirst = true,
}: {
  title?: string;
  items: { q: string; a: ReactNode }[];
  id?: string;
  headingId?: string;
  /** Accueil : toutes les questions repliées (la page reste courte), les réponses restent dans le HTML. */
  openFirst?: boolean;
}) {
  if (items.length === 0) return null;
  return (
    <section id={id} aria-labelledby={title ? headingId : undefined} className={id ? 'scroll-mt-24' : undefined}>
      {title && (
        <h2 id={headingId} className="t-h2">
          {title}
        </h2>
      )}
      <div className={`${title ? 'mt-6' : ''} divide-y divide-white/[0.08] overflow-hidden rounded-2xl border border-white/[0.08] bg-surface`}>
        {items.map((item, index) => (
          <details key={item.q} className="group" open={openFirst && index === 0}>
            <summary className="flex min-h-14 cursor-pointer list-none items-start justify-between gap-4 px-4 py-4 transition-colors hover:bg-white/[0.02] sm:px-5 [&::-webkit-details-marker]:hidden">
              <h3 className="text-base font-semibold leading-snug tracking-normal text-cream">{item.q}</h3>
              <ChevronDown className="acc-chevron mt-0.5 h-5 w-5 shrink-0 text-gold" aria-hidden="true" />
            </summary>
            <div className="acc-body t-body prose-col px-4 pb-5 sm:px-5">{item.a}</div>
          </details>
        ))}
      </div>
    </section>
  );
}

/* ═══ Bandeau de confiance : 4 faits, sources dans src/lib/site.ts ═══ */
export function TrustStrip({ locale, className = '' }: { locale: Locale; className?: string }) {
  const { value, count } = BUSINESS.googleRating;
  const rating = tr(locale, 'ui.rating')
    .replace('{value}', value.toLocaleString(locale === 'fr' ? 'fr-FR' : 'en-US'))
    .replace('{count}', String(count));
  const items = [
    { icon: Truck, text: tr(locale, 'ui.trustDelivery') },
    { icon: ShieldCheck, text: tr(locale, 'ui.trustInsurance') },
    { icon: Star, text: rating, href: BUSINESS.mapsUrl },
    { icon: Clock, text: hoursText(locale) },
  ];
  return (
    <ul aria-label={tr(locale, 'ui.trustAria')} className={`grid grid-cols-2 gap-3 lg:grid-cols-4 ${className}`}>
      {items.map(({ icon: Icon, text, href }) => {
        const body = (
          <>
            <Icon className="h-5 w-5 shrink-0 text-gold" aria-hidden="true" />
            <span className="text-sm font-medium leading-snug text-cream">{text}</span>
          </>
        );
        return (
          <li key={text}>
            {href ? (
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="card flex h-full min-h-16 items-center gap-3 p-3.5 transition-colors hover:border-gold/40 sm:p-4"
              >
                {body}
              </a>
            ) : (
              <div className="card flex h-full min-h-16 items-center gap-3 p-3.5 sm:p-4">{body}</div>
            )}
          </li>
        );
      })}
    </ul>
  );
}

/* ═══ Bandeau final : titre générique, faits, Réserver / WhatsApp / Appeler, horaires ═══ */
export function CtaBand({ locale, minPrice }: { locale: Locale; minPrice: number }) {
  return (
    <section className="sec">
      <div className="lux-container">
        <div className="panel rv-zoom relative overflow-hidden px-5 py-14 text-center md:px-10 md:py-20">
          {/* Décor : la mosquée Hassan II de nuit, chargée à l'approche, qui recule doucement au défilement. */}
          <div className="absolute inset-0" aria-hidden="true">
            <Image
              src="/image-casablanca-sombre.webp"
              alt=""
              fill
              loading="lazy"
              sizes="(min-width: 1280px) 1200px, 100vw"
              className="px-zoom object-cover object-[78%_55%]"
            />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_70%_at_50%_0%,rgba(201,168,76,0.16),transparent_70%),linear-gradient(180deg,rgba(10,10,10,0.2),rgba(10,10,10,0.72))]" />
          </div>
          <div className="relative">
            <h2 className="t-h2 mx-auto prose-col">{tr(locale, 'ui.ctaTitle')}</h2>
            <p className="t-body mx-auto mt-4 prose-col">{tr(locale, 'ui.ctaText')}</p>
            <FactsLine locale={locale} minPrice={minPrice} className="mt-5 justify-center" />
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <BookButton locale={locale} className="btn-shine btn-shine-scroll" />
              <WhatsAppButton locale={locale} />
              <CallButton locale={locale} />
            </div>
            <p className="mt-6 text-sm text-cream-muted">{hoursText(locale)}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══ Encart intermédiaire (pages SEO, fiches, articles) : pas de titre, pour garder le plan des H2 ═══ */
export function InlineCta({ locale, message }: { locale: Locale; message?: string }) {
  return (
    <aside className="card flex flex-col gap-4 border-gold/25 p-5 md:flex-row md:items-center md:justify-between">
      <div>
        <p className="text-lg font-bold text-cream">{tr(locale, 'ui.inlineTitle')}</p>
        <p className="t-small mt-1">
          {tr(locale, 'ui.inlineText').replace('{hours}', formatBusinessHours(locale))}
        </p>
      </div>
      <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
        <WhatsAppButton locale={locale} message={message} />
        <CallButton locale={locale} />
      </div>
    </aside>
  );
}

/* ═══ Pages liées, en cartes ═══ */
export function RelatedCards({
  title,
  items,
}: {
  title: string;
  items: { href: string; label: string; hint?: string }[];
}) {
  if (items.length === 0) return null;
  return (
    <section>
      <h2 className="t-h2 rv-clip">{title}</h2>
      <ul className="rv-group mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className="card lift group flex h-full min-h-16 items-center justify-between gap-3 px-5 py-4"
            >
              <span className="min-w-0">
                <span className="block font-semibold leading-snug text-cream">{item.label}</span>
                {item.hint && <span className="mt-0.5 block text-sm text-cream-muted">{item.hint}</span>}
              </span>
              <ArrowRight
                className="h-4 w-4 shrink-0 text-gold transition-transform group-hover:translate-x-0.5 rtl:-scale-x-100 rtl:group-hover:-translate-x-0.5"
                aria-hidden="true"
              />
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
