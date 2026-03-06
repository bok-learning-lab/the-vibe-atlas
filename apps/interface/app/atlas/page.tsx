import { getPageContent } from "@/lib/page-content";
import { mdxComponents } from "@/components/mdx";
import { AtlasSpectrum } from "@/components/atlas-spectrum";

export default async function AtlasPage() {
  const page = await getPageContent("atlas");

  return (
    <main className="min-h-screen">
      <section className="mx-auto max-w-3xl px-4 pt-20 pb-8">
        <p className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground mb-4 font-mono">
          tier map
        </p>
        <h1 className="text-3xl font-light tracking-wide">
          {page?.doc.metadata.title ?? "the atlas"}
        </h1>
        <p className="mt-3 text-base text-muted-foreground max-w-xl leading-relaxed">
          {page?.doc.metadata.description}
        </p>
      </section>

      {/* interactive spectrum */}
      <section className="mx-auto max-w-3xl px-4 pb-16">
        <AtlasSpectrum />
      </section>

      {/* closing from markdown */}
      <section className="mx-auto max-w-3xl px-4 pb-24">
        <div className="border-t border-border pt-8">
          <div className="prose">
            {page ? (
              <page.MDXContent components={mdxComponents} />
            ) : null}
          </div>
        </div>
      </section>
    </main>
  );
}
