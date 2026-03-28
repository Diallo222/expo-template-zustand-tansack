/**
 * Shared pure helpers (formatting, guards). Keep feature-specific helpers under each feature hooks folder.
 */

export function assertNever(value: never): never {
  throw new Error(`Unexpected value: ${String(value)}`);
}
