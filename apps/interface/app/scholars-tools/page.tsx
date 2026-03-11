import { getPageContent } from "@/lib/page-content";
import { mdxComponents } from "@/components/mdx";
import { TopoGrid } from "@/components/topo-grid";

const generalTools = [
  {
    name: "harvard AI sandbox",
    overview:
      "experiment with multiple LLMs in a secure environment. code generation, creative writing, data analysis, summarizing, text generation and editing, image generation, translation.",
    availability:
      "faculty, staff, and researchers in central administration, FAS, college, GSAS, SEAS, GSD, GSE, HBS, HDS, HKS, HLS, HMS (quad), HSDM (quad), radcliffe, SPH; students in college, GSAS, SEAS, GSE, HDS, HKS, HLS, HMS (quad), HSDM (quad), SPH.",
    dataLevel: "level 3 and below",
  },
  {
    name: "google gemini",
    overview:
      "versatile chatbot integrated with google workspace. chat, search, coding, writing, data analysis, image generation, translation and more. includes deep research and NotebookLM.",
    availability:
      "basic gemini features available in all harvard google accounts, including harvard college.",
    dataLevel: "level 3 and below",
    note: "via harvard google account",
  },
  {
    name: "microsoft copilot chat",
    overview:
      "versatile chatbot integrated with microsoft 365. chat, search, coding, writing, data analysis, image generation, translation and more. includes deep research.",
    availability:
      "basic copilot chat features available in all harvard microsoft 365 accounts.",
    dataLevel: "level 3 and below",
    note: "via harvard microsoft 365 account",
  },
  {
    name: "openAI chatGPT edu",
    overview:
      "versatile chatbot able to generate text, code, images, and more. chatbot customization, code generation, creative writing, data analysis, image generation, summarizing, text generation and editing, translation.",
    availability:
      "access provided and coordinated by schools and units; contact your local IT department for details.",
    dataLevel: "level 3 and below",
  },
  {
    name: "adobe firefly",
    overview:
      "generate images and text effects by typing keywords or a description. trained on stock images, openly licensed and public domain content. also integrated into adobe apps.",
    availability:
      "available to harvard faculty, staff, students, and researchers as part of harvard adobe creative cloud license.",
    dataLevel: "level 3 and below",
  },
];

const devTools = [
  {
    name: "self-service AI APIs",
    overview:
      "self-service AI API access for eligible users through harvard's API platform. pay-as-you-go or limited-access, credit-redemption options.",
    availability:
      "some self-service AI APIs have limited availability, noted in the documentation for each API.",
    dataLevel: "level 3 and below",
    note: "harvardkey-protected",
  },
  {
    name: "additional limited access offerings",
    overview:
      "AI platforms, assistants, and APIs for building and using AI.",
    availability: "available by request from HUIT.",
    dataLevel: "level 3 and below",
  },
];

function ToolCard({
  tool,
}: {
  tool: { name: string; overview: string; availability: string; dataLevel: string; note?: string };
}) {
  return (
    <div className="border border-border/40 p-5 hover:border-border/80 transition-colors">
      <div className="flex items-baseline gap-2 mb-2">
        <h3 className="text-sm font-semibold tracking-wide">{tool.name}</h3>
        {tool.note && (
          <span className="text-[10px] text-muted-foreground tracking-wide">
            ({tool.note})
          </span>
        )}
      </div>
      <p className="text-xs text-muted-foreground leading-relaxed mb-3">
        {tool.overview}
      </p>
      <div className="space-y-1.5">
        <div className="flex items-start gap-2 text-[11px]">
          <span className="text-muted-foreground/60 shrink-0 tracking-[0.1em] mt-px">
            access
          </span>
          <span className="text-muted-foreground leading-relaxed">
            {tool.availability}
          </span>
        </div>
        <div className="flex items-start gap-2 text-[11px]">
          <span className="text-muted-foreground/60 shrink-0 tracking-[0.1em] mt-px">
            data{"  "}
          </span>
          <span className="text-muted-foreground leading-relaxed">
            {tool.dataLevel}
          </span>
        </div>
      </div>
    </div>
  );
}

export default async function ScholarsToolsPage() {
  const page = await getPageContent("scholars-tools");

  return (
    <main className="min-h-screen">
      {/* hero */}
      <section className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 opacity-30">
          <TopoGrid rows={12} cols={20} amplitude={20} speed={0.0004} />
        </div>
        <div className="relative mx-auto max-w-3xl px-4 pt-24 pb-20">
          <p className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground mb-4 font-mono">
            harvard AI services
          </p>
          <h1 className="text-3xl font-light tracking-wide">
            {page?.doc.metadata.title ?? "the scholar's tools"}
          </h1>
          <p className="mt-3 text-sm text-muted-foreground max-w-lg leading-relaxed">
            {page?.doc.metadata.description}
          </p>
        </div>
      </section>

      {/* intro note from markdown */}
      <section className="mx-auto max-w-3xl px-4 pt-10 pb-6">
        <div className="prose">
          {page ? <page.MDXContent components={mdxComponents} /> : null}
        </div>
      </section>

      {/* general use tools */}
      <section className="mx-auto max-w-3xl px-4 pb-10">
        <div className="mb-6">
          <h2 className="text-xs tracking-[0.2em] text-muted-foreground uppercase mb-1">
            AI tools for general use
          </h2>
          <p className="text-xs text-muted-foreground/60 leading-relaxed max-w-xl">
            chatbots and AI assistants for general use and productivity --
            text, code, images, translation, creative content, and more.
          </p>
        </div>
        <div className="grid gap-3">
          {generalTools.map((tool) => (
            <ToolCard key={tool.name} tool={tool} />
          ))}
        </div>
      </section>

      {/* ai meeting assistants note */}
      <section className="mx-auto max-w-3xl px-4 pb-10">
        <div className="border border-border/30 border-dashed p-5">
          <h3 className="text-xs tracking-[0.15em] text-muted-foreground uppercase mb-2">
            a note on AI meeting assistants
          </h3>
          <p className="text-xs text-muted-foreground/80 leading-relaxed">
            AI meeting assistants (aka &quot;AI note takers&quot; or &quot;bots&quot;) can
            transcribe and summarize online meetings. although they have
            legitimate uses (e.g., for accessibility), they can also pose
            privacy, regulatory, and legal risks, and have the potential to
            stifle conversation and open inquiry. AI meeting assistants should
            not be used in harvard meetings, with the exception of approved
            tools with contractual protections.
          </p>
        </div>
      </section>

      {/* developer tools */}
      <section className="mx-auto max-w-3xl px-4 pb-24">
        <div className="mb-6">
          <h2 className="text-xs tracking-[0.2em] text-muted-foreground uppercase mb-1">
            AI developer tools
          </h2>
          <p className="text-xs text-muted-foreground/60 leading-relaxed max-w-xl">
            AI assistants and API access for developers to integrate LLMs into
            applications, products, or services. code and low/no-code offerings
            available. contact HUIT for more information.
          </p>
        </div>
        <div className="grid gap-3">
          {devTools.map((tool) => (
            <ToolCard key={tool.name} tool={tool} />
          ))}
        </div>
      </section>
    </main>
  );
}
