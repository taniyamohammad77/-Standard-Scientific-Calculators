# Phase 2 — Scientific calculation engine

Status: complete against the provisional project specification; awaiting explicit Phase 3 approval. Official-device precision, menu behavior and limits remain deferred and unverified.

## Delivered

Dedicated tokenization and bounded AST parser; no dynamic code evaluation. Supports parentheses, unary signs, right-associative powers, left-associative multiplication/division and implicit multiplication at the same precedence as multiplication. Whitespace-separated numbers are rejected. Function names are allowlisted, with argument-count validation.

Exact BigInt rationals for decimal literals, fractions and rational arithmetic. Supported exact square roots and pi multiples have symbolic representations. Matching symbolic terms can combine, and unsupported symbolic combinations deliberately become approximate values. This is not a general symbolic algebra system. Exact radical factor extraction is bounded; some large radicals remain exact but unsimplified.

Added decimal.js 10.6.0 with an isolated 40-significant-digit working context for approximate real operations. Supports powers, sqrt/cbrt/nth roots, reciprocal via division, factorial, percent, absolute value, log/ln/arbitrary-base log, exponential, trig/inverse/hyperbolic functions, permutations/combinations, random values/integers, explicit rounding and DMS input/output. DEG/RAD/GRAD affect ordinary trig; hyperbolic functions are unit-independent. Some known rational-angle trig results retain exactness; nearby values are not snapped to zero using a tolerance.

Result formats: EXACT, NORM, FIX, SCI, ENG and DMS. Mathematical value exactness is separate from rounded decimal presentation. The current format conventions are project policies, not verified physical-device output. The textual expression form is a Phase 2 review interface; it does not replace the required Phase 3 keypad.

Worker now accepts validated calculation requests and returns bounded result/error messages. Invalid expressions preserve editable input. Error recovery, stale-response rejection, terminated-worker callback isolation and timeout/cancellation remain active. Changing angle preferences preserves the input and invalidates the old result. Mode switches/reset clear the review panel; final memory/replay semantics belong to Phase 3.

## Representative results

| Expression / settings | Result |
|---|---|
| 1/3 + 1/6 | 1/2 |
| sqrt(8) | 2√(2) |
| sqrt(2) * sqrt(2) | 2 |
| 2pi/4 | π/2 |
| -2^2 | -4 |
| 2^3^2 | 512 |
| sin(30), DEG | 1/2 |
| cos(pi), RAD | -1 |
| nCr(5,2) | 10 |
| 1/3, FIX 3 | 0.333 |
| 1/0 | Typed division-by-zero error |

## Validation

- Production build and TypeScript checks passed.
- 105 unit tests passed; zero failures/skips. Includes exact identities, scientific functions, angle settings, formats/random bounds, invalid domains, injection/malformed input, nesting/length budgets and worker protocol/lifecycle.
- Six desktop/mobile Chromium browser tests passed. Real worker evaluation, exact display, format/digit settings, angle-change input preservation, injection rejection, error recovery, mode navigation/reset and layout overflow checks exercised.
- Initial browser run exposed ambiguous control/status labels; labels and test targeting were corrected, then all browser checks passed.
- npm audit --omit=dev reported zero known production vulnerabilities at execution time. Development dependency audit and physical-device accuracy certification are not claimed.
- Screenshots captured after evaluation; mobile screenshot visually inspected. Browser coverage is Chromium viewport testing, not physical-device/Safari/Firefox certification.

## Provisional limits and semantics

Inputs: 4,096 characters, 2,048 nodes, maximum AST depth 64. Literal exponents limited to ±1000; exact integer powers to ±1000; factorial/combinatorics operands to 0–1000; exact integer storage bounded at 16,384 bits. nth-root degree 1–1000. Random integers use inclusive bounds within ±1,000,000,000 and Math.random (not cryptographic). Errors distinguish syntax, domain, division by zero, resource limits, options and overflow.

Approximate decimal context uses rounding half-up and exponent configuration ±9999; explicit exponential/power underflow is reported as an error. Worker hard timeout is five seconds, with a four-second evaluator deadline checked between nodes. Formatting uses up to ten digits; NORM currently uses decimal.js significant-digit/exponential presentation conventions, not the device's two NORM modes. DMS rounds seconds to six decimal places. Percent means divide by 100, without contextual business-calculator semantics. General non-integer powers and nth roots are approximate unless a supported exact square-root path applies. General mixed surd/pi expressions may lose exact form and are labeled approximate.

These limits are protective project choices, not claims about reference capacities. Full reference output compatibility, nine variables/Ans/M, colon statements, replay, final keypad/MODE/SETUP and advanced modes are not completed by this phase. Full scope is retained in the delivery plan.

## Review captures

[Desktop](reviews/phase2-desktop.png) · [Mobile](reviews/phase2-mobile.png)

## Next approval

Phase 3 will implement the photo's keypad arrangement, primary/SHIFT/ALPHA commands, MODE/SETUP and natural-input/state workflows. It requires explicit user approval before work starts. Numerical specialist modes remain in Phases 4–7. No public deployment has occurred.
