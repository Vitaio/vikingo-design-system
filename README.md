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

## Packages

### `@vikingo/ui`

The main component library. Located in `packages/ui/`.

**Install (internal):**
```bash
pnpm add @vikingo/ui
```

**Usage:**
```tsx
import { Button, StatCard, Sidebar } from '@vikingo/ui'
import '@vikingo/ui/styles'
```

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
