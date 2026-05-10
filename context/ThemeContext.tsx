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
    // Desktop (≥1025px) uses a higher threshold so sections peeking from below
    // don't steal the theme. Mobile/tablet uses a lower threshold so tall
    // sections (e.g. expanded accordions) don't drop below the ratio.
    // rootMargin clips the bottom 25% of the viewport so sections entering
    // from below don't register until they're meaningfully in view — this
    // prevents RSVP (green) from winning while Travel is still dominant.
    const mql = window.matchMedia('(min-width: 1025px)')

    const onIntersect: IntersectionObserverCallback = (entries) => {
      // Refresh all cached offsetTops on every batch — dynamic imports and
      // layout shifts mean the values stored at registration time can be stale.
      sectionMapRef.current.forEach((_, el) => {
        offsetTopMapRef.current.set(el, el.getBoundingClientRect().top + window.scrollY)
      })

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
    }

    const buildObserver = () => {
      observerRef.current?.disconnect()
      visibleRef.current.clear()
      const threshold = mql.matches ? 0.35 : 0.1
      observerRef.current = new IntersectionObserver(onIntersect, {
        threshold,
        rootMargin: '0px 0px -25% 0px',
      })
      sectionMapRef.current.forEach((_, el) => {
        observerRef.current?.observe(el)
      })
    }

    buildObserver()
    mql.addEventListener('change', buildObserver)

    return () => {
      mql.removeEventListener('change', buildObserver)
      observerRef.current?.disconnect()
    }
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
