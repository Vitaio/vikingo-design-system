# Project Rules for Claude Code

This project uses the **Vikingo Design System** (`@vikingo/ui`).

## Core Rules

- **Never create custom UI components.** Always use components from `@vikingo/ui`.
- **Never write custom CSS.** Use Tailwind utility classes and CSS custom properties (`--color-*`, `--radius-*`, etc.).
- **Never install other UI libraries** (shadcn/ui, MUI, Ant Design, Chakra, etc.).
- All imports come from `@vikingo/ui`: `import { Button, Input, Card } from '@vikingo/ui'`

---

## Available Components

### Forms
`Button` `Input` `NumberInput` `Textarea` `Select` `Checkbox` `Switch` `RadioGroup` `RadioButton` `Slider` `Chip` `ChipGroup` `DatePicker` `DateRangePicker` `SearchBar` `FileUpload` `Combobox` `CopyButton` `Form` `FormField` `FormItem` `FormLabel` `FormControl` `FormDescription` `FormMessage`

### Display
`Avatar` `Badge` `Card` `Alert` `Progress` `Skeleton` `ImageCard` `Spinner` `Separator` `Carousel` `CarouselItem` `EmptyState` `Logo`

### Overlays
`Dialog` `Drawer` `Tooltip` `TooltipProvider` `Toaster` `toast` `DropdownMenu` `CommandPalette` `ConfirmDialog`

### Navigation
`Tabs` `Breadcrumb` `Pagination` `Accordion`

### Data
`Table` `StatCard` `ChartCard` `MetricRow` `PeriodFilter` `PageHeader`

### Layout
`PageLayout` `PageContent` `Sidebar` `Topbar`

### Charts
`AreaChart` `MultiBarChart` `MultiLineChart`

**Reference:** https://vikingo-storybook.vercel.app

---

## Import Pattern

```tsx
import { Button, Input, Card, Dialog, toast, Toaster } from '@vikingo/ui'
```

Styles must be imported once in the entry point (already done in this project):
```tsx
import '@vikingo/ui/styles'
```

---

## Styling

Use Tailwind utility classes for layout and spacing. Use CSS custom properties for brand colors:

```tsx
// Correct — Tailwind utilities
<div className="flex flex-col gap-4 p-6">

// Correct — brand color via CSS variable
<p className="text-[var(--color-text-muted)]">

// Wrong — hardcoded color
<p style={{ color: '#888' }}>

// Wrong — custom CSS class
<p className="my-custom-text">
```

Available CSS custom properties:
- Colors: `--color-text`, `--color-text-muted`, `--color-bg`, `--color-surface`, `--color-border`, `--color-accent`, `--color-accent-hover`, `--color-accent-muted`
- Status: `--color-success`, `--color-warning`, `--color-error`, `--color-info`
- Radius: `--radius-sm`, `--radius-md`, `--radius-lg`, `--radius-xl`, `--radius-full`
- Shadow: `--shadow-sm`, `--shadow-md`, `--shadow-lg`

---

## Common Patterns

### Button
```tsx
<Button variant="primary" size="md" onClick={handleClick}>Mentés</Button>
<Button variant="secondary">Mégse</Button>
<Button variant="destructive">Törlés</Button>
<Button variant="ghost" size="icon"><Trash2 /></Button>
<Button isLoading>Folyamatban...</Button>
```

### Input
```tsx
<Input label="Email" type="email" placeholder="you@example.com" hint="Nem jelenítjük meg" />
<Input label="Jelszó" type="password" error />
```

### Form (react-hook-form + zod)
```tsx
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage, Button, Input } from '@vikingo/ui'

const schema = z.object({ email: z.string().email() })

function MyForm() {
  const form = useForm({ resolver: zodResolver(schema) })
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(console.log)} className="flex flex-col gap-4">
        <FormField control={form.control} name="email" render={({ field }) => (
          <FormItem>
            <FormLabel>Email</FormLabel>
            <FormControl><Input type="email" {...field} /></FormControl>
            <FormMessage />
          </FormItem>
        )} />
        <Button type="submit">Küldés</Button>
      </form>
    </Form>
  )
}
```

### Toast
```tsx
import { toast } from '@vikingo/ui'

toast.success('Sikeres mentés!')
toast.error('Hiba történt.')
toast.info('Frissítés elérhető.')
toast.warning('Lejáró előfizetés.')
```

`<Toaster />` must be present in the root layout (already added).

### Dialog
```tsx
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter, Button } from '@vikingo/ui'

<Dialog>
  <DialogTrigger asChild><Button>Megnyit</Button></DialogTrigger>
  <DialogContent>
    <DialogHeader><DialogTitle>Cím</DialogTitle></DialogHeader>
    <p>Tartalom</p>
    <DialogFooter><Button>OK</Button></DialogFooter>
  </DialogContent>
</Dialog>
```

### Confirm Dialog (destructive actions)
```tsx
import { ConfirmDialog } from '@vikingo/ui'

<ConfirmDialog
  trigger={<Button variant="destructive">Törlés</Button>}
  title="Biztosan törlöd?"
  description="Ez a művelet nem vonható vissza."
  confirmLabel="Törlés"
  variant="destructive"
  onConfirm={async () => { await deleteItem() }}
/>
```

### Table
```tsx
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from '@vikingo/ui'

<Table>
  <TableHeader>
    <TableRow>
      <TableHead>Név</TableHead>
      <TableHead>Email</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    {rows.map(row => (
      <TableRow key={row.id}>
        <TableCell>{row.name}</TableCell>
        <TableCell>{row.email}</TableCell>
      </TableRow>
    ))}
  </TableBody>
</Table>
```

### Dark Mode
```ts
document.documentElement.classList.toggle('dark')
// or
document.documentElement.classList.add('dark')
document.documentElement.classList.remove('dark')
```

---

## Layout (App Shell)

```tsx
import { PageLayout, PageContent, Sidebar, Topbar, Logo } from '@vikingo/ui'

const navItems = [
  { label: 'Dashboard', href: '/', icon: <LayoutDashboard size={18} /> },
  { label: 'Ügyfelek', href: '/clients', icon: <Users size={18} /> },
]

export default function AppShell({ children }) {
  return (
    <PageLayout>
      <Sidebar logo={<Logo />} navItems={navItems} />
      <PageContent>
        <Topbar title="Oldal neve" />
        {children}
      </PageContent>
    </PageLayout>
  )
}
```

---

## What NOT to Do

```tsx
// ❌ Don't create a custom button
function MyButton({ children }) {
  return <button className="bg-blue-500 text-white px-4 py-2 rounded">{children}</button>
}

// ✅ Use the design system button
import { Button } from '@vikingo/ui'
<Button variant="primary">{children}</Button>

// ❌ Don't use hardcoded colors
<div style={{ backgroundColor: '#FF544D' }}>

// ✅ Use CSS custom properties
<div className="bg-[var(--color-accent)]">

// ❌ Don't install shadcn components
npx shadcn-ui add button

// ✅ Already in @vikingo/ui
import { Button } from '@vikingo/ui'
```
