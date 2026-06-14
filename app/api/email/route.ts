import { model } from "@/lib/claude";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const { purpose, recipient, style } = await req.json();

  if (!purpose) {
    return new Response("用件を入力してください", { status: 400 });
  }

  const prompt = `あなたはビジネスメールの専門家です。適切な敬語と構成でメール文章を日本語で書いてください。

以下の条件でメール文章を書いてください。
用件: ${purpose}
宛先: ${recipient || "相手"}
文体: ${style || "丁寧なビジネス文体"}

件名と本文を含む完全なメール形式で書いてください。`;

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
