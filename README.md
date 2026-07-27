# Sarah & Matt

The wedding website for Sarah and Matt—a single-page site built with Next.js, with content managed in Notion and design tokens pulled from [MPDS](https://github.com/matt-plays/mpds). Deployed on Vercel.

## Stack

- **Next.js 15** (App Router) with **React 19** and TypeScript
- **Tailwind CSS 3** with container queries, layered over MPDS design tokens
- **Three.js** for the interactive hero invitation card (PBR textures: normal, ambient, specular, displacement maps)
- **Notion** as the CMS, via `@notionhq/client`
- **Vercel Analytics**

## Getting started

```bash
npm install
npm run dev
```

`npm install` runs a `postinstall` step ([scripts/build-mpds-tokens.mjs](scripts/build-mpds-tokens.mjs)) that generates the `@mattplays/mpds` token CSS from the token source on GitHub.

The site runs without any environment variables—content falls back to the committed snapshot in [content/content.json](content/content.json). To pull live content from Notion, add a `.env.local` with:

```
NOTION_TOKEN=<your Notion integration token>
```

## Content pipeline

All copy—story timeline, celebration details, travel recommendations, RSVP, registry—lives in Notion databases. It reaches the site two ways:

- **At runtime:** [lib/notion.ts](lib/notion.ts) queries the Notion data sources during rendering, with ISR revalidation every hour (`revalidate = 3600` in [app/page.tsx](app/page.tsx)). If Notion is unreachable, it falls back to the JSON snapshot.
- **As a snapshot:** `npm run sync` ([scripts/sync-notion.mjs](scripts/sync-notion.mjs)) fetches every database and rewrites `content/content.json`. Run it occasionally so the fallback stays current.

## Page structure

One page, in order: Hero (with inline nav) → Timeline → Photo gallery → Our Celebration → Marquee → Travel & Stay → RSVP → Registry → Footer. Below-the-fold sections are dynamically imported; the Three.js hero is deferred.

## Theme system

The site changes its palette as you scroll. [context/ThemeContext.tsx](context/ThemeContext.tsx) lets each section register itself with a theme (`default`, `maroon`, `green`, `taupe`, `slate`, `footer`, `brand-og`); an IntersectionObserver activates the theme of the section in view and CSS variables transition the whole page.

## Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Start the dev server |
| `npm run build` | Production build |
| `npm run lint` | ESLint via `next lint` |
| `npm run sync` | Refresh `content/content.json` from Notion (needs `NOTION_TOKEN`) |
| `npm run optimize` | Convert `public/images` to WebP, generate responsive srcset variants and mobile half-res PBR textures ([scripts/optimize-images.mjs](scripts/optimize-images.mjs)) |
