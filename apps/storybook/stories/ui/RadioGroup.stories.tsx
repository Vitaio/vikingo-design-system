import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { RadioGroup, RadioGroupItem } from '@vikingo/ui'

const meta: Meta = {
  title: 'Forms/Radio Group',
  parameters: { layout: 'centered', docs: { source: { type: 'code' } } },
  tags: ['autodocs'],
}
export default meta
type Story = StoryObj

export const Default: Story = {
  name: 'Default · Alapértelmezett',
  render: () => {
    const [value, setValue] = useState('30d')
    return (
      <div className="p-4 bg-[var(--color-bg)]">
        <RadioGroup value={value} onValueChange={setValue} className="gap-3">
          {[
            { value: '7d', label: 'Utolsó 7 nap' },
            { value: '30d', label: 'Utolsó 30 nap' },
            { value: '90d', label: 'Utolsó 90 nap' },
            { value: 'all', label: 'Teljes időszak' },
          ].map(opt => (
            <label key={opt.value} className="flex items-center gap-2.5 cursor-pointer">
              <RadioGroupItem value={opt.value} />
              <span className="text-sm text-[var(--color-text)]">{opt.label}</span>
            </label>
          ))}
        </RadioGroup>
        <p className="mt-3 text-xs text-[var(--color-text-muted)] font-mono">
          Kiválasztott: {value}
        </p>
      </div>
    )
  },
}

export const PlanSelector: Story = {
  name: 'Plan Selector · Terv-választó',
  render: () => {
    const [plan, setPlan] = useState('pro')

    const plans = [
      { value: 'starter', label: 'Starter', price: 'Ingyenes', desc: '1 kampány, 1 platform' },
      { value: 'pro', label: 'Pro', price: '4 900 Ft/hó', desc: '10 kampány, 5 platform' },
      { value: 'business', label: 'Business', price: '14 900 Ft/hó', desc: 'Korlátlan kampány, minden platform' },
    ]

    return (
      <div className="w-80 p-4 bg-[var(--color-bg)]">
        <RadioGroup value={plan} onValueChange={setPlan} className="gap-3">
          {plans.map(p => (
            <label
              key={p.value}
              className={[
                'flex items-start gap-3 p-3 rounded-[var(--radius-lg)] border cursor-pointer transition-all',
                plan === p.value
                  ? 'border-[var(--color-accent)] bg-[var(--color-accent-muted)]'
                  : 'border-[var(--color-border)] bg-[var(--color-surface)] hover:border-[var(--color-border-strong)]',
              ].join(' ')}
            >
              <RadioGroupItem value={p.value} className="mt-0.5" />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-sm font-medium text-[var(--color-text)]">{p.label}</span>
                  <span className="text-sm font-mono font-medium text-[var(--color-accent)]">{p.price}</span>
                </div>
                <p className="text-xs text-[var(--color-text-muted)] mt-0.5">{p.desc}</p>
              </div>
            </label>
          ))}
        </RadioGroup>
      </div>
    )
  },
}
