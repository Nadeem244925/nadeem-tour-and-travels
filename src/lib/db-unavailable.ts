/**
 * True when the database itself is unreachable (vs. a validation bug).
 *
 * Covers every DB-unavailable shape so callers can fall back gracefully:
 *  - Missing/invalid DATABASE_URL (PrismaClientInitializationError, P1012)
 *  - Connection/query-engine failures (P1000–P1017, P2024)
 *  - Low-level socket/network errors
 *
 * Anything else (validation, missing tables, etc.) should keep failing loudly.
 */
export function isDbUnavailable(e: unknown): boolean {
  if (!(e instanceof Error)) return false;
  return /PrismaClientInitializationError|environment variable not found|did not initialize yet|query engine library|P10\d\d|P2024|can'?t reach|unable to open|failed to open|ECONNREFUSED|ENOTFOUND|ETIMEDOUT|connection closed|socket hang up/i.test(
    e.message
  );
}
