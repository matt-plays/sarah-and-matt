'use client'
// Hero section — pink background, landscape panorama, invitation SVG + building illustration.
// Figma node: 342:6133 (desktop), 583:4403 (tablet), 584:3503 (mobile)

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative w-full overflow-clip"
      style={{
        backgroundColor: '#F7CCC3',
        paddingTop: 'var(--sp-xl)',
        paddingBottom: 'var(--sp-2xl)',
      }}
    >
      {/* ── Background landscape with pink overlay ── */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/wedding-site--hero-graphic-01.png"
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0" style={{ backgroundColor: '#F7CCC3' }} />
      </div>

      {/* ── Main content ── */}
      <div
        className="site-container relative"
        style={{ paddingBottom: 'var(--mpds-space-128)' }}
      >
        {/*
          Mobile/tablet: centered invitation card, constrained width.
          Desktop (lg): 12-col grid with card in left 6 columns.
        */}
        <div className="flex justify-center lg:grid lg:grid-cols-12" style={{ gap: 'var(--site-grid-gutter)' }}>
          <div
            className="w-[74%] max-w-[320px] md:max-w-[480px] lg:col-span-6 lg:w-auto lg:max-w-none lg:ml-[-7.8%] relative"
            style={{ marginBottom: 'var(--sp-xl)' }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/wedding-site--hero-graphic-02.svg"
              alt="Sarah Petrokonis &amp; Matt Plays — Friday, August 28th 2026 — 5 o'clock in the afternoon — Excelsior, 125 E King Street, Lancaster, PA"
              className="w-full h-auto"
            />
          </div>
        </div>
      </div>

      {/* ── Building illustration — desktop only ── */}
      <div
        className="absolute inset-0 z-10 pointer-events-none hidden lg:grid grid-cols-2"
        aria-hidden="true"
        style={{ paddingTop: 'var(--sp-xl)', gap: 'var(--sp-xl)' }}
      >
        {/* Empty first column */}
        <div />
        {/* Second column — building anchored bottom-right, overflow clipped by section */}
        <div className="relative overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/wedding-site--hero-graphic-03.svg"
            alt=""
            className="absolute bottom-0 h-full w-auto max-w-none"
            style={{ right: 'clamp(-314px, calc(43.21vw - 756px), -65px)' }}
          />
        </div>
      </div>

      {/* ── Bottom landscape panorama ── */}
      <div
        className="absolute bottom-0 left-0 w-full overflow-hidden pointer-events-none"
        aria-hidden="true"
        style={{ height: 'clamp(120px, 18.75vw, 360px)' }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/wedding-site--hero-graphic-01.png"
          alt=""
          className="w-full h-full object-cover"
        />
      </div>
    </section>
  )
}
