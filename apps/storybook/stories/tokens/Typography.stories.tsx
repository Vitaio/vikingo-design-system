import type { Meta, StoryObj } from '@storybook/react'

const TypographyShowcase = () => (
  <div className="p-8 bg-[var(--color-bg)] min-h-screen min-w-[800px] space-y-10">
    <h1 className="font-display font-semibold text-2xl text-[var(--color-text)]">Typography</h1>

    <section>
      <p className="text-xs font-mono text-[var(--color-text-muted)] uppercase tracking-widest mb-4">
        Clash Display – Headings (font-display)
      </p>
      <div className="space-y-4">
        <div>
          <h1 className="font-display font-semibold text-5xl text-[var(--color-text)]">H1 – Heading One</h1>
          <p className="text-xs font-mono text-[var(--color-text-subtle)] mt-1">Clash Display / Semibold 600 / 48px</p>
        </div>
        <div>
          <h2 className="font-display font-semibold text-4xl text-[var(--color-text)]">H2 – Heading Two</h2>
          <p className="text-xs font-mono text-[var(--color-text-subtle)] mt-1">Clash Display / Semibold 600 / 36px</p>
        </div>
        <div>
          <h3 className="font-display font-semibold text-3xl text-[var(--color-text)]">H3 – Heading Three</h3>
          <p className="text-xs font-mono text-[var(--color-text-subtle)] mt-1">Clash Display / Semibold 600 / 30px</p>
        </div>
        <div>
          <h4 className="font-display font-semibold text-2xl text-[var(--color-text)]">H4 – Heading Four</h4>
          <p className="text-xs font-mono text-[var(--color-text-subtle)] mt-1">Clash Display / Semibold 600 / 24px</p>
        </div>
      </div>
    </section>

    <section>
      <p className="text-xs font-mono text-[var(--color-text-muted)] uppercase tracking-widest mb-4">
        DM Sans – Body (font-body)
      </p>
      <div className="space-y-3">
        <p className="font-body text-base text-[var(--color-text)]">
          Body – DM Sans Regular 16px. Az elsődleges szövegtípus minden UI elemhez, bekezdésekhez, labelekhez, gombok feliratához.
        </p>
        <p className="font-body text-sm text-[var(--color-text-muted)]">
          Small – DM Sans 14px, muted. Másodlagos szöveg, leírások, hintek.
        </p>
        <p className="font-body text-xs text-[var(--color-text-subtle)]">
          XSmall – DM Sans 12px, subtle. Meta adatok, timestamps.
        </p>
      </div>
    </section>

    <section>
      <p className="text-xs font-mono text-[var(--color-text-muted)] uppercase tracking-widest mb-4">
        DM Mono – Data & Code (font-mono)
      </p>
      <div className="space-y-3">
        <p className="font-mono text-sm text-[var(--color-text)]">
          DM Mono 14px – Adatok, badge-ek, kódok, KPI értékek megjelenítéséhez.
        </p>
        <p className="font-mono text-xs text-[var(--color-text-muted)]">
          123,456 · +12.4% · 2026-03-06 · #FF544D · api_key_xyz
        </p>
      </div>
    </section>
  </div>
)

const meta: Meta = {
  title: 'Tokens/Typography',
  component: TypographyShowcase,
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
}
export default meta

type Story = StoryObj
export const Default: Story = {}
