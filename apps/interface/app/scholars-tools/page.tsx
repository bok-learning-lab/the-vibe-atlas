import { getPageContent } from "@/lib/page-content";

export default async function ScholarsToolsPage() {
  const page = await getPageContent("scholars-tools");

  return (
    <main className="min-h-screen">
      <section className="mx-auto max-w-3xl px-4 pt-20 pb-8">
        <p className="text-[10px] tracking-[0.3em] text-muted-foreground mb-4 font-mono">
          harvard AI services
        </p>
        <h1 className="text-3xl font-light tracking-wide">
          {page?.doc.metadata.title ?? "the scholar's tools"}
        </h1>
        <p className="mt-3 text-sm text-muted-foreground max-w-lg leading-relaxed">
          {page?.doc.metadata.description}
        </p>
      </section>

      <section className="mx-auto max-w-3xl px-4 pb-24">
        <div className="border border-dashed border-border/30 p-12">
          <p className="text-xs text-muted-foreground text-center mb-8">
            this page is under construction. information on school-specific
            AI tools is being sourced across harvard&apos;s schools.
          </p>

          <div className="space-y-4 max-w-md mx-auto">
            <div className="flex items-start gap-4 text-xs">
              <span className="text-[10px] font-mono tracking-[0.2em] text-muted-foreground mt-0.5 shrink-0">
                known
              </span>
              <p className="leading-relaxed">
                <strong className="text-foreground">harvard (university-wide)</strong>{" "}
                <span className="text-muted-foreground">
                  -- gemini access via google workspace, with data protection
                  and privacy guarantees.
                </span>
              </p>
            </div>

            <div className="flex items-start gap-4 text-xs">
              <span className="text-[10px] font-mono tracking-[0.2em] text-muted-foreground mt-0.5 shrink-0">
                known
              </span>
              <p className="leading-relaxed">
                <strong className="text-foreground">harvard law school</strong>{" "}
                <span className="text-muted-foreground">
                  -- no school-wide AI tools at this time.
                </span>
              </p>
            </div>

            <div className="flex items-start gap-4 text-xs">
              <span className="text-[10px] font-mono tracking-[0.2em] text-muted-foreground/50 mt-0.5 shrink-0">
                tbd{"  "}
              </span>
              <p className="text-muted-foreground/50 leading-relaxed">
                other schools -- information being gathered.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
