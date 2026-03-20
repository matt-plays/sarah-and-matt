// Figma node: 265:6145
// Dark-green RSVP section: heading + CTA, then a 4-column photo strip below.

import { EditableText } from './cms/EditableText';
import { RSVPContent } from '@/types/content';
import defaultContent from '@/content/content.json';

const ENGAGEMENT = '/images/engagement-umbrella.jpg';
const PHOTOBOOTH = '/images/photobooth-bw.jpg';

// [src, height, objectPos]
const imageStrip: [string, number, string][] = [
  [ENGAGEMENT, 501, '30% 25%'],
  [PHOTOBOOTH, 668, '50% 30%'],
  [ENGAGEMENT, 376, '55% 35%'],
  [ENGAGEMENT, 668, '70% 20%'],
];

interface RSVPSectionProps {
  content?: RSVPContent;
}

export default function RSVPSection({ content = defaultContent.rsvp }: RSVPSectionProps) {
  return (
    <section id="rsvp" className="w-full bg-warm-green-700 flex flex-col items-center py-sp-2xl gap-sp-xl">

      {/* ── Heading + CTA row ── */}
      <div className="container-width flex gap-sp-lg items-end">
        <EditableText
          tag="h2"
          path="rsvp.heading"
          multiline
          className="font-romie-trial font-light text-blue-s-0 leading-none flex-1 min-w-0"
          style={{ fontSize: 'var(--fs-11xl)' }}
        >
          {content.heading}
        </EditableText>
        <div
          className="flex flex-col gap-sp-sm items-start shrink-0"
          style={{ width: 'min(504px, 40%)' }}
        >
          <EditableText
            tag="p"
            path="rsvp.body"
            multiline
            className="font-instrument text-blue-s-0 leading-relaxed"
            style={{ fontSize: 'var(--fs-xl)' }}
          >
            {content.body}
          </EditableText>
          <a
            href={content.url}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-red-s-25 text-cool-green-600 font-instrument font-semibold rounded-lg px-8 py-4 text-fs-2xl leading-snug transition-opacity hover:opacity-90"
          >
            RSVP
          </a>
        </div>
      </div>

      {/* ── Photo strip ── */}
      <div className="container-width flex items-end gap-sp-xs">
        {imageStrip.map(([src, h, pos], i) => (
          <div
            key={i}
            className="flex-1 min-w-0 rounded-2xl overflow-hidden bg-warm-green-700"
            style={{ height: h }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={src}
              alt="Sarah and Matt"
              className="w-full h-full object-cover"
              style={{ objectPosition: pos, mixBlendMode: 'screen', opacity: 0.72 }}
            />
          </div>
        ))}
      </div>

    </section>
  );
}
