"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const tools = [
  { href: "/blog",      icon: "✍️", label: "ブログ記事生成",  sub: "Blog Writer"     },
  { href: "/email",     icon: "📧", label: "メール文章作成",  sub: "Email Composer"  },
  { href: "/summarize", icon: "📝", label: "文章の要約",      sub: "Summarizer"      },
  { href: "/rewrite",   icon: "🔄", label: "文章のリライト",  sub: "Rewriter"        },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside
      className="flex flex-col w-60 shrink-0 min-h-screen"
      style={{
        background: "var(--sidebar-bg)",
        borderRight: "1px solid var(--sidebar-border)",
      }}
    >
      {/* Logo */}
      <Link href="/">
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
    </aside>
  );
}
