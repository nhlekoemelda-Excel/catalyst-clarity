import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const ToolId = z.enum(["email", "meeting", "tasks", "research"]);

const Input = z.object({
  tool: ToolId,
  input: z.string().min(10).max(12000),
  option: z.string().max(60).optional(),
});

export const runAssistant = createServerFn({ method: "POST" })
  .inputValidator((raw: unknown) => Input.parse(raw))
  .handler(async ({ data }) => {
    const { buildPrompt } = await import("./assistant-prompts");
    const { createLovableAiGatewayProvider } = await import("./ai-gateway.server");
    const { streamText } = await import("ai");

    const apiKey = process.env["LOVABLE_API_KEY"];
    if (!apiKey) throw new Error("AI is not configured for this workspace.");

    const gateway = createLovableAiGatewayProvider(apiKey);
    const { system, prompt } = buildPrompt(data.tool, data.input, data.option);

    try {
      const result = streamText({
        model: gateway("google/gemini-2.5-flash"),
        system,
        prompt,
      });
      const text = await result.text;
      return { text };
    } catch (error) {
      const status = (error as { statusCode?: number; status?: number })?.statusCode ??
        (error as { status?: number })?.status;
      if (status === 429) {
        throw new Error("The AI service is busy right now. Please retry in a moment.");
      }
      if (status === 402) {
        throw new Error("This workspace is out of AI credits. Add credits in Lovable to continue.");
      }
      if (status === 403) {
        throw new Error("AI access is blocked by workspace policy. Ask an admin to enable it.");
      }
      throw new Error(
        error instanceof Error ? error.message : "The AI request failed. Please try again.",
      );
    }
  });
