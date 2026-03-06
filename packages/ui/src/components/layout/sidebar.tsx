'use client'

import * as React from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '../../lib/utils'
import { Badge } from '../ui/badge'
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip'

export interface NavItem {
  label: string
  href: string
  icon: React.ReactNode
  badge?: string | number
  active?: boolean
  onClick?: () => void
}

export interface NavSection {
  label?: string
  items: NavItem[]
}

export interface SidebarProps {
  logo?: React.ReactNode
  logoCollapsed?: React.ReactNode
  sections: NavSection[]
  footer?: React.ReactNode
  collapsed?: boolean
  onCollapsedChange?: (collapsed: boolean) => void
  className?: string
}

function SidebarNavItem({
  item,
  collapsed,
}: {
  item: NavItem
  collapsed: boolean
}) {
  const content = (
    <a
      href={item.href}
      onClick={item.onClick}
      className={cn(
        'flex items-center gap-3 px-3 py-2.5',
        'rounded-[var(--radius-md)]',
        'text-sm font-body font-medium',
        'transition-colors duration-[var(--transition-fast)]',
        'cursor-pointer select-none',
        item.active
          ? 'bg-[var(--sidebar-bg-active)] text-[var(--sidebar-text)]'
          : 'text-[var(--sidebar-text-muted)] hover:bg-[var(--sidebar-bg-hover)] hover:text-[var(--sidebar-text)]',
        collapsed && 'justify-center px-2'
      )}
    >
      <span className="flex h-5 w-5 shrink-0 items-center justify-center">
        {item.icon}
      </span>
      {!collapsed && (
        <>
          <span className="flex-1 truncate">{item.label}</span>
          {item.badge !== undefined && (
            <Badge variant="accent" size="sm">
              {item.badge}
            </Badge>
          )}
        </>
      )}
    </a>
  )

  if (collapsed) {
    return (
      <Tooltip>
        <TooltipTrigger asChild>{content}</TooltipTrigger>
        <TooltipContent side="right">
          <span>{item.label}</span>
          {item.badge !== undefined && (
            <span className="ml-2 font-mono text-xs opacity-70">{item.badge}</span>
          )}
        </TooltipContent>
      </Tooltip>
    )
  }

  return content
}

function Sidebar({
  logo,
  logoCollapsed,
  sections,
  footer,
  collapsed = false,
  onCollapsedChange,
  className,
}: SidebarProps) {
  return (
    <aside
      className={cn(
        'flex flex-col h-full',
        'bg-[var(--sidebar-bg)]',
        'border-r border-[var(--sidebar-border)]',
        'transition-[width] duration-[var(--transition-slow)]',
        collapsed
          ? 'w-[var(--sidebar-width-collapsed)]'
          : 'w-[var(--sidebar-width)]',
        className
      )}
    >
      {/* Logo area */}
      <div
        className={cn(
          'flex items-center h-[var(--topbar-height)]',
          'border-b border-[var(--sidebar-border)]',
          'px-4 shrink-0',
          collapsed && 'justify-center px-2'
        )}
      >
        {collapsed ? (logoCollapsed ?? logo) : logo}
      </div>

      {/* Nav sections */}
      <nav className="flex-1 overflow-y-auto py-4 px-2 space-y-6">
        {sections.map((section, i) => (
          <div key={i}>
            {section.label && !collapsed && (
              <p className="px-3 mb-1.5 text-[10px] font-mono uppercase tracking-widest text-[var(--sidebar-text-muted)]">
                {section.label}
              </p>
            )}
            <ul className="space-y-0.5">
              {section.items.map((item) => (
                <li key={item.href}>
                  <SidebarNavItem item={item} collapsed={collapsed} />
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>

      {/* Footer */}
      {footer && (
        <div
          className={cn(
            'shrink-0 border-t border-[var(--sidebar-border)] p-3',
            collapsed && 'flex justify-center'
          )}
        >
          {footer}
        </div>
      )}

      {/* Collapse toggle */}
      {onCollapsedChange && (
        <button
          onClick={() => onCollapsedChange(!collapsed)}
          className={cn(
            'shrink-0 flex items-center justify-center h-10',
            'border-t border-[var(--sidebar-border)]',
            'text-[var(--sidebar-text-muted)] hover:text-[var(--sidebar-text)]',
            'hover:bg-[var(--sidebar-bg-hover)]',
            'transition-colors duration-[var(--transition-fast)]',
            'cursor-pointer'
          )}
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {collapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </button>
      )}
    </aside>
  )
}

export { Sidebar }
