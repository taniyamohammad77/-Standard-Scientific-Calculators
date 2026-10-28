import Decimal from 'decimal.js';
import { fail } from './errors';
import { limits } from './types';
export const D = Decimal.clone({ precision: 40, rounding: Decimal.ROUND_HALF_UP, maxE: 9999, minE: -9999 });
export type Rational = { kind: 'rational'; n: bigint; d: bigint };
export type Value = Rational | { kind: 'decimal'; value: Decimal }
  | { kind: 'symbolic'; coefficient: Rational; symbol: 'pi' | 'sqrt'; radicand: bigint };
function bound(n: bigint) { if (n.toString(2).length > limits.integerBits) fail('RESOURCE_LIMIT', 'Exact integer size limit exceeded.'); }
export function rational(n: bigint, d = 1n): Rational {
  if (d === 0n) fail('DIVISION_BY_ZERO', 'Cannot divide by zero.');
  bound(n); bound(d);
  if (d < 0n) { n = -n; d = -d; }
  let a = n < 0n ? -n : n, b = d;
  while (b) { const t = a % b; a = b; b = t; }
  return { kind: 'rational', n: n / a, d: d / a };
}
export function literal(text: string): Rational {
  const [mantissa, exponent = '0'] = text.toLowerCase().split('e');
  const scale = Number(exponent) - (mantissa.split('.')[1]?.length ?? 0);
  if (!Number.isSafeInteger(scale) || Math.abs(scale) > 1000) fail('RESOURCE_LIMIT', 'Literal exponent is limited to ±1000.');
  const n = BigInt(mantissa.replace('.', ''));
  return scale >= 0 ? rational(n * 10n ** BigInt(scale)) : rational(n, 10n ** BigInt(-scale));
}
export function dec(v: Value): Decimal {
  if (v.kind === 'decimal') return v.value;
  if (v.kind === 'rational') return new D(v.n.toString()).div(v.d.toString());
  return dec(v.coefficient).mul(v.symbol === 'pi' ? D.acos(-1) : new D(v.radicand.toString()).sqrt());
}
export function approximate(value: Decimal): Value {
  if (!value.isFinite()) fail('OVERFLOW', 'Result exceeds the supported real range.');
  return { kind: 'decimal', value };
}
export function symbolic(coefficient: Rational, symbol: 'pi' | 'sqrt', radicand = 1n): Value {
  if (coefficient.n === 0n) return rational(0n);
  if (symbol === 'sqrt' && radicand === 1n) return coefficient;
  return { kind: 'symbolic', coefficient, symbol, radicand };
}
export function negate(a: Value): Value {
  if (a.kind === 'rational') return rational(-a.n, a.d);
  if (a.kind === 'symbolic') return symbolic(rational(-a.coefficient.n, a.coefficient.d), a.symbol, a.radicand);
  return approximate(a.value.neg());
}
export function add(a: Value, b: Value): Value {
  if (a.kind === 'rational' && b.kind === 'rational') return rational(a.n * b.d + b.n * a.d, a.d * b.d);
  if (a.kind === 'symbolic' && b.kind === 'symbolic' && a.symbol === b.symbol && a.radicand === b.radicand)
    return symbolic(add(a.coefficient, b.coefficient) as Rational, a.symbol, a.radicand);
  return approximate(dec(a).plus(dec(b)));
}
export function multiply(a: Value, b: Value): Value {
  if (a.kind === 'rational' && b.kind === 'rational') return rational(a.n * b.n, a.d * b.d);
  if (a.kind === 'symbolic' && b.kind === 'rational') return symbolic(multiply(a.coefficient, b) as Rational, a.symbol, a.radicand);
  if (a.kind === 'rational' && b.kind === 'symbolic') return multiply(b, a);
  if (a.kind === 'symbolic' && b.kind === 'symbolic' && a.symbol === 'sqrt' && b.symbol === 'sqrt' && a.radicand === b.radicand)
    return multiply(multiply(a.coefficient, b.coefficient), rational(a.radicand));
  return approximate(dec(a).mul(dec(b)));
}
export function divide(a: Value, b: Value): Value {
  if (dec(b).isZero()) fail('DIVISION_BY_ZERO', 'Cannot divide by zero.');
  if (b.kind === 'rational') return multiply(a, rational(b.d, b.n));
  if (a.kind === 'symbolic' && b.kind === 'symbolic' && a.symbol === b.symbol && a.radicand === b.radicand) return divide(a.coefficient, b.coefficient);
  return approximate(dec(a).div(dec(b)));
}
export function integer(v: Value, min: number, max: number): number {
  const d = dec(v);
  if (!d.isInteger() || d.lt(min) || d.gt(max)) fail('DOMAIN', `Expected an integer from ${min} to ${max}.`);
  return d.toNumber();
}
export function power(a: Value, b: Value): Value {
  const x = dec(a), y = dec(b);
  if (x.isZero() && y.lte(0)) fail('DOMAIN', 'Zero requires a positive exponent.');
  if (x.isNegative() && !y.isInteger()) fail('DOMAIN', 'Use root() for real roots of negative numbers.');
  if (a.kind === 'rational' && b.kind === 'rational' && b.d === 1n) {
    const n = integer(b, -1000, 1000);
    const growth = Math.max(a.n.toString(2).length, a.d.toString(2).length) * Math.abs(n);
    if (growth > limits.integerBits) fail('RESOURCE_LIMIT', 'Power exceeds exact integer budget.');
    const p = BigInt(Math.abs(n));
    return n >= 0 ? rational(a.n ** p, a.d ** p) : rational(a.d ** p, a.n ** p);
  }
  const result = x.pow(y);
  if (!x.isZero() && result.isZero()) fail('OVERFLOW', 'Result is below the supported nonzero range.');
  return approximate(result);
}
function squareRoot(n: bigint): bigint {
  if (n < 2n) return n;
  let x = 1n << BigInt(Math.ceil(n.toString(2).length / 2));
  while (true) { const y = (x + n / x) / 2n; if (y >= x) return x; x = y; }
}
export function sqrt(v: Value): Value {
  if (dec(v).lt(0)) fail('DOMAIN', 'Square root requires a nonnegative real number.');
  if (v.kind === 'rational') {
    const n = squareRoot(v.n), d = squareRoot(v.d);
    if (n * n === v.n && d * d === v.d) return rational(n, d);
    // Bounded factor extraction, with an exact unsimplified radical if needed.
    let radicand = v.n * v.d, coefficient = 1n;
    for (let f = 2n; f <= 1000n && f * f <= radicand; f++) while (radicand % (f * f) === 0n) { radicand /= f * f; coefficient *= f; }
    return symbolic(rational(coefficient, v.d), 'sqrt', radicand);
  }
  return approximate(dec(v).sqrt());
}
