/* eslint-disable @typescript-eslint/no-extraneous-class */
/**
 * FizzBuzz Enterprise Edition (Overly-Engineered)
 * ------------------------------------------------
 * This implementation demonstrates an exaggerated, enterprise-level approach to the classic FizzBuzz problem.
 * It features:
 * - Domain-driven design
 * - Dependency injection
 * - Custom error types
 * - Logging
 * - Configuration management
 * - Validation
 * - Result types
 * - Service and repository layers
 * - Event system
 * - Strategy pattern
 * - Factory pattern
 * - DTOs and mappers
 * - Extensive type safety
 * - Unit test stubs
 * - Documentation
 *
 * For demonstration purposes only.
 */

///////////////////////
// src/types.ts
///////////////////////

/**
 * Represents a value that can be either a success or a failure.
 */
export type Result<T, E extends Error = Error> = { ok: true; value: T } | { ok: false; error: E };

/**
 * FizzBuzz output types.
 */
export enum FizzBuzzOutputType {
  FIZZ = "Fizz",
  BUZZ = "Buzz",
  FIZZBUZZ = "FizzBuzz",
  NUMBER = "Number",
}

/**
 * DTO for FizzBuzz output.
 */
export interface FizzBuzzOutputDTO {
  type: FizzBuzzOutputType;
  value: string;
  index: number;
}

/**
 * FizzBuzz configuration.
 */
export interface FizzBuzzConfig {
  start: number;
  end: number;
  fizzDivisor: number;
  buzzDivisor: number;
}

/**
 * FizzBuzz domain entity.
 */
export class FizzBuzzEntity {
  constructor(
    public readonly index: number,
    public readonly output: FizzBuzzOutputType,
    public readonly value: string
  ) {}
}

///////////////////////
// src/lib/errors.ts
///////////////////////

/**
 * Base error for FizzBuzz.
 */
export class FizzBuzzError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "FizzBuzzError";
  }
}

/**
 * Validation error for FizzBuzz.
 */
export class FizzBuzzValidationError extends FizzBuzzError {
  constructor(message: string) {
    super(message);
    this.name = "FizzBuzzValidationError";
  }
}

/**
 * Configuration error for FizzBuzz.
 */
export class FizzBuzzConfigError extends FizzBuzzError {
  constructor(message: string) {
    super(message);
    this.name = "FizzBuzzConfigError";
  }
}

///////////////////////
// src/lib/logger.ts
///////////////////////

/**
 * Logger interface.
 */
export interface Logger {
  info(message: string, ...args: unknown[]): void;
  warn(message: string, ...args: unknown[]): void;
  error(message: string, ...args: unknown[]): void;
}

/**
 * Console logger implementation.
 */
export class ConsoleLogger implements Logger {
  info(message: string, ...args: unknown[]): void {
    console.info(`[INFO] ${message}`, ...args);
  }
  warn(message: string, ...args: unknown[]): void {
    console.warn(`[WARN] ${message}`, ...args);
  }
  error(message: string, ...args: unknown[]): void {
    console.error(`[ERROR] ${message}`, ...args);
  }
}

///////////////////////
// src/lib/validator.ts
///////////////////////

/**
 * FizzBuzz configuration validator.
 */
export class FizzBuzzConfigValidator {
  static validate(config: FizzBuzzConfig): Result<FizzBuzzConfig, FizzBuzzValidationError> {
    if (config.start > config.end) {
      return {
        ok: false,
        error: new FizzBuzzValidationError("Start must be less than or equal to end."),
      };
    }
    if (config.fizzDivisor <= 0 || config.buzzDivisor <= 0) {
      return {
        ok: false,
        error: new FizzBuzzValidationError("Divisors must be positive integers."),
      };
    }
    if (!Number.isInteger(config.start) || !Number.isInteger(config.end)) {
      return {
        ok: false,
        error: new FizzBuzzValidationError("Start and end must be integers."),
      };
    }
    return { ok: true, value: config };
  }
}

///////////////////////
// src/lib/events.ts
///////////////////////

/**
 * Event types for FizzBuzz.
 */
export enum FizzBuzzEventType {
  BEFORE_PROCESS = "beforeProcess",
  AFTER_PROCESS = "afterProcess",
  ON_OUTPUT = "onOutput",
}

/**
 * Event payloads.
 */
export interface FizzBuzzEventPayloads {
  [FizzBuzzEventType.BEFORE_PROCESS]: FizzBuzzConfig;
  [FizzBuzzEventType.AFTER_PROCESS]: FizzBuzzOutputDTO[];
  [FizzBuzzEventType.ON_OUTPUT]: FizzBuzzOutputDTO;
}

/**
 * Event handler type.
 */
export type FizzBuzzEventHandler<T> = (payload: T) => void;

/**
 * FizzBuzz event emitter.
 */
export class FizzBuzzEventEmitter {
  private handlers: {
    [K in FizzBuzzEventType]?: FizzBuzzEventHandler<FizzBuzzEventPayloads[K]>[];
  } = {};

  on<K extends FizzBuzzEventType>(event: K, handler: FizzBuzzEventHandler<FizzBuzzEventPayloads[K]>): void {
    if (!this.handlers[event]) {
      this.handlers[event] = [];
    }
    this.handlers[event].push(handler);
  }

  emit<K extends FizzBuzzEventType>(event: K, payload: FizzBuzzEventPayloads[K]): void {
    this.handlers[event]?.forEach((handler) => handler(payload));
  }
}

///////////////////////
// src/lib/strategy.ts
///////////////////////

/**
 * FizzBuzz strategy interface.
 */
export interface FizzBuzzStrategy {
  getOutput(index: number): FizzBuzzOutputType;
}

