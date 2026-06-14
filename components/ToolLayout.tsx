interface ToolLayoutProps {
  num: string;
  title: string;
  titleEn: string;
  children: React.ReactNode;
}

export default function ToolLayout({ num, title, titleEn, children }: ToolLayoutProps) {
  return (
    <main className="p-10 animate-fade-up" style={{ background: "var(--bg)" }}>
      <div className="max-w-2xl">
        {/* Page title */}
        <div className="mb-8">
          <p
            className="text-xs tracking-widest uppercase mb-2"
            style={{ color: "var(--accent)", fontFamily: "'JetBrains Mono', monospace" }}
          >
            {num} — {titleEn}
          </p>
          <h1
            className="font-display"
            style={{ fontSize: "2.4rem", fontWeight: 300, lineHeight: 1.1, color: "var(--ink)" }}
          >
            {title}
          </h1>
          <div className="accent-line mt-3" />
        </div>

        {/* Form card */}
        <div
          className="p-6 rounded-xl"
          style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
        >
          {children}
        </div>
      </div>
    </main>
  );
}
