"use client";

import { useEffect, useRef, useState, useCallback } from "react";

interface Tool {
  name: string;
  note: string;
}

interface Tier {
  level: number;
  name: string;
  control: string;
  description: string;
  tools: Tool[];
}

const tiers: Tier[] = [
  {
    level: 1,
    name: "chat",
    control: "most control",
    description:
      "put in a prompt in natural language, get code out. then you copy-paste that code somewhere to make it run. string-in-string-out at its most literal.",
    tools: [
      { name: "ChatGPT", note: "general-purpose chat" },
      { name: "Claude.ai", note: "general-purpose chat" },
      { name: "Gemini", note: "general-purpose chat" },
      { name: "Perplexity", note: "search-augmented chat" },
    ],
  },
  {
    level: 2,
    name: "in-chat code environments",
    control: "high control",
    description:
      "the model doesn't just generate code as text -- it can run it, render it, or preview it right inside the chat interface. you're still in a conversation, but the outputs are live.",
    tools: [
      { name: "ChatGPT + Code Interpreter", note: "executes python in-chat" },
      { name: "Claude Artifacts", note: "renders HTML/React/code live" },
      { name: "Gemini Canvas", note: "live code preview" },
      { name: "Google Colab AI", note: "AI-assisted notebooks" },
    ],
  },
  {
    level: 3,
    name: "IDE integrations",
    control: "moderate control",
    description:
      "the model lives inside your code editor. it can read your files, understand your project structure, and write changes directly into your codebase. you see every edit before it lands.",
    tools: [
      { name: "Cursor", note: "AI-native code editor" },
      { name: "Windsurf", note: "AI-native code editor" },
      { name: "GitHub Copilot", note: "inline completions + chat in VS Code" },
      { name: "Cline", note: "open-source agentic IDE assistant" },
      { name: "Zed", note: "editor with built-in AI" },
      { name: "JetBrains AI", note: "AI in IntelliJ/PyCharm/etc." },
    ],
  },
  {
    level: 4,
    name: "CLI tools",
    control: "moderate-low control",
    description:
      "tools that run in your terminal and can access your entire machine -- your file system, your git history, your installed packages. the context window extends to everything on your local device.",
    tools: [
      { name: "Claude Code", note: "terminal-based coding agent" },
      { name: "Aider", note: "terminal-based pair programmer" },
      { name: "Gemini CLI", note: "google's terminal AI agent" },
      { name: "OpenCode", note: "open-source terminal agent" },
      { name: "Goose", note: "Block's open-source CLI agent" },
    ],
  },
  {
    level: 5,
    name: "all-in-one platforms",
    control: "low control",
    description:
      "these handle the IDE, the terminal, deployment, backend setup, database provisioning -- everything. you describe what you want and the platform builds it end to end.",
    tools: [
      { name: "Lovable", note: "full-stack app builder from prompts" },
      { name: "Bolt.new", note: "full-stack generation + hosting" },
      { name: "Replit", note: "cloud IDE + deployment + AI agent" },
      { name: "v0", note: "Vercel's UI generation from prompts" },
      { name: "Hostinger Horizons", note: "prompt-to-deployed-site" },
    ],
  },
  {
    level: 6,
    name: "autonomous agents",
    control: "least control",
    description:
      "no human in the loop after initial setup. you give the agent access to your repo, your tools, and your API keys -- the proverbial keys to the car -- and it drives. powerful and genuinely dangerous.",
    tools: [
      { name: "Devin", note: "autonomous software engineer" },
      { name: "OpenClaw", note: "open-source autonomous agent" },
      { name: "Cursor Background Agents", note: "runs tasks asynchronously" },
      { name: "Claude Code (agent mode)", note: "autonomous with tool access" },
      { name: "Copilot Workspace", note: "GitHub's autonomous agent" },
    ],
  },
];

interface Node {
  id: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  targetX: number;
  targetY: number;
  radius: number;
  tier: number;
  label: string;
  note?: string;
  isHub: boolean;
}

