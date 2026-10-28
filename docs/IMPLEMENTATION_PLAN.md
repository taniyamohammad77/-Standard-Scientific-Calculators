# Phase-by-phase delivery plan

## Purpose and execution policy

Build the complete fx-991ES PLUS 2nd edition functional scope in ordered, verifiable increments. Phase 0 research is authorized and started. The user requires a demonstration/report and explicit approval after each phase before the next phase starts.

The sequence below is the default. Advance only when the current phase's required checks pass, its evidence is recorded, results are shown to the user, and the user explicitly approves the next phase. Ask only for a blocking product decision, missing access or a separately required publishing action. A failed required check prevents that phase being called complete. Continue independent work while diagnosing blockers. Record deliberate resequencing and dependency impacts rather than silently skipping scope.

## Roadmap

| Phase | Deliverables | Required completion evidence | Requirement coverage | Status |
|---|---|---|---|---|
| 0 — Reference and design baseline | Matching official manual with source metadata; full key/menu inventory; limits and precision policy; numerical/editor library spikes; resolved blocking design decisions | S1/S4-based provisional design, numerical/editor probes and requirement-to-validation map; REF-01–09 deferred by user direction and tracked in PHASE_0_DESIGN.md | All PRD IDs; REF-01–09 | Complete under revised scope; awaiting approval |
| 1 — Project foundation | React/TypeScript/Vite/CSS scaffold; pinned runtime and lockfile; Vitest/Playwright; CI; pure engine/module boundaries; worker schemas and state skeleton | Clean install, production build, type checks and meaningful test execution; worker round-trip, stale-response rejection and error recovery; no placeholder pass claims | TRD-01–10 foundations; PRD-16 | Not started |
| 2 — Core engine and standard calculation | Grammar/AST, typed numbers, precedence, arithmetic/scientific functions, angle units, fractions/exact forms, formatting, random/rounding and typed errors | Golden fixtures, numeric/domain boundaries, precision/format tests, invalid/adversarial input and resource budgets | PRD-03,04,14; TRD-01–03,07 | Not started |
| 3 — Natural display and calculator interaction | Responsive keypad; structured templates; cursor/replay; SHIFT/ALPHA; mode/setup framework; Ans/variables/memory; CALC; keyboard/touch/accessibility | End-to-end editing/evaluation journeys; full applicable key-map tests; memory/reset/state tests; editor compatibility and injection checks | PRD-01,02,04,05,15 | Not started |
| 4 — Complex numbers and BASE-N | Complex operations and display forms; polar/rectangular conversion; integer radix and logical operations; integrated mode workflows | Reference sequences; complex/angle domain cases; signed-width, overflow and base conversion tests; mode/reset integration | PRD-07,09 | Not started |
| 5 — Matrices and vectors | Dimension-aware editors, named storage, matrix arithmetic/determinant/inverse/transpose, vector arithmetic/dot/cross products | Verified dimension/capacity limits; mathematical and device fixtures; singular/dimension errors; state/display/key integration | PRD-11 | Not started |
| 6 — Equations, SOLVE and calculus | Simultaneous and quadratic/cubic equation editors/results; numerical SOLVE; integration, differentiation and summation templates/algorithms | Known roots and analytic examples; repeated/degenerate roots; singular systems; discontinuities/nonconvergence; tolerance/budget/cancellation evidence | PRD-06,10 | Not started |
| 7 — Statistics, tables and catalogs | Dataset/frequency editor; all supported regressions/summaries; TABLE input/results; complete edition-specific constants/conversions | Verified model/capacity/catalog inventory; regression/degenerate-data and table boundary tests; conversion round trips; catalog provenance | PRD-08,12,13 | Not started |
| 8 — Whole-calculator compatibility and hardening | Full mode/key/state audit; numerical comparisons; responsive/accessibility fixes; performance and security review | Every PRD ID traced to passing evidence or an explicitly accepted deviation; adversarial input and worker tests; recorded browser/device benchmarks; no unexplained required failures | PRD-01–16 except final offline delivery; all TRD IDs | Not started |
| 9 — Offline delivery and release readiness | PWA install/cache/update lifecycle; production hosting configuration; user guide, known deviations and release notes | Offline reload after installation; upgrade/stale-cache recovery; production build and headers; final regression/security/accessibility checks; release checklist | PRD-16 and full release audit | Not started |

Requirement coverage is cumulative. A row's IDs identify primary ownership, not permission to ignore cross-cutting security, state, accessibility, precision or error behavior. Phase 0 research informs all later phases; unresolved evidence blocks the affected compatibility claim. Phase 9 prepares deployment; an actual public deployment follows the user's authorization and is recorded separately.

## Dependencies and reviewable increments

Phases 1–3 establish the shared engine, editor and interaction contracts. Phases 4–7 use those contracts and ship complete mode workflows rather than disconnected library calls. Equation/calculus work builds on complex and matrix primitives where required. Review and test each mode independently before integrating it. If a shared primitive needs changing, rerun its dependents' relevant checks.

Each phase should leave a coherent reviewable increment: working implemented features, passing applicable checks, explicit not-yet-implemented modes and documented limitations. Do not provide functional-looking buttons that silently do nothing. Do not label a partial build a complete calculator. Full advanced scope remains mandatory; delivery phases do not convert it into optional backlog.

## Phase completion record

For each phase maintain a dated record containing:

- Status: Not started, In progress, Blocked or Complete; current commit and deliverables.
- PRD/TRD/REF IDs and manual/device evidence used.
- Commands actually run, test counts/results, build and browser targets, numerical comparison tolerances and relevant artifacts.
- Unresolved failures, known deviations, security/precision implications and next action.
- Documentation/ADR changes and the next phase's prerequisites.

Update this roadmap's status and UPDATE_NOTES.md as work proceeds. Do not mark Complete based solely on installation, a plan, zero tests, screenshots or open ports. Runtime validation, GitHub push and deployment are separate outcomes. No time estimates are committed until reference research and compatibility spikes establish the workload.
