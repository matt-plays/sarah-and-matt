'use client'
// Hero section — Three.js invite card, centered, pink background, landscape panorama.
// Figma node: 342:6133 (desktop), 583:4403 (tablet), 584:3503 (mobile)

import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'

const InviteCanvas = dynamic(() => import('./InviteCanvas'), { ssr: false })

export default function Hero() {
  const [ready, setReady] = useState(false)
  const [revealed, setRevealed] = useState(false)
  const [cardEntrance, setCardEntrance] = useState(false)
  const [progress, setProgress] = useState(0)
  const [trackReady, setTrackReady] = useState(false)

  // Trigger track entrance on first paint
  useEffect(() => { setTrackReady(true) }, [])

  // Simulate progress 0 → 80% until assets are ready
  useEffect(() => {
    if (ready) return
    const id = setInterval(() => {
      setProgress((p) => {
        const next = p + (80 - p) * 0.08
        return next > 79.9 ? 80 : next
      })
    }, 50)
    return () => clearInterval(id)
  }, [ready])

  // When all textures loaded: jump to 100%, then start reveal sequence
  useEffect(() => {
    if (!ready) return
    setProgress(100)
    const id = setTimeout(() => setRevealed(true), 400)
    return () => clearTimeout(id)
  }, [ready])

  // Always fire hero-ready after 1 s — decoupled from texture loading so the
  // nav can never be missed due to a race between Hero mounting and the event.
  useEffect(() => {
    const id = setTimeout(() => window.dispatchEvent(new CustomEvent('hero-ready')), 1000)
    return () => clearTimeout(id)
  }, [])

  // Card entrance fires after textures are revealed
  useEffect(() => {
    if (!revealed) return
    const cardId = setTimeout(() => setCardEntrance(true), 700)
    return () => clearTimeout(cardId)
  }, [revealed])

  return (
    <section
      id="hero"
      className="relative w-full overflow-clip"
      style={{
        backgroundColor: 'var(--blush)',
        // Mobile: 74px (clears 117px nav + 52px gap via canvas's 95px internal top margin)
        // Desktop: 48px (card is vertically centered in full-height hero, nav overlap is fine)
        paddingTop: 'clamp(48px, calc(87px - 2.708vw), 74px)',
        paddingBottom: 'var(--mpds-space-64)',
      }}
    >

{/* ── Progress bar (loading state) ── */}
      <div
        className="fixed inset-0 flex items-center justify-center pointer-events-none"
        aria-hidden="true"
        style={{ zIndex: 2, opacity: revealed ? 0 : 1, transition: 'opacity 1.2s ease' }}
      >
        <div
          style={{
            width: 320,
            height: 4,
            backgroundColor: 'var(--blush-2)',
            borderRadius: 2,
            overflow: 'hidden',
            transform: trackReady ? 'scaleX(1)' : 'scaleX(0)',
            transformOrigin: 'center',
            transition: 'transform 0.5s ease',
          }}
        >
          <div
            style={{
              height: '100%',
              width: `${progress}%`,
              backgroundColor: 'var(--mpds-color-slate-900)',
              transition: progress === 100 ? 'width 0.3s ease-out' : 'width 0.08s linear',
            }}
          />
        </div>
      </div>

      {/* ── Centered Three.js invite card ── */}
      {/* No site-container — canvas is full-bleed with a small extension on narrow screens.
          max-sm: (<640px) extends canvas 32px past viewport on each side (clipped by overflow-clip)
          so the Three.js camera's 12.5% internal margin resolves to ~36px visual padding,
          matching Figma's 32px card margin. lg+ caps at 960px centered. */}
      <div className="relative flex justify-center" style={{ zIndex: 1 }}>
        <div
          className="w-full lg:max-w-[960px] max-sm:w-[calc(100%_+_4rem)]"
          style={{ opacity: cardEntrance ? 1 : 0, transition: 'opacity 0.8s ease' }}
        >
          <InviteCanvas
            onReady={() => setReady(true)}
            triggerEntrance={cardEntrance}
          />
          <noscript>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/hero-invite-front.svg"
              alt="Sarah Petrokonis &amp; Matt Plays — Friday, August 28th 2026 — 5 o'clock in the evening — Excelsior, 125 E King Street, Lancaster, PA"
              className="w-full h-auto"
            />
          </noscript>
        </div>
      </div>

      {/* ── Bottom landscape panorama ── */}
      <div
        className="absolute bottom-0 left-0 w-full overflow-hidden pointer-events-none"
        aria-hidden="true"
        style={{
          zIndex: 0,
          opacity: revealed ? 1 : 0,
          transform: revealed ? 'scale(1)' : 'scale(1.125)',
          transition: 'opacity 1s ease 0.5s, transform 1s ease 0.5s',
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/wedding-site--hero-background.webp"
          srcSet="/images/wedding-site--hero-background-480w.webp 480w, /images/wedding-site--hero-background-800w.webp 800w, /images/wedding-site--hero-background-1200w.webp 1200w, /images/wedding-site--hero-background.webp 1920w"
          sizes="100vw"
          alt=""
          fetchPriority="low"
          decoding="async"
          className="w-[200%] sm:w-full max-w-none h-auto block -translate-x-1/4 sm:translate-x-0"
        />
      </div>
    </section>
  )
}
