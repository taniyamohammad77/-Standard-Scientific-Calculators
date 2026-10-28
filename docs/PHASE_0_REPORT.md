# Phase 0 — Research progress and blocker

Date: 2026-10-28. Status: **Blocked / incomplete**. Phase 1 is not started or approved.

## Scope and results

The target remains full fx-991ES PLUS 2nd edition compatibility. Reviewed the existing PRD, TRD, architecture, reference register and security rules. Updated execution policy to require the user's explicit approval after every completed phase. No application UI or engine was scaffolded.

## Candidate-library experiment

Reproducible research lives in [research/phase0](../research/phase0). Node v24.19.0, npm 11.9.0. Pinned decimal.js 10.6.0 (MIT), mathjs 15.2.0 (Apache-2.0), MathLive 0.111.1 (MIT), with registry integrity metadata in package-lock.json. Preserve applicable dependency license notices if later shipped. This research install does not approve all packages for production.

Commands from research/phase0:

```sh
npm ci --ignore-scripts
node --test numeric-spike.mjs
npm audit --omit=dev
```

Nine probes passed, zero failed/skipped: decimal addition; finite decimal versus exact rational distinction; a representative high-precision trigonometric identity; isolated precision configuration; matrix inverse; vector dot/cross products; complex multiplication; singular inverse rejection; mathjs BigNumber/fraction distinction. Advisory check reported zero known vulnerabilities at execution time, not an assurance of security. An initial run before installing dependencies failed module resolution; the clean lockfile install resolved it and all nine probes then executed successfully.

MathLive's installed type declarations expose insert, executeCommand, getValue and keyboard-policy APIs. This is API inspection only. Template/cursor/keyboard/browser/accessibility compatibility is **unrun**, not passed. No editor adoption decision is made.

## Numerical design recommendation, not reference validation

Use bounded BigInt rational values for exact fractions; isolated decimal contexts for approximate real arithmetic; explicit complex/matrix/vector tags and numeric adapters. Keep 40 significant digits as a research setting only, not a claim about device internal precision. Determine final working/display precision, rounding, domains, range and exact-output policy from the official manual and reference fixtures. Do not adopt the unrestricted mathjs expression evaluator. Representative library capabilities are promising but not sufficient for production selection.

## Reference access blocker

A TLS-verified request through the configured proxy to https://support.casio.com/ failed with CONNECT HTTP 403. The current enforced allowlist does not include that host. No bypass was attempted. No official manual was obtained, so there is no verified document URL, checksum or manual-derived function limit. REF-01–09 remain pending; existing image-derived labels remain evidence S1 only. Do not mark research or full parity complete.

Saved an environment configuration draft adding only support.casio.com to the custom domain list; existing package-manager presets were preserved. Saving did not activate the policy. The tool returned requires_publish=true. Review and save that domain addition in environment settings, then publish the environment. After it applies, retry official support access, identify the exact manual and request only any additional required official document host if needed.

## Remaining phase gate

1. Retrieve and identify the official matching manual; record source metadata and checksum.
2. Complete key/menu and limits inventory, numerical policy and reference fixtures (REF-01–09).
3. Run the browser editor spike and decide numerical/editor adapters with evidence.
4. Show the completed Phase 0 report and obtain explicit approval before Phase 1.

The application is not ready. No Phase 1 work or public deployment has occurred. Current independent numerical research is complete enough to review; the reference-dependent work cannot be honestly completed until access is available.
