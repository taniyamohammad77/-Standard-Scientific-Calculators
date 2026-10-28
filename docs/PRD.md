# Product requirements document

## 1. Objective and reference

Build a scientific engineering calculator with the functions and key-driven workflow of the **fx-991ES PLUS 2nd edition** in the user's image. Users should be able to transfer ordinary scientific and engineering workflows from that device without discovering missing modes or silently different semantics.

The supplied image establishes the model, visible key legends and physical interaction reference. It does not establish all nested menus, algorithms, capacities or rounding behavior. See REFERENCE.md for evidence levels and open verification tasks.

## 2. Users and platform

Primary users: engineering students, educators and practicing engineers. Primary workflow: enter textbook expressions, edit/replay calculations, choose mode/setup, evaluate and inspect results.

A responsive, desktop-and-mobile browser application is the agreed first platform, using React, TypeScript, Vite and CSS. Core calculations run locally in Web Workers without a backend or database. PWA installation/offline support follows core validation. Native mobile packaging is a possible later extension, not part of this delivery decision. Full function parity remains the target.

## 3. Functional requirements

| ID | Capability | Acceptance condition |
|---|---|---|
| PRD-01 | Complete key interaction | Every physical key and supported SHIFT/ALPHA/context action maps to a documented command; replay arrows and modifier cancellation match the verified reference |
| PRD-02 | Natural mathematical input | Editable fractions, mixed fractions, powers, roots, logs and calculus templates; cursor traverses template slots; linear input supported if present in reference |
| PRD-03 | Arithmetic and scientific functions | Reference precedence, signs, implicit multiplication, scientific entry, trig/inverse/hyperbolic, logs/exponentials, powers/roots, factorial, percent and combinatorics |
| PRD-04 | Output and setup | Verified Math/Line behavior, S⇔D, fraction conversion, FIX/SCI/NORM, ENG shifts, angle units and DMS; unsupported exact results never fabricated |
| PRD-05 | Variables and calculation state | Ans, nine variables (S4; names to verify), independent memory, memory protection, RCL/STO, CALC substitution, colon multi-statements, continuous calculation, replay/multi-replay and reset scopes match the reference |
| PRD-06 | Numerical calculus and solve | Definite integration, numerical derivative, summation and SOLVE with documented domains, tolerances, limits and nonconvergence errors |
| PRD-07 | Complex mode | Supported complex operations, imaginary unit, argument, conjugate, polar/rectangular conversion and display forms |
| PRD-08 | Statistics | Dataset editing, one-variable summaries, supported regressions and predictions; invalid/degenerate data produces reference-compatible errors |
| PRD-09 | Base-N | Supported bases, conversions, integer ranges and logical operations with explicit signed-width semantics |
| PRD-10 | Equations | Simultaneous linear equations and quadratic/cubic polynomial equations, coefficient editing and solution navigation; exact reference limits verified before implementation; singular cases handled explicitly |
| PRD-11 | Matrices and vectors | Matrix arithmetic, determinant, inverse and transpose; vector arithmetic, dot and cross products; named storage and supported dimensions verified against the reference; capacity and dimension errors |
| PRD-12 | Tables | Reference-supported function input, start/end/step rules, row limits and navigation |
| PRD-13 | Constants and conversions | Edition-specific indexed catalogs, values, units and rounding verified against the official source |
| PRD-14 | Random and rounding | Ran#, integer random and Rnd behavior; seed injection for tests; no claim of cryptographic randomness |
| PRD-15 | Usable interface | Faithful key grouping and legend layers, readable display, keyboard equivalent, touch operation and accessible text alternatives |
| PRD-16 | Robust operation | Offline calculation after supported installation/caching, bounded expensive work, cancel/reset recovery, no remote expression evaluation |

## 4. Scope boundaries

The scope is functional compatibility with this model, including its limits. Do not replace numerical SOLVE with a claim of general symbolic algebra. Graphing, programming, CAS, accounts, cloud sync, exam certification and other calculator models are outside the initial scope. Independent visual assets and product identity will be used; final casing and branding treatment remain design decisions.

## 5. Delivery gates

The [phase-by-phase implementation plan](IMPLEMENTATION_PLAN.md) is the canonical delivery roadmap. It defines Phases 0–9, their dependencies, requirement coverage and evidence gates: reference/design, foundation, core mathematics, interaction, complex/BASE-N, matrices/vectors, equations/calculus, statistics/tables/catalogs, whole-calculator hardening and offline release readiness.

These are implementation stages, not permission to omit remaining functions. A partial build must label incomplete capabilities and must not claim full parity. Update the roadmap and update notes on phase completion; full release acceptance below still applies.

## 6. Release acceptance

All in-scope requirements have passing automated checks and traceable reference evidence. Every key layer/menu action is accounted for. Golden calculation results agree at the documented display precision and behavior; deviations are explicitly accepted, not hidden. Mobile and desktop interaction, accessibility, offline behavior, bounded execution and error recovery pass validation. Documentation lists remaining deviations and known numerical limitations.

## 7. Open decisions

Finalize reference manual/region; decide visual fidelity and independent branding; choose persistence policy; approve numerical compatibility targets after reference research; select project license and deployment host. Research and documentation can proceed without silently deciding these product choices.

## 8. Advanced functionality commitment

PRD-06 through PRD-13 are mandatory release capabilities, not optional extras. Matrices and vectors require their own data editors, storage, menus and result navigation, not only library operations. Statistics requires dataset/frequency workflows and all reference-supported regressions. BASE-N requires reference signed-width and logical semantics. Equations require coefficient input and solution browsing. Every mode must integrate with its verified key layers, setup, error and reset behavior. Phased development may deliver subsets for review, but full compatibility cannot be declared until all required modes and operations pass the audit.

## Reference keypad requirement

The final UI must reproduce the supplied photo’s button arrangement and primary/secondary functional labels. MODE and SHIFT→MODE (SETUP) are mandatory, with all advanced capabilities reachable through the correct key/mode/context workflows. The Phase 1 sidebar is temporary. See [KEYPAD_REQUIREMENTS.md](KEYPAD_REQUIREMENTS.md) for row inventory and acceptance checks.
