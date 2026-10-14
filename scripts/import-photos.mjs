/**
 * import-photos.mjs
 * Pulls rated photos from a Lightroom/Bridge export folder into a /photos gallery.
 * Reads each JPG's embedded xmp:Rating, keeps the ones at or above --min-rating,
 * and writes a full-size WebP (lightbox + download) and a small WebP thumbnail
 * (grid) to public/images/photos/<gallery>/, plus a manifest that lib/photos.ts reads.
 *
 * Run: node scripts/import-photos.mjs <source-dir> <gallery> [options]
 * e.g. node scripts/import-photos.mjs "/Volumes/.../Disposable" film
 *
 * Options:
 *   --min-rating=3   lowest xmp:Rating to keep
 *   --only=039,048   hand-picked files by filename prefix, kept in this order
 *                    (skips the rating check)
 *   --size=2400      long edge of the full-size copy, in px
 *   --no-thumb       skip the grid thumbnails
 * Then shrink the full-size files with: npm run tinify-photos -- <gallery>
 */

import sharp from 'sharp'
import { readdir, readFile, mkdir, rm, writeFile } from 'fs/promises'
import { join, extname, basename } from 'path'

const [sourceDir, gallery] = process.argv.slice(2).filter((a) => !a.startsWith('--'))
const option = (name) => process.argv.find((a) => a.startsWith(`--${name}=`))?.split('=')[1]
const only = option('only')?.split(',')
const minRating = only ? 0 : Number(option('min-rating') ?? 3)
const thumbs = !process.argv.includes('--no-thumb')

if (!sourceDir || !gallery) {
  console.error('Usage: node scripts/import-photos.mjs <source-dir> <gallery> [--min-rating=3] [--only=…] [--size=2400] [--no-thumb]')
  process.exit(1)
}

const OUT_DIR = new URL(`../public/images/photos/${gallery}`, import.meta.url).pathname
const MANIFEST = new URL(`../lib/photos-${gallery}.json`, import.meta.url).pathname
const FULL_EDGE = Number(option('size') ?? 2400)
const THUMB_EDGE = 900

// The XMP packet is plain text inside the JPG, so a regex is enough here
function readRating(buf) {
  const m = buf.toString('latin1').match(/xmp:Rating(?:="|>)(-?\d)/)
  return m ? Number(m[1]) : 0
}

const jpgs = (await readdir(sourceDir))
  .filter((f) => ['.jpg', '.jpeg'].includes(extname(f).toLowerCase()) && !f.startsWith('.'))
  .sort()

const files = only
  ? only.map((prefix) => {
      const match = jpgs.find((f) => f.startsWith(prefix))
      if (!match) throw new Error(`No file in ${sourceDir} starts with "${prefix}"`)
      return match
    })
  : jpgs

await rm(OUT_DIR, { recursive: true, force: true })
await mkdir(join(OUT_DIR, thumbs ? 'thumb' : ''), { recursive: true })

const photos = []
for (const file of files) {
  const buf = await readFile(join(sourceDir, file))
  if (readRating(buf) < minRating) continue

  const name = `${basename(file, extname(file)).toLowerCase()}.webp`
  const resize = (edge) => sharp(buf).rotate().resize(edge, edge, { fit: 'inside', withoutEnlargement: true })

  const { width, height } = await resize(FULL_EDGE).webp({ quality: 85 }).toFile(join(OUT_DIR, name))
  if (thumbs) await resize(THUMB_EDGE).webp({ quality: 78 }).toFile(join(OUT_DIR, 'thumb', name))

  photos.push({
    src: `/images/photos/${gallery}/${name}`,
    ...(thumbs && { thumb: `/images/photos/${gallery}/thumb/${name}` }),
    width,
    height,
  })
  process.stdout.write('.')
}

await writeFile(MANIFEST, JSON.stringify(photos, null, 2) + '\n')
console.log(`\n${photos.length} of ${files.length} photos${only ? '' : ` rated ${minRating}+`} → public/images/photos/${gallery}/`)
