// Figma node: 265:5320
// Replace the bg-clay-50 placeholders with actual <Image> components once photos are available.

export default function PhotoGrid() {
  return (
    <section className="w-full flex justify-center pb-sp-2xl">
      <div className="container-width flex gap-sp-xs">
        {/* Photo slot 1 */}
        <div className="flex-1 min-w-0 aspect-[3/2] bg-clay-50 rounded-lg overflow-hidden">
          {/* <Image src="/photos/photo-1.jpg" alt="Sarah and Matt" fill className="object-cover" /> */}
        </div>
        {/* Photo slot 2 */}
        <div className="flex-1 min-w-0 aspect-[3/2] bg-clay-50 rounded-lg overflow-hidden">
          {/* <Image src="/photos/photo-2.jpg" alt="Sarah and Matt" fill className="object-cover" /> */}
        </div>
      </div>
    </section>
  );
}
