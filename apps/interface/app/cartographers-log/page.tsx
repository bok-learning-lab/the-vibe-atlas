import Image from "next/image";
import { TopoGrid } from "@/components/topo-grid";
import { getPageContent } from "@/lib/page-content";
import { mdxComponents } from "@/components/mdx";

const styleImages = [
  {
    src: "/images/strange-attractor.png",
    alt: "strange attractor visualization -- black background, white contour lines forming a figure-eight pattern with parameter sliders",
  },
  {
    src: "/images/pixel-grid-monitors.png",
    alt: "pixel-grid health monitors -- two phones showing low-resolution data dashboards with ascii-style charts and readouts",
  },
  {
    src: "/images/moth-grid-phone.png",
    alt: "moth grid phone UI -- dark interface with botanical illustration, grid overlays, and technical annotations",
  },
  {
    src: "/images/escher-polyhedra.png",
    alt: "wireframe polyhedra -- white geometric solids on black, nested and intersecting like technical drawings",
  },
  {
    src: "/images/ancient-seal.png",
    alt: "ancient seal -- carved circular form with figures, paired with a pixelated geometric pattern below",
  },
  {
    src: "/images/strange-attractor-tweet.png",
    alt: "strange attractor tweet -- the butterfly effect lorenz system visualization with equations and interactive parameter controls",
  },
];

export default async function CartographersLogPage() {
  const page = await getPageContent("cartographers-log");

  return (
    <main className="min-h-screen">
      {/* hero with topo grid */}
      <section className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 opacity-30">
          <TopoGrid rows={12} cols={20} amplitude={20} speed={0.0004} />
        </div>
        <div className="relative mx-auto max-w-3xl px-4 pt-24 pb-20">
          <p className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground mb-4 font-mono">
            behind the scenes
          </p>
          <h1 className="text-3xl font-light tracking-wide">
            {page?.doc.metadata.title ?? "the cartographer's log"}
          </h1>
          <p className="mt-3 text-sm text-muted-foreground max-w-lg leading-relaxed">
            {page?.doc.metadata.description}
          </p>
        </div>
      </section>

      {/* drafting photos */}
      <section className="mx-auto max-w-3xl px-4 pt-16 pb-8">
        <div className="grid grid-cols-2 gap-1">
          <div className="relative aspect-[4/3] border border-border/30 overflow-hidden">
            <Image
              src="/images/drafting-notes.jpg"
              alt="red marker sketches on paper -- tier categories listed on the left, a tangle of connecting node lines on the right"
              fill
              className="object-cover opacity-85 hover:opacity-100 transition-opacity"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
          <div className="relative aspect-[4/3] border border-border/30 overflow-hidden">
            <Image
              src="/images/drafting-desk.jpg"
              alt="the workspace -- laptop open to VS Code with claude code running, paper sketches and tea on a wooden desk"
              fill
              className="object-cover opacity-85 hover:opacity-100 transition-opacity"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div>
        <p className="text-[10px] text-muted-foreground mt-3 tracking-wide">
          the drawing board: red marker on paper, tea, and claude code in VS Code
        </p>
      </section>

      {/* content from markdown */}
      <section className="mx-auto max-w-3xl px-4 pt-8 pb-12">
        <div className="prose">
          {page ? (
            <page.MDXContent components={mdxComponents} />
          ) : null}
        </div>
      </section>

      {/* style reference images */}
      <section className="mx-auto max-w-3xl px-4 pb-24">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-1">
          {styleImages.map((img) => (
            <div
              key={img.src}
              className="relative aspect-square border border-border/30 overflow-hidden"
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover opacity-80 hover:opacity-100 transition-opacity"
                sizes="(max-width: 768px) 50vw, 33vw"
              />
            </div>
          ))}
        </div>
        <p className="text-[10px] text-muted-foreground mt-3 tracking-wide">
          style references: strange attractors, wireframe polyhedra, pixel-grid dashboards, botanical overlays
        </p>
      </section>
    </main>
  );
}
