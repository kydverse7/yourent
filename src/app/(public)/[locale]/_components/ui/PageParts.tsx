import type { ReactNode } from 'react';
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
        {eyebrow && <p className="t-label mt-3 text-gold">{eyebrow}</p>}
        <h1 className={`${titleClass} ${eyebrow ? 'mt-2' : 'mt-3'}`}>{title}</h1>
        {intro && <div className="t-lead prose-col mt-4">{intro}</div>}
        {actions && (
          <div className="mt-6 grid grid-cols-2 gap-3 sm:flex sm:flex-wrap [&>*:first-child]:col-span-2">{actions}</div>
        )}
        {facts && <div className="mt-5">{facts}</div>}
      </div>
      {aside}
    </header>
  );
}

/* ═══ Titre de section : H2, texte facultatif, lien facultatif ═══ */
export function SectionHeading({
  id,
  title,
  text,
  action,
  center = false,
}: {
  id?: string;
  title: ReactNode;
  text?: ReactNode;
  action?: ReactNode;
  center?: boolean;
}) {
  return (
    <div
      className={`mb-6 flex flex-col gap-3 md:mb-8 ${center ? 'items-center text-center' : 'md:flex-row md:items-end md:justify-between'}`}
    >
      <div className="min-w-0">
        <h2 id={id} className="t-h2 prose-col">
          {title}
        </h2>
        {text && <p className={`t-body prose-col mt-2 ${center ? 'mx-auto' : ''}`}>{text}</p>}
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
}: {
  title?: string;
  items: { q: string; a: ReactNode }[];
  id?: string;
  headingId?: string;
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
          <details key={item.q} className="group" open={index === 0}>
            <summary className="flex min-h-14 cursor-pointer list-none items-start justify-between gap-4 px-4 py-4 transition-colors hover:bg-white/[0.02] sm:px-5 [&::-webkit-details-marker]:hidden">
              <h3 className="text-base font-semibold leading-snug tracking-normal text-cream">{item.q}</h3>
              <ChevronDown
                className="mt-0.5 h-5 w-5 shrink-0 text-gold transition-transform duration-200 group-open:rotate-180"
                aria-hidden="true"
              />
            </summary>
            <div className="t-body prose-col px-4 pb-5 sm:px-5">{item.a}</div>
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
        <div className="panel bg-[radial-gradient(ellipse_70%_60%_at_50%_0%,rgba(201,168,76,0.14),transparent_70%)] px-5 py-10 text-center md:px-10 md:py-14">
          <h2 className="t-h2 mx-auto prose-col">{tr(locale, 'ui.ctaTitle')}</h2>
          <p className="t-body mx-auto mt-3 prose-col">{tr(locale, 'ui.ctaText')}</p>
          <FactsLine locale={locale} minPrice={minPrice} className="mt-4 justify-center" />
          <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <BookButton locale={locale} />
            <WhatsAppButton locale={locale} />
            <CallButton locale={locale} />
          </div>
          <p className="mt-5 text-sm text-cream-faint">{hoursText(locale)}</p>
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
      <h2 className="t-h2">{title}</h2>
      <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className="card group flex h-full min-h-14 items-center justify-between gap-3 px-4 py-3.5 transition-colors hover:border-gold/40"
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
