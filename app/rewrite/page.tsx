"use client";

import { useState } from "react";
import ResultDisplay from "@/components/ResultDisplay";
import ToolLayout from "@/components/ToolLayout";

const directions = [
  "より自然で読みやすく",
  "より簡潔に（冗長な部分を削る）",
  "よりフォーマルに",
  "よりカジュアルに",
  "より説得力を持たせる",
];

export default function RewritePage() {
  const [text, setText] = useState("");
  const [direction, setDirection] = useState(directions[0]);
  const [result, setResult] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setResult("");
    setIsLoading(true);
    try {
      const res = await fetch("/api/rewrite", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, direction }),
      });
      if (!res.ok) { setResult(await res.text()); return; }
      const reader = res.body!.getReader();
      const decoder = new TextDecoder();
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        setResult((prev) => prev + decoder.decode(value));
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ToolLayout num="04" title="文章のリライト" titleEn="Rewriter">
      <form onSubmit={handleSubmit} className="space-y-6 animate-fade-up delay-2">
        <div>
          <label className="block font-mono text-xs tracking-widest uppercase mb-2" style={{ color: "var(--muted)" }}>
            改善したい文章 *
          </label>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="改善したい文章をここに貼り付けてください..."
            rows={6}
            className="ink-input resize-y"
            required
          />
        </div>

        <div>
          <label className="block font-mono text-xs tracking-widest uppercase mb-3" style={{ color: "var(--muted)" }}>
            改善の方向性
          </label>
          <div className="space-y-0">
            {directions.map((d) => (
              <button
                key={d}
                type="button"
                onClick={() => setDirection(d)}
                className="w-full text-left px-4 py-3 font-mono text-xs transition-all duration-150 flex items-center gap-3"
                style={{
                  background: direction === d ? "var(--ink-muted)" : "transparent",
                  color: direction === d ? "var(--paper)" : "var(--muted)",
                  borderBottom: "1px solid var(--border)",
                  borderLeft: direction === d ? "2px solid var(--accent)" : "2px solid transparent",
                }}
              >
                <span style={{ color: direction === d ? "var(--accent)" : "var(--border)" }}>▸</span>
                {d}
              </button>
            ))}
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-3.5 font-mono text-sm tracking-widest uppercase transition-all duration-200"
          style={{
            background: isLoading ? "var(--ink-muted)" : "var(--accent)",
            color: "var(--paper)",
            cursor: isLoading ? "not-allowed" : "pointer",
            border: "none",
          }}
        >
          {isLoading ? "generating..." : "文章を改善する →"}
        </button>
      </form>

      <ResultDisplay result={result} isLoading={isLoading} />
    </ToolLayout>
  );
}
