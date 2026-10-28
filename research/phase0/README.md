# Phase 0 candidate-library probes

Research only; this is not the application scaffold or device parity suite. See [the report](../../docs/PHASE_0_REPORT.md).

Run `npm ci --ignore-scripts`, then `node --test numeric-spike.mjs` from this directory. Run `npm audit --omit=dev` to query current advisories. All dependency versions are pinned; no lifecycle scripts are required. MathLive is installed for API investigation but has not passed a browser editor compatibility test. Do not infer production approval from this research package.

## Browser probe

Serve this folder on loopback with `python3 -m http.server 8010 --bind 127.0.0.1`, then open editor-spike.html in Chromium. The page writes JSON results into the results element and sends the same JSON to /probe-result for optional automation; a plain static server may return 404 to that optional result request without affecting the displayed checks. Captured seven-check output is editor-results.json. This is a narrow API smoke probe, not device editing/accessibility certification.
