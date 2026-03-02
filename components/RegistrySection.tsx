// Figma node: 265:6147 / 265:6148
// Registry photo: Figma asset from node 265:6290
// Replace REGISTRY_PHOTO_URL with a local asset once downloaded from Figma.

// Figma asset URL (expires 7 days after design context fetch — replace with local):
const REGISTRY_PHOTO_URL =
  "https://www.figma.com/api/mcp/asset/0837a66b-ec16-4e9f-9bc4-68c2cb110379";

interface RegistryLink {
  name: string;
  url: string;
  description: string;
}

const registryLinks: RegistryLink[] = [
  {
    name: "Amazon",
    url: "#",
    description: "Everyday essentials and home goods.",
  },
  {
    name: "Crate & Barrel",
    url: "#",
    description: "Modern cookware, dinnerware, and entertaining.",
  },
  {
    name: "Zola",
    url: "#",
    description: "Our honeymoon fund and curated picks.",
  },
];

export default function RegistrySection() {
  return (
    <section id="registry" className="w-full bg-orange-s-700 flex flex-col items-center py-sp-2xl">
      <div className="container-width flex flex-col gap-sp-xl">

        {/* "Registry" display heading */}
        <h2
          className="font-romie-trial font-light text-red-m-50 leading-none w-full"
          style={{ fontSize: "var(--fs-11xl)" }}
        >
          Registry
        </h2>

        {/* Content row */}
        <div className="flex gap-sp-lg items-start justify-between">

          {/* Left — intro + registry items */}
          <div
            className="flex flex-col justify-between self-stretch gap-sp-xl"
            style={{ width: "min(504px, 45%)" }}
          >
            {/* Intro */}
            <div className="flex flex-col gap-sp-sm">
              <h3
                className="font-instrument font-medium text-red-m-25 leading-tight font-instrument"
                style={{ fontSize: "var(--fs-7xl)", letterSpacing: "-0.02em" }}
              >
                Where we&apos;re registered
              </h3>
              <p
                className="font-instrument text-red-m-25 leading-relaxed font-instrument"
                style={{ fontSize: "var(--fs-xl)" }}
              >
                Your presence is the greatest gift, but if you wish to celebrate
                with us, we&apos;ve registered at the following:
              </p>
              <a
                href="#"
                className="inline-flex bg-red-s-25 text-cool-green-600 font-instrument font-semibold rounded-lg px-8 py-4 text-fs-2xl leading-snug transition-opacity hover:opacity-90 w-fit font-instrument"
              >
                View All Registries
              </a>
            </div>

            {/* Registry links */}
            <div className="flex flex-col gap-sp-sm">
              {registryLinks.map(({ name, url, description }) => (
                <div key={name} className="flex flex-col gap-2">
                  <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-instrument font-medium text-red-m-25 leading-tight underline decoration-1 underline-offset-4 hover:text-red-m-50 transition-colors font-instrument"
                    style={{ fontSize: "var(--fs-4xl)", letterSpacing: "-0.02em" }}
                  >
                    {name}
                  </a>
                  <p
                    className="font-instrument text-red-m-50 leading-relaxed font-instrument"
                    style={{ fontSize: "var(--fs-lg)" }}
                  >
                    {description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right — photo */}
          <div
            className="rounded-2xl overflow-hidden shrink-0"
            style={{ width: "min(616px, 50%)", height: "min(923px, 60vh)" }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={REGISTRY_PHOTO_URL}
              alt="Sarah and Matt"
              className="w-full h-full object-cover object-center"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
