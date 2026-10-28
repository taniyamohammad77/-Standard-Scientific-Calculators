import { calculate, validOptions, type Options, type Result } from '../engine/calculate';
import { CalculationError } from '../engine/errors';
import { limits } from '../engine/types';
export const VERSION = 1;
type Envelope = { version: 1; id: number; revision: number };
export type Request = Envelope & ({ operation: 'health' } | { operation: 'calculate'; expression: string; options: Options });
export type Response = Envelope & ({ ok: true; status: 'ready' } | { ok: true; result: Result } | { ok: false; error: string; message?: string });
const record = (v: unknown): v is Record<string, unknown> => typeof v === 'object' && v !== null && !Array.isArray(v);
const integer = (v: unknown): v is number => typeof v === 'number' && Number.isSafeInteger(v) && v >= 0;
const envelope = (v: Record<string, unknown>) => v.version === 1 && integer(v.id) && integer(v.revision);
export function isRequest(v: unknown): v is Request {
  return record(v) && envelope(v) && ((Object.keys(v).length === 4 && v.operation === 'health') ||
    (Object.keys(v).length === 6 && v.operation === 'calculate' && typeof v.expression === 'string' && v.expression.length <= limits.characters && validOptions(v.options)));
}
export function isResponse(v: unknown): v is Response {
  if (!record(v) || !envelope(v)) return false;
  if (v.ok === true && v.status === 'ready') return Object.keys(v).length === 5;
  if (v.ok === true && record(v.result)) return Object.keys(v).length === 5 && Object.keys(v.result).length === 3
    && typeof v.result.display === 'string' && v.result.display.length <= 4096
    && typeof v.result.decimal === 'string' && v.result.decimal.length <= 4096
    && /^-?\d+(?:\.\d+)?(?:e[+-]?\d+)?$/.test(v.result.decimal) && typeof v.result.exact === 'boolean';
  return v.ok === false && ['INVALID_REQUEST', 'SYNTAX', 'DOMAIN', 'DIVISION_BY_ZERO', 'RESOURCE_LIMIT', 'OVERFLOW', 'INVALID_OPTIONS'].includes(v.error as string)
    && (Object.keys(v).length === 5 || (Object.keys(v).length === 6 && typeof v.message === 'string' && v.message.length <= 200));
}
export function handleRequest(v: unknown): Response {
  if (!isRequest(v)) return { version: 1, id: record(v) && integer(v.id) ? v.id : 0, revision: record(v) && integer(v.revision) ? v.revision : 0, ok: false, error: 'INVALID_REQUEST' };
  const base: Envelope = { version: 1, id: v.id, revision: v.revision };
  if (v.operation === 'health') return { ...base, ok: true, status: 'ready' };
  try { return { ...base, ok: true, result: calculate(v.expression, v.options) }; }
  catch (e) { return { ...base, ok: false, error: e instanceof CalculationError ? e.code : 'DOMAIN', message: e instanceof CalculationError ? e.message : 'Calculation failed.' }; }
}
