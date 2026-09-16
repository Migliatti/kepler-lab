# Agent To-Do

> Persistent, project-local task list and handoff. No transcripts or secrets.

## To-do

## In progress

- [-] **AI-001** — Implement the Kepler Lab scientific experience
  - **Priority:** high
  - **Next:** add the remaining 20 curated destinations to `src/content/destinations.js` (validated by `validateCatalogue`), then start Phase 2 (scene).
  - **Blocker:** none
  - **Acceptance:** the acceptance criteria in `PLAN.md`.
  - **Context:** `PLAN.md` was approved by the user. React/Vite template is cleaned to a minimal pt-BR shell. Content model lives in `src/content/` (`categories.js`, `destinations.js` with Terra and Sagittarius A* as seeds, `validateCatalogue.js`: required fields, 4–5 facts, https sources, unique ids, no search term shared across destinations). `src/utils/search.js` ranks exact > prefix > partial name/alias > type/region > summary, tolerates missing fields, returns `[]` for empty queries; `getSuggestedDestinations` returns `featured`. `npm test` (21), `npm run lint` and `npm run build` pass. `AGENTS.md` "Estado atual" and `PLAN.md` "Status" still say implementation awaits approval — update with user consent.
  - **Updated:** 2026-09-16

## Done

- [x] **AI-002** — Refine the Kepler Lab scope through block-by-block brainstorming (2026-04-12)
  - **Evidence:** User approved `PLAN.md`, unblocking implementation.
