// Figma node: 265:6147 / 265:6148

import { EditableText } from './cms/EditableText';
import { RegistryContent } from '@/types/content';
import defaultContent from '@/content/content.json';

interface RegistrySectionProps {
  content?: RegistryContent;
}

export default function RegistrySection({
  content = defaultContent.registry as RegistryContent,
}: RegistrySectionProps) {
  return (
    <section id="registry" className="w-full bg-orange-s-700 flex flex-col items-center py-sp-2xl">
      <div className="container-width flex flex-col gap-sp-xl">

        {/* "Registry" display heading */}
        <EditableText
          tag="h2"
          path="registry.heading"
          className="font-romie-trial font-light text-red-m-50 leading-none w-full"
          style={{ fontSize: 'var(--fs-11xl)' }}
        >
          {content.heading}
        </EditableText>

        {/* Content row */}
        <div className="flex gap-sp-lg items-start justify-between">

          {/* Left — intro + registry items */}
          <div
            className="flex flex-col justify-between self-stretch gap-sp-xl"
            style={{ width: 'min(504px, 45%)' }}
          >
            {/* Intro */}
            <div className="flex flex-col gap-sp-sm">
              <EditableText
                tag="h3"
                path="registry.subheading"
                className="font-instrument font-medium text-red-m-25 leading-tight font-instrument"
                style={{ fontSize: 'var(--fs-7xl)', letterSpacing: '-0.02em' }}
              >
                {content.subheading}
              </EditableText>
              <EditableText
                tag="p"
                path="registry.body"
                multiline
                className="font-instrument text-red-m-25 leading-relaxed font-instrument"
                style={{ fontSize: 'var(--fs-xl)' }}
              >
                {content.body}
              </EditableText>
              <a
                href={content.viewAllUrl}
                className="inline-flex bg-red-s-25 text-cool-green-600 font-instrument font-semibold rounded-lg px-8 py-4 text-fs-2xl leading-snug transition-opacity hover:opacity-90 w-fit font-instrument"
              >
                View All Registries
              </a>
            </div>

            {/* Registry links */}
            <div className="flex flex-col gap-sp-sm">
              {content.items.map((item, i) => (
                <div key={i} className="flex flex-col gap-2">
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-instrument font-medium text-red-m-25 leading-tight underline decoration-1 underline-offset-4 hover:text-red-m-50 transition-colors font-instrument"
                    style={{ fontSize: 'var(--fs-4xl)', letterSpacing: '-0.02em' }}
                  >
                    <EditableText path={`registry.items.${i}.name`}>
                      {item.name}
                    </EditableText>
                  </a>
                  <EditableText
                    tag="p"
                    path={`registry.items.${i}.description`}
                    multiline
                    className="font-instrument text-red-m-50 leading-relaxed font-instrument"
                    style={{ fontSize: 'var(--fs-lg)' }}
                  >
                    {item.description}
                  </EditableText>
                </div>
              ))}
            </div>
          </div>

          {/* Right — photo */}
          <div
            className="rounded-2xl overflow-hidden shrink-0"
            style={{ width: 'min(616px, 50%)', height: 'min(923px, 60vh)' }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={content.photo}
              alt="Sarah and Matt"
              className="w-full h-full object-cover object-center"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
