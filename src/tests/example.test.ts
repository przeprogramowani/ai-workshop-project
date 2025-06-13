import { describe, it, expect } from "vitest";

// Local fizzbuzz function for testing
function fizzbuzz(n: number): string {
  if (n % 15 === 0) return "FizzBuzz";
  if (n % 3 === 0) return "Fizz";
  if (n % 5 === 0) return "Buzz";
  return n.toString();
}

describe("fizzbuzz", () => {
  it('should return "Fizz" for multiples of 3', () => {
    expect(fizzbuzz(3)).toBe("Fizz");
    expect(fizzbuzz(6)).toBe("Fizz");
    expect(fizzbuzz(9)).toBe("Fizz");
  });

  it('should return "Buzz" for multiples of 5', () => {
    expect(fizzbuzz(5)).toBe("Buzz");
    expect(fizzbuzz(10)).toBe("Buzz");
    expect(fizzbuzz(20)).toBe("Buzz");
  });

  it('should return "FizzBuzz" for multiples of both 3 and 5', () => {
    expect(fizzbuzz(15)).toBe("FizzBuzz");
    expect(fizzbuzz(30)).toBe("FizzBuzz");
    expect(fizzbuzz(45)).toBe("FizzBuzz");
  });

  it("should return the number as string for non-multiples of 3 or 5", () => {
    expect(fizzbuzz(1)).toBe("1");
    expect(fizzbuzz(2)).toBe("2");
    expect(fizzbuzz(4)).toBe("4");
    expect(fizzbuzz(7)).toBe("7");
  });

  it("should handle edge cases", () => {
    expect(fizzbuzz(0)).toBe("FizzBuzz"); // 0 is divisible by both 3 and 5
    expect(fizzbuzz(1)).toBe("1");
  });
});
