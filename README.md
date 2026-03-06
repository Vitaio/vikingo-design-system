# Vikingo Design System

A versioned, reusable React component library built for Vikingo SaaS products. Brand-consistent, dark/light mode ready, fully documented in Storybook.

**Live Storybook:** https://vikingo-storybook.vercel.app

---

## Stack

| Layer | Technology |
|---|---|
| Monorepo | Turborepo + pnpm workspaces |
| Components | React 19 + TypeScript |
| Styling | Tailwind CSS v4 |
| Primitives | Radix UI |
| Icons | Lucide React |
| Docs | Storybook 8 |
| Build | tsup (ESM + CJS dual output) |

---

## Brand

- **Accent:** `#FF544D` (orange-red CTA)
- **Background light:** `#F6EFE8` (beige)
- **Text / Sidebar:** `#3E2E45` (dark purple)
- **Dark background:** `#2A1F30`
- **Display font:** Clash Display 600 (self-hosted)
- **Body font:** DM Sans (Google Fonts CDN)
- **Mono font:** DM Mono (Google Fonts CDN)

---

## Using in a Project

### 1. Install from GitHub (recommended)

Since `@vikingo/ui` is a private package, install it directly from the GitHub repo:

```bash
# npm
npm install github:Vitaio/vikingo-design-system#main --workspace=packages/ui

# pnpm
pnpm add github:Vitaio/vikingo-design-system#main
```

Or pin a specific version tag:
```bash
pnpm add github:Vitaio/vikingo-design-system#v0.4.0
```

> **Prerequisite:** Your machine (or CI) must have SSH access to the private GitHub repo, or use a GitHub personal access token.

---

### 2. Install via pnpm workspace (monorepo)

If your app lives in the same monorepo or you link the package locally:

```bash
# In your app's package.json
"dependencies": {
  "@vikingo/ui": "workspace:*"
}
```

---

### 3. Setup in your app

**a) Install peer dependencies**

```bash
pnpm add react react-dom
pnpm add @radix-ui/react-dialog @radix-ui/react-label @radix-ui/react-slot
pnpm add lucide-react sonner
pnpm add tailwindcss
# For form validation (optional, only if using Form component):
pnpm add react-hook-form zod @hookform/resolvers
```

**b) Import styles**

In your app's entry point (e.g. `main.tsx` or `layout.tsx`):

```tsx
import '@vikingo/ui/styles'
```

This loads the Tailwind base, CSS custom properties (colors, spacing, radius, shadows), and fonts.

**c) Use components**

```tsx
import { Button, Input, Card, StatCard } from '@vikingo/ui'

export default function MyPage() {
  return (
    <Card>
      <Input label="Email" type="email" placeholder="you@example.com" />
      <Button>Küldés</Button>
    </Card>
  )
}
```

**d) Dark mode**

Toggle dark mode by adding/removing the `dark` class on `<html>`:

```ts
document.documentElement.classList.toggle('dark')
```

The Sidebar always uses dark tokens regardless of the active theme.

---

### 4. Layout setup (optional)

For a full app shell with sidebar + topbar:

```tsx
import { PageLayout, PageContent, Sidebar, Topbar } from '@vikingo/ui'

export default function AppShell({ children }) {
  return (
    <PageLayout>
      <Sidebar
        logo={<Logo />}
        navItems={navItems}
        bottomItems={bottomItems}
      />
      <PageContent>
        <Topbar title="Dashboard" />
        {children}
      </PageContent>
    </PageLayout>
  )
}
```

---

### 5. Toast notifications

Wrap your app with `<Toaster />` and call `toast()` anywhere:

```tsx
// In your root layout:
import { Toaster } from '@vikingo/ui'
<Toaster />

// Anywhere in your app:
import { toast } from '@vikingo/ui'
toast.success('Mentés sikeres!')
toast.error('Hiba történt.')
```

---

## Packages

### `@vikingo/ui`

The main component library. Located in `packages/ui/`.

---

## Component Library

### Forms
`Button` · `Input` · `Textarea` · `Select` · `Checkbox` · `Switch` · `RadioGroup` · `Slider` · `Chip` / `ChipGroup` · `DatePicker` / `DateRangePicker` · `SearchBar`

### Display
`Avatar` · `Badge` · `Card` · `Alert` · `Progress` · `Skeleton` · `ImageCard` · `Spinner` · `Separator` (Divider) · `Carousel` / `CarouselItem`

### Overlays
`Dialog` · `Tooltip` / `TooltipProvider` · `Toaster` / `toast` · `DropdownMenu` (Menu)

### Navigation
`Tabs` · `Breadcrumb` · `Pagination` · `Accordion`

### Data
`Table` · `StatCard` · `ChartCard` · `MetricRow` · `PeriodFilter`

### Layout
`Sidebar` · `Topbar` · `PageLayout` · `PageContent` · `PageHeader`

### Charts
`AreaChart` · `MultiBarChart` · `MultiLineChart`

---

## Monorepo Structure

```
vikingo-design-system/
├── packages/
│   └── ui/                    # @vikingo/ui
│       ├── src/
│       │   ├── components/
│       │   │   ├── ui/        # All UI components
│       │   │   ├── charts/    # Recharts wrappers
│       │   │   └── layout/    # Sidebar, Topbar, PageLayout
│       │   ├── styles/
│       │   │   ├── globals.css   # Tailwind v4 + CSS custom properties
│       │   │   └── fonts.css     # Clash Display @font-face
│       │   ├── lib/
│       │   │   ├── utils.ts      # cn() helper
│       │   │   └── format.ts     # Hungarian number formatters
│       │   └── index.ts          # All exports
│       └── package.json
└── apps/
    └── storybook/             # Storybook 8 documentation
        ├── .storybook/
        └── stories/
            ├── tokens/        # Colors, Typography, Spacing, Icons
            ├── ui/            # All component stories
            └── layout/        # Layout stories
```

---

## Development

```bash
# Install dependencies
pnpm install

# Start Storybook (port 6006)
pnpm storybook

# Build @vikingo/ui
pnpm build

# Watch mode (auto-rebuild on source changes)
cd packages/ui && pnpm dev
```

> **Note:** After changing component source, either run `pnpm build` in `packages/ui/` or keep `pnpm dev` running in the background so the dist stays current.

---

## Dark / Light Mode

Class-based: `<html class="dark">`. Storybook has a toolbar toggle via `@storybook/addon-themes`.

The Sidebar always uses dark tokens (`--sidebar-bg: #3E2E45`) regardless of the active theme.

---

## Deploy

Storybook is auto-deployed to Vercel on every push to `main` via `.github/workflows/storybook.yml`.
