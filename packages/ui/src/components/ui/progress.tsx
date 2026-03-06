import * as React from 'react'
import * as ProgressPrimitive from '@radix-ui/react-progress'
import { cn } from '../../lib/utils'

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> & {
    variant?: 'default' | 'accent' | 'success' | 'warning' | 'error'
  }
>(({ className, value, variant = 'accent', ...props }, ref) => (
  <ProgressPrimitive.Root
    ref={ref}
    className={cn(
      'relative h-2 w-full overflow-hidden rounded-full bg-[var(--color-border)]',
      className
    )}
    {...props}
  >
    <ProgressPrimitive.Indicator
      className={cn(
        'h-full flex-1 transition-all duration-[var(--transition-slow)]',
        variant === 'accent' && 'bg-[var(--color-accent)]',
        variant === 'success' && 'bg-[var(--color-success)]',
        variant === 'warning' && 'bg-[var(--color-warning)]',
        variant === 'error' && 'bg-[var(--color-error)]',
        variant === 'default' && 'bg-[var(--color-text)]',
      )}
      style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
    />
  </ProgressPrimitive.Root>
))
Progress.displayName = ProgressPrimitive.Root.displayName

export { Progress }
