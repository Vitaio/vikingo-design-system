import type { Meta, StoryObj } from '@storybook/react'
import { Users, DollarSign, BarChart2, ShoppingCart } from 'lucide-react'
import { StatCard } from '@vikingo/ui'

const meta: Meta<typeof StatCard> = {
  title: 'UI/StatCard',
  component: StatCard,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
}
export default meta

type Story = StoryObj<typeof StatCard>

export const Default: Story = {
  args: {
    label: 'Összes felhasználó',
    value: '12,543',
    trend: 12.4,
    trendLabel: 'előző hónaphoz képest',
    icon: <Users className="h-4 w-4" />,
  },
}

export const Negative: Story = {
  args: {
    label: 'Lemondások',
    value: '234',
    trend: -3.2,
    trendLabel: 'vs. előző hónap',
    icon: <ShoppingCart className="h-4 w-4" />,
  },
}

export const WithPrefix: Story = {
  args: {
    label: 'Bevétel',
    value: '48,920',
    prefix: '€',
    trend: 8.1,
    trendLabel: 'YoY',
    icon: <DollarSign className="h-4 w-4" />,
  },
}

export const Loading: Story = {
  args: {
    label: 'Betöltés...',
    value: 0,
    loading: true,
  },
}

export const Dashboard: Story = {
  render: () => (
    <div className="grid grid-cols-4 gap-4 p-6 bg-[var(--color-bg)] w-[900px]">
      <StatCard label="Összes hirdetés" value="1,248" trend={5.2} trendLabel="vs. múlt hét" icon={<BarChart2 className="h-4 w-4" />} />
      <StatCard label="Aktív kampány" value="34" trend={0} trendLabel="változatlan" icon={<Users className="h-4 w-4" />} />
      <StatCard label="Bevétel" value="48,920" prefix="€" trend={12.4} trendLabel="YoY" icon={<DollarSign className="h-4 w-4" />} />
      <StatCard label="Konverzió" value="3.8" suffix="%" trend={-1.2} trendLabel="vs. múlt hónap" icon={<ShoppingCart className="h-4 w-4" />} />
    </div>
  ),
}
