'use client'
// Figma node: 342:6179
// "Our Celebration" section — event details, venue address, accordion info rows + photos.

import { useState, useRef, useEffect, useCallback } from 'react'
import { prepare, layout, type PreparedText } from '@chenglou/pretext'
import { ChevronRight } from '@mattplays/mpds/icons'
import { CelebrationContent, InfoRowData } from '@/types/content'
import { useScrollSection } from '@/context/ThemeContext'

// ─── Accordion Item ─────────────────────────────────────────────────────────

function AccordionItem({
  row,
  isOpen,
  onToggle,
  isLast,
}: {
  row: InfoRowData
  isOpen: boolean
  onToggle: () => void
  isLast: boolean
}) {
  const containerRef = useRef<HTMLDivElement>(null)
  const preparedRef = useRef<PreparedText | null>(null)
  const [contentHeight, setContentHeight] = useState(0)

  const plainText = row.bodySegments
    ? row.bodySegments.map((s) => s.text).join('')
    : row.body

  const measure = useCallback(() => {
    if (!containerRef.current || !preparedRef.current) return
    const width = containerRef.current.offsetWidth
    const fontSize = parseFloat(getComputedStyle(containerRef.current).fontSize)
    const lineHeight = fontSize * 1.625
    const { height } = layout(preparedRef.current, width, lineHeight)
    // Add top padding (12px from design) + bottom padding (32px)
    setContentHeight(Math.ceil(height) + 12 + 32)
  }, [])

  useEffect(() => {
    if (!plainText) return
    // Resolve the font string from the container's computed style
    const el = containerRef.current
    if (!el) return
    const cs = getComputedStyle(el)
    const font = `${cs.fontWeight} ${cs.fontSize} ${cs.fontFamily}`
    preparedRef.current = prepare(plainText, font)
    measure()
  }, [plainText, measure])

  useEffect(() => {
    if (!plainText) return
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [plainText, measure])

  const bodyContent = row.bodySegments
    ? row.bodySegments.map((seg, i) =>
        seg.href ? (
          <a
            key={i}
            href={seg.href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--theme-action)] hover:opacity-70 transition-opacity"
            onClick={(e) => e.stopPropagation()}
          >
            {seg.text}
          </a>
        ) : (
          <span key={i}>{seg.text}</span>
        )
      )
    : row.body

  return (
    <div
      className={isLast ? '' : 'border-b border-[var(--theme-tonal)]'}
    >
      <button
        type="button"
        onClick={onToggle}
        className="flex items-center justify-between w-full text-left cursor-pointer"
        style={{
          paddingTop: isOpen ? 'var(--mpds-space-32)' : 'var(--mpds-space-16)',
          paddingBottom: isOpen ? '0' : 'var(--mpds-space-16)',
        }}
        aria-expanded={isOpen}
      >
        <span
          className="font-instrument font-medium text-[var(--theme-headline)] leading-[1.125]"
          style={{
            fontSize: 'var(--mpds-font-size-lg)',
            letterSpacing: '-0.02em',
          }}
        >
          {row.label}
        </span>
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          className="shrink-0 ml-4 transition-transform duration-300"
          style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
          aria-hidden="true"
        >
          <path
            d="M5 7.5L10 12.5L15 7.5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      <div
        ref={containerRef}
        className="overflow-hidden font-instrument text-[var(--theme-text)] leading-[1.625] cursor-pointer"
        style={{
          fontSize: 'var(--mpds-font-size-lg)',
          maxHeight: isOpen ? contentHeight : 0,
          opacity: isOpen ? 1 : 0,
          transition: 'max-height 0.3s ease, opacity 0.3s ease',
        }}
        onClick={onToggle}
      >
        <p
          style={{
            paddingTop: 'var(--mpds-space-12)',
            paddingBottom: 'var(--mpds-space-32)',
          }}
        >
          {bodyContent}
        </p>
      </div>
    </div>
  )
}

// ─── Section ─────────────────────────────────────────────────────────────────

