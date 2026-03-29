'use client'

import { useRef, useState } from 'react'
import Image from 'next/image'
import { ArrowLeft, ArrowRight } from '@mattplays/mpds/icons'
import type { StoryCard } from '@/types/content'

// ─── Types ────────────────────────────────────────────────────────────────────

type PhotoVariant = 'BTV' | 'COVID' | 'Poconos' | 'Engaged' | 'Excelsior'

interface TimelineEntry {
  id: string
  year: string
  heading: string
  body: string
  photoVariant: PhotoVariant | null
}

// Photo variants assigned by position — tied to specific image files
const PHOTO_VARIANTS: (PhotoVariant | null)[] = ['BTV', 'COVID', 'Poconos', 'Engaged', null, null, 'Excelsior']

const PHOTO_PAIRS: Record<PhotoVariant, [string, string]> = {
  BTV:       ['/images/timeline/wedding-site--timeline-vingnette-01-left.png',  '/images/timeline/wedding-site--timeline-vingnette-01-right.png'],
  COVID:     ['/images/timeline/wedding-site--timeline-vingnette-02-left.png',  '/images/timeline/wedding-site--timeline-vingnette-02-right.png'],
  Poconos:   ['/images/timeline/wedding-site--timeline-vingnette-03-left.png',  '/images/timeline/wedding-site--timeline-vingnette-03-right.png'],
  Engaged:   ['/images/timeline/wedding-site--timeline-vingnette-04-left.png',  '/images/timeline/wedding-site--timeline-vingnette-04-right.png'],
  Excelsior: ['/images/timeline/wedding-site--timeline-vingnette-05-left.png',  '/images/timeline/wedding-site--timeline-vingnette-05-right.png'],
}

// ─── Timeline Ruler ───────────────────────────────────────────────────────────

const ITEM_W = 536

function TimelineRuler() {
  const [hoveredTick, setHoveredTick] = useState<number | null>(null)
  const MAJOR = 80
  const MED   = 48
  const MINOR = 32
  const STEP  = 8                          // 8px grid — ITEM_W must be a multiple of 8
  const count = Math.floor(ITEM_W / STEP) // 536 / 8 = 67 ticks, no remainder

  const baseHeight = (i: number) => {
    if (i === 1)            return MAJOR  // event marker
    if (i === 0 || i === 2) return MED    // flanking markers
    if (i === count - 1)    return MED    // end cap
    return MINOR
  }

  return (
    // Hover targets span the full MAJOR height so small ticks are easy to hit.
    // Height is animated via inline style — scale-y was unreliable on short ticks.
    <div className="relative shrink-0" style={{ width: ITEM_W, height: MAJOR }} aria-hidden="true">
      {Array.from({ length: count }, (_, i) => {
        const base = baseHeight(i)
        const dist = hoveredTick === null ? Infinity : Math.abs(i - hoveredTick)
        const bump = Math.max(0, 14 - dist * 4)  // 14, 10, 6, 2, 0 at distances 0–4
        const h = Math.min(base + bump, MAJOR)
        return (
          <div
            key={i}
            className="absolute top-0"
            style={{ left: i * STEP - 3, width: 7, height: MAJOR, cursor: 'default' }}
            onMouseEnter={() => setHoveredTick(i)}
            onMouseLeave={() => setHoveredTick(null)}
          >
            <div
              className="absolute left-[3px] top-0 w-px bg-[var(--theme-tonal)]"
              style={{ height: h, transition: 'height 120ms ease-out' }}
            />
          </div>
        )
      })}
    </div>
  )
}

// ─── Photo Group ──────────────────────────────────────────────────────────────

function PhotoGroup({ variant }: { variant: PhotoVariant }) {
  const [left, right] = PHOTO_PAIRS[variant]
  return (
    <div className="flex items-center shrink-0" style={{ paddingRight: 12 }}>
      <div
        className="relative rounded-full shrink-0 overflow-hidden ring-1 ring-[var(--theme-bg)]"
        style={{ width: 48, height: 48, marginRight: -12, zIndex: 1 }}
      >
        <Image src={left} alt="" fill className="object-cover" sizes="48px" />
      </div>
      <div
        className="relative rounded-full shrink-0 overflow-hidden ring-1 ring-[var(--theme-bg)]"
        style={{ width: 48, height: 48, marginRight: -12, zIndex: 0 }}
      >
        <Image src={right} alt="" fill className="object-cover" sizes="48px" />
      </div>
    </div>
  )
}

// ─── Year Dot (circle) ────────────────────────────────────────────────────────

function Dot({ active }: { active?: boolean }) {
  return (
    <div
      className={`shrink-0 rounded-full bg-[var(--theme-action)] transition-opacity duration-300 ${
        active ? 'opacity-100' : 'opacity-50'
      }`}
      style={{ width: 8, height: 8 }}
      aria-hidden="true"
    />
  )
}

// ─── Arrow Button ─────────────────────────────────────────────────────────────

function ArrowButton({
  direction,
  onClick,
  disabled,
}: {
  direction: 'left' | 'right'
  onClick: () => void
  disabled?: boolean
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      aria-label={direction === 'left' ? 'Previous' : 'Next'}
      className={`flex items-center justify-center rounded-full shrink-0 transition-colors border
        bg-transparent border-[var(--theme-action)] text-[var(--theme-action)]
        hover:bg-[var(--theme-action)] hover:border-[var(--theme-action)] hover:text-[var(--theme-btn-text)]
        active:bg-[var(--theme-action-pressed)] active:border-[var(--theme-action-pressed)] active:text-[var(--theme-btn-text)]
        focus-visible:outline-none
        disabled:bg-transparent disabled:border-[var(--theme-tonal)] disabled:text-[var(--theme-tonal)] disabled:cursor-not-allowed`}
      style={{ width: 48, height: 48 }}
    >
      {direction === 'left' ? <ArrowLeft /> : <ArrowRight />}
    </button>
  )
}

