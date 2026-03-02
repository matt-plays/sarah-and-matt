// Figma node: 266:6440
// Horizontal-scrolling "Our Story" timeline.
// Cards are fixed-width and overflow the viewport intentionally — the section clips them.
// The Figma uses justify-center on the inner row, so the strip bleeds symmetrically.
// Body text is placeholder; update each entry with the real story copy.

interface StoryCard {
  year: string;
  heading: string;
  body: string;
}

const storyCards: StoryCard[] = [
  {
    year: "2020",
    heading: "Kept in touch\nduring the pandemic",
    body: "When the world slowed down, we didn't. Late-night calls and care packages kept us close across the distance.",
  },
  {
    year: "2024",
    heading: "Reconnected\nin the Poconos",
    body: "A weekend in the mountains turned into something neither of us expected — the start of everything.",
  },
  {
    year: "2025",
    heading: "Got engaged in\nHudson, NY",
    body: "Overlooking the river, on a perfect autumn afternoon, Matt asked the question. Sarah said yes.",
  },
  {
    year: "2025",
    heading: "Sarah moved to\nMassachusetts",
    body: "New city, new chapter. Boxes and furniture and a lot of excited energy for what comes next.",
  },
  // TODO: fill in card 5
  {
    year: "2025",
    heading: "More to come",
    body: "The story keeps writing itself. Stay tuned for what happens next.",
  },
  // TODO: fill in card 6
  {
    year: "2026",
    heading: "August 28th,\nLancaster PA",
    body: "Friends, family, and everyone we love gathered in one place to celebrate with us. We can't wait.",
  },
];

export default function StorySection() {
  return (
    <section id="celebration" className="w-full overflow-hidden pb-sp-2xl">
      {/* Inner row: justify-center causes cards to overflow symmetrically off both edges */}
      <div
        className="flex items-start justify-center"
        style={{ gap: "var(--sp-xs)" }}
      >
        {storyCards.map((card, i) => (
          <article
            key={i}
            className="border border-clay-50 rounded-2xl flex flex-col shrink-0"
            style={{
              width: "min(504px, 80vw)",
              gap: "var(--sp-xs)",   // 24px gap between elements inside card
              padding: "var(--sp-sm)", // 48px→32px fluid padding
            }}
          >
            {/* Year overline */}
            <p
              className="font-dm font-bold text-yellow-s-300 uppercase tracking-[0.12em] font-dm-overline"
              style={{ fontSize: "var(--fs-sm)" }}
            >
              {card.year}
            </p>

            {/* Milestone heading */}
            <h3
              className="font-instrument font-medium text-cool-green-600 leading-tight whitespace-pre-line font-instrument"
              style={{ fontSize: "var(--fs-4xl)", letterSpacing: "-0.02em" }}
            >
              {card.heading}
            </h3>

            {/* Body */}
            <p
              className="font-instrument text-cool-green-600 leading-relaxed font-instrument"
              style={{ fontSize: "var(--fs-md)" }}
            >
              {card.body}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
