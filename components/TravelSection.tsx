'use client'
// Figma node: 435:2852
// "Travel & Stay" — category nav switches a 3-col card grid. CMYK shader bg image.

import { useState, useEffect, useRef } from 'react'
import { SiteContent } from '@/types/content'
import defaultContent from '@/content/content.json'

// ─── Types ───────────────────────────────────────────────────────────────────

interface CardData {
  overline: string
  heading: string
  body: string
}

type Category = 'stay' | 'eat' | 'do'

const CATEGORIES: { key: Category; label: string }[] = [
  { key: 'eat', label: 'Where to eat' },
  { key: 'stay', label: 'Where to stay' },
  { key: 'do', label: 'What to do' },
]

const CATEGORY_IMAGES: Record<Category, string> = {
  eat: '/images/wedding-site--travel-stay-eat.png',
  stay: '/images/wedding-site--travel-stay-stay.png',
  do: '/images/wedding-site--travel-stay-do.png',
}

// ─── Card ────────────────────────────────────────────────────────────────────

function RecommendationCard({ card, index }: { card: CardData; index: number }) {
  const [visible, setVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Reset on card change
    setVisible(false)
    const timeout = setTimeout(() => setVisible(true), 60 * index)
    return () => clearTimeout(timeout)
  }, [card, index])

  return (
    <div
      ref={ref}
      className="flex flex-col border-l border-[var(--theme-tonal)] transition-all duration-500 ease-out"
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
        className="font-dm font-bold text-[var(--theme-action)] uppercase tracking-[0.12em] leading-[1.125]"
        style={{ fontSize: 'var(--mpds-font-size-2xs)' }}
      >
        {card.overline}
      </span>
      <div className="flex flex-col" style={{ gap: 'var(--mpds-space-4)' }}>
        <p
          className="font-instrument font-medium text-[var(--theme-headline)] leading-[1.125] whitespace-pre-line"
          style={{ fontSize: 'var(--mpds-font-size-md)', letterSpacing: '-0.02em' }}
        >
          {card.heading}
        </p>
        <p
          className="font-instrument text-[var(--theme-text)] leading-[1.5]"
          style={{ fontSize: 'var(--mpds-font-size-xs)' }}
        >
          {card.body}
        </p>
      </div>
    </div>
  )
}

// ─── Section ─────────────────────────────────────────────────────────────────

const c = defaultContent as SiteContent

export default function TravelSection() {
  const [active, setActive] = useState<Category>('eat') // eat first to show Luca image
  const [cardKey, setCardKey] = useState(0)

  const cardMap: Record<Category, CardData[]> = {
    stay: c.whereToStay,
    eat: c.whereToEat,
    do: c.activities,
  }

  const cards = cardMap[active]

  function handleCategoryChange(key: Category) {
    if (key === active) return
    setActive(key)
    setCardKey((k) => k + 1) // force remount for animation
  }

  return (
    <div className="flex flex-col w-full">
      {/* ── Header ── */}
      <section
        id="travel"
        className="w-full flex justify-center"
        style={{ paddingBottom: 'var(--sp-2xl)' }}
      >
        <div className="site-container flex flex-col md:flex-row md:items-end md:justify-between" style={{ gap: 'var(--mpds-space-lg)' }}>
          <h2
            className="font-romie-trial font-light text-[var(--theme-headline)] leading-none shrink-0"
            style={{ fontSize: 'var(--mpds-font-size-11xl)' }}
          >
            Travel &amp; Stay
          </h2>
          <p
            className="font-instrument text-[var(--theme-text)] leading-[1.625] md:shrink-0"
            style={{ fontSize: 'var(--mpds-font-size-lg)', maxWidth: 512 }}
          >
            Lancaster is a beautiful destination with plenty to explore. Here are our recommendations to make your visit memorable.
          </p>
        </div>
      </section>

      {/* ── Content area ── */}
      <section className="relative z-10 w-full flex justify-center">
        <div className="site-container flex flex-col lg:flex-row" style={{ gap: 'var(--mpds-space-sm)' }}>
          {/* Left sidebar — category nav + photo */}
          <div className="lg:shrink-0 flex flex-col" style={{ gap: 'var(--mpds-space-lg)', maxWidth: 512 }}>
            {/* Category nav */}
            <nav className="flex flex-row lg:flex-col gap-4 lg:gap-[var(--mpds-space-14)] overflow-x-auto scrollbar-none">
              {CATEGORIES.map(({ key, label }) => (
                <button
                  key={key}
                  onClick={() => handleCategoryChange(key)}
                  className={`text-left font-instrument font-medium leading-[1.125] transition-colors whitespace-nowrap ${
                    active === key
                      ? 'text-[var(--theme-headline)]'
                      : 'text-[var(--theme-tonal)]'
                  }`}
                  style={{ fontSize: 'var(--mpds-font-size-4xl)', letterSpacing: '-0.02em' }}
                >
                  {label}
                </button>
              ))}
            </nav>

            {/* Decorative photo — hidden on mobile, shown on lg */}
            <div
              className="hidden lg:block rounded-2xl overflow-hidden"
              style={{ width: 376, height: 376 }}
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

          {/* Right — card grid */}
          <div
            key={cardKey}
            className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 min-w-0 content-start"
            style={{ columnGap: 'var(--mpds-space-32)', rowGap: 'var(--mpds-space-48)' }}
          >
            {cards.slice(0, 9).map((card, i) => (
              <RecommendationCard key={`${active}-${i}`} card={card} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── CMYK background image — overlaps content by space-2xl via negative margin ── */}
      <div
        className="w-full"
        style={{ marginTop: 'calc(-1 * var(--sp-2xl))' }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/wedding-site--travel-stay-background-cmyk.png"
          alt=""
          className="w-full h-auto block"
        />
      </div>
    </div>
  )
}
