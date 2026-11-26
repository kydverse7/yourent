import { LanguageProvider } from '@/lib/i18n';
import type { Locale } from '@/lib/i18n';
import { BUSINESS } from '@/lib/site';
import { clientMessages } from '@/lib/i18n/clientMessages';
import { t as tr } from '@/lib/i18n/translations';
import { MobileActionBar, SiteFooter, SiteHeader } from './layout/SiteChrome';
import { WhatsAppIcon } from './ui/actions';

/**
 * Cadre du site public. Composant serveur : seul le fournisseur de langue est client, avec quelques îlots
 * (choix de la langue, menu mobile, barre d'action, liens de langue du pied de page).
 */
export function PublicLayoutShell({ children, locale }: { children: React.ReactNode; locale: Locale }) {
  return (
    <LanguageProvider locale={locale} messages={clientMessages(locale)}>
      <div className="relative flex min-h-screen flex-col" dir={locale === 'ar' ? 'rtl' : 'ltr'}>
        <SiteHeader locale={locale} />
        <main id="contenu" className="relative z-10 flex-1">
          {children}
        </main>
        <SiteFooter locale={locale} />
        <MobileActionBar />
        {/* Ordinateur : bouton WhatsApp flottant. En mobile, la barre d'action le remplace. */}
        <a
          href={BUSINESS.whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={tr(locale, 'aria.whatsapp')}
          className="fixed bottom-6 end-6 z-40 hidden h-14 w-14 items-center justify-center rounded-full bg-wa text-wa-ink shadow-[0_8px_24px_rgba(0,0,0,0.45)] transition-colors hover:bg-[#3ddc7a] md:flex"
        >
          <WhatsAppIcon className="h-7 w-7" />
        </a>
      </div>
    </LanguageProvider>
  );
}
