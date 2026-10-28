# Reference inventory and research register

## Evidence policy

Reference model: **Casio fx-991ES PLUS, 2nd edition**, as shown in the user-supplied image. Source S1 is that image. No official manual has been downloaded or reviewed in this baseline. Source S2 must be the official Casio manual matching the model, edition and region; begin at https://support.casio.com/ and record the exact document URL, edition, language, access date and checksum after retrieval. Source S3 is an actual matching device, if available. Record test sequences and display observations without inventing them.

Evidence labels: **visible** means readable from S1; **candidate** means proposed for verification, not a verified model specification; **verified** requires cited manual sections or device observations. A photo is insufficient to establish hidden functions or exact limits.

## Visible controls (S1)

| Group | Visible labels and secondary legends | Verification needed |
|---|---|---|
| Control | SHIFT, ALPHA, MODE/SETUP, ON, four-way replay control | Modifier lifetime, menu navigation, power/reset semantics |
| Evaluation templates | CALC/SOLVE/=, integral/derivative/colon, reciprocal/factorial, arbitrary-base log/summation | Template slots, domains, CALC variable rules |
| Powers and logs | fraction/mixed fraction, square root/cube root, square/cube, power/nth root, log/10^x, ln/e^x | Exact result conditions, precedence, nesting |
| Scientific | negative sign/angle/A, DMS/B, hyp/Abs/C, sin/inverse/D, cos/inverse/E, tan/inverse/F | All hyp combinations, angle and DMS editing |
| State and display | RCL/STO, ENG/imaginary i, parentheses/percent/comma/X, S⇔D/fraction conversion/Y, M+/M−/M | Variable set, recall/store interaction, engineering shifts |
| Numeric keypad | 0–9, decimal point, ×10^x, Ans, equals, arithmetic operators, DEL/INS, AC/OFF | Input editing, exponent sign, execute/replay behavior |
| Utility legends | CONST, CONV, CLR, MATRIX, VECTOR, STAT, CMPLX, BASE, nPr, nCr, Pol, Rec, Rnd, Ran#, RanInt, pi, e, DRG | Catalog indices, contextual menus and restrictions |

Secondary labels can be ambiguous in a photo. Transcribe them against the manual before implementing key maps.

## Candidate mode inventory

COMP, CMPLX, STAT, BASE-N, EQN, MATRIX, TABLE and VECTOR are candidate modes for manual verification. Do not infer menu numbering from this list. For each, record entry/exit sequence, allowed operators, context menus, data retention, output types and error messages.

## Research tasks and required artifacts

| ID | Task | Required evidence / deliverable | Status |
|---|---|---|---|
| REF-01 | Identify official manual | Exact model/edition/region match; URL, metadata and section references | Pending |
| REF-02 | Enumerate complete key/menu map | Base, SHIFT, ALPHA and contextual mappings with menu numbering | Pending; visible labels above |
| REF-03 | Resolve precedence and input limits | Official precedence table; sign/power/implicit multiplication probes; stack, nesting and expression limits | Pending |
| REF-04 | Resolve precision and output rules | Internal/display policy, underflow/overflow, exact fraction/surd/pi forms, rounding and NORM thresholds | Pending |
| REF-05 | Resolve advanced capacities | Equation degrees/unknowns, matrix/vector dimensions, statistics models and data capacity, TABLE limits | Pending |
| REF-06 | Resolve numeric algorithms | Supported calculus/solve domains, defaults, tolerances, initial guesses and failure behavior | Pending |
| REF-07 | Capture constants/conversions | Complete indexed catalogs, units, values, significant figures and source edition | Pending |
| REF-08 | Capture state transitions | Reset scopes, off/on, Ans, memory, variables, data retention and modifier behavior | Pending |
| REF-09 | Build reference fixture corpus | Input key sequence, setup state, output, error, evidence and comparison rule | Pending |

## Compatibility fixture schema

Each fixture records: unique ID; PRD/REF requirement IDs; source document section or device observation; initial mode/setup/memory; key sequence or structured input; expected mathematical result; expected displayed result; error/cursor/state expectations; comparison rule; reviewer and verification date. Keep mathematically correct behavior and observed reference behavior distinct if they differ.

Do not use marketing function counts as a completeness test. Completeness is measured through the traceable key, menu, mode and behavioral inventory.

## Agreed product scope versus verification status

The user explicitly requires all advanced functionality, including matrix operations, vector dot/cross products, complex arithmetic, simultaneous and quadratic/cubic equations, SOLVE, calculus, statistics/regression, BASE-N, TABLE and constants/conversions. These are mandatory implementation targets. The candidate label above describes unverified reference details and menu enumeration, not optional product scope.

REF-05 must establish dimensions, named storage, equation sizes, regression models, base widths and table/data capacities. REF-06 must establish algorithmic inputs, domains, tolerances and observable failures. Evaluate candidate libraries only after capturing these reference fixtures. No official-manual research or library trial was completed as part of this document update.

## Reference work in the delivery plan

[Phase 0](IMPLEMENTATION_PLAN.md) owns the reference baseline. Complete the applicable source/key/limit/precision evidence before implementing an affected capability in Phases 2–7. Carry explicitly unresolved device checks as tracked research items, never as assumed passing parity. Phase 8 audits the full requirement-to-evidence inventory.

## Phase 0 access status

See [PHASE_0_REPORT.md](PHASE_0_REPORT.md). Official support access is currently denied by the proxy; no manual-derived facts or exact capacities were verified. REF-01–09 remain pending. An environment draft adding support.casio.com is saved but is not an applied network policy. Nine independent numerical-library probes passed; they are not reference fixtures.

## Source S4 — User-supplied product specification

Recorded the complete functional summary and physical/commercial distinctions in [PRODUCT_SPECIFICATION.md](PRODUCT_SPECIFICATION.md). S4 reports 417 functions, 10+2 digits, nine variables, memory protection, colon multi-statements, continuous calculation and replay/multi-replay. These are attributed user requirements, not independently verified manual facts. S4 has no original URL. REF-01–09 still require source/behavior verification. Do not infer internal precision from display digits or omit TABLE/regression scope because this summary does not enumerate it.

## Revised research scope

The user explicitly deferred the network/manual step. S1 and S4 now support the provisional design baseline in [PHASE_0_DESIGN.md](PHASE_0_DESIGN.md). REF-01–09 remain unverified and tracked. Their absence no longer blocks Phase 1 foundation work after user approval, but still prevents exact parity claims.
