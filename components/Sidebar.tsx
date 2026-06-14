"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

const tools = [
  { href: "/blog",      icon: "✍️", label: "ブログ記事生成",  sub: "Blog Writer"     },
  { href: "/email",     icon: "📧", label: "メール文章作成",  sub: "Email Composer"  },
  { href: "/summarize", icon: "📝", label: "文章の要約",      sub: "Summarizer"      },
  { href: "/rewrite",   icon: "🔄", label: "文章のリライト",  sub: "Rewriter"        },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // ページ遷移時にドロワーを閉じる
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const navContent = (
    <>
      {/* Logo */}
      <Link href="/" onClick={() => setOpen(false)}>
        <div
          className="px-5 py-5"
          style={{ borderBottom: "1px solid var(--sidebar-border)" }}
        >
          <div className="flex items-center gap-2 mb-0.5">
            <div
              className="w-5 h-5 rounded"
              style={{ background: "var(--accent)" }}
            />
            <span
              className="font-display text-base"
              style={{ color: "var(--ink)", fontWeight: 400 }}
            >
              Writing Studio
            </span>
          </div>
          <p
            className="text-xs pl-7"
            style={{ color: "var(--muted)", fontFamily: "'JetBrains Mono', monospace" }}
          >
            powered by Gemini
          </p>
        </div>
      </Link>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        <p
          className="px-2 mb-2 text-xs tracking-widest uppercase"
          style={{ color: "var(--muted)", fontFamily: "'JetBrains Mono', monospace" }}
        >
          Tools
        </p>
        {tools.map((t) => {
          const active = pathname === t.href;
          return (
            <Link key={t.href} href={t.href}>
              <div
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-150 cursor-pointer"
                style={{
                  background: active ? "var(--surface)" : "transparent",
                  boxShadow: active ? "0 1px 3px rgba(0,0,0,0.07)" : "none",
                  borderLeft: active ? `3px solid var(--accent)` : "3px solid transparent",
                }}
              >
                <span className="text-base leading-none">{t.icon}</span>
                <div className="min-w-0">
                  <p
                    className="text-sm truncate"
                    style={{
                      color: active ? "var(--ink)" : "var(--ink-soft)",
                      fontWeight: active ? 500 : 300,
                    }}
                  >
                    {t.label}
                  </p>
                  <p
                    className="text-xs truncate"
                    style={{
                      color: "var(--muted)",
                      fontFamily: "'JetBrains Mono', monospace",
                    }}
                  >
                    {t.sub}
                  </p>
                </div>
              </div>
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div
        className="px-5 py-4 text-xs"
        style={{
          borderTop: "1px solid var(--sidebar-border)",
          color: "var(--muted)",
          fontFamily: "'JetBrains Mono', monospace",
        }}
      >
        AI Writing Tools v1.0
      </div>
    </>
  );

  return (
    <>
      {/* デスクトップ: 固定サイドバー */}
      <aside
        className="hidden md:flex flex-col w-60 shrink-0 min-h-screen"
        style={{
          background: "var(--sidebar-bg)",
          borderRight: "1px solid var(--sidebar-border)",
        }}
      >
        {navContent}
      </aside>

      {/* モバイル: ヘッダーバー */}
      <div
        className="md:hidden fixed top-0 left-0 right-0 z-40 flex items-center px-4 h-14"
        style={{
          background: "var(--sidebar-bg)",
          borderBottom: "1px solid var(--sidebar-border)",
        }}
      >
        <button
          onClick={() => setOpen(true)}
          aria-label="メニューを開く"
          className="p-2 rounded-lg"
          style={{ color: "var(--ink)" }}
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
            <rect y="3" width="20" height="2" rx="1" />
            <rect y="9" width="20" height="2" rx="1" />
            <rect y="15" width="20" height="2" rx="1" />
          </svg>
        </button>
        <div className="flex items-center gap-2 ml-3">
          <div className="w-4 h-4 rounded" style={{ background: "var(--accent)" }} />
          <span className="font-display text-sm" style={{ color: "var(--ink)", fontWeight: 400 }}>
            Writing Studio
          </span>
        </div>
      </div>

      {/* モバイル: オーバーレイ */}
      {open && (
        <div
          className="md:hidden fixed inset-0 z-40 bg-black/40"
          onClick={() => setOpen(false)}
        />
      )}

      {/* モバイル: ドロワー */}
      <aside
        className={`md:hidden fixed top-0 left-0 z-50 flex flex-col w-72 h-full transition-transform duration-300 ${open ? "translate-x-0" : "-translate-x-full"}`}
        style={{
          background: "var(--sidebar-bg)",
          borderRight: "1px solid var(--sidebar-border)",
        }}
      >
        <div className="flex items-center justify-end px-4 h-14" style={{ borderBottom: "1px solid var(--sidebar-border)" }}>
          <button
            onClick={() => setOpen(false)}
            aria-label="メニューを閉じる"
            className="p-2 rounded-lg"
            style={{ color: "var(--ink)" }}
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="currentColor">
              <line x1="1" y1="1" x2="17" y2="17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              <line x1="17" y1="1" x2="1" y2="17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </div>
        {navContent}
      </aside>
    </>
  );
}