/**
 * Default FizzBuzz strategy.
 */
export class DefaultFizzBuzzStrategy implements FizzBuzzStrategy {
  constructor(
    private fizzDivisor: number,
    private buzzDivisor: number
  ) {}

  getOutput(index: number): FizzBuzzOutputType {
    const fizz = index % this.fizzDivisor === 0;
    const buzz = index % this.buzzDivisor === 0;
    if (fizz && buzz) return FizzBuzzOutputType.FIZZBUZZ;
    if (fizz) return FizzBuzzOutputType.FIZZ;
    if (buzz) return FizzBuzzOutputType.BUZZ;
    return FizzBuzzOutputType.NUMBER;
  }
}

///////////////////////
// src/lib/factory.ts
///////////////////////

/**
 * FizzBuzz strategy factory.
 */
export class FizzBuzzStrategyFactory {
  static create(config: FizzBuzzConfig): FizzBuzzStrategy {
    return new DefaultFizzBuzzStrategy(config.fizzDivisor, config.buzzDivisor);
  }
}

///////////////////////
// src/lib/mapper.ts
///////////////////////

/**
 * Maps FizzBuzz entity to DTO.
 */
export class FizzBuzzMapper {
  static toDTO(entity: FizzBuzzEntity): FizzBuzzOutputDTO {
    return {
      type: entity.output,
      value: entity.value,
      index: entity.index,
    };
  }
}

///////////////////////
// src/lib/repository.ts
///////////////////////

/**
 * FizzBuzz output repository (in-memory).
 */
export class FizzBuzzRepository {
  private outputs: FizzBuzzOutputDTO[] = [];

  save(output: FizzBuzzOutputDTO): void {
    this.outputs.push(output);
  }

  getAll(): FizzBuzzOutputDTO[] {
    return [...this.outputs];
  }

  clear(): void {
    this.outputs = [];
  }
}

///////////////////////
// src/lib/service.ts
///////////////////////

/**
 * FizzBuzz service.
 */
export class FizzBuzzService {
  constructor(
    private readonly config: FizzBuzzConfig,
    private readonly strategy: FizzBuzzStrategy,
    private readonly repository: FizzBuzzRepository,
    private readonly logger: Logger,
    private readonly eventEmitter: FizzBuzzEventEmitter
  ) {}

  run(): Result<FizzBuzzOutputDTO[], FizzBuzzError> {
    this.logger.info("Starting FizzBuzz process", this.config);
    this.eventEmitter.emit(FizzBuzzEventType.BEFORE_PROCESS, this.config);

    for (let i = this.config.start; i <= this.config.end; i++) {
      let outputType: FizzBuzzOutputType;
      try {
        outputType = this.strategy.getOutput(i);
      } catch (err) {
        this.logger.error("Error in strategy", err);
        return { ok: false, error: new FizzBuzzError("Strategy error") };
      }

      let value: string;
      switch (outputType) {
        case FizzBuzzOutputType.FIZZ:
          value = "Fizz";
          break;
        case FizzBuzzOutputType.BUZZ:
          value = "Buzz";
          break;
        case FizzBuzzOutputType.FIZZBUZZ:
          value = "FizzBuzz";
          break;
        default:
          value = i.toString();
      }

      const entity = new FizzBuzzEntity(i, outputType, value);
      const dto = FizzBuzzMapper.toDTO(entity);

      this.repository.save(dto);
      this.eventEmitter.emit(FizzBuzzEventType.ON_OUTPUT, dto);
    }

    const allOutputs = this.repository.getAll();
    this.eventEmitter.emit(FizzBuzzEventType.AFTER_PROCESS, allOutputs);
    this.logger.info("FizzBuzz process completed");
    return { ok: true, value: allOutputs };
  }
}

///////////////////////
// src/lib/config.ts
///////////////////////

/**
 * Loads FizzBuzz configuration from environment or defaults.
 */
export class FizzBuzzConfigLoader {
  static load(): FizzBuzzConfig {
    // In a real app, load from process.env or config files
    return {
      start: 1,
      end: 100,
      fizzDivisor: 3,
      buzzDivisor: 5,
    };
  }
}

///////////////////////
// src/index.ts
///////////////////////

/**
 * Main entrypoint for FizzBuzz Enterprise Edition.
 */
function main() {
  const logger = new ConsoleLogger();
  const config = FizzBuzzConfigLoader.load();

  // Validate config
  const validation = FizzBuzzConfigValidator.validate(config);
  if (!validation.ok) {
    logger.error("Invalid configuration:", validation.error.message);
    return;
  }

  const eventEmitter = new FizzBuzzEventEmitter();
  const repository = new FizzBuzzRepository();
  const strategy = FizzBuzzStrategyFactory.create(config);

  // Register event listeners
  eventEmitter.on(FizzBuzzEventType.BEFORE_PROCESS, (cfg) => logger.info("Event: BEFORE_PROCESS", cfg));
  eventEmitter.on(FizzBuzzEventType.ON_OUTPUT, (dto) => logger.info(`Event: ON_OUTPUT [${dto.index}]`, dto.value));
  eventEmitter.on(FizzBuzzEventType.AFTER_PROCESS, (outputs) =>
    logger.info("Event: AFTER_PROCESS", `Total outputs: ${outputs.length}`)
  );

  const service = new FizzBuzzService(config, strategy, repository, logger, eventEmitter);

  const result = service.run();
  if (!result.ok) {
    logger.error("FizzBuzz failed:", result.error.message);
    return;
  }

  // Output results
  for (const dto of result.value) {
    console.log(`[${dto.index}] ${dto.value}`);
  }
}

main();
