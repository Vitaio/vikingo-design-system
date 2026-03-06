import * as React from 'react'
import { cn } from '../../lib/utils'

export interface TopbarProps extends React.HTMLAttributes<HTMLElement> {
  left?: React.ReactNode
  right?: React.ReactNode
}

function Topbar({ left, right, className, children, ...props }: TopbarProps) {
  return (
    <header
      className={cn(
        'flex items-center justify-between',
        'h-[var(--topbar-height)] px-6',
        'bg-[var(--topbar-bg)]',
        'border-b border-[var(--topbar-border)]',
        'shrink-0',
        className
      )}
      {...props}
    >
      <div className="flex items-center gap-4 min-w-0">
        {left}
      </div>
      <div className="flex items-center gap-3 shrink-0">
        {right ?? children}
      </div>
    </header>
  )
}

export { Topbar }