export default function CelebrationSection({ content }: { content: CelebrationContent }) {
  const sectionRef = useScrollSection<HTMLElement>('slate')
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section
      ref={sectionRef}
      id="celebration"
      className="w-full flex justify-center bg-[var(--theme-bg)]"
      style={{ paddingTop: 'var(--sp-2xl)', paddingBottom: 'var(--sp-2xl)', marginBottom: 'var(--sp-2xl)' }}
    >
      <div className="site-container flex flex-col" style={{ gap: 'var(--mpds-space-xl)' }}>

        {/* ── Header: title + description ── */}
        <div className="flex flex-col xl:flex-row xl:items-end xl:justify-between" style={{ gap: 'var(--mpds-space-lg)' }}>
          <h2
            className="font-romie font-light text-[var(--theme-headline)] leading-none shrink-0"
            style={{ fontSize: 'var(--mpds-font-size-10xl)' }}
          >
            {content.heading}
          </h2>
          <p
            className="font-instrument text-[var(--theme-text)] leading-[1.625] md:shrink-0"
            style={{ fontSize: 'var(--mpds-font-size-lg)', maxWidth: 512 }}
          >
            {content.description}
          </p>
        </div>

        {/* ── Content: details left, photos right ── */}
        <div className="relative grid grid-cols-1 xl:grid-cols-12" style={{ gap: 'var(--mpds-space-lg)' }}>

          {/* Left column — event details + accordion + CTA */}
          <div
            className="xl:col-span-6 flex flex-col justify-between max-w-[640px]"
            style={{ gap: 'var(--mpds-space-lg)' }}
          >
            {/* Event details block */}
            <div className="flex flex-col" style={{ gap: 'var(--mpds-space-md)' }}>
              <h3
                className="font-instrument font-medium text-[var(--theme-headline)] leading-[1.125]"
                style={{ fontSize: 'var(--mpds-font-size-3xl)', letterSpacing: '-0.02em' }}
              >
                Friday, August 28, 2026
              </h3>

              {/* Time boxes — left-bordered */}
              <div className="flex flex-col sm:flex-row" style={{ gap: 'var(--mpds-space-48)' }}>
                {content.events.map((event, i) => (
                  <div
                    key={i}
                    className="flex-1 flex flex-col border-l border-[var(--theme-tonal)]"
                    style={{ gap: '10px', padding: '16px' }}
                  >
                    <span
                      className="font-romie font-light text-[var(--theme-headline)] leading-none whitespace-nowrap"
                      style={{ fontSize: 'var(--mpds-font-size-8xl)' }}
                    >
                      {event.time}
                    </span>
                    <span
                      className="font-instrument text-[var(--theme-text)] leading-[1.625]"
                      style={{ fontSize: 'var(--mpds-font-size-xl)' }}
                    >
                      {event.label}
                    </span>
                  </div>
                ))}
              </div>

              {/* Address box — column on mobile, row on sm+ */}
              <div
                className="w-full border border-[var(--theme-headline)]"
                style={{ padding: 'var(--mpds-space-16) var(--mpds-space-28)' }}
              >
                <div className="flex flex-col items-center sm:flex-row sm:items-center sm:justify-between" style={{ gap: 'var(--mpds-space-8)' }}>
                  <span className="font-spezia text-[var(--theme-headline)] text-fs-sm tracking-[0.12em] uppercase text-center sm:text-left shrink-0">
                    Excelsior
                  </span>
                  <div className="w-full sm:hidden" style={{ height: 1, backgroundColor: 'var(--theme-tonal)' }} />
                  <span className="font-instrument text-[var(--theme-tonal)] hidden sm:inline">/</span>
                  <span className="font-spezia text-[var(--theme-headline)] text-fs-sm tracking-[0.12em] uppercase text-center sm:text-left shrink-0">
                    125 E King Street
                  </span>
                  <div className="w-full sm:hidden" style={{ height: 1, backgroundColor: 'var(--theme-tonal)' }} />
                  <span className="font-instrument text-[var(--theme-tonal)] hidden sm:inline">/</span>
                  <span className="font-spezia text-[var(--theme-headline)] text-fs-sm tracking-[0.12em] uppercase text-center sm:text-left shrink-0">
                    Lancaster, PA
                  </span>
                </div>
              </div>
            </div>

            {/* Accordion info rows + CTA */}
            <div className="flex flex-col" style={{ gap: 'var(--mpds-space-48)' }}>
              {/* Accordion */}
              <div className="flex flex-col" style={{ gap: 0 }}>
                <h3
                  className="font-instrument font-medium text-[var(--theme-headline)] leading-[1.125]"
                  style={{
                    fontSize: 'var(--mpds-font-size-3xl)',
                    letterSpacing: '-0.02em',
                    paddingBottom: 'var(--mpds-space-48)',
                  }}
                >
                  The finer details
                </h3>
                <div className="flex flex-col">
                  {content.infoRows.map((row, i) => (
                    <AccordionItem
                      key={i}
                      row={row}
                      isOpen={openIndex === i}
                      onToggle={() => setOpenIndex(openIndex === i ? null : i)}
                      isLast={i === content.infoRows.length - 1}
                    />
                  ))}
                </div>
              </div>

              {/* CTA row */}
              <div className="flex flex-col sm:flex-row sm:items-center" style={{ gap: 'var(--mpds-space-sm)' }}>
                <a
                  href={content.rsvpUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[var(--theme-action)] text-[var(--theme-btn-text)] font-instrument font-semibold rounded px-8 py-4 leading-[1.25] transition-opacity hover:opacity-90 text-center"
                  style={{ fontSize: 'var(--mpds-font-size-lg)' }}
                >
                  RSVP today
                </a>
                <a
                  href={content.venueUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center sm:justify-start font-instrument font-semibold text-[var(--theme-action)] leading-[1.25] transition-opacity hover:opacity-70"
                  style={{ fontSize: 'var(--mpds-font-size-lg)' }}
                >
                  Visit the Excelsior website
                  <ChevronRight className="shrink-0" />
                </a>
              </div>
            </div>
          </div>

          {/* Right column — photos; overlay is not clipped so it can extend outside the column */}
          <div className="xl:col-start-7 xl:col-end-13 relative w-full">
            <div className="rounded-2xl overflow-hidden w-full bg-[var(--theme-tonal)] max-w-[784px]" style={{ aspectRatio: '3 / 4' }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={content.mainImage}
                alt="Excelsior, Lancaster PA"
                className="w-full h-full object-cover"
                loading="lazy"
                decoding="async"
              />
            </div>
            {/* Overlay photo — always visible; right-aligned to photo on mobile, peeks outside column on desktop */}
            <div
              className="absolute rounded-xl overflow-hidden right-0 bottom-[-40px] xl:right-[-48px] xl:bottom-[-80px]"
              style={{ width: 'min(400px, 50%)', aspectRatio: '1' }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={content.overlayImage}
                alt="Sarah and Matt"
                className="w-full h-full object-cover"
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
