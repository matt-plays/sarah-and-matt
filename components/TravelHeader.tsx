// Figma node: 265:6027

import { EditableText } from './cms/EditableText';
import { TravelContent } from '@/types/content';
import defaultContent from '@/content/content.json';

interface TravelHeaderProps {
  content?: TravelContent;
}

export default function TravelHeader({ content = defaultContent.travel }: TravelHeaderProps) {
  return (
    <section id="travel" className="w-full flex justify-center pb-sp-2xl">
      <div className="container-width flex items-end justify-between gap-sp-lg">

        {/* "Travel & Stay" display heading */}
        <EditableText
          tag="h2"
          path="travel.heading"
          className="font-romie-trial font-light text-cool-green-600 leading-none shrink-0"
          style={{ fontSize: 'var(--fs-11xl)' }}
        >
          {content.heading}
        </EditableText>

        {/* Intro body copy */}
        <EditableText
          tag="p"
          path="travel.body"
          multiline
          className="font-instrument text-fs-xl text-cool-green-600 leading-relaxed"
          style={{ width: 'min(504px, 100%)' }}
        >
          {content.body}
        </EditableText>
      </div>
    </section>
  );
}
