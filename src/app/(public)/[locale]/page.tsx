import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ARTICLES } from '@/content/blog';
import { t as tr, type Locale } from '@/lib/i18n';
import { isLocale } from '@/lib/i18n/routing';
import { getFleetModels, getFleetStats } from '@/lib/seo/fleet';
import { businessNode, faqNode, jsonLdString, websiteNode } from '@/lib/seo/jsonLd';
import { buildMetadata, samePathAllLocales } from '@/lib/seo/metadata';
import { getRoutePath } from '@/lib/seo/routes';
import { formatArticleDate, readingMinutes } from './blog/blogMeta';
import { DeliverySection } from './_components/home/DeliveryMap';
import { selectHomeModels } from './_components/home/homeData';
import {
  AgencySection,
  BlogTeasers,
  HomeHero,
  LuxuryGallery,
  ProcessSteps,
  StatBand,
  VehicleGridSection,
  WhyCards,
} from './_components/home/HomeSections';
import { LuxuryShowcase, showcaseFromFleet } from './_components/home/LuxuryShowcase';
import { LandingGuideSection } from './_components/landing/LandingGuideSection';
import { CtaBand, Faq, MoreLink } from './_components/ui/PageParts';

type Props = { params: Promise<{ locale: string }> };

/**
 * Titre et description de l'accueil, qui porte les recherches générales (« location voiture Casablanca »,
 * « rent a car Casablanca », « كراء السيارات الدار البيضاء »). L'aéroport a sa propre page : il ne figure
 * donc plus dans le titre, seulement dans la description.
 */
const HOME_META: Record<Locale, { title: (minPrice: number) => string; description: (minPrice: number) => string }> = {
  fr: {
    // Sans prix connu (base injoignable), le titre garde le mot-clé et l'argument de la livraison.
    title: (minPrice) =>
      minPrice > 0
        ? `Location voiture Casablanca dès ${minPrice} DH/jour | Agence Yourent`
        : 'Location voiture Casablanca, livraison gratuite | Yourent',
    description: (minPrice) =>
      `Agence de location de voitures à Casablanca (Maroc) : citadines, SUV, Mercedes, Porsche dès ${minPrice} DH/jour. Livraison gratuite en ville et à l’aéroport.`,
  },
  en: {
    title: () => 'Car Rental Casablanca: Rent a Car, Free Delivery | Yourent',
    description: (minPrice) =>
      `Rent a car in Casablanca from ${minPrice} MAD/day: city cars, SUVs, Mercedes, Porsche. Car hire with free delivery to your hotel or Mohammed V airport.`,
  },
  ar: {
    title: () => 'كراء وتأجير السيارات في الدار البيضاء بتوصيل مجاني | Yourent',
    description: (minPrice) =>
      `وكالة تأجير السيارات في الدار البيضاء من ${minPrice} درهم في اليوم: سيارات مدينة وSUV ومرسيدس وبورش، مع توصيل مجاني داخل المدينة وإلى المطار وحجز عبر الإنترنت.`,
  },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const stats = await getFleetStats();
  return buildMetadata({
    locale,
    paths: samePathAllLocales('/'),
    title: HOME_META[locale].title(stats.minPrice),
    description: HOME_META[locale].description(stats.minPrice),
  });
}

export const revalidate = 300;

/**
 * Accueil, entièrement rendu côté serveur : seuls la recherche par dates, les flèches de la galerie
 * de luxe et la carte Google (au clic) sont des îlots client.
 *
 * L'ordre raconte la location comme une suite de scènes, le luxe en premier :
 * haut de page → vitrine épinglée (3 modèles) → galerie de luxe → chiffres → carte de livraison →
 * 3 étapes → économiques → berlines et SUV → engagements → guide en cartes → blog → agence → FAQ → appel final.
 * Tout le mouvement est en CSS, piloté par le défilement (src/app/site-motion.css) : chaque section entre
 * puis recule selon sa variante (classes scene-*), les photos sont déclarées dans home/showcaseData.ts.
 */
export default async function PublicHomePage({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const [stats, models] = await Promise.all([getFleetStats(), getFleetModels()]);
  const { showcase, luxury, economic, sedans, newArrivalSlug } = selectHomeModels(models);
  const t = (key: string) => tr(locale, key);
  const luxePath = getRoutePath('luxe', locale) ?? '/catalogue';

  const faqItems = Array.from({ length: 6 }, (_, index) => ({
    q: t(`faq.q${index + 1}`),
    a: t(`faq.a${index + 1}`),
  }));

  /* Le blog n'existe qu'en français : les trois articles mis à jour le plus récemment. */
  const articles =
    locale === 'fr'
      ? [...ARTICLES]
          .sort((a, b) => b.dateModified.localeCompare(a.dateModified))
          .slice(0, 3)
          .map((article) => ({
            slug: article.slug,
            title: article.h1,
            excerpt: article.excerpt,
            meta: `${formatArticleDate(article.dateModified)} · ${t('ui.readingTime').replace('{count}', String(readingMinutes(article)))}`,
          }))
      : [];

  const jsonLd = jsonLdString([
    websiteNode(locale),
    businessNode(locale, stats),
    faqNode(locale, faqItems, '/'),
  ]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <HomeHero locale={locale} minPrice={stats.minPrice} />
      <LuxuryShowcase
        locale={locale}
        id="home-luxe"
        eyebrow={t('home.showEyebrow')}
        title={t('home.luxeTitle')}
        action={<MoreLink href={luxePath}>{t('home.luxeAll')}</MoreLink>}
        models={showcase.map((model) => showcaseFromFleet(model, locale))}
      />
      <LuxuryGallery locale={locale} models={luxury} newArrivalSlug={newArrivalSlug} />
      <StatBand locale={locale} minPrice={stats.minPrice} />
      <DeliverySection locale={locale} />
      <ProcessSteps locale={locale} />
      <VehicleGridSection
        locale={locale}
        id="home-eco"
        eyebrow={t('eco.eyebrow')}
        title={t('eco.title')}
        text={t('eco.subtitle')}
        more={{ href: getRoutePath('economique', locale) ?? '/catalogue', label: t('footer.link.economique') }}
        models={economic}
        scene="scene scene-tilt cv-auto"
      />
      <VehicleGridSection
        locale={locale}
        id="home-sedans"
        eyebrow={t('signature.eyebrow')}
        title={t('signature.title')}
        text={t('signature.subtitle')}
        more={{ href: '/catalogue', label: t('home.seeAll') }}
        models={sedans}
        scene="scene scene-zoom scene-rule cv-auto"
      />
      <div className="cv-auto scene scene-curtain">
        <WhyCards locale={locale} vehicleCount={stats.vehicleCount} />
      </div>
      <div className="cv-auto scene scene-rule">
        <LandingGuideSection locale={locale} stats={stats} models={models} />
      </div>
      {articles.length > 0 && (
        <div className="cv-auto scene scene-zoom">
          <BlogTeasers locale={locale} articles={articles} />
        </div>
      )}
      <div className="cv-auto scene scene-tilt">
        <AgencySection locale={locale} />
      </div>
      <div className="sec cv-auto scene">
        <div className="lux-container">
          <Faq id="faq" headingId="home-faq" title={t('faq.title')} items={faqItems} openFirst={false} />
        </div>
      </div>
      <CtaBand locale={locale} minPrice={stats.minPrice} />
    </>
  );
}
