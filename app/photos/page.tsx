import type { Metadata } from 'next'
import SiteNav from '@/components/SiteNav'
import SiteFooter from '@/components/SiteFooter'
import PhotosHero from '@/components/PhotosHero'
import PhotoGallerySection from '@/components/PhotoGallerySection'
import { getNotionContent } from '@/lib/notion'
import { FILM, PHOTO_BOOTH, PHOTO_BOOTH_URL, PHOTOGRAPHER, SELECTS } from '@/lib/photos'

// Figma node: 1418:11019. Not linked from the nav — shared directly as /photos.

export const metadata: Metadata = {
  title: 'Photos — Sarah & Matt',
  description: 'Photos from our wedding at Excelsior, Lancaster, PA.',
}

export const revalidate = 3600

const SHARE_CONTACTS = [
  { email: 'spetrokonis@gmail.com', phone: '(717) 330-4765', tel: '+17173304765' },
  { email: 'matt@mattplays.co', phone: '(401) 450-2133', tel: '+14014502133' },
]

const contactLink = 'text-[var(--theme-action)] hover:text-[var(--theme-action-hovered)] transition-colors'

export default async function PhotosPage() {
  const c = await getNotionContent()

  return (
    <main>
      <div className="relative">
        <PhotosHero />
        <SiteNav colophon={c.colophon} linkBase="/" postWedding />
      </div>

      <section
        id="galleries"
        className="w-full flex justify-center"
        style={{ backgroundColor: 'var(--clay-0)', paddingTop: 'var(--sp-2xl)', paddingBottom: 'var(--sp-2xl)' }}
      >
        <div className="site-container flex flex-col" style={{ gap: 'var(--mpds-space-xl)' }}>
          <PhotoGallerySection
            title="Five-star selects from"
            accent={PHOTOGRAPHER.handle}
            accentHref={PHOTOGRAPHER.url}
            photos={SELECTS}
          />
          <PhotoGallerySection
            title="Fun ones from"
            accent="the photo booth"
            accentHref={PHOTO_BOOTH_URL}
            photos={PHOTO_BOOTH}
            limit={12}
          />
          <PhotoGallerySection title="Snapshots from our disposable cameras" photos={FILM} limit={12} />

          {/* ── Share CTA — Figma node 1420:11397 ── */}
          <div className="flex flex-col xl:flex-row xl:items-end xl:justify-between" style={{ gap: 'var(--mpds-space-lg)' }}>
            <h2
              className="font-romie font-light text-[var(--theme-headline)] leading-none"
              style={{ fontSize: 'var(--mpds-font-size-10xl)' }}
            >
              Have photos<br />to share?
            </h2>
            <div
              className="font-instrument text-[var(--theme-text)] leading-[1.625] md:shrink-0"
              style={{ fontSize: 'var(--mpds-font-size-lg)', maxWidth: 512 }}
            >
              <p style={{ marginBottom: '1em' }}>Text or email them to Sarah or Matt—we’d love to see:</p>
              {SHARE_CONTACTS.map(({ email, phone, tel }) => (
                <p key={email}>
                  <a href={`mailto:${email}`} className={contactLink}>{email}</a>
                  {' / '}
                  <a href={`tel:${tel}`} className={contactLink}>{phone}</a>
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      <SiteFooter colophon={c.colophon} linkBase="/" postWedding />
    </main>
  )
}
