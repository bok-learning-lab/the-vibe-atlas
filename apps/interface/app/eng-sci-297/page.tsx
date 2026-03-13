import { TopoGrid } from "@/components/topo-grid";

export default function EngSci297Page() {
  return (
    <main className="min-h-screen">
      {/* hero */}
      <section className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 opacity-30">
          <TopoGrid rows={12} cols={20} amplitude={20} speed={0.0004} />
        </div>
        <div className="relative mx-auto max-w-3xl px-4 pt-24 pb-20">
          <p className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground mb-4 font-mono">
            eng-sci 297 / workshop resources
          </p>
          <h1 className="text-3xl font-light tracking-wide">
            writing with (and without) AI
          </h1>
          <p className="mt-3 text-sm text-muted-foreground max-w-lg leading-relaxed">
            a resource page for writers in the sciences -- what these tools
            actually do, how to use them well, and how to build the habits
            that make your writing stronger whether or not AI is involved.
          </p>
        </div>
      </section>

      {/* toc */}
      <section className="mx-auto max-w-3xl px-4 pt-12 pb-8">
        <div className="prose">
          <div className="border border-border/30 p-5">
            <p className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground mb-3">
              on this page
            </p>
            <ol className="space-y-1.5 list-none pl-0">
              <li><a href="#tools" className="text-xs">01 / your tools</a></li>
              <li><a href="#transformations" className="text-xs">02 / what LLMs do: transformations</a></li>
              <li><a href="#prompting" className="text-xs">03 / what is prompting</a></li>
              <li><a href="#context-engineering" className="text-xs">04 / context engineering</a></li>
              <li><a href="#building-context" className="text-xs">05 / building your context library</a></li>
            </ol>
          </div>
        </div>
      </section>

      {/* 01 / your tools */}
      <section className="mx-auto max-w-3xl px-4 pb-8">
        <div className="prose">
          <h2 id="tools">01 / your tools</h2>
          <p>
            as FAS students (undergraduate and graduate), you already have
            access to several AI tools through harvard:
          </p>
          <ul>
            <li>
              <strong>google gemini</strong> -- available through your harvard
              google / g suite account. this is your most durable option: it
              integrates with drive, docs, and the rest of the workspace
              you&apos;re already using. gemini includes deep research and
              NotebookLM.
            </li>
            <li>
              <strong>openAI chatGPT edu</strong> -- currently available through
              harvard, but these accounts will sunset in mid-summer 2026. useful
              now, but not something to build long-term habits around.
            </li>
            <li>
              <strong>harvard AI sandbox</strong> -- a secure environment for
              experimenting with multiple LLMs. access is generally restricted
              to students through their school.
            </li>
          </ul>
          <p>
            of these, <strong>gemini through your google account</strong> is the
            one that will stick around. it&apos;s worth getting comfortable
            with it.
          </p>
        </div>
      </section>

      {/* 02 / transformations */}
      <section className="mx-auto max-w-3xl px-4 pb-8">
        <div className="prose">
          <h2 id="transformations">02 / what LLMs do: transformations</h2>
          <p>
            the simplest way to think about what a large language model does is
            as a <strong>transformation</strong>: it takes one mode of text and
            converts it into another. the most basic transformation is{" "}
            <strong>text to text</strong> -- you write a prompt, you get a
            response. but the same underlying mechanism supports many other
            transformations:
          </p>
          <ul>
            <li>
              <strong>text → text</strong> -- summarize, translate, rewrite,
              explain, brainstorm
            </li>
            <li>
              <strong>text → image</strong> -- describe what you want, get a
              generated image
            </li>
            <li>
              <strong>image → text</strong> -- upload a photo of a whiteboard,
              a chart, handwritten notes, and get a transcription or analysis
            </li>
            <li>
              <strong>text → code</strong> -- describe a data analysis task and
              get a python script. this is one of the strongest transformations
              available: LLMs are remarkably good at generating code from
              natural language descriptions
            </li>
            <li>
              <strong>data → analysis</strong> -- upload a CSV or describe a
              dataset and ask for statistical analysis, visualizations, or
              interpretation
            </li>
          </ul>
          <p>
            all of these can be useful for your research and analysis. many
            LLMs also bring in additional features automatically to improve
            their output:
          </p>
          <ul>
            <li>
              <strong>web search</strong> -- pulling in current information to
              ground responses
            </li>
            <li>
              <strong>python execution</strong> -- running code to solve math
              problems, process data, or generate charts
            </li>
            <li>
              <strong>OCR</strong> -- reading text from images, PDFs, and
              scanned documents
            </li>
            <li>
              <strong>&quot;thinking&quot; models</strong> -- models that
              automatically break a task into subtasks and execute them in
              sequence. these are, under the hood, automated prompt chains --
              the model handles the decomposition for you
            </li>
          </ul>
        </div>
      </section>

      {/* 03 / prompting */}
      <section className="mx-auto max-w-3xl px-4 pb-8">
        <div className="prose">
          <h2 id="prompting">03 / what is prompting</h2>
          <p>
            a prompt is a string of text you send to a model. the model
            responds with a string of text. that&apos;s the whole interaction
            at the most basic level: <strong>string in, string out</strong>.
          </p>
          <p>
            the model doesn&apos;t see words the way you do. it sees{" "}
            <strong>tokens</strong> -- units roughly between characters and
            words, converted into numerical codes. the word
            &quot;transformation&quot; might be 2-3 tokens; a short sentence
            might be 10-15. your entire context window -- the total space the
            model can hold at once -- is about 200,000 tokens, roughly the
            length of a novel. if you want to see exactly how text breaks into
            tokens, try{" "}
            <a
              href="https://tiktokenizer.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
            >
              tiktokenizer
            </a>
            .
          </p>
          <p>
            what makes a good prompt? clarity and specificity. the more
            precisely you describe what you want -- the constraints, the format,
            the audience, the examples -- the less the model has to guess. a
            bare prompt like &quot;help me write this section&quot; gives the
            model almost nothing to work with.
          </p>
          <p>
            when you send multiple prompts -- either iteratively in a chat
            conversation or through automated sequences called{" "}
            <strong>prompt chains</strong> -- you start building up{" "}
            <strong>context</strong>. each exchange adds to the window: your
            prompt, the model&apos;s response, your follow-up. and the quality
            of everything in that window shapes what comes next. this is where
            prompting becomes <strong>context engineering</strong>.
          </p>
        </div>
      </section>

      {/* 04 / context engineering */}
      <section className="mx-auto max-w-3xl px-4 pb-8">
        <div className="prose">
          <h2 id="context-engineering">04 / context engineering</h2>
          <blockquote>
            &quot;good context engineering means finding the smallest possible
            set of high-signal tokens that maximize the likelihood of some
            desired outcome.&quot; --{" "}
            <a
              href="https://www.anthropic.com/engineering/building-effective-agents"
              target="_blank"
              rel="noopener noreferrer"
            >
              anthropic, &quot;building effective agents&quot;
            </a>
          </blockquote>
          <p>
            in a typical chat interaction, most of the context window gets
            filled by the model&apos;s own output. a small prompt in a large
            window is &quot;weak and wobbly&quot; -- the model drifts,
            hallucinates, ignores your instructions:
          </p>
          <pre>
            <code>{`a bare prompt:
┌──────────────────────────────────────────────────────┐
│▓▓▓▓▓│░░│▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒│  the model guesses
│ sys  │user │              AI output              │  about everything
└──────────────────────────────────────────────────────┘

rich context:
┌──────────────────────────────────────────────────────┐
│▓▓▓▓▓│░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░│▒▒▒▒│  focused, deterministic
│ sys  │      your context (rich, curated)        │out │  you control the window
└──────────────────────────────────────────────────────┘
  ░ = context you wrote or approved
  ▒ = small, specific AI output`}</code>
          </pre>
          <p>
            the fix is to <strong>reverse the ratio</strong>. instead of a
            small input and a large, uncontrolled output, you fill the context
            window with rich, curated material -- passages, data, constraints,
            examples you&apos;ve personally vetted -- and ask the model to
            produce something small and specific. the more of the window you
            control, the more deterministic and useful the output becomes.
          </p>
          <p>
            this applies whether you&apos;re working iteratively in a chat
            window or starting to build prompt chains (sequences of operations
            where each step automatically produces context for the next). for a
            deeper dive into prompt chaining and vibe coding -- building
            software by describing what you want to an AI coding tool -- see{" "}
            <a href="/">the vibe atlas</a>.
          </p>
          <p>
            the core principle is the same either way:{" "}
            <strong>produce more context and ask the LLM to do smaller,
            more discrete tasks</strong>. don&apos;t ask the model to
            &quot;write my methods section.&quot; ask it to summarize the three
            most relevant studies from your literature review, then use that
            summary as context to draft one paragraph of your methods, then
            critique that paragraph against your actual protocol.
          </p>
        </div>
      </section>

      {/* 05 / building your context library */}
      <section className="mx-auto max-w-3xl px-4 pb-24">
        <div className="prose">
          <h2 id="building-context">05 / building your context library</h2>
          <p>
            remember the anthropic quote: you want the smallest possible set of{" "}
            <strong>high-signal tokens</strong>. the best way to have
            high-signal tokens ready when you need them is to start collecting
            them now.
          </p>
          <h3>keep files of your best material</h3>
          <p>
            start building a personal library of text that represents your
            thinking at its sharpest:
          </p>
          <ul>
            <li>
              <strong>your favorite writing</strong> -- passages from your own
              work that you&apos;re proud of, paragraphs where you nailed the
              tone or the argument
            </li>
            <li>
              <strong>your favorite studies</strong> -- key papers, methods
              sections you admire, results that changed how you think about your
              field
            </li>
            <li>
              <strong>prompt libraries</strong> -- prompts that worked well for
              you. when you find a phrasing that produces good output, save it
            </li>
            <li>
              <strong>style references</strong> -- examples of the kind of
              writing you aspire to, in your discipline
            </li>
          </ul>
          <p>
            you want these at your fingertips -- or at the proverbial fingertips
            of an AI agent. the point is to have strong context ready to paste
            into a conversation or pull into a tool whenever you need it.
          </p>
          <h3>be metacognitive about your files</h3>
          <p>
            don&apos;t just save things -- organize them so you (and a model)
            can understand <em>why</em> you saved them. this means:
          </p>
          <ul>
            <li>
              <strong>add headings</strong> to your text files that describe
              what each section is and why it matters. &quot;methods section I
              like because of how it handles limitations&quot; is more useful
              than a bare URL
            </li>
            <li>
              <strong>use descriptive file names</strong> -- not{" "}
              <code>paper_final_v3.pdf</code> but{" "}
              <code>zhang-2024-bayesian-methods-clean-limitations.pdf</code>
            </li>
            <li>
              <strong>annotate</strong> -- even a one-sentence note about why
              you kept something makes it 10x more useful as context later.
              this metacognition is itself a form of close reading
            </li>
          </ul>
          <p>
            for a more detailed guide to preparing materials for AI workflows
            -- file formats, extraction, metadata, organization -- see{" "}
            <a
              href="https://hackmd.io/RrSS0p3WSpeQ-c0CZ-Q6hw"
              target="_blank"
              rel="noopener noreferrer"
            >
              preparing materials for AI
            </a>
            . (it was written with a specific law course in mind, but the
            advice holds for any discipline.)
          </p>
          <p>
            this structure pays off in two ways. if you stay in chat interfaces
            (gemini, chatGPT, the sandbox), you have a well-organized library of
            high-signal content to quickly copy and paste into conversations.
            if you move into an IDE or coding interface -- writing python
            notebooks, using vibe coding tools, building prompt chains -- those
            same files are ready to pull in programmatically.
          </p>
          <p>
            either way, the habit is the same: curate your context. the better
            your library, the better your prompts. the better your prompts, the
            more useful the output. and the process of building that library --
            choosing what to keep, annotating why, organizing it for reuse --
            is itself the kind of critical thinking that makes you a stronger
            writer, with or without AI.
          </p>
        </div>
      </section>
    </main>
  );
}
