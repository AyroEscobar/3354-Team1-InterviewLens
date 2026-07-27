# Interview Lens API and Data Layer

Owner: Ayro Escobar (database and data layer, Team 1).

This workspace holds the PostgreSQL data layer for Interview Lens, built with Prisma and TypeScript. The full schema design and requirements traceability live in the team Database Design document.

## Run it locally
1. Start Postgres: `docker compose up -d`
2. Copy the env template: `cp .env.example .env`
3. Install dependencies: `npm install`
4. Apply the schema: `npm run db:migrate`
5. Seed sample data: `npm run db:seed`
6. Inspect the tables: `npm run db:studio`

## Test
`npm test`

## Layout
- `prisma/schema/` split schema files, one per domain area
- `prisma/migrations/` SQL migrations (initial schema plus the progress view)
- `prisma/seed.ts` sample categories, questions, and demo users
- `src/repositories/` typed data-layer functions the API calls
- `tests/` unit tests
