-- Interview Lens: initial schema
-- Team 1, CS3354. Canonical structure for the whole application.

CREATE TABLE "users" (
    "id"                 BIGSERIAL     PRIMARY KEY,
    "name"               VARCHAR(120)  NOT NULL,
    "email"              VARCHAR(255)  NOT NULL UNIQUE,
    "password_hash"      VARCHAR(255)  NOT NULL,
    "role"               VARCHAR(10)   NOT NULL CHECK ("role" IN ('student','admin')),
    "ai_training_opt_in" BOOLEAN       NOT NULL DEFAULT false,
    "created_at"         TIMESTAMPTZ   NOT NULL DEFAULT now(),
    "updated_at"         TIMESTAMPTZ   NOT NULL DEFAULT now()
);

CREATE TABLE "student_profiles" (
    "user_id"   BIGINT       PRIMARY KEY REFERENCES "users"("id") ON DELETE CASCADE,
    "major"     VARCHAR(120),
    "grad_year" SMALLINT     CHECK ("grad_year" BETWEEN 1900 AND 2100)
);

CREATE TABLE "admin_profiles" (
    "user_id"     BIGINT   PRIMARY KEY REFERENCES "users"("id") ON DELETE CASCADE,
    "admin_level" SMALLINT NOT NULL DEFAULT 1
);

CREATE TABLE "question_categories" (
    "id"   BIGSERIAL   PRIMARY KEY,
    "name" VARCHAR(80) NOT NULL UNIQUE
);

CREATE TABLE "questions" (
    "id"                 BIGSERIAL    PRIMARY KEY,
    "category_id"        BIGINT       NOT NULL REFERENCES "question_categories"("id"),
    "text"               TEXT         NOT NULL,
    "difficulty"         VARCHAR(10)  NOT NULL CHECK ("difficulty" IN ('easy','medium','hard')),
    "parent_question_id" BIGINT       REFERENCES "questions"("id"),
    "is_active"          BOOLEAN      NOT NULL DEFAULT true,
    "created_by"         BIGINT       NOT NULL REFERENCES "users"("id"),
    "created_at"         TIMESTAMPTZ  NOT NULL DEFAULT now(),
    "updated_at"         TIMESTAMPTZ  NOT NULL DEFAULT now()
);
CREATE INDEX "questions_category_id_idx" ON "questions"("category_id");
CREATE INDEX "questions_parent_question_id_idx" ON "questions"("parent_question_id");

CREATE TABLE "interview_sessions" (
    "id"          BIGSERIAL    PRIMARY KEY,
    "student_id"  BIGINT       NOT NULL REFERENCES "users"("id") ON DELETE CASCADE,
    "target_role" VARCHAR(120) NOT NULL,
    "difficulty"  VARCHAR(10)  NOT NULL CHECK ("difficulty" IN ('easy','medium','hard')),
    "status"      VARCHAR(12)  NOT NULL DEFAULT 'active' CHECK ("status" IN ('active','completed','abandoned')),
    "started_at"  TIMESTAMPTZ  NOT NULL DEFAULT now(),
    "ended_at"    TIMESTAMPTZ
);
CREATE INDEX "interview_sessions_student_id_idx" ON "interview_sessions"("student_id");
CREATE INDEX "interview_sessions_status_idx" ON "interview_sessions"("status");

CREATE TABLE "session_questions" (
    "id"           BIGSERIAL PRIMARY KEY,
    "session_id"   BIGINT    NOT NULL REFERENCES "interview_sessions"("id") ON DELETE CASCADE,
    "question_id"  BIGINT    NOT NULL REFERENCES "questions"("id"),
    "ask_order"    SMALLINT  NOT NULL,
    "is_follow_up" BOOLEAN   NOT NULL DEFAULT false,
    UNIQUE ("session_id", "ask_order")
);
CREATE INDEX "session_questions_session_id_idx" ON "session_questions"("session_id");

CREATE TABLE "responses" (
    "id"                  BIGSERIAL    PRIMARY KEY,
    "session_question_id" BIGINT       NOT NULL UNIQUE REFERENCES "session_questions"("id") ON DELETE CASCADE,
    "answer_text"         TEXT,
    "audio_url"           VARCHAR(500),
    "is_transcribed"      BOOLEAN      NOT NULL DEFAULT false,
    "created_at"          TIMESTAMPTZ  NOT NULL DEFAULT now(),
    "updated_at"          TIMESTAMPTZ  NOT NULL DEFAULT now()
);

CREATE TABLE "answer_scores" (
    "id"               BIGSERIAL    PRIMARY KEY,
    "response_id"      BIGINT       NOT NULL UNIQUE REFERENCES "responses"("id") ON DELETE CASCADE,
    "star_score"       NUMERIC(5,2) CHECK ("star_score" BETWEEN 0 AND 100),
    "clarity_score"    NUMERIC(5,2) CHECK ("clarity_score" BETWEEN 0 AND 100),
    "confidence_score" NUMERIC(5,2) CHECK ("confidence_score" BETWEEN 0 AND 100),
    "ai_generated"     BOOLEAN      NOT NULL DEFAULT true,
    "created_at"       TIMESTAMPTZ  NOT NULL DEFAULT now()
);

CREATE TABLE "feedback_reports" (
    "id"                 BIGSERIAL   PRIMARY KEY,
    "session_id"         BIGINT      NOT NULL UNIQUE REFERENCES "interview_sessions"("id") ON DELETE CASCADE,
    "overall_score"      SMALLINT    NOT NULL CHECK ("overall_score" BETWEEN 0 AND 100),
    "comments"           TEXT,
    "ai_generated"       BOOLEAN     NOT NULL DEFAULT true,
    "flagged_for_review" BOOLEAN     NOT NULL DEFAULT false,
    "created_at"         TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE "audit_log" (
    "id"         BIGSERIAL    PRIMARY KEY,
    "user_id"    BIGINT       REFERENCES "users"("id") ON DELETE SET NULL,
    "event_type" VARCHAR(50)  NOT NULL,
    "entity"     VARCHAR(50),
    "entity_id"  BIGINT,
    "detail"     JSONB,
    "created_at" TIMESTAMPTZ  NOT NULL DEFAULT now()
);
CREATE INDEX "audit_log_created_at_idx" ON "audit_log"("created_at");
CREATE INDEX "audit_log_user_id_idx" ON "audit_log"("user_id");

CREATE TABLE "deletion_requests" (
    "id"           BIGSERIAL    PRIMARY KEY,
    "user_id"      BIGINT       NOT NULL REFERENCES "users"("id"),
    "requested_at" TIMESTAMPTZ  NOT NULL DEFAULT now(),
    "purge_after"  TIMESTAMPTZ  NOT NULL,
    "status"       VARCHAR(12)  NOT NULL DEFAULT 'pending' CHECK ("status" IN ('pending','completed'))
);
