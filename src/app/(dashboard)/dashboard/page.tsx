import { Metadata } from 'next';
import { Suspense } from 'react';
import DashboardStats from './_components/DashboardStats';
import DashboardAlerts from './_components/DashboardAlerts';
import { SkeletonCard } from '@/components/ui';

export const metadata: Metadata = { title: 'Dashboard' };
export const dynamic = 'force-dynamic';
export const revalidate = 60;

export default function DashboardPage() {
  return (
    <div className="space-y-8 animate-slide-up">
      <div className="lux-page-head">
        <div>
          <span className="lux-eyebrow mb-3">Vision agence</span>
          <h1 className="text-3xl font-bold text-cream md:text-4xl">Vue d'ensemble</h1>
          <p className="mt-2 text-sm text-cream-muted md:text-base">
          Tableau de bord de votre agence — données en temps réel
        </p>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="lux-panel-muted px-4 py-3">
            <p className="text-xs uppercase tracking-[0.18em] text-cream-faint">Style</p>
            <p className="mt-1 text-sm font-medium text-cream">Cockpit noir & or homogène</p>
          </div>
          <div className="lux-panel-muted px-4 py-3">
            <p className="text-xs uppercase tracking-[0.18em] text-cream-faint">Rythme</p>
            <p className="mt-1 text-sm font-medium text-cream">Pilotage instantané</p>
          </div>
        </div>
      </div>

      <Suspense
        fallback={
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        }
      >
        <DashboardStats />
      </Suspense>

      <Suspense fallback={<SkeletonCard />}>
        <DashboardAlerts />
      </Suspense>
    </div>
  );
}
