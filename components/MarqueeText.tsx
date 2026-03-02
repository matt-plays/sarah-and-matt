'use client';
// Figma node: 265:6227
// Scroll-scrubbed display text.
// On entry the left edge of "Lancaster," is visible; as the user scrolls the visible
// window sweeps left → right, ending on "...Pennsylvania".
// Image fill is clipped to the text glyphs via background-clip: text.
// NOTE: Figma asset URL expires ~7 days from generation — replace with a permanent export.

import { useEffect, useRef } from 'react';

const imgFill =
  'https://www.figma.com/api/mcp/asset/f78d6c53-237f-405a-8ba2-f4cab9850579';

export default function MarqueeText() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef    = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const text    = textRef.current;
    if (!section || !text) return;

    const handleScroll = () => {
      const rect     = section.getBoundingClientRect();
      const vh       = window.innerHeight;

      // 0 = section bottom just entered the viewport from below
      // 1 = section top just exited the viewport above
      const raw      = 1 - rect.bottom / (vh + rect.height);
      const progress = Math.max(0, Math.min(1, raw));

      const overflow = Math.max(0, text.scrollWidth - window.innerWidth);

      // Sweep left → right: translateX moves from 0 → -overflow
      text.style.transform = `translateX(${-overflow * progress}px)`;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // set correct position on mount / fast-refresh
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="w-full overflow-hidden pb-sp-2xl"
      aria-hidden="true"
    >
      <p
        ref={textRef}
        className="font-romie-trial font-light italic whitespace-nowrap leading-none"
        style={{
          fontSize:           'clamp(96px, 22vw, 320px)',
          backgroundImage:    `url('${imgFill}'), linear-gradient(90deg, rgb(220, 211, 202) 0%, rgb(220, 211, 202) 100%)`,
          backgroundSize:     'cover, auto auto',
          backgroundRepeat:   'no-repeat, repeat',
          backgroundPosition: 'center, top left',
          WebkitBackgroundClip: 'text',
          backgroundClip:     'text',
          color:              'transparent',
          willChange:         'transform',
        }}
      >
        Beautiful Lancaster, Pennsylvania
      </p>
    </section>
  );
}
