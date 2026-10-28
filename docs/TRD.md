# Technical requirements document

## Status and agreed stack

The stack decision is recorded. Isolated Phase 0 candidate dependencies are pinned under research/phase0; no application scaffold or application dependency manifest exists yet. See PHASE_0_REPORT.md for actual tests and unresolved compatibility work.

| Layer | Decision | Constraint |
|---|---|---|
| UI | React + TypeScript | Components handle presentation; state transitions stay explicit and testable |
| Tooling | Vite | Pin compatible versions when implementation begins; no version is claimed tested yet |
| Styling | CSS | Responsive device-style keypad and readable display; no CSS framework required |
| Expression editing | Custom structured editor contract; MathLive candidate adapter | Prototype template/cursor/key compatibility before adoption; normalize into the application AST |
| Evaluation | Independent TypeScript engine + Web Workers | No DOM/framework dependency, remote evaluation or dynamic code execution |
| Numerical dependencies | Evaluate math.js and decimal.js adapters | Accept only verified operations; neither guarantees reference precision or exact arithmetic |
| Unit/integration tests | Vitest | Numeric, parser, state, mode and worker coverage |
| Browser tests | Playwright | Keyboard/touch journeys, accessibility, offline and security checks |
| Offline delivery | PWA after core validation | Versioned same-origin assets and tested update lifecycle |
| Backend/database | None required | Local calculation; persistence policy separately decided |

Prefer locally bundled assets and minimal dependencies. Library support does not establish parity. No dependency is approved merely because it appears as a candidate here.

## Required design properties

| ID | Requirement | Verification |
|---|---|---|
| TRD-01 | Structured editor emits validated AST; parser supports documented linear syntax; no dynamic code evaluation | Grammar tests, round-trip tests, malicious inputs |
| TRD-02 | Tagged values: integer/rational, approximate real, complex, matrix and vector; limited exact surd/pi forms only where justified | Type/domain tests and reference fixtures |
| TRD-03 | Numeric precision and rounding centralized; arithmetic guard digits and presentation boundaries explicit | Precision ADR and boundary cases |
| TRD-04 | Mode capability registry controls commands and allowed value types | Cross-mode and unsupported-command tests |
| TRD-05 | Deterministic state reducer handles modifiers, cursor, setup, variables, Ans, memory, mode data and reset | State transition and key-sequence tests |
| TRD-06 | Worker protocol validates versioned request/result schemas; IDs and state revisions prevent stale updates | Cancellation/race/malformed-message tests |
| TRD-07 | Numerical algorithms report domain, convergence and budget failures explicitly | Analytic checks and pathological fixtures |
| TRD-08 | Catalog data includes units, indices, edition and source provenance | Catalog completeness and conversion round trips |
| TRD-09 | No backend or external request required for evaluation | Browser network checks |
| TRD-10 | UI supports keyboard, touch, readable mathematical output and accessible descriptions | End-to-end, keyboard and accessibility review |

## Precision contract

Do not adopt JavaScript Number as the universal mathematical representation. Rational values require normalized arbitrary-precision integer numerators/denominators with resource bounds. Approximate real/complex calculations require an evaluated precision strategy and explicit conversion rules. Matrix/vector operations must define numeric domain and conditioning behavior. Exact formatting must preserve provenance; never present a guessed rational approximation as an exact answer.

The reference's internal precision, display precision, rounding ties, exponent range, NORM thresholds and exact-form restrictions remain REF-04 research items. A precision ADR and golden fixtures are required before a parity-ready engine is accepted. Transcendental functions must not be advertised as arbitrary-precision merely because storage uses decimals.

## Algorithms and error contract

Candidate approaches: adaptive quadrature for integration, stable finite differences for numerical derivatives, safeguarded root finding for SOLVE, pivoted linear algebra and stable polynomial roots. These are proposals, not claims about vendor algorithms. Choose methods based on compatibility, stability and performance evidence. Reject unsupported complex domains explicitly. Handle singular/ill-conditioned systems, discontinuities, divergent integrals, repeated roots and multiple-root ambiguity deliberately.

