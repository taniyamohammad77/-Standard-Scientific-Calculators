import { CalculationError, fail } from './errors';
import { parse, type Node } from './parser';
import { D, rational, literal, dec, approximate, symbolic, negate, add, multiply, divide, power, sqrt, integer, type Value } from './numeric';
export type Options = { angle: 'DEG' | 'RAD' | 'GRAD'; format: 'EXACT' | 'NORM' | 'FIX' | 'SCI' | 'ENG' | 'DMS'; digits: number };
export const defaults: Options = { angle: 'DEG', format: 'EXACT', digits: 10 };
export type Result = { display: string; decimal: string; exact: boolean };
export function validOptions(v: unknown): v is Options {
  if (!v || typeof v !== 'object' || Array.isArray(v)) return false;
  const o = v as Record<string, unknown>;
  return Object.keys(o).length === 3 && ['DEG', 'RAD', 'GRAD'].includes(o.angle as string)
    && ['EXACT', 'NORM', 'FIX', 'SCI', 'ENG', 'DMS'].includes(o.format as string)
    && Number.isInteger(o.digits) && Number(o.digits) >= (o.format === 'FIX' ? 0 : 1) && Number(o.digits) <= 10;
}
function frac(n: bigint, d: bigint): string { return d === 1n ? String(n) : `${n}/${d}`; }
function exactString(v: Value): string | undefined {
  if (v.kind === 'rational') return frac(v.n, v.d);
  if (v.kind === 'decimal') return undefined;
  const { n, d } = v.coefficient;
  const prefix = n === 1n ? '' : n === -1n ? '-' : String(n);
  return `${prefix}${v.symbol === 'pi' ? 'π' : `√(${v.radicand})`}${d === 1n ? '' : `/${d}`}`;
}
function format(v: Value, o: Options): Result {
  const x = dec(v), decimal = x.toSignificantDigits(40).toString();
  const exact = v.kind !== 'decimal';
  let display = x.toSignificantDigits(o.digits).toString();
  if (o.format === 'EXACT') display = exactString(v) ?? display;
  else if (o.format === 'FIX') display = x.toFixed(o.digits);
  else if (o.format === 'SCI') display = x.toExponential(o.digits - 1);
  else if (o.format === 'ENG') {
    const rounded = x.toSignificantDigits(o.digits);
    const exponent = rounded.isZero() ? 0 : Math.floor(rounded.e / 3) * 3;
    display = `${rounded.div(new D(10).pow(exponent)).toString()} × 10^${exponent}`;
  } else if (o.format === 'DMS') {
    const seconds = x.abs().mul(3600).toDecimalPlaces(6);
    const degrees = seconds.div(3600).floor();
    const minutes = seconds.minus(degrees.mul(3600)).div(60).floor();
    const remainder = seconds.minus(degrees.mul(3600)).minus(minutes.mul(60));
    display = `${x.lt(0) ? '-' : ''}${degrees}° ${minutes}′ ${remainder}″`;
  }
  if (display.length > 4096) fail('RESOURCE_LIMIT', 'Formatted result is too large.');
  return { display, decimal, exact };
}
export function calculate(expression: string, options: Options = defaults, random: () => number = Math.random): Result {
  if (typeof expression !== 'string') fail('SYNTAX', 'Expression must be text.');
  if (!validOptions(options)) fail('INVALID_OPTIONS', 'Invalid calculation settings.');
  const ast = parse(expression);
  const deadline = Date.now() + 4000;
  const pi = D.acos(-1);
  const angleFactor = options.angle === 'DEG' ? pi.div(180) : options.angle === 'GRAD' ? pi.div(200) : new D(1);
  function factorial(n: number): bigint { let value = 1n; for (let k = 2; k <= n; k++) value *= BigInt(k); return value; }
  function randomValue(): number { const n = random(); if (!Number.isFinite(n) || n < 0 || n >= 1) fail('DOMAIN', 'Random source must produce values in [0, 1).'); return n; }
  function evaluate(node: Node): Value {
    if (Date.now() > deadline) fail('RESOURCE_LIMIT', 'Calculation time budget exceeded.');
    if (node.type === 'number') return literal(node.text);
    if (node.type === 'constant') return node.name === 'pi' ? symbolic(rational(1n), 'pi') : approximate(new D(1).exp());
    if (node.type === 'unary') { const value = evaluate(node.operand); return node.op === '-' ? negate(value) : value; }
    if (node.type === 'binary') {
      const a = evaluate(node.left), b = evaluate(node.right);
      switch (node.op) {
        case '+': return add(a, b); case '-': return add(a, negate(b)); case '*': return multiply(a, b);
        case '/': return divide(a, b); case '^': return power(a, b);
      }
    }
    const args = node.args.map(evaluate), a = args[0], b = args[1];
    if (node.name === 'rand') return literal(randomValue().toString());
    if (node.name === 'randint') {
      const min = integer(a, -1_000_000_000, 1_000_000_000), max = integer(b, -1_000_000_000, 1_000_000_000);
      if (max < min) fail('DOMAIN', 'Random upper bound must be at least the lower bound.');
      return rational(BigInt(min + Math.floor(randomValue() * (max - min + 1))));
    }
    const x = dec(a);
    switch (node.name) {
      case 'sqrt': return sqrt(a);
      case 'abs': return x.lt(0) ? negate(a) : a;
      case 'percent': return divide(a, rational(100n));
      case 'fact': return rational(factorial(integer(a, 0, 1000)));
      case 'nPr': case 'nCr': {
        const n = integer(a, 0, 1000), k = integer(b, 0, 1000);
        if (k > n) fail('DOMAIN', 'Selection size exceeds population.');
        let v = 1n; for (let i = 0; i < k; i++) v *= BigInt(n - i);
        if (node.name === 'nCr') v /= factorial(k);
        return rational(v);
      }
      case 'cbrt': return approximate(x.cbrt());
      case 'root': {
        const degree = integer(b, 1, 1000);
        if (x.lt(0) && degree % 2 === 0) fail('DOMAIN', 'Even roots require nonnegative values.');
        if (degree === 2) return sqrt(a);
        return approximate(x.abs().pow(new D(1).div(degree)).mul(x.lt(0) ? -1 : 1));
      }
      case 'ln': case 'log': {
        if (x.lte(0)) fail('DOMAIN', 'Logarithm requires a positive argument.');
        const base = b ? dec(b) : new D(10);
        if (node.name === 'log' && (base.lte(0) || base.eq(1))) fail('DOMAIN', 'Logarithm base must be positive and different from one.');
        return approximate(node.name === 'ln' ? x.ln() : x.log(base));
      }
      case 'exp': { const value = x.exp(); if (value.isZero()) fail('OVERFLOW', 'Result is below the supported nonzero range.'); return approximate(value); }
      case 'sin': case 'cos': case 'tan': {
        // Exactly representable reference angles; no tolerance-based snapping.
        let turns: Value | undefined;
        if (options.angle !== 'RAD' && a.kind === 'rational') turns = divide(a, rational(options.angle === 'DEG' ? 180n : 200n));
        else if (options.angle === 'RAD' && a.kind === 'symbolic' && a.symbol === 'pi') turns = a.coefficient;
        else if (a.kind === 'rational' && a.n === 0n) turns = a;
        if (turns?.kind === 'rational') {
          const period = 2n * turns.d;
          const n = ((turns.n % period) + period) % period;
          const t = rational(n, turns.d);
          if (node.name === 'tan' && t.d === 2n) fail('DOMAIN', 'Tangent is undefined at this angle.');
          if (node.name === 'sin' && t.d === 1n) return rational(0n);
          if (node.name === 'cos' && t.d === 2n) return rational(0n);
          if (node.name === 'sin' && t.d === 2n) return rational(t.n === 1n ? 1n : -1n);
          if (node.name === 'cos' && t.d === 1n) return rational(t.n === 0n ? 1n : -1n);
          if (node.name === 'tan' && t.d === 1n) return rational(0n);
          if (node.name === 'sin' && t.d === 6n && [1n,5n,7n,11n].includes(t.n)) return rational(t.n < 6n ? 1n : -1n, 2n);
        }
        const radians = x.mul(angleFactor);
        return approximate(node.name === 'sin' ? radians.sin() : node.name === 'cos' ? radians.cos() : radians.tan());
      }
      case 'asin': case 'acos':
        if (x.abs().gt(1)) fail('DOMAIN', 'Inverse sine/cosine requires an argument between -1 and 1.');
        return approximate((node.name === 'asin' ? x.asin() : x.acos()).div(angleFactor));
      case 'atan': return approximate(x.atan().div(angleFactor));
      case 'sinh': return approximate(x.sinh()); case 'cosh': return approximate(x.cosh()); case 'tanh': return approximate(x.tanh());
      case 'asinh': return approximate(x.asinh());
      case 'acosh': if (x.lt(1)) fail('DOMAIN', 'acosh requires an argument of at least one.'); return approximate(x.acosh());
      case 'atanh': if (x.abs().gte(1)) fail('DOMAIN', 'atanh requires an argument strictly between -1 and 1.'); return approximate(x.atanh());
      case 'rnd': return approximate(options.format === 'FIX' ? x.toDecimalPlaces(options.digits) : x.toSignificantDigits(options.digits));
      case 'dms': {
        const minutes = dec(b), seconds = dec(args[2]);
        if (!x.isInteger() || !minutes.isInteger() || minutes.lt(0) || minutes.gte(60) || seconds.lt(0) || seconds.gte(60)) fail('DOMAIN', 'DMS requires integer degrees/minutes and minutes/seconds in [0, 60).');
        const value = add(add(x.lt(0) ? negate(a) : a, divide(b, rational(60n))), divide(args[2], rational(3600n)));
        return x.lt(0) ? negate(value) : value;
      }
      default: return fail('SYNTAX', 'Unsupported function.');
    }
  }
  try { return format(evaluate(ast), options); }
  catch (error) { if (error instanceof CalculationError) throw error; throw new CalculationError('DOMAIN', 'The expression cannot be evaluated in the real domain.'); }
}
