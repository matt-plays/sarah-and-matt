// Figma node: 265:6027

export default function TravelHeader() {
  return (
    <section id="travel" className="w-full flex justify-center pb-sp-2xl">
      <div className="container-width flex items-end justify-between gap-sp-lg">

        {/* "Travel & Stay" display heading */}
        <h2
          className="font-romie-trial font-light text-cool-green-600 leading-none shrink-0"
          style={{ fontSize: "var(--fs-11xl)" }}
        >
          Travel &amp; Stay
        </h2>

        {/* Intro body copy — sits at bottom-right, 504px wide */}
        <p
          className="font-instrument text-fs-xl text-cool-green-600 leading-relaxed"
          style={{ width: "min(504px, 100%)" }}
        >
          Lancaster is a beautiful destination with plenty to explore. Here are
          our recommendations to make your visit memorable.
        </p>
      </div>
    </section>
  );
}
