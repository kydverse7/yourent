'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { ChevronDown } from 'lucide-react';
import { alternatePathname } from '@/lib/i18n/routing';
import type { Locale } from '@/lib/i18n/translations';

const LANGUAGES: { code: Locale; short: string; label: string }[] = [
  { code: 'fr', short: 'FR', label: 'Français' },
  { code: 'en', short: 'EN', label: 'English' },
  { code: 'ar', short: 'ع', label: 'العربية' },
];

/**
 * Liens vers la même page dans les autres langues, rendus côté serveur : Google les suit.
 * Côté serveur, l'adresse lue peut être l'adresse interne (/fr/..., /catalogue-recherche) : on la ramène à l'adresse publique.
 */
function useLanguageLinks() {
  const pathname = usePathname();
  const publicPath =
    (pathname ?? '/')
      .replace(/^\/fr(?=\/|$)/, '')
      .replace(/^(\/(?:en|ar))?\/catalogue-recherche(?=\/|$)/, '$1/catalogue') || '/';
  return LANGUAGES.map((lang) => ({ ...lang, href: alternatePathname(publicPath, lang.code) }));
}

/** Pied de page : les trois langues, en toutes lettres (balisage inchangé). */
export function FooterLangLinks({ locale, label }: { locale: Locale; label: string }) {
  const links = useLanguageLinks();
  return (
    <nav aria-label={label}>
      <ul className="flex flex-wrap items-center gap-x-5 gap-y-1">
        {links.map((lang) => (
          <li key={lang.code}>
            <a
              href={lang.href}
              hrefLang={lang.code}
              lang={lang.code}
              aria-current={locale === lang.code ? 'page' : undefined}
              className={`inline-flex min-h-11 items-center ${locale === lang.code ? 'text-gold' : 'transition-colors hover:text-gold'}`}
            >
              {lang.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

/** Rangée « FR · EN · ع » du menu mobile. */
export function InlineLangLinks({ locale }: { locale: Locale }) {
  const links = useLanguageLinks();
  return (
    <ul className="flex items-center gap-2">
      {links.map((lang) => (
        <li key={lang.code}>
          <a
            href={lang.href}
            hrefLang={lang.code}
            lang={lang.code}
            aria-current={locale === lang.code ? 'page' : undefined}
            className={`inline-flex h-11 min-w-11 items-center justify-center rounded-xl border px-3 text-base font-bold ${
              locale === lang.code ? 'border-gold/60 text-gold' : 'border-white/10 text-cream-muted hover:text-cream'
            }`}
          >
            <span aria-hidden="true">{lang.short}</span>
            <span className="sr-only">{lang.label}</span>
          </a>
        </li>
      ))}
    </ul>
  );
}

/** En-tête : bouton « FR » qui ouvre la liste des langues (en texte : les drapeaux s'affichent mal sous Windows). */
export function LangMenu({ locale, label }: { locale: Locale; label: string }) {
  const links = useLanguageLinks();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const current = links.find((lang) => lang.code === locale) ?? links[0];

  useEffect(() => {
    if (!open) return;
    const onPointer = (event: PointerEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) setOpen(false);
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    document.addEventListener('pointerdown', onPointer);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('pointerdown', onPointer);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-haspopup="true"
        aria-label={label}
        className="inline-flex h-11 min-w-11 items-center justify-center gap-1 rounded-xl border border-white/10 px-2.5 text-sm font-bold text-cream transition-colors hover:border-gold/40"
      >
        {current.short}
        <ChevronDown className={`h-3.5 w-3.5 transition-transform ${open ? 'rotate-180' : ''}`} aria-hidden="true" />
      </button>
      {open && (
        <ul className="absolute end-0 top-full z-50 mt-2 min-w-40 overflow-hidden rounded-xl border border-white/10 bg-surface-2 py-1 shadow-[0_16px_40px_rgba(0,0,0,0.5)]">
          {links.map((lang) => (
            <li key={lang.code}>
              <a
                href={lang.href}
                hrefLang={lang.code}
                lang={lang.code}
                aria-current={locale === lang.code ? 'page' : undefined}
                className={`flex min-h-11 items-center gap-3 px-4 text-[0.9375rem] ${
                  locale === lang.code ? 'text-gold' : 'text-cream-muted hover:bg-white/5 hover:text-cream'
                }`}
              >
                <span className="w-6 font-bold" aria-hidden="true">
                  {lang.short}
                </span>
                {lang.label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
