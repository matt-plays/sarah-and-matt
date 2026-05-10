'use client'

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react'

// ─── Types ─────────────────────────────────────────────────────────────────

export type Theme = 'default' | 'maroon' | 'green' | 'taupe' | 'footer' | 'slate' | 'brand-og'

interface ThemeContextValue {
  activeTheme: Theme
  registerSection: (el: HTMLElement, theme: Theme) => () => void
}

// ─── Context ────────────────────────────────────────────────────────────────

const ThemeContext = createContext<ThemeContextValue>({
  activeTheme: 'default',
  registerSection: () => () => {},
})

// ─── Provider ───────────────────────────────────────────────────────────────

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [activeTheme, setActiveTheme] = useState<Theme>('default')
  const sectionMapRef = useRef<Map<HTMLElement, Theme>>(new Map())
  const offsetTopMapRef = useRef<Map<HTMLElement, number>>(new Map())
  const visibleRef = useRef<Set<HTMLElement>>(new Set())
  const observerRef = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    // Track which themed sections are visible. When multiple overlap,
    // the one furthest down the page (highest offsetTop) wins.
    observerRef.current = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const el = entry.target as HTMLElement
          const theme = sectionMapRef.current.get(el)
          if (!theme) continue

          if (entry.isIntersecting) {
            visibleRef.current.add(el)
          } else {
            visibleRef.current.delete(el)
          }
        }

        // Pick the lowest visible section (highest offsetTop)
        if (visibleRef.current.size === 0) {
          setActiveTheme('default')
        } else {
          let best: HTMLElement | null = null
          let bestOffsetTop = -1
          visibleRef.current.forEach((el) => {
            const offsetTop = offsetTopMapRef.current.get(el) ?? 0
            if (best === null || offsetTop > bestOffsetTop) {
              best = el
              bestOffsetTop = offsetTop
            }
          })
          if (best) {
            setActiveTheme(sectionMapRef.current.get(best) || 'default')
          }
        }
      },
      { threshold: 0.35 }
    )

    // Observe all already-registered sections
    sectionMapRef.current.forEach((_, el) => {
      observerRef.current?.observe(el)
    })

    return () => observerRef.current?.disconnect()
  }, [])

  // Sync active theme to <body>
  useEffect(() => {
    document.body.setAttribute('data-theme', activeTheme)
  }, [activeTheme])

  const registerSection = useCallback((el: HTMLElement, theme: Theme) => {
    sectionMapRef.current.set(el, theme)
    offsetTopMapRef.current.set(el, el.offsetTop)
    observerRef.current?.observe(el)
    return () => {
      sectionMapRef.current.delete(el)
      offsetTopMapRef.current.delete(el)
      observerRef.current?.unobserve(el)
    }
  }, [])

  return (
    <ThemeContext.Provider value={{ activeTheme, registerSection }}>
      {children}
    </ThemeContext.Provider>
  )
}

// ─── Hooks ──────────────────────────────────────────────────────────────────

export function useTheme() {
  return useContext(ThemeContext)
}

/**
 * Register a section for scroll-based theme switching.
 * Non-default themes activate when the section enters the viewport.
 */
export function useScrollSection<T extends HTMLElement = HTMLElement>(theme: Theme) {
  const { registerSection } = useTheme()
  const ref = useRef<T | null>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    return registerSection(el, theme)
  }, [theme, registerSection])

  return ref
}
