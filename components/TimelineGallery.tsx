'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'

const IMAGES = [
  { src: '/images/timeline/wedding-site--timeline-gallery-01.jpg', alt: 'Sarah and Matt', aspect: '3/4' },
  { src: '/images/timeline/wedding-site--timeline-gallery-02.jpg', alt: 'Sarah and Matt', aspect: '1/1' },
  { src: '/images/timeline/wedding-site--timeline-gallery-03.jpg', alt: 'Sarah and Matt', aspect: '2/3' },
  { src: '/images/timeline/wedding-site--timeline-gallery-04.jpg', alt: 'Sarah and Matt', aspect: '1/1' },
  { src: '/images/timeline/wedding-site--timeline-gallery-05.jpg', alt: 'Sarah and Matt', aspect: '3/4' },
  { src: '/images/timeline/wedding-site--timeline-gallery-06.jpg', alt: 'Sarah and Matt', aspect: '2/3' },
]

const GAP = 16
const MAX_W_CSS = 'min(500px, 70vw)'

export default function TimelineGallery() {
  const stripRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const strip = stripRef.current
    if (!strip) return

    const update = () => {
      const overflow = Math.max(0, strip.scrollWidth - window.innerWidth)
      strip.style.setProperty('--strip-overflow', `${overflow}px`)
    }

    update()
    const ro = new ResizeObserver(update)
    ro.observe(strip)
    return () => ro.disconnect()
  }, [])

  return (
    <section
      id="gallery"
      data-theme="default"
      className="gallery-section w-full"
      style={{ paddingBottom: 'var(--sp-2xl)' }}
    >
      <div
        ref={stripRef}
        className="gallery-strip flex items-start"
        style={{ gap: GAP }}
      >
        {IMAGES.map((img, i) => (
          <div
            key={i}
            className="relative shrink-0 rounded-2xl overflow-hidden"
            style={{ width: MAX_W_CSS, aspectRatio: img.aspect }}
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 70vw, 500px"
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </section>
  )
}
