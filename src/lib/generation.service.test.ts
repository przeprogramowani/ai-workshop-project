import { vi, describe, it, expect, beforeEach } from "vitest";
import { GenerationService } from "./generation.service";
import type { OpenRouterService } from "./openrouter.service";
import type { GenerationRepository } from "./generation.repository";
import type { FlashcardProposalDto } from "../types";

// Mocks
const mockOpenRouterService = {
  setUserMessage: vi.fn(),
  sendChatMessage: vi.fn(),
} as unknown as OpenRouterService;

const mockGenerationRepository = {
  saveGeneration: vi.fn(),
  logGenerationError: vi.fn(),
} as unknown as GenerationRepository;

describe("GenerationService", () => {
  let generationService: GenerationService;

  beforeEach(() => {
    vi.resetAllMocks();
    generationService = new GenerationService(mockOpenRouterService, mockGenerationRepository);
  });

  describe("generateFlashcards", () => {
    it("given valid source text, when flashcards are generated successfully, then it should return flashcard proposals", async () => {
      // Given
      const sourceText = "This is a test text for generating flashcards.";
      const mockProposals: FlashcardProposalDto[] = [
        { front: "Q1", back: "A1", source: "ai-full" },
        { front: "Q2", back: "A2", source: "ai-full" },
      ];
      vi.mocked(mockOpenRouterService.sendChatMessage).mockResolvedValue(JSON.stringify({ flashcards: mockProposals }));
      vi.mocked(mockGenerationRepository.saveGeneration).mockResolvedValue(1);

      // When
      const result = await generationService.generateFlashcards(sourceText);

      // Then
      expect(result.flashcards_proposals).toEqual(mockProposals);
    });

    it("given valid source text, when flashcards are generated successfully, then it should return the correct generation ID", async () => {
      // Given
      const sourceText = "This is a test text for generating flashcards.";
      const generationId = 123;
      vi.mocked(mockOpenRouterService.sendChatMessage).mockResolvedValue(JSON.stringify({ flashcards: [] }));
      vi.mocked(mockGenerationRepository.saveGeneration).mockResolvedValue(generationId);

      // When
      const result = await generationService.generateFlashcards(sourceText);

      // Then
      expect(result.generation_id).toBe(generationId);
    });

    it("given an error from the AI service, when generating flashcards, then it should throw an error", async () => {
      // Given
      const sourceText = "This text will cause an AI error.";
      const aiError = new Error("AI service failed");
      vi.mocked(mockOpenRouterService.sendChatMessage).mockRejectedValue(aiError);

      // When & Then
      await expect(generationService.generateFlashcards(sourceText)).rejects.toThrow("AI service failed");
    });

    it("given an error from the AI service, when generating flashcards, then it should log the error", async () => {
      // Given
      const sourceText = "This text will cause an AI error to be logged.";
      const aiError = new Error("AI service failed");
      vi.mocked(mockOpenRouterService.sendChatMessage).mockRejectedValue(aiError);

      // When
      await expect(generationService.generateFlashcards(sourceText)).rejects.toThrow();

      // Then
      expect(mockGenerationRepository.logGenerationError).toHaveBeenCalledWith(expect.any(Error), expect.anything());
    });

    it("given an invalid response format from the AI service, when generating flashcards, then it should throw an error", async () => {
      // Given
      const sourceText = "This text returns invalid AI data.";
      vi.mocked(mockOpenRouterService.sendChatMessage).mockResolvedValue(
        JSON.stringify({ data: "invalid" }) // Missing 'flashcards' array
      );

      // When & Then
      await expect(generationService.generateFlashcards(sourceText)).rejects.toThrow(
        "Invalid response format: missing flashcards array"
      );
    });

    it("given a database error on save, when generating flashcards, then it should throw an error", async () => {
      // Given
      const sourceText = "This text causes a DB error.";
      const dbError = new Error("Database connection lost");
      vi.mocked(mockOpenRouterService.sendChatMessage).mockResolvedValue(
        JSON.stringify({ flashcards: [{ front: "Q", back: "A", source: "ai-full" }] })
      );
      vi.mocked(mockGenerationRepository.saveGeneration).mockRejectedValue(dbError);

      // When & Then
      await expect(generationService.generateFlashcards(sourceText)).rejects.toThrow("Database connection lost");
    });
  });
});
