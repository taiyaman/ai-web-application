"use client";

import { useState } from "react";
import ResultDisplay from "@/components/ResultDisplay";
import ToolLayout from "@/components/ToolLayout";

export default function EmailPage() {
  const [purpose, setPurpose] = useState("");
  const [recipient, setRecipient] = useState("上司");
  const [style, setStyle] = useState("丁寧なビジネス文体");
  const [result, setResult] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setResult("");
    setIsLoading(true);
    try {
      const res = await fetch("/api/email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ purpose, recipient, style }),
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
    <ToolLayout num="02" title="メール文章作成" titleEn="Email Composer">
      <form onSubmit={handleSubmit} className="space-y-6 animate-fade-up delay-2">
        <div>
          <label className="block font-mono text-xs tracking-widest uppercase mb-2" style={{ color: "var(--muted)" }}>
            用件 *
          </label>
          <textarea
            value={purpose}
            onChange={(e) => setPurpose(e.target.value)}
            placeholder="例: 来週の会議の日程変更をお願いしたい"
            rows={4}
            className="ink-input resize-none"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block font-mono text-xs tracking-widest uppercase mb-2" style={{ color: "var(--muted)" }}>
              宛先
            </label>
            <select value={recipient} onChange={(e) => setRecipient(e.target.value)} className="ink-input">
              <option>上司</option>
              <option>同僚</option>
              <option>取引先・クライアント</option>
              <option>友人・知人</option>
            </select>
          </div>
          <div>
            <label className="block font-mono text-xs tracking-widest uppercase mb-2" style={{ color: "var(--muted)" }}>
              文体
            </label>
            <select value={style} onChange={(e) => setStyle(e.target.value)} className="ink-input">
              <option>丁寧なビジネス文体</option>
              <option>フレンドリー</option>
              <option>フォーマル・格式ばった</option>
              <option>簡潔・シンプル</option>
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
          {isLoading ? "generating..." : "メールを作成する →"}
        </button>
      </form>

      <ResultDisplay result={result} isLoading={isLoading} />
    </ToolLayout>
  );
}
