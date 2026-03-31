'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { t as translate, tp as translatePlural, type Locale } from './translations';

type LanguageContextValue = {
  locale: Locale;
  setLocale: (l: Locale) => void;
  t: (key: string) => string;
  tp: (key: string, count: number) => string;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

function readCookie(): Locale {
  if (typeof document === 'undefined') return 'fr';
  const m = document.cookie.match(/(?:^|; )locale=(\w+)/);
  const v = m?.[1];
  if (v === 'en' || v === 'ar') return v;
  return 'fr';
}

function writeCookie(l: Locale) {
  document.cookie = `locale=${l};path=/;max-age=${365 * 24 * 60 * 60};samesite=lax`;
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  // Always start with 'fr' to match SSR, then sync from cookie after mount.
  const [locale, setLocaleState] = useState<Locale>('fr');

  useEffect(() => {
    const saved = readCookie();
    if (saved !== 'fr') setLocaleState(saved);
  }, []);

  const setLocale = useCallback((l: Locale) => {
    setLocaleState(l);
    writeCookie(l);
  }, []);

  const t = useCallback((key: string) => translate(locale, key), [locale]);
  const tp = useCallback(
    (key: string, count: number) => translatePlural(locale, key, count),
    [locale],
  );

  const value = useMemo(
    () => ({ locale, setLocale, t, tp }),
    [locale, setLocale, t, tp],
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLocale() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLocale must be used within LanguageProvider');
  return ctx;
}
