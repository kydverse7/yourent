import type { PipelineStage } from 'mongoose';
import { connectDB } from '@/lib/db';
import { SiteVisit, type ISiteVisit } from '@/models/SiteVisit';
import {
  VISITS_PAGE_SIZE,
  buildStatsPipeline,
  shapeStats,
  toVisitRow,
  visitsFilter,
  type RawStats,
  type ResolvedPeriod,
  type SiteStats,
  type VisitFilter,
  type VisitRow,
} from '@/lib/tracking/stats';

/**
 * Lecture seule des visites du site public pour la page Statistiques du back-office.
 * Aucune écriture : agrégation de la période et liste paginée des visites.
 */

const EMPTY_RAW: RawStats = {
  totals: [],
  funnel: [],
  sources: [],
  campaigns: [],
  entries: [],
  pages: [],
  clicks: [],
  actions: [],
  vehicleViews: [],
  vehicleActions: [],
  devices: [],
  countries: [],
  cities: [],
  langs: [],
  browserLangs: [],
  series: [],
};

export async function getSiteStats(period: ResolvedPeriod): Promise<SiteStats> {
  await connectDB();
  const [raw] = await SiteVisit.aggregate<RawStats>(buildStatsPipeline(period) as unknown as PipelineStage[]).allowDiskUse(true);
  return shapeStats({ ...EMPTY_RAW, ...(raw ?? {}) }, period);
}

export interface RecentVisits {
  rows: VisitRow[];
  total: number;
  page: number;
  pages: number;
  pageSize: number;
}

export async function getRecentVisits(period: ResolvedPeriod, filter: VisitFilter, page: number): Promise<RecentVisits> {
  await connectDB();
  const query = visitsFilter(period, filter);
  const total = await SiteVisit.countDocuments(query);
  const pages = Math.max(1, Math.ceil(total / VISITS_PAGE_SIZE));
  const current = Math.min(page, pages);
  const docs = await SiteVisit.find(query)
    .sort({ at: -1 })
    .skip((current - 1) * VISITS_PAGE_SIZE)
    .limit(VISITS_PAGE_SIZE)
    .lean<ISiteVisit[]>();
  return { rows: docs.map(toVisitRow), total, page: current, pages, pageSize: VISITS_PAGE_SIZE };
}
