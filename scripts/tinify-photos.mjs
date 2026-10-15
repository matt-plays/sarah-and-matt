/**
 * tinify-photos.mjs
 * Runs a /photos gallery's full-size WebPs through TinyPNG, in place (~50% smaller).
 * Pass --thumbs to do the grid thumbnails instead (~20% smaller) — worth it for
 * the galleries behind "See more", budget allowing (the free plan allows 500
 * compressions a month, one per file).
 * Finished files are listed in .tinified inside each folder so a re-run only
 * compresses what's new; import-photos.mjs clears it along with the folder.
 *
 * Needs TINIFY_API_KEY in .env.local.
 * Run: npm run tinify-photos -- <gallery> [--thumbs]   e.g. npm run tinify-photos -- film
 */

import tinify from 'tinify'
import { readdir, readFile, stat, appendFile } from 'fs/promises'
import { join } from 'path'

const gallery = process.argv.slice(2).find((a) => !a.startsWith('--'))
const thumbs = process.argv.includes('--thumbs')
if (!gallery) {
  console.error('Usage: npm run tinify-photos -- <gallery> [--thumbs]')
  process.exit(1)
}
if (!process.env.TINIFY_API_KEY) {
  console.error('TINIFY_API_KEY is missing from .env.local')
  process.exit(1)
}
tinify.key = process.env.TINIFY_API_KEY

const dir = new URL(`../public/images/photos/${gallery}${thumbs ? '/thumb' : ''}`, import.meta.url).pathname
const log = join(dir, '.tinified')
const done = new Set((await readFile(log, 'utf8').catch(() => '')).split('\n').filter(Boolean))
const todo = (await readdir(dir)).filter((f) => f.endsWith('.webp') && !done.has(f)).sort()

let before = 0
let after = 0
for (const file of todo) {
  const path = join(dir, file)
  before += (await stat(path)).size
  await tinify.fromFile(path).toFile(path)
  after += (await stat(path)).size
  await appendFile(log, `${file}\n`)
  process.stdout.write('.')
}

const mb = (n) => `${(n / 1024 / 1024).toFixed(1)}MB`
console.log(`\n${todo.length} compressed, ${mb(before)} → ${mb(after)}. TinyPNG used this month: ${tinify.compressionCount ?? 'n/a'}`)
