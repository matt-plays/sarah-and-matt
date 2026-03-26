// Figma node: 265:6027

import { TravelContent } from '@/types/content';

interface TravelHeaderProps {
  content: TravelContent;
}

export default function TravelHeader({ content }: TravelHeaderProps) {
  return (
    <section id="travel" data-theme="default" className="w-full flex justify-center pb-sp-2xl">
      <div className="container-width flex items-end justify-between gap-sp-lg">
        <h2
          className="font-romie-trial font-light text-cool-green-600 leading-none shrink-0"
          style={{ fontSize: 'var(--fs-11xl)' }}
        >
          {content.heading}
        </h2>
        <p
          className="font-instrument text-fs-xl text-cool-green-600 leading-relaxed"
          style={{ width: 'min(504px, 100%)' }}
        >
          {content.body}
        </p>
      </div>
    </section>
  );
}
