import {handleRequest} from './protocol';
self.onmessage=(event:MessageEvent<unknown>)=>self.postMessage(handleRequest(event.data));
