import { Minus, Plus } from 'lucide-react'
import * as React from 'react'
import { cn } from '../../lib/utils'

export interface NumberInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'onChange' | 'value'> {
  /** Label above the field */
  label?: string
  /** Helper text below the field. Rendered red when `error` is true. */
  hint?: string
  /** Applies error styling to the field and hint text */
  error?: boolean
  /** Minimum allowed value — the decrement button is disabled when `value <= min` */
  min?: number
  /** Maximum allowed value — the increment button is disabled when `value >= max` */
  max?: number
  /** Amount to increment/decrement per button click (default: 1) */
  step?: number
  /** Controlled value. Provide together with `onChange`. */
  value?: number
  /** Initial value for uncontrolled usage (default: 0) */
  defaultValue?: number
  /** Called with the new numeric value after each change. Receives a clamped number, not an event. */
  onChange?: (value: number) => void
}

/**
 * Numeric input with − / + stepper buttons. Supports controlled and uncontrolled modes,
 * min/max clamping, and custom step increments. Native spin buttons are hidden.
 *
 * @example
 * <NumberInput label="Mennyiség" min={1} max={99} defaultValue={1} />
 * <NumberInput label="Összeg" step={500} value={amount} onChange={setAmount} />
 */
const NumberInput = React.forwardRef<HTMLInputElement, NumberInputProps>(
  (
    {
      className,
      label,
      hint,
      error,
      id,
      min,
      max,
      step = 1,
      value,
      defaultValue,
      onChange,
      disabled,
      ...props
    },
    ref,
  ) => {
    const generatedId = React.useId()
    const inputId = id || generatedId

    const isControlled = value !== undefined
    const [internalValue, setInternalValue] = React.useState<number>(defaultValue ?? 0)
    const current = isControlled ? value : internalValue

    const clamp = (val: number) => {
      let clamped = val
      if (min !== undefined) clamped = Math.max(min, clamped)
      if (max !== undefined) clamped = Math.min(max, clamped)
      return clamped
    }

    const update = (next: number) => {
      const clamped = clamp(next)
      if (!isControlled) setInternalValue(clamped)
      onChange?.(clamped)
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const parsed = parseFloat(e.target.value)
      if (!Number.isNaN(parsed)) update(parsed)
    }

    const canDecrement = min === undefined || current > min
    const canIncrement = max === undefined || current < max

    return (
      <div className="flex flex-col gap-1.5 w-full">
        {label && (
          <label htmlFor={inputId} className="text-sm font-medium text-[var(--color-text)]">
            {label}
          </label>
        )}
        <div className="relative flex items-center">
          <button
            type="button"
            aria-label="Csökkentés"
            onClick={() => update(current - step)}
            disabled={disabled || !canDecrement}
            className={cn(
              'absolute left-0 flex items-center justify-center h-10 w-10 rounded-l-[var(--radius-md)]',
              'border border-r-0 border-[var(--color-border)]',
              'bg-[var(--color-surface)] text-[var(--color-text-muted)]',
              'transition-colors duration-[var(--transition-fast)]',
              'hover:bg-[var(--color-bg)] hover:text-[var(--color-text)] hover:border-[var(--color-border-strong)]',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-border-focus)]',
              'disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-[var(--color-surface)] disabled:hover:text-[var(--color-text-muted)] disabled:hover:border-[var(--color-border)]',
              error && 'border-[var(--color-error)]',
            )}
          >
            <Minus className="h-3.5 w-3.5" />
          </button>

          <input
            ref={ref}
            id={inputId}
            type="number"
            value={current}
            min={min}
            max={max}
            step={step}
            disabled={disabled}
            onChange={handleInputChange}
            className={cn(
              'flex h-10 w-full',
              'border border-[var(--color-border)]',
              'bg-[var(--color-surface)] text-[var(--color-text)]',
              'px-3 py-2 text-sm font-body text-center',
              'transition-all duration-[var(--transition-fast)]',
              'hover:border-[var(--color-border-strong)]',
              'focus:outline-none focus:border-[var(--color-border-focus)] focus:ring-2 focus:ring-[var(--color-accent-muted)] focus:hover:border-[var(--color-border-focus)]',
              'disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-[var(--color-bg)] disabled:hover:border-[var(--color-border)]',
              '[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none',
              'rounded-none pl-10 pr-10',
              error &&
                'border-[var(--color-error)] focus:border-[var(--color-error)] focus:ring-[var(--color-error-muted)]',
              className,
            )}
            {...props}
          />

          <button
            type="button"
            aria-label="Növelés"
            onClick={() => update(current + step)}
            disabled={disabled || !canIncrement}
            className={cn(
              'absolute right-0 flex items-center justify-center h-10 w-10 rounded-r-[var(--radius-md)]',
              'border border-l-0 border-[var(--color-border)]',
              'bg-[var(--color-surface)] text-[var(--color-text-muted)]',
              'transition-colors duration-[var(--transition-fast)]',
              'hover:bg-[var(--color-bg)] hover:text-[var(--color-text)] hover:border-[var(--color-border-strong)]',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-border-focus)]',
              'disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-[var(--color-surface)] disabled:hover:text-[var(--color-text-muted)] disabled:hover:border-[var(--color-border)]',
              error && 'border-[var(--color-error)]',
            )}
          >
            <Plus className="h-3.5 w-3.5" />
          </button>
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
NumberInput.displayName = 'NumberInput'

export { NumberInput }
