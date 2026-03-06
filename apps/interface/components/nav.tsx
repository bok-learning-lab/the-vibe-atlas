"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const links = [
  { href: "/", label: "the map is not the territory" },
  { href: "/atlas", label: "the atlas" },
  { href: "/cartographers-log", label: "the cartographer's log" },
  { href: "/scholars-tools", label: "the scholar's tools" },
];

export function Nav() {
  const pathname = usePathname();

  return (
    <nav className="border-b border-border/50 sticky top-0 z-50 bg-black/90 backdrop-blur-sm">
      <div className="mx-auto max-w-5xl flex items-center gap-1 px-6 py-3">
        <Link
          href="/"
          className="text-[10px] tracking-[0.3em] text-foreground/70 hover:text-foreground transition-colors mr-8"
        >
          the vibe atlas
        </Link>
        <div className="flex items-center gap-0">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-[10px] tracking-[0.15em] px-3 py-1.5 transition-colors",
                pathname === link.href
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
