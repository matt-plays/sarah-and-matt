// Figma node: 267:6579
// Sticky site-wide navigation.
// Fleuron: Gans Classical Fleurons "Y" — decorative ornament mark.
// Links anchor to section IDs: #celebration, #travel, #registry, #rsvp.
// Must be placed BEFORE <Hero /> in page.tsx — sticky breaks inside overflow-hidden.

export default function SiteNav() {
  return (
    <header className="w-full sticky top-0 z-50 bg-red-m-25">
      <div className="container-width flex items-center justify-between py-6">

        {/* Fleuron mark — links to top of page */}
        <a href="#" aria-label="Back to top" className="leading-none shrink-0">
          <span
            className="font-gans-fleurons text-clay-700 select-none leading-none block"
            style={{ fontSize: "96px" }}
            aria-hidden="true"
          >
            Y
          </span>
        </a>

        {/* Nav links + RSVP CTA */}
        <nav className="flex items-center gap-8" aria-label="Main navigation">
          <a
            href="#celebration"
            className="font-instrument text-clay-700 hover:opacity-60 transition-opacity font-instrument"
            style={{ fontSize: "18px" }}
          >
            Our celebration
          </a>
          <a
            href="#travel"
            className="font-instrument text-clay-700 hover:opacity-60 transition-opacity font-instrument"
            style={{ fontSize: "18px" }}
          >
            Travel &amp; Stay
          </a>
          <a
            href="#registry"
            className="font-instrument text-clay-700 hover:opacity-60 transition-opacity font-instrument"
            style={{ fontSize: "18px" }}
          >
            Registry
          </a>
          <a
            href="#rsvp"
            className="bg-red-s-25 text-cool-green-600 font-instrument font-semibold rounded-lg px-8 py-4 leading-snug hover:opacity-90 transition-opacity font-instrument"
            style={{ fontSize: "24px" }}
          >
            RSVP
          </a>
        </nav>

      </div>
    </header>
  );
}
