'use client'

import { useEffect, useRef } from 'react'
/* eslint-disable @next/next/no-img-element */

// ─── Gallery images — varying aspect ratios for visual rhythm ────────────────

const IMAGES = [
  { src: '/images/timeline/wedding-site--timeline-gallery-01.png', alt: 'Sarah and Matt', aspect: '3/4' },
  { src: '/images/timeline/wedding-site--timeline-gallery-02.png', alt: 'Sarah and Matt', aspect: '1/1' },
  { src: '/images/timeline/wedding-site--timeline-gallery-03.png', alt: 'Sarah and Matt', aspect: '2/3' },
  { src: '/images/timeline/wedding-site--timeline-gallery-04.png', alt: 'Sarah and Matt', aspect: '1/1' },
  { src: '/images/timeline/wedding-site--timeline-gallery-05.png', alt: 'Sarah and Matt', aspect: '3/4' },
  { src: '/images/timeline/wedding-site--timeline-gallery-06.png', alt: 'Sarah and Matt', aspect: '2/3' },
]

const GAP = 16
// Responsive: 70vw on mobile, 500px cap on desktop
const MAX_W_CSS = 'min(500px, 70vw)'

// ─── Component ───────────────────────────────────────────────────────────────

export default function TimelineGallery() {
  const sectionRef = useRef<HTMLElement>(null)
  const stripRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    const strip = stripRef.current
    if (!section || !strip) return

    const handleScroll = () => {
      const rect = section.getBoundingClientRect()
      const vh = window.innerHeight
      const raw = 1 - rect.bottom / (vh + rect.height)
      const progress = Math.max(0, Math.min(1, raw))
      const overflow = Math.max(0, strip.scrollWidth - window.innerWidth)
      strip.style.transform = `translateX(${-overflow * progress}px)`
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <section
      ref={sectionRef}
      data-theme="default"
      className="w-full overflow-hidden"
      style={{ paddingBottom: 'var(--sp-2xl)' }}
    >
      <div
        ref={stripRef}
        className="flex items-start"
        style={{ gap: GAP, willChange: 'transform' }}
      >
        {IMAGES.map((img, i) => (
          <div
            key={i}
            className="shrink-0 rounded-2xl overflow-hidden"
            style={{ width: MAX_W_CSS, aspectRatio: img.aspect }}
          >
            <img
              src={img.src}
              alt={img.alt}
              className="w-full h-full object-cover"
              loading="eager"
            />
          </div>
        ))}
      </div>
    </section>
  )
}
