import * as React from 'react'
import * as DialogPrimitive from '@radix-ui/react-dialog'
import { X } from 'lucide-react'
import { cn } from '../../lib/utils'

const Drawer = DialogPrimitive.Root
const DrawerTrigger = DialogPrimitive.Trigger
const DrawerPortal = DialogPrimitive.Portal
const DrawerClose = DialogPrimitive.Close

// ── Overlay ──────────────────────────────────────────────────────────────────

const DrawerOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      'fixed inset-0 z-50 bg-black/50 backdrop-blur-sm',
      'data-[state=open]:animate-in data-[state=closed]:animate-out',
      'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
      className
    )}
    {...props}
  />
))
DrawerOverlay.displayName = 'DrawerOverlay'

// ── Content ──────────────────────────────────────────────────────────────────

const sideStyles = {
  right: cn(
    'right-0 top-0 h-full',
    'data-[state=open]:slide-in-from-right-full data-[state=closed]:slide-out-to-right-full'
  ),
  left: cn(
    'left-0 top-0 h-full',
    'data-[state=open]:slide-in-from-left-full data-[state=closed]:slide-out-to-left-full'
  ),
  bottom: cn(
    'bottom-0 left-0 right-0 w-full',
    'data-[state=open]:slide-in-from-bottom-full data-[state=closed]:slide-out-to-bottom-full'
  ),
}

const sizeStyles = {
  sm:   'max-w-xs',
  md:   'max-w-md',
  lg:   'max-w-xl',
  full: 'max-w-full',
}

export interface DrawerContentProps
  extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content> {
  side?: 'right' | 'left' | 'bottom'
  size?: 'sm' | 'md' | 'lg' | 'full'
  hideClose?: boolean
}

const DrawerContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  DrawerContentProps
>(({ className, children, side = 'right', size = 'md', hideClose, ...props }, ref) => (
  <DrawerPortal>
    <DrawerOverlay />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(
        'fixed z-50 flex flex-col',
        'bg-[var(--color-surface)] border-[var(--color-border)]',
        'shadow-[var(--shadow-xl)]',
        'data-[state=open]:animate-in data-[state=closed]:animate-out',
        'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
        'duration-300',
        // Side-specific
        sideStyles[side],
        side !== 'bottom' && 'border-l data-[side=left]:border-l-0 data-[side=left]:border-r',
        side === 'left' ? 'border-r' : side === 'right' ? 'border-l' : 'border-t',
        // Width (only for left/right)
        side !== 'bottom' && sizeStyles[size],
        side !== 'bottom' && 'w-full',
        // Height for bottom
        side === 'bottom' && 'max-h-[85vh]',
        className
      )}
      {...props}
    >
      {children}
      {!hideClose && (
        <DialogPrimitive.Close className={cn(
          'absolute right-4 top-4 rounded-[var(--radius-sm)] p-1',
          'text-[var(--color-text-muted)] hover:text-[var(--color-text)]',
          'hover:bg-[var(--color-bg)] transition-colors',
          'focus:outline-none focus:ring-2 focus:ring-[var(--color-border-focus)]',
        )}>
          <X className="h-4 w-4" />
          <span className="sr-only">Bezárás</span>
        </DialogPrimitive.Close>
      )}
    </DialogPrimitive.Content>
  </DrawerPortal>
))
DrawerContent.displayName = 'DrawerContent'

// ── Header / Title / Footer ──────────────────────────────────────────────────

const DrawerHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn('flex flex-col gap-1 px-4 sm:px-6 py-4 sm:py-5 border-b border-[var(--color-border)] shrink-0', className)}
    {...props}
  />
)
DrawerHeader.displayName = 'DrawerHeader'

const DrawerTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn('font-display font-semibold text-lg text-[var(--color-text)] tracking-tight pr-6', className)}
    {...props}
  />
))
DrawerTitle.displayName = 'DrawerTitle'

const DrawerDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn('text-sm text-[var(--color-text-muted)]', className)}
    {...props}
  />
))
DrawerDescription.displayName = 'DrawerDescription'

const DrawerBody = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('flex-1 overflow-y-auto px-4 sm:px-6 py-4 sm:py-5', className)} {...props} />
)
DrawerBody.displayName = 'DrawerBody'

const DrawerFooter = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn('flex flex-col-reverse sm:flex-row items-center justify-end gap-2 sm:gap-3 px-4 sm:px-6 py-3 sm:py-4 border-t border-[var(--color-border)] shrink-0', className)}
    {...props}
  />
)
DrawerFooter.displayName = 'DrawerFooter'

export {
  Drawer,
  DrawerTrigger,
  DrawerPortal,
  DrawerOverlay,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerBody,
  DrawerFooter,
}
