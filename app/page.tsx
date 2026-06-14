export default function Home() {
  return (
    <main className="p-10 animate-fade-up" style={{ background: "var(--bg)" }}>
      <div className="max-w-xl">
        <p
          className="text-xs tracking-widest uppercase mb-4"
          style={{ color: "var(--accent)", fontFamily: "'JetBrains Mono', monospace" }}
        >
          Welcome
        </p>
        <h1
          className="font-display mb-4"
          style={{ fontSize: "2.8rem", fontWeight: 300, lineHeight: 1.1, color: "var(--ink)" }}
        >
          AI Writing<br />
          <em style={{ color: "var(--accent)" }}>Studio</em>
        </h1>
        <p style={{ color: "var(--muted)", lineHeight: 1.8, fontSize: "0.95rem" }}>
          左のサイドバーからツールを選んでください。
          ブログ記事・メール・要約・リライトの4つの機能が利用できます。
        </p>

        <div
          className="mt-8 p-5 rounded-xl"
          style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
        >
          <p
            className="text-xs tracking-widest uppercase mb-3"
            style={{ color: "var(--muted)", fontFamily: "'JetBrains Mono', monospace" }}
          >
            Available Tools
          </p>
          <div className="space-y-2">
            {[
              ["✍️", "ブログ記事生成", "/blog"],
              ["📧", "メール文章作成", "/email"],
              ["📝", "文章の要約",     "/summarize"],
              ["🔄", "文章のリライト", "/rewrite"],
            ].map(([icon, label, href]) => (
              <a key={href} href={href}>
                <div
                  className="flex items-center gap-3 px-3 py-2 rounded-lg transition-colors duration-150 hover:bg-[var(--accent-light)]"
                  style={{ color: "var(--ink-soft)" }}
                >
                  <span>{icon}</span>
                  <span className="text-sm">{label}</span>
                  <span className="ml-auto text-xs" style={{ color: "var(--muted)" }}>→</span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
