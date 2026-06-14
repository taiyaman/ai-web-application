import { model } from "@/lib/claude";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const { text, direction } = await req.json();

  if (!text) {
    return new Response("テキストを入力してください", { status: 400 });
  }

  const prompt = `あなたは文章改善の専門家です。元の意味を保ちながら、指定された方向性で文章をより良くしてください。

以下の文章を改善してください。
改善の方向性: ${direction || "より自然で読みやすく"}

---
${text}
---

改善後の文章だけを出力してください。`;

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
