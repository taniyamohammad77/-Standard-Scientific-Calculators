# Reference keypad and MODE/SETUP requirements

User requirement: the final calculator must have the same physical button arrangement and functional legends as the supplied fx-991ES PLUS 2nd edition photo. The Phase 1 sidebar is temporary scaffolding and must not replace the reference keypad/menu workflow. Original branding/assets remain separate from functional layout fidelity.

## Required layout, top to bottom

- Control cluster: SHIFT, ALPHA, four-way replay arrows, MODE with SETUP secondary action, ON.
- Function row: CALC, integral template, reciprocal, arbitrary-base logarithm, preserving the reference spacing around the replay cluster.
- Six-key row: fraction, square root, square, general power, log, ln.
- Six-key row: negative sign, degree/minute/second, hyp, sin, cos, tan.
- Six-key row: RCL, ENG, left parenthesis, right parenthesis, S⇔D, M+.
- Five-key row: 7, 8, 9, DEL, AC.
- Five-key row: 4, 5, 6, multiplication, division.
- Five-key row: 1, 2, 3, addition, subtraction.
- Five-key row: 0, decimal point, ×10^x, Ans, equals.

Reproduce the photo's secondary labels and functional color distinctions: SHIFT functions, ALPHA variables/symbols and mode-specific base labels. Use the image-derived inventory in REFERENCE.md; resolve ambiguous glyphs explicitly. Include SOLVE, derivative, summation, factorial, roots/powers, inverse trig, STO, imaginary unit, percent, M−, CONST, CONV, CLR, INS, OFF, MATRIX, VECTOR, STAT, CMPLX, BASE, permutations/combinations, Pol/Rec, Rnd, random functions, pi/e and angle conversion where pictured. Do not invent physical buttons for advanced features or silently omit a secondary action.

## Menu behavior

MODE opens an on-display calculation-mode menu. SHIFT followed by MODE opens SETUP. Advanced capabilities must be reachable through the appropriate reference mode/context menus and SHIFT/ALPHA actions, including complex numbers, BASE-N, matrices, vectors, equations, statistics and tables. Calculus/SOLVE and constants/conversions retain their reference key/context access; they are not automatically invented as separate physical MODE entries.

SETUP manages configuration such as input/output format, angles and number formats. Do not combine all mathematical operations into SETUP: preserve the distinction between selecting a calculation mode, configuring it and invoking a function. Exact menu numbering, nesting and context-dependent options remain unverified because official-manual research is deferred. Track those gaps explicitly; full feature reachability remains mandatory.

## Acceptance checks

1. Compare desktop and mobile keypad screenshots against the supplied photo: row order, key count, primary/secondary legends and replay/control grouping.
2. Exercise every primary, SHIFT and ALPHA mapping via pointer and keyboard, with no silent no-op controls.
3. Verify MODE, SHIFT→MODE, arrows, selection, dismissal and return-to-calculation behavior.
4. Verify every supported advanced operation can be reached from the keypad/menu workflow without relying on the temporary sidebar.
5. Retain readable labels, focus visibility and accessible names; mobile resizing must not reorder the reference keys.

Phase 3 owns final keypad/editor integration; numerical phases provide the actual operations. This requirement update is not approval to start Phase 2 or Phase 3. The completed Phase 1 shell remains a foundation review artifact, not an accepted final UI.
