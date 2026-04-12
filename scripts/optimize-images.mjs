/**
 * optimize-images.mjs
 * Converts all PNG/JPG images in public/images to WebP using sharp.
 * Also generates:
 *   - Responsive srcset variants (480w, 800w, 1200w) for full-bleed background images
 *   - Mobile half-res variants of PBR map textures for Three.js
 * Run: npm run optimize
 */

import sharp from 'sharp';
import { readdir, stat, unlink } from 'fs/promises';
import { join, extname, basename } from 'path';

const INPUT_DIR = new URL('../public/images', import.meta.url).pathname;

// Higher quality for PBR map textures — they encode channel data used by Three.js
const PBR_KEYWORDS = ['normal', 'ambient', 'specular', 'displacement'];
const SKIP_EXTENSIONS = new Set(['.svg', '.webp', '.gif']);

// Full-bleed backgrounds that need srcset variants at multiple widths
const RESPONSIVE_BACKGROUNDS = [
  'wedding-site--hero-background',
  'wedding-site--travel-stay-background',
];
const SRCSET_WIDTHS = [480, 800, 1200];

// PBR maps loaded by Three.js — generate a mobile (50% scale) variant
const PBR_MAPS = [
  'hero-invite-front-normal',
  'hero-invite-front-ambient',
  'hero-invite-back-normal',
  'hero-invite-back-ambient',
];

function getQuality(filename) {
  const lower = filename.toLowerCase();
  if (PBR_KEYWORDS.some((k) => lower.includes(k))) return 90;
  if (lower.endsWith('.jpg') || lower.endsWith('.jpeg')) return 82;
  return 85;
}

async function findImages(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await findImages(full)));
    } else {
      const ext = extname(entry.name).toLowerCase();
      if (!SKIP_EXTENSIONS.has(ext) && (ext === '.png' || ext === '.jpg' || ext === '.jpeg')) {
        files.push(full);
      }
    }
  }
  return files;
}

async function formatSize(bytes) {
  if (bytes >= 1024 * 1024) return `${(bytes / 1024 / 1024).toFixed(1)}MB`;
  return `${(bytes / 1024).toFixed(0)}KB`;
}

// ── Pass 1: Convert all images to WebP ───────────────────────────────────────
async function convertToWebP(files) {
  console.log(`\nPass 1: Converting ${files.length} images to WebP\n`);

  let totalBefore = 0;
  let totalAfter = 0;

  for (const file of files) {
    const before = (await stat(file)).size;
    const outPath = file.replace(/\.(png|jpe?g)$/i, '.webp');
    const quality = getQuality(basename(file));

    await sharp(file).webp({ quality }).toFile(outPath);

    const after = (await stat(outPath)).size;
    totalBefore += before;

    const rel = file.replace(INPUT_DIR, '');
    if (after >= before) {
      await unlink(outPath);
      totalAfter += before;
      console.log(`~ ${rel} — WebP no smaller, keeping original`);
    } else {
      totalAfter += after;
      const pct = Math.round(((before - after) / before) * 100);
      console.log(`✓ ${rel}  ${await formatSize(before)} → ${await formatSize(after)} (-${pct}%)`);
    }
  }

  const saved = totalBefore - totalAfter;
  const pct = Math.round((saved / totalBefore) * 100);
  console.log(`\nWebP total: ${await formatSize(totalBefore)} → ${await formatSize(totalAfter)} (-${pct}%), saved ${await formatSize(saved)}`);
}

// ── Pass 2: Responsive srcset variants for background images ─────────────────
async function generateSrcsetVariants() {
  console.log(`\nPass 2: Generating srcset variants for backgrounds\n`);

  for (const name of RESPONSIVE_BACKGROUNDS) {
    // Use the WebP version as source (already optimized)
    const src = join(INPUT_DIR, `${name}.webp`);
    const meta = await sharp(src).metadata();

    for (const width of SRCSET_WIDTHS) {
      if (width >= meta.width) continue; // skip if wider than original
      const out = join(INPUT_DIR, `${name}-${width}w.webp`);
      await sharp(src).resize(width, null, { withoutEnlargement: true }).webp({ quality: 85 }).toFile(out);
      const size = (await stat(out)).size;
      console.log(`✓ ${name}-${width}w.webp  ${await formatSize(size)}`);
    }
  }
}

// ── Pass 3: Mobile half-res PBR map variants for Three.js ────────────────────
async function generateMobilePBRVariants() {
  console.log(`\nPass 3: Generating mobile PBR map variants (50% scale)\n`);

  for (const name of PBR_MAPS) {
    // Use original PNG as source for maximum fidelity on downscale
    const src = join(INPUT_DIR, `${name}.png`);
    const out = join(INPUT_DIR, `${name}-mobile.webp`);
    const meta = await sharp(src).metadata();
    const mobileWidth = Math.floor(meta.width / 2);

    await sharp(src).resize(mobileWidth, null).webp({ quality: 90 }).toFile(out);

    const srcSize = (await stat(src)).size;
    const outSize = (await stat(out)).size;
    const pct = Math.round(((srcSize - outSize) / srcSize) * 100);
    console.log(`✓ ${name}-mobile.webp  ${await formatSize(srcSize)} → ${await formatSize(outSize)} (-${pct}%)`);
  }
}

async function main() {
  const files = await findImages(INPUT_DIR);
  await convertToWebP(files);
  await generateSrcsetVariants();
  await generateMobilePBRVariants();
  console.log('\nDone.');
}

main().catch((e) => { console.error(e); process.exit(1); });
