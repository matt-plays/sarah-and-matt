'use client'
// Figma node: 435:2852
// "Travel & Stay" — category nav switches a 3-col card grid. CMYK shader bg image.

import React, { useState, useEffect, useRef } from 'react'
import { TravelCard, RichTextSegment } from '@/types/content'
import { useScrollSection } from '@/context/ThemeContext'

// ─── Types ───────────────────────────────────────────────────────────────────

type Category = 'stay' | 'eat' | 'do'

const CATEGORIES: { key: Category; label: string }[] = [
  { key: 'eat', label: 'Where to eat' },
  { key: 'stay', label: 'Where to stay' },
  { key: 'do', label: 'What to do' },
]

const CATEGORY_IMAGES: Record<Category, string> = {
  eat: '/images/wedding-site--travel-stay-eat.webp',
  stay: '/images/wedding-site--travel-stay-stay.webp',
  do: '/images/wedding-site--travel-stay-do.webp',
}

// ─── Card ────────────────────────────────────────────────────────────────────

function RecommendationCard({ card, index, animate }: { card: TravelCard; index: number; animate: boolean }) {
  // Start visible on page load (animate=false); only hide+fade-in on category switch (animate=true)
  const [visible, setVisible] = useState(!animate)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!animate) return
    setVisible(false)
    const timeout = setTimeout(() => setVisible(true), 60 * index)
    return () => clearTimeout(timeout)
  }, [animate, index])

  const Tag = card.link ? 'a' : 'div'
  const linkProps = card.link
    ? { href: card.link, target: '_blank', rel: 'noopener noreferrer' }
    : {}

  return (
    <Tag
      ref={ref as React.RefObject<HTMLDivElement & HTMLAnchorElement>}
      {...linkProps}
      className="flex flex-col border-l border-[var(--theme-tonal)] transition-[opacity,transform] duration-500 ease-out group"
      style={{
        gap: 'var(--mpds-space-16)',
        paddingLeft: 'var(--mpds-space-16)',
        paddingTop: 'var(--mpds-space-8)',
        paddingBottom: 'var(--mpds-space-8)',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(12px)',
      }}
    >
      <span
        className="font-spezia text-[var(--theme-action)] uppercase tracking-[0.12em] leading-[1.125]"
        style={{ fontSize: 'var(--mpds-font-size-xs)' }}
      >
        {card.overline}
      </span>
      <div className="flex flex-col" style={{ gap: 'var(--mpds-space-8)' }}>
        <p
          className="font-instrument font-medium text-[var(--theme-headline)] leading-[1.125] whitespace-pre-line"
          style={{ fontSize: 'var(--mpds-font-size-lg)', letterSpacing: '-0.02em', textWrap: 'balance' }}
        >
          {card.heading}
        </p>
        <p
          className="font-instrument text-[var(--theme-text)] leading-[1.5]"
          style={{ fontSize: 'var(--mpds-font-size-md)', textWrap: 'balance' }}
        >
          {card.body}
        </p>
      </div>
    </Tag>
  )
}

// ─── Section ─────────────────────────────────────────────────────────────────

interface TravelSectionProps {
  heading: string
  body: string
  whereToStayFineprint: string
  whereToStayFineprintSegments?: RichTextSegment[]
  whereToStay: TravelCard[]
  whereToEat: TravelCard[]
  activities: TravelCard[]
}

