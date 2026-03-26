// Figma node: 266:6440
// Horizontal-scrolling "Our Story" timeline.

import { StoryCard } from '@/types/content';

interface StorySectionProps {
  cards?: StoryCard[];
}

export default function StorySection({ cards = [] }: StorySectionProps) {
  return (
    <section id="celebration" className="w-full overflow-hidden pb-sp-2xl">
      <div className="flex items-start justify-center" style={{ gap: 'var(--sp-xs)' }}>
        {cards.map((card, i) => (
          <article
            key={card.id ?? i}
            className="border border-clay-50 rounded-2xl flex flex-col shrink-0"
            style={{
              width: 'min(504px, 80vw)',
              gap: 'var(--sp-xs)',
              padding: 'var(--sp-sm)',
            }}
          >
            <p
              className="font-dm font-bold text-yellow-s-300 uppercase tracking-[0.12em] font-dm-overline"
              style={{ fontSize: 'var(--fs-sm)' }}
            >
              {card.year}
            </p>
            <h3
              className="font-instrument font-medium text-cool-green-600 leading-tight whitespace-pre-line font-instrument"
              style={{ fontSize: 'var(--fs-4xl)', letterSpacing: '-0.02em' }}
            >
              {card.heading}
            </h3>
            <p
              className="font-instrument text-cool-green-600 leading-relaxed font-instrument"
              style={{ fontSize: 'var(--fs-md)' }}
            >
              {card.body}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
