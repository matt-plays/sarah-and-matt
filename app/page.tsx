import SiteNav from '@/components/SiteNav';
import Hero from '@/components/Hero';
import TimelineSection from '@/components/TimelineSection';
import TimelineGallery from '@/components/TimelineGallery';
import MarqueeText from '@/components/MarqueeText';
import CelebrationSection from '@/components/CelebrationSection';
import TravelSection from '@/components/TravelSection';
import RSVPSection from '@/components/RSVPSection';
import RegistrySection from '@/components/RegistrySection';
import SiteFooter from '@/components/SiteFooter';
import { getNotionContent } from '@/lib/notion';

// Revalidate page content from Notion every hour
export const revalidate = 3600;

export default async function Home() {
  const c = await getNotionContent();

  return (
    <main>
      {/* ① Sticky nav */}
      <SiteNav />

      {/* ② Hero */}
      <Hero />

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
        whereToStay={c.whereToStay}
        whereToEat={c.whereToEat}
        activities={c.activities}
      />

      {/* ⑧ RSVP */}
      <RSVPSection rsvp={c.rsvp} />

      {/* ⑨ Registry */}
      <RegistrySection registry={c.registry} />

      {/* ⑩ Footer */}
      <SiteFooter />
    </main>
  );
}
