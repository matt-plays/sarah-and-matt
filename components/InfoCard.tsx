// Figma node: 265:6055
// Reusable card used in Where to Stay, Where to Eat, and Activities sections.

interface InfoCardProps {
  overline: string;
  heading: string;
  body: string;
  cmsPath?: string;
}

export default function InfoCard({ overline, heading, body }: InfoCardProps) {
  return (
    <article className="border border-clay-50 rounded-2xl p-sp-md flex flex-col gap-sp-lg">
      <p className="font-dm font-bold text-fs-sm text-yellow-s-300 uppercase tracking-[0.12em] font-dm-overline">
        {overline}
      </p>
      <div className="flex flex-col gap-6">
        <h3
          className="font-instrument font-medium text-cool-green-600 leading-tight whitespace-pre-line font-instrument"
          style={{ fontSize: 'var(--fs-4xl)', letterSpacing: '-0.02em' }}
        >
          {heading}
        </h3>
        <p
          className="font-instrument text-cool-green-600 leading-relaxed font-instrument"
          style={{ fontSize: 'var(--fs-md)' }}
        >
          {body}
        </p>
      </div>
    </article>
  );
}
