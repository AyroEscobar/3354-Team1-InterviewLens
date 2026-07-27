// SessionScorer: the deterministic core of FR-5.
//
// The per answer scores (star, clarity, confidence) come from the AI engine,
// which is non deterministic and is mocked in tests. This function does the
// part that must be exactly right every time: weight those scores and
// aggregate them into a single 0 to 100 session score. FR-6 progress trends
// build directly on this number, so an error here would corrupt them too.

export interface AnswerScore {
  star: number;       // 0 - 10
  clarity: number;    // 0 - 10
  confidence: number; // 0 - 10
}

const W = { star: 0.5, clarity: 0.3, confidence: 0.2 };

export function computeOverallScore(scores: AnswerScore[]): number {
  if (scores.length === 0)
    throw new Error("Session has no answers");

  const total = scores.reduce((sum, s) => {
    const parts = [s.star, s.clarity, s.confidence];
    if (parts.some((v) => v < 0 || v > 10))
      throw new RangeError("Score out of range 0-10");
    return sum + s.star * W.star
               + s.clarity * W.clarity
               + s.confidence * W.confidence;
  }, 0);

  return Math.round((total / scores.length) * 10);
}
