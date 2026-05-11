import { Client } from '@notionhq/client'
import type { SiteContent } from '@/types/content'
import fallback from '@/content/content.json'

const notion = new Client({ auth: process.env.NOTION_TOKEN })

// ─── Data Source IDs (collection UUIDs, not database page IDs) ────────────────

const DB = {
  siteInfo:          'e4a244f1-b6ea-4db2-acfe-fd3f0e7fb311',
  story:             '6e809962-09ad-4203-8d0f-b6df8f004b90',
  celebrationEvents: 'f9ffb26b-ffab-40e5-a921-30e2ea36bddb',
  celebrationInfo:   '49a6db8e-cda7-42f9-b557-3b5b08b5e298',
  whereToStay:       'a25364d2-193f-49e4-a4fd-60c570054cb7',
  whereToEat:        'df5af792-8cb5-47b1-9ae7-d12a545fb4cf',
  thingsToDo:        'f5430baa-6e5c-40af-87dd-f6d98ca56c47',
  registry:          '9c7d137b-a5a4-4ee7-9d56-486ed9c99628',
}

// ─── Page shape (v5 dataSources.query response) ───────────────────────────────

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type NotionPage = any

// ─── Property helpers ─────────────────────────────────────────────────────────

function getTitle(page: NotionPage, key: string): string {
  const prop = page.properties[key]
  if (prop?.type === 'title') return prop.title[0]?.plain_text ?? ''
  return ''
}

function getText(page: NotionPage, key: string): string {
  const prop = page.properties[key]
  if (prop?.type === 'rich_text') return prop.rich_text.map((rt: NotionPage) => rt.plain_text ?? '').join('')
  return ''
}

// Returns rich-text segments with optional href — null if no links present (plain text only).
function getRichTextSegments(page: NotionPage, key: string): { text: string; href?: string }[] | null {
  const prop = page.properties[key]
  if (prop?.type !== 'rich_text') return null
  const segments = prop.rich_text
    .map((rt: NotionPage) => ({ text: rt.plain_text ?? '', href: rt.href ?? undefined }))
    .filter((s: { text: string }) => s.text)
  return segments.some((s: { href?: string }) => s.href) ? segments : null
}

function getNumber(page: NotionPage, key: string): number {
  const prop = page.properties[key]
  if (prop?.type === 'number') return prop.number ?? 0
  return 0
}

function getUrl(page: NotionPage, key: string): string {
  const prop = page.properties[key]
  if (prop?.type === 'url') return prop.url ?? ''
  return ''
}

// Returns the first href found in a rich_text property — used as a fallback link
// when inline Notion links haven't yet been migrated to a dedicated Link URL field.
function getFirstHref(page: NotionPage, key: string): string {
  const prop = page.properties[key]
  if (prop?.type !== 'rich_text') return ''
  for (const rt of prop.rich_text) {
    if (rt.href) return rt.href
  }
  return ''
}

// Returns plain text from a rich_text property, stripping any segments that carry
// an inline href — used to remove URL text that has been migrated to the Link field.
function getTextStripLinks(page: NotionPage, key: string): string {
  const prop = page.properties[key]
  if (prop?.type !== 'rich_text') return ''
  return prop.rich_text
    .filter((rt: NotionPage) => !rt.href)
    .map((rt: NotionPage) => rt.plain_text ?? '')
    .join('')
    .trim()
}

// ─── Query helpers ────────────────────────────────────────────────────────────

async function queryAll(dataSourceId: string): Promise<NotionPage[]> {
  const pages: NotionPage[] = []
  let cursor: string | undefined
  do {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const res = await (notion.dataSources as any).query({
      data_source_id: dataSourceId,
      start_cursor: cursor,
      page_size: 100,
    })
    pages.push(...res.results)
    cursor = res.has_more ? (res.next_cursor ?? undefined) : undefined
  } while (cursor)
  return pages
}

function sortedMap<T>(pages: NotionPage[], map: (p: NotionPage) => T): T[] {
  return [...pages]
    .sort((a, b) => getNumber(a, 'Sort Order') - getNumber(b, 'Sort Order'))
    .map(map)
}

// ─── Main export ──────────────────────────────────────────────────────────────

