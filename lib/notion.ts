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
  if (prop?.type === 'rich_text') return prop.rich_text[0]?.plain_text ?? ''
  return ''
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

    // Build flat key→value map from the Site Info database
    const info: Record<string, string> = {}
    for (const page of siteInfoPages) {
      const key = getTitle(page, 'Key')
      const val = getText(page, 'Value')
      if (key) info[key] = val
    }

    const get = (key: string, def: string) => info[key] ?? def

    return {
      hero: {
        name1Full: get('hero.name1Full', fallback.hero.name1Full),
        name2Full: get('hero.name2Full', fallback.hero.name2Full),
        date:      get('hero.date',      fallback.hero.date),
        year:      get('hero.year',      fallback.hero.year),
        time1:     get('hero.time1',     fallback.hero.time1),
        time2:     get('hero.time2',     fallback.hero.time2),
        venue:     get('hero.venue',     fallback.hero.venue),
        address:   get('hero.address',   fallback.hero.address),
        city:      get('hero.city',      fallback.hero.city),
        website:   get('hero.website',   fallback.hero.website),
      },
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
        eventDetails: get('celebration.eventDetails', fallback.celebration.eventDetails),
        infoRows: sortedMap(infoRowPages, (p) => ({
          icon:  getText(p, 'Icon'),
          label: getTitle(p, 'Label'),
          body:  getText(p, 'Body'),
        })),
        rsvpUrl:      get('celebration.rsvpUrl',      fallback.celebration.rsvpUrl),
        venueUrl:     get('celebration.venueUrl',     fallback.celebration.venueUrl),
        mainImage:    get('celebration.mainImage',    fallback.celebration.mainImage),
        overlayImage: get('celebration.overlayImage', fallback.celebration.overlayImage),
      },
      travel: {
        heading: get('travel.heading', fallback.travel.heading),
        body:    get('travel.body',    fallback.travel.body),
      },
      whereToStay: sortedMap(stayPages, (p) => ({
        overline: getText(p, 'Overline'),
        heading:  getTitle(p, 'Heading'),
        body:     getText(p, 'Body'),
      })),
      whereToEat: sortedMap(eatPages, (p) => ({
        overline: getText(p, 'Overline'),
        heading:  getTitle(p, 'Heading'),
        body:     getText(p, 'Body'),
      })),
      activities: sortedMap(doPages, (p) => ({
        overline: getText(p, 'Overline'),
        heading:  getTitle(p, 'Heading'),
        body:     getText(p, 'Body'),
      })),
      rsvp: {
        heading:  get('rsvp.heading',  fallback.rsvp.heading),
        body:     get('rsvp.body',     fallback.rsvp.body),
        deadline: get('rsvp.deadline', fallback.rsvp.deadline),
        url:      get('rsvp.url',      fallback.rsvp.url),
      },
      registry: {
        heading:    get('registry.heading',    fallback.registry.heading),
        subheading: get('registry.subheading', fallback.registry.subheading),
        body:       get('registry.body',       fallback.registry.body),
        viewAllUrl: get('registry.viewAllUrl', fallback.registry.viewAllUrl),
        items: sortedMap(registryPages, (p) => ({
          name:        getTitle(p, 'Name'),
          url:         getUrl(p, 'userDefined:URL'),
          description: getText(p, 'Description'),
        })),
        photo: get('registry.photo', fallback.registry.photo),
      },
      footer: {
        names: get('footer.names', fallback.footer.names),
        date:  get('footer.date',  fallback.footer.date),
      },
    }
  } catch (err) {
    console.error('[notion] Failed to fetch content, falling back to local JSON:', err)
    return fallback as SiteContent
  }
}
