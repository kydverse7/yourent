import { localePath } from '@/lib/i18n/routing';
import { t as tr, type Locale } from '@/lib/i18n/translations';
import { getRoutePath, type SeoRouteKey } from '@/lib/seo/routes';

/**
 * Bandeau des marques de la flotte, en bas du haut de page de l'accueil.
 *
 * - Défilement continu en CSS pur : la liste est suivie d'une copie (aria-hidden, liens hors tabulation),
 *   la piste glisse de la moitié de sa largeur puis recommence (site-motion.css, .marquee).
 * - Pause au survol et au clavier ; sens inversé en arabe ; immobile (ligne centrée qui passe à la ligne)
 *   avec prefers-reduced-motion.
 * - Chaque marque mène à sa page (registre des routes) ou, à défaut, au catalogue filtré par marque :
 *   simples <a> rendus par le serveur (20 liens avec la copie), rien à hydrater dans le navigateur.
 * - Logos simple-icons (CC0) dans un seul fichier SVG statique, /brand-logos.svg (sources en tête du fichier),
 *   appelé par <use> : rien dans le HTML ni dans le JavaScript de la page, un fichier de 10 Ko mis en cache.
 *   Marques absentes de simple-icons : leur nom en capitales espacées.
 */
const SPRITE = '/brand-logos.svg?v=2';
type BrandLogoKey = 'porsche' | 'volkswagen' | 'audi' | 'kia' | 'toyota' | 'dacia' | 'fiat' | 'opel';

/** Largeur / hauteur de chaque logo (cadre resserré du fichier SVG). */
const LOGO_RATIO: Record<BrandLogoKey, number> = {
  porsche: 0.78,
  volkswagen: 1,
  audi: 2.89,
  kia: 4.21,
  toyota: 1.47,
  dacia: 3.58,
  fiat: 1,
  opel: 1.61,
};

type Brand = {
  key: string;
  name: string;
  logo?: BrandLogoKey;
  /** Page marque du registre des routes. */
  route?: SeoRouteKey;
  /** Valeur du filtre ?marque= du catalogue. */
  filter: string;
};

const BRANDS: Brand[] = [
  { key: 'porsche', name: 'Porsche', logo: 'porsche', route: 'porsche', filter: 'porsche' },
  { key: 'range-rover', name: 'Range Rover', route: 'range-rover', filter: 'range rover' },
  { key: 'mercedes', name: 'Mercedes-Benz', route: 'mercedes', filter: 'mercedes' },
  { key: 'audi', name: 'Audi', logo: 'audi', route: 'audi', filter: 'audi' },
  { key: 'volkswagen', name: 'Volkswagen', logo: 'volkswagen', route: 'volkswagen', filter: 'volkswagen' },
  { key: 'kia', name: 'Kia', logo: 'kia', filter: 'kia' },
  { key: 'toyota', name: 'Toyota', logo: 'toyota', filter: 'toyota' },
  { key: 'dacia', name: 'Dacia', logo: 'dacia', filter: 'dacia' },
  { key: 'fiat', name: 'Fiat', logo: 'fiat', filter: 'fiat' },
  { key: 'opel', name: 'Opel', logo: 'opel', filter: 'opel' },
];

function hrefFor(brand: Brand, locale: Locale) {
  const page = brand.route ? getRoutePath(brand.route, locale) : undefined;
  return localePath(locale, page ?? `/catalogue?marque=${encodeURIComponent(brand.filter)}`);
}

/** Logo (nom lu par les lecteurs d'écran) ou, à défaut de logo, le nom écrit en capitales espacées. */
function BrandMark({ brand }: { brand: Brand }) {
  if (!brand.logo) return <span className="marquee-word">{brand.name}</span>;
  /* Même surface pour tous les logos (taille optique homogène) : largeur √r em, hauteur 1/√r em. */
  const ratio = LOGO_RATIO[brand.logo];
  const style = { width: `${Math.sqrt(ratio).toFixed(3)}em`, height: `${(1 / Math.sqrt(ratio)).toFixed(3)}em` };
  return (
    <>
      <svg className="marquee-logo" style={style} aria-hidden="true" focusable="false">
        <use href={`${SPRITE}#${brand.logo}`} />
      </svg>
      <span className="sr-only">{brand.name}</span>
    </>
  );
}

function BrandList({ locale, copy }: { locale: Locale; copy: boolean }) {
  const label = tr(locale, 'home.brandsAria');
  return (
    <ul className="marquee-list" {...(copy ? { 'aria-hidden': true } : { 'aria-label': label })}>
      {BRANDS.map((brand) => (
        <li key={brand.key}>
          <a href={hrefFor(brand, locale)} className="marquee-item" {...(copy ? { tabIndex: -1 } : {})}>
            <BrandMark brand={brand} />
          </a>
        </li>
      ))}
    </ul>
  );
}

export function BrandMarquee({ locale }: { locale: Locale }) {
  return (
    <div className="marquee">
      <div className="marquee-track">
        <BrandList locale={locale} copy={false} />
        <BrandList locale={locale} copy />
      </div>
    </div>
  );
}
