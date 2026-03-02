// Figma node: 265:6055
// Reusable card used in Where to Stay, Where to Eat, and Activities sections.
// Padding: p-sp-md (48px fluid). Gap overline→content: gap-sp-lg (80px fluid).
// Gap heading→body: gap-6 (24px fixed).

interface InfoCardProps {
  overline: string;   // e.g. "Downtown Lancaster" — DM Sans Bold, yellow-s-300
  heading: string;    // e.g. "Lancaster Marriott\nat Penn Square"
  body: string;       // Body copy
}

export default function InfoCard({ overline, heading, body }: InfoCardProps) {
  return (
    <article className="border border-clay-50 rounded-2xl p-sp-md flex flex-col gap-sp-lg">
      {/* Overline */}
      <p
        className="font-dm font-bold text-fs-sm text-yellow-s-300 uppercase tracking-[0.12em] font-dm-overline"
      >
        {overline}
      </p>

      {/* Heading + Body grouped — gap-6 between them */}
      <div className="flex flex-col gap-6">
        <h3
          className="font-instrument font-medium text-cool-green-600 leading-tight font-instrument"
          style={{ fontSize: "var(--fs-4xl)", letterSpacing: "-0.02em" }}
        >
          {heading}
        </h3>

        <p
          className="font-instrument text-cool-green-600 leading-relaxed font-instrument"
          style={{ fontSize: "var(--fs-md)" }}
        >
          {body}
        </p>
      </div>
    </article>
  );
}
