/**
 * @module openrouter.types
 * @description This module defines the types used for OpenRouter integration.
 */

/**
 * Custom error class for OpenRouter specific errors.
 * @class OpenRouterError
 * @extends {Error}
 * @param {string} message - The error message.
 * @param {string} [code] - An optional error code.
 *
 * @example
 * throw new OpenRouterError("Invalid API key", "401");
 */
export class OpenRouterError extends Error {
  constructor(
    public message: string,
    public code?: string
  ) {
    super(message);
    this.name = "OpenRouterError";
  }
}
