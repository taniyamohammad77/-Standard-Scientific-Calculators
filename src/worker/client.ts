import { isResponse, type Request, type Response } from './protocol';
import { type Options, type Result } from '../engine/calculate';
import { limits } from '../engine/types';
export interface Port {
  onmessage: ((event: MessageEvent<unknown>) => void) | null;
  onerror: ((event: ErrorEvent) => void) | null;
  postMessage(message: Request): void;
  terminate(): void;
}
export class EngineConnection {
  private port: Port;
  private id = 0;
  private disposed = false;
  private pending?: { id: number; revision: number; operation: Request['operation']; resolve: (r: Response) => void; reject: (e: Error) => void; timer: ReturnType<typeof setTimeout> };
  constructor(private factory: () => Port) { this.port = this.create(); }
  private create() {
    const port = this.factory();
    port.onmessage = e => {
      if (port !== this.port || this.disposed) return;
      if (!isResponse(e.data)) { this.fail('Invalid worker response'); return; }
      const p = this.pending;
      if (!p || e.data.id !== p.id || e.data.revision !== p.revision) return;
      if (!e.data.ok) { this.fail(e.data.message ?? e.data.error); return; }
      if ((p.operation === 'calculate' && !('result' in e.data)) || (p.operation === 'health' && !('status' in e.data))) { this.fail('Unexpected worker result'); return; }
      clearTimeout(p.timer); this.pending = undefined; p.resolve(e.data);
    };
    port.onerror = () => { if (port === this.port && !this.disposed) this.fail('Worker failed'); };
    return port;
  }
  private fail(reason: string) {
    const p = this.pending; this.pending = undefined;
    if (p) { clearTimeout(p.timer); p.reject(new Error(reason)); }
    this.port.terminate();
    if (!this.disposed) this.port = this.create();
  }
  private send(revision: number, payload: { operation: 'health' } | { operation: 'calculate'; expression: string; options: Options }): Promise<Response> {
    if (this.disposed) return Promise.reject(new Error('Connection closed'));
    if (!Number.isSafeInteger(revision) || revision < 0) return Promise.reject(new Error('Invalid revision'));
    if (this.pending) this.fail('Superseded');
    return new Promise((resolve, reject) => {
      const id = ++this.id;
      const timer = setTimeout(() => this.fail('Worker timed out'), limits.timeoutMs);
      this.pending = { id, revision, operation: payload.operation, resolve, reject, timer };
      try { this.port.postMessage({ version: 1, id, revision, ...payload }); } catch { this.fail('Worker unavailable'); }
    });
  }
  async check(revision: number): Promise<void> { await this.send(revision, { operation: 'health' }); }
  async evaluate(expression: string, options: Options, revision: number): Promise<Result> {
    const response = await this.send(revision, { operation: 'calculate', expression, options });
    if (response.ok && 'result' in response) return response.result;
    throw new Error('Unexpected worker result');
  }
  cancel() { if (!this.disposed) this.fail('Cancelled'); }
  dispose() { this.disposed = true; this.fail('Connection closed'); }
}
