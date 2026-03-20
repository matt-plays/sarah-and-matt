// Figma node: 265:6055
// Reusable card used in Where to Stay, Where to Eat, and Activities sections.

import { EditableText } from './cms/EditableText';

interface InfoCardProps {
  overline: string;
  heading: string;
  body: string;
  /** When provided (manage mode), wraps text with EditableText at this path prefix. */
  cmsPath?: string;
}

export default function InfoCard({ overline, heading, body, cmsPath }: InfoCardProps) {
  return (
    <article className="border border-clay-50 rounded-2xl p-sp-md flex flex-col gap-sp-lg">
      {/* Overline */}
      <EditableText
        tag="p"
        path={`${cmsPath}.overline`}
        className="font-dm font-bold text-fs-sm text-yellow-s-300 uppercase tracking-[0.12em] font-dm-overline"
      >
        {overline}
      </EditableText>

      {/* Heading + Body */}
      <div className="flex flex-col gap-6">
        <EditableText
          tag="h3"
          path={`${cmsPath}.heading`}
          multiline
          className="font-instrument font-medium text-cool-green-600 leading-tight whitespace-pre-line font-instrument"
          style={{ fontSize: 'var(--fs-4xl)', letterSpacing: '-0.02em' }}
        >
          {heading}
        </EditableText>

        <EditableText
          tag="p"
          path={`${cmsPath}.body`}
          multiline
          className="font-instrument text-cool-green-600 leading-relaxed font-instrument"
          style={{ fontSize: 'var(--fs-md)' }}
        >
          {body}
        </EditableText>
      </div>
    </article>
  );
}
