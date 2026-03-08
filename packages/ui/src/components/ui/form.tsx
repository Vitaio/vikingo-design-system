import * as LabelPrimitive from '@radix-ui/react-label'
import { Slot } from '@radix-ui/react-slot'
import * as React from 'react'
import {
  Controller,
  type ControllerProps,
  type FieldPath,
  type FieldValues,
  FormProvider,
  useFormContext,
} from 'react-hook-form'
import { cn } from '../../lib/utils'

// ── Form = FormProvider wrapper ──────────────────────────────────────────────

const Form = FormProvider

// ── FormField ────────────────────────────────────────────────────────────────

type FormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
  name: TName
}

const FormFieldContext = React.createContext<FormFieldContextValue>({} as FormFieldContextValue)

const FormField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  ...props
}: ControllerProps<TFieldValues, TName>) => (
  <FormFieldContext.Provider value={{ name: props.name }}>
    <Controller {...props} />
  </FormFieldContext.Provider>
)

// ── useFormField ─────────────────────────────────────────────────────────────

const useFormField = () => {
  const fieldContext = React.useContext(FormFieldContext)
  const itemContext = React.useContext(FormItemContext)
  const { getFieldState, formState } = useFormContext()

  if (!fieldContext.name) {
    throw new Error('useFormField must be used inside <FormField>')
  }

  const fieldState = getFieldState(fieldContext.name, formState)
  const { id } = itemContext

  return {
    id,
    name: fieldContext.name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    ...fieldState,
  }
}

// ── FormItem ─────────────────────────────────────────────────────────────────

type FormItemContextValue = { id: string }

const FormItemContext = React.createContext<FormItemContextValue>({} as FormItemContextValue)

const FormItem = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    const id = React.useId()
    return (
      <FormItemContext.Provider value={{ id }}>
        <div ref={ref} className={cn('flex flex-col gap-1.5', className)} {...props} />
      </FormItemContext.Provider>
    )
  },
)
FormItem.displayName = 'FormItem'

// ── FormLabel ─────────────────────────────────────────────────────────────────

export interface FormLabelProps extends React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> {
  required?: boolean
}

const FormLabel = React.forwardRef<React.ElementRef<typeof LabelPrimitive.Root>, FormLabelProps>(
  ({ className, required, children, ...props }, ref) => {
    const { error, formItemId } = useFormField()
    return (
      <LabelPrimitive.Root
        ref={ref}
        htmlFor={formItemId}
        className={cn(
          'text-sm font-medium text-[var(--color-text)]',
          error && 'text-[var(--color-error)]',
          className,
        )}
        {...props}
      >
        {children}
        {required && (
          <span className="text-[var(--color-error)] ml-0.5" aria-hidden="true">
            *
          </span>
        )}
      </LabelPrimitive.Root>
    )
  },
)
FormLabel.displayName = 'FormLabel'

// ── FormControl ───────────────────────────────────────────────────────────────

const FormControl = React.forwardRef<
  React.ElementRef<typeof Slot>,
  React.ComponentPropsWithoutRef<typeof Slot>
>(({ ...props }, ref) => {
  const { error, formItemId, formDescriptionId, formMessageId } = useFormField()
  return (
    <Slot
      ref={ref}
      id={formItemId}
      aria-describedby={error ? `${formDescriptionId} ${formMessageId}` : formDescriptionId}
      aria-invalid={!!error}
      {...props}
    />
  )
})
FormControl.displayName = 'FormControl'

// ── FormDescription ───────────────────────────────────────────────────────────

const FormDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => {
  const { formDescriptionId } = useFormField()
  return (
    <p
      ref={ref}
      id={formDescriptionId}
      className={cn('text-xs text-[var(--color-text-muted)]', className)}
      {...props}
    />
  )
})
FormDescription.displayName = 'FormDescription'

// ── FormMessage ───────────────────────────────────────────────────────────────

const FormMessage = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, children, ...props }, ref) => {
  const { error, formMessageId } = useFormField()
  const body = error ? String(error.message ?? '') : children
  if (!body) return null
  return (
    <p
      ref={ref}
      id={formMessageId}
      className={cn('text-xs font-medium text-[var(--color-error)]', className)}
      {...props}
    >
      {body}
    </p>
  )
})
FormMessage.displayName = 'FormMessage'

export {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  useFormField,
}
