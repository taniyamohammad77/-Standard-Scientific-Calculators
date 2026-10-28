import { useEffect, useRef, useState } from 'react';
import { defaults, type Options, type Result } from './engine/calculate';
import { EngineConnection } from './worker/client';
export function ScientificPanel({ angle }: { angle: Options['angle'] }) {
  const [expression, setExpression] = useState('1/3 + 1/6');
  const [format, setFormat] = useState<Options['format']>('EXACT');
  const [digits, setDigits] = useState(10);
  const [result, setResult] = useState<Result | null>(null);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const connection = useRef<EngineConnection | null>(null);
  const revision = useRef(0);
  useEffect(() => {
    const worker = new EngineConnection(() => new Worker(new URL('./worker/engine.worker.ts', import.meta.url), { type: 'module' }));
    connection.current = worker;
    return () => { revision.current++; worker.dispose(); connection.current = null; };
  }, []);
  function invalidate() {
    revision.current++;
    connection.current?.cancel();
    setBusy(false); setResult(null); setError('');
  }
  useEffect(() => { invalidate(); }, [angle]);
  async function evaluate() {
    const request = ++revision.current;
    setBusy(true); setError(''); setResult(null);
    try {
      const value = await connection.current!.evaluate(expression, { ...defaults, angle, format, digits }, request);
      if (request === revision.current) setResult(value);
    } catch (e) { if (request === revision.current) setError(e instanceof Error ? e.message : 'Calculation failed.'); }
    finally { if (request === revision.current) setBusy(false); }
  }
  return <section className="scientific" aria-label="Scientific calculation">
    <form onSubmit={e => { e.preventDefault(); void evaluate(); }}>
      <label htmlFor="expression">Expression</label>
      <input id="expression" value={expression} maxLength={4096} spellCheck={false} autoComplete="off"
        onChange={e => { invalidate(); setExpression(e.target.value); }} />
      <div className="format-controls"><label>Result format<select aria-label="Result format" value={format} onChange={e => { invalidate(); setFormat(e.target.value as Options['format']); }}>
        {(['EXACT', 'NORM', 'FIX', 'SCI', 'ENG', 'DMS'] as const).map(f => <option key={f}>{f}</option>)}
      </select></label><label>Digits<select aria-label="Digits" value={digits} onChange={e => { invalidate(); setDigits(Number(e.target.value)); }}>{Array.from({ length: 10 }, (_, i) => i + 1).map(d => <option key={d}>{d}</option>)}</select></label>
      <button type="submit" disabled={busy}>Calculate</button>{busy && <button type="button" onClick={invalidate}>Cancel</button>}</div>
    </form>
    <output aria-label="Calculation result" aria-live="polite">{busy ? 'Calculating…' : result?.display ?? '—'}</output>
    {result && <p className="result-detail">{result.exact ? 'Exact value' : 'Approximate value'} · decimal: {result.decimal}</p>}
    {error && <p role="alert">{error}</p>}
    <details><summary>Expression guide</summary><p>Use parentheses, + − * / ^, ! and %. Examples: sqrt(8), sin(30), log(8,2), nCr(5,2), dms(12,30,0). Angles use the selected preference. Implicit multiplication has the same precedence as explicit multiplication: 6/2(1+2) = 9.</p><p>Other functions: cbrt, root(value,degree), abs, exp, ln, inverse/hyperbolic trigonometry, rnd, rand() and randint(min,max). EXACT keeps supported fractions, roots and π forms; other results are approximate. The reference keypad is coming in Phase 3.</p></details>
  </section>;
}
