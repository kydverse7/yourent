import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { ChartColumn, MousePointerClick } from 'lucide-react';
import { auth } from '@/lib/auth';
import {
  PERIOD_KEYS,
  PERIOD_LABELS,
  parsePage,
  parsePeriod,
  parseVisitFilter,
  resolvePeriod,
  type PeriodKey,
  type VisitFilter,
} from '@/lib/tracking/stats';
import { getRecentVisits, getSiteStats } from '@/services/siteStatsService';
import { StatsBody } from './_components/StatsBody';
import { PillLink } from './_components/StatsUi';

export const metadata: Metadata = { title: 'Statistiques' };
export const dynamic = 'force-dynamic';

type SearchParams = Record<string, string | string[] | undefined>;

export default async function StatistiquesPage({ searchParams }: { searchParams: Promise<SearchParams> }) {
  const session = await auth();
  if (!session) redirect('/login');
  /* Adresses IP et parcours des visiteurs : réservé au gérant (administrateur). */
  if (session.user.role !== 'admin') redirect('/dashboard');

  const params = await searchParams;
  const periodKey = parsePeriod(params.p);
  const period = resolvePeriod(periodKey, new Date());
  const filter = parseVisitFilter(params.vf);
  const page = parsePage(params.vp);

  const hrefFor = ({ p = periodKey, vf = filter, vp = 1 }: { p?: PeriodKey; vf?: VisitFilter; vp?: number }) => {
    const query = new URLSearchParams();
    if (p !== '7') query.set('p', p);
    if (vf !== 'all') query.set('vf', vf);
    if (vp > 1) query.set('vp', String(vp));
    const qs = query.toString();
    return `/statistiques${qs ? `?${qs}` : ''}`;
  };

  /* Lecture des données d'abord ; le rendu se fait hors du try/catch. */
  const data = await Promise.all([getSiteStats(period), getRecentVisits(period, filter, page)]).catch((error: unknown) => {
    console.error('[statistiques] lecture impossible', error);
    return null;
  });

  return (
    <div className="space-y-8 animate-slide-up">
      <div className="lux-page-head">
        <div>
          <span className="lux-eyebrow mb-3">
            <ChartColumn className="h-3.5 w-3.5" /> audience du site
          </span>
          <h1 className="text-3xl font-bold text-cream">Statistiques</h1>
          <p className="mt-2 text-sm text-cream-muted">
            Mesure maison du site yourent.ma : origine des visiteurs, pages, clics et parcours jusqu&apos;à la demande.
          </p>
        </div>
        <nav aria-label="Période" className="flex flex-wrap gap-2">
          {PERIOD_KEYS.map((key) => (
            <PillLink key={key} href={hrefFor({ p: key, vf: filter, vp: 1 })} active={key === periodKey}>
              {PERIOD_LABELS[key]}
            </PillLink>
          ))}
        </nav>
      </div>

      {data ? (
        <StatsBody
          stats={data[0]}
          visits={data[1]}
          period={period}
          filter={filter}
          hrefFor={(next) => `${hrefFor({ vf: next.vf, vp: next.vp })}#visites`}
        />
      ) : (
        <div className="rounded-[24px] border border-red-500/20 bg-red-500/5 p-4 text-sm text-red-300">
          Impossible de lire les statistiques pour le moment. Réessayez dans quelques instants.
        </div>
      )}

      <p className="flex items-center gap-2 text-xs text-cream-faint">
        <MousePointerClick className="h-3.5 w-3.5" />
        Sans cookie : une visite correspond à un onglet (elle se termine après 30 minutes d&apos;inactivité). Votre propre
        appareil peut être exclu en ouvrant une fois le site avec ?yourent_notrack=1 (et ?yourent_notrack=0 pour revenir).
      </p>
    </div>
  );
}
