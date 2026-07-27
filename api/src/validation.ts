// Pure input validation for data entering the system. These functions do not
// touch the database, which makes them true units and easy to test.
//
// validateNewUser covers a registration entry (FR-1) and the password rule (NFR-5).
// isValidScore covers a feedback score entry (FR-5) and mirrors the 0 to 100
// database CHECK constraint on answer_scores and feedback_reports.

export interface NewUserInput {
  name: string;
  email: string;
  password: string;
  role: string;
}

export interface ValidationResult {
  valid: boolean;
  errors: string[];
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MIN_PASSWORD_LENGTH = 8;
const VALID_ROLES = ["student", "admin"];

// Check a registration entry and return every problem found (not just the first),
// so the sign up form can show all issues at once.
export function validateNewUser(input: NewUserInput): ValidationResult {
  const errors: string[] = [];

  if (!input.name || input.name.trim().length === 0) {
    errors.push("Name is required.");
  }
  if (!EMAIL_PATTERN.test(input.email ?? "")) {
    errors.push("Email must be a valid address.");
  }
  if (!input.password || input.password.length < MIN_PASSWORD_LENGTH) {
    errors.push(`Password must be at least ${MIN_PASSWORD_LENGTH} characters.`);
  }
  if (!VALID_ROLES.includes(input.role)) {
    errors.push("Role must be either student or admin.");
  }

  return { valid: errors.length === 0, errors };
}

// A feedback score must be a real number between 0 and 100.
export function isValidScore(score: number): boolean {
  return Number.isFinite(score) && score >= 0 && score <= 100;
}
