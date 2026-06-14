"use client";

import { useState } from "react";

interface ResultDisplayProps {
  result: string;
  isLoading: boolean;
}

export default function ResultDisplay({ result, isLoading }: ResultDisplayProps) {
  const [copied, setCopied] = useState(false);

  if (!result && !isLoading) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="mt-6 animate-fade-up">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="accent-line" />
          <span
            className="text-xs tracking-widest uppercase"
            style={{ color: "var(--muted)", fontFamily: "'JetBrains Mono', monospace" }}
          >
            生成結果
          </span>
        </div>
        {result && (
          <button
            onClick={handleCopy}
            className="text-xs px-3 py-1 rounded-md border transition-all duration-150"
            style={{
              borderColor: copied ? "var(--accent)" : "var(--border)",
              color: copied ? "var(--accent)" : "var(--muted)",
              background: copied ? "var(--accent-light)" : "transparent",
            }}
          >
            {copied ? "✓ コピー済み" : "コピー"}
          </button>
        )}
      </div>

      <div
        className="relative p-5 rounded-lg"
        style={{
          background: "var(--sidebar-bg)",
          border: "1px solid var(--border)",
          minHeight: "10rem",
        }}
      >
        {isLoading && !result && (
          <div className="flex items-center gap-2" style={{ color: "var(--muted)" }}>
            <span
              className="text-xs"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              generating
            </span>
            <span
              className="cursor-blink text-sm"
              style={{ color: "var(--accent)" }}
            >
              ▌
            </span>
          </div>
        )}
        <pre
          className="whitespace-pre-wrap leading-relaxed"
          style={{
            fontSize: "0.85rem",
            color: "var(--ink-soft)",
            fontFamily: "'JetBrains Mono', monospace",
            lineHeight: 1.85,
          }}
        >
          {result}
          {isLoading && result && (
            <span className="cursor-blink" style={{ color: "var(--accent)" }}>▌</span>
          )}
        </pre>
      </div>

      {result && (
        <p
          className="text-xs mt-2 text-right"
          style={{ color: "var(--muted)", fontFamily: "'JetBrains Mono', monospace" }}
        >
          {result.length.toLocaleString()} chars
        </p>
      )}
    </div>
  );
}
