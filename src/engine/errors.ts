export type ErrorCode = 'SYNTAX' | 'DOMAIN' | 'DIVISION_BY_ZERO' | 'RESOURCE_LIMIT' | 'OVERFLOW' | 'INVALID_OPTIONS';
export class CalculationError extends Error {
  constructor(public code: ErrorCode, message: string, public position?: number) {
    super(message);
    this.name = 'CalculationError';
  }
}
export function fail(code: ErrorCode, message: string): never { throw new CalculationError(code, message); }