export async function getNotionContent(): Promise<SiteContent> {
  try {
    const [siteInfoPages, storyPages, eventsPages, infoRowPages, stayPages, eatPages, doPages, registryPages] =
      await Promise.all([
        queryAll(DB.siteInfo),
        queryAll(DB.story),
        queryAll(DB.celebrationEvents),
        queryAll(DB.celebrationInfo),
        queryAll(DB.whereToStay),
        queryAll(DB.whereToEat),
        queryAll(DB.thingsToDo),
        queryAll(DB.registry),
      ])

    // Build flat key→value maps from the Site Info database (plain text + rich text)
    const info: Record<string, string> = {}
    const infoRich: Record<string, { text: string; href?: string }[]> = {}
    for (const page of siteInfoPages) {
      const key = getTitle(page, 'Key')
      const val = getText(page, 'Value')
      if (key) info[key] = val
      const segs = getRichTextSegments(page, 'Value')
      if (key && segs) infoRich[key] = segs
    }

    const get = (key: string, def: string) => info[key] ?? def

    return {
      story: sortedMap(storyPages, (p) => ({
        id:      p.id,
        year:    getText(p, 'Year'),
        heading: getTitle(p, 'Heading'),
        body:    getText(p, 'Body'),
      })),
      marquee: { text: get('marquee.text', fallback.marquee.text) },
      celebration: {
        heading:     get('celebration.heading',     fallback.celebration.heading),
        description: get('celebration.description', fallback.celebration.description),
        events: sortedMap(eventsPages, (p) => ({
          time:  getText(p, 'Time'),
          label: getTitle(p, 'Label'),
        })),
        infoRows: sortedMap(infoRowPages, (p) => ({
          icon:         getText(p, 'Icon'),
          label:        getTitle(p, 'Label'),
          body:         getText(p, 'Body'),
          bodySegments: getRichTextSegments(p, 'Body') ?? undefined,
        })),
        rsvpUrl:      get('celebration.rsvpUrl',      fallback.celebration.rsvpUrl),
        venueUrl:     get('celebration.venueUrl',     fallback.celebration.venueUrl),
        mainImage:    get('celebration.mainImage',    fallback.celebration.mainImage),
        overlayImage: get('celebration.overlayImage', fallback.celebration.overlayImage),
      },
      travel: {
        heading:                       get('travel.heading',              fallback.travel.heading),
        body:                          get('travel.body',                 fallback.travel.body),
        whereToStayFineprint:          get('travel.whereToStayFineprint', fallback.travel.whereToStayFineprint),
        whereToStayFineprintSegments:  infoRich['travel.whereToStayFineprint'],
      },
      whereToStay: sortedMap(stayPages, (p) => {
        const link = getUrl(p, 'Link') || getFirstHref(p, 'Body') || undefined
        return {
          overline: getText(p, 'Overline'),
          heading:  getTitle(p, 'Heading'),
          body:     link ? getTextStripLinks(p, 'Body') : getText(p, 'Body'),
          link,
        }
      }),
      whereToEat: sortedMap(eatPages, (p) => {
        const link = getUrl(p, 'Link') || getFirstHref(p, 'Body') || undefined
        return {
          overline: getText(p, 'Overline'),
          heading:  getTitle(p, 'Heading'),
          body:     link ? getTextStripLinks(p, 'Body') : getText(p, 'Body'),
          link,
        }
      }),
      activities: sortedMap(doPages, (p) => {
        const link = getUrl(p, 'Link') || getFirstHref(p, 'Body') || undefined
        return {
          overline: getText(p, 'Overline'),
          heading:  getTitle(p, 'Heading'),
          body:     link ? getTextStripLinks(p, 'Body') : getText(p, 'Body'),
          link,
        }
      }),
      rsvp: {
        body: get('rsvp.body', fallback.rsvp.body),
        url:  get('rsvp.url',  fallback.rsvp.url),
      },
      registry: {
        heading:    get('registry.heading',    fallback.registry.heading),
        body:       get('registry.body',       fallback.registry.body),
        viewAllUrl: get('registry.viewAllUrl', fallback.registry.viewAllUrl),
        items: sortedMap(registryPages, (p) => ({
          name:        getTitle(p, 'Name'),
          url:         getUrl(p, 'userDefined:URL'),
          description: getText(p, 'Description'),
        })),
        photo: get('registry.photo', fallback.registry.photo),
      },
      colophon: {
        definition:    get('colophon.definition', fallback.colophon.definition),
        para1:         get('colophon.para1',      fallback.colophon.para1),
        para2:         get('colophon.para2',      fallback.colophon.para2),
        para2Segments: infoRich['colophon.para2'],
        para3:         get('colophon.para3',      fallback.colophon.para3),
        para3Segments: infoRich['colophon.para3'],
        para4:         get('colophon.para4',      fallback.colophon.para4),
        para4Segments: infoRich['colophon.para4'],
      },
    }
  } catch (err) {
    console.error('[notion] Failed to fetch content, falling back to local JSON:', err)
    return fallback as SiteContent
  }
}