Use stable internal error codes with a reference display mapping: syntax, mathematical domain, dimension, capacity/stack, invalid data, convergence and resource limits. Exact display names must be verified. Error results must preserve editable input and provide cursor location where possible. Cancellation must never commit partial results to Ans or memory.

## Performance and limits

Proposed engineering targets, to be benchmarked on a recorded mid-range mobile device: ordinary input feedback under 50 ms p95; basic evaluation under 100 ms p95 after initialization; expensive operations cancellable with UI acknowledgement under 100 ms. Numerical tolerance targets await REF-04/06.

Before implementation, define bounded expression length, AST depth/node count, integer bit length, dataset size, worker time and algorithm iteration budgets. Reference capacities and protective web limits are different concepts and must be documented separately. Never silently truncate data or relax a mathematical tolerance to satisfy a timing target.

## Persistence and offline behavior

Default proposal: session-local calculations, no telemetry. Persistent settings/history require an explicit product decision, versioned schemas and reset/delete controls. For the agreed PWA stage, define same-origin caching, update behavior and stale-version recovery; do not claim first-load offline support without prior installation. Browser compatibility target proposed: current and previous stable Chromium, Firefox and Safari, including mobile variants; confirm the support matrix before release.

## Build and delivery

When implementation begins, add a pinned runtime/toolchain, dependency lockfile and scripts for development, build, type-check, lint and tests. CI must run the agreed checks with failure propagation and artifact provenance. No build/test commands exist yet. Release must include compatibility status, known deviations, dependency licenses, security checks and an explicit hosting configuration.

## Advanced mode implementation requirements

- Matrix adapter: typed dimensions and entries, named matrices, supported arithmetic, determinant, pivoted inverse, transpose and singular/dimension errors. Do not rely on library defaults for reference limits or formatting.
- Vector adapter: verified dimensions and named storage, arithmetic, scalar multiplication, dot/cross products and compatible result types. Reject unsupported dimensions explicitly.
- Equation adapter: coefficient editors, simultaneous linear and quadratic/cubic solving, solution navigation and degeneracy handling. Keep numerical SOLVE as a separate operation with explicit initial guess and convergence policy.
- Complex adapter: explicit real/imaginary types, angle-sensitive polar/rectangular conversion and verified function domains.
- Statistics adapter: dataset/frequency state, supported summaries/regressions, predictions, capacity and degenerate-data checks.
- BASE-N adapter: exact integer representation, explicit signed widths, radix conversion and verified logical operators. JavaScript bitwise defaults must not define compatibility.
- Calculus/table/catalog adapters: bounded algorithms, verified templates/table limits, edition-specific constants and unit conversions with provenance.

Library outputs pass through mode-domain checks, numeric conversion rules and central formatting. Prevent a generic library expression evaluator from bypassing the validated application grammar or accessing assignments/imports/property paths. Each adapter requires independent mathematical tests and reference sequences.

## Delivery sequencing

The [implementation plan](IMPLEMENTATION_PLAN.md) governs Phases 0–9. Establish numeric/editor evidence before adoption, then build shared contracts before specialist modes. Performance budgets, typed errors, worker cancellation and security requirements apply from their first relevant implementation, not only during final hardening. Record tested commands and results at each completion gate.

## User-supplied specification constraints

See PRODUCT_SPECIFICATION.md for S4. Implement colon-separated statements as validated structured sequences with bounded statement count, explicit execution/Ans updates and verified error/continuation semantics; never translate them to executable JavaScript. Nine-variable storage must use the verified variable whitelist. Display formatting must accommodate the reported 10+2 digits without treating that as internal precision. Rapid-input handling must preserve command ordering. Physical power/memory claims do not define web persistence automatically.
