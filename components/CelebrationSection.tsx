'use client'
// Figma node: 342:6179
// "Our Celebration" section — event details, venue address, info rows + photos.

import { ChevronRight } from '@mattplays/mpds/icons'
import { EditableText } from './cms/EditableText'
import { CelebrationContent, InfoRowData } from '@/types/content'
import { useScrollSection } from '@/context/ThemeContext'
import defaultContent from '@/content/content.json'

// ─── Icons ───────────────────────────────────────────────────────────────────

function SunIcon() {
  return (
    <svg width="27" height="27" viewBox="0 0 27 27" fill="none" aria-hidden="true">
      <circle cx="13.5" cy="13.5" r="4.5" stroke="currentColor" strokeWidth="1.5" />
      <line x1="13.5" y1="4.5" x2="13.5" y2="7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="13.5" y1="20" x2="13.5" y2="22.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="4.5" y1="13.5" x2="7" y2="13.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="20" y1="13.5" x2="22.5" y2="13.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="7.14" y1="7.14" x2="8.9" y2="8.9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="18.1" y1="18.1" x2="19.86" y2="19.86" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="19.86" y1="7.14" x2="18.1" y2="8.9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="8.9" y1="18.1" x2="7.14" y2="19.86" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

function CarIcon() {
  return (
    <svg width="27" height="27" viewBox="0 0 27 27" fill="none" aria-hidden="true">
      <path d="M6.5 16h14M8 16l1.5-5h8l1.5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="4.5" y="16" width="18" height="5" rx="1" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="8.5" cy="21" r="1.5" fill="currentColor" />
      <circle cx="18.5" cy="21" r="1.5" fill="currentColor" />
    </svg>
  )
}

function MapPinIcon() {
  return (
    <svg width="27" height="27" viewBox="0 0 27 27" fill="none" aria-hidden="true">
      <path d="M13.5 5C10.74 5 8.5 7.24 8.5 10c0 4.25 5 10 5 10s5-5.75 5-10c0-2.76-2.24-5-5-5z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <circle cx="13.5" cy="10" r="2" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  )
}

function getIcon(name: string) {
  if (name === 'sun') return <SunIcon />
  if (name === 'car') return <CarIcon />
  return <MapPinIcon />
}

// ─── Info Row ────────────────────────────────────────────────────────────────

function InfoRow({ row, cmsPath }: { row: InfoRowData; cmsPath: string }) {
  return (
    <div className="flex flex-col gap-[10px] w-full">
      <div className="flex items-start gap-[10px] text-[var(--theme-headline)]">
        <span className="shrink-0">{getIcon(row.icon)}</span>
        <EditableText
          tag="span"
          path={`${cmsPath}.label`}
          className="font-instrument font-medium text-[var(--theme-headline)] leading-[1.125]"
          style={{ fontSize: 'var(--mpds-font-size-2xl)', letterSpacing: '-0.02em' }}
        >
          {row.label}
        </EditableText>
      </div>
      <EditableText
        tag="p"
        path={`${cmsPath}.body`}
        multiline
        className="font-instrument text-[var(--theme-text)] leading-[1.625]"
        style={{ fontSize: 'var(--mpds-font-size-lg)' }}
      >
        {row.body}
      </EditableText>
    </div>
  )
}

// ─── Section ─────────────────────────────────────────────────────────────────

interface CelebrationSectionProps {
  content?: CelebrationContent
}

export default function CelebrationSection({
  content = defaultContent.celebration as CelebrationContent,
}: CelebrationSectionProps) {
  const sectionRef = useScrollSection<HTMLElement>('maroon')

  return (
    <section
      ref={sectionRef}
      id="celebration"
      className="w-full flex justify-center bg-[var(--theme-bg)]"
      style={{ paddingTop: 'var(--sp-2xl)', paddingBottom: 'var(--sp-2xl)', transition: 'background-color 0.5s ease' }}
    >
      <div className="site-container flex flex-col" style={{ gap: 'var(--mpds-space-xl)' }}>

        {/* ── Header: title + description ── */}
        <div className="flex items-end justify-between" style={{ gap: 'var(--mpds-space-lg)' }}>
          <EditableText
            tag="h2"
            path="celebration.heading"
            className="font-romie-trial font-light text-[var(--theme-headline)] leading-none shrink-0"
            style={{ fontSize: 'var(--mpds-font-size-11xl)', transition: 'color 0.5s ease' }}
          >
            {content.heading}
          </EditableText>
          <EditableText
            tag="p"
            path="celebration.description"
            multiline
            className="font-instrument text-[var(--theme-text)] leading-[1.625] shrink-0"
            style={{ fontSize: 'var(--mpds-font-size-lg)', width: 'min(512px, 40%)', transition: 'color 0.5s ease' }}
          >
            {content.description}
          </EditableText>
        </div>

        {/* ── Content: details left, photos right ── */}
        <div className="relative flex items-start justify-between" style={{ gap: 'var(--mpds-space-lg)' }}>

          {/* Left column — event details + info + CTA */}
          <div
            className="flex flex-col justify-between self-stretch shrink-0"
            style={{ width: 'min(615px, 45%)', paddingBottom: 'var(--mpds-space-80)' }}
          >
            {/* Event details block */}
            <div className="flex flex-col" style={{ gap: 'var(--mpds-space-md)' }}>
              <h3
                className="font-instrument font-medium text-[var(--theme-headline)] leading-[1.125]"
                style={{ fontSize: 'var(--mpds-font-size-4xl)', letterSpacing: '-0.02em', transition: 'color 0.5s ease' }}
              >
                Friday, August 28, 2026
              </h3>

              {/* Time boxes — left-bordered */}
              <div className="flex" style={{ gap: 'var(--mpds-space-48)' }}>
                {content.events.map((event, i) => (
                  <div
                    key={i}
                    className="flex-1 flex flex-col border-l border-[var(--theme-tonal)]"
                    style={{ gap: '10px', padding: '16px' }}
                  >
                    <EditableText
                      tag="span"
                      path={`celebration.events.${i}.time`}
                      className="font-romie-trial font-light text-[var(--theme-headline)] leading-none whitespace-nowrap"
                      style={{ fontSize: 'var(--mpds-font-size-8xl)', transition: 'color 0.5s ease' }}
                    >
                      {event.time}
                    </EditableText>
                    <EditableText
                      tag="span"
                      path={`celebration.events.${i}.label`}
                      className="font-instrument text-[var(--theme-text)] leading-[1.625]"
                      style={{ fontSize: 'var(--mpds-font-size-xl)', transition: 'color 0.5s ease' }}
                    >
                      {event.label}
                    </EditableText>
                  </div>
                ))}
              </div>

              {/* Address box */}
              <div
                className="flex items-center w-full border border-[var(--theme-headline)]"
                style={{ gap: '18px', padding: 'var(--mpds-space-16) var(--mpds-space-28)', transition: 'border-color 0.5s ease' }}
              >
                <span className="font-dm font-bold text-[var(--theme-headline)] text-fs-sm tracking-[0.12em] uppercase whitespace-nowrap font-dm-overline shrink-0">
                  Excelsior
                </span>
                <span className="font-instrument text-[var(--theme-tonal)]">/</span>
                <span className="font-dm font-bold text-[var(--theme-headline)] text-fs-sm tracking-[0.12em] uppercase whitespace-nowrap font-dm-overline shrink-0">
                  125 E King Street
                </span>
                <span className="font-instrument text-[var(--theme-tonal)]">/</span>
                <span className="font-dm font-bold text-[var(--theme-headline)] text-fs-sm tracking-[0.12em] uppercase whitespace-nowrap font-dm-overline shrink-0">
                  Lancaster, PA
                </span>
              </div>
            </div>

            {/* Info rows + CTA */}
            <div className="flex flex-col" style={{ gap: 'var(--mpds-space-48)' }}>
              {/* Info rows */}
              <div className="flex flex-col" style={{ gap: 'var(--mpds-space-32)' }}>
                {content.infoRows.map((row, i) => (
                  <InfoRow key={i} row={row} cmsPath={`celebration.infoRows.${i}`} />
                ))}
              </div>

              {/* CTA row */}
              <div className="flex items-center" style={{ gap: 'var(--mpds-space-sm)' }}>
                <a
                  href={content.rsvpUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[var(--theme-action)] text-[var(--theme-btn-text)] font-instrument font-semibold rounded px-8 py-4 leading-[1.25] transition-opacity hover:opacity-90"
                  style={{ fontSize: 'var(--mpds-font-size-lg)', transition: 'background-color 0.5s ease, color 0.5s ease' }}
                >
                  RSVP today
                </a>
                <a
                  href={content.venueUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center font-instrument font-semibold text-[var(--theme-action)] leading-[1.25] transition-opacity hover:opacity-70"
                  style={{ fontSize: 'var(--mpds-font-size-lg)', transition: 'color 0.5s ease' }}
                >
                  Visit the Excelsior website
                  <ChevronRight className="shrink-0" />
                </a>
              </div>
            </div>
          </div>

          {/* Right column — photos */}
          <div className="relative shrink-0" style={{ width: 'min(784px, 50%)', height: 1045 }}>
            <div className="rounded-2xl overflow-hidden w-full h-full bg-[var(--theme-tonal)]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={content.mainImage}
                alt="Excelsior, Lancaster PA"
                className="w-full h-full object-cover"
                loading="eager"
              />
            </div>
            {/* Overlapping smaller photo */}
            <div
              className="absolute rounded-xl overflow-hidden"
              style={{ width: 400, height: 400, bottom: -80, right: -48 }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={content.overlayImage}
                alt="Sarah and Matt"
                className="w-full h-full object-cover"
                loading="eager"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
