'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { ADS_CONVERSION_LABELS, ADS_ID, type AdsConversion } from '@/lib/ads';

type GtagParams = Record<string, string | number | boolean | undefined>;
type Gtag = (command: 'event', name: string, params?: GtagParams) => void;

/** Envoie un événement à gtag ; sans effet si gtag n'est pas chargé (bloqueur, hors ligne, tests). */
export function trackEvent(name: string, params: GtagParams = {}): void {
  try {
    const gtag = (window as unknown as { gtag?: Gtag }).gtag;
    if (typeof gtag === 'function') gtag('event', name, params);
  } catch {
    // La mesure ne doit jamais casser la page.
  }
}

/** Conversion Google Ads ; sans effet tant que le libellé de l'action n'est pas renseigné dans src/lib/ads.ts. */
function trackConversion(kind: AdsConversion, params: GtagParams = {}): void {
  const label = ADS_CONVERSION_LABELS[kind];
  if (!label) return;
  trackEvent('conversion', { send_to: `${ADS_ID}/${label}`, ...params });
}

const SUBMITTED_KEY = 'yourent:reservation_submitted';
let submittedInMemory = false;

function alreadyTracked(): boolean {
  if (submittedInMemory) return true;
  try {
    return window.sessionStorage.getItem(SUBMITTED_KEY) === '1';
  } catch {
    return false;
  }
}

function markTracked(): void {
  submittedInMemory = true;
  try {
    window.sessionStorage.setItem(SUBMITTED_KEY, '1');
  } catch {
    // sessionStorage indisponible : la variable en mémoire suffit pour la page en cours.
  }
}

/** Mesure des clics WhatsApp et téléphone, et de la demande de réservation envoyée. */
export function Analytics() {
  const pathname = usePathname();

  useEffect(() => {
    function onClick(event: MouseEvent) {
      const target = event.target;
      if (!(target instanceof Element)) return;
      const link = target.closest('a[href]');
      const href = link?.getAttribute('href');
      if (!href) return;
      const page = window.location.pathname;

      if (/^https?:\/\/(wa\.me|api\.whatsapp\.com)\//i.test(href)) {
        trackEvent('whatsapp_click', { page_path: page });
        /* Sur la page de confirmation, la demande est déjà comptée : pas de seconde conversion. */
        if (!page.includes('/confirmation')) trackConversion('whatsapp', { transport_type: 'beacon' });
      } else if (/^tel:/i.test(href)) {
        trackEvent('phone_click', { page_path: page });
        trackConversion('phone', { transport_type: 'beacon' });
      }
    }

    document.addEventListener('click', onClick, true);
    return () => document.removeEventListener('click', onClick, true);
  }, []);

  useEffect(() => {
    if (!pathname || !pathname.includes('/confirmation')) return;
    if (alreadyTracked()) return;
    markTracked();
    trackEvent('reservation_submitted', { page_path: pathname });
    /* L'identifiant de la demande évite qu'un rechargement de la page compte deux fois. */
    const id = new URLSearchParams(window.location.search).get('id') ?? undefined;
    trackConversion('reservation', { transaction_id: id });
  }, [pathname]);

  return null;
}
