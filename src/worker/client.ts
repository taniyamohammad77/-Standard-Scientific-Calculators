import {isResponse,type Request} from './protocol';
import {limits} from '../engine/types';
export interface Port {onmessage:((event:MessageEvent<unknown>)=>void)|null;onerror:((event:ErrorEvent)=>void)|null;postMessage(message:Request):void;terminate():void}
export class EngineConnection {
 private port:Port; private id=0; private disposed=false;
 private pending?:{id:number;revision:number;resolve:()=>void;reject:(e:Error)=>void;timer:ReturnType<typeof setTimeout>};
 constructor(private factory:()=>Port){this.port=this.create()}
 private create(){const port=this.factory();port.onmessage=e=>{if(!isResponse(e.data)){this.fail('Invalid worker response');return}const p=this.pending;if(!p||e.data.id!==p.id||e.data.revision!==p.revision)return;if(!e.data.ok){this.fail(e.data.error);return}clearTimeout(p.timer);this.pending=undefined;p.resolve()};port.onerror=()=>this.fail('Worker failed');return port}
 private fail(reason:string){const p=this.pending;this.pending=undefined;if(p){clearTimeout(p.timer);p.reject(new Error(reason))}this.port.terminate();if(!this.disposed)this.port=this.create()}
 check(revision:number){if(this.disposed)return Promise.reject(new Error('Connection closed'));if(!Number.isSafeInteger(revision)||revision<0)return Promise.reject(new Error('Invalid revision'));if(this.pending)this.fail('Superseded');return new Promise<void>((resolve,reject)=>{const id=++this.id;const timer=setTimeout(()=>this.fail('Worker timed out'),limits.timeoutMs);this.pending={id,revision,resolve,reject,timer};try{this.port.postMessage({version:1,id,revision,operation:'health'})}catch{this.fail('Worker unavailable')}})}
 cancel(){if(!this.disposed)this.fail('Cancelled')}
 dispose(){this.disposed=true;this.fail('Connection closed')}
}
