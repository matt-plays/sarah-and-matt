'use client'
// Full-screen photo viewer for /photos — prev/next, keyboard nav, download.

import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { ArrowLeft, ArrowRight, Close } from '@mattplays/mpds/icons'
import type { Photo } from '@/lib/photos'

function DownloadIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 4v11m0 0l-4.5-4.5M12 15l4.5-4.5M5 19h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

const controlClass =
  'flex items-center justify-center rounded-full text-[var(--mpds-color-clay-100)] bg-white/10 hover:bg-white/20 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white'

export default function PhotoLightbox({
  photos,
  index,
  onChange,
  onClose,
}: {
  photos: Photo[]
  index: number
  onChange: (index: number) => void
  onClose: () => void
}) {
  const photo = photos[index]
  const prev = () => onChange((index - 1 + photos.length) % photos.length)
  const next = () => onChange((index + 1) % photos.length)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      else if (e.key === 'ArrowLeft') prev()
      else if (e.key === 'ArrowRight') next()
    }
    document.addEventListener('keydown', onKey)
    const { overflow } = document.body.style
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = overflow
    }
  })

  const filename = photo.src.split('/').pop()

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Photo ${index + 1} of ${photos.length}`}
      className="fixed inset-0 flex flex-col"
      style={{ zIndex: 300, backgroundColor: 'rgba(13, 11, 10, 0.94)' }}
      onClick={onClose}
    >
      {/* ── Top bar ── */}
      <div
        className="flex items-center justify-between"
        style={{ padding: 'var(--site-section-padding)' }}
        onClick={(e) => e.stopPropagation()}
      >
        <span
          className="font-spezia uppercase tracking-[0.12em] text-[var(--mpds-color-clay-600)]"
          style={{ fontSize: 'var(--mpds-font-size-sm)' }}
        >
          {index + 1} / {photos.length}
        </span>
        <div className="flex items-center" style={{ gap: 'var(--mpds-space-8)' }}>
          <a href={photo.src} download={filename} className={controlClass} style={{ width: 48, height: 48 }} aria-label="Download photo">
            <DownloadIcon />
          </a>
          <button type="button" onClick={onClose} className={controlClass} style={{ width: 48, height: 48 }} aria-label="Close">
            <Close />
          </button>
        </div>
      </div>

      {/* ── Photo + arrows ── */}
      <div className="relative flex-1 min-h-0 flex items-center justify-center" style={{ padding: '0 var(--site-section-padding) var(--site-section-padding)' }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          key={index}
          src={photo.src}
          alt={photo.alt}
          className="max-w-full max-h-full object-contain rounded-[var(--mpds-radius-lg)]"
          onClick={(e) => e.stopPropagation()}
        />
        {photos.length > 1 && (
          <>
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); prev() }}
              className={`${controlClass} absolute left-[var(--site-section-padding)] top-1/2 -translate-y-1/2`}
              style={{ width: 56, height: 56 }}
              aria-label="Previous photo"
            >
              <ArrowLeft />
            </button>
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); next() }}
              className={`${controlClass} absolute right-[var(--site-section-padding)] top-1/2 -translate-y-1/2`}
              style={{ width: 56, height: 56 }}
              aria-label="Next photo"
            >
              <ArrowRight />
            </button>
          </>
        )}
      </div>
    </div>,
    document.body,
  )
}
