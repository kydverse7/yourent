'use client';

import { useEffect, useId, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { Menu, Phone, X } from 'lucide-react';
import Link from '@/lib/i18n/LocaleLink';
import { useLocale } from '@/lib/i18n';
import { BUSINESS } from '@/lib/site';
import { InlineLangLinks } from './LangLinks';

export type MenuItem = { href: string; label: string; anchor?: boolean };

function WhatsAppGlyph() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden="true" focusable="false">
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.9 9.9 0 0 0 4.74 1.21h.01c5.46 0 9.9-4.45 9.9-9.91A9.86 9.86 0 0 0 12.04 2Zm5.8 14.06c-.24.68-1.42 1.3-1.95 1.38-.5.07-1.13.1-1.82-.12-.42-.13-.96-.31-1.65-.61-2.9-1.25-4.8-4.18-4.94-4.37-.14-.19-1.18-1.57-1.18-3s.75-2.13 1.02-2.42c.27-.29.58-.36.78-.36h.56c.18 0 .42-.07.65.5.24.58.82 2 .89 2.15.07.14.12.31.02.5-.1.19-.14.31-.29.48-.14.17-.3.37-.43.5-.14.14-.29.3-.13.58.17.29.74 1.22 1.59 1.98 1.09.97 2.01 1.27 2.3 1.41.28.14.45.12.62-.07.17-.19.71-.83.9-1.11.19-.29.38-.24.64-.14.26.1 1.67.79 1.96.93.29.14.48.21.55.33.07.12.07.69-.17 1.37Z" />
    </svg>
  );
}

/**
 * Menu mobile : boîte de dialogue plein écran, fermée par Échap, par le bouton ou en changeant de page.
 * Les liens de navigation existent aussi dans le HTML (barre d'ordinateur et pied de page).
 */
export function MobileMenu({ items }: { items: MenuItem[] }) {
  const { t, locale, lp } = useLocale();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const toggleRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', onKey);
    const toggle = toggleRef.current;
    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', onKey);
      toggle?.focus();
    };
  }, [open]);

  return (
    <>
      <button
        ref={toggleRef}
        type="button"
        onClick={() => setOpen(true)}
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={t('aria.menuOpen')}
        className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 text-cream transition-colors hover:border-gold/40 lg:hidden"
      >
        <Menu className="h-5 w-5" aria-hidden="true" />
      </button>

      {open && (
        <div
          id={panelId}
          role="dialog"
          aria-modal="true"
          aria-label={t('ui.menu')}
          className="fixed inset-0 z-[60] flex flex-col overflow-y-auto bg-noir-root lg:hidden"
        >
          <div className="lux-container flex h-16 shrink-0 items-center justify-end">
            <button
              ref={closeRef}
              type="button"
              onClick={() => setOpen(false)}
              aria-label={t('aria.menuClose')}
              className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-white/15 text-cream"
            >
              <X className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>

          <nav aria-label={t('aria.mainNav')} className="lux-container flex-1 pb-8">
            <ul className="divide-y divide-white/[0.08] border-y border-white/[0.08]">
              {items.map((item) => (
                <li key={item.href}>
                  {item.anchor ? (
                    <a
                      href={lp(item.href)}
                      onClick={() => setOpen(false)}
                      className="flex min-h-14 items-center text-lg font-semibold text-cream"
                    >
                      {item.label}
                    </a>
                  ) : (
                    <Link
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className="flex min-h-14 items-center text-lg font-semibold text-cream"
                    >
                      {item.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>

            <div className="mt-6 grid gap-3">
              <Link href="/catalogue" onClick={() => setOpen(false)} className="btn btn-primary btn-block">
                {t('nav.book')}
              </Link>
              <div className="grid grid-cols-2 gap-3">
                <a href={BUSINESS.whatsappUrl} target="_blank" rel="noopener noreferrer" className="btn btn-wa">
                  <WhatsAppGlyph />
                  {t('ui.whatsapp')}
                </a>
                <a href={`tel:${BUSINESS.phone}`} className="btn btn-secondary">
                  <Phone className="h-5 w-5" aria-hidden="true" />
                  {t('ui.call')}
                </a>
              </div>
            </div>

            <div className="mt-8">
              <p className="t-label mb-2">{t('ui.languages')}</p>
              <InlineLangLinks locale={locale} />
            </div>
          </nav>
        </div>
      )}
    </>
  );
}
