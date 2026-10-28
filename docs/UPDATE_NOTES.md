# Update notes

## 2026-10-28 — Planning baseline

User direction: stop prototype implementation, target the pictured fx-991ES PLUS 2nd edition functions, remove unnecessary files and prepare senior-developer documentation.

### Cleanup

Removed the assistant-created app.js, engine.js, index.html, style.css, package.json and tests/engine.test.js from the checkout. Replaced the prototype README with the planning index. These were the only application files present, all untracked; there were no local commits or pre-existing tracked application files. The .git directory was preserved. Recovery copies were moved outside the repository to /workspace/scratch/calculator-prototype-before-planning; that path is local workspace state and is not a published backup.

### Added

Product requirements, reference inventory/research tasks, technical requirements, architecture, validation strategy, decision log, development rules, contribution workflow and security policy. The original prototype's subset is not the intended final feature scope.

### Validation and limitations

Repository contents and Git status inspected before cleanup. Documentation links and expected file inventory checked after cleanup. No app build, browser validation or numerical tests apply to this documentation-only state. The official manual has not yet been reviewed; hidden functions, limits, catalogs and numerical behavior remain explicitly unverified. No publication, deployment or functional-parity claim is made.

### Next work

Complete REF-01 through REF-09, confirm platform and record numerical/stack decisions before implementation. Await the user's instruction to start building. No source code was added in this planning pass.

## 2026-10-28 — Agreed stack and advanced scope alignment

User direction: update all documents after accepting the recommended stack and confirming that vectors and every advanced calculator capability remain required.

Updated README, PRD, TRD, architecture, reference register, validation plan, developer rules, contribution guide, security policy and decision log. Recorded React + TypeScript + Vite, CSS, Web Workers, Vitest and Playwright as agreed choices; PWA delivery follows core validation and no backend/database is required. MathLive/math.js/decimal.js remain conditional candidates pending compatibility evaluation.

Made matrix/vector operations, complex mode, equations/SOLVE, calculus, statistics/regression, BASE-N, TABLE and constants/conversions explicit mandatory scope across design, testing and review. Added advanced-mode integration and stack-specific security requirements. Browser-first delivery is now decided; exact reference limits, precision, library suitability, persistence and hosting remain open. Earlier planning notes are historical and are superseded by ADR-003 where applicable.

Validation: checked local Markdown links, balanced code fences, expected documentation inventory and agreement on stack/scope statements. Application implementation remains paused. No packages installed, no application tests run, no reference-manual review completed, and no deployment or parity claimed. The .gitignore already covers the selected stack's standard local dependencies/build/test artifacts and needed no change.

## 2026-10-28 — Phase-by-phase delivery plan

Added IMPLEMENTATION_PLAN.md with Phases 0–9: reference/design, project foundation, core mathematics, natural display/interaction, complex/BASE-N, matrices/vectors, equations/SOLVE/calculus, statistics/tables/catalogs, compatibility/security hardening and PWA/release readiness. Each phase includes deliverables, requirement coverage, completion evidence and initial Not started status. Defined dependencies, coherent increments and dated completion records.

Linked the plan from README, PRD, TRD, architecture, reference, validation, developer rules, contribution guide and security policy; recorded ADR-004. Kept all advanced features mandatory and implementation paused. No dependencies, source code, application tests or deployment were added. Documentation validation covers local links, fences, whitespace, status count and phase coverage before committing and pushing this update.

## 2026-10-28 — Phase 0 started; reference access blocked

Recorded explicit per-phase approval in ADR-005 and current execution rules. Added PHASE_0_REPORT.md and a pinned isolated candidate-library spike with nine passing numerical tests. npm audit reported zero known vulnerabilities. MathLive API inspected; browser compatibility unrun. Official Casio support request returned proxy CONNECT 403; saved a draft domain addition for support.casio.com, requiring user settings review/save and publication before retry. Phase 0 is Blocked/incomplete; all later phases are Not started. No application scaffold or deployment added.

## 2026-10-28 — Phase 0 resumed and product specification captured

Rechecked official support access; CONNECT 403 persists and custom allowed hosts remain empty. Ran the isolated MathLive browser probe: seven checks passed; captured harness/results added. Recorded user-supplied product list as S4 in PRODUCT_SPECIFICATION.md, separating app functions from physical/commercial claims. Updated PRD/TRD/validation/reference mappings for nine variables, 10+2 display, multi-statements, memory protection and replay. Official limits/precision still unverified; Phase 0 remains incomplete, with no Phase 1 work.

## Phase 0 review package — revised reference scope

Following the user's direction to leave network/manual setup, recorded PHASE_0_DESIGN.md with AST/value boundaries, provisional precision, library adapter decisions, worker budgets, state policy and requirement-to-validation mapping. Preserved REF-01–09 as deferred compatibility gaps. Phase 0 is complete under the revised scope and awaits user review; Phase 1 is not started. Existing nine numerical/seven editor probes are prior evidence, not newly executed application tests. Validated documentation links, fences and whitespace.

## Phase 1 — Foundation completed

User approved Phase 1. Added pinned React/TypeScript/Vite application, responsive shell, typed AST/value contracts, reducer, worker protocol/lifecycle, Vitest/Playwright tests and CI. Clean lockfile install/build passed; 16 unit and four desktop/mobile browser tests passed. Production dependency audit reported zero known vulnerabilities. Screenshots and limitations recorded in PHASE_1_REPORT.md. Phase 2 remains unapproved.

## Reference keypad clarification

User requires the same buttons as the supplied photo and MODE/SETUP support for advanced workflows. Added KEYPAD_REQUIREMENTS.md with button rows, modifier legends, menu distinctions and acceptance tests; linked PRD, architecture and validation. Phase 1 sidebar is explicitly temporary. No application behavior changed and no next-phase approval inferred.

## Phase 2 — Scientific core completed

Implemented parser/AST bounds, exact rational and supported symbolic arithmetic, decimal scientific functions, format/angle options, typed errors and worker calculation transport. Added an expression review form and preserved input on angle changes. Pinned decimal.js and included its license in public/licenses. Build/typecheck passed, 105 unit tests and six desktop/mobile browser tests passed, production audit reported zero known vulnerabilities. Browser label issues found during validation were fixed and rechecked. Saved screenshots and detailed PHASE_2_REPORT.md with project limits and unverified compatibility behavior. Phase 3 keypad/MODE/SETUP work awaits approval.
