/**
 * @module openrouter.service
 * @description Mock service for OpenRouter integration.
 * This service simulates the behavior of the real OpenRouterService by returning mock data.
 * It is intended for development and testing purposes.
 */

/**
 * Mock implementation of the OpenRouterService.
 * @class OpenRouterService
 * @description This class provides a mock implementation of the OpenRouterService for development and testing.
 * It has methods to configure the "AI" and to "generate" flashcards, but it returns static mock data.
 *
 * @example
 * ```typescript
 * const openRouter = new OpenRouterService({ apiKey: 'mock-key', timeout: 60000 });
 * const response = await openRouter.sendChatMessage();
 * const data = JSON.parse(response);
 * console.log(data.flashcards);
 * ```
 */
export class OpenRouterService {
  /**
   * Creates an instance of the mock OpenRouterService.
   * @constructor
   * @param {object} config - Configuration object (not used in mock).
   * @param {string} config.apiKey - The API key (mocked).
   * @param {number} config.timeout - The timeout duration (mocked).
   */
  constructor(_config: { apiKey: string; timeout: number }) {}

  /**
   * Mocks setting the model for the AI.
   * @param {string} _model - The model name to be set.
   * @param {any} _options - Configuration options for the model.
   */
  setModel(_model: string, _options: unknown) {}

  /**
   * Mocks setting the system message for the AI.
   * @param {string} _message - The system message.
   */
  setSystemMessage(_message: string) {}

  /**
   * Mocks setting the response format.
   * @param {any} _format - The response format configuration.
   */
  setResponseFormat(_format: unknown) {}

  /**
   * Mocks setting the user message.
   * @param {string} _message - The user message.
   */
  setUserMessage(_message: string) {}

  /**
   * Mocks sending a chat message to the AI and returns a promise with mock flashcard data.
   * @async
   * @returns {Promise<string>} A promise that resolves to a JSON string of mock flashcards.
   */
  async sendChatMessage(): Promise<string> {
    const mockResponse = {
      flashcards: [
        {
          front: "What is Astro?",
          back: "A web framework for building content-driven websites.",
        },
        {
          front: "What is Supabase?",
          back: "An open source Firebase alternative.",
        },
        {
          front: "What is Tailwind CSS?",
          back: "A utility-first CSS framework.",
        },
        { front: "What is React?", back: "A JavaScript library for building user interfaces." },
        {
          front: "What is TypeScript?",
          back: "A typed superset of JavaScript that compiles to plain JavaScript.",
        },
      ],
    };
    return JSON.stringify(mockResponse);
  }
}
