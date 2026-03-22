// Figma node: 267:6579
// Sticky site-wide navigation.
// Fleuron: Gans Classical Fleurons "Y" — decorative ornament mark.
// Links anchor to section IDs: #celebration, #travel, #registry, #rsvp.
// Must be placed BEFORE <Hero /> in page.tsx — sticky breaks inside overflow-hidden.

export default function SiteNav() {
  return (
    <header
      className="w-full sticky top-0 z-50 bg-[var(--theme-bg)]"
      style={{ transition: 'background-color 0.5s ease' }}
    >
      <div className="container-width flex items-center justify-between py-6">

        {/* Fleuron mark — links to top of page */}
        <a href="#" aria-label="Back to top" className="leading-none shrink-0">
          <span
            className="font-gans-fleurons text-[var(--theme-headline)] select-none leading-none block"
            style={{ fontSize: "96px", transition: 'color 0.5s ease' }}
            aria-hidden="true"
          >
            Y
          </span>
        </a>

        {/* Nav links + RSVP CTA */}
        <nav className="flex items-center gap-8" aria-label="Main navigation">
          <a
            href="#celebration"
            className="font-instrument text-[var(--theme-headline)] hover:opacity-60 transition-opacity"
            style={{ fontSize: "18px", transition: 'color 0.5s ease' }}
          >
            Our celebration
          </a>
          <a
            href="#travel"
            className="font-instrument text-[var(--theme-headline)] hover:opacity-60 transition-opacity"
            style={{ fontSize: "18px", transition: 'color 0.5s ease' }}
          >
            Travel &amp; Stay
          </a>
          <a
            href="#registry"
            className="font-instrument text-[var(--theme-headline)] hover:opacity-60 transition-opacity"
            style={{ fontSize: "18px", transition: 'color 0.5s ease' }}
          >
            Registry
          </a>
          <a
            href="#rsvp"
            className="bg-[var(--theme-action)] text-[var(--theme-btn-text)] font-instrument font-semibold rounded-lg px-8 py-4 leading-snug hover:opacity-90"
            style={{ fontSize: "24px", transition: 'background-color 0.5s ease, color 0.5s ease' }}
          >
            RSVP
          </a>
        </nav>

      </div>
    </header>
  );
}
