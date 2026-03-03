// Figma nodes: 265:6108 (stay), 265:6083 (eat), 265:6235 (activities)
// Layout: heading left (~5 cols), 2-column card grid right (~7 cols)
// Optional decorativeImage floats on the left behind the heading (eat + activities sections).

import InfoCard from "./InfoCard";

interface CardData {
  overline: string;
  heading: string;
  body: string;
}

interface TravelSubSectionProps {
  heading: string;
  cards: CardData[];
  /** Optional decorative image shown behind the left heading column. */
  decorativeImage?: string;
  decorativeImageAlt?: string;
  /** Controls how the decorative image is positioned/blended. */
  decorativeStyle?: 'sketch' | 'photo';
}

export default function TravelSubSection({
  heading,
  cards,
  decorativeImage,
  decorativeImageAlt = '',
  decorativeStyle = 'photo',
}: TravelSubSectionProps) {
  return (
    <section className="w-full flex justify-center pb-sp-2xl">
      <div className="container-width flex gap-sp-sm items-start relative">

        {/* Decorative image — absolute, behind heading column */}
        {decorativeImage && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={decorativeImage}
            alt={decorativeImageAlt}
            aria-hidden="true"
            className="absolute pointer-events-none object-cover object-center rounded-2xl"
            style={{
              width: 420,
              height: 630,
              left: -64,
              bottom: -80,
              opacity: decorativeStyle === 'sketch' ? 0.8 : 0.72,
              ...(decorativeStyle === 'photo' && {
                WebkitMaskImage:
                  'radial-gradient(ellipse 70% 80% at 40% 60%, black 40%, transparent 80%)',
                maskImage:
                  'radial-gradient(ellipse 70% 80% at 40% 60%, black 40%, transparent 80%)',
              }),
            }}
          />
        )}

        {/* Section heading — left column */}
        <h2
          className="font-instrument font-medium text-cool-green-600 leading-tight shrink-0 font-instrument relative z-10"
          style={{
            fontSize: 'var(--fs-7xl)',
            letterSpacing: '-0.02em',
            width: 'min(480px, 38%)',
          }}
        >
          {heading}
        </h2>

        {/* Cards grid — right column */}
        <div className="flex-1 min-w-0 grid grid-cols-2 gap-sp-xs relative z-10">
          {cards.map((card, i) => (
            <InfoCard key={i} {...card} />
          ))}
        </div>
      </div>
    </section>
  );
}
