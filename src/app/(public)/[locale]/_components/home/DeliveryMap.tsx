import type { CSSProperties } from 'react';
import { Building2, MapPin, Plane, Route } from 'lucide-react';
import { t as tr, type Locale } from '@/lib/i18n/translations';
import { getRoutePath } from '@/lib/seo/routes';
import { MoreLink } from '../ui/PageParts';

/** Plage de défilement d'un élément de la carte, en pourcentage de la traversée de l'écran (voir .dmap). */
const range = (a: number, b: number) => ({ '--a': `${a}%`, '--b': `${b}%` }) as CSSProperties;

/*
 * Carte stylisée (pas à l'échelle) : la côte atlantique, Casablanca, Mohammedia au nord-est,
 * l'aéroport Mohammed V au sud, Marrakech hors cadre vers le sud.
 * Le tracé aéroport → Casablanca se dessine au défilement, une voiture le suit, puis un reflet doré le parcourt ;
 * chaque ville apparaît avec un halo qui s'ouvre. Viennent ensuite
 * Mohammedia (avec supplément) et la route de Marrakech (livraison gratuite aussi).
 * Les noms sont du texte HTML posé sur le dessin : ils restent lisibles à toutes les tailles.
 */
function MapDrawing() {
  return (
    <svg viewBox="0 0 400 420" aria-hidden="true" focusable="false">
      <defs>
        <pattern id="dmap-dots" width="14" height="14" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="1" fill="rgba(217,220,225,0.13)" />
        </pattern>
        <radialGradient id="dmap-glow" cx="43%" cy="40%" r="60%">
          <stop offset="0" stopColor="rgba(201,168,76,0.16)" />
          <stop offset="1" stopColor="rgba(201,168,76,0)" />
        </radialGradient>
        <clipPath id="dmap-frame">
          <rect width="400" height="420" rx="28" />
        </clipPath>
      </defs>
      <g clipPath="url(#dmap-frame)">
        {/* terre : semis de points et halo autour de Casablanca */}
        <rect width="400" height="420" fill="#0e0f10" />
        <rect width="400" height="420" fill="url(#dmap-dots)" />
        <rect width="400" height="420" fill="url(#dmap-glow)" />
        {/* océan */}
        <path d="M0 0H400V34C372 54 335 76 298 96C255 118 215 142 172 168C120 200 50 240 0 268Z" fill="#08090a" />
        <g fill="none" stroke="rgba(217,220,225,0.16)" strokeWidth="1">
          <path d="M0 246C50 218 112 180 162 150C208 122 250 100 290 78C330 56 370 32 400 10" />
          <path d="M0 220C50 192 108 158 154 130C200 102 244 80 282 60C316 42 350 22 380 4" opacity="0.6" />
          <path d="M0 192C46 166 100 136 146 108C190 82 230 62 268 42C292 30 316 16 340 2" opacity="0.3" />
        </g>
        {/* trait de côte */}
        <path
          d="M0 268C50 240 120 200 172 168C215 142 255 118 298 96C335 76 372 54 400 34"
          fill="none"
          stroke="rgba(217,220,225,0.5)"
          strokeWidth="1.5"
        />
        {/* routes secondaires, en filigrane */}
        <g fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="1.2">
          <path d="M172 168C230 190 300 200 400 196" />
          <path d="M172 168C150 230 80 300 0 356" />
          <path d="M204 304C270 300 340 320 400 352" />
        </g>
      </g>
      <rect x="0.5" y="0.5" width="399" height="419" rx="27.5" fill="none" stroke="rgba(255,255,255,0.08)" />

      {/* Marrakech : route du sud, livraison gratuite */}
      <path
        className="dmap-route"
        style={range(46, 54)}
        pathLength={1}
        d="M204 304C204 340 194 374 182 404"
        stroke="rgba(232,201,122,0.55)"
        strokeWidth="1.5"
      />
      {/* Mohammedia : avec supplément */}
      <path
        className="dmap-route"
        style={range(46, 53)}
        pathLength={1}
        d="M172 168C212 172 268 138 298 96"
        stroke="#d9dce1"
        strokeWidth="2"
      />
      {/* Aéroport Mohammed V → Casablanca : livraison gratuite */}
      <path d="M204 304C226 256 158 226 172 168" fill="none" stroke="rgba(201,168,76,0.22)" strokeWidth="5" strokeLinecap="round" />
      <path
        className="dmap-route"
        style={range(30, 46)}
        pathLength={1}
        d="M204 304C226 256 158 226 172 168"
        stroke="#e8c97a"
        strokeWidth="3"
      />
      {/* reflet qui parcourt la route une fois tracée */}
      <path className="dmap-glint" style={range(47, 60)} pathLength={1} d="M204 304C226 256 158 226 172 168" />

      {/* repères */}
      <circle className="dmap-halo" style={range(22, 30)} cx="204" cy="304" r="12" />
      <g className="dmap-pin" style={range(22, 30)}>
        <circle cx="204" cy="304" r="11" fill="#0a0a0a" stroke="#e8c97a" strokeWidth="1.5" />
        <circle cx="204" cy="304" r="4" fill="#e8c97a" />
      </g>
      <circle className="dmap-halo" style={range(42, 48)} cx="172" cy="168" r="17" />
      <g className="dmap-pin" style={range(42, 48)}>
        <circle cx="172" cy="168" r="17" fill="rgba(201,168,76,0.16)" />
        <circle cx="172" cy="168" r="11" fill="#0a0a0a" stroke="#e8c97a" strokeWidth="2" />
        <circle cx="172" cy="168" r="4.5" fill="#e8c97a" />
      </g>
      <circle className="dmap-halo" style={range(51, 56)} cx="298" cy="96" r="9" />
      <g className="dmap-pin" style={range(51, 56)}>
        <circle cx="298" cy="96" r="8" fill="#0a0a0a" stroke="#d9dce1" strokeWidth="1.5" />
        <circle cx="298" cy="96" r="3" fill="#d9dce1" />
      </g>
      <g className="dmap-pin" style={range(52, 57)}>
        <path d="M189.1 398.4L182 404L180.7 395.1" fill="none" stroke="rgba(232,201,122,0.8)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </g>

      {/* la voiture */}
      <g className="dmap-car">
        <circle r="9" fill="rgba(245,240,232,0.18)" />
        <circle r="5" fill="#f5f0e8" />
      </g>
    </svg>
  );
}

