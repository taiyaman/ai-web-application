import { model } from "@/lib/claude";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const { theme, length, tone } = await req.json();

  if (!theme) {
    return new Response("テーマを入力してください", { status: 400 });
  }

  const prompt = `あなたはプロのブログライターです。読者を引き込む魅力的なブログ記事を日本語で書いてください。
文章は読みやすく、見出しや段落を適切に使ってください。

以下の条件でブログ記事を書いてください。
テーマ: ${theme}
文字数: ${length || "800〜1200文字"}
トーン: ${tone || "読みやすいカジュアルな文体"}`;

  const readable = new ReadableStream({
    async start(controller) {
      const encoder = new TextEncoder();
      try {
        const result = await model.generateContentStream(prompt);
        for await (const chunk of result.stream) {
          controller.enqueue(encoder.encode(chunk.text()));
        }
        controller.close();
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : String(err);
        controller.enqueue(encoder.encode(`[エラー] ${message}`));
        controller.close();
      }
    },
  });

  return new Response(readable, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
