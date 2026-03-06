import React, { useState, useRef, useCallback, useEffect } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '../../lib/utils'

// ── Types ───────────────────────────────────────────────────────────────────

export interface CarouselProps extends React.HTMLAttributes<HTMLDivElement> {
  /** How many items to show at once (on desktop) */
  itemsPerView?: 1 | 2 | 3 | 'auto'
  /** Show prev/next arrow buttons */
  showArrows?: boolean
  /** Show dot indicators */
  showDots?: boolean
  /** Loop around at the ends */
  loop?: boolean
  /** Gap between items in px */
  gap?: number
}

// ── CarouselItem ────────────────────────────────────────────────────────────

export interface CarouselItemProps extends React.HTMLAttributes<HTMLDivElement> {}

export function CarouselItem({ className, children, ...props }: CarouselItemProps) {
  return (
    <div
      className={cn('shrink-0 snap-start', className)}
      {...props}
    >
      {children}
    </div>
  )
}

// ── Carousel ────────────────────────────────────────────────────────────────

export function Carousel({
  itemsPerView = 1,
  showArrows = true,
  showDots = true,
  loop = false,
  gap = 16,
  className,
  children,
  ...props
}: CarouselProps) {
  const trackRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [canPrev, setCanPrev] = useState(false)
  const [canNext, setCanNext] = useState(true)

  const items = React.Children.toArray(children)
  const count = items.length

  const getItemWidth = useCallback(() => {
    if (!trackRef.current) return 0
    const track = trackRef.current
    if (itemsPerView === 'auto') return 0
    return (track.offsetWidth - gap * (itemsPerView - 1)) / itemsPerView
  }, [itemsPerView, gap])

  const scrollToIndex = useCallback(
    (index: number) => {
      if (!trackRef.current) return
      const clampedIndex = loop
        ? ((index % count) + count) % count
        : Math.max(0, Math.min(index, count - 1))

      if (itemsPerView !== 'auto') {
        const itemW = getItemWidth()
        const offset = clampedIndex * (itemW + gap)
        trackRef.current.scrollTo({ left: offset, behavior: 'smooth' })
      }
      setActiveIndex(clampedIndex)
    },
    [count, gap, getItemWidth, itemsPerView, loop]
  )

  // Track scroll position for dot sync
  const onScroll = useCallback(() => {
    if (!trackRef.current || itemsPerView === 'auto') return
    const itemW = getItemWidth()
    if (itemW === 0) return
    const scrollLeft = trackRef.current.scrollLeft
    const idx = Math.round(scrollLeft / (itemW + gap))
    setActiveIndex(idx)
    setCanPrev(scrollLeft > 4)
    setCanNext(scrollLeft < trackRef.current.scrollWidth - trackRef.current.offsetWidth - 4)
  }, [gap, getItemWidth, itemsPerView])

  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    track.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => track.removeEventListener('scroll', onScroll)
  }, [onScroll])

  // Compute item flex style
  const itemStyle: React.CSSProperties =
    itemsPerView !== 'auto'
      ? { width: `calc((100% - ${gap * (itemsPerView - 1)}px) / ${itemsPerView})` }
      : {}

  const styledChildren = React.Children.map(children, (child) => {
    if (!React.isValidElement(child)) return child
    return React.cloneElement(child as React.ReactElement<CarouselItemProps>, {
      style: { ...itemStyle, ...(child.props as CarouselItemProps).style },
    })
  })

  return (
    <div className={cn('relative group/carousel', className)} {...props}>
      {/* Track */}
      <div
        ref={trackRef}
        className="flex overflow-x-auto scroll-smooth snap-x snap-mandatory scrollbar-none"
        style={{ gap }}
      >
        {styledChildren}
      </div>

      {/* Arrow buttons */}
      {showArrows && (
        <>
          <button
            type="button"
            aria-label="Előző"
            onClick={() => scrollToIndex(activeIndex - 1)}
            disabled={!loop && !canPrev}
            className={cn(
              'absolute left-2 top-1/2 -translate-y-1/2 z-10',
              'h-8 w-8 rounded-full flex items-center justify-center',
              'bg-[var(--color-surface)]/90 backdrop-blur-sm border border-[var(--color-border)]',
              'shadow-[var(--shadow-md)] text-[var(--color-text)]',
              'transition-all duration-[var(--transition-fast)]',
              'opacity-0 group-hover/carousel:opacity-100',
              'hover:bg-[var(--color-bg)] hover:scale-105 active:scale-95',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]/40',
              (!loop && !canPrev) && 'opacity-0 pointer-events-none'
            )}
          >
            <ChevronLeft className="h-4 w-4" />
          </button>

          <button
            type="button"
            aria-label="Következő"
            onClick={() => scrollToIndex(activeIndex + 1)}
            disabled={!loop && !canNext}
            className={cn(
              'absolute right-2 top-1/2 -translate-y-1/2 z-10',
              'h-8 w-8 rounded-full flex items-center justify-center',
              'bg-[var(--color-surface)]/90 backdrop-blur-sm border border-[var(--color-border)]',
              'shadow-[var(--shadow-md)] text-[var(--color-text)]',
              'transition-all duration-[var(--transition-fast)]',
              'opacity-0 group-hover/carousel:opacity-100',
              'hover:bg-[var(--color-bg)] hover:scale-105 active:scale-95',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]/40',
              (!loop && !canNext) && 'opacity-0 pointer-events-none'
            )}
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </>
      )}

      {/* Dots */}
      {showDots && count > 1 && (
        <div className="flex items-center justify-center gap-1.5 mt-3">
          {Array.from({ length: count }).map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`${i + 1}. elem`}
              onClick={() => scrollToIndex(i)}
              className={cn(
                'rounded-full transition-all duration-[var(--transition-base)]',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]/40',
                i === activeIndex
                  ? 'w-5 h-2 bg-[var(--color-accent)]'
                  : 'w-2 h-2 bg-[var(--color-border-strong)] hover:bg-[var(--color-text-muted)]'
              )}
            />
          ))}
        </div>
      )}
    </div>
  )
}
