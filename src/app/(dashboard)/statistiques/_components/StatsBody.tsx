import { VISIT_RETENTION_DAYS } from '@/lib/tracking/ingest';
import {
  formatDuration,
  pageLabel,
  type BreakdownRow,
  type ResolvedPeriod,
  type SiteStats,
  type VisitFilter,
} from '@/lib/tracking/stats';
import type { RecentVisits as RecentVisitsData } from '@/services/siteStatsService';
import {
  Clock,
  Eye,
  Megaphone,
  MessageCircle,
  PhoneCall,
  Send,
  Sparkles,
  Users,
} from 'lucide-react';
import { DevicesChart, FunnelChart, SeriesChart, SourcesChart } from './StatsCharts';
import { RecentVisits } from './RecentVisits';
import { Muted, Panel, StatTile, StatsTable, fmtNumber, fmtPercent, type Column } from './StatsUi';

/* Contenu de la page Statistiques (rendu côté serveur, graphiques Recharts côté navigateur). */

const breakdownColumns = (first: string): Column<BreakdownRow>[] => [
  { header: first, cell: (row) => row.label },
  { header: 'Visites', cell: (row) => fmtNumber(row.visits), align: 'right' },
  { header: 'Part', cell: (row) => fmtPercent(row.share), align: 'right' },
  { header: 'Contacts', cell: (row) => fmtNumber(row.contacts), align: 'right' },
  { header: 'Demandes', cell: (row) => fmtNumber(row.submissions), align: 'right' },
];

function PageTitle({ path }: { path: string }) {
  return (
    <span className="block max-w-[12rem] truncate sm:max-w-[18rem]" title={path}>
      {pageLabel(path)}
    </span>
  );
}

