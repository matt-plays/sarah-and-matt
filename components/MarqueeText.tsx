'use client';
// Figma node: 265:6227
// Scroll-scrubbed display text with image fill clipped to glyphs.

import { useEffect, useRef } from 'react';
import defaultContent from '@/content/content.json';

const imgFill = '/images/lancaster-bg.jpg';

interface MarqueeTextProps {
  text?: string;
}

export default function MarqueeText({ text = defaultContent.marquee.text }: MarqueeTextProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef    = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const textEl  = textRef.current;
    if (!section || !textEl) return;

    const handleScroll = () => {
      const rect     = section.getBoundingClientRect();
      const vh       = window.innerHeight;
      const raw      = 1 - rect.bottom / (vh + rect.height);
      const progress = Math.max(0, Math.min(1, raw));
      const overflow = Math.max(0, textEl.scrollWidth - window.innerWidth);
      textEl.style.transform = `translateX(${-overflow * progress}px)`;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="w-full overflow-hidden pt-6 pb-sp-2xl"
      aria-hidden="true"
    >
      <p
        ref={textRef}
        className="font-romie font-light italic whitespace-nowrap leading-none inline-block"
        style={{
          fontSize:             'clamp(96px, 22vw, 320px)',
          paddingBottom:        '0.2em',
          backgroundImage:      `url('${imgFill}'), linear-gradient(90deg, rgb(220, 211, 202) 0%, rgb(220, 211, 202) 100%)`,
          backgroundSize:       'cover, auto auto',
          backgroundRepeat:     'no-repeat, repeat',
          backgroundPosition:   'center, top left',
          WebkitBackgroundClip: 'text',
          backgroundClip:       'text',
          color:                'transparent',
          willChange:           'transform',
        }}
      >
        {text}
      </p>
    </section>
  );
}