export default function TravelSection({ heading, body, whereToStayFineprint, whereToStayFineprintSegments, whereToStay, whereToEat, activities }: TravelSectionProps) {
  // Registered as 'default' so ThemeContext keeps the body at default while Travel
  // is the topmost visible section — outcompeting RSVP's green until Travel exits.
  const sectionRef = useScrollSection<HTMLDivElement>('default')

  const [active, setActive] = useState<Category>('eat') // eat first to show Luca image
  const [cardKey, setCardKey] = useState(0)
  const [hasInteracted, setHasInteracted] = useState(false)

  const cardMap: Record<Category, TravelCard[]> = {
    stay: whereToStay,
    eat:  whereToEat,
    do:   activities,
  }

  const cards = cardMap[active]

  function handleCategoryChange(key: Category) {
    if (key === active) return
    setHasInteracted(true)
    setActive(key)
    setCardKey((k) => k + 1) // force remount for animation
  }

  return (
    <div ref={sectionRef} className="flex flex-col w-full">
      {/* ── Header ── */}
      <section
        id="travel"
        className="w-full flex justify-center"
        style={{ paddingBottom: 'var(--sp-2xl)' }}
      >
        <div className="site-container flex flex-col xl:flex-row xl:items-end xl:justify-between" style={{ gap: 'var(--mpds-space-lg)' }}>
          <h2
            className="font-romie font-light text-[var(--theme-headline)] leading-none shrink-0"
            style={{ fontSize: 'var(--mpds-font-size-10xl)' }}
          >
            {heading}
          </h2>
          <p
            className="font-instrument text-[var(--theme-text)] leading-[1.625] md:shrink-0"
            style={{ fontSize: 'var(--mpds-font-size-lg)', maxWidth: 512 }}
          >
            {body}
          </p>
        </div>
      </section>

      {/* ── Content area ── */}
      <section className="relative z-10 w-full flex justify-center" style={{ paddingBottom: 'var(--sp-2xl)' }}>
        <div className="site-container grid grid-cols-1 lg:grid-cols-12" style={{ gap: 'var(--site-grid-gutter)' }}>
          {/* Left sidebar — 4 cols: category nav + photo */}
          <div className="lg:col-span-4 flex flex-col" style={{ gap: 'var(--sp-2xl)' }}>
            {/* Category nav */}
            <nav className="flex flex-row lg:flex-col gap-4 lg:gap-[var(--mpds-space-14)] overflow-x-auto scrollbar-none pb-[var(--mpds-space-lg)]">
              {CATEGORIES.map(({ key, label }) => (
                <button
                  key={key}
                  onClick={() => handleCategoryChange(key)}
                  className={`text-left font-instrument font-medium leading-[1.125] transition-colors whitespace-nowrap ${
                    active === key
                      ? 'text-[var(--theme-headline)]'
                      : 'text-[var(--theme-tonal)]'
                  }`}
                  style={{ fontSize: 'var(--mpds-font-size-3xl)', letterSpacing: '-0.02em' }}
                >
                  {label}
                </button>
              ))}
            </nav>

            {/* Decorative photo — full-width on mobile (2× feel), constrained on lg */}
            <div
              className="block rounded-2xl overflow-hidden w-full"
              style={{ aspectRatio: '1 / 1', maxWidth: 376 }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={CATEGORY_IMAGES[active]}
                alt=""
                className="w-full h-full object-cover transition-opacity duration-500"
                loading="eager"
              />
            </div>
          </div>

          {/* Right — card grid + fineprint (8 cols) */}
          <div className="lg:col-span-8 flex flex-col min-w-0">
            <div
              key={cardKey}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 content-start"
              style={{ columnGap: 'var(--mpds-space-32)', rowGap: 'var(--mpds-space-48)' }}
            >
              {cards.slice(0, 9).map((card, i) => (
                <RecommendationCard key={`${active}-${i}`} card={card} index={i} animate={hasInteracted} />
              ))}
            </div>
            {active === 'stay' && (
              <p
                className="font-instrument text-[var(--theme-text)] leading-[1.625]"
                style={{ fontSize: 'var(--mpds-font-size-md)', paddingTop: 'var(--mpds-space-lg)', maxWidth: 640, textWrap: 'balance' }}
              >
                {whereToStayFineprintSegments
                  ? whereToStayFineprintSegments.map((seg, i) =>
                      seg.href ? (
                        <a key={i} href={seg.href} target="_blank" rel="noopener noreferrer" className="text-[var(--theme-action)] hover:opacity-70 transition-opacity">
                          {seg.text}
                        </a>
                      ) : (
                        <span key={i}>{seg.text}</span>
                      )
                    )
                  : whereToStayFineprint}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* ── CMYK background image — overlaps content by space-2xl via negative margin ── */}
      <div
        className="w-full lg:[margin-top:calc(-2*var(--sp-2xl))]"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/wedding-site--travel-stay-background.webp"
          srcSet="/images/wedding-site--travel-stay-background-480w.webp 480w, /images/wedding-site--travel-stay-background-800w.webp 800w, /images/wedding-site--travel-stay-background-1200w.webp 1200w, /images/wedding-site--travel-stay-background.webp 1920w"
          sizes="100vw"
          alt=""
          className="w-full h-auto block"
        />
      </div>
    </div>
  )
}
