'use client'
// Figma node: 419:2852
// Footer — dark theme, 12-col grid layout, large shader type at bottom.
// Desktop:  logo 3 / nav 3 / address 6
// Tablet:   logo 12 (own row) / nav 4 / address 8
// Mobile:   all stacked full-width

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
      className="font-spezia text-[var(--theme-text)] uppercase tracking-[0.12em] opacity-40 select-none"
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
      style={{ paddingTop: 'var(--sp-2xl)', paddingBottom: 0 }}
    >
      {/* ── Info grid ── */}
      <div
        className="site-container grid grid-cols-1 md:grid-cols-12"
        style={{ gap: 'var(--mpds-space-48)' }}
      >

        {/* Logo — mobile: full | tablet: 12 cols own row | desktop: 5 cols */}
        <div className="md:col-span-12 lg:col-span-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/wedding-site--footer-mark.svg"
            alt=""
            className="opacity-60"
            style={{ width: 99, height: 99 }}
          />
        </div>

        {/* Nav links — mobile: full | tablet: 4 cols | desktop: 2 cols */}
        <nav
          className="md:col-span-4 lg:col-span-3 flex flex-col font-instrument text-[var(--theme-text)] leading-[1.625]"
          style={{ fontSize: 'var(--mpds-font-size-lg)', gap: 'var(--mpds-space-8)' }}
        >
          <a href="#celebration" className="hover:text-[var(--theme-headline)] transition-colors">Our celebration</a>
          <a href="#travel" className="hover:text-[var(--theme-headline)] transition-colors">Travel &amp; Stay</a>
          <a href="https://zola.sarahandmatt.wedding/registry" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--theme-headline)] transition-colors">Registry</a>
          <a href="https://zola.sarahandmatt.wedding/rsvp" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--theme-headline)] transition-colors">RSVP</a>
        </nav>

        {/* Address lockup — mobile: full centered | tablet: 8 cols | desktop: 5 cols */}
        <div
          className="md:col-span-8 lg:col-span-6 flex flex-col"
          style={{ gap: 'var(--mpds-space-48)' }}
        >
          {/* Date row */}
          <div className="flex items-center" style={{ gap: 'var(--mpds-space-12)' }}>
            <span
              className="font-spezia text-[var(--theme-text)] uppercase tracking-[0.12em] leading-[1.125] whitespace-nowrap shrink-0"
              style={{ fontSize: 'var(--mpds-font-size-sm)' }}
            >
              Friday, August 28th
            </span>
            <HRLine />
            <span
              className="font-spezia text-[var(--theme-text)] uppercase tracking-[0.12em] leading-[1.125] whitespace-nowrap shrink-0"
              style={{ fontSize: 'var(--mpds-font-size-sm)' }}
            >
              2026
            </span>
          </div>

          {/* Address pill */}
          <div
            className="border border-[var(--theme-text)]"
            style={{
              paddingLeft: 'var(--mpds-space-28)',
              paddingRight: 'var(--mpds-space-28)',
              paddingTop: 'var(--mpds-space-16)',
              paddingBottom: 'var(--mpds-space-16)',
            }}
          >
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between" style={{ gap: 'var(--mpds-space-16)' }}>
              <span className="font-spezia text-[var(--theme-text)] uppercase tracking-[0.12em] leading-[1.125] whitespace-nowrap shrink-0" style={{ fontSize: 'var(--mpds-font-size-sm)' }}>Excelsior</span>
              <span className="hidden sm:inline font-spezia text-[var(--theme-text)] uppercase tracking-[0.12em] opacity-40 select-none" style={{ fontSize: 'var(--mpds-font-size-sm)' }}>/</span>
              <span className="font-spezia text-[var(--theme-text)] uppercase tracking-[0.12em] leading-[1.125] whitespace-nowrap shrink-0" style={{ fontSize: 'var(--mpds-font-size-sm)' }}>125 E King Street</span>
              <span className="hidden sm:inline font-spezia text-[var(--theme-text)] uppercase tracking-[0.12em] opacity-40 select-none" style={{ fontSize: 'var(--mpds-font-size-sm)' }}>/</span>
              <span className="font-spezia text-[var(--theme-text)] uppercase tracking-[0.12em] leading-[1.125] whitespace-nowrap shrink-0" style={{ fontSize: 'var(--mpds-font-size-sm)' }}>Lancaster, PA</span>
            </div>
          </div>

          {/* Time row */}
          <div className="flex items-center" style={{ gap: 'var(--mpds-space-12)' }}>
            <span
              className="font-spezia text-[var(--theme-text)] uppercase tracking-[0.12em] leading-[1.125] whitespace-nowrap shrink-0"
              style={{ fontSize: 'var(--mpds-font-size-sm)' }}
            >
              5 o&apos;clock
            </span>
            <HRLine />
            <span
              className="font-spezia text-[var(--theme-text)] uppercase tracking-[0.12em] leading-[1.125] whitespace-nowrap shrink-0"
              style={{ fontSize: 'var(--mpds-font-size-sm)' }}
            >
              in the evening
            </span>
          </div>
        </div>
      </div>

      {/* ── Large type — texture PNG masked through SVG letterforms ── */}
      <div
        className="w-full overflow-hidden"
        style={{ marginTop: 'var(--mpds-space-xl)', fontSize: 0, lineHeight: 0 }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/wedding-site--footer-texture.png"
          alt="Sarah & Matt"
          className="w-full"
          style={{
            display: 'block',
            maskImage: 'url(/images/wedding-site--footer-type.svg)',
            WebkitMaskImage: 'url(/images/wedding-site--footer-type.svg)',
            maskSize: '100% auto',
            WebkitMaskSize: '100% auto',
            maskRepeat: 'no-repeat',
            WebkitMaskRepeat: 'no-repeat',
            maskPosition: 'bottom left',
            WebkitMaskPosition: 'bottom left',
          }}
        />
      </div>
    </footer>
  )
}
