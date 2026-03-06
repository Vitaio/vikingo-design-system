// Utils
export { cn } from './lib/utils'
export { formatSzam, formatFt, formatSzazalek, formatRovid } from './lib/format'

// Brand
export { Logo } from './components/ui/logo'
export type { LogoProps } from './components/ui/logo'

// UI Components
export { Button, buttonVariants } from './components/ui/button'
export type { ButtonProps } from './components/ui/button'

export { Badge, badgeVariants } from './components/ui/badge'
export type { BadgeProps } from './components/ui/badge'

export {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from './components/ui/card'

export { Input } from './components/ui/input'
export type { InputProps } from './components/ui/input'

export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
  SelectScrollUpButton,
  SelectScrollDownButton,
} from './components/ui/select'

export { Checkbox } from './components/ui/checkbox'
export { Switch } from './components/ui/switch'
export { RadioGroup, RadioGroupItem } from './components/ui/radio-group'
export { Textarea } from './components/ui/textarea'
export type { TextareaProps } from './components/ui/textarea'
export { Alert, AlertTitle, AlertDescription } from './components/ui/alert'
export type { AlertProps } from './components/ui/alert'
export { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from './components/ui/accordion'
export { Slider } from './components/ui/slider'
export { Progress } from './components/ui/progress'
export { Skeleton } from './components/ui/skeleton'
export { Separator } from './components/ui/separator'

export { Avatar, AvatarImage, AvatarFallback } from './components/ui/avatar'

// New components
export { Spinner } from './components/ui/spinner'
export type { SpinnerProps } from './components/ui/spinner'

export { Chip, ChipGroup } from './components/ui/chip'
export type { ChipProps, ChipGroupProps } from './components/ui/chip'

export { Carousel, CarouselItem } from './components/ui/carousel'
export type { CarouselProps, CarouselItemProps } from './components/ui/carousel'

export { DatePicker, DateRangePicker } from './components/ui/date-picker'
export type { DatePickerProps, DateRangePickerProps, DateRange } from './components/ui/date-picker'

export { SearchBar } from './components/ui/search'
export type { SearchBarProps, SearchResult } from './components/ui/search'

export { StatCard } from './components/ui/stat-card'
export type { StatCardProps } from './components/ui/stat-card'

export { ImageCard } from './components/ui/image-card'
export type { ImageCardProps } from './components/ui/image-card'

export { PeriodFilter } from './components/ui/period-filter'
export type { PeriodFilterProps, PeriodOption } from './components/ui/period-filter'

export { ChartCard } from './components/ui/chart-card'
export type { ChartCardProps } from './components/ui/chart-card'

export { PageHeader } from './components/ui/page-header'
export type { PageHeaderProps } from './components/ui/page-header'

export { MetricRow } from './components/ui/metric-row'
export type { MetricRowProps } from './components/ui/metric-row'

// Overlay Components
export {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogClose,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
} from './components/ui/dialog'

export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuGroup,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuRadioGroup,
} from './components/ui/dropdown-menu'

export {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from './components/ui/tooltip'

export { Toaster, toast } from './components/ui/toast'

// Navigation Components
export { Tabs, TabsList, TabsTrigger, TabsContent } from './components/ui/tabs'

export {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
} from './components/ui/breadcrumb'

export {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from './components/ui/pagination'

// Table
export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
} from './components/ui/table'

// Chart Components
export { AreaChart } from './components/charts/area-chart'
export type { AreaChartProps, AreaChartDataPoint } from './components/charts/area-chart'

export { MultiBarChart } from './components/charts/bar-chart'
export type { MultiBarChartProps, BarConfig } from './components/charts/bar-chart'

export { MultiLineChart } from './components/charts/line-chart'
export type { MultiLineChartProps, LineConfig } from './components/charts/line-chart'

// Layout Components
export { usePageLayout } from './components/layout/page-layout-context'
export { Sidebar } from './components/layout/sidebar'
export type { SidebarProps, NavItem, NavSection } from './components/layout/sidebar'

export { Topbar } from './components/layout/topbar'
export type { TopbarProps } from './components/layout/topbar'

export { PageLayout, PageContent } from './components/layout/page-layout'
export type { PageLayoutProps, PageContentProps } from './components/layout/page-layout'
