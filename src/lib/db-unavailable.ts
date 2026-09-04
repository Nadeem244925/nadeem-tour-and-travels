/**
 * True when the database itself is unreachable (vs. a validation bug).
 *
 * Covers every DB-unavailable shape so callers can fall back gracefully:
 *  - Missing/invalid DATABASE_URL (PrismaClientInitializationError, P1012,
 *    or a URL whose scheme isn't postgresql://)
 *  - Connection/query-engine failures (P1000–P1017, P2024)
 *  - Low-level socket/network errors
 *
 * Anything else (validation, missing tables, etc.) should keep failing loudly.
 */
export function isDbUnavailable(e: unknown): boolean {
  if (!(e instanceof Error)) return false;
  return /PrismaClientInitializationError|environment variable not found|did not initialize yet|query engine library|P10\d\d|P2024|can'?t reach|unable to open|failed to open|ECONNREFUSED|ENOTFOUND|ETIMEDOUT|connection closed|socket hang up|url must start with the protocol|must start with the protocol/i.test(
    e.message
  );
}
