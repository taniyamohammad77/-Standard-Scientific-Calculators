import { CalculationError } from './errors';
import { limits } from './types';
export type Node = { type: 'number'; text: string } | { type: 'constant'; name: 'pi' | 'e' }
  | { type: 'unary'; op: '+' | '-'; operand: Node }
  | { type: 'binary'; op: '+' | '-' | '*' | '/' | '^'; left: Node; right: Node }
  | { type: 'call'; name: string; args: Node[] };
export const functions: Record<string, readonly [number, number]> = {
  sqrt: [1, 1], cbrt: [1, 1], root: [2, 2], abs: [1, 1], exp: [1, 1], ln: [1, 1], log: [1, 2],
  sin: [1, 1], cos: [1, 1], tan: [1, 1], asin: [1, 1], acos: [1, 1], atan: [1, 1],
  sinh: [1, 1], cosh: [1, 1], tanh: [1, 1], asinh: [1, 1], acosh: [1, 1], atanh: [1, 1],
  fact: [1, 1], percent: [1, 1], nPr: [2, 2], nCr: [2, 2], rnd: [1, 1],
  rand: [0, 0], randint: [2, 2], dms: [3, 3],
};
type Token = { text: string; position: number };
export function parse(input: string): Node {
  if (input.length > limits.characters) throw new CalculationError('RESOURCE_LIMIT', 'Expression is too long.');
  const source = input.replaceAll('π', 'pi').replaceAll('×', '*').replaceAll('÷', '/').replaceAll('−', '-');
  const tokens: Token[] = [];
  const pattern = /\s+|(?:\d+(?:\.\d*)?|\.\d+)(?:[eE][+-]?\d+)?|[A-Za-z]+|[+\-*/^!%(),]/gy;
  let offset = 0;
  while (offset < source.length) {
    pattern.lastIndex = offset;
    const match = pattern.exec(source);
    if (!match) throw new CalculationError('SYNTAX', 'Unsupported character.', offset);
    if (!/^\s/.test(match[0])) tokens.push({ text: match[0], position: offset });
    offset = pattern.lastIndex;
  }
  let cursor = 0, nodes = 0, depth = 0;
  const peek = () => tokens[cursor]?.text;
  const syntax = (message: string): never => { throw new CalculationError('SYNTAX', message, tokens[cursor]?.position ?? source.length); };
  function node(value: Node): Node {
    if (++nodes > limits.nodes) throw new CalculationError('RESOURCE_LIMIT', 'Too many expression nodes.');
    return value;
  }
  function nested(fn: () => Node): Node {
    if (++depth > limits.depth) throw new CalculationError('RESOURCE_LIMIT', 'Expression nesting is too deep.');
    try { return fn(); } finally { depth--; }
  }
  function atom(): Node {
    const t = peek();
    let value: Node;
    if (t === '(') { cursor++; value = nested(sum); if (peek() !== ')') syntax('Expected closing parenthesis.'); cursor++; }
    else if (t && /^(\d|\.)/.test(t)) { cursor++; value = node({ type: 'number', text: t }); }
    else if (t === 'pi' || t === 'e') { cursor++; value = node({ type: 'constant', name: t }); }
    else if (t && Object.hasOwn(functions, t)) {
      cursor++; if (peek() !== '(') syntax('Functions require parentheses.'); cursor++;
      const args: Node[] = [];
      if (peek() !== ')') { args.push(nested(sum)); while (peek() === ',') { cursor++; args.push(nested(sum)); if (args.length > 3) syntax('Too many function arguments.'); } }
      if (peek() !== ')') syntax('Expected closing parenthesis.'); cursor++;
      const [min, max] = functions[t];
      if (args.length < min || args.length > max) syntax(`Invalid argument count for ${t}.`);
      value = node({ type: 'call', name: t, args });
    } else return syntax('Expected a number, constant or supported function.');
    while (peek() === '!' || peek() === '%') {
      const op = peek(); cursor++;
      value = node({ type: 'call', name: op === '!' ? 'fact' : 'percent', args: [value] });
    }
    return value;
  }
  function power(): Node {
    const left = atom();
    if (peek() === '^') { cursor++; return node({ type: 'binary', op: '^', left, right: nested(unary) }); }
    return left;
  }
  function unary(): Node {
    if (peek() === '+' || peek() === '-') { const op = peek() as '+' | '-'; cursor++; return node({ type: 'unary', op, operand: nested(unary) }); }
    return power();
  }
  function product(): Node {
    let left = unary();
    while (true) {
      const t = peek();
      if (t === '*' || t === '/') { cursor++; left = node({ type: 'binary', op: t, left, right: unary() }); }
      else if (t === '(' || (t && /^[A-Za-z]/.test(t))) left = node({ type: 'binary', op: '*', left, right: unary() });
      else break;
    }
    return left;
  }
  function sum(): Node {
    let left = product();
    while (peek() === '+' || peek() === '-') { const op = peek() as '+' | '-'; cursor++; left = node({ type: 'binary', op, left, right: product() }); }
    return left;
  }
  if (!tokens.length) syntax('Enter an expression.');
  const result = sum();
  if (cursor !== tokens.length) syntax('Unexpected input.');
  // Also bounds left-deep iterative operator chains before recursive evaluation.
  const queue: [Node, number][] = [[result, 1]];
  while (queue.length) {
    const [n, d] = queue.pop()!;
    if (d > limits.depth) throw new CalculationError('RESOURCE_LIMIT', 'Expression nesting is too deep.');
    if (n.type === 'binary') queue.push([n.left, d + 1], [n.right, d + 1]);
    else if (n.type === 'unary') queue.push([n.operand, d + 1]);
    else if (n.type === 'call') for (const a of n.args) queue.push([a, d + 1]);
  }
  return result;
}
