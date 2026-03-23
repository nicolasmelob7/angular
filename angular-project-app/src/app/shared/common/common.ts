export function isDate(value: unknown): value is Date {
  return value instanceof Date;
}

export function isNull(value: unknown): value is null {
  return value === null;
}

export function sleep(ms: number): Promise<any> {
  return new Promise((res) => setTimeout(res, ms));
}
