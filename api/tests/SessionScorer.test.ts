import { describe, it, expect } from "@jest/globals";
import { computeOverallScore } from "../src/SessionScorer.js";
import type { AnswerScore } from "../src/SessionScorer.js";

// Test plan for computeOverallScore (the deterministic core of FR-5).
// Strategy: equivalence partitioning plus boundary value analysis.
//   Valid partition:   every component is within 0 to 10.
//   Invalid partitions: an empty session, or any component outside 0 to 10.

const answer = (star: number, clarity: number, confidence: number): AnswerScore => ({
  star,
  clarity,
  confidence,
});

describe("computeOverallScore (FR-5 session scoring)", () => {
  // Valid partition, boundary high: a perfect answer maps to 100.
  it("scores a perfect answer as 100", () => {
    expect(computeOverallScore([answer(10, 10, 10)])).toBe(100);
  });

  // Valid partition, boundary low: an all zero answer maps to 0.
  it("scores an all zero answer as 0", () => {
    expect(computeOverallScore([answer(0, 0, 0)])).toBe(0);
  });

  // Valid partition, interior: weights 0.5 / 0.3 / 0.2 applied correctly.
  it("applies the weights correctly for a mixed answer", () => {
    // 8*0.5 + 6*0.3 + 4*0.2 = 6.6, times 10 = 66
    expect(computeOverallScore([answer(8, 6, 4)])).toBe(66);
  });

  // Valid partition: the score is the average across all answers.
  it("averages across multiple answers", () => {
    // perfect (10) and zero (0) average to 5, times 10 = 50
    expect(computeOverallScore([answer(10, 10, 10), answer(0, 0, 0)])).toBe(50);
  });

  // Mixed boundaries 0 and 10 are both accepted.
  it("accepts the exact boundaries 0 and 10", () => {
    // 10*0.5 + 0*0.3 + 10*0.2 = 7, times 10 = 70
    expect(computeOverallScore([answer(10, 0, 10)])).toBe(70);
  });

  // Invalid partition: an empty session.
  it("throws when the session has no answers", () => {
    expect(() => computeOverallScore([])).toThrow("Session has no answers");
  });

  // Invalid partition, just past the high boundary.
  it("throws when a component is above 10", () => {
    expect(() => computeOverallScore([answer(11, 5, 5)])).toThrow(RangeError);
  });

  // Invalid partition, just past the low boundary.
  it("throws when a component is below 0", () => {
    expect(() => computeOverallScore([answer(-1, 5, 5)])).toThrow(RangeError);
  });
});
