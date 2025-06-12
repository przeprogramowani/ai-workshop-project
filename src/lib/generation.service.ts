/**
 * @module generation.service
 * @description Service responsible for generating flashcards using AI through OpenRouter integration.
 * This module provides functionality for creating, processing, and storing flashcard generations.
 */

import crypto from "crypto";
import type { FlashcardProposalDto, GenerationCreateResponseDto } from "../types";
import type { SupabaseClient } from "../db/supabase.client";
import { DEFAULT_USER_ID } from "../db/mock-data";
import { OpenRouterService } from "./openrouter.service";
import { OpenRouterError } from "./openrouter.types";

/**
 * Service class for handling flashcard generation using AI.
 * @class GenerationService
 * @description Manages the process of generating flashcards from source text using OpenRouter AI service,
 * including error handling, metadata storage, and generation logging.
 *
 * @requires OpenRouterService
 * @requires SupabaseClient
 *
 * @example
 * ```typescript
 * const generationService = new GenerationService(supabaseClient, { apiKey: 'your-openrouter-api-key' });
 * const result = await generationService.generateFlashcards('Your source text here');
 * ```
 */
export class GenerationService {
  private readonly openRouter: OpenRouterService;
  private readonly model = "openai/gpt-4o-mini";

  /**
   * Creates an instance of GenerationService.
   * @constructor
   * @param {SupabaseClient} supabase - Supabase client instance for database operations
   * @param {Object} [openRouterConfig] - Configuration object for OpenRouter
   * @param {string} openRouterConfig.apiKey - OpenRouter API key
   * @throws {Error} When OpenRouter API key is not provided
   */
  constructor(
    private readonly supabase: SupabaseClient,
    openRouterConfig?: { apiKey: string }
  ) {
    if (!openRouterConfig?.apiKey) {
      throw new Error("OpenRouter API key is required");
    }
    this.openRouter = new OpenRouterService({
      apiKey: openRouterConfig.apiKey,
      timeout: 60000, // 60 seconds timeout for longer generations
    });

    // Configure OpenRouter
    this.openRouter.setModel(this.model, {
      temperature: 0.7,
      top_p: 1,
    });

    this.openRouter
      .setSystemMessage(`You are an AI assistant specialized in creating high-quality flashcards from provided text.
Generate concise, clear, and effective flashcards that capture key concepts and knowledge.
Each flashcard should have a front (question/prompt) and back (answer/explanation).
Focus on important facts, definitions, concepts, and relationships.`);

    this.openRouter.setResponseFormat({
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
  }

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
    try {
      // 1. Calculate metadata
      const startTime = Date.now();
      const sourceTextHash = await this.calculateHash(sourceText);

      // 2. Call AI service through OpenRouter
      const proposals = await this.callAIService(sourceText);

      // 3. Save generation metadata
      const generationId = await this.saveGenerationMetadata({
        sourceText,
        sourceTextHash,
        generatedCount: proposals.length,
        durationMs: Date.now() - startTime,
      });

      return {
        generation_id: generationId,
        flashcards_proposals: proposals,
        generated_count: proposals.length,
      };
    } catch (error) {
      // Log error and save to generation_error_logs
      await this.logGenerationError(error, {
        sourceTextHash: await this.calculateHash(sourceText),
        sourceTextLength: sourceText.length,
      });
      throw error;
    }
  }

  /**
   * Calculates MD5 hash of provided text.
   * @private
   * @param {string} text - Text to hash
   * @returns {Promise<string>} MD5 hash of the text
   */
  private async calculateHash(text: string): Promise<string> {
    return crypto.createHash("md5").update(text).digest("hex");
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

  /**
   * Saves generation metadata to the database.
   * @private
   * @param {Object} data - Generation metadata
   * @param {string} data.sourceText - Original source text
   * @param {string} data.sourceTextHash - Hash of the source text
   * @param {number} data.generatedCount - Number of generated flashcards
   * @param {number} data.durationMs - Generation duration in milliseconds
   * @returns {Promise<number>} ID of the saved generation record
   * @throws {Error} When database operation fails
   */
  private async saveGenerationMetadata(data: {
    sourceText: string;
    sourceTextHash: string;
    generatedCount: number;
    durationMs: number;
  }): Promise<number> {
    const { data: generation, error } = await this.supabase
      .from("generations")
      .insert({
        user_id: DEFAULT_USER_ID,
        source_text_hash: data.sourceTextHash,
        source_text_length: data.sourceText.length,
        generated_count: data.generatedCount,
        generation_duration: data.durationMs,
        model: this.model,
      })
      .select("id")
      .single();

    if (error) throw error;
    return generation.id;
  }

  /**
   * Logs generation errors to the database.
   * @private
   * @param {unknown} error - Error that occurred during generation
   * @param {Object} data - Additional error context
   * @param {string} data.sourceTextHash - Hash of the source text
   * @param {number} data.sourceTextLength - Length of the source text
   * @returns {Promise<void>}
   */
  private async logGenerationError(
    error: unknown,
    data: {
      sourceTextHash: string;
      sourceTextLength: number;
    }
  ): Promise<void> {
    const errorMessage = error instanceof Error ? error.message : String(error);
    const errorCode = error instanceof Error ? error.name : "UNKNOWN";

    await this.supabase.from("generation_error_logs").insert({
      user_id: DEFAULT_USER_ID,
      error_code: errorCode,
      error_message: errorMessage,
      model: this.model,
      source_text_hash: data.sourceTextHash,
      source_text_length: data.sourceTextLength,
    });
  }
}
