# Validation and compatibility plan

No application tests have been run. Phase 0 has nine isolated candidate-library probes, recorded in PHASE_0_REPORT.md; they are not application or device-compatibility tests.

## Test layers

1. Parser/editor: precedence, unary signs, implicit multiplication, template editing, cursor navigation, malformed input, round trips and bounded nesting.
2. Numeric core: exact arithmetic properties, conversion boundaries, domain errors, precision, overflow/underflow and formatting.
3. Mode suites: every supported command, menu action, capacity boundary and cross-mode restriction.
4. State sequences: SHIFT/ALPHA, mode/setup transitions, replay, CALC, SOLVE, variables, memory, reset and cancellation.
5. Worker/integration: message validation, request ordering, stale responses, deadlines, recovery and state commit behavior.
6. Browser journeys: mouse, touch and keyboard; small-screen layout; accessible alternatives; offline/update behavior; network privacy and injection tests.
7. Reference audit: official-manual examples and matching-device sequences with traceable evidence.

## Representative numerical fixtures to establish

| Category | Mathematical check | Reference behavior still to verify |
|---|---|---|
| Precedence | 2+3×4 = 14; 2^(3^2) = 512 | Key-level precedence for signs and implicit multiplication |
| Angles | sin(30 degrees) = 1/2; cos(pi radians) = -1 | Exact output and angle conversion display |
| Fractions | 1/3 + 1/6 = 1/2 | Mixed/improper formatting and S⇔D limits |
| Calculus | Integral of cos(x), 0 to pi/2, in radians = 1; derivative of x² at 3 = 6 | Templates, defaults and precision |
| Solving | x²−2 = 0 has ±sqrt(2) | Initial guess, chosen root, residual and error messages |
| Complex | (1+i)(1−i) = 2 | Allowed functions, polar settings and display |
| Linear algebra | Inverse of [[1,2],[3,4]] = [[-2,1],[1.5,-0.5]] | Supported dimensions, exact/decimal output |
| Equations | x+y=3, x−y=1 gives x=2, y=1 | Coefficient workflow and singular-system behavior |
| Statistics | Values 1,2,3: mean 2, population variance 2/3, sample variance 1 | Catalog labels, frequency settings, capacities |
| Bases | Decimal 255 = hexadecimal FF | Signed widths, overflow and logical operators |
| Errors | Division by zero, invalid factorial, singular inverse, nonconvergence | Exact messages and input recovery |

These are proposed fixtures, not recorded passing tests or observed device output. Extend with singularities, cancellation, random ranges, conversions, constants, regression degeneracy and display thresholds. Independent mathematical oracles and reference-device comparisons serve different purposes and both are needed.

## Completion record

Maintain a requirement-to-test matrix with PRD/TRD/REF IDs, source evidence, test path, target/browser, actual result and known deviation. Release gates require no unexplained failures, no unverified required function and explicit sign-off on intentional differences. Store benchmark environment and tolerances alongside results. Do not equate a zero-test run or a successful build with functional readiness.

## Agreed test tooling and advanced-mode gates

Use Vitest for numerical, grammar, reducer, adapter and worker integration tests; use Playwright for browser workflows. Pin tool versions and add real scripts when implementation is authorized. These tools are selected, not installed or executed in this baseline.

Add explicit fixtures for vector dot/cross products (for example, unit x crossed with unit y equals unit z), matrix transpose/determinant/inverse and dimension failures, quadratic/cubic repeated and complex roots, simultaneous singular systems, complex polar conversions, regression degeneracy, signed BASE-N boundaries, TABLE row limits and catalog indexing. Validate mathematical expectations separately from observed device formatting and workflow.

A library adoption spike must demonstrate editor template/cursor compatibility for MathLive and supported numeric-domain/precision behavior for math.js or decimal.js. No adoption on API availability alone. Full release requires every advanced-mode requirement PRD-06 through PRD-13 to have tests and evidence; passing the basic calculation suite is insufficient. PWA validation must cover offline reload after installation, upgrade, cache recovery and version consistency.

## Phase completion gates

Use the evidence columns and completion-record template in the [implementation plan](IMPLEMENTATION_PLAN.md). Run meaningful checks as each feature is implemented; Phases 8–9 aggregate compatibility and release checks rather than deferring all testing until the end. Revalidate dependents after shared-engine changes. Record unrun, skipped, failing and passing checks separately; Phase 0 is blocked on official-reference access; later phases remain Not started.

## S4 specification coverage

Add coverage for colon statements, intermediate result/Ans updates, statement errors, continuous calculations, replay/multi-replay editing, nine-variable recall/store isolation, memory protection/reset scopes, 10+2 formatting boundaries and fast sequential key input. Match actual manual behavior before declaring parity. Treat the advertised 417 count as an inventory cross-check, not 417 automatically passing tests. Hardware/commercial specifications are outside functional app acceptance; see PRODUCT_SPECIFICATION.md.

## Phase 1 evidence

See PHASE_1_REPORT.md: 16 foundation unit tests and four desktop/mobile Chromium browser tests passed, plus a clean install and production build/typecheck. These validate infrastructure and shell behavior, not calculator mathematics. Earlier no-application-test statements describe Phase 0.

## Required reference UI checks

Phase 3 must pass the keypad row/legend comparison and MODE/SHIFT→MODE menu journeys in [KEYPAD_REQUIREMENTS.md](KEYPAD_REQUIREMENTS.md). Advanced capability tests must exercise keypad/menu reachability, not only direct engine calls or temporary sidebar navigation.

## Phase 2 evidence

105 unit tests and six desktop/mobile Chromium browser tests passed, along with build/typecheck. Coverage and concrete commands are in PHASE_2_REPORT.md. New checks cover scientific arithmetic and invalid domains, parser budgets, exact fraction/root/pi cases, random bounds, formatting, calculation-worker transport and browser error recovery. This is independent mathematical validation, not a matching-device comparison.
