'use client'
// Figma node: 419:2852
// Footer — dark theme, 3-column layout, large shader type at bottom.

import { HalftoneCmyk } from '@paper-design/shaders-react'

// ─── Separator line ──────────────────────────────────────────────────────────

function HRLine() {
  return (
    <div
      className="flex-1 h-px min-w-0"
      style={{ backgroundColor: 'var(--theme-text)' }}
    />
  )
}

function SlashSep() {
  return (
    <span
      className="font-dm font-bold text-[var(--theme-text)] uppercase tracking-[0.12em] opacity-40 select-none"
      style={{ fontSize: 'var(--mpds-font-size-sm)' }}
    >
      /
    </span>
  )
}

// ─── Footer ──────────────────────────────────────────────────────────────────

export default function SiteFooter() {
  return (
    <footer
      data-theme="footer"
      className="w-full flex flex-col items-center bg-[var(--theme-bg)]"
      style={{ paddingTop: 'var(--sp-2xl)' }}
    >
      {/* ── 3-column info row ── */}
      <div
        className="site-container flex items-start"
        style={{ gap: 32 }}
      >
        {/* Left — ornamental glyph */}
        <p
          className="font-romie-trial font-light text-[var(--theme-tonal)] leading-none shrink-0"
          style={{ fontSize: 'var(--mpds-font-size-11xl)', width: 648 }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/hero-ornament.svg"
            alt=""
            className="opacity-60"
            style={{ width: 99, height: 93 }}
          />
        </p>

        {/* Center — nav links */}
        <nav
          className="shrink-0 flex flex-col justify-between self-stretch font-instrument text-[var(--theme-text)] leading-[1.625]"
          style={{ fontSize: 'var(--mpds-font-size-lg)', width: 376 }}
        >
          <a href="#celebration" className="hover:text-[var(--theme-headline)] transition-colors">Our celebration</a>
          <a href="#travel" className="hover:text-[var(--theme-headline)] transition-colors">Travel &amp; Stay</a>
          <a href="#registry" className="hover:text-[var(--theme-headline)] transition-colors">Registry</a>
          <a href="#rsvp" className="hover:text-[var(--theme-headline)] transition-colors">RSVP</a>
        </nav>

        {/* Right — event details */}
        <div className="flex-1 flex flex-col min-w-0" style={{ gap: 48 }}>
          {/* Date row */}
          <div
            className="flex items-center"
            style={{ gap: 'var(--mpds-space-12)' }}
          >
            <span
              className="font-dm font-bold text-[var(--theme-text)] uppercase tracking-[0.12em] leading-[1.125] whitespace-nowrap shrink-0"
              style={{ fontSize: 'var(--mpds-font-size-sm)' }}
            >
              Friday, August 28th
            </span>
            <HRLine />
            <span
              className="font-dm font-bold text-[var(--theme-text)] uppercase tracking-[0.12em] leading-[1.125] whitespace-nowrap shrink-0"
              style={{ fontSize: 'var(--mpds-font-size-sm)' }}
            >
              2026
            </span>
          </div>

          {/* Address pill */}
          <div
            className="flex items-center border border-[var(--theme-text)]"
            style={{
              gap: 'var(--mpds-space-16)',
              paddingLeft: 'var(--mpds-space-28)',
              paddingRight: 'var(--mpds-space-28)',
              paddingTop: 'var(--mpds-space-16)',
              paddingBottom: 'var(--mpds-space-16)',
            }}
          >
            <span
              className="font-dm font-bold text-[var(--theme-text)] uppercase tracking-[0.12em] leading-[1.125] whitespace-nowrap shrink-0"
              style={{ fontSize: 'var(--mpds-font-size-sm)' }}
            >
              Excelsior
            </span>
            <SlashSep />
            <span
              className="font-dm font-bold text-[var(--theme-text)] uppercase tracking-[0.12em] leading-[1.125] whitespace-nowrap shrink-0"
              style={{ fontSize: 'var(--mpds-font-size-sm)' }}
            >
              125 E King Street
            </span>
            <SlashSep />
            <span
              className="font-dm font-bold text-[var(--theme-text)] uppercase tracking-[0.12em] leading-[1.125] whitespace-nowrap shrink-0"
              style={{ fontSize: 'var(--mpds-font-size-sm)' }}
            >
              Lancaster, PA
            </span>
          </div>

          {/* Time row */}
          <div
            className="flex items-center"
            style={{ gap: 'var(--mpds-space-12)' }}
          >
            <span
              className="font-dm font-bold text-[var(--theme-text)] uppercase tracking-[0.12em] leading-[1.125] whitespace-nowrap shrink-0"
              style={{ fontSize: 'var(--mpds-font-size-sm)' }}
            >
              5 o&apos;clock
            </span>
            <HRLine />
            <span
              className="font-dm font-bold text-[var(--theme-text)] uppercase tracking-[0.12em] leading-[1.125] whitespace-nowrap shrink-0"
              style={{ fontSize: 'var(--mpds-font-size-sm)' }}
            >
              in the afternoon
            </span>
          </div>
        </div>
      </div>

      {/* ── Large type with shader texture ── */}
      <div
        className="relative w-full overflow-hidden"
        style={{ height: 284, marginTop: 'var(--mpds-space-xl)' }}
      >
        {/* Shader canvas behind — fills full width */}
        <div className="absolute inset-0">
          <HalftoneCmyk
            image="/images/wedding-site--footer-texture.png"
            type="dots"
            fit="cover"
            size={0.01}
            gridNoise={0.48}
            softness={1.0}
            contrast={1.0}
            scale={0.8}
            colorC="#83BEC2"
            colorM="#C2839D"
            colorY="#E2A01C"
            colorK="#213200"
            gainC={-0.62}
            gainM={0.93}
            gainY={0.20}
            gainK={0}
            floodC={0.15}
            floodM={0}
            floodY={0}
            floodK={0}
            grainSize={0.46}
            grainMixer={0}
            grainOverlay={0}
            style={{ width: '100%', height: '100%', background: 'transparent' }}
          />
        </div>

        {/* SVG type mask — uses the shader as fill via CSS mask */}
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{
            maskImage: 'url(/images/wedding-site--footer-type.svg)',
            WebkitMaskImage: 'url(/images/wedding-site--footer-type.svg)',
            maskSize: '100% 100%',
            WebkitMaskSize: '100% 100%',
            maskRepeat: 'no-repeat',
            WebkitMaskRepeat: 'no-repeat',
          }}
        >
          <HalftoneCmyk
            image="/images/wedding-site--footer-texture.png"
            type="dots"
            fit="cover"
            size={0.01}
            gridNoise={0.48}
            softness={1.0}
            contrast={1.0}
            scale={0.8}
            colorC="#83BEC2"
            colorM="#C2839D"
            colorY="#E2A01C"
            colorK="#213200"
            gainC={-0.62}
            gainM={0.93}
            gainY={0.20}
            gainK={0}
            floodC={0.15}
            floodM={0}
            floodY={0}
            floodK={0}
            grainSize={0.46}
            grainMixer={0}
            grainOverlay={0}
            style={{ width: '100%', height: '100%', background: 'transparent' }}
          />
        </div>
      </div>
    </footer>
  )
}
