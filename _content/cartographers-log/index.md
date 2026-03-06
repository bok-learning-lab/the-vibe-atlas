---
title: the cartographer's log
description: a record of vibe coding an app about vibe coding -- making the practice concrete.
---

## 00 / the drawing board

this build took 1 hour and 37 minutes from start of drawing to pushing to git and then vercel.

it started on paper -- red marker on white, tea getting cold. a list of tool categories down the left side, a tangle of connecting lines on the right, trying to figure out how the tiers should flow. the napkin sketch became the atlas.

## 01 / the initial prompt

the whole app was described in a single prompt to claude code. here's the full text of what kicked off the build:

```
I need to make a front end next.js app that function as an "atlas" of
vibe coding tools available to students.

So, four pages need to be made

1) The homepage should be some framing on what LLMs are (as a way to
make sense of the atlas). All vibe coding is built predominantly with
LLMs, and at the most basic level, LLMs are a function of inputs and
outputs/string-in-string-out. However, there are many different ways
to create/handle the inputs and outputs on either side of these
models. These models will keep improving and changing, the ways inputs
and outputs are formed might change or be automated, but this is the
base structure they should understand.

Everything else in terms of "tool categories" relates to how inputs
and outputs go in. To make the atlas click, I need a front page that
borrows some material from a workshop report I've added here:

_context/vibes/workshop-paper.md

After this review, there should be an "open the atlas" button, which
unfolds to a new page.

2) the second page-- this is where we have our "atlas" of vibe coding
tools, arranged by level of abstraction from this ground truth of
string in string out (and the more abstraction, the less human
control there is.)

At the most basic level, there's chat (put in a prompt in natural
language, get code out. But then you need to copy and paste that
somewhere to get the code to work.

The next level is code-specific models and tools (codex 5.3 and
opus 4.6)

Now, the next level is in-chat simulators of code (python
integrations, Gemini canvas, Claude artifacts, etc.).

Then IDEs with integrations (windsurf, cursor, vscode w/plugins,
etc.) and then CLI tools (kind of similar) which can then access your
files and live on your local device-- pulling inputs and outputs to
your machine, beyond an interface.

Then all-in-one vibe coding service (lovable, replit) which handle
the IDE/terminal-like operations, but also help you set up backend
accounts, etc. (more and more abstract, less and less control)

Then the final tier of no human being involved with the inputs and
outputs, outside of a one-time set up (but not even an input-- just
keys to the proverbial car). They are the autonomous agents (cursor
agents, openclaw) but make it clear this is super dangerous, lol. But
you still give them persistent memory in a repo, provide them with
tools to do input and output.

3) there should be a page called "the cartographer's log" which will
show some images of my notes when drafting this, perhaps the text of
the _context/vibes/workshop-paper.md I used, and then the prompts we
have here + a description of your processes (claude code plugin in an
IDE, vscode) and then some images of the references for style (which
I'll eventually get to, but let's get drafting. This will be framed
as a "behind the scenes" of vibe coding this app about vibe coding,
functioning as a log/record of how exactly we built the front end the
users will see, just to make the practice of vibe coding concrete.

4) another page, which will currently be blank called "the scholar's
tools" eventually, I'll populate this with the AI services being
provided by various Harvard schools to their student populations. For
instance, Harvard gives students Gemini access via gsuite, with data
protection/privacy. I am still sourcing information on all the other
schools (though I think HLS does not have any school-wide tools)
```

that's the whole thing. one prompt, four pages, the full architecture described up front. this is the context ratio in action: a large, detailed input producing focused, specific outputs. the prompt was the curated context; the code was the output.

## 02 / the setup

this site was built using **claude code** -- an AI coding agent that runs as a plugin inside VS Code. it sits at **tier 4** on the atlas: a CLI tool with IDE integration. claude code can read your files, suggest edits, create new files, and run terminal commands -- all within your local development environment.

the model powering it is **claude opus 4.6**, one of the strongest code-reasoning models available. so this app is itself a product of at least two tiers working together: a strong code model accessed through an IDE agent.

the stack: **next.js** for the framework, **tailwind css v4** for styling, and **shadcn/ui** for component primitives. everything runs in a **pnpm** monorepo.

## 03 / the source material

the homepage framing draws from a workshop paper written for a course unit on prompt chaining and context engineering. key concepts -- string-in-string-out, the context ratio problem, thinking models as automated decomposition -- were adapted for a general audience here.

the workshop paper was placed in `_context/vibes/workshop-paper.md` and referenced in the prompt to claude code when building the homepage. this is context engineering in practice: rather than asking the model to invent framing from scratch, the source text was provided as high-signal context.

## 04 / style references

the visual direction for the atlas draws from a few sources: black backgrounds, white wireframe graphics, monospace type, topographic grids, and a tech-vintage sensibility -- the kind of aesthetic you'd find in a terminal emulator designed by a cartographer.
