'use client';

import { createContext, useCallback, useContext, useMemo, type ReactNode } from 'react';
import { alternatePathname, localePath } from './routing';
import type { Locale } from './translations';

type LanguageContextValue = {
  locale: Locale;
  setLocale: (l: Locale) => void;
  /** Adresse interne dans la langue courante : à utiliser pour router.push et les liens `<a>`. */
  lp: (path: string) => string;
  t: (key: string) => string;
  tp: (key: string, count: number) => string;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

/**
 * La langue vient de l'adresse : /, /en ou /ar. Changer de langue, c'est changer d'adresse.
 * `messages` : les libellés de la langue de la page, choisis côté serveur (voir clientMessages) :
 * le navigateur ne reçoit plus les trois langues dans son JavaScript.
 */
export function LanguageProvider({
  children,
  locale,
  messages,
}: {
  children: ReactNode;
  locale: Locale;
  messages: Record<string, string>;
}) {
  const setLocale = useCallback((next: Locale) => {
    const { pathname, search, hash } = window.location;
    window.location.assign(`${alternatePathname(pathname, next)}${search}${hash}`);
  }, []);

  const lp = useCallback((path: string) => localePath(locale, path), [locale]);
  const t = useCallback((key: string) => messages[key] ?? key, [messages]);
  const tp = useCallback(
    (key: string, count: number) =>
      (messages[key] ?? key).replace(/\{s\}/g, count > 1 ? 's' : '').replace('{count}', String(count)),
    [messages],
  );

  const value = useMemo(
    () => ({ locale, setLocale, lp, t, tp }),
    [locale, setLocale, lp, t, tp],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLocale() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLocale must be used within LanguageProvider');
  return ctx;
}
