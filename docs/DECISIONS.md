# Decision log

## ADR-001 — Documentation baseline before implementation

Status: accepted by user direction, 2026-10-28.

Context: an initial generic browser prototype was created before the exact target and complete requirements were established. The user stopped development and requested repository cleanup and senior-developer documentation.

Decision: remove that prototype from the checkout, preserve a recovery copy outside it, and keep the repository documentation-only. No framework or numerical dependency is selected in this change.

Consequences: there is no runnable app or application test suite. Implementation resumes only on further user instruction.

## ADR-002 — Reference target

Status: accepted target; detailed behavior pending research, 2026-10-28.

Decision: use the pictured fx-991ES PLUS 2nd edition as the functional and key-interaction reference. Do not reduce scope to the initial prototype's subset. Use original code and assets; no vendor firmware is part of the design.

Consequences: complete manual inventory, capacities and numerical behavior must be verified. Current documentation is a planning baseline, not a certification of parity.

## ADR-003 — Web stack and full advanced scope

Status: accepted through user confirmation, 2026-10-28. Applies to PRD-01 through PRD-16 and TRD-01 through TRD-10.

Context: the user accepted the recommended web stack and explicitly confirmed that vectors and all advanced reference functions must be included, then requested all documents be updated.

Decision: browser-first React + TypeScript + Vite, CSS, a separate typed engine in Web Workers, Vitest and Playwright. PWA installation/offline support follows core validation. No backend/database is needed. Native packaging is deferred. MathLive is a conditional editor candidate; math.js and decimal.js are conditional numerical-adapter candidates, not guaranteed compatibility solutions.

Alternatives considered: a vanilla browser UI offers fewer abstractions but leaves complex mode/editor state integration more manual; native-first delivery adds platform-specific work before browser compatibility is established; a generic math evaluator alone cannot meet key/state/precision requirements. The agreed stack supports modular UI and independent numerical testing.

Consequences: all advanced modes remain mandatory. Library adoption requires evidence; exact limits, numerical policy and reference semantics remain unverified. This decision authorizes documentation alignment, not resuming implementation. No package installation, runtime validation or parity claim follows from choosing a stack. ADR-001's original no-stack-selected statement describes the earlier baseline and is superseded by this ADR.

## Proposed decisions awaiting evidence
- Numerical types, precision and transcendental implementation.
- MathLive adapter suitability and final editor/renderer integration.
- Worker execution/cancellation and resource budgets.
- Persistence policy, PWA caching/update design and deployment host.
- Project license and final branding.

For each future ADR record: status, date, requirement IDs, context, options, evidence, decision, consequences and validation. Do not mark proposals accepted without the appropriate decision.
