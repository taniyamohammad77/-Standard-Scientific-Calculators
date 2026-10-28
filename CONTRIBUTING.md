# Contribution workflow

Application development is currently paused pending the user's next instruction.

For implementation work, select requirement IDs from the PRD and reference inventory, verify applicable manual behavior, and document the design before adding dependencies. Keep numerical algorithms separate from display and key handling. Every change should identify the behavior it implements and the reference evidence supporting it.

A review should include: purpose and linked requirements; relevant architecture decisions; tests and their actual results; precision and resource-limit implications; accessibility impact; security and dependency impact; known limitations; documentation updates. Any intentional departure from the reference needs a recorded decision and user-visible disclosure where relevant.

Avoid mixing unrelated cleanup and feature work. Never include secrets, local caches, test reports or build output. No license has been selected for the project; do not assume permission to redistribute vendor materials or assign an open-source license on the owner's behalf.

## Stack and feature review checklist

Follow the agreed React/TypeScript/Vite/CSS, Web Worker, Vitest and Playwright architecture. Record package versions and lockfile changes only when implementation starts. PWA support follows core validation; backend/database work needs a separate requirement. Candidate math/editor libraries require a compatibility spike and documented precision, licensing and security results before adoption.

Review each advanced feature end to end: entry workflow, commands/modifiers, typed numerical operation, capacity/domain errors, formatting, stored state/reset and reference fixtures. All advanced modes are required for the complete release. Update PRD/TRD/REFERENCE/VALIDATION together when a verified detail changes; keep historical update notes intact.

## Phased delivery

Use the [implementation plan](docs/IMPLEMENTATION_PLAN.md). Scope each reviewable change to a coherent phase deliverable and include its phase number, requirement IDs and actual validation. Keep roadmap status and update notes current. Recheck dependent phases when shared contracts change; do not call a phase complete with unexplained required failures.
