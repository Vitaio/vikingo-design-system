import type { Meta, StoryObj } from '@storybook/react'
import * as LucideIcons from 'lucide-react'
import React, { useState, useMemo } from 'react'

const meta: Meta = {
  title: 'Tokens/Icons',
  parameters: {
    layout: 'fullscreen',
    docs: { source: { type: 'code' } },
  },
}
export default meta

type Story = StoryObj

const ICON_NAMES = Object.keys(LucideIcons).filter((name) => {
  if (!/^[A-Z][a-z]/.test(name)) return false
  const val = (LucideIcons as Record<string, unknown>)[name]
  if (!val || typeof val !== 'object') return false
  const obj = val as Record<string, unknown>
  return '$$typeof' in obj && typeof obj.displayName === 'string'
}) as (keyof typeof LucideIcons)[]

function IconGrid() {
  const [query, setQuery] = useState('')
  const [copied, setCopied] = useState<string | null>(null)
  const [size, setSize] = useState(24)

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim()
    if (!q) return ICON_NAMES
    return ICON_NAMES.filter((name) => name.toLowerCase().includes(q))
  }, [query])

  function copy(name: string) {
    const importStr = `import { ${name} } from 'lucide-react'`
    navigator.clipboard?.writeText(importStr)
    setCopied(name)
    setTimeout(() => setCopied(null), 1500)
  }

  return (
    <div className="min-h-screen bg-[var(--color-bg)] p-6">
      <div className="mb-6">
        <h1 className="font-display font-semibold text-2xl text-[var(--color-text)] mb-1">
          Icons · Ikonok
        </h1>
        <p className="text-sm text-[var(--color-text-muted)]">
          Lucide React icons — {ICON_NAMES.length} total. Click to copy import.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <LucideIcons.Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-text-subtle)]"
            size={16}
          />
          <input
            type="text"
            placeholder="Search... (e.g. arrow, chart, user)"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-sm rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text)] placeholder:text-[var(--color-text-subtle)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]/30 focus:border-[var(--color-accent)] transition-colors"
          />
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <span className="text-xs text-[var(--color-text-muted)] font-mono">Size:</span>
          {[16, 20, 24, 32].map((s) => (
            <button
              key={s}
              onClick={() => setSize(s)}
              className={[
                'px-2.5 py-1 text-xs rounded-[var(--radius-sm)] font-mono transition-colors',
                size === s
                  ? 'bg-[var(--color-accent)] text-white'
                  : 'bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text-muted)] hover:text-[var(--color-text)]',
              ].join(' ')}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {query && (
        <p className="text-xs text-[var(--color-text-subtle)] mb-4 font-mono">
          {filtered.length} results for "{query}"
        </p>
      )}

      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-[var(--color-text-subtle)]">
          <LucideIcons.SearchX size={40} className="mb-3 opacity-40" />
          <p className="text-sm">No results for "{query}"</p>
        </div>
      ) : (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(100px,1fr))] gap-2">
          {filtered.map((name) => {
            const Icon = (LucideIcons as unknown as Record<string, LucideIcons.LucideIcon>)[name]
            const isCopied = copied === name
            return (
              <button
                key={name}
                onClick={() => copy(name)}
                title={`import { ${name} } from 'lucide-react'`}
                className={[
                  'group flex flex-col items-center gap-2 p-3 rounded-[var(--radius-md)] border transition-all text-center',
                  isCopied
                    ? 'border-[var(--color-accent)] bg-[var(--color-accent)]/5 text-[var(--color-accent)]'
                    : 'border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text-muted)] hover:border-[var(--color-border-strong)] hover:text-[var(--color-text)] hover:shadow-[var(--shadow-sm)]',
                ].join(' ')}
              >
                {isCopied ? (
                  <LucideIcons.Check size={size} className="text-[var(--color-accent)]" />
                ) : (
                  <Icon size={size} />
                )}
                <span className="text-[10px] font-mono leading-tight break-all line-clamp-2">
                  {isCopied ? 'Copied!' : name}
                </span>
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}

export const IconBrowser: Story = {
  name: 'Icon Browser · Ikontallózó',
  render: () => <IconGrid />,
}
