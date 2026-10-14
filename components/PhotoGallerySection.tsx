'use client'
// One titled 3:2 photo grid on /photos — Figma node 1419:11302.
// Every photo opens in the lightbox, which also offers a download.

import { useState } from 'react'
import PhotoLightbox from './PhotoLightbox'
import type { Photo } from '@/lib/photos'

export default function PhotoGallerySection({
  title,
  accent,
  accentHref,
  photos,
}: {
  title: string
  // Gold trailing phrase, optionally linked (e.g. the photographer's Instagram)
  accent?: string
  accentHref?: string
  photos: Photo[]
}) {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <div className="flex flex-col" style={{ gap: 'var(--mpds-space-sm)' }}>
      <h2
        className="font-instrument font-medium leading-[1.125] text-[var(--theme-headline)]"
        style={{ fontSize: 'var(--mpds-font-size-4xl)', letterSpacing: '-0.02em' }}
      >
        {title}
        {accent && ' '}
        {accent && (accentHref ? (
          <a
            href={accentHref}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--theme-action)] hover:text-[var(--theme-action-hovered)] transition-colors"
          >
            {accent}
          </a>
        ) : (
          <span className="text-[var(--theme-action)]">{accent}</span>
        ))}
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" style={{ gap: 'var(--mpds-space-16)' }}>
        {photos.map((photo, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setOpen(i)}
            className="group relative rounded-[var(--mpds-radius-lg)] overflow-hidden bg-[var(--mpds-color-clay-100)] focus-visible:outline-none focus-visible:shadow-[0_0_0_2px_white,0_0_0_3px_var(--theme-action)]"
            style={{ aspectRatio: '3 / 2' }}
            aria-label={`Open photo ${i + 1} of ${photos.length}`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={photo.src}
              alt={photo.alt}
              loading="lazy"
              decoding="async"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
            />
          </button>
        ))}
      </div>

      {open !== null && (
        <PhotoLightbox photos={photos} index={open} onChange={setOpen} onClose={() => setOpen(null)} />
      )}
    </div>
  )
}
