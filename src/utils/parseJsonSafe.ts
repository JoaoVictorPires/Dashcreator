export function parseJsonSafe<T = any>(value: string, fallback: T | null = null): T | null {
  try {
    return JSON.parse(value) as T;
  } catch {
    return fallback;
  }
}
