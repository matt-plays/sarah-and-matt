'use client'
// Simplified site navigation — Figma node 615:8601.
// Hero state: transparent on pink, sits at the top of the hero section.
// Fixed state: dark pill at viewport bottom (scroll-up to reveal, idle timer).
// Suppressed in timeline/gallery/marquee sections.

import { useEffect, useState, useRef, useCallback } from 'react'

const NAV_LINKS = [
  { label: 'Our Celebration', href: '#celebration', id: 'celebration' },
  { label: 'Travel & Stay', href: '#travel', id: 'travel' },
  { label: 'Registry', href: 'https://zola.sarahandmatt.wedding/registry', id: 'registry' },
]

const IDLE_TIMEOUT = 15000
const SUPPRESSED_IDS = ['timeline', 'gallery', 'marquee']

export default function SiteNav() {
  const [visible, setVisible] = useState(true)
  const [inHero, setInHero] = useState(true)
  const [heroReady, setHeroReady] = useState(false)
  const [suppressed, setSuppressed] = useState(false)
  // Nav is invisible until the user has scrolled to Our Celebration
  const [celebrationReached, setCelebrationReached] = useState(false)
  const [activeSection, setActiveSection] = useState<string | null>(null)
  const lastScrollY = useRef(0)
  const scrollUpDistance = useRef(0)
  const idleTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const clearIdle = useCallback(() => {
    if (idleTimer.current) { clearTimeout(idleTimer.current); idleTimer.current = null }
  }, [])

  const startIdle = useCallback((inRange: boolean) => {
    clearIdle()
    idleTimer.current = setTimeout(() => { if (inRange) setVisible(true) }, IDLE_TIMEOUT)
  }, [clearIdle])

  useEffect(() => {
    const handler = () => setHeroReady(true)
    window.addEventListener('hero-ready', handler)
    return () => window.removeEventListener('hero-ready', handler)
  }, [])

  // Unlock nav once Our Celebration section has entered the viewport (one-way latch)
  useEffect(() => {
    const el = document.getElementById('celebration')
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setCelebrationReached(true) },
      { threshold: 0.05 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  // Suppress fixed nav when timeline/gallery/marquee sections are visible
  useEffect(() => {
    const els = SUPPRESSED_IDS.map(id => document.getElementById(id)).filter(Boolean) as HTMLElement[]
    const visible = new Set<Element>()
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) visible.add(entry.target)
        else visible.delete(entry.target)
      })
      setSuppressed(visible.size > 0)
    // rootMargin bottom buffer: suppress the nav before the section actually
    // enters the viewport, eliminating the race-condition flash during gallery.
    }, { threshold: 0, rootMargin: '0px 0px 120px 0px' })
    els.forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const heroEl = document.getElementById('hero')
    const sectionEls = NAV_LINKS.map(({ id }) => document.getElementById(id)).filter(Boolean) as HTMLElement[]

    let heroBottom = 0 // heroEl.offsetTop + heroEl.offsetHeight
    type CachedSection = { el: HTMLElement; top: number; bottom: number }
    let cachedSections: CachedSection[] = []

    const measure = () => {
      if (heroEl) heroBottom = heroEl.offsetTop + heroEl.offsetHeight
      cachedSections = sectionEls.map(el => ({
        el,
        top: el.offsetTop,
        bottom: el.offsetTop + el.offsetHeight,
      }))
    }
    measure()

    const onScroll = () => {
      const currentY = window.scrollY
      const delta = currentY - lastScrollY.current
      const vh = window.innerHeight

      const heroVisible = heroEl ? (heroBottom - currentY) > vh * 0.25 : false

      if (heroVisible) {
        setInHero(true)
        setVisible(true)
        scrollUpDistance.current = 0
        lastScrollY.current = currentY
        clearIdle()
        return
      }

      setInHero(false)

      if (delta < 0) {
        scrollUpDistance.current += Math.abs(delta)
        if (scrollUpDistance.current > 30) setVisible(true)
      } else {
        scrollUpDistance.current = 0
        setVisible(false)
      }

      lastScrollY.current = currentY
      startIdle(true)

      let best: string | null = null, bestDist = Infinity
      for (const { el, top, bottom } of cachedSections) {
        const rectTop = top - currentY
        const rectBottom = bottom - currentY
        if (rectTop < vh * 0.5 && rectBottom > 0) {
          const dist = Math.abs(rectTop)
          if (dist < bestDist) { bestDist = dist; best = el.id }
        }
      }
      setActiveSection(best)
    }

    if (heroEl && (heroBottom - window.scrollY) > window.innerHeight * 0.25) {
      setInHero(true); setVisible(true)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', measure, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', measure)
      clearIdle()
    }
  }, [startIdle, clearIdle])

  // ── Hero state — transparent bar at top of hero ───────────────────────────
  if (inHero) {
    return (
      <nav
        className="absolute top-0 left-0 w-full z-50"
        style={{
          paddingTop: 'var(--mpds-space-24)',
          paddingBottom: 'var(--mpds-space-24)',
          opacity: visible && heroReady ? 1 : 0,
          transition: 'opacity 0.5s ease',
          pointerEvents: visible ? 'auto' : 'none',
        }}
        aria-label="Main navigation"
      >
        <div
          className="flex items-center justify-between mx-auto w-full"
          style={{
            maxWidth: 1600,
            paddingLeft: 'var(--mpds-space-48)',
            paddingRight: 'var(--mpds-space-48)',
          }}
        >
        {/* Mark — logo ornament */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/wedding-site--nav-mark.svg"
          alt=""
          aria-hidden="true"
          style={{ width: 'var(--mpds-dimension-128)', height: 'var(--mpds-dimension-128)' }}
        />

        {/* Links */}
        <div className="hidden md:flex items-center" style={{ gap: 'var(--mpds-space-32)' }}>
          {NAV_LINKS.map(({ label, href, id }) => (
            <a
              key={href}
              href={href}
              className="font-instrument transition-colors whitespace-nowrap"
              style={{
                fontSize: 'var(--mpds-font-size-lg)',
                color: activeSection === id
                  ? 'var(--mpds-color-neutral-clay-1200)'
                  : 'color-mix(in srgb, var(--mpds-color-neutral-clay-1200) 72%, transparent)',
              }}
              onClick={(e) => {
                if (href.startsWith('http')) return
                e.preventDefault()
                document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
              }}
              {...(href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            >
              {label}
            </a>
          ))}
        </div>

        {/* RSVP */}
        <a
          href="https://zola.sarahandmatt.wedding/rsvp"
          target="_blank"
          rel="noopener noreferrer"
          className="font-instrument font-semibold whitespace-nowrap transition-colors"
          style={{
            fontSize: 'var(--mpds-font-size-lg)',
            paddingTop: 'var(--mpds-space-14)',
            paddingBottom: 'var(--mpds-space-16)',
            paddingLeft: 'var(--mpds-space-32)',
            paddingRight: 'var(--mpds-space-32)',
            borderRadius: 4,
            lineHeight: '1.25',
            backgroundColor: 'var(--mpds-color-yellow-s-600)',
            color: 'var(--mpds-color-clay-100)',
          }}
        >
          RSVP
        </a>
        </div>
      </nav>
    )
  }

  // ── Fixed state — dark pill at viewport bottom ────────────────────────────
  const pillVisible = celebrationReached && visible && !suppressed
  return (
    <nav
      data-theme="footer"
      className="fixed left-1/2 z-50 flex flex-col md:flex-row md:items-center bg-[var(--theme-bg)]"
      style={{
        bottom: 'var(--mpds-space-48)',
        gap: 'var(--mpds-space-8)',
        padding: 'var(--mpds-space-8)',
        borderRadius: 12,
        opacity: pillVisible ? 1 : 0,
        transform: pillVisible ? 'translateX(-50%) translateY(0)' : 'translateX(-50%) translateY(20px)',
        pointerEvents: pillVisible ? 'auto' : 'none',
        // Instant hide when suppressed (no animation over gallery); smooth entrance only
        transition: suppressed ? 'none' : 'opacity 0.5s ease, transform 0.5s ease',
      }}
      aria-label="Main navigation"
    >
      {/* Links — always a row */}
      <div className="flex flex-row items-center" style={{ gap: 'var(--mpds-space-4)' }}>
        {NAV_LINKS.map(({ label, href, id }) => (
          <a
            key={href}
            href={href}
            className={`font-instrument transition-colors whitespace-nowrap rounded-lg ${
              activeSection === id
                ? 'text-[var(--theme-btn-text)]'
                : 'text-[var(--theme-text)] hover:text-[var(--theme-btn-text)]'
            }`}
            style={{
              fontSize: 'var(--mpds-font-size-lg)',
              paddingTop: 'var(--mpds-space-12)',
              paddingBottom: 'var(--mpds-space-12)',
              paddingLeft: 'var(--mpds-space-16)',
              paddingRight: 'var(--mpds-space-16)',
            }}
            onClick={(e) => {
              if (href.startsWith('http')) return
              e.preventDefault()
              document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
            }}
            {...(href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
          >
            {label}
          </a>
        ))}
      </div>
      {/* RSVP */}
      <a
        href="https://zola.sarahandmatt.wedding/rsvp"
        target="_blank"
        rel="noopener noreferrer"
        className="font-instrument font-semibold bg-[var(--theme-action)] text-[var(--theme-btn-text)] whitespace-nowrap text-center transition-colors hover:bg-[var(--theme-action-hovered)]"
        style={{
          fontSize: 'var(--mpds-font-size-lg)',
          paddingTop: 'var(--mpds-space-14)',
          paddingBottom: 'var(--mpds-space-16)',
          paddingLeft: 'var(--mpds-space-32)',
          paddingRight: 'var(--mpds-space-32)',
          borderRadius: 6,
          lineHeight: '1.25',
        }}
      >
        RSVP
      </a>
    </nav>
  )
}
