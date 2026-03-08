import { cva, type VariantProps } from 'class-variance-authority'
import { AlertCircle, CheckCircle2, Info, TriangleAlert, X } from 'lucide-react'
import * as React from 'react'
import { cn } from '../../lib/utils'

const alertVariants = cva(
  ['relative flex gap-3 rounded-[var(--radius-lg)] border p-4', 'text-sm font-body'].join(' '),
  {
    variants: {
      variant: {
        info: [
          'bg-[var(--color-accent-muted)] border-[var(--color-accent)]/30',
          'text-[var(--color-text)]',
          '[&_[data-alert-icon]]:text-[var(--color-accent)]',
        ].join(' '),
        success: [
          'bg-[var(--color-success)]/8 border-[var(--color-success)]/30',
          'text-[var(--color-text)]',
          '[&_[data-alert-icon]]:text-[var(--color-success)]',
        ].join(' '),
        warning: [
          'bg-[var(--color-warning)]/8 border-[var(--color-warning)]/30',
          'text-[var(--color-text)]',
          '[&_[data-alert-icon]]:text-[var(--color-warning)]',
        ].join(' '),
        error: [
          'bg-[var(--color-error)]/8 border-[var(--color-error)]/30',
          'text-[var(--color-text)]',
          '[&_[data-alert-icon]]:text-[var(--color-error)]',
        ].join(' '),
      },
    },
    defaultVariants: {
      variant: 'info',
    },
  },
)

const iconMap = {
  info: Info,
  success: CheckCircle2,
  warning: TriangleAlert,
  error: AlertCircle,
}

export interface AlertProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof alertVariants> {
  title?: string
  onClose?: () => void
}

function Alert({ className, variant = 'info', title, children, onClose, ...props }: AlertProps) {
  const Icon = iconMap[variant ?? 'info']
  return (
    <div className={cn(alertVariants({ variant }), className)} role="alert" {...props}>
      <Icon className="h-4 w-4 mt-0.5 shrink-0" data-alert-icon="" />
      <div className="flex-1 min-w-0">
        {title && <p className="font-semibold mb-0.5">{title}</p>}
        {children && <div className="text-[var(--color-text-muted)]">{children}</div>}
      </div>
      {onClose && (
        <button
          onClick={onClose}
          className="shrink-0 text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors"
          aria-label="Bezárás"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  )
}

const AlertTitle = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h5
      ref={ref}
      className={cn('font-semibold leading-none tracking-tight', className)}
      {...props}
    />
  ),
)
AlertTitle.displayName = 'AlertTitle'

const AlertDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('text-sm text-[var(--color-text-muted)]', className)} {...props} />
))
AlertDescription.displayName = 'AlertDescription'

export { Alert, AlertTitle, AlertDescription }
