// Contracts only. Numerical evaluation is implemented in later approved phases.
export type Real = {kind:'rational';numerator:string;denominator:string}|{kind:'real';decimal:string;precision:number};
export type NumericValue = Real | {kind:'complex';real:Real;imaginary:Real}|{kind:'matrix';rows:number;columns:number;entries:Real[]}|{kind:'vector';entries:Real[]};
export type Expression = {kind:'literal';value:string}|{kind:'constant';name:'pi'|'e'}|{kind:'variable';name:string}|{kind:'unary';operator:'negate';operand:Expression}|{kind:'binary';operator:'add'|'subtract'|'multiply'|'divide'|'power';left:Expression;right:Expression}|{kind:'call';name:string;arguments:Expression[]}|{kind:'sequence';statements:Expression[]};
export const limits={characters:4096,nodes:2048,depth:64,statements:32,integerBits:16384,timeoutMs:5000} as const;
