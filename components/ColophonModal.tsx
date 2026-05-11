'use client'

import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

function CloseIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M1 1L15 15M15 1L1 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

function ColophonLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="colophon-link"
    >
      {children}
    </a>
  )
}

export default function ColophonModal() {
  const [isOpen, setIsOpen] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [showScrim, setShowScrim] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => { setMounted(true) }, [])

  // Fade in on mount — trigger opacity after portal paints
  useEffect(() => {
    if (!isOpen) return
    const raf = requestAnimationFrame(() => setIsVisible(true))
    return () => cancelAnimationFrame(raf)
  }, [isOpen])

  const close = () => setIsVisible(false)

  // Escape key to close
  useEffect(() => {
    if (!isOpen) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
    }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [isOpen])

  // Body scroll lock while open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  // Gradient scrim — show when content overflows and user hasn't scrolled to bottom
  useEffect(() => {
    if (!isOpen) return
    const el = scrollRef.current
    if (!el) return

    const check = () => {
      const overflows = el.scrollHeight > el.clientHeight + 2
      const atBottom = el.scrollTop >= el.scrollHeight - el.clientHeight - 4
      setShowScrim(overflows && !atBottom)
    }

    // Small delay so the DOM has painted before measuring
    const t = setTimeout(check, 50)
    el.addEventListener('scroll', check, { passive: true })
    const ro = new ResizeObserver(check)
    ro.observe(el)

    return () => {
      clearTimeout(t)
      el.removeEventListener('scroll', check)
      ro.disconnect()
    }
  }, [isOpen])

  const modal = (
    <div
      data-theme="footer"
      className="fixed inset-0 z-[200] flex flex-col overflow-hidden"
      style={{
        backgroundColor: 'var(--theme-bg)',
        opacity: isVisible ? 1 : 0,
        transition: 'opacity 0.3s ease',
      }}
      onTransitionEnd={() => { if (!isVisible) setIsOpen(false) }}
    >
      {/* Close button */}
      <button
        onClick={close}
        aria-label="Close colophon"
        className="absolute top-6 right-6 z-10 flex items-center justify-center rounded-full w-12 h-12 transition-opacity hover:opacity-60"
        style={{ color: 'var(--theme-text)' }}
      >
        <CloseIcon />
      </button>

      {/* Scrollable body */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto"
        style={{ padding: 'var(--mpds-space-80)' }}
      >
        <div className="flex items-center justify-center min-h-full">
        <div className="w-full max-w-[784px]">
          {/* Headline */}
          <h2
            className="font-romie font-light leading-none"
            style={{
              fontSize: 'var(--fs-8xl)',
              color: 'var(--theme-headline)',
              marginBottom: 'var(--mpds-space-80)',
            }}
          >
            Colophon
          </h2>

          {/* Body copy */}
          <div
            className="font-instrument leading-[1.625] colophon-body"
            style={{
              fontSize: 'var(--fs-lg)',
              color: 'var(--theme-text)',
            }}
          >
            <p>
              This site is typeset in three faces. Romie Light handles display moments and the big
              headline type—it's a contemporary serif with just enough romance for the occasion.
              Instrument Sans carries body copy and navigation, and Spezia Extended Bold shows up
              throughout as an all-caps label face.
            </p>
            <p>
              The design foundation is{' '}
              <ColophonLink href="https://github.com/matt-plays/mpds">MPDS</ColophonLink>—a
              personal design system and token library I've been building and refining across
              projects over the years. Layouts and components were designed in Figma and built in
              Next.js 15 with React 19 and Three.js. Background textures and grain effects are
              powered by{' '}
              <ColophonLink href="https://shaders.paper.design">Paper Design Shaders</ColophonLink>
              . The site is hosted on Vercel, RSVP is handled through Zola, and content syncs from
              Notion via a custom script. It was developed with{' '}
              <ColophonLink href="https://claude.ai/code">Claude Code</ColophonLink> across 38
              sessions and 434 prompts.
            </p>
            <p>
              The invitations were printed letterpress by{' '}
              <ColophonLink href="https://mandatepress.com">Mandate Press</ColophonLink> on 200#
              Mohawk Mosaic Blush.
            </p>
            <p style={{ marginBottom: 0 }}>
              Professional photography by{' '}
              <ColophonLink href="https://www.zacxwolf.com">Zac Wolf</ColophonLink>.
            </p>
          </div>
        </div>
        </div>
      </div>

      {/* Gradient scrim — visible when content overflows */}
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-0 right-0 pointer-events-none transition-opacity duration-500"
        style={{
          height: 'var(--mpds-space-2xl)',
          opacity: showScrim ? 1 : 0,
          background: 'linear-gradient(to bottom, transparent, var(--theme-bg))',
        }}
      />
    </div>
  )

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="font-instrument text-[var(--theme-text)] hover:text-[var(--theme-headline)] transition-colors leading-[1.625] text-left"
        style={{ fontSize: 'var(--fs-lg)' }}
      >
        Colophon
      </button>
      {mounted && isOpen && createPortal(modal, document.body)}
    </>
  )
}