export function StatsBody({
  stats,
  visits,
  period,
  filter,
  hrefFor,
}: {
  stats: SiteStats;
  visits: RecentVisitsData;
  period: ResolvedPeriod;
  filter: VisitFilter;
  hrefFor: (params: { vf?: VisitFilter; vp?: number }) => string;
}) {
  const { totals } = stats;
  const nothing = totals.visits === 0;

  return (
    <>
      {nothing && (
        <div className="rounded-[24px] border border-gold/20 bg-gold/5 p-4 text-sm text-cream-muted">
          Aucune visite enregistrée sur cette période. La collecte fonctionne sur le site en production
          (yourent.ma) ; les visites de robots et les navigateurs automatisés sont écartés.
        </div>
      )}

      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        <StatTile label="Visites" value={fmtNumber(totals.visits)} hint={`Rebond ${fmtPercent(totals.bounceRate)} · ${formatDuration(totals.avgDuration)} en moyenne`} icon={<Users size={18} />} />
        <StatTile label="Pages vues" value={fmtNumber(totals.pageviews)} hint={`${totals.pagesPerVisit.toLocaleString('fr-FR')} page(s) par visite`} icon={<Eye size={18} />} />
        <StatTile label="Venus de Google Ads" value={fmtNumber(totals.adsVisits)} hint={`${fmtPercent(totals.visits ? Math.round((totals.adsVisits / totals.visits) * 1000) / 10 : 0)} des visites`} icon={<Megaphone size={18} />} />
        <StatTile label="Taux de contact" value={fmtPercent(totals.contactRate)} hint={`${fmtNumber(totals.contactVisits)} visite(s) avec WhatsApp, appel ou demande`} icon={<Sparkles size={18} />} accent />
        <StatTile label="Clics WhatsApp" value={fmtNumber(totals.whatsappClicks)} hint={`${fmtNumber(totals.whatsappVisits)} visite(s)`} icon={<MessageCircle size={18} />} />
        <StatTile label="Clics appel" value={fmtNumber(totals.callClicks)} hint={`${fmtNumber(totals.callVisits)} visite(s)`} icon={<PhoneCall size={18} />} />
        <StatTile label="Demandes envoyées" value={fmtNumber(totals.submissions)} hint={`${fmtNumber(totals.formsStarted)} formulaire(s) commencé(s)`} icon={<Send size={18} />} accent />
        <StatTile label="Durée moyenne" value={formatDuration(totals.avgDuration)} hint="Temps passé, onglet visible" icon={<Clock size={18} />} />
      </div>

      <Panel
        title={period.granularity === 'hour' ? "Évolution heure par heure" : 'Évolution jour par jour'}
        description="Visites, pages vues, visites Google Ads, visites avec contact et demandes envoyées."
      >
        <SeriesChart data={stats.series} granularity={period.granularity} />
      </Panel>

      <div className="grid gap-6 2xl:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]">
        <Panel title="D'où viennent les visiteurs" description="Visites par origine (calculée à l'arrivée sur le site).">
          <SourcesChart rows={stats.sources} />
        </Panel>
        <Panel title="Origines : visites, contacts, demandes" description="Contact = visite avec un clic WhatsApp, un appel ou une demande envoyée.">
          <StatsTable
            rows={stats.sources}
            rowKey={(row) => row.key}
            columns={[
              { header: 'Origine', cell: (row) => row.label },
              { header: 'Visites', cell: (row) => fmtNumber(row.visits), align: 'right' },
              { header: 'WhatsApp', cell: (row) => fmtNumber(row.whatsapp), align: 'right' },
              { header: 'Appels', cell: (row) => fmtNumber(row.calls), align: 'right' },
              { header: 'Demandes', cell: (row) => fmtNumber(row.submissions), align: 'right' },
              { header: 'Taux de contact', cell: (row) => fmtPercent(row.contactRate), align: 'right' },
            ]}
          />
        </Panel>
      </div>

      {stats.campaigns.length > 0 && (
        <Panel title="Campagnes" description="Paramètres utm_* des liens, ou identifiant de campagne Google Ads (gad_campaignid).">
          <StatsTable
            rows={stats.campaigns}
            rowKey={(row) => row.key}
            columns={[
              { header: 'Origine', cell: (row) => row.source },
              { header: 'Source', cell: (row) => row.utmSource },
              { header: 'Support', cell: (row) => row.medium },
              { header: 'Campagne', cell: (row) => <span className="break-all">{row.campaign}</span> },
              { header: 'Visites', cell: (row) => fmtNumber(row.visits), align: 'right' },
              { header: 'Contacts', cell: (row) => fmtNumber(row.contacts), align: 'right' },
              { header: 'Demandes', cell: (row) => fmtNumber(row.submissions), align: 'right' },
              { header: 'Taux', cell: (row) => fmtPercent(row.contactRate), align: 'right' },
            ]}
          />
        </Panel>
      )}

      <Panel
        title="Parcours de réservation"
        description="Visites ayant atteint chaque étape, et visites perdues depuis l'étape précédente."
      >
        <div className="grid gap-6 2xl:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
          <FunnelChart steps={stats.funnel} />
          <StatsTable
            rows={stats.funnel}
            rowKey={(row) => row.key}
            columns={[
              { header: 'Étape', cell: (row) => row.label },
              { header: 'Visites', cell: (row) => fmtNumber(row.count), align: 'right' },
              { header: 'Des visites', cell: (row) => fmtPercent(row.ofVisits), align: 'right' },
              {
                header: 'Perte',
                cell: (row) => (row.key === 'visits' ? <Muted>—</Muted> : `−${fmtNumber(row.lost)} (${fmtPercent(row.lostRate)})`),
                align: 'right',
              },
            ]}
          />
        </div>
      </Panel>

      <div className="grid gap-6 2xl:grid-cols-2">
        <Panel title="Pages d'entrée" description="Première page vue de la visite.">
          <StatsTable
            rows={stats.entries}
            rowKey={(row) => row.key}
            columns={[
              { header: 'Page', cell: (row) => <PageTitle path={row.path} /> },
              { header: 'Visites', cell: (row) => fmtNumber(row.visits), align: 'right' },
              { header: 'Rebond', cell: (row) => fmtPercent(row.bounceRate), align: 'right' },
              { header: 'Contacts', cell: (row) => fmtNumber(row.contacts), align: 'right' },
              { header: 'Demandes', cell: (row) => fmtNumber(row.submissions), align: 'right' },
            ]}
          />
        </Panel>
        <Panel title="Pages de sortie" description="Dernière page vue avant de quitter le site. Taux de sortie = sorties / vues de la page.">
          <StatsTable
            rows={stats.exits}
            rowKey={(row) => row.path}
            columns={[
              { header: 'Page', cell: (row) => <PageTitle path={row.path} /> },
              { header: 'Sorties', cell: (row) => fmtNumber(row.exits), align: 'right' },
              { header: 'Taux de sortie', cell: (row) => fmtPercent(row.exitRate), align: 'right' },
              { header: 'Durée moy.', cell: (row) => formatDuration(row.avgDuration), align: 'right' },
              { header: 'Défilement', cell: (row) => (row.avgScroll === null ? '—' : `${row.avgScroll} %`), align: 'right' },
            ]}
          />
        </Panel>
      </div>

      <Panel title="Pages les plus vues" description="Vues, durée moyenne (onglet visible) et défilement moyen.">
        <StatsTable
          rows={stats.pages}
          rowKey={(row) => row.path}
          columns={[
            { header: 'Page', cell: (row) => <PageTitle path={row.path} /> },
            { header: 'Vues', cell: (row) => fmtNumber(row.views), align: 'right' },
            { header: 'Durée moy.', cell: (row) => formatDuration(row.avgDuration), align: 'right' },
            { header: 'Défilement', cell: (row) => (row.avgScroll === null ? '—' : `${row.avgScroll} %`), align: 'right' },
            { header: 'Sorties', cell: (row) => fmtPercent(row.exitRate), align: 'right' },
          ]}
        />
      </Panel>

      <div className="grid gap-6 2xl:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
        <Panel title="Où ils cliquent" description="Les 20 clics les plus fréquents : quoi, vers quoi, sur quelle page.">
          <StatsTable
            rows={stats.clicks}
            rowKey={(row, index) => `${row.kind}-${row.target}-${row.page}-${index}`}
            columns={[
              { header: 'Clic', cell: (row) => row.kindLabel },
              { header: 'Cible', cell: (row) => <span className="break-all">{row.target || '—'}</span> },
              { header: 'Page', cell: (row) => <PageTitle path={row.page} /> },
              { header: 'Clics', cell: (row) => fmtNumber(row.count), align: 'right' },
            ]}
          />
        </Panel>
        <Panel title="Toutes les actions" description="Nombre d'actions et de visites concernées.">
          <StatsTable
            rows={stats.actions}
            rowKey={(row) => row.kind}
            columns={[
              { header: 'Action', cell: (row) => row.label },
              { header: 'Nombre', cell: (row) => fmtNumber(row.count), align: 'right' },
              { header: 'Visites', cell: (row) => fmtNumber(row.visits), align: 'right' },
            ]}
          />
        </Panel>
      </div>

      <Panel title="Voitures les plus consultées" description="Vues de la fiche, clics vers la fiche (cartes, boutons Réserver), formulaires commencés et demandes.">
        <StatsTable
          rows={stats.vehicles}
          rowKey={(row) => row.slug}
          columns={[
            { header: 'Modèle', cell: (row) => row.slug },
            { header: 'Vues', cell: (row) => fmtNumber(row.views), align: 'right' },
            { header: 'Visites', cell: (row) => fmtNumber(row.visits), align: 'right' },
            { header: 'Clics', cell: (row) => fmtNumber(row.clicks), align: 'right' },
            { header: 'Formulaires', cell: (row) => fmtNumber(row.forms), align: 'right' },
            { header: 'Demandes', cell: (row) => fmtNumber(row.submissions), align: 'right' },
          ]}
        />
      </Panel>

      <div className="grid gap-6 2xl:grid-cols-2">
        <Panel title="Appareils">
          <div className="space-y-5">
            <DevicesChart rows={stats.devices} />
            <StatsTable rows={stats.devices} rowKey={(row) => row.key} columns={breakdownColumns('Appareil')} />
          </div>
        </Panel>
        <Panel title="Langues" description="Langue du site à l'arrivée, puis langue du navigateur.">
          <div className="space-y-5">
            <StatsTable rows={stats.langs} rowKey={(row) => row.key} columns={breakdownColumns('Langue du site')} />
            <StatsTable rows={stats.browserLangs} rowKey={(row) => row.key} columns={breakdownColumns('Langue du navigateur')} />
          </div>
        </Panel>
      </div>

      <div className="grid gap-6 2xl:grid-cols-2">
        <Panel title="Pays" description="D'après l'adresse IP (localisation fournie par l'hébergeur).">
          <StatsTable rows={stats.countries} rowKey={(row) => row.key} columns={breakdownColumns('Pays')} />
        </Panel>
        <Panel title="Villes" description="Localisation approximative de l'adresse IP.">
          <StatsTable rows={stats.cities} rowKey={(row) => row.key} columns={breakdownColumns('Ville')} />
        </Panel>
      </div>

      <Panel
        id="visites"
        title="Visites récentes"
        description={`Du plus récent au plus ancien, 50 par page. Cliquer sur une visite pour voir son parcours. Données conservées ${VISIT_RETENTION_DAYS} jours.`}
      >
        <RecentVisits data={visits} filter={filter} hrefFor={hrefFor} />
      </Panel>
    </>
  );
}
