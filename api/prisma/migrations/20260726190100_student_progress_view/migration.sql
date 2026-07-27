-- Progress dashboard trends are computed on demand, never stored,
-- so they can never go stale (supports FR-6).
CREATE VIEW "student_progress" AS
SELECT s."student_id",
       s."id"          AS "session_id",
       s."target_role",
       s."started_at",
       r."overall_score"
FROM "interview_sessions" s
JOIN "feedback_reports" r ON r."session_id" = s."id"
WHERE s."status" = 'completed'
ORDER BY s."student_id", s."started_at";
