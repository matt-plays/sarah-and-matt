'use client'
// Hero section — placeholder using SVG graphics on 12-col grid

export default function Hero() {
  return (
    <section
      id="hero"
      className="w-full overflow-hidden"
      style={{ backgroundColor: '#F0D0DB', paddingTop: 'var(--mpds-space-24)', paddingBottom: 'var(--sp-2xl)', marginBottom: 'var(--sp-2xl)' }}
    >
      {/* ── Nav bar ── */}
      <div
        className="site-container flex items-center justify-between"
        style={{ paddingBottom: 'var(--mpds-space-lg)' }}
      >
        <a href="#" aria-label="Back to top" className="shrink-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/wedding-site--hero-graphic-01.svg"
            alt=""
            className="opacity-60"
            style={{ width: 56, height: 56 }}
          />
        </a>
        <nav className="hidden md:flex items-center" style={{ gap: 'var(--mpds-space-32)' }} aria-label="Main navigation">
          <a
            href="#celebration"
            className="font-instrument text-[var(--mpds-color-neutral-clay-800)] hover:opacity-60 transition-opacity"
            style={{ fontSize: 'var(--mpds-font-size-lg)' }}
          >
            Our Celebration
          </a>
          <a
            href="#travel"
            className="font-instrument text-[var(--mpds-color-neutral-clay-800)] hover:opacity-60 transition-opacity"
            style={{ fontSize: 'var(--mpds-font-size-lg)' }}
          >
            Travel &amp; Stay
          </a>
          <a
            href="#registry"
            className="font-instrument text-[var(--mpds-color-neutral-clay-800)] hover:opacity-60 transition-opacity"
            style={{ fontSize: 'var(--mpds-font-size-lg)' }}
          >
            Registry
          </a>
          <a
            href="#rsvp"
            className="bg-[var(--mpds-color-yellow-s-600)] text-[var(--mpds-color-clay-100)] font-instrument font-semibold leading-snug hover:opacity-90 transition-opacity"
            style={{
              fontSize: 'var(--mpds-font-size-lg)',
              paddingTop: 'var(--mpds-space-14)',
              paddingBottom: 'var(--mpds-space-16)',
              paddingLeft: 'var(--mpds-space-32)',
              paddingRight: 'var(--mpds-space-32)',
              borderRadius: 4,
            }}
            onClick={(e) => {
              e.preventDefault()
              document.querySelector('#rsvp')?.scrollIntoView({ behavior: 'smooth' })
            }}
          >
            RSVP
          </a>
        </nav>
      </div>

      {/* ── Body: 12-col grid with two 5-col SVGs ── */}
      <div
        className="site-container"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(12, 1fr)',
          gap: 'var(--site-grid-gutter)',
          alignItems: 'center',
        }}
      >
        {/* Left 5 cols — invitation card SVG */}
        <div style={{ gridColumn: '1 / 6' }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/wedding-site--hero-graphic-02.svg"
            alt="Sarah Petrokonis &amp; Matt Plays — Friday, August 28th 2026 — 5 o'clock in the afternoon — Excelsior, 125 E King Street, Lancaster, PA"
            className="w-full h-auto"
          />
        </div>

        {/* Right 5 cols — building illustration */}
        <div style={{ gridColumn: '8 / 13' }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/wedding-site--hero-graphic-03.svg"
            alt=""
            className="w-full h-auto"
            aria-hidden="true"
          />
        </div>
      </div>
    </section>
  )
}
