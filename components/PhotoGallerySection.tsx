'use client'
// One titled 3:2 photo grid on /photos — Figma node 1419:11302.
// Every photo opens in the lightbox, which also offers a download.
// With a limit, the grid shows that many with the last row fading out and a
// "See more" link below (Figma nodes 1454:8129, 1454:8132). Expanding fades the
// gradient and link out while the grid grows to its full height; the lightbox
// always pages through the full set.

import { useLayoutEffect, useRef, useState } from 'react'
import { TextLinkButton } from './TextLink'
import PhotoLightbox from './PhotoLightbox'
import type { Photo } from '@/lib/photos'

// Eased ramp to the page background — a plain linear fade shows a hard edge
const FADE = [0, 0.013, 0.049, 0.104, 0.175, 0.259, 0.352, 0.45, 0.55, 0.648, 0.741, 0.825, 0.896, 0.951, 0.987, 1]
  .map((a, i, all) => `color-mix(in srgb, var(--clay-0) ${a * 100}%, transparent) ${(i / (all.length - 1)) * 100}%`)
  .join(', ')

const GROW_MS = 700
const FADE_MS = 300
const EASE = 'cubic-bezier(0.4, 0, 0.2, 1)'

type Phase = 'collapsed' | 'expanding' | 'expanded' | 'collapsing'

export default function PhotoGallerySection({
  title,
  accent,
  accentHref,
  photos,
  limit,
}: {
  title: string
  // Gold trailing phrase, optionally linked (e.g. the photographer's Instagram)
  accent?: string
  accentHref?: string
  photos: Photo[]
  limit?: number
}) {
  const [open, setOpen] = useState<number | null>(null)
  const [phase, setPhase] = useState<Phase>('collapsed')
  // Fixed pixel height while animating; auto otherwise
  const [height, setHeight] = useState<number>()
  // Where the collapsed grid ends, so the gradient stays put while the grid resizes
  const [fadeAt, setFadeAt] = useState<number>()
  const rootRef = useRef<HTMLDivElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)
  const targetRef = useRef(0)

  const truncated = limit !== undefined && photos.length > limit
  const shown = truncated && phase === 'collapsed' ? photos.slice(0, limit) : photos
  const animating = phase === 'expanding' || phase === 'collapsing'
  const fadeVisible = phase === 'collapsed' || phase === 'collapsing'

  // Bottom edge of the last photo the collapsed grid shows
  const collapsedHeight = () => {
    const tile = gridRef.current!.querySelectorAll<HTMLElement>('[data-tile]')[limit! - 1]
    return tile.offsetTop + tile.offsetHeight
  }

  const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

  function expand() {
    if (reducedMotion()) return setPhase('expanded')
    const from = gridRef.current!.offsetHeight
    setFadeAt(from)
    setHeight(from)
    setPhase('expanding')
  }

  function collapse() {
    if (reducedMotion()) return setPhase('collapsed')
    const to = collapsedHeight()
    targetRef.current = to
    setFadeAt(to)
    setHeight(gridRef.current!.offsetHeight)
    setPhase('collapsing')
    rootRef.current!.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  // Once the start height is on screen, move to the end height so it transitions,
  // then hand back to auto height when it lands
  useLayoutEffect(() => {
    if (!animating) return
    const grid = gridRef.current!
    if (phase === 'expanding') targetRef.current = grid.scrollHeight
    grid.getBoundingClientRect() // flush the start height before changing it
    setHeight(targetRef.current)
    const done = setTimeout(() => {
      setPhase(phase === 'expanding' ? 'expanded' : 'collapsed')
      setHeight(undefined)
    }, GROW_MS)
    return () => clearTimeout(done)
  }, [phase, animating])

  return (
    <div ref={rootRef} className="flex flex-col" style={{ gap: 'var(--mpds-space-sm)' }}>
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

      <div className="flex flex-col items-center" style={{ gap: 'var(--mpds-space-24)' }}>
        <div
          ref={gridRef}
          className="relative w-full @container"
          style={{
            height,
            overflow: animating ? 'hidden' : undefined,
            transition: animating ? `height ${GROW_MS}ms ${EASE}` : undefined,
          }}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" style={{ gap: 'var(--mpds-space-16)' }}>
            {shown.map((photo, i) => (
              <button
                key={i}
                data-tile
                type="button"
                onClick={() => setOpen(i)}
                className="group relative rounded-[var(--mpds-radius-lg)] overflow-hidden bg-[var(--mpds-color-clay-100)] focus-visible:outline-none focus-visible:shadow-[0_0_0_2px_white,0_0_0_3px_var(--theme-action)]"
                style={{ aspectRatio: '3 / 2' }}
                aria-label={`Open photo ${i + 1} of ${photos.length}`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={photo.thumb ?? photo.src}
                  alt={photo.alt}
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                  style={{ objectPosition: photo.position }}
                />
              </button>
            ))}
          </div>

          {truncated && (
            // Covers exactly the last collapsed row: one 3:2 tile's height at each column count
            <div
              aria-hidden
              className="absolute inset-x-0 pointer-events-none [--cols:1] sm:[--cols:2] lg:[--cols:3]"
              style={{
                ...(phase === 'collapsed' || fadeAt === undefined
                  ? { bottom: 0 }
                  : { top: fadeAt, transform: 'translateY(-100%)' }),
                height: 'calc((100cqw - (var(--cols) - 1) * var(--mpds-space-16)) / var(--cols) * 2 / 3)',
                backgroundImage: `linear-gradient(to bottom, ${FADE})`,
                opacity: fadeVisible ? 1 : 0,
                transition: `opacity ${FADE_MS}ms ease-out`,
              }}
            />
          )}
        </div>

        {truncated && (
          <TextLinkButton
            chevron={phase === 'expanded' || phase === 'collapsing' ? 'up' : 'down'}
            onClick={phase === 'collapsed' ? expand : collapse}
            disabled={animating}
            aria-expanded={phase === 'expanded' || phase === 'expanding'}
            style={{ opacity: animating ? 0 : 1, transition: `opacity ${FADE_MS}ms ease-out` }}
          >
            {phase === 'expanded' || phase === 'collapsing' ? 'See less' : 'See more'}
          </TextLinkButton>
        )}
      </div>

      {open !== null && (
        <PhotoLightbox photos={photos} index={open} onChange={setOpen} onClose={() => setOpen(null)} />
      )}
    </div>
  )
}
