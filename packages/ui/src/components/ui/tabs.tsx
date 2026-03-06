import * as React from 'react'
import * as TabsPrimitive from '@radix-ui/react-tabs'
import { cn } from '../../lib/utils'

const Tabs = TabsPrimitive.Root

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List> & {
    variant?: 'default' | 'pills' | 'underline'
  }
>(({ className, variant = 'default', ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(
      'flex items-center',
      variant === 'default' && [
        'h-10 rounded-[var(--radius-md)] bg-[var(--color-bg)]',
        'border border-[var(--color-border)] p-1 gap-1',
      ],
      variant === 'pills' && 'gap-1',
      variant === 'underline' && [
        'border-b border-[var(--color-border)] gap-0',
      ],
      className
    )}
    data-variant={variant}
    {...props}
  />
))
TabsList.displayName = TabsPrimitive.List.displayName

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      'inline-flex items-center justify-center gap-1.5',
      'px-3 py-1.5 text-sm font-medium font-body',
      'whitespace-nowrap cursor-pointer',
      'transition-all duration-[var(--transition-fast)]',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-border-focus)]',
      'disabled:pointer-events-none disabled:opacity-50',
      // Default variant styles (applied when inside default TabsList)
      '[&[data-state=active]]:bg-[var(--color-surface)] [&[data-state=active]]:text-[var(--color-text)]',
      '[&[data-state=active]]:shadow-[var(--shadow-sm)] [&[data-state=active]]:rounded-[var(--radius-sm)]',
      'text-[var(--color-text-muted)] hover:text-[var(--color-text)]',
      // Underline variant override via parent selector
      '[.tabs-underline_&]:rounded-none [.tabs-underline_&]:border-b-2 [.tabs-underline_&]:border-transparent',
      '[.tabs-underline_&[data-state=active]]:border-[var(--color-accent)] [.tabs-underline_&[data-state=active]]:text-[var(--color-accent)]',
      '[.tabs-underline_&[data-state=active]]:bg-transparent [.tabs-underline_&[data-state=active]]:shadow-none',
      className
    )}
    {...props}
  />
))
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      'mt-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-border-focus)]',
      className
    )}
    {...props}
  />
))
TabsContent.displayName = TabsPrimitive.Content.displayName

export { Tabs, TabsList, TabsTrigger, TabsContent }
