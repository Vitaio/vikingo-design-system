import { Check, Copy } from 'lucide-react'
import * as React from 'react'
import { cn } from '../../lib/utils'

export interface CopyButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  value: string
  label?: string
  copiedLabel?: string
  timeout?: number
  iconOnly?: boolean
}

const CopyButton = React.forwardRef<HTMLButtonElement, CopyButtonProps>(
  (
    {
      value,
      label = 'Másolás',
      copiedLabel = 'Másolva!',
      timeout = 2000,
      iconOnly = false,
      className,
      disabled,
      ...props
    },
    ref,
  ) => {
    const [copied, setCopied] = React.useState(false)

    const handleCopy = async () => {
      if (copied) return
      try {
        await navigator.clipboard.writeText(value)
        setCopied(true)
        setTimeout(() => setCopied(false), timeout)
      } catch {
        // clipboard access denied – silently fail
      }
    }

    return (
      <button
        ref={ref}
        type="button"
        aria-label={copied ? copiedLabel : label}
        onClick={handleCopy}
        disabled={disabled || copied}
        className={cn(
          'inline-flex items-center justify-center gap-1.5',
          'font-body font-medium text-sm rounded-[var(--radius-md)]',
          'transition-all duration-[var(--transition-fast)]',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-border-focus)] focus-visible:ring-offset-2',
          'disabled:pointer-events-none',
          iconOnly ? 'h-8 w-8' : 'h-8 px-3',
          copied
            ? 'bg-[var(--color-success-muted)] text-[var(--color-success)] border border-[var(--color-success)]/30'
            : [
                'bg-[var(--color-surface)] text-[var(--color-text-muted)]',
                'border border-[var(--color-border)]',
                'hover:bg-[var(--color-bg)] hover:text-[var(--color-text)] hover:border-[var(--color-border-strong)]',
              ].join(' '),
          className,
        )}
        {...props}
      >
        {copied ? (
          <Check className="h-3.5 w-3.5 shrink-0" />
        ) : (
          <Copy className="h-3.5 w-3.5 shrink-0" />
        )}
        {!iconOnly && <span>{copied ? copiedLabel : label}</span>}
      </button>
    )
  },
)
CopyButton.displayName = 'CopyButton'

export { CopyButton }
