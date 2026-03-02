// Figma node: 265:6145

export default function RSVPSection() {
  return (
    <section className="w-full bg-warm-green-700 flex justify-center py-sp-2xl">
      <div className="container-width flex gap-sp-lg items-end">

        {/* "You in? RSVP" display heading */}
        <h2
          className="font-romie-trial font-light text-blue-s-0 leading-none flex-1 min-w-0"
          style={{ fontSize: "var(--fs-11xl)" }}
        >
          You in?<br />RSVP
        </h2>

        {/* Right — copy + CTA */}
        <div
          className="flex flex-col gap-sp-sm items-start shrink-0"
          style={{ width: "min(504px, 40%)" }}
        >
          <p
            className="font-instrument text-blue-s-0 leading-relaxed font-instrument"
            style={{ fontSize: "var(--fs-xl)" }}
          >
            We&apos;d love to know if you can make it. Please RSVP by{" "}
            <strong>June 1, 2026</strong> so we can plan accordingly.
          </p>
          <a
            href="https://withjoy.com/sarah-and-matt-aug26/rsvp"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-red-s-25 text-cool-green-600 font-instrument font-semibold rounded-lg px-8 py-4 text-fs-2xl leading-snug transition-opacity hover:opacity-90 font-instrument"
          >
            RSVP Now
          </a>
        </div>
      </div>
    </section>
  );
}
