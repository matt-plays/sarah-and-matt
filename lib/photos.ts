// Photo content for /photos (Figma node 1418:11019; hero sets and selects are
// laid out beside it in section 1455:22419). Every set is imported from the
// drive by scripts/import-photos.mjs, which writes the photos-*.json manifests.

import boothPhotos from './photos-booth.json'
import filmPhotos from './photos-film.json'
import heroPhotos from './photos-hero.json'
import selectPhotos from './photos-selects.json'

export type Photo = {
  src: string
  alt: string
  // Smaller copy for the gallery grid; the lightbox and download use src
  thumb?: string
  // object-position for the cropped frame, when the default center crop is off
  position?: string
}

// Figma crops a portrait into a shorter frame with an image transform of
// [scale, offset] on the y axis; object-position wants the offset as a share
// of the overflow instead.
const cropY = (scale: number, offset: number) => `50% ${((offset / (1 - scale)) * 100).toFixed(1)}%`

// ─── Hero strip ─────────────────────────────────────────────────────────────
// Four slots with locked aspect ratios. Each slot holds one photo per set and
// the hero cycles through them. photos-hero.json lists set 1, then set 2, then
// set 3, four photos each in slot order.

const SLOT_ASPECTS = ['1 / 1', '3 / 4', '4 / 3', '3 / 4']
// Set 1's square slot is a portrait cropped low to keep both faces in frame
const HERO_POSITIONS: Record<number, string> = { 0: cropY(0.6668, 0.2422) }

export const HERO_SLOTS: { aspect: string; photos: Photo[] }[] = SLOT_ASPECTS.map((aspect, slot) => ({
  aspect,
  photos: [0, 1, 2].map((set) => {
    const i = set * SLOT_ASPECTS.length + slot
    return { src: heroPhotos[i].src, alt: '', position: HERO_POSITIONS[i] }
  }),
}))

// ─── Galleries ──────────────────────────────────────────────────────────────

export const PHOTOGRAPHER = {
  handle: '@zacxwolf',
  // The full gallery on Zac’s Pixieset
  url: 'https://zacxwolf.pixieset.com/mattsarah/',
}

export const PHOTO_BOOTH_URL = 'https://secure.smugmug.com/download/verify/pf8pjjsVkBJhDzXGWDLn6hgVPq4DfwRt'

// Portraits in landscape tiles, recropped in Figma to keep them well composed
// (tiles 4 and 7)
const SELECT_POSITIONS: Record<number, string> = {
  3: cropY(0.4445, 0.1581),
  6: cropY(0.4445, 0.1829),
}

export const SELECTS: Photo[] = selectPhotos.map(({ src, thumb }, i) => ({
  src,
  thumb,
  alt: 'Sarah and Matt’s wedding at Excelsior',
  position: SELECT_POSITIONS[i],
}))
export const PHOTO_BOOTH: Photo[] = boothPhotos.map(({ src, thumb }) => ({ src, thumb, alt: 'Guests in the photo booth' }))
// The disposables import in filename order. Keyed by filename so a re-import
// keeps these: swap the DJ booth out of the opening row for one of Sarah and
// Matt, and frame a portrait whose faces sit above the default center crop.
const FILM_SWAPS: [string, string][] = [['disc01_asset0007', 'disc04_asset0008']]
const FILM_POSITIONS: Record<string, string> = { disc01_asset0003: '50% 20%' }

const filmName = (src: string) => src.split('/').pop()!.replace(/\.webp$/, '')
const filmOrdered = [...filmPhotos]
for (const [a, b] of FILM_SWAPS) {
  const i = filmOrdered.findIndex((p) => filmName(p.src) === a)
  const j = filmOrdered.findIndex((p) => filmName(p.src) === b)
  if (i >= 0 && j >= 0) [filmOrdered[i], filmOrdered[j]] = [filmOrdered[j], filmOrdered[i]]
}

export const FILM: Photo[] = filmOrdered.map(({ src, thumb }) => ({
  src,
  thumb,
  alt: 'A disposable camera shot from the wedding',
  position: FILM_POSITIONS[filmName(src)],
}))
