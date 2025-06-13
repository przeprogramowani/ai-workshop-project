/**
 * @module generation.service
 * @description Service responsible for generating flashcards using AI through OpenRouter integration.
 * This module provides functionality for creating, processing, and storing flashcard generations.
 */

import type { FlashcardProposalDto, GenerationCreateResponseDto } from "../types";
import { OpenRouterService } from "./openrouter.service";
import { OpenRouterError } from "./openrouter.types";
import { calculateHash } from "./utils";
import type { GenerationRepository } from "./generation.repository";

/**
 * Service class for handling flashcard generation using AI.
 * @class GenerationService
 * @description Manages the process of generating flashcards from source text using OpenRouter AI service,
 * including error handling, metadata storage, and generation logging.
 *
 * @requires OpenRouterService
 * @requires GenerationRepository
 *
 * @example
 * ```typescript
 * const openRouterService = new OpenRouterService({ apiKey: 'your-key' });
 * // configure openRouterService
 * const generationRepository = new GenerationRepository(supabaseClient);
 * const generationService = new GenerationService(openRouterService, generationRepository);
 * const result = await generationService.generateFlashcards('Your source text here');
 * ```
 */
export class GenerationService {
  private readonly model = "openai/gpt-4o-mini";

  /**
   * Creates an instance of GenerationService.
   * @constructor
   * @param {OpenRouterService} openRouter - An initialized and configured OpenRouterService instance
   * @param {GenerationRepository} generationRepository - A repository for handling generation data
   */
  constructor(
    private readonly openRouter: OpenRouterService,
    private readonly generationRepository: GenerationRepository
  ) {}

  /**
   * Generates flashcards from provided source text.
   * @async
   * @param {string} sourceText - The text to generate flashcards from
   * @returns {Promise<GenerationCreateResponseDto>} Object containing generation ID, flashcard proposals, and count
   * @throws {Error} When AI service fails or database operations fail
   *
   * @example
   * ```typescript
   * const result = await generationService.generateFlashcards('Your text here');
   * console.log(`Generated ${result.generated_count} flashcards`);
   * ```
   */
  async generateFlashcards(sourceText: string): Promise<GenerationCreateResponseDto> {
    const sourceTextHash = calculateHash(sourceText);
    try {
      // 1. Calculate metadata
      const startTime = Date.now();

      // 2. Call AI service through OpenRouter
      const proposals = await this.callAIService(sourceText);

      // 3. Save generation metadata
      const generationId = await this.generationRepository.saveGeneration({
        sourceText,
        sourceTextHash,
        generatedCount: proposals.length,
        durationMs: Date.now() - startTime,
        model: this.model,
      });

      return {
        generation_id: generationId,
        flashcards_proposals: proposals,
        generated_count: proposals.length,
      };
    } catch (error) {
      // Log error and save to generation_error_logs
      await this.generationRepository.logGenerationError(error, {
        sourceTextHash: sourceTextHash,
        sourceTextLength: sourceText.length,
        model: this.model,
      });
      throw error;
    }
  }

  /**
   * Calls the AI service to generate flashcards.
   * @private
   * @param {string} text - Source text for flashcard generation
   * @returns {Promise<FlashcardProposalDto[]>} Array of generated flashcard proposals
   * @throws {Error} When AI service returns invalid response or encounters an error
   */
  private async callAIService(text: string): Promise<FlashcardProposalDto[]> {
    try {
      // Set the user message with the source text
      this.openRouter.setUserMessage(`Generate flashcards from the following text:\n\n${text}`);

      // Get response from OpenRouter
      const response = await this.openRouter.sendChatMessage();

      // Parse the JSON response
      const data = JSON.parse(response);

      // Validate response structure
      if (!data.flashcards || !Array.isArray(data.flashcards)) {
        throw new Error("Invalid response format: missing flashcards array");
      }

      // Convert to FlashcardProposalDto format
      return data.flashcards.map((card: { front: string; back: string }) => ({
        front: card.front,
        back: card.back,
        source: "ai-full" as const,
      }));
    } catch (error) {
      if (error instanceof OpenRouterError) {
        throw new Error(`AI Service error: ${error.message} (${error.code})`);
      }
      if (error instanceof Error) {
        throw new Error(`AI Service error: ${error.message}`);
      }
      throw new Error("An unknown error occurred in the AI service.");
    }
  }
}
