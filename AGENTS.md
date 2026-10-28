# Development rules

## Current authorization

The user authorized Phase 2; the scientific engine is ready for review. Phase 3 is not approved. Complete only the current approved phase, show its deliverables and test results, and wait for explicit user approval before starting the next phase. Preserve the complete functional scope of the fx-991ES PLUS 2nd edition reference; implementation phases do not reduce the final target.

## Working practices

- Read README.md, docs/PRD.md, docs/TRD.md, docs/ARCHITECTURE.md, docs/REFERENCE.md and SECURITY.md before changes.
- Use the existing isolated checkout. Do not create a Git worktree unless explicitly requested.
- Inspect git status first. Preserve user changes. Remove only files whose purpose and ownership are understood; never delete .git or credentials.
- Maintain requirements, decisions and update notes with relevant changes. Record assumptions explicitly; distinguish verified reference behavior from proposals.
- Do not claim parity, accuracy, test success, offline operation or readiness without evidence.
- Keep changes focused. Do not add frameworks, dependencies, telemetry, network calls or backend services without a documented technical need.

## Engineering boundaries

- Keep the numerical engine independent of browser APIs and presentation.
- Parse input into typed nodes; never use eval, Function constructors, executable imports or a shell to evaluate expressions.
- Use explicit numeric types, precision policies and typed errors. Do not silently coerce complex, matrix or rational values to binary floating-point.
- Centralize mode, SHIFT, ALPHA, cursor and reset behavior in a state machine. Keep key mappings declarative and test every modifier layer.
- Long numerical operations must be bounded, cancellable and isolated from the UI thread.
- Render user input as text or through a trusted mathematical renderer with restricted configuration; never inject raw HTML.
- No secrets, vendor firmware, copied logos, unlicensed fonts or assets in commits.

## Verification and delivery

Use the validation plan and requirement IDs. Test both normal and edge behavior, reference limits, errors, precision and state transitions. Preserve test exit codes; report skipped and unrun checks separately. Do not weaken assertions to obtain a passing run. Document deviations from the physical reference. Update dependency lockfiles only as part of an authorized dependency change, with license and vulnerability checks.

At the end of work report changes, checks actually run, remaining risks and required next steps. Use npm run build, npm test and npm run test:e2e as described in README.md.

## Agreed stack and completeness rules

Use React + TypeScript + Vite and CSS, a separate TypeScript engine in Web Workers, Vitest and Playwright. Plan PWA offline delivery after core validation; no backend/database is required. MathLive, math.js and decimal.js remain candidates requiring documented compatibility/security/license evaluation. Phase 0 may install isolated research dependencies; application scaffolding belongs to Phase 1.

Matrices, vectors, complex numbers, equations/SOLVE, calculus, statistics/regression, BASE-N, TABLE and constants/conversions are mandatory alongside standard functions and all verified modifier workflows. Never substitute a basic-calculator milestone for the complete scope. Every mode needs editing, state, formatting, errors and reference-backed tests, not only a numerical function call.

## Phase-by-phase execution

Follow docs/IMPLEMENTATION_PLAN.md as the canonical sequence. Work in reviewable increments, satisfy each phase's evidence gates and update its status plus docs/UPDATE_NOTES.md. The user explicitly requires approval after every phase; do not cross a phase boundary without it. Escalate only genuine blockers or separately required external actions. Phase 2 is ready for review; Phase 3 remains unapproved. All advanced modes remain required for final completion.

## Final keypad requirement

Follow docs/KEYPAD_REQUIREMENTS.md: preserve the supplied photo’s button layout and functional legends; implement MODE and SHIFT→MODE SETUP with correct advanced mode/context access. The Phase 1 sidebar is temporary and must not become the final calculator interface.