function initNodes(w: number, h: number): Node[] {
  const nodes: Node[] = [];
  const centerX = w / 2;
  const margin = 160; // keep hubs and tools well inside the canvas
  const hubSpacingY = (h - margin * 2) / (tiers.length - 1);

  tiers.forEach((tier, i) => {
    // hub nodes cascade from top-left to bottom-right
    const hubX = centerX + (i - 2.5) * (w * 0.06);
    const hubY = margin + i * hubSpacingY;

    nodes.push({
      id: `hub-${tier.level}`,
      x: hubX + (Math.random() - 0.5) * 10,
      y: hubY + (Math.random() - 0.5) * 10,
      vx: 0,
      vy: 0,
      targetX: hubX,
      targetY: hubY,
      radius: 10 + tier.level * 2.5,
      tier: tier.level,
      label: tier.name,
      isHub: true,
    });

    // tool nodes radiate around hub, biased inward
    tier.tools.forEach((tool, j) => {
      const angle =
        (j / tier.tools.length) * Math.PI * 1.6 - Math.PI * 0.8;
      const dist = 80 + Math.random() * 50;
      let tx = hubX + Math.cos(angle) * dist;
      let ty = hubY + Math.sin(angle) * dist;

      // clamp to stay within canvas bounds (with padding for labels)
      const pad = 60;
      tx = Math.max(pad, Math.min(w - pad, tx));
      ty = Math.max(pad, Math.min(h - pad, ty));

      nodes.push({
        id: `tool-${tier.level}-${j}`,
        x: tx + (Math.random() - 0.5) * 15,
        y: ty + (Math.random() - 0.5) * 15,
        vx: 0,
        vy: 0,
        targetX: tx,
        targetY: ty,
        radius: 5,
        tier: tier.level,
        label: tool.name,
        note: tool.note,
        isHub: false,
      });
    });
  });

  return nodes;
}

function drawCurve(
  ctx: CanvasRenderingContext2D,
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  curvature: number,
  alpha: number
) {
  const mx = (x1 + x2) / 2;
  const my = (y1 + y2) / 2;
  const dx = x2 - x1;
  const dy = y2 - y1;
  // perpendicular offset for the swoopy curve
  const cx = mx - dy * curvature;
  const cy = my + dx * curvature;

  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.quadraticCurveTo(cx, cy, x2, y2);
  ctx.strokeStyle = `rgba(255, 255, 255, ${alpha})`;
  ctx.lineWidth = 0.8;
  ctx.stroke();
}

