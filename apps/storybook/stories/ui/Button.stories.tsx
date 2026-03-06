import type { Meta, StoryObj } from '@storybook/react'
import { Download, Plus, Trash2 } from 'lucide-react'
import { Button } from '@vikingo/ui'

const meta: Meta<typeof Button> = {
  title: 'UI/Button',
  component: Button,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'ghost', 'destructive', 'outline', 'link'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl', 'icon', 'icon-sm'],
    },
    loading: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
}
export default meta

type Story = StoryObj<typeof Button>

export const Primary: Story = {
  args: { children: 'Mentés', variant: 'primary' },
}

export const Secondary: Story = {
  args: { children: 'Mégse', variant: 'secondary' },
}

export const Ghost: Story = {
  args: { children: 'Szerkesztés', variant: 'ghost' },
}

export const Destructive: Story = {
  args: { children: 'Törlés', variant: 'destructive' },
}

export const Loading: Story = {
  args: { children: 'Mentés folyamatban', loading: true },
}

export const WithLeftIcon: Story = {
  args: {
    children: 'Letöltés',
    leftIcon: <Download className="h-4 w-4" />,
  },
}

export const WithRightIcon: Story = {
  args: {
    children: 'Új elem',
    rightIcon: <Plus className="h-4 w-4" />,
  },
}

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-3 p-4 bg-[var(--color-bg)]">
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="destructive" leftIcon={<Trash2 className="h-4 w-4" />}>Destructive</Button>
      <Button variant="link">Link</Button>
    </div>
  ),
}

export const AllSizes: Story = {
  render: () => (
    <div className="flex flex-wrap items-end gap-3 p-4 bg-[var(--color-bg)]">
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
      <Button size="xl">XLarge</Button>
    </div>
  ),
}
