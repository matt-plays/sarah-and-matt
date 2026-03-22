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

export type Theme = 'default' | 'maroon' | 'green' | 'taupe' | 'footer'

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
          if (!theme || theme === 'default') continue

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
          let bestTop = -1
          visibleRef.current.forEach((el) => {
            const top = el.getBoundingClientRect().top
            // The section closest to (or past) the top of the viewport is "most active"
            // Use the one with the smallest top value that's still partially visible
            if (best === null || top < bestTop) {
              best = el
              bestTop = top
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
    observerRef.current?.observe(el)
    return () => {
      sectionMapRef.current.delete(el)
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
