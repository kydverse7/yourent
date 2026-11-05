'use client';

import { createContext, useCallback, useContext, useMemo, type ReactNode } from 'react';
import { alternatePathname, localePath } from './routing';
import { t as translate, tp as translatePlural, type Locale } from './translations';

type LanguageContextValue = {
  locale: Locale;
  setLocale: (l: Locale) => void;
  /** Adresse interne dans la langue courante : à utiliser pour router.push et les liens `<a>`. */
  lp: (path: string) => string;
  t: (key: string) => string;
  tp: (key: string, count: number) => string;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

/** La langue vient de l'adresse : /, /en ou /ar. Changer de langue, c'est changer d'adresse. */
export function LanguageProvider({ children, locale }: { children: ReactNode; locale: Locale }) {
  const setLocale = useCallback((next: Locale) => {
    const { pathname, search, hash } = window.location;
    window.location.assign(`${alternatePathname(pathname, next)}${search}${hash}`);
  }, []);

  const lp = useCallback((path: string) => localePath(locale, path), [locale]);
  const t = useCallback((key: string) => translate(locale, key), [locale]);
  const tp = useCallback(
    (key: string, count: number) => translatePlural(locale, key, count),
    [locale],
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
