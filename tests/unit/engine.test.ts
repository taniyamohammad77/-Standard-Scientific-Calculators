import { describe, it, expect } from 'vitest';
import { calculate, defaults } from '../../src/engine/calculate';
import { CalculationError } from '../../src/engine/errors';
import { parse } from '../../src/engine/parser';
import { handleRequest } from '../../src/worker/protocol';
const c = (s: string) => calculate(s).display;
describe('exact arithmetic and precedence', () => {
  it.each([['2+3*4','14'],['(2+3)*4','20'],['2^3^2','512'],['-2^2','-4'],['(-2)^2','4'],['2^-3','1/8'],['.1+.2','3/10'],['1/3+1/6','1/2'],['2(3+4)','14'],['1E-3','1/1000'],['5!','120'],['200*10%','20'],['sqrt(16/9)','4/3'],['sqrt(8)','2√(2)'],['sqrt(2)*sqrt(2)','2'],['2pi/4','π/2'],['pi/pi','1'],['sqrt(2)+sqrt(2)','2√(2)'],['nPr(5,2)','20'],['nCr(5,2)','10'],['dms(12,30,0)','25/2'],['sin(30)','1/2'],['sin(180)','0'],['cos(90)','0'],['tan(180)','0']])('%s = %s', (s, expected) => expect(c(s)).toBe(expected));
  it('keeps a rational sum exact across large magnitudes',()=>expect(c('100000000000000000000+1-100000000000000000000')).toBe('1'));
  it('checks rational inverse identities across signed operands',()=>{for(let i=-10;i<=10;i++)if(i)expect(c(`(${i}/7)*(7/${i})`)).toBe('1')});
});
describe('scientific functions', () => {
  it.each([['ln(e)',1],['log(8,2)',3],['log(100)',2],['exp(1)',Math.E],['cbrt(-8)',-2],['root(-32,5)',-2],['asin(1)',90],['acos(-1)',180],['atan(1)',45],['sinh(0)',0],['cosh(0)',1],['tanh(0)',0],['asinh(0)',0],['acosh(1)',0],['atanh(0)',0],['abs(-4)',4]])('%s', (s, expected) => expect(Number(calculate(s).decimal)).toBeCloseTo(expected, 12));
  it('honors radians and gradians',()=>{expect(calculate('cos(pi)',{...defaults,angle:'RAD'}).display).toBe('-1');expect(calculate('sin(100)',{...defaults,angle:'GRAD'}).display).toBe('1')});
  it('does not round nearby trig arguments to exact zeros',()=>expect(calculate('sin(180.00000001)').decimal).not.toBe('0'));
});
describe('format policies and random bounds',()=>{
  it('formats FIX, SCI and engineering with carry',()=>{expect(calculate('1/3',{...defaults,format:'FIX',digits:3}).display).toBe('0.333');expect(calculate('12345',{...defaults,format:'SCI',digits:4}).display).toBe('1.235e+4');expect(calculate('999999',{...defaults,format:'ENG',digits:3}).display).toBe('1 × 10^6')});
  it('formats DMS and round-trip input',()=>expect(calculate('dms(-12,30,15)',{...defaults,format:'DMS'}).display).toBe('-12° 30′ 15″'));
  it('supports explicit rounding',()=>expect(calculate('rnd(1/3)',{...defaults,format:'FIX',digits:2}).decimal).toBe('0.33'));
  it('supports deterministic injected random sources',()=>{expect(calculate('rand()',defaults,()=>0).decimal).toBe('0');expect(calculate('randint(-2,2)',defaults,()=>.999).display).toBe('2');expect(calculate('randint(-2,2)',defaults,()=>0).display).toBe('-2')});
  it('rejects invalid random generators',()=>expect(()=>calculate('rand()',defaults,()=>1)).toThrow(CalculationError));
});
describe('domains and resource safety',()=>{
  it.each(['1/0','sqrt(-1)','ln(0)','log(2,1)','asin(2)','acosh(0)','atanh(1)','(-1)!','2.5!','tan(90)','root(-8,2)','nCr(2,3)','0^0','0^-1','dms(1,60,0)','randint(5,2)','1001!','2^1001','1e1001','exp(-1000000)','exp(1000000)'])('rejects %s',s=>expect(()=>calculate(s)).toThrow(CalculationError));
  it.each(['','2 3','1+','sin(1','2+alert(1)','constructor(1)','pi.constructor','[1,2]','1;2','<script>','2**3','sin()'])('rejects unsafe or malformed %s',s=>expect(()=>parse(s)).toThrow(CalculationError));
  it('bounds deep expressions and long expressions',()=>{expect(()=>parse('('.repeat(70)+'1'+')'.repeat(70))).toThrow();expect(()=>parse('1+'.repeat(2100)+'1')).toThrow();expect(()=>parse('1+'.repeat(70)+'1')).toThrow()});
  it('rejects invalid formatting settings',()=>expect(()=>calculate('1',{...defaults,digits:100})).toThrow(CalculationError));
  it('serializes calculation failures without crashing the worker',()=>{const req={version:1 as const,id:1,revision:0,operation:'calculate',expression:'1/0',options:defaults};expect(handleRequest(req)).toMatchObject({ok:false,error:'DIVISION_BY_ZERO'});expect(handleRequest({...req,id:2,expression:'1/2'})).toMatchObject({ok:true,result:{display:'1/2'}})});
});
