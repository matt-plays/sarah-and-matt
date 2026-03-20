// Figma node: 267:6567
// "Our Celebration" dark-burgundy section — event details, venue + wedding photos.

import { EditableText } from './cms/EditableText';
import { CelebrationContent, InfoRowData } from '@/types/content';
import defaultContent from '@/content/content.json';

function SunIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
      <circle cx="11" cy="11" r="4.5" stroke="currentColor" strokeWidth="1.5" />
      <line x1="11" y1="1" x2="11" y2="3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="11" y1="18.5" x2="11" y2="21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="1" y1="11" x2="3.5" y2="11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="18.5" y1="11" x2="21" y2="11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="3.64" y1="3.64" x2="5.4" y2="5.4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="16.6" y1="16.6" x2="18.36" y2="18.36" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="18.36" y1="3.64" x2="16.6" y2="5.4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="5.4" y1="16.6" x2="3.64" y2="18.36" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function CarIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
      <path d="M4 13h14M5.5 13l1.5-5h8l1.5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="2" y="13" width="18" height="5" rx="1" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="6" cy="18" r="1.5" fill="currentColor" />
      <circle cx="16" cy="18" r="1.5" fill="currentColor" />
    </svg>
  );
}

function MapPinIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
      <path d="M11 2C8.24 2 6 4.24 6 7c0 4.25 5 10 5 10s5-5.75 5-10c0-2.76-2.24-5-5-5z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <circle cx="11" cy="7" r="2" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

function getIcon(name: string) {
  if (name === 'sun') return <SunIcon />;
  if (name === 'car') return <CarIcon />;
  return <MapPinIcon />;
}

interface InfoRowProps {
  row: InfoRowData;
  cmsPath: string;
}

function InfoRow({ row, cmsPath }: InfoRowProps) {
  return (
    <div className="flex flex-col gap-2.5 w-full">
      <div className="flex items-center gap-2.5 text-red-m-25">
        <span className="shrink-0">{getIcon(row.icon)}</span>
        <EditableText
          tag="span"
          path={`${cmsPath}.label`}
          className="font-instrument font-medium text-red-m-25 leading-tight font-instrument"
          style={{ fontSize: 'var(--fs-2xl)', letterSpacing: '-0.02em' }}
        >
          {row.label}
        </EditableText>
      </div>
      <EditableText
        tag="p"
        path={`${cmsPath}.body`}
        multiline
        className="font-instrument text-red-m-25 leading-relaxed font-instrument"
        style={{ fontSize: 'var(--fs-lg)', opacity: 0.8 }}
      >
        {row.body}
      </EditableText>
    </div>
  );
}

interface CelebrationSectionProps {
  content?: CelebrationContent;
}

export default function CelebrationSection({
  content = defaultContent.celebration as CelebrationContent,
}: CelebrationSectionProps) {
  return (
    <section className="w-full flex justify-center py-sp-2xl" style={{ backgroundColor: '#320019' }}>
      <div className="container-width flex flex-col gap-sp-xl">

        {/* ── Header row: title + description ── */}
        <div className="flex items-end justify-between gap-sp-lg">
          <EditableText
            tag="h2"
            path="celebration.heading"
            className="font-romie-trial font-light text-red-m-50 leading-none shrink-0"
            style={{ fontSize: 'var(--fs-11xl)' }}
          >
            {content.heading}
          </EditableText>
          <EditableText
            tag="p"
            path="celebration.description"
            multiline
            className="font-instrument text-red-m-25 leading-relaxed font-instrument shrink-0"
            style={{ fontSize: 'var(--fs-xl)', width: 'min(504px, 40%)', opacity: 0.8 }}
          >
            {content.description}
          </EditableText>
        </div>

        {/* ── Content row: details left, images right ── */}
        <div className="flex items-start justify-between gap-sp-lg">

          {/* Left: event details */}
          <div
            className="flex flex-col justify-between self-stretch shrink-0"
            style={{ width: 'min(615px, 48%)' }}
          >
            {/* Event details block */}
            <div className="flex flex-col gap-sp-sm">
              <h3
                className="font-instrument font-medium text-red-m-25 leading-tight font-instrument"
                style={{ fontSize: 'var(--fs-7xl)', letterSpacing: '-0.02em' }}
              >
                Event details
              </h3>

              {/* Time boxes */}
              <div className="flex gap-2.5">
                {content.events.map((event, i) => (
                  <div
                    key={i}
                    className="flex-1 flex flex-col gap-2.5 rounded-2xl p-4"
                    style={{ border: '1px solid rgba(255,255,255,0.24)' }}
                  >
                    <EditableText
                      tag="span"
                      path={`celebration.events.${i}.time`}
                      className="font-romie-trial font-light text-red-m-50 leading-none whitespace-nowrap"
                      style={{ fontSize: 'var(--fs-8xl)' }}
                    >
                      {event.time}
                    </EditableText>
                    <EditableText
                      tag="span"
                      path={`celebration.events.${i}.label`}
                      className="font-instrument text-red-m-25 leading-relaxed font-instrument"
                      style={{ fontSize: 'var(--fs-xl)', opacity: 0.8 }}
                    >
                      {event.label}
                    </EditableText>
                  </div>
                ))}
              </div>

              <EditableText
                tag="p"
                path="celebration.eventDetails"
                multiline
                className="font-instrument text-red-m-25 leading-relaxed font-instrument"
                style={{ fontSize: 'var(--fs-xl)', opacity: 0.8, maxWidth: 504 }}
              >
                {content.eventDetails}
              </EditableText>
            </div>

            {/* Info rows */}
            <div className="flex flex-col gap-sp-sm">
              {content.infoRows.map((row, i) => (
                <InfoRow key={i} row={row} cmsPath={`celebration.infoRows.${i}`} />
              ))}
            </div>

            {/* CTA row */}
            <div className="flex items-center gap-sp-lg">
              <a
                href={content.rsvpUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-red-s-25 text-cool-green-600 font-instrument font-semibold rounded-lg px-8 py-4 text-fs-2xl leading-snug transition-opacity hover:opacity-90 font-instrument"
              >
                RSVP
              </a>
              <a
                href={content.venueUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-instrument font-semibold text-red-s-25 leading-snug transition-opacity hover:opacity-70 font-instrument"
                style={{ fontSize: 'var(--fs-2xl)' }}
              >
                Visit Excelsior website »
              </a>
            </div>
          </div>

          {/* Right: images */}
          <div className="relative shrink-0" style={{ width: 'min(616px, 48%)', height: 923 }}>
            <div className="rounded-2xl overflow-hidden w-full h-full">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={content.mainImage}
                alt="Excelsior, Lancaster PA"
                className="w-full h-full object-cover object-center"
              />
            </div>
            <div
              className="absolute rounded-2xl overflow-hidden"
              style={{ width: 320, height: 320, bottom: -48, right: -48 }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={content.overlayImage}
                alt="Sarah and Matt"
                className="w-full h-full object-cover object-center"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
