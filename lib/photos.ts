// Photo content for /photos.
// Everything here is placeholder imagery from the Figma file (node 1418:11019)
// until the real selects, photo booth, and disposable scans are dropped in.

export type Photo = {
  src: string
  alt: string
  // object-position for the cropped frame, when the default center crop is off
  position?: string
}

// ─── Hero strip ─────────────────────────────────────────────────────────────
// Four slots with locked aspect ratios. Each slot holds one photo per set and
// the hero cycles through them, so swapping in the three real sets of four is
// just a matter of filling these arrays (index 0 = set 1, 1 = set 2, 2 = set 3).

const HERO_PLACEHOLDER = '/images/photos/placeholder-hero.webp'
const TIMELINE = (n: number) => `/images/timeline/wedding-site--timeline-gallery-0${n}.webp`

// Set 1 is from Figma; sets 2 and 3 borrow timeline photos until the real ones land.
const set1: Photo[] = [
  { src: '/images/photos/hero-01.webp', alt: '', position: '50% 72.7%' },
  { src: '/images/photos/hero-02.webp', alt: '' },
  { src: '/images/photos/hero-03.webp', alt: '' },
  { src: HERO_PLACEHOLDER, alt: '' },
]
const borrowed = (a: number, b: number): Photo[] => [TIMELINE(a), TIMELINE(b)].map((src) => ({ src, alt: '' }))

export const HERO_SLOTS: { aspect: string; photos: Photo[] }[] = [
  { aspect: '1 / 1', photos: [set1[0], ...borrowed(1, 5)] },
  { aspect: '3 / 4', photos: [set1[1], ...borrowed(2, 6)] },
  { aspect: '4 / 3', photos: [set1[2], ...borrowed(3, 1)] },
  { aspect: '3 / 4', photos: [set1[3], ...borrowed(4, 2)] },
]

// ─── Galleries ──────────────────────────────────────────────────────────────

const fill = (src: string, alt: string, count: number): Photo[] =>
  Array.from({ length: count }, () => ({ src, alt }))

export const PHOTOGRAPHER = {
  handle: '@zacxwolf',
  url: 'https://www.instagram.com/zacxwolf/',
}

export const PHOTO_BOOTH_URL = 'https://secure.smugmug.com/download/verify/pf8pjjsVkBJhDzXGWDLn6hgVPq4DfwRt'

export const SELECTS: Photo[] = fill('/images/photos/placeholder-selects.webp', 'Sarah and Matt at Excelsior', 9)
export const PHOTO_BOOTH: Photo[] = fill('/images/photos/placeholder-booth.webp', 'Guests in the photo booth', 6)
export const FILM: Photo[] = fill('/images/photos/placeholder-film.webp', 'A disposable camera shot from the reception', 12)
