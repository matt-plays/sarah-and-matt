// Figma node: 265:6260 + 214:1140

export default function SiteFooter() {
  return (
    <footer className="w-full flex flex-col items-center gap-6 py-sp-2xl bg-clay-0">

      {/* "Sarah & Matt" display */}
      <p
        className="font-romie font-light italic text-cool-green-600 leading-none text-center"
        style={{ fontSize: "var(--fs-11xl)" }}
        aria-label="Sarah &amp; Matt"
      >
        Sarah &amp; Matt
      </p>

      {/* Gold ornamental flourish — GansClassicFleurons "Y" glyph equiv. */}
      {/* Replace with the exported SVG from Figma node 214:1140 for exact reproduction */}
      <p className="text-yellow-s-300 text-[80px] leading-none select-none" aria-hidden="true">
        ❧
      </p>

      {/* Date */}
      <p className="font-dm font-bold text-fs-sm text-cool-green-600 tracking-[0.12em] uppercase font-dm-overline">
        08.28.2026
      </p>
    </footer>
  );
}
