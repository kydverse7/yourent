'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { CalendarCheck, Phone } from 'lucide-react';
import Link from '@/lib/i18n/LocaleLink';
import { useLocale } from '@/lib/i18n';
import { BUSINESS } from '@/lib/site';

/** Fiche d'un modèle (adresse publique ou interne) : « Réserver » mène au formulaire de la page. */
const MODEL_PAGE = /\/catalogue(?:-recherche)?\/[^/]+\/?$/;

/**
 * Barre d'action fixe en bas d'écran, sous 768 px : Appeler, WhatsApp, Réserver.
 * De simples liens <a href> (tel:, wa.me) : la mesure des clics est faite par Analytics.tsx.
 * Masquée sur la page de confirmation et quand le formulaire de réservation est à l'écran.
 */
export function MobileActionBar() {
  const { t } = useLocale();
  const pathname = usePathname() ?? '/';
  const isModelPage = MODEL_PAGE.test(pathname);
  const isConfirmation = pathname.includes('/confirmation');
  const [formVisible, setFormVisible] = useState(false);

  useEffect(() => {
    setFormVisible(false);
    if (!isModelPage) return;
    const target = document.getElementById('reservation');
    if (!target || !('IntersectionObserver' in window)) return;
    const observer = new IntersectionObserver(([entry]) => setFormVisible(entry.isIntersecting), {
      rootMargin: '0px 0px -30% 0px',
    });
    observer.observe(target);
    return () => observer.disconnect();
  }, [isModelPage, pathname]);

  if (isConfirmation) return null;

  const item =
    'flex min-h-14 flex-1 flex-col items-center justify-center gap-0.5 text-[0.8125rem] font-semibold leading-tight';
  const bookItem =
    'flex min-h-11 flex-1 flex-col items-center justify-center gap-0.5 rounded-xl bg-gold text-[0.8125rem] font-semibold leading-tight text-[#120f09]';

  return (
    <nav
      aria-label={t('ui.actionsAria')}
      inert={formVisible}
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-[#0d0d0e] pb-[env(safe-area-inset-bottom)] transition-transform duration-200 md:hidden ${
        formVisible ? 'translate-y-full' : 'translate-y-0'
      }`}
    >
      <ul className="flex items-stretch">
        <li className="flex flex-1">
          <a href={`tel:${BUSINESS.phone}`} className={`${item} text-cream`}>
            <Phone className="h-5 w-5 text-gold" aria-hidden="true" />
            {t('ui.call')}
          </a>
        </li>
        <li className="flex flex-1 border-x border-white/10">
          <a href={BUSINESS.whatsappUrl} target="_blank" rel="noopener noreferrer" className={`${item} text-cream`}>
            <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5 text-wa" aria-hidden="true" focusable="false">
              <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.9 9.9 0 0 0 4.74 1.21h.01c5.46 0 9.9-4.45 9.9-9.91A9.86 9.86 0 0 0 12.04 2Zm5.8 14.06c-.24.68-1.42 1.3-1.95 1.38-.5.07-1.13.1-1.82-.12-.42-.13-.96-.31-1.65-.61-2.9-1.25-4.8-4.18-4.94-4.37-.14-.19-1.18-1.57-1.18-3s.75-2.13 1.02-2.42c.27-.29.58-.36.78-.36h.56c.18 0 .42-.07.65.5.24.58.82 2 .89 2.15.07.14.12.31.02.5-.1.19-.14.31-.29.48-.14.17-.3.37-.43.5-.14.14-.29.3-.13.58.17.29.74 1.22 1.59 1.98 1.09.97 2.01 1.27 2.3 1.41.28.14.45.12.62-.07.17-.19.71-.83.9-1.11.19-.29.38-.24.64-.14.26.1 1.67.79 1.96.93.29.14.48.21.55.33.07.12.07.69-.17 1.37Z" />
            </svg>
            {t('ui.whatsapp')}
          </a>
        </li>
        <li className="flex flex-1 p-1.5">
          {isModelPage ? (
            <a href="#reservation" className={bookItem}>
              <CalendarCheck className="h-5 w-5" aria-hidden="true" />
              {t('ui.book')}
            </a>
          ) : (
            <Link href="/catalogue" className={bookItem}>
              <CalendarCheck className="h-5 w-5" aria-hidden="true" />
              {t('ui.book')}
            </Link>
          )}
        </li>
      </ul>
    </nav>
  );
}
