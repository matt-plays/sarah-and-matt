'use client'
// Photos page hero — Figma node 1418:4955.
// Borrows the RSVP section's layout (heading + copy/CTA row over a right-bleeding
// photo strip) and the home hero's blush ground + landscape panorama.
// Strip photos shuffle one slot at a time; aspect ratios stay locked per slot.

import { useEffect, useRef, useState } from 'react'
import Button from './Button'
import { HERO_SLOTS } from '@/lib/photos'

const SHUFFLE_INTERVAL = 2000

export default function PhotosHero() {
  // Index of the photo currently showing in each slot
  const [active, setActive] = useState<number[]>(() => HERO_SLOTS.map(() => 0))
  const lastSlot = useRef(-1)

  // Fade the nav in (SiteNav waits on this event — same contract as the home hero)
  useEffect(() => {
    const id = setTimeout(() => window.dispatchEvent(new CustomEvent('hero-ready')), 300)
    return () => clearTimeout(id)
  }, [])

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const id = setInterval(() => {
      if (document.hidden) return
      // Advance one random slot, never the same one twice in a row, so the
      // strip feels like it's reshuffling rather than flipping in unison.
      let slot = Math.floor(Math.random() * HERO_SLOTS.length)
      if (slot === lastSlot.current) slot = (slot + 1) % HERO_SLOTS.length
      lastSlot.current = slot
      setActive((prev) =>
        prev.map((idx, i) => (i === slot ? (idx + 1) % HERO_SLOTS[i].photos.length : idx)),
      )
    }, SHUFFLE_INTERVAL)
    return () => clearInterval(id)
  }, [])

  return (
    <section
      id="hero"
      className="relative w-full flex flex-col items-center overflow-hidden"
      style={{
        backgroundColor: 'var(--blush)',
        // Clears the absolute SiteNav (128px mark + 24px padding top and bottom)
        paddingTop: 'calc(var(--mpds-dimension-128) + var(--mpds-space-48) + var(--sp-lg))',
        paddingBottom: 'var(--sp-2xl)',
      }}
    >
      {/* ── Landscape panorama — mirrored, sits behind the photo strip ── */}
      <div
        className="absolute bottom-0 left-0 w-full overflow-hidden pointer-events-none"
        aria-hidden="true"
        style={{ zIndex: 0 }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/photos/wedding-site--photos-landscape-1920w.webp"
          srcSet="/images/photos/wedding-site--photos-landscape-960w.webp 960w, /images/photos/wedding-site--photos-landscape-1920w.webp 1920w, /images/photos/wedding-site--photos-landscape-3200w.webp 3200w"
          sizes="(min-width: 640px) 100vw, 200vw"
          alt=""
          decoding="async"
          // Mirrored inside the same transform as the shift, so it flips before
          // moving — the standalone `scale` property applies after it and pushed
          // the 200%-wide mobile image half a screen right
          className="w-[200%] sm:w-full max-w-none h-auto block -translate-x-1/4 sm:translate-x-0 -scale-x-100"
          style={{ marginBottom: '-4%' }}
        />
      </div>

      <div className="site-container relative flex flex-col" style={{ zIndex: 1, gap: 'var(--mpds-space-xl)' }}>
        {/* ── Heading + intro row ──
            `last baseline` lines up the final heading line (“& family”) with the
            button label, rather than the bottoms of the two boxes. */}
        <div className="flex flex-col xl:flex-row xl:[align-items:last_baseline] xl:justify-between" style={{ gap: 'var(--mpds-space-lg)' }}>
          <h1
            className="font-romie font-light leading-none"
            style={{
              fontSize: 'var(--mpds-font-size-11xl)',
              letterSpacing: '-0.01em',
              color: 'var(--mpds-color-slate-900)',
              fontFeatureSettings: '"ss01" 1, "ss02" 1',
            }}
          >
            <span className="block"><em className="italic">W</em>elcome,</span>
            <span className="block" style={{ paddingLeft: '0.3em' }}>friends</span>
            <span className="block" style={{ paddingLeft: '1.1em' }}>&amp; family</span>
          </h1>

          <div className="flex flex-col items-start md:shrink-0" style={{ gap: 'var(--mpds-space-sm)', maxWidth: 512 }}>
            <div className="flex flex-col" style={{ gap: 'var(--mpds-space-2xs)', color: 'var(--mpds-color-slate-900)' }}>
              <h2
                className="font-instrument font-medium leading-[1.125]"
                style={{ fontSize: 'var(--mpds-font-size-2xl)', letterSpacing: '-0.02em' }}
              >
                The photos are here!
              </h2>
              <p className="font-instrument leading-[1.625]" style={{ fontSize: 'var(--mpds-font-size-lg)' }}>
                Below you’ll find our favorite shots from our photographer, the photo booth, and your table’s disposable camera. Tap on any photo to see it larger or save it for yourself.
              </p>
            </div>
            <Button
              onClick={() => document.getElementById('galleries')?.scrollIntoView({ behavior: 'smooth' })}
            >
              See our galleries
            </Button>
          </div>
        </div>

        {/* ── Shuffling photo strip — left-aligned to container, bleeds right ── */}
        <div className="flex items-end" style={{ gap: 'var(--mpds-space-16)' }}>
          {HERO_SLOTS.map((slot, i) => (
            <div
              key={i}
              className="relative shrink-0 rounded-2xl overflow-hidden bg-white"
              style={{ width: 'calc(min(var(--site-container-width), 100vw) / 3)', aspectRatio: slot.aspect }}
            >
              {slot.photos.map((photo, j) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  key={j}
                  src={photo.src}
                  alt={photo.alt}
                  className="absolute inset-0 w-full h-full object-cover"
                  style={{
                    objectPosition: photo.position,
                    opacity: active[i] === j ? 1 : 0,
                    transition: 'opacity 0.8s ease',
                  }}
                  decoding="async"
                  aria-hidden={active[i] !== j}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
