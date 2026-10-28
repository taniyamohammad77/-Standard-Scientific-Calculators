# Engineering Scientific Calculator

Planning baseline for an independent calculator targeting the functionality and interaction model of the **Casio fx-991ES PLUS, 2nd edition** shown in the user's reference image.

**Status:** requirements and architecture only. Implementation is paused. This repository currently contains no runnable calculator, dependency manifest, or passing application tests. The earlier prototype has been removed from this checkout and preserved outside it for recovery.

## Agreed stack and scope

React + TypeScript + Vite with CSS; an independent typed numerical engine running in Web Workers; Vitest for engine/state tests and Playwright for browser journeys. Browser-first delivery supports desktop and mobile. PWA offline installation follows core validation. No backend or database is required.

MathLive is a candidate for a structured-editor adapter, subject to key/cursor/template compatibility. math.js and decimal.js are candidates for bounded numerical adapters, not selected universal evaluators. Their roles require precision, security, license and reference-fixture validation.

Full scope includes matrices, vectors, complex numbers, simultaneous and quadratic/cubic equations, numerical SOLVE, integration, differentiation, summation, statistics/regression, BASE-N, TABLE, constants/conversions and all verified standard functions and SHIFT/ALPHA workflows. Advanced modes are required release scope; exact reference limits remain research items.

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
