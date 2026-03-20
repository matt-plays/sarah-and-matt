// Figma node: 265:5368

import BuildingIllustration from './BuildingIllustration';
import { EditableText } from './cms/EditableText';
import { HeroContent } from '@/types/content';
import defaultContent from '@/content/content.json';

interface HeroProps {
  content?: HeroContent;
}

export default function Hero({ content = defaultContent.hero }: HeroProps) {
  return (
    <section className="w-full bg-red-m-25 px-sp-lg py-sp-xl overflow-hidden">
      <div className="flex gap-sp-lg items-center w-full">

        {/* ── Invitation Card ─────────────────────────────── */}
        <div className="flex-1 flex items-center justify-center min-w-0">
          <div className="flex flex-col items-center gap-8 w-[min(480px,100%)]">

            {/* Ornamental rule */}
            <div className="w-full flex items-center gap-3">
              <div className="flex-1 h-px bg-cool-green-600 opacity-30" />
              <span className="font-dm text-fs-xs text-cool-green-600 tracking-[0.25em] uppercase font-bold">✦</span>
              <div className="flex-1 h-px bg-cool-green-600 opacity-30" />
            </div>

            {/* Name 1 */}
            <EditableText
              tag="p"
              path="hero.name1Full"
              multiline
              className="font-romie font-light italic text-cool-green-600 leading-none text-center w-full whitespace-pre-line"
              style={{ fontSize: 'clamp(56px, calc(28px + 5.8vw), 118px)' }}
            >
              {content.name1Full}
            </EditableText>

            {/* Date row */}
            <div className="flex items-center gap-3 w-full">
              <EditableText
                tag="span"
                path="hero.date"
                className="font-dm font-bold text-fs-xs text-cool-green-600 tracking-[0.12em] uppercase whitespace-nowrap font-dm-overline"
              >
                {content.date}
              </EditableText>
              <div className="flex-1 h-px bg-cool-green-600 opacity-40" />
              <EditableText
                tag="span"
                path="hero.year"
                className="font-dm font-bold text-fs-xs text-cool-green-600 tracking-[0.12em] uppercase whitespace-nowrap font-dm-overline"
              >
                {content.year}
              </EditableText>
            </div>

            {/* Ampersand + Name 2 */}
            <div className="flex items-center gap-8">
              {/* & in circle */}
              <div
                className="relative shrink-0 flex items-center justify-center"
                style={{ width: 'clamp(80px,12vw,180px)', height: 'clamp(80px,12vw,180px)' }}
              >
                <div className="absolute inset-0 rounded-full border border-cool-green-600 opacity-30" />
                <span
                  className="font-romie-trial italic text-yellow-s-300 leading-none"
                  style={{ fontSize: 'clamp(60px,10vw,134px)', fontFeatureSettings: "'ss01' 1" }}
                >
                  &amp;
                </span>
              </div>

              {/* Name 2 */}
              <EditableText
                tag="p"
                path="hero.name2Full"
                multiline
                className="font-romie font-light italic text-cool-green-600 leading-none whitespace-pre-line"
                style={{ fontSize: 'clamp(56px, calc(28px + 5.8vw), 118px)' }}
              >
                {content.name2Full}
              </EditableText>
            </div>

            {/* Time row */}
            <div className="flex items-center gap-3 w-full">
              <EditableText
                tag="span"
                path="hero.time1"
                className="font-dm font-bold text-fs-xs text-cool-green-600 tracking-[0.12em] uppercase whitespace-nowrap font-dm-overline"
              >
                {content.time1}
              </EditableText>
              <div className="flex-1 h-px bg-cool-green-600 opacity-40" />
              <EditableText
                tag="span"
                path="hero.time2"
                className="font-dm font-bold text-fs-xs text-cool-green-600 tracking-[0.12em] uppercase whitespace-nowrap font-dm-overline"
              >
                {content.time2}
              </EditableText>
            </div>

            {/* Venue address box */}
            <div className="w-full border border-cool-green-600 flex items-center gap-3 px-6 py-3">
              <EditableText
                tag="span"
                path="hero.venue"
                className="font-dm font-bold text-fs-xs text-cool-green-600 tracking-[0.12em] uppercase whitespace-nowrap font-dm-overline shrink-0"
              >
                {content.venue}
              </EditableText>
              <div className="flex-1 h-px bg-cool-green-600 opacity-30" />
              <EditableText
                tag="span"
                path="hero.address"
                className="font-dm font-bold text-fs-xs text-cool-green-600 tracking-[0.12em] uppercase whitespace-nowrap font-dm-overline shrink-0"
              >
                {content.address}
              </EditableText>
              <div className="flex-1 h-px bg-cool-green-600 opacity-30" />
              <EditableText
                tag="span"
                path="hero.city"
                className="font-dm font-bold text-fs-xs text-cool-green-600 tracking-[0.12em] uppercase whitespace-nowrap font-dm-overline shrink-0"
              >
                {content.city}
              </EditableText>
            </div>

            {/* URL */}
            <EditableText
              tag="span"
              path="hero.website"
              className="font-dm font-bold text-fs-xs text-cool-green-600 tracking-[0.12em] uppercase font-dm-overline"
            >
              {content.website}
            </EditableText>

            {/* Ornamental rule */}
            <div className="w-full flex items-center gap-3">
              <div className="flex-1 h-px bg-cool-green-600 opacity-30" />
              <span className="font-dm text-fs-xs text-cool-green-600 tracking-[0.25em] uppercase font-bold">✦</span>
              <div className="flex-1 h-px bg-cool-green-600 opacity-30" />
            </div>
          </div>
        </div>

        {/* ── Excelsior Building Illustration ─────────────── */}
        {/* Figma node 265:5416 — "Pass Through" blend mode approximated with opacity: 0.16 */}
        <div
          className="shrink-0 hidden lg:block opacity-[0.16]"
          style={{ width: 'min(850px, 45vw)', aspectRatio: '851/1610' }}
          aria-hidden="true"
        >
          <BuildingIllustration />
        </div>
      </div>
    </section>
  );
}
