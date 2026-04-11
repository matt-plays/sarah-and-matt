'use client'
// Simplified site navigation — Figma node 615:8601.
// Hero state: transparent on pink, sits at the top of the hero section.
// Fixed state: dark pill at viewport bottom (scroll-up to reveal, idle timer).
// Suppressed in timeline/gallery sections.

import { useEffect, useState, useRef, useCallback } from 'react'

const NAV_LINKS = [
  { label: 'Our Celebration', href: '#celebration', id: 'celebration' },
  { label: 'Travel & Stay', href: '#travel', id: 'travel' },
  { label: 'Registry', href: 'https://zola.sarahandmatt.wedding/registry', id: 'registry' },
]

const IDLE_TIMEOUT = 15000
const SUPPRESSED_IDS = ['timeline', 'gallery']

export default function SiteNav() {
  const [visible, setVisible] = useState(true)
  const [inHero, setInHero] = useState(true)
  const [heroReady, setHeroReady] = useState(false)
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

  useEffect(() => {
    const heroEl = document.getElementById('hero')
    const footerEl = document.querySelector('footer') as HTMLElement
    const suppressedEls = SUPPRESSED_IDS.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[]
    const sectionEls = NAV_LINKS.map(({ id }) => document.getElementById(id)).filter(Boolean) as HTMLElement[]

    const onScroll = () => {
      const currentY = window.scrollY
      const delta = currentY - lastScrollY.current
      const vh = window.innerHeight
      const heroRect = heroEl?.getBoundingClientRect()
      const footerRect = footerEl?.getBoundingClientRect()

      const heroVisible = heroRect ? heroRect.bottom > vh * 0.25 : false
      const inSuppressed = suppressedEls.some((el) => {
        const r = el.getBoundingClientRect()
        return r.top < vh && r.bottom > 0
      })
      const atFooter = footerRect ? footerRect.top < vh : false

      if (heroVisible) {
        setInHero(true)
        setVisible(true)
        scrollUpDistance.current = 0
        lastScrollY.current = currentY
        clearIdle()
        return
      }

      setInHero(false)

      if (inSuppressed || atFooter) {
        setVisible(false)
        scrollUpDistance.current = 0
        lastScrollY.current = currentY
        startIdle(false)
        return
      }

      if (delta < 0) {
        scrollUpDistance.current += Math.abs(delta)
        if (scrollUpDistance.current > 30) setVisible(true)
      } else if (delta > 5) {
        scrollUpDistance.current = 0
        setVisible(false)
      }

      lastScrollY.current = currentY
      startIdle(true)

      let best: string | null = null, bestDist = Infinity
      for (const el of sectionEls) {
        const rect = el.getBoundingClientRect()
        if (rect.top < vh * 0.5 && rect.bottom > 0) {
          const dist = Math.abs(rect.top)
          if (dist < bestDist) { bestDist = dist; best = el.id }
        }
      }
      setActiveSection(best)
    }

    const heroRect = heroEl?.getBoundingClientRect()
    if (heroRect && heroRect.bottom > window.innerHeight * 0.25) {
      setInHero(true); setVisible(true)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => { window.removeEventListener('scroll', onScroll); clearIdle() }
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
  return (
    <nav
      data-theme="footer"
      className="fixed inset-x-0 mx-auto z-50 flex items-center bg-[var(--theme-bg)] max-w-[calc(100vw-32px)]"
      style={{
        bottom: 'var(--mpds-space-48)',
        width: 'fit-content',
        gap: 'var(--mpds-space-16)',
        paddingLeft: 'var(--mpds-space-24)',
        paddingRight: 'var(--mpds-space-8)',
        paddingTop: 'var(--mpds-space-8)',
        paddingBottom: 'var(--mpds-space-8)',
        borderRadius: 12,
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(20px)',
        pointerEvents: visible ? 'auto' : 'none',
        transition: 'opacity 0.5s ease, transform 0.5s ease',
      }}
      aria-label="Main navigation"
    >
      {NAV_LINKS.map(({ label, href, id }) => (
        <a
          key={href}
          href={href}
          className={`font-instrument transition-colors whitespace-nowrap hidden md:inline ${
            activeSection === id
              ? 'text-[var(--theme-btn-text)]'
              : 'text-[var(--theme-text)] hover:text-[var(--theme-btn-text)]'
          }`}
          style={{ fontSize: 'var(--mpds-font-size-lg)' }}
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
      <a
        href="https://zola.sarahandmatt.wedding/rsvp"
        target="_blank"
        rel="noopener noreferrer"
        className="font-instrument font-semibold bg-[var(--theme-action)] text-[var(--theme-btn-text)] whitespace-nowrap transition-colors hover:bg-[var(--theme-action-hovered)]"
        style={{
          fontSize: 'var(--mpds-font-size-lg)',
          paddingTop: 'var(--mpds-space-14)',
          paddingBottom: 'var(--mpds-space-16)',
          paddingLeft: 'var(--mpds-space-32)',
          paddingRight: 'var(--mpds-space-32)',
          borderRadius: 4,
          lineHeight: '1.25',
        }}
      >
        RSVP
      </a>
    </nav>
  )
}