export function DeliverySection({ locale }: { locale: Locale }) {
  const t = (key: string) => tr(locale, key);
  const aeroport = getRoutePath('aeroport', locale);
  const places = [
    { icon: Plane, name: t('home.mapAirport'), status: t('home.mapFree'), note: t('home.mapAirportNote'), gold: true },
    { icon: Building2, name: t('home.mapCasa'), status: t('home.mapFree'), note: t('home.mapCasaNote'), gold: true },
    { icon: MapPin, name: t('home.mapMohammedia'), status: t('home.mapSurcharge'), note: t('home.mapMohammediaNote') },
    { icon: Route, name: t('home.mapMarrakech'), status: t('home.mapFree'), note: t('home.mapMarrakechNote') },
  ];

  return (
    <section className="sec scene scene-rule cv-auto" aria-labelledby="home-delivery">
      <div className="lux-container grid gap-x-16 gap-y-7 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:grid-rows-[auto_1fr] lg:items-start">
        <div className="min-w-0 lg:self-end">
          <p className="t-eyebrow rv">{t('home.mapEyebrow')}</p>
          <h2 id="home-delivery" className="t-h2 rv-clip mt-3">
            {t('home.mapTitle')}
          </h2>
          <p className="t-lead prose-col rv mt-4">{t('home.mapText')}</p>
        </div>

        <div className="min-w-0 lg:col-start-1 lg:row-start-2">
          <ul className="rv-group grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.08]">
            {places.map(({ icon: Icon, name, status, note, gold }) => (
              <li key={name} className="bg-[#0e0f10] p-4">
                <Icon className={`h-5 w-5 ${gold ? 'text-gold' : 'text-silver'}`} aria-hidden="true" />
                <p className="mt-2.5 min-w-0 leading-snug text-cream-muted">
                  <strong className="block text-[0.9375rem] font-semibold text-cream">{name}</strong>
                  <span className={`block text-sm font-semibold ${gold ? 'text-gold-light' : 'text-silver'}`}>{status}</span>
                  <span className="mt-1.5 block text-[0.8125rem]">{note}</span>
                </p>
              </li>
            ))}
          </ul>
          {aeroport && (
            <div className="mt-4">
              <MoreLink href={aeroport}>{t('footer.link.aeroport')}</MoreLink>
            </div>
          )}
        </div>

        {/* La carte illustre la liste : elle est masquée aux lecteurs d'écran. En mobile elle passe avant la liste. */}
        <div className="dmap row-start-2 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:self-center" aria-hidden="true">
          <MapDrawing />
          <p className="dmap-label t-label" style={{ left: '6%', top: '7%', ...range(14, 24) }}>
            {t('home.mapOcean')}
          </p>
          <p className="dmap-label" style={{ right: '61%', top: '30%', textAlign: 'right', ...range(42, 50) }}>
            <strong>{t('home.mapCasa')}</strong>
            <span className="is-gold">{t('home.mapFree')}</span>
          </p>
          <p className="dmap-label" style={{ right: '29.5%', top: '11%', textAlign: 'right', ...range(51, 57) }}>
            <strong>{t('home.mapMohammedia')}</strong>
            <span>{t('home.mapSurcharge')}</span>
          </p>
          <p className="dmap-label" style={{ left: '55.5%', top: '68.5%', ...range(22, 30) }}>
            <strong>{t('home.mapAirport')}</strong>
            <span className="is-gold">{t('home.mapFree')}</span>
          </p>
          <p className="dmap-label" style={{ left: '50%', top: '88.5%', ...range(52, 58) }}>
            <strong>{t('home.mapMarrakech')}</strong>
            <span>{t('home.mapFree')}</span>
          </p>
        </div>
      </div>
    </section>
  );
}
