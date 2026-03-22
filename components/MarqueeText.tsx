'use client';
// Figma node: 265:6227
// Constant auto-scrolling display text with image fill clipped to glyphs.

import { useEffect, useRef } from 'react';
import defaultContent from '@/content/content.json';

const imgFill = '/images/lancaster-bg.jpg';

interface MarqueeTextProps {
  text?: string;
}

export default function MarqueeText({ text = defaultContent.marquee.text }: MarqueeTextProps) {
  const stripRef = useRef<HTMLDivElement>(null);
  const animRef = useRef<number>(0);

  const SPEED = 0.6; // px per frame

  useEffect(() => {
    const strip = stripRef.current;
    if (!strip) return;

    // Wait a frame for layout so scrollWidth is accurate
    requestAnimationFrame(() => {
      const setWidth = strip.scrollWidth / 2;

      let offset = 0;
      const tick = () => {
        offset += SPEED;
        if (offset >= setWidth) offset -= setWidth;
        strip.style.transform = `translateX(${-offset}px)`;
        animRef.current = requestAnimationFrame(tick);
      };
      animRef.current = requestAnimationFrame(tick);
    });

    return () => { if (animRef.current) cancelAnimationFrame(animRef.current); };
  }, []);

  const textStyle: React.CSSProperties = {
    fontSize:             'clamp(64px, 22vw, 320px)',
    paddingBottom:        '0.2em',
    backgroundImage:      `url('${imgFill}'), linear-gradient(90deg, rgb(220, 211, 202) 0%, rgb(220, 211, 202) 100%)`,
    backgroundSize:       'cover, auto auto',
    backgroundRepeat:     'no-repeat, repeat',
    backgroundPosition:   'center, top left',
    WebkitBackgroundClip: 'text',
    backgroundClip:       'text',
    color:                'transparent',
  };

  return (
    <section
      data-theme="default"
      className="w-full overflow-hidden pt-6 pb-sp-2xl"
      aria-hidden="true"
    >
      <div
        ref={stripRef}
        className="flex whitespace-nowrap"
        style={{ willChange: 'transform' }}
      >
        {/* Render text twice for seamless loop */}
        <p
          className="font-romie font-light italic whitespace-nowrap leading-none shrink-0"
          style={{ ...textStyle, paddingRight: '0.5em' }}
        >
          {text}
        </p>
        <p
          className="font-romie font-light italic whitespace-nowrap leading-none shrink-0"
          style={{ ...textStyle, paddingRight: '0.5em' }}
        >
          {text}
        </p>
      </div>
    </section>
  );
}
