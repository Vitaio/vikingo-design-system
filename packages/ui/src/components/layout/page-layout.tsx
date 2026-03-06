'use client'

import * as React from 'react'
import { cn } from '../../lib/utils'
import { TooltipProvider } from '../ui/tooltip'

export interface PageLayoutProps {
  sidebar: React.ReactNode
  topbar?: React.ReactNode
  children: React.ReactNode
  className?: string
}

function PageLayout({ sidebar, topbar, children, className }: PageLayoutProps) {
  return (
    <TooltipProvider delayDuration={300}>
      <div className={cn('flex h-screen w-full overflow-hidden', className)}>
        {/* Sidebar */}
        <div className="flex-none h-full">
          {sidebar}
        </div>

        {/* Main content area */}
        <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
          {topbar && <div className="flex-none">{topbar}</div>}
          <main className="flex-1 overflow-y-auto bg-[var(--color-bg)]">
            {children}
          </main>
        </div>
      </div>
    </TooltipProvider>
  )
}

export interface PageContentProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string
  description?: string
  actions?: React.ReactNode
}

function PageContent({ title, description, actions, children, className, ...props }: PageContentProps) {
  return (
    <div className={cn('p-6 max-w-screen-2xl mx-auto', className)} {...props}>
      {(title || actions) && (
        <div className="flex items-start justify-between gap-4 mb-6">
          <div>
            {title && (
              <h1 className="font-display font-semibold text-2xl text-[var(--color-text)] tracking-tight">
                {title}
              </h1>
            )}
            {description && (
              <p className="mt-1 text-sm text-[var(--color-text-muted)]">{description}</p>
            )}
          </div>
          {actions && (
            <div className="flex items-center gap-3 shrink-0">{actions}</div>
          )}
        </div>
      )}
      {children}
    </div>
  )
}

export { PageLayout, PageContent }
