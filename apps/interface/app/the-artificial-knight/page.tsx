import Image from "next/image";
import { TopoGrid } from "@/components/topo-grid";
import { PasswordGate } from "@/components/password-gate";

export default function TheArtificialKnightPage() {
  return (
    <PasswordGate
      backgroundImage="/images/catacomb.gif"
      question="What is inside Agilulf's armor?"
      answer="il nulla"
    >
      <main className="min-h-screen">
        {/* hero */}
        <section className="relative overflow-hidden border-b border-border">
          <div className="absolute inset-0 opacity-30">
            <TopoGrid rows={12} cols={20} amplitude={20} speed={0.0004} />
          </div>
          <div className="relative mx-auto max-w-3xl px-4 pt-24 pb-20">
            <p className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground mb-4 font-mono">
              a workshop for one
            </p>
            <h1 className="text-3xl font-light tracking-wide">
              the artificial knight
            </h1>
            <p className="mt-3 text-sm text-muted-foreground max-w-lg leading-relaxed">
              adapting the prompt chaining workshop for calvino -- a guided
              walkthrough for building a chain that attempts to capture a
              literary voice.
            </p>
          </div>
        </section>

        {/* intro */}
        <section className="mx-auto max-w-3xl px-4 pt-12 pb-8">
          <div className="prose">
            <h2 id="premise">00 / the premise</h2>
            <p>
              this page is a condensed version of a workshop on prompt chaining
              and context engineering originally designed for a comparative
              literature course.{" "}
              <a
                href="https://complit126x-lovesongs.vercel.app/reading/prompt-chaining-guide"
                target="_blank"
                rel="noopener noreferrer"
              >
                full view available here
              </a>
              . the core idea: instead of asking an LLM to produce text in one
              shot, you design a sequence of operations -- each one doing one
              focused thing, each one passing something to the next.
            </p>
            <p>
              the original workshop asks students to capture the voice of a
              poet. here, we&apos;re adapting it for calvino -- and for a
              specific goal: the final project asks students to write the lost
              sixth memo from calvino&apos;s{" "}
              <em>six memos for the next millennium</em>. prompt chaining is a
              method for approaching that problem with precision.
            </p>
            <div className="mt-6 border border-border/30 p-5">
              <p className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground mb-3">
                on this page
              </p>
              <ol className="space-y-1.5 list-none pl-0">
                <li><a href="#premise" className="text-xs">00 / the premise</a></li>
                <li><a href="#string-in-string-out" className="text-xs">01 / string in, string out</a></li>
                <li><a href="#prompt-chaining" className="text-xs">02 / the method: prompt chaining</a></li>
                <li><a href="#calvino-method" className="text-xs">03 / your calvino method</a></li>
                <li><a href="#mechanics" className="text-xs">04 / a bank of mechanics</a></li>
                <li><a href="#chain-configs" className="text-xs">05 / example chain configurations</a></li>
                <li><a href="#your-turn" className="text-xs">06 / your turn</a></li>
                <li><a href="#students" className="text-xs">07 / what the students normally do</a></li>
              </ol>
            </div>
          </div>
        </section>

        {/* the core concept */}
        <section className="mx-auto max-w-3xl px-4 pb-8">
          <div className="prose">
            <h2 id="string-in-string-out">01 / string in, string out</h2>
            <p>
              at the most basic level, an LLM takes a string of text in and
              produces a string of text out. that&apos;s the whole thing.
              prompting is just really good, clear communication -- and the
              quality of the output depends almost entirely on the quality and
              specificity of the input.
            </p>
            <p>
              the problem with a bare prompt (&quot;write me a calvino
              memo&quot;) is that the model has to guess about everything: tone,
              structure, the specific way calvino builds an argument, the
              interplay of examples. the context window is mostly empty, so the
              model fills it with its own generic patterns.
            </p>
            <p>
              for a longer version of this framing -- what LLMs actually are,
              how context windows work, and why this matters for any kind of
              text production -- see{" "}
              <a href="/">the map is not the territory</a> (the homepage of
              this atlas).
            </p>
            <p>
              the short version: your context window is about 200,000 tokens
              long. in a typical interaction, most of that space is filled by
              the model&apos;s own output. a small prompt in a large window is
              &quot;weak and wobbly&quot; -- the model drifts, hallucinates,
              ignores your instructions:
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
              the fix is to reverse the ratio. instead of a small input and a
              large, uncontrolled output, you provide rich, curated context --
              passages, annotations, constraints you&apos;ve personally vetted
              -- and ask the model to produce something small and specific.
              that reversal is <strong>context engineering</strong>.
            </p>
          </div>
        </section>

        {/* the method */}
        <section className="mx-auto max-w-3xl px-4 pb-8">
          <div className="prose">
            <h2 id="prompt-chaining">02 / the method: prompt chaining</h2>
            <p>
              when you click &quot;deep think&quot; in a chat window, the model
              breaks your task into subtasks behind the scenes -- but you
              don&apos;t control any of those intermediate decisions. prompt
              chaining takes that agency back. you design the sequence of
              operations yourself. each step is atomic, focused, and feeds into
              the next.
            </p>
            <p>
              the workshop walks through this in stages:
            </p>
            <ol>
              <li>
                <strong>one-shot it.</strong> ask the model to write a calvino
                memo. look at what comes back. it will probably be in the right
                register but wrong in the details.
              </li>
              <li>
                <strong>diagnose.</strong> what&apos;s missing? what
                doesn&apos;t sound like calvino? be specific.
              </li>
              <li>
                <strong>dialogue.</strong> have a back-and-forth. when the model
                nails something because of how you prompted it, note that
                instruction -- it could become a step.
              </li>
              <li>
                <strong>identify atomic mechanics.</strong> each success becomes
                a repeatable operation. maybe one step extracts calvino&apos;s
                use of opposites, another his structural patterns, another his
                specific images.
              </li>
              <li>
                <strong>build a sequence.</strong> arrange the steps into an
                order. test whether the order matters. think about what context
                each step needs from the previous one.
              </li>
              <li>
                <strong>add loops and judges.</strong> maybe you want a step
                that evaluates the draft against calvino&apos;s actual prose and
                flags the weakest line. run it multiple times.
              </li>
            </ol>
          </div>
        </section>

        {/* calvino-specific: opposites */}
        <section className="mx-auto max-w-3xl px-4 pb-8">
          <div className="prose">
            <h2 id="calvino-method">03 / your calvino method</h2>
            <p>
              here&apos;s the core question: how would you break down
              your &quot;calvino method&quot; into a chain of atomic, discrete
              steps? and how would you chain them together? would you loop them?
            </p>
            <p>
              start by picking a corpus. something short and discrete from
              calvino -- a single cosmicomic, one of the <em>invisible
              cities</em>, a chapter from <em>if on a winter&apos;s night a
              traveler</em>, or a passage from the memos themselves. something
              you can read closely and hold in your head.
            </p>
            <p>
              for example, based on calvino&apos;s own method: one step in the
              chain might be to generate a set of <strong>opposites with
              tension</strong> -- pairs of concepts that pull against each other
              -- and then apply them in a &quot;disciplined&quot; way to the
              text. calvino&apos;s writing often moves by holding two
              contradictory ideas in suspension: lightness and weight, exactitude
              and multiplicity, visibility and what resists being seen.
            </p>
            <p>
              a chain that captures this might look like:
            </p>
            <ol>
              <li>
                <strong>extract</strong> the key oppositions from a calvino text
              </li>
              <li>
                <strong>score</strong> each opposition on how much tension it
                carries
              </li>
              <li>
                <strong>generate</strong> new oppositions in the same register
              </li>
              <li>
                <strong>apply</strong> the highest-tension pair as a structural
                constraint on a draft
              </li>
              <li>
                <strong>critique</strong> the draft: does it hold the tension, or
                does it collapse into one side?
              </li>
              <li>
                <strong>loop</strong> -- revise and re-critique until the tension
                holds
              </li>
            </ol>
            <p>
              that&apos;s just one possible chain. the point is to make the
              method explicit and mechanical so you can test, refine, and share
              it.
            </p>
          </div>
        </section>

        {/* talk notes image -- sidebar style */}
        <section className="mx-auto max-w-3xl px-4 pb-10">
          <div className="flex justify-end">
            <div className="w-full max-w-[280px]">
              <div className="border border-border/30 overflow-hidden">
                <Image
                  src="/images/calvino-talk-notes.jpg"
                  alt="handwritten notes from the italian studies department talk on calvino"
                  width={560}
                  height={800}
                  className="w-full h-auto opacity-85 hover:opacity-100 transition-opacity"
                />
              </div>
              <p className="text-[10px] text-muted-foreground mt-3 tracking-wide italic">
                mw&apos;s notes from the 20260309 talk
              </p>
            </div>
          </div>
        </section>

        {/* bank of operations */}
        <section className="mx-auto max-w-3xl px-4 pb-8">
          <div className="prose">
            <h2 id="mechanics">04 / a bank of mechanics</h2>
            <p>
              every step in a chain is one of a small number of atomic
              operations. these are not the only operations -- invent your own --
              but they give you a starting vocabulary:
            </p>
          </div>
          <div className="mt-4 grid gap-2">
            {[
              {
                op: "score",
                desc: "assign numerical values across defined traits",
                ex: '"score each trait 1–10, return JSON with one-sentence reasoning"',
              },
              {
                op: "extract",
                desc: "pull specific elements from text",
                ex: '"list the 5 phrases most distinctive of this voice"',
              },
              {
                op: "annotate",
                desc: "you add a judgment or reason -- no model call",
                ex: "(you write this -- close reading in action)",
              },
              {
                op: "summarize",
                desc: "compress multiple inputs into a shorter form",
                ex: '"write a 50-word portrait of this writer\'s structural habits"',
              },
              {
                op: "generate",
                desc: "produce new text from accumulated context",
                ex: '"write a passage using only the imagery in this profile"',
              },
              {
                op: "vary",
                desc: "produce N alternatives",
                ex: '"write three versions, each with a different structural approach"',
              },
              {
                op: "critique",
                desc: "identify weaknesses in a draft",
                ex: '"what is the single weakest line -- the one least like this writer?"',
              },
              {
                op: "judge",
                desc: "select the best from N candidates",
                ex: '"which of these drafts best captures the voice? explain."',
              },
              {
                op: "rewrite",
                desc: "revise against a constraint",
                ex: '"rewrite holding the central opposition in tension throughout"',
              },
              {
                op: "route",
                desc: "decide what happens next",
                ex: '"does this need revision? answer YES or NO."',
              },
            ].map((item) => (
              <div
                key={item.op}
                className="border border-border/30 p-4 hover:border-border/60 transition-colors"
              >
                <div className="flex items-baseline gap-3 mb-1">
                  <span className="text-xs font-semibold tracking-wide">
                    {item.op}
                  </span>
                  <span className="text-[11px] text-muted-foreground">
                    {item.desc}
                  </span>
                </div>
                <p className="text-[11px] text-muted-foreground/60 italic">
                  {item.ex}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* example chain configs */}
        <section className="mx-auto max-w-3xl px-4 pb-8">
          <div className="prose">
            <h2 id="chain-configs">05 / example chain configurations</h2>
            <p>
              these are all built from the same operations above -- just
              assembled differently:
            </p>
            <pre>
              <code>{`LINEAR
──────────────────────────────────────────────────────────────
text ──▶ [score] ──▶ [extract] ──▶ [annotate] ──▶ [build context] ──▶ [generate] ──▶ draft


GENERATE MULTIPLE, THEN JUDGE
──────────────────────────────────────────────────────────────
                                        ┌──▶ draft A ───┐
text ──▶ [score] ──▶ [build context] ───┼──▶ draft B ───┼──▶ [judge] ──▶ best
                                        └──▶ draft C ───┘


ITERATIVE REFINEMENT (feedback loop)
──────────────────────────────────────────────────────────────
text ──▶ [build context] ──▶ [generate] ──▶ [critique] ──┐
                                  ▲                       │
                                  └──── you rewrite ──────┘
                                        (repeat 2–3×)


PARALLEL EXTRACTION TRACKS
──────────────────────────────────────────────────────────────
         ┌──▶ [extract: imagery & oppositions]  ──┐
text ───▶│                                        ├──▶ [build context] ──▶ [generate]
         └──▶ [extract: structure & rhythm]     ───┘`}</code>
            </pre>
          </div>
        </section>

        {/* the ask */}
        <section className="mx-auto max-w-3xl px-4 pb-8">
          <div className="prose">
            <h2 id="your-turn">06 / your turn</h2>
            <p>
              here is the exercise:
            </p>
            <ol>
              <li>
                <strong>pick a calvino text.</strong> something short and
                discrete. read it closely.
              </li>
              <li>
                <strong>brainstorm mechanics.</strong> what atomic operations
                would you need to capture calvino&apos;s voice? what&apos;s
                specific to his method -- the oppositions, the layered
                structure, the precision of imagery?
              </li>
              <li>
                <strong>design the chain.</strong> how would you sequence these
                operations? where would you loop? where would you branch? where
                does the human stay in the loop?
              </li>
              <li>
                <strong>write it out on paper.</strong> sketch the chain as a
                diagram -- boxes and arrows, each box one operation, each arrow
                one handoff.
              </li>
              <li>
                <strong>send it to madeleine.</strong> she&apos;ll turn it into
                a python notebook for you to review -- the code version of your
                prompt chain, ready to run and iterate on.
              </li>
            </ol>
            <p>
              we train students to do the translation to code themselves, but
              you can also take a crack at it: map your prompt chain on paper,
              take a photo with your phone, then ask in any chat window for the
              python notebook to be built from your diagram -- each step as a
              different cell. you can open it in an IDE or in google colab. if
              any of the cells call an LLM (most will), you&apos;ll need an API
              key -- let us know and we&apos;ll set one up for you.
            </p>
          </div>
        </section>

        {/* student version note */}
        <section className="mx-auto max-w-3xl px-4 pb-24">
          <div className="border border-border/30 border-dashed p-6">
            <div className="prose">
              <h2 id="students">07 / what the students normally do</h2>
              <p>
                in the full course version, students do this themselves: they
                design the chain, translate it into code (with support), iterate
                on it over several weeks, and refine both the chain and the
                output. the final deliverable is three things:
              </p>
              <ol>
                <li>
                  <strong>the output</strong> -- the generated text itself (in
                  this case, the lost calvino memo)
                </li>
                <li>
                  <strong>the prompt chain</strong> -- the full sequence of
                  operations, documented and runnable
                </li>
                <li>
                  <strong>a paper / artist&apos;s statement</strong> -- a
                  reflection on what choices they made in their chain, why they
                  made them, and whether the chain was ultimately successful at
                  capturing the voice
                </li>
              </ol>
              <p>
                successfully capturing calvino&apos;s voice is not the point.
                failure is still a beneficial outcome, as long as the student
                thought deeply about the problem and built something. the chain
                is the argument. the output is evidence. the reflection is where
                the learning lives.
              </p>
            </div>
          </div>
        </section>
      </main>
    </PasswordGate>
  );
}
