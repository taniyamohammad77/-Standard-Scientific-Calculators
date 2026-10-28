# Engineering Scientific Calculator

Planning baseline for an independent calculator targeting the functionality and interaction model of the **Casio fx-991ES PLUS, 2nd edition** shown in the user's reference image.

**Status:** Phase 2 scientific engine complete and awaiting review. Arithmetic/scientific expressions now evaluate in the worker with exact fractions and supported root/pi forms, angle preferences, formatting and typed errors. The current input form is temporary; the photo-matched keypad and MODE/SETUP interface require Phase 3 approval. Advanced modes remain pending.

## Agreed stack and scope

React + TypeScript + Vite with CSS; an independent typed numerical engine running in Web Workers; Vitest for engine/state tests and Playwright for browser journeys. Browser-first delivery supports desktop and mobile. PWA offline installation follows core validation. No backend or database is required.

MathLive is a candidate for a structured-editor adapter, subject to key/cursor/template compatibility. math.js and decimal.js are candidates for bounded numerical adapters, not selected universal evaluators. Their roles require precision, security, license and reference-fixture validation.

Full scope includes matrices, vectors, complex numbers, simultaneous and quadratic/cubic equations, numerical SOLVE, integration, differentiation, summation, statistics/regression, BASE-N, TABLE, constants/conversions and all verified standard functions and SHIFT/ALPHA workflows. Advanced modes are required release scope; exact reference limits remain research items.

## Delivery approach

Development follows the [phase-by-phase implementation plan](docs/IMPLEMENTATION_PLAN.md), from reference verification through foundations, standard functions, advanced modes, hardening and offline release. Every phase has deliverables, requirement mappings and completion evidence. Phase 0 research is recorded in [the Phase 0 report](docs/PHASE_0_REPORT.md). Each later phase requires explicit user approval.

## Read in this order

1. [Product requirements](docs/PRD.md)
2. [Reference and function inventory](docs/REFERENCE.md)
3. [Technical requirements](docs/TRD.md)
4. [Architecture](docs/ARCHITECTURE.md)
5. [Validation strategy](docs/VALIDATION.md)
6. [Development rules](AGENTS.md) and [contribution workflow](CONTRIBUTING.md)
7. [Security policy](SECURITY.md)
8. [Update notes](docs/UPDATE_NOTES.md) and [decision log](docs/DECISIONS.md)

The goal is complete functional parity, not a basic arithmetic substitute. Parity has not been established. Official documentation and device comparison must resolve the open items in the reference inventory before compatibility claims are made. Independent branding and original implementation are required; no vendor firmware or artwork is included.

## Additional reference evidence

The [user-supplied specification](docs/PRODUCT_SPECIFICATION.md) adds display, memory, replay and multi-statement requirements. Phase 0 now includes nine numerical and seven editor smoke probes; official manual verification remains blocked. See the phase report for limitations.

Current review package: [Phase 0 design](docs/PHASE_0_DESIGN.md). Official-manual verification is deferred at user direction; full parity is not claimed.

## Run and validate

Use Node 24.19.0 (`.nvmrc`), then `npm ci` and `npm run dev`. Run `npm run build` for production and `npm test` for unit tests. Install browser tooling with `npx playwright install chromium`, then run `npm run test:e2e`. In this cloud environment, use `CHROMIUM_PATH=/usr/bin/chromium npm run test:e2e` to use installed Chromium. `npm run check` combines build/typecheck, unit tests and browser tests.

[Phase 1 report](docs/PHASE_1_REPORT.md) includes evidence, screenshots and limitations. No public deployment is configured.

## Scientific engine review

See [Phase 2 report](docs/PHASE_2_REPORT.md) for supported syntax, project limits, screenshots and actual validation. Enter `1/3+1/6`, `sqrt(8)`, `sin(30)` or `log(8,2)` in Scientific mode. No exact-device-compatibility claim is made.

## VS Code

Open this repository folder, then choose **Terminal → Run Task → Start calculator**. See [VS Code instructions](docs/VSCODE.md) for prerequisites and troubleshooting.
