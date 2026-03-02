// Figma nodes: 265:6108 (stay), 265:6083 (eat), 265:6235 (activities)
// Layout: heading left (~5 cols), 2-column card grid right (~7 cols)

import InfoCard from "./InfoCard";

interface CardData {
  overline: string;
  heading: string;
  body: string;
}

interface TravelSubSectionProps {
  heading: string;
  cards: CardData[];
}

export default function TravelSubSection({ heading, cards }: TravelSubSectionProps) {
  return (
    <section className="w-full flex justify-center pb-sp-2xl">
      <div className="container-width flex gap-sp-sm items-start">

        {/* Section heading — left column */}
        <h2
          className="font-instrument font-medium text-cool-green-600 leading-tight shrink-0 font-instrument"
          style={{
            fontSize: "var(--fs-7xl)",
            letterSpacing: "-0.02em",
            width: "min(480px, 38%)",
          }}
        >
          {heading}
        </h2>

        {/* Cards grid — right column */}
        <div className="flex-1 min-w-0 grid grid-cols-2 gap-sp-xs">
          {cards.map((card, i) => (
            <InfoCard key={i} {...card} />
          ))}
        </div>
      </div>
    </section>
  );
}
