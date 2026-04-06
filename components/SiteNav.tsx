'use client'
// Floating navigation bar.
// Inline in hero — absolutely positioned at the hero's bottom edge, straddling it.
// Fixed at viewport bottom elsewhere (scroll-up to reveal).
// Suppressed in timeline/gallery sections.
// Uses footer theme (dark pill).

import { useEffect, useState, useRef, useCallback } from 'react'

const NAV_LINKS = [
  { label: 'Our Celebration', href: '#celebration', id: 'celebration' },
  { label: 'Travel & Stay', href: '#travel', id: 'travel' },
  { label: 'Registry', href: 'https://zola.sarahandmatt.wedding/registry', id: 'registry' },
]

const IDLE_TIMEOUT = 15000 // 15 seconds

// Sections where the nav is suppressed (no scroll-up trigger, hidden)
const SUPPRESSED_IDS = ['timeline', 'gallery']

export default function SiteNav() {
  const [visible, setVisible] = useState(false)
  const [inHero, setInHero] = useState(true) // start inline
  const [activeSection, setActiveSection] = useState<string | null>(null)
  const lastScrollY = useRef(0)
  const scrollUpDistance = useRef(0)
  const idleTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const clearIdle = useCallback(() => {
    if (idleTimer.current) {
      clearTimeout(idleTimer.current)
      idleTimer.current = null
    }
  }, [])

  const startIdle = useCallback((inRange: boolean) => {
    clearIdle()
    idleTimer.current = setTimeout(() => {
      if (inRange) {
        setVisible(true)
      }
    }, IDLE_TIMEOUT)
  }, [clearIdle])

  useEffect(() => {
    const heroEl = document.getElementById('hero')
    const footerEl = document.querySelector('footer') as HTMLElement
    const suppressedEls = SUPPRESSED_IDS.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[]
    const sectionEls = NAV_LINKS.map(({ id }) => document.getElementById(id)).filter(Boolean) as HTMLElement[]

    const onScroll = () => {
      const currentY = window.scrollY
      const delta = currentY - lastScrollY.current

      const heroRect = heroEl?.getBoundingClientRect()
      const footerRect = footerEl?.getBoundingClientRect()
      const vh = window.innerHeight

      // Check if hero bottom is still on screen
      const heroVisible = heroRect ? heroRect.bottom > vh * 0.25 : false

      // Check if we're inside a suppressed section
      const inSuppressed = suppressedEls.some((el) => {
        const r = el.getBoundingClientRect()
        return r.top < vh * 0.75 && r.bottom > vh * 0.25
      })

      // Check if footer is in view
      const atFooter = footerRect ? footerRect.top < vh : false

      // Hero mode — truly inline, always visible
      if (heroVisible) {
        setInHero(true)
        setVisible(true)
        scrollUpDistance.current = 0
        lastScrollY.current = currentY
        clearIdle()
        return
      }

      // Leaving hero — switch to fixed mode
      setInHero(false)

      // Suppressed in timeline/gallery — hide and don't trigger
      if (inSuppressed || atFooter) {
        setVisible(false)
        scrollUpDistance.current = 0
        lastScrollY.current = currentY
        startIdle(false)
        return
      }

      // Normal scroll-up / scroll-down behavior
      if (delta < 0) {
        scrollUpDistance.current += Math.abs(delta)
        if (scrollUpDistance.current > 30) {
          setVisible(true)
        }
      } else if (delta > 5) {
        scrollUpDistance.current = 0
        setVisible(false)
      }

      lastScrollY.current = currentY
      startIdle(true)

      // Active section tracking
      let best: string | null = null
      let bestDist = Infinity
      for (const el of sectionEls) {
        const rect = el.getBoundingClientRect()
        if (rect.top < vh * 0.5 && rect.bottom > 0) {
          const dist = Math.abs(rect.top)
          if (dist < bestDist) {
            bestDist = dist
            best = el.id
          }
        }
      }
      setActiveSection(best)
    }

    // Initial state
    const heroRect = heroEl?.getBoundingClientRect()
    if (heroRect && heroRect.bottom > window.innerHeight * 0.25) {
      setInHero(true)
      setVisible(true)
    }

    window.addEventListener('scroll', onScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', onScroll)
      clearIdle()
    }
  }, [startIdle, clearIdle])

  return (
    <nav
      data-theme="footer"
      className="left-1/2 z-50 flex items-center bg-[var(--theme-bg)] max-w-[calc(100vw-32px)]"
      style={{
        position: inHero ? 'absolute' : 'fixed',
        bottom: inHero ? 0 : 16,
        gap: 'var(--mpds-space-16)',
        paddingLeft: 'var(--mpds-space-24)',
        paddingRight: 'var(--mpds-space-8)',
        paddingTop: 'var(--mpds-space-8)',
        paddingBottom: 'var(--mpds-space-8)',
        borderRadius: 12,
        opacity: visible ? 1 : 0,
        transform: visible
          ? `translate(-50%, ${inHero ? '50%' : '0'})`
          : 'translate(-50%, 20px)',
        pointerEvents: visible ? 'auto' : 'none',
        transition: inHero ? 'opacity 0.5s ease' : 'opacity 0.5s ease, transform 0.5s ease',
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
