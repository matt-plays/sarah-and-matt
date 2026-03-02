import Hero from "@/components/Hero";
import StorySection from "@/components/StorySection";
import PhotoGrid from "@/components/PhotoGrid";
import MarqueeText from "@/components/MarqueeText";
import TravelHeader from "@/components/TravelHeader";
import TravelSubSection from "@/components/TravelSubSection";
import RSVPSection from "@/components/RSVPSection";
import RegistrySection from "@/components/RegistrySection";
import SiteFooter from "@/components/SiteFooter";

// ─── Content Data ─────────────────────────────────────────────────

const whereToStay = [
  {
    overline: "Downtown Lancaster",
    heading: "Lancaster Marriott\nat Penn Square",
    body: "Centrally located with easy access to restaurants and shopping. Modern amenities and comfortable rooms in the heart of the city.",
  },
  {
    overline: "Downtown Lancaster",
    heading: "Cork Factory Hotel",
    body: "Unique boutique hotel in a historic brick building. Walking distance to local attractions and the best downtown dining.",
  },
  {
    overline: "Lancaster County",
    heading: "Fulton Steamboat Inn",
    body: "Distinctive hotel with steamboat-themed rooms. Family-friendly with plenty of amenities and a memorable stay.",
  },
  {
    overline: "Downtown Lancaster",
    heading: "The Warehouse Hotel",
    body: "A beautifully converted historic warehouse with a modern, local vibe. Great for extended stays and exploring the city.",
  },
];

const whereToEat = [
  {
    overline: "Downtown Lancaster",
    heading: "Central Market",
    body: "America's oldest continuously operating farmers market. Perfect for breakfast or lunch with dozens of local vendors under one roof.",
  },
  {
    overline: "Lancaster",
    heading: "The Belvedere Inn",
    body: "Upscale dining in a gorgeous Victorian mansion. Perfect for a special dinner out with an impressive wine list.",
  },
  {
    overline: "Downtown Lancaster",
    heading: "Luca",
    body: "Contemporary American cuisine with rotating seasonal menus. Outstanding cocktails and a warm, lively atmosphere.",
  },
  {
    overline: "East Earl · 20 min",
    heading: "Shady Maple\nSmorgasbord",
    body: "A massive Pennsylvania Dutch buffet and a true Lancaster County institution. Don't miss it.",
  },
  {
    overline: "Downtown Lancaster",
    heading: "Prince Street Cafe",
    body: "A beloved neighborhood cafe with exceptional coffee and fresh pastries. The ideal spot for a slow morning.",
  },
  {
    overline: "Intercourse · 20 min",
    heading: "Kitchen Kettle\nVillage",
    body: "A charming village complex with restaurants, jams, and local crafts. Great for browsing and a laid-back lunch.",
  },
];

const activities = [
  {
    overline: "Lancaster County",
    heading: "Amish Farm Tours",
    body: "Experience authentic Amish culture with guided tours of working farms and the beautiful Lancaster countryside.",
  },
  {
    overline: "Strasburg · 15 min",
    heading: "Strasburg Rail Road",
    body: "America's oldest operating railroad. Take a scenic steam-powered train ride through Amish farmland and rolling hills.",
  },
  {
    overline: "Lancaster",
    heading: "Long's Park",
    body: "A beautiful public park perfect for walking, picnics, and summer concerts. Peaceful and family-friendly.",
  },
  {
    overline: "Lancaster",
    heading: "Landis Valley Village\n& Farm Museum",
    body: "A living history museum showcasing Pennsylvania German rural life, trades, and traditions across 100 acres.",
  },
  {
    overline: "Downtown Lancaster",
    heading: "Arts & Shopping\nDowntown",
    body: "Explore galleries, boutiques, antique shops, and Lancaster's vibrant arts scene — all walkable from the center.",
  },
  {
    overline: "Intercourse · 20 min",
    heading: "Kitchen Kettle\nVillage",
    body: "Beyond dining — shop for locally made goods, watch artisan demonstrations, and soak in the countryside charm.",
  },
];

// ─── Page ─────────────────────────────────────────────────────────

export default function Home() {
  return (
    <main>
      {/* ① Hero — invitation card + building illustration */}
      <Hero />

      {/* ② Our Story — horizontal bleeding timeline */}
      <StorySection />

      {/* ③ Photo grid — two landscape photos */}
      <PhotoGrid />

      {/* ④ Marquee overflow text */}
      <MarqueeText />

      {/* ⑤ "Travel & Stay" display heading + intro */}
      <TravelHeader />

      {/* ⑥ Where to Stay — 2×2 card grid */}
      <TravelSubSection heading="Where to stay" cards={whereToStay} />

      {/* ⑦ Where to Eat — 2×3 card grid */}
      <TravelSubSection heading="Where to eat" cards={whereToEat} />

      {/* ⑧ Activities — 2×3 card grid */}
      <TravelSubSection heading="Activities" cards={activities} />

      {/* ⑨ RSVP — dark green section */}
      <RSVPSection />

      {/* ⑩ Registry — dark brown section */}
      <RegistrySection />

      {/* ⑪ Footer */}
      <SiteFooter />
    </main>
  );
}
