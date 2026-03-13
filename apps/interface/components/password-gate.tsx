"use client";

import { useState } from "react";
import Image from "next/image";

export function PasswordGate({
  backgroundImage,
  question,
  answer,
  children,
}: {
  backgroundImage: string;
  question: string;
  answer: string;
  children: React.ReactNode;
}) {
  const [input, setInput] = useState("");
  const [unlocked, setUnlocked] = useState(false);
  const [error, setError] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (input.trim().toLowerCase() === answer.toLowerCase()) {
      setUnlocked(true);
      setError(false);
    } else {
      setError(true);
    }
  }

  if (unlocked) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen relative flex items-center justify-center">
      <div className="absolute inset-0 z-0">
        <Image
          src={backgroundImage}
          alt=""
          fill
          className="object-cover opacity-40"
          unoptimized
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/30" />
      </div>

      <div className="relative z-10 w-full max-w-md mx-auto px-6">
        <div className="border border-border/40 bg-black/80 backdrop-blur-sm p-8">
          <p className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground mb-6 font-mono">
            the artificial knight
          </p>
          <p className="text-sm text-foreground/90 leading-relaxed mb-6">
            {question}
          </p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
                setError(false);
              }}
              placeholder="enter the answer..."
              className="w-full bg-transparent border border-border/60 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:border-foreground/40 transition-colors font-mono"
              autoFocus
            />
            {error && (
              <p className="text-[11px] text-muted-foreground/60">
                the armor remains sealed.
              </p>
            )}
            <button
              type="submit"
              className="w-full border border-foreground/20 px-4 py-3 text-xs tracking-[0.15em] uppercase hover:bg-foreground hover:text-background transition-all"
            >
              enter
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
