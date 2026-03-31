'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  Car,
  Users,
  CalendarCheck,
  ClipboardCheck,
  FileText,
  FileSignature,
  TrendingUp,
  Wallet,
  Wrench,
  Receipt,
  ChevronLeft,
  ChevronRight,
  LogOut,
  Settings,
  X,
} from 'lucide-react';
import { signOut } from 'next-auth/react';
import { useUIStore } from '@/stores/uiStore';

interface NavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
  roles?: string[];
  badge?: string;
}

const navItems: NavItem[] = [
  { label: 'Dashboard', href: '/dashboard', icon: <LayoutDashboard size={18} /> },
  { label: 'Véhicules', href: '/vehicules', icon: <Car size={18} /> },
  { label: 'Clients', href: '/clients', icon: <Users size={18} /> },
  { label: 'Réservations', href: '/reservations', icon: <CalendarCheck size={18} /> },
  { label: 'Locations', href: '/locations', icon: <FileText size={18} /> },
  { label: 'Contrats', href: '/contrats', icon: <FileSignature size={18} />, roles: ['admin', 'agent'] },
  { label: 'Factures', href: '/factures', icon: <Receipt size={18} />, roles: ['admin', 'agent', 'comptable'] },
  { label: 'États des lieux', href: '/etat-des-lieux', icon: <ClipboardCheck size={18} />, roles: ['admin', 'agent'] },
  { label: 'Alertes', href: '/alertes', icon: <Wrench size={18} />, roles: ['admin', 'agent', 'comptable'] },
  { label: 'Paiements', href: '/paiements', icon: <Wallet size={18} />, roles: ['admin', 'agent', 'comptable'] },
  { label: 'Dépenses', href: '/depenses', icon: <Receipt size={18} />, roles: ['admin', 'agent', 'comptable'] },
  { label: 'Finances', href: '/finances', icon: <TrendingUp size={18} />, roles: ['admin', 'comptable'] },
  { label: 'Paramètres', href: '/parametres', icon: <Settings size={18} />, roles: ['admin'] },
];

interface SidebarProps {
  userRole?: string;
}

