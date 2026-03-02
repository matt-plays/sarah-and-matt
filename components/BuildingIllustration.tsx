// Figma node: 265:5416
// The Figma frame uses "Pass Through" blend mode, which has no CSS equivalent.
// We approximate with opacity: 0.16 applied by the parent in Hero.tsx.
// Image assets generated from Figma MCP (~7-day expiry). Replace with permanent exports.
/* eslint-disable @next/next/no-img-element */

const A = {
  subtract:   "https://www.figma.com/api/mcp/asset/47f3cab5-9dc3-4660-947e-ded20c6866e5",
  rect11:     "https://www.figma.com/api/mcp/asset/ab303208-e68f-4686-bdf1-9ff098f28a0c",
  rect47:     "https://www.figma.com/api/mcp/asset/928acb51-15cd-41d7-8789-ea3a55ad18e6",
  rect54:     "https://www.figma.com/api/mcp/asset/11b8c602-20dc-4137-8c0d-6c5cac3cb3d9",
  subtract1:  "https://www.figma.com/api/mcp/asset/ec5032ff-9e12-4b67-8fd0-2a06c417a2cd",
  frame18:    "https://www.figma.com/api/mcp/asset/7a9740ee-0d1f-46e8-9c87-d807bd6a935e",
  group15:    "https://www.figma.com/api/mcp/asset/677f4f01-8da5-44b2-974f-4ac905f327b1",
  group11:    "https://www.figma.com/api/mcp/asset/61a6b982-4a07-4c16-a4e7-5f9bed6d053f",
  group13:    "https://www.figma.com/api/mcp/asset/add5e429-cbad-4125-b5db-9b99cddac556",
  group17:    "https://www.figma.com/api/mcp/asset/22211553-53a5-4d26-abfe-908d1904b4d6",
  group14:    "https://www.figma.com/api/mcp/asset/623b2f1b-09ed-4c5e-a82a-687a87e73213",
  topWindow:  "https://www.figma.com/api/mcp/asset/b03abbf1-df25-44a0-bade-742116808690",
  topWindow1: "https://www.figma.com/api/mcp/asset/c07b6dd3-01bd-44a9-8b0d-4aa585cd40d3",
  group16:    "https://www.figma.com/api/mcp/asset/c18714c9-104f-475a-b28b-aadd1161f754",
  group7:     "https://www.figma.com/api/mcp/asset/5b4cc74d-e4f2-4994-9010-787009bd2d06",
  subtract2:  "https://www.figma.com/api/mcp/asset/8f15148a-1de9-4d62-b110-520161b8f819",
  column:     "https://www.figma.com/api/mcp/asset/ece8305b-ab5e-44e9-93f9-9143fe5703c9",
  rect5:      "https://www.figma.com/api/mcp/asset/357851b4-2e52-45e7-8859-de2ba38be72b",
  rect55:     "https://www.figma.com/api/mcp/asset/da363f3f-8fb6-4040-8867-9b8535305f46",
  rect56:     "https://www.figma.com/api/mcp/asset/8bde3f1c-fdf6-4a12-95c0-708c27668472",
  group23:    "https://www.figma.com/api/mcp/asset/da784e77-cf8f-4e98-b616-4a16ad9d4525",
  window:     "https://www.figma.com/api/mcp/asset/268fa9a0-eb70-4867-b6b5-6ba6616acb0f",
  window1:    "https://www.figma.com/api/mcp/asset/d1427782-0bd3-4e23-956a-e08a384b5f91",
};

function Img({ src }: { src: string }) {
  return <img alt="" className="block max-w-none size-full" src={src} />;
}

