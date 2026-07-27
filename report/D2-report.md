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

> **Ben — paste the full Deliverable #1 content here** (requirements, use case diagram,
> class diagram, sequence diagrams, MVC architecture). Diagram image files go in
> `deliverable1/` and are referenced from here.

### 3.1 Functional Requirements
<!-- FR-1 … FR-7 -->

### 3.2 Non-Functional Requirements
<!-- NFR-1 … NFR-13 -->

### 3.3 Use Case Diagram
<!-- ![Use Case Diagram](../deliverable1/use-case.png) -->

### 3.4 Class Diagram
<!-- Classes: User, Student, Admin, InterviewSession, Question, Response,
     FeedbackReport, AIEngine, QuestionBank -->

### 3.5 Sequence Diagram(s)
<!-- ![Sequence Diagram](../deliverable1/sequence.png) -->

### 3.6 Architecture (MVC)
<!-- React (View) · Express controllers (Controller) · PostgreSQL + models (Model) -->

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
