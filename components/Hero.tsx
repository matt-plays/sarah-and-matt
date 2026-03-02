// Figma node: 265:5368

import BuildingIllustration from "./BuildingIllustration";

export default function Hero() {
  return (
    <section className="w-full bg-red-m-25 px-sp-lg py-sp-xl overflow-hidden">
      <div className="flex gap-sp-lg items-center w-full">

        {/* ── Invitation Card ─────────────────────────────── */}
        <div className="flex-1 flex items-center justify-center min-w-0">
          <div className="flex flex-col items-center gap-8 w-[min(480px,100%)]">

            {/* Ornamental rule */}
            <div className="w-full flex items-center gap-3">
              <div className="flex-1 h-px bg-cool-green-600 opacity-30" />
              <span className="font-dm text-fs-xs text-cool-green-600 tracking-[0.25em] uppercase font-bold">
                ✦
              </span>
              <div className="flex-1 h-px bg-cool-green-600 opacity-30" />
            </div>

            {/* Sarah Petrokonis */}
            <p
              className="font-romie font-light italic text-cool-green-600 leading-none text-center w-full"
              style={{ fontSize: "clamp(56px, calc(28px + 5.8vw), 118px)" }}
            >
              Sarah<br />Petrokonis
            </p>

            {/* Date row */}
            <div className="flex items-center gap-3 w-full">
              <span className="font-dm font-bold text-fs-xs text-cool-green-600 tracking-[0.12em] uppercase whitespace-nowrap font-dm-overline">
                Friday, August 28th
              </span>
              <div className="flex-1 h-px bg-cool-green-600 opacity-40" />
              <span className="font-dm font-bold text-fs-xs text-cool-green-600 tracking-[0.12em] uppercase whitespace-nowrap font-dm-overline">
                2026
              </span>
            </div>

            {/* Ampersand + Matt Plays */}
            <div className="flex items-center gap-8">
              {/* & in circle */}
              <div className="relative shrink-0 flex items-center justify-center"
                style={{ width: "clamp(80px,12vw,180px)", height: "clamp(80px,12vw,180px)" }}>
                <div className="absolute inset-0 rounded-full border border-cool-green-600 opacity-30" />
                <span
                  className="font-romie-trial italic text-yellow-s-300 leading-none"
                  style={{
                    fontSize: "clamp(60px,10vw,134px)",
                    fontFeatureSettings: "'ss01' 1",
                  }}
                >
                  &amp;
                </span>
              </div>

              {/* Matt Plays */}
              <p
                className="font-romie font-light italic text-cool-green-600 leading-none"
                style={{ fontSize: "clamp(56px, calc(28px + 5.8vw), 118px)" }}
              >
                Matt<br />Plays
              </p>
            </div>

            {/* Time row */}
            <div className="flex items-center gap-3 w-full">
              <span className="font-dm font-bold text-fs-xs text-cool-green-600 tracking-[0.12em] uppercase whitespace-nowrap font-dm-overline">
                5 o&apos;clock
              </span>
              <div className="flex-1 h-px bg-cool-green-600 opacity-40" />
              <span className="font-dm font-bold text-fs-xs text-cool-green-600 tracking-[0.12em] uppercase whitespace-nowrap font-dm-overline">
                in the afternoon
              </span>
            </div>

            {/* Venue address box */}
            <div className="w-full border border-cool-green-600 flex items-center gap-3 px-6 py-3">
              <span className="font-dm font-bold text-fs-xs text-cool-green-600 tracking-[0.12em] uppercase whitespace-nowrap font-dm-overline shrink-0">
                Excelsior
              </span>
              <div className="flex-1 h-px bg-cool-green-600 opacity-30" />
              <span className="font-dm font-bold text-fs-xs text-cool-green-600 tracking-[0.12em] uppercase whitespace-nowrap font-dm-overline shrink-0">
                125 E King Street
              </span>
              <div className="flex-1 h-px bg-cool-green-600 opacity-30" />
              <span className="font-dm font-bold text-fs-xs text-cool-green-600 tracking-[0.12em] uppercase whitespace-nowrap font-dm-overline shrink-0">
                Lancaster, PA
              </span>
            </div>

            {/* URL */}
            <span className="font-dm font-bold text-fs-xs text-cool-green-600 tracking-[0.12em] uppercase font-dm-overline">
              sarahandmatt.wedding
            </span>

            {/* Ornamental rule */}
            <div className="w-full flex items-center gap-3">
              <div className="flex-1 h-px bg-cool-green-600 opacity-30" />
              <span className="font-dm text-fs-xs text-cool-green-600 tracking-[0.25em] uppercase font-bold">
                ✦
              </span>
              <div className="flex-1 h-px bg-cool-green-600 opacity-30" />
            </div>
          </div>
        </div>

        {/* ── Excelsior Building Illustration ─────────────── */}
        {/* Figma node 265:5416 — "Pass Through" blend mode has no CSS equivalent;
            approximated with opacity: 0.16 on the container (closest CSS analogue). */}
        <div
          className="shrink-0 hidden lg:block opacity-[0.16]"
          style={{ width: "min(850px, 45vw)", aspectRatio: "851/1610" }}
          aria-hidden="true"
        >
          <BuildingIllustration />
        </div>
      </div>
    </section>
  );
}
