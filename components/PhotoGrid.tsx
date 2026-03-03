// Figma node: 265:5320
// 5-photo horizontal strip with engagement photo.
// Overflows symmetrically via justify-center — section clips the overflow.

const PHOTO = '/images/engagement-umbrella.jpg';

const slots: { h: number; pos: string }[] = [
  { h: 501, pos: '23% 27%' },
  { h: 668, pos: '23% 15%' },
  { h: 376, pos: '55% 35%' },
  { h: 668, pos: '30% 20%' },
  { h: 501, pos: '70% 27%' },
];

export default function PhotoGrid() {
  return (
    <section className="w-full overflow-hidden pb-sp-2xl">
      <div className="flex justify-center" style={{ gap: 'var(--sp-xs)' }}>
        {slots.map(({ h, pos }, i) => (
          <div
            key={i}
            className="shrink-0 rounded-2xl overflow-hidden bg-clay-50"
            style={{ width: 501, height: h }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={PHOTO}
              alt="Sarah and Matt"
              className="w-full h-full object-cover"
              style={{ objectPosition: pos }}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
