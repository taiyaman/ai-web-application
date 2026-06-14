import type { Metadata } from "next";
import "./globals.css";
import Sidebar from "@/components/Sidebar";

export const metadata: Metadata = {
  title: "AI Writing Studio",
  description: "AIライティングツール集",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ja" className="h-full">
      <body className="h-full flex" style={{ background: "var(--bg)" }}>
        <Sidebar />
        <div className="flex-1 overflow-y-auto pt-14 md:pt-0">
          {children}
        </div>
      </body>
    </html>
  );
}
