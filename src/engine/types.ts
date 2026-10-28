// Shared resource budgets and serialized value contracts. Parser AST is the engine expression contract.
export type Real = {kind:'rational';numerator:string;denominator:string}|{kind:'real';decimal:string;precision:number};
export type NumericValue = Real | {kind:'complex';real:Real;imaginary:Real}|{kind:'matrix';rows:number;columns:number;entries:Real[]}|{kind:'vector';entries:Real[]};
export type Expression = import('./parser').Node;
export const limits={characters:4096,nodes:2048,depth:64,statements:32,integerBits:16384,timeoutMs:5000} as const;
