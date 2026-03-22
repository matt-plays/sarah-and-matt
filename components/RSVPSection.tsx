'use client'
// Figma node: 342:6253
// Dark-green RSVP section: heading + CTA, then a 4-column photo strip below.
// Starts green, transitions to taupe when Registry enters viewport.

import { useScrollSection, useTheme } from '@/context/ThemeContext'
import Button from './Button'
import { SiteContent } from '@/types/content'
import defaultContent from '@/content/content.json'

const c = defaultContent as SiteContent

const PHOTO_STRIP = [
  '/images/wedding-site--rsvp-01.png',
  '/images/wedding-site--rsvp-02.png',
  '/images/wedding-site--rsvp-03.png',
  '/images/wedding-site--rsvp-04.png',
]

export default function RSVPSection() {
  const sectionRef = useScrollSection<HTMLElement>('green')
  const { activeTheme } = useTheme()
  const content = c.rsvp

  // Green until taupe takes over. Once taupe, stay taupe (even when body reverts to default at footer).
  const localTheme = activeTheme === 'taupe' ? 'taupe' : 'green'

  return (
    <section
      ref={sectionRef}
      id="rsvp"
      data-theme={localTheme}
      className="w-full flex flex-col items-center bg-[var(--theme-bg)] overflow-hidden"
      style={{
        paddingTop: 'var(--sp-2xl)',
        paddingBottom: 'var(--sp-2xl)',
        transition: 'background-color 0.5s ease',
      }}
    >
      <div
        className="site-container flex flex-col"
        style={{ gap: 'var(--mpds-space-xl)' }}
      >
        {/* ── Heading + CTA row ── */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between" style={{ gap: 'var(--mpds-space-lg)' }}>
          <h2
            className="font-romie-trial font-light text-[var(--theme-headline)] leading-none flex-1 min-w-0"
            style={{ fontSize: 'var(--mpds-font-size-11xl)', transition: 'color 0.5s ease' }}
          >
            Let us know if{'\n'}you can make it
          </h2>
          <div
            className="flex flex-col items-start md:shrink-0"
            style={{ gap: 'var(--mpds-space-sm)', maxWidth: 512 }}
          >
            <p
              className="font-instrument text-[var(--theme-text)] leading-[1.625]"
              style={{ fontSize: 'var(--mpds-font-size-lg)', transition: 'color 0.5s ease' }}
            >
              {content.body}
            </p>
            <Button
              onClick={() => window.open(content.url, '_blank', 'noopener,noreferrer')}
            >
              Join us and RSVP now
            </Button>
          </div>
        </div>

        {/* ── Photo strip — left-aligned to container, bleeds right ── */}
        <div
          className="flex items-end"
          style={{ gap: 'var(--mpds-space-16)' }}
        >
          {PHOTO_STRIP.map((src, i) => (
            <div
              key={i}
              className="shrink-0 rounded-2xl overflow-hidden bg-[var(--theme-bg)]"
              style={{ width: 'min(512px, 75vw)', transition: 'background-color 0.5s ease' }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={src}
                alt=""
                className="w-full h-auto block"
                style={{ mixBlendMode: 'screen' }}
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
