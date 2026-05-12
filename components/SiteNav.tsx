'use client'
// Simplified site navigation — Figma node 615:8601.
// Hero state: transparent bar, position:absolute at top of page — scrolls off naturally.
// inHero = true while scrollY is above the Our Celebration section.
// Fixed pill state: appears only once the user reaches Our Celebration.

import { useEffect, useState, useRef, useCallback } from 'react'
import ColophonTooltip from './ColophonTooltip'
import type { ColophonContent } from '@/types/content'

const NAV_LINKS = [
  { label: 'Our Celebration', href: '#celebration', id: 'celebration' },
  { label: 'Travel & Stay', href: '#travel', id: 'travel' },
  { label: 'Registry', href: '#registry', id: 'registry' },
]

const IDLE_TIMEOUT = 15000

export default function SiteNav({ colophon }: { colophon: ColophonContent }) {
  const [visible, setVisible] = useState(true)
  const [inHero, setInHero] = useState(true)
  const [inFooter, setInFooter] = useState(false)
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
    const footerEl = document.querySelector('footer')
    const sectionEls = NAV_LINKS.map(({ id }) => document.getElementById(id)).filter(Boolean) as HTMLElement[]

    let heroBottom = 0
    let footerTop = Infinity
    let celebrationTop = Infinity
    type CachedSection = { el: HTMLElement; top: number; bottom: number }
    let cachedSections: CachedSection[] = []

    const measure = () => {
      if (heroEl) heroBottom = heroEl.offsetTop + heroEl.offsetHeight
      if (footerEl) footerTop = (footerEl as HTMLElement).offsetTop
      cachedSections = sectionEls.map(el => ({
        el,
        top: el.offsetTop,
        bottom: el.offsetTop + el.offsetHeight,
      }))
      const cel = cachedSections.find(s => s.el.id === 'celebration')
      celebrationTop = cel?.top ?? Infinity
    }
    measure()

    const onScroll = () => {
      const currentY = window.scrollY
      const delta = currentY - lastScrollY.current
      const vh = window.innerHeight

      // Hero nav (absolute, top of page) while above Our Celebration;
      // pill only once at/past celebration. The hero nav scrolls off naturally
      // through Timeline / Gallery / Marquee — no nav gap, no premature pill.
      const nowInHero = currentY < celebrationTop - vh * 0.5
      setInHero(nowInHero)

      // Suppress pill once the footer crosses the viewport — pill sits at the
      // bottom and would otherwise overlap footer content.
      setInFooter(currentY + vh > footerTop)

      // Force-show while actually inside the hero section; scroll-direction
      // logic applies once the user has scrolled past the hero's bottom.
      const heroVisible = heroEl ? (heroBottom - currentY) > vh * 0.25 : false

      if (heroVisible) {
        setVisible(true)
        scrollUpDistance.current = 0
        lastScrollY.current = currentY
        clearIdle()
        return
      }

      if (delta < 0) {
        scrollUpDistance.current += Math.abs(delta)
        if (scrollUpDistance.current > 30) setVisible(true)
      } else if (delta > 5) {
        // Only hide on meaningful downward scroll — ignore inertia micro-jitters
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

    // Set initial state without waiting for a scroll event
    const initialInHero = window.scrollY < celebrationTop - window.innerHeight * 0.5
    setInHero(initialInHero)
    if (heroEl && (heroBottom - window.scrollY) > window.innerHeight * 0.25) {
      setVisible(true)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', measure, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', measure)
      clearIdle()
    }
  }, [startIdle, clearIdle])

  // Hero nav is absolute-positioned at the top, so it scrolls off naturally
  // — no fade logic needed. The pill (fixed) still uses scroll-direction visibility.
  const heroNavVisible = heroReady
  const pillVisible    = !inHero && visible && !inFooter

  return (
    <>
      {/* ── Hero nav — absolute, scrolls off naturally ── */}
      <nav
        className="absolute top-0 left-0 w-full z-50"
        style={{
          paddingTop: 'var(--mpds-space-24)',
          paddingBottom: 'var(--mpds-space-24)',
          opacity: heroNavVisible ? 1 : 0,
          transition: 'opacity 0.5s ease',
          pointerEvents: heroNavVisible ? 'auto' : 'none',
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
          {/* Mark — logo ornament (opens colophon) */}
          <ColophonTooltip content={colophon}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/wedding-site--nav-mark.svg"
              alt=""
              aria-hidden="true"
              style={{
                width: 'var(--mpds-dimension-128)',
                height: 'var(--mpds-dimension-128)',
                display: 'block',
              }}
            />
          </ColophonTooltip>

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
              backgroundColor: 'var(--theme-action)',
              color: 'var(--theme-btn-text)',
            }}
          >
            RSVP
          </a>
        </div>
      </nav>

      {/* ── Pill nav — fixed at bottom, visible at/past Our Celebration ── */}
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
          transition: 'opacity 0.5s ease, transform 0.5s ease',
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
    </>
  )
}
