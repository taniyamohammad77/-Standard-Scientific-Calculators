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
