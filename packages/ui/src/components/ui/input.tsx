import * as React from 'react'
import { cn } from '../../lib/utils'

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  error?: boolean
  hint?: string
  label?: string
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, leftIcon, rightIcon, error, hint, label, id, ...props }, ref) => {
    const generatedId = React.useId()
    const inputId = id || generatedId

    return (
      <div className="flex flex-col gap-1.5 w-full">
        {label && (
          <label htmlFor={inputId} className="text-sm font-medium text-[var(--color-text)]">
            {label}
          </label>
        )}
        <div className="relative flex items-center">
          {leftIcon && (
            <span className="absolute left-3 text-[var(--color-text-muted)] flex items-center pointer-events-none">
              {leftIcon}
            </span>
          )}
          <input
            id={inputId}
            type={type}
            className={cn(
              'flex h-10 w-full rounded-[var(--radius-md)]',
              'border border-[var(--color-border)]',
              'bg-[var(--color-surface)] text-[var(--color-text)]',
              'px-3 py-2 text-sm font-body',
              'placeholder:text-[var(--color-text-subtle)]',
              'transition-all duration-[var(--transition-fast)]',
              'hover:border-[var(--color-border-strong)]',
              'focus:outline-none focus:border-[var(--color-border-focus)] focus:ring-2 focus:ring-[var(--color-accent-muted)] focus:hover:border-[var(--color-border-focus)]',
              'disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-[var(--color-bg)] disabled:hover:border-[var(--color-border)]',
              error &&
                'border-[var(--color-error)] focus:border-[var(--color-error)] focus:ring-[var(--color-error-muted)]',
              leftIcon && 'pl-10',
              rightIcon && 'pr-10',
              className,
            )}
            ref={ref}
            {...props}
          />
          {rightIcon && (
            <span className="absolute right-3 text-[var(--color-text-muted)] flex items-center pointer-events-none">
              {rightIcon}
            </span>
          )}
        </div>
        {hint && (
          <p
            className={cn(
              'text-xs',
              error ? 'text-[var(--color-error)]' : 'text-[var(--color-text-muted)]',
            )}
          >
            {hint}
          </p>
        )}
      </div>
    )
  },
)
Input.displayName = 'Input'

export { Input }