export default function Sidebar({ userRole = 'agent' }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(false);
  const mobileOpen = useUIStore((s) => s.sidebarOpen);
  const setMobileOpen = useUIStore((s) => s.setSidebarOpen);

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname, setMobileOpen]);

  const filteredItems = navItems.filter(
    (item) => !item.roles || item.roles.includes(userRole)
  );

  const isActive = (href: string) => {
    if (href === '/dashboard') return pathname === '/dashboard';
    return pathname.startsWith(href);
  };

  const prefetchByHref = (href: string) => {
    router.prefetch(href);
  };

  return (
    <>
      {/* ── Desktop sidebar ── */}
      <aside
        className={cn(
          'sticky top-0 hidden h-screen shrink-0 flex-col border-r border-white/5 bg-noir-sidebar/90 backdrop-blur-xl transition-all duration-300 md:flex',
          collapsed ? 'w-[88px]' : 'w-[290px]'
        )}
      >
        <div
          className={cn(
            'flex h-24 items-center border-b border-white/5 px-4',
            collapsed ? 'justify-center' : 'justify-between'
          )}
        >
          {!collapsed && (
            <Link href="/dashboard" className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-gold/20 bg-gold/10 text-base font-black text-gold shadow-gold">
                Y
              </div>
              <div>
                <span className="block text-sm font-bold uppercase tracking-[0.28em] text-gold">Yourent</span>
                <span className="block text-xs text-cream-faint">Agence premium</span>
              </div>
            </Link>
          )}
          {collapsed && (
            <Link href="/dashboard">
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl border border-gold/20 bg-gold/10 text-lg font-black text-gold">Y</span>
            </Link>
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="rounded-xl border border-white/5 bg-white/5 p-2 text-cream-faint transition-colors hover:border-gold/20 hover:text-gold"
            aria-label={collapsed ? 'Expandre le menu' : 'Réduire le menu'}
          >
            {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
          </button>
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto overflow-x-hidden px-3 py-5">
          {filteredItems.map((item) => {
            const active = isActive(item.href);
            return (
                <Link
                  key={item.href}
                  href={item.href}
                  title={collapsed ? item.label : undefined}
                  prefetch={false}
                  onMouseEnter={() => prefetchByHref(item.href)}
                  onFocus={() => prefetchByHref(item.href)}
                className={cn(
                  'group flex items-center gap-3 rounded-2xl px-3 py-3 text-sm font-medium transition-all duration-150',
                  active
                    ? 'border border-gold/20 bg-gold/10 text-cream shadow-gold'
                    : 'border border-transparent text-cream-muted hover:border-white/5 hover:bg-white/5 hover:text-cream',
                  collapsed && 'justify-center px-2'
                )}
              >
                <span className={cn('shrink-0 rounded-xl p-2 transition-colors', active ? 'bg-gold/10 text-gold' : 'text-cream-faint group-hover:text-gold')}>
                  {item.icon}
                </span>
                {!collapsed && (
                  <span className="truncate">{item.label}</span>
                )}
                {!collapsed && item.badge && (
                  <span className="ml-auto text-xs bg-red-500 text-white rounded-full px-1.5 py-0.5 min-w-[1.25rem] text-center">
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-white/5 p-3">
          <button
            onClick={() => signOut({ callbackUrl: '/login' })}
            className={cn(
              'flex w-full items-center gap-3 rounded-2xl border border-white/5 px-3 py-3 text-sm font-medium text-cream-faint transition-all duration-150 hover:border-red-500/20 hover:bg-red-500/10 hover:text-red-300',
              collapsed && 'justify-center'
            )}
          >
            <LogOut size={18} className="shrink-0" />
            {!collapsed && <span>Déconnexion</span>}
          </button>
        </div>
      </aside>

      {/* ── Mobile drawer overlay ── */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />
          {/* Panel */}
          <aside className="absolute inset-y-0 left-0 flex w-[290px] animate-slide-in-left flex-col border-r border-white/5 bg-noir-sidebar/95 backdrop-blur-xl">
            <div className="flex h-20 items-center justify-between border-b border-white/5 px-4">
              <Link href="/dashboard" className="flex items-center gap-3" onClick={() => setMobileOpen(false)}>
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-gold/20 bg-gold/10 text-sm font-black text-gold">
                  Y
                </div>
                <span className="text-sm font-bold uppercase tracking-[0.28em] text-gold">Yourent</span>
              </Link>
              <button
                onClick={() => setMobileOpen(false)}
                className="rounded-xl border border-white/5 bg-white/5 p-2 text-cream-faint transition-colors hover:border-gold/20 hover:text-gold"
                aria-label="Fermer le menu"
              >
                <X size={16} />
              </button>
            </div>

            <nav className="flex-1 space-y-1 overflow-y-auto overflow-x-hidden px-3 py-4">
              {filteredItems.map((item) => {
                const active = isActive(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    prefetch={false}
                    className={cn(
                      'group flex items-center gap-3 rounded-2xl px-3 py-3 text-sm font-medium transition-all duration-150',
                      active
                        ? 'border border-gold/20 bg-gold/10 text-cream shadow-gold'
                        : 'border border-transparent text-cream-muted hover:border-white/5 hover:bg-white/5 hover:text-cream'
                    )}
                  >
                    <span className={cn('shrink-0 rounded-xl p-2 transition-colors', active ? 'bg-gold/10 text-gold' : 'text-cream-faint group-hover:text-gold')}>
                      {item.icon}
                    </span>
                    <span className="truncate">{item.label}</span>
                  </Link>
                );
              })}
            </nav>

            <div className="border-t border-white/5 p-3">
              <button
                onClick={() => signOut({ callbackUrl: '/login' })}
                className="flex w-full items-center gap-3 rounded-2xl border border-white/5 px-3 py-3 text-sm font-medium text-cream-faint transition-all duration-150 hover:border-red-500/20 hover:bg-red-500/10 hover:text-red-300"
              >
                <LogOut size={18} className="shrink-0" />
                <span>Déconnexion</span>
              </button>
            </div>
          </aside>
        </div>
      )}
    </>
  );
}
