import { describe, it, expect } from "vitest";
import { validateNewUser, isValidScore } from "../src/validation.js";

// Test plan: verify that the system accepts a well formed data entry (the "true"
// case) and rejects malformed entries (the "false" cases). These are pure unit
// tests, so they run with no database.

describe("validateNewUser (registration data entry)", () => {
  it("accepts a valid registration", () => {
    const result = validateNewUser({
      name: "Ada Lovelace",
      email: "ada@utd.edu",
      password: "supersecret",
      role: "student",
    });
    expect(result.valid).toBe(true);
    expect(result.errors).toHaveLength(0);
  });

  it("rejects a malformed email", () => {
    const result = validateNewUser({
      name: "Ada Lovelace",
      email: "not-an-email",
      password: "supersecret",
      role: "student",
    });
    expect(result.valid).toBe(false);
    expect(result.errors).toContain("Email must be a valid address.");
  });

  it("rejects a password that is too short", () => {
    const result = validateNewUser({
      name: "Ada Lovelace",
      email: "ada@utd.edu",
      password: "123",
      role: "student",
    });
    expect(result.valid).toBe(false);
    expect(result.errors).toContain("Password must be at least 8 characters.");
  });

  it("reports every problem at once for a fully invalid entry", () => {
    const result = validateNewUser({
      name: "",
      email: "bad",
      password: "x",
      role: "teacher",
    });
    expect(result.valid).toBe(false);
    expect(result.errors).toHaveLength(4);
  });
});

describe("isValidScore (feedback score data entry)", () => {
  it("accepts a score inside the 0 to 100 range", () => {
    expect(isValidScore(85)).toBe(true);
  });

  it("rejects a negative score", () => {
    expect(isValidScore(-5)).toBe(false);
  });

  it("rejects a score above 100", () => {
    expect(isValidScore(150)).toBe(false);
  });
});
