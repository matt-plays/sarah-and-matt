'use client'

import { useRef, useState } from 'react'
import Image from 'next/image'
import { ArrowLeft, ArrowRight } from '@mattplays/mpds/icons'

// ─── Data ─────────────────────────────────────────────────────────────────────

type PhotoVariant = 'BTV' | 'COVID' | 'Poconos' | 'Engaged' | 'Excelsior'

interface TimelineEntry {
  id: string
  year: string
  heading: string
  body: string
  photoVariant: PhotoVariant | null
}

const ENTRIES: TimelineEntry[] = [
  {
    id: 'btv',
    year: '2019',
    heading: 'Met in\nBurlington, VT',
    body: 'Two strangers at the right place and the right time. Neither of us knew what was beginning.',
    photoVariant: 'BTV',
  },
  {
    id: 'covid',
    year: '2020',
    heading: 'Kept in touch\nduring the pandemic',
    body: 'When the world slowed down, we didn\'t. Late-night calls and care packages kept us close.',
    photoVariant: 'COVID',
  },
  {
    id: 'poconos',
    year: '2024',
    heading: 'Reconnected\nin the Poconos',
    body: 'A weekend in the mountains turned into something neither of us expected — the start of everything.',
    photoVariant: 'Poconos',
  },
  {
    id: 'engaged',
    year: '2025',
    heading: 'Got engaged in\nHudson, NY',
    body: 'Overlooking the river, on a perfect autumn afternoon, Matt asked the question. Sarah said yes.',
    photoVariant: 'Engaged',
  },
  {
    id: 'excelsior',
    year: '2026',
    heading: 'August 28th,\nLancaster PA',
    body: 'Friends, family, and everyone we love gathered in one place to celebrate with us. We can\'t wait.',
    photoVariant: 'Excelsior',
  },
]

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
  const MAJOR = 80
  const MED   = 48
  const MINOR = 32
  const STEP  = 8                          // 8px grid — ITEM_W must be a multiple of 8
  const count = Math.floor(ITEM_W / STEP) // 536 / 8 = 67 ticks, no remainder

  const tickHeight = (i: number) => {
    if (i === 1)            return MAJOR  // event marker
    if (i === 0 || i === 2) return MED    // flanking markers
    if (i === count - 1)    return MED    // end cap
    return MINOR
  }

  return (
    // Ruler always renders at full opacity — ticks are consistent across all states
    <svg
      width={ITEM_W}
      height={MAJOR}
      viewBox={`0 0 ${ITEM_W} ${MAJOR}`}
      className="text-[var(--theme-tonal)] shrink-0"
      aria-hidden="true"
    >
      <line x1={0} y1={0.5} x2={ITEM_W} y2={0.5} stroke="currentColor" strokeWidth={1} />
      {Array.from({ length: count }, (_, i) => (
        <line
          key={i}
          x1={i * STEP + 0.5}
          y1={0}
          x2={i * STEP + 0.5}
          y2={tickHeight(i)}
          stroke="currentColor"
          strokeWidth={1}
        />
      ))}
    </svg>
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
              className={`absolute right-0 top-1/2 -translate-y-1/2 transition-opacity duration-300 ${
                isHovered ? 'opacity-100' : 'opacity-0'
              }`}
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
            className="font-instrument font-medium text-[var(--theme-headline)] leading-[1.125] whitespace-pre-line w-full"
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

export default function TimelineSection() {
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
      className="w-full bg-[var(--theme-bg)] overflow-hidden"
      style={{ paddingTop: 'var(--site-section-padding)', paddingBottom: 'var(--sp-2xl)' }}
    >
      <div
        className="site-container flex flex-col"
        style={{ gap: 'var(--mpds-space-48)' }}
      >
        {/* Section header + arrow controls */}
        <div className="flex items-center justify-between w-full">
          <h2
            className="font-instrument font-medium text-[var(--theme-headline)] leading-[1.125]"
            style={{ fontSize: 'clamp(32px, 2vw + 20px, 48px)', letterSpacing: '-0.02em' }}
          >
            A tale as old as time
          </h2>
          <div className="flex gap-2 shrink-0">
            <ArrowButton direction="left" onClick={() => scroll('left')} disabled={!canScrollLeft} />
            <ArrowButton direction="right" onClick={() => scroll('right')} disabled={!canScrollRight} />
          </div>
        </div>

        {/* Scrollable items — no gap so rulers form one continuous line */}
        <div
          ref={scrollRef}
          className="w-full overflow-x-auto scrollbar-none"
          onScroll={handleScroll}
        >
          <div className="flex">
            {ENTRIES.map((entry) => (
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
      </div>
    </section>
  )
}
