export const VERSION=1;
export type Request={version:1;id:number;revision:number;operation:'health'};
export type Response={version:1;id:number;revision:number;ok:true;status:'ready'}|{version:1;id:number;revision:number;ok:false;error:'INVALID_REQUEST'};
const record=(v:unknown):v is Record<string,unknown>=>typeof v==='object'&&v!==null&&!Array.isArray(v);
const integer=(v:unknown):v is number=>typeof v==='number'&&Number.isSafeInteger(v)&&v>=0;
export function isRequest(v:unknown):v is Request{return record(v)&&Object.keys(v).length===4&&v.version===1&&integer(v.id)&&integer(v.revision)&&v.operation==='health'}
export function isResponse(v:unknown):v is Response{return record(v)&&Object.keys(v).length===5&&v.version===1&&integer(v.id)&&integer(v.revision)&&((v.ok===true&&v.status==='ready')||(v.ok===false&&v.error==='INVALID_REQUEST'))}
export function handleRequest(v:unknown):Response{if(isRequest(v))return {version:1,id:v.id,revision:v.revision,ok:true,status:'ready'};return {version:1,id:record(v)&&integer(v.id)?v.id:0,revision:record(v)&&integer(v.revision)?v.revision:0,ok:false,error:'INVALID_REQUEST'}}
