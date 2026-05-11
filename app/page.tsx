import dynamic from 'next/dynamic'
import SiteNav from '@/components/SiteNav';
import Hero from '@/components/Hero';
import TimelineSection from '@/components/TimelineSection';
import TimelineGallery from '@/components/TimelineGallery';
import MarqueeText from '@/components/MarqueeText';
import { getNotionContent } from '@/lib/notion';

const CelebrationSection = dynamic(() => import('@/components/CelebrationSection'))
const TravelSection = dynamic(() => import('@/components/TravelSection'))
const RSVPSection = dynamic(() => import('@/components/RSVPSection'))
const RegistrySection = dynamic(() => import('@/components/RegistrySection'))
const SiteFooter = dynamic(() => import('@/components/SiteFooter'))

// Revalidate page content from Notion every hour
export const revalidate = 3600;

export default async function Home() {
  const c = await getNotionContent();

  return (
    <main>
      {/* ① Hero + inline nav wrapper */}
      <div className="relative" style={{ marginBottom: 'var(--sp-2xl)' }}>
        <Hero />
        <SiteNav />
      </div>

      {/* ③ Timeline */}
      <TimelineSection story={c.story} />

      {/* ④ Photo gallery */}
      <TimelineGallery />

      {/* ⑤ Marquee */}
      <MarqueeText text={c.marquee.text} />

      {/* ⑥ Our Celebration */}
      <CelebrationSection content={c.celebration} />

      {/* ⑦ Travel & Stay */}
      <TravelSection
        heading={c.travel.heading}
        body={c.travel.body}
        whereToStayFineprint={c.travel.whereToStayFineprint}
        whereToStayFineprintSegments={c.travel.whereToStayFineprintSegments}
        whereToStay={c.whereToStay}
        whereToEat={c.whereToEat}
        activities={c.activities}
      />

      {/* ⑧ RSVP */}
      <RSVPSection rsvp={c.rsvp} />

      {/* ⑨ Registry */}
      <RegistrySection registry={c.registry} />

      {/* ⑩ Footer */}
      <SiteFooter colophon={c.colophon} />
    </main>
  );
}
