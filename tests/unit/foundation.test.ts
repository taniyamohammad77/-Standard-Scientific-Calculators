import {describe,it,expect,vi,afterEach} from 'vitest';
import {handleRequest,isRequest,isResponse,type Request} from '../../src/worker/protocol';
import {EngineConnection,type Port} from '../../src/worker/client';
import {reducer,initialState} from '../../src/state/calculator';
class FakePort implements Port{onmessage:Port['onmessage']=null;onerror:Port['onerror']=null;sent:Request[]=[];terminated=false;postMessage(m:Request){this.sent.push(m)}terminate(){this.terminated=true}reply(value:unknown){this.onmessage?.({data:value} as MessageEvent)}}
function setup(){const ports:FakePort[]=[];const client=new EngineConnection(()=>{const p=new FakePort();ports.push(p);return p});return {client,ports}}
afterEach(()=>vi.useRealTimers());
describe('protocol boundary',()=>{
 it('round trips a validated health request',()=>{const r={version:1,id:12,revision:7,operation:'health'};expect(isRequest(r)).toBe(true);expect(handleRequest(r)).toEqual({version:1,id:12,revision:7,ok:true,status:'ready'})});
 it.each([null,[],{}, {version:2,id:1,revision:0,operation:'health'},{version:1,id:-1,revision:0,operation:'health'},{version:1,id:1,revision:0,operation:'evaluate'}, {version:1,id:1,revision:0,operation:'health',code:'alert(1)'}])('rejects malformed input %j',v=>{expect(isRequest(v)).toBe(false);expect(handleRequest(v).ok).toBe(false)});
 it('rejects malformed responses',()=>{expect(isResponse({version:1,id:1,revision:0,ok:true,status:'not-ready'})).toBe(false)})
});
describe('worker lifecycle',()=>{
 it('accepts only matching IDs and revisions',async()=>{const {client,ports}=setup();const promise=client.check(4);let resolved=false;void promise.then(()=>resolved=true);const req=ports[0].sent[0];ports[0].reply({...handleRequest(req),id:99});ports[0].reply({...handleRequest(req),revision:3});await Promise.resolve();expect(resolved).toBe(false);ports[0].reply(handleRequest(req));await promise;client.dispose()});
 it('replaces crashed worker and recovers',async()=>{const {client,ports}=setup();const p=client.check(0);const failure=expect(p).rejects.toThrow('Worker failed');ports[0].onerror?.({} as ErrorEvent);await failure;expect(ports[0].terminated).toBe(true);const q=client.check(1);ports[1].reply(handleRequest(ports[1].sent[0]));await q;client.dispose()});
 it('rejects malformed worker messages and recovers',async()=>{const {client,ports}=setup();const p=client.check(0);const failure=expect(p).rejects.toThrow('Invalid worker response');ports[0].reply({ok:true});await failure;expect(ports).toHaveLength(2);client.dispose()});
 it('bounds execution time and creates a fresh worker',async()=>{vi.useFakeTimers();const {client,ports}=setup();const p=client.check(0);const failure=expect(p).rejects.toThrow('timed out');await vi.advanceTimersByTimeAsync(5000);await failure;expect(ports[0].terminated).toBe(true);expect(ports).toHaveLength(2);client.dispose()});
 it('cancels without resolving a pending request',async()=>{const {client,ports}=setup();const p=client.check(0);const failure=expect(p).rejects.toThrow('Cancelled');client.cancel();await failure;expect(ports[0].terminated).toBe(true);client.dispose();await expect(client.check(0)).rejects.toThrow('closed')});
 it('supersedes an earlier request',async()=>{const {client,ports}=setup();const p=client.check(0);const failure=expect(p).rejects.toThrow('Superseded');const q=client.check(1);await failure;ports[1].reply(handleRequest(ports[1].sent[0]));await q;client.dispose()});
});
it('mode/settings/reset transitions advance revision without mutating initial state',()=>{let s=reducer(initialState,{type:'mode',mode:'VECTOR'});s=reducer(s,{type:'angle',angle:'RAD'});expect(s).toEqual({mode:'VECTOR',angle:'RAD',revision:2});expect(reducer(s,{type:'reset'})).toEqual({...initialState,revision:3});expect(initialState.revision).toBe(0)});
