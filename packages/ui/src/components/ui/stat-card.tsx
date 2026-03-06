import * as React from 'react'
import { TrendingUp, TrendingDown, Minus } from 'lucide-react'
import { cn } from '../../lib/utils'

export interface StatCardProps extends React.HTMLAttributes<HTMLDivElement> {
  label: string
  value: string | number
  trend?: number
  trendLabel?: string
  period?: string
  icon?: React.ReactNode
  prefix?: string
  suffix?: string
  loading?: boolean
}

function StatCard({
  label,
  value,
  trend,
  trendLabel,
  period,
  icon,
  prefix,
  suffix,
  loading,
  className,
  ...props
}: StatCardProps) {
  const trendPositive = trend !== undefined && trend > 0
  const trendNegative = trend !== undefined && trend < 0
  const trendNeutral = trend !== undefined && trend === 0

  return (
    <div
      className={cn(
        'bg-[var(--color-surface)] rounded-[var(--radius-lg)]',
        'border border-[var(--color-border)] shadow-[var(--shadow-sm)]',
        'p-5 flex flex-col gap-3',
        className
      )}
      {...props}
    >
      <div className="flex items-start justify-between">
        <span className="text-sm font-body text-[var(--color-text-muted)]">
          {label}
        </span>
        {icon && (
          <span className="text-[var(--color-text-subtle)] flex items-center">
            {icon}
          </span>
        )}
      </div>

      {loading ? (
        <div className="flex flex-col gap-2">
          <div className="h-8 w-32 rounded-[var(--radius-sm)] bg-[var(--color-border)] animate-pulse" />
          <div className="h-4 w-20 rounded-[var(--radius-sm)] bg-[var(--color-border)] animate-pulse" />
        </div>
      ) : (
        <>
          <div className="flex items-baseline gap-1">
            {prefix && (
              <span className="text-sm text-[var(--color-text-muted)] font-mono">{prefix}</span>
            )}
            <span className="font-display font-semibold text-3xl text-[var(--color-text)] tracking-tight">
              {value}
            </span>
            {suffix && (
              <span className="text-sm text-[var(--color-text-muted)] font-mono">{suffix}</span>
            )}
          </div>

          {trend !== undefined && (
            <div className="flex items-center gap-1.5">
              <span
                className={cn(
                  'flex items-center gap-0.5 text-xs font-mono font-medium',
                  trendPositive && 'text-[var(--color-success)]',
                  trendNegative && 'text-[var(--color-error)]',
                  trendNeutral && 'text-[var(--color-text-muted)]'
                )}
              >
                {trendPositive && <TrendingUp className="h-3 w-3" />}
                {trendNegative && <TrendingDown className="h-3 w-3" />}
                {trendNeutral && <Minus className="h-3 w-3" />}
                {trendPositive && '+'}
                {trend}%
              </span>
              {(trendLabel || period) && (
                <span className="text-xs text-[var(--color-text-subtle)]">
                  {trendLabel || period}
                </span>
              )}
            </div>
          )}
        </>
      )}
    </div>
  )
}

export { StatCard }
