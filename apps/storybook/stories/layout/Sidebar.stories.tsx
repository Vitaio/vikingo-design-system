import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import {
  LayoutDashboard, Megaphone, Image, BarChart2,
  Settings, HelpCircle, Bell
} from 'lucide-react'
import { Sidebar, Topbar, PageLayout, PageContent, StatCard, Button, Badge, Avatar, AvatarFallback } from '@vikingo/ui'

const Logo = () => (
  <span className="font-display font-semibold text-lg text-[var(--sidebar-text)]">
    Vikingo
  </span>
)

const LogoIcon = () => (
  <span className="font-display font-semibold text-lg text-[var(--color-accent)]">V</span>
)

const navSections = [
  {
    items: [
      { label: 'Dashboard', href: '#', icon: <LayoutDashboard className="h-4 w-4" />, active: true },
      { label: 'Kampányok', href: '#', icon: <Megaphone className="h-4 w-4" />, badge: 3 },
      { label: 'Hirdetéstár', href: '#', icon: <Image className="h-4 w-4" /> },
      { label: 'Analitika', href: '#', icon: <BarChart2 className="h-4 w-4" /> },
    ],
  },
  {
    label: 'Beállítások',
    items: [
      { label: 'Értesítések', href: '#', icon: <Bell className="h-4 w-4" />, badge: 12 },
      { label: 'Beállítások', href: '#', icon: <Settings className="h-4 w-4" /> },
      { label: 'Súgó', href: '#', icon: <HelpCircle className="h-4 w-4" /> },
    ],
  },
]

const SidebarDemo = () => {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <PageLayout
      sidebar={
        <Sidebar
          logo={<Logo />}
          logoCollapsed={<LogoIcon />}
          sections={navSections}
          collapsed={collapsed}
          onCollapsedChange={setCollapsed}
          footer={
            !collapsed && (
              <div className="flex items-center gap-2 px-1">
                <Avatar size="sm">
                  <AvatarFallback>NB</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-[var(--sidebar-text)] truncate">Nagy Bence</p>
                  <p className="text-[10px] font-mono text-[var(--sidebar-text-muted)] truncate">admin</p>
                </div>
              </div>
            )
          }
        />
      }
      topbar={
        <Topbar
          left={<h1 className="font-display font-semibold text-lg text-[var(--color-text)]">Dashboard</h1>}
          right={
            <div className="flex items-center gap-2">
              <Button variant="secondary" size="sm">
                <Bell className="h-4 w-4" />
              </Button>
              <Button size="sm">Új kampány</Button>
            </div>
          }
        />
      }
    >
      <PageContent title="Dashboard" description="Üdvözöljük a Vikingo vezérlőpultján.">
        <div className="grid grid-cols-4 gap-4 mb-6">
          <StatCard label="Összes hirdetés" value="1,248" trend={5.2} trendLabel="vs. múlt hét" />
          <StatCard label="Aktív kampány" value="34" trend={0} trendLabel="változatlan" />
          <StatCard label="Bevétel" value="48,920" prefix="€" trend={12.4} trendLabel="YoY" />
          <StatCard label="Konverzió" value="3.8" suffix="%" trend={-1.2} trendLabel="vs. múlt hónap" />
        </div>
        <div className="flex gap-2">
          <Badge variant="accent" dot>Aktív</Badge>
          <Badge variant="success" dot>Futó kampány</Badge>
          <Badge variant="warning" dot>Jóváhagyásra vár</Badge>
        </div>
      </PageContent>
    </PageLayout>
  )
}

const meta: Meta = {
  title: 'Layout/PageLayout',
  component: SidebarDemo,
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
}
export default meta

type Story = StoryObj
export const Default: Story = {}
