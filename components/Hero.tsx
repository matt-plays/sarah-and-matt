'use client'
// Hero section — Three.js invite card, centered, pink background, landscape panorama.
// Figma node: 342:6133 (desktop), 583:4403 (tablet), 584:3503 (mobile)

import InviteCanvas from './InviteCanvas'

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

      {/* ── Centered Three.js invite card ── */}
      <div
        className="site-container relative flex justify-center"
        style={{ paddingBottom: 'var(--mpds-space-128)' }}
      >
        <div
          className="w-[74%] max-w-[320px] md:max-w-[480px] lg:max-w-[720px]"
          style={{ marginBottom: 'var(--sp-xl)' }}
        >
          <InviteCanvas />
          <noscript>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/hero-invite-front.svg"
              alt="Sarah Petrokonis &amp; Matt Plays — Friday, August 28th 2026 — 5 o'clock in the afternoon — Excelsior, 125 E King Street, Lancaster, PA"
              className="w-full h-auto"
            />
          </noscript>
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
