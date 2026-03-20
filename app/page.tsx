import SiteNav from '@/components/SiteNav';
import Hero from '@/components/Hero';
import StorySection from '@/components/StorySection';
import PhotoGrid from '@/components/PhotoGrid';
import MarqueeText from '@/components/MarqueeText';
import CelebrationSection from '@/components/CelebrationSection';
import TravelHeader from '@/components/TravelHeader';
import TravelSubSection from '@/components/TravelSubSection';
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
      <Hero content={c.hero} />

      {/* ③ Our Story — horizontal bleeding timeline */}
      <StorySection cards={c.story} />

      {/* ④ Photo grid — 5-photo engagement strip */}
      <PhotoGrid />

      {/* ⑤ Marquee overflow text */}
      <MarqueeText text={c.marquee.text} />

      {/* ⑥ Our Celebration — dark burgundy section with venue + event details */}
      <CelebrationSection content={c.celebration} />

      {/* ⑦ "Travel & Stay" display heading + intro */}
      <TravelHeader content={c.travel} />

      {/* ⑧ Where to Stay — 2×2 card grid */}
      <TravelSubSection heading="Where to stay" cards={c.whereToStay} />

      {/* ⑨ Where to Eat — 2×3 card grid + food photo */}
      <TravelSubSection
        heading="Where to eat"
        cards={c.whereToEat}
        decorativeImage="/images/food-pasta.jpg"
        decorativeImageAlt="Local Lancaster dining"
        decorativeStyle="photo"
      />

      {/* ⑩ Activities — 2×3 card grid + sketch illustration */}
      <TravelSubSection
        heading="Activities"
        cards={c.activities}
        decorativeImage="/images/lancaster-sketch.jpg"
        decorativeImageAlt="Lancaster architecture illustration"
        decorativeStyle="sketch"
      />

      {/* ⑪ RSVP — dark green section + photo strip */}
      <RSVPSection content={c.rsvp} />

      {/* ⑫ Registry — dark brown section */}
      <RegistrySection content={c.registry} />

      {/* ⑬ Footer */}
      <SiteFooter content={c.footer} />
    </main>
  );
}
