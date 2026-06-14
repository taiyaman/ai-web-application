"use client";

import { useState } from "react";
import ResultDisplay from "@/components/ResultDisplay";
import ToolLayout from "@/components/ToolLayout";

export default function SummarizePage() {
  const [text, setText] = useState("");
  const [format, setFormat] = useState("bullets");
  const [result, setResult] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setResult("");
    setIsLoading(true);
    try {
      const res = await fetch("/api/summarize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, format }),
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
    <ToolLayout num="03" title="文章の要約" titleEn="Summarizer">
      <form onSubmit={handleSubmit} className="space-y-6 animate-fade-up delay-2">
        <div>
          <label className="block font-mono text-xs tracking-widest uppercase mb-2" style={{ color: "var(--muted)" }}>
            要約したい文章 *
          </label>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="要約したい文章をここに貼り付けてください..."
            rows={8}
            className="ink-input resize-y"
            required
          />
        </div>

        <div>
          <label className="block font-mono text-xs tracking-widest uppercase mb-3" style={{ color: "var(--muted)" }}>
            出力形式
          </label>
          <div className="flex gap-0">
            {[
              { value: "bullets", label: "箇条書き" },
              { value: "paragraph", label: "段落形式" },
            ].map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => setFormat(opt.value)}
                className="flex-1 py-2.5 font-mono text-xs tracking-wider transition-all duration-150"
                style={{
                  background: format === opt.value ? "var(--accent)" : "var(--ink-soft)",
                  color: format === opt.value ? "var(--paper)" : "var(--muted)",
                  border: "1px solid var(--border)",
                }}
              >
                {opt.label}
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
          {isLoading ? "generating..." : "要約する →"}
        </button>
      </form>

      <ResultDisplay result={result} isLoading={isLoading} />
    </ToolLayout>
  );
}
