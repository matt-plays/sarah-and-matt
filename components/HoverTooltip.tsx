'use client'
// Small chip that follows the cursor above whatever it wraps — the same look as
// the colophon tooltip. A tap shows it briefly too, since touch has no hover.

import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

const TAP_SHOW_MS = 1800

export default function HoverTooltip({
  label,
  children,
  className,
  style,
}: {
  label: string
  children: React.ReactNode
  className?: string
  style?: React.CSSProperties
}) {
  const [show, setShow] = useState(false)
  const [mounted, setMounted] = useState(false)
  const tooltipRef = useRef<HTMLDivElement>(null)
  const tapTimer = useRef<ReturnType<typeof setTimeout>>(undefined)

  useEffect(() => {
    setMounted(true)
    return () => clearTimeout(tapTimer.current)
  }, [])

  // Direct DOM update for transform — avoids React re-renders on every mousemove.
  // Chip is centered horizontally above the cursor with a small offset.
  const updatePos = (x: number, y: number) => {
    const el = tooltipRef.current
    if (!el) return
    el.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, calc(-100% - 12px))`
  }

  return (
    <>
      <div
        className={className}
        style={{ cursor: 'default', ...style }}
        onMouseEnter={(e) => { updatePos(e.clientX, e.clientY); setShow(true) }}
        onMouseLeave={() => setShow(false)}
        onMouseMove={(e) => updatePos(e.clientX, e.clientY)}
        onPointerDown={(e) => {
          if (e.pointerType === 'mouse') return
          updatePos(e.clientX, e.clientY)
          setShow(true)
          clearTimeout(tapTimer.current)
          tapTimer.current = setTimeout(() => setShow(false), TAP_SHOW_MS)
        }}
      >
        {children}
      </div>

      {mounted && createPortal(
        <div
          ref={tooltipRef}
          data-theme="footer"
          aria-hidden="true"
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            pointerEvents: 'none',
            opacity: show ? 1 : 0,
            transition: 'opacity 0.2s ease',
            zIndex: 300,
            display: 'flex',
            alignItems: 'center',
            backgroundColor: 'var(--theme-tonal)',
            paddingTop: 'var(--mpds-space-1)',
            paddingBottom: 'var(--mpds-space-2)',
            paddingLeft: 'var(--mpds-space-6)',
            paddingRight: 'var(--mpds-space-6)',
            borderRadius: 'var(--mpds-dimension-4)',
            whiteSpace: 'nowrap',
            willChange: 'transform, opacity',
          }}
        >
          <span
            className="font-instrument"
            style={{
              color: 'var(--theme-btn-text)',
              fontSize: 'var(--mpds-font-size-sm)',
              lineHeight: 1.625,
            }}
          >
            {label}
          </span>
        </div>,
        document.body
      )}
    </>
  )
}
