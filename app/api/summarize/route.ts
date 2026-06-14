import { model } from "@/lib/claude";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const { text, format } = await req.json();

  if (!text) {
    return new Response("テキストを入力してください", { status: 400 });
  }

  const prompt = `あなたは文章の要約の専門家です。重要なポイントを押さえた簡潔な要約を日本語で作成してください。

以下の文章を要約してください。
形式: ${format === "bullets" ? "箇条書きで3〜5点にまとめてください" : "2〜3段落の文章形式でまとめてください"}

---
${text}
---`;

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
