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
import content from '@/content/content.json';
import { SiteContent } from '@/types/content';

const c = content as SiteContent;

// ─── Page ─────────────────────────────────────────────────────────

export default function Home() {
  return (
    <main>
      {/* ① Sticky nav — must be before Hero (Hero has overflow-hidden which breaks sticky) */}
      <SiteNav />

      {/* ② Hero — invitation card + building illustration */}
      <Hero />

      {/* ③ Timeline — "A tale as old as time" horizontal scroll */}
      <TimelineSection />

      {/* ④ Photo gallery — auto-scrolling looping strip */}
      <TimelineGallery />

      {/* ⑤ Marquee overflow text */}
      <MarqueeText text={c.marquee.text} />

      {/* ⑥ Our Celebration — dark burgundy section with venue + event details */}
      <CelebrationSection content={c.celebration} />

      {/* ⑦ Travel & Stay — category nav + card grid + CMYK shader bg */}
      <TravelSection />

      {/* ⑧ RSVP — green theme + photo strip */}
      <RSVPSection />

      {/* ⑨ Registry — taupe theme + photo */}
      <RegistrySection />

      {/* ⑩ Footer — dark footer theme */}
      <SiteFooter />
    </main>
  );
}
