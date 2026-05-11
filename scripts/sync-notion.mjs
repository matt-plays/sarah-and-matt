// Fetches all Notion databases and writes content/content.json.
// Run with: node --env-file=.env.local scripts/sync-notion.mjs

import { Client } from '@notionhq/client'
import { writeFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __dir = dirname(fileURLToPath(import.meta.url))
const OUT = join(__dir, '../content/content.json')

const notion = new Client({ auth: process.env.NOTION_TOKEN })

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

function getTitle(page, key) {
  const p = page.properties[key]
  return p?.type === 'title' ? (p.title[0]?.plain_text ?? '') : ''
}
function getText(page, key) {
  const p = page.properties[key]
  return p?.type === 'rich_text' ? p.rich_text.map(r => r.plain_text ?? '').join('') : ''
}
function getNumber(page, key) {
  const p = page.properties[key]
  return p?.type === 'number' ? (p.number ?? 0) : 0
}
function getUrl(page, key) {
  const p = page.properties[key]
  return p?.type === 'url' ? (p.url ?? '') : ''
}
function getFirstHref(page, key) {
  const p = page.properties[key]
  if (p?.type !== 'rich_text') return ''
  for (const rt of p.rich_text) { if (rt.href) return rt.href }
  return ''
}
function getTextStripLinks(page, key) {
  const p = page.properties[key]
  if (p?.type !== 'rich_text') return ''
  return p.rich_text.filter(rt => !rt.href).map(rt => rt.plain_text ?? '').join('').trim()
}
function getRichTextSegments(page, key) {
  const p = page.properties[key]
  if (p?.type !== 'rich_text') return null
  const segs = p.rich_text.map(rt => ({ text: rt.plain_text ?? '', href: rt.href ?? undefined })).filter(s => s.text)
  return segs.some(s => s.href) ? segs : null
}

async function queryAll(dataSourceId) {
  const pages = []
  let cursor
  do {
    const res = await notion.dataSources.query({ data_source_id: dataSourceId, start_cursor: cursor, page_size: 100 })
    pages.push(...res.results)
    cursor = res.has_more ? (res.next_cursor ?? undefined) : undefined
  } while (cursor)
  return pages
}

function sortedMap(pages, mapFn) {
  return [...pages].sort((a, b) => getNumber(a, 'Sort Order') - getNumber(b, 'Sort Order')).map(mapFn)
}

console.log('Fetching from Notion...')

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

const info = {}
for (const page of siteInfoPages) {
  const key = getTitle(page, 'Key')
  const val = getText(page, 'Value')
  if (key) info[key] = val
}
const get = (key, def) => info[key] ?? def

const content = {
  story: sortedMap(storyPages, p => ({
    id:      p.id,
    year:    getText(p, 'Year'),
    heading: getTitle(p, 'Heading'),
    body:    getText(p, 'Body'),
  })),
  marquee: { text: get('marquee.text', 'Meet us in Lancaster, Pennsylvania') },
  celebration: {
    heading:     get('celebration.heading',     'Our Celebration'),
    description: get('celebration.description', ''),
    events: sortedMap(eventsPages, p => ({
      time:  getText(p, 'Time'),
      label: getTitle(p, 'Label'),
    })),
    infoRows: sortedMap(infoRowPages, p => {
      const segs = getRichTextSegments(p, 'Body')
      return {
        icon:         getText(p, 'Icon'),
        label:        getTitle(p, 'Label'),
        body:         getText(p, 'Body'),
        ...(segs ? { bodySegments: segs } : {}),
      }
    }),
    rsvpUrl:      get('celebration.rsvpUrl',      ''),
    venueUrl:     get('celebration.venueUrl',      ''),
    mainImage:    get('celebration.mainImage',     ''),
    overlayImage: get('celebration.overlayImage',  ''),
  },
  travel: {
    heading: get('travel.heading', 'Travel & Stay'),
    body:    get('travel.body',    ''),
  },
  whereToStay: sortedMap(stayPages, p => {
    const link = getUrl(p, 'Link') || getFirstHref(p, 'Body') || undefined
    return { overline: getText(p, 'Overline'), heading: getTitle(p, 'Heading'), body: link ? getTextStripLinks(p, 'Body') : getText(p, 'Body'), ...(link ? { link } : {}) }
  }),
  whereToEat: sortedMap(eatPages, p => {
    const link = getUrl(p, 'Link') || getFirstHref(p, 'Body') || undefined
    return { overline: getText(p, 'Overline'), heading: getTitle(p, 'Heading'), body: link ? getTextStripLinks(p, 'Body') : getText(p, 'Body'), ...(link ? { link } : {}) }
  }),
  activities: sortedMap(doPages, p => {
    const link = getUrl(p, 'Link') || getFirstHref(p, 'Body') || undefined
    return { overline: getText(p, 'Overline'), heading: getTitle(p, 'Heading'), body: link ? getTextStripLinks(p, 'Body') : getText(p, 'Body'), ...(link ? { link } : {}) }
  }),
  rsvp: {
    body: get('rsvp.body', ''),
    url:  get('rsvp.url',  ''),
  },
  registry: {
    heading:    get('registry.heading',    'Registry'),
    body:       get('registry.body',       ''),
    viewAllUrl: get('registry.viewAllUrl', ''),
    items: sortedMap(registryPages, p => ({
      name:        getTitle(p, 'Name'),
      url:         getUrl(p, 'userDefined:URL'),
      description: getText(p, 'Description'),
    })),
    photo: get('registry.photo', ''),
  },
  colophon: {
    definition: get('colophon.definition', ''),
    para1:      get('colophon.para1',      ''),
    para2:      get('colophon.para2',      ''),
    para3:      get('colophon.para3',      ''),
    para4:      get('colophon.para4',      ''),
  },
}

writeFileSync(OUT, JSON.stringify(content, null, 2) + '\n')
console.log(`✓ Written to content/content.json (${storyPages.length} story, ${eventsPages.length} events, ${stayPages.length} stay, ${eatPages.length} eat, ${doPages.length} do, ${registryPages.length} registry)`)
