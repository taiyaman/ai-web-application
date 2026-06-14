"use client";

import { useState } from "react";
import ResultDisplay from "@/components/ResultDisplay";
import ToolLayout from "@/components/ToolLayout";

export default function BlogPage() {
  const [theme, setTheme] = useState("");
  const [length, setLength] = useState("800〜1200文字");
  const [tone, setTone] = useState("カジュアル");
  const [result, setResult] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setResult("");
    setIsLoading(true);
    try {
      const res = await fetch("/api/blog", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ theme, length, tone }),
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
    <ToolLayout num="01" title="ブログ記事生成" titleEn="Blog Writer">
      <form onSubmit={handleSubmit} className="space-y-6 animate-fade-up delay-2">
        <div>
          <label className="block font-mono text-xs tracking-widest uppercase mb-2" style={{ color: "var(--muted)" }}>
            テーマ *
          </label>
          <input
            type="text"
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
            placeholder="例: 初心者向けNext.jsの始め方"
            className="ink-input"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block font-mono text-xs tracking-widest uppercase mb-2" style={{ color: "var(--muted)" }}>
              文字数
            </label>
            <select value={length} onChange={(e) => setLength(e.target.value)} className="ink-input">
              <option>400〜600文字</option>
              <option>800〜1200文字</option>
              <option>1500〜2000文字</option>
            </select>
          </div>
          <div>
            <label className="block font-mono text-xs tracking-widest uppercase mb-2" style={{ color: "var(--muted)" }}>
              トーン
            </label>
            <select value={tone} onChange={(e) => setTone(e.target.value)} className="ink-input">
              <option>カジュアル</option>
              <option>フォーマル</option>
              <option>教育的</option>
              <option>エンターテインメント</option>
            </select>
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
          {isLoading ? "generating..." : "記事を生成する →"}
        </button>
      </form>

      <ResultDisplay result={result} isLoading={isLoading} />
    </ToolLayout>
  );
}
