# Phase 0 design baseline for review

Status: complete under revised research scope; awaiting user approval for Phase 1. The user asked to leave the network/manual step and proceed using the image (S1) and supplied specification (S4). This defers reference research, not mathematical correctness or full feature scope. No exact-device-compatibility claim is made.

## Engineering decisions

- React/TypeScript/Vite/CSS with a pure typed engine and worker boundary; no backend. Phase 1 builds infrastructure only.
- Own the AST and command registry. Nodes: literal, constant, variable, unary, binary, call and statement sequence; structured template slots preserve cursor paths. No arbitrary JavaScript or general library expression execution.
- Exact fractions use normalized BigInt numerator/denominator. Approximate calculations use isolated decimal.js contexts; initial working precision 40 significant digits is a project setting, not device precision. Display policy remains separate; S4 reports 10+2 digits. Final rounding/exact-form thresholds remain provisional until validated.
- decimal.js 10.6.0 is the initial approximate-real candidate selected for adapter implementation based on the numerical spike. mathjs 15.2.0 is limited to explicit complex/linear-algebra adapters after per-operation tests; no unrestricted evaluator. Complex double-precision outputs must never be presented as 40-digit results. Exact/approximate provenance must survive formatting.
- MathLive 0.111.1 is selected for an editor integration trial behind an adapter based on seven successful browser API probes. It is not approved as a reference-faithful editor yet; nested navigation, mobile, accessibility and sanitization must pass Phase 3 gates. Keep replacement possible without changing the AST/engine.
- Worker messages contain protocol version, request ID, state revision, typed AST/context and budget. Reject malformed or stale messages. Timeout/cancellation terminates and replaces the worker if computation cannot yield. Never commit cancelled results to Ans.
- Initial protective limits: 4,096 input characters, 2,048 AST nodes, depth 64, 32 statements, 16,384-bit exact integers, 5-second worker deadline. These are project safety limits, not reference capacities; validate and tune with measured tests. Mode capacities require separate explicit policies.
- Session-only state initially; no telemetry, accounts or persistent history. Settings persistence and offline installation are later decisions. Do not silently copy physical memory/power semantics into browser storage.

## Requirement-to-validation baseline

| Requirements | Planned evidence | Phase owner |
|---|---|---|
| PRD-01,02,15 | Key layers, template/cursor edits, rapid input, keyboard/touch and accessibility journeys | 3 |
| PRD-03,04,14 | Precedence, fractions, trig, random bounds, rounding and formatting fixtures | 2 |
| PRD-05 | Nine-variable isolation, Ans/M, colon execution, replay and clear-state sequences | 3 |
| PRD-06,10 | Analytic calculus examples, residual-checked roots, singular/degenerate cases and cancellation | 6 |
| PRD-07,09 | Complex identities, polar conversion, radix and signed-width boundaries | 4 |
| PRD-11 | Matrix inverse/determinant/transpose, vector dot/cross, dimensions and singularity | 5 |
| PRD-08,12,13 | Dataset/regression, table limits and sourced catalog/conversion fixtures | 7 |
| PRD-16 | Worker recovery, offline/update flows and network privacy | 1,8,9 |

Nine numerical and seven editor smoke checks already passed; these are research evidence, not the planned application suites. No new application test results are claimed here.

## Deferred compatibility register

REF-01 official manual identification; REF-02 complete key/menu numbering; REF-03 precedence/input limits; REF-04 device precision/rounding/exact forms; REF-05 mode capacities; REF-06 algorithm defaults; REF-07 complete catalog values; REF-08 reset/power/replay semantics; REF-09 device fixtures remain unverified. The current image labels and S4 inventory are the working requirements, not a full verified manual transcription.

These items no longer block foundation scaffolding under the user's revised direction. They still block exact parity claims and acceptance of affected reference-dependent behavior. Do not fabricate constants, menu numbers or capacities. Track assumptions explicitly and test independent mathematical correctness while compatibility evidence is pending.

## Next reviewable phase

Phase 1: scaffold the agreed stack, pin runtime/dependencies, add CI/build/type checks, define typed value/AST and reducer interfaces, implement worker request validation and stale-response/error recovery tests, and present a minimal navigable application shell clearly identifying unfinished modes. Numerical modes and finished calculator UI belong to subsequent phases. Start only after explicit Phase 1 approval.
