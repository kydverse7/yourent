'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

// ============================
// Button
// ============================
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'gold' | 'outline' | 'ghost' | 'danger' | 'secondary';
  size?: 'sm' | 'md' | 'lg' | 'icon';
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  function Button({
    variant = 'gold',
    size = 'md',
    loading,
    leftIcon,
    rightIcon,
    children,
    className,
    disabled,
    ...props
  }: ButtonProps, ref) {
    const base =
      'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-2xl font-semibold transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-50';

    const variants: Record<string, string> = {
      gold: 'bg-gold-gradient text-black shadow-gold hover:-translate-y-0.5 hover:brightness-110 hover:shadow-gold-md active:translate-y-0',
      outline:
        'border border-gold/25 bg-gold/5 text-gold hover:border-gold/40 hover:bg-gold/10',
      ghost: 'bg-transparent text-cream-muted hover:bg-white/5 hover:text-cream',
      danger:
        'border border-red-400/30 bg-red-500/5 text-red-300 hover:bg-red-500/10',
      secondary: 'border border-white/8 bg-white/5 text-cream hover:border-gold/20 hover:bg-white/7',
    };

    const sizes: Record<string, string> = {
      sm: 'h-9 px-3.5 text-xs',
      md: 'h-11 px-5 text-sm',
      lg: 'h-12 px-6 text-base',
      icon: 'h-11 w-11 p-0',
    };

    return (
      <button
        ref={ref}
        className={cn(base, variants[variant], sizes[size], className)}
        disabled={disabled || loading}
        {...props}
      >
        {loading ? (
          <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
        ) : (
          leftIcon
        )}
        {children}
        {!loading && rightIcon}
      </button>
    );
  }
);
Button.displayName = 'Button';

// ============================
// Badge
// ============================
interface BadgeProps {
  children: React.ReactNode;
  variant?: 'gold' | 'green' | 'red' | 'blue' | 'amber' | 'muted';
  className?: string;
}

export function Badge({ children, variant = 'muted', className }: BadgeProps) {
  const variants: Record<string, string> = {
    gold: 'text-gold bg-gold-200 border-gold-400',
    green: 'text-green-400 bg-green-400/15 border-green-400/30',
    red: 'text-red-400 bg-red-400/15 border-red-400/30',
    blue: 'text-blue-400 bg-blue-400/15 border-blue-400/30',
    amber: 'text-amber-400 bg-amber-400/15 border-amber-400/30',
    muted: 'text-cream-muted bg-cream-muted/10 border-cream-muted/20',
  };
  return (
    <span
      className={cn(
        'badge',
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
}

// ============================
// Card
// ============================
interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export function Card({ children, className, hover = true }: CardProps) {
  return (
    <div
      className={cn(
        'rounded-[26px] border border-white/8 bg-white/[0.03] p-5 backdrop-blur-xl',
        hover && 'transition-all duration-200 hover:-translate-y-0.5 hover:border-gold/20 hover:shadow-card-hover',
        className
      )}
    >
      {children}
    </div>
  );
}

// ============================
// Input
// ============================
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, leftIcon, rightIcon, className, id, ...props }, ref) => {
    const inputId = id ?? label?.toLowerCase().replace(/\s+/g, '-');
    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label
            htmlFor={inputId}
            className="text-sm font-medium text-cream-muted"
          >
            {label}
          </label>
        )}
        <div className="relative">
          {leftIcon && (
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-cream-faint">
              {leftIcon}
            </span>
          )}
          <input
            ref={ref}
            id={inputId}
            className={cn(
              'input-gold',
              leftIcon && 'pl-10',
              rightIcon && 'pr-10',
              error && 'border-red-400 focus:border-red-400 focus:shadow-[0_0_0_3px_rgba(248,113,113,0.15)]',
              className
            )}
            {...props}
          />
          {rightIcon && (
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-cream-faint">
              {rightIcon}
            </span>
          )}
        </div>
        {error && <p className="text-xs text-red-400">{error}</p>}
      </div>
    );
  }
);
Input.displayName = 'Input';

// ============================
// Select
// ============================
interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options?: Array<{ value: string; label: string }>;
  placeholder?: string;
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, options, placeholder, className, id, children, ...props }, ref) => {
    const inputId = id ?? label?.toLowerCase().replace(/\s+/g, '-');
    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label htmlFor={inputId} className="text-sm font-medium text-cream-muted">
            {label}
          </label>
        )}
        <select
          ref={ref}
          id={inputId}
          className={cn(
            'input-gold appearance-none cursor-pointer',
            error && 'border-red-400',
            className
          )}
          {...props}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options
            ? options.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))
            : children}
        </select>
        {error && <p className="text-xs text-red-400">{error}</p>}
      </div>
    );
  }
);
Select.displayName = 'Select';

// ============================
// Skeleton
// ============================
interface SkeletonProps {
  className?: string;
  lines?: number;
}

export function Skeleton({ className }: SkeletonProps) {
  return <div className={cn('skeleton h-4', className)} />;
}

export function SkeletonCard() {
  return (
    <div className="rounded-[26px] border border-white/8 bg-white/[0.03] p-5 space-y-4">
      <Skeleton className="h-6 w-1/3" />
      <Skeleton className="h-4 w-2/3" />
      <Skeleton className="h-4 w-1/2" />
    </div>
  );
}

// ============================
// Spinner
// ============================
export function Spinner({ size = 'md', className }: { size?: 'sm' | 'md' | 'lg'; className?: string }) {
  const sizeMap = { sm: 'w-4 h-4', md: 'w-6 h-6', lg: 'w-8 h-8' };
  return (
    <div
      className={cn(
        'rounded-full border-2 border-noir-border border-t-gold animate-spin',
        sizeMap[size],
        className
      )}
    />
  );
}

// ============================
// Divider
// ============================
export function Divider({ className }: { className?: string }) {
  return <hr className={cn('border-noir-muted', className)} />;
}

// ============================
// EmptyState
// ============================
interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: React.ReactNode;
}

export function EmptyState({ icon, title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      {icon && <div className="mb-4 text-cream-faint">{icon}</div>}
      <h3 className="text-lg font-semibold text-cream mb-2">{title}</h3>
      {description && <p className="text-cream-muted text-sm max-w-sm">{description}</p>}
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
}
