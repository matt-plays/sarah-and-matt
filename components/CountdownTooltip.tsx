'use client'

import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

// Wedding date — midnight local time, month is 0-indexed (7 = August)
const WEDDING = new Date(2026, 7, 28)

function daysUntilWedding(): number {
  const now = new Date()
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  const diff = WEDDING.getTime() - today.getTime()
  return Math.max(0, Math.floor(diff / 86_400_000))
}

export default function CountdownTooltip({ children }: { children: React.ReactNode }) {
  const [show, setShow] = useState(false)
  const [mounted, setMounted] = useState(false)
  const tooltipRef = useRef<HTMLDivElement>(null)

  useEffect(() => { setMounted(true) }, [])

  // Direct DOM update for transform — avoids React re-renders on every mousemove.
  // Chip is centered horizontally above the cursor with a small offset.
  const updatePos = (x: number, y: number) => {
    const el = tooltipRef.current
    if (!el) return
    el.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, calc(-100% - 12px))`
  }

  const days = daysUntilWedding()
  const label = days === 0 ? 'Today!' : `${days} days to go`

  return (
    <>
      <div
        style={{ cursor: 'default' }}
        onMouseEnter={(e) => { updatePos(e.clientX, e.clientY); setShow(true) }}
        onMouseLeave={() => setShow(false)}
        onMouseMove={(e) => updatePos(e.clientX, e.clientY)}
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
