import { OpenRouterService } from "../openrouter.service";

const model = "openai/gpt-4o-mini";

export function createOpenRouterService(apiKey: string) {
  const openRouterService = new OpenRouterService({
    apiKey: apiKey,
    timeout: 60000, // 60 seconds timeout for longer generations
  });

  openRouterService.setModel(model, {
    temperature: 0.7,
    top_p: 1,
  });

  openRouterService.setSystemMessage(`You are an AI assistant specialized in creating high-quality flashcards from provided text.
Generate concise, clear, and effective flashcards that capture key concepts and knowledge.
Each flashcard should have a front (question/prompt) and back (answer/explanation).
Focus on important facts, definitions, concepts, and relationships.`);

  openRouterService.setResponseFormat({
    name: "flashcards",
    schema: {
      type: "object",
      properties: {
        flashcards: {
          type: "array",
          items: {
            type: "object",
            properties: {
              front: { type: "string" },
              back: { type: "string" },
            },
            required: ["front", "back"],
          },
        },
      },
      required: ["flashcards"],
    },
  });

  return openRouterService;
}
