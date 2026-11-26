import { t as tr, type Locale } from '@/lib/i18n/translations';

/** H1 de l'accueil, visible dès le HTML. */
export function LandingWordmark({ locale }: { locale: Locale }) {
  return (
    <div className="flex shrink-0 flex-col items-center px-4 pb-0 pt-4 md:pt-6">
      <h1 className="lp-hero-title">{tr(locale, 'hero.pageTitle')}</h1>
    </div>
  );
}
