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
