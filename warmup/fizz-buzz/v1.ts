/**
 * FizzBuzz implementation with extensibility and complexity in mind.
 * - Handles custom rules.
 * - Uses functional approach for composability.
 * - Validates input and handles edge cases.
 */

interface FizzBuzzRule {
  divisor: number;
  label: string;
}

interface FizzBuzzOptions {
  start?: number;
  end: number;
  rules?: FizzBuzzRule[];
}

class FizzBuzzError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "FizzBuzzError";
  }
}

const DEFAULT_RULES: FizzBuzzRule[] = [
  { divisor: 3, label: "Fizz" },
  { divisor: 5, label: "Buzz" },
];

function validateOptions(options: FizzBuzzOptions): void {
  if (options.end == null || isNaN(options.end)) {
    throw new FizzBuzzError("`end` is required and must be a number.");
  }
  if (options.start != null && isNaN(options.start)) {
    throw new FizzBuzzError("`start` must be a number if provided.");
  }
  if (options.start != null && options.start > options.end) {
    throw new FizzBuzzError("`start` must be less than or equal to `end`.");
  }
  if (options.rules) {
    for (const rule of options.rules) {
      if (!rule.divisor || !rule.label) {
        throw new FizzBuzzError("Each rule must have a divisor and a label.");
      }
      if (typeof rule.divisor !== "number" || rule.divisor <= 0) {
        throw new FizzBuzzError("Rule divisor must be a positive number.");
      }
      if (typeof rule.label !== "string" || !rule.label.trim()) {
        throw new FizzBuzzError("Rule label must be a non-empty string.");
      }
    }
  }
}

function fizzBuzzValue(n: number, rules: FizzBuzzRule[]): string {
  const result = rules
    .filter((rule) => n % rule.divisor === 0)
    .map((rule) => rule.label)
    .join("");
  return result || n.toString();
}

export function fizzBuzz(options: FizzBuzzOptions): string[] {
  validateOptions(options);

  const start = options.start ?? 1;
  const end = options.end;
  const rules = options.rules ?? DEFAULT_RULES;

  const output: string[] = [];
  for (let i = start; i <= end; i++) {
    output.push(fizzBuzzValue(i, rules));
  }
  return output;
}

fizzBuzz({
  start: 1,
  end: 15,
  rules: [
    { divisor: 3, label: "Fizz" },
    { divisor: 5, label: "Buzz" },
  ],
}).forEach((value) => console.log(value));