export function AtlasSpectrum() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const nodesRef = useRef<Node[]>([]);
  const dragRef = useRef<{ node: Node; offsetX: number; offsetY: number } | null>(null);
  const hoverRef = useRef<Node | null>(null);
  const animRef = useRef<number>(0);
  const timeRef = useRef<number>(0);
  const [selectedTier, setSelectedTier] = useState<Tier | null>(null);
  const [hoveredTool, setHoveredTool] = useState<{ name: string; note: string; x: number; y: number } | null>(null);
  const sizeRef = useRef({ w: 0, h: 0 });

  const getCanvasSize = useCallback(() => {
    const el = canvasRef.current?.parentElement;
    if (!el) return { w: 760, h: 700 };
    return { w: el.clientWidth, h: Math.max(900, window.innerHeight * 0.9) };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const size = getCanvasSize();
    sizeRef.current = size;
    const dpr = window.devicePixelRatio || 1;
    canvas.width = size.w * dpr;
    canvas.height = size.h * dpr;
    canvas.style.width = `${size.w}px`;
    canvas.style.height = `${size.h}px`;
    ctx.scale(dpr, dpr);

    nodesRef.current = initNodes(size.w, size.h);

    function draw(time: number) {
      timeRef.current = time;
      const { w, h } = sizeRef.current;
      ctx!.clearRect(0, 0, w, h);
      const nodes = nodesRef.current;
      const dragged = dragRef.current?.node;
      const hovered = hoverRef.current;

      // update positions — gentle spring + drift
      for (const n of nodes) {
        if (n === dragged) continue;

        // gentle drift oscillation
        const drift = Math.sin(time * 0.0008 + n.tier * 1.2 + n.x * 0.01) * 0.15;
        const driftY = Math.cos(time * 0.0006 + n.tier * 0.8 + n.y * 0.01) * 0.12;

        // spring back to target
        const dx = n.targetX - n.x;
        const dy = n.targetY - n.y;
        n.vx += dx * 0.008 + drift;
        n.vy += dy * 0.008 + driftY;
        n.vx *= 0.92;
        n.vy *= 0.92;
        n.x += n.vx;
        n.y += n.vy;

        // keep nodes inside canvas bounds
        const pad = 40;
        n.x = Math.max(pad, Math.min(w - pad, n.x));
        n.y = Math.max(pad, Math.min(h - pad, n.y));
      }

      // draw connections between adjacent tier hubs (the spine)
      const hubs = nodes.filter((n) => n.isHub).sort((a, b) => a.tier - b.tier);
      for (let i = 0; i < hubs.length - 1; i++) {
        const a = hubs[i];
        const b = hubs[i + 1];
        const alpha = 0.06 + i * 0.02;
        drawCurve(ctx!, a.x, a.y, b.x, b.y, 0.15, alpha);
      }

      // draw tool-to-hub connections (swoopy curves)
      for (const n of nodes) {
        if (n.isHub) continue;
        const hub = hubs.find((h) => h.tier === n.tier);
        if (!hub) continue;

        const isHighlighted =
          hovered && (hovered.id === n.id || (hovered.isHub && hovered.tier === n.tier));
        const baseAlpha = 0.03 + n.tier * 0.015;
        const alpha = isHighlighted ? 0.25 : baseAlpha;

        // alternate curvature direction for visual variety
        const idx = nodes.indexOf(n);
        const curve = (idx % 2 === 0 ? 0.2 : -0.2) + Math.sin(idx) * 0.1;
        drawCurve(ctx!, hub.x, hub.y, n.x, n.y, curve, alpha);
      }

      // draw some cross-tier connections for tools that span categories
      const crossLinks = [
        ["tool-3-0", "tool-4-0"], // Cursor ↔ Claude Code
        ["tool-4-0", "tool-6-3"], // Claude Code ↔ Claude Code (agent)
        ["tool-5-2", "tool-6-0"], // Replit ↔ Devin
        ["tool-3-2", "tool-6-2"], // GitHub Copilot ↔ Cursor Background Agents
        ["tool-1-0", "tool-2-0"], // ChatGPT ↔ ChatGPT + Code Interpreter
        ["tool-1-1", "tool-2-1"], // Claude.ai ↔ Claude Artifacts
      ];

      for (const [aId, bId] of crossLinks) {
        const a = nodes.find((n) => n.id === aId);
        const b = nodes.find((n) => n.id === bId);
        if (!a || !b) continue;
        const isHighlighted =
          hovered && (hovered.id === aId || hovered.id === bId);
        drawCurve(ctx!, a.x, a.y, b.x, b.y, 0.3, isHighlighted ? 0.2 : 0.02);
      }

      // draw nodes
      for (const n of nodes) {
        const isHighlighted =
          hovered &&
          (hovered.id === n.id ||
            (hovered.isHub && hovered.tier === n.tier) ||
            (!hovered.isHub && n.isHub && hovered.tier === n.tier));

        const glowIntensity = 0.05 + n.tier * 0.04;

        if (n.isHub) {
          // hub node — larger, with glow
          const glow = isHighlighted ? glowIntensity * 3 : glowIntensity;
          ctx!.shadowColor = `rgba(255, 255, 255, ${glow})`;
          ctx!.shadowBlur = isHighlighted ? 20 : 8 + n.tier * 2;

          ctx!.beginPath();
          ctx!.arc(n.x, n.y, n.radius, 0, Math.PI * 2);
          const fillAlpha = 0.1 + n.tier * 0.05;
          ctx!.fillStyle = `rgba(255, 255, 255, ${isHighlighted ? fillAlpha * 2 : fillAlpha})`;
          ctx!.fill();
          ctx!.strokeStyle = `rgba(255, 255, 255, ${isHighlighted ? 0.6 : 0.15 + n.tier * 0.05})`;
          ctx!.lineWidth = 1;
          ctx!.stroke();

          ctx!.shadowColor = "transparent";
          ctx!.shadowBlur = 0;

          // hub label
          ctx!.font = "11px monospace";
          ctx!.textAlign = "center";
          ctx!.fillStyle = `rgba(255, 255, 255, ${isHighlighted ? 0.9 : 0.45})`;
          ctx!.fillText(n.label, n.x, n.y - n.radius - 10);

          // tier number
          ctx!.font = "bold 13px monospace";
          ctx!.fillStyle = `rgba(255, 255, 255, ${isHighlighted ? 0.9 : 0.2 + n.tier * 0.06})`;
          ctx!.fillText(String(n.tier).padStart(2, "0"), n.x, n.y + 5);
        } else {
          // tool node — small dot with optional glow
          const glow = isHighlighted ? 0.4 : 0;
          if (glow > 0) {
            ctx!.shadowColor = `rgba(255, 255, 255, ${glow})`;
            ctx!.shadowBlur = 12;
          }

          ctx!.beginPath();
          ctx!.arc(n.x, n.y, isHighlighted ? 7 : n.radius, 0, Math.PI * 2);
          const alpha = isHighlighted ? 0.9 : 0.2 + n.tier * 0.06;
          ctx!.fillStyle = `rgba(255, 255, 255, ${alpha})`;
          ctx!.fill();

          ctx!.shadowColor = "transparent";
          ctx!.shadowBlur = 0;

          // tool label — always visible, brighter on hover
          ctx!.font = isHighlighted ? "bold 11px monospace" : "10px monospace";
          ctx!.textAlign = "center";
          ctx!.fillStyle = `rgba(255, 255, 255, ${isHighlighted ? 0.9 : 0.35})`;
          ctx!.fillText(n.label, n.x, n.y - 12);
        }
      }

      // axis labels
      ctx!.font = "9px monospace";
      ctx!.textAlign = "left";
      ctx!.fillStyle = "rgba(255, 255, 255, 0.25)";
      ctx!.fillText("you see everything ↑", 12, 28);
      ctx!.textAlign = "right";
      ctx!.fillStyle = "rgba(255, 255, 255, 0.12)";
      ctx!.fillText("↓ you see nothing", w - 12, h - 12);

      animRef.current = requestAnimationFrame(draw);
    }

    animRef.current = requestAnimationFrame(draw);

    return () => cancelAnimationFrame(animRef.current);
  }, [getCanvasSize]);

  // resize handler
  useEffect(() => {
    function handleResize() {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const size = getCanvasSize();
      const oldSize = sizeRef.current;
      sizeRef.current = size;
      const dpr = window.devicePixelRatio || 1;
      canvas.width = size.w * dpr;
      canvas.height = size.h * dpr;
      canvas.style.width = `${size.w}px`;
      canvas.style.height = `${size.h}px`;
      ctx.scale(dpr, dpr);

      // scale node positions
      const sx = size.w / oldSize.w;
      const sy = size.h / oldSize.h;
      for (const n of nodesRef.current) {
        n.x *= sx;
        n.y *= sy;
        n.targetX *= sx;
        n.targetY *= sy;
      }
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [getCanvasSize]);

  function getNodeAt(cx: number, cy: number): Node | null {
    // check in reverse so top-drawn nodes are picked first
    const nodes = nodesRef.current;
    for (let i = nodes.length - 1; i >= 0; i--) {
      const n = nodes[i];
      const hitRadius = n.isHub ? n.radius + 6 : n.radius + 8;
      const dx = cx - n.x;
      const dy = cy - n.y;
      if (dx * dx + dy * dy < hitRadius * hitRadius) return n;
    }
    return null;
  }

  function canvasCoords(e: React.MouseEvent | React.TouchEvent) {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;
    return { x: clientX - rect.left, y: clientY - rect.top };
  }

  function onPointerDown(e: React.PointerEvent) {
    const { x, y } = canvasCoords(e);
    const node = getNodeAt(x, y);
    if (node) {
      dragRef.current = { node, offsetX: x - node.x, offsetY: y - node.y };
      (e.target as HTMLElement).setPointerCapture(e.pointerId);

      if (node.isHub) {
        const tier = tiers.find((t) => t.level === node.tier) || null;
        setSelectedTier(tier);
      } else {
        const tier = tiers.find((t) => t.level === node.tier) || null;
        setSelectedTier(tier);
      }
    }
  }

  function onPointerMove(e: React.PointerEvent) {
    const { x, y } = canvasCoords(e);

    if (dragRef.current) {
      const { node, offsetX, offsetY } = dragRef.current;
      node.x = x - offsetX;
      node.y = y - offsetY;
      node.targetX = node.x;
      node.targetY = node.y;
      return;
    }

    const node = getNodeAt(x, y);
    hoverRef.current = node;

    if (node && !node.isHub && node.note) {
      const canvas = canvasRef.current;
      if (canvas) {
        const rect = canvas.getBoundingClientRect();
        setHoveredTool({
          name: node.label,
          note: node.note,
          x: node.x + rect.left,
          y: node.y + rect.top,
        });
      }
    } else {
      setHoveredTool(null);
    }

    // change cursor
    if (canvasRef.current) {
      canvasRef.current.style.cursor = node ? "grab" : "default";
    }
  }

  function onPointerUp() {
    if (dragRef.current) {
      if (canvasRef.current) canvasRef.current.style.cursor = "default";
      dragRef.current = null;
    }
  }

  return (
    <div className="w-full">
      {/* axis labels */}
      <div className="flex justify-between mb-2">
        <span className="text-[10px] tracking-[0.2em] text-foreground/40">
          more control
        </span>
        <span className="text-[10px] tracking-[0.2em] text-foreground/15">
          more abstraction
        </span>
      </div>

      {/* canvas */}
      <div className="relative border border-border/30">
        <canvas
          ref={canvasRef}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerLeave={onPointerUp}
          className="block w-full touch-none"
        />

        {/* floating tooltip */}
        {hoveredTool && (
          <div
            className="fixed pointer-events-none z-50 bg-black/95 border border-border/50 px-3 py-2 max-w-[220px]"
            style={{
              left: hoveredTool.x + 14,
              top: hoveredTool.y - 34,
            }}
          >
            <p className="text-xs text-foreground font-bold">{hoveredTool.name}</p>
            <p className="text-[10px] text-muted-foreground mt-0.5">
              {hoveredTool.note}
            </p>
          </div>
        )}

      </div>

      {/* detail panel — below the canvas, not overlapping */}
      {selectedTier ? (
        <div className="mt-4 border border-border/50 bg-black/90 backdrop-blur-sm p-5 relative">
          <button
            onClick={() => setSelectedTier(null)}
            className="absolute top-3 right-4 text-muted-foreground hover:text-foreground text-sm"
          >
            ×
          </button>
          <div className="flex items-baseline gap-3 mb-2">
            <span className="text-[10px] font-mono tracking-[0.2em] text-muted-foreground">
              {String(selectedTier.level).padStart(2, "0")}
            </span>
            <h3 className="text-sm font-bold tracking-wide">
              {selectedTier.name}
            </h3>
            <span className="text-[10px] tracking-wider ml-auto text-muted-foreground border border-border/30 px-2 py-0.5">
              {selectedTier.control}
            </span>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed max-w-xl mt-2">
            {selectedTier.description}
          </p>
          <div className="flex flex-wrap gap-1.5 mt-3">
            {selectedTier.tools.map((tool) => (
              <span
                key={tool.name}
                className="text-[11px] border border-border/30 px-2 py-1 text-foreground/80"
              >
                {tool.name}
              </span>
            ))}
          </div>
        </div>
      ) : (
        <p className="text-[10px] text-muted-foreground/40 mt-3 tracking-wide">
          click a node to see details. drag to rearrange.
        </p>
      )}
    </div>
  );
}
