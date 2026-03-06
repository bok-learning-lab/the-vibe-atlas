import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { TopoGrid } from "@/components/topo-grid";
import { getPageContent } from "@/lib/page-content";
import { mdxComponents } from "@/components/mdx";

export default async function Home() {
  const page = await getPageContent("home");

  return (
    <main className="min-h-screen">
      {/* hero with topo grid background */}
      <section className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 opacity-40">
          <TopoGrid rows={16} cols={24} amplitude={25} speed={0.0005} />
        </div>
        <div className="relative mx-auto max-w-3xl px-4 pt-16 pb-14 flex items-center gap-8">
          <div className="flex-1">
            <p className="text-xs tracking-[0.3em] text-muted-foreground mb-4">
              the vibe atlas
            </p>
            <h1 className="text-3xl font-light tracking-wide">
              {page?.doc.metadata.title ?? "the map is not the territory"}
            </h1>
            <p className="mt-3 text-sm text-muted-foreground max-w-lg leading-relaxed">
              {page?.doc.metadata.description ??
                "a guide to vibe coding tools for students -- organized by how much they let you see under the hood."}
            </p>
          </div>
          <div className="hidden md:block shrink-0 w-[180px] h-[240px] relative opacity-80">
            <Image
              src="/images/hand-vibe.gif"
              alt="a hand dissolving into a wireframe mesh"
              fill
              className="object-contain"
              unoptimized
            />
          </div>
        </div>
      </section>

      {/* content from markdown */}
      <section className="mx-auto max-w-3xl px-4 pt-10 pb-10">
        <div className="prose">
          {page ? (
            <page.MDXContent components={mdxComponents} />
          ) : (
            <p className="text-muted-foreground">content loading...</p>
          )}
        </div>
      </section>

      {/* cta */}
      <section className="mx-auto max-w-3xl px-4 pb-24">
        <Button
          asChild
          variant="outline"
          size="lg"
          className="text-xs tracking-[0.15em] uppercase border-foreground/20 hover:bg-foreground hover:text-background transition-all"
        >
          <Link href="/atlas">open the atlas</Link>
        </Button>
      </section>
    </main>
  );
}