// ─── Item ─────────────────────────────────────────────────────────────────────

interface ItemProps {
  entry: TimelineEntry
  isHovered: boolean
  isOtherHovered: boolean
  onMouseEnter: () => void
  onMouseLeave: () => void
}

function Item({ entry, isHovered, isOtherHovered, onMouseEnter, onMouseLeave }: ItemProps) {
  return (
    <div
      className="flex flex-col gap-2 shrink-0"
      style={{ width: ITEM_W }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {/* Ruler — always full opacity; ticks never dim */}
      <TimelineRuler />

      {/* Card — only this fades when another item is hovered */}
      <div
        className={`flex flex-col items-start transition-opacity duration-300 ${
          isOtherHovered ? 'opacity-50' : 'opacity-100'
        }`}
        style={{ gap: 'var(--mpds-space-48)' }}
      >
        {/* Year row — photo group is absolutely positioned so it never affects layout */}
        <div className="relative flex items-center gap-[10px] w-full">
          <Dot active={isHovered} />
          <span
            className="flex-1 font-dm font-bold uppercase text-[var(--theme-action)] leading-[1.125] tracking-[0.12em]"
            style={{ fontSize: 'var(--mpds-font-size-sm)' }}
          >
            {entry.year}
          </span>
          {entry.photoVariant && (
            <div
              className={`absolute top-1/2 -translate-y-1/2 transition-opacity duration-300 ${
                isHovered ? 'opacity-100' : 'opacity-0'
              }`}
              style={{ right: 'var(--mpds-space-80)' }}
            >
              <PhotoGroup variant={entry.photoVariant} />
            </div>
          )}
        </div>

        {/* Text — right padding is always applied so wrap never changes between states */}
        <div
          className="flex flex-col w-full"
          style={{ gap: 'var(--mpds-space-12, 12px)', paddingRight: 'var(--mpds-space-80)' }}
        >
          <h3
            className="font-instrument font-medium text-[var(--theme-headline)] leading-[1.125] whitespace-nowrap w-full"
            style={{ fontSize: 'var(--mpds-font-size-2xl)', letterSpacing: '-0.02em' }}
          >
            {entry.heading}
          </h3>
          <p
            className="font-instrument text-[var(--theme-text)] leading-[1.625] w-full"
            style={{ fontSize: 'var(--mpds-font-size-md)' }}
          >
            {entry.body}
          </p>
        </div>
      </div>
    </div>
  )
}

// ─── Section ──────────────────────────────────────────────────────────────────

export default function TimelineSection({ story }: { story: StoryCard[] }) {
  const entries: TimelineEntry[] = story.map((card, i) => ({
    id:           card.id,
    year:         card.year,
    heading:      card.heading,
    body:         card.body,
    photoVariant: PHOTO_VARIANTS[i] ?? null,
  }))

  const [hoveredId, setHoveredId] = useState<string | null>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)
  const scrollRef = useRef<HTMLDivElement>(null)

  const handleScroll = () => {
    const el = scrollRef.current
    if (!el) return
    setCanScrollLeft(el.scrollLeft > 0)
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 1)
  }

  const scroll = (dir: 'left' | 'right') => {
    scrollRef.current?.scrollBy({ left: dir === 'right' ? ITEM_W : -ITEM_W, behavior: 'smooth' })
  }

  return (
    <section
      data-theme="default"
      className="w-full bg-[var(--theme-bg)]"
      style={{ paddingTop: 'var(--site-section-padding)', paddingBottom: 'var(--sp-2xl)' }}
    >
      {/* Header stays within the container */}
      <div
        className="site-container"
        style={{ marginBottom: 'var(--mpds-space-48)' }}
      >
        <div className="flex items-center justify-between w-full">
          <h2
            className="font-instrument font-medium text-[var(--theme-headline)] leading-[1.125]"
            style={{ fontSize: 'clamp(32px, 2vw + 20px, 48px)', letterSpacing: '-0.02em' }}
          >
            Our winding road
          </h2>
          <div className="hidden md:flex gap-2 shrink-0">
            <ArrowButton direction="left" onClick={() => scroll('left')} disabled={!canScrollLeft} />
            <ArrowButton direction="right" onClick={() => scroll('right')} disabled={!canScrollRight} />
          </div>
        </div>
      </div>

      {/* Scrollable — left edge aligns with container content, right edge bleeds to viewport */}
      <div
        ref={scrollRef}
        className="w-full overflow-x-auto scrollbar-none"
        style={{
          paddingLeft: 'max(var(--site-section-padding), calc((100vw - var(--site-container-width)) / 2 + var(--site-section-padding)))',
        }}
        onScroll={handleScroll}
      >
        <div className="flex">
          {entries.map((entry) => (
            <Item
              key={entry.id}
              entry={entry}
              isHovered={hoveredId === entry.id}
              isOtherHovered={hoveredId !== null && hoveredId !== entry.id}
              onMouseEnter={() => setHoveredId(entry.id)}
              onMouseLeave={() => setHoveredId(null)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
