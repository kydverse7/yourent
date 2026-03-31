'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Bell, Search, ChevronRight, CalendarDays, Menu } from 'lucide-react';
import { cn, getInitials } from '@/lib/utils';
import { useUIStore } from '@/stores/uiStore';

interface HeaderProps {
  userName?: string;
  userRole?: string;
  userAvatar?: string;
}

const BREADCRUMB_MAP: Record<string, string> = {
  dashboard: 'Dashboard',
  vehicules: 'Véhicules',
  clients: 'Clients',
  reservations: 'Réservations',
  locations: 'Locations',
  finances: 'Finances',
  nouveau: 'Nouveau',
  modifier: 'Modifier',
};

function Breadcrumb() {
  const pathname = usePathname();
  const segments = pathname.split('/').filter(Boolean);

  return (
    <nav className="flex items-center gap-1.5 text-sm" aria-label="Fil d'Ariane">
      {segments.map((segment, index) => {
        const isLast = index === segments.length - 1;
        const label = BREADCRUMB_MAP[segment] ?? segment;
        const href = '/' + segments.slice(0, index + 1).join('/');

        return (
          <span key={href} className="flex items-center gap-1.5">
            {index > 0 && <ChevronRight size={14} className="text-cream-faint" aria-hidden />}
            {isLast ? (
              <span className="font-medium text-gold">{label}</span>
            ) : (
              <Link href={href} className="text-cream-faint transition-colors hover:text-cream-muted">
                {label}
              </Link>
            )}
          </span>
        );
      })}
    </nav>
  );
}

export default function Header({ userName = 'Utilisateur', userRole = 'agent', userAvatar }: HeaderProps) {
  const toggleSidebar = useUIStore((s) => s.toggleSidebar);
  const ROLE_LABELS: Record<string, string> = {
    admin: 'Administrateur',
    agent: 'Agent',
    comptable: 'Comptable',
  };

  const today = new Intl.DateTimeFormat('fr-MA', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  }).format(new Date());

  return (
    <header className={cn('sticky top-0 z-30 border-b border-white/5 bg-noir-root/70 backdrop-blur-xl')}>
      <div className="flex min-h-20 items-center justify-between gap-4 px-4 md:px-6 lg:px-8">
        <div className="flex items-center gap-3 min-w-0">
          {/* Mobile hamburger */}
          <button
            onClick={toggleSidebar}
            className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/8 bg-white/5 text-cream-faint transition-all hover:border-gold/20 hover:text-gold md:hidden"
            aria-label="Menu"
          >
            <Menu size={18} />
          </button>
          <div className="min-w-0 space-y-2">
          <div className="hidden items-center gap-3 md:flex">
            <span className="flex items-center gap-2 text-xs text-cream-faint">
              <CalendarDays className="h-3.5 w-3.5 text-gold" />
              {today}
            </span>
          </div>

          <Breadcrumb />
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            className="hidden items-center gap-2 rounded-full border border-white/8 bg-white/5 px-4 py-2 text-sm text-cream-faint transition-all hover:border-gold/20 hover:text-cream lg:flex"
            aria-label="Recherche globale"
          >
            <Search size={14} />
            <span>Recherche rapide</span>
            <kbd className="rounded-full border border-white/10 bg-black/20 px-2 py-0.5 text-[11px] font-mono text-cream-faint">
              Ctrl K
            </kbd>
          </button>

          <button
            className="relative flex h-11 w-11 items-center justify-center rounded-2xl border border-white/8 bg-white/5 text-cream-faint transition-all hover:border-gold/20 hover:text-gold"
            aria-label="Notifications"
          >
            <Bell size={16} />
            <span className="absolute right-3 top-3 h-2 w-2 rounded-full bg-gold shadow-gold" />
          </button>

          <div className="flex items-center gap-3 rounded-full border border-white/8 bg-white/5 px-2 py-1.5">
            <div className="hidden flex-col items-end sm:flex">
              <span className="text-sm font-medium leading-none text-cream">{userName}</span>
              <span className="mt-1 text-xs text-cream-faint">{ROLE_LABELS[userRole] ?? userRole}</span>
            </div>
            <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border border-gold/30 bg-gold/10">
              {userAvatar ? (
                <img src={userAvatar} alt={userName} className="h-full w-full object-cover" />
              ) : (
                <span className="text-sm font-bold text-gold">{getInitials(userName)}</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
