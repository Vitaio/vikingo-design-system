# Changelog

All notable changes to the Vikingo Design System.

---

## [0.3.0] – 2026-03-06

### New Components
- **Spinner** (`Display/Spinner`) — CVA-based loading indicator with 5 sizes (xs–xl) and 6 color variants (accent, muted, white, success, warning, error); optional `label` prop
- **Chip / ChipGroup** (`Forms/Chip`) — All 4 M3 chip types: assist, filter (toggleable), input (removable), suggestion
- **Carousel / CarouselItem** (`Display/Carousel`) — Scroll-snap carousel with `itemsPerView` (1/2/3/auto), dot indicators, prev/next arrows on hover, no external dependency
- **DatePicker / DateRangePicker** (`Forms/Date Picker`) — Custom calendar built with Radix Popover; Hungarian month/day names, Monday-first grid, min/max constraints, range hover preview
- **SearchBar** (`Forms/Search`) — Controlled/uncontrolled search with result dropdown, keyboard navigation (↑↓ Enter Esc), grouped categories, loading state

### New Stories
- `Display/Divider` — 5 stories using the existing `Separator` component (horizontal, vertical, with label, in card, inset)
- `Overlays/Menu` — 5 stories using existing `DropdownMenu` (context menu, user menu, campaign actions, filter menu, nested submenu)
- `Navigation/Pagination` — Added `Icon Only · Csak nyilak` story with chevron-only navigation

### Fixes & Improvements
- **Storybook:** Added `viteFinal` hook with `resolve.conditions: ['source']` and `optimizeDeps.exclude` — Storybook now resolves `@vikingo/ui` to TypeScript source without a dist rebuild
- **Storybook:** Added `"source"` export condition to `packages/ui/package.json` for Vite-friendly source resolution
- **Tooltip:** Added `animate-in` / `animate-out` / `fade-in-0` / `zoom-in-95` / `slide-in-from-*` keyframes and CSS classes to `globals.css` — tooltips were previously invisible because these animation utilities were missing
- **Switch:** Larger size (h-6 w-11, thumb h-5 w-5), `cubic-bezier(0.4,0,0.2,1)` easing, `will-change-transform` for GPU-accelerated thumb movement
- **Pagination:** Fixed text overflow on Előző/Következő buttons — root cause was `PaginationPrevious`/`PaginationNext` inheriting the fixed `w-7` from `PaginationLink`'s `icon-sm` variant; now render as standalone `<a>` elements with `ghost/sm` styles
- **SearchBar:** Fixed TypeScript `DTS` build error — excluded `size` and `results` from `InputHTMLAttributes` Omit to avoid type conflicts with native HTML attributes
- **Story naming:** All stories renamed to bilingual `'English · Magyar'` format with logical Storybook group hierarchy (Forms / Display / Overlays / Navigation / Data / Layout / Tokens)

---

## [0.2.0] – 2025-12-01

### New Components
- **Accordion** (Radix UI) — collapsible sections with animated open/close
- **RadioGroup / RadioGroupItem** (Radix UI)
- **Slider** (Radix UI) — accent/success/default variants
- **Textarea**
- **Alert** — info/success/warning/error variants, closeable
- **ChartCard** — wrapper for area/bar/line charts with period filter
- **MetricRow** — horizontal KPI row
- **PeriodFilter** — preset date range selector
- **PageHeader** — page title + breadcrumb + action slot
- **AreaChart / MultiBarChart / MultiLineChart** — Recharts wrappers with brand tokens

### New Features
- Dark mode class-based toggle (`html.dark`) with Storybook toolbar
- Storybook `@storybook/addon-themes` integration
- Vercel auto-deploy via GitHub Actions

---

## [0.1.0] – 2025-10-15

### Initial Release

Core component library:

- **Button** — primary/secondary/ghost/destructive, sizes sm/md/lg, loading state
- **Input** — label, hint, error, left/right icon slots
- **Select** — Radix Select
- **Checkbox / Switch** — Radix primitives
- **Badge** — default/accent/success/warning/error, dot variant
- **Card** — padding variants, hover state
- **StatCard** — KPI value with trend arrow and period label
- **Avatar / AvatarImage / AvatarFallback** — image + initials fallback
- **Progress / Skeleton / Separator**
- **Dialog** — Radix Dialog
- **DropdownMenu** — full Radix DropdownMenu API (checkbox, radio, sub, shortcut)
- **Tooltip / TooltipProvider** — Radix Tooltip
- **Toaster / toast** — Sonner-based toast notifications
- **Tabs** — Radix Tabs, underline + pill variants
- **Breadcrumb / Pagination**
- **Table** — sortable headers, checkbox selection, row actions
- **ImageCard** — ad library card with image, title, tags, badge
- **Sidebar / Topbar / PageLayout** — collapsible app shell
- **Logo** — brand SVG component

Design tokens: CSS custom properties for color, typography, radius, spacing, shadow, transition — light + dark mode, Tailwind v4 `@theme` bridge.

Fonts: Clash Display (self-hosted woff2), DM Sans + DM Mono (Google Fonts CDN).
