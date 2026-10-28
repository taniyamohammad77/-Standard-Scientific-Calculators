# Security policy and threat model

## Status and reporting

There is no deployed application or supported release yet. The planned product is a local-first browser calculator. No security audit has occurred. Do not use this calculator as the sole authority for safety-critical engineering decisions.

For vulnerability reporting, use the repository's private GitHub security reporting feature if enabled. If unavailable, ask the maintainer to establish a private channel without publishing exploit details or secrets. A dedicated reporting contact and response commitments must be established before release; none are invented here.

## Assets and trust boundaries

Protect expression integrity, calculation state, locally retained history, user interaction, dependency integrity and published artifacts. Treat typed or pasted expressions, imported state, stored browser data, URLs, worker messages and third-party packages as untrusted. The UI-to-worker protocol and text-to-AST parser are explicit validation boundaries. Browser storage is readable by same-origin code and is not a secret store.

## Required controls

| Threat | Required control | Verification |
|---|---|---|
| Code execution through expressions | Dedicated grammar and typed evaluator; no eval or dynamic code execution | Malicious-input tests and source review |
| XSS through input/history/import | Text rendering; sanitize any necessary third-party rendering; no raw HTML insertion | Browser injection tests |
| Excessive CPU/memory | Length, token, depth, integer, iteration and dataset limits; worker deadline and cancellation | Adversarial load and cancellation tests |
| Stale or forged worker output | Schema-validated messages, request IDs, state revisions; reject stale results | Concurrency and malformed-message tests |
| Supply-chain compromise | Minimal dependencies, lockfile, trusted registries, TLS verification, license and advisory review | CI checks and recorded dependency decisions |
| User-data leakage | No analytics or outbound calculation requests by default; no secrets in logs; persistence opt-in | Network inspection and storage tests |
| Cache poisoning or stale assets | Versioned same-origin assets; scoped service worker only if adopted; explicit update lifecycle | Offline/update tests |
| Numerical misinformation | Typed errors, no silent overflow/truncation, proven bounds and reference comparisons | Numerical and edge-case suites |

Before public hosting, configure a restrictive Content Security Policy, HTTPS, appropriate MIME types, X-Content-Type-Options, Referrer-Policy and clickjacking protection. Prefer local assets and avoid inline executable code. Final headers depend on the selected host and must be tested there.

Optional history persistence must have clear/delete controls, versioned schemas, bounded size and validation on load. Do not persist by default until the privacy behavior is decided. No authentication, backend, payment processing or remote synchronization is currently required. Adding them requires a new threat review.

## Stack-specific review requirements

React text escaping is useful but does not validate mathematical markup. Avoid dangerouslySetInnerHTML; any MathLive adapter must restrict unsupported commands, external resource loading and unsafe markup paths and must pass injection tests before adoption. Bundle approved fonts/assets locally.

If math.js is adopted, expose only selected typed operations behind adapters. Do not expose unrestricted evaluate/import/createUnit or library expression execution to user input. decimal.js precision settings must be scoped and deterministic rather than mutable shared defaults across requests.

Vite development services are development-only; never publish a development server as the production application. Audit production dependencies and worker bundles. PWA caching must exclude secrets, external executable resources and unvalidated state. Test security headers against the actual worker and rendering requirements rather than weakening policies globally to resolve integration errors.

Include adversarial matrix/vector dimensions, oversized regression datasets, huge integer/base conversions and nonconvergent calculus/solve requests in resource-exhaustion tests. Full advanced functionality does not justify unbounded computation.
