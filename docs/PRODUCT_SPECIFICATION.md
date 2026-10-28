# User-supplied product specification

Source S4: product specification pasted by the user on 2026-10-28. Region indicators: Indian product code C79, Thailand origin. Original product-page URL is not supplied; this is attributed user-provided information, not independently authenticated official documentation. It supplements the pictured fx-991ES PLUS 2nd edition target and must not silently resolve edition/region ambiguities.

## Product and display

Non-programmable, non-graphing; advertised 417 functions; 10 + 2 digits; natural textbook display; dot matrix display; plastic keys; fast typing / 2-key rollover; negative sign; power off.

Application implications: preserve non-programmable/non-graphing scope; support natural mathematical input/output and reference-compatible display formatting. Treat 10+2 as the reported display digit specification, not proof of working precision or rounding rules. Accept rapid sequential input without losing events; browser input is not literal hardware key scanning. Build a traceable function inventory rather than claiming 417 distinct implemented APIs or using a count as a test of compatibility.

## Memory and settings

Nine variables; independent memory M/M+/M−; answer memory; memory protection; reset. FIX, SCI, NORM, engineering notation and result toggling.

Application implications: test variable/memory separation, preservation/reset scopes, formatting transitions and replay. The names of all nine variables, memory-protection semantics, exact reset scopes and exponent limits still require the manual. A physical power-off claim does not establish browser persistence behavior.

## Calculation inventory

- Basic arithmetic and brackets; fractions; degree-minute-second/sexagesimal calculations; reciprocal; scientific percent; factorial; pi; calculations with roots/pi; rounding.
- e; BASE-N and logical operators; complex arithmetic; matrices; vectors; differentiation and integration.
- Multi-statement colon command; continuous calculation; replay and multi-replay; CALC and SOLVE.
- Absolute value; square, cube and general powers; square root; trigonometry and inverses; hyperbolic/inverse hyperbolic functions; exponential and logarithmic calculations including arbitrary-base log; coordinate conversion; permutations/combinations; random numbers and integers; summation.
- Equations; scientific constants; metric conversions.
- List-based statistics data editor; statistical and basic statistics calculations.

The supplied list does not enumerate regression variants, matrix/vector dimensions, equation capacities, BASE-N widths, catalog entries or TABLE behavior. Existing full functional scope remains in force; omission from this summary is not evidence that a reference capability is absent.

## Physical and commercial specifications

Solar and battery; approximate main-battery life three years; auto power off; 161.5 × 77 × 11.1 mm; 95 g; hard case; three-year warranty; net quantity one; Indian product code C79; origin Thailand.

These describe the reference hardware/product. The web app must not claim solar power, battery life, physical size/weight, included hard case, manufacturer warranty, country of manufacture or exam approval. Hardware dimensions can inform visual proportions, not literal CSS millimetre guarantees. Auto-off can inform an optional simulated inactive state only after behavior is specified; it does not require deleting user data. No manufacturer branding or physical-product claims are authorized by this list.

## Traceability additions

| User-supplied feature | Requirement | Additional verification |
|---|---|---|
| 417 functions | All PRD functions; REF-02/09 | Complete function/menu checklist; no arbitrary counting convention |
| 10+2 digits | PRD-04; REF-04 | Mantissa/exponent presentation, precision and rounding |
| Nine variables and memory protection | PRD-05; REF-08 | Variable names, off/on persistence and clear scopes |
| Multi-statement colon | PRD-05; REF-02/08 | Statement sequencing, execute/replay and Ans/error semantics |
| Continuous/replay/multi-replay | PRD-01/05; REF-08 | History traversal, editing and reset behavior |
| Fast typing/2-key rollover | PRD-15 | Browser rapid-input event-order tests; hardware equivalence not claimed |
| Advanced numeric modes | PRD-06–13; REF-05/06/07 | Capacities, domains, algorithms and catalog values |
