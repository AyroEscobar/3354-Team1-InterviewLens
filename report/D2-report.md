# Interview Lens — Deliverable #2

**CS 3354 · Summer 2026 · Team 1**

Ayro S. Escobar · Ben Andre Quidlat · Hadeed Sarfaraz · Shaun Kenan Moukam · Joshua Asteway

---

## 1. Project Title

**Interview Lens — An AI Interview Platform for Mastering Behavioral Interviews**

Interview Lens is a web application that helps college students practice behavioral
interviews, receive instant STAR-based (Situation, Task, Action, Result) feedback, and
track their progress over time. It is built on a React frontend, an Express backend, a
PostgreSQL database, and an AI engine that generates questions and evaluates responses.

---

## 2. Delegation of Tasks

| Member (First + Last) | Deliverable #2 Responsibilities |
|-----------------------|----------------------------------|
| **Ayro S. Escobar** | Section 4 — Project scheduling and cost estimation (Function Point analysis, hardware/software/personnel cost). Maintained the database schema and class-diagram content and committed the database code. |
| **Ben Andre Quidlat** | Report assembly and formatting. Section 1 (title), Section 2 (delegation), Section 3 (Deliverable #1 fold-in), Section 7 (conclusion), Section 8 (references). Owned the GitHub repository structure and the final GitHub + eLearning submission. Prepared the requirements (FR/NFR) slide. |
| **Hadeed Sarfaraz** | Section 6 — Comparison with similar designs, with cited sources. Prepared the sequence-diagram and AI-pipeline slide content. |
| **Shaun Kenan Moukam** | Section 9 — Presentation slide deck covering all required sections, plus the Figma prototype. Frontend UI/UX content. |
| **Joshua Asteway** | Section 5 — Test plan: unit test description, automated test execution and results, and defined test cases (one passing, one failing). Prepared the true/false test-case demo slide. |

*Every member appears on camera in the recorded presentation and presents their own portion.*

---

## 3. Deliverable #1 (Folded In)

*Full source and all diagram figures: [`deliverable1/Deliverable1.pdf`](../deliverable1/Deliverable1.pdf).*

### 3.1 Assumptions

- **A1.** The platform initially targets college students in the United States and supports English-language interviews only.
- **A2.** Because users are students and universities may adopt the platform, interview recordings, transcripts, and feedback are treated as educational records and handled in a FERPA-aligned manner.
- **A3.** We assume a U.S. "AI Interview Transparency Act of 2025" requiring any platform giving AI-generated hiring or interview feedback to clearly disclose that the feedback is AI-generated and to let users flag feedback for human review.
- **A5.** University single sign-on is not required for the first release; email-and-password authentication is sufficient.

*(Assumptions A3, A4, and A6 are invented regulatory rules, stated per the deliverable instructions so that every non-functional requirement type can be covered.)*

### 3.2 Software Process Model

The team uses the **incremental development** process model, for four reasons: (1) the summer timeline is short, so a usable core system must ship early; (2) requirements for an AI product are volatile — how the AI interviewer should behave cannot be fully predicted until it is rolled out; (3) each increment produces a working model to present to the instructor/TA, whose feedback shapes the next increment; and (4) the model fits the team's tooling, with a CI/CD pipeline validating every increment automatically. Waterfall was rejected because requirements are evolving, and pure integration-and-configuration was rejected because the core product must be custom-built.

### 3.3 Functional Requirements

| ID | Functional Requirement |
|----|------------------------|
| FR-1 | The system shall allow users to register an account with name, email, and password, and to log in and log out. Duplicate emails shall be rejected. |
| FR-2 | The system shall allow a logged-in student to start a mock behavioral interview session by selecting a target job role and a difficulty level. |
| FR-3 | The system shall use the AI engine to generate at least five behavioral interview questions per session, including adaptive follow-up questions based on the student's previous answer. |
| FR-4 | The system shall accept student answers as typed text or recorded audio, and shall transcribe audio answers to text before analysis. |
| FR-5 | Upon session completion, the system shall generate a feedback report that scores each answer on STAR structure, clarity, and confidence, and gives an overall session score from 0 to 100 with written improvement suggestions. |
| FR-6 | The system shall store every completed session and its report, and shall display the student's history and score trends over time on a progress dashboard. |
| FR-7 | The system shall allow an administrator to add, edit, and remove questions and question categories in the question bank. |

### 3.4 Non-Functional Requirements

| ID | Type | Non-Functional Requirement |
|----|------|----------------------------|
| NFR-1 | Usability | A first-time user shall create an account and start their first mock interview in under 3 minutes without training; contextual help shall be available on every screen. |
| NFR-2 | Performance | The next interview question shall be delivered within 2 seconds and the full end-of-session feedback report within 15 seconds, for 95% of requests under normal load. |
| NFR-3 | Space | The initial web bundle shall not exceed 5 MB, and a completed session (transcript plus report) shall consume no more than 2 MB of database storage on average. |
| NFR-4 | Dependability | The platform shall maintain at least 99.5% monthly availability, and every answer shall be autosaved on submit so a crash loses at most the answer in progress. |
| NFR-5 | Security | All traffic shall use TLS 1.2+; passwords shall be stored only as bcrypt hashes; session tokens shall expire within 24 hours; RBAC shall prevent students from accessing admin functions or other students' data. |
| NFR-6 | Environmental | The system shall run in the two most recent versions of Chrome, Firefox, Safari, and Edge on desktop and mobile without local installation, and be deployable on commodity Linux cloud instances. |
| NFR-7 | Operational | The system shall support at least 500 concurrent interview sessions at peak, and administrators shall update the question bank without taking the platform offline. |
| NFR-8 | Development | All code shall be TypeScript, held in the team GitHub repo, merged only through reviewed pull requests, and covered by unit tests at ≥70% line coverage enforced by CI/CD. |
| NFR-9 | Regulatory | Per A2, transcripts, recordings, and feedback shall be handled as FERPA-aligned educational records: private by default, never shared with third parties without the student's explicit consent. |
| NFR-10 | Ethical | The platform shall label all feedback as AI-generated, shall not sell user data, shall not use student responses to train AI models without opt-in consent, and shall review AI prompts for bias. |
| NFR-11 | Accounting | Per A6, the system shall keep an audit log of all account and data-access events (logins, deletions, admin changes) and retain these logs for 12 months. |
| NFR-12 | Safety / Security (Legislative) | Per A3 and A4, the system shall comply with the assumed AI Interview Transparency Act of 2025 (disclosure + human-review flag on every report) and permanently delete all of a user's data within 30 days of a deletion request. |

### 3.5 Use Case Diagram

*Figure 1 — see [`deliverable1/Deliverable1.pdf`](../deliverable1/Deliverable1.pdf), p.5.*

Actors: **Student**, **Administrator**, and the **AI Engine**. Use cases within the Interview Lens Platform: Register / Log In, Conduct Mock Interview, Receive AI Feedback Report, View Progress History, and Manage Question Bank. The Student drives the interview and feedback use cases; the Administrator manages the question bank; the AI Engine supports interview and feedback generation.

### 3.6 Sequence Diagrams

Six interactions were modeled (Figures 2–6 in the D1 PDF), each following the MVC boundary (UI → Controller → AIEngine/DB):

1. **Register / Log In** — `AuthUI → AuthController → InterviewLens-DB`, with `alt` branches for duplicate email and invalid credentials.
2. **Conduct Mock Interview** — `SessionUI → SessionController → AIEngine/DB`, with a `loop` over questions and an `alt` for adaptive follow-ups.
3. **Receive AI Feedback Report** — `ReportUI → FeedbackController → AIEngine/DB`, scoring responses on STAR/clarity/confidence.
4. **View Progress History** — `ProgressUI → ProgressController → DB`, computing score trends over time.
5. **Manage Question Bank** — `AdminUI → QuestionController → Authorization → DB`, with an `alt` for authorization success/failure.

### 3.7 Class Diagram

*Figure 7 — see [`deliverable1/Deliverable1.pdf`](../deliverable1/Deliverable1.pdf), p.10.*

Abstract **User** is specialized (generalization) by **Student** and **Administrator**. **InterviewSession** aggregates the **Question**s asked and composes the **Response**s recorded; **QuestionBank** aggregates the reusable Question pool. **AIEngine** generates a **FeedbackReport** for each completed session. Key cardinalities: one Student conducts 0..* InterviewSessions; each completed session is evaluated by at most one FeedbackReport. Classes: `User, Student, Administrator, InterviewSession, Question, Response, FeedbackReport, AIEngine, QuestionBank`.

### 3.8 Architectural Design (MVC)

*Figure 8 — see [`deliverable1/Deliverable1.pdf`](../deliverable1/Deliverable1.pdf), p.11.*

The system uses the **Model-View-Controller** pattern (Sommerville, Fig. 6.6). The same underlying data (sessions, responses, feedback) is presented in multiple ways — live interview screen, feedback report, progress dashboard — so MVC isolates presentation (**View**: React components) from interaction logic (**Controller**: HTTP processing, validation, session/feedback/auth logic) and from business logic and data (**Model**: domain classes, AI Engine calls, PostgreSQL). This also maps onto the team's delegation: frontend in the View, endpoints in the Controller, database and AI pipeline in the Model — letting members work in parallel with minimal conflicts.

---

## 4. Cost, Effort, and Scheduling  *(Owner: Ayro)*

> Pasted from `section4-estimation.md`.

### 4.1 Project Scheduling
### 4.2 Cost / Effort / Pricing — Function Point Analysis
### 4.3 Hardware Cost
### 4.4 Software Cost
### 4.5 Personnel Cost

---

## 5. Test Plan  *(Owner: Joshua)*

> Pasted from `section5-testplan.md`. Unit code in `code/`, test in `tests/`, results screenshot included.

### 5.1 Test Plan Description
### 5.2 Unit Under Test + Automated Test + Results
### 5.3 Test Cases and Results (one passing, one failing)

---

## 6. Comparison with Similar Designs  *(Owner: Hadeed)*

> Pasted from `section6-comparison.md`. Citations feed Section 8.

---

## 7. Conclusion

> **Draft — reword before final submission.**

Deliverable #2 built directly on the design established in Deliverable #1, adding the
project's estimation, scheduling, and verification work. Over the course of the project our
plan evolved in a few notable ways.

**Deviations from the original proposal.**
- **Team size.** The original proposal listed four members; the team now includes five
  members, with Joshua Asteway owning the test plan and verification work. Responsibilities
  in Section 2 reflect the current five-member structure.
- **[Scope / feature changes].** *[Describe any features added, cut, or deferred versus the
  original plan, and why — e.g., narrowing the AI feedback to a STAR rubric, deferring
  progress-tracking analytics.]*
- **[Estimation vs. reality].** *[Note where the Function Point estimate or schedule differed
  from what the team expected, and the justification.]*

**Justification.** *[Summarize why these changes were the right calls — clearer scope,
realistic timeline, stronger testing coverage — and what the team learned.]*

Overall, Interview Lens remains true to its original motivation: giving students an
accessible tool to practice behavioral interviews and improve the people skills that
technical ability alone does not demonstrate.

---

## 8. References

> **IEEE numbered format. Reword/verify each entry; pull real citations from Hadeed's
> comparison (Section 6) and Ayro's estimation (Section 4).**

[1] Author(s), "Title of source," *Publication/Site*, Year. [Online]. Available: URL. [Accessed: 26-Jul-2026].

[2] Google, "Interview Warmup," *Grow with Google*. [Online]. Available: https://grow.google/certificates/interview-warmup/. [Accessed: 26-Jul-2026].

[3] *[Pramp / Final Round AI / interviewing.io — from Hadeed's Section 6.]*

[4] *[Function Point / cost-estimation reference used in Section 4.]*

[5] *[Course textbook, Ch. 8 — for the test-plan methodology in Section 5.]*
