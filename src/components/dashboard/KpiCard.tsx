'use client';

import React from 'react';
import { cn, formatCurrency, formatNumber } from '@/lib/utils';
import {
  TrendingUp,
  TrendingDown,
  Minus,
  Car,
  Users,
  MapPin,
  DollarSign,
  Calendar,
  Activity,
} from 'lucide-react';
import { Skeleton } from '@/components/ui';

const ICON_MAP = {
  car: Car,
  users: Users,
  mapPin: MapPin,
  dollarSign: DollarSign,
  calendar: Calendar,
  activity: Activity,
  trendingUp: TrendingUp,
} as const;

type IconName = keyof typeof ICON_MAP;

export interface KpiCardProps {
  title: string;
  value: number | string;
  format?: 'currency' | 'number' | 'percent' | 'text';
  trend?: number; // % de variation (positif = hausse, négatif = baisse)
  trendLabel?: string;
  icon?: React.ElementType;
  iconName?: IconName;
  subtitle?: string;
  loading?: boolean;
  className?: string;
  invertTrend?: boolean; // true = une hausse est mauvaise (ex: dépenses)
}

export default function KpiCard({
  title,
  value,
  format = 'number',
  trend,
  trendLabel,
  icon,
  iconName,
  subtitle,
  loading,
  className,
  invertTrend = false,
}: KpiCardProps) {
  function formatValue(v: number | string): string {
    if (typeof v === 'string') return v;
    switch (format) {
      case 'currency':
        return formatCurrency(v);
      case 'percent':
        return `${v.toFixed(1)}%`;
      case 'number':
        return formatNumber(v);
      default:
        return String(v);
    }
  }

  const trendPositive =
    trend !== undefined ? (invertTrend ? trend < 0 : trend > 0) : null;

  const ResolvedIcon = icon ?? (iconName ? ICON_MAP[iconName] : undefined);

  if (loading) {
    return (
      <div className={cn('kpi-card space-y-3', className)}>
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-9 w-32" />
        <Skeleton className="h-3 w-20" />
      </div>
    );
  }

  return (
    <div className={cn('kpi-card', className)}>
      <div className="flex items-center justify-between mb-3">
        <span className="kpi-label">{title}</span>
        {ResolvedIcon && (
          <span className="rounded-2xl border border-gold/15 bg-gold/10 p-2 text-gold">
            {React.createElement(ResolvedIcon, { size: 18 })}
          </span>
        )}
      </div>

      <div className="kpi-value mb-1">{formatValue(value)}</div>

      <div className="mt-3 flex flex-wrap items-center gap-2">
        {trend !== undefined && (
          <span
            className={cn(
              'inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-[11px] font-semibold',
              trendPositive === true
                ? 'border-green-400/20 bg-green-400/10 text-green-300'
                : trendPositive === false
                ? 'border-red-400/20 bg-red-400/10 text-red-300'
                : 'border-white/10 bg-white/5 text-cream-faint'
            )}
          >
            {trend > 0 ? (
              <TrendingUp size={13} />
            ) : trend < 0 ? (
              <TrendingDown size={13} />
            ) : (
              <Minus size={13} />
            )}
            {Math.abs(trend).toFixed(1)}%
          </span>
        )}
        {(trendLabel || subtitle) && (
          <span className="text-xs text-cream-faint">{trendLabel ?? subtitle}</span>
        )}
      </div>
    </div>
  );
}
