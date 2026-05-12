'use client'

import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import ColophonModal from './ColophonModal'
import type { ColophonContent } from '@/types/content'

// arrow-up-right — from MPDS icon set (matt-plays/mpds/icons/svg/arrow-up-right.svg)
function ArrowUpRightIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M17.2499 6C17.6642 6 17.9999 6.33579 17.9999 6.75V15.25C17.9999 15.6642 17.6642 16 17.2499 16C16.8357 16 16.4999 15.6642 16.4999 15.25V8.56055L7.28022 17.7803C6.98732 18.0732 6.51256 18.0732 6.21967 17.7803C5.92678 17.4874 5.92678 17.0126 6.21967 16.7197L15.4394 7.5H8.74994C8.33573 7.5 7.99994 7.16421 7.99994 6.75C7.99994 6.33579 8.33573 6 8.74994 6H17.2499Z"
        fill="currentColor"
      />
    </svg>
  )
}

export default function ColophonTooltip({
  content,
  children,
  className,
  style,
  ariaLabel = 'Open colophon',
}: {
  content: ColophonContent
  children: React.ReactNode
  className?: string
  style?: React.CSSProperties
  ariaLabel?: string
}) {
  const [show, setShow] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
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

  return (
    <>
      <button
        type="button"
        aria-label={ariaLabel}
        className={className}
        style={{
          background: 'none',
          border: 'none',
          padding: 0,
          cursor: 'pointer',
          ...style,
        }}
        onMouseEnter={(e) => {
          updatePos(e.clientX, e.clientY)
          setShow(true)
        }}
        onMouseLeave={() => setShow(false)}
        onMouseMove={(e) => updatePos(e.clientX, e.clientY)}
        onFocus={() => setShow(false)}
        onClick={() => setIsOpen(true)}
      >
        {children}
      </button>

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
            paddingRight: 'var(--mpds-space-2)',
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
            Colophon
          </span>
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 18,
              height: 18,
              marginLeft: 2,
              color: 'var(--theme-btn-text)',
            }}
          >
            <ArrowUpRightIcon size={14} />
          </span>
        </div>,
        document.body
      )}

      <ColophonModal content={content} isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  )
}
