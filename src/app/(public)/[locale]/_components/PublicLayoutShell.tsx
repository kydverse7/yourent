import { preload } from 'react-dom';
import { LanguageProvider } from '@/lib/i18n';
import type { Locale } from '@/lib/i18n';
import { display } from '@/lib/fonts';
import { BUSINESS } from '@/lib/site';
import { clientMessages } from '@/lib/i18n/clientMessages';
import { t as tr } from '@/lib/i18n/translations';
import { MobileActionBar, SiteFooter, SiteHeader } from './layout/SiteChrome';
import { WhatsAppIcon } from './ui/actions';

/*
 * Repli pour les navigateurs sans animations liées au défilement (animation-timeline) : un seul
 * IntersectionObserver pose la classe « is-in » sur les blocs à révéler quand ils entrent à l'écran.
 * La classe html.io n'est posée que par ce script : sans JavaScript, ou en cas d'erreur, rien n'est masqué.
 * Aucun écouteur de défilement. Le MutationObserver suit les changements de page sans rechargement.
 */
const MOTION_FALLBACK = `(function(){var d=document.documentElement;try{if(!('IntersectionObserver' in window)||(window.CSS&&CSS.supports&&CSS.supports('animation-timeline: view()'))||matchMedia('(prefers-reduced-motion: reduce)').matches)return;d.classList.add('io');var s='.rv,.rv-side,.rv-zoom,.rv-group,.steps,.dmap,.odo,.draw-on-scroll',o=new IntersectionObserver(function(e){e.forEach(function(x){if(x.isIntersecting){x.target.classList.add('is-in');o.unobserve(x.target)}})},{rootMargin:'0px 0px -10% 0px',threshold:0.08}),q=0,f=function(){q=0;document.querySelectorAll(s).forEach(function(n){if(!n.classList.contains('is-in'))o.observe(n)})},r=function(){if(!q)q=requestAnimationFrame(f)};if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',f);else f();new MutationObserver(r).observe(d,{childList:true,subtree:true})}catch(e){d.classList.remove('io')}})();`;

/**
 * Cadre du site public. Composant serveur : seul le fournisseur de langue est client, avec quelques îlots
 * (choix de la langue, menu mobile, barre d'action, liens de langue du pied de page).
 */
export function PublicLayoutShell({ children, locale }: { children: React.ReactNode; locale: Locale }) {
  /* Pages arabes : la police arabe est préchargée, comme Inter, pour être là au premier affichage (voir globals.css). */
  if (locale === 'ar') {
    preload('/fonts/cairo-arabic.woff2', { as: 'font', type: 'font/woff2', crossOrigin: 'anonymous' });
  }
  return (
    <LanguageProvider locale={locale} messages={clientMessages(locale)}>
      <div className={`relative flex min-h-screen flex-col ${display.variable}`} dir={locale === 'ar' ? 'rtl' : 'ltr'}>
        <script dangerouslySetInnerHTML={{ __html: MOTION_FALLBACK }} />
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
