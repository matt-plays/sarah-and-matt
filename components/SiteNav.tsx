'use client'
// Floating navigation bar — fixed at bottom center.
// Shows on scroll-up or after 15s idle. Hides on scroll-down.
// Uses footer theme (dark pill).

import { useEffect, useState, useRef, useCallback } from 'react'

const NAV_LINKS = [
  { label: 'Our Celebration', href: '#celebration', id: 'celebration' },
  { label: 'Travel & Stay', href: '#travel', id: 'travel' },
  { label: 'Registry', href: '#registry', id: 'registry' },
]

const IDLE_TIMEOUT = 15000 // 15 seconds

export default function SiteNav() {
  const [visible, setVisible] = useState(false)
  const [activeSection, setActiveSection] = useState<string | null>(null)
  const lastScrollY = useRef(0)
  const scrollUpDistance = useRef(0)
  const idleTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const isInRange = useRef(false) // past hero, before footer

  const clearIdle = useCallback(() => {
    if (idleTimer.current) {
      clearTimeout(idleTimer.current)
      idleTimer.current = null
    }
  }, [])

  const startIdle = useCallback(() => {
    clearIdle()
    idleTimer.current = setTimeout(() => {
      if (isInRange.current) {
        setVisible(true)
      }
    }, IDLE_TIMEOUT)
  }, [clearIdle])

  useEffect(() => {
    const heroEl = document.getElementById('hero')
    const footerEl = document.querySelector('footer') as HTMLElement
    const sectionEls = NAV_LINKS.map(({ id }) => document.getElementById(id)).filter(Boolean) as HTMLElement[]

    const onScroll = () => {
      const currentY = window.scrollY
      const delta = currentY - lastScrollY.current

      // Determine if we're in the valid range (past hero, before footer)
      const heroRect = heroEl?.getBoundingClientRect()
      const footerRect = footerEl?.getBoundingClientRect()
      const pastHero = heroRect ? heroRect.bottom < 0 : false
      const atFooter = footerRect ? footerRect.top < window.innerHeight : false
      isInRange.current = pastHero && !atFooter

      if (!isInRange.current) {
        setVisible(false)
        scrollUpDistance.current = 0
        lastScrollY.current = currentY
        startIdle()
        return
      }

      if (delta < 0) {
        // Scrolling up — accumulate distance
        scrollUpDistance.current += Math.abs(delta)
        // Show after 30px of upward scroll
        if (scrollUpDistance.current > 30) {
          setVisible(true)
        }
      } else if (delta > 5) {
        // Scrolling down — hide and reset
        scrollUpDistance.current = 0
        setVisible(false)
      }

      lastScrollY.current = currentY

      // Restart idle timer on any scroll
      startIdle()

      // Active section tracking
      let best: string | null = null
      let bestDist = Infinity
      for (const el of sectionEls) {
        const rect = el.getBoundingClientRect()
        if (rect.top < window.innerHeight * 0.5 && rect.bottom > 0) {
          const dist = Math.abs(rect.top)
          if (dist < bestDist) {
            bestDist = dist
            best = el.id
          }
        }
      }
      setActiveSection(best)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    startIdle() // start initial idle timer

    return () => {
      window.removeEventListener('scroll', onScroll)
      clearIdle()
    }
  }, [startIdle, clearIdle])

  return (
    <nav
      data-theme="footer"
      className="fixed bottom-6 left-1/2 z-50 flex items-center bg-[var(--theme-bg)] transition-all duration-500"
      style={{
        gap: 'var(--mpds-space-sm)',
        paddingLeft: 'var(--mpds-space-40)',
        paddingRight: 'var(--mpds-space-8)',
        paddingTop: 'var(--mpds-space-8)',
        paddingBottom: 'var(--mpds-space-8)',
        borderRadius: 12,
        opacity: visible ? 1 : 0,
        transform: visible ? 'translate(-50%, 0)' : 'translate(-50%, 20px)',
        pointerEvents: visible ? 'auto' : 'none',
      }}
      aria-label="Main navigation"
    >
      {NAV_LINKS.map(({ label, href, id }) => (
        <a
          key={href}
          href={href}
          className={`font-instrument transition-colors whitespace-nowrap ${
            activeSection === id
              ? 'text-[var(--theme-btn-text)]'
              : 'text-[var(--theme-text)] hover:text-[var(--theme-btn-text)]'
          }`}
          style={{ fontSize: 'var(--mpds-font-size-lg)' }}
          onClick={(e) => {
            e.preventDefault()
            document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
          }}
        >
          {label}
        </a>
      ))}
      <a
        href="#rsvp"
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
        onClick={(e) => {
          e.preventDefault()
          document.querySelector('#rsvp')?.scrollIntoView({ behavior: 'smooth' })
        }}
      >
        RSVP
      </a>
    </nav>
  )
}
