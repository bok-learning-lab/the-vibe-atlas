---
title: the map is not the territory
description: a guide to vibe coding tools for students -- organized by how much they let you see under the hood.
---

## why vibe coding

"vibe coding" is the practice of building software by describing what you want in natural language and letting an AI generate the code. the term comes from Andrej Karpathy, who described it as "fully giving in to the vibes" -- accepting code you haven't read, running it, and telling the AI to fix whatever breaks.

there is now an entire ecosystem of tools built for this. chat interfaces, code editors, deployment platforms, autonomous agents. they all look different, but they are all built on the same engine. if you understand that engine, you can make sense of any tool -- current or future -- because you know what it's actually doing underneath.

## the engine: string in, string out

at the center of everything is a **large language model**. an LLM is, at its core, a function: you put a string of text in, and you get a string of text out.

```
  ┌─────────────────┐              ┌──────────────────────┐
  │  your prompt     │              │  model response       │
  │  (a string)      │──▶  LLM  ──▶│  (a string)           │
  │                  │              │                       │
  │  "write me a     │   tokens    │  def hello():         │
  │   python         │──▶ in/out ──▶│    print("hello")    │
  │   function"      │              │                       │
  └─────────────────┘              └──────────────────────┘
```

that's the whole thing. every tool in the atlas -- every IDE plugin, every deployment platform, every autonomous agent -- is just a different way of packaging operations around this core exchange. tokens go in. tokens come out. everything else is scaffolding.

## building up the input: context

the first thing people discovered: a bare prompt isn't enough.

say you ask a chat model to write a function that makes an API call to an LLM. the model will generate something -- but it might use an old version of the API, or a library that's been deprecated, or a pattern that doesn't match your project. it doesn't know what you know.

so you start adding **context**. you paste in the API documentation. you include an example from your own codebase. you specify the library version. now the input string isn't just your question -- it's your question plus all the relevant information the model needs to get the answer right.

> *"good context engineering means finding the **smallest possible** set of **high-signal tokens** that maximize the likelihood of some desired outcome."*
> -- Anthropic, "Building Effective Agents"

this is **context engineering**: the practice of curating what goes into the model's input window so that what comes out is actually useful. the more relevant context you provide -- documentation, code samples, constraints, style preferences -- the less the model has to guess, and the more deterministic the output becomes.

```
  a bare prompt:
  ┌──────────────────────────────────────────────────────┐
  │▓▓▓▓▓│░░│▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒│  the model guesses
  │ sys  │u │              AI output (~30K)              │  about everything
  └──────────────────────────────────────────────────────┘

  rich context:
  ┌──────────────────────────────────────────────────────┐
  │▓▓▓▓▓│░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░│▒▒▒▒│  the model follows
  │ sys  │      your context (rich, curated)        │out │  your lead
  └──────────────────────────────────────────────────────┘
```

## handling the output: from copy-paste to automation

context solves the input side. but what about the output?

in the earliest version of vibe coding, you'd get code back from the chat window, read it, copy it, paste it into a file, and run it somewhere else to see if it worked. if it didn't, you'd go back to the chat, describe what went wrong, and iterate. the string came out of the model, and then *you* had to carry it the rest of the way.

the evolution of vibe coding tools is largely the story of automating that carry.

**sandboxed code environments** were the first step. platforms added inline code execution directly inside the chat -- ChatGPT's code interpreter, Claude's artifacts, Gemini's canvas. now you could see the output *run* without leaving the conversation. the string went in, the string came out, and you could watch it execute in the same window.

**IDE integrations** were the next move. tools like Cursor, Windsurf, and VS Code with Copilot put the model inside your code editor. now the model didn't just generate code in a chat bubble -- it could read your existing files, understand your project structure, and write changes directly into your codebase. the input got richer (your whole project as context) and the output got more useful (edits applied in place, not copy-pasted).

**CLI tools** took this further. tools like Claude Code and Aider run in your terminal and can access your entire machine -- not just one project, but your file system, your git history, your installed packages. the context window now extends to everything on your local device, and the output can be written anywhere.

**all-in-one platforms** like Lovable, Replit, and Bolt approached it from the other direction. instead of giving developers more control, they gave non-developers less friction. these tools handle not just the code generation but the deployment, the database setup, the account provisioning. you describe what you want and the platform handles the entire pipeline -- input to output to running application. you don't need to know what a build system is.

**autonomous agents** are the final step (so far). tools like OpenClaw, and agent modes in Cursor and Claude Code don't wait for your prompts. you give them access to your repo, your tools, your API keys -- the proverbial keys to the car -- and a persistent memory, and they drive. you don't control the string in or the string out. you rarely even see the intermediate steps. you just see the final product. this is powerful, and it is genuinely dangerous: agents can rack up costs, introduce bugs, and make irreversible changes to your codebase without asking.

## the map

every tool on the atlas sits somewhere on this spectrum. at one end, you see every token going in and coming out. at the other, you don't see any of them.

the atlas organizes these tools into tiers -- from raw chat to autonomous agents -- so you can see where each one falls and what it automates away. as you move through the tiers, ask yourself: for what i'm building, do i want to see what's happening, or do i want it handled for me?