export default function BuildingIllustration() {
  return (
    <div className="relative size-full">

      {/* ── Top roof / pediment ──────────────────────────────────── */}
      <div className="absolute inset-[11.62%_2.5%_74.19%_2.5%]">
        <div className="absolute inset-[-0.78%_-0.26%]"><Img src={A.subtract} /></div>
      </div>

      {/* ── Main facade ──────────────────────────────────────────── */}
      <div className="absolute inset-[1.67%_24.11%_73.08%_24.32%]">
        <div className="absolute inset-[-0.44%]"><Img src={A.rect11} /></div>
      </div>
      <div className="absolute inset-[1.67%_24.11%_73.08%_24.32%]">
        <div className="absolute inset-[-0.44%]"><Img src={A.rect47} /></div>
      </div>
      <div className="absolute inset-[2.78%_26.4%_74.19%_26.61%]">
        <div className="absolute inset-[-0.48%_-0.49%]"><Img src={A.rect54} /></div>
      </div>

      {/* ── Structural borders ───────────────────────────────────── */}
      <div className="absolute border border-black inset-[26.92%_0_0_0]" />
      <div className="absolute border border-black inset-[26.92%_22.95%_72.19%_20%]" />
      <div className="absolute border border-black inset-[26.92%_0_72.19%_77.05%]" />
      <div className="absolute border border-black inset-[26.92%_80%_72.19%_0]" />
      <div className="absolute bg-white border border-black inset-[27.81%_22.95%_71.64%_20%]" />
      <div className="absolute border border-black inset-[28.36%_22.95%_71.08%_20%]" />
      <div className="absolute border border-black inset-[28.92%_0_64.4%_0]" />
      <div className="absolute bg-white border border-black inset-[27.81%_0_71.64%_77.05%]" />
      <div className="absolute border border-black inset-[28.36%_0_71.08%_77.05%]" />
      <div className="absolute bg-white border border-black inset-[27.81%_80%_71.64%_0]" />
      <div className="absolute border border-black inset-[28.36%_80%_71.08%_0]" />

      {/* ── Pediment / top arch decoration ───────────────────────── */}
      <div className="absolute inset-[3.56%_29.16%_90.71%_29.37%]">
        <div className="absolute inset-[-1.94%_-0.55%]"><Img src={A.subtract1} /></div>
      </div>

      {/* ── Top window bays (4×) ─────────────────────────────────── */}
      {[
        "inset-[38.38%_66.11%_5.06%_21.05%]",
        "inset-[38.38%_43.58%_5.06%_43.58%]",
        "inset-[38.38%_21.05%_5.06%_66.11%]",
      ].map((cls, i) => (
        <div key={i} className={`absolute ${cls}`}>
          <div className="absolute inset-[-0.2%_-1.63%]"><Img src={A.frame18} /></div>
        </div>
      ))}
      <div className="absolute inset-[38.38%_88.62%_5.06%_0]">
        <div className="absolute inset-[-0.2%_-1.7%_-0.2%_-1.84%]"><Img src={A.group15} /></div>
      </div>

      {/* ── Arched top windows (4×) ──────────────────────────────── */}
      {[
        { cls: "inset-[41.1%_55.58%_40.55%_33.05%]", src: A.topWindow },
        { cls: "inset-[41.1%_78.11%_40.55%_10.53%]", src: A.topWindow1 },
        { cls: "inset-[41.1%_33.05%_40.55%_55.58%]", src: A.topWindow },
        { cls: "inset-[41.1%_10.53%_40.55%_78.11%]", src: A.topWindow },
      ].map(({ cls, src }, i) => (
        <div key={i} className={`absolute ${cls}`}>
          <div className="absolute inset-[-10%_-22.22%_-33.5%_-23.14%]"><Img src={src} /></div>
        </div>
      ))}

      {/* ── Left cornice band ────────────────────────────────────── */}
      <div className="absolute bg-white border border-black inset-[33.98%_-0.21%_64.96%_0]" />

      {/* ── Side pilaster / column strip ─────────────────────────── */}
      <div className="absolute flex inset-[38.38%_-0.02%_5.06%_88.63%] items-center justify-center">
        <div className="-scale-y-100 flex-none h-[1017px] rotate-180 w-[108.155px]">
          <div className="relative size-full">
            <div className="absolute inset-[-0.2%_-1.7%_-0.2%_-1.84%]"><Img src={A.group16} /></div>
          </div>
        </div>
      </div>

      {/* ── Lower windows ────────────────────────────────────────── */}
      <div className="absolute inset-[72.08%_78.11%_10.07%_10.53%]">
        <div className="absolute inset-[-55.45%_-9.26%_-28.04%_-9.25%]">
          <div className="absolute inset-[-0.34%_-1.56%]"><Img src={A.group11} /></div>
        </div>
      </div>
      <div className="absolute inset-[62.18%_32%_5.06%_54.53%]">
        <div className="absolute inset-[-0.34%_-1.56%]"><Img src={A.group13} /></div>
      </div>
      <div className="absolute inset-[62.18%_54.53%_5.06%_32%]">
        <div className="absolute inset-[-0.34%_-1.56%]"><Img src={A.group17} /></div>
      </div>
      <div className="absolute inset-[62.18%_9.47%_5.06%_77.05%]">
        <div className="absolute inset-[-0.34%_-1.56%]"><Img src={A.group14} /></div>
      </div>

      {/* ── Column capitals (5×) ─────────────────────────────────── */}
      {[
        "inset-[28.92%_70.42%_64.4%_23.47%]",
        "inset-[28.92%_93.89%_64.4%_0]",
        "inset-[28.92%_46.95%_64.4%_46.95%]",
        "inset-[28.92%_23.47%_64.4%_70.42%]",
        "inset-[28.92%_0_64.4%_93.89%]",
      ].map((cls, i) => (
        <div key={i} className={`absolute ${cls}`}>
          <div className="absolute inset-[-1.23%_-2.42%]"><Img src={A.group7} /></div>
        </div>
      ))}

      {/* ── Base / foundation subtract ────────────────────────────── */}
      <div className="absolute inset-[10.51%_0_73.08%_0]">
        <div className="absolute inset-[-0.68%_-0.25%]"><Img src={A.subtract2} /></div>
      </div>

      {/* ── Central entry bay (2 columns + 2 door windows) ───────── */}
      <div className="absolute flex inset-[11.62%_28.74%_73.47%_28.95%] items-start justify-between px-[8px]">
        {/* Left column */}
        <div className="h-[255px] relative shrink-0 w-[32px]">
          <div className="absolute inset-[-0.59%_-4.69%]"><Img src={A.column} /></div>
        </div>
        {/* Left door window */}
        <div className="h-[268px] relative shrink-0 w-[121px]">
          <div className="absolute inset-[4.48%_0_14.55%_0]">
            <div className="absolute inset-[-0.69%_-1.24%]"><Img src={A.rect5} /></div>
          </div>
          <div className="absolute inset-[8.96%_9.92%_19.03%_9.92%]">
            <div className="absolute inset-[-0.78%_-1.55%]"><Img src={A.rect55} /></div>
          </div>
          <div className="absolute bg-white border border-black h-[34px] left-0 bottom-0 w-full" />
        </div>
        {/* Center column */}
        <div className="h-[255px] relative shrink-0 w-[32px]">
          <div className="absolute inset-[-0.59%_-4.69%]"><Img src={A.column} /></div>
        </div>
        {/* Right door window */}
        <div className="h-[268px] relative shrink-0 w-[121px]">
          <div className="absolute inset-[4.48%_0_14.55%_0]">
            <div className="absolute inset-[-0.69%_-1.24%]"><Img src={A.rect5} /></div>
          </div>
          <div className="absolute inset-[8.96%_9.92%_19.03%_9.92%]">
            <div className="absolute inset-[-0.78%_-1.55%]"><Img src={A.rect56} /></div>
          </div>
          <div className="absolute bg-white border border-black h-[34px] left-0 bottom-0 w-full" />
        </div>
        {/* Right column */}
        <div className="h-[255px] relative shrink-0 w-[32px]">
          <div className="absolute inset-[-0.59%_-4.69%]"><Img src={A.column} /></div>
        </div>
      </div>

      {/* ── Roof ornaments (5×) ──────────────────────────────────── */}
      <div className="absolute flex inset-[10.23%_28.74%_87.43%_28.95%] items-center justify-between px-[12px]">
        {[0, 1, 2, 3, 4].map((i) => (
          <div key={i} className="h-[42px] relative shrink-0 w-[24px]">
            <div className="absolute inset-[-3.57%_-6.25%]"><Img src={A.group23} /></div>
          </div>
        ))}
      </div>

      {/* ── Foundation steps (base lines) ────────────────────────── */}
      <div className="absolute bg-white border border-black inset-[99.33%_0_0_0]" />
      <div className="absolute bg-white border border-black inset-[98%_0_1.33%_0]" />
      <div className="absolute border border-black inset-[98.67%_0_0.67%_0]" />
      <div className="absolute border border-black inset-[97.33%_0_2%_0]" />

      {/* ── Side entrance windows ─────────────────────────────────── */}
      <div className="absolute inset-[14.69%_78.11%_77.21%_8.42%]">
        <div className="absolute inset-[-1.37%_-1.56%]"><Img src={A.window} /></div>
      </div>
      <div className="absolute inset-[14.69%_8.42%_77.21%_78.11%]">
        <div className="absolute inset-[-1.37%_-1.56%]"><Img src={A.window1} /></div>
      </div>

    </div>
  );
}
