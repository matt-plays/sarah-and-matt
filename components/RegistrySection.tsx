'use client'
// Figma node: 342:6271
// Registry section — taupe theme, left content + right photo, bottom texture strip.

import { useScrollSection, useTheme } from '@/context/ThemeContext'
import { Sunrise2, Pot2, Home } from '@mattplays/mpds/icons'
import Button from './Button'
import { RegistryContent } from '@/types/content'

const REGISTRY_ICONS = [Sunrise2, Pot2, Home]

// ─── Section ─────────────────────────────────────────────────────────────────

export default function RegistrySection({ registry }: { registry: RegistryContent }) {
  const sectionRef = useScrollSection<HTMLElement>('taupe')
  const { activeTheme } = useTheme()
  const content = registry

  // Green until taupe takes over. Once taupe, stay taupe (even when body reverts to default at footer).
  const localTheme = activeTheme === 'taupe' ? 'taupe' : 'green'

  return (
    <section
      ref={sectionRef}
      id="registry"
      data-theme={localTheme}
      className="relative w-full flex flex-col items-center bg-[var(--theme-bg)]"
      style={{
        paddingTop: 'var(--sp-2xl)',
        paddingBottom: 'var(--sp-2xl)',
        transition: 'background-color 0.5s ease',
      }}
    >
      <div className="site-container grid grid-cols-1 xl:grid-cols-12" style={{ gap: 'var(--mpds-space-lg)' }}>

        {/* ── Left column ── */}
        <div
          className="xl:col-span-6 flex flex-col items-start justify-between self-stretch max-w-[640px]"
          style={{ paddingTop: 'var(--mpds-space-80)', paddingBottom: 'var(--mpds-space-80)', gap: 'var(--mpds-space-lg)' }}
        >
          {/* Top group: heading + body + CTA */}
          <div className="flex flex-col items-start" style={{ gap: 'var(--mpds-space-80)' }}>
            <h2
              className="font-romie font-light text-[var(--theme-headline)] leading-none w-full"
              style={{ fontSize: 'var(--mpds-font-size-10xl)' }}
            >
              {content.heading}
            </h2>
            <div className="flex flex-col items-start" style={{ gap: 'var(--mpds-space-28)' }}>
              <p
                className="font-instrument text-[var(--theme-headline)] leading-[1.625] opacity-80"
                style={{ fontSize: 'var(--mpds-font-size-lg)', maxWidth: 504 }}
              >
                {content.body}
              </p>
              <Button
                onClick={() => window.open(content.viewAllUrl, '_blank', 'noopener,noreferrer')}
              >
                Visit our registry
              </Button>
            </div>
          </div>

          {/* Bottom group: registry items with icons */}
          <div className="flex flex-col w-full" style={{ gap: 'var(--mpds-space-32)' }}>
            {content.items.map((item, i) => {
              const Icon = REGISTRY_ICONS[i] || Home
              return (
                <div key={i} className="flex flex-col" style={{ gap: 'var(--mpds-space-12)' }}>
                  <div className="flex items-start" style={{ gap: 'var(--mpds-space-8)' }}>
                    <span className="text-[var(--theme-headline)] shrink-0" style={{ width: 24, height: 24 }}>
                      <Icon />
                    </span>
                    <p
                      className="font-instrument font-medium text-[var(--theme-headline)] leading-[1.125]"
                      style={{ fontSize: 'var(--mpds-font-size-xl)', letterSpacing: '-0.1em' }}
                    >
                      {item.name}
                    </p>
                  </div>
                  <p
                    className="font-instrument text-[var(--theme-text)] leading-[1.625]"
                    style={{ fontSize: 'var(--mpds-font-size-lg)', maxWidth: 504, textWrap: 'balance' }}
                  >
                    {item.description}
                  </p>
                </div>
              )
            })}
          </div>
        </div>

        {/* ── Right column — photo ── */}
        <div
          className="xl:col-start-7 xl:col-end-13 rounded-2xl overflow-hidden w-full"
          style={{ aspectRatio: '3 / 4' }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/wedding-site--registry-01.jpg"
            alt="Sarah and Matt"
            className="w-full h-full object-cover object-center"
            loading="lazy"
          />
        </div>
      </div>

      {/* ── Bottom texture strip ── */}
      <div className="absolute inset-x-0 bottom-0 h-[128px] overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/wedding-site--registry-background.png"
          alt=""
          className="w-full h-full object-cover"
        />
      </div>
    </section>
  )
}
